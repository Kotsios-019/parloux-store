'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, PanInfo } from 'framer-motion';

// Touch-friendly button with haptic feedback
interface TouchButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  haptic?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  as?: 'button' | 'div';
}

export function TouchButton({ 
  children, 
  onClick, 
  className = '', 
  disabled = false,
  haptic = true,
  variant = 'primary',
  size = 'md',
  as = 'button'
}: TouchButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleTouchStart = () => {
    if (disabled) return;
    setIsPressed(true);
    
    if (haptic && 'vibrate' in navigator) {
      navigator.vibrate(10); // Light haptic feedback
    }
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
  };

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };

  const baseClasses = 'relative overflow-hidden transition-all duration-200 active:scale-95';
  const variantClasses = {
    primary: 'bg-soft-gold text-deep-black hover:bg-bright-gold active:bg-soft-gold/80',
    secondary: 'bg-elegant-base/20 text-font-primary hover:bg-elegant-base/30 active:bg-elegant-base/40',
    ghost: 'text-font-primary hover:bg-elegant-base/10 active:bg-elegant-base/20'
  };
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[44px]', // Minimum 44px for touch
    md: 'px-4 py-3 text-base min-h-[48px]',
    lg: 'px-6 py-4 text-lg min-h-[52px]'
  };

  const Component = as === 'div' ? motion.div : motion.button;

  return (
    <Component
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
      onClick={handleClick}
      disabled={as === 'button' ? disabled : undefined}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      role={as === 'div' ? 'button' : undefined}
      tabIndex={as === 'div' ? 0 : undefined}
    >
      {children}
      {isPressed && (
        <motion.div
          className="absolute inset-0 bg-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </Component>
  );
}

// Swipeable carousel for mobile
interface SwipeableCarouselProps {
  children: React.ReactNode[];
  className?: string;
  showDots?: boolean;
  autoPlay?: boolean;
  interval?: number;
}

export function SwipeableCarousel({ 
  children, 
  className = '', 
  showDots = true,
  autoPlay = false,
  interval = 5000
}: SwipeableCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, children.length - 1)));
  };

  const nextSlide = () => {
    goToSlide(currentIndex + 1);
  };

  const prevSlide = () => {
    goToSlide(currentIndex - 1);
  };

  const handleDragStart = (event: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    setDragStart(clientX);
    setDragOffset(0);
  };

  const handleDragMove = (event: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const offset = clientX - dragStart;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const threshold = 50;
    
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
    
    setDragOffset(0);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isDragging) return;
    
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, isDragging, currentIndex]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={containerRef}
        className="overflow-hidden"
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <motion.div
          className="flex"
          animate={{
            x: -(currentIndex * 100) + (dragOffset / (containerRef.current?.offsetWidth || 1)) * 100
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {children.map((child, index) => (
            <div key={index} className="w-full flex-shrink-0">
              {child}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dots indicator */}
      {showDots && children.length > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-soft-gold w-6' 
                  : 'bg-elegant-base/30'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Mobile-optimized drawer
interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function MobileDrawer({ 
  isOpen, 
  onClose, 
  children, 
  title,
  className = '' 
}: MobileDrawerProps) {
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (event: React.TouchEvent) => {
    setIsDragging(true);
    setDragY(event.touches[0].clientY);
  };

  const handleDragMove = (event: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentY = event.touches[0].clientY;
    const deltaY = currentY - dragY;
    
    if (deltaY > 0) {
      setDragY(currentY);
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const threshold = 100;
    
    if (dragY > threshold) {
      onClose();
    }
    
    setDragY(0);
  };

  return (
    <motion.div
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      variants={{
        open: { opacity: 1, pointerEvents: 'auto' },
        closed: { opacity: 0, pointerEvents: 'none' }
      }}
      className="fixed inset-0 z-50"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
      />
      
      {/* Drawer */}
      <motion.div
        ref={drawerRef}
        className={`absolute bottom-0 left-0 right-0 bg-white dark:bg-deep-black rounded-t-2xl shadow-2xl ${className}`}
        variants={{
          open: { y: 0 },
          closed: { y: '100%' }
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-elegant-base/30 rounded-full" />
        </div>
        
        {/* Header */}
        {title && (
          <div className="px-6 py-4 border-b border-elegant-base/20">
            <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
              {title}
            </h3>
          </div>
        )}
        
        {/* Content */}
        <div className="max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Mobile-optimized input
interface MobileInputProps {
  type?: 'text' | 'email' | 'tel' | 'password';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  error?: string;
  label?: string;
  required?: boolean;
}

export function MobileInput({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  error,
  label,
  required = false
}: MobileInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    setIsFocused(true);
    // Scroll input into view on mobile
    setTimeout(() => {
      inputRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }, 300);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-josefin font-medium text-font-primary dark:text-ivory-white">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full px-4 py-3 text-base bg-white dark:bg-deep-black border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-soft-gold dark:focus:ring-bright-gold ${
            error 
              ? 'border-red-500 focus:border-red-500' 
              : isFocused 
                ? 'border-soft-gold dark:border-bright-gold' 
                : 'border-elegant-base dark:border-elegant-base'
          }`}
          style={{ minHeight: '48px' }} // Minimum touch target
        />
      </div>
      
      {error && (
        <p className="text-sm text-red-500 font-josefin">{error}</p>
      )}
    </div>
  );
}

// Mobile-optimized grid that adapts to screen size
interface MobileGridProps {
  children: React.ReactNode[];
  className?: string;
  minItemWidth?: string;
  gap?: string;
}

export function MobileGrid({ 
  children, 
  className = '',
  minItemWidth = '280px',
  gap = '1rem'
}: MobileGridProps) {
  return (
    <div
      className={`grid ${className}`}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`,
        gap
      }}
    >
      {children}
    </div>
  );
}

// Touch-friendly checkbox
interface TouchCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export function TouchCheckbox({
  checked,
  onChange,
  label,
  className = '',
  disabled = false
}: TouchCheckboxProps) {
  return (
    <label className={`flex items-center space-x-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div className={`w-6 h-6 border-2 rounded transition-all duration-200 ${
          checked 
            ? 'bg-soft-gold border-soft-gold' 
            : 'border-elegant-base dark:border-elegant-base'
        }`}>
          {checked && (
            <motion.svg
              className="w-4 h-4 text-deep-black absolute top-0.5 left-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </motion.svg>
          )}
        </div>
      </div>
      {label && (
        <span className="text-font-primary dark:text-ivory-white font-josefin">
          {label}
        </span>
      )}
    </label>
  );
}
