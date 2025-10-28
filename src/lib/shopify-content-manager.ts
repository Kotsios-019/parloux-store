'use client';

import { useState, useEffect } from 'react';

// Shopify Admin API integration for dynamic content management
export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: {
    id: string;
    url: string;
    altText?: string;
  }[];
  variants: {
    id: string;
    title: string;
    price: string;
    compareAtPrice?: string;
    availableForSale: boolean;
    selectedOptions: {
      name: string;
      value: string;
    }[];
  }[];
  tags: string[];
  productType: string;
  vendor: string;
  createdAt: string;
  updatedAt: string;
  featuredImage?: {
    url: string;
    altText?: string;
  };
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image?: {
    url: string;
    altText?: string;
  };
  products: ShopifyProduct[];
  productsCount: number;
  sortOrder: string;
  templateSuffix?: string;
  updatedAt: string;
}

export interface ShopifyMetafield {
  id: string;
  namespace: string;
  key: string;
  value: string;
  type: string;
}

// Dynamic content management system
export class ShopifyContentManager {
  private adminApiUrl: string;
  private accessToken: string;

  constructor(adminApiUrl: string, accessToken: string) {
    this.adminApiUrl = adminApiUrl;
    this.accessToken = accessToken;
  }

  // Fetch all products with pagination
  async fetchProducts(first: number = 50, after?: string): Promise<{
    products: ShopifyProduct[];
    hasNextPage: boolean;
    endCursor?: string;
  }> {
    const query = `
      query getProducts($first: Int!, $after: String) {
        products(first: $first, after: $after) {
          edges {
            node {
              id
              title
              handle
              description
              productType
              vendor
              tags
              createdAt
              updatedAt
              images(first: 10) {
                edges {
                  node {
                    id
                    url
                    altText
                  }
                }
              }
              variants(first: 100) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                    availableForSale
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
              featuredImage {
                url
                altText
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

    const response = await this.makeRequest(query, { first, after });
    const products = response.data.products.edges.map((edge: any) => this.transformProduct(edge.node));
    
    return {
      products,
      hasNextPage: response.data.products.pageInfo.hasNextPage,
      endCursor: response.data.products.pageInfo.endCursor
    };
  }

  // Fetch all collections
  async fetchCollections(): Promise<ShopifyCollection[]> {
    const query = `
      query getCollections {
        collections(first: 50) {
          edges {
            node {
              id
              title
              handle
              description
              image {
                url
                altText
              }
              productsCount
              sortOrder
              templateSuffix
              updatedAt
              products(first: 20) {
                edges {
                  node {
                    id
                    title
                    handle
                    featuredImage {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await this.makeRequest(query);
    return response.data.collections.edges.map((edge: any) => this.transformCollection(edge.node));
  }

  // Fetch featured collections (using metafields)
  async fetchFeaturedCollections(): Promise<ShopifyCollection[]> {
    const query = `
      query getFeaturedCollections {
        collections(first: 50) {
          edges {
            node {
              id
              title
              handle
              description
              image {
                url
                altText
              }
              metafields(first: 10, namespace: "custom") {
                edges {
                  node {
                    key
                    value
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await this.makeRequest(query);
    const collections = response.data.collections.edges.map((edge: any) => this.transformCollection(edge.node));
    
    // Filter collections with featured metafield
    return collections.filter((collection: ShopifyCollection) => 
      collection.metafields?.some((metafield: any) => 
        metafield.key === 'featured' && metafield.value === 'true'
      )
    );
  }

  // Fetch products by collection
  async fetchProductsByCollection(collectionHandle: string): Promise<ShopifyProduct[]> {
    const query = `
      query getCollectionProducts($handle: String!) {
        collection(handle: $handle) {
          products(first: 50) {
            edges {
              node {
                id
                title
                handle
                description
                productType
                vendor
                tags
                images(first: 10) {
                  edges {
                    node {
                      id
                      url
                      altText
                    }
                  }
                }
                variants(first: 100) {
                  edges {
                    node {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                      compareAtPrice {
                        amount
                        currencyCode
                      }
                      availableForSale
                      selectedOptions {
                        name
                        value
                      }
                    }
                  }
                }
                featuredImage {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    `;

    const response = await this.makeRequest(query, { handle: collectionHandle });
    return response.data.collection.products.edges.map((edge: any) => this.transformProduct(edge.node));
  }

  // Search products
  async searchProducts(query: string, first: number = 20): Promise<ShopifyProduct[]> {
    const searchQuery = `
      query searchProducts($query: String!, $first: Int!) {
        products(first: $first, query: $query) {
          edges {
            node {
              id
              title
              handle
              description
              productType
              vendor
              tags
              images(first: 5) {
                edges {
                  node {
                    id
                    url
                    altText
                  }
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                    availableForSale
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
              featuredImage {
                url
                altText
              }
            }
          }
        }
      }
    `;

    const response = await this.makeRequest(searchQuery, { query, first });
    return response.data.products.edges.map((edge: any) => this.transformProduct(edge.node));
  }

  // Update collection metafields for featured status
  async updateCollectionMetafield(collectionId: string, key: string, value: string): Promise<void> {
    const mutation = `
      mutation updateCollectionMetafield($input: CollectionInput!) {
        collectionUpdate(input: $input) {
          collection {
            id
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    await this.makeRequest(mutation, {
      input: {
        id: collectionId,
        metafields: [{
          namespace: 'custom',
          key,
          value,
          type: 'single_line_text_field'
        }]
      }
    });
  }

  // Transform Shopify product to our format
  private transformProduct(shopifyProduct: any): ShopifyProduct {
    return {
      id: shopifyProduct.id,
      title: shopifyProduct.title,
      handle: shopifyProduct.handle,
      description: shopifyProduct.description,
      images: shopifyProduct.images.edges.map((edge: any) => ({
        id: edge.node.id,
        url: edge.node.url,
        altText: edge.node.altText
      })),
      variants: shopifyProduct.variants.edges.map((edge: any) => ({
        id: edge.node.id,
        title: edge.node.title,
        price: edge.node.price.amount,
        compareAtPrice: edge.node.compareAtPrice?.amount,
        availableForSale: edge.node.availableForSale,
        selectedOptions: edge.node.selectedOptions
      })),
      tags: shopifyProduct.tags,
      productType: shopifyProduct.productType,
      vendor: shopifyProduct.vendor,
      createdAt: shopifyProduct.createdAt,
      updatedAt: shopifyProduct.updatedAt,
      featuredImage: shopifyProduct.featuredImage
    };
  }

  // Transform Shopify collection to our format
  private transformCollection(shopifyCollection: any): ShopifyCollection {
    return {
      id: shopifyCollection.id,
      title: shopifyCollection.title,
      handle: shopifyCollection.handle,
      description: shopifyCollection.description,
      image: shopifyCollection.image,
      products: shopifyCollection.products?.edges.map((edge: any) => this.transformProduct(edge.node)) || [],
      productsCount: shopifyCollection.productsCount,
      sortOrder: shopifyCollection.sortOrder,
      templateSuffix: shopifyCollection.templateSuffix,
      updatedAt: shopifyCollection.updatedAt
    };
  }

  // Make GraphQL request to Shopify Admin API
  private async makeRequest(query: string, variables?: any): Promise<any> {
    const response = await fetch(`${this.adminApiUrl}/admin/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': this.accessToken
      },
      body: JSON.stringify({
        query,
        variables
      })
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }

    return data;
  }
}

// React hooks for Shopify integration
export function useShopifyProducts() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const contentManager = new ShopifyContentManager(
          process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!,
          process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!
        );
        
        const result = await contentManager.fetchProducts();
        setProducts(result.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}

export function useShopifyCollections() {
  const [collections, setCollections] = useState<ShopifyCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        const contentManager = new ShopifyContentManager(
          process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!,
          process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!
        );
        
        const collections = await contentManager.fetchCollections();
        setCollections(collections);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch collections');
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return { collections, loading, error };
}

export function useShopifyFeaturedCollections() {
  const [featuredCollections, setFeaturedCollections] = useState<ShopifyCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedCollections = async () => {
      try {
        setLoading(true);
        const contentManager = new ShopifyContentManager(
          process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!,
          process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!
        );
        
        const collections = await contentManager.fetchFeaturedCollections();
        setFeaturedCollections(collections);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch featured collections');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCollections();
  }, []);

  return { featuredCollections, loading, error };
}

// Webhook handlers for real-time updates
export class ShopifyWebhookHandler {
  static async handleProductUpdate(productData: any): Promise<void> {
    // Update product in your database/cache
    console.log('Product updated:', productData);
    
    // Trigger revalidation of product pages
    // await revalidatePath(`/products/${productData.handle}`);
  }

  static async handleCollectionUpdate(collectionData: any): Promise<void> {
    // Update collection in your database/cache
    console.log('Collection updated:', collectionData);
    
    // Trigger revalidation of collection pages
    // await revalidatePath(`/collections/${collectionData.handle}`);
  }

  static async handleProductCreate(productData: any): Promise<void> {
    // Add new product to your database/cache
    console.log('New product created:', productData);
  }

  static async handleProductDelete(productData: any): Promise<void> {
    // Remove product from your database/cache
    console.log('Product deleted:', productData);
  }
}

