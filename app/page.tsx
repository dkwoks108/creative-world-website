import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { CreativeHeroSection } from '@/components/sections/CreativeHeroSection';
import { GrowthGapSection } from '@/components/sections/GrowthGapSection';
import { GrowthSystemSection } from '@/components/sections/GrowthSystemSection';
import { InteractiveServicePanel } from '@/components/sections/InteractiveServicePanel';
import { MetricDossierSection } from '@/components/sections/MetricDossierSection';
import { CreativeTechFusionSection } from '@/components/sections/CreativeTechFusionSection';
import { PackageDecisionMatrix } from '@/components/sections/PackageDecisionMatrix';
import { ImmersiveCTASection } from '@/components/sections/ImmersiveCTASection';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-[#07090E] text-slate-100 selection:bg-[#1769FF]/30 selection:text-white">
        
        {/* Floating Minimal Glassmorphic Header */}
        <Navbar />

        {/* Brand New Editorial Homepage Flow (0% Match with Previous Layout) */}
        <main>
          {/* SECTION 01: Immersive Editorial Intro */}
          <CreativeHeroSection />

          {/* SECTION 02: Business Growth Gap Matrix */}
          <GrowthGapSection />

          {/* SECTION 03: The Creative World Growth System Canvas */}
          <GrowthSystemSection />

          {/* SECTION 04: Interactive Service Workspace */}
          <InteractiveServicePanel />

          {/* SECTION 05: Commercial Proof & Data Metric Wall */}
          <MetricDossierSection />

          {/* SECTION 07: Creative + Tech Fusion Section */}
          <CreativeTechFusionSection />

          {/* SECTION 08: Package & Growth Stage Decision Matrix */}
          <PackageDecisionMatrix />

          {/* SECTION 09: Immersive Conversion CTA */}
          <ImmersiveCTASection />
        </main>

        {/* Architectural Footer */}
        <Footer />
      </div>
    </MotionProvider>
  );
}
