'use client';

import AboutTheMaisonSimple from '@/components/sections/AboutTheMaisonSimple';
import { motion } from 'framer-motion';

export default function VideoDemoPage() {
  return (
    <div className="min-h-screen bg-ivory-white dark:bg-deep-black">
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-8 text-center">
          Video Integration Demo
        </h1>
        
        <div className="space-y-16">
          {/* Main Video Section Demo */}
          <section>
            <h2 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-8 text-center">
              About the Maison with Video
            </h2>
            <div className="border border-elegant-base/20 rounded-lg overflow-hidden">
              <AboutTheMaisonSimple />
            </div>
            <p className="text-sm text-font-secondary mt-4 text-center">
              The right side now features your video.mp4 with auto-play, loop, and fallback handling
            </p>
          </section>

          {/* Video Features Showcase */}
          <section className="bg-gradient-to-r from-champagne-nude/10 to-elegant-base/10 p-8 rounded-lg">
            <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 text-center">
              Video Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎬</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Auto-Play
                </h4>
                <p className="text-sm text-font-secondary">
                  Video starts automatically when section comes into view
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🔄</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Seamless Loop
                </h4>
                <p className="text-sm text-font-secondary">
                  Video loops continuously for continuous engagement
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Mobile Optimized
                </h4>
                <p className="text-sm text-font-secondary">
                  playsInline attribute ensures mobile compatibility
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🖼️</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Poster Image
                </h4>
                <p className="text-sm text-font-secondary">
                  Shows craftsmanship image while video loads
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Fallback Handling
                </h4>
                <p className="text-sm text-font-secondary">
                  Graceful degradation if video fails to load
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Performance Optimized
                </h4>
                <p className="text-sm text-font-secondary">
                  preload="metadata" for faster initial load
                </p>
              </div>
            </div>
          </section>

          {/* Video Specifications */}
          <section>
            <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 text-center">
              Video Implementation Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-josefin font-semibold text-soft-gold text-lg">Video Attributes</h4>
                <ul className="space-y-2 text-sm text-font-secondary">
                  <li>• <code>autoPlay</code> - Starts automatically</li>
                  <li>• <code>muted</code> - Required for auto-play in browsers</li>
                  <li>• <code>loop</code> - Continuous playback</li>
                  <li>• <code>playsInline</code> - Mobile compatibility</li>
                  <li>• <code>preload="metadata"</code> - Optimized loading</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-josefin font-semibold text-soft-gold text-lg">Fallback Strategy</h4>
                <ul className="space-y-2 text-sm text-font-secondary">
                  <li>• Poster image while loading</li>
                  <li>• Image fallback if video fails</li>
                  <li>• Gradient fallback if image fails</li>
                  <li>• Error handling for all scenarios</li>
                  <li>• Graceful degradation maintained</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Visual Effects */}
          <section className="bg-gradient-to-r from-elegant-base/10 to-champagne-nude/10 p-8 rounded-lg">
            <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 text-center">
              Visual Effects with Video
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-3">
                  Overlay Effects
                </h4>
                <ul className="space-y-2 text-sm text-font-secondary">
                  <li>• Gradient overlay for text readability</li>
                  <li>• Floating particles over video</li>
                  <li>• Craftsmanship icons overlay</li>
                  <li>• Subtle play button indicator</li>
                </ul>
              </div>
              <div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-3">
                  Animation Integration
                </h4>
                <ul className="space-y-2 text-sm text-font-secondary">
                  <li>• Video scales in on scroll</li>
                  <li>• Smooth fade-in animations</li>
                  <li>• Floating elements over video</li>
                  <li>• Maintains all text animations</li>
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
                <strong>Scroll to the About section</strong> to see the video in action. It will auto-play and loop seamlessly.
              </p>
              <p className="text-font-secondary">
                <strong>Hover over words</strong> in the text to see the gold underline effects while the video plays.
              </p>
              <p className="text-font-secondary">
                <strong>Watch the floating elements</strong> and craftsmanship icons overlay the video for added visual interest.
              </p>
            </div>
          </section>

          {/* File Information */}
          <section className="bg-gradient-to-r from-soft-gold/10 to-bright-gold/10 p-6 rounded-lg">
            <h3 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-4 text-center">
              Video File Information
            </h3>
            <div className="text-center space-y-2">
              <p className="text-font-secondary">
                <strong>File:</strong> /images/video.mp4
              </p>
              <p className="text-font-secondary">
                <strong>Format:</strong> MP4 (recommended for web)
              </p>
              <p className="text-font-secondary">
                <strong>Usage:</strong> Craftsmanship showcase in About the Maison section
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
