'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb';

interface BreadcrumbLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  showHome?: boolean;
  showBackButton?: boolean;
  className?: string;
  breadcrumbClassName?: string;
}

export function BreadcrumbLayout({
  children,
  breadcrumbs,
  showHome = true,
  showBackButton = false,
  className = '',
  breadcrumbClassName = ''
}: BreadcrumbLayoutProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Breadcrumb Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-deep-black border-b border-elegant-base dark:border-elegant-base py-4"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={breadcrumbs}
            showHome={showHome}
            showBackButton={showBackButton}
            className={breadcrumbClassName}
          />
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Page-specific breadcrumb components
export function ProductBreadcrumb({ 
  productTitle, 
  category, 
  className = '' 
}: { 
  productTitle: string; 
  category: string; 
  className?: string; 
}) {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Collections', href: '/collections' },
    { label: category, href: `/collections/${category.toLowerCase()}` },
    { label: productTitle, href: '#', isActive: true }
  ];

  return <Breadcrumb items={breadcrumbs} className={className} />;
}

export function CollectionBreadcrumb({ 
  collectionTitle, 
  className = '' 
}: { 
  collectionTitle: string; 
  className?: string; 
}) {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Collections', href: '/collections' },
    { label: collectionTitle, href: '#', isActive: true }
  ];

  return <Breadcrumb items={breadcrumbs} className={className} />;
}

export function SearchBreadcrumb({ 
  searchQuery, 
  resultsCount, 
  className = '' 
}: { 
  searchQuery: string; 
  resultsCount: number; 
  className?: string; 
}) {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Search', href: '/search' },
    { label: `"${searchQuery}" (${resultsCount} results)`, href: '#', isActive: true }
  ];

  return <Breadcrumb items={breadcrumbs} className={className} />;
}

export function AccountBreadcrumb({ 
  section, 
  className = '' 
}: { 
  section: string; 
  className?: string; 
}) {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Account', href: '/account' },
    { label: section, href: '#', isActive: true }
  ];

  return <Breadcrumb items={breadcrumbs} className={className} />;
}

export function CheckoutBreadcrumb({ 
  step, 
  className = '' 
}: { 
  step: string; 
  className?: string; 
}) {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Cart', href: '/cart' },
    { label: 'Checkout', href: '/checkout' },
    { label: step, href: '#', isActive: true }
  ];

  return <Breadcrumb items={breadcrumbs} className={className} />;
}

// Breadcrumb with page title
export function PageBreadcrumb({
  title,
  breadcrumbs,
  className = '',
  titleClassName = ''
}: {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      <Breadcrumb items={breadcrumbs} />
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className={`text-3xl font-cormorant font-bold text-deep-black dark:text-ivory-white ${titleClassName}`}
      >
        {title}
      </motion.h1>
    </div>
  );
}

// Mobile-optimized breadcrumb
export function MobileBreadcrumb({
  items,
  className = ''
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  // Show only last 2 items on mobile
  const mobileItems = items.slice(-2);
  
  return (
    <div className={`lg:hidden ${className}`}>
      <Breadcrumb 
        items={mobileItems} 
        maxItems={2}
        className="text-xs"
      />
    </div>
  );
}

// Desktop breadcrumb
export function DesktopBreadcrumb({
  items,
  className = ''
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  return (
    <div className={`hidden lg:block ${className}`}>
      <Breadcrumb items={items} />
    </div>
  );
}

// Responsive breadcrumb that shows different versions on mobile/desktop
export function ResponsiveBreadcrumb({
  items,
  className = ''
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  return (
    <div className={className}>
      <MobileBreadcrumb items={items} />
      <DesktopBreadcrumb items={items} />
    </div>
  );
}
