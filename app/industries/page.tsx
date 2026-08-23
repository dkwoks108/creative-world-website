import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { IndustryCaseStudiesClient } from '@/components/sections/IndustryCaseStudiesClient';
import { INDUSTRY_CASE_STUDIES } from '@/data/industryCaseStudies';

export const metadata: Metadata = {
  title: 'Industry Case Studies & Digital Systems | Surnax',
  description: 'Explore custom digital solutions, web applications, automation funnels, and CRM integrations engineered by Surnax across 18 key business industries.',
  openGraph: {
    title: 'Different Industries. Different Challenges. One Technology Partner | Surnax',
    description: 'Explore sector-specific web development, automation systems, AI integration, and digital growth frameworks for 18 distinct industries.',
  },
  alternates: {
    canonical: 'https://surnax.com/industries',
  },
};

export default function IndustriesPage() {
  // Generate JSON-LD Structured Data Schema for ItemList of Industry Case Studies
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Surnax Industry Case Studies & Digital Systems',
    'description': 'Custom web applications, automation funnels, and digital strategy solutions across 18 business sectors.',
    'itemListElement': INDUSTRY_CASE_STUDIES.map((study, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'Article',
        'name': `${study.industryName}: ${study.title}`,
        'description': study.shortProblem,
        'url': `https://surnax.com/industries/${study.slug}`
      }
    }))
  };

  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-white text-black font-serifBody selection:bg-black selection:text-white">
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Navbar />

        <main id="main-content">
          <IndustryCaseStudiesClient />
        </main>

        <Footer />
      </div>
    </MotionProvider>
  );
}
