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
  title: 'About Creativee World',
  tagline: 'We Solve Business Growth Problems Through Integrated Digital Systems.',
  mission: 'To empower Jaipur businesses with honest, performance-driven digital marketing systems that turn search visibility, brand content, and paid advertising into predictable revenue growth.',
  vision: 'To become the premier digital growth partner in Rajasthan—recognized for data transparency, human copywriting, technical excellence, and genuine business impact.',
  philosophy: 'Traditional agencies treat paid ads, search optimization, social media, and web development as isolated silos. Creativee World unifies these channels into a connected growth engine where every campaign, ad rupee, and website interaction compounds to drive qualified customer enquiries.',
  corePrinciples: [
    {
      title: 'Business Outcomes Over Vanity Metrics',
      description: 'We measure success in qualified enquiries, cost-per-lead efficiency, and business growth—not meaningless clicks or artificial impression numbers.'
    },
    {
      title: 'Connected Growth Ecosystem',
      description: 'Paid ads feed landing pages; search intent informs social creative; web architecture captures enquiries. All channels work together seamlessly.'
    },
    {
      title: 'Honest Data & Transparent Proof',
      description: 'We hold ourselves to strict proof standards. No fabricated client metrics, no inflated claims, and plain-English reporting every month.'
    },
    {
      title: 'Jaipur Market Awareness',
      description: 'We understand local consumer behavior, regional business dynamics, and search intent across Jaipur and surrounding economic hubs.'
    }
  ],
  growthApproach: 'Our engagement model is straightforward: We diagnose where your current digital marketing is getting stuck, engineer a tailored growth roadmap across our 5 service pillars, execute high-converting campaigns, and continuously refine performance based on real enquiry data.'
};
