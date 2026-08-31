import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { CreativeHeroSection } from '@/components/sections/CreativeHeroSection';
import { GrowthGapSection } from '@/components/sections/GrowthGapSection';
import { GrowthSystemSection } from '@/components/sections/GrowthSystemSection';
import { InteractiveServicePanel } from '@/components/sections/InteractiveServicePanel';
import { MetricDossierSection } from '@/components/sections/MetricDossierSection';
import { CreativeTechFusionSection } from '@/components/sections/CreativeTechFusionSection';
import { PackageDecisionMatrix } from '@/components/sections/PackageDecisionMatrix';
import { FAQSection } from '@/components/ui/FAQSection';
import { ImmersiveCTASection } from '@/components/sections/ImmersiveCTASection';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Creativee World | Digital Growth & Performance Marketing Agency in Jaipur',
  description: 'Creativee World is a premier result-driven digital growth agency in Jaipur. We specialize in Connected Search SEO, Meta & Google Ads, sub-2s Next.js web applications, and commercial video reels.',
  keywords: [
    'digital marketing agency in Jaipur',
    'SEO agency Jaipur',
    'Google Ads agency Jaipur',
    'performance marketing Jaipur',
    'website development company Jaipur',
    'social media marketing Jaipur',
    'local SEO agency Jaipur',
    'digital growth agency Jaipur',
  ],
  openGraph: {
    title: 'Creativee World | Digital Growth & Performance Marketing Agency in Jaipur',
    description: 'Connected digital growth systems combining custom web development, video production, performance marketing, and search intelligence for brands in Jaipur.',
    url: 'https://creativeworld.in',
    siteName: 'Creativee World',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/brand/og-image.png', width: 1200, height: 630, alt: 'Creativee World Jaipur' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creativee World | Digital Growth Agency Jaipur',
    description: 'Premier digital growth agency in Jaipur for search dominance, ad acquisition, and custom web software.',
    images: ['/brand/og-image.png'],
  },
  alternates: {
    canonical: 'https://creativeworld.in',
  },
};

const homeFaqs = [
  {
    question: 'What digital marketing services does Creativee World offer in Jaipur?',
    answer: 'Creativee World provides integrated digital acquisition solutions including Connected Search SEO (Local & National), Meta & Google Ads management, sub-2s Next.js website development, Instagram Reels production, and closed-loop CRM lead tracking.',
  },
  {
    question: 'How quickly can my business expect measurable results from Google Ads & SEO?',
    answer: 'Paid campaigns (Google Search & Meta Ads) generate high-intent leads within 24 to 72 hours of launching. Technical SEO and local Google Map Pack rankings typically deliver compounding organic search traffic within 60 to 90 days.',
  },
  {
    question: 'Does Creativee World build custom websites for local Jaipur companies?',
    answer: 'Yes! We engineer custom Next.js, React, WordPress, and Shopify websites optimized for mobile speed (under 2 seconds load time), SEO indexation, and high conversion rate optimization (CRO).',
  },
  {
    question: 'How is ad spend managed for Meta and Google advertising campaigns?',
    answer: 'Ad budgets are billed directly by Google or Meta via your company’s billing account. Creativee World maintains complete client transparency—you own 100% of your ad accounts, pixel data, and conversion assets.',
  },
  {
    question: 'Why should my business choose Creativee World over separate freelancers?',
    answer: 'Disconnected freelancers often lead to broken messaging between ads, SEO, and web landing pages. Creativee World operates as a single connected growth partner, unifying copywriting, technical SEO, media production, and web engineering.',
  },
];

export default function HomePage() {
  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-[#07090E] text-slate-100 selection:bg-[#1769FF]/30 selection:text-white">
        {/* Floating Minimal Glassmorphic Header */}
        <Navbar />

        {/* Editorial Homepage Flow */}
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

          {/* SECTION 06: Creative + Tech Fusion Section */}
          <CreativeTechFusionSection />

          {/* SECTION 07: Package & Growth Stage Decision Matrix */}
          <PackageDecisionMatrix />

          {/* SECTION 08: Frequently Asked Questions & AEO Schema */}
          <FAQSection
            badge="FREQUENTLY ASKED QUESTIONS"
            title="Questions About Digital Growth in Jaipur?"
            description="Clear answers about our growth engineering, campaign timelines, and transparent ad management."
            faqs={homeFaqs}
          />

          {/* SECTION 09: Immersive Conversion CTA */}
          <ImmersiveCTASection />
        </main>

        {/* Architectural Footer */}
        <Footer />
      </div>
    </MotionProvider>
  );
}
