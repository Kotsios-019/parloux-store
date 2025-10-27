import { NextRequest, NextResponse } from 'next/server';
import { shopifyRequest, CUSTOMER_QUERIES } from '@/lib/shopify';
import { cookies } from 'next/headers';

// Update profile API route
export async function PUT(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('shopify-customer-token');

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { firstName, lastName, phone, acceptsMarketing } = await request.json();

    // Update customer
    const data = await shopifyRequest(CUSTOMER_QUERIES.customerUpdate, {
      customerAccessToken: token.value,
      customer: {
        firstName,
        lastName,
        phone: phone || null,
        acceptsMarketing,
      },
    });

    // Handle response structure - data is wrapped in a 'data' property
    const customerUpdate = (data as any).data?.customerUpdate || (data as any).customerUpdate;

    if (customerUpdate.customerUserErrors.length > 0) {
      const error = customerUpdate.customerUserErrors[0];
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      user: customerUpdate.customer,
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Profile update failed' },
      { status: 500 }
    );
  }
}
