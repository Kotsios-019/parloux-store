import { NextRequest, NextResponse } from 'next/server';
import { shopifyRequest, CUSTOMER_QUERIES } from '@/lib/shopify';
import { cookies } from 'next/headers';

// Get current user API route
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

    // Get customer data
    const data = await shopifyRequest(CUSTOMER_QUERIES.customer, {
      customerAccessToken: token.value,
    });

    console.log('Customer data response:', JSON.stringify(data, null, 2));

    // Handle response structure - data is wrapped in a 'data' property
    const customer = (data as any).data?.customer || (data as any).customer;
    
    // Ensure we have valid customer data
    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    // Return only serializable customer data
    const customerData = {
      id: customer.id,
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: customer.phone,
      acceptsMarketing: customer.acceptsMarketing,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
      defaultAddress: customer.defaultAddress,
    };

    return NextResponse.json(customerData);
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
}
