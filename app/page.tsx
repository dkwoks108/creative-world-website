import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustSection } from '@/components/sections/TrustSection';
import { MarketDifferenceSection } from '@/components/sections/MarketDifferenceSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { CinematicStatementSection } from '@/components/sections/CinematicStatementSection';
import { ManifestoSection } from '@/components/sections/ManifestoSection';
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection';
import { MethodologySection } from '@/components/sections/MethodologySection';
import { ProofSection } from '@/components/sections/ProofSection';
import { ConversionSection } from '@/components/sections/ConversionSection';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-white text-black font-serifBody selection:bg-black selection:text-white">
        {/* Main Hero & Homepage Flow */}
        <main>
          <HeroSection />
          <TrustSection />
          <MarketDifferenceSection />
          <ServicesSection />
          <CinematicStatementSection />
          <ManifestoSection />
          <CaseStudiesSection />
          <MethodologySection />
          <ProofSection />
          <ConversionSection />
        </main>

        {/* Production Footer */}
        <Footer />
      </div>
    </MotionProvider>
  );
}


