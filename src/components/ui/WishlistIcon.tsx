'use client';

import { Heart, LogIn } from 'lucide-react';
import { useWishlist } from '@/contexts/MockWishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { Product, ProductVariant } from '@/data/mockProducts';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface WishlistIconProps {
  product: Product;
  variant: ProductVariant;
  size?: string;
  color?: string;
  className?: string;
  showText?: boolean;
}

export default function WishlistIcon({ 
  product, 
  variant, 
  size, 
  color, 
  className = '',
  showText = false 
}: WishlistIconProps) {
  const { toggleItem, isInWishlist, isLoading } = useWishlist();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);

  const isInList = isInWishlist(product.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent any navigation
    e.stopPropagation(); // Stop event bubbling
    
    if (isLoading) return;
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Show login prompt or redirect to login
      router.push('/login');
      return;
    }
    
    setIsAnimating(true);
    toggleItem(product);
    
    // Reset animation after a short delay
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        group relative flex items-center space-x-2 transition-all duration-300 cursor-pointer
        ${!isAuthenticated 
          ? 'text-font-secondary dark:text-elegant-base hover:text-soft-gold' 
          : isInList 
            ? 'text-red-500 hover:text-red-600' 
            : 'text-font-secondary dark:text-elegant-base hover:text-red-500'
        }
        ${isAnimating ? 'scale-110' : 'scale-100'}
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      role="button"
      tabIndex={0}
      aria-label={!isAuthenticated ? 'Login to add to wishlist' : isInList ? 'Remove from wishlist' : 'Add to wishlist'}
      title={!isAuthenticated ? 'Login required to add to wishlist' : ''}
    >
      {!isAuthenticated ? (
        <LogIn className="w-5 h-5" />
      ) : (
        <Heart 
          className={`
            w-5 h-5 transition-all duration-300
            ${isInList ? 'fill-current' : ''}
            ${isAnimating ? 'animate-pulse' : ''}
          `} 
        />
      )}
      {showText && (
        <span className="text-sm font-josefin">
          {!isAuthenticated ? 'Login' : isInList ? 'Saved' : 'Save'}
        </span>
      )}
    </div>
  );
}

