'use client';

import { AnimatedThemeToggler } from '@/components/ui/AnimatedThemeToggler';
import { motion } from 'framer-motion';

export default function ThemeDemoPage() {
  return (
    <div className="min-h-screen bg-ivory-white dark:bg-deep-black transition-colors duration-300">
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-8 text-center">
          Animated Theme Toggler Demo
        </h1>
        
        <div className="space-y-16">
          {/* Theme Toggler Showcase */}
          <section className="text-center">
            <h2 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-8">
              Magic UI Animated Theme Toggler
            </h2>
            <div className="flex justify-center mb-8">
              <AnimatedThemeToggler
                className="p-4 bg-soft-gold/10 dark:bg-bright-gold/10 rounded-full hover:bg-soft-gold/20 dark:hover:bg-bright-gold/20 transition-colors duration-300"
                duration={600}
              />
            </div>
            <p className="text-font-secondary max-w-2xl mx-auto">
              Click the theme toggle above to see the beautiful circular transition effect. 
              The animation uses the View Transition API for smooth, native-like transitions.
            </p>
          </section>

          {/* Features Showcase */}
          <section className="bg-gradient-to-r from-champagne-nude/10 to-elegant-base/10 p-8 rounded-lg">
            <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 text-center">
              Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🌙</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Circular Transition
                </h4>
                <p className="text-sm text-font-secondary">
                  Beautiful circular reveal animation from the button position
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  View Transition API
                </h4>
                <p className="text-sm text-font-secondary">
                  Uses native browser View Transition API for smooth performance
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎨</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Customizable
                </h4>
                <p className="text-sm text-font-secondary">
                  Adjustable duration and styling to match your brand
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Responsive
                </h4>
                <p className="text-sm text-font-secondary">
                  Works perfectly on all screen sizes and devices
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">♿</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Accessible
                </h4>
                <p className="text-sm text-font-secondary">
                  Screen reader support and proper ARIA labels
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💾</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Persistent
                </h4>
                <p className="text-sm text-font-secondary">
                  Remembers theme preference in localStorage
                </p>
              </div>
            </div>
          </section>

          {/* Technical Implementation */}
          <section>
            <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 text-center">
              Technical Implementation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-deep-black/5 to-elegant-base/5 p-6 rounded-lg">
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-3">
                  View Transition API
                </h4>
                <ul className="space-y-2 text-sm text-font-secondary">
                  <li>• Native browser animation support</li>
                  <li>• Smooth circular clip-path transitions</li>
                  <li>• Hardware-accelerated performance</li>
                  <li>• Fallback for unsupported browsers</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-deep-black/5 to-elegant-base/5 p-6 rounded-lg">
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-3">
                  React Integration
                </h4>
                <ul className="space-y-2 text-sm text-font-secondary">
                  <li>• useCallback for performance optimization</li>
                  <li>• MutationObserver for theme detection</li>
                  <li>• flushSync for synchronous updates</li>
                  <li>• TypeScript support with proper types</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Usage Examples */}
          <section className="bg-gradient-to-r from-elegant-base/10 to-champagne-nude/10 p-8 rounded-lg">
            <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 text-center">
              Usage Examples
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Basic Usage
                </h4>
                <div className="bg-deep-black/5 dark:bg-ivory-white/5 p-4 rounded-lg">
                  <code className="text-sm text-font-secondary">
                    {`<AnimatedThemeToggler className="p-2 rounded-full" />`}
                  </code>
                </div>
              </div>
              <div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Custom Duration
                </h4>
                <div className="bg-deep-black/5 dark:bg-ivory-white/5 p-4 rounded-lg">
                  <code className="text-sm text-font-secondary">
                    {`<AnimatedThemeToggler duration={800} className="p-2 rounded-full" />`}
                  </code>
                </div>
              </div>
              <div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  With Custom Styling
                </h4>
                <div className="bg-deep-black/5 dark:bg-ivory-white/5 p-4 rounded-lg">
                  <code className="text-sm text-font-secondary">
                    {`<AnimatedThemeToggler 
  className="p-4 bg-soft-gold/10 rounded-full hover:bg-soft-gold/20" 
  duration={600} 
/>`}
                  </code>
                </div>
              </div>
            </div>
          </section>

          {/* Browser Support */}
          <section>
            <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 text-center">
              Browser Support
            </h3>
            <div className="text-center">
              <p className="text-font-secondary mb-4">
                The View Transition API is supported in modern browsers:
              </p>
              <div className="flex justify-center space-x-4 text-sm">
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full">
                  Chrome 111+
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full">
                  Edge 111+
                </span>
                <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full">
                  Firefox (Flag)
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200 rounded-full">
                  Safari (Coming)
                </span>
              </div>
              <p className="text-sm text-font-secondary mt-4">
                Graceful fallback for unsupported browsers
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
