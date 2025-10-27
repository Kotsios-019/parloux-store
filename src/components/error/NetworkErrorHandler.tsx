'use client';

import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NetworkStatusProps {
  children: React.ReactNode;
}

export function NetworkStatusProvider({ children }: NetworkStatusProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
    };

    // Check initial status
    setIsOnline(navigator.onLine);

    // Listen for online/offline events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <>
      {children}
      
      <AnimatePresence>
        {showOfflineMessage && !isOnline && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white px-4 py-3 shadow-lg"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <WifiOff className="w-5 h-5" />
                <span className="font-josefin font-semibold">
                  You're offline. Some features may not work properly.
                </span>
              </div>
              
              <button
                onClick={() => setShowOfflineMessage(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface ApiErrorProps {
  error: Error | null;
  onRetry?: () => void;
  className?: string;
}

export function ApiError({ error, onRetry, className = '' }: ApiErrorProps) {
  if (!error) return null;

  const getErrorMessage = (error: Error) => {
    if (error.message.includes('fetch')) {
      return 'Unable to connect to the server. Please check your internet connection.';
    }
    if (error.message.includes('404')) {
      return 'The requested resource was not found.';
    }
    if (error.message.includes('500')) {
      return 'Server error. Please try again later.';
    }
    if (error.message.includes('timeout')) {
      return 'Request timed out. Please try again.';
    }
    return 'An unexpected error occurred. Please try again.';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4 ${className}`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-sm font-josefin font-semibold text-red-800 dark:text-red-200 mb-1">
            Error Loading Content
          </h3>
          
          <p className="text-sm text-red-700 dark:text-red-300 mb-3">
            {getErrorMessage(error)}
          </p>

          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center space-x-1 px-3 py-1.5 bg-red-600 text-white text-xs font-josefin font-semibold rounded hover:bg-red-700 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Try Again</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Hook for handling API errors
export function useApiError() {
  const [error, setError] = useState<Error | null>(null);

  const handleError = (error: Error) => {
    console.error('API Error:', error);
    setError(error);
  };

  const clearError = () => {
    setError(null);
  };

  const retry = (retryFn: () => Promise<void>) => {
    clearError();
    retryFn().catch(handleError);
  };

  return {
    error,
    handleError,
    clearError,
    retry
  };
}

// Higher-order component for API error handling
export function withApiErrorHandling<P extends object>(
  Component: React.ComponentType<P>,
  retryFn?: () => Promise<void>
) {
  const WrappedComponent = (props: P) => {
    const { error, retry } = useApiError();

    if (error) {
      return (
        <ApiError 
          error={error} 
          onRetry={retryFn ? () => retry(retryFn) : undefined}
        />
      );
    }

    return <Component {...props} />;
  };

  WrappedComponent.displayName = `withApiErrorHandling(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}
