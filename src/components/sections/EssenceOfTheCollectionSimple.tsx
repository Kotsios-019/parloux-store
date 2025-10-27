'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CollectionLayer {
  id: string;
  image: string;
  alt: string;
  opacity: number;
  zIndex: number;
}

const collectionLayers: CollectionLayer[] = [
  {
    id: 'fabric-texture',
    image: '/images/collection-essence/fabric-texture.jpg',
    alt: 'Luxury fabric texture',
    opacity: 0.4,
    zIndex: 1
  },
  {
    id: 'color-gradient',
    image: '/images/collection-essence/color-gradient.jpg',
    alt: 'AW25 color palette',
    opacity: 0.6,
    zIndex: 2
  },
  {
    id: 'abstract-texture',
    image: '/images/collection-essence/abstract-texture.jpg',
    alt: 'Abstract luxury texture',
    opacity: 0.3,
    zIndex: 3
  }
];

const collectionTexts = [
  {
    id: 'season',
    text: 'AW25',
    className: 'text-6xl md:text-8xl lg:text-9xl font-cormorant font-light text-ivory-white',
    delay: 0.2
  },
  {
    id: 'title',
    text: 'Nocturnal Grace',
    className: 'text-4xl md:text-6xl lg:text-7xl font-cormorant font-medium text-soft-gold',
    delay: 0.6
  },
  {
    id: 'subtitle',
    text: 'Where shadows dance with silk',
    className: 'text-lg md:text-xl lg:text-2xl font-josefin font-light text-ivory-white/90',
    delay: 1.0
  },
  {
    id: 'description',
    text: 'A collection that whispers of midnight elegance, where every piece tells a story of refined darkness and luminous beauty.',
    className: 'text-sm md:text-base lg:text-lg font-josefin font-light text-ivory-white/80 max-w-2xl',
    delay: 1.4
  }
];

export default function EssenceOfTheCollectionSimple() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [mounted]);

  if (!mounted) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-deep-black">
        <div className="absolute inset-0 bg-gradient-to-br from-deep-black via-elegant-base to-deep-black" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-6xl font-cormorant font-light text-ivory-white mb-4">AW25</h2>
            <h3 className="text-4xl font-cormorant font-medium text-soft-gold">Nocturnal Grace</h3>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-deep-black">
      {/* Layered Background Images */}
      {collectionLayers.map((layer) => (
        <div
          key={layer.id}
          className="absolute inset-0"
          style={{ 
            zIndex: layer.zIndex,
            opacity: layer.opacity
          }}
        >
          <Image
            src={layer.image}
            alt={layer.alt}
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="absolute inset-0 bg-gradient-to-br from-deep-black via-elegant-base to-deep-black opacity-${Math.round(layer.opacity * 100)}"></div>
                `;
              }
            }}
          />
        </div>
      ))}

      {/* Gradient Overlays for Cinematic Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-transparent to-deep-black/60 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-deep-black/40 via-transparent to-deep-black/40 z-10" />

      {/* Text Overlays with Cinematic Animations */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center px-4 sm:px-6 lg:px-8">
          {/* Season Text - Fade In Up */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1.2, delay: collectionTexts[0].delay, ease: "easeOut" }}
            className="mb-4"
          >
            <h2 className={collectionTexts[0].className}>
              {collectionTexts[0].text}
            </h2>
          </motion.div>

          {/* Title Text - Clip Path Reveal */}
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            animate={isVisible ? { opacity: 1, clipPath: "inset(0 0% 0 0)" } : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            transition={{ duration: 1.5, delay: collectionTexts[1].delay, ease: "easeInOut" }}
            className="mb-6"
          >
            <h3 className={collectionTexts[1].className}>
              {collectionTexts[1].text}
            </h3>
          </motion.div>

          {/* Subtitle Text - Opacity Strobe */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { 
              opacity: [0, 1, 0.7, 1, 0.8, 1],
            } : { opacity: 0 }}
            transition={{ 
              duration: 2, 
              delay: collectionTexts[2].delay, 
              ease: "easeInOut",
              times: [0, 0.2, 0.4, 0.6, 0.8, 1]
            }}
            className="mb-8"
          >
            <p className={collectionTexts[2].className}>
              {collectionTexts[2].text}
            </p>
          </motion.div>

          {/* Description Text - Fade In Up */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: collectionTexts[3].delay, ease: "easeOut" }}
            className="max-w-4xl mx-auto mb-12"
          >
            <p className={collectionTexts[3].className}>
              {collectionTexts[3].text}
            </p>
          </motion.div>

          {/* Collection Preview Images */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="mb-8"
          >
            <div className="flex justify-center gap-4 px-4">
              {[
                { src: '/images/collection-essence/preview-1.jpg', alt: 'Evening Gown Preview' },
                { src: '/images/collection-essence/preview-2.jpg', alt: 'Tailored Blazer Preview' },
                { src: '/images/collection-essence/preview-3.jpg', alt: 'Luxury Accessory Preview' }
              ].map((image, index) => (
                <motion.div
                  key={index}
                  className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-soft-gold/30 shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, delay: 2 + index * 0.1 }}
                  whileHover={{ scale: 1.1, zIndex: 10 }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-br from-soft-gold/20 to-elegant-base/30 flex items-center justify-center">
                            <span class="text-2xl text-soft-gold">${index === 0 ? '👗' : index === 1 ? '👔' : '💎'}</span>
                          </div>
                        `;
                      }
                    }}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-soft-gold/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-xs font-josefin font-medium">View</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 2.2 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center text-center mx-auto max-w-md">
              <a
                href="/collections/aw25"
                className="px-8 py-3 bg-soft-gold text-deep-black font-josefin font-medium rounded-none transition-all duration-300 hover:bg-bright-gold hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap"
              >
                View Collection
              </a>
              <a
                href="/collections/new"
                className="px-8 py-3 bg-transparent text-ivory-white border border-ivory-white/30 font-josefin font-medium rounded-none transition-all duration-300 hover:bg-ivory-white/10 hover:border-ivory-white/60 backdrop-blur-sm whitespace-nowrap"
              >
                Shop New In
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Luxury Elements */}
      <div className="absolute inset-0 pointer-events-none z-15">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              opacity: 0, 
              scale: 0,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)
            }}
            animate={isVisible ? {
              opacity: [0, 0.3, 0],
              scale: [0, 1, 0],
              y: [0, -100 - Math.random() * 200, -300],
              x: [0, Math.random() * 100 - 50, Math.random() * 200 - 100]
            } : { opacity: 0 }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut"
            }}
          >
            <div 
              className="w-1 h-1 bg-soft-gold/60 rounded-full"
              style={{
                filter: 'blur(0.5px)',
                boxShadow: '0 0 10px rgba(201, 163, 78, 0.5)'
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Cinematic Vignette Effects */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-deep-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-deep-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-black/20 via-transparent to-deep-black/20" />
        <div className="absolute inset-0 bg-gradient-to-l from-deep-black/20 via-transparent to-deep-black/20" />
      </div>

    </section>
  );
}
