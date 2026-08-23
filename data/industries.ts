import { IndustryItem } from '@/types';
import { INDUSTRY_CASE_STUDIES, IndustryCaseStudy } from './industryCaseStudies';

// Legacy compatibility mapper
export const industriesData: IndustryItem[] = INDUSTRY_CASE_STUDIES.map((item) => ({
  id: item.id,
  slug: item.slug,
  title: item.title,
  kicker: item.kicker,
  shortDescription: item.shortProblem,
  overview: item.overview,
  growthChallenges: item.businessChallenge.points,
  strategyPoints: item.surnaxSolution.points,
  recommendedServices: item.surnaxSolution.servicesUsed,
  playbookSlug: item.slug,
  faqs: item.faqs,
  image: undefined
}));

export { INDUSTRY_CASE_STUDIES };
export type { IndustryCaseStudy };
