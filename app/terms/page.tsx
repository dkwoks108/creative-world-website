import React from 'react';
import { Metadata } from 'next';
import { LegalPageLayout, TocItem } from '@/components/ui/LegalPageLayout';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'Terms of Service | Creativee World Jaipur',
  description: 'Review the commercial terms, service engagement conditions, ad spend disclaimers, and agency governance policies for Creativee World.',
  openGraph: {
    title: 'Terms of Service | Creativee World Digital Growth Studio',
    description: 'Commercial terms of service for digital marketing, performance ads, SEO, and website development engagements in Jaipur.',
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
      description="Commercial engagement terms, service delivery scope, media spend boundaries, and governance standards for Creativee World engagements."
      toc={termsToc}
    >
      {/* 01. Introduction */}
      <section id="introduction" className="space-y-4 pt-4 border-t border-white/10">
        <div className="flex items-center space-x-2 font-mono text-xs text-[#00CFFF] font-semibold uppercase tracking-wider">
          <span>SECTION 01</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          1. Introduction & Terms Acceptance
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          Welcome to <strong>Creativee World</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), a digital growth and web engineering studio headquartered in Jaipur, Rajasthan, India. By accessing our website, submitting an audit enquiry, or contracting our services, you agree to comply with and be bound by these Terms of Service.
        </p>
      </section>

      {/* 02. About These Terms */}
      <section id="about-terms" className="space-y-4 pt-8 border-t border-white/10">
        <div className="flex items-center space-x-2 font-mono text-xs text-[#00CFFF] font-semibold uppercase tracking-wider">
          <span>SECTION 02</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          2. About These Terms
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          These Terms govern general website use and establish the baseline operational guidelines for our commercial engagements. Specific project scope, monthly retainer tiers, timelines, and deliverable commitments are defined in executed proposal agreements or scope invoices.
        </p>
      </section>

      {/* 03. Services We Provide */}
      <section id="services-provided" className="space-y-4 pt-8 border-t border-white/10">
        <div className="flex items-center space-x-2 font-mono text-xs text-[#00CFFF] font-semibold uppercase tracking-wider">
          <span>SECTION 03</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          3. Services We Provide
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          Creativee World delivers connected digital growth services tailored for Jaipur and regional businesses across five core service pillars:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-slate-300 font-light">
          <li><strong>Performance Marketing:</strong> Google Search ad campaigns, Meta Ads (Instagram & Facebook), target audience setup, copy creation, and ad optimization.</li>
          <li><strong>Local SEO & Search Visibility:</strong> Google Business Profile optimization, local keyword research, search hierarchy structuring, and organic search growth.</li>
          <li><strong>Social Media Content & Reels:</strong> Monthly content scheduling, visual graphic design, short-form video reels, and brand storytelling.</li>
          <li><strong>Business Websites:</strong> Custom conversion web architecture, responsive frontend design, speed optimization, and lead capture systems.</li>
          <li><strong>Integrated Growth Packages:</strong> Structured monthly execution tiers (Starter, Growth, Premium) combining multi-channel digital growth.</li>
        </ul>
      </section>

      {/* 04. Service Scope & Deliverables */}
      <section id="service-scope" className="space-y-4 pt-8 border-t border-white/10">
        <div className="flex items-center space-x-2 font-mono text-xs text-[#00CFFF] font-semibold uppercase tracking-wider">
          <span>SECTION 04</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          4. Service Scope & Deliverables
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          Each engagement includes explicit deliverable commitments outlined in your package invoice. Revisions or out-of-scope feature requests outside the agreed package will be quoted separately before work begins.
        </p>
      </section>

      {/* 05. Client Responsibilities */}
      <section id="client-responsibilities" className="space-y-4 pt-8 border-t border-white/10">
        <div className="flex items-center space-x-2 font-mono text-xs text-[#00CFFF] font-semibold uppercase tracking-wider">
          <span>SECTION 05</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          5. Client Responsibilities
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          Timely service execution relies on mutual client collaboration. Clients agree to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-slate-300 font-light">
          <li>Provide accurate business information, branding assets, logos, and product access required for setup.</li>
          <li>Grant necessary ad account management permissions (Google Ads, Meta Business Manager) in a timely manner.</li>
          <li>Review and approve campaign creative or website copy within agreed review windows.</li>
        </ul>
      </section>

      {/* 06. Project Communication */}
      <section id="project-communication" className="space-y-4 pt-8 border-t border-white/10">
        <div className="flex items-center space-x-2 font-mono text-xs text-[#00CFFF] font-semibold uppercase tracking-wider">
          <span>SECTION 06</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          6. Project Communication
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          Official project communications, strategic deliverables, and performance updates take place via official email correspondence ({siteConfig.contactEmailPlaceholder}) or scheduled client calls during normal business operating hours.
        </p>
      </section>

      {/* 07. Fees & Payment Terms */}
      <section id="fees-payments" className="space-y-4 pt-8 border-t border-white/10">
        <div className="flex items-center space-x-2 font-mono text-xs text-[#00CFFF] font-semibold uppercase tracking-wider">
          <span>SECTION 07</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          7. Fees & Payment Terms
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          Agency package fees are stated in Indian Rupees (INR) and are billed on a monthly upfront cycle for marketing packages, or according to milestone schedules for custom website builds. Invoices are payable upon receipt prior to monthly campaign activation.
        </p>
      </section>

      {/* 08. Advertising & Media Spend */}
      <section id="ad-spend" className="space-y-4 pt-8 border-t border-white/10">
        <div className="flex items-center space-x-2 font-mono text-xs text-[#00CFFF] font-semibold uppercase tracking-wider">
          <span>SECTION 08</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          8. Advertising & Media Spend
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          <strong>Important Separation:</strong> Agency service fees cover Creativee World consulting, campaign setup, creative design, copywriting, and campaign management. Direct ad media budgets paid to ad platforms (Google Ads, Meta Ads) are <strong>not included</strong> in agency package fees and must be funded directly by the client via their own platform ad account billing.
        </p>
      </section>

      {/* 09. Third-Party Platforms */}
      <section id="third-party-platforms" className="space-y-4 pt-8 border-t border-white/10">
        <div className="flex items-center space-x-2 font-mono text-xs text-[#00CFFF] font-semibold uppercase tracking-wider">
          <span>SECTION 09</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          9. Third-Party Platforms
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          We manage campaigns across external platforms (Google, Meta, Instagram, WhatsApp, web hosting providers). Creativee World is not liable for platform-wide server outages or policy modifications enforced by third-party tech platforms.
        </p>
      </section>

      {/* 10. Website Development Terms */}
      <section id="web-development-terms" className="space-y-4 pt-8 border-t border-white/10">
        <div className="flex items-center space-x-2 font-mono text-xs text-[#00CFFF] font-semibold uppercase tracking-wider">
          <span>SECTION 10</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          10. Website Development Terms
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          Website projects include agreed design iterations and frontend responsiveness checks. Domain registration fees or specialized cloud hosting fees remain client responsibilities unless specified in writing.
        </p>
      </section>

      {/* 11. SEO & Growth Performance Expectations */}
      <section id="performance-expectations" className="space-y-4 pt-8 border-t border-white/10">
        <div className="flex items-center space-x-2 font-mono text-xs text-[#00CFFF] font-semibold uppercase tracking-wider">
          <span>SECTION 11</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          11. SEO & Growth Disclaimers
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          Creativee World applies industry best practices, data-driven ad strategy, and conversion optimization techniques. Digital marketing outcomes depend on external market factors.
        </p>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          We do not guarantee artificial #1 rank positions on search engines, and no statements on our website constitute a legal guarantee of earnings.
        </p>
      </section>

      {/* 12. Intellectual Property Rights */}
      <section id="intellectual-property" className="space-y-4 pt-8 border-t border-white/10">
        <div className="flex items-center space-x-2 font-mono text-xs text-[#00CFFF] font-semibold uppercase tracking-wider">
          <span>SECTION 12</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          12. Intellectual Property Rights
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          Upon receipt of full invoice payment for completed custom deliverables, rights to final customized client graphics and website source files transfer to the client.
        </p>
      </section>

      {/* 13. Client Materials & Assets */}
      <section id="client-materials" className="space-y-4 pt-8 border-t border-white/10">
        <div className="flex items-center space-x-2 font-mono text-xs text-[#00CFFF] font-semibold uppercase tracking-wider">
          <span>SECTION 13</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          13. Client Materials & Assets
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          Clients represent that all trademarks, product photography, text copy, and brand assets provided to Creativee World are owned by the client or properly licensed.
        </p>
      </section>

      {/* 14. Confidentiality */}
      <section id="confidentiality" className="space-y-4 pt-8 border-t border-white/10">
        <div className="flex items-center space-x-2 font-mono text-xs text-[#00CFFF] font-semibold uppercase tracking-wider">
          <span>SECTION 14</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          14. Confidentiality
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          Both parties agree to protect proprietary business information disclosed during the engagement, keeping such information strictly confidential.
        </p>
      </section>

      {/* 15. Third-Party Tools */}
      <section id="third-party-tools" className="space-y-4 pt-8 border-t border-white/10">
        <div className="flex items-center space-x-2 font-mono text-xs text-[#00CFFF] font-semibold uppercase tracking-wider">
          <span>SECTION 15</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          15. Third-Party Tools & Software
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          Where projects utilize specialized third-party CRM tools or messaging APIs requested by the client, subscription fees remain payable directly to the third-party provider.
        </p>
      </section>

      {/* 16. Limitation of Liability */}
      <section id="limitation-liability" className="space-y-4 pt-8 border-t border-white/10">
        <div className="flex items-center space-x-2 font-mono text-xs text-[#00CFFF] font-semibold uppercase tracking-wider">
          <span>SECTION 16</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          16. Limitation of Liability
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          To the maximum extent permitted by law, Creativee World shall not be liable for indirect or consequential damages. Our total aggregate liability shall not exceed the monthly agency service fees paid by the client in the preceding month.
        </p>
      </section>

      {/* 17. Cancellation & Termination */}
      <section id="cancellation-termination" className="space-y-4 pt-8 border-t border-white/10">
        <div className="flex items-center space-x-2 font-mono text-xs text-[#00CFFF] font-semibold uppercase tracking-wider">
          <span>SECTION 17</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          17. Cancellation & Termination
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          Either party may discontinue ongoing monthly package renewals by providing written email notice 15 days prior to the start of the next billing cycle.
        </p>
      </section>

      {/* 18. Suspension of Services */}
      <section id="suspension-services" className="space-y-4 pt-8 border-t border-white/10">
        <div className="flex items-center space-x-2 font-mono text-xs text-[#00CFFF] font-semibold uppercase tracking-wider">
          <span>SECTION 18</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          18. Suspension of Services
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          We reserve the right to temporarily suspend campaign management if invoices remain unpaid past due dates.
        </p>
      </section>

      {/* 19. Changes to Services */}
      <section id="service-modifications" className="space-y-4 pt-8 border-t border-white/10">
        <div className="flex items-center space-x-2 font-mono text-xs text-[#00CFFF] font-semibold uppercase tracking-wider">
          <span>SECTION 19</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          19. Changes to Services
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          Creativee World continuously refines service offerings and package structures to deliver optimal value.
        </p>
      </section>

      {/* 20. Governing Law */}
      <section id="governing-law" className="space-y-4 pt-8 border-t border-white/10">
        <div className="flex items-center space-x-2 font-mono text-xs text-[#00CFFF] font-semibold uppercase tracking-wider">
          <span>SECTION 20</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          20. Governing Law & Dispute Resolution
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          These Terms and any commercial agreements shall be governed by and construed in accordance with the laws of <strong>India</strong>, under jurisdiction of courts in Jaipur, Rajasthan, India.
        </p>
      </section>

      {/* 21. Changes to These Terms */}
      <section id="terms-updates" className="space-y-4 pt-8 border-t border-white/10">
        <div className="flex items-center space-x-2 font-mono text-xs text-[#00CFFF] font-semibold uppercase tracking-wider">
          <span>SECTION 21</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          21. Changes to These Terms
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          We reserve the right to revise these Terms of Service at any time. Continued use of our website or services indicates acceptance of updated Terms.
        </p>
      </section>

      {/* 22. Contact Information */}
      <section id="contact-info" className="space-y-4 pt-8 border-t border-white/10 pb-8">
        <div className="flex items-center space-x-2 font-mono text-xs text-[#00CFFF] font-semibold uppercase tracking-wider">
          <span>SECTION 22</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          22. Contact Information
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          For questions regarding these Terms of Service or commercial engagement inquiries, please reach out to our team:
        </p>
        <div className="p-6 rounded-2xl border border-white/15 bg-slate-900/80 space-y-2 font-mono text-xs text-slate-300">
          <p className="font-bold text-white text-sm">CREATIVEE WORLD COMMERCIAL TEAM</p>
          <p>Email: {siteConfig.contactEmailPlaceholder}</p>
          <p>Location: {siteConfig.locationPlaceholder}</p>
        </div>
      </section>
    </LegalPageLayout>
  );
}
