export interface ContactInfo {
  brandName: string;
  email: string;
  phone: string;
  instagram: string;
  location: string;
  whatsappMessage: string;
  responseExpectation: string;
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const contactData: ContactInfo = {
  brandName: 'Surnax Technologies',
  email: 'hello@surnaxtech.com',
  phone: '+91 70625 97062',
  instagram: '@surnaxtech',
  location: 'Jaipur, Rajasthan, India',
  whatsappMessage: 'Connect on WhatsApp for direct agency inquiries (+91 70625 97062)',
  responseExpectation: 'Our growth team reviews every submission within 24 business hours. Direct strategy call options available with CEO Anuj Bhamboo.',
  faqs: [
    {
      question: 'What happens after I submit a Growth Audit request?',
      answer: 'Our technical & growth team analyzes your website, video media, search visibility, and current ad channels. We reach out via phone (+91 70625 97062) or email with an initial diagnosis and a custom service quote.'
    },
    {
      question: 'Can Surnax Technologies work with businesses outside Jaipur?',
      answer: 'Yes. Headquartered in Jaipur, Rajasthan, Surnax Technologies partners with growing brands across India seeking full-stack web development, video production, performance marketing, and SEO.'
    },
    {
      question: 'How are project quotes and pricing structured at Surnax Technologies?',
      answer: 'Surnax Technologies uses a custom-quote model tailored to project requirements, scope of web engineering, and video production frequency rather than rigid e-commerce packages.'
    }
  ]
};
