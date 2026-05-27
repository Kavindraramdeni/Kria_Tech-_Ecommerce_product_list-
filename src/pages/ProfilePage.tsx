import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Calendar, MapPin, Camera, Save, ArrowLeft, Shield } from 'lucide-react';
import { useECommerce } from '../context/ECommerceContext';

interface ProfilePageProps {
  onNavigateBack: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigateBack }) => {
  const { user, orders } = useECommerce();
  const [isEditing, setIsEditing] = useState(false);
  
  if (!user) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-4xl">
        <button 
          onClick={onNavigateBack} 
          className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-8 font-bold transition-all group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Store
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800 text-center">
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 rounded-full border-4 border-indigo-600 p-1 overflow-hidden mx-auto">
                    <img src={user.photoURL || 'https://via.placeholder.com/128'} alt={user.displayName || 'User'} className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full shadow-lg border-4 border-white dark:border-gray-900 hover:scale-110 transition-transform">
                  <Camera size={16} />
                </button>
              </div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">{user.displayName}</h2>
              <p className="text-sm text-gray-500 font-medium truncate">{user.email}</p>
              
              <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 grid grid-cols-2 gap-4">
                <div className="text-center">
                    <p className="text-xs text-gray-400 font-black uppercase tracking-widest mb-1">Orders</p>
                    <p className="text-xl font-black text-indigo-600">{orders.length}</p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-gray-400 font-black uppercase tracking-widest mb-1">Joined</p>
                    <p className="text-sm font-black text-gray-900 dark:text-white">May '26</p>
                </div>
              </div>
            </div>

            <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl overflow-hidden relative">
                <Shield className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10" />
                <h3 className="text-lg font-black uppercase tracking-widest mb-2">Verified Member</h3>
                <p className="text-xs text-indigo-100 font-medium leading-relaxed">You are a valued creator in the KriaTech community. Enjoy exclusive discounts and early access.</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-800">
               <div className="flex justify-between items-center mb-10">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Profile Details</h3>
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-6 py-2 bg-gray-50 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-gray-100 transition-all"
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
               </div>

               <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <User size={12} /> Full Name
                        </label>
                        <input 
                            type="text" 
                            disabled={!isEditing}
                            defaultValue={user.displayName || ''}
                            className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-xl px-4 py-3 outline-none transition-all dark:text-white font-bold disabled:opacity-60" 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <Mail size={12} /> Email Address
                        </label>
                        <input 
                            type="email" 
                            disabled 
                            defaultValue={user.email || ''}
                            className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-transparent rounded-xl px-4 py-3 outline-none transition-all dark:text-white font-bold opacity-60" 
                        />
                    </div>
                  </div>

                  <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <MapPin size={12} /> Default Shipping Address
                      </label>
                      <textarea 
                          disabled={!isEditing}
                          rows={3}
                          placeholder="No address saved yet."
                          className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-600 rounded-xl px-4 py-3 outline-none transition-all dark:text-white font-bold disabled:opacity-60" 
                      />
                  </div>

                  {isEditing && (
                    <motion.button 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full bg-indigo-600 py-4 rounded-xl text-white font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl"
                    >
                      <Save size={18} /> Save Changes
                    </motion.button>
                  )}
               </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-800">
               <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-8 uppercase tracking-tighter">Security & Preferences</h3>
               <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white dark:bg-gray-700 rounded-lg text-indigo-600"><Shield size={18} /></div>
                        <div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">Email Notifications</p>
                            <p className="text-[10px] text-gray-500">Get updates about your custom orders</p>
                        </div>
                    </div>
                    <div className="w-12 h-6 bg-indigo-600 rounded-full relative p-1 cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white dark:bg-gray-700 rounded-lg text-green-600"><Shield size={18} /></div>
                        <div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">WhatsApp Alerts</p>
                            <p className="text-[10px] text-gray-500">Live production tracking via WhatsApp</p>
                        </div>
                    </div>
                    <div className="w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full relative p-1 cursor-pointer">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
