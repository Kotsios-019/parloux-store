'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Share2, Truck, Shield, RotateCcw, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/MockCartContext';
import { useWishlist } from '@/contexts/MockWishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { TouchButton } from './MobileTouch';
import ProductGallery, { MobileProductGallery } from './ProductGallery';
import { Product } from '@/data/mockProducts';
import { LoadingSpinner, LoadingOverlay } from '@/components/loading/LoadingStates';
import { AsyncErrorBoundary } from '@/components/error/AsyncErrorBoundary';
import { ProductBreadcrumb } from '@/components/navigation/BreadcrumbLayout';

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showShippingInfo, setShowShippingInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { addItem: addToCart } = useCart();
  const { toggleItem: toggleWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  // Simulate loading for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Get available sizes and colors
  const availableSizes = [...new Set(product.variants.map(v => v.size).filter(Boolean))];
  const availableColors = [...new Set(product.variants.map(v => v.color).filter(Boolean))];

  // Determine what selections are required
  const requiresSize = availableSizes.length > 1;
  const requiresColor = availableColors.length > 1;
  const canAddToCart = (!requiresSize || selectedSize) && (!requiresColor || selectedColor);

  // Update variant when size or color changes
  useEffect(() => {
    // If there's only one size, auto-select it
    if (availableSizes.length === 1 && !selectedSize) {
      setSelectedSize(availableSizes[0]!);
    }
    
    // If there's only one color, auto-select it
    if (availableColors.length === 1 && !selectedColor) {
      setSelectedColor(availableColors[0]!);
    }
    
    // Find matching variant
    const variant = product.variants.find(v => 
      (!requiresSize || v.size === selectedSize) && 
      (!requiresColor || v.color === selectedColor)
    );
    
    if (variant) {
      setSelectedVariant(variant);
    }
  }, [selectedSize, selectedColor, product.variants, availableSizes, availableColors, requiresSize, requiresColor]);

  console.log('Product data:', {
    title: product.title,
    variants: product.variants,
    availableSizes,
    availableColors,
    selectedSize,
    selectedColor,
    quantity,
    requiresSize,
    requiresColor,
    canAddToCart
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleAddToCart = async () => {
    console.log('Add to cart clicked');
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    // Check if required selections are made
    if (!canAddToCart) {
      const missingSelections = [];
      if (requiresSize && !selectedSize) missingSelections.push('size');
      if (requiresColor && !selectedColor) missingSelections.push('color');
      alert(`Please select ${missingSelections.join(' and ')} before adding to cart`);
      return;
    }

    setIsAddingToCart(true);
    
    try {
      console.log('Adding to cart:', { product: product.title, variant: selectedVariant, quantity, selectedSize, selectedColor });
      addToCart(product, selectedVariant, quantity, selectedSize, selectedColor);
      
      // Show success feedback
      setTimeout(() => {
        setIsAddingToCart(false);
      }, 1000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAddingToCart(false);
    }
  };

  const handleAddToWishlist = async () => {
    console.log('Add to wishlist clicked');
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    setIsAddingToWishlist(true);
    
    try {
      console.log('Toggling wishlist for product:', product.title);
      toggleWishlist(product);
      
      setTimeout(() => {
        setIsAddingToWishlist(false);
      }, 1000);
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      setIsAddingToWishlist(false);
    }
  };

  const handleShare = async () => {
    console.log('Share clicked');
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: `Check out this ${product.title}`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleDownload = () => {
    console.log('Download clicked');
    const link = document.createElement('a');
    link.href = product.images[0]?.src || '/images/products/placeholder.svg';
    link.download = `${product.title}-image.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleQuantityChange = (newQuantity: number) => {
    console.log('Quantity change requested:', newQuantity);
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
      console.log('Quantity updated to:', newQuantity);
    }
  };

  // Prepare gallery images
  const galleryImages = product.images.map(img => ({
    src: img.src,
    alt: img.alt,
    type: 'image' as const
  }));

  const isInWishlistItem = isInWishlist(product.id);

  return (
    <AsyncErrorBoundary>
      <LoadingOverlay isLoading={isLoading} text="Loading product details...">
        <div className="min-h-screen bg-gradient-to-br from-champagne-nude/30 to-elegant-base/30 dark:from-champagne-nude/20 dark:to-elegant-base/20">
          {/* Breadcrumb */}
          <div className="bg-white dark:bg-deep-black border-b border-elegant-base dark:border-elegant-base py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ProductBreadcrumb 
                productTitle={product.title}
                category={product.category}
              />
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <div className="space-y-6">
            {/* Desktop Gallery */}
            <div className="hidden lg:block">
              <ProductGallery
                images={galleryImages}
                productTitle={product.title}
                enableZoom={true}
                enableFullscreen={true}
                enableThumbnails={true}
                showControls={true}
              />
            </div>

            {/* Mobile Gallery */}
            <MobileProductGallery
              images={galleryImages}
              productTitle={product.title}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Product Title */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-2">
                {product.title}
              </h1>
              <p className="text-lg font-josefin text-font-secondary dark:text-font-secondary-dark">
                {product.category}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-cormorant font-bold text-deep-black dark:text-ivory-white">
                {formatPrice(selectedVariant.price)}
              </span>
              {selectedVariant.compareAtPrice && (
                <span className="text-xl font-josefin text-font-secondary dark:text-font-secondary-dark line-through">
                  {formatPrice(selectedVariant.compareAtPrice)}
                </span>
              )}
              {selectedVariant.compareAtPrice && (
                <span className="px-3 py-1 bg-soft-gold text-deep-black text-sm font-josefin font-semibold rounded-full">
                  Sale
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <p className="text-font-primary dark:text-ivory-white font-josefin leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Color Selection */}
            {requiresColor && (
              <div>
                <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-3">
                  Color: {selectedColor || 'Select Color'}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {availableColors.map((color) => (
                    <div
                      key={color}
                      onClick={() => color && setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full border-2 transition-all duration-200 cursor-pointer ${
                        selectedColor === color
                          ? 'border-soft-gold dark:border-bright-gold scale-110'
                          : 'border-elegant-base dark:border-elegant-base hover:border-soft-gold dark:hover:border-bright-gold'
                      }`}
                      style={{
                        backgroundColor: color?.toLowerCase() === 'white' ? '#ffffff' : 
                                       color?.toLowerCase() === 'black' ? '#000000' :
                                       color?.toLowerCase() === 'navy' ? '#1e3a8a' :
                                       color?.toLowerCase() === 'ivory' ? '#f5f5dc' :
                                       color?.toLowerCase() === 'cream' ? '#f5f5dc' :
                                       color?.toLowerCase() === 'burgundy' ? '#800020' :
                                       color?.toLowerCase() === 'forest green' ? '#228b22' :
                                       color?.toLowerCase() === 'charcoal' ? '#36454f' :
                                       '#e5e7eb'
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {requiresSize && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
                    Size: {selectedSize || 'Select Size'}
                  </h3>
                  <TouchButton
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    variant="ghost"
                    size="sm"
                    className="text-soft-gold dark:text-bright-gold"
                  >
                    Size Guide
                  </TouchButton>
                </div>
                
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        console.log('Size clicked:', size);
                        if (size) {
                          setSelectedSize(size);
                          console.log('Size set to:', size);
                        }
                      }}
                      className={`py-3 px-4 border border-elegant-base dark:border-elegant-base rounded-lg transition-all duration-200 ${
                        selectedSize === size
                          ? 'bg-soft-gold text-deep-black border-soft-gold'
                          : 'hover:border-soft-gold dark:hover:border-bright-gold bg-white dark:bg-elegant-base/20'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Size Guide */}
                <AnimatePresence>
                  {showSizeGuide && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-elegant-base/10 dark:bg-elegant-base/20 rounded-lg p-4">
                        <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                          Size Guide
                        </h4>
                        <div className="text-sm text-font-secondary dark:text-font-secondary-dark space-y-1">
                          <p><strong>XS:</strong> Bust 32", Waist 24", Hip 34"</p>
                          <p><strong>S:</strong> Bust 34", Waist 26", Hip 36"</p>
                          <p><strong>M:</strong> Bust 36", Waist 28", Hip 38"</p>
                          <p><strong>L:</strong> Bust 38", Waist 30", Hip 40"</p>
                          <p><strong>XL:</strong> Bust 40", Waist 32", Hip 42"</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-3">
                Quantity
              </h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="w-10 h-10 border border-elegant-base dark:border-elegant-base rounded-lg bg-white dark:bg-elegant-base/20 hover:border-soft-gold dark:hover:border-bright-gold transition-all duration-200 flex items-center justify-center"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-xl font-josefin font-semibold text-deep-black dark:text-ivory-white min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="w-10 h-10 border border-elegant-base dark:border-elegant-base rounded-lg bg-white dark:bg-elegant-base/20 hover:border-soft-gold dark:hover:border-bright-gold transition-all duration-200 flex items-center justify-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={!canAddToCart || isAddingToCart}
                className={`w-full py-4 px-6 rounded-lg font-josefin font-semibold text-lg transition-all duration-200 ${
                  !canAddToCart || isAddingToCart
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-soft-gold text-deep-black hover:bg-bright-gold active:bg-soft-gold/80'
                }`}
              >
                {isAddingToCart ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    <span>Adding to Cart...</span>
                  </div>
                ) : !canAddToCart ? (
                  <div className="flex items-center justify-center space-x-2">
                    <ShoppingBag className="w-5 h-5" />
                    <span>
                      {requiresSize && requiresColor ? 'Select Size & Color' :
                       requiresSize ? 'Select Size' :
                       requiresColor ? 'Select Color' : 'Add to Cart'}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </div>
                )}
              </button>

              {/* Secondary Actions */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToWishlist}
                  disabled={isAddingToWishlist}
                  className={`flex-1 py-3 px-4 border border-elegant-base dark:border-elegant-base rounded-lg transition-all duration-200 ${
                    isAddingToWishlist
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-elegant-base/20 text-font-primary hover:bg-elegant-base/30 active:bg-elegant-base/40'
                  }`}
                >
                  {isAddingToWishlist ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      <span>Adding...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Heart className={`w-4 h-4 ${isInWishlistItem ? 'fill-current text-red-500' : 'text-soft-gold hover:text-red-500'}`} />
                      <span>{isInWishlistItem ? 'In Wishlist' : 'Add to Wishlist'}</span>
                    </div>
                  )}
                </button>

                <button
                  onClick={handleShare}
                  className="flex-1 py-3 px-4 border border-elegant-base dark:border-elegant-base rounded-lg bg-elegant-base/20 text-font-primary hover:bg-elegant-base/30 active:bg-elegant-base/40 transition-all duration-200"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="space-y-4 pt-6 border-t border-elegant-base dark:border-elegant-base">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-soft-gold dark:text-bright-gold" />
                <span className="text-font-primary dark:text-ivory-white font-josefin">
                  Free shipping on orders over $200
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-soft-gold dark:text-bright-gold" />
                <span className="text-font-primary dark:text-ivory-white font-josefin">
                  30-day return policy
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-5 h-5 text-soft-gold dark:text-bright-gold" />
                <span className="text-font-primary dark:text-ivory-white font-josefin">
                  Easy exchanges
                </span>
              </div>
            </div>

            {/* Shipping Info */}
            <div>
              <TouchButton
                onClick={() => setShowShippingInfo(!showShippingInfo)}
                variant="ghost"
                className="text-soft-gold dark:text-bright-gold"
              >
                Shipping & Returns Information
              </TouchButton>
              
              <AnimatePresence>
                {showShippingInfo && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-elegant-base/10 dark:bg-elegant-base/20 rounded-lg p-4 mt-4">
                      <div className="text-sm text-font-secondary dark:text-font-secondary-dark space-y-2">
                        <p><strong>Shipping:</strong> Standard shipping takes 3-5 business days. Express shipping available.</p>
                        <p><strong>Returns:</strong> 30-day return window. Items must be unworn with tags attached.</p>
                        <p><strong>Exchanges:</strong> Free exchanges within 30 days. Contact customer service for assistance.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Download Button */}
            <div className="pt-4">
              <button
                onClick={handleDownload}
                className="w-full py-3 px-4 border border-elegant-base dark:border-elegant-base rounded-lg bg-elegant-base/20 text-font-primary hover:bg-elegant-base/30 active:bg-elegant-base/40 transition-all duration-200"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download Product Image</span>
                </div>
              </button>
            </div>
          </div>
            </div>
          </div>
        </div>
      </LoadingOverlay>
    </AsyncErrorBoundary>
  );
}
