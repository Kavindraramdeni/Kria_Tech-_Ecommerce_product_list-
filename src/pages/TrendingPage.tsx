import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, X, Camera, Filter, Search } from 'lucide-react';
import { ContactDialog } from '../components/shared/ContactDialog';
import { OptimizedImage } from '../components/ui/OptimizedImage';
import { SEO } from '../components/shared/SEO';

// --- Fallback Mock Data ---
const MOCK_PROJECTS = [
  { id: '1', title: 'Luxury Acrylic Wall Art', category: 'Decor', description: 'Museum-grade wall art featuring high-definition prints on premium clear acrylic.', imageSrc: '/images/trending/project-1.jpg' },
  { id: '2', title: 'Magnetic Floating Photo Frame', category: 'Decor', description: 'Minimalist magnetic frame system for a premium floating effect on any wall.', imageSrc: '/images/trending/project-2.jpg' },
  { id: '3', title: 'Artisan Neon Sculpture', category: 'Decor', description: 'Handcrafted neon sign featuring artistic typography to elevate your interior mood.', imageSrc: '/images/trending/project-3.jpg' },
  { id: '4', title: 'LED Border Mirror Decor', category: 'Decor', description: 'Edge-lit LED display that serves as both a functional mirror and a stunning art piece.', imageSrc: '/images/trending/project-4.jpg' },
  { id: '5', title: 'Premium Acrylic Coffee Branding', category: 'Signage', description: 'High-visibility LED 3D light box for premium retail and cafe identification.', imageSrc: '/images/trending/project-5.jpg' },
  { id: '6', title: 'Personalized Archival Prints', category: 'Gifts', description: 'Turn your favorite memories into premium high-gloss acrylic masterpieces.', imageSrc: '/images/trending/project-6.jpg' },
];

const categories = ['All', 'Decor', 'Signage', 'Gifts', 'Educational'];

interface TrendingProject {
    id: string;
    title: string;
    category: string;
    description: string;
    imageSrc: string;
}

export interface TrendingPageProps {
  onNavigate?: (page: string, anchor?: string) => void;
}

export const TrendingPage: React.FC<TrendingPageProps> = ({ onNavigate }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects] = useState<TrendingProject[]>(MOCK_PROJECTS);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter(p => p.category === activeCategory);
  }, [activeCategory, projects]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.1 }
  };
  
  const handleWhatsAppInquiry = (project: TrendingProject) => {
    const message = `Hello Kria Tech! I saw this on your Trending page and I'm interested in something similar: *${project.title}*%0A*Category:* ${project.category}%0A%0ACan you help me with a similar design?`;
    window.open(`https://wa.me/919000376792?text=${message}`, '_blank');
  };
  
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <SEO 
        title="Trending Projects" 
        description="Explore our latest custom creations, fabrication projects, and trending designs in signage and acrylic art." 
        canonical="/trending"
      />
      <main>
        <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-950 flex items-center justify-center transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="relative w-full max-w-6xl mx-auto py-12 md:py-16 rounded-[2rem] overflow-hidden border border-gray-200/50 dark:border-gray-800">
                    {/* Localized Background Image */}
                    <div className="absolute inset-0 z-0">
                        <OptimizedImage 
                          priority
                          src="/images/trending/hero-bg.jpg" 
                          alt="Custom interior designs" 
                          className="w-full h-full object-cover opacity-20 dark:opacity-60" 
                          width={1200}
                          blur={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/95 via-indigo-100/60 to-white/95 dark:from-indigo-950/95 dark:via-indigo-900/40 dark:to-black/90"></div>
                    </div>

                    <div className="relative z-10 text-center px-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1, duration: 0.6 }}
                        >
                            <motion.span 
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                              className="inline-flex items-center px-4 py-1.5 mb-6 text-xs font-black tracking-widest uppercase bg-indigo-600 dark:bg-indigo-500 text-white rounded-full shadow-lg shadow-indigo-600/25"
                            >
                              <Sparkles className="w-3 h-3 mr-2" />
                              Hot & Fresh
                            </motion.span>
                            <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-gray-900 dark:text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                                Trending <br/><span className="text-indigo-600 dark:text-indigo-400 italic">Now</span>
                            </h1>
                            <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-gray-600 dark:text-indigo-100/80 font-medium leading-relaxed mb-6">
                                Discover our most popular custom-made projects, fresh from the workshop.
                            </p>
                            {onNavigate && (
                              <div className="flex justify-center mt-4">
                                <button
                                  onClick={() => onNavigate('catalogue')}
                                  className="px-6 py-3 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg hover:scale-103 active:scale-97 flex items-center gap-2 group cursor-pointer"
                                >
                                  Explore Our Catalogue
                                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform animate-pulse" />
                                </button>
                              </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-10 md:py-16 bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                  {...fadeInUp}
                  className="flex flex-col md:flex-row items-center justify-between mb-8 gap-8"
                >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-2 bg-indigo-600 rounded-full"></div>
                      <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Latest Creations</h2>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 active:scale-95 ${
                                    activeCategory === category
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                                        : 'bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </motion.div>
                
                <motion.div 
                  layout
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true }}
                  className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div 
                              key={project.id}
                              layout
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              whileHover={{ y: -8 }}
                              className="group bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl overflow-hidden h-full flex flex-col border border-gray-100/80 dark:border-gray-700 transition-all duration-500"
                            >
                                <div 
                                  className="relative overflow-hidden aspect-[4/5] cursor-pointer"
                                  onClick={() => setSelectedImage(project.imageSrc)}
                                >
                                    <OptimizedImage 
                                      src={project.imageSrc} 
                                      alt={project.title} 
                                      width={800}
                                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Camera className="text-white w-6 h-6 sm:w-10 sm:h-10" />
                                    </div>
                                    <span className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-indigo-700 dark:text-indigo-400 text-[8px] sm:text-[10px] font-black uppercase tracking-widest px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-md">
                                      {project.category}
                                    </span>
                                </div>
                                <div className="p-3.5 sm:p-6 flex flex-col flex-grow items-center text-center justify-between gap-3 sm:gap-4">
                                    <h3 className="text-xs sm:text-base md:text-lg font-black text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug uppercase tracking-tight line-clamp-2">
                                      {project.title}
                                    </h3>
                                    <button 
                                      onClick={() => handleWhatsAppInquiry(project)}
                                      className="w-full py-2 sm:py-3 rounded-lg sm:rounded-xl bg-indigo-600 text-white font-black text-[9px] sm:text-xs uppercase tracking-wider sm:tracking-widest flex items-center justify-center group/btn transition-all hover:bg-indigo-700 shadow-md"
                                    >
                                      Order Similar 
                                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
                 
                <AnimatePresence>
                  {filteredProjects.length === 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="text-center py-32"
                      >
                          <div className="max-w-md mx-auto">
                            <Search className="w-20 h-20 text-gray-200 dark:text-gray-800 mx-auto mb-8" />
                            <p className="text-gray-400 dark:text-gray-600 text-xl font-bold uppercase tracking-tight">
                              No trending projects in this category yet.
                            </p>
                            <p className="mt-2 text-gray-500 dark:text-gray-500">We're working on something fresh!</p>
                          </div>
                      </motion.div>
                   )}
                </AnimatePresence>
            </div>
        </section>
        
        <section className="relative py-16 md:py-20 overflow-hidden border-t border-gray-150/40 dark:border-gray-850/40 bg-indigo-50/50 dark:bg-indigo-950/30 transition-colors duration-300">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-indigo-200 dark:bg-indigo-800 rounded-full blur-[120px] opacity-30 dark:opacity-40"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-200 dark:bg-blue-800 rounded-full blur-[100px] opacity-20 dark:opacity-30"></div>
            
            <div className="container mx-auto px-4 text-center relative z-10">
                <motion.div {...fadeInUp}>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter leading-none">
                      Have an Idea? <br/><span className="text-indigo-600 dark:text-indigo-200 italic">Let's Make It Trend.</span>
                    </h2>
                    <p className="mt-2 text-base md:text-lg text-gray-650 dark:text-indigo-100 max-w-2xl mx-auto mb-8 font-medium">
                      Inspired by our work? We can create a one-of-a-kind piece just for you.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => {
                              const message = "Hello Kria Tech! I'm interested in getting a custom quote for a project.";
                              window.open(`https://wa.me/919000376792?text=${message}`, '_blank');
                            }}
                            className="w-full sm:w-auto px-8 py-4 text-sm sm:text-base font-black text-white dark:text-indigo-950 bg-indigo-600 dark:bg-white rounded-full shadow-lg hover:bg-indigo-700 dark:hover:bg-gray-50 transition-all transform hover:scale-105 active:scale-95 uppercase tracking-widest cursor-pointer"
                        >
                            Get a WhatsApp Quote
                        </button>
                        {onNavigate && (
                          <button
                              onClick={() => onNavigate('catalogue')}
                              className="w-full sm:w-auto px-8 py-4 text-sm sm:text-base font-black text-indigo-600 dark:text-white bg-white dark:bg-white/10 border border-indigo-600 dark:border-white/20 rounded-full shadow-lg hover:bg-indigo-50 dark:hover:bg-white/20 transition-all transform hover:scale-105 active:scale-95 uppercase tracking-widest cursor-pointer"
                          >
                              Explore Our Catalogue
                          </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-10 h-10" />
            </button>
            <OptimizedImage
              src={selectedImage}
              alt="Gallery Preview"
              className="max-w-full max-h-full rounded-lg shadow-2xl"
              width={1200}
              onClick={(e) => e?.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <ContactDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        initialService="General Inquiry"
      />
    </div>
  );
};
