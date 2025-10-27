"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import React, { useRef, useState, useEffect } from "react";
import { Sun, Moon, Search, Heart, ShoppingBag, User, Globe } from "lucide-react";
import { AnimatedThemeToggler } from "./AnimatedThemeToggler";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/MockCartContext";
import { useWishlist } from "@/contexts/MockWishlistContext";
import { useSearch } from "@/contexts/SearchContext";
import { useAuth } from "@/contexts/AuthContext";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("sticky inset-x-0 top-0 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(20px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(201, 163, 78, 0.15), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(201, 163, 78, 0.1), 0 0 4px rgba(201, 163, 78, 0.1), 0 16px 68px rgba(10, 10, 10, 0.1), 0 1px 0 rgba(249, 248, 246, 0.1) inset"
          : "none",
        width: visible ? "60%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "800px",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-6 py-3 lg:flex",
        visible && "bg-ivory-white/90 dark:bg-deep-black/90",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium transition duration-200 lg:flex lg:space-x-1",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-3 py-2 text-font-primary dark:text-ivory-white font-josefin font-light hover:text-soft-gold dark:hover:text-bright-gold transition-colors duration-300"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-soft-gold/20 dark:bg-bright-gold/20"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(20px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(201, 163, 78, 0.15), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(201, 163, 78, 0.1), 0 0 4px rgba(201, 163, 78, 0.1), 0 16px 68px rgba(10, 10, 10, 0.1), 0 1px 0 rgba(249, 248, 246, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "4px" : "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible && "bg-ivory-white/90 dark:bg-deep-black/90",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-ivory-white dark:bg-deep-black px-4 py-8 shadow-[0_0_24px_rgba(201,_163,_78,_0.15),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(201,_163,_78,_0.1),_0_0_4px_rgba(201,_163,_78,_0.1),_0_16px_68px_rgba(10,_10,_10,_0.1),_0_1px_0_rgba(249,_248,_246,_0.1)_inset]",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-font-primary dark:text-ivory-white w-6 h-6" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-font-primary dark:text-ivory-white w-6 h-6" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal"
    >
      <div className="w-2 h-2 bg-soft-gold rounded-full"></div>
      <span className="font-cormorant font-bold text-deep-black dark:text-ivory-white text-xl">ParlouX</span>
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-2 rounded-full text-sm font-medium relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center font-josefin";

  const variantStyles = {
    primary:
      "bg-soft-gold text-deep-black hover:bg-bright-gold shadow-[0_0_24px_rgba(201,_163,_78,_0.15),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(201,_163,_78,_0.1),_0_0_4px_rgba(201,_163,_78,_0.1),_0_16px_68px_rgba(10,_10,_10,_0.1),_0_1px_0_rgba(249,_248,_246,_0.1)_inset]",
    secondary: "bg-transparent text-font-primary dark:text-ivory-white hover:text-soft-gold dark:hover:text-bright-gold shadow-none",
    dark: "bg-deep-black text-ivory-white hover:bg-font-primary shadow-[0_0_24px_rgba(201,_163,_78,_0.15),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(201,_163,_78,_0.1),_0_0_4px_rgba(201,_163,_78,_0.1),_0_16px_68px_rgba(10,_10,_10,_0.1),_0_1px_0_rgba(249,_248,_246,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-soft-gold to-bright-gold text-deep-black shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};

// ParlouX-specific navbar icons component
export const NavbarIcons = () => {
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();
  const { toggleCart, getItemCount } = useCart();
  const { toggleWishlist, getItemCount: getWishlistCount } = useWishlist();
  const { toggleSearch } = useSearch();
  const { isAuthenticated, user, logout } = useAuth();

  // Close all modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isInsideModal = document.querySelector('[data-modal="true"]')?.contains(target);
      
      if (!isInsideModal) {
        setIsWishlistOpen(false);
        setIsAccountOpen(false);
        setIsLanguageOpen(false);
      }
    };

    if (isWishlistOpen || isAccountOpen || isLanguageOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isWishlistOpen, isAccountOpen, isLanguageOpen]);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' }
  ];

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    setIsLanguageOpen(false);
    console.log('Language changed to:', langCode);
  };

  // Close all other modals when opening a new one
  const openSearch = () => {
    setIsWishlistOpen(false);
    setIsAccountOpen(false);
    setIsLanguageOpen(false);
    toggleSearch();
    console.log('Search clicked');
  };

  const openWishlist = () => {
    setIsAccountOpen(false);
    setIsLanguageOpen(false);
    if (!isAuthenticated) {
      // Redirect to login page
      window.location.href = '/login';
      return;
    }
    toggleWishlist();
    console.log('Wishlist clicked');
  };

  const openCart = () => {
    setIsAccountOpen(false);
    setIsLanguageOpen(false);
    if (!isAuthenticated) {
      // Redirect to login page
      window.location.href = '/login';
      return;
    }
    toggleCart();
    console.log('Cart clicked');
  };

  const openAccount = () => {
    setIsWishlistOpen(false);
    setIsLanguageOpen(false);
    setIsAccountOpen(true);
    console.log('Account clicked');
  };

  const openLanguage = () => {
    setIsWishlistOpen(false);
    setIsAccountOpen(false);
    setIsLanguageOpen(!isLanguageOpen);
    console.log('Language clicked');
  };

  return (
    <div className="flex items-center space-x-1">
      {/* Language Toggle */}
      <div className="relative" ref={languageRef}>
        <button 
          onClick={openLanguage}
          className="p-1.5 hover:bg-elegant-base/30 dark:hover:bg-elegant-base/20 rounded-full transition-colors duration-300 cursor-pointer"
          aria-label="Change Language"
        >
          <Globe className="w-5 h-5 text-font-secondary dark:text-elegant-base" />
        </button>

        {/* Language Dropdown */}
        {isLanguageOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-ivory-white dark:bg-deep-black border border-elegant-base dark:border-elegant-base rounded-lg shadow-xl z-[9999]" data-modal="true">
            <div className="py-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full px-4 py-3 text-left hover:bg-elegant-base/10 dark:hover:bg-elegant-base/20 transition-colors duration-200 flex items-center space-x-3 ${
                    language === lang.code 
                      ? 'bg-soft-gold/10 dark:bg-soft-gold/20 text-soft-gold dark:text-bright-gold' 
                      : 'text-font-primary dark:text-ivory-white'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="font-josefin font-medium">{lang.name}</span>
                  {language === lang.code && (
                    <span className="ml-auto text-soft-gold dark:text-bright-gold">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <button 
          onClick={openSearch}
          className="p-1.5 hover:bg-elegant-base/30 dark:hover:bg-elegant-base/20 rounded-full transition-colors duration-300 cursor-pointer"
          aria-label="Search"
        >
          <Search className="w-5 h-5 text-font-secondary dark:text-elegant-base" />
        </button>
      </div>

      {/* Wishlist */}
      <div className="relative">
        <button 
          onClick={openWishlist}
          className="p-1.5 hover:bg-elegant-base/30 dark:hover:bg-elegant-base/20 rounded-full transition-colors duration-300 relative cursor-pointer"
          aria-label="Wishlist"
        >
          <Heart className="w-5 h-5 text-font-secondary dark:text-elegant-base" />
          {/* Wishlist Badge */}
          {isAuthenticated && getWishlistCount() > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-soft-gold text-deep-black text-xs font-bold rounded-full flex items-center justify-center">
              {getWishlistCount()}
            </span>
          )}
        </button>
      </div>

      {/* Shopping Cart */}
      <div className="relative">
        <button 
          onClick={openCart}
          className="p-1.5 hover:bg-elegant-base/30 dark:hover:bg-elegant-base/20 rounded-full transition-colors duration-300 relative cursor-pointer"
          aria-label="Shopping Cart"
        >
          <ShoppingBag className="w-5 h-5 text-font-secondary dark:text-elegant-base" />
          {/* Cart Badge */}
          {isAuthenticated && getItemCount() > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-soft-gold text-deep-black text-xs font-bold rounded-full flex items-center justify-center">
              {getItemCount()}
            </span>
          )}
        </button>
      </div>

      {/* Account */}
      <div className="relative">
        <button 
          onClick={openAccount}
          className="p-1.5 hover:bg-elegant-base/30 dark:hover:bg-elegant-base/20 rounded-full transition-colors duration-300 cursor-pointer"
          aria-label="Account"
        >
          <User className="w-5 h-5 text-font-secondary dark:text-elegant-base" />
        </button>
      </div>

      {/* Theme Toggle */}
      <div className="relative">
        <AnimatedThemeToggler
          className="p-1.5 hover:bg-elegant-base/30 dark:hover:bg-elegant-base/20 rounded-full transition-colors duration-300 cursor-pointer"
          aria-label="Toggle theme"
        />
      </div>

      {/* Account Modal */}
      {isAccountOpen && (
        <div 
          className="absolute right-0 top-full mt-2 w-56 bg-ivory-white dark:bg-deep-black border border-elegant-base dark:border-elegant-base rounded-lg shadow-xl z-[9999]"
          onClick={(e) => e.stopPropagation()}
          data-modal="true"
        >
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <User className="w-5 h-5 text-font-primary dark:text-ivory-white" />
              <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
                {isAuthenticated ? `${user?.firstName} ${user?.lastName}` : t('modal.account.title')}
              </h3>
            </div>
            <div className="space-y-2">
              {isAuthenticated ? (
                <>
                  <a href="/account" className="block text-sm text-font-primary/80 dark:text-ivory-white/80 hover:text-soft-gold dark:hover:text-bright-gold transition-colors">{t('modal.account.profile')}</a>
                  <a href="/orders" className="block text-sm text-font-primary/80 dark:text-ivory-white/80 hover:text-soft-gold dark:hover:text-bright-gold transition-colors">{t('modal.account.orders')}</a>
                  <button 
                    onClick={() => {
                      logout();
                      setIsAccountOpen(false);
                    }}
                    className="block text-sm text-font-primary/80 dark:text-ivory-white/80 hover:text-soft-gold dark:hover:text-bright-gold transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <a href="/login" className="block text-sm text-font-primary/80 dark:text-ivory-white/80 hover:text-soft-gold dark:hover:text-bright-gold transition-colors">{t('modal.account.signIn')}</a>
                  <a href="/login" className="block text-sm text-font-primary/80 dark:text-ivory-white/80 hover:text-soft-gold dark:hover:text-bright-gold transition-colors">{t('modal.account.createAccount')}</a>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
