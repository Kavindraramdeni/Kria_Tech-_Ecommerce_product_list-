import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, X, ShoppingCart, Check, Search, Upload, Type, 
  Image as ImageIcon, HelpCircle, MessageCircle, ChevronDown, 
  Sparkles, Heart, Star, ShoppingBag, Zap, Flame, MoveRight
} from 'lucide-react';
import { useECommerce, Product } from '../../context/ECommerceContext';
import { OptimizedImage } from '../ui/OptimizedImage';
import { PRODUCT_CATEGORIES } from '../../constants/products';
import { GIFTS_DATA } from '../../data/gifts';

interface ProductCardProps {
  product: any;
  onQuickView: (product: any) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const handleCardClick = () => {
    onQuickView(product);
  };

  const getShortCategory = (cat: string) => {
    if (!cat) return "DECOR";
    const c = cat.toLowerCase();
    if (c.includes("wall") || c.includes("decor") || c.includes("home")) return "DECOR";
    if (c.includes("sign")) return "SIGNAGE";
    if (c.includes("kids") || c.includes("learn")) return "EDUCATIONAL";
    if (c.includes("fashion") || c.includes("accessories") || c.includes("gift")) return "GIFTS";
    return "DECOR";
  };

  return (
    <motion.div 
      whileHover={{ y: -6 }}
      onClick={handleCardClick}
      className="group relative w-full flex flex-col bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-850 rounded-[28px] sm:rounded-[32px] p-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-none transition-all duration-300 cursor-pointer select-none h-full"
      id={`product-${product.id}`}
    >
      {/* Upper part: Image container */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100 dark:bg-gray-950 rounded-2xl flex items-center justify-center">
        {/* Fallback Camera Icon Centered */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 group-hover:opacity-40 transition-opacity">
          <svg className="w-10 h-10 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
          </svg>
        </div>

        {/* Real Product Image */}
        <OptimizedImage 
          src={product.imageSrc} 
          alt={product.title} 
          width={600}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-103" 
        />
        
        {/* Floating pill category tag */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <span className="px-3.5 py-1.5 bg-white text-[9px] font-black uppercase tracking-widest text-indigo-600 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-gray-100">
            {getShortCategory(product.category)}
          </span>
        </div>

        {/* Sold Out badge */}
        {product.isSoldOut && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center p-2 z-20">
            <span className="px-3.5 py-1.5 bg-red-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Title & Action Section */}
      <div className="pt-3 pb-1 px-1 flex flex-col justify-between flex-grow">
        <h3 className="text-center font-extrabold uppercase text-[12px] sm:text-[13px] md:text-sm tracking-tight text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 line-clamp-2 min-h-[2.5rem] flex items-center justify-center leading-snug">
          {product.title}
        </h3>

        <div className="mt-3.5 space-y-2">
          <div className="flex items-center justify-center gap-2 min-h-6">
            <span className="text-sm sm:text-base font-black text-gray-900 dark:text-white">
              {product.pricePrefix ? `${product.pricePrefix} ` : ''}₹{Number(product.price || 0).toLocaleString('en-IN')}{product.priceSuffix ? ` ${product.priceSuffix}` : ''}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[10px] sm:text-xs text-gray-400 line-through">₹{Number(product.originalPrice).toLocaleString('en-IN')}</span>
            )}
          </div>
          <button
            type="button"
            disabled={product.isSoldOut}
            onClick={(event) => { event.stopPropagation(); onQuickView(product); }}
            aria-label={product.isSoldOut ? `${product.title} is sold out` : `Customise and enquire about ${product.title}`}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-black text-[10px] sm:text-xs uppercase tracking-widest py-3 px-2 sm:px-4 rounded-2xl flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed"
          >
            {product.isSoldOut ? 'Currently Unavailable' : 'Customise & Enquire'} <MoveRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const QuickViewModal: React.FC<{ product: any | null; onClose: () => void }> = ({ product, onClose }) => {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [customText, setCustomText] = useState('');
  const [customLogo, setCustomLogo] = useState<File | null>(null);
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  
  // Initialize attributes if available
  useEffect(() => {
    if (product?.variants) {
      const initial: Record<string, string> = {};
      product.variants.forEach((v: any) => {
        initial[v.name] = v.options[0].label;
      });
      setSelectedVariants(initial);
    }
    setCustomText('');
    setCustomLogo(null);
    setSelectedShape(product?.options?.shapes?.[0]?.label || null);
    setSelectedSize(product?.options?.sizes?.[0]?.label || null);
  }, [product]);

  const currentPrice = useMemo(() => {
    if (!product) return 0;
    let price = Number(product.price || 0);

    const shapeOption = product.options?.shapes?.find((option: any) => option.label === selectedShape);
    const sizeOption = product.options?.sizes?.find((option: any) => option.label === selectedSize);
    price += Number(shapeOption?.priceModifier || 0) + Number(sizeOption?.priceModifier || 0);

    if (product.variants) {
      product.variants.forEach((variant: any) => {
        const selectedLabel = selectedVariants[variant.name];
        const selectedOption = variant.options.find((option: any) => option.label === selectedLabel);
        if (selectedOption) price += Number(selectedOption.priceModifier || 0);
      });
    }
    return price;
  }, [product, selectedVariants, selectedShape, selectedSize]);

  const handleWhatsAppBuy = () => {
    if (!product) return;
    const details = [
      'Hello KRIA Tech! I would like a quote for this product.',
      '',
      `Product: ${product.title}`,
      `Category: ${product.category || 'Custom creation'}`,
      `Selected options: ${Object.entries(selectedVariants).map(([key, value]) => `${key}: ${value}`).join(', ') || 'Standard'}`,
      `Shape: ${selectedShape || 'To be confirmed'}`,
      `Size: ${selectedSize || 'To be confirmed'}`,
      `Personalisation: ${customText.trim() || 'None'}`,
      `Displayed starting price: ₹${Number(product.price || 0).toLocaleString('en-IN')}`,
      `Estimated configuration price: ₹${Number(currentPrice).toLocaleString('en-IN')}`,
      `Reference photo selected: ${customLogo ? customLogo.name : 'No photo selected'}`,
      ...(customLogo ? ['I will attach my selected photo in this WhatsApp chat before confirming.'] : []),
      '',
      'Please confirm the final price, production time, delivery charges and available customisation options.'
    ];
    const whatsappUrl = `https://wa.me/919000376792?text=${encodeURIComponent(details.join('\n'))}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleHelpWhatsApp = () => {
    if (!product) return;
    const message = [
      'Hello KRIA Tech! I have a question about this product:',
      `Product: ${product.title}`,
      `Category: ${product.category || 'Custom creation'}`,
      'Please share details, customisation options and a final quote.'
    ].join('\n');
    window.open(`https://wa.me/919000376792?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return createPortal(
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden max-w-5xl w-full shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row relative z-[1001] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lg:w-1/2 h-64 lg:h-auto relative bg-gray-100 dark:bg-gray-800 select-none">
              <OptimizedImage src={product.imageSrc} alt={product.title} className="w-full h-full object-cover" width={800} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              {product.isSoldOut && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex items-center justify-center">
                  <span className="px-6 py-3 bg-red-600 text-white rounded-2xl text-xs sm:text-sm font-black uppercase tracking-widest shadow-2xl">
                    Sold Out
                  </span>
                </div>
              )}
            </div>
            
            <div className="lg:w-1/2 p-8 lg:p-12 overflow-y-auto custom-scrollbar">
              <button 
                onClick={onClose} 
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all z-20 cursor-pointer"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-2xl lg:text-3.5xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tighter leading-none">{product.title}</h2>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg text-[10px] font-black uppercase tracking-widest">{product.category}</span>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed font-medium">
                {product.description || "Our premium custom creations are crafted with precision and care to meet your specific needs."}
              </p>

              <div className="space-y-6 mb-10">
                {product.variants?.map((variant: any) => (
                  <div key={variant.name}>
                    <label className="block text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">{variant.name}</label>
                    <div className="flex flex-wrap gap-2">
                       {variant.options.map((option: any) => (
                         <button
                           key={option.label}
                           disabled={product.isSoldOut}
                           onClick={() => setSelectedVariants(prev => ({ ...prev, [variant.name]: option.label }))}
                           className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border-2 cursor-pointer ${
                             selectedVariants[variant.name] === option.label
                             ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg'
                             : 'border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-indigo-200'
                           }`}
                         >
                           {option.label}
                         </button>
                       ))}
                    </div>
                  </div>
                ))}

                {/* Optional Customizations for Products (e.g. wall or desk) */}
                {!product.isSoldOut && (
                  <>
                    {/* Product-specific shape options */}
                    {product.options?.shapes?.length > 0 && (
                    <div>
                      <label className="block text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Shape</label>
                      <div className="flex flex-wrap gap-2">
                         {product.options.shapes.map((shape: any) => {
                           return (
                             <button
                               key={shape}
                               onClick={() => setSelectedShape(shape)}
                               className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border-2 cursor-pointer ${
                                 selectedShape === shape
                                 ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg'
                                 : 'border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-indigo-200'
                               }`}
                             >
                               {shape}
                             </button>
                           );
                         })}
                      </div>
                    </div>
                    )}

                    {/* Product-specific size options */}
                    {product.options?.sizes?.length > 0 && (
                    <div>
                      <label className="block text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Size</label>
                      <div className="flex flex-wrap gap-2">
                         {product.options.sizes.map((size: any) => {
                            return (
                              <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border-2 cursor-pointer ${
                                  selectedSize === size
                                  ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg'
                                  : 'border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-indigo-200'
                                }`}
                              >
                                {size}
                              </button>
                            );
                         })}
                      </div>
                    </div>
                    )}
                  </>
                )}

                {product.allowCustomText !== false && !product.isSoldOut && (
                  <div>
                    <label className="block text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Type size={14} /> Custom Text / Message
                    </label>
                    <input 
                      type="text" 
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="Enter names, dates, or custom greeting"
                      className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-xl p-4 focus:border-indigo-600 outline-none transition-all dark:text-white font-medium"
                    />
                  </div>
                )}

                {product.allowCustomLogo !== false && !product.isSoldOut && (
                  <div>
                    <label className="block text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Upload size={14} /> Upload Custom Photo
                    </label>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-4">
                        <label className="flex-1 cursor-pointer">
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) setCustomLogo(file);
                            }}
                          />
                          <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-indigo-400 transition-all text-gray-500 text-sm font-bold flex items-center justify-center gap-2">
                            <Upload size={16} /> {customLogo ? 'Change Photo' : 'Choose File'}
                          </div>
                        </label>
                        <span className="text-xs text-gray-400 italic">Highly Recommended</span>
                      </div>
                      {customLogo && (
                        <div className="flex items-center justify-between bg-indigo-50 dark:bg-indigo-900/20 p-2 px-3 rounded-lg border border-indigo-100 dark:border-indigo-800">
                          <div className="flex items-center gap-2 truncate">
                            <ImageIcon size={14} className="text-indigo-600 flex-shrink-0" />
                            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 truncate">{customLogo.name}</span>
                          </div>
                          <button 
                            onClick={() => setCustomLogo(null)}
                            className="text-indigo-600 hover:text-red-500 transition-colors cursor-pointer"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  disabled={product.isSoldOut}
                  onClick={handleWhatsAppBuy}
                  className={`flex-[2] py-5 rounded-2xl text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all shadow-xl cursor-pointer ${
                    product.isSoldOut
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed shadow-none'
                      : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20'
                  }`}
                >
                  <ShoppingCart size={20} /> Buy Now (WhatsApp)
                </button>
                <button 
                  onClick={handleHelpWhatsApp}
                  className="flex-1 py-5 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all cursor-pointer"
                >
                  <HelpCircle size={18} /> Help
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

interface ProductsProps {
  onNavigate: (page: string) => void;
}

export const Products: React.FC<ProductsProps> = ({ onNavigate }) => {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'decor' | 'signage' | 'gifts' | 'educational'>('all');

  const categoryFilters = [
    { id: 'all', label: 'All' },
    { id: 'decor', label: 'Decor' },
    { id: 'signage', label: 'Signage' },
    { id: 'gifts', label: 'Gifts' },
    { id: 'educational', label: 'Educational' }
  ] as const;

  // Combined product database of BOTH Kria Tech original and dense custom items
  const productsDatabase = useMemo(() => {
    const originalProducts = PRODUCT_CATEGORIES.flatMap(cat => cat.products);
    const personalized = GIFTS_DATA?.products || [];
    return [...personalized, ...originalProducts];
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return productsDatabase;
    return productsDatabase.filter(p => {
      const cat = p.category ? p.category.toLowerCase() : '';
      if (activeCategory === 'decor') {
        return (
          cat === 'decor' ||
          cat === 'wall decoratives' ||
          cat === 'desk decoratives' ||
          cat === 'home decoratives' ||
          cat === 'acrylic photo'
        );
      }
      if (activeCategory === 'signage') {
        return cat === 'signage' || cat === 'commercial signage';
      }
      if (activeCategory === 'gifts') {
        return (
          cat === 'gifts' ||
          cat === 'fashion & accessories' ||
          cat === 'car accessories'
        );
      }
      if (activeCategory === 'educational') {
        return cat === 'educational' || cat === 'kids learning';
      }
      return false;
    });
  }, [activeCategory, productsDatabase]);

  // Popular Category Reels config
  const popularReels = [
    { 
      label: "Acrylic Photo", 
      imageSrc: "/images/collections/personalized.jpg", 
      targetId: "popular-albums" 
    },
    { 
      label: "Magnetic Frames", 
      imageSrc: "/images/polaroids/desk-block.jpg", 
      targetId: "modular-wall" 
    },
    { 
      label: "Mouse Pads", 
      imageSrc: "/images/led-decor/logo-sign.jpg", 
      targetId: "modular-desk" 
    },
    { 
      label: "Fridge Magnets", 
      imageSrc: "/images/polaroids/heritage-set.jpg", 
      targetId: "popular-magnets" 
    },
    { 
      label: "Key Chains", 
      imageSrc: "/images/mdf-arts/nature-trio.jpg", 
      targetId: "modular-fashion" 
    },
    { 
      label: "Nameplates", 
      imageSrc: "/images/kids/id-badges.jpg", 
      targetId: "popular-nameplates" 
    }
  ];

  // Specific products handpicked for "NEW IN" - Matches 3-column highlighting: "Magnetic frames, custom Acrylic photo, fridge magnets"
  const newInProducts = useMemo(() => {
    // 1. Transparent Acrylic/Magnetic Frames (Id: pg-wd-14)
    const magneticFrame = GIFTS_DATA.products.find(p => p.id === "pg-wd-14") || {
      id: "pg-wd-14",
      title: "Specialty Magnetic Frames",
      description: "Thick crystal-clear block frames with instant high-energy magnetic polaroid snap mechanism.",
      imageSrc: "/images/polaroids/desk-block.jpg",
      price: 699,
      pricePrefix: "From",
      category: "Wall Decoratives"
    };

    // 2. Custom Acrylic Photo Cutouts (Id: pg-wd-13)
    const acrylicPhoto = GIFTS_DATA.products.find(p => p.id === "pg-wd-13") || {
      id: "pg-wd-13",
      title: "Custom Acrylic Photo Cutouts",
      description: "Dual-ply 6mm acrylic plates precision contour-cut around your custom wedding or baby poses.",
      imageSrc: "/images/polaroids/b.jpg",
      price: 649,
      pricePrefix: "From",
      category: "Wall Decoratives"
    };

    // 3. Polaroid Fridge Magnets (Id: pg-hd-5)
    const fridgeMagnet = GIFTS_DATA.products.find(p => p.id === "pg-hd-5") || {
      id: "pg-hd-5",
      title: "Fridge Magnets (Set of 5)",
      description: "Charming polaroid border fridge tiles with thick high-grade rubberized magnetic backings.",
      imageSrc: "/images/polaroids/heritage-set.jpg",
      price: 149,
      pricePrefix: "From",
      priceSuffix: "Each",
      category: "Home Decoratives"
    };

    return [magneticFrame, acrylicPhoto, fridgeMagnet];
  }, []);

  // Filter lists automatically and keep files neat.
  const wallDecorativesProducts = useMemo(() => {
    return GIFTS_DATA.products.filter(p => p.category === "Wall Decoratives");
  }, []);

  const deskDecorativesProducts = useMemo(() => {
    return GIFTS_DATA.products.filter(p => p.category === "Desk Decoratives");
  }, []);

  const accessoriesFashionProducts = useMemo(() => {
    return GIFTS_DATA.products.filter(p => p.category === "Fashion & Accessories" || p.category === "Car Accessories");
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    const normalizedQuery = searchQuery.toLowerCase();
    return productsDatabase.filter(product => {
      return (
        product.title.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery) ||
        product.description?.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [searchQuery, productsDatabase]);

  const handlePopularClick = (id: string) => {
    // If it's the specific target IDs, we can scroll down nicely
    if (id === "popular-albums") {
      onNavigate('personalized-gifts');
      return;
    }
    if (id === "popular-nameplates") {
      // Find element or scroll to Nameplates product card
      const el = document.getElementById("product-pg-wd-10");
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-4', 'ring-indigo-600', 'transition-all');
        setTimeout(() => el.classList.remove('ring-4', 'ring-indigo-600'), 2500);
      } else {
        const wallSec = document.getElementById("modular-wall");
        wallSec?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }
    if (id === "popular-magnets") {
      const el = document.getElementById("product-pg-hd-5");
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-4', 'ring-indigo-600', 'transition-all');
        setTimeout(() => el.classList.remove('ring-4', 'ring-indigo-600'), 2500);
      } else {
        const deskSec = document.getElementById("modular-desk");
        deskSec?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="products" className="py-12 md:py-24 bg-white dark:bg-gray-950 relative transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        
        {/* Mockup Title & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 select-none pb-4 border-b border-gray-100 dark:border-gray-900">
          <div className="flex items-center gap-3 border-l-[6px] border-indigo-600 pl-4 py-1">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
              Latest Creations
            </h2>
          </div>

          <div className="overflow-x-auto scrollbar-none flex-shrink-0">
            <div className="inline-flex bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-1 rounded-full shadow-sm min-w-max">
              {categoryFilters.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-indigo-600 text-white shadow-[0_4px_12px_rgba(79,70,229,0.25)]'
                      : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 1. Search Bar */}
        <div className="max-w-3xl mx-auto mb-12 relative group px-2 sm:px-0">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search for Love Story Frames, Baby Born Acrylics, Lamps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-900/40 border border-gray-150 dark:border-gray-800 focus:border-indigo-600 rounded-full py-4 sm:py-4.5 pl-14 sm:pl-16 pr-8 outline-none transition-all dark:text-white text-sm sm:text-base font-bold shadow-sm hover:shadow-md"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* CONDITIONAL RENDER: SEARCH RESULTS OR CATEGORIZED HOMEPAGE */}
        {searchQuery !== '' ? (
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center gap-3 border-b border-gray-150 dark:border-gray-800 pb-4">
              <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-lg uppercase tracking-wider">{searchResults.length} Hits</span>
              <h3 className="text-lg font-extrabold text-gray-900 dark:text-white uppercase tracking-tight">Search Results for "{searchQuery}"</h3>
            </div>
            
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-x-2.5 gap-y-6 sm:gap-6 md:gap-8">
                {searchResults.map((product) => (
                  <motion.div 
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full"
                  >
                    <ProductCard product={product} onQuickView={setSelectedProduct} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 dark:bg-gray-900/45 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800/80 max-w-2xl mx-auto">
                <Search size={40} className="mx-auto text-gray-300 mb-4" />
                <h4 className="text-xl font-bold text-gray-400 dark:text-gray-500 mb-1">No matching creations found</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Try playing around with keywords like 'om', 'MDF', 'lamp' or 'photo'.</p>
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="mt-4 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        ) : activeCategory !== 'all' ? (
          <div className="space-y-8 animate-fade-in">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-x-2.5 gap-y-6 sm:gap-6 md:gap-8">
                {filteredProducts.map((product) => (
                  <motion.div 
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full"
                  >
                    <ProductCard product={product} onQuickView={setSelectedProduct} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 dark:bg-gray-900/45 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800/80 max-w-2xl mx-auto">
                <Search size={40} className="mx-auto text-gray-300 mb-4" />
                <h4 className="text-xl font-bold text-gray-400 dark:text-gray-500 mb-1">No products found</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">There are currently no products available under this category filter.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-20">
            
            {/* 3. "NEW IN" - 3-Column Highlighting */}
            <div id="section-new-in" className="scroll-mt-24">
              <div className="relative mb-8 text-center sm:text-left select-none">
                <h4 className="inline-block px-4 py-2 text-xs font-black uppercase tracking-widest text-orange-600 bg-orange-100/60 dark:bg-orange-950/30 dark:text-orange-400 rounded-full mb-3 shadow-sm">
                  <Flame size={12} className="inline mr-1 text-orange-600 dark:text-orange-400 animate-pulse" /> New In
                </h4>
                <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                       Innovative Highlights
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                      The absolute latest custom frameworks engineered for seamless memory loading.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3-Column highlight Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-x-2.5 gap-y-6 sm:gap-6 md:gap-8">
                {newInProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="relative group h-full"
                  >
                    <ProductCard product={product} onQuickView={setSelectedProduct} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 4. "WALL DECORATIVES" - Full 3-Column Grid */}
            <div id="modular-wall" className="scroll-mt-24">
              <div className="w-full text-center uppercase py-3 sm:py-4 bg-[#fbf6f0] dark:bg-gray-900/60 border border-[#e6dfd7] dark:border-gray-800 rounded-2xl mb-8 select-none flex items-center justify-center gap-3">
                <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full"></span>
                <span className="font-extrabold text-[11px] sm:text-xs tracking-[0.2em] text-[#151d3b] dark:text-gray-300">
                  Wall Decoratives
                </span>
                <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full"></span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-x-2.5 gap-y-6 sm:gap-6 md:gap-8">
                {wallDecorativesProducts.map((product) => (
                  <motion.div 
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4 }}
                  >
                    <ProductCard product={product} onQuickView={setSelectedProduct} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 5. "DESK DECORATIVES" - Compact Geometric 3-Column Grid */}
            <div id="modular-desk" className="scroll-mt-24">
              <div className="w-full text-center uppercase py-3 sm:py-4 bg-[#f1f3f7] dark:bg-gray-900/60 border border-[#dce1eb] dark:border-gray-800 rounded-2xl mb-8 select-none flex items-center justify-center gap-3">
                <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full"></span>
                <span className="font-extrabold text-[11px] sm:text-xs tracking-[0.2em] text-[#151d3b] dark:text-gray-300">
                  Desk Decoratives
                </span>
                <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full"></span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-x-2.5 gap-y-6 sm:gap-6 md:gap-8">
                {deskDecorativesProducts.map((product) => (
                  <motion.div 
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4 }}
                  >
                    <ProductCard product={product} onQuickView={setSelectedProduct} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 6. "ACCESSORIES & FASHION" - Focused Row Grid */}
            <div id="modular-fashion" className="scroll-mt-24 pb-8">
              <div className="w-full text-center uppercase py-3 sm:py-4 bg-[#faf2f5] dark:bg-gray-900/60 border border-[#eadbe1] dark:border-gray-800 rounded-2xl mb-8 select-none flex items-center justify-center gap-3">
                <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full"></span>
                <span className="font-extrabold text-[11px] sm:text-xs tracking-[0.2em] text-[#151d3b] dark:text-gray-300">
                  Accessories & Fashion Row
                </span>
                <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full"></span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-x-2.5 gap-y-6 sm:gap-6 md:gap-8">
                {accessoriesFashionProducts.map((product) => (
                  <motion.div 
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4 }}
                  >
                    <ProductCard product={product} onQuickView={setSelectedProduct} />
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
};
