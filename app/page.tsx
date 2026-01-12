"use client";

import { useState } from 'react';
import Grid3DThree from '@/components/Grid3DThree';
import ContactModal from '@/components/ContactModal';
import FloatingParticles from '@/components/FloatingParticles';
import ShootingStars from '@/components/ShootingStars';
import ParallaxWrapper from '@/components/ParallaxWrapper';
import { currentTheme } from '@/lib/themes';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <main
      className={`relative w-screen h-screen ${currentTheme.bg} overflow-hidden cursor-pointer`}
      onClick={handleClick}
    >
      {/* Floating Particles */}
      <FloatingParticles />

      {/* Shooting Stars */}
      <ShootingStars />

      {/* 3D Grid with breathing glow */}
      <Grid3DThree />

      {/* Hero Content - ABOVE horizon line */}
      <ParallaxWrapper intensity={0.5} className="relative z-30 flex flex-col items-center justify-start h-full pt-[35vh]">
        <h1 className={`font-[family-name:var(--font-geist-sans)] font-medium ${currentTheme.text} text-5xl md:text-6xl lg:text-7xl tracking-tight`}>
          KloudySky
        </h1>
      </ParallaxWrapper>

      {/* Tagline - below faded grid */}
      <ParallaxWrapper intensity={0.3} className="absolute bottom-[28vh] left-0 right-0 z-30 flex justify-center">
        <p className={`font-[family-name:var(--font-jetbrains-mono)] ${currentTheme.textMuted} text-sm sm:text-base md:text-lg`}>
          Connect with us<span className="animate-cursor-blink">_</span>
        </p>
      </ParallaxWrapper>

      {/* Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
