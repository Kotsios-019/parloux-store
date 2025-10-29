'use client';

import { 
  Navbar, 
  NavBody, 
  NavItems, 
  MobileNav, 
  MobileNavHeader, 
  MobileNavMenu, 
  MobileNavToggle, 
  NavbarLogo, 
  NavbarIcons 
} from '@/components/ui/ResizableNavbar';
import CartDrawer from '@/components/cart/CartDrawer';
import WishlistDrawer from '@/components/wishlist/WishlistDrawer';
import SearchModal from '@/components/search/SearchModal';
import { useUserDataSync } from '@/hooks/useUserDataSync';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';
import { NetworkStatusProvider } from '@/components/error/NetworkErrorHandler';
import { ToastProvider } from '@/components/ui/Toast';
import { SkipLinks, ScreenReaderAnnouncement } from '@/components/accessibility/AccessibilityUtils';
import { BreadcrumbProvider } from '@/components/navigation/Breadcrumb';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface GlobalLayoutProps {
  children: React.ReactNode;
}

export default function GlobalLayout({ children }: GlobalLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync user data when authentication state changes
  useUserDataSync();

  const { t } = useLanguage();

  const navItems = [
    { name: t('nav.collections'), link: '/collections' },
    { name: t('nav.dresses'), link: '/collections/dresses' },
    { name: t('nav.tops'), link: '/collections/tops' },
    { name: t('nav.about'), link: '/about' },
  ];

  // Show loading state during hydration
  if (!mounted) {
    return (
      <div className="min-h-screen bg-ivory-white dark:bg-deep-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-soft-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-font-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <NetworkStatusProvider>
      <ToastProvider>
        <BreadcrumbProvider>
          <ErrorBoundary>
        <div className="min-h-screen bg-ivory-white dark:bg-deep-black transition-colors duration-300">
          {/* Skip Links */}
          <SkipLinks />
          
          {/* Screen Reader Announcements */}
          <ScreenReaderAnnouncement announcement="" />
          {/* Magical Resizable Navbar */}
          <Navbar>
            {/* Desktop Navbar */}
            <NavBody>
              <NavbarLogo />
              <NavItems items={navItems} />
              <NavbarIcons />
            </NavBody>

            {/* Mobile Navbar */}
            <MobileNav>
              <MobileNavHeader>
                <NavbarLogo />
                <MobileNavToggle 
                  isOpen={isMobileMenuOpen} 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                />
              </MobileNavHeader>
              <MobileNavMenu 
                isOpen={isMobileMenuOpen} 
                onClose={() => setIsMobileMenuOpen(false)}
              >
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="block py-2 text-font-primary dark:text-ivory-white hover:text-soft-gold dark:hover:text-bright-gold font-josefin font-light transition-colors duration-300 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      window.location.href = item.link;
                    }}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="pt-4 border-t border-elegant-base dark:border-elegant-base">
                  <NavbarIcons />
                </div>
              </MobileNavMenu>
            </MobileNav>
          </Navbar>

          {/* Main Content */}
          <ErrorBoundary>
            <main 
              id="main-content"
              className="lg:pt-0 pt-16"
              role="main"
              aria-label="Main content"
            >
              {children}
            </main>
          </ErrorBoundary>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-champagne-nude/30 to-elegant-base/30 dark:from-champagne-nude/20 dark:to-elegant-base/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="heading-secondary mb-6">{t('newsletter.title')}</h2>
          <p className="body-large text-font-secondary mb-8">
            {t('newsletter.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder={t('newsletter.placeholder')} 
              className="input flex-1"
            />
            <button className="btn-primary whitespace-nowrap">
              {t('newsletter.subscribe')}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        id="footer"
        className="border-t border-elegant-base dark:border-elegant-base bg-white dark:bg-deep-black"
        role="contentinfo"
        aria-label="Site footer"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-2 h-2 bg-soft-gold rounded-full"></div>
                <h3 className="text-xl font-cormorant font-medium text-deep-black dark:text-ivory-white">
                  {t('footer.brand')}
                </h3>
              </div>
              <p className="body-small text-font-secondary mb-4">
                {t('footer.description')}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-cormorant font-medium text-deep-black dark:text-ivory-white mb-4">{t('footer.quickLinks')}</h4>
              <ul className="space-y-2">
                <li><a href="/collections" className="link-gold body-small">Collections</a></li>
                <li><a href="/about" className="link-gold body-small">About Us</a></li>
                <li><a href="/contact" className="link-gold body-small">Contact</a></li>
                <li><a href="/size-guide" className="link-gold body-small">Size Guide</a></li>
              </ul>
            </div>

            {/* Customer Care */}
            <div>
              <h4 className="font-cormorant font-medium text-deep-black dark:text-ivory-white mb-4">{t('footer.customerCare')}</h4>
              <ul className="space-y-2">
                <li><a href="/shipping" className="link-gold body-small">Shipping Info</a></li>
                <li><a href="/returns" className="link-gold body-small">Returns</a></li>
                <li><a href="/faq" className="link-gold body-small">FAQ</a></li>
                <li><a href="/privacy" className="link-gold body-small">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-elegant-base dark:border-elegant-base mt-8 pt-8 text-center">
            <p className="body-small text-font-secondary">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>

      {/* Cart Drawer - Rendered as Portal */}
      <CartDrawer />
      
      {/* Wishlist Drawer - Rendered as Portal */}
      <WishlistDrawer />
      
      {/* Search Modal - Rendered as Portal */}
      <SearchModal />
        </div>
      </ErrorBoundary>
    </BreadcrumbProvider>
    </ToastProvider>
    </NetworkStatusProvider>
  );
}