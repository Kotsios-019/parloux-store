'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Breadcrumb item interface
export interface BreadcrumbItem {
  label: string;
  href: string;
  isActive?: boolean;
  icon?: React.ReactNode;
}

// Breadcrumb props interface
interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
  showBackButton?: boolean;
  maxItems?: number;
  separator?: React.ReactNode;
  onBack?: () => void;
}

// Main breadcrumb component
export function Breadcrumb({
  items = [],
  className = '',
  showHome = true,
  showBackButton = false,
  maxItems = 5,
  separator = <ChevronRight className="w-4 h-4 text-font-secondary dark:text-font-secondary-dark" />,
  onBack
}: BreadcrumbProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();

  // Generate breadcrumbs from pathname if no items provided
  const generatedItems = React.useMemo(() => {
    if (items.length > 0) return items;

    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    // Add home if enabled
    if (showHome) {
      breadcrumbs.push({
        label: t('breadcrumb.home'),
        href: '/',
        icon: <Home className="w-4 h-4" />
      });
    }

    // Generate breadcrumbs from path segments
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      // Convert segment to readable label
      const label = formatSegmentLabel(segment, pathSegments, index);
      
      breadcrumbs.push({
        label,
        href: currentPath,
        isActive: isLast
      });
    });

    return breadcrumbs;
  }, [pathname, items, showHome, t]);

  // Limit items if maxItems is specified
  const displayItems = React.useMemo(() => {
    if (generatedItems.length <= maxItems) return generatedItems;

    const firstItem = generatedItems[0];
    const lastItems = generatedItems.slice(-2);
    const middleItem = { label: '...', href: '#', isActive: false };

    return [firstItem, middleItem, ...lastItems];
  }, [generatedItems, maxItems]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <nav
      className={`flex items-center space-x-2 text-sm font-josefin ${className}`}
      aria-label="Breadcrumb navigation"
    >
      {/* Back Button */}
      {showBackButton && (
        <button
          onClick={handleBack}
          className="flex items-center space-x-1 text-font-secondary dark:text-font-secondary-dark hover:text-font-primary dark:hover:text-ivory-white transition-colors focus:outline-none focus:ring-2 focus:ring-soft-gold focus:ring-offset-2 rounded"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">{t('breadcrumb.back')}</span>
        </button>
      )}

      {/* Breadcrumb Items */}
      <ol className="flex items-center space-x-2" role="list">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isEllipsis = item.label === '...';

          return (
            <li key={index} className="flex items-center">
              {/* Breadcrumb Item */}
              {isEllipsis ? (
                <span className="text-font-secondary dark:text-font-secondary-dark px-2">
                  {item.label}
                </span>
              ) : (
                <BreadcrumbItemComponent
                  item={item}
                  isLast={isLast}
                  isActive={item.isActive}
                />
              )}

              {/* Separator */}
              {!isLast && (
                <span className="mx-2" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// Individual breadcrumb item component
function BreadcrumbItemComponent({
  item,
  isLast,
  isActive
}: {
  item: BreadcrumbItem;
  isLast: boolean;
  isActive?: boolean;
}) {
  const isClickable = !isLast && !isActive && item.href !== '#';

  if (isClickable) {
    return (
      <Link
        href={item.href}
        className="flex items-center space-x-1 text-font-secondary dark:text-font-secondary-dark hover:text-soft-gold dark:hover:text-bright-gold transition-colors focus:outline-none focus:ring-2 focus:ring-soft-gold focus:ring-offset-2 rounded"
        aria-current={isActive ? 'page' : undefined}
      >
        {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
        <span>{item.label}</span>
      </Link>
    );
  }

  return (
    <span
      className={`flex items-center space-x-1 ${
        isActive || isLast
          ? 'text-font-primary dark:text-ivory-white font-semibold'
          : 'text-font-secondary dark:text-font-secondary-dark'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
      <span>{item.label}</span>
    </span>
  );
}

// Format segment label for better readability
function formatSegmentLabel(segment: string, allSegments: string[], index: number): string {
  // Handle common patterns
  const segmentMap: { [key: string]: string } = {
    'products': 'Products',
    'collections': 'Collections',
    'about': 'About',
    'contact': 'Contact',
    'account': 'Account',
    'login': 'Login',
    'register': 'Register',
    'checkout': 'Checkout',
    'cart': 'Cart',
    'wishlist': 'Wishlist',
    'search': 'Search',
    'orders': 'Orders',
    'profile': 'Profile',
    'settings': 'Settings'
  };

  // Check if it's a known segment
  if (segmentMap[segment]) {
    return segmentMap[segment];
  }

  // Handle dynamic segments (like product slugs, collection slugs)
  if (index > 0) {
    const parentSegment = allSegments[index - 1];
    
    // Product page
    if (parentSegment === 'products') {
      return formatProductName(segment);
    }
    
    // Collection page
    if (parentSegment === 'collections') {
      return formatCollectionName(segment);
    }
    
    // Category page
    if (parentSegment === 'categories') {
      return formatCategoryName(segment);
    }
  }

  // Default: capitalize and replace hyphens with spaces
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Format product name from slug
function formatProductName(slug: string): string {
  // This would ideally fetch from your product data
  // For now, we'll format the slug
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Format collection name from slug
function formatCollectionName(slug: string): string {
  const collectionMap: { [key: string]: string } = {
    'dresses': 'Dresses',
    'tops': 'Tops',
    'blazers': 'Blazers',
    'skirts': 'Skirts',
    'sweaters': 'Sweaters',
    'new-arrivals': 'New Arrivals',
    'sale': 'Sale',
    'featured': 'Featured'
  };

  return collectionMap[slug] || slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Format category name from slug
function formatCategoryName(slug: string): string {
  const categoryMap: { [key: string]: string } = {
    'women': 'Women',
    'men': 'Men',
    'kids': 'Kids',
    'accessories': 'Accessories',
    'shoes': 'Shoes',
    'bags': 'Bags',
    'jewelry': 'Jewelry'
  };

  return categoryMap[slug] || slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Breadcrumb context for dynamic breadcrumbs
interface BreadcrumbContextType {
  setBreadcrumbs: (items: BreadcrumbItem[]) => void;
  addBreadcrumb: (item: BreadcrumbItem) => void;
  clearBreadcrumbs: () => void;
}

const BreadcrumbContext = React.createContext<BreadcrumbContextType | undefined>(undefined);

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
  const [customBreadcrumbs, setCustomBreadcrumbs] = React.useState<BreadcrumbItem[]>([]);

  const setBreadcrumbs = React.useCallback((items: BreadcrumbItem[]) => {
    setCustomBreadcrumbs(items);
  }, []);

  const addBreadcrumb = React.useCallback((item: BreadcrumbItem) => {
    setCustomBreadcrumbs(prev => [...prev, item]);
  }, []);

  const clearBreadcrumbs = React.useCallback(() => {
    setCustomBreadcrumbs([]);
  }, []);

  return (
    <BreadcrumbContext.Provider value={{ setBreadcrumbs, addBreadcrumb, clearBreadcrumbs }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  const context = React.useContext(BreadcrumbContext);
  if (context === undefined) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
  }
  return context;
}

// Animated breadcrumb for special effects
export function AnimatedBreadcrumb({
  items,
  className = '',
  animationDelay = 0.1
}: {
  items: BreadcrumbItem[];
  className?: string;
  animationDelay?: number;
}) {
  return (
    <nav className={`flex items-center space-x-2 text-sm font-josefin ${className}`} aria-label="Breadcrumb navigation">
      <ol className="flex items-center space-x-2" role="list">
        {items.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * animationDelay }}
            className="flex items-center"
          >
            <BreadcrumbItemComponent
              item={item}
              isLast={index === items.length - 1}
              isActive={item.isActive}
            />
            {index < items.length - 1 && (
              <span className="mx-2" aria-hidden="true">
                <ChevronRight className="w-4 h-4 text-font-secondary dark:text-font-secondary-dark" />
              </span>
            )}
          </motion.li>
        ))}
      </ol>
    </nav>
  );
}

// Compact breadcrumb for mobile
export function CompactBreadcrumb({
  items,
  className = '',
  maxItems = 3
}: {
  items: BreadcrumbItem[];
  className?: string;
  maxItems?: number;
}) {
  const displayItems = React.useMemo(() => {
    if (items.length <= maxItems) return items;
    
    const firstItem = items[0];
    const lastItem = items[items.length - 1];
    
    return [firstItem, { label: '...', href: '#', isActive: false }, lastItem];
  }, [items, maxItems]);

  return (
    <nav className={`flex items-center space-x-1 text-xs font-josefin ${className}`} aria-label="Breadcrumb navigation">
      <ol className="flex items-center space-x-1" role="list">
        {displayItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.label === '...' ? (
              <span className="text-font-secondary dark:text-font-secondary-dark px-1">
                {item.label}
              </span>
            ) : (
              <BreadcrumbItemComponent
                item={item}
                isLast={index === displayItems.length - 1}
                isActive={item.isActive}
              />
            )}
            {index < displayItems.length - 1 && (
              <span className="mx-1" aria-hidden="true">
                <ChevronRight className="w-3 h-3 text-font-secondary dark:text-font-secondary-dark" />
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Breadcrumb with search integration
export function SearchBreadcrumb({
  searchQuery,
  resultsCount,
  className = ''
}: {
  searchQuery: string;
  resultsCount: number;
  className?: string;
}) {
  const { t } = useLanguage();

  const items: BreadcrumbItem[] = [
    {
      label: t('breadcrumb.home'),
      href: '/',
      icon: <Home className="w-4 h-4" />
    },
    {
      label: t('breadcrumb.search'),
      href: '/search',
      icon: <span className="w-4 h-4">🔍</span>
    },
    {
      label: `"${searchQuery}" (${resultsCount} results)`,
      href: '#',
      isActive: true
    }
  ];

  return <Breadcrumb items={items} className={className} showHome={false} />;
}
