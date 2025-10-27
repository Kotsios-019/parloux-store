'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Product, ProductVariant } from '@/data/mockProducts';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export interface CartItem {
  id: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartContextType {
  items: CartItem[];
  isLoading: boolean;
  isOpen: boolean;
  addItem: (product: Product, variant: ProductVariant, quantity?: number, size?: string, color?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  getItemCount: () => number;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  loadFromShopify: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function MockCartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Note: We can't use useAuth here because it would create a circular dependency
  // The authentication check will be handled in the components that use this context

  // Load cart from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedCart = localStorage.getItem('parloux-cart');
    if (savedCart) {
      try {
        const parsedItems = JSON.parse(savedCart);
        setItems(parsedItems);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('parloux-cart', JSON.stringify(items));
      // Also sync to Shopify if user is authenticated
      syncToShopify();
    }
  }, [items, mounted]);

  // Sync cart data to Shopify
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
        body: JSON.stringify({ cart: items }),
      });

      if (!response.ok) {
        console.warn('Failed to sync cart to Shopify');
      }
    } catch (error) {
      console.warn('Error syncing cart to Shopify:', error);
    } finally {
      setIsSyncing(false);
    }
  }, [items, isSyncing]);

  // Load cart data from Shopify when user logs in
  const loadFromShopify = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/user-data', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.cart && Array.isArray(data.cart)) {
          setItems(data.cart);
        }
      }
    } catch (error) {
      console.warn('Error loading cart from Shopify:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addItem = useCallback((product: Product, variant: ProductVariant, quantity: number = 1, size?: string, color?: string) => {
    setIsLoading(true);
    
    const itemId = `${product.id}-${variant.id}-${size || ''}-${color || ''}`;
    
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === itemId);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        const newItem: CartItem = {
          id: itemId,
          product,
          variant,
          quantity,
          size,
          color,
        };
        return [...prevItems, newItem];
      }
    });
    
    setIsLoading(false);
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setIsLoading(true);
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    setIsLoading(false);
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    setIsLoading(true);
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity }
          : item
      )
    );
    setIsLoading(false);
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setIsLoading(true);
    setItems([]);
    setIsLoading(false);
  }, []);

  const toggleCart = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeCart = useCallback(() => {
    setIsOpen(false);
  }, []);

  const getItemCount = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const getTotalPrice = useCallback(() => {
    return items.reduce((total, item) => {
      const price = item.variant.price || Math.min(...item.product.variants.map(v => v.price));
      return total + (price * item.quantity);
    }, 0);
  }, [items]);

  const getTotalItems = useCallback(() => {
    return items.length;
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        isOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        closeCart,
        getItemCount,
        getTotalPrice,
        getTotalItems,
        loadFromShopify,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a MockCartProvider');
  }
  return context;
}
