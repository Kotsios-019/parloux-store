'use client';

import TimelineOfTheAtelier from '@/components/sections/TimelineOfTheAtelier';
import { Timeline } from '@/components/ui/Timeline';
import { motion } from 'framer-motion';

const demoData = [
  {
    title: "2018 - The Vision",
    content: (
      <div className="space-y-4">
        <p className="text-font-secondary font-josefin leading-relaxed">
          In a small atelier in Athens, the dream of ParlouX was born. Our founder, 
          inspired by the timeless elegance of Greek women and the craftsmanship of 
          Italian artisans, envisioned a brand that would bridge tradition with modernity.
        </p>
        <div className="bg-gradient-to-r from-champagne-nude/10 to-elegant-base/10 p-4 rounded-lg">
          <p className="text-sm font-josefin text-soft-gold italic">
            "Every great journey begins with a single step, a single thread, a single dream."
          </p>
        </div>
      </div>
    )
  },
  {
    title: "2019 - First Collection",
    content: (
      <div className="space-y-4">
        <p className="text-font-secondary font-josefin leading-relaxed">
          Our debut collection featured just 12 pieces, each hand-sewn and carefully 
          curated. We worked with local artisans and sourced the finest silks from 
          Como, Italy. Every piece told a story of dedication and passion.
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-cormorant font-bold text-soft-gold">12</div>
            <div className="text-font-secondary">Pieces</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-cormorant font-bold text-soft-gold">3</div>
            <div className="text-font-secondary">Months</div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "2021 - Recognition",
    content: (
      <div className="space-y-4">
        <p className="text-font-secondary font-josefin leading-relaxed">
          Featured in Vogue Greece and praised by fashion critics, ParlouX began 
          to gain recognition in the luxury fashion world. Our commitment to 
          sustainable practices and ethical sourcing set us apart.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-soft-gold/20 text-soft-gold text-xs font-josefin rounded-full">
            Vogue Greece
          </span>
          <span className="px-3 py-1 bg-soft-gold/20 text-soft-gold text-xs font-josefin rounded-full">
            Sustainable Fashion
          </span>
        </div>
      </div>
    )
  }
];

export default function TimelineDemoPage() {
  return (
    <div className="min-h-screen bg-ivory-white dark:bg-deep-black">
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-8 text-center">
          Timeline Demo
        </h1>
        
        <div className="space-y-16">
          {/* Main Timeline Section */}
          <section>
            <h2 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-8 text-center">
              Timeline of the Atelier
            </h2>
            <div className="border border-elegant-base/20 rounded-lg overflow-hidden">
              <TimelineOfTheAtelier />
            </div>
            <p className="text-sm text-font-secondary mt-4 text-center">
              Interactive timeline with parallax effects and brand story milestones
            </p>
          </section>

          {/* Raw Timeline Component */}
          <section>
            <h2 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-8 text-center">
              Raw Timeline Component
            </h2>
            <div className="bg-gradient-to-br from-champagne-nude/10 to-elegant-base/10 p-8 rounded-lg">
              <Timeline data={demoData} />
            </div>
            <p className="text-sm text-font-secondary mt-4 text-center">
              Original Aceternity UI timeline component with scroll animations
            </p>
          </section>

          {/* Features Showcase */}
          <section className="bg-gradient-to-r from-champagne-nude/10 to-elegant-base/10 p-8 rounded-lg">
            <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 text-center">
              Timeline Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📅</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Scroll Animation
                </h4>
                <p className="text-sm text-font-secondary">
                  Timeline fills as you scroll with smooth progress indicator
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎨</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Parallax Effects
                </h4>
                <p className="text-sm text-font-secondary">
                  Background moves slower than content for depth
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🖼️</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Image Transitions
                </h4>
                <p className="text-sm text-font-secondary">
                  Images transition from B&W to color as you scroll
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📖</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Brand Story
                </h4>
                <p className="text-sm text-font-secondary">
                  Complete journey from vision to future aspirations
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Vignette Overlays
                </h4>
                <p className="text-sm text-font-secondary">
                  Soft vignette effects for elegant transitions
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

          {/* Brand Milestones */}
          <section>
            <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 text-center">
              Brand Milestones
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-champagne-nude/5 to-elegant-base/5 p-6 rounded-lg border border-elegant-base/10">
                <div className="text-2xl font-cormorant font-bold text-soft-gold mb-2">2018</div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">The Vision</h4>
                <p className="text-sm text-font-secondary">
                  Dream born in Athens atelier, inspired by Greek elegance and Italian craftsmanship
                </p>
              </div>
              <div className="bg-gradient-to-br from-champagne-nude/5 to-elegant-base/5 p-6 rounded-lg border border-elegant-base/10">
                <div className="text-2xl font-cormorant font-bold text-soft-gold mb-2">2019</div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">First Collection</h4>
                <p className="text-sm text-font-secondary">
                  12 hand-sewn pieces, sourced from Como, Italy. Every piece tells a story
                </p>
              </div>
              <div className="bg-gradient-to-br from-champagne-nude/5 to-elegant-base/5 p-6 rounded-lg border border-elegant-base/10">
                <div className="text-2xl font-cormorant font-bold text-soft-gold mb-2">2021</div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">Recognition</h4>
                <p className="text-sm text-font-secondary">
                  Featured in Vogue Greece, praised for sustainable practices and ethical sourcing
                </p>
              </div>
              <div className="bg-gradient-to-br from-champagne-nude/5 to-elegant-base/5 p-6 rounded-lg border border-elegant-base/10">
                <div className="text-2xl font-cormorant font-bold text-soft-gold mb-2">2023</div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">Expansion</h4>
                <p className="text-sm text-font-secondary">
                  Flagship atelier in Milan, team of master craftsmen from across Europe
                </p>
              </div>
              <div className="bg-gradient-to-br from-champagne-nude/5 to-elegant-base/5 p-6 rounded-lg border border-elegant-base/10">
                <div className="text-2xl font-cormorant font-bold text-soft-gold mb-2">2024</div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">The Future</h4>
                <p className="text-sm text-font-secondary">
                  Continuing evolution, embracing innovation while honoring tradition
                </p>
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
                  Scroll Effects
                </h4>
                <ul className="space-y-2 text-sm text-font-secondary">
                  <li>• Framer Motion scroll-based transforms</li>
                  <li>• Parallax background movement</li>
                  <li>• Progressive timeline filling</li>
                  <li>• Image grayscale to color transitions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-3">
                  Visual Design
                </h4>
                <ul className="space-y-2 text-sm text-font-secondary">
                  <li>• Vignette overlay effects</li>
                  <li>• Floating particle animations</li>
                  <li>• Smooth content transitions</li>
                  <li>• Responsive image handling</li>
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
                <strong>Scroll slowly</strong> to see the timeline fill and images transition from black & white to color
              </p>
              <p className="text-font-secondary">
                <strong>Watch the parallax</strong> as the background moves slower than the content
              </p>
              <p className="text-font-secondary">
                <strong>Notice the vignette</strong> effects that create elegant transitions between milestones
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
