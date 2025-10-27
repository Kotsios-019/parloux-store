'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Product } from '@/data/mockProducts';

export interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  color?: string;
  availability?: 'all' | 'in-stock' | 'out-of-stock';
  sortBy?: 'relevance' | 'price-asc' | 'price-desc' | 'newest' | 'popularity';
}

export interface SearchResult {
  product: Product;
  relevanceScore: number;
  matchedFields: string[];
}

export interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  results: SearchResult[];
  isLoading: boolean;
  isOpen: boolean;
  toggleSearch: () => void;
  closeSearch: () => void;
  searchHistory: string[];
  addToHistory: (query: string) => void;
  clearHistory: () => void;
  popularSearches: string[];
  suggestions: string[];
  performSearch: (query?: string, filters?: SearchFilters) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Popular searches (could be dynamic in the future)
  const popularSearches = [
    'silk dress',
    'white blouse',
    'wool blazer',
    'cashmere sweater',
    'evening wear',
    'work essentials'
  ];

  // Load search history from localStorage
  useEffect(() => {
    setMounted(true);
    const savedHistory = localStorage.getItem('parloux-search-history');
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Error loading search history:', error);
      }
    }
  }, []);

  // Save search history to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('parloux-search-history', JSON.stringify(searchHistory));
    }
  }, [searchHistory, mounted]);

  // Generate suggestions based on query
  const suggestions = React.useMemo(() => {
    if (!query || query.length < 2) return [];
    
    const allSuggestions = [
      ...popularSearches,
      ...searchHistory,
      'black dress',
      'navy blazer',
      'silk top',
      'midi skirt',
      'luxury fashion',
      'tailored pieces'
    ];
    
    return allSuggestions
      .filter(suggestion => 
        suggestion.toLowerCase().includes(query.toLowerCase()) && 
        suggestion.toLowerCase() !== query.toLowerCase()
      )
      .slice(0, 5);
  }, [query, searchHistory]);

  // Search function
  const performSearch = useCallback(async (searchQuery?: string, searchFilters?: SearchFilters) => {
    const currentQuery = searchQuery || query;
    const currentFilters = searchFilters || filters;
    
    if (!currentQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Import products dynamically to avoid circular imports
      const { mockProducts } = await import('@/data/mockProducts');
      
      const searchResults: SearchResult[] = [];
      const queryLower = currentQuery.toLowerCase();
      
      mockProducts.forEach(product => {
        let relevanceScore = 0;
        const matchedFields: string[] = [];
        
        // Search in title
        if (product.title.toLowerCase().includes(queryLower)) {
          relevanceScore += 10;
          matchedFields.push('title');
        }
        
        // Search in description
        if (product.description.toLowerCase().includes(queryLower)) {
          relevanceScore += 5;
          matchedFields.push('description');
        }
        
        // Search in category
        if (product.category.toLowerCase().includes(queryLower)) {
          relevanceScore += 8;
          matchedFields.push('category');
        }
        
        // Search in tags
        const matchingTags = product.tags.filter(tag => 
          tag.toLowerCase().includes(queryLower)
        );
        if (matchingTags.length > 0) {
          relevanceScore += matchingTags.length * 3;
          matchedFields.push('tags');
        }
        
        // Apply filters
        let passesFilters = true;
        
        if (currentFilters.category && product.category !== currentFilters.category) {
          passesFilters = false;
        }
        
        if (currentFilters.minPrice !== undefined) {
          const minPrice = Math.min(...product.variants.map(v => v.price));
          if (minPrice < currentFilters.minPrice) {
            passesFilters = false;
          }
        }
        
        if (currentFilters.maxPrice !== undefined) {
          const maxPrice = Math.max(...product.variants.map(v => v.price));
          if (maxPrice > currentFilters.maxPrice) {
            passesFilters = false;
          }
        }
        
        if (currentFilters.size) {
          const hasSize = product.variants.some(v => v.size === currentFilters.size);
          if (!hasSize) {
            passesFilters = false;
          }
        }
        
        if (currentFilters.color) {
          const hasColor = product.variants.some(v => v.color === currentFilters.color);
          if (!hasColor) {
            passesFilters = false;
          }
        }
        
        if (currentFilters.availability === 'in-stock') {
          const hasAvailable = product.variants.some(v => v.available);
          if (!hasAvailable) {
            passesFilters = false;
          }
        }
        
        if (currentFilters.availability === 'out-of-stock') {
          const allOutOfStock = product.variants.every(v => !v.available);
          if (!allOutOfStock) {
            passesFilters = false;
          }
        }
        
        if (relevanceScore > 0 && passesFilters) {
          searchResults.push({
            product,
            relevanceScore,
            matchedFields
          });
        }
      });
      
      // Sort results
      const sortBy = currentFilters.sortBy || 'relevance';
      searchResults.sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return Math.min(...a.product.variants.map(v => v.price)) - 
                   Math.min(...b.product.variants.map(v => v.price));
          case 'price-desc':
            return Math.min(...b.product.variants.map(v => v.price)) - 
                   Math.min(...a.product.variants.map(v => v.price));
          case 'newest':
            return new Date(b.product.createdAt).getTime() - 
                   new Date(a.product.createdAt).getTime();
          case 'popularity':
            // For now, use relevance score as popularity proxy
            return b.relevanceScore - a.relevanceScore;
          default: // relevance
            return b.relevanceScore - a.relevanceScore;
        }
      });
      
      setResults(searchResults);
      
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [query, filters]);

  const addToHistory = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setSearchHistory(prev => {
      const filtered = prev.filter(item => item !== searchQuery);
      return [searchQuery, ...filtered].slice(0, 10); // Keep only last 10 searches
    });
  }, []);

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
  }, []);

  const toggleSearch = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setFilters({});
  }, []);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        filters,
        setFilters,
        results,
        isLoading,
        isOpen,
        toggleSearch,
        closeSearch,
        searchHistory,
        addToHistory,
        clearHistory,
        popularSearches,
        suggestions,
        performSearch,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}


