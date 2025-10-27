'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface TimelineMilestone {
  year: string;
  title: string;
  content: React.ReactNode;
  image: string;
  color: 'bw' | 'color';
}

const timelineData: TimelineMilestone[] = [
  {
    year: "2018",
    title: "The Vision",
    color: 'bw',
    image: "/images/timeline/vision.jpg",
    content: (
      <div className="space-y-4">
        <p className="text-font-secondary dark:text-font-secondary-dark font-josefin leading-relaxed">
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
    year: "2019",
    title: "First Collection",
    color: 'bw',
    image: "/images/timeline/first-collection.jpg",
    content: (
      <div className="space-y-4">
        <p className="text-font-secondary dark:text-font-secondary-dark font-josefin leading-relaxed">
          Our debut collection featured just 12 pieces, each hand-sewn and carefully 
          curated. We worked with local artisans and sourced the finest silks from 
          Como, Italy. Every piece told a story of dedication and passion.
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-cormorant font-bold text-soft-gold">12</div>
            <div className="text-font-secondary dark:text-font-secondary-dark">Pieces</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-cormorant font-bold text-soft-gold">3</div>
            <div className="text-font-secondary dark:text-font-secondary-dark">Months</div>
          </div>
        </div>
      </div>
    )
  },
  {
    year: "2021",
    title: "Recognition",
    color: 'color',
    image: "/images/timeline/recognition.jpg",
    content: (
      <div className="space-y-4">
        <p className="text-font-secondary dark:text-font-secondary-dark font-josefin leading-relaxed">
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
          <span className="px-3 py-1 bg-soft-gold/20 text-soft-gold text-xs font-josefin rounded-full">
            Ethical Sourcing
          </span>
        </div>
      </div>
    )
  },
  {
    year: "2023",
    title: "Expansion",
    color: 'color',
    image: "/images/timeline/expansion.jpg",
    content: (
      <div className="space-y-4">
        <p className="text-font-secondary dark:text-font-secondary-dark font-josefin leading-relaxed">
          Opening our flagship atelier in Milan, we expanded our reach while 
          maintaining our core values. Our team grew to include master craftsmen 
          from across Europe, each bringing their unique expertise.
        </p>
        <div className="bg-gradient-to-r from-soft-gold/10 to-bright-gold/10 p-4 rounded-lg">
          <p className="text-sm font-josefin text-font-secondary dark:text-font-secondary-dark">
            <strong>New Locations:</strong> Milan, Paris, London
          </p>
        </div>
      </div>
    )
  },
  {
    year: "2024",
    title: "The Future",
    color: 'color',
    image: "/images/timeline/future.jpg",
    content: (
      <div className="space-y-4">
        <p className="text-font-secondary dark:text-font-secondary-dark font-josefin leading-relaxed">
          Today, ParlouX continues to evolve, embracing innovation while honoring 
          tradition. We're committed to creating pieces that will be treasured 
          for generations, each one a testament to the art of slow luxury.
        </p>
        <div className="text-center">
          <div className="text-3xl font-cormorant font-bold text-soft-gold mb-2">
            The Journey Continues
          </div>
          <p className="text-sm font-josefin text-font-secondary dark:text-font-secondary-dark">
            Crafting tomorrow's heirlooms today
          </p>
        </div>
      </div>
    )
  }
];

export default function TimelineOfTheAtelierSimple() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="py-20 bg-ivory-white dark:bg-deep-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-6">Timeline of the Atelier</h2>
            <p className="body-large text-font-secondary max-w-3xl mx-auto">
              Our journey from a small atelier in Athens to a global luxury brand
            </p>
          </div>
          <div className="space-y-8">
            {timelineData.map((milestone, index) => (
              <div key={index} className="flex items-center space-x-6">
                <div className="w-4 h-4 bg-soft-gold rounded-full"></div>
                <div>
                  <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white">
                    {milestone.year} - {milestone.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-ivory-white dark:bg-deep-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <img
          src="/images/timeline/atelier-background.jpg"
          alt="Atelier background"
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="absolute inset-0 bg-gradient-to-br from-champagne-nude/20 to-elegant-base/20"></div>
              `;
            }
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-secondary mb-6">Timeline of the Atelier</h2>
          <p className="body-large text-font-secondary dark:text-font-secondary-dark max-w-3xl mx-auto">
            Our journey from a small atelier in Athens to a global luxury brand. 
            Each milestone represents our commitment to craftsmanship, innovation, and timeless elegance.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-soft-gold/30 to-transparent"></div>

          {/* Timeline Items */}
          <div className="space-y-16">
            {timelineData.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative flex items-start space-x-8"
              >
                {/* Timeline Dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 bg-ivory-white dark:bg-deep-black border-4 border-soft-gold rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-soft-gold rounded-full"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-6">
                  {/* Year Badge */}
                  <div className="flex items-center space-x-4">
                    <span className="px-4 py-2 bg-soft-gold text-deep-black text-sm font-josefin font-semibold rounded-full">
                      {milestone.year}
                    </span>
                    <h3 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white">
                      {milestone.title}
                    </h3>
                  </div>

                  {/* Image */}
                  <div className="relative h-64 w-full rounded-2xl overflow-hidden">
                    <img
                      src={milestone.image}
                      alt={milestone.title}
                      className={`w-full h-full object-cover transition-all duration-1000 ${
                        milestone.color === 'bw' 
                          ? 'grayscale hover:grayscale-0' 
                          : 'grayscale-0'
                      }`}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="h-full w-full bg-gradient-to-br from-champagne-nude/30 to-elegant-base/40 rounded-2xl flex items-center justify-center">
                              <div class="text-center">
                                <div class="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                                  <span class="text-2xl text-soft-gold">${milestone.year}</span>
                                </div>
                                <h3 class="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
                                  ${milestone.title}
                                </h3>
                              </div>
                            </div>
                          `;
                        }
                      }}
                    />
                    
                    {/* Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    {milestone.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-soft-gold/30 rounded-full"
              animate={{
                y: [0, -40, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
