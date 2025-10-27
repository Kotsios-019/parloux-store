'use client';

import { motion } from 'framer-motion';

export default function AW25CollectionPage() {
  return (
    <div className="min-h-screen bg-ivory-white dark:bg-deep-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-cormorant font-light text-deep-black dark:text-ivory-white mb-6">
            AW25 Collection
          </h1>
          <h2 className="text-3xl md:text-5xl font-cormorant font-medium text-soft-gold mb-8">
            Nocturnal Grace
          </h2>
          <p className="text-lg md:text-xl font-josefin font-light text-font-secondary max-w-3xl mx-auto">
            A collection that whispers of midnight elegance, where every piece tells a story of refined darkness and luminous beauty.
          </p>
        </motion.div>

        {/* Coming Soon Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center py-20"
        >
          <div className="bg-gradient-to-br from-champagne-nude/10 to-elegant-base/10 p-12 rounded-2xl border border-elegant-base/20">
            <div className="w-24 h-24 bg-soft-gold/20 rounded-full mx-auto mb-8 flex items-center justify-center">
              <span className="text-4xl">🌙</span>
            </div>
            <h3 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-4">
              Collection Coming Soon
            </h3>
            <p className="text-font-secondary font-josefin mb-8 max-w-2xl mx-auto">
              We're putting the finishing touches on our AW25 Nocturnal Grace collection. 
              Sign up for our newsletter to be the first to know when it launches.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="px-8 py-3 bg-soft-gold text-deep-black font-josefin font-medium rounded-none transition-all duration-300 hover:bg-bright-gold hover:scale-105"
              >
                Back to Home
              </a>
              <a
                href="/collections"
                className="px-8 py-3 bg-transparent text-font-primary dark:text-ivory-white border border-elegant-base/30 font-josefin font-medium rounded-none transition-all duration-300 hover:bg-elegant-base/10"
              >
                View All Collections
              </a>
            </div>
          </div>
        </motion.div>

        {/* Collection Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-8 text-center">
            Collection Preview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Evening Gowns', description: 'Silk and satin pieces for grand occasions' },
              { name: 'Tailored Separates', description: 'Sophisticated blazers and trousers' },
              { name: 'Luxury Accessories', description: 'Handcrafted bags and jewelry' }
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-champagne-nude/5 to-elegant-base/5 p-6 rounded-lg border border-elegant-base/10">
                <h4 className="text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-2">
                  {item.name}
                </h4>
                <p className="text-sm font-josefin text-font-secondary">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
