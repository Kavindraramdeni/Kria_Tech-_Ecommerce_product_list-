import { CategoryData } from './signs';

export const EDUCATIONAL_DATA: CategoryData = {
  hero: {
    title: "KRIA KIDS",
    subtitle: "Educational & Kids Learning",
    description: "Creative learning tools, interactive light boxes, and 3D educational puzzles designed for young minds. We combine play with education to inspire the next generation.",
    image: "/images/kids/map-puzzle.jpg"
  },
  features: [
    { title: 'Interactive Learning', description: "Products designed to engage multiple senses and encourage hands-on exploration.", icon: 'Sparkles' },
    { title: 'Premium Durability', description: "Precision-cut MDF and high-grade acrylic.", icon: 'ShieldCheck' },
    { title: 'Educational Value', description: "Focusing on key developmental skills through puzzles and interactive tools.", icon: 'BookOpen' },
    { title: 'Safe Design', description: "Non-toxic materials and rounded edges for child-safe interaction.", icon: 'Heart' }
  ],
  products: [
    { id: "ek-1", title: "3D Educational Map Puzzle", description: "Interactive wooden and acrylic map puzzle for learning.", imageSrc: "/images/services/kids-learning.jpg", price: 1200 },
    { id: "ek-2", title: "Sensory Light Box", description: "Engaging tracing and sensory light boxes for creative play.", imageSrc: "/images/kids/light-box.jpg", price: 2800 },
    { id: "ek-3", title: "Custom Classroom ID Kit", description: "Personalized student badges and award medals for schools.", imageSrc: "/images/kids/id-badges.jpg", price: 450 },
    { id: "ek-4", title: "Alphabet Wall Art (LED)", description: "Bright, engaging 3D alphabet display with soft backlighting.", imageSrc: "/images/gallery/gallery-12.jpg", price: 3200 }
  ]
};
