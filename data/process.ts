import { ProcessStep } from '@/types';

export const processData: ProcessStep[] = [
  {
    id: 'step-audit',
    number: '01',
    title: 'UNDERSTAND',
    kicker: 'BUSINESS & MARKET DIAGNOSIS',
    description: 'We analyze your current digital presence, local market positioning in Jaipur, target audience needs, and existing campaign friction points.',
    activities: [
      'Current ad campaign and ad spend efficiency review',
      'Local search visibility & Google Business Profile audit',
      'Website conversion and lead capture friction analysis',
      'Competitor positioning audit across the Jaipur market'
    ],
    outcome: 'A clear diagnostic view of your growth bottlenecks and immediate quick-win opportunities.',
  },
  {
    id: 'step-strategy',
    number: '02',
    title: 'STRATEGIZE',
    kicker: 'INTEGRATED GROWTH ROADMAP',
    description: 'We design a practical growth roadmap connecting search visibility, targeted ads, content strategy, and website conversion into one clear plan.',
    activities: [
      'Channel allocation aligned with your business goals',
      'High-intent search & local SEO keyword roadmap',
      'Social content themes, reel concepts & messaging matrix',
      'Conversion-focused website and landing page blueprints'
    ],
    outcome: 'An actionable growth strategy with defined priorities, realistic timelines, and channel milestones.',
  },
  {
    id: 'step-execute',
    number: '03',
    title: 'EXECUTE',
    kicker: 'SYNCHRONIZED DEPLOYMENT',
    description: 'Our team builds and launches campaigns, creates short-form reels, optimizes search listings, and deploys high-speed landing pages in sync.',
    activities: [
      'Build and launch Google Search & Meta ad campaigns',
      'Deploy localized SEO enhancements & Google Map listings',
      'Produce visual brand posts, captions & engaging reels',
      'Engineer conversion-focused landing pages and contact forms'
    ],
    outcome: 'Active digital marketing channels working together to capture interest and generate leads.',
  },
  {
    id: 'step-scale',
    number: '04',
    title: 'MEASURE & IMPROVE',
    kicker: 'CONTINUOUS OPTIMIZATION',
    description: 'We track genuine lead enquiries, optimize ad spend away from underperforming segments, refine creative angles, and expand your market reach.',
    activities: [
      'Weekly campaign performance tuning & creative refreshes',
      'Ad budget re-allocation to highest-performing keywords',
      'Ongoing local search authority building & content updates',
      'Transparent monthly reporting focused on business enquiries'
    ],
    outcome: 'Sustainable digital growth with decreasing cost-per-lead over time.',
  },
];
