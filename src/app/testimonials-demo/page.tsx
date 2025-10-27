'use client';

import { AnimatedTestimonials } from '@/components/ui/AnimatedTestimonials';
import Testimonials from '@/components/sections/Testimonials';
import { motion } from 'framer-motion';

const testimonials = [
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

export default function TestimonialsDemoPage() {
  return (
    <div className="min-h-screen bg-ivory-white dark:bg-deep-black">
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-8 text-center">
          Testimonials Demo
        </h1>
        
        <div className="space-y-16">
          {/* Main Testimonials Section */}
          <section>
            <h2 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-8 text-center">
              ParlouX Branded Testimonials
            </h2>
            <div className="border border-elegant-base/20 rounded-lg overflow-hidden">
              <Testimonials />
            </div>
            <p className="text-sm text-font-secondary mt-4 text-center">
              Custom styled testimonials with ParlouX branding and realistic customer feedback
            </p>
          </section>

          {/* Raw Animated Testimonials */}
          <section>
            <h2 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-8 text-center">
              Raw Animated Testimonials Component
            </h2>
            <div className="bg-gradient-to-br from-champagne-nude/10 to-elegant-base/10 p-8 rounded-lg">
              <AnimatedTestimonials 
                testimonials={testimonials} 
                autoplay={true}
              />
            </div>
            <p className="text-sm text-font-secondary mt-4 text-center">
              Original Aceternity UI component with auto-play and smooth animations
            </p>
          </section>

          {/* Features Showcase */}
          <section className="bg-gradient-to-r from-champagne-nude/10 to-elegant-base/10 p-8 rounded-lg">
            <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 text-center">
              Testimonial Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎭</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Animated Transitions
                </h4>
                <p className="text-sm text-font-secondary">
                  Smooth image transitions with 3D rotation effects
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Word-by-Word Animation
                </h4>
                <p className="text-sm text-font-secondary">
                  Text appears word by word with blur effects
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🔄</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Auto-Play
                </h4>
                <p className="text-sm text-font-secondary">
                  Automatic cycling through testimonials every 5 seconds
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎨</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Custom Branding
                </h4>
                <p className="text-sm text-font-secondary">
                  ParlouX colors, fonts, and luxury aesthetic
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Responsive Design
                </h4>
                <p className="text-sm text-font-secondary">
                  Adapts beautifully to all screen sizes
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-soft-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💫</span>
                </div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-2">
                  Floating Elements
                </h4>
                <p className="text-sm text-font-secondary">
                  Quote marks and particles for visual interest
                </p>
              </div>
            </div>
          </section>

          {/* Customer Testimonials */}
          <section>
            <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 text-center">
              Featured Customer Testimonials
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-champagne-nude/5 to-elegant-base/5 p-6 rounded-lg border border-elegant-base/10"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-soft-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-soft-gold font-cormorant text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <blockquote className="text-font-secondary font-josefin italic mb-3">
                        "{testimonial.quote}"
                      </blockquote>
                      <div>
                        <h4 className="font-cormorant font-semibold text-deep-black dark:text-ivory-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-soft-gold font-josefin">
                          {testimonial.designation}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Trust Indicators */}
          <section className="bg-gradient-to-r from-soft-gold/10 to-bright-gold/10 p-8 rounded-lg">
            <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 text-center">
              Social Proof & Trust Indicators
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-cormorant font-bold text-soft-gold mb-2">4.9/5</div>
                <div className="text-sm font-josefin text-font-secondary">Average Rating</div>
                <div className="text-xs text-font-secondary mt-1">★★★★★</div>
              </div>
              <div>
                <div className="text-3xl font-cormorant font-bold text-soft-gold mb-2">500+</div>
                <div className="text-sm font-josefin text-font-secondary">Happy Customers</div>
                <div className="text-xs text-font-secondary mt-1">Verified Reviews</div>
              </div>
              <div>
                <div className="text-3xl font-cormorant font-bold text-soft-gold mb-2">Vogue</div>
                <div className="text-sm font-josefin text-font-secondary">Featured In</div>
                <div className="text-xs text-font-secondary mt-1">Greece Edition</div>
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
                <strong>Auto-play</strong> - Testimonials cycle automatically every 5 seconds
              </p>
              <p className="text-font-secondary">
                <strong>Manual Navigation</strong> - Use arrow buttons to navigate manually
              </p>
              <p className="text-font-secondary">
                <strong>Hover Effects</strong> - Images have subtle hover animations
              </p>
              <p className="text-font-secondary">
                <strong>Word Animation</strong> - Text appears word by word with blur effects
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
