'use client';

import { MorphingText } from '@/components/ui/MorphingText';

export default function MorphingDemoPage() {
  return (
    <div className="min-h-screen bg-ivory-white dark:bg-deep-black p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-12 text-center">
          Morphing Text Demo
        </h1>
        
        <div className="space-y-16">
          {/* Fashion Words */}
          <section>
            <h2 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-8 text-center">
              Luxury Fashion Words
            </h2>
            <div className="bg-gradient-to-br from-deep-black/90 to-deep-black/70 p-12 rounded-lg">
              <MorphingText
                texts={[
                  "Timeless.",
                  "Tailored.",
                  "Yours.",
                  "Elegant.",
                  "Confident.",
                  "Luxury.",
                  "Sophisticated.",
                  "Refined.",
                  "Exclusive.",
                  "Artisan."
                ]}
                className="text-ivory-white font-cormorant text-6xl md:text-8xl lg:text-9xl h-24 md:h-32 lg:h-40"
              />
            </div>
          </section>

          {/* Brand Values */}
          <section>
            <h2 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-8 text-center">
              Brand Values
            </h2>
            <div className="bg-gradient-to-br from-soft-gold/20 to-champagne-nude/20 p-12 rounded-lg">
              <MorphingText
                texts={[
                  "Quality.",
                  "Craftsmanship.",
                  "Innovation.",
                  "Sustainability.",
                  "Excellence.",
                  "Heritage.",
                  "Modern.",
                  "Authentic."
                ]}
                className="text-deep-black font-cormorant text-5xl md:text-7xl lg:text-8xl h-20 md:h-28 lg:h-36"
              />
            </div>
          </section>

          {/* Product Categories */}
          <section>
            <h2 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-8 text-center">
              Product Categories
            </h2>
            <div className="bg-gradient-to-br from-elegant-base/30 to-champagne-nude/30 p-12 rounded-lg">
              <MorphingText
                texts={[
                  "Dresses.",
                  "Blouses.",
                  "Jackets.",
                  "Skirts.",
                  "Trousers.",
                  "Accessories.",
                  "Evening Wear.",
                  "Casual Chic."
                ]}
                className="text-deep-black font-cormorant text-4xl md:text-6xl lg:text-7xl h-16 md:h-24 lg:h-32"
              />
            </div>
          </section>

          {/* Different Sizes */}
          <section>
            <h2 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-8 text-center">
              Different Sizes
            </h2>
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-soft-gold/10 to-bright-gold/10 p-8 rounded-lg">
                <h3 className="text-lg font-josefin text-deep-black mb-4">Large</h3>
                <MorphingText
                  texts={["Large.", "Bold.", "Impact."]}
                  className="text-deep-black font-cormorant text-6xl h-20"
                />
              </div>
              
              <div className="bg-gradient-to-r from-champagne-nude/20 to-elegant-base/20 p-8 rounded-lg">
                <h3 className="text-lg font-josefin text-deep-black mb-4">Medium</h3>
                <MorphingText
                  texts={["Medium.", "Balanced.", "Elegant."]}
                  className="text-deep-black font-cormorant text-4xl h-16"
                />
              </div>
              
              <div className="bg-gradient-to-r from-elegant-base/20 to-soft-gold/20 p-8 rounded-lg">
                <h3 className="text-lg font-josefin text-deep-black mb-4">Small</h3>
                <MorphingText
                  texts={["Small.", "Subtle.", "Refined."]}
                  className="text-deep-black font-cormorant text-2xl h-12"
                />
              </div>
            </div>
          </section>

          {/* Instructions */}
          <section className="bg-gradient-to-r from-champagne-nude/20 to-elegant-base/20 p-8 rounded-lg">
            <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-4">
              How It Works
            </h3>
            <ul className="space-y-2 text-font-secondary">
              <li>• <strong>Automatic cycling</strong> - Words morph every 2 seconds</li>
              <li>• <strong>Smooth transitions</strong> - Blur and fade effects between words</li>
              <li>• <strong>Infinite loop</strong> - Cycles through all words continuously</li>
              <li>• <strong>Responsive sizing</strong> - Adapts to different screen sizes</li>
              <li>• <strong>Customizable</strong> - Easy to change words and styling</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
