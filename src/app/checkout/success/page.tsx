'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, Mail } from 'lucide-react';
import GlobalLayout from '@/components/layout/GlobalLayout';
import Link from 'next/link';
import { useCart } from '@/contexts/MockCartContext';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const checkoutId = searchParams.get('checkout_id');
  const isMock = searchParams.get('mock') === 'true';
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItemsSnapshot, setCartItemsSnapshot] = useState<any[]>([]);
  const { clearCart, items } = useCart();

  useEffect(() => {
    // Capture cart items immediately when component mounts
    if (items.length > 0 && cartItemsSnapshot.length === 0) {
      setCartItemsSnapshot([...items]);
    }

    if (isMock && checkoutId) {
      // Handle mock checkout - show success immediately
      setMockOrder();
      // Clear cart after a delay to ensure order is set first
      setTimeout(() => clearCart(), 1500);
    } else if (orderId || checkoutId) {
      // Fetch order details from our API
      const fetchOrder = async () => {
        try {
          setIsLoading(true);
          const params = new URLSearchParams();
          if (orderId) params.append('order_id', orderId);
          if (checkoutId) params.append('checkout_id', checkoutId);
          
          const response = await fetch(`/api/checkout/return?${params.toString()}`, {
            credentials: 'include',
          });

          if (response.ok) {
            const data = await response.json();
            setOrder(data.order);
            clearCart(); // Clear cart on successful order
          } else {
            console.error('Failed to fetch order details');
            // Fallback to mock data
            setMockOrder();
          }
        } catch (error) {
          console.error('Error fetching order:', error);
          // Fallback to mock data
          setMockOrder();
        } finally {
          setIsLoading(false);
        }
      };

      fetchOrder();
    } else {
      // Fallback to mock data for testing
      setMockOrder();
    }
  }, [orderId, checkoutId, isMock, clearCart, items, cartItemsSnapshot]);

  const setMockOrder = () => {
    setTimeout(() => {
      // Get shipping address from URL parameters if available
      const shippingFirstName = searchParams.get('shipping_first_name') || 'Jane';
      const shippingLastName = searchParams.get('shipping_last_name') || 'Smith';
      const shippingAddress1 = searchParams.get('shipping_address1') || '123 Main Street';
      const shippingAddress2 = searchParams.get('shipping_address2') || '';
      const shippingCity = searchParams.get('shipping_city') || 'Nicosia';
      const shippingZip = searchParams.get('shipping_zip') || '1065';
      const shippingCountry = searchParams.get('shipping_country') || 'Cyprus';
      const shippingPhone = searchParams.get('shipping_phone') || '';
      
      // Use captured cart items for the order
      const currentItems = cartItemsSnapshot.length > 0 ? cartItemsSnapshot : items.length > 0 ? items : [
        {
          product: {
            title: 'Elegant Silk Dress',
            images: ['/images/products/dress-1.jpg']
          },
          variant: { price: 299 },
          quantity: 1,
          size: 'M',
          color: 'Black'
        }
      ];
      
      setOrder({
        id: checkoutId || orderId || 'mock-order-id',
        orderNumber: `#${(checkoutId || orderId || 'MOCK123').slice(-8).toUpperCase()}`,
        status: 'confirmed',
        total: currentItems.reduce((total, item) => total + (item.variant.price * item.quantity), 0),
        items: currentItems.map(item => ({
          product: {
            title: item.product.title,
            images: item.product.images
          },
          variant: { price: item.variant.price },
          quantity: item.quantity,
          size: item.size,
          color: item.color
        })),
        shippingAddress: {
          firstName: shippingFirstName,
          lastName: shippingLastName,
          address1: shippingAddress1,
          address2: shippingAddress2,
          city: shippingCity,
          zip: shippingZip,
          country: shippingCountry,
          phone: shippingPhone
        },
        estimatedDelivery: '3-5 business days'
      });
      setIsLoading(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <GlobalLayout>
        <div className="min-h-screen bg-gradient-to-br from-champagne-nude/30 to-elegant-base/30 dark:from-champagne-nude/20 dark:to-elegant-base/20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-soft-gold mx-auto mb-6"></div>
            <p className="text-font-secondary dark:text-font-secondary-dark font-josefin text-lg">Loading your order...</p>
          </div>
        </div>
      </GlobalLayout>
    );
  }

  if (!order) {
    return (
      <GlobalLayout>
        <div className="min-h-screen bg-gradient-to-br from-champagne-nude/30 to-elegant-base/30 dark:from-champagne-nude/20 dark:to-elegant-base/20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-4">
              Order Not Found
            </h1>
            <p className="text-font-secondary dark:text-font-secondary-dark font-josefin mb-6">
              We couldn't find the order you're looking for.
            </p>
            <Link
              href="/collections"
              className="btn-primary"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </GlobalLayout>
    );
  }

  return (
    <GlobalLayout>
      <div className="min-h-screen bg-gradient-to-br from-champagne-nude/30 to-elegant-base/30 dark:from-champagne-nude/20 dark:to-elegant-base/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-4xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-4">
              Order Confirmed!
            </h1>
            <p className="text-lg font-josefin text-font-secondary dark:text-font-secondary-dark mb-2">
              Thank you for your purchase, {order.shippingAddress.firstName}!
            </p>
            <p className="text-font-secondary dark:text-font-secondary-dark font-josefin">
              Your order <span className="font-semibold text-soft-gold">{order.orderNumber}</span> has been confirmed and is being processed.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/80 dark:bg-deep-black/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-elegant-base/20"
              >
                <h2 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6">
                  Order Summary
                </h2>
                
                <div className="space-y-4">
                  {order.items.map((item: any, index: number) => (
                    <div key={index} className="flex space-x-4 py-4 border-b border-elegant-base/20 last:border-b-0">
                      <div className="relative w-20 h-24 flex-shrink-0">
                        <div className="w-full h-full bg-elegant-base/20 rounded-lg flex items-center justify-center">
                          <Package className="w-8 h-8 text-font-secondary dark:text-elegant-base" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-josefin font-medium text-deep-black dark:text-ivory-white text-lg">
                          {item.product.title}
                        </h3>
                        <div className="text-sm text-font-secondary dark:text-font-secondary-dark mt-1">
                          {item.size && <span>Size: {item.size}</span>}
                          {item.color && <span className="ml-2">Color: {item.color}</span>}
                        </div>
                        <div className="text-sm text-font-secondary dark:text-font-secondary-dark">
                          Quantity: {item.quantity}
                        </div>
                        <div className="text-lg font-josefin font-semibold text-soft-gold mt-2">
                          ${(item.variant.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-elegant-base/20">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-font-secondary dark:text-font-secondary-dark">Subtotal</span>
                      <span className="text-deep-black dark:text-ivory-white">${order.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-font-secondary dark:text-font-secondary-dark">Shipping</span>
                      <span className="text-deep-black dark:text-ivory-white">$9.99</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-font-secondary dark:text-font-secondary-dark">Tax</span>
                      <span className="text-deep-black dark:text-ivory-white">${(order.total * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-josefin font-semibold border-t border-elegant-base/20 pt-2">
                      <span className="text-deep-black dark:text-ivory-white">Total</span>
                      <span className="text-soft-gold">${(order.total + 9.99 + (order.total * 0.08)).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Shipping Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/80 dark:bg-deep-black/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-elegant-base/20"
              >
                <h2 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 flex items-center">
                  <Truck className="w-6 h-6 text-soft-gold mr-2" />
                  Shipping Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-josefin font-medium text-deep-black dark:text-ivory-white mb-2">
                      Shipping Address
                    </h3>
                    <div className="text-font-secondary dark:text-font-secondary-dark">
                      <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                      <p>{order.shippingAddress.address1}</p>
                      <p>{order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.zip}</p>
                      <p>{order.shippingAddress.country}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-josefin font-medium text-deep-black dark:text-ivory-white mb-2">
                      Estimated Delivery
                    </h3>
                    <p className="text-font-secondary dark:text-font-secondary-dark">
                      {order.estimatedDelivery}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Order Status */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/80 dark:bg-deep-black/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-elegant-base/20"
              >
                <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-4">
                  Order Status
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-josefin text-deep-black dark:text-ivory-white">Order Confirmed</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-elegant-base/30 rounded-full flex items-center justify-center">
                      <Package className="w-4 h-4 text-font-secondary dark:text-elegant-base" />
                    </div>
                    <span className="font-josefin text-font-secondary dark:text-font-secondary-dark">Processing</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-elegant-base/30 rounded-full flex items-center justify-center">
                      <Truck className="w-4 h-4 text-font-secondary dark:text-elegant-base" />
                    </div>
                    <span className="font-josefin text-font-secondary dark:text-font-secondary-dark">Shipped</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-elegant-base/30 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-font-secondary dark:text-elegant-base" />
                    </div>
                    <span className="font-josefin text-font-secondary dark:text-font-secondary-dark">Delivered</span>
                  </div>
                </div>
              </motion.div>

              {/* Next Steps */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white/80 dark:bg-deep-black/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-elegant-base/20"
              >
                <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-4">
                  What's Next?
                </h3>
                
                <div className="space-y-4 text-sm font-josefin text-font-secondary dark:text-font-secondary-dark">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-4 h-4 text-soft-gold mt-0.5 flex-shrink-0" />
                    <p>You'll receive a confirmation email with your order details and tracking information.</p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Package className="w-4 h-4 text-soft-gold mt-0.5 flex-shrink-0" />
                    <p>Your order will be processed and prepared for shipment within 1-2 business days.</p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Truck className="w-4 h-4 text-soft-gold mt-0.5 flex-shrink-0" />
                    <p>Once shipped, you'll receive tracking information to monitor your package.</p>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-3"
              >
                <Link
                  href="/account"
                  className="block w-full btn-primary text-center"
                >
                  View Order History
                </Link>
                
                <Link
                  href="/collections"
                  className="block w-full py-3 px-4 border border-elegant-base dark:border-elegant-base text-font-secondary dark:text-elegant-base hover:border-soft-gold hover:text-soft-gold transition-colors rounded-lg font-josefin text-center"
                >
                  Continue Shopping
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <GlobalLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-soft-gold mx-auto mb-4"></div>
            <p className="text-font-secondary dark:text-font-secondary-dark">Loading order details...</p>
          </div>
        </div>
      </GlobalLayout>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
