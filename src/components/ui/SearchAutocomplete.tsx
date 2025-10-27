'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, TrendingUp, X } from 'lucide-react';
import Link from 'next/link';
import { mockProducts, mockCollections } from '@/data/mockProducts';
import { ProductImage } from './OptimizedImage';

interface SearchResult {
  id: string;
  title: string;
  type: 'product' | 'collection';
  image?: string;
  price?: number;
  handle: string;
  category?: string;
}

interface SearchAutocompleteProps {
  onClose?: () => void;
  className?: string;
}

export default function SearchAutocomplete({ onClose, className = '' }: SearchAutocompleteProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [trendingSearches] = useState(['dresses', 'silk', 'evening wear', 'blazers', 'tops']);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = useCallback((searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  }, [recentSearches]);

  // Search function
  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const searchTerm = searchQuery.toLowerCase();
    
    // Search products
    const productResults = mockProducts
      .filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        product.category.toLowerCase().includes(searchTerm)
      )
      .slice(0, 5)
      .map(product => ({
        id: product.id,
        title: product.title,
        type: 'product' as const,
        image: product.images[0]?.src,
        price: Math.min(...product.variants.map(v => v.price)),
        handle: product.handle,
        category: product.category
      }));

    // Search collections
    const collectionResults = mockCollections
      .filter(collection =>
        collection.title.toLowerCase().includes(searchTerm) ||
        collection.description.toLowerCase().includes(searchTerm)
      )
      .slice(0, 3)
      .map(collection => ({
        id: collection.id,
        title: collection.title,
        type: 'collection' as const,
        image: collection.image,
        handle: collection.handle,
        category: 'Collection'
      }));

    setResults([...productResults, ...collectionResults]);
    setIsLoading(false);
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    
    if (value.trim()) {
      search(value);
      setShowSuggestions(true);
    } else {
      setResults([]);
      setShowSuggestions(true);
    }
  };

  // Handle search submission
  const handleSearch = (searchTerm?: string) => {
    const term = searchTerm || query;
    if (term.trim()) {
      saveRecentSearch(term);
      setShowSuggestions(false);
      // Navigate to search results page
      window.location.href = `/search?q=${encodeURIComponent(term)}`;
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length + recentSearches.length + trendingSearches.length - 1 
            ? prev + 1 
            : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          const totalSuggestions = recentSearches.length + trendingSearches.length;
          if (selectedIndex < recentSearches.length) {
            handleSearch(recentSearches[selectedIndex]);
          } else if (selectedIndex < totalSuggestions) {
            handleSearch(trendingSearches[selectedIndex - recentSearches.length]);
          } else {
            const result = results[selectedIndex - totalSuggestions];
            if (result) {
              window.location.href = `/${result.type}s/${result.handle}`;
            }
          }
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Clear search
  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  // Remove recent search
  const removeRecentSearch = (index: number) => {
    const updated = recentSearches.filter((_, i) => i !== index);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-font-secondary" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search for products, collections..."
          className="w-full pl-12 pr-12 py-3 bg-white dark:bg-deep-black border border-elegant-base dark:border-elegant-base rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-gold dark:focus:ring-bright-gold text-font-primary dark:text-ivory-white placeholder-font-secondary"
          autoFocus
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-font-secondary hover:text-font-primary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-deep-black border border-elegant-base dark:border-elegant-base rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto"
          >
            <div ref={resultsRef} className="p-2">
              {/* Recent Searches */}
              {recentSearches.length > 0 && !query && (
                <div className="mb-4">
                  <div className="flex items-center px-3 py-2 text-sm font-josefin font-semibold text-font-secondary dark:text-font-secondary-dark">
                    <Clock className="w-4 h-4 mr-2" />
                    Recent Searches
                  </div>
                  {recentSearches.map((search, index) => (
                    <motion.div
                      key={search}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <button
                        onClick={() => handleSearch(search)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-elegant-base/10 dark:hover:bg-elegant-base/10 rounded transition-colors ${
                          selectedIndex === index ? 'bg-elegant-base/10 dark:bg-elegant-base/10' : ''
                        }`}
                      >
                        <span className="text-font-primary dark:text-ivory-white">{search}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeRecentSearch(index);
                          }}
                          className="text-font-secondary hover:text-font-primary transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Trending Searches */}
              {!query && (
                <div className="mb-4">
                  <div className="flex items-center px-3 py-2 text-sm font-josefin font-semibold text-font-secondary dark:text-font-secondary-dark">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Trending
                  </div>
                  {trendingSearches.map((search, index) => (
                    <motion.button
                      key={search}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSearch(search)}
                      className={`w-full text-left px-3 py-2 hover:bg-elegant-base/10 dark:hover:bg-elegant-base/10 rounded transition-colors ${
                        selectedIndex === recentSearches.length + index ? 'bg-elegant-base/10 dark:bg-elegant-base/10' : ''
                      }`}
                    >
                      <span className="text-font-primary dark:text-ivory-white">{search}</span>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Search Results */}
              {query && (
                <div>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-soft-gold"></div>
                    </div>
                  ) : results.length > 0 ? (
                    <div className="space-y-1">
                      {results.map((result, index) => (
                        <motion.div
                          key={result.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={`/${result.type}s/${result.handle}`}
                            onClick={() => setShowSuggestions(false)}
                            className={`flex items-center space-x-3 p-3 hover:bg-elegant-base/10 dark:hover:bg-elegant-base/10 rounded transition-colors ${
                              selectedIndex === recentSearches.length + trendingSearches.length + index 
                                ? 'bg-elegant-base/10 dark:bg-elegant-base/10' 
                                : ''
                            }`}
                          >
                            {result.image && (
                              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                <ProductImage
                                  src={result.image}
                                  alt={result.title}
                                  className="w-full h-full"
                                  enableZoom={false}
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-josefin font-medium text-font-primary dark:text-ivory-white truncate">
                                {result.title}
                              </div>
                              <div className="text-xs text-font-secondary dark:text-font-secondary-dark">
                                {result.category}
                                {result.price && ` • $${result.price}`}
                              </div>
                            </div>
                            <div className="text-xs text-soft-gold dark:text-bright-gold capitalize">
                              {result.type}
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-font-secondary dark:text-font-secondary-dark mb-2">
                        No results found for "{query}"
                      </div>
                      <div className="text-sm text-font-secondary dark:text-font-secondary-dark">
                        Try different keywords or check spelling
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

