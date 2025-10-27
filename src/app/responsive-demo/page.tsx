'use client';

import { MorphingText } from '@/components/ui/MorphingText';
import LuxuryGlassBadges from '@/components/hero/LuxuryGlassBadges';
import MobileGlassBadges from '@/components/hero/MobileGlassBadges';

export default function ResponsiveDemoPage() {
  return (
    <div className="min-h-screen bg-ivory-white dark:bg-deep-black p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-8 text-center">
          Responsive Glass Badges Demo
        </h1>
        
        <div className="space-y-12">
          {/* Desktop Version */}
          <section>
            <h2 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6">
              Desktop Version (lg and above)
            </h2>
            <div className="bg-gradient-to-br from-deep-black/90 to-deep-black/70 p-12 rounded-lg relative min-h-[400px]">
              <div className="text-center">
                <div className="mb-6">
                  <MorphingText
                    texts={["Timeless.", "Tailored.", "Yours."]}
                    className="text-ivory-white font-cormorant text-4xl md:text-6xl h-16 md:h-20"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <button className="px-6 py-3 bg-soft-gold text-deep-black font-josefin font-medium rounded-none transition-all duration-300 hover:scale-105">
                    Shop New In
                  </button>
                  <button className="px-6 py-3 bg-transparent text-ivory-white border border-ivory-white/30 font-josefin font-medium rounded-none transition-all duration-300 hover:scale-105">
                    Discover Story
                  </button>
                </div>
                
                {/* Desktop Glass Badges */}
                <LuxuryGlassBadges />
              </div>
            </div>
            <p className="text-sm text-font-secondary mt-2">
              Glass badges appear as floating elements positioned around the content (hidden on mobile)
            </p>
          </section>

          {/* Mobile Version */}
          <section>
            <h2 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6">
              Mobile Version (below lg)
            </h2>
            <div className="bg-gradient-to-br from-deep-black/90 to-deep-black/70 p-8 rounded-lg">
              <div className="text-center">
                <div className="mb-6">
                  <MorphingText
                    texts={["Timeless.", "Tailored.", "Yours."]}
                    className="text-ivory-white font-cormorant text-3xl md:text-5xl h-14 md:h-16"
                  />
                </div>
                <div className="flex flex-col gap-4 justify-center mb-8">
                  <button className="px-6 py-3 bg-soft-gold text-deep-black font-josefin font-medium rounded-none transition-all duration-300 hover:scale-105">
                    Shop New In
                  </button>
                  <button className="px-6 py-3 bg-transparent text-ivory-white border border-ivory-white/30 font-josefin font-medium rounded-none transition-all duration-300 hover:scale-105">
                    Discover Story
                  </button>
                </div>
                
                {/* Mobile Glass Badges */}
                <MobileGlassBadges />
              </div>
            </div>
            <p className="text-sm text-font-secondary mt-2">
              Glass badges appear as a flexbox row below the buttons (hidden on desktop)
            </p>
          </section>

          {/* Breakpoint Information */}
          <section className="bg-gradient-to-r from-champagne-nude/20 to-elegant-base/20 p-8 rounded-lg">
            <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-4">
              Responsive Behavior
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Desktop (lg: 1024px+)
                </h4>
                <ul className="space-y-1 text-sm text-font-secondary">
                  <li>• Floating glass badges positioned around content</li>
                  <li>• Magnetic hover effects</li>
                  <li>• Larger badge sizes</li>
                  <li>• Positioned absolutely</li>
                </ul>
              </div>
              <div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Mobile/Tablet (below 1024px)
                </h4>
                <ul className="space-y-1 text-sm text-font-secondary">
                  <li>• Glass badges in flexbox row below buttons</li>
                  <li>• Smaller, compact sizes</li>
                  <li>• No magnetic effects</li>
                  <li>• Positioned in document flow</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Test Instructions */}
          <section className="bg-gradient-to-r from-soft-gold/10 to-bright-gold/10 p-6 rounded-lg">
            <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-4">
              Test Instructions
            </h3>
            <ol className="space-y-2 text-sm text-font-secondary">
              <li>1. <strong>Desktop view</strong> - Glass badges should float around the content</li>
              <li>2. <strong>Tablet view</strong> - Resize browser to tablet size, badges should move below buttons</li>
              <li>3. <strong>Mobile view</strong> - Resize to mobile size, badges should be in a compact row</li>
              <li>4. <strong>Hover effects</strong> - Desktop badges should have magnetic hover effects</li>
              <li>5. <strong>No overlap</strong> - Mobile badges should never cover buttons or text</li>
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
