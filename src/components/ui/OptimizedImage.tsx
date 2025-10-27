'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
  fallbackComponent?: React.ReactNode;
  enableZoom?: boolean;
  enableLazyLoad?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  priority = false,
  quality = 85,
  placeholder = 'blur',
  blurDataURL,
  sizes,
  onLoad,
  onError,
  fallbackComponent,
  enableZoom = false,
  enableLazyLoad = true,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!enableLazyLoad || priority);
  const [showZoom, setShowZoom] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!enableLazyLoad || priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [enableLazyLoad, priority]);

  // Generate blur data URL if not provided
  const generateBlurDataURL = (w: number, h: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, '#f3f0e8');
      gradient.addColorStop(0.5, '#e8e0d0');
      gradient.addColorStop(1, '#d4af7e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    }
    return canvas.toDataURL();
  };

  const defaultBlurDataURL = blurDataURL || generateBlurDataURL(400, 300);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const handleZoom = () => {
    if (enableZoom) {
      setShowZoom(true);
    }
  };

  if (hasError && fallbackComponent) {
    return <>{fallbackComponent}</>;
  }

  if (hasError) {
    return (
      <div 
        className={`${className} bg-gradient-to-br from-elegant-base/20 to-champagne-nude/30 flex items-center justify-center`}
        style={fill ? { width: '100%', height: '100%' } : { width, height }}
      >
        <div className="text-center p-4">
          <div className="w-16 h-16 bg-soft-gold rounded-full mx-auto mb-2 flex items-center justify-center">
            <span className="text-deep-black font-cormorant text-xl">?</span>
          </div>
          <p className="text-font-secondary font-josefin text-sm">Image unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {/* Blur placeholder */}
      <AnimatePresence>
        {!isLoaded && isInView && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-10"
          >
            <Image
              src={defaultBlurDataURL}
              alt=""
              fill={fill}
              width={!fill ? width : undefined}
              height={!fill ? height : undefined}
              className="object-cover filter blur-sm"
              priority={priority}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main image */}
      {isInView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <Image
            src={src}
            alt={alt}
            width={!fill ? width : undefined}
            height={!fill ? height : undefined}
            fill={fill}
            className={`object-cover transition-all duration-500 ${
              enableZoom ? 'cursor-zoom-in hover:scale-105' : ''
            }`}
            quality={quality}
            priority={priority}
            placeholder={placeholder}
            blurDataURL={defaultBlurDataURL}
            sizes={sizes}
            onLoad={handleLoad}
            onError={handleError}
            onClick={handleZoom}
          />
        </motion.div>
      )}

      {/* Loading skeleton */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 bg-gradient-to-r from-elegant-base/20 via-elegant-base/10 to-elegant-base/20 animate-pulse" />
      )}

      {/* Zoom modal */}
      <AnimatePresence>
        {showZoom && enableZoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setShowZoom(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={src}
                alt={alt}
                width={800}
                height={600}
                className="object-contain max-h-[80vh] rounded-lg"
                quality={95}
              />
              <button
                onClick={() => setShowZoom(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Pre-built optimized image components for common use cases
export function ProductImage({ 
  src, 
  alt, 
  className = '', 
  enableZoom = true,
  priority = false 
}: { 
  src: string; 
  alt: string; 
  className?: string;
  enableZoom?: boolean;
  priority?: boolean;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fill
      className={`${className} group-hover:scale-110 transition-transform duration-500`}
      priority={priority}
      enableZoom={enableZoom}
      enableLazyLoad={true}
      quality={90}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}

export function CollectionImage({ 
  src, 
  alt, 
  className = '' 
}: { 
  src: string; 
  alt: string; 
  className?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fill
      className={`${className} group-hover:scale-110 transition-transform duration-500`}
      priority={false}
      enableZoom={false}
      enableLazyLoad={true}
      quality={85}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}

export function HeroImage({ 
  src, 
  alt, 
  className = '' 
}: { 
  src: string; 
  alt: string; 
  className?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fill
      className={className}
      priority={true}
      enableZoom={false}
      enableLazyLoad={false}
      quality={95}
      sizes="100vw"
    />
  );
}

