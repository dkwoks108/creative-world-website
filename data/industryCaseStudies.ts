import { ServiceFAQ } from '@/types';

export interface IndustryCaseStudy {
  id: string;
  slug: string;
  aliases?: string[];
  title: string;
  industryName: string;
  kicker: string;
  category: 
    | 'Education & Coaching' 
    | 'Public Sector & Leadership' 
    | 'Finance & Trading' 
    | 'Hospitality & Travel' 
    | 'Creators & Personal Brands' 
    | 'Healthcare & Medical' 
    | 'Legal & Corporate' 
    | 'Beauty & Creative' 
    | 'Health & Fitness' 
    | 'Food & Beverage' 
    | 'E-Commerce & Retail';
  shortProblem: string;
  overview: string;
  businessChallenge: {
    summary: string;
    points: string[];
  };
  surnaxSolution: {
    summary: string;
    servicesUsed: string[];
    points: string[];
  };
  capabilities: string[];
  transformation: {
    before: string[];
    after: string[];
  };
  potentialImpact: {
    summary: string;
    highlights: {
      label: string;
      value: string;
      subtext: string;
    }[];
  };
  technologyStack: string[];
  faqs?: ServiceFAQ[];
  image?: string;
  visualConcept: {
    type: 
      | 'dashboard'
      | 'analytics'
      | 'trading'
      | 'booking'
      | 'document'
      | 'itinerary'
      | 'creator'
      | 'medical'
      | 'legal'
      | 'campus'
      | 'portfolio'
      | 'beauty'
      | 'rehab'
      | 'fitness'
      | 'cafe'
      | 'funnel'
      | 'storefront'
      | 'organic';
    tagline: string;
  };
}

export const INDUSTRY_CASE_STUDIES: IndustryCaseStudy[] = [
  {
    id: 'ias-upsc-coaching',
    image: '/images/industries/cw-industry-ias-upsc.png',
    slug: 'ias-upsc-coaching',
    aliases: ['coaching'],
    title: 'Digital Enrolment Ecosystem & Student Acquisition Engine',
    industryName: 'IAS / UPSC Coaching',
    kicker: 'CIVIL SERVICES ADMISSION FUNNEL',
    category: 'Education & Coaching',
    shortProblem: 'High competition during exam cycles, wasted ad spend on unqualified queries, and manual paper-based enquiry processing.',
    overview: 'Civil service preparation academies face intense competition during annual batch announcement cycles. Students and parents demand instant curriculum transparency, proven faculty credentials, and structured counseling before committing to long-term preparation programs.',
    businessChallenge: {
      summary: 'Fragmented student enquiry channels lead to lost leads, slow phone follow-ups, and difficulty demonstrating academic authority online.',
      points: [
        'Generic social ads generate high click volumes with low student intent',
        'Outdated static websites fail to showcase current batch schedules and demo lectures',
        'Manual phone follow-ups create bottlenecks during peak admission months',
        'Lack of automated counseling booking systems reduces conversion rates'
      ]
    },
    surnaxSolution: {
      summary: 'Surnax builds high-converting educational portals, automated WhatsApp lead routing, and targeted Google Search campaigns.',
      servicesUsed: ['Custom Web Applications', 'SEO & Local Search', 'Automation & CRM', 'Performance Marketing'],
      points: [
        'High-speed admission portals featuring interactive syllabus finders and faculty video demos',
        'Automated WhatsApp API integration for instant syllabus PDF delivery and counseling booking',
        'Google Search campaigns targeting high-intent civil services queries in target cities',
        'Centralized lead management CRM to track applicant status from enquiry to fee payment'
      ]
    },
    capabilities: [
      'Interactive Syllabus & Batch Finder',
      'Instant WhatsApp PDF Prospectus Delivery',
      'Counselor Appointment Booking Portal',
      'Student Inquiry Lead Routing CRM'
    ],
    transformation: {
      before: [
        'Manual phone calls for prospectus inquiries',
        'Unstructured spreadsheets tracking student leads',
        'Generic landing pages with poor mobile loading speed',
        'Delayed counselor follow-ups after initial inquiry'
      ],
      after: [
        'Instant automated WhatsApp syllabus dispatches',
        'Centralized lead pipeline with automated status updates',
        'Lightning-fast mobile admissions portal',
        'Direct 24/7 self-service counseling slot booking'
      ]
    },
    potentialImpact: {
      summary: 'Illustrative potential operational improvements for competitive exam academies deploying automated digital infrastructure.',
      highlights: [
        { label: 'ENQUIRY QUALIFICATION', value: 'Streamlined', subtext: 'Potential reduction in unqualified phone inquiries' },
        { label: 'PROSPECTUS ACCESSIBILITY', value: 'Instant 24/7', subtext: 'Automated digital syllabus delivery via messaging API' },
        { label: 'COUNSELING EFFICIENCY', value: 'Automated', subtext: 'Projected reduction in manual appointment booking hours' }
      ]
    },
    technologyStack: ['Next.js App Router', 'WhatsApp Business API', 'PostgreSQL', 'Tailwind CSS', 'Google Ads API'],
    visualConcept: {
      type: 'dashboard',
      tagline: 'Civil Services Admissions & Student Portal'
    },
    faqs: [
      {
        question: 'How does automated WhatsApp prospectus delivery help UPSC coaching institutes?',
        answer: 'When prospective students request a batch syllabus online, an automated workflow instantly sends the verified PDF and batch timing details to their phone via WhatsApp, engaging them immediately while capturing verified contact details.'
      }
    ]
  },
  {
    id: 'politician-campaigns',
    image: '/images/industries/cw-industry-coaching-01.png',
    slug: 'politician-campaigns',
    title: 'Constituent Digital Platform & Campaign Command Center',
    industryName: 'Politician Campaigns',
    kicker: 'CAMPAIGN STRATEGY & BROADCAST INFRASTRUCTURE',
    category: 'Public Sector & Leadership',
    shortProblem: 'Scattered public outreach channels, unorganized citizen feedback, and difficulty broadcasting regional campaign achievements at scale.',
    overview: 'Modern political campaigns require structured digital communication hubs to share manifestos, archive community initiatives, address constituent grievances, and broadcast official updates across digital constituencies.',
    businessChallenge: {
      summary: 'Public representatives struggle with fragmented communication across social platforms without a centralized official record of achievements.',
      points: [
        'Misinformation and unverified channels undermining official statements',
        'No centralized portal for citizens to submit regional public grievances',
        'Inconsistent digital press release distribution during key legislative cycles',
        'Lack of real-time sentiment monitoring across constituency digital channels'
      ]
    },
    surnaxSolution: {
      summary: 'Surnax crafts secure leader portals, constituent grievance intake systems, and high-capacity digital broadcasting funnels.',
      servicesUsed: ['Custom Web Applications', 'Digital Branding', 'Analytics & Dashboards', 'Workflow Automation'],
      points: [
        'Secure official leadership portals showcasing legislative achievements and vision documents',
        'Categorized constituent grievance submission forms with tracking ticket confirmation',
        'High-deliverability broadcast systems for press dispatches and constituency updates',
        'Responsive media kits for rapid press download of high-resolution speeches and photos'
      ]
    },
    capabilities: [
      'Official Leader Portfolio & Vision Vault',
      'Constituent Grievance Intake & Tracking Portal',
      'Multilingual Press Release Dispatch Engine',
      'Secure Media Asset & Speech Archive'
    ],
    transformation: {
      before: [
        'Unorganized social media comments for public issues',
        'No verified single source of official stance and news',
        'Manual media kit distribution via drive links',
        'Delayed constituent feedback processing'
      ],
      after: [
        'Structured ticketing portal for constituent requests',
        'Verified central digital portal for official policy dispatches',
        'One-click high-resolution media downloads for press',
        'Streamlined citizen engagement and feedback loops'
      ]
    },
    potentialImpact: {
      summary: 'Illustrative outcomes for campaign leadership teams implementing structured constituent technology.',
      highlights: [
        { label: 'CONSTITUENT REACH', value: 'Direct Hub', subtext: 'Centralized channel for verified public messaging' },
        { label: 'GRIEVANCE TRACKING', value: 'Structured', subtext: 'Systematic categorization of community concerns' },
        { label: 'MEDIA DISPATCH SPEED', value: 'Real-Time', subtext: 'Instant press release availability for journalists' }
      ]
    },
    technologyStack: ['Next.js', 'Tailwind CSS', 'Vercel Edge Network', 'Cloudinary Media CDN', 'SendGrid Broadcast'],
    visualConcept: {
      type: 'analytics',
      tagline: 'Constituent Engagement & Campaign Command Interface'
    }
  },
  {
    id: 'trading-institutes',
    image: '/images/industries/cw-industry-trading.png',
    slug: 'trading-institutes',
    title: 'Financial Education Platform & Masterclass Lead Engine',
    industryName: 'Trading Institutes',
    kicker: 'FINANCIAL EDUCATION & BATCH FUNNELS',
    category: 'Finance & Trading',
    shortProblem: 'High customer acquisition costs, skepticism around financial training quality, and manual webinar attendee management.',
    overview: 'Stock market academies and financial literacy centers need to establish institutional trust, showcase transparent curriculum modules, and convert webinar registrants into enrolled batch participants.',
    businessChallenge: {
      summary: 'Financial academies battle trust barriers on social media while dealing with low webinar attendance rates from casual signups.',
      points: [
        'Wasted ad budgets on non-paying webinar registrants',
        'Inability to clearly demonstrate live trading room infrastructure online',
        'Manual registration verification leading to drop-offs before batch start dates',
        'Unstructured payment gateways causing friction during checkout'
      ]
    },
    surnaxSolution: {
      summary: 'Surnax engineers high-converting financial masterclass funnels, automated SMS/WhatsApp reminders, and secure student dashboards.',
      servicesUsed: ['E-Commerce & Funnels', 'Custom Web Applications', 'Automation & CRM', 'Performance Marketing'],
      points: [
        'Interactive webinar registration funnels with live countdown timer and seat counters',
        'Automated multi-touch reminder sequences (WhatsApp, SMS, Email) prior to masterclass sessions',
        'Secure course access portals for enrolled batch students with video module streaming',
        'Seamless Razorpay/Stripe integration for single-click module enrollment'
      ]
    },
    capabilities: [
      'High-Conversion Masterclass Landing Funnel',
      'Automated Webinar Attendance Reminder Pipeline',
      'Gated Student Learning Portal & Video Streamer',
      'Instant Payment Gateway & Invoice Engine'
    ],
    transformation: {
      before: [
        'Manual WhatsApp broadcast links for live classes',
        'High drop-off between webinar registration and attendance',
        'Disorganized Google Drive course material links',
        'Manual bank transfer screenshot verification'
      ],
      after: [
        'Automated calendar invites and WhatsApp reminder ping',
        'Projected improvement in live webinar show-up rates',
        'Professional gated student LMS dashboard',
        'Instant automated course enrollment upon payment'
      ]
    },
    potentialImpact: {
      summary: 'Illustrative transformation metrics for stock trading academies upgrading their digital acquisition infrastructure.',
      highlights: [
        { label: 'WEBINAR SHOW-UP RATE', value: 'Optimized', subtext: 'Potential improvement via multi-channel automated reminders' },
        { label: 'STUDENT ONBOARDING', value: 'Instant', subtext: 'Immediate LMS login delivery following payment' },
        { label: 'TRUST VERIFICATION', value: 'Enhanced', subtext: 'Clean institutional UI building buyer confidence' }
      ]
    },
    technologyStack: ['Next.js', 'PostgreSQL', 'Razorpay API', 'WhatsApp Webhooks', 'AWS S3 Video Vault'],
    visualConcept: {
      type: 'trading',
      tagline: 'Financial Masterclass & Live Trading Portal'
    }
  },
  {
    id: 'hotel-industry',
    image: '/images/industries/cw-industry-hospitality-01.png',
    slug: 'hotel-industry',
    title: 'Direct Booking Engine & Luxury Hospitality Experience',
    industryName: 'Hotel Industry',
    kicker: 'BOUTIQUE HOSPITALITY & DIRECT RESERVATION',
    category: 'Hospitality & Travel',
    shortProblem: 'Heavy dependency on OTA commissions, outdated room showcase galleries, and inefficient banquet/wedding inquiry management.',
    overview: 'Luxury boutique hotels and heritage resorts lose significant revenue to 3rd party booking commissions. Direct digital booking portals with immersive room tours elevate room yield and secure high-value event bookings.',
    businessChallenge: {
      summary: 'Hotels pay high commissions to aggregators while receiving low-margin direct bookings due to clunky property websites.',
      points: [
        'High OTA commission fees reducing net revenue per available room (RevPAR)',
        'Poor mobile booking flow causing cart abandonment during room date selection',
        'Unoptimized banquet and wedding venue inquiry forms losing high-ticket event leads',
        'Slow loading imagery diminishing property visual luxury appeal'
      ]
    },
    surnaxSolution: {
      summary: 'Surnax delivers custom hotel reservation portals, wedding venue inquiry engines, and high-speed visual showcases.',
      servicesUsed: ['Custom Web Applications', 'Digital Branding', 'SEO & Local Search', 'Booking Systems'],
      points: [
        'Custom direct booking interface with date picker, room selection, and add-on amenities',
        'High-performance image showcase with lazy-loading room suites and virtual property tours',
        'Dedicated Wedding & Corporate Event inquiry portal with instant RFP submission',
        'Local SEO optimization targeting luxury hotel searches and destination wedding keywords'
      ]
    },
    capabilities: [
      'Zero-Commission Direct Room Booking Engine',
      'Interactive Room Suite & Amenity Selector',
      'Banquet & Event RFP Proposal Manager',
      'Google Maps & Concierge Integration'
    ],
    transformation: {
      before: [
        '80%+ reliance on high-commission OTA aggregators',
        'Static PDF room brochures with no date check availability',
        'Slow contact forms for wedding venue pricing',
        'Lacks mobile-first instant reservation flow'
      ],
      after: [
        'Increased share of direct zero-commission bookings',
        'Real-time date availability & instant confirmation',
        'Custom event RFP builder capturing complete specs',
        'Cinematic mobile reservation experience'
      ]
    },
    potentialImpact: {
      summary: 'Illustrative potential financial improvements for hospitality brands driving direct digital reservations.',
      highlights: [
        { label: 'DIRECT BOOKING SHARE', value: 'Expanded', subtext: 'Potential growth in zero-commission direct reservations' },
        { label: 'EVENT RFP INQUIRIES', value: 'Structured', subtext: 'Detailed lead collection for banquets and weddings' },
        { label: 'GUEST ENGAGEMENT', value: 'Seamless', subtext: 'Instant mobile-first room selection and checkout' }
      ]
    },
    technologyStack: ['Next.js App Router', 'Stripe / Payment Gateway', 'Tailwind CSS', 'Framer Motion', 'Mapbox API'],
    visualConcept: {
      type: 'booking',
      tagline: 'Boutique Hotel Direct Reservation Engine'
    }
  },
  {
    id: 'government-tenders',
    image: '/images/industries/cw-industry-realestate-01.png',
    slug: 'government-tenders',
    title: 'Enterprise Bid Management & Tender Documentation Vault',
    industryName: 'Government Tenders',
    kicker: 'ENTERPRISE BID & PROCUREMENT PORTAL',
    category: 'Legal & Corporate',
    shortProblem: 'Complex compliance documentation, tight submission deadlines, and risk of missing eligible RFP opportunities.',
    overview: 'Contractors and infrastructure firms participating in public sector procurement require secure document workflows, compliance verification dashboards, and automated tender tracking tools.',
    businessChallenge: {
      summary: 'Infrastructure firms lose valuable contracts due to disorganized tender documents, missed deadlines, and manual audit checks.',
      points: [
        'Scattered compliance certificates and financial audit files across department drives',
        'Manual monitoring of multiple government procurement portals',
        'Risk of bid rejection due to minor documentation formatting errors',
        'Lack of central repository for past project completion certificates and credentials'
      ]
    },
    surnaxSolution: {
      summary: 'Surnax engineers secure tender document vaults, automated bid readiness checkers, and enterprise procurement trackers.',
      servicesUsed: ['Custom Web Applications', 'Workflow Automation', 'Analytics & Dashboards', 'Custom Software'],
      points: [
        'Encrypted document repository for company GST, ISO, balance sheets, and completion certificates',
        'RFP compliance checklist generator ensuring all required tender annexures are attached',
        'Automated alert system tracking upcoming bid submission dates and EMD deposit deadlines',
        'Secure multi-user access permissions for company bidding teams and technical directors'
      ]
    },
    capabilities: [
      'Encrypted Corporate Document Vault',
      'Automated RFP Annexure & Readiness Checklist',
      'Bid Submission Deadline Tracker & Alerts',
      'Past Execution Portfolio & Credential Catalog'
    ],
    transformation: {
      before: [
        'Scrambling to locate auditor certificates hours before tender closing',
        'Manual spreadsheet tracking of open government RFPs',
        'Disorganized project completion proof files',
        'Risk of missing mandatory tender eligibility clauses'
      ],
      after: [
        'One-click export of verified company tender dossier',
        'Automated notification pipeline for relevant procurement categories',
        'Centralized encrypted vault with version control',
        'Structured pre-submission compliance audit flow'
      ]
    },
    potentialImpact: {
      summary: 'Illustrative operational benefits for government contracting companies implementing digital tender infrastructure.',
      highlights: [
        { label: 'DOCUMENT RETRIEVAL', value: 'Instant', subtext: 'Rapid compilation of certified company tender papers' },
        { label: 'BID COMPLIANCE', value: 'Verified', subtext: 'Systematic check against mandatory RFP annexures' },
        { label: 'SUBMISSION TIMELINESS', value: 'Protected', subtext: 'Automated milestone notifications preventing late filings' }
      ]
    },
    technologyStack: ['Next.js', 'PostgreSQL (RLS Enabled)', 'AWS S3 Encryption', 'Node.js Microservices', 'Tailwind CSS'],
    visualConcept: {
      type: 'document',
      tagline: 'Enterprise Government Tender & Compliance Vault'
    }
  },
  {
    id: 'tour-travel',
    image: '/images/industries/cw-industry-hospitality-01.png',
    slug: 'tour-travel',
    title: 'Custom Itinerary Builder & Travel Inquiry Hub',
    industryName: 'Tour & Travel',
    kicker: 'DESTINATION DISCOVERY & CUSTOM PACKAGES',
    category: 'Hospitality & Travel',
    shortProblem: 'Slow manual quote generation for custom itineraries, low website engagement, and high lead leakage during holiday seasons.',
    overview: 'Tour operators and destination management companies (DMCs) need dynamic package showcases, interactive custom itinerary builders, and instant WhatsApp inquiry channels to capture travel intent.',
    businessChallenge: {
      summary: 'Travel agencies lose holiday inquiries to competitors because generating customized day-by-day tour itineraries takes too long.',
      points: [
        'Static travel websites with non-interactive text-heavy tour itineraries',
        'Manual calculations for hotel + cab + sightseeing packages delaying quotes',
        'High lead drop-offs during festive and summer travel booking windows',
        'Difficulty demonstrating verified customer travel reviews and photo blogs'
      ]
    },
    surnaxSolution: {
      summary: 'Surnax builds interactive travel itinerary builders, instant quote engines, and search-optimized destination guides.',
      servicesUsed: ['Custom Web Applications', 'SEO & Local Search', 'Automation & CRM', 'Business Websites'],
      points: [
        'Interactive day-by-day itinerary explorer with high-resolution destination previews',
        'Custom Tour Cost Estimator allowing travelers to choose duration, hotel tier, and group size',
        'Automated WhatsApp inquiry trigger sending instant custom travel quotes to clients',
        'Destination SEO landing pages targeting specific holiday package search terms'
      ]
    },
    capabilities: [
      'Interactive Day-by-Day Itinerary Builder',
      'Dynamic Tour Package Cost Estimator',
      'Instant WhatsApp Itinerary Quote Dispatch',
      'Destination SEO Landing Page Engine'
    ],
    transformation: {
      before: [
        '24-48 hour delay sending manual PDF quotes to travelers',
        'Static non-responsive itinerary pages',
        'Scattered customer inquiries across phone, email, and social media',
        'Low organic discovery for regional tour keywords'
      ],
      after: [
        'Instant interactive quote generation on mobile',
        'Visual rich destination guides with photo galleries',
        'Centralized lead pipeline with automated lead assignment',
        'Strong search rankings for high-intent travel queries'
      ]
    },
    potentialImpact: {
      summary: 'Illustrative performance outcomes for tour operators modernizing their digital itinerary systems.',
      highlights: [
        { label: 'QUOTE DISPATCH SPEED', value: 'Sub-Minute', subtext: 'Potential reduction in customized itinerary response times' },
        { label: 'LEAD ENGAGEMENT', value: 'Interactive', subtext: 'Travelers customize duration and preferences self-service' },
        { label: 'SEARCH VISIBILITY', value: 'Targeted', subtext: 'High ranking for destination-specific holiday terms' }
      ]
    },
    technologyStack: ['Next.js App Router', 'Tailwind CSS', 'WhatsApp Business API', 'Contentful CMS', 'Google Maps API'],
    visualConcept: {
      type: 'itinerary',
      tagline: 'Interactive Travel Itinerary & Quote System'
    }
  },
  {
    id: 'vloggers-content-creators',
    image: '/images/industries/cw-industry-creator.png',
    slug: 'vloggers-content-creators',
    title: 'Creator Brand Hub, Media Kit & Sponsorship Portal',
    industryName: 'Vloggers / Content Creators',
    kicker: 'CREATOR ECONOMY & BRAND SPONSORSHIPS',
    category: 'Creators & Personal Brands',
    shortProblem: 'Reliance on social algorithms, chaotic brand deal inquiries in DMs, and lack of professional media kit infrastructure.',
    overview: 'High-reach vloggers and digital creators need an owned platform to showcase audience demographics, manage brand sponsorship inquiries, sell digital products, and archive their top content.',
    businessChallenge: {
      summary: 'Creators miss high-value brand deals because brand sponsorship emails get lost in social DMs without live media metrics.',
      points: [
        'Social media DMs overflowing with unvetted brand collaboration requests',
        'Outdated static PDF media kits requiring constant manual metric updates',
        'Complete platform risk relying solely on 3rd party algorithm distribution',
        'Lack of direct monetization channels for digital courses, presets, or merch'
      ]
    },
    surnaxSolution: {
      summary: 'Surnax crafts personal creator websites, real-time dynamic media kits, brand inquiry forms, and digital storefronts.',
      servicesUsed: ['Custom Web Applications', 'Digital Branding', 'E-Commerce', 'Social Media & Brand Growth'],
      points: [
        'Personal creator hub featuring YouTube/Instagram API video integrations and bio links',
        'Dynamic live media kit automatically pulling channel subscriber, view, and engagement stats',
        'Structured Brand Sponsorship Inquiry Portal capturing budget, deliverables, and timeline',
        'Integrated digital store for selling creator lightroom presets, ebooks, or merchandise'
      ]
    },
    capabilities: [
      'Live Dynamic Creator Media Kit & Analytics',
      'Brand Sponsorship Inquiry & Qualification Portal',
      'Personal Video Archive & Curated Playlists',
      'Direct Digital Product & Merch Storefront'
    ],
    transformation: {
      before: [
        'Manually editing Canva PDF media kits every month',
        'Negotiating brand deals through unorganized Instagram DMs',
        'Zero ownership of audience contact list or email subscribers',
        'Unvetted low-budget sponsor requests filling inbox'
      ],
      after: [
        'Real-time automated analytics updates for brand managers',
        'Professional inquiry form filtering serious brand budgets',
        'Owned email newsletter capture for direct fan communication',
        'Seamless digital product sales with instant download'
      ]
    },
    potentialImpact: {
      summary: 'Illustrative growth impact for digital creators building an owned platform ecosystem.',
      highlights: [
        { label: 'SPONSORSHIP INQUIRY QUALITY', value: 'Filtered', subtext: 'Potential improvement in deal qualification via structured forms' },
        { label: 'MEDIA KIT DISPATCH', value: 'Live Link', subtext: 'Real-time updated metrics accessible to agency partners 24/7' },
        { label: 'AUDIENCE OWNERSHIP', value: 'Direct Hub', subtext: 'Building owned subscriber database independent of algorithms' }
      ]
    },
    technologyStack: ['Next.js', 'YouTube Data API', 'Instagram Graph API', 'Stripe', 'Tailwind CSS'],
    visualConcept: {
      type: 'creator',
      tagline: 'Creator Media Kit & Brand Collaboration Studio'
    }
  },
  {
    id: 'doctors-healthcare',
    image: '/images/industries/cw-industry-clinic-01.png',
    slug: 'doctors-healthcare',
    title: 'Patient Trust Portal & Tele-Health Appointment System',
    industryName: 'Doctors',
    kicker: 'PATIENT TRUST & CLINIC APPOINTMENTS',
    category: 'Healthcare & Medical',
    shortProblem: 'Phone line congestion during consultation hours, patient hesitation due to unverified online presence, and manual appointment logging.',
    overview: 'Medical specialists and private clinics require clean, WCAG-compliant medical web portals that establish doctor authority, explain treatment procedures, and streamline online appointment scheduling.',
    businessChallenge: {
      summary: 'Clinics lose patients when front-desk phone lines are busy and lack an accessible online platform for appointment bookings.',
      points: [
        'Patients struggling to reach reception desk to confirm consultation slots',
        'Lack of clear pre-consultation guidelines and treatment procedure overviews',
        'Low visibility on local search for specific medical treatment queries',
        'Inefficient manual patient intake leading to long waiting room delays'
      ]
    },
    surnaxSolution: {
      summary: 'Surnax delivers secure doctor portals, automated SMS appointment reminders, and local medical search optimization.',
      servicesUsed: ['Custom Web Applications', 'SEO & Local Search', 'Automation & CRM', 'Business Websites'],
      points: [
        'Clean patient portal detailing doctor credentials, specializations, and clinic hours',
        'Self-service appointment booking engine with slot selection and instant SMS/WhatsApp confirmation',
        'Pre-consultation intake forms allowing patients to submit medical history securely before visits',
        'Medical local search optimization for targeted health queries (e.g. "dermatologist near me")'
      ]
    },
    capabilities: [
      'Self-Service Patient Appointment Scheduler',
      'Automated SMS & WhatsApp Slot Confirmation',
      'Doctor Qualification & Treatment Showcase',
      'Secure Medical History Intake Form'
    ],
    transformation: {
      before: [
        'Busy reception phone lines losing prospective patients',
        'No clear online information on doctor fees or timing',
        'Manual paper registration forms filled in waiting rooms',
        'High appointment no-show rates without reminders'
      ],
      after: [
        '24/7 online slot booking with instant confirmation',
        'Transparent clinic hours and doctor specialization guides',
        'Digital intake forms completed prior to arrival',
        'Automated reminder pings reducing no-shows'
      ]
    },
    potentialImpact: {
      summary: 'Illustrative clinic operational enhancements achieved through automated patient scheduling technology.',
      highlights: [
        { label: 'APPOINTMENT ACCESSIBILITY', value: '24/7 Online', subtext: 'Patients book slots outside regular clinic operating hours' },
        { label: 'NO-SHOW RATE', value: 'Reduced', subtext: 'Potential decrease through automated appointment reminder pings' },
        { label: 'WAITING ROOM EFFICIENCY', value: 'Improved', subtext: 'Pre-filled digital intake forms speeding up consultation prep' }
      ]
    },
    technologyStack: ['Next.js App Router', 'Tailwind CSS', 'Twilio SMS API', 'PostgreSQL', 'Framer Motion'],
    visualConcept: {
      type: 'medical',
      tagline: 'Medical Specialist Patient Portal & Scheduling Engine'
    },
    faqs: [
      {
        question: 'Is the appointment scheduling system easy for older patients to use on mobile?',
        answer: 'Yes. We design with clean, high-contrast, large-button mobile touch interfaces optimized for clarity, ensuring patients of all ages can select a date, time, and doctor in 3 simple steps.'
      }
    ]
  },
  {
    id: 'lawyers-legal',
    image: '/images/industries/cw-industry-lawyers.png',
    slug: 'lawyers-legal',
    title: 'Legal Practice Portal & Consultation Scheduling Vault',
    industryName: 'Lawyers',
    kicker: 'LEGAL PRACTICE & CONFIDENTIAL CONSULTATION',
    category: 'Legal & Corporate',
    shortProblem: 'High client trust requirements, unorganized client intake inquiries, and manual consultation fee collection.',
    overview: 'Law firms and independent advocates need a authoritative, highly polished digital presence that communicates legal practice areas, manages client consultation bookings, and collects upfront consultation retainers securely.',
    businessChallenge: {
      summary: 'Lawyers spend unbillable hours filtering unqualified case inquiries and dealing with last-minute consultation cancellations.',
      points: [
        'Unqualified or out-of-jurisdiction legal inquiries wasting partner time',
        'Lack of professional practice area guides for corporate, property, or litigation matters',
        'Manual payment chasing for initial legal opinion and consultation fees',
        'No secure encrypted intake channel for confidential case documents'
      ]
    },
    surnaxSolution: {
      summary: 'Surnax builds legal practice websites, client intake screeners, secure retainer payment flows, and document upload portals.',
      servicesUsed: ['Custom Web Applications', 'Digital Branding', 'SEO & Local Search', 'Workflow Automation'],
      points: [
        'Authoritative legal website showcasing firm partners, landmark case domains, and credentials',
        'Categorized client intake screener filtering case type, jurisdiction, and urgency',
        'Integrated consultation scheduling with mandatory retainer payment before slot booking',
        'Encrypted document upload portal for confidential case summary files'
      ]
    },
    capabilities: [
      'Legal Practice Area & Partner Credentials Portal',
      'Jurisdiction & Case Screener Intake Form',
      'Consultation Slot Booking with Prepaid Retainer',
      'Encrypted Confidential Client Document Vault'
    ],
    transformation: {
      before: [
        'Unscreened phone calls for general non-billable legal questions',
        'Unpaid initial consultation slots and last-minute cancellations',
        'Client case documents emailed through unencrypted channels',
        'Minimal online presence diminishing institutional trust'
      ],
      after: [
        'Structured pre-qualifying questionnaire for prospective clients',
        'Prepaid consultation bookings securing partner schedule',
        'Encrypted file transfer portal protecting attorney-client privilege',
        'High-authority web presence attracting premium corporate clients'
      ]
    },
    potentialImpact: {
      summary: 'Illustrative practice efficiency gains for legal professionals implementing automated client onboarding.',
      highlights: [
        { label: 'INQUIRY QUALIFICATION', value: 'Pre-Screened', subtext: 'Potential elimination of out-of-scope legal inquiries' },
        { label: 'BILLABLE SLOT SECURITY', value: 'Prepaid', subtext: 'Consultation fees collected upfront at time of booking' },
        { label: 'CLIENT CONFIDENTIALITY', value: 'Encrypted', subtext: 'Secure document transmission meeting legal standards' }
      ]
    },
    technologyStack: ['Next.js', 'Stripe / Razorpay', 'AWS Encrypted Storage', 'Tailwind CSS', 'TypeScript'],
    visualConcept: {
      type: 'legal',
      tagline: 'Legal Practice Management & Consultation Engine'
    }
  },
  {
    id: 'colleges-educational-institutes',
    image: '/images/industries/cw-industry-coaching-01.png',
    slug: 'colleges-educational-institutes',
    title: 'Smart Campus Portal & Digital Admissions Ecosystem',
    industryName: 'Colleges / Educational Institutes',
    kicker: 'HIGHER EDUCATION & CAMPUS ADMISSIONS',
    category: 'Education & Coaching',
    shortProblem: 'Outdated legacy college portals, slow mobile experience for prospective students, and chaotic seasonal admission applications.',
    overview: 'Colleges, universities, and vocational institutes require modern digital ecosystems to showcase campus infrastructure, manage multi-program application workflows, and engage prospective students during annual admission drives.',
    businessChallenge: {
      summary: 'Legacy higher education websites fail to convert prospective applicants due to clunky navigation, broken forms, and slow load times.',
      points: [
        'Clunky, non-responsive legacy portals frustrating tech-savvy prospective students',
        'Complex paper application processes causing high applicant drop-offs',
        'Lack of interactive virtual campus tours and department highlights',
        'Siloed admissions data making applicant tracking difficult for registrar office'
      ]
    },
    surnaxSolution: {
      summary: 'Surnax engineers next-generation college web portals, multi-step application engines, and digital campus experience hubs.',
      servicesUsed: ['Custom Web Applications', 'Custom Software', 'SEO & Local Search', 'Automation & CRM'],
      points: [
        'Modern, lightning-fast institution portal highlighting departments, placement stats, and campus life',
        'Multi-step online admission application engine with document upload and application fee checkout',
        'Interactive program finder filtering by degree level, career outcome, and duration',
        'Centralized registrar dashboard tracking applicant pipeline across all faculties'
      ]
    },
    capabilities: [
      'Multi-Program Admission Application Engine',
      'Interactive Course & Department Directory',
      'Virtual Campus & Placement Highlight Hub',
      'Centralized Applicant Management Dashboard'
    ],
    transformation: {
      before: [
        'Paper application forms mailed or submitted physically',
        'Outdated mobile experience driving prospective students away',
        'Scattered department information across disjointed subdomains',
        'Manual document verification delaying admission lists'
      ],
      after: [
        '100% digital application submission with fee payment',
        'Mobile-optimized interactive student portal',
        'Unified design architecture representing institutional excellence',
        'Real-time applicant status tracking for admissions team'
      ]
    },
    potentialImpact: {
      summary: 'Illustrative digital campus outcomes for higher education institutions modernizing their admissions stack.',
      highlights: [
        { label: 'APPLICATION COMPLETION', value: 'Streamlined', subtext: 'Potential reduction in application drop-off rates' },
        { label: 'PROSPECTIVE ENGAGEMENT', value: 'Modern UI', subtext: 'High-speed mobile experience aligning with student expectations' },
        { label: 'REGISTRAR EFFICIENCY', value: 'Automated', subtext: 'Centralized digital verification of student credentials' }
      ]
    },
    technologyStack: ['Next.js App Router', 'PostgreSQL', 'Tailwind CSS', 'Cloudinary CDN', 'SendGrid API'],
    visualConcept: {
      type: 'campus',
      tagline: 'Smart Campus Higher Education Admission Ecosystem'
    }
  },
  {
    id: 'wedding-shoots',
    image: '/images/industries/cw-industry-jewelry-01.png',
    slug: 'wedding-shoots',
    title: 'Cinematic Production Showcase & Date Availability Booking',
    industryName: 'Wedding Shoots',
    kicker: 'LUXURY WEDDING PHOTOGRAPHY & FILM',
    category: 'Beauty & Creative',
    shortProblem: 'Heavy image portfolio slowdowns, pricing ambiguity, and managing dates across wedding seasons.',
    overview: 'Premium wedding photography studios and film directors need a luxury portfolio showcase that loads full-frame imagery instantaneously, presents service packages clearly, and manages date availability inquiries.',
    businessChallenge: {
      summary: 'High-end wedding photographers lose affluent brides and planners when slow portfolio sites fail to display high-res work cleanly.',
      points: [
        'Slow portfolio load times ruining the visual impact of high-resolution wedding films and photos',
        'Unorganized date availability inquiries resulting in double-booking risks',
        'Vague pricing information leading to price haggling from low-intent inquiries',
        'Difficulty showcasing distinct film reels, drone cinematography, and album design samples'
      ]
    },
    surnaxSolution: {
      summary: 'Surnax crafts high-speed cinematic portfolio sites, interactive date availability checkers, and custom wedding package builders.',
      servicesUsed: ['Custom Web Applications', 'Digital Branding', 'SEO & Local Search', 'Booking Systems'],
      points: [
        'Ultra-fast cinematic portfolio site with optimized lazy-loading high-res galleries and embedded 4K video reels',
        'Interactive Wedding Date Availability Checker allowing couples to verify studio availability for their dates',
        'Custom Package Estimator detailing cinematography, candid photography, drone coverage, and album add-ons',
        'SEO optimization targeting "destination wedding photographer" and luxury wedding terms'
      ]
    },
    capabilities: [
      'High-Speed 4K Cinema & Photo Portfolio Showcase',
      'Interactive Wedding Date Availability Checker',
      'Custom Multi-Tier Package & Add-On Estimator',
      'Destination Wedding Inquiry & Booking Portal'
    ],
    transformation: {
      before: [
        'Sending heavy PDF portfolios or Google Drive links via WhatsApp',
        'Unstructured pricing discussions for destination weddings',
        'Slow website causing potential clients to exit',
        'Manual date checking across studio calendars'
      ],
      after: [
        'Instant loading full-bleed cinematic portfolio',
        'Transparent package builder filtering qualified budgets',
        'Seamless mobile visual experience for brides & planners',
        'Automated date availability checking'
      ]
    },
    potentialImpact: {
      summary: 'Illustrative growth improvements for wedding production studios upgrading their visual brand presentation.',
      highlights: [
        { label: 'PORTFOLIO SPEED', value: 'Ultra-Fast', subtext: 'High-resolution photo loading without performance lag' },
        { label: 'PACKAGE QUALIFICATION', value: 'Pre-Set', subtext: 'Couples explore deliverables and price tiers before inquiring' },
        { label: 'DESTINATION LEADS', value: 'Global Reach', subtext: 'Search-optimized portfolio attracting luxury wedding planners' }
      ]
    },
    technologyStack: ['Next.js', 'Vercel Edge Network', 'Cloudinary Video CDN', 'Tailwind CSS', 'Framer Motion'],
    visualConcept: {
      type: 'portfolio',
      tagline: 'Cinematic Wedding Studio & Date Booking Portal'
    }
  },
  {
    id: 'makeup-artists',
    image: '/images/industries/cw-industry-apparel-01.png',
    slug: 'makeup-artists',
    title: 'Beauty Lookbook Showcase & Bridal Appointment Engine',
    industryName: 'Makeup Artists',
    kicker: 'BRIDAL BEAUTY & STUDIO BOOKINGS',
    category: 'Beauty & Creative',
    shortProblem: 'Double-booking during bridal seasons, unorganized Instagram DM inquiries, and manual advance deposit management.',
    overview: 'Professional makeup artists and celebrity beauty stylists require an elegant, visual booking portal to highlight bridal lookbooks, manage event-day scheduling, and collect advance booking deposits.',
    businessChallenge: {
      summary: 'Makeup artists lose track of bridal inquiries across Instagram DMs, leading to scheduling conflicts and lost deposits.',
      points: [
        'Managing hundreds of Instagram DMs asking for "rates" during wedding season',
        'Losing track of client dates and booking deposits without a central calendar',
        'Lacks a dedicated platform to display HD transformation lookbooks by occasion (Bridal, Engagement, Party)',
        'No automated system to collect non-refundable advance booking deposits'
      ]
    },
    surnaxSolution: {
      summary: 'Surnax delivers stylish beauty lookbook portals, automated date booking calendars, and advance deposit payment flows.',
      servicesUsed: ['Custom Web Applications', 'Digital Branding', 'Automation & CRM', 'Booking Systems'],
      points: [
        'Visual lookbook showcase categorized by Bridal, HD Airbrush, Sangeet, and Editorial makeup styles',
        'Real-time booking calendar allowing clients to pick event date, venue location, and time slot',
        'Integrated deposit payment gate securing client dates with instant digital receipt dispatch',
        'Automated pre-event preparation checklist sent via WhatsApp to brides before their booking date'
      ]
    },
    capabilities: [
      'Categorized HD Beauty & Bridal Lookbook Showcase',
      'Real-Time Event Date & Slot Booking Engine',
      'Advance Deposit Payment & Receipt Gateway',
      'Automated Bridal Pre-Event Care Reminders'
    ],
    transformation: {
      before: [
        'Scattered rate inquiries across Instagram comments and DMs',
        'Manual bank transfers to lock wedding dates',
        'Risk of double-booking during peak festive dates',
        'No central portfolio website representing brand quality'
      ],
      after: [
        'Central booking link in bio with clear rates and packages',
        'Automated deposit collection locking dates instantly',
        'Error-free calendar preventing slot overlaps',
        'High-aesthetic digital lookbook reflecting artistry'
      ]
    },
    potentialImpact: {
      summary: 'Illustrative operational improvements for beauty artists professionalizing their client booking workflow.',
      highlights: [
        { label: 'BRIDAL BOOKING SPEED', value: 'Instant Lock', subtext: 'Dates locked immediately upon deposit payment' },
        { label: 'INQUIRY CONVERSION', value: 'Streamlined', subtext: 'Bio link directs social traffic to self-service package selector' },
        { label: 'CALENDAR ACCURACY', value: '100% Synced', subtext: 'Potential elimination of booking overlaps during peak season' }
      ]
    },
    technologyStack: ['Next.js', 'Stripe / Razorpay', 'Tailwind CSS', 'Cloudinary Image Engine', 'TypeScript'],
    visualConcept: {
      type: 'beauty',
      tagline: 'Bridal Beauty Lookbook & Booking Studio'
    }
  },
  {
    id: 'physiotherapy-clinics',
    image: '/images/industries/cw-industry-clinic-01.png',
    slug: 'physiotherapy-clinics',
    title: 'Clinic Rehab Scheduler & Patient Recovery Portal',
    industryName: 'Physiotherapy Clinics',
    kicker: 'REHABILITATION & SESSION MANAGEMENT',
    category: 'Healthcare & Medical',
    shortProblem: 'Irregular patient session follow-ups, manual appointment scheduling, and difficulty tracking long-term rehab plans.',
    overview: 'Physiotherapy centers and sports rehab clinics need modern booking tools, patient exercise video portals, and automated treatment package management to ensure consistent recovery outcomes.',
    businessChallenge: {
      summary: 'Rehab clinics experience high patient drop-off rates mid-treatment because patients forget sessions without structured tracking.',
      points: [
        'Patients dropping out of multi-session rehab programs before full recovery',
        'Manual phone calls to remind patients of upcoming therapy appointments',
        'Lack of home exercise video guides for patients between clinic sessions',
        'Difficulties managing therapist schedules across multiple treatment beds'
      ]
    },
    surnaxSolution: {
      summary: 'Surnax constructs clinic booking portals, patient rehab progress dashboards, and automated session reminder funnels.',
      servicesUsed: ['Custom Web Applications', 'SEO & Local Search', 'Automation & CRM', 'Business Websites'],
      points: [
        'Multi-session appointment booking system for knee, back, sports injury, and post-surgery rehab',
        'Patient digital portal with prescribed video exercises and treatment milestone tracking',
        'Automated WhatsApp session reminders sent 2 hours before scheduled therapy slots',
        'Local SEO strategy ranking clinic high for "physiotherapist near me" and specialized rehab terms'
      ]
    },
    capabilities: [
      'Multi-Session Therapy Appointment Scheduler',
      'Patient Home Exercise Video Portal',
      'Automated Session Reminder & Follow-Up Pings',
      'Local Clinic Search SEO & Review Booster'
    ],
    transformation: {
      before: [
        'Paper appointment cards easily misplaced by patients',
        'High session dropout rates after 2-3 visits',
        'Handwritten exercise instructions patients struggle to follow',
        'Phone line congestion during peak evening clinic hours'
      ],
      after: [
        'Digital session package tracking with automatic reminders',
        'Improved program completion rates via video exercise portal',
        'Clear video guidance for home exercise routines',
        'Online slot booking freeing up front-desk staff'
      ]
    },
    potentialImpact: {
      summary: 'Illustrative recovery program adherence improvements achieved via automated clinic software.',
      highlights: [
        { label: 'PROGRAM ADHERENCE', value: 'Enhanced', subtext: 'Potential improvement in multi-session rehab completion' },
        { label: 'SESSION REMINDERS', value: 'Automated', subtext: 'Automated WhatsApp pings reducing missed appointment slots' },
        { label: 'PATIENT SATISFACTION', value: 'Video Guided', subtext: '24/7 access to prescribed home rehab exercises' }
      ]
    },
    technologyStack: ['Next.js App Router', 'Tailwind CSS', 'WhatsApp Webhooks', 'PostgreSQL', 'Framer Motion'],
    visualConcept: {
      type: 'rehab',
      tagline: 'Physiotherapy Rehab Scheduler & Patient Portal'
    }
  },
  {
    id: 'gyms-fitness-centers',
    image: '/images/monochrome_arch.png',
    slug: 'gyms-fitness-centers',
    title: 'Member Pass Engine, Trainer Booking & Class Portal',
    industryName: 'Gyms',
    kicker: 'FITNESS CLUB & MEMBERSHIP ENGINE',
    category: 'Health & Fitness',
    shortProblem: 'High seasonal membership churn, unorganized personal trainer scheduling, and low trial pass conversions.',
    overview: 'Modern gyms, CrossFit boxes, and wellness centers require dynamic membership portals, day-pass booking engines, personal trainer schedulers, and automated renewal reminder systems.',
    businessChallenge: {
      summary: 'Gyms struggle with member retention and lose potential walk-in leads due to friction in claiming trial day passes.',
      points: [
        'Complex registration forms discouraging prospective members from claiming trial passes',
        'Manual personal training (PT) slot management leading to scheduling conflicts',
        'High membership churn when members forget annual/quarterly renewal dates',
        'Lack of online visibility for specialized group classes (Spin, Yoga, HIIT)'
      ]
    },
    surnaxSolution: {
      summary: 'Surnax engineers gym membership portals, automated pass claiming funnels, class schedulers, and renewal reminders.',
      servicesUsed: ['Custom Web Applications', 'SEO & Local Search', 'Automation & CRM', 'Performance Marketing'],
      points: [
        'High-converting 1-Day Trial Pass landing page with instant QR code delivery to mobile',
        'Interactive Group Class Schedule allowing members to reserve workout slots self-service',
        'Personal Trainer Booking Portal showcasing trainer profiles, transformations, and open slots',
        'Automated WhatsApp subscription renewal reminders triggered 7 days before membership expiry'
      ]
    },
    capabilities: [
      'Instant QR Mobile Day-Pass Claim System',
      'Interactive Group Fitness Class Booking Grid',
      'Personal Trainer Profile & Slot Scheduler',
      'Automated Membership Renewal Notification Engine'
    ],
    transformation: {
      before: [
        'Paper gym trial vouchers easily lost by prospective members',
        'Overcrowded group classes due to lack of cap reservations',
        'Manual phone calls chasing overdue membership fees',
        'Basic static website with outdated class timetables'
      ],
      after: [
        'Instant digital pass delivery directly to mobile wallet/WhatsApp',
        'Capped online class reservations preventing room overcrowding',
        'Automated payment links sent prior to membership expiration',
        'Dynamic website showcasing real facility transformations'
      ]
    },
    potentialImpact: {
      summary: 'Illustrative membership growth and retention improvements for fitness centers leveraging automated portals.',
      highlights: [
        { label: 'TRIAL PASS CONVERSION', value: 'QR Delivered', subtext: 'Potential increase in walk-in trial pass redemptions' },
        { label: 'CLASS RESERVATION', value: 'Self-Service', subtext: 'Members reserve limited-seat group fitness classes online' },
        { label: 'MEMBERSHIP RENEWAL', value: 'Automated', subtext: 'Proactive reminder sequence reducing subscription lapse' }
      ]
    },
    technologyStack: ['Next.js', 'PostgreSQL', 'Stripe / Razorpay', 'Tailwind CSS', 'QR Code Generator API'],
    visualConcept: {
      type: 'fitness',
      tagline: 'Gym Membership & Trainer Scheduler Platform'
    }
  },
  {
    id: 'cafes-restaurants',
    image: '/images/industries/cw-industry-hospitality-01.png',
    slug: 'cafes-restaurants',
    title: 'Digital QR Menu, Order Engine & Customer Loyalty Hub',
    industryName: 'Cafés',
    kicker: 'HOSPITALITY & CONTACTLESS ORDERING',
    category: 'Food & Beverage',
    shortProblem: 'High delivery aggregator commissions, slow table order taking during rush hours, and weak customer loyalty retention.',
    overview: 'Cafés, artisan coffee shops, and bistros need direct QR ordering systems, digital menu showcases, weekend event booking engines, and customer loyalty retention programs.',
    businessChallenge: {
      summary: 'Cafés lose margin to third-party delivery platforms and experience table service slowdowns during weekend peak hours.',
      points: [
        'Table order delays during peak coffee and dining hours due to waiter availability',
        'Paying 25-30% commissions on direct takeaway and delivery orders',
        'Inability to capture customer contact details to drive repeat coffee visits',
        'Static paper menus that are expensive to re-print when prices or seasonal items change'
      ]
    },
    surnaxSolution: {
      summary: 'Surnax builds high-speed digital QR menus, direct ordering portals, local map SEO boosters, and loyalty reward funnels.',
      servicesUsed: ['Custom Web Applications', 'SEO & Local Search', 'Digital Branding', 'E-Commerce'],
      points: [
        'Instant loading Mobile QR Menu allowing table dining guests to browse and order directly',
        'Direct Takeaway & Delivery ordering portal eliminating third-party aggregator commissions',
        'Automated Customer Loyalty Pass sending return discounts via WhatsApp after visit',
        'Google Business Profile & Map Pack optimization dominating "best cafe near me" searches'
      ]
    },
    capabilities: [
      'Instant Mobile QR Code Table Menu System',
      'Zero-Commission Direct Takeaway Ordering Engine',
      'Automated WhatsApp Customer Loyalty Stamp Card',
      'Google Map Pack & Local SEO Optimizer'
    ],
    transformation: {
      before: [
        'Waiters struggling to take table orders during weekend rush',
        'High commission loss on direct local delivery orders',
        'Paper menus requiring physical updates for price changes',
        'Zero contact data collected from daily cafe visitors'
      ],
      after: [
        'Faster table order processing via instant QR menu scans',
        '100% margin retained on direct web orders',
        'Instant digital menu updates for seasonal specials',
        'Owned customer database for weekend event announcements'
      ]
    },
    potentialImpact: {
      summary: 'Illustrative dining room and takeaway revenue improvements achieved with custom hospitality software.',
      highlights: [
        { label: 'TABLE ORDER SPEED', value: 'Instant Scan', subtext: 'Potential reduction in guest order waiting times' },
        { label: 'DIRECT MARGIN', value: '100% Retained', subtext: 'Elimination of aggregator commissions on direct web orders' },
        { label: 'REPEAT VISITS', value: 'Loyalty Pings', subtext: 'Automated return offers driving repeat coffee purchases' }
      ]
    },
    technologyStack: ['Next.js App Router', 'Tailwind CSS', 'Razorpay / Stripe', 'WhatsApp Webhooks', 'PWA Support'],
    visualConcept: {
      type: 'cafe',
      tagline: 'Café QR Digital Menu & Direct Ordering System'
    }
  },
  {
    id: 'online-teaching-instagram',
    image: '/images/industries/cw-industry-coaching-01.png',
    slug: 'online-teaching-instagram',
    title: 'DM Funnel Automation & Digital Micro-Course Portal',
    industryName: 'Online Teaching on Instagram',
    kicker: 'INSTAGRAM EDUCATORS & COURSE FUNNELS',
    category: 'Creators & Personal Brands',
    shortProblem: 'Manual DM replies to comments like "link", chaotic course delivery, and low lead-to-paid-student conversion.',
    overview: 'Instagram educators, language coaches, and skill tutors need automated comment-to-DM triggers, instant micro-course checkout funnels, and structured student learning portals.',
    businessChallenge: {
      summary: 'Educators on Instagram waste hours manually DMing links to thousands of post comments, losing sales due to delayed responses.',
      points: [
        'Hundreds of "send link" comments on reels left unreplied for hours',
        'Manually sending course access links via Instagram DMs after payment',
        'Lack of branded student portal for video lessons, PDFs, and assignments',
        'Low conversion rates when sending traffic to generic 3rd party course platforms'
      ]
    },
    surnaxSolution: {
      summary: 'Surnax deploys automated Instagram DM trigger funnels, high-converting checkout landing pages, and custom course portals.',
      servicesUsed: ['Custom Web Applications', 'Automation & CRM', 'E-Commerce & Funnels', 'Performance Marketing'],
      points: [
        'Automated Comment-to-DM bot sending instant course landing links whenever users comment key phrases',
        'Single-Click Mobile Checkout Funnel optimized for instant UPI / card course purchases',
        'Branded Gated Student LMS Portal for streaming video modules and downloading study notes',
        'Automated student onboarding sequence via WhatsApp with login credentials and community link'
      ]
    },
    capabilities: [
      'Automated Instagram Comment-to-DM Trigger Engine',
      'High-Speed Mobile Micro-Course Checkout Funnel',
      'Branded Gated Student Learning Portal (LMS)',
      'Instant WhatsApp Student Credentials Onboarding'
    ],
    transformation: {
      before: [
        'Copy-pasting course links manually to Instagram comments',
        'Delayed payment verification via DM screenshots',
        'Disorganized Google Drive video folders for course content',
        'High drop-off between reel view and course purchase'
      ],
      after: [
        'Instant automated DM sent within 2 seconds of comment',
        'Automated payment confirmation and student login generation',
        'Professional branded LMS portal enhancing course value',
        'Higher conversion from social engagement to paid student'
      ]
    },
    potentialImpact: {
      summary: 'Illustrative course sales velocity gains for digital educators implementing automated social funnels.',
      highlights: [
        { label: 'DM RESPONSE SPEED', value: '< 2 Seconds', subtext: 'Instant automated link dispatch to reel commenters' },
        { label: 'STUDENT ONBOARDING', value: 'Zero-Touch', subtext: 'Automated LMS account creation upon payment' },
        { label: 'COURSE BRAND VALUE', value: 'Institutional', subtext: 'Custom LMS web app establishing high course credibility' }
      ]
    },
    technologyStack: ['Next.js', 'Meta Graph API', 'Razorpay API', 'PostgreSQL', 'Tailwind CSS'],
    visualConcept: {
      type: 'funnel',
      tagline: 'Instagram Educator DM Automation & Micro-Course LMS'
    }
  },
  {
    id: 'clothing-brands',
    image: '/images/industries/cw-industry-apparel-01.png',
    slug: 'clothing-brands',
    title: 'High-Fashion E-Commerce Storefront & Lookbook Engine',
    industryName: 'Clothing Brands',
    kicker: 'APPAREL BOUTIQUE & E-COMMERCE HUB',
    category: 'E-Commerce & Retail',
    shortProblem: 'High cart abandonment on mobile, slow product image loading, and difficulty presenting new collection drops.',
    overview: 'Apparel brands and boutique fashion houses require ultra-fast e-commerce storefronts, interactive lookbook collection drops, size recommendation engines, and seamless checkout pipelines.',
    businessChallenge: {
      summary: 'Clothing brands lose significant mobile ad traffic due to slow collection page rendering and clunky checkout steps.',
      points: [
        'Slow mobile storefront loading causing high bounce rates from Instagram ad clicks',
        'High checkout abandonment due to lack of instant address auto-complete and local payment options',
        'Inability to present high-resolution fabric texture details without compromising page speed',
        'Difficulty managing seasonal collection launches and stock inventory alerts'
      ]
    },
    surnaxSolution: {
      summary: 'Surnax crafts headless e-commerce storefronts, interactive collection lookbooks, size guide engines, and retargeting ad flows.',
      servicesUsed: ['E-Commerce & Funnels', 'Custom Web Applications', 'Digital Branding', 'Performance Marketing'],
      points: [
        'Headless Next.js e-commerce storefront rendering collection grids in under 1 second',
        'Interactive "Shop The Look" lookbook allowing shoppers to buy entire outfits from visual photos',
        'Mobile-optimized 1-click checkout with automated UPI payment integration and COD verification',
        'Automated WhatsApp cart recovery sequence pings capturing abandoned shopping carts'
      ]
    },
    capabilities: [
      'Sub-Second Mobile Headless E-Commerce Storefront',
      'Interactive "Shop The Look" Collection Lookbook',
      '1-Click Mobile Checkout & COD Verification Gate',
      'Automated WhatsApp Cart Abandonment Recovery'
    ],
    transformation: {
      before: [
        'Slow template store taking 4+ seconds to load product photos',
        'High cart abandonment on mobile ad campaigns',
        'Generic product pages with basic static size tables',
        'No automated follow-up for uncompleted checkouts'
      ],
      after: [
        'Lightning-fast storefront delivering smooth mobile shopping',
        'Streamlined 1-click checkout reducing purchase friction',
        'Interactive visual lookbooks elevating brand perception',
        'Automated WhatsApp cart reminders recovering lost sales'
      ]
    },
    potentialImpact: {
      summary: 'Illustrative e-commerce conversion improvements for apparel brands deploying high-performance storefronts.',
      highlights: [
        { label: 'STOREFRONT SPEED', value: 'Sub-Second', subtext: 'Potential decrease in bounce rate from mobile ad clicks' },
        { label: 'CHECKOUT CONVERSION', value: 'Streamlined', subtext: 'Reduced cart drop-offs via optimized mobile checkout flow' },
        { label: 'CART RECOVERY', value: 'Automated', subtext: 'Targeted recovery sequences capturing uncompleted orders' }
      ]
    },
    technologyStack: ['Next.js App Router', 'Tailwind CSS', 'Shopify Storefront API / Custom DB', 'Stripe / Razorpay', 'WhatsApp API'],
    visualConcept: {
      type: 'storefront',
      tagline: 'Headless Apparel E-Commerce Storefront & Lookbook'
    }
  },
  {
    id: 'organic-products',
    image: '/images/industries/cw-industry-organic.png',
    slug: 'organic-products',
    title: 'Farm-to-Table E-Commerce & Subscription Box Engine',
    industryName: 'Organic Products',
    kicker: 'SUSTAINABLE BRAND & SUBSCRIPTION E-COMMERCE',
    category: 'E-Commerce & Retail',
    shortProblem: 'Communicating organic certification trust online, managing recurring customer subscriptions, and high customer acquisition costs.',
    overview: 'Organic food, natural skincare, and wellness brands need transparent source-verification portals, recurring subscription box checkout options, and trust-focused brand storytelling.',
    businessChallenge: {
      summary: 'Organic brands battle customer skepticism about product authenticity while struggling to build recurring monthly order revenue.',
      points: [
        'Customers doubting genuine organic origins without verifiable lab/farm certifications online',
        'High single-order acquisition costs requiring recurring monthly subscription models to be profitable',
        'Lack of batch traceability showing sourcing dates and farm locations',
        'Unoptimized mobile store failing to highlight eco-friendly packaging and purity standards'
      ]
    },
    surnaxSolution: {
      summary: 'Surnax constructs farm-to-table e-commerce platforms, recurring subscription box management engines, and origin verification portals.',
      servicesUsed: ['E-Commerce & Funnels', 'Custom Web Applications', 'Digital Branding', 'Automation & CRM'],
      points: [
        'Clean eco-aesthetic e-commerce portal with farm-to-table batch traceability QR verifier',
        'Recurring Subscription Box Engine allowing customers to schedule weekly/monthly organic deliveries',
        'Purity & Lab Test Certification Vault showcasing verified lab reports for every product batch',
        'Automated WhatsApp subscription management letting buyers pause, modify, or swap items easily'
      ]
    },
    capabilities: [
      'Farm-to-Table Batch Origin Traceability Vault',
      'Recurring Weekly/Monthly Subscription Box Engine',
      'Interactive Lab Test Certification Viewer',
      'Automated WhatsApp Subscription Management Bot'
    ],
    transformation: {
      before: [
        'Single one-off purchases with low customer lifetime value (LTV)',
        'Unverified organic claims printed on packaging only',
        'Manual phone calls to manage monthly milk/grocery deliveries',
        'Generic e-commerce template lacking eco-brand identity'
      ],
      after: [
        'Predictable monthly recurring revenue (MRR) via subscription plans',
        'Verifiable batch lab certificates building deep brand trust',
        'Self-service WhatsApp bot for delivery date changes',
        'Distinct natural visual identity setting brand apart from commercial rivals'
      ]
    },
    potentialImpact: {
      summary: 'Illustrative recurring revenue and trust building gains for organic wellness brands upgrading their digital stack.',
      highlights: [
        { label: 'RECURRING REVENUE', value: 'Subscription Model', subtext: 'Potential growth in monthly recurring subscription orders' },
        { label: 'BRAND TRUST', value: 'Lab Verified', subtext: 'Batch origin transparency building long-term customer loyalty' },
        { label: 'SUBSCRIPTION FLEXIBILITY', value: 'Self-Service', subtext: 'Customers easily adjust delivery dates via messaging bot' }
      ]
    },
    technologyStack: ['Next.js App Router', 'Tailwind CSS', 'Stripe Subscriptions / Razorpay AutoPay', 'PostgreSQL', 'WhatsApp API'],
    visualConcept: {
      type: 'organic',
      tagline: 'Sustainable Organic E-Commerce & Subscription Engine'
    }
  }
];

export function getIndustryBySlug(slug: string): IndustryCaseStudy | undefined {
  return INDUSTRY_CASE_STUDIES.find(
    (ind) => ind.slug === slug || (ind.aliases && ind.aliases.includes(slug))
  );
}

export function getAllIndustryCategories(): string[] {
  const categories = new Set<string>();
  INDUSTRY_CASE_STUDIES.forEach((ind) => categories.add(ind.category));
  return Array.from(categories);
}
