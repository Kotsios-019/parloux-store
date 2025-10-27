'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { mockCollections } from '@/data/mockProducts';
import { useLanguage } from '@/contexts/LanguageContext';
import GlobalLayout from '@/components/layout/GlobalLayout';
import { CollectionCardSkeleton } from '@/components/ui/Skeleton';
import { HoverScale, StaggerContainer, StaggerItem } from '@/components/ui/MicroAnimations';
import { CollectionImage } from '@/components/ui/OptimizedImage';
import MobileCollectionGrid from '@/components/ui/MobileCollectionGrid';
import { AsyncErrorBoundary } from '@/components/error/AsyncErrorBoundary';
import { BreadcrumbLayout } from '@/components/navigation/BreadcrumbLayout';

export default function CollectionsPage() {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for better UX demonstration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <GlobalLayout>
        {/* Header */}
        <section className="py-20 bg-gradient-to-br from-champagne-nude/20 to-elegant-base/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="heading-primary mb-6"
            >
              Our Collections
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="body-large text-font-secondary max-w-3xl mx-auto"
            >
              Discover our carefully curated collections, each piece crafted with attention to detail 
              and designed to embody the essence of modern luxury.
            </motion.p>
          </div>
        </section>

        {/* Collections Grid Skeleton */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <CollectionCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </section>
      </GlobalLayout>
    );
  }

  return (
    <GlobalLayout>
      <AsyncErrorBoundary>
        <BreadcrumbLayout
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Collections', href: '/collections', isActive: true }
          ]}
          className="min-h-screen bg-gradient-to-br from-champagne-nude/30 to-elegant-base/30 dark:from-champagne-nude/20 dark:to-elegant-base/20"
        >
          {/* Header */}
          <section className="py-20 bg-gradient-to-br from-champagne-nude/20 to-elegant-base/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="heading-primary mb-6"
          >
            Our Collections
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="body-large text-font-secondary max-w-3xl mx-auto"
          >
            Discover our carefully curated collections, each piece crafted with attention to detail 
            and designed to embody the essence of modern luxury.
          </motion.p>
        </div>
      </section>

        {/* Mobile Collections Grid */}
        <MobileCollectionGrid 
          collections={mockCollections} 
          showCarousel={true}
          className="py-8"
        />

        {/* Desktop Collections Grid */}
        <section className="py-20 hidden lg:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockCollections.map((collection, index) => (
                <StaggerItem key={collection.id} className="group">
                  <HoverScale>
                <Link href={`/collections/${collection.handle}`}>
                  <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-deep-black shadow-lg hover:shadow-xl transition-all duration-500 group-hover:scale-105">
                    {/* Collection Image */}
                    <div className="relative h-80 w-full">
                      <CollectionImage
                        src={collection.image || '/images/products/placeholder.svg'}
                        alt={collection.title}
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Product Count Badge */}
                      <div className="absolute top-4 right-4 bg-soft-gold text-deep-black px-3 py-1 rounded-full text-sm font-josefin font-semibold">
                        {collection.products.length} {collection.products.length === 1 ? 'item' : 'items'}
                      </div>
                    </div>

                    {/* Collection Info */}
                    <div className="p-6">
                      <h3 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-3 group-hover:text-soft-gold dark:group-hover:text-bright-gold transition-colors duration-300">
                        {collection.title}
                      </h3>
                      <p className="text-font-secondary dark:text-font-secondary-dark font-josefin leading-relaxed mb-4">
                        {collection.description}
                      </p>
                      
                      {/* View Collection Button */}
                      <div className="flex items-center text-soft-gold dark:text-bright-gold font-josefin font-medium group-hover:translate-x-2 transition-transform duration-300">
                        <span>View Collection</span>
                        <svg 
                          className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
                  </HoverScale>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-champagne-nude/30 to-elegant-base/30 dark:from-champagne-nude/20 dark:to-elegant-base/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="heading-secondary mb-6"
          >
            Can't Find What You're Looking For?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="body-large text-font-secondary mb-8"
          >
            Our personal stylists are here to help you find the perfect pieces for your wardrobe.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              href="/contact" 
              className="btn-primary"
            >
              Contact Stylist
            </Link>
            <Link 
              href="/about" 
              className="btn-secondary"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>
        </BreadcrumbLayout>
      </AsyncErrorBoundary>
    </GlobalLayout>
  );
}
