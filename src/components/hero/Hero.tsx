"use client";
import { ImagesSlider } from "@/components/ui/ImagesSlider";
import { MorphingText } from "@/components/ui/MorphingText";
import LuxuryGlassBadges from "./LuxuryGlassBadges";
import MobileGlassBadges from "./MobileGlassBadges";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  headline: string;
  subline?: string;
  ctas?: { label: string; href: string }[];
  backgroundImages?: string[];
};

export default function Hero({ 
  headline, 
  subline, 
  ctas = [], 
  backgroundImages = [
    "/images/carousel-1.png",
    "/images/carousel-2.png", 
    "/images/carousel-3.png"
  ]
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="relative overflow-hidden h-screen w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-ivory-white to-champagne-nude dark:from-deep-black dark:to-deep-black" />
        <div className="relative z-50 h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <MorphingText
                  texts={[
                    "Timeless.",
                    "Tailored.",
                    "Yours.",
                    "Elegant.",
                    "Confident.",
                    "Luxury.",
                    "Sophisticated.",
                    "Refined.",
                    "Exclusive.",
                    "Artisan."
                  ]}
                  className="heading-primary font-cormorant text-5xl md:text-7xl lg:text-8xl leading-tight text-ivory-white drop-shadow-2xl h-20 md:h-24 lg:h-32"
                />
              </div>
              {subline && (
                <p className="body-large text-ivory-white/95 mb-8 max-w-3xl mx-auto drop-shadow-lg">
                  {subline}
                </p>
              )}
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 {ctas.map((cta, index) => (
                   <a
                     key={cta.href}
                     href={cta.href}
                     className={`px-6 py-3 text-base font-josefin font-medium rounded-none transition-all duration-300 hover:scale-105 ${
                       index === 0 
                         ? 'btn-primary' 
                         : 'bg-transparent text-ivory-white border border-ivory-white/30 hover:bg-ivory-white/10 hover:border-ivory-white/60 backdrop-blur-sm'
                     }`}
                   >
                     {cta.label}
                   </a>
                 ))}
               </div>
               
               {/* Mobile Glass Badges */}
               <MobileGlassBadges />
            </div>
           </div>
         </div>
         
         {/* Desktop Glass Badges */}
         <LuxuryGlassBadges />
       </section>
     );
   }
  
  return (
    <section
      className="relative overflow-hidden h-screen w-full"
    >
      {/* Carousel Background */}
      <ImagesSlider
        images={backgroundImages}
        overlay={true}
        overlayClassName="bg-gradient-to-br from-deep-black/70 via-deep-black/50 to-deep-black/60"
        autoplay={true}
        direction="up"
        className="h-full w-full"
      >
        {/* Fallback background in case carousel fails */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-ivory-white to-champagne-nude dark:from-deep-black dark:to-deep-black"
          style={{
            backgroundImage: `url(${backgroundImages[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Content */}
        <div className="relative z-50 h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl mx-auto"
            >
              <div className="mb-6">
                <MorphingText
                  texts={[
                    "Timeless.",
                    "Tailored.",
                    "Yours.",
                    "Elegant.",
                    "Confident.",
                    "Luxury.",
                    "Sophisticated.",
                    "Refined.",
                    "Exclusive.",
                    "Artisan."
                  ]}
                  className="heading-primary font-cormorant text-5xl md:text-7xl lg:text-8xl leading-tight text-ivory-white drop-shadow-2xl h-20 md:h-24 lg:h-32"
                />
              </div>
              {subline && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  className="body-large text-ivory-white/95 mb-8 max-w-3xl mx-auto drop-shadow-lg"
                >
                  {subline}
                </motion.p>
              )}
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                 className="flex flex-col sm:flex-row gap-4 justify-center"
               >
                 {ctas.map((cta, index) => (
                   <motion.a
                     key={cta.href}
                     href={cta.href}
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                     className={`px-6 py-3 text-base font-josefin font-medium rounded-none transition-all duration-300 hover:scale-105 ${
                       index === 0 
                         ? 'btn-primary' 
                         : 'bg-transparent text-ivory-white border border-ivory-white/30 hover:bg-ivory-white/10 hover:border-ivory-white/60 backdrop-blur-sm'
                     }`}
                   >
                     {cta.label}
                   </motion.a>
                 ))}
               </motion.div>
               
               {/* Mobile Glass Badges */}
               <MobileGlassBadges />
            </motion.div>
          </div>
         </div>
       </ImagesSlider>

       {/* Desktop Glass Badges */}
       <LuxuryGlassBadges />
     </section>
   );
 }
