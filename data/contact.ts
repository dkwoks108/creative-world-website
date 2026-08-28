export interface ContactInfo {
  brandName: string;
  email: string;
  location: string;
  whatsappMessage: string;
  responseExpectation: string;
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const contactData: ContactInfo = {
  brandName: 'Creativee World',
  email: 'hello@creativeworld.in',
  location: 'Jaipur, Rajasthan, India',
  whatsappMessage: 'Connect on WhatsApp for direct agency inquiries',
  responseExpectation: 'Our growth team reviews every submission within 24 business hours. No aggressive sales sequences—just a focused review of your business growth opportunities.',
  faqs: [
    {
      question: 'What happens after I submit a Growth Audit request?',
      answer: 'Our strategic team analyzes your website, search visibility, and current channel presence. We then reach out via email or phone with an initial diagnosis of your growth opportunities and a recommended package scope.'
    },
    {
      question: 'Can Creativee World work with businesses outside Jaipur?',
      answer: 'While our primary focus and local expertise are centered in Jaipur, Rajasthan, we partner with growing brands across India seeking structured performance marketing and web conversion systems.'
    },
    {
      question: 'Do I need to commit to a long-term contract?',
      answer: 'Our growth packages are structured month-to-month with clear deliverables, giving your business full flexibility while we demonstrate ongoing growth value.'
    }
  ]
};
