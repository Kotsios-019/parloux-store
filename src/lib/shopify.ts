import { createStorefrontApiClient } from '@shopify/storefront-api-client';

// Shopify API configuration
export const SHOPIFY_CONFIG = {
  shopDomain: process.env.SHOPIFY_SHOP_DOMAIN || 'parloux-store-2.myshopify.com',
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '33b7d52840ee4b3bc693ba3b08a76cc4',
  // Remove admin token requirement for now
  apiVersion: '2024-01',
};

// Initialize Shopify client
const shopifyClient = createStorefrontApiClient({
  storeDomain: SHOPIFY_CONFIG.shopDomain,
  apiVersion: SHOPIFY_CONFIG.apiVersion,
  publicAccessToken: SHOPIFY_CONFIG.storefrontAccessToken,
});

// API endpoints
export const SHOPIFY_ENDPOINTS = {
  storefront: `https://${SHOPIFY_CONFIG.shopDomain}/api/${SHOPIFY_CONFIG.apiVersion}/graphql.json`,
};

// GraphQL queries for customer operations
export const CUSTOMER_QUERIES = {
  // Customer login mutation
  customerAccessTokenCreate: `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `,

  // Get customer data
  customer: `
    query customer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        email
        firstName
        lastName
        phone
        acceptsMarketing
        createdAt
        updatedAt
        defaultAddress {
          id
          firstName
          lastName
          company
          address1
          address2
          city
          province
          country
          zip
          phone
        }
      }
    }
  `,

  // Customer registration mutation
  customerCreate: `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
          firstName
          lastName
          phone
          acceptsMarketing
          createdAt
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `,

  // Customer update mutation
  customerUpdate: `
    mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
      customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
        customer {
          id
          email
          firstName
          lastName
          phone
          acceptsMarketing
          updatedAt
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `,

  // Password reset mutation
  customerRecover: `
    mutation customerRecover($email: String!) {
      customerRecover(email: $email) {
        customerUserErrors {
          field
          message
        }
      }
    }
  `,

  // Get customer orders
  customerOrders: `
    query customerOrders($customerAccessToken: String!, $first: Int!) {
      customer(customerAccessToken: $customerAccessToken) {
        orders(first: $first) {
          edges {
            node {
              id
              orderNumber
              processedAt
              totalPrice {
                amount
                currencyCode
              }
              fulfillmentStatus
              financialStatus
              lineItems(first: 10) {
                edges {
                  node {
                    title
                    quantity
                    variant {
                      title
                      image {
                        url
                        altText
                      }
                    }
                    originalTotalPrice {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
};

// Helper function to make GraphQL requests using the official Shopify client
export async function shopifyRequest(query: string, variables: any = {}) {
  console.log('Shopify API Debug:');
  console.log('Shop Domain:', SHOPIFY_CONFIG.shopDomain);
  console.log('Token:', SHOPIFY_CONFIG.storefrontAccessToken ? `SET (${SHOPIFY_CONFIG.storefrontAccessToken.substring(0, 8)}...)` : 'NOT SET');
  
  try {
    const response = await shopifyClient.request(query, { variables });
    return response;
  } catch (error: any) {
    console.error('Shopify API Error:', error);
    throw new Error(`Shopify API error: ${error.message}`);
  }
}