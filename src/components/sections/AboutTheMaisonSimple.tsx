'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface StoryBlock {
  id: string;
  text: string;
  highlight?: boolean;
  delay?: number;
}

const storyBlocks: StoryBlock[] = [
  {
    id: 'philosophy',
    text: 'We craft garments that transcend time',
    highlight: true,
    delay: 0
  },
  {
    id: 'craftsmanship',
    text: 'Each piece is born from a philosophy of slow luxury',
    delay: 0.2
  },
  {
    id: 'heritage',
    text: 'Drawing from generations of Italian artisanship',
    delay: 0.4
  },
  {
    id: 'materials',
    text: 'We source only the finest silks and wools',
    delay: 0.6
  },
  {
    id: 'process',
    text: 'Every stitch tells a story of dedication',
    delay: 0.8
  },
  {
    id: 'vision',
    text: 'Creating pieces that become heirlooms',
    highlight: true,
    delay: 1.0
  }
];

export default function AboutTheMaisonSimple() {
  const [mounted, setMounted] = useState(false);
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleWordHover = (wordId: string) => {
    setHoveredWord(wordId);
  };

  const handleWordLeave = () => {
    setHoveredWord(null);
  };

  if (!mounted) {
    return (
      <section className="bg-ivory-white dark:bg-deep-black">
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* Text Side */}
          <div className="w-full md:w-1/2 p-8 sm:p-12 md:p-16 flex items-center">
            <div className="max-w-lg">
              <h2 className="text-4xl font-cormorant font-light text-deep-black dark:text-ivory-white mb-8">
                About the Maison
              </h2>
              <div className="space-y-6">
                {storyBlocks.map((block) => (
                  <p key={block.id} className="text-lg font-josefin text-font-secondary leading-relaxed">
                    {block.text}
                  </p>
                ))}
              </div>
            </div>
          </div>
          
          {/* Video Side */}
          <div className="w-full md:w-1/2 relative overflow-hidden h-64 sm:h-80 md:h-auto">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              poster="/images/craftsmanship-video.jpg"
            >
              <source src="/images/video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/40" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-ivory-white dark:bg-deep-black relative overflow-hidden">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Text Side - Left */}
        <motion.div 
          className="w-full md:w-1/2 p-8 sm:p-12 md:p-16 flex items-center relative z-10"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-lg">
            <motion.h2 
              className="text-4xl font-cormorant font-light text-deep-black dark:text-ivory-white mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              About the Maison
            </motion.h2>
            
            <div className="space-y-6">
              {storyBlocks.map((block, index) => (
                <motion.p
                  key={block.id}
                  className={`text-lg font-josefin leading-relaxed ${
                    block.highlight 
                      ? 'text-deep-black dark:text-ivory-white font-medium' 
                      : 'text-font-secondary'
                  }`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: block.delay }}
                  viewport={{ once: true }}
                >
                  {block.text.split(' ').map((word, wordIndex) => (
                    <motion.span
                      key={`${block.id}-${wordIndex}`}
                      className="inline-block mr-2 cursor-pointer relative"
                      onMouseEnter={() => handleWordHover(`${block.id}-${wordIndex}`)}
                      onMouseLeave={handleWordLeave}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {word}
                      
                      {/* Gold underline glow on hover */}
                      <motion.span
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-soft-gold"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{
                          scaleX: hoveredWord === `${block.id}-${wordIndex}` ? 1 : 0,
                          opacity: hoveredWord === `${block.id}-${wordIndex}` ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        style={{ originX: 0 }}
                      />
                    </motion.span>
                  ))}
                </motion.p>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <a
                href="/about"
                className="inline-flex items-center space-x-3 text-soft-gold hover:text-bright-gold transition-colors duration-300 group"
              >
                <span className="font-josefin font-medium">Discover Our Story</span>
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </motion.svg>
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Video Side - Right */}
        <motion.div 
          className="w-full md:w-1/2 relative overflow-hidden h-64 sm:h-80 md:h-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          {/* Craftsmanship Video */}
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              poster="/images/craftsmanship-video.jpg"
              preload="metadata"
              onError={(e) => {
                // Fallback to image if video fails to load
                const target = e.target as HTMLVideoElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `
                    <div class="absolute inset-0 bg-gradient-to-br from-champagne-nude/30 to-elegant-base/40">
                      <div class="absolute inset-0 flex items-center justify-center">
                        <div class="text-center">
                          <div class="w-32 h-32 bg-soft-gold/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                            <span class="text-6xl">✂️</span>
                          </div>
                          <h3 class="text-2xl font-cormorant font-light text-deep-black dark:text-ivory-white mb-2">
                            Artisan Craftsmanship
                          </h3>
                          <p class="text-font-secondary font-josefin">
                            Every detail matters
                          </p>
                        </div>
                      </div>
                    </div>
                  `;
                }
              }}
            >
              <source src="/images/video.mp4" type="video/mp4" />
              {/* Fallback to image if video fails */}
              <Image
                src="/images/craftsmanship-video.jpg"
                alt="Craftsmanship in action"
                fill
                className="object-cover"
                onError={(e) => {
                  // Fallback to gradient with craftsmanship elements
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="absolute inset-0 bg-gradient-to-br from-champagne-nude/30 to-elegant-base/40">
                        <div class="absolute inset-0 flex items-center justify-center">
                          <div class="text-center">
                            <div class="w-32 h-32 bg-soft-gold/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                              <span class="text-6xl">✂️</span>
                            </div>
                            <h3 class="text-2xl font-cormorant font-light text-deep-black dark:text-ivory-white mb-2">
                              Artisan Craftsmanship
                            </h3>
                            <p class="text-font-secondary font-josefin">
                              Every detail matters
                            </p>
                          </div>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
            </video>
          </div>

          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/40" />
          
          {/* Video Controls Overlay */}
          <div className="absolute top-4 right-4 z-20">
            <motion.div
              className="w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white text-sm">▶</span>
            </motion.div>
          </div>
          
          {/* Floating Craftsmanship Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-soft-gold/60 rounded-full"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
              />
            ))}
          </div>

          {/* Craftsmanship Icons */}
          <div className="absolute bottom-8 right-8 flex space-x-4">
            {['✂️', '🧵', '💎', '👑'].map((icon, index) => (
              <motion.div
                key={icon}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <span className="text-xl">{icon}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-soft-gold/50 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-soft-gold rounded-full mt-2"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
