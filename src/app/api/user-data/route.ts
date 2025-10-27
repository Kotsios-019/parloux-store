import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { shopifyRequest, CUSTOMER_QUERIES } from '@/lib/shopify';

// Get user's wishlist and cart data
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('shopify-customer-token');

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get customer metafields for wishlist and cart
    const data = await shopifyRequest(`
      query customerMetafields($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
          id
          metafields(first: 10, namespace: "parloux") {
            edges {
              node {
                id
                key
                value
                type
              }
            }
          }
        }
      }
    `, {
      customerAccessToken: token.value,
    });

    const customer = (data as any).data?.customer || (data as any).customer;
    
    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Parse metafields
    const metafields = customer.metafields?.edges || [];
    const wishlistData = metafields.find((mf: any) => mf.node.key === 'wishlist')?.node?.value || '[]';
    const cartData = metafields.find((mf: any) => mf.node.key === 'cart')?.node?.value || '[]';

    return NextResponse.json({
      wishlist: JSON.parse(wishlistData),
      cart: JSON.parse(cartData),
    });
  } catch (error) {
    console.error('Get user data error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve user data' },
      { status: 500 }
    );
  }
}

// Save user's wishlist and cart data
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('shopify-customer-token');

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { wishlist, cart } = await request.json();

    // First, get customer ID
    const customerData = await shopifyRequest(CUSTOMER_QUERIES.customer, {
      customerAccessToken: token.value,
    });

    const customer = (customerData as any).data?.customer || (customerData as any).customer;
    
    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Update wishlist metafield
    if (wishlist !== undefined) {
      await shopifyRequest(`
        mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
          customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
            customer {
              id
            }
            customerUserErrors {
              field
              message
            }
          }
        }
      `, {
        customerAccessToken: token.value,
        customer: {
          metafields: [
            {
              namespace: 'parloux',
              key: 'wishlist',
              value: JSON.stringify(wishlist),
              type: 'json',
            }
          ]
        }
      });
    }

    // Update cart metafield
    if (cart !== undefined) {
      await shopifyRequest(`
        mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
          customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
            customer {
              id
            }
            customerUserErrors {
              field
              message
            }
          }
        }
      `, {
        customerAccessToken: token.value,
        customer: {
          metafields: [
            {
              namespace: 'parloux',
              key: 'cart',
              value: JSON.stringify(cart),
              type: 'json',
            }
          ]
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Save user data error:', error);
    return NextResponse.json(
      { error: 'Failed to save user data' },
      { status: 500 }
    );
  }
}
