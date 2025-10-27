'use client';

import { useState, useCallback } from 'react';

interface ErrorState {
  hasError: boolean;
  error: Error | null;
  retryCount: number;
}

interface UseErrorHandlerReturn {
  error: ErrorState;
  handleError: (error: Error) => void;
  clearError: () => void;
  retry: (retryFn: () => Promise<void>) => Promise<void>;
  isRetrying: boolean;
}

export function useErrorHandler(maxRetries = 3): UseErrorHandlerReturn {
  const [error, setError] = useState<ErrorState>({
    hasError: false,
    error: null,
    retryCount: 0
  });
  const [isRetrying, setIsRetrying] = useState(false);

  const handleError = useCallback((error: Error) => {
    console.error('Error caught by useErrorHandler:', error);
    
    setError(prev => ({
      hasError: true,
      error,
      retryCount: prev.retryCount
    }));

    // Log to external service in production
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
      console.error('Production error:', error);
    }
  }, []);

  const clearError = useCallback(() => {
    setError({
      hasError: false,
      error: null,
      retryCount: 0
    });
  }, []);

  const retry = useCallback(async (retryFn: () => Promise<void>) => {
    if (error.retryCount >= maxRetries) {
      console.warn('Maximum retry attempts reached');
      return;
    }

    setIsRetrying(true);
    
    try {
      setError(prev => ({
        hasError: false,
        error: null,
        retryCount: prev.retryCount + 1
      }));
      
      await retryFn();
    } catch (err) {
      handleError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsRetrying(false);
    }
  }, [error.retryCount, maxRetries, handleError]);

  return {
    error,
    handleError,
    clearError,
    retry,
    isRetrying
  };
}

// Utility function to create error-safe async functions
export function createErrorSafeAsync<T extends any[], R>(
  asyncFn: (...args: T) => Promise<R>,
  errorHandler?: (error: Error) => void
) {
  return async (...args: T): Promise<R | null> => {
    try {
      return await asyncFn(...args);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      
      if (errorHandler) {
        errorHandler(err);
      } else {
        console.error('Unhandled async error:', err);
      }
      
      return null;
    }
  };
}

// Utility function to wrap API calls with error handling
export function withErrorHandling<T extends any[], R>(
  apiCall: (...args: T) => Promise<R>,
  options: {
    onError?: (error: Error) => void;
    onSuccess?: (result: R) => void;
    onFinally?: () => void;
  } = {}
) {
  return async (...args: T): Promise<R | null> => {
    try {
      const result = await apiCall(...args);
      options.onSuccess?.(result);
      return result;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      options.onError?.(err);
      return null;
    } finally {
      options.onFinally?.();
    }
  };
}

// Error types for better error handling
export enum ErrorType {
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  SERVER_ERROR = 'SERVER_ERROR',
  UNKNOWN = 'UNKNOWN'
}

export function getErrorType(error: Error): ErrorType {
  const message = error.message.toLowerCase();
  
  if (message.includes('fetch') || message.includes('network')) {
    return ErrorType.NETWORK;
  }
  if (message.includes('validation') || message.includes('invalid')) {
    return ErrorType.VALIDATION;
  }
  if (message.includes('unauthorized') || message.includes('401')) {
    return ErrorType.AUTHENTICATION;
  }
  if (message.includes('forbidden') || message.includes('403')) {
    return ErrorType.AUTHORIZATION;
  }
  if (message.includes('not found') || message.includes('404')) {
    return ErrorType.NOT_FOUND;
  }
  if (message.includes('server error') || message.includes('500')) {
    return ErrorType.SERVER_ERROR;
  }
  
  return ErrorType.UNKNOWN;
}

export function getErrorMessage(error: Error): string {
  const errorType = getErrorType(error);
  
  switch (errorType) {
    case ErrorType.NETWORK:
      return 'Unable to connect to the server. Please check your internet connection.';
    case ErrorType.VALIDATION:
      return 'Please check your input and try again.';
    case ErrorType.AUTHENTICATION:
      return 'Please log in to continue.';
    case ErrorType.AUTHORIZATION:
      return 'You do not have permission to perform this action.';
    case ErrorType.NOT_FOUND:
      return 'The requested resource was not found.';
    case ErrorType.SERVER_ERROR:
      return 'Server error. Please try again later.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
}
