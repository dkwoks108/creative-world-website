import React from 'react';
import { Metadata } from 'next';
import { DesignProHero } from '@/components/designpro/DesignProHero';
import { AgencyNextSection } from '@/components/agency/AgencyNextSection';

export const metadata: Metadata = {
  title: 'DesignPro — Premium Digital Growth & Engineering',
  description: 'Electric Cyan Dark Glass cinematic hero section and editorial transition.',
};

export default function DesignProPage() {
  return (
    <main className="bg-[#07090E]">
      <DesignProHero />
      <AgencyNextSection />
    </main>
  );
}
