import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, MessageCircle } from 'lucide-react';
import { useECommerce } from '../context/ECommerceContext';
import { OptimizedImage } from '../components/ui/OptimizedImage';

interface CartPageProps {
  onNavigateBack: () => void;
  onNavigate: (page: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigateBack, onNavigate }) => {
  const { cart, updateCartQuantity, removeFromCart } = useECommerce();
  const [address, setAddress] = useState('');
  const [checkingOut, setCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    const itemsList = cart.map((item, index) => {
      const variants = item.selectedVariants && Object.keys(item.selectedVariants).length
        ? Object.entries(item.selectedVariants).map(([name, value]) => `${name}: ${value}`).join(', ')
        : 'Standard options';
      return [
        `${index + 1}. ${item.quantity} × ${item.title}`,
        `   Category: ${item.category || 'Custom product'}`,
        `   Options: ${variants}`,
        item.customText ? `   Custom text: ${item.customText}` : '',
        `   Displayed unit price: ₹${Number(item.price || 0).toLocaleString('en-IN')}`
      ].filter(Boolean).join('\n');
    }).join('\n\n');
    const message = [
      'Hello KRIA Tech! I would like a quote for the following items from your catalogue.',
      '',
      'MY ENQUIRY',
      itemsList,
      '',
      address.trim() ? `Delivery location: ${address.trim()}` : 'Delivery location: Please ask me for my pincode/address.',
      '',
      'Please confirm availability, final pricing, delivery charges and estimated dispatch time. I understand this is an enquiry, not a confirmed paid order.'
    ].join('\n');
    const whatsappUrl = `https://wa.me/919000376792?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setOrderComplete(true);
    setCheckingOut(false);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-900 p-6 sm:p-10 rounded-3xl shadow-2xl text-center max-w-lg mx-4"
        >
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShoppingBag size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter">Enquiry Ready</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 font-medium">Your WhatsApp enquiry has been prepared. Send the message in WhatsApp so our team can confirm availability, final pricing and delivery.</p>
          <button 
            onClick={() => onNavigate('main')} 
            className="w-full bg-indigo-600 py-4 rounded-xl text-white font-black uppercase tracking-widest hover:bg-indigo-700 transition-all"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <button 
          onClick={onNavigateBack} 
          className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-8 font-bold transition-all group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Store
        </button>

        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-8 sm:mb-12 uppercase tracking-tighter">Your <span className="text-indigo-600">Inquiry List</span></h1>

        {cart.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 sm:p-14 lg:p-20 text-center shadow-xl">
            <ShoppingBag size={64} className="mx-auto mb-6 text-gray-200 dark:text-gray-800" />
            <h2 className="text-2xl font-bold text-gray-400 mb-8">Your cart is as empty as an unpainted wall.</h2>
            <button 
              onClick={() => onNavigate('main')} 
              className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg"
            >
              Start Creating
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 group hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800"
                  >
                    <div className="w-full sm:w-24 h-44 sm:h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <OptimizedImage src={item.imageSrc} alt={item.title} width={240} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">{item.title}</h3>
                        <span className="text-[10px] px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-full font-bold uppercase tracking-widest">{item.category}</span>
                      </div>
                      
                      {item.selectedVariants && Object.keys(item.selectedVariants).length > 0 && (
                        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2">
                          {Object.entries(item.selectedVariants).map(([name, value]) => (
                            <span key={name} className="text-xs text-gray-500 font-medium">
                              <span className="text-gray-400">{name}:</span> {value}
                            </span>
                          ))}
                        </div>
                      )}

                      {item.customText && (
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1.5 rounded-lg mb-2 inline-block max-w-full">
                          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold truncate">
                            <span className="opacity-60 uppercase text-[10px] mr-2">Text:</span> {item.customText}
                          </p>
                        </div>
                      )}

                      {/* Price display removed */}
                    </div>
                    <div className="flex items-center justify-between sm:justify-start gap-3 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 w-full sm:w-auto sm:ml-auto">
                      <button 
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        aria-label={`Decrease quantity of ${item.title}`}
                        className="p-3 hover:bg-white dark:hover:bg-gray-700 rounded-lg text-gray-500 transition-all"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-bold dark:text-white">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.title}`}
                        className="p-3 hover:bg-white dark:hover:bg-gray-700 rounded-lg text-gray-500 transition-all"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.title} from enquiry list`}
                      className="p-3 text-gray-400 hover:text-red-500 transition-colors self-end sm:self-auto"
                    >
                      <Trash2 size={20} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-gray-800 lg:sticky lg:top-32">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-tighter">Inquiry Summary</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400 font-semibold">
                    <span>Total Items</span>
                    <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                  </div>
                </div>

                {!checkingOut ? (
                  <button 
                    onClick={() => setCheckingOut(true)}
                    className="w-full bg-indigo-600 py-5 rounded-2xl text-white font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-3"
                  >
                    Checkout <ArrowLeft size={20} className="rotate-180" />
                  </button>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="delivery-location" className="block text-sm font-bold text-gray-500 mb-2 uppercase tracking-widest">Delivery Location (Optional)</label>
                      <textarea
                        id="delivery-location"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-xl p-4 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-950 outline-none transition-all dark:text-white"
                        rows={3}
                        placeholder="Enter your city and pincode (full address can be shared later)"
                      />
                    </div>
                    <button 
                      onClick={handlePlaceOrder}
                      className="w-full bg-indigo-600 py-5 rounded-2xl text-white font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl flex items-center justify-center gap-3"
                    >
                      <MessageCircle size={20} /> Continue to WhatsApp
                    </button>
                    <button 
                      onClick={() => setCheckingOut(false)}
                      className="w-full text-gray-400 font-bold text-sm uppercase tracking-widest hover:text-gray-600 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                )}
                
                <p className="mt-6 text-center text-xs text-gray-400 font-medium">
                  Your request is not an order until KRIA Tech confirms the quote and availability.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
