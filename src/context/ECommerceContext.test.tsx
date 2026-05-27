import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ECommerceProvider, useECommerce } from './ECommerceContext';
import React from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { onSnapshot, setDoc, getDoc, updateDoc } from 'firebase/firestore';

// Mock Firebase
vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn(),
  signInWithPopup: vi.fn(),
  GoogleAuthProvider: vi.fn(),
  signOut: vi.fn(),
  getAuth: vi.fn(() => ({})),
}));

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  setDoc: vi.fn(),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  addDoc: vi.fn(),
  onSnapshot: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  serverTimestamp: vi.fn(),
  deleteDoc: vi.fn(),
  updateDoc: vi.fn(),
  getFirestore: vi.fn(() => ({})),
}));

vi.mock('../lib/firebase', () => ({
  auth: { currentUser: { uid: 'u1', email: 'test@test.com' } },
  db: {},
}));

describe('ECommerceContext', () => {
  const mockProduct = {
    id: 'p1',
    title: 'Test Product',
    imageSrc: 'test.jpg',
    price: 100,
    category: 'Gifts'
  };

  const mockUser = {
    uid: 'u1',
    displayName: 'Test User',
    email: 'test@test.com',
    photoURL: 'test.jpg'
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('adds item to cart correctly (unauthenticated)', async () => {
    (onAuthStateChanged as any).mockImplementationOnce((auth, cb) => {
      cb(null);
      return vi.fn();
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ECommerceProvider>{children}</ECommerceProvider>
    );
    const { result } = renderHook(() => useECommerce(), { wrapper });

    await act(async () => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.cart.length).toBe(1);
    expect(result.current.cart[0].title).toBe('Test Product');
  });

  it('syncs with firestore when authenticated', async () => {
    (onAuthStateChanged as any).mockImplementationOnce((auth, cb) => {
      cb(mockUser);
      return vi.fn();
    });

    (onSnapshot as any).mockImplementation((ref, cb) => {
      cb({ docs: [] }); // Empty cart initially
      return vi.fn();
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ECommerceProvider>{children}</ECommerceProvider>
    );
    const { result } = renderHook(() => useECommerce(), { wrapper });

    await waitFor(() => {
      expect(result.current.user).not.toBeNull();
    });

    expect(setDoc).toHaveBeenCalled(); // Should call sync user
  });

  it('calls firestore on addToCart when authenticated', async () => {
     (onAuthStateChanged as any).mockImplementationOnce((auth, cb) => {
      cb(mockUser);
      return vi.fn();
    });

    (onSnapshot as any).mockImplementation((ref, cb) => {
      cb({ docs: [] });
      return vi.fn();
    });

    (getDoc as any).mockResolvedValue({
      exists: () => false
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ECommerceProvider>{children}</ECommerceProvider>
    );
    const { result } = renderHook(() => useECommerce(), { wrapper });

    await waitFor(() => expect(result.current.user).not.toBeNull());

    await act(async () => {
      await result.current.addToCart(mockProduct);
    });

    expect(setDoc).toHaveBeenCalled(); // Should setDoc for new item
  });

  it('updates quantity in firestore if item exists', async () => {
     (onAuthStateChanged as any).mockImplementationOnce((auth, cb) => {
      cb(mockUser);
      return vi.fn();
    });

    (onSnapshot as any).mockImplementation((ref, cb) => {
      cb({ docs: [] });
      return vi.fn();
    });

    (getDoc as any).mockResolvedValue({
      exists: () => true,
      data: () => ({ quantity: 1 })
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ECommerceProvider>{children}</ECommerceProvider>
    );
    const { result } = renderHook(() => useECommerce(), { wrapper });

    await waitFor(() => expect(result.current.user).not.toBeNull());

    await act(async () => {
      await result.current.addToCart(mockProduct);
    });

    expect(updateDoc).toHaveBeenCalled();
  });
});

