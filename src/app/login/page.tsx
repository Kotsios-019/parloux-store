'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import GlobalLayout from '@/components/layout/GlobalLayout';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { login, register, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  // Form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    confirmPassword: '',
    acceptsMarketing: false,
  });

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/account');
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      if (isLogin) {
        // Login
        const result = await login(formData.email, formData.password);
        if (result.success) {
          setSuccess('Login successful! Redirecting...');
          setTimeout(() => router.push('/account'), 1000);
        } else {
          setError(result.error || 'Login failed');
        }
      } else {
        // Register
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setIsLoading(false);
          return;
        }

        const result = await register({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          acceptsMarketing: formData.acceptsMarketing,
        });

        if (result.success) {
          setSuccess('Registration successful! Redirecting...');
          setTimeout(() => router.push('/account'), 1000);
        } else {
          setError(result.error || 'Registration failed');
        }
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      confirmPassword: '',
      acceptsMarketing: false,
    });
  };

  return (
    <GlobalLayout>
      <div className="min-h-screen bg-gradient-to-br from-champagne-nude/30 to-elegant-base/30 dark:from-champagne-nude/20 dark:to-elegant-base/20 py-20">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-ivory-white dark:bg-deep-black rounded-2xl shadow-2xl border border-elegant-base dark:border-elegant-base overflow-hidden"
          >
            {/* Header */}
            <div className="px-8 py-8 text-center border-b border-elegant-base dark:border-elegant-base">
              <h1 className="text-3xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-font-secondary dark:text-font-secondary-dark">
                {isLogin ? 'Sign in to your account' : 'Join ParlouX for exclusive access'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
              {/* Error/Success Messages */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <p className="text-red-600 dark:text-red-400 text-sm font-josefin">{error}</p>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                >
                  <p className="text-green-600 dark:text-green-400 text-sm font-josefin">{success}</p>
                </motion.div>
              )}

              {/* Registration Fields */}
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-josefin font-medium text-deep-black dark:text-ivory-white mb-2">
                        First Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-font-secondary dark:text-font-secondary-dark" />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required={!isLogin}
                          className="w-full pl-10 pr-4 py-3 border border-elegant-base dark:border-elegant-base rounded-lg bg-transparent text-deep-black dark:text-ivory-white placeholder-font-secondary dark:placeholder-font-secondary-dark focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent"
                          placeholder="First name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-josefin font-medium text-deep-black dark:text-ivory-white mb-2">
                        Last Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-font-secondary dark:text-font-secondary-dark" />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required={!isLogin}
                          className="w-full pl-10 pr-4 py-3 border border-elegant-base dark:border-elegant-base rounded-lg bg-transparent text-deep-black dark:text-ivory-white placeholder-font-secondary dark:placeholder-font-secondary-dark focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent"
                          placeholder="Last name"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-josefin font-medium text-deep-black dark:text-ivory-white mb-2">
                      Phone (Optional)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-font-secondary dark:text-font-secondary-dark" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-elegant-base dark:border-elegant-base rounded-lg bg-transparent text-deep-black dark:text-ivory-white placeholder-font-secondary dark:placeholder-font-secondary-dark focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent"
                        placeholder="Phone number"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-josefin font-medium text-deep-black dark:text-ivory-white mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-font-secondary dark:text-font-secondary-dark" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-elegant-base dark:border-elegant-base rounded-lg bg-transparent text-deep-black dark:text-ivory-white placeholder-font-secondary dark:placeholder-font-secondary-dark focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-josefin font-medium text-deep-black dark:text-ivory-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-font-secondary dark:text-font-secondary-dark" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-12 py-3 border border-elegant-base dark:border-elegant-base rounded-lg bg-transparent text-deep-black dark:text-ivory-white placeholder-font-secondary dark:placeholder-font-secondary-dark focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-font-secondary dark:text-font-secondary-dark hover:text-soft-gold dark:hover:text-bright-gold transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password (Registration only) */}
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <label className="block text-sm font-josefin font-medium text-deep-black dark:text-ivory-white mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-font-secondary dark:text-font-secondary-dark" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required={!isLogin}
                      className="w-full pl-10 pr-4 py-3 border border-elegant-base dark:border-elegant-base rounded-lg bg-transparent text-deep-black dark:text-ivory-white placeholder-font-secondary dark:placeholder-font-secondary-dark focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent"
                      placeholder="Confirm your password"
                    />
                  </div>
                </motion.div>
              )}

              {/* Marketing Checkbox (Registration only) */}
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center space-x-3"
                >
                  <input
                    type="checkbox"
                    name="acceptsMarketing"
                    checked={formData.acceptsMarketing}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-soft-gold border-elegant-base rounded focus:ring-soft-gold focus:ring-2"
                  />
                  <label className="text-sm font-josefin text-font-secondary dark:text-font-secondary-dark">
                    I want to receive marketing emails and updates
                  </label>
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
                  </div>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </button>

              {/* Toggle Mode */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-sm font-josefin text-font-secondary dark:text-font-secondary-dark hover:text-soft-gold dark:hover:text-bright-gold transition-colors"
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>

              {/* Forgot Password */}
              {isLogin && (
                <div className="text-center">
                  <Link
                    href="/forgot-password"
                    className="text-sm font-josefin text-font-secondary dark:text-font-secondary-dark hover:text-soft-gold dark:hover:text-bright-gold transition-colors"
                  >
                    Forgot your password?
                  </Link>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </GlobalLayout>
  );
}


