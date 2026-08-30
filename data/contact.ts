export interface ContactInfo {
  brandName: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  whatsappUrl: string;
  telLink: string;
  mailtoLink: string;
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
  email: 'marketing.creativeworld@gmail.com',
  phone: '+91 73571 59122',
  whatsappNumber: '+917357159122',
  whatsappUrl: 'https://wa.me/917357159122',
  telLink: 'tel:+917357159122',
  mailtoLink: 'mailto:marketing.creativeworld@gmail.com',
  location: 'Jaipur, Rajasthan, India',
  whatsappMessage: 'Connect on WhatsApp (+91 73571 59122) for direct agency inquiries',
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
