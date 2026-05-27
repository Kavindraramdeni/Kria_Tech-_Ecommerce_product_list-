export interface Feature {
  title: string;
  description: string;
  icon: string; // Lucide icon name
}

export interface ProductItem {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  price?: number;
  originalPrice?: number;
  pricePrefix?: string;
  priceSuffix?: string;
  isSoldOut?: boolean;
  category?: string;
  options?: {
    shapes?: { label: string; priceModifier: number }[];
    sizes?: { label: string; priceModifier: number }[];
  };
}

export interface CategoryData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
  };
  features: Feature[];
  products: ProductItem[];
  benefits?: string[];
  gallery?: string[];
}

export const SIGNS_DATA: CategoryData = {
  hero: {
    title: "Commercial Signage",
    subtitle: "Professional Branding Solutions",
    description: "Expert branding solutions including acrylic sign boxes, 3D lettering, and professional business displays for premium retail and corporate identification.",
    image: "/images/led-decor/commercial-box.jpg"
  },
  features: [
    { title: 'Fine Art Quality', description: 'Museum-grade materials used for crystal clear clarity and vibrant colors.', icon: 'Palette' },
    { title: 'Easy Installation', description: 'Smart mounting systems designed for effortless setup and frame swapping.', icon: 'Zap' },
    { title: 'Bespoke Design', description: 'Fully customizable options to match your personal style and interior palette.', icon: 'Box' },
    { title: 'Precision Crafted', description: 'Hand-finished products ensuring the highest standards of luxury decor.', icon: 'Sparkles' }
  ],
  products: [
    { 
      id: "cs-3", 
      title: "3D Acrylic Lettering", 
      description: "Precision laser-cut raised letters in glass, matte or metallic finishes.", 
      imageSrc: "/images/led-decor/a.jpg", 
      price: 3500,
    },
    { 
      id: "cs-4", 
      title: "Wayfinding Directory", 
      description: "Elegant directional signage systems for larger complexes.", 
      imageSrc: "/images/led-decor/b.jpg", 
      price: 2800,
    }
  ]
};
