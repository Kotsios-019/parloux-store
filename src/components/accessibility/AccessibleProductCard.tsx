'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/data/mockProducts';
import { useCart } from '@/contexts/MockCartContext';
import { useWishlist } from '@/contexts/MockWishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { ProductImage } from '@/components/ui/OptimizedImage';
import { AccessibleButton } from '@/components/accessibility/AccessibilityUtils';
import { useScreenReaderAnnouncement } from '@/components/accessibility/AccessibilityUtils';

interface AccessibleProductCardProps {
  product: Product;
  index?: number;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export default function AccessibleProductCard({
  product,
  index = 0,
  onAddToCart,
  onAddToWishlist,
  onQuickView
}: AccessibleProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  
  const { addItem: addToCart } = useCart();
  const { toggleItem: toggleWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const { announce } = useScreenReaderAnnouncement();

  const isInWishlistItem = isInWishlist(product.id);
  const minPrice = Math.min(...product.variants.map(v => v.price));
  const maxPrice = Math.max(...product.variants.map(v => v.price));
  const priceRange = minPrice === maxPrice ? `$${minPrice}` : `$${minPrice} - $${maxPrice}`;

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      announce('Please log in to add items to your cart');
      window.location.href = '/login';
      return;
    }

    setIsAddingToCart(true);
    
    try {
      // Add the first variant as default (in real implementation, user would select)
      const variant = product.variants[0];
      addToCart({
        id: `${product.id}-${variant.id}`,
        product,
        variant,
        quantity: 1,
        size: variant.size || '',
        color: variant.color || ''
      });
      
      announce(`${product.title} added to cart`);
    } catch (error) {
      announce('Failed to add item to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      announce('Please log in to add items to your wishlist');
      window.location.href = '/login';
      return;
    }

    setIsAddingToWishlist(true);
    
    try {
      toggleWishlist(product);
      announce(isInWishlistItem ? `${product.title} removed from wishlist` : `${product.title} added to wishlist`);
    } catch (error) {
      announce('Failed to update wishlist');
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  const handleQuickView = () => {
    if (onQuickView) {
      onQuickView(product);
    } else {
      // Default behavior - navigate to product page
      window.location.href = `/products/${product.handle}`;
    }
    announce(`Opening ${product.title} details`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white dark:bg-deep-black rounded-lg shadow-lg overflow-hidden border border-elegant-base dark:border-elegant-base"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
      aria-labelledby={`product-title-${product.id}`}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Link 
          href={`/products/${product.handle}`}
          className="block focus:outline-none focus:ring-2 focus:ring-soft-gold focus:ring-offset-2"
          aria-label={`View details for ${product.title}`}
        >
          <ProductImage
            src={product.images[0]}
            alt={`${product.title} - ${product.category}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            priority={index < 3}
          />
        </Link>

        {/* Overlay Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/20 flex items-center justify-center space-x-2"
          aria-hidden="true"
        >
          <AccessibleButton
            onClick={handleQuickView}
            ariaLabel={`Quick view ${product.title}`}
            className="bg-white/90 hover:bg-white text-deep-black px-3 py-2 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span className="ml-1 text-sm font-josefin">Quick View</span>
          </AccessibleButton>
        </motion.div>

        {/* Wishlist Button */}
        <div className="absolute top-3 right-3">
          <AccessibleButton
            onClick={handleAddToWishlist}
            isLoading={isAddingToWishlist}
            loadingText="Adding to wishlist..."
            ariaLabel={isInWishlistItem ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isInWishlistItem
                ? 'bg-red-500 text-white'
                : 'bg-white/90 hover:bg-white text-deep-black'
            }`}
          >
            <Heart className={`w-4 h-4 ${isInWishlistItem ? 'fill-current' : ''}`} />
          </AccessibleButton>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="text-xs font-josefin font-semibold text-soft-gold uppercase tracking-wide">
          {product.category}
        </div>

        {/* Title */}
        <h3 
          id={`product-title-${product.id}`}
          className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white line-clamp-2"
        >
          <Link 
            href={`/products/${product.handle}`}
            className="hover:text-soft-gold dark:hover:text-bright-gold transition-colors focus:outline-none focus:ring-2 focus:ring-soft-gold focus:ring-offset-2 rounded"
          >
            {product.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-sm text-font-secondary dark:text-font-secondary-dark line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="text-lg font-josefin font-bold text-deep-black dark:text-ivory-white">
          {priceRange}
        </div>

        {/* Add to Cart Button */}
        <AccessibleButton
          onClick={handleAddToCart}
          isLoading={isAddingToCart}
          loadingText="Adding to cart..."
          ariaLabel={`Add ${product.title} to cart`}
          className="w-full bg-soft-gold text-deep-black hover:bg-bright-gold py-3 px-4 rounded-lg font-josefin font-semibold transition-colors"
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Add to Cart
        </AccessibleButton>
      </div>

      {/* Screen Reader Only - Additional Product Info */}
      <div className="sr-only">
        <p>Product category: {product.category}</p>
        <p>Available in {product.variants.length} variants</p>
        <p>Price range: {priceRange}</p>
        {product.tags && product.tags.length > 0 && (
          <p>Tags: {product.tags.join(', ')}</p>
        )}
      </div>
    </motion.div>
  );
}
