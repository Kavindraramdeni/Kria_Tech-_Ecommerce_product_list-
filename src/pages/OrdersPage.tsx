import React from 'react';
import { motion } from 'motion/react';
import { Package, Calendar, MapPin, ArrowLeft, CheckCircle2, Clock, Truck, ShieldCheck } from 'lucide-react';
import { useECommerce, Order } from '../context/ECommerceContext';

interface OrdersPageProps {
  onNavigateBack: () => void;
  onNavigate: (page: string) => void;
}

const StatusIcon = ({ status }: { status: Order['status'] }) => {
  switch (status) {
    case 'pending': return <Clock className="text-yellow-500" size={18} />;
    case 'processing': return <CheckCircle2 className="text-blue-500" size={18} />;
    case 'shipped': return <Truck className="text-indigo-500" size={18} />;
    case 'delivered': return <ShieldCheck className="text-green-500" size={18} />;
    default: return <Clock className="text-gray-500" size={18} />;
  }
};

export const OrdersPage: React.FC<OrdersPageProps> = ({ onNavigateBack, onNavigate }) => {
  const { orders, user } = useECommerce();

  if (!user) {
    return (
      <div className="min-h-screen pt-32 bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-500">Please login to view your orders.</h2>
          <button onClick={onNavigateBack} className="mt-4 text-indigo-600 font-bold">Return Home</button>
        </div>
      </div>
    );
  }

  const sortedOrders = [...orders].sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-4xl">
        <button 
          onClick={onNavigateBack} 
          className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-8 font-bold transition-all group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Store
        </button>

        <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-12 uppercase tracking-tighter">Order <span className="text-indigo-600">History</span></h1>

        {orders.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-20 text-center shadow-xl border border-gray-100 dark:border-gray-800">
            <Package size={64} className="mx-auto mb-6 text-gray-200 dark:text-gray-800" />
            <h2 className="text-2xl font-bold text-gray-400 mb-8">No collections yet. Start your story today.</h2>
            <button 
              onClick={() => onNavigate('main')} 
              className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {sortedOrders.map((order, idx) => (
              <motion.div 
                key={order.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800"
              >
                <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800 flex flex-wrap justify-between items-center gap-4 bg-gray-50/50 dark:bg-gray-800/30">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm text-indigo-600">
                      <Package size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Order ID</p>
                      <p className="text-sm font-black text-gray-900 dark:text-white">#{order.id?.slice(-8).toUpperCase() || 'PROCESSED'}</p>
                    </div>
                  </div>
                  <div className="flex gap-8">
                    <div className="hidden sm:block">
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
                        <Calendar size={12} /> Placed On
                      </p>
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                        {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : 'Just now'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Status</p>
                      <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-gray-800 rounded-full shadow-sm">
                        <StatusIcon status={order.status} />
                        <span className="text-xs font-black uppercase text-gray-700 dark:text-gray-200">{order.status}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="space-y-4 mb-8">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={item.imageSrc} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{item.title}</p>
                          {item.selectedVariants && (
                            <div className="flex gap-2 text-[10px] text-gray-400 font-medium">
                              {Object.entries(item.selectedVariants).map(([n, v]) => (
                                <span key={n}>{n}: {v}</span>
                              ))}
                            </div>
                          )}
                          {item.customText && <p className="text-[10px] text-indigo-500 font-bold truncate max-w-[200px]">Text: {item.customText}</p>}
                          <p className="text-xs text-gray-400 font-bold">Quantity: {item.quantity}</p>
                        </div>
                        {/* Item price details removed */}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-start justify-between gap-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                    <div className="max-w-xs">
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-1">
                        <MapPin size={12} /> Shipping To
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                        {order.shippingAddress}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Items count</p>
                      <p className="text-3xl font-black text-indigo-600">{order.items?.reduce((sum, item) => sum + item.quantity, 0)}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
