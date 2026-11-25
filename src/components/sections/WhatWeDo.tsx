import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { OptimizedImage } from '../ui/OptimizedImage';

const services = [
  {
    title: 'Signature Wall Decor',
    description: 'Premium 3D MDF wall art, high-end magnetic frames, and bespoke neon creations designed for luxury interiors.',
    imageSrc: '/images/trending/project-1.jpg',
    pageKey: 'signature-wall-decor',
  },
  {
    title: 'Commercial Signage',
    description: 'Expert branding solutions including acrylic sign boxes, 3D lettering, and professional business displays.',
    imageSrc: '/images/led-decor/commercial-box.jpg',
    pageKey: 'custom-signs',
  },
  {
    title: 'Personalized Gifts',
    description: 'Transform your memories into reality with personalized gifts, acrylic photo prints, and custom frames.',
    imageSrc: '/images/services/personalized-gifts.jpg',
    pageKey: 'personalized-gifts',
  },
  {
    title: 'Kria Kids Learning',
    description: 'Creative learning tools, interactive sensory boxes, and educational puzzles designed for young minds.',
    imageSrc: '/images/services/kids-learning.jpg',
    pageKey: 'educational-kids',
  },
];

interface WhatWeDoProps {
    onNavigate: (page: string, anchor?: string) => void;
}

export const WhatWeDo: React.FC<WhatWeDoProps> = ({ onNavigate }) => {
  const handleCardClick = (e: React.MouseEvent, pageKey: string) => {
      e.preventDefault();
      onNavigate(pageKey);
  };

  return (
    <section id="services" className="py-12 md:py-20 bg-white dark:bg-gray-950 text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-indigo-500/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-full bg-purple-500/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
           <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tighter uppercase text-gray-900 dark:text-white">
              What We Do
           </h2>
           <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
              We are a one-stop studio for custom fabrication. Explore our core services below.
           </p>
        </motion.div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onClick={(e) => handleCardClick(e, service.pageKey)}
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick(e as any, service.pageKey)}
              tabIndex={0}
              role="button"
              aria-label={`Explore our ${service.title} services`}
              className="group relative overflow-hidden rounded-[2rem] cursor-pointer bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-white/5 aspect-[4/5] md:aspect-[3/4] outline-none focus-visible:ring-4 focus-visible:ring-indigo-500"
            >
              <OptimizedImage 
                src={service.imageSrc} 
                alt={service.title} 
                width={800}
                className="w-full h-full opacity-80 dark:opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
              
              <div className="absolute inset-0 p-3 sm:p-5 md:p-6 flex flex-col justify-end">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <h3 className="text-sm sm:text-xl md:text-2xl font-black mb-1 md:mb-2 text-white group-hover:text-indigo-400 transition-colors leading-tight uppercase tracking-tighter">{service.title}</h3>
                  <p className="text-[10px] sm:text-xs md:text-sm text-gray-200 leading-relaxed mb-2 sm:mb-4 transform md:translate-y-4 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 font-medium">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-1 sm:gap-2 text-indigo-400 font-black text-[9px] sm:text-xs md:text-sm uppercase tracking-widest">
                    Explore Now <ArrowRight size={12} className="transform group-hover:translate-x-2 transition-transform sm:w-4 sm:h-4" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
