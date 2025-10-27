'use client';

import { CardContainer, CardBody, CardItem } from '@/components/ui/3DCard';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ThreeDCardsDemoPage() {
  return (
    <div className="min-h-screen bg-ivory-white dark:bg-deep-black p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-8 text-center">
          3D Cards Demo
        </h1>
        
        <div className="space-y-16">
          {/* Single Card Demo */}
          <section>
            <h2 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-8 text-center">
              Single 3D Card
            </h2>
            <CardContainer className="inter-var">
              <CardBody className="bg-transparent relative group">
                {/* Main Card */}
                <CardItem
                  translateZ="50"
                  className="w-full h-full"
                >
                  <div className="relative w-80 h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-champagne-nude/20 to-elegant-base/20 dark:from-deep-black/30 dark:to-deep-black/50 border border-elegant-base/20 dark:border-elegant-base/30">
                    {/* Product Image */}
                    <div className="relative w-full h-64 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-soft-gold/20 to-champagne-nude/30 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-soft-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-deep-black font-cormorant text-xl">D</span>
                          </div>
                          <p className="text-font-secondary font-josefin">Dress</p>
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <div className="mb-2">
                        <span className="text-xs font-josefin text-soft-gold uppercase tracking-wider">
                          Dresses
                        </span>
                      </div>
                      <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-2">
                        Elegant Evening Dress
                      </h3>
                      <p className="text-sm text-font-secondary mb-4">
                        Timeless elegance for special occasions
                      </p>
                      
                      {/* Price */}
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
                          €299
                        </span>
                        <span className="text-sm text-font-secondary line-through">
                          €399
                        </span>
                      </div>
                    </div>
                  </div>
                </CardItem>

                {/* Floating Elements */}
                <CardItem
                  translateX={-10}
                  translateY={-10}
                  translateZ="20"
                  className="absolute top-4 right-4"
                >
                  <div className="w-8 h-8 bg-soft-gold/20 rounded-full flex items-center justify-center">
                    <span className="text-soft-gold text-sm">♡</span>
                  </div>
                </CardItem>

                <CardItem
                  translateX={10}
                  translateY={10}
                  translateZ="30"
                  className="absolute bottom-4 left-4"
                >
                  <div className="w-6 h-6 bg-champagne-nude/30 rounded-full flex items-center justify-center">
                    <span className="text-elegant-base text-xs">+</span>
                  </div>
                </CardItem>

                {/* Glow Effect */}
                <CardItem
                  translateZ="10"
                  className="absolute inset-0 pointer-events-none"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-soft-gold/0 via-soft-gold/10 to-soft-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </CardItem>
              </CardBody>
            </CardContainer>
          </section>

          {/* Multiple Cards Demo */}
          <section>
            <h2 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-8 text-center">
              Multiple 3D Cards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                { name: 'Silk Blouse', category: 'Tops', price: '€189', icon: 'T' },
                { name: 'Wool Blazer', category: 'Jackets', price: '€459', icon: 'J' },
                { name: 'Evening Dress', category: 'Dresses', price: '€299', icon: 'D' }
              ].map((product, index) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="flex justify-center"
                >
                  <CardContainer className="inter-var">
                    <CardBody className="bg-transparent relative group">
                      <CardItem
                        translateZ="50"
                        className="w-full h-full"
                      >
                        <div className="relative w-80 h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-champagne-nude/20 to-elegant-base/20 dark:from-deep-black/30 dark:to-deep-black/50 border border-elegant-base/20 dark:border-elegant-base/30">
                          <div className="relative w-full h-64 overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-soft-gold/20 to-champagne-nude/30 flex items-center justify-center">
                              <div className="text-center">
                                <div className="w-16 h-16 bg-soft-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                                  <span className="text-deep-black font-cormorant text-xl">{product.icon}</span>
                                </div>
                                <p className="text-font-secondary font-josefin">{product.category}</p>
                              </div>
                            </div>
                          </div>

                          <div className="p-6">
                            <div className="mb-2">
                              <span className="text-xs font-josefin text-soft-gold uppercase tracking-wider">
                                {product.category}
                              </span>
                            </div>
                            <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-2">
                              {product.name}
                            </h3>
                            <p className="text-sm text-font-secondary mb-4">
                              Luxury fashion piece
                            </p>
                            
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white">
                                {product.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardItem>

                      <CardItem
                        translateX={-10}
                        translateY={-10}
                        translateZ="20"
                        className="absolute top-4 right-4"
                      >
                        <div className="w-8 h-8 bg-soft-gold/20 rounded-full flex items-center justify-center">
                          <span className="text-soft-gold text-sm">♡</span>
                        </div>
                      </CardItem>
                    </CardBody>
                  </CardContainer>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Interactive Demo */}
          <section className="bg-gradient-to-r from-champagne-nude/20 to-elegant-base/20 p-8 rounded-lg">
            <h2 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-8 text-center">
              Interactive Demo
            </h2>
            <div className="text-center space-y-4">
              <p className="text-font-secondary">
                Move your mouse over the cards to see the 3D effect in action!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <CardContainer className="inter-var">
                  <CardBody className="bg-transparent relative group">
                    <CardItem
                      translateZ="50"
                      className="w-full h-full"
                    >
                      <div className="relative w-64 h-80 rounded-xl overflow-hidden bg-gradient-to-br from-soft-gold/30 to-champagne-nude/40 border border-soft-gold/50">
                        <div className="p-6 h-full flex flex-col justify-center text-center">
                          <div className="w-12 h-12 bg-deep-black rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-soft-gold text-lg">✨</span>
                          </div>
                          <h3 className="text-lg font-cormorant font-semibold text-deep-black mb-2">
                            Hover Me!
                          </h3>
                          <p className="text-sm text-font-secondary">
                            Watch the 3D magic happen
                          </p>
                        </div>
                      </div>
                    </CardItem>
                  </CardBody>
                </CardContainer>

                <CardContainer className="inter-var">
                  <CardBody className="bg-transparent relative group">
                    <CardItem
                      translateZ="50"
                      className="w-full h-full"
                    >
                      <div className="relative w-64 h-80 rounded-xl overflow-hidden bg-gradient-to-br from-elegant-base/30 to-champagne-nude/40 border border-elegant-base/50">
                        <div className="p-6 h-full flex flex-col justify-center text-center">
                          <div className="w-12 h-12 bg-soft-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-deep-black text-lg">💎</span>
                          </div>
                          <h3 className="text-lg font-cormorant font-semibold text-deep-black mb-2">
                            Try This One!
                          </h3>
                          <p className="text-sm text-font-secondary">
                            Smooth 3D rotations
                          </p>
                        </div>
                      </div>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </div>
            </div>
          </section>

          {/* Usage Instructions */}
          <section className="bg-gradient-to-r from-soft-gold/10 to-bright-gold/10 p-8 rounded-lg">
            <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-6 text-center">
              Usage Instructions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-3">
                  Components
                </h4>
                <ul className="space-y-2 text-sm text-font-secondary">
                  <li>• <code>CardContainer</code> - Main wrapper with 3D perspective</li>
                  <li>• <code>CardBody</code> - Container for card content</li>
                  <li>• <code>CardItem</code> - Individual 3D elements</li>
                  <li>• <code>useMouseEnter</code> - Hook for hover state</li>
                </ul>
              </div>
              <div>
                <h4 className="font-josefin font-semibold text-deep-black dark:text-ivory-white mb-3">
                  Features
                </h4>
                <ul className="space-y-2 text-sm text-font-secondary">
                  <li>• Mouse tracking for 3D rotation</li>
                  <li>• Smooth animations and transitions</li>
                  <li>• Multiple floating elements</li>
                  <li>• Customizable transforms</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
