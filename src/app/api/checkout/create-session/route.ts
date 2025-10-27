import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { shopifyRequest } from '@/lib/shopify';

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

    const { shippingAddress, billingAddress, items, total } = await request.json();

    // First, get customer information
    const customerData = await shopifyRequest(`
      query customer($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
          id
          firstName
          lastName
          email
        }
      }
    `, {
      customerAccessToken: token.value,
    });

    const customer = (customerData as any).data?.customer || (customerData as any).customer;
    
    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // For now, since we're using mock products, let's create a simple checkout
    // In production, you would need real Shopify product variants
    const mockCheckoutId = `checkout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Store checkout information in customer metafields for reference
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
            key: 'current_checkout_id',
            value: mockCheckoutId,
            type: 'single_line_text_field',
          },
          {
            namespace: 'parloux',
            key: 'checkout_items',
            value: JSON.stringify(items),
            type: 'json',
          },
          {
            namespace: 'parloux',
            key: 'checkout_shipping',
            value: JSON.stringify(shippingAddress),
            type: 'json',
          },
          {
            namespace: 'parloux',
            key: 'checkout_billing',
            value: JSON.stringify(billingAddress),
            type: 'json',
          }
        ]
      }
    });

    // For development/testing, redirect to a mock Shopify checkout
    // In production, this would be a real Shopify checkout URL
    // The URL will include the shipping address as parameters to pre-populate
    const checkoutParams = new URLSearchParams({
      checkout_id: mockCheckoutId,
      mock: 'true',
      // Pre-populate shipping address
      shipping_first_name: shippingAddress.firstName,
      shipping_last_name: shippingAddress.lastName,
      shipping_address1: shippingAddress.address1,
      shipping_address2: shippingAddress.address2 || '',
      shipping_city: shippingAddress.city,
      shipping_zip: shippingAddress.zip,
      shipping_country: shippingAddress.country,
      shipping_phone: shippingAddress.phone,
    });
    
    const mockCheckoutUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/success?${checkoutParams.toString()}`;

    return NextResponse.json({
      success: true,
      checkout: {
        id: mockCheckoutId,
        webUrl: mockCheckoutUrl,
        totalPrice: {
          amount: total.toString(),
          currencyCode: 'USD'
        },
      }
    });

  } catch (error) {
    console.error('Create checkout session error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
