'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToastNotifications } from '@/components/ui/Toast';
import { AccessibleForm, AccessibleFormField, AccessibleButton } from '@/components/accessibility/AccessibleForms';
import { ScreenReaderOnly } from '@/components/accessibility/AccessibilityUtils';
import GlobalLayout from '@/components/layout/GlobalLayout';

export default function AccessibleLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const { login } = useAuth();
  const { showSuccess, showError } = useToastNotifications();
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (formData: FormData) => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const result = await login(email, password);
      
      if (result.success) {
        showSuccess('Login successful!', 'Welcome back to Parloux');
        router.push('/account');
      } else {
        showError('Login failed', result.error || 'Please check your credentials');
        setErrors({ general: result.error || 'Login failed' });
      }
    } catch (error) {
      showError('Login failed', 'An unexpected error occurred. Please try again.');
      setErrors({ general: 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GlobalLayout>
      <div className="min-h-screen bg-gradient-to-br from-champagne-nude/30 to-elegant-base/30 dark:from-champagne-nude/20 dark:to-elegant-base/20 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-2">
              Welcome Back
            </h1>
            <p className="text-font-secondary dark:text-font-secondary-dark">
              Sign in to your Parloux account
            </p>
          </div>

          {/* Login Form */}
          <AccessibleForm
            onSubmit={handleSubmit}
            ariaLabel="Login form"
            className="bg-white dark:bg-deep-black rounded-lg shadow-lg p-8 space-y-6"
          >
            {/* General Error */}
            {errors.general && (
              <div 
                className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                role="alert"
                aria-live="polite"
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-josefin text-red-800 dark:text-red-200">
                    {errors.general}
                  </span>
                </div>
              </div>
            )}

            {/* Email Field */}
            <AccessibleFormField
              label="Email Address"
              type="email"
              value={email}
              onChange={setEmail}
              error={errors.email}
              required
              autoComplete="email"
              placeholder="Enter your email address"
              description="We'll use this to identify your account"
            />

            {/* Password Field */}
            <AccessibleFormField
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              error={errors.password}
              required
              autoComplete="current-password"
              placeholder="Enter your password"
              description="Your password is encrypted and secure"
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-soft-gold border-elegant-base rounded focus:ring-soft-gold focus:ring-2"
                />
                <span className="text-sm font-josefin text-font-primary dark:text-ivory-white">
                  Remember me
                </span>
              </label>
              
              <Link
                href="/forgot-password"
                className="text-sm font-josefin text-soft-gold hover:text-bright-gold transition-colors focus:outline-none focus:ring-2 focus:ring-soft-gold focus:ring-offset-2 rounded"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <AccessibleButton
              type="submit"
              isLoading={isLoading}
              loadingText="Signing in..."
              ariaLabel="Sign in to your account"
              className="w-full bg-soft-gold text-deep-black hover:bg-bright-gold py-3 px-6 rounded-lg font-josefin font-semibold transition-colors"
            >
              Sign In
            </AccessibleButton>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-elegant-base dark:border-elegant-base"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-deep-black text-font-secondary dark:text-font-secondary-dark font-josefin">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <AccessibleButton
                type="button"
                ariaLabel="Sign in with Google"
                className="w-full border border-elegant-base dark:border-elegant-base text-font-primary dark:text-ivory-white hover:bg-elegant-base/10 py-3 px-6 rounded-lg font-josefin font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </AccessibleButton>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-font-secondary dark:text-font-secondary-dark font-josefin">
                Don't have an account?{' '}
                <Link
                  href="/register"
                  className="text-soft-gold hover:text-bright-gold font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-soft-gold focus:ring-offset-2 rounded"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </AccessibleForm>

          {/* Screen Reader Only - Additional Context */}
          <ScreenReaderOnly>
            <p>
              This is the login page for Parloux, an elegant fashion store. 
              You can sign in with your email and password, or use social login options.
              If you don't have an account, you can create one by clicking the sign up link.
            </p>
          </ScreenReaderOnly>
        </motion.div>
      </div>
    </GlobalLayout>
  );
}
