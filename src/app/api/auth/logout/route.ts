import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Logout API route
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    
    // Remove the customer token cookie
    cookieStore.delete('shopify-customer-token');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}
