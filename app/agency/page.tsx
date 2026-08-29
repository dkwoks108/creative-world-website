import React from 'react';
import { Metadata } from 'next';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { AgencyHero } from '@/components/agency/AgencyHero';
import { AgencyNextSection } from '@/components/agency/AgencyNextSection';
import { GrowthGapSection } from '@/components/sections/GrowthGapSection';
import { InteractiveServicePanel } from '@/components/sections/InteractiveServicePanel';
import { MetricDossierSection } from '@/components/sections/MetricDossierSection';
import { ImmersiveCTASection } from '@/components/sections/ImmersiveCTASection';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Creativee World Growth Studio — Premium Digital Marketing & Brand Engineering',
  description: 'We build brands people remember and growth systems businesses can measure. Electric Cyan Dark Glass design system.',
  openGraph: {
    title: 'Creativee World Growth Studio — Digital Agency',
    description: 'Electric Cyan Dark Glass agency architecture for digital growth, search visibility, and revenue systems.',
  },
};

export default function AgencyPage() {
  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-[#07090E] text-slate-100 selection:bg-[#00CFFF]/30 selection:text-white">
        {/* Main Agency Flow */}
        <main>
          {/* Hero Section with Integrated Header */}
          <AgencyHero />

          {/* Agency Philosophy & Pillars */}
          <AgencyNextSection />

          {/* Business Growth Matrix */}
          <GrowthGapSection />

          {/* Interactive Agency Service Workspace */}
          <InteractiveServicePanel />

          {/* Metric & Commercial Proof Dossier */}
          <MetricDossierSection />

          {/* Conversion CTA */}
          <ImmersiveCTASection />
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </MotionProvider>
  );
}

