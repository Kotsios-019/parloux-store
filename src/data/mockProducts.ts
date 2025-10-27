export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  available: boolean;
  image?: string;
  size?: string;
  color?: string;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  category: string;
  images: Array<{
    src: string;
    alt: string;
  }>;
  variants: ProductVariant[];
  tags: string[];
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Elegant Silk Evening Dress',
    handle: 'elegant-silk-evening-dress',
    description: 'A timeless piece that embodies sophistication and grace. Crafted from the finest silk, this evening dress features a flattering silhouette that transitions seamlessly from cocktail hour to formal events.',
    category: 'Dresses',
    images: [
      { src: '/images/products/elegant-silk-dress-1.jpg', alt: 'Elegant Silk Evening Dress Front' },
      { src: '/images/products/elegant-silk-dress-2.jpg', alt: 'Elegant Silk Evening Dress Back' },
      { src: '/images/products/elegant-silk-dress-3.jpg', alt: 'Elegant Silk Evening Dress Detail' }
    ],
    variants: [
      {
        id: '1-1',
        title: 'Black / S',
        price: 299,
        compareAtPrice: 399,
        available: true,
        size: 'S',
        color: 'Black',
        image: '/images/products/elegant-silk-dress-1.jpg'
      },
      {
        id: '1-2',
        title: 'Black / M',
        price: 299,
        compareAtPrice: 399,
        available: true,
        size: 'M',
        color: 'Black',
        image: '/images/products/elegant-silk-dress-1.jpg'
      },
      {
        id: '1-3',
        title: 'Black / L',
        price: 299,
        compareAtPrice: 399,
        available: true,
        size: 'L',
        color: 'Black',
        image: '/images/products/elegant-silk-dress-1.jpg'
      },
      {
        id: '1-4',
        title: 'Navy / S',
        price: 299,
        compareAtPrice: 399,
        available: false,
        size: 'S',
        color: 'Navy',
        image: '/images/products/elegant-silk-dress-2.jpg'
      }
    ],
    tags: ['evening', 'silk', 'elegant', 'formal', 'luxury'],
    available: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Silk Camisole Top',
    handle: 'silk-camisole-top',
    description: 'Effortlessly chic silk camisole that pairs beautifully with everything from tailored trousers to flowing skirts. The luxurious fabric drapes beautifully and feels incredible against the skin.',
    category: 'Tops',
    images: [
      { src: '/images/products/silk-camisole-1.jpg', alt: 'Silk Camisole Top Front' },
      { src: '/images/products/silk-camisole-2.jpg', alt: 'Silk Camisole Top Back' },
      { src: '/images/products/silk-camisole-3.jpg', alt: 'Silk Camisole Top Detail' }
    ],
    variants: [
      {
        id: '2-1',
        title: 'Ivory / S',
        price: 189,
        available: true,
        size: 'S',
        color: 'Ivory',
        image: '/images/products/silk-camisole-1.jpg'
      },
      {
        id: '2-2',
        title: 'Ivory / M',
        price: 189,
        available: true,
        size: 'M',
        color: 'Ivory',
        image: '/images/products/silk-camisole-1.jpg'
      },
      {
        id: '2-3',
        title: 'Ivory / L',
        price: 189,
        available: true,
        size: 'L',
        color: 'Ivory',
        image: '/images/products/silk-camisole-1.jpg'
      },
      {
        id: '2-4',
        title: 'Black / S',
        price: 189,
        available: true,
        size: 'S',
        color: 'Black',
        image: '/images/products/silk-camisole-2.jpg'
      }
    ],
    tags: ['silk', 'camisole', 'casual', 'luxury', 'versatile'],
    available: true,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '3',
    title: 'Classic White Blouse',
    handle: 'classic-white-blouse',
    description: 'The perfect white blouse that every wardrobe needs. Crisp, clean, and impeccably tailored, this piece works for both professional settings and elegant evenings out.',
    category: 'Tops',
    images: [
      { src: '/images/products/white-blouse-1.jpg', alt: 'Classic White Blouse Front' },
      { src: '/images/products/white-blouse-2.jpg', alt: 'Classic White Blouse Back' },
      { src: '/images/products/white-blouse-3.jpg', alt: 'Classic White Blouse Detail' }
    ],
    variants: [
      {
        id: '3-1',
        title: 'White / S',
        price: 159,
        available: true,
        size: 'S',
        color: 'White',
        image: '/images/products/white-blouse-1.jpg'
      },
      {
        id: '3-2',
        title: 'White / M',
        price: 159,
        available: true,
        size: 'M',
        color: 'White',
        image: '/images/products/white-blouse-1.jpg'
      },
      {
        id: '3-3',
        title: 'White / L',
        price: 159,
        available: true,
        size: 'L',
        color: 'White',
        image: '/images/products/white-blouse-1.jpg'
      },
      {
        id: '3-4',
        title: 'White / XL',
        price: 159,
        available: false,
        size: 'XL',
        color: 'White',
        image: '/images/products/white-blouse-1.jpg'
      }
    ],
    tags: ['blouse', 'white', 'classic', 'professional', 'versatile'],
    available: true,
    createdAt: '2024-01-25T10:00:00Z',
    updatedAt: '2024-01-25T10:00:00Z'
  },
  {
    id: '4',
    title: 'Tailored Wool Blazer',
    handle: 'tailored-wool-blazer',
    description: 'A sophisticated blazer crafted from premium wool. Perfect for power meetings or elegant dinners, this piece defines modern femininity with its impeccable tailoring.',
    category: 'Blazers',
    images: [
      { src: '/images/products/wool-blazer-1.jpg', alt: 'Tailored Wool Blazer Front' },
      { src: '/images/products/wool-blazer-2.jpg', alt: 'Tailored Wool Blazer Back' },
      { src: '/images/products/wool-blazer-3.jpg', alt: 'Tailored Wool Blazer Detail' }
    ],
    variants: [
      {
        id: '4-1',
        title: 'Navy / S',
        price: 449,
        compareAtPrice: 549,
        available: true,
        size: 'S',
        color: 'Navy',
        image: '/images/products/wool-blazer-1.jpg'
      },
      {
        id: '4-2',
        title: 'Navy / M',
        price: 449,
        compareAtPrice: 549,
        available: true,
        size: 'M',
        color: 'Navy',
        image: '/images/products/wool-blazer-1.jpg'
      },
      {
        id: '4-3',
        title: 'Navy / L',
        price: 449,
        compareAtPrice: 549,
        available: true,
        size: 'L',
        color: 'Navy',
        image: '/images/products/wool-blazer-1.jpg'
      },
      {
        id: '4-4',
        title: 'Black / S',
        price: 449,
        compareAtPrice: 549,
        available: false,
        size: 'S',
        color: 'Black',
        image: '/images/products/wool-blazer-2.jpg'
      }
    ],
    tags: ['blazer', 'wool', 'tailored', 'professional', 'luxury'],
    available: true,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z'
  },
  {
    id: '5',
    title: 'Flowing Midi Skirt',
    handle: 'flowing-midi-skirt',
    description: 'A graceful midi skirt that moves beautifully with every step. Made from premium fabric, it offers comfort and elegance in equal measure.',
    category: 'Skirts',
    images: [
      { src: '/images/products/midi-skirt-1.jpg', alt: 'Flowing Midi Skirt Front' },
      { src: '/images/products/midi-skirt-2.jpg', alt: 'Flowing Midi Skirt Back' },
      { src: '/images/products/midi-skirt-3.jpg', alt: 'Flowing Midi Skirt Detail' }
    ],
    variants: [
      {
        id: '5-1',
        title: 'Burgundy / S',
        price: 229,
        available: true,
        size: 'S',
        color: 'Burgundy',
        image: '/images/products/midi-skirt-1.jpg'
      },
      {
        id: '5-2',
        title: 'Burgundy / M',
        price: 229,
        available: true,
        size: 'M',
        color: 'Burgundy',
        image: '/images/products/midi-skirt-1.jpg'
      },
      {
        id: '5-3',
        title: 'Burgundy / L',
        price: 229,
        available: true,
        size: 'L',
        color: 'Burgundy',
        image: '/images/products/midi-skirt-1.jpg'
      },
      {
        id: '5-4',
        title: 'Forest Green / S',
        price: 229,
        available: true,
        size: 'S',
        color: 'Forest Green',
        image: '/images/products/midi-skirt-2.jpg'
      }
    ],
    tags: ['skirt', 'midi', 'flowing', 'elegant', 'versatile'],
    available: true,
    createdAt: '2024-02-05T10:00:00Z',
    updatedAt: '2024-02-05T10:00:00Z'
  },
  {
    id: '6',
    title: 'Cashmere Sweater',
    handle: 'cashmere-sweater',
    description: 'Ultra-soft cashmere sweater that feels like a warm embrace. Perfect for layering or wearing alone, this piece combines comfort with timeless style.',
    category: 'Sweaters',
    images: [
      { src: '/images/products/cashmere-sweater-1.jpg', alt: 'Cashmere Sweater Front' },
      { src: '/images/products/cashmere-sweater-2.jpg', alt: 'Cashmere Sweater Back' },
      { src: '/images/products/cashmere-sweater-3.jpg', alt: 'Cashmere Sweater Detail' }
    ],
    variants: [
      {
        id: '6-1',
        title: 'Cream / S',
        price: 329,
        available: true,
        size: 'S',
        color: 'Cream',
        image: '/images/products/cashmere-sweater-1.jpg'
      },
      {
        id: '6-2',
        title: 'Cream / M',
        price: 329,
        available: true,
        size: 'M',
        color: 'Cream',
        image: '/images/products/cashmere-sweater-1.jpg'
      },
      {
        id: '6-3',
        title: 'Cream / L',
        price: 329,
        available: true,
        size: 'L',
        color: 'Cream',
        image: '/images/products/cashmere-sweater-1.jpg'
      },
      {
        id: '6-4',
        title: 'Charcoal / S',
        price: 329,
        available: false,
        size: 'S',
        color: 'Charcoal',
        image: '/images/products/cashmere-sweater-2.jpg'
      }
    ],
    tags: ['cashmere', 'sweater', 'luxury', 'comfort', 'layering'],
    available: true,
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-02-10T10:00:00Z'
  }
];

export const mockCategories = [
  { id: '1', name: 'Dresses', handle: 'dresses', count: 1 },
  { id: '2', name: 'Tops', handle: 'tops', count: 2 },
  { id: '3', name: 'Blazers', handle: 'blazers', count: 1 },
  { id: '4', name: 'Skirts', handle: 'skirts', count: 1 },
  { id: '5', name: 'Sweaters', handle: 'sweaters', count: 1 }
];

export const mockCollections = [
  {
    id: '1',
    title: 'Dresses',
    handle: 'dresses',
    description: 'Elegant dresses for every occasion, from casual day wear to formal evening events',
    image: '/images/collections/dresses-collection.jpg',
    products: mockProducts.filter(p => p.category === 'Dresses')
  },
  {
    id: '2',
    title: 'Tops',
    handle: 'tops',
    description: 'Versatile tops and blouses perfect for layering and everyday elegance',
    image: '/images/collections/tops-collection.jpg',
    products: mockProducts.filter(p => p.category === 'Tops')
  },
  {
    id: '3',
    title: 'Blazers',
    handle: 'blazers',
    description: 'Sophisticated blazers and jackets for professional and elegant occasions',
    image: '/images/collections/blazers-collection.jpg',
    products: mockProducts.filter(p => p.category === 'Blazers')
  },
  {
    id: '4',
    title: 'Skirts',
    handle: 'skirts',
    description: 'Flowing skirts that move beautifully and add grace to any outfit',
    image: '/images/collections/skirts-collection.jpg',
    products: mockProducts.filter(p => p.category === 'Skirts')
  },
  {
    id: '5',
    title: 'Sweaters',
    handle: 'sweaters',
    description: 'Luxurious sweaters and knits for comfort and style in every season',
    image: '/images/collections/sweaters-collection.jpg',
    products: mockProducts.filter(p => p.category === 'Sweaters')
  }
];

// Helper functions
export function getProductByHandle(handle: string): Product | undefined {
  return mockProducts.find(product => product.handle === handle);
}

export function getProductsByCategory(category: string): Product[] {
  return mockProducts.filter(product => product.category === category);
}

export function getProductsByTag(tag: string): Product[] {
  return mockProducts.filter(product => product.tags.includes(tag));
}

export function getRelatedProducts(productId: string, limit: number = 4): Product[] {
  const currentProduct = mockProducts.find(p => p.id === productId);
  if (!currentProduct) return [];
  
  return mockProducts
    .filter(p => p.id !== productId && p.category === currentProduct.category)
    .slice(0, limit);
}

// Collection helper functions
export function getCollectionByHandle(handle: string) {
  return mockCollections.find(collection => collection.handle === handle);
}

export function getCollectionsByCategory(category: string) {
  return mockCollections.filter(collection => 
    collection.products.some(product => product.category === category)
  );
}
