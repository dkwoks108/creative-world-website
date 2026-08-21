import React from 'react';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustSection } from '@/components/sections/TrustSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ManifestoSection } from '@/components/sections/ManifestoSection';
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection';
import { MethodologySection } from '@/components/sections/MethodologySection';
import { MarketDifferenceSection } from '@/components/sections/MarketDifferenceSection';
import { ProofSection } from '@/components/sections/ProofSection';
import { ConversionSection } from '@/components/sections/ConversionSection';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-[#050608] text-[#F5F7FA]">
        {/* Main Hero & Homepage Flow */}
        <main>
          <HeroSection />
          <TrustSection />
          <ServicesSection />
          <ManifestoSection />
          <CaseStudiesSection />
          <MethodologySection />
          <MarketDifferenceSection />
          <ProofSection />
          <ConversionSection />
        </main>

        {/* Production Footer */}
        <Footer />
      </div>
    </MotionProvider>
  );
}
