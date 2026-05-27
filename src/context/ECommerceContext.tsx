import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  User as FirebaseUser 
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  addDoc, 
  onSnapshot, 
  query, 
  where,
  serverTimestamp,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { trackEvent } from '../utils/analytics';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface Variation {
  name: string;
  options: { label: string; priceModifier: number }[];
}

export interface Product {
  id: string;
  title: string;
  imageSrc: string;
  description?: string;
  price: number;
  category: string;
  variants?: Variation[];
  allowCustomText?: boolean;
  allowCustomLogo?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  imageSrc: string;
  price: number;
  quantity: number;
  category: string;
  selectedVariants?: Record<string, string>;
  customText?: string;
  customLogoUrl?: string;
}

export interface Order {
  id?: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: any;
  shippingAddress: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'order' | 'system' | 'promotion';
  isRead: boolean;
  createdAt: any;
}

interface ECommerceContextType {
  user: FirebaseUser | null;
  loading: boolean;
  cart: CartItem[];
  orders: Order[];
  notifications: Notification[];
  login: () => Promise<void>;
  logout: () => Promise<void>;
  addToCart: (product: Product, options?: Partial<CartItem>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (shippingAddress: string) => Promise<void>;
  markNotificationRead: (id: string) => Promise<void>;
}

const ECommerceContext = createContext<ECommerceContextType | undefined>(undefined);

export const ECommerceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Auth listener
  useEffect(() => {
    let unsubscribeCart: (() => void) | null = null;
    let unsubscribeOrders: (() => void) | null = null;
    let unsubscribeNotif: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setLoading(false);
      
      // Clear previous listeners
      if (unsubscribeCart) unsubscribeCart();
      if (unsubscribeOrders) unsubscribeOrders();
      if (unsubscribeNotif) unsubscribeNotif();

      if (u) {
        // Sync user to Firestore
        await setDoc(doc(db, 'users', u.uid), {
          displayName: u.displayName,
          email: u.email,
          photoURL: u.photoURL,
          createdAt: serverTimestamp()
        }, { merge: true });

        // Load cart from Firestore
        const cartRef = collection(db, 'users', u.uid, 'cart');
        unsubscribeCart = onSnapshot(cartRef, (snapshot) => {
          const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CartItem));
          setCart(items);
        }, (error) => console.error("Cart snapshot error:", error));

        // Load orders from Firestore
        const ordersRef = collection(db, 'orders');
        const qOrders = query(ordersRef, where('userId', '==', u.uid));
        unsubscribeOrders = onSnapshot(qOrders, (snapshot) => {
          const loadedOrders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
          setOrders(loadedOrders);
        }, (error) => console.error("Orders snapshot error:", error));

        // Load notifications
        const notifRef = collection(db, 'notifications');
        const qNotif = query(notifRef, where('userId', '==', u.uid));
        unsubscribeNotif = onSnapshot(qNotif, (snapshot) => {
          const loadedNotifs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notification));
          setNotifications(loadedNotifs.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)));
        }, (error) => console.error("Notifications snapshot error:", error));
      } else {
        setCart([]);
        setOrders([]);
        setNotifications([]);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeCart) unsubscribeCart();
      if (unsubscribeOrders) unsubscribeOrders();
      if (unsubscribeNotif) unsubscribeNotif();
    };
  }, []);

  const markNotificationRead = async (id: string) => {
    if (!user) return;
    try {
      await updateDoc(doc(db, 'notifications', id), { isRead: true });
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const createNotification = async (title: string, message: string, type: Notification['type'] = 'system') => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'notifications'), {
        userId: user.uid,
        title,
        message,
        type,
        isRead: false,
        createdAt: serverTimestamp()
      });
    } catch (error) {
       console.error("Failed to create notification:", error);
    }
  };

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      // Handle standard popup errors gracefully
      const ignoredErrors = [
        'auth/cancelled-popup-request',
        'auth/popup-blocked',
        'auth/user-cancelled',
        'auth/popup-closed-by-user'
      ];
      
      if (ignoredErrors.includes(error?.code)) {
        console.warn('Login popup was closed or blocked:', error.code);
        return;
      }
      
      handleFirestoreError(error, OperationType.WRITE, 'firebase-auth');
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const addToCart = async (product: Product, options: Partial<CartItem> = {}) => {
    // Generate a unique ID for this specific configuration
    const configHash = JSON.stringify({
      productId: product.id,
      selectedVariants: options.selectedVariants || {},
      customText: options.customText || '',
      customLogoUrl: options.customLogoUrl || ''
    });
    const cartItemId = btoa(configHash).replace(/[^a-zA-Z0-9]/g, '').slice(0, 20);

    const newItem: CartItem = {
      id: cartItemId,
      productId: product.id,
      title: product.title,
      imageSrc: product.imageSrc,
      price: options.price || product.price,
      quantity: 1,
      category: product.category,
      ...options
    };

    trackEvent('Ecommerce', 'Add to Cart', product.title, options.price || product.price);

    if (!user) {
      setCart(prev => {
        const existing = prev.find(item => item.id === cartItemId);
        if (existing) {
          return prev.map(item => item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item);
        }
        return [...prev, newItem];
      });
      return;
    }

    const path = `users/${user.uid}/cart/${cartItemId}`;
    try {
      const itemRef = doc(db, 'users', user.uid, 'cart', cartItemId);
      const itemSnap = await getDoc(itemRef);
      if (itemSnap.exists()) {
        await updateDoc(itemRef, { quantity: itemSnap.data().quantity + 1 });
      } else {
        await setDoc(itemRef, newItem);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    const itemToRemove = cart.find(i => i.id === cartItemId);
    const itemName = itemToRemove ? itemToRemove.title : 'Unknown';
    trackEvent('Ecommerce', 'Remove from Cart', itemName);

    if (!user) {
      setCart(prev => prev.filter(item => item.id !== cartItemId));
      return;
    }
    const path = `users/${user.uid}/cart/${cartItemId}`;
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'cart', cartItemId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const updateCartQuantity = async (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    if (!user) {
      setCart(prev => prev.map(item => item.id === cartItemId ? { ...item, quantity } : item));
      return;
    }
    const path = `users/${user.uid}/cart/${cartItemId}`;
    try {
      await updateDoc(doc(db, 'users', user.uid, 'cart', cartItemId), { quantity });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const clearCart = async () => {
    if (!user) {
      setCart([]);
      return;
    }
    const path = `users/${user.uid}/cart`;
    try {
      const cartRef = collection(db, 'users', user.uid, 'cart');
      const snapshot = await getDocs(cartRef);
      const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const placeOrder = async (shippingAddress: string) => {
    if (!user || cart.length === 0) return;

    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const order: Order = {
      userId: user.uid,
      items: cart,
      totalAmount,
      status: 'pending',
      createdAt: serverTimestamp(),
      shippingAddress
    };

    try {
      await addDoc(collection(db, 'orders'), order);
      trackEvent('Ecommerce', 'Place Order', `Total: ₹${totalAmount}`, totalAmount);
      await createNotification(
        'Order Placed Successfully!',
        `Your order of ₹${totalAmount} has been received. We've sent a detailed confirmation to your registered email and WhatsApp.`,
        'order'
      );
      await clearCart();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'orders');
    }
  };

  return (
    <ECommerceContext.Provider value={{
      user, loading, cart, orders, notifications, login, logout,
      addToCart, removeFromCart, updateCartQuantity, clearCart, placeOrder, markNotificationRead
    }}>
      {children}
    </ECommerceContext.Provider>
  );
};

export const useECommerce = () => {
  const context = useContext(ECommerceContext);
  if (context === undefined) {
    throw new Error('useECommerce must be used within an ECommerceProvider');
  }
  return context;
};
