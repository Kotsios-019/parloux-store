'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, RotateCw, Download, Share2, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { ProductImage } from './OptimizedImage';
import { TouchButton } from './MobileTouch';
import { SwipeableCarousel } from './MobileTouch';

interface ProductImage {
  src: string;
  alt: string;
  type?: 'image' | 'video';
  thumbnail?: string;
}

interface ProductGalleryProps {
  images: ProductImage[];
  productTitle: string;
  className?: string;
  enableZoom?: boolean;
  enableFullscreen?: boolean;
  enableThumbnails?: boolean;
  enableVideo?: boolean;
  autoPlay?: boolean;
  showControls?: boolean;
}

export default function ProductGallery({
  images,
  productTitle,
  className = '',
  enableZoom = true,
  enableFullscreen = true,
  enableThumbnails = true,
  enableVideo = true,
  autoPlay = false,
  showControls = true
}: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const galleryRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const currentImage = images[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
        case 'Escape':
          e.preventDefault();
          setIsFullscreen(false);
          break;
        case ' ':
          e.preventDefault();
          if (currentImage?.type === 'video') {
            setIsPlaying(!isPlaying);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, currentImage, isPlaying]);

  // Auto-play for videos
  useEffect(() => {
    if (currentImage?.type === 'video' && isPlaying) {
      const video = imageRef.current?.querySelector('video');
      if (video) {
        video.play();
      }
    }
  }, [currentImage, isPlaying]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    resetZoom();
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    resetZoom();
  }, [images.length]);

  const resetZoom = () => {
    setIsZoomed(false);
    setZoomLevel(1);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleZoom = () => {
    if (!enableZoom) return;
    
    if (isZoomed) {
      setIsZoomed(false);
      setZoomLevel(1);
      setDragOffset({ x: 0, y: 0 });
    } else {
      setIsZoomed(true);
      setZoomLevel(2);
    }
  };

  const handleFullscreen = () => {
    if (!enableFullscreen) return;
    setIsFullscreen(true);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentImage.src;
    link.download = `${productTitle}-${currentIndex + 1}.jpg`;
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productTitle,
          text: `Check out this ${productTitle}`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isZoomed) return;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isZoomed) return;
    
    const rect = imageRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setDragOffset({ x, y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isZoomed) return;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !isZoomed) return;
    
    const touch = e.touches[0];
    const rect = imageRef.current?.getBoundingClientRect();
    if (rect) {
      const x = touch.clientX - rect.left - rect.width / 2;
      const y = touch.clientY - rect.top - rect.height / 2;
      setDragOffset({ x, y });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main Gallery */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-white dark:bg-deep-black shadow-lg">
        {/* Main Image/Video */}
        <div
          ref={imageRef}
          className="relative w-full h-full cursor-pointer"
          onClick={handleZoom}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            className="w-full h-full"
            animate={{
              scale: zoomLevel,
              x: dragOffset.x,
              y: dragOffset.y
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {currentImage?.type === 'video' ? (
              <video
                className="w-full h-full object-cover"
                controls={showControls}
                muted
                loop
                playsInline
                poster={currentImage.thumbnail}
              >
                <source src={currentImage.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <ProductImage
                src={currentImage?.src || '/images/products/placeholder.svg'}
                alt={currentImage?.alt || productTitle}
                enableZoom={false}
                priority={true}
              />
            )}
          </motion.div>

          {/* Video Controls Overlay */}
          {currentImage?.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <TouchButton
                onClick={() => setIsPlaying(!isPlaying)}
                variant="ghost"
                className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Play className="w-8 h-8 text-white" />
                )}
              </TouchButton>
            </div>
          )}

          {/* Zoom Indicator */}
          {isZoomed && (
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
              {Math.round(zoomLevel * 100)}%
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
                <ChevronLeft className="w-5 h-5 text-white" />
              </TouchButton>
              <TouchButton
                onClick={goToNext}
                variant="ghost"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm"
              >
                <ChevronRight className="w-5 h-5 text-white" />
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
                {isZoomed ? (
                  <ZoomOut className="w-5 h-5 text-white" />
                ) : (
                  <ZoomIn className="w-5 h-5 text-white" />
                )}
              </TouchButton>
            )}
            
            {enableFullscreen && (
              <TouchButton
                onClick={handleFullscreen}
                variant="ghost"
                className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm"
              >
                <RotateCw className="w-5 h-5 text-white" />
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
      {enableThumbnails && images.length > 1 && (
        <motion.div
          initial={false}
          animate={{ height: showThumbnails ? 'auto' : 0 }}
          className="mt-4 overflow-hidden"
        >
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
                  src={image.thumbnail || image.src}
                  alt={image.alt}
                  className="w-full h-full"
                  enableZoom={false}
                />
                {image.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                )}
              </TouchButton>
            ))}
          </div>
        </motion.div>
      )}

      {/* Thumbnail Toggle */}
      {images.length > 1 && (
        <TouchButton
          onClick={() => setShowThumbnails(!showThumbnails)}
          variant="secondary"
          size="sm"
          className="mt-2 w-full"
        >
          {showThumbnails ? 'Hide Thumbnails' : 'Show Thumbnails'}
        </TouchButton>
      )}

      {/* Action Bar */}
      <div className="mt-4 flex justify-center space-x-4">
        <TouchButton
          onClick={handleDownload}
          variant="secondary"
          size="sm"
          className="flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Download</span>
        </TouchButton>
        
        <TouchButton
          onClick={handleShare}
          variant="secondary"
          size="sm"
          className="flex items-center space-x-2"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </TouchButton>
      </div>

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
                {currentImage?.type === 'video' ? (
                  <video
                    className="max-h-[80vh] rounded-lg"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src={currentImage.src} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={currentImage?.src || '/images/products/placeholder.svg'}
                    alt={currentImage?.alt || productTitle}
                    className="max-h-[80vh] rounded-lg"
                  />
                )}
              </div>

              {/* Fullscreen Controls */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <TouchButton
                  onClick={() => setIsFullscreen(false)}
                  variant="ghost"
                  className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm"
                >
                  <X className="w-5 h-5 text-white" />
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
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </TouchButton>
                  <TouchButton
                    onClick={goToNext}
                    variant="ghost"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
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
interface MobileProductGalleryProps {
  images: ProductImage[];
  productTitle: string;
  className?: string;
}

export function MobileProductGallery({
  images,
  productTitle,
  className = ''
}: MobileProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

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
                src={image.src}
                alt={image.alt}
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
                      src={image.src}
                      alt={image.alt}
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
                <X className="w-5 h-5 text-white" />
              </TouchButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

