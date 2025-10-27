'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LuxuryBadge {
  id: string;
  label: string;
  sublabel?: string;
  href?: string;
  position: {
    top: string;
    left?: string;
    right?: string;
  };
  delay: number;
  variant: 'premium' | 'elegant' | 'minimal';
  icon?: string;
}

const luxuryBadges: LuxuryBadge[] = [
  {
    id: 'collection',
    label: 'AW25',
    sublabel: 'Limited Collection',
    href: '/collections/new',
    position: { top: '15%', left: '5%' },
    delay: 0.3,
    variant: 'premium',
    icon: '✨'
  },
  {
    id: 'craftsmanship',
    label: 'Hand-finished',
    sublabel: 'Artisan Craft',
    href: '/about/craft',
    position: { top: '30%', right: '8%' },
    delay: 0.8,
    variant: 'elegant',
    icon: '👑'
  },
  {
    id: 'sustainability',
    label: 'Sustainable',
    sublabel: 'Ethically sourced',
    position: { top: '55%', left: '12%' },
    delay: 1.3,
    variant: 'minimal',
    icon: '🌿'
  },
  {
    id: 'exclusivity',
    label: 'Exclusive',
    sublabel: 'By invitation',
    position: { top: '70%', right: '15%' },
    delay: 1.8,
    variant: 'premium',
    icon: '💎'
  }
];

const badgeVariants = {
  premium: {
    background: 'bg-gradient-to-br from-soft-gold/30 via-soft-gold/10 to-champagne-nude/20',
    border: 'border-soft-gold/40',
    glow: 'shadow-soft-gold/20',
    text: 'text-ivory-white'
  },
  elegant: {
    background: 'bg-gradient-to-br from-white/15 via-white/5 to-transparent',
    border: 'border-white/30',
    glow: 'shadow-white/10',
    text: 'text-ivory-white/95'
  },
  minimal: {
    background: 'bg-gradient-to-br from-elegant-base/20 via-transparent to-champagne-nude/10',
    border: 'border-elegant-base/30',
    glow: 'shadow-elegant-base/15',
    text: 'text-ivory-white/90'
  }
};

export default function LuxuryGlassBadges() {
  const [mounted, setMounted] = useState(false);
  const [magneticPositions, setMagneticPositions] = useState<Record<string, { x: number; y: number }>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const createMagneticHandlers = (badgeId: string, strength: number = 0.06) => {
    const onMove = (e: React.MouseEvent) => {
      const { currentTarget } = e;
      const rect = currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      setMagneticPositions(prev => ({
        ...prev,
        [badgeId]: {
          x: x * strength,
          y: y * strength,
        }
      }));
    };

    const onLeave = () => {
      setMagneticPositions(prev => ({
        ...prev,
        [badgeId]: { x: 0, y: 0 }
      }));
    };

    return { onMove, onLeave };
  };

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
      {luxuryBadges.map((badge) => {
        const variant = badgeVariants[badge.variant];
        const { onMove, onLeave } = createMagneticHandlers(badge.id, 0.06);
        const position = magneticPositions[badge.id] || { x: 0, y: 0 };
        
        return (
          <motion.div
            key={badge.id}
            initial={{ 
              opacity: 0, 
              scale: 0.7,
              y: 30,
              rotateY: -15
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: 0,
              rotateY: 0
            }}
            transition={{
              duration: 1.2,
              delay: badge.delay,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{ 
              scale: 1.08,
              y: -8,
              rotateY: 5,
              transition: { duration: 0.4 }
            }}
            className="absolute pointer-events-auto group"
            style={{
              top: badge.position.top,
              left: badge.position.left,
              right: badge.position.right,
            }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              style={{ x: position.x, y: position.y }}
            >
              {/* Main glass container */}
              <div className={`
                relative backdrop-blur-xl rounded-3xl px-6 py-4 shadow-2xl
                ${variant.background} ${variant.border} border
                ${variant.glow} shadow-lg
                group-hover:shadow-2xl group-hover:shadow-soft-gold/25
                transition-all duration-500
              `}>
                
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-soft-gold/0 via-soft-gold/20 to-soft-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-1">
                    {badge.icon && (
                      <motion.span 
                        className="text-xl opacity-80 group-hover:opacity-100 transition-opacity"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: badge.delay }}
                      >
                        {badge.icon}
                      </motion.span>
                    )}
                    <span className={`font-cormorant font-medium text-lg ${variant.text} group-hover:text-ivory-white transition-colors`}>
                      {badge.label}
                    </span>
                  </div>
                  
                  {badge.sublabel && (
                    <p className={`font-josefin font-light text-xs ${variant.text} opacity-80 group-hover:opacity-100 transition-opacity`}>
                      {badge.sublabel}
                    </p>
                  )}
                </div>

                {/* Floating micro-particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-0.5 h-0.5 bg-soft-gold/60 rounded-full"
                      animate={{
                        y: [0, -15, 0],
                        x: [0, Math.random() * 10 - 5, 0],
                        opacity: [0, 0.8, 0],
                        scale: [0.5, 1.5, 0.5]
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.8
                      }}
                      style={{
                        left: `${20 + i * 20}%`,
                        top: `${20 + i * 15}%`
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Clickable area for links */}
              {badge.href && (
                <a
                  href={badge.href}
                  className="absolute inset-0 z-20 rounded-3xl"
                  aria-label={`Learn more about ${badge.label}`}
                />
              )}
            </motion.div>
          </motion.div>
        );
      })}

      {/* Ambient luxury particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`luxury-particle-${i}`}
            className="absolute w-1 h-1 bg-soft-gold/30 rounded-full"
            animate={{
              y: [0, -120, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0, 0.6, 0],
              scale: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${70 + Math.random() * 30}%`
            }}
          />
        ))}
      </div>
    </div>
  );
}
