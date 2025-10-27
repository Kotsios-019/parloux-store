'use client';

import HeroSection from '@/components/hero/HeroSection';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import BrandMarquee from '@/components/sections/BrandMarquee';
import AboutTheMaisonSimple from '@/components/sections/AboutTheMaisonSimple';
import EssenceOfTheCollectionSimple from '@/components/sections/EssenceOfTheCollectionSimple';
import Testimonials from '@/components/sections/Testimonials';
import TimelineOfTheAtelierSimple from '@/components/sections/TimelineOfTheAtelierSimple';
import GlobalLayout from '@/components/layout/GlobalLayout';

export default function HomePage() {
  return (
    <GlobalLayout>
      {/* Magical Hero Section */}
      <HeroSection />

      {/* Brand Marquee */}
      <BrandMarquee />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* About the Maison */}
      <AboutTheMaisonSimple />

      {/* Essence of the Collection */}
      <EssenceOfTheCollectionSimple />

      {/* Testimonials */}
      <Testimonials />

      {/* Timeline of the Atelier */}
      <TimelineOfTheAtelierSimple />
    </GlobalLayout>
  );
}