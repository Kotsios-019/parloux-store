import { NextRequest, NextResponse } from 'next/server';
import { shopifyRequest, CUSTOMER_QUERIES } from '@/lib/shopify';
import { cookies } from 'next/headers';

// Login API route
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { 
          error: 'Email and password are required',
          type: 'VALIDATION_ERROR'
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          error: 'Please enter a valid email address',
          type: 'VALIDATION_ERROR'
        },
        { status: 400 }
      );
    }

    // Create customer access token
    const data = await shopifyRequest(CUSTOMER_QUERIES.customerAccessTokenCreate, {
      input: {
        email,
        password,
      },
    });

    console.log('Login response:', JSON.stringify(data, null, 2));

    // Handle response structure - data is wrapped in a 'data' property
    const customerAccessTokenCreate = (data as any).data?.customerAccessTokenCreate || (data as any).customerAccessTokenCreate;
    
    // Check for errors in the response
    if (customerAccessTokenCreate?.customerUserErrors?.length > 0) {
      const error = customerAccessTokenCreate.customerUserErrors[0];
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Check if access token was created successfully
    if (!customerAccessTokenCreate?.customerAccessToken) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 400 }
      );
    }

    const { accessToken, expiresAt } = customerAccessTokenCreate.customerAccessToken;

    // Get customer data
    const customerData = await shopifyRequest(CUSTOMER_QUERIES.customer, {
      customerAccessToken: accessToken,
    });

    console.log('Customer data response:', JSON.stringify(customerData, null, 2));

    // Handle response structure - data is wrapped in a 'data' property
    const customer = (customerData as any).data?.customer || (customerData as any).customer;
    
    if (!customer) {
      return NextResponse.json(
        { error: 'Failed to retrieve customer data' },
        { status: 500 }
      );
    }

    // Set HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set('shopify-customer-token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(expiresAt),
      path: '/',
    });

    return NextResponse.json({
      success: true,
      user: customer,
      redirectTo: '/account', // Redirect to account page after successful login
    });
  } catch (error) {
    console.error('Login error:', error);
    
    // Handle different types of errors
    if (error instanceof Error) {
      if (error.message.includes('fetch')) {
        return NextResponse.json(
          { 
            error: 'Unable to connect to the server. Please check your internet connection.',
            type: 'NETWORK_ERROR'
          },
          { status: 503 }
        );
      }
      
      if (error.message.includes('timeout')) {
        return NextResponse.json(
          { 
            error: 'Request timed out. Please try again.',
            type: 'TIMEOUT_ERROR'
          },
          { status: 408 }
        );
      }
    }
    
    return NextResponse.json(
      { 
        error: 'Login failed. Please try again.',
        type: 'SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}
