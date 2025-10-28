'use client';

import { CardContainer, CardBody, CardItem } from '@/components/ui/3DCard';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useWishlist } from '@/contexts/MockWishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { mockProducts } from '@/data/mockProducts';
import { HoverScale, FadeIn, StaggerContainer, StaggerItem, ButtonPress } from '@/components/ui/MicroAnimations';
import { ProductImage } from '@/components/ui/OptimizedImage';
import { Heart } from 'lucide-react';

interface FeaturedProduct {
  id: string;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  image: string;
  badge?: string;
  description: string;
  href: string;
}

const featuredProducts: FeaturedProduct[] = [
  {
    id: '1',
    name: 'Elegant Silk Evening Dress',
    category: 'Dresses',
    price: '€299',
    originalPrice: '€399',
    image: '/images/products/elegant-silk-dress-1.jpg',
    badge: 'New',
    description: 'Timeless elegance for special occasions',
    href: '/products/elegant-silk-evening-dress'
  },
  {
    id: '2',
    name: 'Silk Camisole Top',
    category: 'Tops',
    price: '€189',
    image: '/images/products/silk-camisole-1.jpg',
    badge: 'Limited',
    description: 'Luxurious silk with modern cuts',
    href: '/products/silk-camisole-top'
  },
  {
    id: '3',
    name: 'Classic White Blouse',
    category: 'Tops',
    price: '€159',
    image: '/images/products/white-blouse-1.jpg',
    badge: 'Premium',
    description: 'Powerful sophistication for the modern woman',
    href: '/products/classic-white-blouse'
  }
];

export default function FeaturedProducts() {
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  const handleWishlistToggle = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    
    addToWishlist(product);
  };

  return (
    <section className="py-20 bg-white dark:bg-deep-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-secondary mb-6">Featured Collection</h2>
          <p className="body-large text-font-secondary max-w-3xl mx-auto">
            Handpicked pieces that define the ParlouX aesthetic. Each piece is carefully selected for its timeless elegance and modern sophistication.
          </p>
        </motion.div>

        {/* 3D Product Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {featuredProducts.map((product, index) => (
            <StaggerItem key={product.id} className="flex justify-center">
              <HoverScale>
              <div className="relative">
                <Link href={product.href}>
                  <CardContainer className="inter-var">
                    <CardBody className="bg-transparent relative group">
                      {/* Main Product Card */}
                      <CardItem
                        translateZ="50"
                        className="w-full h-full"
                      >
                        <div className="relative w-80 h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-champagne-nude/20 to-elegant-base/20 dark:from-deep-black/30 dark:to-deep-black/50 border border-elegant-base/20 dark:border-elegant-base/30">
                      {/* Product Image */}
                      <div className="relative w-full h-64 overflow-hidden">
                        <ProductImage
                          src={product.image}
                          alt={product.name}
                          enableZoom={true}
                          priority={index < 3} // First 3 images load with priority
                        />
                        
                        {/* Badge */}
                        {product.badge && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-soft-gold text-deep-black text-xs font-josefin font-semibold rounded-full">
                              {product.badge}
                            </span>
                          </div>
                        )}


                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        <div className="mb-2">
                          <span className="text-xs font-josefin text-soft-gold uppercase tracking-wider">
                            {product.category}
                          </span>
                        </div>
                        <h3 className="heading-tertiary mb-2 group-hover:text-soft-gold transition-colors">
                          {product.name}
                        </h3>
                        <p className="body-small text-font-secondary mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        
                        {/* Price */}
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
                            {product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-font-secondary line-through">
                              {product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardItem>


                  <CardItem
                    translateX={10}
                    translateY={10}
                    translateZ="30"
                    className="absolute bottom-4 left-4"
                  >
                    <div className="w-6 h-6 bg-champagne-nude/30 rounded-full flex items-center justify-center">
                      <span className="text-elegant-base text-xs">+</span>
                    </div>
                  </CardItem>

                  {/* Glow Effect */}
                  <CardItem
                    translateZ="10"
                    className="absolute inset-0 pointer-events-none"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-soft-gold/0 via-soft-gold/10 to-soft-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </CardItem>
                    </CardBody>
                  </CardContainer>
                </Link>
                
                {/* Wishlist Button - Outside Link */}
                <div className="absolute top-4 right-4 z-20">
                  <button
                    onClick={(e) => {
                      const mockProduct = mockProducts.find(p => p.handle === product.href.replace('/products/', '')) || mockProducts[0];
                      handleWishlistToggle(mockProduct, e);
                    }}
                    className="w-8 h-8 bg-ivory-white/90 dark:bg-deep-black/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
                  >
                    <Heart className="w-4 h-4 text-soft-gold hover:text-red-500" />
                  </button>
                </div>
              </div>
              </HoverScale>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* View All Button */}
        <FadeIn delay={0.6} className="text-center mt-16">
          <ButtonPress>
            <a
              href="/collections"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>View All Products</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </ButtonPress>
        </FadeIn>
      </div>
    </section>
  );
}
