import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingCart, User, LogOut, Package, Bell, Info, Home } from 'lucide-react';
import { useECommerce } from '../../context/ECommerceContext';
import { OptimizedImage } from '../ui/OptimizedImage';

import { NAV_LINKS } from '../../constants/navigation';
import { CONTACT_INFO } from '../../constants/contact';

const Logo: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => (
    <button 
      onClick={() => onNavigate('main')} 
      className="text-2xl font-black text-gray-900 dark:text-white group flex items-center gap-1.5"
    >
      <span className="bg-indigo-600 text-white px-3 py-1 rounded-[45%_55%_50%_50%/50%_50%_45%_55%] transform -rotate-3 group-hover:rotate-0 transition-transform">K</span>
      <span className="tracking-tighter pl-0">ria<span className="text-indigo-600 dark:text-indigo-400">Tech</span></span>
    </button>
);

interface HeaderProps {
    onNavigate: (page: string, anchor?: string) => void;
    currentPage: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
    const { user, login, logout, cart, notifications, markNotificationRead } = useECommerce();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const headerRef = useRef<HTMLElement>(null);

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const unreadCount = notifications.filter(n => !n.isRead).length;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent, link: typeof NAV_LINKS[0]) => {
        e.preventDefault();
        if (link.type === 'page') {
            onNavigate(link.href);
        } else if (link.type === 'anchor') {
            onNavigate(link.href, link.anchor);
        }
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setShowUserMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

  return (
    <header 
        ref={headerRef} 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
            scrolled 
            ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] py-3 border-b border-gray-200/50 dark:border-gray-800/50 translate-y-0' 
            : 'bg-transparent py-8 -translate-y-1 md:translate-y-0'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Logo onNavigate={onNavigate} />
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {NAV_LINKS.map((link) => {
                const isActive = (link.type === 'page' && currentPage === link.href) || 
                                 (link.href === 'main' && currentPage === 'main' && !link.anchor);

                return (
                  <motion.button
                    key={link.label}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400'
                    }`}
                  >
                    {link.label}
                  </motion.button>
                );
              })}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
             {user && (
              <div className="relative">
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }} 
                    className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                    <Bell size={24} />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900 animate-pulse">
                        {unreadCount}
                      </span>
                    )}
                </motion.button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-[60]"
                    >
                      <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                        <h3 className="font-black text-sm uppercase tracking-widest text-gray-900 dark:text-white">Notifications</h3>
                        {unreadCount > 0 && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">{unreadCount} New</span>}
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center">
                            <Bell className="mx-auto text-gray-200 dark:text-gray-800 mb-2" size={32} />
                            <p className="text-gray-400 text-xs font-medium">All clear for now!</p>
                          </div>
                        ) : (
                          notifications.map(notif => (
                            <div 
                              key={notif.id} 
                              onClick={() => markNotificationRead(notif.id)}
                              className={`p-4 border-b border-gray-50 dark:border-gray-800 transition-colors cursor-pointer flex gap-3 ${!notif.isRead ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
                            >
                              <div className={`p-2 rounded-lg h-fit ${notif.type === 'order' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                                {notif.type === 'order' ? <Package size={14} /> : <Info size={14} />}
                              </div>
                              <div className="flex-1">
                                <p className={`text-xs font-bold ${notif.isRead ? 'text-gray-600 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>{notif.title}</p>
                                <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-2">{notif.message}</p>
                                <p className="text-[9px] text-gray-400 mt-2 uppercase">{notif.createdAt?.toDate ? notif.createdAt.toDate().toLocaleTimeString() : 'Just now'}</p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
             )}

             <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('cart')} 
                className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                aria-label={`View cart with ${cartCount} items`}
            >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">
                    {cartCount}
                  </span>
                )}
            </motion.button>

            {user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-10 h-10 rounded-full border-2 border-indigo-600 overflow-hidden shadow-lg flex items-center justify-center bg-gray-100"
                  aria-label="Toggle user menu"
                >
                  <OptimizedImage 
                    src={user.photoURL || '/images/gallery/gallery-1.jpg'} 
                    alt={user.displayName || 'User'} 
                    className="w-full h-full" 
                    width={40}
                    height={40}
                  />
                </motion.button>
                
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-52 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden py-2"
                    >
                      <button onClick={() => { onNavigate('profile'); setShowUserMenu(false); }} className="w-full px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-3">
                        <User size={18} className="text-indigo-600" /> My Profile
                      </button>
                      <button onClick={() => { onNavigate('orders'); setShowUserMenu(false); }} className="w-full px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-3">
                        <Package size={18} className="text-indigo-600" /> My Orders
                      </button>
                      <div className="my-1 border-t border-gray-100 dark:border-gray-800"></div>
                      <button onClick={() => { logout(); setShowUserMenu(false); }} className="w-full px-4 py-3 text-left text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3">
                        <LogOut size={18} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={login} 
                className="px-6 py-3 rounded-xl text-sm font-black text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg"
              >
                Login
              </motion.button>
            )}
          </div>
          <div className="-mr-2 flex md:hidden items-center gap-2">
            {user && (
              <button
                 onClick={() => { onNavigate('orders'); setIsOpen(false); }}
                 className="relative p-2 text-indigo-600 dark:text-indigo-400"
              >
                  <Bell size={24} />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
              </button>
            )}
            <button
               onClick={() => { onNavigate('main'); setIsOpen(false); }}
               className="p-2 text-indigo-600 dark:text-indigo-400"
               aria-label="Go to home"
            >
                <Home size={24} />
            </button>
            <button
               onClick={() => { onNavigate('cart'); setIsOpen(false); }}
               aria-label={`Open enquiry cart with ${cartCount} items`}
               className="relative p-2 text-indigo-600 dark:text-indigo-400"
            >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              className="bg-white dark:bg-gray-900 inline-flex items-center justify-center p-3 rounded-2xl text-indigo-600 dark:text-indigo-400 shadow-md focus:outline-none transition-all"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-2">
              {user && (
                <div className="px-4 py-4 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800 mb-2">
                  <OptimizedImage 
                    src={user.photoURL || '/images/gallery/gallery-1.jpg'} 
                    alt="User" 
                    className="w-12 h-12 rounded-full border-2 border-indigo-600" 
                    width={48}
                    height={48}
                  />
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white uppercase">{user.displayName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
              )}
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={(e) => handleNavClick(e, link)}
                  className="w-full text-left text-gray-800 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-700 block px-4 py-4 rounded-2xl text-lg font-bold transition-all"
                >
                  {link.label}
                </motion.button>
              ))}
              {user && (
                <motion.button
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: NAV_LINKS.length * 0.05 }}
                  onClick={() => { onNavigate('orders'); setIsOpen(false); }}
                  className="w-full text-left text-indigo-600 block px-4 py-4 rounded-2xl text-lg font-bold transition-all flex items-center gap-3"
                >
                  <Package size={22} /> My Orders
                </motion.button>
              )}
              {user ? (
                 <motion.button 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: (NAV_LINKS.length + 1) * 0.05 }}
                    onClick={logout} 
                    className="mt-6 w-full text-center px-6 py-5 rounded-2xl text-lg font-black text-white bg-red-600 hover:bg-red-700 shadow-xl flex items-center justify-center gap-3"
                >
                    <LogOut size={22} />
                    Logout
                </motion.button>
              ) : (
                <motion.button 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: NAV_LINKS.length * 0.05 }}
                    onClick={() => { login(); setIsOpen(false); }} 
                    className="mt-6 w-full text-center px-6 py-5 rounded-2xl text-lg font-black text-white bg-indigo-600 hover:bg-indigo-700 shadow-xl flex items-center justify-center gap-3"
                >
                    <User size={22} />
                    Login with Google
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
