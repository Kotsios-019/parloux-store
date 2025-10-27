import { NextRequest, NextResponse } from 'next/server';
import { shopifyRequest, CUSTOMER_QUERIES } from '@/lib/shopify';

// Reset password API route
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Send password reset email
    const data = await shopifyRequest(CUSTOMER_QUERIES.customerRecover, {
      email,
    });

    // Handle response structure - data is wrapped in a 'data' property
    const customerRecover = (data as any).data?.customerRecover || (data as any).customerRecover;

    if (customerRecover.customerUserErrors.length > 0) {
      const error = customerRecover.customerUserErrors[0];
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Password reset email sent',
    });
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Password reset failed' },
      { status: 500 }
    );
  }
}


