import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Lightbox } from '../shared/Lightbox';
import { OptimizedImage } from '../ui/OptimizedImage';

const projectItems = [
  { imageSrc: '/images/gallery/gallery-1.jpg', caption: 'Acrylic LED Light Box - Coffee Shop', category: 'Commercial' },
  { imageSrc: '/images/gallery/gallery-2.jpg', caption: 'Acrylic LED Light Box - Bakery', category: 'Commercial' },
  { imageSrc: '/images/gallery/gallery-3.jpg', caption: 'Acrylic Display Box for Collectibles', category: 'Display' },
  { imageSrc: '/images/gallery/gallery-4.jpg', caption: 'Acrylic Neon Light Box - Custom Branding', category: 'Commercial' },
  { imageSrc: '/images/gallery/gallery-5.jpg', caption: 'Precision-Cut MDF Wall Art - Lion Silhouette', category: 'Home Decor' },
  { imageSrc: '/images/gallery/gallery-6.jpg', caption: '3D Layered MDF Design - Nature Theme', category: 'Home Decor' },
  { imageSrc: '/images/gallery/gallery-7.jpg', caption: 'LED Wall Decor - Spiritual Om Design', category: 'Home Decor' },
  { imageSrc: '/images/gallery/gallery-10.jpg', caption: 'Automotive Wall Art - Mustang Silhouette', category: 'Automotive' },
  { imageSrc: '/images/gallery/gallery-12.jpg', caption: 'Kids Room Decor - Tom & Jerry MDF Art', category: 'Home Decor' },
];

const INITIAL_ITEMS = 6;
const ITEMS_TO_LOAD = 6;

export const Gallery: React.FC = () => {
    const navigate = useNavigate();
    const [visibleCount, setVisibleCount] = useState(INITIAL_ITEMS);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleLoadMore = () => {
        navigate('/catalogue');
    };

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % projectItems.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + projectItems.length) % projectItems.length);
    };

    const visibleProjects = projectItems.slice(0, visibleCount);

  return (
    <section id="gallery" className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0">
          <OptimizedImage 
            src="/images/gallery/gallery-1.jpg" 
            alt="Acrylic LED display from the KRIA Tech gallery" 
            className="w-full h-full opacity-20 dark:opacity-10"
            width={1200}
            blur={false}
          />
          <div className="absolute inset-0 bg-gray-50/90 dark:bg-gray-900/95"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">Made with Love at Kria Tech</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">A glimpse into some of our favorite creations.</p>
        </motion.div>

        <div className="w-full overflow-hidden mb-16">
            <div className="flex animate-scroll">
                {[...projectItems, ...projectItems].map((item, index) => (
                    <motion.div 
                      key={`slide-${index}`} 
                      whileHover={{ scale: 1.05 }}
                      className="flex-shrink-0 w-40 h-40 mx-4 p-1 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700"
                    >
                        <OptimizedImage 
                            src={item.imageSrc} 
                            alt={item.caption} 
                            className="w-full h-full rounded-md"
                            width={200}
                        />
                    </motion.div>
                ))}
            </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
            <h3 className="text-xl md:text-3xl font-extrabold uppercase tracking-tight text-gray-900 dark:text-white">Gallery</h3>
        </motion.div>
 
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-x-2.5 gap-y-4 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((item, index) => (
              <motion.div 
                key={index}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                onClick={() => openLightbox(index)}
                className="group relative w-full aspect-square overflow-hidden rounded-[20px] sm:rounded-[24px] cursor-pointer bg-gray-100 dark:bg-gray-800"
              >
                <OptimizedImage 
                  src={item.imageSrc} 
                  alt={item.caption} 
                  width={600}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-350 flex items-end justify-center p-3 sm:p-6">
                  <p className="text-white text-[9px] sm:text-sm font-bold text-center transform translate-y-3 group-hover:translate-y-0 transition-transform duration-350 line-clamp-2 leading-tight">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {visibleCount < projectItems.length && (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLoadMore}
                    className="inline-block px-8 py-3 text-lg font-semibold text-white bg-indigo-600 dark:bg-indigo-500 rounded-xl shadow-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all"
                >
                    Load More
                </motion.button>
            </motion.div>
        )}

        <Lightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          images={projectItems}
          currentIndex={currentIndex}
          onNext={nextImage}
          onPrev={prevImage}
        />
      </div>
    </section>
  );
};
