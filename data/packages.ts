import { PackageTier } from '@/types';

export const packagesData: PackageTier[] = [
  {
    id: 'starter',
    name: 'Starter Package',
    price: '₹7,999 – ₹12,999',
    period: '/ month',
    subtitle: 'Build Your Initial Digital Presence',
    idealFor: 'Small local businesses, early-stage startups, and local service providers starting their digital presence in Jaipur.',
    inclusions: [
      '8 Social Media Posts / month',
      '4 Short-Form Reels / month',
      'Captions & Local Hashtag Strategy',
      'Basic Paid Ads Setup (Google / Meta)',
      'Google Business Profile Basic Optimization',
      'Monthly Performance Summary'
    ],
    deliverables: [
      'Consistent monthly social media content',
      'Initial ad campaign infrastructure',
      'Local search map profile setup'
    ],
    ctaText: 'Get Started with Starter',
    disclaimer: 'Final monthly scope and price depend on ad platform requirements and asset creation complexity.'
  },
  {
    id: 'growth',
    name: 'Growth Package',
    price: '₹15,000 – ₹25,000',
    period: '/ month',
    subtitle: 'Scale Lead Generation & Search Visibility',
    idealFor: 'Growing Jaipur businesses, coaching institutes, real estate projects, and active clinics seeking consistent lead flow.',
    featured: true,
    inclusions: [
      '20 Social Media Posts / month',
      '8 Short-Form Video Reels / month',
      'Full Paid Ads Management (Google Search & Meta Ads)',
      'Local SEO & Search Keyword Optimization',
      'Dedicated Campaign Landing Page Architecture',
      'Monthly Strategic Growth Review'
    ],
    deliverables: [
      'Active social brand presence',
      'Continuous paid ad campaign optimization',
      'Local map pack search visibility',
      'Transparent cost-per-lead reporting'
    ],
    ctaText: 'Choose Growth Package',
    disclaimer: 'Ad spend is paid directly to platforms (Google/Meta) and managed transparently.'
  },
  {
    id: 'premium',
    name: 'Premium Package',
    price: '₹40,000+',
    period: '/ month',
    subtitle: 'Complete Digital Growth Partnership',
    idealFor: 'Established enterprises, multi-location businesses, and market leaders wanting dominant search and digital lead acquisition.',
    inclusions: [
      'Custom Business Website / High-Converting Landing System',
      'Comprehensive Local & Technical SEO Campaign',
      'Full Social Media Content & Reel Production',
      'Advanced Google Ads & Meta Performance Marketing',
      'Conversion Rate & Funnel Optimization',
      'Dedicated Strategic Account Director'
    ],
    deliverables: [
      'Complete digital sales & marketing ecosystem',
      'Dominant local organic and map search rankings',
      'Priority creative production and ad management',
      'Weekly performance reviews and lead pipeline audits'
    ],
    ctaText: 'Partner at Premium',
    disclaimer: 'Tailored scope custom-built around enterprise business growth goals.'
  }
];
