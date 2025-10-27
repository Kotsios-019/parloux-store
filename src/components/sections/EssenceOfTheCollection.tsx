'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

interface CollectionLayer {
  id: string;
  image: string;
  alt: string;
  speed: number;
  opacity: number;
  zIndex: number;
  position: 'top' | 'center' | 'bottom';
}

const collectionLayers: CollectionLayer[] = [
  {
    id: 'fabric-texture',
    image: '/images/collection-essence/fabric-texture.jpg',
    alt: 'Luxury fabric texture',
    speed: 0.3,
    opacity: 0.4,
    zIndex: 1,
    position: 'bottom'
  },
  {
    id: 'color-gradient',
    image: '/images/collection-essence/color-gradient.jpg',
    alt: 'AW25 color palette',
    speed: 0.5,
    opacity: 0.6,
    zIndex: 2,
    position: 'center'
  },
  {
    id: 'abstract-texture',
    image: '/images/collection-essence/abstract-texture.jpg',
    alt: 'Abstract luxury texture',
    speed: 0.7,
    opacity: 0.3,
    zIndex: 3,
    position: 'top'
  }
];

const collectionTexts = [
  {
    id: 'season',
    text: 'AW25',
    className: 'text-6xl md:text-8xl lg:text-9xl font-cormorant font-light text-ivory-white',
    delay: 0.2,
    animation: 'fadeInUp'
  },
  {
    id: 'title',
    text: 'Nocturnal Grace',
    className: 'text-4xl md:text-6xl lg:text-7xl font-cormorant font-medium text-soft-gold',
    delay: 0.6,
    animation: 'clipPathReveal'
  },
  {
    id: 'subtitle',
    text: 'Where shadows dance with silk',
    className: 'text-lg md:text-xl lg:text-2xl font-josefin font-light text-ivory-white/90',
    delay: 1.0,
    animation: 'opacityStrobe'
  },
  {
    id: 'description',
    text: 'A collection that whispers of midnight elegance, where every piece tells a story of refined darkness and luminous beauty.',
    className: 'text-sm md:text-base lg:text-lg font-josefin font-light text-ivory-white/80 max-w-2xl',
    delay: 1.4,
    animation: 'fadeInUp'
  }
];

export default function EssenceOfTheCollection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms for each layer
  const fabricY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const gradientY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const abstractY = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);
  
  // Text animation triggers
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["50%", "0%", "0%", "-50%"]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
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
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-deep-black"
    >
      {/* Layered Background Images with Parallax */}
      {collectionLayers.map((layer, index) => {
        let yTransform;
        switch (layer.id) {
          case 'fabric-texture':
            yTransform = fabricY;
            break;
          case 'color-gradient':
            yTransform = gradientY;
            break;
          case 'abstract-texture':
            yTransform = abstractY;
            break;
          default:
            yTransform = fabricY;
        }

        return (
          <motion.div
            key={layer.id}
            className="absolute inset-0"
            style={{ 
              y: yTransform,
              zIndex: layer.zIndex,
              opacity: layer.opacity
            }}
          >
            <Image
              src={layer.image}
              alt={layer.alt}
              fill
              className="object-cover"
              priority={index === 0}
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
          </motion.div>
        );
      })}

      {/* Gradient Overlays for Cinematic Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-transparent to-deep-black/60 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-deep-black/40 via-transparent to-deep-black/40 z-10" />

      {/* Text Overlays with Cinematic Animations */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <motion.div
          className="text-center px-4 sm:px-6 lg:px-8"
          style={{
            opacity: textOpacity,
            y: textY
          }}
        >
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
            className="max-w-4xl mx-auto"
          >
            <p className={collectionTexts[3].className}>
              {collectionTexts[3].text}
            </p>
          </motion.div>
        </motion.div>
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
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
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

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ivory-white/70 text-sm flex flex-col items-center z-20"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <span className="mb-2 font-josefin">Discover the Collection</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
