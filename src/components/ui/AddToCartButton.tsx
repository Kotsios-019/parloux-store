'use client';

import { ShoppingCart, LogIn } from 'lucide-react';
import { useCart } from '@/contexts/MockCartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Product, ProductVariant } from '@/data/mockProducts';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AddToCartButtonProps {
  product: Product;
  variant: ProductVariant;
  quantity?: number;
  size?: string;
  color?: string;
  className?: string;
  showText?: boolean;
  disabled?: boolean;
}

export default function AddToCartButton({ 
  product, 
  variant, 
  quantity = 1,
  size, 
  color, 
  className = '',
  showText = true,
  disabled = false
}: AddToCartButtonProps) {
  const { addItem, isLoading } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLoading || disabled) return;
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Redirect to login page
      router.push('/login');
      return;
    }
    
    setIsAnimating(true);
    addItem(product, variant, quantity, size, color);
    
    // Reset animation after a short delay
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading || disabled}
      className={`
        group relative flex items-center justify-center space-x-2 transition-all duration-300
        ${!isAuthenticated 
          ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-soft-gold hover:text-deep-black' 
          : 'bg-soft-gold hover:bg-bright-gold text-deep-black'
        }
        ${isAnimating ? 'scale-105' : 'scale-100'}
        ${isLoading || disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        px-4 py-2 rounded-lg font-josefin font-medium
        ${className}
      `}
      aria-label={!isAuthenticated ? 'Login to add to cart' : 'Add to cart'}
      title={!isAuthenticated ? 'Login required to add to cart' : ''}
    >
      {!isAuthenticated ? (
        <LogIn className="w-4 h-4" />
      ) : (
        <ShoppingCart 
          className={`
            w-4 h-4 transition-all duration-300
            ${isAnimating ? 'animate-pulse' : ''}
          `} 
        />
      )}
      {showText && (
        <span className="text-sm">
          {!isAuthenticated ? 'Login to Add' : isLoading ? 'Adding...' : 'Add to Cart'}
        </span>
      )}
    </button>
  );
}
