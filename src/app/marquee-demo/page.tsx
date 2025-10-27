'use client';

import BrandMarquee from '@/components/sections/BrandMarquee';
import { motion } from 'framer-motion';

export default function MarqueeDemoPage() {
  return (
    <div className="min-h-screen bg-ivory-white dark:bg-deep-black">
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-8 text-center">
          Brand Marquee Demo
        </h1>
        
        <div className="space-y-16">
          {/* Main Marquee Demo */}
          <section>
            <h2 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-8 text-center">
              Animated Brand Marquee
            </h2>
            <div className="bg-gradient-to-r from-champagne-nude/10 to-elegant-base/10 p-8 rounded-lg">
              <BrandMarquee />
            </div>
            <p className="text-sm text-font-secondary mt-4 text-center">
              Two rows moving in opposite directions with hover effects and animated icons
            </p>
          </section>

          {/* Features Showcase */}
          <section className="bg-gradient-to-r from-soft-gold/10 to-champagne-nude/10 p-8 rounded-lg">
            <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 text-center">
              Marquee Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎭</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Dual Direction
                </h4>
                <p className="text-sm text-font-secondary">
                  Two rows moving in opposite directions for dynamic visual interest
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Animated Icons
                </h4>
                <p className="text-sm text-font-secondary">
                  Icons rotate and scale with staggered timing for organic movement
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎨</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Highlight System
                </h4>
                <p className="text-sm text-font-secondary">
                  Key brand values highlighted in soft gold for emphasis
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🌊</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Smooth Animation
                </h4>
                <p className="text-sm text-font-secondary">
                  Linear easing for seamless, professional movement
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💫</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Floating Particles
                </h4>
                <p className="text-sm text-font-secondary">
                  Subtle floating particles for added visual depth
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Hover Effects
                </h4>
                <p className="text-sm text-font-secondary">
                  Interactive hover states with scale and color transitions
                </p>
              </div>
            </div>
          </section>

          {/* Brand Values */}
          <section>
            <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 text-center">
              Featured Brand Values
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-josefin font-semibold text-soft-gold text-lg">Highlighted Values</h4>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-3">
                    <span className="text-soft-gold">🇮🇹</span>
                    <span className="text-font-secondary">Handcrafted in Italy</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-soft-gold">✨</span>
                    <span className="text-font-secondary">Limited Editions</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-soft-gold">💎</span>
                    <span className="text-font-secondary">Exclusive Designs</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-soft-gold">⭐</span>
                    <span className="text-font-secondary">Premium Quality</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-josefin font-semibold text-font-primary dark:text-ivory-white text-lg">Supporting Values</h4>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-3">
                    <span className="text-font-secondary">🌿</span>
                    <span className="text-font-secondary">Sustainable Materials</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-font-secondary">👑</span>
                    <span className="text-font-secondary">VIP Access</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-font-secondary">🎨</span>
                    <span className="text-font-secondary">Artisan Crafted</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-font-secondary">🤝</span>
                    <span className="text-font-secondary">Ethically Sourced</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Customization Options */}
          <section className="bg-gradient-to-r from-elegant-base/10 to-champagne-nude/10 p-8 rounded-lg">
            <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 text-center">
              Customization Options
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-3">
                  Content
                </h4>
                <ul className="space-y-2 text-sm text-font-secondary">
                  <li>• Easily add/remove brand values</li>
                  <li>• Custom icons for each value</li>
                  <li>• Highlight important values</li>
                  <li>• Adjustable text and spacing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-3">
                  Animation
                </h4>
                <ul className="space-y-2 text-sm text-font-secondary">
                  <li>• Adjustable speed and direction</li>
                  <li>• Staggered icon animations</li>
                  <li>• Hover interaction effects</li>
                  <li>• Smooth gradient overlays</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Usage Instructions */}
          <section className="text-center">
            <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-4">
              Usage Instructions
            </h3>
            <p className="text-font-secondary max-w-3xl mx-auto">
              The marquee automatically loops seamlessly and includes hover effects. 
              It's perfect for showcasing brand values, partnerships, or key messages. 
              The component is fully responsive and includes fallback states for better performance.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
