import React from 'react';
import { Metadata } from 'next';
import { Mail, MapPin, MessageSquare, ShieldCheck } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { MonochromeSection } from '@/components/monochrome/MonochromeSection';
import { GrowthAuditForm } from '@/components/ui/GrowthAuditForm';
import { contactData } from '@/data/contact';

export const metadata: Metadata = {
  title: 'Contact Surnax Technologies | Web Engineering & Marketing Studio',
  description: 'Connect with Surnax Technologies in Jaipur for custom web development, video production, performance marketing, local SEO, and growth audits.',
  openGraph: {
    title: 'Contact Surnax Technologies | Web & Digital Growth Agency',
    description: 'Direct agency contact, location details, and Growth Audit requests for Surnax Technologies.',
  },
};

export default function ContactPage() {
  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-white text-black font-serifBody selection:bg-black selection:text-white">
        <Navbar />

        <main>
          {/* 1. EDITORIAL HERO SECTION */}
          <MonochromeSection divider="none" texture="lines" className="!py-16 md:!py-24 border-b-4 border-black">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-neutral-600 font-bold">
                <span className="w-4 h-4 border-2 border-black bg-white inline-block" aria-hidden="true" />
                <span>CONTACT SURNAX STUDIO</span>
              </div>

              <h1 className="font-serif font-bold text-6xl sm:text-8xl lg:text-9xl uppercase tracking-tighter leading-none text-black my-4">
                CONNECT WITH<br />
                STUDIO JAIPUR<span className="text-neutral-400">.</span>
              </h1>

              <div className="w-full h-1 bg-black my-4" />

              <p className="font-serif text-xl sm:text-2xl md:text-3xl leading-relaxed text-black tracking-tight font-normal max-w-4xl">
                Whether you have questions about custom web engineering, video reel production, local search optimization, or performance ads, our team is ready to review your project.
              </p>
            </div>
          </MonochromeSection>

          {/* 2. DIRECT CHANNELS & AUDIT FORM */}
          <MonochromeSection divider="thick" texture="grid">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Contact Information Column (5 cols) */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-4">
                  <span className="font-mono text-xs font-bold text-black uppercase tracking-widest block">
                    DIRECT CHANNELS
                  </span>
                  <h2 className="font-serif font-bold text-3xl sm:text-4xl text-black uppercase">
                    Reach Our Growth Team
                  </h2>
                  <p className="font-serifBody text-base text-neutral-800 leading-relaxed">
                    {contactData.responseExpectation}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Location */}
                  <div className="p-5 border-2 border-black bg-white flex items-start space-x-4">
                    <MapPin size={20} className="text-black shrink-0 mt-1" />
                    <div className="space-y-1">
                      <span className="font-mono text-xs text-neutral-600 uppercase block font-bold">LOCATION</span>
                      <p className="font-serifBody text-sm font-semibold text-black">{contactData.location}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="p-5 border-2 border-black bg-white flex items-start space-x-4">
                    <Mail size={20} className="text-black shrink-0 mt-1" />
                    <div className="space-y-1">
                      <span className="font-mono text-xs text-neutral-600 uppercase block font-bold">EMAIL ENQUIRIES</span>
                      <p className="font-serifBody text-sm font-semibold text-black">{contactData.email}</p>
                    </div>
                  </div>

                  {/* Response Policy */}
                  <div className="p-5 border-2 border-black bg-white flex items-start space-x-4">
                    <MessageSquare size={20} className="text-black shrink-0 mt-1" />
                    <div className="space-y-1">
                      <span className="font-mono text-xs text-neutral-600 uppercase block font-bold">WHATSAPP DIRECT</span>
                      <p className="font-serifBody text-sm font-semibold text-black">{contactData.whatsappMessage}</p>
                    </div>
                  </div>
                </div>

                {/* Privacy Notice */}
                <div className="p-4 border-2 border-black bg-neutral-100 flex items-center space-x-3 text-xs font-mono font-bold text-black uppercase tracking-widest">
                  <ShieldCheck size={16} className="text-black shrink-0" />
                  <span>Your details are kept confidential. Zero aggressive cold calls.</span>
                </div>
              </div>

              {/* Growth Audit Form Column (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="font-mono text-xs font-bold text-black uppercase tracking-widest block">
                    REQUEST A FREE GROWTH AUDIT
                  </span>
                  <h2 className="font-serif font-bold text-3xl sm:text-4xl text-black uppercase">
                    Submit Your Business Information
                  </h2>
                </div>

                <GrowthAuditForm />
              </div>
            </div>
          </MonochromeSection>

          {/* 3. CONTACT FAQS */}
          <MonochromeSection divider="thick" texture="lines">
            <div className="max-w-3xl mx-auto space-y-12">
              <div className="space-y-3 text-center">
                <span className="font-mono text-xs uppercase tracking-widest text-black font-bold block">
                  INQUIRIES & SUPPORT
                </span>
                <h2 className="font-serif font-bold text-4xl text-black uppercase">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-6">
                {contactData.faqs.map((faq, idx) => (
                  <div key={idx} className="p-6 border-2 border-black bg-white space-y-2">
                    <h3 className="font-serif font-bold text-xl text-black uppercase">
                      {faq.question}
                    </h3>
                    <p className="font-serifBody text-base text-neutral-800 leading-relaxed font-normal">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </MonochromeSection>
        </main>

        <Footer />
      </div>
    </MotionProvider>
  );
}

