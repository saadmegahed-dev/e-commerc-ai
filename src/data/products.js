export const products = [
  {
    id: 'obsidian-chronograph',
    name: 'Obsidian Chronograph',
    price: 4850,
    category: 'watches',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    ],
    description:
      'A masterwork of horological precision. Swiss automatic movement encased in brushed titanium with sapphire crystal.',
    featured: true,
    tags: ['bestseller', 'limited'],
  },
  {
    id: 'aurum-ring',
    name: 'Aurum Signet Ring',
    price: 2200,
    category: 'jewelry',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b35585?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b35585?w=800&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
    ],
    description:
      '18K gold signet ring with hand-engraved AETHER monogram. A statement of quiet authority.',
    featured: true,
    tags: ['new'],
  },
  {
    id: 'noir-leather-brief',
    name: 'Noir Leather Brief',
    price: 1890,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    ],
    description:
      'Full-grain Italian calfskin briefcase with brushed gold hardware. Timeless craftsmanship.',
    featured: true,
    tags: ['bestseller'],
  },
  {
    id: 'midnight-essence',
    name: 'Midnight Essence',
    price: 320,
    category: 'fragrance',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
    ],
    description:
      'Oud, amber, and black pepper. An intoxicating evening fragrance in a hand-blown crystal bottle.',
    featured: true,
    tags: ['exclusive'],
  },
  {
    id: 'celestial-automatic',
    name: 'Celestial Automatic',
    price: 6200,
    category: 'watches',
    image: 'https://images.unsplash.com/photo-1524805440108-83faaaf6265c?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1524805440108-83faaaf6265c?w=800&q=80',
    ],
    description:
      'Moonphase complication with meteorite dial. Limited edition of 50 pieces worldwide.',
    featured: false,
    tags: ['limited'],
  },
  {
    id: 'luna-pendant',
    name: 'Luna Pendant',
    price: 3400,
    category: 'jewelry',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
    ],
    description:
      'Platinum crescent moon pendant set with 0.5ct diamond. Suspended on a silk cord.',
    featured: false,
    tags: ['new'],
  },
  {
    id: 'carbon-wallet',
    name: 'Carbon Fiber Wallet',
    price: 450,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80',
    ],
    description:
      'Slim profile wallet in woven carbon fiber with gold-plated card slots.',
    featured: false,
    tags: [],
  },
  {
    id: 'velvet-noir',
    name: 'Velvet Noir',
    price: 280,
    category: 'fragrance',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80',
    ],
    description:
      'Velvet rose, dark vanilla, and sandalwood. A warm, enveloping signature scent.',
    featured: false,
    tags: [],
  },
];

export const getProductById = (id) => products.find((p) => p.id === id);

export const getProductsByCategory = (category) =>
  products.filter((p) => p.category === category);

export const getFeaturedProducts = () => products.filter((p) => p.featured);

export const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
