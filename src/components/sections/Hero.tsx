import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Send, ShieldCheck } from 'lucide-react';
import { OptimizedImage } from '../ui/OptimizedImage';

const handleScroll = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

const slideshowImages = [
    { src: '/images/hero/slide-1.jpg', alt: 'Magnetic Floating Frame' },
    { src: '/images/hero/slide-2.jpg', alt: 'Artisan Neon Sign' },
    { src: '/images/hero/slide-3.jpg', alt: 'Acrylic Wall Art' },
    { src: '/images/hero/slide-4.jpg', alt: 'Luxury LED Decor' },
    { src: '/images/hero/slide-5.jpg', alt: 'Signature Sculptures' },
    { src: '/images/hero/slide-6.jpg', alt: 'Premium Finishes' },
];

interface HeroProps {
    onNavigate: (page: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section id="home" className="relative text-gray-900 dark:text-white overflow-hidden bg-white dark:bg-gray-950 flex flex-col transition-colors duration-300 pt-20">
      {/* Explore Trending Slide Swiper (The Floating Belt) */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full h-44 bg-gray-50/80 dark:bg-gray-950/40 backdrop-blur-md border-b border-gray-200 dark:border-white/5 relative z-20 flex-shrink-0 transition-colors duration-300"
      >
        <div className="flex h-full w-full">
          <button
            onClick={() => onNavigate('trending')}
            className="relative z-30 w-1/3 sm:w-1/4 lg:w-1/5 flex-shrink-0 bg-indigo-600 flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-indigo-500 transition-all duration-500 group overflow-hidden -skew-x-12 -ml-6 pl-10 shadow-[8px_0_25px_rgba(0,0,0,0.3)]"
          >
            {/* Animated background shine */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ 
                left: ['-100%', '200%'],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                repeatDelay: 1
              }}
            />
            
            <div className="skew-x-12 flex flex-col items-center justify-center text-center px-1 sm:px-2">
              <h3 className="relative z-10 text-white text-sm sm:text-xl font-black tracking-tighter uppercase leading-none group-hover:scale-105 transition-transform duration-500">
                Trending<br/><span className="text-indigo-200 text-[8px] sm:text-xs font-bold tracking-[0.2em]">Swaps</span>
              </h3>
              <span className="text-[6.5px] sm:text-[8px] text-white/90 font-black uppercase mt-1 tracking-wider leading-tight max-w-[95%]">
                Highly Requested
              </span>
            </div>
            
            <div className="absolute bottom-2 right-2 sm:right-3 flex items-center gap-1 text-[7px] sm:text-[9px] font-black uppercase tracking-widest text-indigo-100 opacity-85 group-hover:opacity-100 transition-opacity skew-x-12">
              Explore <ArrowRight size={10} />
            </div>
          </button>
          
          <div className="w-2/3 sm:w-3/4 lg:w-4/5 h-full overflow-hidden relative z-10 flex items-center">
            <div className="absolute top-0 left-0 h-full flex items-center animate-fast-scroll">
              {[...slideshowImages, ...slideshowImages, ...slideshowImages].map((img, index) => (
                <motion.div 
                   key={index} 
                   whileHover={{ scale: 1.05, y: -4 }}
                   className="flex-shrink-0 w-28 h-28 md:w-32 md:h-32 mx-3 p-1 bg-white dark:bg-white/5 rounded-2xl shadow-sm dark:shadow-2xl border border-gray-200/60 dark:border-white/10 overflow-hidden cursor-pointer"
                >
                    <OptimizedImage 
                        src={img.src} 
                        alt={img.alt} 
                        width={150}
                        height={150}
                        className="w-full h-full rounded-xl"
                    />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

