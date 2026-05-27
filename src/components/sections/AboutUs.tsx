import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Target, Users, ArrowRight } from 'lucide-react';
import { OptimizedImage } from '../ui/OptimizedImage';
import { Gallery } from './Gallery';
import { WhatWeDo } from './WhatWeDo';

const images = [
    { src: '/images/about/workshop-1.jpg', alt: 'Warehouse with materials and equipment' },
    { src: '/images/about/laser-machine.jpg', alt: 'CO2 Laser cutting machine in action' },
    { src: '/images/about/creative-setup.jpg', alt: 'Behind the scenes setup of a creative project' }
];

const collections = [
  {
    title: "The Spiritual Collection",
    subtitle: "Divine designs inspired by Hindu gods. Bring spirituality and positivity into your home.",
    image: "/images/collections/spiritual.jpg",
    items: ["Om LED Wall Decor", "Shiva MDF Silhouette", "Ganesha 3D Art"]
  },
  {
    title: "The Sports Arena",
    subtitle: "Celebrate your icons with precision-cut detailing and flawless finishing.",
    image: "/images/collections/sports.jpg",
    items: ["MS Dhoni Thala #7", "Virat Kohli #18", "IPL Team Logos"]
  },
  {
    title: "Automotive Passion",
    subtitle: "For car lovers and speed enthusiasts. 3D wall art that captures power and performance.",
    image: "/images/collections/automotive.jpg",
    items: ["Mustang Classic", "Superbike Series", "F1 Track Silhouettes"]
  }
];

const handleScroll = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

interface AboutUsProps {
    onNavigate?: (page: string, anchor?: string) => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onNavigate }) => {
    return (
        <div id="about-us" className="bg-white dark:bg-gray-950 transition-colors duration-300">
            {/* --- SECTION 1: KriaTech Presentation Hero --- */}
            <section className="relative py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-950 via-gray-950 to-black text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
                    <OptimizedImage
                        src="/images/hero/bg.jpg" 
                        alt="KriaTech Studio" 
                        className="w-full h-full object-cover select-none"
                    />
                </div>
                
                {/* Decorative blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-indigo-500/10 blur-[100px] pointer-events-none z-1" />

                <div className="container mx-auto max-w-5xl text-center relative z-10 py-6 md:py-10">
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none"
                    >
                        K&nbsp;ria<span className="text-indigo-500">Tech</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 text-lg md:text-2xl font-bold leading-tight max-w-3xl mx-auto text-gray-100"
                    >
                        Elevating spaces with premium handcrafted wall decor.
                    </motion.p>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-3 text-sm md:text-lg font-medium text-indigo-300 tracking-wide"
                    >
                        Bespoke Interior Accents & Signature Art Installations.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <button
                            onClick={() => onNavigate && onNavigate('catalogue')}
                            className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 rounded-xl font-black text-xs sm:text-sm uppercase tracking-widest text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 hover:shadow-indigo-700/40 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                        >
                            Explore Catalogue
                            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </section>

            <WhatWeDo onNavigate={onNavigate || (() => {})} />

            {/* --- SECTION 2: Our Journey --- */}
            <section className="py-12 md:py-16 border-b border-gray-100 dark:border-gray-900/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        
                        {/* Text Content */}
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-4 md:space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest">
                                <Sparkles size={14} />
                                Our Journey
                            </div>
                            
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-none uppercase tracking-tighter">
                                We are <span className="text-indigo-600">K riaTech</span>
                            </h2>
                            
                            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                                A creative manufacturing studio turning ideas into reality. Based in Hyderabad, our in-house team delivers fast, high-quality custom products for individuals, events, and businesses.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <div className="flex items-start gap-3">
                                    <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                                        <Target size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-gray-900 dark:text-white uppercase text-xs tracking-wider">Precision</h4>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs">State-of-the-art laser technology.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                                        <Users size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-gray-900 dark:text-white uppercase text-xs tracking-wider">Expert Team</h4>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs">Dedicated creative professionals.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Image Collage */}
                        <div className="relative h-[340px] md:h-[450px] select-none mt-8 lg:mt-0">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="absolute w-2/3 h-2/3 top-0 left-0 z-20"
                            >
                                <img 
                                    src={images[1].src} 
                                    alt={images[1].alt} 
                                    className="rounded-2xl shadow-xl w-full h-full object-cover border-4 border-white dark:border-gray-900" 
                                    referrerPolicy="no-referrer"
                                />
                            </motion.div>
                            
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="absolute w-1/2 h-1/2 top-1/4 right-0 z-10"
                            >
                                 <img 
                                    src={images[0].src} 
                                    alt={images[0].alt} 
                                    className="rounded-2xl shadow-xl w-full h-full object-cover border-4 border-white dark:border-gray-900" 
                                    referrerPolicy="no-referrer"
                                />
                            </motion.div>
                            
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8, rotate: 15 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 8 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="absolute w-1/2 h-1/2 bottom-0 left-1/4 z-30"
                            >
                                 <img 
                                    src={images[2].src} 
                                    alt={images[2].alt} 
                                    className="rounded-2xl shadow-xl w-full h-full object-cover border-4 border-white dark:border-gray-900" 
                                    referrerPolicy="no-referrer"
                                />
                            </motion.div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- SECTION 3: Signature Wall Decor (The 3 Collections) --- */}
            <section className="bg-black text-white py-12 md:py-16 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="mb-10 lg:mb-12">
                        <motion.h2 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-black leading-none uppercase tracking-tighter mb-3"
                        >
                            Signature <br className="hidden sm:inline" />
                            <span className="text-indigo-500">Wall Decor</span>
                        </motion.h2>
                        <p className="text-gray-400 max-w-xl text-sm md:text-base font-medium">
                            Transforming empty walls into stunning focal points with premium MDF and LED 3D art.
                        </p>
                    </div>

                    <div className="space-y-12 md:space-y-16">
                        {collections.map((col, index) => (
                            <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 md:gap-12 items-center`}>
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95, x: index % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="w-full lg:w-1/2 relative group select-none"
                                >
                                    <div className="overflow-hidden rounded-2xl">
                                        <OptimizedImage 
                                            src={col.image} 
                                            alt={col.title} 
                                            width={1000}
                                            className="w-full aspect-[16/10] transform group-hover:scale-103 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="absolute -bottom-4 -right-4 bg-indigo-600 text-white p-5 rounded-2xl hidden md:block">
                                        <span className="text-2xl font-black italic">0{index + 1}</span>
                                    </div>
                                </motion.div>

                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="w-full lg:w-1/2 space-y-4"
                                >
                                    <span className="text-indigo-500 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] block md:hidden">0{index + 1} Collection</span>
                                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">{col.title}</h3>
                                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">{col.subtitle}</p>
                                    <ul className="space-y-2">
                                        {col.items.map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-gray-300 font-bold uppercase tracking-widest text-[10px] sm:text-xs">
                                                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <button 
                                        onClick={() => onNavigate && onNavigate('catalogue')}
                                        className="mt-4 px-6 py-3 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full hover:bg-indigo-500 hover:text-white transition-all cursor-pointer"
                                    >
                                        Explore Collection
                                    </button>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Gallery />
        </div>
    );
};
