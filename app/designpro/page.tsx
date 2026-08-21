import React from 'react';
import { Metadata } from 'next';
import { DesignProHero } from '@/components/designpro/DesignProHero';
import { AgencyNextSection } from '@/components/agency/AgencyNextSection';

export const metadata: Metadata = {
  title: 'DesignPro — Premium Digital Growth & Engineering',
  description: 'Obsidian x Acid Lime x Hyper Cobalt cinematic hero section and editorial transition.',
};

export default function DesignProPage() {
  return (
    <main className="bg-[#050608]">
      <DesignProHero />
      <AgencyNextSection />
    </main>
  );
}
