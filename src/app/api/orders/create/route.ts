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

    const orderData = await request.json();
    const { shippingAddress, billingAddress, paymentInfo, items, total } = orderData;

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

    // Create order in Shopify using Admin API
    // Note: In a real implementation, you would use Shopify's Admin API
    // For now, we'll create a mock order and store it in customer metafields
    
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const order = {
      id: orderId,
      orderNumber: `#${orderId.slice(-8).toUpperCase()}`,
      customerId: customer.id,
      customerEmail: customer.email,
      customerName: `${customer.firstName} ${customer.lastName}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      shippingAddress,
      billingAddress,
      paymentInfo: {
        ...paymentInfo,
        cardNumber: `**** **** **** ${paymentInfo.cardNumber.slice(-4)}`, // Mask card number
      },
      items: items.map((item: any) => ({
        ...item,
        price: item.variant?.price || 0,
        total: (item.variant?.price || 0) * item.quantity,
      })),
      subtotal: total,
      shipping: 9.99,
      tax: total * 0.08,
      total: total + 9.99 + (total * 0.08),
    };

    // Store order in customer metafields
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
            key: 'orders',
            value: JSON.stringify([order]), // In real implementation, append to existing orders
            type: 'json',
          }
        ]
      }
    });

    // In a real implementation, you would also:
    // 1. Process payment with Stripe/PayPal
    // 2. Create order in Shopify Admin API
    // 3. Send confirmation email
    // 4. Update inventory
    // 5. Generate shipping labels

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        total: order.total,
      }
    });

  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
