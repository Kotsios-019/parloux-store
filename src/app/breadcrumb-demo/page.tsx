'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Breadcrumb, 
  AnimatedBreadcrumb, 
  CompactBreadcrumb, 
  ResponsiveBreadcrumb,
  SearchBreadcrumb 
} from '@/components/navigation/Breadcrumb';
import { 
  BreadcrumbLayout, 
  ProductBreadcrumb, 
  CollectionBreadcrumb, 
  AccountBreadcrumb,
  CheckoutBreadcrumb,
  PageBreadcrumb 
} from '@/components/navigation/BreadcrumbLayout';
import GlobalLayout from '@/components/layout/GlobalLayout';

export default function BreadcrumbDemoPage() {
  const [currentDemo, setCurrentDemo] = useState('basic');

  const demos = [
    { id: 'basic', name: 'Basic Breadcrumb', component: 'BasicBreadcrumb' },
    { id: 'animated', name: 'Animated Breadcrumb', component: 'AnimatedBreadcrumb' },
    { id: 'compact', name: 'Compact Breadcrumb', component: 'CompactBreadcrumb' },
    { id: 'responsive', name: 'Responsive Breadcrumb', component: 'ResponsiveBreadcrumb' },
    { id: 'search', name: 'Search Breadcrumb', component: 'SearchBreadcrumb' },
    { id: 'product', name: 'Product Breadcrumb', component: 'ProductBreadcrumb' },
    { id: 'collection', name: 'Collection Breadcrumb', component: 'CollectionBreadcrumb' },
    { id: 'account', name: 'Account Breadcrumb', component: 'AccountBreadcrumb' },
    { id: 'checkout', name: 'Checkout Breadcrumb', component: 'CheckoutBreadcrumb' },
    { id: 'page', name: 'Page with Title', component: 'PageBreadcrumb' }
  ];

  const sampleBreadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Collections', href: '/collections' },
    { label: 'Dresses', href: '/collections/dresses' },
    { label: 'Elegant Silk Dress', href: '#', isActive: true }
  ];

  const renderDemo = () => {
    switch (currentDemo) {
      case 'basic':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
              Basic Breadcrumb
            </h3>
            <Breadcrumb items={sampleBreadcrumbs} />
          </div>
        );

      case 'animated':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
              Animated Breadcrumb
            </h3>
            <AnimatedBreadcrumb items={sampleBreadcrumbs} />
          </div>
        );

      case 'compact':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
              Compact Breadcrumb (Mobile)
            </h3>
            <CompactBreadcrumb items={sampleBreadcrumbs} />
          </div>
        );

      case 'responsive':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
              Responsive Breadcrumb
            </h3>
            <ResponsiveBreadcrumb items={sampleBreadcrumbs} />
            <p className="text-sm text-font-secondary dark:text-font-secondary-dark">
              Shows compact version on mobile, full version on desktop
            </p>
          </div>
        );

      case 'search':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
              Search Breadcrumb
            </h3>
            <SearchBreadcrumb searchQuery="elegant dress" resultsCount={24} />
          </div>
        );

      case 'product':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
              Product Breadcrumb
            </h3>
            <ProductBreadcrumb 
              productTitle="Elegant Silk Dress"
              category="Dresses"
            />
          </div>
        );

      case 'collection':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
              Collection Breadcrumb
            </h3>
            <CollectionBreadcrumb collectionTitle="Dresses" />
          </div>
        );

      case 'account':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
              Account Breadcrumb
            </h3>
            <AccountBreadcrumb section="Profile" />
          </div>
        );

      case 'checkout':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
              Checkout Breadcrumb
            </h3>
            <CheckoutBreadcrumb step="Payment" />
          </div>
        );

      case 'page':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
              Page with Title
            </h3>
            <PageBreadcrumb
              title="Breadcrumb Demo"
              breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: 'Components', href: '/components' },
                { label: 'Breadcrumb Demo', href: '#', isActive: true }
              ]}
            />
          </div>
        );

      default:
        return null;
    }
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
              Breadcrumb Navigation Demo
            </h1>
            <p className="text-lg text-font-secondary dark:text-font-secondary-dark font-josefin max-w-2xl mx-auto">
              Explore different breadcrumb navigation styles and implementations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Demo Selector */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white dark:bg-deep-black rounded-lg shadow-lg p-6 sticky top-8">
                <h2 className="text-xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-6">
                  Demo Types
                </h2>
                
                <div className="space-y-2">
                  {demos.map((demo) => (
                    <button
                      key={demo.id}
                      onClick={() => setCurrentDemo(demo.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg font-josefin transition-colors ${
                        currentDemo === demo.id
                          ? 'bg-soft-gold text-deep-black'
                          : 'text-font-secondary dark:text-font-secondary-dark hover:bg-elegant-base/10'
                      }`}
                    >
                      {demo.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Demo Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-3"
            >
              <div className="bg-white dark:bg-deep-black rounded-lg shadow-lg p-8">
                {renderDemo()}
                
                {/* Code Example */}
                <div className="mt-8 p-4 bg-elegant-base/10 dark:bg-elegant-base/20 rounded-lg">
                  <h4 className="text-sm font-josefin font-semibold text-font-primary dark:text-ivory-white mb-2">
                    Code Example:
                  </h4>
                  <pre className="text-xs text-font-secondary dark:text-font-secondary-dark overflow-x-auto">
                    <code>
{`<Breadcrumb 
  items={[
    { label: 'Home', href: '/' },
    { label: 'Collections', href: '/collections' },
    { label: 'Dresses', href: '/collections/dresses' },
    { label: 'Elegant Silk Dress', href: '#', isActive: true }
  ]}
  showHome={true}
  showBackButton={false}
  maxItems={5}
/>`}
                    </code>
                  </pre>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12"
          >
            <div className="bg-white dark:bg-deep-black rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-6">
                Breadcrumb Features
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
                    🧭 Navigation
                  </h3>
                  <ul className="text-sm text-font-secondary dark:text-font-secondary-dark space-y-1">
                    <li>• Automatic path generation</li>
                    <li>• Custom breadcrumb items</li>
                    <li>• Back button support</li>
                    <li>• Home link integration</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
                    📱 Responsive
                  </h3>
                  <ul className="text-sm text-font-secondary dark:text-font-secondary-dark space-y-1">
                    <li>• Mobile-optimized</li>
                    <li>• Compact view</li>
                    <li>• Item limiting</li>
                    <li>• Touch-friendly</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
                    ♿ Accessible
                  </h3>
                  <ul className="text-sm text-font-secondary dark:text-font-secondary-dark space-y-1">
                    <li>• ARIA labels</li>
                    <li>• Screen reader support</li>
                    <li>• Keyboard navigation</li>
                    <li>• Semantic markup</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
                    🎨 Customizable
                  </h3>
                  <ul className="text-sm text-font-secondary dark:text-font-secondary-dark space-y-1">
                    <li>• Custom separators</li>
                    <li>• Icon support</li>
                    <li>• Animation options</li>
                    <li>• Theme integration</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
                    🌐 International
                  </h3>
                  <ul className="text-sm text-font-secondary dark:text-font-secondary-dark space-y-1">
                    <li>• Multi-language support</li>
                    <li>• RTL compatibility</li>
                    <li>• Localized labels</li>
                    <li>• Cultural adaptation</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
                    ⚡ Performance
                  </h3>
                  <ul className="text-sm text-font-secondary dark:text-font-secondary-dark space-y-1">
                    <li>• Optimized rendering</li>
                    <li>• Lazy loading</li>
                    <li>• Memory efficient</li>
                    <li>• Fast navigation</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </GlobalLayout>
  );
}
