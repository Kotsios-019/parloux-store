'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "The craftsmanship is absolutely exceptional. Every detail is perfect, and the fit is like it was made just for me. I feel confident and elegant every time I wear my ParlouX pieces.",
    name: "Elena Konstantinidis",
    designation: "Fashion Editor, Vogue Greece",
    src: "/images/testimonials/elena.jpg"
  },
  {
    quote: "ParlouX has redefined luxury womenswear for me. The attention to detail and the quality of materials is unmatched. These pieces will be in my wardrobe for years to come.",
    name: "Sophia Papadopoulos",
    designation: "Art Director, Athens",
    src: "/images/testimonials/sophia.jpg"
  },
  {
    quote: "I've never experienced such personalized service and exquisite quality. Each piece tells a story of elegance and sophistication. ParlouX has become my go-to for special occasions.",
    name: "Maria Alexandrou",
    designation: "Gallery Owner, Mykonos",
    src: "/images/testimonials/maria.jpg"
  },
  {
    quote: "The sustainable approach combined with timeless design is exactly what I was looking for. These pieces are not just clothes, they're investments in quality and style.",
    name: "Anna Petrou",
    designation: "Sustainability Consultant",
    src: "/images/testimonials/anna.jpg"
  },
  {
    quote: "ParlouX understands the modern woman's need for both elegance and comfort. Their pieces make me feel powerful and feminine at the same time. Absolutely love the brand.",
    name: "Katerina Dimitriou",
    designation: "CEO, Tech Startup",
    src: "/images/testimonials/katerina.jpg"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [mounted]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (!mounted) {
    return (
      <section className="py-20 bg-gradient-to-br from-champagne-nude/10 to-elegant-base/10 dark:from-deep-black/20 dark:to-deep-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-secondary mb-6">What Our Clients Say</h2>
            <p className="body-large text-font-secondary max-w-3xl mx-auto">
              Discover why discerning women choose ParlouX for their most important moments.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 w-full bg-gradient-to-br from-champagne-nude/20 to-elegant-base/20 rounded-3xl"></div>
            <div className="space-y-6">
              <blockquote className="text-lg font-josefin text-font-secondary leading-relaxed italic">
                "The craftsmanship is absolutely exceptional..."
              </blockquote>
              <div>
                <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white">
                  Elena Konstantinidis
                </h3>
                <p className="text-sm font-josefin text-soft-gold">
                  Fashion Editor, Vogue Greece
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-champagne-nude/10 to-elegant-base/10 dark:from-deep-black/20 dark:to-deep-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-secondary mb-6">What Our Clients Say</h2>
          <p className="body-large text-font-secondary max-w-3xl mx-auto">
            Discover why discerning women choose ParlouX for their most important moments. 
            Each piece is crafted with love, worn with confidence, and treasured for a lifetime.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Image Side */}
          <div className="relative h-96 w-full">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative h-full w-full"
            >
              <Image
                src={testimonials[activeIndex].src}
                alt={testimonials[activeIndex].name}
                fill
                className="object-cover rounded-3xl shadow-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="h-full w-full bg-gradient-to-br from-champagne-nude/30 to-elegant-base/40 rounded-3xl flex items-center justify-center">
                        <div class="text-center">
                          <div class="w-24 h-24 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span class="text-4xl text-soft-gold">👤</span>
                          </div>
                          <h3 class="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
                            ${testimonials[activeIndex].name}
                          </h3>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
            </motion.div>

            {/* Floating Quote Marks */}
            <motion.div
              className="absolute -top-4 -left-4 text-6xl text-soft-gold/20 font-cormorant"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              "
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -right-4 text-6xl text-soft-gold/20 font-cormorant"
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -2, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            >
              "
            </motion.div>
          </div>

          {/* Content Side */}
          <div className="space-y-8">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6"
            >
              <blockquote className="text-lg font-josefin text-font-secondary leading-relaxed italic">
                "{testimonials[activeIndex].quote}"
              </blockquote>
              
              <div className="border-l-2 border-soft-gold/30 pl-4">
                <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-1">
                  {testimonials[activeIndex].name}
                </h3>
                <p className="text-sm font-josefin text-soft-gold">
                  {testimonials[activeIndex].designation}
                </p>
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? 'bg-soft-gold scale-125' 
                        : 'bg-elegant-base/30 hover:bg-elegant-base/50'
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex space-x-3">
                <motion.button
                  onClick={handlePrev}
                  className="w-10 h-10 bg-ivory-white dark:bg-deep-black border border-elegant-base/20 rounded-full flex items-center justify-center hover:bg-soft-gold/10 transition-colors duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-4 h-4 text-font-secondary group-hover:text-soft-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                <motion.button
                  onClick={handleNext}
                  className="w-10 h-10 bg-ivory-white dark:bg-deep-black border border-elegant-base/20 rounded-full flex items-center justify-center hover:bg-soft-gold/10 transition-colors duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-4 h-4 text-font-secondary group-hover:text-soft-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-sm font-josefin text-font-secondary">
              ★★★★★ 4.9/5 Rating
            </div>
            <div className="w-px h-4 bg-elegant-base/30"></div>
            <div className="text-sm font-josefin text-font-secondary">
              500+ Happy Customers
            </div>
            <div className="w-px h-4 bg-elegant-base/30"></div>
            <div className="text-sm font-josefin text-font-secondary">
              Featured in Vogue Greece
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
