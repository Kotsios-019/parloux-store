'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface MarqueeItem {
  text: string;
  icon?: string;
  highlight?: boolean;
}

const marqueeItems: MarqueeItem[] = [
  { text: "Handcrafted in Italy", icon: "🇮🇹", highlight: true },
  { text: "Sustainable Materials", icon: "🌿" },
  { text: "Limited Editions", icon: "✨", highlight: true },
  { text: "VIP Access", icon: "👑" },
  { text: "Artisan Crafted", icon: "🎨" },
  { text: "Exclusive Designs", icon: "💎", highlight: true },
  { text: "Ethically Sourced", icon: "🤝" },
  { text: "Timeless Elegance", icon: "⏰" },
  { text: "Premium Quality", icon: "⭐", highlight: true },
  { text: "Made to Last", icon: "🔒" },
  { text: "Luxury Womenswear", icon: "👗" },
  { text: "Sophisticated Style", icon: "✨" }
];

export default function BrandMarquee() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="py-16 bg-gradient-to-r from-champagne-nude/20 to-elegant-base/20 dark:from-deep-black/30 dark:to-deep-black/50">
        <div className="overflow-hidden">
          <div className="flex space-x-8">
            {marqueeItems.map((item, index) => (
              <div key={index} className="flex-shrink-0 flex items-center space-x-3">
                {item.icon && <span className="text-2xl">{item.icon}</span>}
                <span className="text-lg font-josefin text-font-secondary whitespace-nowrap">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-champagne-nude/20 to-elegant-base/20 dark:from-deep-black/30 dark:to-deep-black/50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,163,78,0.1),transparent_50%)]" />
      </div>

      {/* Main Marquee */}
      <div className="relative">
        {/* First Row - Forward */}
        <motion.div
          className="flex space-x-8 mb-4"
          animate={{
            x: [0, -100 * marqueeItems.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {marqueeItems.map((item, index) => (
            <motion.div
              key={`row1-${index}`}
              className="flex-shrink-0 flex items-center space-x-3 group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {item.icon && (
                <motion.span 
                  className="text-2xl"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    delay: index * 0.2
                  }}
                >
                  {item.icon}
                </motion.span>
              )}
              <span className={`text-lg font-josefin whitespace-nowrap transition-colors duration-300 ${
                item.highlight 
                  ? 'text-soft-gold font-semibold' 
                  : 'text-font-secondary group-hover:text-soft-gold'
              }`}>
                {item.text}
              </span>
            </motion.div>
          ))}
          {/* Duplicate for seamless loop */}
          {marqueeItems.map((item, index) => (
            <motion.div
              key={`row1-dup-${index}`}
              className="flex-shrink-0 flex items-center space-x-3 group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {item.icon && (
                <motion.span 
                  className="text-2xl"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    delay: (index + marqueeItems.length) * 0.2
                  }}
                >
                  {item.icon}
                </motion.span>
              )}
              <span className={`text-lg font-josefin whitespace-nowrap transition-colors duration-300 ${
                item.highlight 
                  ? 'text-soft-gold font-semibold' 
                  : 'text-font-secondary group-hover:text-soft-gold'
              }`}>
                {item.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Second Row - Reverse */}
        <motion.div
          className="flex space-x-8"
          animate={{
            x: [-100 * marqueeItems.length, 0],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            },
          }}
        >
          {marqueeItems.slice().reverse().map((item, index) => (
            <motion.div
              key={`row2-${index}`}
              className="flex-shrink-0 flex items-center space-x-3 group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {item.icon && (
                <motion.span 
                  className="text-2xl"
                  animate={{ 
                    rotate: [0, -5, 5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 4,
                    delay: index * 0.3
                  }}
                >
                  {item.icon}
                </motion.span>
              )}
              <span className={`text-lg font-josefin whitespace-nowrap transition-colors duration-300 ${
                item.highlight 
                  ? 'text-soft-gold font-semibold' 
                  : 'text-font-secondary group-hover:text-soft-gold'
              }`}>
                {item.text}
              </span>
            </motion.div>
          ))}
          {/* Duplicate for seamless loop */}
          {marqueeItems.slice().reverse().map((item, index) => (
            <motion.div
              key={`row2-dup-${index}`}
              className="flex-shrink-0 flex items-center space-x-3 group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {item.icon && (
                <motion.span 
                  className="text-2xl"
                  animate={{ 
                    rotate: [0, -5, 5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 4,
                    delay: (index + marqueeItems.length) * 0.3
                  }}
                >
                  {item.icon}
                </motion.span>
              )}
              <span className={`text-lg font-josefin whitespace-nowrap transition-colors duration-300 ${
                item.highlight 
                  ? 'text-soft-gold font-semibold' 
                  : 'text-font-secondary group-hover:text-soft-gold'
              }`}>
                {item.text}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-soft-gold/30 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-champagne-nude/20 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-elegant-base/20 to-transparent pointer-events-none" />
    </section>
  );
}
