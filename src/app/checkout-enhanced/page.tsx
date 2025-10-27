'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Truck, MapPin, User, Lock, CheckCircle } from 'lucide-react';
import { MultiStepForm, FormFieldWrapper, FormValidationSummary } from '@/components/forms/MultiStepForm';
import { ValidatedInput, ValidatedSelect } from '@/components/forms/FormValidation';
import { useCart } from '@/contexts/MockCartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToastNotifications } from '@/components/ui/Toast';
import GlobalLayout from '@/components/layout/GlobalLayout';

export default function EnhancedCheckoutForm() {
  const { items, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { showSuccess, showError } = useToastNotifications();

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <GlobalLayout>
        <div className="min-h-screen bg-gradient-to-br from-champagne-nude/30 to-elegant-base/30 dark:from-champagne-nude/20 dark:to-elegant-base/20 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white dark:bg-deep-black rounded-lg shadow-lg p-8 text-center">
            <Lock className="w-16 h-16 text-soft-gold mx-auto mb-4" />
            <h1 className="text-2xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-4">
              Authentication Required
            </h1>
            <p className="text-font-secondary dark:text-font-secondary-dark mb-6">
              Please log in to proceed with checkout.
            </p>
            <a
              href="/login"
              className="btn-primary"
            >
              Go to Login
            </a>
          </div>
        </div>
      </GlobalLayout>
    );
  }

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <GlobalLayout>
        <div className="min-h-screen bg-gradient-to-br from-champagne-nude/30 to-elegant-base/30 dark:from-champagne-nude/20 dark:to-elegant-base/20 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white dark:bg-deep-black rounded-lg shadow-lg p-8 text-center">
            <Truck className="w-16 h-16 text-soft-gold mx-auto mb-4" />
            <h1 className="text-2xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-font-secondary dark:text-font-secondary-dark mb-6">
              Add some items to your cart before proceeding to checkout.
            </p>
            <a
              href="/products"
              className="btn-primary"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </GlobalLayout>
    );
  }

  // Form steps configuration
  const steps = [
    {
      id: 'shipping',
      title: 'Shipping Information',
      description: 'Where should we deliver your order?',
      fields: ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode', 'country'],
      validation: {
        firstName: [{ required: true, message: 'First name is required' }],
        lastName: [{ required: true, message: 'Last name is required' }],
        email: [
          { required: true, message: 'Email is required' },
          { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address' }
        ],
        phone: [{ pattern: /^[\+]?[1-9][\d]{0,15}$/, message: 'Please enter a valid phone number' }],
        address: [{ required: true, message: 'Address is required' }],
        city: [{ required: true, message: 'City is required' }],
        postalCode: [{ required: true, message: 'Postal code is required' }],
        country: [{ required: true, message: 'Country is required' }]
      }
    },
    {
      id: 'billing',
      title: 'Billing Information',
      description: 'Payment and billing details',
      fields: ['billingSameAsShipping', 'billingFirstName', 'billingLastName', 'billingAddress', 'billingCity', 'billingPostalCode', 'billingCountry'],
      validation: {
        billingFirstName: [{ required: true, message: 'Billing first name is required' }],
        billingLastName: [{ required: true, message: 'Billing last name is required' }],
        billingAddress: [{ required: true, message: 'Billing address is required' }],
        billingCity: [{ required: true, message: 'Billing city is required' }],
        billingPostalCode: [{ required: true, message: 'Billing postal code is required' }],
        billingCountry: [{ required: true, message: 'Billing country is required' }]
      }
    },
    {
      id: 'payment',
      title: 'Payment Method',
      description: 'Choose your payment method',
      fields: ['paymentMethod', 'cardNumber', 'expiryDate', 'cvv', 'cardName'],
      validation: {
        paymentMethod: [{ required: true, message: 'Payment method is required' }],
        cardNumber: [
          { required: true, message: 'Card number is required' },
          { pattern: /^[0-9\s]{13,19}$/, message: 'Please enter a valid card number' }
        ],
        expiryDate: [
          { required: true, message: 'Expiry date is required' },
          { pattern: /^(0[1-9]|1[0-2])\/\d{2}$/, message: 'Please enter a valid expiry date (MM/YY)' }
        ],
        cvv: [
          { required: true, message: 'CVV is required' },
          { pattern: /^[0-9]{3,4}$/, message: 'Please enter a valid CVV' }
        ],
        cardName: [{ required: true, message: 'Cardholder name is required' }]
      }
    },
    {
      id: 'review',
      title: 'Review & Confirm',
      description: 'Review your order before placing it',
      fields: ['acceptTerms', 'newsletterSignup'],
      validation: {
        acceptTerms: [{ required: true, message: 'You must accept the terms and conditions' }]
      }
    }
  ];

  // Initial form values
  const initialValues = {
    // Shipping
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'cy',
    
    // Billing
    billingSameAsShipping: 'true',
    billingFirstName: '',
    billingLastName: '',
    billingAddress: '',
    billingCity: '',
    billingPostalCode: '',
    billingCountry: 'cy',
    
    // Payment
    paymentMethod: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Review
    acceptTerms: 'false',
    newsletterSignup: 'false'
  };

  const handleFormSubmit = async (values: { [key: string]: string }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart
      clearCart();
      
      showSuccess('Order placed successfully!', 'You will receive a confirmation email shortly');
      
      // Redirect to success page
      window.location.href = '/checkout/success';
    } catch (error) {
      showError('Order failed', 'Please try again or contact support');
    }
  };

  const countryOptions = [
    { value: 'cy', label: 'Cyprus' },
    { value: 'gr', label: 'Greece' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'it', label: 'Italy' },
    { value: 'es', label: 'Spain' }
  ];

  const paymentMethodOptions = [
    { value: '', label: 'Select payment method', disabled: true },
    { value: 'card', label: 'Credit/Debit Card' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'apple', label: 'Apple Pay' },
    { value: 'google', label: 'Google Pay' }
  ];

  return (
    <GlobalLayout>
      <div className="min-h-screen bg-gradient-to-br from-champagne-nude/30 to-elegant-base/30 dark:from-champagne-nude/20 dark:to-elegant-base/20 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-2">
              Secure Checkout
            </h1>
            <p className="text-font-secondary dark:text-font-secondary-dark font-josefin">
              Complete your order with confidence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <MultiStepForm
                steps={steps}
                initialValues={initialValues}
                onSubmit={handleFormSubmit}
                className="bg-white dark:bg-deep-black rounded-lg shadow-lg p-6"
              >
                {/* Step 1: Shipping Information */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormFieldWrapper
                      fieldName="firstName"
                      formState={formState}
                      onFieldChange={handleChange}
                      onFieldBlur={handleBlur}
                    >
                      <ValidatedInput
                        name="firstName"
                        label="First Name"
                        required
                        placeholder="Enter your first name"
                        successMessage="First name looks good!"
                        showSuccessIcon
                      />
                    </FormFieldWrapper>
                    
                    <FormFieldWrapper
                      fieldName="lastName"
                      formState={formState}
                      onFieldChange={handleChange}
                      onFieldBlur={handleBlur}
                    >
                      <ValidatedInput
                        name="lastName"
                        label="Last Name"
                        required
                        placeholder="Enter your last name"
                        successMessage="Last name looks good!"
                        showSuccessIcon
                      />
                    </FormFieldWrapper>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormFieldWrapper
                      fieldName="email"
                      formState={formState}
                      onFieldChange={handleChange}
                      onFieldBlur={handleBlur}
                    >
                      <ValidatedInput
                        name="email"
                        label="Email Address"
                        type="email"
                        required
                        placeholder="Enter your email"
                        successMessage="Email looks good!"
                        showSuccessIcon
                      />
                    </FormFieldWrapper>
                    
                    <FormFieldWrapper
                      fieldName="phone"
                      formState={formState}
                      onFieldChange={handleChange}
                      onFieldBlur={handleBlur}
                    >
                      <ValidatedInput
                        name="phone"
                        label="Phone Number"
                        type="tel"
                        placeholder="Enter your phone number"
                        successMessage="Phone number looks good!"
                        showSuccessIcon
                      />
                    </FormFieldWrapper>
                  </div>
                  
                  <FormFieldWrapper
                    fieldName="address"
                    formState={formState}
                    onFieldChange={handleChange}
                    onFieldBlur={handleBlur}
                  >
                    <ValidatedInput
                      name="address"
                      label="Street Address"
                      required
                      placeholder="Enter your street address"
                      successMessage="Address looks good!"
                      showSuccessIcon
                    />
                  </FormFieldWrapper>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormFieldWrapper
                      fieldName="city"
                      formState={formState}
                      onFieldChange={handleChange}
                      onFieldBlur={handleBlur}
                    >
                      <ValidatedInput
                        name="city"
                        label="City"
                        required
                        placeholder="Enter your city"
                        successMessage="City looks good!"
                        showSuccessIcon
                      />
                    </FormFieldWrapper>
                    
                    <FormFieldWrapper
                      fieldName="postalCode"
                      formState={formState}
                      onFieldChange={handleChange}
                      onFieldBlur={handleBlur}
                    >
                      <ValidatedInput
                        name="postalCode"
                        label="Postal Code"
                        required
                        placeholder="Enter postal code"
                        successMessage="Postal code looks good!"
                        showSuccessIcon
                      />
                    </FormFieldWrapper>
                    
                    <FormFieldWrapper
                      fieldName="country"
                      formState={formState}
                      onFieldChange={handleChange}
                      onFieldBlur={handleBlur}
                    >
                      <ValidatedSelect
                        name="country"
                        label="Country"
                        required
                        options={countryOptions}
                        successMessage="Country selected!"
                      />
                    </FormFieldWrapper>
                  </div>
                </div>
              </MultiStepForm>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white dark:bg-deep-black rounded-lg shadow-lg p-6 sticky top-8"
              >
                <h2 className="text-xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-6">
                  Order Summary
                </h2>
                
                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-16 h-16 bg-elegant-base/20 rounded-lg flex items-center justify-center">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-josefin font-semibold text-font-primary dark:text-ivory-white text-sm">
                          {item.product.title}
                        </h3>
                        <p className="text-xs text-font-secondary dark:text-font-secondary-dark">
                          {item.size && `Size: ${item.size}`}
                          {item.color && ` • Color: ${item.color}`}
                        </p>
                        <p className="text-sm font-josefin font-semibold text-soft-gold">
                          ${item.variant.price} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Order Totals */}
                <div className="space-y-2 border-t border-elegant-base dark:border-elegant-base pt-4">
                  <div className="flex justify-between text-font-secondary dark:text-font-secondary-dark">
                    <span>Subtotal</span>
                    <span>${items.reduce((sum, item) => sum + (item.variant.price * item.quantity), 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-font-secondary dark:text-font-secondary-dark">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-font-secondary dark:text-font-secondary-dark">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-lg font-josefin font-bold text-deep-black dark:text-ivory-white border-t border-elegant-base dark:border-elegant-base pt-2">
                    <span>Total</span>
                    <span>${items.reduce((sum, item) => sum + (item.variant.price * item.quantity), 0).toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Security Badge */}
                <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-josefin text-green-800 dark:text-green-200">
                      Secure checkout with SSL encryption
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
