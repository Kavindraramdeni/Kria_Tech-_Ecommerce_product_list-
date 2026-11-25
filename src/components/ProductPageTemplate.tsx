import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, X, Camera, ShoppingCart, Check, Eye, HelpCircle, MessageCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { CategoryData, ProductItem } from '../data/signs';
import { ContactDialog } from './shared/ContactDialog';
import { OptimizedImage } from './ui/OptimizedImage';
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
  const productDialogRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useECommerce();

  useEffect(() => {
    if (!quickViewProduct) return;
    setSelectedShape(quickViewProduct.options?.shapes?.[0]?.label || 'Standard');
    setSelectedSize(quickViewProduct.options?.sizes?.[0]?.label || 'Standard');
    setCustomText('');
  }, [quickViewProduct]);

  useEffect(() => {
    if (!quickViewProduct) return;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialog = productDialogRef.current;
    const selector = 'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';
    const getFocusable = () => Array.from(dialog?.querySelectorAll<HTMLElement>(selector) || []);
    getFocusable()[0]?.focus();
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setQuickViewProduct(null);
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = getFocusable();
      if (!focusable.length) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [quickViewProduct]);

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
    
    const message = [
      "Hello Kria Tech! I'm interested in:",
      `Product: ${product.title}`,
      `Category: ${data.hero.title}`,
      `Shape: ${selectedShape || 'Standard'}`,
      `Size: ${selectedSize || 'Standard'}`,
      `Custom text: ${customText.trim() || 'None'}`,
      `Estimated starting price: ₹${finalPrice}`,
      "Please confirm the final quote, availability and dispatch details."
    ].join('\n');
    window.open(`https://wa.me/919000376792?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const handleHelpWhatsApp = (product: ProductItem) => {
    const message = [
      "Hello Kria Tech! I need help with this product:",
      `Product: ${product.title}`,
      `Category: ${data.hero.title}`,
      "Could you please share more details?"
    ].join('\n');
    window.open(`https://wa.me/919000376792?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
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
      <div className="relative z-40 px-4 pt-24 pb-4 md:pt-28 flex justify-between items-center">
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
      <section className="pt-8 pb-20 md:pt-12 md:pb-32 bg-gray-50 dark:bg-gray-900/50">
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
                                aria-pressed={selectedSubCategory === cat}
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

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
                {filteredProducts.map((product, index) => (
                    <motion.article
                        key={product.id}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: Math.min(index * 0.025, 0.2) }}
                        className="group flex h-full w-full flex-col rounded-2xl sm:rounded-3xl border border-gray-200/80 bg-white p-2.5 sm:p-3 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
                    >
                        <div className="relative aspect-[4/4.4] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-950 sm:aspect-square sm:rounded-2xl">
                            <OptimizedImage src={product.imageSrc} alt={product.title} width={600} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            {product.category && <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-indigo-700 shadow-sm backdrop-blur dark:bg-gray-950/85 dark:text-indigo-300">{product.category}</span>}
                            {product.isSoldOut && <div className="absolute inset-0 flex items-center justify-center bg-black/55 p-2"><span className="rounded-full bg-red-600 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-white">Sold out</span></div>}
                        </div>
                        <div className="flex flex-1 flex-col px-1 pb-1 pt-3">
                            <h3 className="line-clamp-2 min-h-10 text-[11px] font-extrabold leading-snug text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400 sm:text-sm">{product.title}</h3>
                            <div className="mt-auto pt-3">
                                <div className="mb-3 flex min-h-6 flex-wrap items-baseline gap-2">
                                    <span className="text-sm font-black text-gray-950 dark:text-white sm:text-base">{product.pricePrefix ? product.pricePrefix + ' ' : ''}₹{Number(product.price || 0).toLocaleString('en-IN')}{product.priceSuffix ? ' ' + product.priceSuffix : ''}</span>
                                    {product.originalPrice && product.originalPrice > (product.price || 0) && <span className="text-[10px] text-gray-400 line-through sm:text-xs">₹{Number(product.originalPrice).toLocaleString('en-IN')}</span>}
                                </div>
                                <button type="button" disabled={product.isSoldOut} onClick={() => setQuickViewProduct(product)} aria-label={product.isSoldOut ? product.title + ' is sold out' : 'Customise and enquire about ' + product.title} className="inline-flex min-h-10 w-full items-center justify-center rounded-xl bg-indigo-600 px-2 py-2.5 text-[9px] font-black uppercase tracking-wider text-white transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700 sm:text-[10px]">
                                    {product.isSoldOut ? 'Unavailable' : 'Customise & Enquire'}
                                </button>
                            </div>
                        </div>
                    </motion.article>
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
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby="category-product-dialog-title"
                      ref={productDialogRef}
                      tabIndex={-1}
                      className="relative max-w-5xl w-full max-h-[94dvh] sm:max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl sm:rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-white/10"
                      onClick={(e) => e.stopPropagation()}
                  >
                      {/* Left: Image */}
                      <div className="w-full md:w-1/2 h-48 sm:h-64 md:h-auto md:min-h-[600px] relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                          <OptimizedImage
                              src={quickViewProduct.imageSrc}
                              alt={quickViewProduct.title}
                              width={800}
                              className="w-full h-full object-cover"
                          />
                      </div>

                      {/* Right: Info */}
                      <div className="flex-1 px-5 py-7 sm:p-8 md:p-10 overflow-y-auto custom-scrollbar">
                          <div className="flex justify-between items-start mb-6">
                              <div>
                                  <h3 id="category-product-dialog-title" className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none mb-4">
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
                                  type="button"
                                  aria-label="Close product customisation"
                                  className="flex p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:scale-110 transition-transform"
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
                                      {(quickViewProduct.options?.shapes?.length ? quickViewProduct.options.shapes : [{ label: 'Standard', priceModifier: 0 }]).map(shape => (
                                          <button
                                              key={shape.label}
                                              onClick={() => setSelectedShape(shape.label)}
                                              aria-pressed={selectedShape === shape.label}
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
                                      {(quickViewProduct.options?.sizes?.length ? quickViewProduct.options.sizes : [{ label: 'Standard', priceModifier: 0 }]).map(size => (
                                          <button
                                              key={size.label}
                                              onClick={() => setSelectedSize(size.label)}
                                              aria-pressed={selectedSize === size.label}
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
                                  <label htmlFor="category-product-custom-text" className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Custom Text / Message</label>
                                  <textarea
                                      id="category-product-custom-text"
                                      value={customText}
                                      onChange={(e) => setCustomText(e.target.value)}
                                      placeholder="Enter your message here..."
                                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-opacity-50 transition-all outline-none dark:text-white"
                                      rows={3}
                                  />
                              </div>
                          </div>

                          <div className="mb-5 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-800">
                              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Estimated configuration price</span>
                              <span className="text-lg font-black text-gray-950 dark:text-white">₹{Number(currentPrice).toLocaleString('en-IN')}</span>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col sm:flex-row gap-3">
                              <button
                                  type="button"
                                  onClick={() => {
                                    handleAddToCart(quickViewProduct);
                                    setQuickViewProduct(null);
                                  }}
                                  className="flex-1 py-4 rounded-2xl bg-gray-900 dark:bg-gray-700 text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all hover:bg-gray-800"
                              >
                                  <ShoppingCart size={18} /> Add to Enquiry List
                              </button>
                              <button
                                  type="button"
                                  onClick={() => handleWhatsAppBuy(quickViewProduct)}
                                  className={`flex-[2] py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all ${primaryBtnVariants[primaryColor]}`}
                              >
                                  <MessageCircle size={18} /> WhatsApp Quote
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
