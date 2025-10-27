// Shopify Storefront API Types for ParlouX Store

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  tags: string[];
  productType: string;
  vendor: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: ShopifyImage;
    }>;
  };
  variants: {
    edges: Array<{
      node: ShopifyProductVariant;
    }>;
  };
  options: ShopifyProductOption[];
  seo: {
    title: string;
    description: string;
  };
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice?: {
    amount: string;
    currencyCode: string;
  };
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
  image?: ShopifyImage;
}

export interface ShopifyProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface ShopifyImage {
  id: string;
  url: string;
  altText?: string;
  width: number;
  height: number;
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  updatedAt: string;
  image?: ShopifyImage;
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
  seo: {
    title: string;
    description: string;
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalTaxAmount?: {
      amount: string;
      currencyCode: string;
    };
    totalDutyAmount?: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    edges: Array<{
      node: ShopifyCartLine;
    }>;
  };
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  merchandise: ShopifyProductVariant;
}

export interface ShopifyCustomer {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  displayName: string;
  defaultAddress?: ShopifyAddress;
  addresses: {
    edges: Array<{
      node: ShopifyAddress;
    }>;
  };
}

export interface ShopifyAddress {
  id: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  country?: string;
  zip?: string;
  phone?: string;
}

// API Response Types
export interface ShopifyResponse<T> {
  data: T;
  errors?: Array<{
    message: string;
    locations?: Array<{
      line: number;
      column: number;
    }>;
  }>;
}

// GraphQL Query Types
export interface ProductsQuery {
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
}

export interface ProductQuery {
  product: ShopifyProduct;
}

export interface CollectionsQuery {
  collections: {
    edges: Array<{
      node: ShopifyCollection;
    }>;
  };
}

export interface CollectionQuery {
  collection: ShopifyCollection;
}

export interface CartQuery {
  cart: ShopifyCart;
}

export interface CartCreateMutation {
  cartCreate: {
    cart: ShopifyCart;
    userErrors: Array<{
      field: string[];
      message: string;
    }>;
  };
}

export interface CartLinesAddMutation {
  cartLinesAdd: {
    cart: ShopifyCart;
    userErrors: Array<{
      field: string[];
      message: string;
    }>;
  };
}

export interface CartLinesUpdateMutation {
  cartLinesUpdate: {
    cart: ShopifyCart;
    userErrors: Array<{
      field: string[];
      message: string;
    }>;
  };
}

export interface CartLinesRemoveMutation {
  cartLinesRemove: {
    cart: ShopifyCart;
    userErrors: Array<{
      field: string[];
      message: string;
    }>;
  };
}

// Search Types
export interface SearchQuery {
  search: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
}
