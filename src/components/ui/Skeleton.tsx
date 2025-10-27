'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  animation?: 'pulse' | 'wave';
  width?: string | number;
  height?: string | number;
}

export default function Skeleton({ 
  className = '', 
  variant = 'rectangular', 
  animation = 'pulse',
  width,
  height 
}: SkeletonProps) {
  const baseClasses = 'bg-gradient-to-r from-elegant-base/20 via-elegant-base/10 to-elegant-base/20';
  
  const variantClasses = {
    text: 'h-4 rounded',
    rectangular: 'rounded-lg',
    circular: 'rounded-full'
  };

  const animationVariants = {
    pulse: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut" as const,
      }
    },
    wave: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut" as const,
      }
    }
  };

  const style = {
    width: width || '100%',
    height: height || '100%',
    ...(animation === 'wave' && {
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      backgroundSize: '200% 100%'
    })
  };

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      variants={animationVariants}
      animate={animation}
    />
  );
}

// Pre-built skeleton components
export function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-deep-black rounded-2xl overflow-hidden shadow-lg">
      {/* Image skeleton */}
      <Skeleton className="h-80 w-full" />
      
      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Title skeleton */}
        <Skeleton className="h-6 w-3/4" />
        
        {/* Description skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        
        {/* Price skeleton */}
        <Skeleton className="h-6 w-1/3" />
        
        {/* Sizes skeleton */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-8" />
          <Skeleton className="h-6 w-8" />
          <Skeleton className="h-6 w-8" />
        </div>
      </div>
    </div>
  );
}

export function CollectionCardSkeleton() {
  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-deep-black shadow-lg">
        {/* Collection image skeleton */}
        <Skeleton className="h-80 w-full" />
        
        {/* Collection info skeleton */}
        <div className="p-6 space-y-4">
          <Skeleton className="h-8 w-2/3" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </div>
  );
}

export function CartItemSkeleton() {
  return (
    <div className="flex items-center space-x-4 p-4">
      {/* Product image skeleton */}
      <Skeleton className="h-16 w-16 rounded-lg" variant="rectangular" />
      
      {/* Product info skeleton */}
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      
      {/* Quantity skeleton */}
      <Skeleton className="h-8 w-16" />
      
      {/* Price skeleton */}
      <Skeleton className="h-4 w-16" />
    </div>
  );
}

export function SearchResultSkeleton() {
  return (
    <div className="flex items-center space-x-4 p-4 border-b border-elegant-base/20">
      {/* Product image skeleton */}
      <Skeleton className="h-20 w-20 rounded-lg" variant="rectangular" />
      
      {/* Product info skeleton */}
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      
      {/* Price skeleton */}
      <Skeleton className="h-5 w-20" />
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-champagne-nude/30 to-elegant-base/30 dark:from-champagne-nude/20 dark:to-elegant-base/20">
      {/* Header skeleton */}
      <div className="h-20 bg-white dark:bg-deep-black border-b border-elegant-base/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-8 rounded-full" variant="circular" />
            <Skeleton className="h-8 w-8 rounded-full" variant="circular" />
            <Skeleton className="h-8 w-8 rounded-full" variant="circular" />
          </div>
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

