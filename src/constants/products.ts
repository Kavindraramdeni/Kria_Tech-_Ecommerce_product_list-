import { Product } from '../context/ECommerceContext';

export interface ProductCategory {
  title: string;
  pageKey: string;
  description: string;
  products: Product[];
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
    {
        title: "Signature Wall Decor",
        pageKey: "signature-decor",
        description: "Premium 3D MDF wall art, high-end magnetic frames, and bespoke neon creations designed for luxury interiors.",
        products: [
            { 
                id: 'swd-1', 
                title: "Crystal Acrylic Photo Art", 
                imageSrc: "/images/mdf-arts/acrylic-photo.jpg", 
                description: "Sleek, minimalist magnetic frames that give your photos a premium floating effect.", 
                price: 1800, 
                category: "Decor"
            },
            { 
                id: 'swd-2', 
                title: "Nebula Neon Wall Sign", 
                imageSrc: "/images/led-decor/logo-sign.jpg", 
                description: "Handcrafted neon signs featuring custom typography and artistic silhouettes.", 
                price: 5500, 
                category: "Decor"
            },
            { 
                id: 'swd-3', 
                title: "3D Geometric Lion Art", 
                imageSrc: "/images/gallery/gallery-5.jpg", 
                description: "High-definition laser-cut 3D MDF wall art for a modern gallery look.", 
                price: 3200, 
                category: "Decor" 
            },
            { 
                id: 'swd-4', 
                title: "Sacred Om Mandala (LED)", 
                imageSrc: "/images/gallery/gallery-7.jpg", 
                description: "Intricate mandala pattern with divine back-lit Om symbol.", 
                price: 4800, 
                category: "Decor" 
            },
            { 
                id: 'swd-5', 
                title: "Modern Minimalist Stag", 
                imageSrc: "/images/gallery/gallery-4.jpg", 
                description: "Sleek geometric stag head silhouette for contemporary minimalist environments.", 
                price: 3200, 
                category: "Decor" 
            },
        ],
    },
    {
        title: "Commercial Signage",
        pageKey: "commercial-signage",
        description: "Expert branding solutions including acrylic sign boxes, 3D lettering, and professional business displays.",
        products: [
            { 
                id: 'cs-3', 
                title: "3D Acrylic Lettering", 
                imageSrc: "/images/led-decor/b.jpg", 
                description: "Custom laser-cut flat or raised dimensional typography.", 
                price: 3500, 
                category: "Signage" 
            },
        ]
    },
    {
        title: "Personalized Gifts",
        pageKey: "personalized-gifts",
        description: "Transform your memories into reality with personalized gifts and custom frames.",
        products: [
            { 
                id: 'pg-1', 
                title: "Polaroid Heritage Set", 
                imageSrc: "/images/collections/personalized.jpg", 
                description: "Set of 5 custom polaroid-style acrylic fridge magnets.", 
                price: 450, 
                category: "Gifts" 
            },
            { 
                id: 'pg-2', 
                title: "Infinity Desk Photo Block", 
                imageSrc: "/images/polaroids/desk-block.jpg", 
                description: "Thick freestanding crystal-clear acrylic blocks.", 
                price: 950, 
                category: "Gifts" 
            },
        ]
    },
    {
        title: "Kria Kids Learning",
        pageKey: "kids-learning",
        description: "Creative learning tools and educational puzzles designed for young minds.",
        products: [
            { 
                id: 'kk-1', 
                title: "3D Educational Map Puzzle", 
                imageSrc: "/images/services/kids-learning.jpg", 
                description: "Interactive wooden and acrylic map puzzle for learning.", 
                price: 1200, 
                category: "Educational" 
            },
            { 
                id: 'kk-2', 
                title: "Sensory Light Box", 
                imageSrc: "/images/kids/light-box.jpg", 
                description: "Engaging tactile and sensory light boards to inspire creativity.", 
                price: 2800, 
                category: "Educational" 
            },
        ]
    }
];
