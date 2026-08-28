import React from 'react';
import { Metadata } from 'next';
import { Mail, MapPin, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { CWBadge } from '@/components/ui/CWBadge';
import { GrowthAuditForm } from '@/components/ui/GrowthAuditForm';
import { contactData } from '@/data/contact';

export const metadata: Metadata = {
  title: 'Contact Creativee World | Digital Growth Agency Jaipur',
  description: 'Connect with Creativee World in Jaipur for performance marketing, local SEO, website development, and business growth audits.',
  openGraph: {
    title: 'Contact Creativee World | Growth Agency Jaipur',
    description: 'Direct agency contact, location details, and Growth Audit requests in Jaipur.',
  },
};

export default function ContactPage() {
  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-[#07090E] text-slate-100 selection:bg-[#1769FF]/30 selection:text-white">
        <Navbar />

        <main className="pt-32">
          {/* Ambient Spectrum Glow */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#1769FF]/15 via-[#673BFF]/15 to-[#D900FF]/10 blur-3xl pointer-events-none rounded-full" />

          {/* 1. HERO SECTION */}
          <section className="relative z-10 py-16 md:py-24 max-w-7xl mx-auto px-6 sm:px-8">
            <div className="space-y-8">
              <RevealOnScroll variant="fade-up">
                <CWBadge variant="cyan">
                  <Sparkles size={13} />
                  <span>Contact Creativee World Studio</span>
                </CWBadge>
              </RevealOnScroll>

              <div className="space-y-4 max-w-4xl">
                <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-white">
                  Connect with <br />
                  <span className="text-cw-gradient">studio Jaipur.</span>
                </h1>

                <p className="font-sans text-lg sm:text-xl text-slate-300 font-light leading-relaxed pt-2">
                  Whether you have questions about custom web engineering, video reel production, local search optimization, or performance ads, our team is ready to review your project.
                </p>
              </div>
            </div>
          </section>

          {/* 2. DIRECT CHANNELS & AUDIT FORM */}
          <section className="relative z-10 py-16 max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Contact Information Column (5 cols) */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-4">
                  <span className="font-mono text-xs font-semibold text-[#00CFFF] uppercase tracking-widest block">
                    ● DIRECT CHANNELS
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                    Reach Our Growth Team
                  </h2>
                  <p className="text-sm text-slate-300 font-light leading-relaxed">
                    {contactData.responseExpectation}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Location */}
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex items-start space-x-4">
                    <MapPin size={20} className="text-[#00CFFF] shrink-0 mt-1" />
                    <div className="space-y-1">
                      <span className="font-mono text-xs text-slate-400 uppercase block font-semibold">LOCATION</span>
                      <p className="text-sm font-medium text-white">{contactData.location}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex items-start space-x-4">
                    <Mail size={20} className="text-[#00CFFF] shrink-0 mt-1" />
                    <div className="space-y-1">
                      <span className="font-mono text-xs text-slate-400 uppercase block font-semibold">EMAIL ENQUIRIES</span>
                      <p className="text-sm font-medium text-white">{contactData.email}</p>
                    </div>
                  </div>

                  {/* Response Policy */}
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex items-start space-x-4">
                    <MessageSquare size={20} className="text-[#00CFFF] shrink-0 mt-1" />
                    <div className="space-y-1">
                      <span className="font-mono text-xs text-slate-400 uppercase block font-semibold">WHATSAPP DIRECT</span>
                      <p className="text-sm font-medium text-white">{contactData.whatsappMessage}</p>
                    </div>
                  </div>
                </div>

                {/* Privacy Notice */}
                <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/10 flex items-center space-x-3 text-xs font-mono text-slate-400">
                  <ShieldCheck size={16} className="text-[#00CFFF] shrink-0" />
                  <span>Your details are kept confidential. Zero aggressive cold calls.</span>
                </div>
              </div>

              {/* Growth Audit Form Column (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="font-mono text-xs font-semibold text-[#00CFFF] uppercase tracking-widest block">
                    ● REQUEST A FREE GROWTH AUDIT
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                    Submit Your Business Information
                  </h2>
                </div>

                <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/15">
                  <GrowthAuditForm />
                </div>
              </div>
            </div>
          </section>

          {/* 3. CONTACT FAQS */}
          <section className="relative z-10 py-24 bg-slate-950/80 border-t border-white/10">
            <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-12">
              <div className="space-y-3 text-center">
                <span className="font-mono text-xs uppercase tracking-widest text-[#00CFFF] font-semibold block">
                  INQUIRIES & SUPPORT
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
                  Frequently asked questions
                </h2>
              </div>

              <div className="space-y-4">
                {contactData.faqs.map((faq, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
                    <h3 className="font-display font-bold text-lg text-white">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-slate-300 font-light leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </MotionProvider>
  );
}
