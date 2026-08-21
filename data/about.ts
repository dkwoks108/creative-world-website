export interface AboutContent {
  title: string;
  tagline: string;
  mission: string;
  vision: string;
  philosophy: string;
  corePrinciples: {
    title: string;
    description: string;
  }[];
  growthApproach: string;
}

export const aboutData: AboutContent = {
  title: 'About Surnax Technologies',
  tagline: 'Digital Innovation & Marketing Edge for Growing Brands.',
  mission: 'To empower Jaipur and Indian businesses with high-performance web engineering, creative video production, targeted marketing, and search intelligence that drive predictable business growth.',
  vision: 'Founded by Anuj Bhamboo, Surnax Technologies aims to be the premier performance marketing, web engineering, and video production partner in Rajasthan and across India.',
  philosophy: 'Traditional agencies treat paid ads, video production, search optimization, and web development as isolated tasks. Surnax Technologies unifies custom code, video storytelling, performance ads, and search strategy into a single growth engine.',
  corePrinciples: [
    {
      title: 'Performance & Revenue First',
      description: 'We focus on real business metrics—qualified lead enquiries, sales conversions, and customer acquisition efficiency—rather than vanity views.'
    },
    {
      title: 'Full-Stack Digital Mastery',
      description: 'From React/Node.js web engineering to short-form video reels and targeted ad funnels, we execute all technical and creative layers in-house.'
    },
    {
      title: 'Honest Data & Custom Execution',
      description: 'No generic visual templates or manufactured claims. Every campaign and web application is custom-built for client growth.'
    },
    {
      title: 'Jaipur & National Growth Focus',
      description: 'Headquartered in Jaipur, Rajasthan, we combine local market intelligence with national digital acquisition standards.'
    }
  ],
  growthApproach: 'We diagnose channel bottlenecks, engineer custom technical & creative roadmaps, execute multi-channel campaigns, and continuously optimize return on ad spend and conversion rates.'
};
