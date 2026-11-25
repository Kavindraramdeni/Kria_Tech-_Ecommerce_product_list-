import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, X, Camera, ShoppingCart, Check, Eye, HelpCircle, MessageCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { CategoryData, ProductItem } from '../data/signs';
import { ContactDialog } from './shared/ContactDialog';
import { useECommerce } from '../context/ECommerceContext';

interface ProductPageTemplateProps {
  data: CategoryData;
  onNavigateBack: () => void;
  primaryColor?: string;
}

const IconLoader = ({ name, size = 24 }: { name: string; size?: number }) => {
  const Icon = (LucideIcons as any)[name];
  return Icon ? <Icon size={size} /> : null;
};

export const ProductPageTemplate: React.FC<ProductPageTemplateProps> = ({ 
  data, 
  onNavigateBack,
  primaryColor = "indigo"
}) => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [customText, setCustomText] = useState("");
  const [addedProducts, setAddedProducts] = useState<Record<string, boolean>>({});
  const { addToCart } = useECommerce();

  const categories = React.useMemo(() => {
    const cats = new Set<string>();
    data.products.forEach(p => {
      if (p.category) {
        cats.add(p.category);
      }
    });
    if (cats.size > 0) {
      return ['All', ...Array.from(cats)];
    }
    return [];
  }, [data.products]);

  const [selectedSubCategory, setSelectedSubCategory] = useState('All');

  const filteredProducts = React.useMemo(() => {
    if (selectedSubCategory === 'All') return data.products;
    return data.products.filter(p => p.category === selectedSubCategory);
  }, [data.products, selectedSubCategory]);

  const handleDirectAddToCart = (e: React.MouseEvent, product: ProductItem) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      title: product.title,
      imageSrc: product.imageSrc,
      description: product.description,
      price: product.price || 0,
      category: data.hero.title
    });
    setAddedProducts(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedProducts(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const handleOpenDialog = (title: string) => {
    setSelectedProduct(title);
    setIsDialogOpen(true);
  };

  const handleAddToCart = (product: ProductItem) => {
    const shapeMod = product.options?.shapes?.find(s => s.label === selectedShape)?.priceModifier || 0;
    const sizeMod = product.options?.sizes?.find(s => s.label === selectedSize)?.priceModifier || 0;
    
    const configuredPrice = (product.price || 0) + shapeMod + sizeMod;
    const selectedVariants = {
      ...(selectedShape ? { Shape: selectedShape } : {}),
      ...(selectedSize ? { Size: selectedSize } : {})
    };

    addToCart({
      id: product.id,
      title: product.title,
      imageSrc: product.imageSrc,
      price: product.price || 0,
      category: data.hero.title
    }, {
      title: [product.title, selectedShape, selectedSize].filter(Boolean).join(' · '),
      price: configuredPrice,
      selectedVariants,
      customText: customText.trim()
    });
  };

  const handleWhatsAppBuy = (product: ProductItem) => {
    const shapeMod = product.options?.shapes?.find(s => s.label === selectedShape)?.priceModifier || 0;
    const sizeMod = product.options?.sizes?.find(s => s.label === selectedSize)?.priceModifier || 0;
    const finalPrice = (product.price || 0) + shapeMod + sizeMod;
    
    const message = `Hello Kria Tech! I'm interested in: *${product.title}*%0A*Category:* ${data.hero.title}%0A*Shape:* ${selectedShape || 'Standard'}%0A*Size:* ${selectedSize || 'Standard'}%0A*Custom Text:* ${customText || 'None'}%0A*Estimated Price:* ₹${finalPrice}%0A%0APlease help me with the order!`;
    window.open(`https://wa.me/919000376792?text=${message}`, '_blank');
  };

  const handleHelpWhatsApp = (product: ProductItem) => {
    const message = `Hello Kria Tech! I need help with: *${product.title}*%0A*Category:* ${data.hero.title}%0A%0ACan you provide more details?`;
    window.open(`https://wa.me/919000376792?text=${message}`, '_blank');
  };

  const colorVariants: Record<string, string> = {
    indigo: "text-indigo-600 bg-indigo-50 border-indigo-100 hover:bg-indigo-600 hover:text-white",
    blue: "text-blue-600 bg-blue-50 border-blue-100 hover:bg-blue-600 hover:text-white",
    orange: "text-orange-600 bg-orange-50 border-orange-100 hover:bg-orange-600 hover:text-white",
    green: "text-green-600 bg-green-50 border-green-100 hover:bg-green-600 hover:text-white",
  };

  const primaryBtnVariants: Record<string, string> = {
    indigo: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200",
    blue: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200",
    orange: "bg-orange-600 hover:bg-orange-700 text-white shadow-orange-200",
    green: "bg-green-600 hover:bg-green-700 text-white shadow-green-200",
  };

  const bgVariants: Record<string, string> = {
    indigo: "bg-indigo-600 hover:bg-indigo-700",
    blue: "bg-blue-600 hover:bg-blue-700",
    orange: "bg-orange-600 hover:bg-orange-700",
    green: "bg-green-600 hover:bg-green-700",
  };

  const shadowVariants: Record<string, string> = {
    indigo: "shadow-indigo-500/20",
    blue: "shadow-blue-500/20",
    orange: "shadow-orange-500/20",
    green: "shadow-green-500/20",
  };

  const currentPrice = quickViewProduct ? (
    (quickViewProduct.price || 0) + 
    (quickViewProduct.options?.shapes?.find(s => s.label === selectedShape)?.priceModifier || 0) + 
    (quickViewProduct.options?.sizes?.find(s => s.label === selectedSize)?.priceModifier || 0)
  ) : 0;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      {/* Back Header */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center pointer-events-none">
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={onNavigateBack}
          className="pointer-events-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-3 md:p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white hover:scale-110 transition-all flex items-center gap-2 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest hidden md:block">Go Back</span>
        </motion.button>
      </div>

      {/* Products Grid */}
      <section className="pt-24 pb-20 md:pt-32 md:pb-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 mb-12 md:mb-16">
                <div className="max-w-2xl">
                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none mb-4">
                        Explore Our <span className={`text-${primaryColor}-600`}>Solutions</span>
                    </h2>
                    <p className="text-sm md:text-lg text-gray-600 dark:text-gray-400 font-medium italic">
                        Premium collections crafted to your unique specifications.
                    </p>
                </div>
                {categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedSubCategory(cat)}
                                className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-[10px] border transition-all cursor-pointer ${
                                    selectedSubCategory === cat
                                        ? primaryColor === 'orange'
                                            ? 'bg-orange-600 border-orange-600 text-white'
                                            : primaryColor === 'indigo'
                                            ? 'bg-indigo-600 border-indigo-600 text-white'
                                            : primaryColor === 'blue'
                                            ? 'bg-blue-600 border-blue-600 text-white'
                                            : 'bg-green-600 border-green-600 text-white'
                                        : 'bg-white dark:bg-gray-800 border-gray-150 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-x-2.5 gap-y-6 sm:gap-6 md:gap-8">
                {filteredProducts.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.03 }}
                        className="group relative w-full flex flex-col items-center bg-transparent border-none shadow-none cursor-pointer text-center select-none h-full"
                        onClick={() => setQuickViewProduct(product)}
                    >
                        <div className="relative w-full aspect-square overflow-hidden bg-gray-50 dark:bg-gray-950 rounded-[20px] sm:rounded-[24px]">
                            <img 
                                src={product.imageSrc} 
                                alt={product.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                                referrerPolicy="no-referrer"
                            />
                            {product.isSoldOut && (
                                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-2">
                                    <span className="px-3 py-1.5 bg-red-600 text-white rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest shadow-lg">
                                        Sold Out
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="pt-3 pb-1 px-1 sm:px-2 flex flex-col items-center flex-grow select-text">
                            <h3 className="text-[10px] sm:text-[11px] md:text-xs font-extrabold text-gray-900 dark:text-white uppercase tracking-tight line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                {product.title}
                            </h3>
                            {/* Price display removed */}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 flex items-center justify-center overflow-hidden bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto"
            >
                <div className={`inline-block px-4 py-1.5 rounded-full ${colorVariants[primaryColor].split(' ').slice(0, 3).join(' ')} mb-6`}>
                    <span className="text-[10px] font-black uppercase tracking-widest">{data.hero.subtitle}</span>
                </div>
                <h2 className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-6 leading-[0.9]">
                    {data.hero.title}
                </h2>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto">
                    {data.hero.description}
                </p>
            </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 md:py-32 relative bg-gray-50 dark:bg-gray-900/30">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                {data.features.map((feature, index) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group"
                    >
                        <div className={`w-12 h-12 md:w-16 md:h-16 ${colorVariants[primaryColor].split(' ').slice(0, 3).join(' ')} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            <IconLoader name={feature.icon} size={24} />
                        </div>
                        <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-3">{feature.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {createPortal(
        <AnimatePresence>
          {quickViewProduct && (
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-xl"
                  onClick={() => setQuickViewProduct(null)}
              >
                  <motion.div 
                      initial={{ scale: 0.9, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      className="relative max-w-5xl w-full max-h-[90vh] bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-white/10"
                      onClick={(e) => e.stopPropagation()}
                  >
                      {/* Left: Image */}
                      <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                          <img 
                              src={quickViewProduct.imageSrc} 
                              className="w-full h-full object-cover" 
                              referrerPolicy="no-referrer"
                          />
                          <button 
                              onClick={() => setQuickViewProduct(null)}
                              className="absolute top-6 left-6 bg-white/90 dark:bg-gray-900/90 p-3 rounded-2xl shadow-xl md:hidden"
                          >
                              <X size={20} />
                          </button>
                      </div>

                      {/* Right: Info */}
                      <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                          <div className="flex justify-between items-start mb-6">
                              <div>
                                  <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none mb-4">
                                      {quickViewProduct.title}
                                  </h3>
                                  <div className="flex flex-wrap gap-3 items-center">
                                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                          {data.hero.title}
                                      </span>
                                  </div>
                              </div>
                              <button 
                                  onClick={() => setQuickViewProduct(null)}
                                  className="hidden md:flex p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:scale-110 transition-transform"
                              >
                                  <X size={24} />
                              </button>
                          </div>

                          <p className="text-gray-600 dark:text-gray-400 font-medium mb-8 leading-relaxed">
                              {quickViewProduct.description}
                          </p>

                          {/* Options */}
                          <div className="space-y-8 mb-10">
                              {/* Shape Selector */}
                              <div>
                                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Select Shape</label>
                                  <div className="flex flex-wrap gap-2">
                                      {(quickViewProduct.options?.shapes || [
                                          { label: 'Standard', priceModifier: 0 },
                                          { label: 'Rectangle', priceModifier: 500 },
                                          { label: 'Custom', priceModifier: 1500 }
                                      ]).map(shape => (
                                          <button
                                              key={shape.label}
                                              onClick={() => setSelectedShape(shape.label)}
                                              className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${
                                                  selectedShape === shape.label 
                                                  ? `${bgVariants[primaryColor]} text-white border-transparent` 
                                                  : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-indigo-200'
                                              }`}
                                          >
                                              {shape.label}
                                          </button>
                                      ))}
                                  </div>
                              </div>

                              {/* Size Selector */}
                              <div>
                                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Select Size</label>
                                  <div className="flex flex-wrap gap-2">
                                      {(quickViewProduct.options?.sizes || [
                                          { label: 'Standard', priceModifier: 0 },
                                          { label: 'Large', priceModifier: 2000 }
                                      ]).map(size => (
                                          <button
                                              key={size.label}
                                              onClick={() => setSelectedSize(size.label)}
                                              className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${
                                                  selectedSize === size.label 
                                                  ? `${bgVariants[primaryColor]} text-white border-transparent` 
                                                  : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-indigo-200'
                                              }`}
                                          >
                                              {size.label}
                                          </button>
                                      ))}
                                  </div>
                              </div>

                              {/* Custom Text */}
                              <div>
                                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Custom Text / Message</label>
                                  <textarea
                                      value={customText}
                                      onChange={(e) => setCustomText(e.target.value)}
                                      placeholder="Enter your message here..."
                                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-opacity-50 transition-all outline-none dark:text-white"
                                      rows={3}
                                  />
                              </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col sm:flex-row gap-4">
                              <button 
                                  onClick={() => handleWhatsAppBuy(quickViewProduct)}
                                  className={`flex-[2] py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all ${primaryBtnVariants[primaryColor]}`}
                              >
                                  <ShoppingCart size={20} /> Buy Now (WhatsApp)
                              </button>
                              <button 
                                  onClick={() => handleHelpWhatsApp(quickViewProduct)}
                                  className="flex-1 py-5 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                              >
                                  <HelpCircle size={18} /> Help
                              </button>
                          </div>
                      </div>
                  </motion.div>
              </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <ContactDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        initialService={selectedProduct || ""}
      />
    </div>
  );
};
