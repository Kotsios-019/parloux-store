'use client';

import AboutTheMaisonSimple from '@/components/sections/AboutTheMaisonSimple';
import { motion } from 'framer-motion';

export default function AboutDemoPage() {
  return (
    <div className="min-h-screen bg-ivory-white dark:bg-deep-black">
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-8 text-center">
          About the Maison Demo
        </h1>
        
        <div className="space-y-16">
          {/* Main Section Demo */}
          <section>
            <h2 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-8 text-center">
              Split-Screen Parallax Storytelling
            </h2>
            <div className="border border-elegant-base/20 rounded-lg overflow-hidden">
              <AboutTheMaisonSimple />
            </div>
            <p className="text-sm text-font-secondary mt-4 text-center">
              Scroll to see the parallax effects and word-by-word animations
            </p>
          </section>

          {/* Features Showcase */}
          <section className="bg-gradient-to-r from-champagne-nude/10 to-elegant-base/10 p-8 rounded-lg">
            <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 text-center">
              Interactive Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📖</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Word-by-Word Animation
                </h4>
                <p className="text-sm text-font-secondary">
                  Each line appears with staggered timing for elegant storytelling
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Hover Word Effects
                </h4>
                <p className="text-sm text-font-secondary">
                  Individual words reveal soft gold underlines on hover
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎬</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Parallax Video
                </h4>
                <p className="text-sm text-font-secondary">
                  Craftsmanship video slowly zooms as you scroll
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎨</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Museum Aesthetic
                </h4>
                <p className="text-sm text-font-secondary">
                  Editorial-style layout with sophisticated typography
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💫</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Floating Elements
                </h4>
                <p className="text-sm text-font-secondary">
                  Subtle floating particles and craftsmanship icons
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
                  Adapts beautifully to all screen sizes
                </p>
              </div>
            </div>
          </section>

          {/* Story Content */}
          <section>
            <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 text-center">
              Brand Story Content
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-josefin font-semibold text-soft-gold text-lg">Philosophy</h4>
                <ul className="space-y-2 text-sm text-font-secondary">
                  <li>• "We craft garments that transcend time"</li>
                  <li>• "Each piece is born from a philosophy of slow luxury"</li>
                  <li>• "Creating pieces that become heirlooms"</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-josefin font-semibold text-soft-gold text-lg">Craftsmanship</h4>
                <ul className="space-y-2 text-sm text-font-secondary">
                  <li>• "Drawing from generations of Italian artisanship"</li>
                  <li>• "We source only the finest silks and wools"</li>
                  <li>• "Every stitch tells a story of dedication"</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Technical Details */}
          <section className="bg-gradient-to-r from-elegant-base/10 to-champagne-nude/10 p-8 rounded-lg">
            <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 text-center">
              Technical Implementation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-3">
                  Scroll Animations
                </h4>
                <ul className="space-y-2 text-sm text-font-secondary">
                  <li>• Framer Motion scroll-based transforms</li>
                  <li>• Parallax video scaling and opacity</li>
                  <li>• Text fade and slide animations</li>
                  <li>• Staggered word-by-word reveals</li>
                </ul>
              </div>
              <div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-3">
                  Interactive Elements
                </h4>
                <ul className="space-y-2 text-sm text-font-secondary">
                  <li>• Hover word detection and highlighting</li>
                  <li>• Smooth gold underline animations</li>
                  <li>• Floating particle systems</li>
                  <li>• Craftsmanship icon interactions</li>
                </ul>
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
                <strong>Scroll slowly</strong> to see the parallax effects in action. The video will zoom in while the text fades and slides.
              </p>
              <p className="text-font-secondary">
                <strong>Hover over individual words</strong> to see the soft gold underline glow effect.
              </p>
              <p className="text-font-secondary">
                <strong>Watch the craftsmanship icons</strong> in the bottom right for subtle animations.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
