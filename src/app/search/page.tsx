'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { useSearch, SearchFilters } from '@/contexts/SearchContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Product } from '@/data/mockProducts';
import Image from 'next/image';
import Link from 'next/link';
import WishlistButton from '@/components/ui/WishlistButton';
import { mockProducts } from '@/data/mockProducts';
import { useSearchParams } from 'next/navigation';

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  
  const {
    query,
    results,
    isLoading,
    filters,
    setFilters,
    performSearch,
    clearSearch,
    setQuery
  } = useSearch();
  
  const { t } = useLanguage();
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  // Handle URL parameters
  useEffect(() => {
    if (queryParam && queryParam !== query) {
      setQuery(queryParam);
      performSearch(queryParam);
    }
  }, [queryParam, query, setQuery, performSearch]);

  // Available filter options
  const categories = ['Dresses', 'Tops', 'Blazers', 'Skirts', 'Sweaters'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = ['Black', 'White', 'Navy', 'Ivory', 'Cream', 'Burgundy', 'Forest Green', 'Charcoal'];

  useEffect(() => {
    if (query) {
      performSearch();
    }
  }, [query, filters, performSearch]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    setFilters({});
    setPriceRange({ min: 0, max: 1000 });
  };

  const ProductCard = ({ product }: { product: Product }) => {
    const variant = product.variants[0];
    const minPrice = Math.min(...product.variants.map(v => v.price));
    const maxPrice = Math.max(...product.variants.map(v => v.price));
    const hasDiscount = product.variants.some(v => v.compareAtPrice && v.compareAtPrice > v.price);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="group relative"
      >
        <Link href={`/products/${product.handle}`}>
          <div className="relative bg-white dark:bg-deep-black rounded-2xl overflow-hidden border border-elegant-base dark:border-elegant-base hover:shadow-xl transition-all duration-300">
            {/* Product Image */}
            <div className="relative w-full h-80 overflow-hidden">
              <Image
                src={product.images[0]?.src || '/images/products/placeholder.svg'}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="w-full h-full bg-gradient-to-br from-soft-gold/20 to-champagne-nude/30 flex items-center justify-center">
                        <div class="text-center">
                          <div class="w-16 h-16 bg-soft-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span class="text-deep-black font-cormorant text-xl">${product.category.charAt(0)}</span>
                          </div>
                          <p class="text-font-secondary font-josefin text-sm">${product.category}</p>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
              
              {/* Wishlist Button */}
              <div className="absolute top-4 right-4 z-10">
                <div className="w-8 h-8 bg-ivory-white/90 dark:bg-deep-black/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
                  <WishlistButton
                    product={product}
                    variant={variant}
                    className="text-soft-gold hover:text-red-500"
                  />
                </div>
              </div>

              {/* Discount Badge */}
              {hasDiscount && (
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 bg-red-500 text-white text-xs font-josefin font-semibold rounded-full">
                    Sale
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-6">
              <div className="mb-2">
                <span className="text-xs font-josefin text-soft-gold uppercase tracking-wider">
                  {product.category}
                </span>
              </div>
              <h3 className="heading-tertiary mb-2 group-hover:text-soft-gold transition-colors">
                {product.title}
              </h3>
              <p className="body-small text-font-secondary mb-4 line-clamp-2">
                {product.description}
              </p>
              
              {/* Price */}
              <div className="flex items-center space-x-2">
                {minPrice === maxPrice ? (
                  <span className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
                    {formatPrice(minPrice)}
                  </span>
                ) : (
                  <span className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
                    {formatPrice(minPrice)} - {formatPrice(maxPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-deep-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-champagne-nude/30 to-elegant-base/30 dark:from-champagne-nude/20 dark:to-elegant-base/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="heading-primary mb-4">
              {query ? `${t('search.resultsFor')} "${query}"` : t('search.searchResults')}
            </h1>
            <p className="body-large text-font-secondary">
              {isLoading ? t('search.searching') : `${results.length} ${t('search.resultsFound')}`}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="sticky top-8">
              <div className="bg-ivory-white dark:bg-deep-black border border-elegant-base dark:border-elegant-base rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="heading-tertiary flex items-center space-x-2">
                    <Filter className="w-5 h-5" />
                    <span>{t('search.filters')}</span>
                  </h2>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-font-secondary dark:text-font-secondary-dark hover:text-soft-gold dark:hover:text-bright-gold transition-colors"
                  >
                    {t('search.clearAll')}
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Category Filter */}
                  <div>
                    <h3 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-3">
                      {t('search.category')}
                    </h3>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <label key={category} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.category === category}
                            onChange={() => handleFilterChange('category', filters.category === category ? undefined : category)}
                            className="w-4 h-4 text-soft-gold border-elegant-base rounded focus:ring-soft-gold focus:ring-2"
                          />
                          <span className="text-font-secondary dark:text-font-secondary-dark font-josefin">
                            {category}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-3">
                      {t('search.priceRange')}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={filters.minPrice || ''}
                          onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                          className="w-full px-3 py-2 border border-elegant-base dark:border-elegant-base rounded-lg bg-transparent text-deep-black dark:text-ivory-white focus:outline-none focus:ring-2 focus:ring-soft-gold"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          value={filters.maxPrice || ''}
                          onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                          className="w-full px-3 py-2 border border-elegant-base dark:border-elegant-base rounded-lg bg-transparent text-deep-black dark:text-ivory-white focus:outline-none focus:ring-2 focus:ring-soft-gold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Size Filter */}
                  <div>
                    <h3 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-3">
                      {t('search.size')}
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => handleFilterChange('size', filters.size === size ? undefined : size)}
                          className={`px-3 py-2 text-sm font-josefin rounded-lg border transition-colors ${
                            filters.size === size
                              ? 'bg-soft-gold text-deep-black border-soft-gold'
                              : 'border-elegant-base dark:border-elegant-base text-font-secondary dark:text-font-secondary-dark hover:bg-elegant-base/10 dark:hover:bg-elegant-base/20'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Filter */}
                  <div>
                    <h3 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-3">
                      {t('search.color')}
                    </h3>
                    <div className="space-y-2">
                      {colors.map(color => (
                        <label key={color} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.color === color}
                            onChange={() => handleFilterChange('color', filters.color === color ? undefined : color)}
                            className="w-4 h-4 text-soft-gold border-elegant-base rounded focus:ring-soft-gold focus:ring-2"
                          />
                          <span className="text-font-secondary dark:text-font-secondary-dark font-josefin">
                            {color}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <span className="text-font-secondary dark:text-font-secondary-dark font-josefin">
                  {t('search.sortBy')}:
                </span>
                <select
                  value={filters.sortBy || 'relevance'}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="px-4 py-2 border border-elegant-base dark:border-elegant-base rounded-lg bg-transparent text-deep-black dark:text-ivory-white focus:outline-none focus:ring-2 focus:ring-soft-gold"
                >
                  <option value="relevance">{t('search.relevance')}</option>
                  <option value="price-asc">{t('search.priceLowToHigh')}</option>
                  <option value="price-desc">{t('search.priceHighToLow')}</option>
                  <option value="newest">{t('search.newest')}</option>
                  <option value="popularity">{t('search.popularity')}</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-soft-gold border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {results.map((result) => (
                  <ProductCard key={result.product.id} product={result.product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Search className="w-16 h-16 text-elegant-base/50 dark:text-elegant-base/30 mx-auto mb-6" />
                <h3 className="heading-tertiary mb-4">{t('search.noResults')}</h3>
                <p className="body-large text-font-secondary mb-8">
                  {t('search.noResultsDescription')}
                </p>
                <div className="space-y-4">
                  <button
                    onClick={clearSearch}
                    className="btn-primary"
                  >
                    {t('search.clearSearch')}
                  </button>
                  <div>
                    <Link href="/collections" className="btn-secondary">
                      {t('search.browseCollections')}
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}