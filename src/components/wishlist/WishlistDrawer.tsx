'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Trash2, ShoppingBag, LogIn } from 'lucide-react';
import { useWishlist } from '@/contexts/MockWishlistContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/MockCartContext';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { CartItemSkeleton } from '@/components/ui/Skeleton';

export default function WishlistDrawer() {
  const { 
    items, 
    isOpen, 
    closeWishlist, 
    removeItem, 
    clearWishlist, 
    getItemCount,
    isLoading 
  } = useWishlist();
  
  const { addItem: addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleAddToCart = (item: any) => {
    // Instead of adding to cart directly, redirect to product page for variant selection
    closeWishlist();
    window.location.href = `/products/${item.product.handle}`;
  };

  if (!mounted) return null;

  const wishlistContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[9999]"
            onClick={closeWishlist}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-screen w-full max-w-md bg-ivory-white dark:bg-deep-black border-l border-elegant-base dark:border-elegant-base z-[9999] flex flex-col shadow-2xl"
            style={{ 
              position: 'fixed',
              right: 0,
              top: 0,
              height: '100vh',
              width: '100%',
              maxWidth: '28rem',
              zIndex: 9999
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-elegant-base dark:border-elegant-base">
              <div className="flex items-center space-x-3">
                <Heart className="w-6 h-6 text-soft-gold" />
                <h2 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white">
                  {t('wishlist.title')}
                </h2>
                {getItemCount() > 0 && (
                  <span className="bg-soft-gold text-deep-black text-sm font-josefin font-semibold px-2 py-1 rounded-full">
                    {getItemCount()}
                  </span>
                )}
              </div>
              <button
                onClick={closeWishlist}
                className="p-2 hover:bg-elegant-base/20 dark:hover:bg-elegant-base/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-font-primary dark:text-ivory-white" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {!isAuthenticated ? (
                /* Login Required */
                <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                  <LogIn className="w-16 h-16 text-soft-gold mb-4" />
                  <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-2">
                    Login Required
                  </h3>
                  <p className="text-font-secondary dark:text-font-secondary-dark mb-6">
                    Please log in to view and manage your wishlist
                  </p>
                  <Link
                    href="/login"
                    onClick={closeWishlist}
                    className="btn-primary"
                  >
                    Login to Continue
                  </Link>
                </div>
              ) : items.length === 0 ? (
                /* Empty Wishlist */
                <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                  <Heart className="w-16 h-16 text-elegant-base dark:text-elegant-base mb-4" />
                  <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-2">
                    {t('wishlist.empty')}
                  </h3>
                  <p className="text-font-secondary dark:text-font-secondary-dark mb-6">
                    {t('wishlist.emptyDescription')}
                  </p>
                  <Link
                    href="/collections"
                    onClick={closeWishlist}
                    className="btn-primary"
                  >
                    {t('wishlist.startShopping')}
                  </Link>
                </div>
              ) : isLoading ? (
                /* Loading State */
                <div className="p-6 space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <CartItemSkeleton key={index} />
                  ))}
                </div>
              ) : (
                /* Wishlist Items */
                <div className="p-6 space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex space-x-4 p-4 bg-white dark:bg-deep-black/50 rounded-lg border border-elegant-base dark:border-elegant-base"
                    >
                      {/* Product Image */}
                      <div className="relative w-20 h-24 flex-shrink-0">
                        <Image
                          src={item.product.images[0]?.src || '/images/products/placeholder.svg'}
                          alt={item.product.images[0]?.alt || item.product.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-cormorant font-semibold text-deep-black dark:text-ivory-white text-sm mb-1 line-clamp-2">
                          {item.product.title}
                        </h3>
                        
                        {/* Product Details */}
                        <div className="text-xs text-font-secondary dark:text-font-secondary-dark mb-2">
                          {item.product.category}
                        </div>

                        {/* Price */}
                        <div className="text-sm font-cormorant font-semibold text-soft-gold mb-2">
                          {formatPrice(Math.min(...item.product.variants.map(v => v.price)))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleAddToCart(item)}
                            disabled={isLoading}
                            className="flex-1 px-3 py-1.5 text-xs font-josefin font-semibold rounded transition-all duration-300 disabled:opacity-50 bg-soft-gold text-deep-black hover:bg-bright-gold"
                          >
                            Select Options
                          </button>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            disabled={isLoading}
                            className="p-1.5 text-font-secondary dark:text-font-secondary-dark hover:text-red-500 transition-colors disabled:opacity-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-elegant-base dark:border-elegant-base p-6 space-y-4">
                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={clearWishlist}
                    disabled={isLoading}
                    className="w-full py-3 px-4 border border-elegant-base dark:border-elegant-base text-font-secondary dark:text-font-secondary-dark hover:border-red-500 hover:text-red-500 transition-colors rounded-lg font-josefin disabled:opacity-50"
                  >
                    {t('wishlist.clearWishlist')}
                  </button>
                  
                  <Link
                    href="/collections"
                    onClick={closeWishlist}
                    className="block w-full btn-primary text-center"
                  >
                    {t('wishlist.continueShopping')}
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(wishlistContent, document.body);
}
