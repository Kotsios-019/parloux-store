'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useShopifyProducts, useShopifyCollections, useShopifyFeaturedCollections } from '@/lib/shopify-content-manager';
import GlobalLayout from '@/components/layout/GlobalLayout';

// Example of how to use real Shopify data
export default function ShopifyIntegrationDemo() {
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Use real Shopify data hooks
  const { products, loading: productsLoading, error: productsError } = useShopifyProducts();
  const { collections, loading: collectionsLoading, error: collectionsError } = useShopifyCollections();
  const { featuredCollections, loading: featuredLoading, error: featuredError } = useShopifyFeaturedCollections();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLastUpdate(new Date());
    setIsRefreshing(false);
  };

  return (
    <GlobalLayout>
      <div className="min-h-screen bg-gradient-to-br from-champagne-nude/30 to-elegant-base/30 dark:from-champagne-nude/20 dark:to-elegant-base/20 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-4">
              Shopify Integration Demo
            </h1>
            <p className="text-lg text-font-secondary dark:text-font-secondary-dark font-josefin max-w-2xl mx-auto">
              Real-time data synchronization with Shopify Admin API
            </p>
            
            <div className="mt-6 flex items-center justify-center space-x-4">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center space-x-2 px-4 py-2 bg-soft-gold text-deep-black rounded-lg hover:bg-bright-gold transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Refresh Data</span>
              </button>
              
              {lastUpdate && (
                <div className="flex items-center space-x-2 text-sm text-font-secondary dark:text-font-secondary-dark">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
                </div>
              )}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Products Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-deep-black rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-3 h-3 rounded-full ${
                  productsLoading ? 'bg-yellow-500' : 
                  productsError ? 'bg-red-500' : 'bg-green-500'
                }`} />
                <h2 className="text-xl font-cormorant font-bold text-deep-black dark:text-ivory-white">
                  Products
                </h2>
              </div>
              
              {productsLoading ? (
                <div className="flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-soft-gold" />
                  <span className="text-font-secondary dark:text-font-secondary-dark">Loading...</span>
                </div>
              ) : productsError ? (
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-red-600 dark:text-red-400">{productsError}</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-2xl font-josefin font-bold text-soft-gold">
                    {products.length}
                  </div>
                  <div className="text-sm text-font-secondary dark:text-font-secondary-dark">
                    Products synced from Shopify
                  </div>
                  <div className="text-xs text-font-secondary dark:text-font-secondary-dark">
                    Updates automatically via webhooks
                  </div>
                </div>
              )}
            </motion.div>

            {/* Collections Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-deep-black rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-3 h-3 rounded-full ${
                  collectionsLoading ? 'bg-yellow-500' : 
                  collectionsError ? 'bg-red-500' : 'bg-green-500'
                }`} />
                <h2 className="text-xl font-cormorant font-bold text-deep-black dark:text-ivory-white">
                  Collections
                </h2>
              </div>
              
              {collectionsLoading ? (
                <div className="flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-soft-gold" />
                  <span className="text-font-secondary dark:text-font-secondary-dark">Loading...</span>
                </div>
              ) : collectionsError ? (
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-red-600 dark:text-red-400">{collectionsError}</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-2xl font-josefin font-bold text-soft-gold">
                    {collections.length}
                  </div>
                  <div className="text-sm text-font-secondary dark:text-font-secondary-dark">
                    Collections synced from Shopify
                  </div>
                  <div className="text-xs text-font-secondary dark:text-font-secondary-dark">
                    Featured collections auto-update
                  </div>
                </div>
              )}
            </motion.div>

            {/* Featured Collections Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-deep-black rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-3 h-3 rounded-full ${
                  featuredLoading ? 'bg-yellow-500' : 
                  featuredError ? 'bg-red-500' : 'bg-green-500'
                }`} />
                <h2 className="text-xl font-cormorant font-bold text-deep-black dark:text-ivory-white">
                  Featured
                </h2>
              </div>
              
              {featuredLoading ? (
                <div className="flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-soft-gold" />
                  <span className="text-font-secondary dark:text-font-secondary-dark">Loading...</span>
                </div>
              ) : featuredError ? (
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-red-600 dark:text-red-400">{featuredError}</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-2xl font-josefin font-bold text-soft-gold">
                    {featuredCollections.length}
                  </div>
                  <div className="text-sm text-font-secondary dark:text-font-secondary-dark">
                    Featured collections
                  </div>
                  <div className="text-xs text-font-secondary dark:text-font-secondary-dark">
                    Controlled by metafields
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Integration Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12"
          >
            <div className="bg-white dark:bg-deep-black rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-6">
                Automatic Updates
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
                      Products
                    </h3>
                  </div>
                  <ul className="text-sm text-font-secondary dark:text-font-secondary-dark space-y-1">
                    <li>• New products auto-appear</li>
                    <li>• Updates reflect immediately</li>
                    <li>• Deleted products removed</li>
                    <li>• Inventory syncs real-time</li>
                    <li>• Price changes update instantly</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
                      Collections
                    </h3>
                  </div>
                  <ul className="text-sm text-font-secondary dark:text-font-secondary-dark space-y-1">
                    <li>• New collections auto-create</li>
                    <li>• Featured status via metafields</li>
                    <li>• Product assignments sync</li>
                    <li>• Collection images update</li>
                    <li>• Sort order maintained</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
                      Content
                    </h3>
                  </div>
                  <ul className="text-sm text-font-secondary dark:text-font-secondary-dark space-y-1">
                    <li>• Descriptions auto-update</li>
                    <li>• Images sync from Shopify</li>
                    <li>• Tags create categories</li>
                    <li>• SEO data maintained</li>
                    <li>• Search index updates</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Webhook Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8"
          >
            <div className="bg-white dark:bg-deep-black rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-6">
                Webhook Configuration
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Info className="w-5 h-5 text-blue-500" />
                  <span className="text-font-secondary dark:text-font-secondary-dark">
                    Webhook URL: <code className="bg-elegant-base/20 px-2 py-1 rounded">https://yourdomain.com/api/webhooks/shopify</code>
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-sm font-josefin font-semibold text-green-800 dark:text-green-200">Products</div>
                    <div className="text-xs text-green-600 dark:text-green-400">create/update/delete</div>
                  </div>
                  
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-sm font-josefin font-semibold text-blue-800 dark:text-blue-200">Collections</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400">create/update/delete</div>
                  </div>
                  
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-sm font-josefin font-semibold text-purple-800 dark:text-purple-200">Orders</div>
                    <div className="text-xs text-purple-600 dark:text-purple-400">create/update/paid</div>
                  </div>
                  
                  <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="text-sm font-josefin font-semibold text-orange-800 dark:text-orange-200">Inventory</div>
                    <div className="text-xs text-orange-600 dark:text-orange-400">real-time sync</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </GlobalLayout>
  );
}

