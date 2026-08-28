import React from 'react';
import { Metadata } from 'next';
import { AgencyHero } from '@/components/agency/AgencyHero';
import { AgencyNextSection } from '@/components/agency/AgencyNextSection';

export const metadata: Metadata = {
  title: 'Creativee World Growth Studio — Premium Digital Marketing & Brand Engineering',
  description: 'We build brands people remember and growth systems businesses can measure. Obsidian x Acid Lime x Hyper Cobalt design language.',
};

export default function AgencyHeroPage() {
  return (
    <main className="bg-[#050608]">
      <AgencyHero />
      <AgencyNextSection />
    </main>
  );
}
