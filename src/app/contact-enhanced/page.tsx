'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, MessageSquare, Phone, MapPin } from 'lucide-react';
import { useFormValidation, ValidatedInput, ValidatedTextarea, ValidatedSelect } from './FormValidation';
import { FormHelpText } from './MultiStepForm';
import { useToastNotifications } from '@/components/ui/Toast';
import GlobalLayout from '@/components/layout/GlobalLayout';

export default function EnhancedContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showSuccess, showError } = useToastNotifications();

  // Initial form values
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: '',
    preferredContact: '',
    country: '',
    heardAbout: ''
  };

  // Validation rules
  const validationRules = {
    firstName: [
      { required: true, message: 'First name is required' },
      { minLength: 2, message: 'First name must be at least 2 characters' },
      { maxLength: 50, message: 'First name must be no more than 50 characters' }
    ],
    lastName: [
      { required: true, message: 'Last name is required' },
      { minLength: 2, message: 'Last name must be at least 2 characters' },
      { maxLength: 50, message: 'Last name must be no more than 50 characters' }
    ],
    email: [
      { required: true, message: 'Email is required' },
      { 
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
        message: 'Please enter a valid email address' 
      }
    ],
    phone: [
      { 
        pattern: /^[\+]?[1-9][\d]{0,15}$/, 
        message: 'Please enter a valid phone number' 
      }
    ],
    subject: [
      { required: true, message: 'Subject is required' },
      { minLength: 5, message: 'Subject must be at least 5 characters' },
      { maxLength: 100, message: 'Subject must be no more than 100 characters' }
    ],
    message: [
      { required: true, message: 'Message is required' },
      { minLength: 10, message: 'Message must be at least 10 characters' },
      { maxLength: 1000, message: 'Message must be no more than 1000 characters' }
    ],
    inquiryType: [
      { required: true, message: 'Please select an inquiry type' }
    ],
    preferredContact: [
      { required: true, message: 'Please select your preferred contact method' }
    ]
  };

  const {
    formState,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  } = useFormValidation(
    initialValues,
    validationRules,
    async (values) => {
      setIsSubmitting(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // In a real application, you would send the data to your API
        console.log('Form submitted:', values);
        
        showSuccess('Message sent successfully!', 'We\'ll get back to you within 24 hours');
        resetForm();
      } catch (error) {
        showError('Failed to send message', 'Please try again or contact us directly');
      } finally {
        setIsSubmitting(false);
      }
    }
  );

  const inquiryTypeOptions = [
    { value: '', label: 'Select inquiry type', disabled: true },
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Customer Support' },
    { value: 'sales', label: 'Sales Question' },
    { value: 'partnership', label: 'Partnership Opportunity' },
    { value: 'press', label: 'Press Inquiry' },
    { value: 'other', label: 'Other' }
  ];

  const preferredContactOptions = [
    { value: '', label: 'Select preferred contact method', disabled: true },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone Call' },
    { value: 'sms', label: 'SMS' },
    { value: 'any', label: 'Any method' }
  ];

  const countryOptions = [
    { value: '', label: 'Select country', disabled: true },
    { value: 'cy', label: 'Cyprus' },
    { value: 'gr', label: 'Greece' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'it', label: 'Italy' },
    { value: 'es', label: 'Spain' },
    { value: 'other', label: 'Other' }
  ];

  const heardAboutOptions = [
    { value: '', label: 'How did you hear about us?', disabled: true },
    { value: 'google', label: 'Google Search' },
    { value: 'social', label: 'Social Media' },
    { value: 'referral', label: 'Friend/Family Referral' },
    { value: 'advertisement', label: 'Advertisement' },
    { value: 'event', label: 'Event/Show' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <GlobalLayout>
      <div className="min-h-screen bg-gradient-to-br from-champagne-nude/30 to-elegant-base/30 dark:from-champagne-nude/20 dark:to-elegant-base/20 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-font-secondary dark:text-font-secondary-dark font-josefin max-w-2xl mx-auto">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-deep-black rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-6">
                  Contact Information
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-soft-gold mt-1" />
                    <div>
                      <h3 className="font-josefin font-semibold text-font-primary dark:text-ivory-white">
                        Email
                      </h3>
                      <p className="text-font-secondary dark:text-font-secondary-dark">
                        hello@parloux.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-soft-gold mt-1" />
                    <div>
                      <h3 className="font-josefin font-semibold text-font-primary dark:text-ivory-white">
                        Phone
                      </h3>
                      <p className="text-font-secondary dark:text-font-secondary-dark">
                        +357 22 123 456
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-soft-gold mt-1" />
                    <div>
                      <h3 className="font-josefin font-semibold text-font-primary dark:text-ivory-white">
                        Address
                      </h3>
                      <p className="text-font-secondary dark:text-font-secondary-dark">
                        Nicosia, Cyprus<br />
                        Fashion District
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <FormHelpText
                text="We typically respond to all inquiries within 24 hours during business days."
                type="info"
              />
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="bg-white dark:bg-deep-black rounded-lg shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white flex items-center space-x-2">
                      <User className="w-5 h-5 text-soft-gold" />
                      <span>Personal Information</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ValidatedInput
                        name="firstName"
                        label="First Name"
                        value={formState.values.firstName}
                        onChange={(value) => handleChange('firstName', value)}
                        onBlur={() => handleBlur('firstName')}
                        error={formState.errors.firstName}
                        touched={formState.touched.firstName}
                        required
                        placeholder="Enter your first name"
                        successMessage="First name looks good!"
                        showSuccessIcon
                      />
                      
                      <ValidatedInput
                        name="lastName"
                        label="Last Name"
                        value={formState.values.lastName}
                        onChange={(value) => handleChange('lastName', value)}
                        onBlur={() => handleBlur('lastName')}
                        error={formState.errors.lastName}
                        touched={formState.touched.lastName}
                        required
                        placeholder="Enter your last name"
                        successMessage="Last name looks good!"
                        showSuccessIcon
                      />
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white flex items-center space-x-2">
                      <Mail className="w-5 h-5 text-soft-gold" />
                      <span>Contact Details</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ValidatedInput
                        name="email"
                        label="Email Address"
                        type="email"
                        value={formState.values.email}
                        onChange={(value) => handleChange('email', value)}
                        onBlur={() => handleBlur('email')}
                        error={formState.errors.email}
                        touched={formState.touched.email}
                        required
                        placeholder="Enter your email address"
                        autoComplete="email"
                        successMessage="Email address is valid!"
                        showSuccessIcon
                      />
                      
                      <ValidatedInput
                        name="phone"
                        label="Phone Number"
                        type="tel"
                        value={formState.values.phone}
                        onChange={(value) => handleChange('phone', value)}
                        onBlur={() => handleBlur('phone')}
                        error={formState.errors.phone}
                        touched={formState.touched.phone}
                        placeholder="Enter your phone number"
                        autoComplete="tel"
                        successMessage="Phone number looks good!"
                        showSuccessIcon
                      />
                    </div>
                    
                    <ValidatedInput
                      name="company"
                      label="Company (Optional)"
                      value={formState.values.company}
                      onChange={(value) => handleChange('company', value)}
                      onBlur={() => handleBlur('company')}
                      error={formState.errors.company}
                      touched={formState.touched.company}
                      placeholder="Enter your company name"
                      successMessage="Company name looks good!"
                      showSuccessIcon
                    />
                  </div>

                  {/* Inquiry Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white flex items-center space-x-2">
                      <MessageSquare className="w-5 h-5 text-soft-gold" />
                      <span>Inquiry Details</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ValidatedSelect
                        name="inquiryType"
                        label="Inquiry Type"
                        value={formState.values.inquiryType}
                        onChange={(value) => handleChange('inquiryType', value)}
                        onBlur={() => handleBlur('inquiryType')}
                        error={formState.errors.inquiryType}
                        touched={formState.touched.inquiryType}
                        required
                        options={inquiryTypeOptions}
                        successMessage="Inquiry type selected!"
                      />
                      
                      <ValidatedSelect
                        name="preferredContact"
                        label="Preferred Contact Method"
                        value={formState.values.preferredContact}
                        onChange={(value) => handleChange('preferredContact', value)}
                        onBlur={() => handleBlur('preferredContact')}
                        error={formState.errors.preferredContact}
                        touched={formState.touched.preferredContact}
                        required
                        options={preferredContactOptions}
                        successMessage="Contact method selected!"
                      />
                    </div>
                    
                    <ValidatedInput
                      name="subject"
                      label="Subject"
                      value={formState.values.subject}
                      onChange={(value) => handleChange('subject', value)}
                      onBlur={() => handleBlur('subject')}
                      error={formState.errors.subject}
                      touched={formState.touched.subject}
                      required
                      placeholder="Enter a brief subject"
                      maxLength={100}
                      successMessage="Subject looks good!"
                      showSuccessIcon
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-4">
                    <ValidatedTextarea
                      name="message"
                      label="Message"
                      value={formState.values.message}
                      onChange={(value) => handleChange('message', value)}
                      onBlur={() => handleBlur('message')}
                      error={formState.errors.message}
                      touched={formState.touched.message}
                      required
                      placeholder="Tell us more about your inquiry..."
                      maxLength={1000}
                      rows={6}
                      successMessage="Message looks good!"
                    />
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
                      Additional Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ValidatedSelect
                        name="country"
                        label="Country"
                        value={formState.values.country}
                        onChange={(value) => handleChange('country', value)}
                        onBlur={() => handleBlur('country')}
                        error={formState.errors.country}
                        touched={formState.touched.country}
                        options={countryOptions}
                        successMessage="Country selected!"
                      />
                      
                      <ValidatedSelect
                        name="heardAbout"
                        label="How did you hear about us?"
                        value={formState.values.heardAbout}
                        onChange={(value) => handleChange('heardAbout', value)}
                        onBlur={() => handleBlur('heardAbout')}
                        error={formState.errors.heardAbout}
                        touched={formState.touched.heardAbout}
                        options={heardAboutOptions}
                        successMessage="Source selected!"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={!formState.isValid || formState.isSubmitting}
                      className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-josefin font-semibold transition-colors ${
                        formState.isValid && !formState.isSubmitting
                          ? 'bg-soft-gold text-deep-black hover:bg-bright-gold'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {formState.isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
