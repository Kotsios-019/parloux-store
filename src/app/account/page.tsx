'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import GlobalLayout from '@/components/layout/GlobalLayout';
import { User, Mail, Phone, Calendar, Edit3, ShoppingBag, Heart, MapPin, LogOut, Crown, Sparkles } from 'lucide-react';

export default function AccountPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    // Wait for auth context to finish loading
    if (isLoading) {
      return;
    }
    
    // If not authenticated after loading, redirect to login
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    // If authenticated, stop loading
    setPageLoading(false);
  }, [isAuthenticated, isLoading, router]);

  if (pageLoading || isLoading) {
    return (
      <GlobalLayout>
        <div className="min-h-screen bg-gradient-to-br from-champagne-nude/30 to-elegant-base/30 dark:from-champagne-nude/20 dark:to-elegant-base/20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-soft-gold mx-auto mb-6"></div>
            <p className="text-font-secondary dark:text-font-secondary-dark font-josefin text-lg">{t('common.loading')}</p>
          </div>
        </div>
      </GlobalLayout>
    );
  }

  if (!user) {
    return (
      <GlobalLayout>
        <div className="min-h-screen bg-gradient-to-br from-champagne-nude/30 to-elegant-base/30 dark:from-champagne-nude/20 dark:to-elegant-base/20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-6">
              {t('account.notFound')}
            </h1>
            <Link
              href="/login"
              className="px-8 py-4 bg-soft-gold hover:bg-bright-gold text-deep-black rounded-lg font-josefin font-medium transition-all duration-300 hover:scale-105"
            >
              {t('account.goToLogin')}
            </Link>
          </div>
        </div>
      </GlobalLayout>
    );
  }

  return (
    <GlobalLayout>
      <div className="min-h-screen bg-gradient-to-br from-champagne-nude/30 to-elegant-base/30 dark:from-champagne-nude/20 dark:to-elegant-base/20">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-soft-gold/10 to-bright-gold/5"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-soft-gold/20 rounded-full mb-6">
                <Crown className="w-10 h-10 text-soft-gold" />
              </div>
              <h1 className="text-5xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-4">
                {t('account.welcome')}, {user.firstName}
              </h1>
              <p className="text-xl font-josefin text-font-secondary dark:text-font-secondary-dark max-w-2xl mx-auto">
                {t('account.manageAccount')}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Personal Information Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/80 dark:bg-deep-black/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-elegant-base/20">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-cormorant font-semibold text-deep-black dark:text-ivory-white">
                    {t('account.personalInfo')}
                  </h2>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-soft-gold/20 hover:bg-soft-gold/30 text-soft-gold rounded-lg font-josefin font-medium transition-all duration-300 hover:scale-105">
                    <Edit3 className="w-4 h-4" />
                    <span>{t('account.editProfile')}</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="group">
                      <label className="flex items-center space-x-2 text-sm font-josefin font-medium text-font-secondary dark:text-font-secondary-dark mb-2">
                        <User className="w-4 h-4" />
                        <span>{t('account.firstName')}</span>
                      </label>
                      <p className="text-lg font-josefin text-deep-black dark:text-ivory-white bg-elegant-base/10 rounded-lg p-3">
                        {user.firstName}
                      </p>
                    </div>
                    
                    <div className="group">
                      <label className="flex items-center space-x-2 text-sm font-josefin font-medium text-font-secondary dark:text-font-secondary-dark mb-2">
                        <User className="w-4 h-4" />
                        <span>{t('account.lastName')}</span>
                      </label>
                      <p className="text-lg font-josefin text-deep-black dark:text-ivory-white bg-elegant-base/10 rounded-lg p-3">
                        {user.lastName}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="group">
                      <label className="flex items-center space-x-2 text-sm font-josefin font-medium text-font-secondary dark:text-font-secondary-dark mb-2">
                        <Mail className="w-4 h-4" />
                        <span>{t('account.email')}</span>
                      </label>
                      <p className="text-lg font-josefin text-deep-black dark:text-ivory-white bg-elegant-base/10 rounded-lg p-3">
                        {user.email}
                      </p>
                    </div>
                    
                    {user.phone && (
                      <div className="group">
                        <label className="flex items-center space-x-2 text-sm font-josefin font-medium text-font-secondary dark:text-font-secondary-dark mb-2">
                          <Phone className="w-4 h-4" />
                          <span>{t('account.phone')}</span>
                        </label>
                        <p className="text-lg font-josefin text-deep-black dark:text-ivory-white bg-elegant-base/10 rounded-lg p-3">
                          {user.phone}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-elegant-base/20">
                  <div className="flex items-center space-x-2 text-font-secondary dark:text-font-secondary-dark">
                    <Calendar className="w-4 h-4" />
                    <span className="font-josefin text-sm">
                      {t('account.memberSince')}: {new Date(user.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="bg-white/80 dark:bg-deep-black/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-elegant-base/20">
                <h3 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 flex items-center">
                  <Sparkles className="w-6 h-6 text-soft-gold mr-2" />
                  {t('account.quickActions')}
                </h3>
                
                <div className="space-y-4">
                  <Link
                    href="/orders"
                    className="group block p-4 bg-gradient-to-r from-soft-gold/10 to-bright-gold/5 hover:from-soft-gold/20 hover:to-bright-gold/10 rounded-xl transition-all duration-300 hover:scale-105 border border-soft-gold/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <ShoppingBag className="w-5 h-5 text-soft-gold group-hover:text-bright-gold transition-colors" />
                        <span className="font-josefin font-medium text-deep-black dark:text-ivory-white">
                          {t('account.viewOrders')}
                        </span>
                      </div>
                      <span className="text-soft-gold group-hover:text-bright-gold transition-colors">→</span>
                    </div>
                  </Link>
                  
                  <Link
                    href="/wishlist"
                    className="group block p-4 bg-gradient-to-r from-soft-gold/10 to-bright-gold/5 hover:from-soft-gold/20 hover:to-bright-gold/10 rounded-xl transition-all duration-300 hover:scale-105 border border-soft-gold/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Heart className="w-5 h-5 text-soft-gold group-hover:text-bright-gold transition-colors" />
                        <span className="font-josefin font-medium text-deep-black dark:text-ivory-white">
                          {t('account.viewWishlist')}
                        </span>
                      </div>
                      <span className="text-soft-gold group-hover:text-bright-gold transition-colors">→</span>
                    </div>
                  </Link>
                  
                  <Link
                    href="/addresses"
                    className="group block p-4 bg-gradient-to-r from-soft-gold/10 to-bright-gold/5 hover:from-soft-gold/20 hover:to-bright-gold/10 rounded-xl transition-all duration-300 hover:scale-105 border border-soft-gold/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-soft-gold group-hover:text-bright-gold transition-colors" />
                        <span className="font-josefin font-medium text-deep-black dark:text-ivory-white">
                          {t('account.manageAddresses')}
                        </span>
                      </div>
                      <span className="text-soft-gold group-hover:text-bright-gold transition-colors">→</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Logout Button */}
              <motion.button
                onClick={logout}
                className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-josefin font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-5 h-5" />
                <span>{t('account.logout')}</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}