'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useSearch } from '@/contexts/SearchContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { createPortal } from 'react-dom';
import SearchAutocomplete from '@/components/ui/SearchAutocomplete';

export default function SearchModal() {
  const {
    query,
    setQuery,
    isOpen,
    closeSearch,
    suggestions,
    searchHistory,
    popularSearches,
    performSearch,
    addToHistory,
    isLoading
  } = useSearch();
  
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setQuery(searchQuery);
    addToHistory(searchQuery);
    performSearch(searchQuery);
    closeSearch();
    
    // Navigate to search results page
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(inputValue);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSearch(suggestion);
  };

  if (!mounted) return null;

  const searchContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[9999]"
            onClick={closeSearch}
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-4 bg-ivory-white dark:bg-deep-black border border-elegant-base dark:border-elegant-base rounded-2xl shadow-2xl z-[9999]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="p-6 border-b border-elegant-base dark:border-elegant-base">
              <div className="relative">
                <SearchAutocomplete
                  onClose={closeSearch}
                  className="w-full"
                />
                <button
                  onClick={closeSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-font-secondary dark:text-font-secondary-dark hover:text-soft-gold dark:hover:text-bright-gold transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Search Content - Handled by SearchAutocomplete */}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(searchContent, document.body);
}
