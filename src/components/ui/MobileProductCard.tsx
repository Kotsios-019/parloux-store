'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { ProductImage } from './OptimizedImage';
import { TouchButton } from './MobileTouch';
import WishlistIcon from './WishlistIcon';
import { Product } from '@/data/mockProducts';

interface MobileProductCardProps {
  product: Product;
  index?: number;
  onAddToCart?: (product: Product, variant: any, quantity: number, size?: string, color?: string) => void;
  onAddToWishlist?: (product: Product, variant: any, size?: string, color?: string) => void;
  className?: string;
}

export default function MobileProductCard({
  product,
  index = 0,
  onAddToCart,
  onAddToWishlist,
  className = ''
}: MobileProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, selectedVariant, 1, selectedVariant.size, selectedVariant.color);
    }
  };

  const handleAddToWishlist = () => {
    if (onAddToWishlist) {
      onAddToWishlist(product, selectedVariant, selectedVariant.size, selectedVariant.color);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white dark:bg-deep-black rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <Link href={`/products/${product.handle}`}>
            <ProductImage
              src={product.images[0]?.src || '/images/products/placeholder.svg'}
              alt={product.images[0]?.alt || product.title}
              enableZoom={true}
              priority={index < 4}
            />
          </Link>
          
          {/* Sale Badge */}
          {selectedVariant.compareAtPrice && (
            <div className="absolute top-3 left-3 bg-soft-gold text-deep-black px-2 py-1 rounded-full text-xs font-josefin font-semibold">
              Sale
            </div>
          )}

          {/* Quick Actions */}
          <div className={`absolute top-3 right-3 flex flex-col space-y-2 transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <TouchButton
              onClick={handleAddToWishlist}
              variant="ghost"
              size="sm"
              as="div"
              className="w-10 h-10 rounded-full bg-white/90 dark:bg-deep-black/90 backdrop-blur-sm shadow-lg"
            >
              <WishlistIcon
                product={product}
                variant={selectedVariant}
                className="text-soft-gold hover:text-red-500"
              />
            </TouchButton>
            
            <TouchButton
              onClick={() => window.location.href = `/products/${product.handle}`}
              variant="ghost"
              size="sm"
              className="w-10 h-10 rounded-full bg-white/90 dark:bg-deep-black/90 backdrop-blur-sm shadow-lg"
            >
              <Eye className="w-4 h-4 text-font-primary" />
            </TouchButton>
          </div>

          {/* Mobile Quick Add Button */}
          <div className="absolute bottom-3 left-3 right-3 lg:hidden">
            <TouchButton
              onClick={handleAddToCart}
              className="w-full bg-soft-gold text-deep-black hover:bg-bright-gold transition-colors"
              size="sm"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Quick Add
            </TouchButton>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          <div className="mb-2">
            <span className="text-xs font-josefin text-soft-gold uppercase tracking-wider">
              {product.category}
            </span>
          </div>

          {/* Title */}
          <Link href={`/products/${product.handle}`}>
            <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-2 group-hover:text-soft-gold dark:group-hover:text-bright-gold transition-colors duration-300 line-clamp-2">
              {product.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-sm font-josefin text-font-secondary dark:text-font-secondary-dark mb-3 line-clamp-2">
            {product.description}
          </p>
          
          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-cormorant font-bold text-deep-black dark:text-ivory-white">
                {formatPrice(selectedVariant.price)}
              </span>
              {selectedVariant.compareAtPrice && (
                <span className="text-sm font-josefin text-font-secondary dark:text-font-secondary-dark line-through">
                  {formatPrice(selectedVariant.compareAtPrice)}
                </span>
              )}
            </div>
            
            {/* Variant Selector */}
            {product.variants.length > 1 && (
              <div className="flex space-x-1">
                {product.variants.slice(0, 3).map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                      selectedVariant.id === variant.id
                        ? 'border-soft-gold bg-soft-gold'
                        : 'border-elegant-base dark:border-elegant-base hover:border-soft-gold'
                    }`}
                    style={{
                      backgroundColor: variant.color?.toLowerCase() === 'white' ? '#ffffff' : 
                                     variant.color?.toLowerCase() === 'black' ? '#000000' :
                                     variant.color?.toLowerCase() === 'navy' ? '#1e3a8a' :
                                     variant.color?.toLowerCase() === 'ivory' ? '#f5f5dc' :
                                     variant.color?.toLowerCase() === 'cream' ? '#f5f5dc' :
                                     variant.color?.toLowerCase() === 'burgundy' ? '#800020' :
                                     variant.color?.toLowerCase() === 'forest green' ? '#228b22' :
                                     variant.color?.toLowerCase() === 'charcoal' ? '#36454f' :
                                     '#e5e7eb'
                    }}
                    title={variant.color}
                  />
                ))}
                {product.variants.length > 3 && (
                  <span className="text-xs text-font-secondary dark:text-font-secondary-dark flex items-center">
                    +{product.variants.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Available Sizes */}
          <div className="flex flex-wrap gap-1 mb-3">
            {[...new Set(product.variants.map(v => v.size).filter(Boolean))].slice(0, 4).map((size) => (
              <span
                key={size}
                className="px-2 py-1 text-xs font-josefin bg-elegant-base/20 text-font-secondary dark:text-font-secondary-dark rounded"
              >
                {size}
              </span>
            ))}
            {[...new Set(product.variants.map(v => v.size).filter(Boolean))].length > 4 && (
              <span className="px-2 py-1 text-xs font-josefin text-font-secondary dark:text-font-secondary-dark">
                +{[...new Set(product.variants.map(v => v.size).filter(Boolean))].length - 4}
              </span>
            )}
          </div>

          {/* Desktop Add to Cart Button */}
          <div className="hidden lg:block">
            <TouchButton
              onClick={handleAddToCart}
              className="w-full"
              size="sm"
            >
              Add to Cart
            </TouchButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
