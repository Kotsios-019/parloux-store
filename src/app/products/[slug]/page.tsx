'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { mockProducts, getProductByHandle } from '@/data/mockProducts';
import GlobalLayout from '@/components/layout/GlobalLayout';
import ProductPage from '@/components/ui/ProductPage';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPageWrapper({ params }: ProductPageProps) {
  const [slug, setSlug] = useState<string>('');

  // Handle async params
  useEffect(() => {
    const getSlug = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    getSlug();
  }, [params]);

  const product = slug ? getProductByHandle(slug) : null;
  
  if (!product) {
    return (
      <GlobalLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-soft-gold mx-auto mb-4"></div>
            <p className="text-font-secondary dark:text-font-secondary-dark">Loading product...</p>
          </div>
        </div>
      </GlobalLayout>
    );
  }

  return (
    <GlobalLayout>
      <ProductPage product={product} />
    </GlobalLayout>
  );
}