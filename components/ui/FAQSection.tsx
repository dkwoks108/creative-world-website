'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface FAQSectionProps {
  badge?: string;
  title?: string;
  description?: string;
  faqs: FAQItem[];
  className?: string;
}

export function FAQSection({
  badge = 'FREQUENTLY ASKED QUESTIONS',
  title = 'Got Questions? We Have Answers.',
  description = 'Everything you need to know about our digital growth services, acquisition engineering, and working with Creativee World Jaipur.',
  faqs,
  className = '',
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Structured Data Schema for Google Rich Results & AEO (Answer Engine Optimization)
  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className={`relative z-10 py-20 bg-slate-950/80 border-t border-white/10 ${className}`}>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          {badge && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00CFFF] uppercase tracking-wider">
              <HelpCircle size={14} className="text-[#00CFFF]" />
              <span>{badge}</span>
            </div>
          )}

          {title && (
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              {title}
            </h2>
          )}

          {description && (
            <p className="font-sans text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const contentId = `faq-content-${idx}`;
            const headerId = `faq-header-${idx}`;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-slate-900/90 border-[#00CFFF]/40 shadow-[0_0_25px_rgba(0,207,255,0.1)]'
                    : 'bg-slate-900/40 border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  id={headerId}
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00CFFF]"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-white leading-snug">
                    {faq.question}
                  </span>
                  <span
                    className={`p-2 rounded-xl border transition-all shrink-0 ${
                      isOpen
                        ? 'bg-[#00CFFF]/20 border-[#00CFFF] text-[#00CFFF] rotate-180'
                        : 'bg-white/5 border-white/10 text-slate-400'
                    }`}
                  >
                    <ChevronDown size={16} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={contentId}
                      role="region"
                      aria-labelledby={headerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-slate-300 font-light leading-relaxed border-t border-white/5 pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
