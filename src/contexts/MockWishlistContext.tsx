'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Product, ProductVariant } from '@/data/mockProducts';
import { useAuth } from '@/contexts/AuthContext';

export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: Date;
}

interface WishlistContextType {
  items: WishlistItem[];
  isLoading: boolean;
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleItem: (product: Product) => void;
  clearWishlist: () => void;
  toggleWishlist: () => void;
  closeWishlist: () => void;
  getItemCount: () => number;
  loadFromShopify: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function MockWishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Note: We can't use useAuth here because it would create a circular dependency
  // The authentication check will be handled in the components that use this context

  // Load wishlist from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedWishlist = localStorage.getItem('parloux-wishlist');
    if (savedWishlist) {
      try {
        const parsedItems = JSON.parse(savedWishlist);
        // Convert date strings back to Date objects
        const itemsWithDates = parsedItems.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }));
        setItems(itemsWithDates);
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever items change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('parloux-wishlist', JSON.stringify(items));
      // Also sync to Shopify if user is authenticated
      syncToShopify();
    }
  }, [items, mounted]);

  // Sync wishlist data to Shopify
  const syncToShopify = useCallback(async () => {
    if (isSyncing) return; // Prevent multiple simultaneous syncs
    
    try {
      setIsSyncing(true);
      const response = await fetch('/api/user-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ wishlist: items }),
      });

      if (!response.ok) {
        console.warn('Failed to sync wishlist to Shopify');
      }
    } catch (error) {
      console.warn('Error syncing wishlist to Shopify:', error);
    } finally {
      setIsSyncing(false);
    }
  }, [items, isSyncing]);

  // Load wishlist data from Shopify when user logs in
  const loadFromShopify = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/user-data', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.wishlist && Array.isArray(data.wishlist)) {
          // Convert date strings back to Date objects
          const itemsWithDates = data.wishlist.map((item: any) => ({
            ...item,
            addedAt: new Date(item.addedAt)
          }));
          setItems(itemsWithDates);
        }
      }
    } catch (error) {
      console.warn('Error loading wishlist from Shopify:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addItem = useCallback((product: Product) => {
    setIsLoading(true);
    
    setItems(prevItems => {
      // Check if product already exists in wishlist
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems; // Don't add duplicate
      }
      
      // Add new item
      const newItem: WishlistItem = {
        id: product.id,
        product,
        addedAt: new Date(),
      };
      return [...prevItems, newItem];
    });
    
    setIsLoading(false);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setIsLoading(true);
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    setIsLoading(false);
  }, []);

  const isInWishlist = useCallback((productId: string) => {
    return items.some(item => item.product.id === productId);
  }, [items]);

  const toggleItem = useCallback((product: Product) => {
    const isInList = items.some(item => item.product.id === product.id);
    
    if (isInList) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  }, [items, addItem, removeItem]);

  const clearWishlist = useCallback(() => {
    setIsLoading(true);
    setItems([]);
    setIsLoading(false);
  }, []);

  const toggleWishlist = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeWishlist = useCallback(() => {
    setIsOpen(false);
  }, []);

  const getItemCount = useCallback(() => {
    return items.length;
  }, [items]);

  return (
    <WishlistContext.Provider
      value={{
        items,
        isLoading,
        isOpen,
        addItem,
        removeItem,
        isInWishlist,
        toggleItem,
        clearWishlist,
        toggleWishlist,
        closeWishlist,
        getItemCount,
        loadFromShopify,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a MockWishlistProvider');
  }
  return context;
}


