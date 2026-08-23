import { CaseStudyItem } from '@/types';

export const caseStudiesData: CaseStudyItem[] = [
  {
    id: 'case-study-01',
    slug: 'jaipur-education-lead-growth',
    clientPlaceholderName: 'Jaipur Education & Coaching Institute',
    industryPlaceholder: 'Education & Coaching',
    title: 'Scaling High-Intent Student Enquiries for Jaipur Coaching Institutes',
    shortDescription: 'How a connected Google Search and WhatsApp funnel strategy built a predictable enrolment pipeline for local competitive exam batches.',
    challenge: 'High cost per enquiry on social ads with low student qualification and fragmented follow-up across WhatsApp and phone leads.',
    strategy: 'Restructured Google Search campaigns around high-intent local keywords and deployed dedicated landing pages optimized for direct phone call and WhatsApp enquiries.',
    execution: [
      'Built hyper-targeted Google Search campaigns for competitive exam courses in Jaipur.',
      'Designed mobile-first landing pages with instant click-to-call and WhatsApp enquiry triggers.',
      'Configured local Google Business Profile optimization for nearby map discovery.',
      'Integrated real-time lead tracking to monitor cost per qualified enrolment enquiry.'
    ],
    takeaway: 'For education and coaching in Jaipur, search intent combined with immediate mobile enquiry options outperforms generic ad impressions.',
    services: ['Performance Marketing', 'SEO & Local Search', 'Websites & Conversion'],
    image: '/images/case-studies/education-coaching.png',
    metrics: [
      {
        label: 'QUALIFIED ENQUIRY VOLUME',
        value: 'Enquiry Goal: Qualified Enrolments',
        context: 'Targeted increase in verified student batch enquiries.'
      },
      {
        label: 'COST PER ACQUISITION',
        value: 'Metric Target: Reduced CAC',
        context: 'Reduction in wasted ad spend per enrolled student.'
      }
    ],
    featured: true,
    verified: false,
  },
  {
    id: 'case-study-02',
    slug: 'jaipur-real-estate-acquisition',
    clientPlaceholderName: 'Jaipur Real Estate & Property Developers',
    industryPlaceholder: 'Real Estate & Construction',
    title: 'Qualified Buyer Lead Acquisition for Jaipur Property Projects',
    shortDescription: 'Connecting Meta video ads with high-speed project landing pages to attract verified home buyers.',
    challenge: 'Low lead quality from generic social ad forms resulting in sales teams spending hours calling unpromising contacts.',
    strategy: 'Implemented short-form property walk-through video ads on Instagram combined with multi-step qualifying landing pages before lead capture.',
    execution: [
      'Produced engaging video ad reels highlighting project location, amenities, and price points.',
      'Deployed a 2-step qualifying landing page filtering genuine property buyers from casual clickers.',
      'Set up custom audience targeting for high-net-worth individuals and home seekers in Rajasthan.',
      'Connected real-time lead notifications directly to the developer sales desk.'
    ],
    takeaway: 'Qualifying buyer intent on the landing page protects sales team time and increases site-visit conversion rates.',
    services: ['Performance Marketing', 'Social Media & Creative', 'Websites & Conversion'],
    image: '/images/case-studies/real-estate.png',
    metrics: [
      {
        label: 'VERIFIED SITE VISITS',
        value: 'Growth Target: Site Appointments',
        context: 'Increase in confirmed property site visit appointments.'
      },
      {
        label: 'COST PER QUALIFIED LEAD',
        value: 'Metric Target: Optimized CPL',
        context: 'Decrease in cost per verified high-intent buyer enquiry.'
      }
    ],
    featured: false,
    verified: false,
  },
  {
    id: 'case-study-03',
    slug: 'jaipur-retail-lifestyle-growth',
    clientPlaceholderName: 'Jaipur Jewelry & Apparel Brand',
    industryPlaceholder: 'Jewelry, Fashion & Retail',
    title: 'Local Store Footfall & Digital Brand Visibility for Jaipur Retail',
    shortDescription: 'Unifying Instagram visual creative with local search optimization to drive in-store visits and online catalog discovery.',
    challenge: 'Strong physical store presence in Jaipur but minimal online visibility and inconsistent social content that failed to drive footfall.',
    strategy: 'Executed an aesthetic Instagram content overhaul coupled with Google Local SEO to capture both local shoppers and visiting tourists.',
    execution: [
      'Curated high-grade visual catalog posts and short-form craft story reels.',
      'Optimized Google Business Profile and local search keywords for Jaipur shoppers.',
      'Launched localized geo-targeted Meta ads promoting seasonal collections and store visits.',
      'Implemented Google Maps direction tracking and store contact buttons.'
    ],
    takeaway: 'Combining local search intent with polished creative assets turns digital attention into store visits and sales.',
    services: ['Social Media & Creative', 'SEO & Local Search', 'Growth Strategy'],
    image: '/images/case-studies/retail-jewelry.png',
    metrics: [
      {
        label: 'LOCAL SEARCH MAP VIEWS',
        value: 'Growth Target: Direction Calls',
        context: 'Growth in Google Maps store directions and calls.'
      },
      {
        label: 'IN STORE FOOTFALL IMPACT',
        value: 'Metric Target: Store Footfall',
        context: 'Tracked lift in store footfall during active campaigns.'
      }
    ],
    featured: false,
    verified: false,
  },
];
