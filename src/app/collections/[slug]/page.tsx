'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockCollections, getCollectionByHandle } from '@/data/mockProducts';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import GlobalLayout from '@/components/layout/GlobalLayout';
import WishlistButton from '@/components/ui/WishlistButton';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { ProductImage, CollectionImage } from '@/components/ui/OptimizedImage';
import MobileProductCard from '@/components/ui/MobileProductCard';
import { MobileGrid } from '@/components/ui/MobileTouch';
import { useCart } from '@/contexts/MockCartContext';
import { useWishlist } from '@/contexts/MockWishlistContext';

interface CollectionPageProps {
  params: {
    slug: string;
  };
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const { t } = useLanguage();
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [slug, setSlug] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const { addItem: addToCart } = useCart();
  const { addItem: addToWishlist } = useWishlist();

  const handleAddToCart = (product: any, variant: any, quantity: number, size?: string, color?: string) => {
    addToCart(product, variant, quantity, size, color);
  };

  const handleAddToWishlist = (product: any) => {
    addToWishlist(product);
  };

  // Handle async params
  useEffect(() => {
    const getSlug = async () => {
      try {
        const resolvedParams = await params;
        setSlug(resolvedParams.slug);
        setIsLoading(false);
      } catch (error) {
        console.error('Error resolving params:', error);
        setIsLoading(false);
      }
    };
    getSlug();
  }, [params]);

  const collection = slug ? getCollectionByHandle(slug) : null;
  
  if (isLoading) {
    return (
      <GlobalLayout>
        {/* Collection Header Skeleton */}
        <section className="py-20 bg-gradient-to-br from-champagne-nude/20 to-elegant-base/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Collection Info Skeleton */}
              <div className="space-y-6">
                <div className="h-12 w-3/4 bg-gradient-to-r from-elegant-base/20 via-elegant-base/10 to-elegant-base/20 rounded-lg animate-pulse"></div>
                <div className="space-y-3">
                  <div className="h-4 w-full bg-gradient-to-r from-elegant-base/20 via-elegant-base/10 to-elegant-base/20 rounded animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-gradient-to-r from-elegant-base/20 via-elegant-base/10 to-elegant-base/20 rounded animate-pulse"></div>
                  <div className="h-4 w-4/6 bg-gradient-to-r from-elegant-base/20 via-elegant-base/10 to-elegant-base/20 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="h-12 w-12 bg-gradient-to-r from-elegant-base/20 via-elegant-base/10 to-elegant-base/20 rounded animate-pulse"></div>
                  <div className="h-px w-12 bg-elegant-base/20"></div>
                  <div className="h-4 w-48 bg-gradient-to-r from-elegant-base/20 via-elegant-base/10 to-elegant-base/20 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Collection Image Skeleton */}
              <div className="h-96 lg:h-[500px] bg-gradient-to-r from-elegant-base/20 via-elegant-base/10 to-elegant-base/20 rounded-2xl animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Products Grid Skeleton */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </section>
      </GlobalLayout>
    );
  }

  if (!collection) {
    return (
      <GlobalLayout>
        <div className="min-h-screen bg-gradient-to-br from-champagne-nude/30 to-elegant-base/30 dark:from-champagne-nude/20 dark:to-elegant-base/20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-4">
              Collection Not Found
            </h1>
            <p className="text-font-secondary mb-8">
              The collection you're looking for doesn't exist.
            </p>
            <Link href="/collections" className="btn-primary">
              View All Collections
            </Link>
          </div>
        </div>
      </GlobalLayout>
    );
  }

  // Sort products based on selected option
  const sortedProducts = [...collection.products].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return Math.min(...a.variants.map(v => v.price)) - Math.min(...b.variants.map(v => v.price));
      case 'price-desc':
        return Math.min(...b.variants.map(v => v.price)) - Math.min(...a.variants.map(v => v.price));
      case 'name-asc':
        return a.title.localeCompare(b.title);
      case 'name-desc':
        return b.title.localeCompare(a.title);
      case 'newest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <GlobalLayout>
      {/* Collection Header */}
      <section className="py-20 bg-gradient-to-br from-champagne-nude/20 to-elegant-base/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Collection Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="heading-primary mb-6">{collection.title}</h1>
              <p className="body-large text-font-secondary dark:text-font-secondary-dark mb-8 leading-relaxed">
                {collection.description}
              </p>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-cormorant font-bold text-soft-gold">
                    {collection.products.length}
                  </div>
                  <div className="text-sm font-josefin text-font-secondary dark:text-font-secondary-dark">
                    {collection.products.length === 1 ? 'Item' : 'Items'}
                  </div>
                </div>
                <div className="w-px h-12 bg-elegant-base"></div>
                <div className="text-sm font-josefin text-font-secondary dark:text-font-secondary-dark">
                  Curated with attention to detail and timeless elegance
                </div>
              </div>
            </motion.div>

            {/* Collection Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden"
            >
              <CollectionImage
                src={collection.image || '/images/products/placeholder.svg'}
                alt={collection.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters and Sort */}
      <section className="py-8 border-b border-elegant-base dark:border-elegant-base">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-font-secondary hover:text-soft-gold dark:hover:text-bright-gold transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span>Filters</span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm font-josefin text-font-secondary">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border border-elegant-base dark:border-elegant-base rounded-lg px-3 py-2 text-font-primary dark:text-ivory-white focus:outline-none focus:ring-2 focus:ring-soft-gold dark:focus:ring-bright-gold"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 p-6 bg-champagne-nude/10 dark:bg-elegant-base/10 rounded-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-font-secondary">Under $500</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-font-secondary">$500 - $1000</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-font-secondary">Over $1000</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-3">Size</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-font-secondary">XS</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-font-secondary">S</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-font-secondary">M</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-font-secondary">L</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-3">Availability</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-font-secondary">In Stock</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-font-secondary">On Sale</span>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Mobile Products Grid */}
      <section className="py-8 lg:hidden">
        <div className="px-4">
          {sortedProducts.length > 0 ? (
            <MobileGrid
              minItemWidth="280px"
              gap="1rem"
            >
              {sortedProducts.map((product, index) => (
                <MobileProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onAddToCart={handleAddToCart}
                  onAddToWishlist={handleAddToWishlist}
                />
              ))}
            </MobileGrid>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-elegant-base/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-font-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-4">
                No products found
              </h3>
              <p className="text-font-secondary font-josefin mb-8">
                We're working on adding more items to this collection. Check back soon!
              </p>
              <Link
                href="/collections"
                className="btn-primary"
              >
                View All Collections
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Desktop Products Grid */}
      <section className="py-12 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/products/${product.handle}`}>
                    <div className="bg-white dark:bg-deep-black rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group-hover:scale-105">
                      {/* Product Image */}
                      <div className="relative h-80 w-full">
                        <ProductImage
                          src={product.images[0]?.src || '/images/products/placeholder.svg'}
                          alt={product.images[0]?.alt || product.title}
                          enableZoom={true}
                          priority={index < 4} // First 4 images load with priority
                        />
                        
                        {/* Sale Badge */}
                        {product.variants.some(v => v.compareAtPrice) && (
                          <div className="absolute top-4 left-4 bg-soft-gold text-deep-black px-2 py-1 rounded-full text-xs font-josefin font-semibold">
                            Sale
                          </div>
                        )}

                        {/* Wishlist Button */}
                        <div className="absolute top-4 right-4">
                          <div className="w-8 h-8 bg-ivory-white/90 dark:bg-deep-black/90 rounded-full flex items-center justify-center shadow-lg">
                            <WishlistButton
                              product={product}
                              variant={product.variants[0]}
                              className="text-soft-gold hover:text-red-500"
                            />
                          </div>
                        </div>

                        {/* Quick Actions Overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="flex space-x-4">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300">
                              <WishlistButton
                                product={product}
                                variant={product.variants[0]}
                                className="text-white hover:text-red-300"
                              />
                            </div>
                            <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-2 group-hover:text-soft-gold dark:group-hover:text-bright-gold transition-colors duration-300">
                          {product.title}
                        </h3>
                        <p className="text-sm font-josefin text-font-secondary dark:text-font-secondary-dark mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        
                        {/* Price */}
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-cormorant font-bold text-deep-black dark:text-ivory-white">
                            ${Math.min(...product.variants.map(v => v.price))}
                          </span>
                          {product.variants.some(v => v.compareAtPrice) && (
                            <span className="text-sm font-josefin text-font-secondary dark:text-font-secondary-dark line-through">
                              ${Math.min(...product.variants.filter(v => v.compareAtPrice).map(v => v.compareAtPrice!))}
                            </span>
                          )}
                        </div>

                        {/* Available Sizes */}
                        <div className="mt-4 flex flex-wrap gap-1">
                          {[...new Set(product.variants.map(v => v.size).filter(Boolean))].slice(0, 4).map((size) => (
                            <span
                              key={size}
                              className="px-2 py-1 text-xs font-josefin bg-elegant-base/20 text-font-secondary dark:text-font-secondary-dark rounded"
                            >
                              {size}
                            </span>
                          ))}
                          {[...new Set(product.variants.map(v => v.size).filter(Boolean))].length > 4 && (
                            <span className="px-2 py-1 text-xs font-josefin text-font-secondary dark:text-font-secondary-dark">
                              +{[...new Set(product.variants.map(v => v.size).filter(Boolean))].length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-elegant-base/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-font-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-4">
                No products found
              </h3>
              <p className="text-font-secondary font-josefin mb-8">
                We're working on adding more items to this collection. Check back soon!
              </p>
              <Link
                href="/collections"
                className="btn-primary"
              >
                View All Collections
              </Link>
            </div>
          )}
        </div>
      </section>
    </GlobalLayout>
  );
}
