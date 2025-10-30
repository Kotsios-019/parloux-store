'use client';

import { SwipeableCarousel, MobileGrid } from './MobileTouch';
import { CollectionImage } from './OptimizedImage';
import { TouchButton } from './MobileTouch';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: string;
  products: any[];
}

interface MobileCollectionGridProps {
  collections: Collection[];
  showCarousel?: boolean;
  className?: string;
}

export default function MobileCollectionGrid({ 
  collections, 
  showCarousel = true,
  className = '' 
}: MobileCollectionGridProps) {
  if (showCarousel) {
    return (
      <div className={`lg:hidden ${className}`}>
        <SwipeableCarousel
          showDots={true}
          autoPlay={false}
          className="w-full"
          showArrows={true}
        >
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              index={index}
            />
          ))}
        </SwipeableCarousel>
      </div>
    );
  }

  return (
    <div className={`lg:hidden ${className}`}>
      <MobileGrid
        minItemWidth="280px"
        gap="1rem"
        className="px-4"
      >
        {collections.map((collection, index) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            index={index}
          />
        ))}
      </MobileGrid>
    </div>
  );
}

function CollectionCard({ collection, index }: { collection: Collection; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group w-80 max-w-xs mx-auto"
    >
      <Link href={`/collections/${collection.handle}`}>
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-deep-black shadow-lg hover:shadow-xl transition-all duration-500 group-hover:scale-105">
          {/* Collection Image */}
          <div className="relative h-64 w-full">
            <CollectionImage
              src={collection.image || '/images/products/placeholder.svg'}
              alt={collection.title}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Product Count Badge */}
            <div className="absolute top-4 right-4 bg-soft-gold text-deep-black px-3 py-1 rounded-full text-sm font-josefin font-semibold">
              {collection.products.length} {collection.products.length === 1 ? 'item' : 'items'}
            </div>
          </div>

          {/* Collection Info */}
          <div className="p-4">
            <h3 className="text-xl font-cormorant font-semibold text-deep-black dark:text-ivory-white mb-2 group-hover:text-soft-gold dark:group-hover:text-bright-gold transition-colors duration-300">
              {collection.title}
            </h3>
            <p className="text-font-secondary dark:text-font-secondary-dark font-josefin leading-relaxed mb-4 text-sm line-clamp-2">
              {collection.description}
            </p>
            
            {/* View Collection Button */}
            <TouchButton
              onClick={() => {
                window.location.href = `/collections/${collection.handle}`;
              }}
              variant="secondary"
              size="sm"
              className="w-full"
            >
              View Collection
            </TouchButton>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

