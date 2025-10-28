'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  retryCount: number;
}

export class AsyncErrorBoundary extends Component<Props, State> {
  private retryTimeoutId: NodeJS.Timeout | null = null;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, retryCount: 0 };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, retryCount: 0 };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('AsyncErrorBoundary caught an error:', error, errorInfo);
    
    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to external service in production
    if (process.env.NODE_ENV === 'production') {
      console.error('Production async error:', error, errorInfo);
    }
  }

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: undefined,
      retryCount: prevState.retryCount + 1
    }));
  };

  handleRetryWithDelay = (delay = 1000) => {
    this.retryTimeoutId = setTimeout(() => {
      this.handleRetry();
    }, delay);
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { retryCount } = this.state;
      const maxRetries = 3;
      const canRetry = retryCount < maxRetries;

      return (
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-sm font-josefin font-semibold text-red-800 dark:text-red-200 mb-1">
                Something went wrong
              </h3>
              
              <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                We encountered an error while loading this content. Please try again.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-3">
                  <summary className="cursor-pointer text-xs font-josefin font-semibold text-red-600 dark:text-red-400 mb-1">
                    Error Details (Development)
                  </summary>
                  <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded text-xs font-mono text-red-800 dark:text-red-300">
                    {this.state.error.message}
                  </div>
                </details>
              )}

              <div className="flex space-x-2">
                {canRetry && (
                  <button
                    onClick={this.handleRetry}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 bg-red-600 text-white text-xs font-josefin font-semibold rounded hover:bg-red-700 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Retry ({retryCount + 1}/{maxRetries})</span>
                  </button>
                )}
                
                {!canRetry && (
                  <span className="text-xs text-red-600 dark:text-red-400 font-josefin">
                    Maximum retry attempts reached
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook for handling async errors in functional components
export function useAsyncError() {
  const [, setError] = React.useState();
  
  return React.useCallback((error: Error) => {
    setError(() => {
      throw error;
    });
  }, []);
}

// Higher-order component for async operations
export function withAsyncErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <AsyncErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </AsyncErrorBoundary>
  );

  WrappedComponent.displayName = `withAsyncErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}
