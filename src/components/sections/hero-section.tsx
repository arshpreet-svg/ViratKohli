"use client";

import { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import AnimatedCounter from '@/components/animated-counter';
import { getHeroStats } from '@/lib/data';
import { LanguageContext } from '@/context/language-context';
import { translations } from '@/lib/translations';

const HeroSection = () => {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
  const { language } = useContext(LanguageContext);
  const heroStats = getHeroStats(language);
  const t = translations[language].hero;

  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center text-center text-white overflow-hidden">
      {heroImage && (
        <div className="absolute top-0 left-0 w-full h-full" style={{ transform: `translateY(${offsetY * 0.4}px)` }}>
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            priority
            data-ai-hint={heroImage.imageHint}
            className="object-cover object-top"
          />
        </div>
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 p-4 flex flex-col items-center">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold font-headline tracking-tight leading-tight drop-shadow-lg">
            {t.name}
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
            {t.description}
          </p>
        </div>

        <div className="mt-12 w-full max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {heroStats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <p className="text-3xl md:text-4xl font-bold font-mono">
                  <AnimatedCounter value={stat.value} isApproximate={stat.isApproximate} />
                </p>
                <p className="text-sm md:text-base uppercase tracking-wider text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
            <Link href="#career">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                {t.button}
                <ChevronDown className="ml-2 h-5 w-5 animate-bounce" />
              </Button>
            </Link>
        </div>
      </div>
       <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <ChevronDown className="h-8 w-8 text-white" />
      </div>
    </section>
  );
};

export default HeroSection;
