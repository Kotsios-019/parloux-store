'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/MockCartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import GlobalLayout from '@/components/layout/GlobalLayout';
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  CreditCard, 
  CheckCircle, 
  Truck,
  Shield,
  Lock
} from 'lucide-react';
import Image from 'next/image';

interface ShippingAddress {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone: string;
}

interface BillingAddress {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone: string;
}

interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

type CheckoutStep = 'shipping' | 'billing' | 'payment' | 'review';

export default function CheckoutPage() {
  const { items, getTotalPrice, getItemCount, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Form data
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    province: '',
    country: 'Cyprus',
    zip: '',
    phone: user?.phone || '',
  });
  
  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    province: '',
    country: 'Cyprus',
    zip: '',
    phone: '',
  });
  
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });
  
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [saveBillingAddress, setSaveBillingAddress] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Redirect if not authenticated or cart is empty
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    if (getItemCount() === 0) {
      router.push('/collections');
      return;
    }
  }, [isAuthenticated, getItemCount, router]);

  const steps = [
    { id: 'shipping', title: 'Shipping', icon: Truck },
    { id: 'billing', title: 'Billing', icon: MapPin },
    { id: 'payment', title: 'Payment', icon: CreditCard },
    { id: 'review', title: 'Review', icon: CheckCircle },
  ];

  const validateShipping = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!shippingAddress.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!shippingAddress.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!shippingAddress.address1.trim()) newErrors.address1 = 'Address is required';
    if (!shippingAddress.city.trim()) newErrors.city = 'City is required';
    if (!shippingAddress.zip.trim()) newErrors.zip = 'ZIP/Postal code is required';
    if (!shippingAddress.phone.trim()) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateBilling = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!sameAsShipping) {
      if (!billingAddress.firstName.trim()) newErrors.billingFirstName = 'First name is required';
      if (!billingAddress.lastName.trim()) newErrors.billingLastName = 'Last name is required';
      if (!billingAddress.address1.trim()) newErrors.billingAddress1 = 'Address is required';
      if (!billingAddress.city.trim()) newErrors.billingCity = 'City is required';
      if (!billingAddress.zip.trim()) newErrors.billingZip = 'ZIP/Postal code is required';
      if (!billingAddress.phone.trim()) newErrors.billingPhone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!acceptTerms) newErrors.terms = 'You must accept the terms and conditions';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;
    
    switch (currentStep) {
      case 'shipping':
        isValid = validateShipping();
        if (isValid) setCurrentStep('billing');
        break;
      case 'billing':
        isValid = validateBilling();
        if (isValid) setCurrentStep('payment');
        break;
      case 'payment':
        isValid = validatePayment();
        if (isValid) setCurrentStep('review');
        break;
    }
  };

  const handlePrevious = () => {
    switch (currentStep) {
      case 'billing':
        setCurrentStep('shipping');
        break;
      case 'payment':
        setCurrentStep('billing');
        break;
      case 'review':
        setCurrentStep('payment');
        break;
    }
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    
    try {
      // Create Shopify checkout session
      const checkoutData = {
        shippingAddress,
        billingAddress: sameAsShipping ? shippingAddress : billingAddress,
        items: items.map(item => ({
          productId: item.product.id,
          variantId: item.variant.id,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })),
        total: getTotalPrice(),
      };

      const response = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(checkoutData),
      });

      if (response.ok) {
        const data = await response.json();
        // Redirect to Shopify's secure checkout
        window.location.href = data.checkout.webUrl;
      } else {
        const error = await response.json();
        setErrors({ general: error.error || 'Failed to create checkout session' });
      }
    } catch (error) {
      setErrors({ general: 'An error occurred while creating checkout session' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated || getItemCount() === 0) {
    return (
      <GlobalLayout>
        <div className="min-h-screen bg-gradient-to-br from-champagne-nude/30 to-elegant-base/30 dark:from-champagne-nude/20 dark:to-elegant-base/20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-soft-gold mx-auto mb-6"></div>
            <p className="text-font-secondary dark:text-font-secondary-dark font-josefin text-lg">Loading...</p>
          </div>
        </div>
      </GlobalLayout>
    );
  }

  return (
    <GlobalLayout>
      <div className="min-h-screen bg-gradient-to-br from-champagne-nude/30 to-elegant-base/30 dark:from-champagne-nude/20 dark:to-elegant-base/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-4">
              Checkout
            </h1>
            <p className="text-font-secondary dark:text-font-secondary-dark font-josefin">
              Complete your order securely
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`
                      flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                      ${isActive 
                        ? 'border-soft-gold bg-soft-gold text-deep-black' 
                        : isCompleted 
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-elegant-base text-font-secondary dark:text-elegant-base'
                      }
                    `}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`
                      ml-2 font-josefin font-medium transition-colors duration-300
                      ${isActive 
                        ? 'text-soft-gold' 
                        : isCompleted 
                          ? 'text-green-500'
                          : 'text-font-secondary dark:text-elegant-base'
                      }
                    `}>
                      {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <ChevronRight className="w-5 h-5 text-elegant-base dark:text-elegant-base mx-4" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 dark:bg-deep-black/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-elegant-base/20">
                <AnimatePresence mode="wait">
                  {currentStep === 'shipping' && (
                    <motion.div
                      key="shipping"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 flex items-center">
                        <Truck className="w-6 h-6 text-soft-gold mr-2" />
                        Shipping Information
                      </h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-josefin font-medium text-deep-black dark:text-ivory-white mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            value={shippingAddress.firstName}
                            onChange={(e) => setShippingAddress(prev => ({ ...prev, firstName: e.target.value }))}
                            className={`w-full px-4 py-3 border rounded-lg bg-transparent text-deep-black dark:text-ivory-white placeholder-font-secondary dark:placeholder-font-secondary-dark focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent ${
                              errors.firstName ? 'border-red-500' : 'border-elegant-base dark:border-elegant-base'
                            }`}
                            placeholder="First name"
                          />
                          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-josefin font-medium text-deep-black dark:text-ivory-white mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            value={shippingAddress.lastName}
                            onChange={(e) => setShippingAddress(prev => ({ ...prev, lastName: e.target.value }))}
                            className={`w-full px-4 py-3 border rounded-lg bg-transparent text-deep-black dark:text-ivory-white placeholder-font-secondary dark:placeholder-font-secondary-dark focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent ${
                              errors.lastName ? 'border-red-500' : 'border-elegant-base dark:border-elegant-base'
                            }`}
                            placeholder="Last name"
                          />
                          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-josefin font-medium text-deep-black dark:text-ivory-white mb-2">
                          Company (Optional)
                        </label>
                        <input
                          type="text"
                          value={shippingAddress.company}
                          onChange={(e) => setShippingAddress(prev => ({ ...prev, company: e.target.value }))}
                          className="w-full px-4 py-3 border border-elegant-base dark:border-elegant-base rounded-lg bg-transparent text-deep-black dark:text-ivory-white placeholder-font-secondary dark:placeholder-font-secondary-dark focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent"
                          placeholder="Company name"
                        />
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-josefin font-medium text-deep-black dark:text-ivory-white mb-2">
                          Address *
                        </label>
                        <input
                          type="text"
                          value={shippingAddress.address1}
                          onChange={(e) => setShippingAddress(prev => ({ ...prev, address1: e.target.value }))}
                          className={`w-full px-4 py-3 border rounded-lg bg-transparent text-deep-black dark:text-ivory-white placeholder-font-secondary dark:placeholder-font-secondary-dark focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent ${
                            errors.address1 ? 'border-red-500' : 'border-elegant-base dark:border-elegant-base'
                          }`}
                          placeholder="Street address"
                        />
                        {errors.address1 && <p className="text-red-500 text-sm mt-1">{errors.address1}</p>}
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-josefin font-medium text-deep-black dark:text-ivory-white mb-2">
                          Apartment, suite, etc. (Optional)
                        </label>
                        <input
                          type="text"
                          value={shippingAddress.address2}
                          onChange={(e) => setShippingAddress(prev => ({ ...prev, address2: e.target.value }))}
                          className="w-full px-4 py-3 border border-elegant-base dark:border-elegant-base rounded-lg bg-transparent text-deep-black dark:text-ivory-white placeholder-font-secondary dark:placeholder-font-secondary-dark focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent"
                          placeholder="Apartment, suite, etc."
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-josefin font-medium text-deep-black dark:text-ivory-white mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            value={shippingAddress.city}
                            onChange={(e) => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
                            className={`w-full px-4 py-3 border rounded-lg bg-transparent text-deep-black dark:text-ivory-white placeholder-font-secondary dark:placeholder-font-secondary-dark focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent ${
                              errors.city ? 'border-red-500' : 'border-elegant-base dark:border-elegant-base'
                            }`}
                            placeholder="City"
                          />
                          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-josefin font-medium text-deep-black dark:text-ivory-white mb-2">
                            ZIP/Postal Code *
                          </label>
                          <input
                            type="text"
                            value={shippingAddress.zip}
                            onChange={(e) => setShippingAddress(prev => ({ ...prev, zip: e.target.value }))}
                            className={`w-full px-4 py-3 border rounded-lg bg-transparent text-deep-black dark:text-ivory-white placeholder-font-secondary dark:placeholder-font-secondary-dark focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent ${
                              errors.zip ? 'border-red-500' : 'border-elegant-base dark:border-elegant-base'
                            }`}
                            placeholder="ZIP/Postal Code"
                          />
                          {errors.zip && <p className="text-red-500 text-sm mt-1">{errors.zip}</p>}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-josefin font-medium text-deep-black dark:text-ivory-white mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={shippingAddress.phone}
                          onChange={(e) => setShippingAddress(prev => ({ ...prev, phone: e.target.value }))}
                          className={`w-full px-4 py-3 border rounded-lg bg-transparent text-deep-black dark:text-ivory-white placeholder-font-secondary dark:placeholder-font-secondary-dark focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent ${
                            errors.phone ? 'border-red-500' : 'border-elegant-base dark:border-elegant-base'
                          }`}
                          placeholder="Phone number"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 'billing' && (
                    <motion.div
                      key="billing"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 flex items-center">
                        <MapPin className="w-6 h-6 text-soft-gold mr-2" />
                        Billing Information
                      </h2>
                      
                      <div className="mb-6">
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={sameAsShipping}
                            onChange={(e) => setSameAsShipping(e.target.checked)}
                            className="w-4 h-4 text-soft-gold border-elegant-base rounded focus:ring-soft-gold focus:ring-2"
                          />
                          <span className="font-josefin text-deep-black dark:text-ivory-white">
                            Same as shipping address
                          </span>
                        </label>
                      </div>
                      
                      {!sameAsShipping && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-josefin font-medium text-deep-black dark:text-ivory-white mb-2">
                                First Name *
                              </label>
                              <input
                                type="text"
                                value={billingAddress.firstName}
                                onChange={(e) => setBillingAddress(prev => ({ ...prev, firstName: e.target.value }))}
                                className={`w-full px-4 py-3 border rounded-lg bg-transparent text-deep-black dark:text-ivory-white placeholder-font-secondary dark:placeholder-font-secondary-dark focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent ${
                                  errors.billingFirstName ? 'border-red-500' : 'border-elegant-base dark:border-elegant-base'
                                }`}
                                placeholder="First name"
                              />
                              {errors.billingFirstName && <p className="text-red-500 text-sm mt-1">{errors.billingFirstName}</p>}
                            </div>
                            
                            <div>
                              <label className="block text-sm font-josefin font-medium text-deep-black dark:text-ivory-white mb-2">
                                Last Name *
                              </label>
                              <input
                                type="text"
                                value={billingAddress.lastName}
                                onChange={(e) => setBillingAddress(prev => ({ ...prev, lastName: e.target.value }))}
                                className={`w-full px-4 py-3 border rounded-lg bg-transparent text-deep-black dark:text-ivory-white placeholder-font-secondary dark:placeholder-font-secondary-dark focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent ${
                                  errors.billingLastName ? 'border-red-500' : 'border-elegant-base dark:border-elegant-base'
                                }`}
                                placeholder="Last name"
                              />
                              {errors.billingLastName && <p className="text-red-500 text-sm mt-1">{errors.billingLastName}</p>}
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-josefin font-medium text-deep-black dark:text-ivory-white mb-2">
                              Address *
                            </label>
                            <input
                              type="text"
                              value={billingAddress.address1}
                              onChange={(e) => setBillingAddress(prev => ({ ...prev, address1: e.target.value }))}
                              className={`w-full px-4 py-3 border rounded-lg bg-transparent text-deep-black dark:text-ivory-white placeholder-font-secondary dark:placeholder-font-secondary-dark focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent ${
                                errors.billingAddress1 ? 'border-red-500' : 'border-elegant-base dark:border-elegant-base'
                              }`}
                              placeholder="Street address"
                            />
                            {errors.billingAddress1 && <p className="text-red-500 text-sm mt-1">{errors.billingAddress1}</p>}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-josefin font-medium text-deep-black dark:text-ivory-white mb-2">
                                City *
                              </label>
                              <input
                                type="text"
                                value={billingAddress.city}
                                onChange={(e) => setBillingAddress(prev => ({ ...prev, city: e.target.value }))}
                                className={`w-full px-4 py-3 border rounded-lg bg-transparent text-deep-black dark:text-ivory-white placeholder-font-secondary dark:placeholder-font-secondary-dark focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent ${
                                  errors.billingCity ? 'border-red-500' : 'border-elegant-base dark:border-elegant-base'
                                }`}
                                placeholder="City"
                              />
                              {errors.billingCity && <p className="text-red-500 text-sm mt-1">{errors.billingCity}</p>}
                            </div>
                            
                            <div>
                              <label className="block text-sm font-josefin font-medium text-deep-black dark:text-ivory-white mb-2">
                                ZIP/Postal Code *
                              </label>
                              <input
                                type="text"
                                value={billingAddress.zip}
                                onChange={(e) => setBillingAddress(prev => ({ ...prev, zip: e.target.value }))}
                                className={`w-full px-4 py-3 border rounded-lg bg-transparent text-deep-black dark:text-ivory-white placeholder-font-secondary dark:placeholder-font-secondary-dark focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent ${
                                  errors.billingZip ? 'border-red-500' : 'border-elegant-base dark:border-elegant-base'
                                }`}
                                placeholder="ZIP/Postal Code"
                              />
                              {errors.billingZip && <p className="text-red-500 text-sm mt-1">{errors.billingZip}</p>}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-6">
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={saveBillingAddress}
                            onChange={(e) => setSaveBillingAddress(e.target.checked)}
                            className="w-4 h-4 text-soft-gold border-elegant-base rounded focus:ring-soft-gold focus:ring-2"
                          />
                          <span className="font-josefin text-deep-black dark:text-ivory-white">
                            Save billing address for future orders
                          </span>
                        </label>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 'payment' && (
                    <motion.div
                      key="payment"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 flex items-center">
                        <CreditCard className="w-6 h-6 text-soft-gold mr-2" />
                        Secure Payment
                      </h2>
                      
                      <div className="bg-gradient-to-r from-soft-gold/10 to-bright-gold/10 dark:from-soft-gold/20 dark:to-bright-gold/20 rounded-2xl p-6 mb-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <Shield className="w-6 h-6 text-soft-gold" />
                          <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
                            Secure Payment Processing
                          </h3>
                        </div>
                        <p className="text-font-secondary dark:text-font-secondary-dark font-josefin mb-4">
                          Your payment will be processed securely through Shopify's payment system. You'll be redirected to a secure checkout page to complete your payment.
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-font-secondary dark:text-font-secondary-dark">
                          <div className="flex items-center space-x-1">
                            <Lock className="w-4 h-4 text-green-500" />
                            <span>SSL Encrypted</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Shield className="w-4 h-4 text-green-500" />
                            <span>PCI Compliant</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <CreditCard className="w-4 h-4 text-green-500" />
                            <span>Multiple Payment Methods</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-elegant-base/10 rounded-lg p-4">
                          <h4 className="font-josefin font-medium text-deep-black dark:text-ivory-white mb-2">
                            Accepted Payment Methods
                          </h4>
                          <div className="flex flex-wrap gap-2 text-sm text-font-secondary dark:text-font-secondary-dark">
                            <span className="px-3 py-1 bg-white dark:bg-deep-black rounded border">Credit Cards</span>
                            <span className="px-3 py-1 bg-white dark:bg-deep-black rounded border">Debit Cards</span>
                            <span className="px-3 py-1 bg-white dark:bg-deep-black rounded border">PayPal</span>
                            <span className="px-3 py-1 bg-white dark:bg-deep-black rounded border">Apple Pay</span>
                            <span className="px-3 py-1 bg-white dark:bg-deep-black rounded border">Google Pay</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={acceptTerms}
                            onChange={(e) => setAcceptTerms(e.target.checked)}
                            className="w-4 h-4 text-soft-gold border-elegant-base rounded focus:ring-soft-gold focus:ring-2"
                          />
                          <span className="font-josefin text-deep-black dark:text-ivory-white">
                            I agree to the <a href="/terms" className="text-soft-gold hover:underline">Terms and Conditions</a> and <a href="/privacy" className="text-soft-gold hover:underline">Privacy Policy</a>
                          </span>
                        </label>
                        {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 'review' && (
                    <motion.div
                      key="review"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 flex items-center">
                        <CheckCircle className="w-6 h-6 text-soft-gold mr-2" />
                        Review Your Order
                      </h2>
                      
                      {/* Shipping Address */}
                      <div className="mb-6">
                        <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-3">
                          Shipping Address
                        </h3>
                        <div className="bg-elegant-base/10 rounded-lg p-4">
                          <p className="font-josefin text-deep-black dark:text-ivory-white">
                            {shippingAddress.firstName} {shippingAddress.lastName}
                          </p>
                          {shippingAddress.company && (
                            <p className="font-josefin text-font-secondary dark:text-font-secondary-dark">
                              {shippingAddress.company}
                            </p>
                          )}
                          <p className="font-josefin text-font-secondary dark:text-font-secondary-dark">
                            {shippingAddress.address1}
                          </p>
                          {shippingAddress.address2 && (
                            <p className="font-josefin text-font-secondary dark:text-font-secondary-dark">
                              {shippingAddress.address2}
                            </p>
                          )}
                          <p className="font-josefin text-font-secondary dark:text-font-secondary-dark">
                            {shippingAddress.city} {shippingAddress.zip}
                          </p>
                          <p className="font-josefin text-font-secondary dark:text-font-secondary-dark">
                            {shippingAddress.country}
                          </p>
                          <p className="font-josefin text-font-secondary dark:text-font-secondary-dark">
                            {shippingAddress.phone}
                          </p>
                        </div>
                      </div>
                      
                      {/* Billing Address */}
                      <div className="mb-6">
                        <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-3">
                          Billing Address
                        </h3>
                        <div className="bg-elegant-base/10 rounded-lg p-4">
                          {sameAsShipping ? (
                            <p className="font-josefin text-font-secondary dark:text-font-secondary-dark">
                              Same as shipping address
                            </p>
                          ) : (
                            <>
                              <p className="font-josefin text-deep-black dark:text-ivory-white">
                                {billingAddress.firstName} {billingAddress.lastName}
                              </p>
                              {billingAddress.company && (
                                <p className="font-josefin text-font-secondary dark:text-font-secondary-dark">
                                  {billingAddress.company}
                                </p>
                              )}
                              <p className="font-josefin text-font-secondary dark:text-font-secondary-dark">
                                {billingAddress.address1}
                              </p>
                              {billingAddress.address2 && (
                                <p className="font-josefin text-font-secondary dark:text-font-secondary-dark">
                                  {billingAddress.address2}
                                </p>
                              )}
                              <p className="font-josefin text-font-secondary dark:text-font-secondary-dark">
                                {billingAddress.city} {billingAddress.zip}
                              </p>
                              <p className="font-josefin text-font-secondary dark:text-font-secondary-dark">
                                {billingAddress.country}
                              </p>
                              <p className="font-josefin text-font-secondary dark:text-font-secondary-dark">
                                {billingAddress.phone}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {/* Payment Method */}
                      <div className="mb-6">
                        <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-3">
                          Payment Processing
                        </h3>
                        <div className="bg-elegant-base/10 rounded-lg p-4">
                          <div className="flex items-center space-x-3 mb-2">
                            <Shield className="w-5 h-5 text-green-500" />
                            <span className="font-josefin text-deep-black dark:text-ivory-white">
                              Secure Payment via Shopify
                            </span>
                          </div>
                          <p className="text-font-secondary dark:text-font-secondary-dark text-sm">
                            Your payment will be processed securely through Shopify's payment system with support for credit cards, PayPal, Apple Pay, and more.
                          </p>
                        </div>
                      </div>
                      
                      {/* Error Display */}
                      {errors.general && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                          <p className="text-red-600 dark:text-red-400 text-sm font-josefin">{errors.general}</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                  
                </AnimatePresence>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 'shipping'}
                  className="flex items-center space-x-2 px-6 py-3 border border-elegant-base dark:border-elegant-base text-font-secondary dark:text-elegant-base rounded-lg font-josefin font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:border-soft-gold hover:text-soft-gold"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                
                <button
                  onClick={currentStep === 'review' ? handlePlaceOrder : handleNext}
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-6 py-3 bg-soft-gold hover:bg-bright-gold text-deep-black rounded-lg font-josefin font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>{currentStep === 'review' ? 'Proceed to Payment' : 'Next'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 dark:bg-deep-black/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-elegant-base/20 sticky top-8">
                <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6">
                  Order Summary
                </h3>
                
                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex space-x-3">
                      <div className="relative w-16 h-20 flex-shrink-0">
                        <Image
                          src={item.product.images[0]?.src || '/images/products/placeholder.svg'}
                          alt={item.product.images[0]?.alt || item.product.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-josefin font-medium text-deep-black dark:text-ivory-white text-sm line-clamp-2">
                          {item.product.title}
                        </h4>
                        <div className="text-xs text-font-secondary dark:text-font-secondary-dark mt-1">
                          {item.size && <span>Size: {item.size}</span>}
                          {item.color && <span className="ml-2">Color: {item.color}</span>}
                        </div>
                        <div className="text-xs text-font-secondary dark:text-font-secondary-dark">
                          Qty: {item.quantity}
                        </div>
                        <div className="text-sm font-josefin font-medium text-soft-gold mt-1">
                          ${(item.variant.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Order Totals */}
                <div className="border-t border-elegant-base dark:border-elegant-base pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-font-secondary dark:text-font-secondary-dark">Subtotal</span>
                    <span className="text-deep-black dark:text-ivory-white">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-font-secondary dark:text-font-secondary-dark">Shipping</span>
                    <span className="text-deep-black dark:text-ivory-white">$9.99</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-font-secondary dark:text-font-secondary-dark">Tax</span>
                    <span className="text-deep-black dark:text-ivory-white">${(getTotalPrice() * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-josefin font-semibold border-t border-elegant-base dark:border-elegant-base pt-2">
                    <span className="text-deep-black dark:text-ivory-white">Total</span>
                    <span className="text-soft-gold">${(getTotalPrice() + 9.99 + (getTotalPrice() * 0.08)).toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Security Badges */}
                <div className="mt-6 pt-4 border-t border-elegant-base dark:border-elegant-base">
                  <div className="flex items-center justify-center space-x-4 text-xs text-font-secondary dark:text-font-secondary-dark">
                    <div className="flex items-center space-x-1">
                      <Shield className="w-4 h-4" />
                      <span>Secure</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Lock className="w-4 h-4" />
                      <span>SSL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
