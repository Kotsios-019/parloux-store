import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { shopifyRequest, CUSTOMER_QUERIES } from '@/lib/shopify';

// Register API route
export async function POST(request: NextRequest) {
  try {
    // Debug logging
    console.log('Environment check:');
    console.log('SHOP_DOMAIN:', process.env.NEXT_PUBLIC_SHOPIFY_SHOP_DOMAIN);
    console.log('STOREFRONT_TOKEN:', process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ? 'SET' : 'NOT SET');
    
    const { email, password, firstName, lastName, phone, acceptsMarketing } = await request.json();

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Email, password, first name, and last name are required' },
        { status: 400 }
      );
    }

    // Create customer
    const customerInput: any = {
      email,
      password,
      firstName,
      lastName,
      acceptsMarketing: acceptsMarketing || false,
    };
    
    // Only include phone if it's provided and valid
    if (phone && phone.trim() !== '') {
      customerInput.phone = phone;
    }
    
    const data = await shopifyRequest(CUSTOMER_QUERIES.customerCreate, {
      input: customerInput,
    });

    console.log('Customer Create Response:', JSON.stringify(data, null, 2));

    // Handle GraphQL errors (like rate limiting)
    if ((data as any).errors?.graphQLErrors?.length > 0) {
      const error = (data as any).errors.graphQLErrors[0];
      console.log('GraphQL Error Details:', JSON.stringify(error, null, 2));
      
      if (error.extensions?.code === 'THROTTLED') {
        // Rate limited - customer might have been created, try to log in
        console.log('Rate limited, attempting login...');
      } else {
        return NextResponse.json(
          { error: `Registration failed: ${error.message}` },
          { status: 400 }
        );
      }
    }

    // Handle response structure - data is wrapped in a 'data' property
    const customerCreate = (data as any).data?.customerCreate || (data as any).customerCreate;
    
    if (customerCreate?.customerUserErrors?.length > 0) {
      const error = customerCreate.customerUserErrors[0];
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Automatically log in the user after registration
    const loginData = await shopifyRequest(CUSTOMER_QUERIES.customerAccessTokenCreate, {
      input: {
        email,
        password,
      },
    });

    // Handle response structure - data is wrapped in a 'data' property
    const loginCreate = (loginData as any).data?.customerAccessTokenCreate || (loginData as any).customerAccessTokenCreate;
    
    if (loginCreate?.customerUserErrors?.length > 0) {
      return NextResponse.json(
        { error: 'Registration successful, but automatic login failed. Please log in manually.' },
        { status: 200 }
      );
    }

    const { accessToken, expiresAt } = loginCreate.customerAccessToken;

    // Get full customer data
    const customerData = await shopifyRequest(CUSTOMER_QUERIES.customer, {
      customerAccessToken: accessToken,
    });

    // Handle response structure - data is wrapped in a 'data' property
    const customer = (customerData as any).data?.customer || (customerData as any).customer;

    // Set HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      user: customer,
      redirectTo: '/account', // Redirect to account page after successful registration
    });

    const cookieStore = await cookies();
    cookieStore.set('shopify-customer-token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(expiresAt),
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}
