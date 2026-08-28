import React from 'react';
import { Metadata } from 'next';
import { LegalPageLayout, TocItem } from '@/components/ui/LegalPageLayout';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'Privacy Policy | Creativee World Jaipur',
  description: 'Learn how Creativee World collects, uses, and safeguards information provided via our digital growth audit forms and website interaction.',
  openGraph: {
    title: 'Privacy Policy | Creativee World Digital Growth Studio',
    description: 'Transparent privacy practices and data governance policies for Creativee World in Jaipur, Rajasthan.',
  },
};

const privacyToc: TocItem[] = [
  { id: 'effective-date', title: 'Effective Date & Scope' },
  { id: 'introduction', title: 'Introduction' },
  { id: 'information-collected', title: 'Information We Collect' },
  { id: 'direct-information', title: 'Information You Provide Directly' },
  { id: 'automatic-information', title: 'Information Collected Automatically' },
  { id: 'information-use', title: 'How We Use Information' },
  { id: 'analytics-cookies', title: 'Website Analytics & Cookies' },
  { id: 'lead-forms', title: 'Lead Forms & Audit Enquiries' },
  { id: 'information-sharing', title: 'How We Share Information' },
  { id: 'third-party-services', title: 'Third-Party Services' },
  { id: 'data-retention', title: 'Data Retention' },
  { id: 'data-security', title: 'Data Security' },
  { id: 'privacy-choices', title: 'Your Privacy Choices' },
  { id: 'children-privacy', title: 'Children\'s Privacy' },
  { id: 'external-links', title: 'External Links' },
  { id: 'policy-updates', title: 'Updates to This Policy' },
  { id: 'contact-us', title: 'Contact Information' },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="August 15, 2026"
      description="Transparent, clear disclosure of how Creativee World handles business enquiries, audit request data, and website visitor information."
      toc={privacyToc}
    >
      {/* 01. Effective Date */}
      <section id="effective-date" className="space-y-4 pt-4 border-t-2 border-black">
        <div className="flex items-center space-x-2 font-mono text-xs text-black font-bold uppercase tracking-wider">
          <span>SECTION 01</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-black uppercase">
          1. Effective Date & Scope
        </h2>
        <p className="font-serifBody text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
          This Privacy Policy is effective as of <strong>August 15, 2026</strong> and applies to all visitors, business owners, and clients accessing the digital platforms operated by <strong>Creativee World</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), headquartered in Jaipur, Rajasthan, India.
        </p>
      </section>

      {/* 02. Introduction */}
      <section id="introduction" className="space-y-4 pt-8 border-t-2 border-black">
        <div className="flex items-center space-x-2 font-mono text-xs text-black font-bold uppercase tracking-wider">
          <span>SECTION 02</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-black uppercase">
          2. Introduction
        </h2>
        <p className="font-serifBody text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
          At Creativee World, we believe digital growth consulting requires transparency—not only in performance metrics, but also in how personal and business data is handled. This document explains what information we collect when you explore our website, request a Growth Audit, or contact our agency, and how that information is used responsibly.
        </p>
      </section>

      {/* 03. Information We Collect */}
      <section id="information-collected" className="space-y-4 pt-8 border-t-2 border-black">
        <div className="flex items-center space-x-2 font-mono text-xs text-black font-bold uppercase tracking-wider">
          <span>SECTION 03</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-black uppercase">
          3. Information We Collect
        </h2>
        <p className="font-serifBody text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
          We collect minimal information necessary to evaluate business enquiries, communicate with potential clients, deliver growth strategy recommendations, and maintain the technical security of our digital platform.
        </p>
      </section>

      {/* 04. Information You Provide Directly */}
      <section id="direct-information" className="space-y-4 pt-8 border-t-2 border-black">
        <div className="flex items-center space-x-2 font-mono text-xs text-black font-bold uppercase tracking-wider">
          <span>SECTION 04</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-black uppercase">
          4. Information You Provide Directly
        </h2>
        <p className="font-serifBody text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
          When you complete a <strong>Growth Audit Form</strong>, schedule a growth consultation, or submit an enquiry on our website, you voluntarily provide us with business information including:
        </p>
        <ul className="list-disc pl-6 space-y-2 font-serifBody text-sm sm:text-base text-neutral-800 font-normal">
          <li><strong>Full Name & Title:</strong> To address your communication respectfully.</li>
          <li><strong>Business Email Address:</strong> To deliver diagnostic findings and proposal documents.</li>
          <li><strong>Website URL & Industry Domain:</strong> To analyze your current search visibility, technical performance, and market competitors in Jaipur.</li>
          <li><strong>Primary Business Goals & Growth Needs:</strong> To scope relevant performance marketing or website development recommendations.</li>
          <li><strong>Budget Expectations & Timeline:</strong> To evaluate package alignment and project feasibility.</li>
          <li><strong>Additional Notes or Qualitative Context:</strong> Details you choose to share regarding your current channel bottlenecks.</li>
        </ul>
      </section>

      {/* 05. Information Collected Automatically */}
      <section id="automatic-information" className="space-y-4 pt-8 border-t-2 border-black">
        <div className="flex items-center space-x-2 font-mono text-xs text-black font-bold uppercase tracking-wider">
          <span>SECTION 05</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-black uppercase">
          5. Information Collected Automatically
        </h2>
        <p className="font-serifBody text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
          Like most modern web platforms, when you navigate our site, basic technical request metadata may be logged automatically by server hosting providers for security and operational diagnostics:
        </p>
        <ul className="list-disc pl-6 space-y-2 font-serifBody text-sm sm:text-base text-neutral-800 font-normal">
          <li>Internet Protocol (IP) address and broad network region.</li>
          <li>Browser type, user agent string, and operating system version.</li>
          <li>Date and time stamps of page requests.</li>
          <li>Referring URLs or entry routes into our website.</li>
        </ul>
      </section>

      {/* 06. How We Use Information */}
      <section id="information-use" className="space-y-4 pt-8 border-t-2 border-black">
        <div className="flex items-center space-x-2 font-mono text-xs text-black font-bold uppercase tracking-wider">
          <span>SECTION 06</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-black uppercase">
          6. How We Use Information
        </h2>
        <p className="font-serifBody text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
          Creativee World uses collected business information strictly for legitimate commercial consulting purposes:
        </p>
        <ul className="list-disc pl-6 space-y-2 font-serifBody text-sm sm:text-base text-neutral-800 font-normal">
          <li>Conducting initial digital growth audits and channel diagnostic reviews.</li>
          <li>Preparing customized service scope recommendations and pricing proposals.</li>
          <li>Responding directly to business enquiries submitted via email or contact forms.</li>
          <li>Maintaining server uptime, preventing fraudulent spam submissions, and securing our digital infrastructure.</li>
        </ul>
      </section>

      {/* 07. Website Analytics and Cookies */}
      <section id="analytics-cookies" className="space-y-4 pt-8 border-t-2 border-black">
        <div className="flex items-center space-x-2 font-mono text-xs text-black font-bold uppercase tracking-wider">
          <span>SECTION 07</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-black uppercase">
          7. Website Analytics and Cookies
        </h2>
        <p className="font-serifBody text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
          <strong>Current Operational Status:</strong> As of the effective date, the Creativee World core presentation website does not actively run intrusive third-party cross-site advertising tracking pixels (such as Meta Pixel or third-party behavioral remarketing networks). 
        </p>
        <p className="font-serifBody text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
          Standard essential functional session cookies or local web storage may be utilized by our web application framework strictly to support UI preferences, fluid animations, and secure form state handling.
        </p>
      </section>

      {/* 08. Lead Forms and Growth Audit Enquiries */}
      <section id="lead-forms" className="space-y-4 pt-8 border-t-2 border-black">
        <div className="flex items-center space-x-2 font-mono text-xs text-black font-bold uppercase tracking-wider">
          <span>SECTION 08</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-black uppercase">
          8. Lead Forms and Growth Audit Enquiries
        </h2>
        <p className="font-serifBody text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
          Information submitted through our Growth Audit forms is received directly by our strategic consulting team. We do not sell, rent, or trade your lead submission details to third-party data brokers or external telemarketing lists.
        </p>
      </section>

      {/* 09. How We Share Information */}
      <section id="information-sharing" className="space-y-4 pt-8 border-t-2 border-black">
        <div className="flex items-center space-x-2 font-mono text-xs text-black font-bold uppercase tracking-wider">
          <span>SECTION 09</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-black uppercase">
          9. How We Share Information
        </h2>
        <p className="font-serifBody text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
          We share your business information only under limited, necessary circumstances:
        </p>
        <ul className="list-disc pl-6 space-y-2 font-serifBody text-sm sm:text-base text-neutral-800 font-normal">
          <li><strong>Authorized Service Providers:</strong> Trusted cloud infrastructure, web hosting, and email processing partners operating under confidentiality standards to deliver form messages.</li>
          <li><strong>Legal Requirements:</strong> If required by applicable Indian law, court order, or governmental authority to comply with legal processes or protect agency rights.</li>
        </ul>
      </section>

      {/* 10. Third-Party Services */}
      <section id="third-party-services" className="space-y-4 pt-8 border-t-2 border-black">
        <div className="flex items-center space-x-2 font-mono text-xs text-black font-bold uppercase tracking-wider">
          <span>SECTION 10</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-black uppercase">
          10. Third-Party Services
        </h2>
        <p className="font-serifBody text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
          In executing client projects (such as Google Ads management or Meta ad campaign setups), client ad accounts remain owned directly by the client. Third-party advertising platforms (Google Ads, Meta Business Manager) maintain their own independent privacy and data governance policies.
        </p>
      </section>

      {/* 11. Data Retention */}
      <section id="data-retention" className="space-y-4 pt-8 border-t-2 border-black">
        <div className="flex items-center space-x-2 font-mono text-xs text-black font-bold uppercase tracking-wider">
          <span>SECTION 11</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-black uppercase">
          11. Data Retention
        </h2>
        <p className="font-serifBody text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
          We retain Growth Audit submissions and email correspondence for as long as necessary to fulfill consulting evaluation, maintain ongoing client communication, or satisfy legal and record-keeping obligations.
        </p>
      </section>

      {/* 12. Data Security */}
      <section id="data-security" className="space-y-4 pt-8 border-t-2 border-black">
        <div className="flex items-center space-x-2 font-mono text-xs text-black font-bold uppercase tracking-wider">
          <span>SECTION 12</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-black uppercase">
          12. Data Security
        </h2>
        <p className="font-serifBody text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
          Creativee World employs reasonable technical safeguards—including HTTPS encryption in transit and restricted team access—to protect incoming audit information. However, no internet transmission method is 100% immune to security vulnerabilities.
        </p>
      </section>

      {/* 13. Your Privacy Choices */}
      <section id="privacy-choices" className="space-y-4 pt-8 border-t-2 border-black">
        <div className="flex items-center space-x-2 font-mono text-xs text-black font-bold uppercase tracking-wider">
          <span>SECTION 13</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-black uppercase">
          13. Your Privacy Choices
        </h2>
        <p className="font-serifBody text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
          You may at any time request to review, update, or remove your business submission details from our direct active lead databases by contacting our studio team at <strong>{siteConfig.contactEmailPlaceholder}</strong>.
        </p>
      </section>

      {/* 14. Children's Privacy */}
      <section id="children-privacy" className="space-y-4 pt-8 border-t-2 border-black">
        <div className="flex items-center space-x-2 font-mono text-xs text-black font-bold uppercase tracking-wider">
          <span>SECTION 14</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-black uppercase">
          14. Children&apos;s Privacy
        </h2>
        <p className="font-serifBody text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
          Our digital growth consulting services are directed exclusively to business professionals and adult enterprise owners. We do not knowingly collect personal data from individuals under 18 years of age.
        </p>
      </section>

      {/* 15. External Links */}
      <section id="external-links" className="space-y-4 pt-8 border-t-2 border-black">
        <div className="flex items-center space-x-2 font-mono text-xs text-black font-bold uppercase tracking-wider">
          <span>SECTION 15</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-black uppercase">
          15. External Links
        </h2>
        <p className="font-serifBody text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
          Our website may contain references or links to client platforms or external resources. Creativee World is not responsible for the privacy practices or content of third-party external websites.
        </p>
      </section>

      {/* 16. Updates to This Policy */}
      <section id="policy-updates" className="space-y-4 pt-8 border-t-2 border-black">
        <div className="flex items-center space-x-2 font-mono text-xs text-black font-bold uppercase tracking-wider">
          <span>SECTION 16</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-black uppercase">
          16. Updates to This Privacy Policy
        </h2>
        <p className="font-serifBody text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
          We may update this Privacy Policy periodically to reflect shifts in our agency services or regulatory standards. Revised versions will feature an updated &quot;Effective Date&quot; at the top of this page.
        </p>
      </section>

      {/* 17. Contact Information */}
      <section id="contact-us" className="space-y-4 pt-8 border-t-2 border-black pb-8">
        <div className="flex items-center space-x-2 font-mono text-xs text-black font-bold uppercase tracking-wider">
          <span>SECTION 17</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-black uppercase">
          17. Contact Us
        </h2>
        <p className="font-serifBody text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
          If you have questions regarding this Privacy Policy or our data governance practices, please contact our Jaipur studio team:
        </p>
        <div className="p-6 border-2 border-black bg-white space-y-2 font-mono text-xs text-black uppercase">
          <p className="font-bold text-black text-sm">CREATIVEE WORLD STUDIO TEAM</p>
          <p>Email: {siteConfig.contactEmailPlaceholder}</p>
          <p>Location: {siteConfig.locationPlaceholder}</p>
        </div>
      </section>
    </LegalPageLayout>
  );
}

