'use client';

import EssenceOfTheCollection from '@/components/sections/EssenceOfTheCollection';
import { motion } from 'framer-motion';

export default function EssenceDemoPage() {
  return (
    <div className="min-h-screen bg-ivory-white dark:bg-deep-black">
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-8 text-center">
          Essence of the Collection Demo
        </h1>
        
        <div className="space-y-16">
          {/* Main Essence Section */}
          <section>
            <h2 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-8 text-center">
              AW25 - Nocturnal Grace
            </h2>
            <div className="border border-elegant-base/20 rounded-lg overflow-hidden">
              <EssenceOfTheCollection />
            </div>
            <p className="text-sm text-font-secondary mt-4 text-center">
              Cinematic scroll section with layered imagery, luxury fashion film aesthetics, and collection CTAs
            </p>
          </section>

          {/* Features Showcase */}
          <section className="bg-gradient-to-r from-champagne-nude/10 to-elegant-base/10 p-8 rounded-lg">
            <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 text-center">
              Cinematic Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎬</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Parallax Layers
                </h4>
                <p className="text-sm text-font-secondary">
                  Multiple background layers moving at different speeds for depth
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Text Animations
                </h4>
                <p className="text-sm text-font-secondary">
                  Clip-path reveals, opacity strobes, and fade-in effects
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎨</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Visual Effects
                </h4>
                <p className="text-sm text-font-secondary">
                  Gradient overlays, vignettes, and floating luxury elements
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Responsive Design
                </h4>
                <p className="text-sm text-font-secondary">
                  Adapts beautifully to all screen sizes and orientations
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎭</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Mood Board
                </h4>
                <p className="text-sm text-font-secondary">
                  Introduces collection mood before showing actual products
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🌙</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Nocturnal Theme
                </h4>
                <p className="text-sm text-font-secondary">
                  Dark, elegant aesthetic with gold accents and shadows
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🛍️</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Collection CTAs
                </h4>
                <p className="text-sm text-font-secondary">
                  Direct links to view collection and shop new arrivals
                </p>
              </div>
            </div>
          </section>

          {/* Collection Story */}
          <section>
            <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 text-center">
              AW25 Collection Story
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-lg font-josefin font-semibold text-deep-black dark:text-ivory-white">
                  The Inspiration
                </h4>
                <p className="text-font-secondary">
                  "Nocturnal Grace" draws inspiration from the mysterious beauty of midnight, 
                  where shadows dance with silk and elegance emerges from darkness. Each piece 
                  tells a story of refined sophistication.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-josefin font-semibold text-deep-black dark:text-ivory-white">
                  The Aesthetic
                </h4>
                <p className="text-font-secondary">
                  Deep blacks, rich golds, and subtle textures create a mood board that 
                  captures the essence of luxury womenswear designed for the modern woman 
                  who embraces both power and grace.
                </p>
              </div>
            </div>
          </section>

          {/* Technical Implementation */}
          <section className="bg-gradient-to-r from-elegant-base/10 to-champagne-nude/10 p-8 rounded-lg">
            <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 text-center">
              Technical Implementation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-3">
                  Scroll Effects
                </h4>
                <ul className="space-y-2 text-sm text-font-secondary">
                  <li>• Framer Motion scroll-based transforms</li>
                  <li>• Multiple parallax layers at different speeds</li>
                  <li>• Text opacity and position animations</li>
                  <li>• Intersection Observer for visibility triggers</li>
                </ul>
              </div>
              <div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-3">
                  Visual Design
                </h4>
                <ul className="space-y-2 text-sm text-font-secondary">
                  <li>• Layered background images with opacity</li>
                  <li>• Gradient overlays for cinematic effect</li>
                  <li>• Floating luxury particles</li>
                  <li>• Clip-path and strobe text animations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Collection Elements */}
          <section>
            <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 text-center">
              Collection Elements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-deep-black/5 to-elegant-base/5 p-6 rounded-lg border border-elegant-base/10">
                <div className="text-2xl font-cormorant font-bold text-soft-gold mb-2">Fabric Texture</div>
                <p className="text-sm text-font-secondary">
                  Luxury silk and wool textures with subtle gold thread patterns
                </p>
              </div>
              <div className="bg-gradient-to-br from-deep-black/5 to-elegant-base/5 p-6 rounded-lg border border-elegant-base/10">
                <div className="text-2xl font-cormorant font-bold text-soft-gold mb-2">Color Palette</div>
                <p className="text-sm text-font-secondary">
                  Deep blacks, warm golds, and midnight blues with elegant gradients
                </p>
              </div>
              <div className="bg-gradient-to-br from-deep-black/5 to-elegant-base/5 p-6 rounded-lg border border-elegant-base/10">
                <div className="text-2xl font-cormorant font-bold text-soft-gold mb-2">Abstract Forms</div>
                <p className="text-sm text-font-secondary">
                  Flowing lines and organic shapes inspired by nocturnal elegance
                </p>
              </div>
            </div>
          </section>

          {/* Usage Instructions */}
          <section className="text-center">
            <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-4">
              How to Experience
            </h3>
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-font-secondary">
                <strong>Scroll slowly</strong> to see the layered images move at different speeds creating depth
              </p>
              <p className="text-font-secondary">
                <strong>Watch the text animations</strong> as they reveal with clip-path effects and opacity strobes
              </p>
              <p className="text-font-secondary">
                <strong>Notice the floating elements</strong> that create a sense of luxury and movement
              </p>
              <p className="text-font-secondary">
                <strong>Experience the mood</strong> as the collection essence is introduced before products
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
