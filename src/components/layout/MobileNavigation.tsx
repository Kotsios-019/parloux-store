'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Heart, ShoppingBag, User, Home, Grid3X3 } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/contexts/MockCartContext';
import { useWishlist } from '@/contexts/MockWishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { useSearch } from '@/contexts/SearchContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { TouchButton, MobileDrawer } from '@/components/ui/MobileTouch';
import { mockCollections } from '@/data/mockProducts';

export default function MobileNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { getItemCount: getCartCount } = useCart();
  const { getItemCount: getWishlistCount } = useWishlist();
  const { isAuthenticated } = useAuth();
  const { toggleSearch } = useSearch();
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();

  const handleSearch = () => {
    setIsSearchOpen(false);
    toggleSearch();
  };

  const handleCart = () => {
    setIsCartOpen(false);
    // Open cart drawer
  };

  const handleWishlist = () => {
    setIsWishlistOpen(false);
    // Open wishlist drawer
  };

  const handleAccount = () => {
    setIsAccountOpen(false);
    // Navigate to account or login
    window.location.href = isAuthenticated ? '/account' : '/login';
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-deep-black border-b border-elegant-base/20">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Menu Button */}
          <TouchButton
            onClick={() => setIsMenuOpen(true)}
            variant="ghost"
            size="sm"
            className="p-2"
          >
            <Menu className="w-6 h-6" />
          </TouchButton>

          {/* Logo */}
          <Link href="/" className="flex-1 text-center">
            <h1 className="text-xl font-cormorant font-bold text-deep-black dark:text-ivory-white">
              ParlouX
            </h1>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            <TouchButton
              onClick={handleSearch}
              variant="ghost"
              size="sm"
              className="p-2 relative"
            >
              <Search className="w-5 h-5" />
            </TouchButton>

            <TouchButton
              onClick={() => setIsWishlistOpen(true)}
              variant="ghost"
              size="sm"
              className="p-2 relative"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-soft-gold text-deep-black text-xs font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </TouchButton>

            <TouchButton
              onClick={() => setIsCartOpen(true)}
              variant="ghost"
              size="sm"
              className="p-2 relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-soft-gold text-deep-black text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </TouchButton>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <MobileDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        title="Menu"
        className="max-h-[85vh]"
      >
        <div className="px-6 py-4 space-y-6">
          {/* Main Navigation */}
          <nav className="space-y-4">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-3 py-3 text-lg font-josefin text-font-primary dark:text-ivory-white hover:text-soft-gold dark:hover:text-bright-gold transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>

            <Link
              href="/collections"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-3 py-3 text-lg font-josefin text-font-primary dark:text-ivory-white hover:text-soft-gold dark:hover:text-bright-gold transition-colors"
            >
              <Grid3X3 className="w-5 h-5" />
              <span>Collections</span>
            </Link>

            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-3 py-3 text-lg font-josefin text-font-primary dark:text-ivory-white hover:text-soft-gold dark:hover:text-bright-gold transition-colors"
            >
              <span>About</span>
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-3 py-3 text-lg font-josefin text-font-primary dark:text-ivory-white hover:text-soft-gold dark:hover:text-bright-gold transition-colors"
            >
              <span>Contact</span>
            </Link>
          </nav>

          {/* Collections */}
          <div className="border-t border-elegant-base/20 pt-6">
            <h3 className="text-sm font-josefin font-semibold text-font-secondary dark:text-font-secondary-dark uppercase tracking-wider mb-4">
              Collections
            </h3>
            <div className="space-y-2">
              {mockCollections.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.handle}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-font-primary dark:text-ivory-white hover:text-soft-gold dark:hover:text-bright-gold transition-colors"
                >
                  {collection.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Account Section */}
          <div className="border-t border-elegant-base/20 pt-6">
            {isAuthenticated ? (
              <div className="space-y-4">
                <Link
                  href="/account"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 py-3 text-lg font-josefin text-font-primary dark:text-ivory-white hover:text-soft-gold dark:hover:text-bright-gold transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>My Account</span>
                </Link>
                <TouchButton
                  onClick={() => {
                    setIsMenuOpen(false);
                    // Handle logout
                  }}
                  variant="secondary"
                  className="w-full"
                >
                  Sign Out
                </TouchButton>
              </div>
            ) : (
              <div className="space-y-3">
                <TouchButton
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.location.href = '/login';
                  }}
                  className="w-full"
                >
                  Sign In
                </TouchButton>
                <TouchButton
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.location.href = '/register';
                  }}
                  variant="secondary"
                  className="w-full"
                >
                  Create Account
                </TouchButton>
              </div>
            )}
          </div>
        </div>
      </MobileDrawer>

      {/* Mobile Search Drawer */}
      <MobileDrawer
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        title="Search"
      >
        <div className="px-6 py-4">
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products, collections..."
                className="w-full px-4 py-3 text-base bg-elegant-base/10 dark:bg-elegant-base/20 border border-elegant-base dark:border-elegant-base rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-gold dark:focus:ring-bright-gold text-font-primary dark:text-ivory-white placeholder-font-secondary dark:placeholder-font-secondary-dark"
                style={{ minHeight: '48px' }}
              />
            </div>
            
            {/* Quick Search Suggestions */}
            <div className="space-y-3">
              <h4 className="text-sm font-josefin font-semibold text-font-secondary dark:text-font-secondary-dark uppercase tracking-wider">
                Popular Searches
              </h4>
              <div className="flex flex-wrap gap-2">
                {['dresses', 'silk', 'evening wear', 'blazers', 'tops'].map((term) => (
                  <TouchButton
                    key={term}
                    onClick={() => {
                      setIsSearchOpen(false);
                      // Handle search
                    }}
                    variant="secondary"
                    size="sm"
                    className="text-sm"
                  >
                    {term}
                  </TouchButton>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MobileDrawer>

      {/* Mobile Cart Drawer */}
      <MobileDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        title="Shopping Cart"
      >
        <div className="px-6 py-4">
          {/* Cart content will be handled by existing cart drawer */}
          <div className="text-center py-8">
            <ShoppingBag className="w-16 h-16 text-elegant-base dark:text-elegant-base mx-auto mb-4" />
            <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-2">
              Your cart is empty
            </h3>
            <p className="text-font-secondary dark:text-font-secondary-dark mb-6">
              Start shopping to add items to your cart
            </p>
            <TouchButton
              onClick={() => {
                setIsCartOpen(false);
                window.location.href = '/collections';
              }}
              className="w-full"
            >
              Start Shopping
            </TouchButton>
          </div>
        </div>
      </MobileDrawer>

      {/* Mobile Wishlist Drawer */}
      <MobileDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        title="Wishlist"
      >
        <div className="px-6 py-4">
          {/* Wishlist content will be handled by existing wishlist drawer */}
          <div className="text-center py-8">
            <Heart className="w-16 h-16 text-elegant-base dark:text-elegant-base mx-auto mb-4" />
            <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-font-secondary dark:text-font-secondary-dark mb-6">
              Save items you love for later
            </p>
            <TouchButton
              onClick={() => {
                setIsWishlistOpen(false);
                window.location.href = '/collections';
              }}
              className="w-full"
            >
              Browse Collections
            </TouchButton>
          </div>
        </div>
      </MobileDrawer>

      {/* Mobile Account Drawer */}
      <MobileDrawer
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        title="Account"
      >
        <div className="px-6 py-4">
          {isAuthenticated ? (
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-soft-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-8 h-8 text-deep-black" />
                </div>
                <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
                  Welcome back!
                </h3>
              </div>
              
              <div className="space-y-3">
                <TouchButton
                  onClick={() => {
                    setIsAccountOpen(false);
                    window.location.href = '/account';
                  }}
                  className="w-full"
                >
                  My Account
                </TouchButton>
                <TouchButton
                  onClick={() => {
                    setIsAccountOpen(false);
                    // Handle logout
                  }}
                  variant="secondary"
                  className="w-full"
                >
                  Sign Out
                </TouchButton>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center py-4">
                <User className="w-16 h-16 text-elegant-base dark:text-elegant-base mx-auto mb-4" />
                <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Sign in to your account
                </h3>
                <p className="text-font-secondary dark:text-font-secondary-dark">
                  Access your orders, wishlist, and more
                </p>
              </div>
              
              <div className="space-y-3">
                <TouchButton
                  onClick={() => {
                    setIsAccountOpen(false);
                    window.location.href = '/login';
                  }}
                  className="w-full"
                >
                  Sign In
                </TouchButton>
                <TouchButton
                  onClick={() => {
                    setIsAccountOpen(false);
                    window.location.href = '/register';
                  }}
                  variant="secondary"
                  className="w-full"
                >
                  Create Account
                </TouchButton>
              </div>
            </div>
          )}
        </div>
      </MobileDrawer>
    </>
  );
}

