import { PackageTier } from '@/types';

export const packagesData: PackageTier[] = [
  {
    id: 'starter',
    name: 'Starter Growth Retainer',
    price: 'Custom Quote',
    period: ' / project or month',
    subtitle: 'Build Your Initial Digital Presence',
    idealFor: 'Local businesses and early-stage brands looking to establish a modern website, social media reels, and search profile.',
    inclusions: [
      'Custom Landing Page / Starter Web Build',
      'Short-Form Video Reels & Graphic Posts',
      'Google Business Profile & Local SEO Setup',
      'Basic Paid Ads Setup (Google / Meta)',
      'Monthly Performance Summary & Review'
    ],
    deliverables: [
      'Modern web landing foundation',
      'Reels and social media content production',
      'Local search map profile optimization'
    ],
    ctaText: 'Request Custom Starter Quote',
    disclaimer: 'Pricing is customized based on project scope, video frequency, and technical requirements.'
  },
  {
    id: 'growth',
    name: 'Growth Performance Package',
    price: 'Custom Quote',
    period: ' / month',
    subtitle: 'Scale Lead Generation & Search Visibility',
    idealFor: 'Scaling businesses, institutes, real estate developers, and clinics seeking multi-channel acquisition and web applications.',
    featured: true,
    inclusions: [
      'Custom React / WordPress / Shopify Website Build',
      'Instagram Reels & YouTube Shorts Video Editing',
      'Full Paid Ads Management (Google Search & Meta Ads)',
      'Technical SEO & Local Keyword Dominance',
      'Conversion Rate Optimization & Funnel Architecture',
      'Monthly Strategic Growth Review'
    ],
    deliverables: [
      'High-speed web platform',
      'Continuous video reel production',
      'Paid ad campaign optimization & CPA reduction',
      'Transparent enquiry tracking'
    ],
    ctaText: 'Request Growth Quote',
    disclaimer: 'Custom retainer pricing tailored to your ad spend budget and business goals.'
  },
  {
    id: 'premium',
    name: 'Enterprise Growth Partnership',
    price: 'Custom Quote',
    period: ' / custom scope',
    subtitle: 'Complete Digital & Technical Partnership',
    idealFor: 'Established brands, corporate enterprises, and high-growth companies seeking full web engineering, media production, and strategy.',
    inclusions: [
      'Custom Full-Stack React / Node.js Web Application',
      'Comprehensive Technical SEO & Keyword Domination',
      'Full Video Production, Reels, Shorts & Brand Films',
      'Advanced Meta & Google Ads Performance Marketing',
      'Custom CRM / Lead Integration & API Engineering',
      'Dedicated Strategic Account Director'
    ],
    deliverables: [
      'Enterprise digital product & marketing ecosystem',
      'National and local search dominance',
      'Full-service creative production & engineering',
      'Dedicated strategy & weekly performance reporting'
    ],
    ctaText: 'Discuss Enterprise Partnership',
    disclaimer: 'Bespoke agreement customized to enterprise technical & marketing scope.'
  }
];
