import Hero from "./Hero";

export default function HeroSection() {
  return (
    <Hero
      headline="Timeless. Tailored. Yours."
      subline="New Collection — Limited runs, hand-finished luxury womenswear that embodies elegance, confidence, and modern femininity."
      ctas={[
        { label: "Shop New In", href: "/collections/new" },
        { label: "Discover Our Story", href: "/about" }
      ]}
      backgroundImages={[
        "/images/carousel-1.png",
        "/images/carousel-2.png", 
        "/images/carousel-3.png"
      ]}
    />
  );
}
