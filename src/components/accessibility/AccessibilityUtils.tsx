'use client';

import React, { useEffect, useRef, useState } from 'react';

// Hook for managing focus
export function useFocusManagement() {
  const focusRef = useRef<HTMLElement>(null);

  const focusElement = () => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  };

  const trapFocus = (containerRef: React.RefObject<HTMLElement | null>) => {
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement?.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement?.focus();
              e.preventDefault();
            }
          }
        }
      };

      container.addEventListener('keydown', handleKeyDown);
      firstElement?.focus();

      return () => {
        container.removeEventListener('keydown', handleKeyDown);
      };
    }, [containerRef]);
  };

  return { focusRef, focusElement, trapFocus };
}

// Hook for screen reader announcements
export function useScreenReaderAnnouncement() {
  const [announcement, setAnnouncement] = useState<string>('');

  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    setAnnouncement(message);
    
    // Clear announcement after a short delay
    setTimeout(() => {
      setAnnouncement('');
    }, 1000);
  };

  return { announcement, announce };
}

// Hook for keyboard navigation
export function useKeyboardNavigation() {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsKeyboardUser(true);
        document.body.classList.add('keyboard-user');
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardUser(false);
      document.body.classList.remove('keyboard-user');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return { isKeyboardUser };
}

// Hook for skip links
export function useSkipLinks() {
  const skipLinks = [
    { href: '#main-content', text: 'Skip to main content' },
    { href: '#navigation', text: 'Skip to navigation' },
    { href: '#search', text: 'Skip to search' },
    { href: '#footer', text: 'Skip to footer' }
  ];

  return { skipLinks };
}

// Utility functions for accessibility
export const a11yUtils = {
  // Generate unique IDs for ARIA relationships
  generateId: (prefix: string = 'a11y') => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  },

  // Get ARIA label for form validation
  getValidationAriaLabel: (isValid: boolean, errorMessage?: string) => {
    if (isValid) {
      return { 'aria-invalid': false };
    }
    return {
      'aria-invalid': true,
      'aria-describedby': errorMessage ? 'error-message' : undefined
    };
  },

  // Get ARIA label for loading states
  getLoadingAriaLabel: (isLoading: boolean, loadingText: string = 'Loading') => {
    return {
      'aria-live': 'polite',
      'aria-label': isLoading ? loadingText : undefined
    };
  },

  // Get ARIA label for expandable content
  getExpandableAriaLabel: (isExpanded: boolean, label: string) => {
    return {
      'aria-expanded': isExpanded,
      'aria-label': `${label}${isExpanded ? ', expanded' : ', collapsed'}`
    };
  },

  // Get ARIA label for buttons with loading states
  getButtonAriaLabel: (isLoading: boolean, defaultLabel: string, loadingLabel: string = 'Loading') => {
    return {
      'aria-label': isLoading ? loadingLabel : defaultLabel,
      'aria-disabled': isLoading
    };
  }
};

// Screen reader only text component
export function ScreenReaderOnly({ children }: { children: React.ReactNode }) {
  return (
    <span className="sr-only">
      {children}
    </span>
  );
}

// Skip links component
export function SkipLinks() {
  const { skipLinks } = useSkipLinks();

  return (
    <div className="sr-only focus-within:not-sr-only">
      {skipLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="absolute top-0 left-0 z-50 bg-soft-gold text-deep-black px-4 py-2 font-josefin font-semibold focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-bright-gold"
        >
          {link.text}
        </a>
      ))}
    </div>
  );
}

// Screen reader announcement component
export function ScreenReaderAnnouncement({ announcement }: { announcement: string }) {
  return (
    <div
      className="sr-only"
      aria-live="polite"
      aria-atomic="true"
    >
      {announcement}
    </div>
  );
}

// Focus trap component
export function FocusTrap({ children, isActive }: { children: React.ReactNode; isActive: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { trapFocus } = useFocusManagement();

  useEffect(() => {
    if (isActive) {
      trapFocus(containerRef);
    }
  }, [isActive, trapFocus]);

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
}

// Accessible button component
export function AccessibleButton({
  children,
  onClick,
  disabled = false,
  isLoading = false,
  loadingText = 'Loading...',
  ariaLabel,
  ariaDescribedBy,
  className = '',
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  className?: string;
  [key: string]: any;
}) {
  const buttonProps = {
    onClick,
    disabled: disabled || isLoading,
    className: `focus:outline-none focus:ring-2 focus:ring-soft-gold focus:ring-offset-2 ${className}`,
    'aria-label': ariaLabel || (isLoading ? loadingText : undefined),
    'aria-describedby': ariaDescribedBy,
    ...props
  };

  return (
    <button {...buttonProps}>
      {isLoading ? (
        <>
          <span className="sr-only">{loadingText}</span>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            <span>{loadingText}</span>
          </div>
        </>
      ) : (
        children
      )}
    </button>
  );
}

// Accessible input component
export function AccessibleInput({
  label,
  error,
  required = false,
  className = '',
  ...props
}: {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  [key: string]: any;
}) {
  const id = a11yUtils.generateId('input');
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-josefin font-semibold text-font-primary dark:text-ivory-white"
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
      
      <input
        id={id}
        className={`w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent ${
          error
            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
            : 'border-elegant-base dark:border-elegant-base bg-white dark:bg-deep-black'
        } ${className}`}
        aria-invalid={!!error}
        aria-describedby={errorId}
        required={required}
        {...props}
      />
      
      {error && (
        <div
          id={errorId}
          className="text-sm text-red-600 dark:text-red-400"
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}
    </div>
  );
}

// Accessible modal component
export function AccessibleModal({
  isOpen,
  onClose,
  title,
  children,
  className = ''
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { trapFocus } = useFocusManagement();

  useEffect(() => {
    if (isOpen) {
      trapFocus(modalRef);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, trapFocus]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className={`bg-white dark:bg-deep-black rounded-lg shadow-lg max-w-md w-full mx-4 ${className}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-elegant-base dark:border-elegant-base">
          <h2 id="modal-title" className="text-xl font-cormorant font-bold text-deep-black dark:text-ivory-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-font-secondary dark:text-font-secondary-dark hover:text-font-primary dark:hover:text-ivory-white focus:outline-none focus:ring-2 focus:ring-soft-gold rounded"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
