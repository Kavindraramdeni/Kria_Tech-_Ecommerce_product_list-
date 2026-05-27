import React from 'react';
import { motion } from 'motion/react';
import { Download, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OptimizedImage } from '../components/ui/OptimizedImage';
import { SEO } from '../components/shared/SEO';

const categories = [
  {
    title: "LED Wall Decor",
    description: "Spiritual, Sports, and Artistic LED-integrated wall pieces.",
    image: "/images/led-decor/master.jpg",
    link: "/signature-wall-decor",
    gallery: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"].map(char => `/images/led-decor/${char}.jpg`)
  },
  {
    title: "MDF Wall Arts",
    description: "Precision-cut 3D wall decor, silhouettes, and artistic collections.",
    image: "/images/mdf-arts/master.jpg",
    link: "/signature-wall-decor",
    gallery: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"].map(char => `/images/mdf-arts/${char}.jpg`)
  },
  {
    title: "DreamNeon Wall Arts",
    description: "Vibrant neon designs to light up your space with modern energy and style.",
    image: "/images/neon/master.jpg",
    link: "/signature-wall-decor",
    gallery: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"].map(char => `/images/neon/${char}.jpg`)
  },
  {
    title: "Polaroid Floating Frames",
    description: "Premium acrylic magnetic frames available in custom shapes (heart, circle, cloud) and sizes.",
    image: "/images/polaroids/master.jpg",
    link: "/personalized-gifts",
    gallery: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"].map(char => `/images/polaroids/${char}.jpg`)
  },
];

export const CataloguePage: React.FC = () => {
  return (
    <div className="pt-24 pb-24 bg-white dark:bg-gray-950 min-h-screen">
      <SEO 
        title="Product Catalogue" 
        description="Browse our comprehensive catalogue of custom signs, personalized gifts, and educational kits." 
        canonical="/catalogue"
      />
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8"
          >
            Our <br />
            <span className="text-indigo-600">Catalogue</span>
          </motion.h1>
          <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
            Explore our complete range of creative fabrication products. From commercial signage to bespoke home decor.
          </p>
        </div>

        <div className="space-y-24">
          {categories.map((cat, index) => (
            <div key={index} className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight">{cat.title}</h3>
                    <Link to={cat.link} className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all">
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-lg font-medium max-w-2xl">{cat.description}</p>
                </div>
              </motion.div>

              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-2.5 gap-y-6 sm:gap-4">
                {cat.gallery.map((img, imgIndex) => (
                  <motion.div
                    key={imgIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: imgIndex * 0.02 }}
                    className="aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
                  >
                    <OptimizedImage 
                      src={img} 
                      alt={`${cat.title} item ${imgIndex + 1}`} 
                      className="w-full h-full hover:scale-110 transition-transform duration-500"
                      width={300}
                      height={300}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <motion.div 
          id="pdf-catalogue"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32 p-12 md:p-20 bg-indigo-600 rounded-[3rem] text-white text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Download Full PDF</h2>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-2xl mx-auto font-medium">
              Get our complete product catalogs with detailed specifications and pricing options.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center pt-8">
              <button className="px-10 py-5 bg-black text-white font-black uppercase tracking-widest text-sm rounded-full hover:bg-gray-900 transition-all flex items-center justify-center gap-3">
                <Download size={20} />
                Wall Art
              </button>
              <button className="px-10 py-5 bg-white text-indigo-600 font-black uppercase tracking-widest text-sm rounded-full hover:bg-indigo-50 transition-all flex items-center justify-center gap-3">
                <Download size={20} />
                Neon Wall Art
              </button>
              <button className="px-10 py-5 bg-indigo-950 text-white font-black uppercase tracking-widest text-sm rounded-full hover:bg-indigo-900 transition-all flex items-center justify-center gap-3">
                <Download size={20} />
                Signage
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
