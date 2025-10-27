import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { shopifyRequest } from '@/lib/shopify';

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

    const { searchParams } = new URL(request.url);
    const checkoutId = searchParams.get('checkout_id');
    const orderId = searchParams.get('order_id');

    if (!checkoutId && !orderId) {
      return NextResponse.json(
        { error: 'Missing checkout or order ID' },
        { status: 400 }
      );
    }

    // If we have an order ID, the checkout was successful
    if (orderId) {
      // Get order details from Shopify
      const orderData = await shopifyRequest(`
        query order($id: ID!) {
          order(id: $id) {
            id
            orderNumber
            totalPrice {
              amount
              currencyCode
            }
            processedAt
            fulfillmentStatus
            lineItems(first: 250) {
              edges {
                node {
                  id
                  title
                  quantity
                  variant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
            shippingAddress {
              firstName
              lastName
              address1
              address2
              city
              zip
              country
              phone
            }
          }
        }
      `, {
        id: `gid://shopify/Order/${orderId}`,
      });

      const order = orderData.data?.order;
      
      if (order) {
        // Clear the cart since order was successful
        // Note: In a real implementation, you'd clear the cart here
        
        return NextResponse.json({
          success: true,
          order: {
            id: order.id,
            orderNumber: order.orderNumber,
            totalPrice: order.totalPrice,
            processedAt: order.processedAt,
            fulfillmentStatus: order.fulfillmentStatus,
            lineItems: order.lineItems.edges.map((edge: any) => edge.node),
            shippingAddress: order.shippingAddress,
          }
        });
      }
    }

    // If we only have checkout ID, check if it was completed
    if (checkoutId) {
      const checkoutData = await shopifyRequest(`
        query checkout($id: ID!) {
          checkout(id: $id) {
            id
            completedAt
            order {
              id
              orderNumber
            }
            totalPrice {
              amount
              currencyCode
            }
          }
        }
      `, {
        id: checkoutId,
      });

      const checkout = checkoutData.data?.checkout;
      
      if (checkout?.completedAt && checkout?.order) {
        return NextResponse.json({
          success: true,
          order: {
            id: checkout.order.id,
            orderNumber: checkout.order.orderNumber,
            totalPrice: checkout.totalPrice,
          }
        });
      }
    }

    return NextResponse.json(
      { error: 'Order not found or not completed' },
      { status: 404 }
    );

  } catch (error) {
    console.error('Checkout return handler error:', error);
    return NextResponse.json(
      { error: 'Failed to process checkout return' },
      { status: 500 }
    );
  }
}

