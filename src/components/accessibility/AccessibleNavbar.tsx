'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/MockCartContext';
import { useWishlist } from '@/contexts/MockWishlistContext';
import { AccessibleButton } from '@/components/accessibility/AccessibilityUtils';
import { useFocusManagement, useKeyboardNavigation } from '@/components/accessibility/AccessibilityUtils';

interface AccessibleNavbarProps {
  className?: string;
}

export default function AccessibleNavbar({ className = '' }: AccessibleNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isCollectionsMenuOpen, setIsCollectionsMenuOpen] = useState(false);
  
  const { t } = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();
  const { getItemCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const { isKeyboardUser } = useKeyboardNavigation();
  const { focusElement } = useFocusManagement();
  
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const collectionsMenuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
      if (collectionsMenuRef.current && !collectionsMenuRef.current.contains(event.target as Node)) {
        setIsCollectionsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsAccountMenuOpen(false);
        setIsCollectionsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const navItems = [
    { name: t('nav.home'), link: '/' },
    { name: t('nav.collections'), link: '/collections', hasSubmenu: true },
    { name: t('nav.products'), link: '/products' },
    { name: t('nav.about'), link: '/about' },
    { name: t('nav.contact'), link: '/contact' }
  ];

  const collectionItems = [
    { name: 'Dresses', link: '/collections/dresses' },
    { name: 'Tops', link: '/collections/tops' },
    { name: 'Blazers', link: '/collections/blazers' },
    { name: 'Skirts', link: '/collections/skirts' },
    { name: 'Sweaters', link: '/collections/sweaters' }
  ];

  const handleLogout = () => {
    logout();
    setIsAccountMenuOpen(false);
  };

  return (
    <nav 
      className={`bg-white dark:bg-deep-black border-b border-elegant-base dark:border-elegant-base ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/"
              className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-soft-gold focus:ring-offset-2 rounded"
              aria-label="Parloux Store - Go to homepage"
            >
              <div className="w-8 h-8 bg-soft-gold rounded-full flex items-center justify-center">
                <span className="text-deep-black font-cormorant font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-cormorant font-bold text-deep-black dark:text-ivory-white">
                Parloux
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasSubmenu ? (
                  <div className="relative" ref={collectionsMenuRef}>
                    <AccessibleButton
                      onClick={() => setIsCollectionsMenuOpen(!isCollectionsMenuOpen)}
                      ariaLabel={`${item.name} menu`}
                      ariaExpanded={isCollectionsMenuOpen}
                      className="flex items-center space-x-1 text-font-primary dark:text-ivory-white hover:text-soft-gold dark:hover:text-bright-gold transition-colors"
                    >
                      <span className="font-josefin font-light">{item.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isCollectionsMenuOpen ? 'rotate-180' : ''}`} />
                    </AccessibleButton>

                    <AnimatePresence>
                      {isCollectionsMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-deep-black rounded-lg shadow-lg border border-elegant-base dark:border-elegant-base z-50"
                          role="menu"
                          aria-label="Collections submenu"
                        >
                          {collectionItems.map((collection) => (
                            <Link
                              key={collection.name}
                              href={collection.link}
                              className="block px-4 py-2 text-font-primary dark:text-ivory-white hover:bg-elegant-base/10 transition-colors font-josefin font-light"
                              role="menuitem"
                              onClick={() => setIsCollectionsMenuOpen(false)}
                            >
                              {collection.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.link}
                    className="text-font-primary dark:text-ivory-white hover:text-soft-gold dark:hover:text-bright-gold font-josefin font-light transition-colors focus:outline-none focus:ring-2 focus:ring-soft-gold focus:ring-offset-2 rounded"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search */}
            <AccessibleButton
              onClick={() => {/* Open search modal */}}
              ariaLabel="Open search"
              className="text-font-primary dark:text-ivory-white hover:text-soft-gold dark:hover:text-bright-gold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </AccessibleButton>

            {/* Wishlist */}
            <AccessibleButton
              onClick={() => {/* Open wishlist */}}
              ariaLabel={`Wishlist${isAuthenticated && getWishlistCount() > 0 ? `, ${getWishlistCount()} items` : ''}`}
              className="relative text-font-primary dark:text-ivory-white hover:text-soft-gold dark:hover:text-bright-gold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {isAuthenticated && getWishlistCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getWishlistCount()}
                </span>
              )}
            </AccessibleButton>

            {/* Cart */}
            <AccessibleButton
              onClick={() => {/* Open cart */}}
              ariaLabel={`Shopping cart${isAuthenticated && getItemCount() > 0 ? `, ${getItemCount()} items` : ''}`}
              className="relative text-font-primary dark:text-ivory-white hover:text-soft-gold dark:hover:text-bright-gold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              {isAuthenticated && getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </AccessibleButton>

            {/* Account */}
            <div className="relative" ref={accountMenuRef}>
              <AccessibleButton
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                ariaLabel={`Account menu${isAuthenticated ? `, logged in as ${user?.firstName}` : ', not logged in'}`}
                ariaExpanded={isAccountMenuOpen}
                className="flex items-center space-x-1 text-font-primary dark:text-ivory-white hover:text-soft-gold dark:hover:text-bright-gold transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <ChevronDown className={`w-4 h-4 transition-transform ${isAccountMenuOpen ? 'rotate-180' : ''}`} />
              </AccessibleButton>

              <AnimatePresence>
                {isAccountMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-deep-black rounded-lg shadow-lg border border-elegant-base dark:border-elegant-base z-50"
                    role="menu"
                    aria-label="Account menu"
                  >
                    {isAuthenticated ? (
                      <>
                        <div className="px-4 py-2 border-b border-elegant-base dark:border-elegant-base">
                          <p className="text-sm font-josefin font-semibold text-font-primary dark:text-ivory-white">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="text-xs text-font-secondary dark:text-font-secondary-dark">
                            {user?.email}
                          </p>
                        </div>
                        <Link
                          href="/account"
                          className="block px-4 py-2 text-font-primary dark:text-ivory-white hover:bg-elegant-base/10 transition-colors font-josefin font-light"
                          role="menuitem"
                          onClick={() => setIsAccountMenuOpen(false)}
                        >
                          My Account
                        </Link>
                        <Link
                          href="/orders"
                          className="block px-4 py-2 text-font-primary dark:text-ivory-white hover:bg-elegant-base/10 transition-colors font-josefin font-light"
                          role="menuitem"
                          onClick={() => setIsAccountMenuOpen(false)}
                        >
                          My Orders
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-font-primary dark:text-ivory-white hover:bg-elegant-base/10 transition-colors font-josefin font-light"
                          role="menuitem"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className="block px-4 py-2 text-font-primary dark:text-ivory-white hover:bg-elegant-base/10 transition-colors font-josefin font-light"
                          role="menuitem"
                          onClick={() => setIsAccountMenuOpen(false)}
                        >
                          Login
                        </Link>
                        <Link
                          href="/register"
                          className="block px-4 py-2 text-font-primary dark:text-ivory-white hover:bg-elegant-base/10 transition-colors font-josefin font-light"
                          role="menuitem"
                          onClick={() => setIsAccountMenuOpen(false)}
                        >
                          Register
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <AccessibleButton
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              ariaLabel={`${isMobileMenuOpen ? 'Close' : 'Open'} mobile menu`}
              ariaExpanded={isMobileMenuOpen}
              className="text-font-primary dark:text-ivory-white hover:text-soft-gold dark:hover:text-bright-gold transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </AccessibleButton>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-elegant-base dark:border-elegant-base"
              role="menu"
              aria-label="Mobile navigation menu"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.hasSubmenu ? (
                      <div>
                        <AccessibleButton
                          onClick={() => setIsCollectionsMenuOpen(!isCollectionsMenuOpen)}
                          ariaLabel={`${item.name} submenu`}
                          ariaExpanded={isCollectionsMenuOpen}
                          className="w-full text-left px-3 py-2 text-font-primary dark:text-ivory-white hover:bg-elegant-base/10 transition-colors font-josefin font-light flex items-center justify-between"
                        >
                          <span>{item.name}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isCollectionsMenuOpen ? 'rotate-180' : ''}`} />
                        </AccessibleButton>
                        
                        <AnimatePresence>
                          {isCollectionsMenuOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-4 space-y-1"
                            >
                              {collectionItems.map((collection) => (
                                <Link
                                  key={collection.name}
                                  href={collection.link}
                                  className="block px-3 py-2 text-font-secondary dark:text-font-secondary-dark hover:bg-elegant-base/10 transition-colors font-josefin font-light"
                                  role="menuitem"
                                  onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setIsCollectionsMenuOpen(false);
                                  }}
                                >
                                  {collection.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.link}
                        className="block px-3 py-2 text-font-primary dark:text-ivory-white hover:bg-elegant-base/10 transition-colors font-josefin font-light"
                        role="menuitem"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
