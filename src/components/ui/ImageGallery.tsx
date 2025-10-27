'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductImage } from './OptimizedImage';
import { TouchButton } from './MobileTouch';
import { SwipeableCarousel } from './MobileTouch';

interface ImageGalleryProps {
  images: string[];
  alt: string;
  className?: string;
  enableZoom?: boolean;
  enableFullscreen?: boolean;
  showThumbnails?: boolean;
  autoPlay?: boolean;
}

export default function ImageGallery({
  images,
  alt,
  className = '',
  enableZoom = true,
  enableFullscreen = true,
  showThumbnails = true,
  autoPlay = false
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
  };

  const handleZoom = () => {
    if (!enableZoom) return;
    setIsZoomed(!isZoomed);
  };

  const handleFullscreen = () => {
    if (!enableFullscreen) return;
    setIsFullscreen(true);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main Gallery */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-white dark:bg-deep-black shadow-lg">
        {/* Main Image */}
        <div
          className="relative w-full h-full cursor-pointer"
          onClick={handleZoom}
        >
          <motion.div
            className="w-full h-full"
            animate={{
              scale: isZoomed ? 2 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <ProductImage
              src={images[currentIndex]}
              alt={alt}
              enableZoom={false}
              priority={true}
            />
          </motion.div>

          {/* Zoom Indicator */}
          {isZoomed && (
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
              200%
            </div>
          )}

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <TouchButton
                onClick={goToPrevious}
                variant="ghost"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </TouchButton>
              <TouchButton
                onClick={goToNext}
                variant="ghost"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </TouchButton>
            </>
          )}

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            {enableZoom && (
              <TouchButton
                onClick={handleZoom}
                variant="ghost"
                className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </TouchButton>
            )}
            
            {enableFullscreen && (
              <TouchButton
                onClick={handleFullscreen}
                variant="ghost"
                className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </TouchButton>
            )}
          </div>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnails */}
      {showThumbnails && images.length > 1 && (
        <div className="mt-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <TouchButton
                key={index}
                onClick={() => setCurrentIndex(index)}
                variant="ghost"
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  index === currentIndex
                    ? 'border-soft-gold dark:border-bright-gold'
                    : 'border-elegant-base dark:border-elegant-base hover:border-soft-gold dark:hover:border-bright-gold'
                }`}
              >
                <ProductImage
                  src={image}
                  alt={alt}
                  className="w-full h-full"
                  enableZoom={false}
                />
              </TouchButton>
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-6xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fullscreen Image */}
              <div className="relative">
                <img
                  src={images[currentIndex]}
                  alt={alt}
                  className="max-h-[80vh] rounded-lg"
                />
              </div>

              {/* Fullscreen Controls */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <TouchButton
                  onClick={() => setIsFullscreen(false)}
                  variant="ghost"
                  className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </TouchButton>
              </div>

              {/* Fullscreen Navigation */}
              {images.length > 1 && (
                <>
                  <TouchButton
                    onClick={goToPrevious}
                    variant="ghost"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </TouchButton>
                  <TouchButton
                    onClick={goToNext}
                    variant="ghost"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </TouchButton>
                </>
              )}

              {/* Fullscreen Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-lg">
                  {currentIndex + 1} / {images.length}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Mobile-optimized gallery component
interface MobileImageGalleryProps {
  images: string[];
  alt: string;
  className?: string;
}

export function MobileImageGallery({
  images,
  alt,
  className = ''
}: MobileImageGalleryProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className={`lg:hidden ${className}`}>
      <SwipeableCarousel
        showDots={true}
        autoPlay={false}
        className="w-full"
      >
        {images.map((image, index) => (
          <div key={index} className="relative aspect-square">
            <TouchButton
              onClick={() => setIsFullscreen(true)}
              className="w-full h-full"
            >
              <ProductImage
                src={image}
                alt={alt}
                enableZoom={false}
                priority={index < 2}
              />
            </TouchButton>
          </div>
        ))}
      </SwipeableCarousel>

      {/* Mobile Fullscreen */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <SwipeableCarousel
                showDots={true}
                autoPlay={false}
                className="w-full h-full"
              >
                {images.map((image, index) => (
                  <div key={index} className="w-full h-full flex items-center justify-center">
                    <img
                      src={image}
                      alt={alt}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ))}
              </SwipeableCarousel>

              <TouchButton
                onClick={() => setIsFullscreen(false)}
                variant="ghost"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </TouchButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

