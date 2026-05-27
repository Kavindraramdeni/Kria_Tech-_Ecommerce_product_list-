import { CategoryData } from './signs';

export const GIFTS_DATA: CategoryData = {
  hero: {
    title: "Personalized Gifts",
    subtitle: "Custom Printing & Signature Magnetic Frames",
    description: "Transform your memories into reality with our premium personalized collection. Proudly specializing in high-grade Acrylic Photo Frames, bulk premium Magnetic Frames, custom Photo Lamps, and beautiful engraved keepsakes.",
    image: "/images/collections/personalized.jpg"
  },
  features: [
    { title: 'Magnetic Magic', description: 'Our specialty high-energy magnetic frames offer seamless polaroid & photo swaps.', icon: 'Zap' },
    { title: 'Museum Quality Acrylic', description: 'Dual-layer ultra-clear crystal blocks and prints with brilliant colors.', icon: 'Sparkles' },
    { title: 'Personalized Customization', description: 'Add your custom greetings, names, messages, or custom photo uploads easily.', icon: 'User' },
    { title: 'Made for Every Gifting Goal', description: 'Perfect for individual keepsakes, bulk weddings, or custom corporate branding.', icon: 'Gift' }
  ],
  products: [
    // --- WALL DECORATIVES ---
    {
      id: "pg-wd-1",
      title: "Acrylic Photo Frames",
      description: "Elegant, sleek crystal-clear acrylic frames with modern standoff mounting hardware. Features true-color high-fidelity photo backing.",
      imageSrc: "/images/mdf-arts/acrylic-photo.jpg",
      price: 549,
      pricePrefix: "From",
      category: "Wall Decoratives"
    },
    {
      id: "pg-wd-2",
      title: "Acrylic Wall Clocks",
      description: "Stunning acrylic clocks with personalized face-prints and premium ultra-silent sweep movement.",
      imageSrc: "/images/led-decor/b.jpg",
      price: 649,
      pricePrefix: "From",
      category: "Wall Decoratives"
    },
    {
      id: "pg-wd-3",
      title: "Canvas Frames",
      description: "Stretched heavy-grade cotton artist canvas prints. Hand-mounted on premium durable pine-frames.",
      imageSrc: "/images/gallery/gallery-6.jpg",
      price: 699,
      pricePrefix: "From",
      category: "Wall Decoratives"
    },
    {
      id: "pg-wd-4",
      title: "Hearts Effect Photo Frames",
      description: "Delightful custom photo frames embedded with micro-heart translucent layouts for beautiful anniversaries.",
      imageSrc: "/images/gallery/gallery-7.jpg",
      price: 399,
      pricePrefix: "From",
      category: "Wall Decoratives"
    },
    {
      id: "pg-wd-5",
      title: "Glitter Photo Frames",
      description: "Liquid-filled frame loaded with floating sparkly glitter swirls. Adds an enchanting shimmer to any room.",
      imageSrc: "/images/trending/project-4.jpg",
      price: 399,
      pricePrefix: "From",
      category: "Wall Decoratives"
    },
    {
      id: "pg-wd-6",
      title: "Classic Photo Frames",
      description: "Solid, durable frames featuring rich textures, wood backplanes, and durable synthetic moldings.",
      imageSrc: "/images/gallery/gallery-5.jpg",
      price: 399,
      pricePrefix: "From",
      category: "Wall Decoratives"
    },
    {
      id: "pg-wd-7",
      title: "Sparkle Effect Photo Frames",
      description: "Beautiful holographic sparkle overlays that catch the light and add visual magic.",
      imageSrc: "/images/trending/project-3.jpg",
      price: 399,
      pricePrefix: "From",
      category: "Wall Decoratives"
    },
    {
      id: "pg-wd-8",
      title: "Matte Photo Frames",
      description: "Sophisticated satin matte texture frames that minimize overhead glares and reflections beautifully.",
      imageSrc: "/images/trending/project-2.jpg",
      price: 399,
      pricePrefix: "From",
      category: "Wall Decoratives"
    },
    {
      id: "pg-wd-9",
      title: "Aluminium Frames",
      description: "High-tech brushed aluminum alloy profiles framing your memories with crisp minimalist luxury.",
      imageSrc: "/images/polaroids/a.jpg",
      price: 599,
      pricePrefix: "From",
      category: "Wall Decoratives"
    },
    {
      id: "pg-wd-10",
      title: "Nameplates",
      description: "Bespoke address laser-engraved nameplates styled in high-class durable multi-layered acrylics.",
      imageSrc: "/images/kids/id-badges.jpg",
      price: 349,
      pricePrefix: "From",
      category: "Wall Decoratives"
    },
    {
      id: "pg-wd-11",
      title: "Royal Nameplates",
      description: "Glorious golden-mirror borders and custom embossed gold-leaf 3D fonts for a prestigious mansion entrance.",
      imageSrc: "/images/led-decor/commercial-box.jpg",
      price: 799,
      pricePrefix: "From",
      category: "Wall Decoratives"
    },
    {
      id: "pg-wd-12",
      title: "Custom Key Chains",
      description: "Exquisite, high-definition clear acrylic key chain tags personalized with your favorite images.",
      imageSrc: "/images/collections/personalized.jpg",
      price: 199,
      priceSuffix: "Each*",
      category: "Fashion & Accessories"
    },
    {
      id: "pg-wd-13",
      title: "Acrylic Photo Cutouts",
      description: "Expertly laser cut-to-shape silhouette photos on heavy dual-ply 6mm acrylic bases.",
      imageSrc: "/images/mdf-arts/acrylic-photo.jpg",
      price: 649,
      pricePrefix: "From",
      category: "Wall Decoratives"
    },
    {
      id: "pg-wd-14",
      title: "Signature Magnetic Photo Frames",
      description: "Thick crystal-clear block frames with instant high-energy magnetic polaroid snap mechanism. Change your photos in seconds with no mounting hassle.",
      imageSrc: "/images/polaroids/desk-block.jpg",
      price: 699,
      pricePrefix: "From",
      category: "Wall Decoratives",
      options: {
        shapes: [
          { label: "Standard", priceModifier: 0 },
          { label: "Rectangle", priceModifier: 0 },
          { label: "Custom Hexagonal", priceModifier: 0 },
          { label: "Custom Heart-Shape", priceModifier: 0 }
        ],
        sizes: [
          { label: "Standard (4x6\")", priceModifier: 0 },
          { label: "Mini Polaroid (3x4\")", priceModifier: 0 },
          { label: "Large Studio (6x8\")", priceModifier: 0 },
          { label: "Gallery Size (8x10\")", priceModifier: 0 }
        ]
      }
    },
    {
      id: "pg-wd-15",
      title: "Extra Large Acrylic Frames",
      description: "Cinematic, gallery-size large-scale acrylic prints with ultimate color depth and solid thick mounting studs.",
      imageSrc: "/images/mdf-arts/acrylic-photo.jpg",
      price: 4999,
      pricePrefix: "From",
      category: "Wall Decoratives"
    },
    {
      id: "pg-wd-16",
      title: "Creative Acrylic Wall Art",
      description: "Triptych layouts, diamond, or modular geometric acrylic panels for luxurious lobby makeovers.",
      imageSrc: "/images/mdf-arts/acrylic-photo.jpg",
      price: 1198,
      pricePrefix: "From",
      category: "Wall Decoratives"
    },
    {
      id: "pg-wd-17",
      title: "Maps Photo Frames",
      description: "Custom frames featuring geographic maps detailing the coordinates of your wedding, first home, or travel memoirs.",
      imageSrc: "/images/kids/light-box.jpg",
      price: 399,
      pricePrefix: "From",
      category: "Wall Decoratives"
    },
    {
      id: "pg-wd-18",
      title: "Acrylic Gold Photo Frames",
      description: "Luxurious heavy golden electroplated steel-backed acrylic frame panels. Limited availability.",
      imageSrc: "/images/mdf-arts/acrylic-photo.jpg",
      price: 999,
      pricePrefix: "From",
      isSoldOut: true,
      category: "Wall Decoratives"
    },

    // --- DESK DECORATIVES ---
    {
      id: "pg-dd-1",
      title: "Miniature Photo Stands",
      description: "Dainty custom photo blocks on sleek minimal frames. Perfect for tiny study tables and vanity slots.",
      imageSrc: "/images/polaroids/b.jpg",
      price: 499,
      pricePrefix: "From",
      category: "Desk Decoratives"
    },
    {
      id: "pg-dd-2",
      title: "Acrylic Photo Stands",
      description: "Thick, freestanding crystal block stands. Sleek and polished diamond-cut edges stand stable on any console.",
      imageSrc: "/images/polaroids/b.jpg",
      price: 299,
      pricePrefix: "From",
      category: "Desk Decoratives"
    },
    {
      id: "pg-dd-3",
      title: "Wooden Photo Stands",
      description: "Natural hardwood oak/birch blocks with laser-slit channels holding secure high gloss panels.",
      imageSrc: "/images/polaroids/desk-block.jpg",
      price: 399,
      pricePrefix: "From",
      category: "Desk Decoratives"
    },
    {
      id: "pg-dd-4",
      title: "Hanging Photo Stands",
      description: "Delightful swing-style hanging frames with natural jute fibers and iron hook accents.",
      imageSrc: "/images/polaroids/b.jpg",
      price: 399,
      pricePrefix: "From",
      category: "Desk Decoratives"
    },
    {
      id: "pg-dd-5",
      title: "Phone Stands",
      description: "Rigid high-grade acrylic desk phone stands. Fully customized with your name, profession, or initials.",
      imageSrc: "/images/polaroids/b.jpg",
      price: 299,
      pricePrefix: "From",
      category: "Desk Decoratives"
    },
    {
      id: "pg-dd-6",
      title: "Illusion Lamps",
      description: "Intricately detailed 3D optical acrylic line lamp designs with high-grade solid pine wood illumination base.",
      imageSrc: "/images/trending/project-3.jpg",
      price: 999,
      originalPrice: 1399,
      category: "Desk Decoratives"
    },
    {
      id: "pg-dd-7",
      title: "Mousepads",
      description: "Professional grade, wear-resistant high density mouse pads customizable with your company logos, illustrations, or family grid photos.",
      imageSrc: "/images/polaroids/b.jpg",
      price: 299,
      originalPrice: 399,
      category: "Desk Decoratives"
    },
    {
      id: "pg-dd-8",
      title: "Photo Mugs",
      description: "Premium inside-colored or full magical thermocromic heat-reveal ceramic cups.",
      imageSrc: "/images/polaroids/a.jpg",
      price: 299,
      pricePrefix: "From",
      category: "Desk Decoratives"
    },
    {
      id: "pg-dd-9",
      title: "Coasters",
      description: "Protective high-gloss coasters with full non-slip cork-wood backing bases. Pack of 4 or 6 formats.",
      imageSrc: "/images/polaroids/b.jpg",
      price: 496,
      priceSuffix: "Set",
      category: "Desk Decoratives"
    },

    // --- ACRYLIC PHOTO ---
    {
      id: "pg-pa-1",
      title: "Premium Acrylic Photo",
      description: "Custom printed premium acrylic photo sheets with high gloss surface, vibrant colors and scratch resistant gloss coating.",
      imageSrc: "/images/collections/personalized.jpg",
      price: 999,
      pricePrefix: "From",
      category: "Acrylic Photo"
    },
    {
      id: "pg-pa-2",
      title: "Acrylic Snapbooks",
      description: "Sleek and portable wire-bound mini flipbooks with custom acrylic covers and high contrast prints.",
      imageSrc: "/images/polaroids/heritage-set.jpg",
      price: 399,
      pricePrefix: "From",
      category: "Acrylic Photo"
    },
    {
      id: "pg-pa-3",
      title: "Glossy Acrylic Prints",
      description: "Radiant, splash-resistant photo paper backed with thin sleek acrylic protective layouts. Perfect for displaying anywhere.",
      imageSrc: "/images/polaroids/b.jpg",
      price: 300,
      pricePrefix: "30 @",
      category: "Acrylic Photo"
    },

    // --- HOME DECORATIVES ---
    {
      id: "pg-hd-1",
      title: "Kitchen Identifiers",
      description: "Clear and magnetic custom spice jars, drawer headers, and magnetic pantry markers for high organization.",
      imageSrc: "/images/kids/id-badges.jpg",
      price: 499,
      originalPrice: 699,
      isSoldOut: true,
      category: "Home Decoratives"
    },
    {
      id: "pg-hd-2",
      title: "Switch Stickers",
      description: "Playful vector line indicators and ambient face decals designed to trim your home toggle switches.",
      imageSrc: "/images/gallery/gallery-12.jpg",
      price: 299,
      originalPrice: 499,
      isSoldOut: true,
      category: "Home Decoratives"
    },
    {
      id: "pg-hd-3",
      title: "Phone Charging Holders",
      description: "Self-adhesive bedside hanging bays engineered to hold phone safely during charging loops.",
      imageSrc: "/images/kids/light-box.jpg",
      price: 299,
      originalPrice: 499,
      isSoldOut: true,
      category: "Home Decoratives"
    },
    {
      id: "pg-hd-4",
      title: "Photo Lamps",
      description: "Beautiful vertical lithophane or direct-translucent custom prints with soft cozy back-lit setups.",
      imageSrc: "/images/kids/light-box.jpg",
      price: 299,
      originalPrice: 499,
      category: "Home Decoratives"
    },
    {
      id: "pg-hd-5",
      title: "Fridge Magnets",
      description: "Premium acrylic magnetic frames and shaped fridge photo plates. Holds photos with highly durable strong grip.",
      imageSrc: "/images/polaroids/heritage-set.jpg",
      price: 149,
      pricePrefix: "From",
      priceSuffix: "Each",
      category: "Home Decoratives"
    },
    {
      id: "pg-hd-6",
      title: "Luggage Tags",
      description: "Tough customized high impact luggage name banners wrapped with durable flexible elastic ties.",
      imageSrc: "/images/kids/id-badges.jpg",
      price: 299,
      originalPrice: 399,
      category: "Home Decoratives"
    },
    {
      id: "pg-hd-7",
      title: "Photo Pillows",
      description: "Plush, cloud-soft micro-fiber pillows with vibrant full-bleed breathable photo fabrics.",
      imageSrc: "/images/collections/personalized.jpg",
      price: 499,
      pricePrefix: "From",
      category: "Home Decoratives"
    },
    {
      id: "pg-hd-8",
      title: "Photo Puzzles",
      description: "Vibrant custom interlocking puzzles. A fun, interactive way to relive your family or honeymoon shots.",
      imageSrc: "/images/services/kids-learning.jpg",
      price: 499,
      pricePrefix: "From",
      category: "Home Decoratives"
    },
    {
      id: "pg-hd-9",
      title: "Sippers",
      description: "Insulated matte black double-walled steel thermal bottles. Personalized laser-engraving with your brand signature.",
      imageSrc: "/images/led-decor/logo-sign.jpg",
      price: 499,
      originalPrice: 699,
      category: "Home Decoratives"
    },

    // --- CAR ACCESSORIES ---
    {
      id: "pg-ca-1",
      title: "Car Photo Hangings",
      description: "Dainty mini dual-faced photo acrylic pendants designed to dangle gracefully from your rearview mirror.",
      imageSrc: "/images/polaroids/a.jpg",
      price: 299,
      originalPrice: 399,
      category: "Car Accessories"
    },
    {
      id: "pg-ca-2",
      title: "Car Dashboard Stands",
      description: "Heavy-bottom luxury divine silhouettes or photo frames with strong silicone non-slip dash adhesion.",
      imageSrc: "/images/led-decor/commercial-box.jpg",
      price: 299,
      pricePrefix: "From",
      category: "Car Accessories"
    },

    // --- FASHION & ACCESSORIES ---
    {
      id: "pg-fa-1",
      title: "Camera Film Roll Keychains",
      description: "Pull-out vintage mechanical container mimicking vintage color-negative films. Scroll out beautiful custom pictures real-time.",
      imageSrc: "/images/polaroids/heritage-set.jpg",
      price: 399,
      pricePrefix: "From",
      category: "Fashion & Accessories"
    },
    {
      id: "pg-fa-2",
      title: "Photo Bracelets",
      description: "Exquisite adjustable beaded link wristbands centering micro photographic projection gems.",
      imageSrc: "/images/polaroids/a.jpg",
      price: 399,
      originalPrice: 599,
      category: "Fashion & Accessories"
    },
    {
      id: "pg-fa-3",
      title: "Photo Keychains",
      description: "Double sided heavy scratch-proof clear high gloss acrylic key tags with high fidelity borderless prints.",
      imageSrc: "/images/collections/personalized.jpg",
      price: 149,
      pricePrefix: "From",
      priceSuffix: "Each",
      category: "Fashion & Accessories"
    },
    {
      id: "pg-fa-4",
      title: "Photo Wallet Cards",
      description: "Stainless steel anodized credit-card sized cards customized with high durability fiber laser engravings for wallets.",
      imageSrc: "/images/polaroids/b.jpg",
      price: 149,
      pricePrefix: "From",
      priceSuffix: "Each",
      category: "Fashion & Accessories"
    },
    {
      id: "pg-fa-5",
      title: "Name Pen & Keychain Set",
      description: "Premium executive combo containing gold-plated ink roller-ball pen and matching leatherette tag customized with names.",
      imageSrc: "/images/kids/id-badges.jpg",
      price: 399,
      originalPrice: 599,
      category: "Fashion & Accessories"
    },
    {
      id: "pg-fa-6",
      title: "Kids & Adults Clothing",
      description: "Heavyweight 100% premium combed bio-washed ringspun cotton tees and hoodies printed with your designs.",
      imageSrc: "/images/collections/personalized.jpg",
      price: 399,
      pricePrefix: "From",
      category: "Fashion & Accessories"
    },
    {
      id: "pg-fa-7",
      title: "Cuboid Chains",
      description: "Solid surgical steel four-sided geometry bars laser marked with coordinates, messages, or initials.",
      imageSrc: "/images/polaroids/a.jpg",
      price: 399,
      originalPrice: 599,
      category: "Fashion & Accessories"
    }
  ]
};
