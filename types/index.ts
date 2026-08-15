export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  slug: string;
  title: string;
  kicker: string;
  description: string;
  fullDescription: string;
  deliverables: string[];
  outcomeStatement: string;
  ctaLabel: string;
  keyBenefits: string[];
  processOverview: string[];
  image?: string;
  faqs?: ServiceFAQ[];
}

export interface IndustryItem {
  id: string;
  slug: string;
  title: string;
  kicker: string;
  shortDescription: string;
  overview: string;
  growthChallenges: string[];
  strategyPoints: string[];
  recommendedServices: string[];
  playbookSlug?: string;
  image?: string;
  faqs?: ServiceFAQ[];
}

export interface PackageTier {
  id: string;
  name: string;
  price: string;
  period: string;
  subtitle: string;
  idealFor: string;
  inclusions: string[];
  deliverables: string[];
  ctaText: string;
  featured?: boolean;
  disclaimer?: string;
}

export interface InsightArticle {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'SEO' | 'Paid Ads' | 'Social Media' | 'Websites' | 'Growth Strategy';
  publishedDate: string;
  readTime: string;
  author: string;
  summary: string;
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
  keyTakeaways: string[];
  relatedServices: string[];
  keywords: string[];
  image?: string;
}

export interface CaseStudyMetric {
  label: string;
  value: string;
  context: string;
}

export interface CaseStudyItem {
  id: string;
  slug: string;
  clientPlaceholderName: string;
  industryPlaceholder: string;
  title: string;
  shortDescription: string;
  challenge: string;
  strategy: string;
  execution: string[];
  takeaway: string;
  services: string[];
  metrics: CaseStudyMetric[];
  featured?: boolean;
  verified: boolean;
  image?: string;
}

export interface MetricPlaceholder {
  id: string;
  labelPlaceholder: string;
  valuePlaceholder: string;
  subtextPlaceholder: string;
}

export interface TestimonialPlaceholder {
  id: string;
  clientQuotePlaceholder: string;
  clientNamePlaceholder: string;
  clientRolePlaceholder: string;
  companyPlaceholder: string;
}

export interface TestimonialItem {
  id: string;
  quotePlaceholder: string;
  clientNamePlaceholder: string;
  clientRolePlaceholder: string;
  companyPlaceholder: string;
  relatedCaseStudySlug?: string;
  relatedCaseStudyTitle?: string;
  metricHighlightPlaceholder?: string;
  verified: boolean;
}

export interface ClientLogoPlaceholder {
  id: string;
  placeholderName: string;
  industryCategory: string;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  kicker: string;
  description: string;
  activities: string[];
  outcome: string;
}



