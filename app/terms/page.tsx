import React from 'react';
import { Metadata } from 'next';
import { LegalPageLayout, TocItem } from '@/components/ui/LegalPageLayout';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'Terms of Service | Surnax Technologies',
  description: 'Review the commercial terms, service engagement conditions, ad spend disclaimers, and governance policies for Surnax Technologies.',
  openGraph: {
    title: 'Terms of Service | Surnax Technologies Studio',
    description: 'Commercial terms of service for web engineering, video production, performance ads, and SEO engagements at Surnax Technologies.',
  },
};

const termsToc: TocItem[] = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'about-terms', title: 'About These Terms' },
  { id: 'services-provided', title: 'Services We Provide' },
  { id: 'service-scope', title: 'Service Scope & Deliverables' },
  { id: 'client-responsibilities', title: 'Client Responsibilities' },
  { id: 'project-communication', title: 'Project Communication' },
  { id: 'fees-payments', title: 'Fees & Payment Terms' },
  { id: 'ad-spend', title: 'Advertising & Media Spend' },
  { id: 'third-party-platforms', title: 'Third-Party Platforms' },
  { id: 'web-development-terms', title: 'Website Development Terms' },
  { id: 'performance-expectations', title: 'SEO & Growth Disclaimers' },
  { id: 'intellectual-property', title: 'Intellectual Property Rights' },
  { id: 'client-materials', title: 'Client Materials & Assets' },
  { id: 'confidentiality', title: 'Confidentiality' },
  { id: 'third-party-tools', title: 'Third-Party Tools' },
  { id: 'limitation-liability', title: 'Limitation of Liability' },
  { id: 'cancellation-termination', title: 'Cancellation & Termination' },
  { id: 'suspension-services', title: 'Suspension of Services' },
  { id: 'service-modifications', title: 'Changes to Services' },
  { id: 'governing-law', title: 'Governing Law' },
  { id: 'terms-updates', title: 'Changes to These Terms' },
  { id: 'contact-info', title: 'Contact Information' },
];

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      lastUpdated="August 15, 2026"
      description="Commercial engagement terms, service delivery scope, media spend boundaries, and governance standards for Surnax Technologies engagements."
      toc={termsToc}
    >
      {/* 01. Introduction */}
      <section id="introduction" className="space-y-4 pt-4 border-t border-border-subtle/60">
        <div className="flex items-center space-x-2 font-mono text-xs text-coral font-bold uppercase tracking-wider">
          <span>SECTION 01</span>
        </div>
        <h2 className="font-display font-normal text-2xl sm:text-3xl text-plum">
          1. Introduction & Terms Acceptance
        </h2>
        <p className="text-sm sm:text-base text-plum/80 leading-relaxed font-normal">
          Welcome to <strong>Surnax Technologies</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), a digital growth and web engineering studio headquartered in Jaipur, Rajasthan, India. By accessing our website, submitting an audit enquiry, or contracting our services, you agree to comply with and be bound by these Terms of Service.
        </p>
      </section>

      {/* 02. About These Terms */}
      <section id="about-terms" className="space-y-4 pt-8 border-t border-border-subtle/60">
        <div className="flex items-center space-x-2 font-mono text-xs text-coral font-bold uppercase tracking-wider">
          <span>SECTION 02</span>
        </div>
        <h2 className="font-display font-normal text-2xl sm:text-3xl text-plum">
          2. About These Terms
        </h2>
        <p className="text-sm sm:text-base text-plum/80 leading-relaxed font-normal">
          These Terms govern general website use and establish the baseline operational guidelines for our commercial engagements. Specific project scope, monthly retainer tiers, timelines, and deliverable commitments are defined in executed proposal agreements or scope invoices.
        </p>
      </section>

      {/* 03. Services We Provide */}
      <section id="services-provided" className="space-y-4 pt-8 border-t border-border-subtle/60">
        <div className="flex items-center space-x-2 font-mono text-xs text-coral font-bold uppercase tracking-wider">
          <span>SECTION 03</span>
        </div>
        <h2 className="font-display font-normal text-2xl sm:text-3xl text-plum">
          3. Services We Provide
        </h2>
        <p className="text-sm sm:text-base text-plum/80 leading-relaxed font-normal">
          Surnax Technologies delivers connected digital growth services tailored for Jaipur and regional businesses across five core service pillars:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-plum/80 font-normal">
          <li><strong>Performance Marketing:</strong> Google Search ad campaigns, Meta Ads (Instagram & Facebook), target audience setup, copy creation, and ad optimization.</li>
          <li><strong>Local SEO & Search Visibility:</strong> Google Business Profile optimization, local keyword research, search hierarchy structuring, and organic search growth.</li>
          <li><strong>Social Media Content & Reels:</strong> Monthly content scheduling, visual graphic design, short-form video reels, and brand storytelling.</li>
          <li><strong>Business Websites:</strong> Custom conversion web architecture, responsive frontend design, speed optimization, and lead capture systems.</li>
          <li><strong>Integrated Growth Packages:</strong> Structured monthly execution tiers (Starter, Growth, Premium) combining multi-channel digital growth.</li>
        </ul>
      </section>

      {/* 04. Service Scope & Deliverables */}
      <section id="service-scope" className="space-y-4 pt-8 border-t border-border-subtle/60">
        <div className="flex items-center space-x-2 font-mono text-xs text-coral font-bold uppercase tracking-wider">
          <span>SECTION 04</span>
        </div>
        <h2 className="font-display font-normal text-2xl sm:text-3xl text-plum">
          4. Service Scope & Deliverables
        </h2>
        <p className="text-sm sm:text-base text-plum/80 leading-relaxed font-normal">
          Each engagement includes explicit deliverable commitments outlined in your package invoice. Revisions or out-of-scope feature requests outside the agreed package will be quoted separately before work begins.
        </p>
      </section>

      {/* 05. Client Responsibilities */}
      <section id="client-responsibilities" className="space-y-4 pt-8 border-t border-border-subtle/60">
        <div className="flex items-center space-x-2 font-mono text-xs text-coral font-bold uppercase tracking-wider">
          <span>SECTION 05</span>
        </div>
        <h2 className="font-display font-normal text-2xl sm:text-3xl text-plum">
          5. Client Responsibilities
        </h2>
        <p className="text-sm sm:text-base text-plum/80 leading-relaxed font-normal">
          Timely service execution relies on mutual client collaboration. Clients agree to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-plum/80 font-normal">
          <li>Provide accurate business information, branding assets, logos, and product access required for setup.</li>
          <li>Grant necessary ad account management permissions (Google Ads, Meta Business Manager) in a timely manner.</li>
          <li>Review and approve campaign creative or website copy within agreed review windows.</li>
        </ul>
      </section>

      {/* 06. Project Communication */}
      <section id="project-communication" className="space-y-4 pt-8 border-t border-border-subtle/60">
        <div className="flex items-center space-x-2 font-mono text-xs text-coral font-bold uppercase tracking-wider">
          <span>SECTION 06</span>
        </div>
        <h2 className="font-display font-normal text-2xl sm:text-3xl text-plum">
          6. Project Communication
        </h2>
        <p className="text-sm sm:text-base text-plum/80 leading-relaxed font-normal">
          Official project communications, strategic deliverables, and performance updates take place via official email correspondence ({siteConfig.contactEmailPlaceholder}) or scheduled client calls during normal business operating hours.
        </p>
      </section>

      {/* 07. Fees & Payment Terms */}
      <section id="fees-payments" className="space-y-4 pt-8 border-t border-border-subtle/60">
        <div className="flex items-center space-x-2 font-mono text-xs text-coral font-bold uppercase tracking-wider">
          <span>SECTION 07</span>
        </div>
        <h2 className="font-display font-normal text-2xl sm:text-3xl text-plum">
          7. Fees & Payment Terms
        </h2>
        <p className="text-sm sm:text-base text-plum/80 leading-relaxed font-normal">
          Agency package fees are stated in Indian Rupees (INR) and are billed on a monthly upfront cycle for marketing packages, or according to milestone schedules for custom website builds. Invoices are payable upon receipt prior to monthly campaign activation.
        </p>
      </section>

      {/* 08. Advertising & Media Spend */}
      <section id="ad-spend" className="space-y-4 pt-8 border-t border-border-subtle/60">
        <div className="flex items-center space-x-2 font-mono text-xs text-coral font-bold uppercase tracking-wider">
          <span>SECTION 08</span>
        </div>
        <h2 className="font-display font-normal text-2xl sm:text-3xl text-plum">
          8. Advertising & Media Spend (Crucial Boundary)
        </h2>
        <p className="text-sm sm:text-base text-plum/80 leading-relaxed font-normal">
          <strong>Important Separation:</strong> Agency service fees cover Surnax Technologies consulting, campaign setup, creative design, copywriting, and campaign management. Direct ad media budgets paid to ad platforms (Google Ads, Meta Ads) are <strong>not included</strong> in agency package fees and must be funded directly by the client via their own platform ad account billing.
        </p>
      </section>

      {/* 09. Third-Party Platforms */}
      <section id="third-party-platforms" className="space-y-4 pt-8 border-t border-border-subtle/60">
        <div className="flex items-center space-x-2 font-mono text-xs text-coral font-bold uppercase tracking-wider">
          <span>SECTION 09</span>
        </div>
        <h2 className="font-display font-normal text-2xl sm:text-3xl text-plum">
          9. Third-Party Platforms
        </h2>
        <p className="text-sm sm:text-base text-plum/80 leading-relaxed font-normal">
          We manage campaigns across external platforms (Google, Meta, Instagram, WhatsApp, web hosting providers). Surnax Technologies is not liable for platform-wide server outages, policy modifications, account suspensions, or ad approval delays enforced by third-party tech platforms.
        </p>
      </section>

      {/* 10. Website Development Terms */}
      <section id="web-development-terms" className="space-y-4 pt-8 border-t border-border-subtle/60">
        <div className="flex items-center space-x-2 font-mono text-xs text-coral font-bold uppercase tracking-wider">
          <span>SECTION 10</span>
        </div>
        <h2 className="font-display font-normal text-2xl sm:text-3xl text-plum">
          10. Website Development Terms
        </h2>
        <p className="text-sm sm:text-base text-plum/80 leading-relaxed font-normal">
          Website projects include agreed design iterations and frontend responsiveness checks. Domain registration fees, third-party premium plugin licenses, or specialized cloud database hosting fees remain client responsibilities unless specified in writing.
        </p>
      </section>

      {/* 11. SEO & Growth Performance Expectations */}
      <section id="performance-expectations" className="space-y-4 pt-8 border-t border-border-subtle/60">
        <div className="flex items-center space-x-2 font-mono text-xs text-coral font-bold uppercase tracking-wider">
          <span>SECTION 11</span>
        </div>
        <h2 className="font-display font-normal text-2xl sm:text-3xl text-plum">
          11. SEO & Growth Disclaimers (No Fake Guarantees)
        </h2>
        <p className="text-sm sm:text-base text-plum/80 leading-relaxed font-normal">
          Surnax Technologies applies industry best practices, data-driven ad strategy, and conversion optimization techniques. However, digital marketing outcomes depend on external factors including regional market competition, seasonal buyer demand, search engine algorithm updates, and client sales follow-up speed. 
        </p>
        <p className="text-sm sm:text-base text-plum/80 leading-relaxed font-normal">
          We do not guarantee specific numeric revenue targets or artificial #1 rank positions on search engines, and no statements on our website constitute a legal guarantee of earnings.
        </p>
      </section>

      {/* 12. Intellectual Property Rights */}
      <section id="intellectual-property" className="space-y-4 pt-8 border-t border-border-subtle/60">
        <div className="flex items-center space-x-2 font-mono text-xs text-coral font-bold uppercase tracking-wider">
          <span>SECTION 12</span>
        </div>
        <h2 className="font-display font-normal text-2xl sm:text-3xl text-plum">
          12. Intellectual Property Rights
        </h2>
        <p className="text-sm sm:text-base text-plum/80 leading-relaxed font-normal">
          Upon receipt of full invoice payment for completed custom website or creative deliverables, rights to final customized client graphics, website source files, and campaign copy transfer to the client. Surnax Technologies retains rights to proprietary agency methodologies, underlying diagnostic frameworks, and non-confidential portfolio presentation rights.
        </p>
      </section>

      {/* 13. Client Materials & Assets */}
      <section id="client-materials" className="space-y-4 pt-8 border-t border-border-subtle/60">
        <div className="flex items-center space-x-2 font-mono text-xs text-coral font-bold uppercase tracking-wider">
          <span>SECTION 13</span>
        </div>
        <h2 className="font-display font-normal text-2xl sm:text-3xl text-plum">
          13. Client Materials & Assets
        </h2>
        <p className="text-sm sm:text-base text-plum/80 leading-relaxed font-normal">
          Clients represent that all trademarks, product photography, text copy, and brand assets provided to Surnax Technologies for campaign use are owned by the client or properly licensed, free of copyright infringement.
        </p>
      </section>

      {/* 14. Confidentiality */}
      <section id="confidentiality" className="space-y-4 pt-8 border-t border-border-subtle/60">
        <div className="flex items-center space-x-2 font-mono text-xs text-coral font-bold uppercase tracking-wider">
          <span>SECTION 14</span>
        </div>
        <h2 className="font-display font-normal text-2xl sm:text-3xl text-plum">
          14. Confidentiality
        </h2>
        <p className="text-sm sm:text-base text-plum/80 leading-relaxed font-normal">
          Both parties agree to protect proprietary business information, client lead lists, sales performance figures, and operational data disclosed during the engagement, keeping such information strictly confidential.
        </p>
      </section>

      {/* 15. Third-Party Tools */}
      <section id="third-party-tools" className="space-y-4 pt-8 border-t border-border-subtle/60">
        <div className="flex items-center space-x-2 font-mono text-xs text-coral font-bold uppercase tracking-wider">
          <span>SECTION 15</span>
        </div>
        <h2 className="font-display font-normal text-2xl sm:text-3xl text-plum">
          15. Third-Party Tools & Software
        </h2>
        <p className="text-sm sm:text-base text-plum/80 leading-relaxed font-normal">
          Where projects utilize specialized third-party CRM tools, messaging APIs, or analytics software requested by the client, subscription fees for those tools remain payable directly to the third-party provider.
        </p>
      </section>

      {/* 16. Limitation of Liability */}
      <section id="limitation-liability" className="space-y-4 pt-8 border-t border-border-subtle/60">
        <div className="flex items-center space-x-2 font-mono text-xs text-coral font-bold uppercase tracking-wider">
          <span>SECTION 16</span>
        </div>
        <h2 className="font-display font-normal text-2xl sm:text-3xl text-plum">
          16. Limitation of Liability
        </h2>
        <p className="text-sm sm:text-base text-plum/80 leading-relaxed font-normal">
          To the maximum extent permitted by law, Surnax Technologies shall not be liable for indirect, incidental, or consequential damages, lost profits, or business interruption arising from website use or service execution. Our total aggregate liability under any agreement shall not exceed the monthly agency service fees paid by the client in the preceding month.
        </p>
      </section>

      {/* 17. Cancellation & Termination */}
      <section id="cancellation-termination" className="space-y-4 pt-8 border-t border-border-subtle/60">
        <div className="flex items-center space-x-2 font-mono text-xs text-coral font-bold uppercase tracking-wider">
          <span>SECTION 17</span>
        </div>
        <h2 className="font-display font-normal text-2xl sm:text-3xl text-plum">
          17. Cancellation & Termination
        </h2>
        <p className="text-sm sm:text-base text-plum/80 leading-relaxed font-normal">
          Monthly growth packages operate on clear monthly cycles. Either party may discontinue ongoing monthly package renewals by providing written email notice 15 days prior to the start of the next billing cycle.
        </p>
      </section>

      {/* 18. Suspension of Services */}
      <section id="suspension-services" className="space-y-4 pt-8 border-t border-border-subtle/60">
        <div className="flex items-center space-x-2 font-mono text-xs text-coral font-bold uppercase tracking-wider">
          <span>SECTION 18</span>
        </div>
        <h2 className="font-display font-normal text-2xl sm:text-3xl text-plum">
          18. Suspension of Services
        </h2>
        <p className="text-sm sm:text-base text-plum/80 leading-relaxed font-normal">
          We reserve the right to temporarily suspend campaign management or website deployment if invoices remain unpaid past due dates or if ad account billing issues halt campaign delivery.
        </p>
      </section>

      {/* 19. Changes to Services */}
      <section id="service-modifications" className="space-y-4 pt-8 border-t border-border-subtle/60">
        <div className="flex items-center space-x-2 font-mono text-xs text-coral font-bold uppercase tracking-wider">
          <span>SECTION 19</span>
        </div>
        <h2 className="font-display font-normal text-2xl sm:text-3xl text-plum">
          19. Changes to Services
        </h2>
        <p className="text-sm sm:text-base text-plum/80 leading-relaxed font-normal">
          Surnax Technologies continuously refines service offerings and package structures to deliver optimal value. Any modification to ongoing client service scopes will be communicated transparently in advance.
        </p>
      </section>

      {/* 20. Governing Law */}
      <section id="governing-law" className="space-y-4 pt-8 border-t border-border-subtle/60">
        <div className="flex items-center space-x-2 font-mono text-xs text-coral font-bold uppercase tracking-wider">
          <span>SECTION 20</span>
        </div>
        <h2 className="font-display font-normal text-2xl sm:text-3xl text-plum">
          20. Governing Law & Dispute Resolution
        </h2>
        <p className="text-sm sm:text-base text-plum/80 leading-relaxed font-normal">
          These Terms and any commercial agreements shall be governed by and construed in accordance with the laws of <strong>India</strong>. Any legal disputes shall be subject to the exclusive jurisdiction of the competent courts in Jaipur, Rajasthan, India.
        </p>
      </section>

      {/* 21. Changes to These Terms */}
      <section id="terms-updates" className="space-y-4 pt-8 border-t border-border-subtle/60">
        <div className="flex items-center space-x-2 font-mono text-xs text-coral font-bold uppercase tracking-wider">
          <span>SECTION 21</span>
        </div>
        <h2 className="font-display font-normal text-2xl sm:text-3xl text-plum">
          21. Changes to These Terms
        </h2>
        <p className="text-sm sm:text-base text-plum/80 leading-relaxed font-normal">
          We reserve the right to revise these Terms of Service at any time. Updated versions will be published on this page with a revised &quot;Last Revised&quot; date. Continued use of our website or services indicates acceptance of the updated Terms.
        </p>
      </section>

      {/* 22. Contact Information */}
      <section id="contact-info" className="space-y-4 pt-8 border-t border-border-subtle/60 pb-8">
        <div className="flex items-center space-x-2 font-mono text-xs text-coral font-bold uppercase tracking-wider">
          <span>SECTION 22</span>
        </div>
        <h2 className="font-display font-normal text-2xl sm:text-3xl text-plum">
          22. Contact Information
        </h2>
        <p className="text-sm sm:text-base text-plum/80 leading-relaxed font-normal">
          For questions regarding these Terms of Service or commercial engagement inquiries, please reach out to our team:
        </p>
        <div className="p-6 rounded-xl bg-white border border-border-subtle shadow-editorial-sm space-y-2 font-mono text-xs text-plum">
          <p className="font-bold text-coral text-sm">SURNAX TECHNOLOGIES COMMERCIAL TEAM</p>
          <p>Email: {siteConfig.contactEmailPlaceholder}</p>
          <p>Location: {siteConfig.locationPlaceholder}</p>
        </div>
      </section>
    </LegalPageLayout>
  );
}
