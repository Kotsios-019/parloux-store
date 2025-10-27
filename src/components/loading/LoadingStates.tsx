'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export function LoadingSpinner({ size = 'md', className = '', text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Loader2 className={`${sizeClasses[size]} text-soft-gold`} />
      </motion.div>
      {text && (
        <span className="text-font-primary dark:text-ivory-white font-josefin">
          {text}
        </span>
      )}
    </div>
  );
}

interface LoadingOverlayProps {
  isLoading: boolean;
  text?: string;
  children: React.ReactNode;
}

export function LoadingOverlay({ isLoading, text = 'Loading...', children }: LoadingOverlayProps) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-white/80 dark:bg-deep-black/80 backdrop-blur-sm flex items-center justify-center z-10"
        >
          <div className="bg-white dark:bg-deep-black rounded-lg shadow-lg p-6 text-center">
            <LoadingSpinner size="lg" text={text} />
          </div>
        </motion.div>
      )}
    </div>
  );
}

interface LoadingPageProps {
  text?: string;
  subtitle?: string;
}

export function LoadingPage({ text = 'Loading...', subtitle }: LoadingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-champagne-nude/30 to-elegant-base/30 dark:from-champagne-nude/20 dark:to-elegant-base/20 flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 mx-auto mb-6"
        >
          <div className="w-full h-full border-4 border-elegant-base/20 border-t-soft-gold rounded-full"></div>
        </motion.div>
        
        <h2 className="text-2xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-2">
          {text}
        </h2>
        
        {subtitle && (
          <p className="text-font-secondary dark:text-font-secondary-dark">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

interface LoadingCardProps {
  className?: string;
}

export function LoadingCard({ className = '' }: LoadingCardProps) {
  return (
    <div className={`bg-white dark:bg-deep-black rounded-lg border border-elegant-base dark:border-elegant-base p-6 ${className}`}>
      <div className="animate-pulse">
        {/* Image skeleton */}
        <div className="w-full h-48 bg-elegant-base/20 rounded-lg mb-4"></div>
        
        {/* Title skeleton */}
        <div className="h-6 bg-elegant-base/20 rounded mb-3"></div>
        
        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-elegant-base/20 rounded w-full"></div>
          <div className="h-4 bg-elegant-base/20 rounded w-3/4"></div>
        </div>
        
        {/* Price skeleton */}
        <div className="h-5 bg-elegant-base/20 rounded w-1/3 mb-4"></div>
        
        {/* Button skeleton */}
        <div className="h-10 bg-elegant-base/20 rounded"></div>
      </div>
    </div>
  );
}

interface LoadingGridProps {
  count?: number;
  className?: string;
}

export function LoadingGrid({ count = 6, className = '' }: LoadingGridProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <LoadingCard key={index} />
      ))}
    </div>
  );
}

// Hook for managing loading states
export function useLoadingState(initialState = false) {
  const [isLoading, setIsLoading] = React.useState(initialState);
  
  const startLoading = React.useCallback(() => setIsLoading(true), []);
  const stopLoading = React.useCallback(() => setIsLoading(false), []);
  const toggleLoading = React.useCallback(() => setIsLoading(prev => !prev), []);
  
  return {
    isLoading,
    startLoading,
    stopLoading,
    toggleLoading,
    setIsLoading
  };
}
