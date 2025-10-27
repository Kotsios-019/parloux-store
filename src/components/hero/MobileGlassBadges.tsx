'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface MobileBadge {
  id: string;
  label: string;
  sublabel?: string;
  href?: string;
  icon?: string;
}

const mobileBadges: MobileBadge[] = [
  {
    id: 'limited',
    label: 'AW25 • Limited',
    href: '/collections/new',
    icon: '✨'
  },
  {
    id: 'handcrafted',
    label: 'Hand-finished',
    href: '/about/craft',
    icon: '👑'
  },
  {
    id: 'sustainable',
    label: 'Sustainable',
    icon: '🌿'
  },
  {
    id: 'exclusive',
    label: 'Exclusive',
    icon: '💎'
  }
];

export default function MobileGlassBadges() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="lg:hidden mt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="flex flex-wrap justify-center gap-3"
      >
        {mobileBadges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
            className="group"
          >
            <div className="relative">
              {/* Glass background */}
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 shadow-lg">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-soft-gold/20 via-transparent to-champagne-nude/10 rounded-xl" />
                
                {/* Content */}
                <div className="relative z-10 flex items-center space-x-2">
                  {badge.icon && (
                    <span className="text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                      {badge.icon}
                    </span>
                  )}
                  <span className="text-ivory-white/90 font-josefin font-light text-xs group-hover:text-ivory-white transition-colors">
                    {badge.label}
                  </span>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-soft-gold/0 via-soft-gold/20 to-soft-gold/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Clickable area for links */}
              {badge.href && (
                <a
                  href={badge.href}
                  className="absolute inset-0 z-20 rounded-xl"
                  aria-label={`Learn more about ${badge.label}`}
                />
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
