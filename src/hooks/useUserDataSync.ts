'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useWishlist } from '@/contexts/MockWishlistContext';
import { useCart } from '@/contexts/MockCartContext';

// Hook to sync user data when authentication state changes
export function useUserDataSync() {
  const { isAuthenticated, isLoading } = useAuth();
  const { loadFromShopify: loadWishlistFromShopify } = useWishlist();
  const { loadFromShopify: loadCartFromShopify } = useCart();

  useEffect(() => {
    // Only load data when user becomes authenticated and auth is not loading
    if (isAuthenticated && !isLoading) {
      console.log('User authenticated, loading data from Shopify...');
      
      // Load both wishlist and cart data from Shopify
      Promise.all([
        loadWishlistFromShopify(),
        loadCartFromShopify()
      ]).then(() => {
        console.log('User data loaded from Shopify');
      }).catch((error) => {
        console.warn('Error loading user data from Shopify:', error);
      });
    }
  }, [isAuthenticated, isLoading, loadWishlistFromShopify, loadCartFromShopify]);
}
