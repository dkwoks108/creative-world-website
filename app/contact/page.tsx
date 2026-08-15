import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MapPin, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { PageHero } from '@/components/ui/PageHero';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { GrowthAuditForm } from '@/components/ui/GrowthAuditForm';
import { contactData } from '@/data/contact';

export const metadata: Metadata = {
  title: 'Contact Ceativee World | Digital Growth Agency Jaipur',
  description: 'Connect with Ceativee World in Jaipur for performance marketing, local SEO, website development, and business growth audits.',
  openGraph: {
    title: 'Contact Ceativee World | Growth Agency Jaipur',
    description: 'Direct agency contact, location details, and Growth Audit requests in Jaipur.',
  },
};

export default function ContactPage() {
  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-ivory text-txt-primary">
        <Navbar />

        <main>
          <PageHero
            eyebrow="AGENCY CONTACT"
            title="Connect With Ceativee World"
            titleHighlight="Jaipur."
            description="Whether you have questions about our growth packages, local search optimization, or ad campaign management, our strategic team is ready to review your business goals."
            breadcrumbs={[{ label: 'Contact' }]}
          />

          {/* Contact Details & Audit Form Grid */}
          <section className="py-20 bg-surface-primary border-b border-border-subtle/50">
            <Container variant="wide" className="space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Contact Information Column (5 cols) */}
                <div className="lg:col-span-5 space-y-8">
                  <div className="space-y-4">
                    <span className="font-mono text-xs font-bold text-signal-cyan uppercase tracking-widest block">
                      DIRECT CHANNELS
                    </span>
                    <h2 className="font-display font-bold text-2xl sm:text-3xl text-txt-primary">
                      Reach Our Growth Team
                    </h2>
                    <p className="text-xs sm:text-sm text-txt-secondary leading-relaxed">
                      {contactData.responseExpectation}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Location */}
                    <div className="p-5 rounded-xl bg-obsidian/70 border border-border-subtle flex items-start space-x-4">
                      <MapPin className="h-5 w-5 text-signal-cyan shrink-0 mt-1" />
                      <div className="space-y-1">
                        <span className="font-mono text-xs text-txt-muted uppercase block">LOCATION</span>
                        <p className="text-sm font-semibold text-txt-primary">{contactData.location}</p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="p-5 rounded-xl bg-obsidian/70 border border-border-subtle flex items-start space-x-4">
                      <Mail className="h-5 w-5 text-signal-cyan shrink-0 mt-1" />
                      <div className="space-y-1">
                        <span className="font-mono text-xs text-txt-muted uppercase block">EMAIL ENQUIRIES</span>
                        <p className="text-sm font-semibold text-txt-primary">{contactData.email}</p>
                      </div>
                    </div>

                    {/* Response Policy */}
                    <div className="p-5 rounded-xl bg-obsidian/70 border border-border-subtle flex items-start space-x-4">
                      <MessageSquare className="h-5 w-5 text-signal-cyan shrink-0 mt-1" />
                      <div className="space-y-1">
                        <span className="font-mono text-xs text-txt-muted uppercase block">WHATSAPP DIRECT</span>
                        <p className="text-sm font-semibold text-txt-primary">{contactData.whatsappMessage}</p>
                      </div>
                    </div>
                  </div>

                  {/* Privacy Notice */}
                  <div className="p-4 rounded-xl bg-obsidian border border-border-subtle flex items-center space-x-3 text-xs font-mono text-txt-muted">
                    <ShieldCheck className="h-4 w-4 text-signal-cyan shrink-0" />
                    <span>Your details are kept confidential. Zero aggressive cold calls.</span>
                  </div>
                </div>

                {/* Growth Audit Form Column (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <span className="font-mono text-xs font-bold text-signal-cyan uppercase tracking-widest block">
                      REQUEST A FREE GROWTH AUDIT
                    </span>
                    <h2 className="font-display font-bold text-2xl sm:text-3xl text-txt-primary">
                      Submit Your Business Information
                    </h2>
                  </div>

                  <div className="p-6 sm:p-8 rounded-2xl bg-obsidian border border-border-subtle">
                    <GrowthAuditForm />
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* Contact FAQs */}
          <section className="py-20 bg-obsidian border-b border-border-subtle/50">
            <Container variant="standard" className="space-y-12">
              <div className="space-y-3 text-center">
                <h2 className="font-display font-bold text-3xl text-txt-primary">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-6 max-w-3xl mx-auto">
                {contactData.faqs.map((faq, idx) => (
                  <div key={idx} className="p-6 rounded-xl bg-surface-primary border border-border-subtle space-y-2">
                    <h3 className="font-display font-bold text-base text-txt-primary">
                      {faq.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-txt-secondary leading-relaxed font-normal">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        </main>

        <Footer />
      </div>
    </MotionProvider>
  );
}
