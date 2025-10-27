export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  available: boolean;
  sku: string;
  option1?: string; // Size
  option2?: string; // Color
  option3?: string; // Material
}

export interface ProductImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  shortDescription: string;
  vendor: string;
  productType: string;
  tags: string[];
  images: ProductImage[];
  variants: ProductVariant[];
  options: {
    name: string;
    values: string[];
  }[];
  available: boolean;
  createdAt: string;
  updatedAt: string;
  featuredImage?: ProductImage;
  price: {
    min: number;
    max: number;
  };
  compareAtPrice?: {
    min: number;
    max: number;
  };
}

export interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image?: ProductImage;
  products: Product[];
  productCount: number;
  sortOrder: string;
  createdAt: string;
  updatedAt: string;
}

export interface SearchFilters {
  price?: {
    min: number;
    max: number;
  };
  size?: string[];
  color?: string[];
  material?: string[];
  availability?: 'in-stock' | 'out-of-stock' | 'all';
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'popularity';
}

export interface SearchResult {
  products: Product[];
  totalCount: number;
  filters: SearchFilters;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

