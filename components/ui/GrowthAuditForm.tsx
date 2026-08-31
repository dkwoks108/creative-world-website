'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, AlertCircle, ArrowUpRight, ArrowLeft } from 'lucide-react';
import { CWButton } from '@/components/ui/CWButton';

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid business email address.'),
  phone: z.string().optional(),
  website: z.string().optional(),
  primaryGoal: z.string().min(1, 'Please select your primary growth goal.'),
  budgetRange: z.string().optional(),
  timeline: z.string().optional(),
  notes: z.string().max(1000, 'Notes must be under 1000 characters.').optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function GrowthAuditForm() {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      website: '',
      primaryGoal: 'Performance Marketing',
      budgetRange: 'Not sure yet',
      timeline: 'Exploring',
      notes: '',
    },
  });

  const handleNextStep = async () => {
    const isStep1Valid = await trigger(['fullName', 'email', 'phone', 'primaryGoal']);
    if (isStep1Valid) {
      setStep(2);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const { submitGrowthAudit } = await import('@/lib/submitGrowthAudit');
      await submitGrowthAudit(data);
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch {
      setIsSubmitting(false);
      setSubmitError('Something went wrong submitting your request. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-6 sm:p-10 md:p-12 rounded-3xl border border-white/15 bg-slate-900/90 text-center space-y-6 shadow-2xl backdrop-blur-2xl">
        <div className="w-16 h-16 rounded-2xl bg-cw-gradient text-white flex items-center justify-center mx-auto shadow-cw-glow">
          <Check size={32} />
        </div>

        <div className="space-y-2 max-w-md mx-auto">
          <span className="font-mono text-xs text-[#00CFFF] font-semibold uppercase tracking-wider block">
            REQUEST RECEIVED // SUCCESS
          </span>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            Your Growth Audit Request Is In.
          </h3>
          <p className="text-sm text-slate-300 font-light leading-relaxed">
            We will review your submission details and analyze your growth opportunities. Expect a direct contact response from our strategic team within 24 hours.
          </p>
        </div>

        <div className="pt-4 border-t border-white/10 text-xs font-mono text-slate-400 uppercase tracking-wider">
          <span>NO AUTOMATED SALES SEQUENCE • DIRECT STRATEGIC REVIEW</span>
        </div>
      </div>
    );
  }

  return (
    <form
      id="audit-form"
      onSubmit={handleSubmit(onSubmit)}
      className="p-5 sm:p-8 md:p-10 rounded-3xl border border-white/15 bg-slate-900/80 backdrop-blur-2xl space-y-6 shadow-2xl"
    >
      {/* Form Progress Indicator */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <span className="font-mono text-xs text-[#00CFFF] font-semibold uppercase tracking-wider">
          STEP {step} OF 2 — {step === 1 ? 'GROWTH CONTEXT' : 'PROJECT DETAILS'}
        </span>
        <div className="flex items-center space-x-2">
          <span
            className={`w-6 h-2 rounded-full transition-all ${
              step >= 1 ? 'bg-[#00CFFF] shadow-cw-glow' : 'bg-slate-800'
            }`}
          />
          <span
            className={`w-6 h-2 rounded-full transition-all ${
              step === 2 ? 'bg-[#00CFFF] shadow-cw-glow' : 'bg-slate-800'
            }`}
          />
        </div>
      </div>

      {/* STEP 1 FIELDS */}
      {step === 1 && (
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-2 font-semibold tracking-wider">
              FULL NAME <span className="text-[#00CFFF]">*</span>
            </label>
            <input
              {...register('fullName')}
              placeholder="e.g. Sarah Jenkins"
              className="w-full px-4 py-3.5 rounded-2xl border border-white/15 bg-slate-950/80 text-white placeholder-slate-500 text-base sm:text-sm font-sans focus:outline-none focus:border-[#00CFFF] transition-colors"
            />
            {errors.fullName && (
              <span className="text-xs font-mono text-rose-400 mt-1.5 block">[!] {errors.fullName.message}</span>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-2 font-semibold tracking-wider">
              BUSINESS EMAIL <span className="text-[#00CFFF]">*</span>
            </label>
            <input
              {...register('email')}
              type="email"
              placeholder="sarah@company.com"
              className="w-full px-4 py-3.5 rounded-2xl border border-white/15 bg-slate-950/80 text-white placeholder-slate-500 text-base sm:text-sm font-sans focus:outline-none focus:border-[#00CFFF] transition-colors"
            />
            {errors.email && (
              <span className="text-xs font-mono text-rose-400 mt-1.5 block">[!] {errors.email.message}</span>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-2 font-semibold tracking-wider">
              PHONE / WHATSAPP NUMBER
            </label>
            <input
              {...register('phone')}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="e.g. +91 73571 59122"
              className="w-full px-4 py-3.5 rounded-2xl border border-white/15 bg-slate-950/80 text-white placeholder-slate-500 text-base sm:text-sm font-sans focus:outline-none focus:border-[#00CFFF] transition-colors"
            />
            {errors.phone && (
              <span className="text-xs font-mono text-rose-400 mt-1.5 block">[!] {errors.phone.message}</span>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-2 font-semibold tracking-wider">
              COMPANY WEBSITE (OPTIONAL)
            </label>
            <input
              {...register('website')}
              placeholder="https://company.com"
              className="w-full px-4 py-3.5 rounded-2xl border border-white/15 bg-slate-950/80 text-white placeholder-slate-500 text-base sm:text-sm font-sans focus:outline-none focus:border-[#00CFFF] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-2 font-semibold tracking-wider">
              PRIMARY GROWTH GOAL <span className="text-[#00CFFF]">*</span>
            </label>
            <select
              {...register('primaryGoal')}
              className="w-full px-4 py-3.5 rounded-2xl border border-white/15 bg-slate-950 text-white text-base sm:text-sm font-sans focus:outline-none focus:border-[#00CFFF] transition-colors cursor-pointer"
            >
              <option value="Performance Marketing">Performance Marketing & Paid Ads (Google / Meta)</option>
              <option value="Local SEO & Search">SEO & Local Search Visibility (Jaipur Focus)</option>
              <option value="Social Media & Creative">Social Media Strategy & Short-Form Reels</option>
              <option value="Website & Conversion">Business Website & Lead Landing Pages</option>
              <option value="Integrated Growth Package">Integrated Growth Package (Starter / Growth / Premium)</option>
              <option value="Full Growth Audit">Not Sure Yet / Full Digital Growth Audit</option>
            </select>
          </div>

          <CWButton
            type="button"
            variant="gradient"
            size="lg"
            className="w-full mt-4 justify-center"
            onClick={handleNextStep}
          >
            <span>Continue to Project Details</span>
            <ArrowUpRight size={18} />
          </CWButton>
        </div>
      )}

      {/* STEP 2 FIELDS */}
      {step === 2 && (
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-2 font-semibold tracking-wider">
              ESTIMATED MONTHLY BUDGET
            </label>
            <select
              {...register('budgetRange')}
              className="w-full px-4 py-3.5 rounded-2xl border border-white/15 bg-slate-950 text-white text-base sm:text-sm font-sans focus:outline-none focus:border-[#00CFFF] transition-colors cursor-pointer"
            >
              <option value="Starter (₹7.9k–₹13k/mo)">Starter Package (₹7,999 – ₹12,999 / month)</option>
              <option value="Growth (₹15k–₹25k/mo)">Growth Package (₹15,000 – ₹25,000 / month)</option>
              <option value="Premium (₹40k+/mo)">Premium Growth Package (₹40,000+ / month)</option>
              <option value="Custom Project">Custom Project / Enterprise Budget</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-2 font-semibold tracking-wider">
              EXPECTED TIMELINE
            </label>
            <select
              {...register('timeline')}
              className="w-full px-4 py-3.5 rounded-2xl border border-white/15 bg-slate-950 text-white text-base sm:text-sm font-sans focus:outline-none focus:border-[#00CFFF] transition-colors cursor-pointer"
            >
              <option value="As soon as possible">As soon as possible</option>
              <option value="Within 30 days">Within 30 days</option>
              <option value="1–3 months">1–3 months</option>
              <option value="Exploring">Exploring options</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-2 font-semibold tracking-wider">
              PROJECT NOTES / GROWTH CHALLENGES
            </label>
            <textarea
              {...register('notes')}
              rows={3}
              placeholder="What are your current growth bottlenecks?"
              className="w-full px-4 py-3.5 rounded-2xl border border-white/15 bg-slate-950/80 text-white placeholder-slate-500 text-base sm:text-sm font-sans focus:outline-none focus:border-[#00CFFF] transition-colors resize-none"
            />
          </div>

          {submitError && (
            <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-rose-400 p-3.5 rounded-2xl border border-rose-500/30 bg-rose-500/10">
              <AlertCircle size={16} className="shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <div className="flex items-center space-x-3 pt-2">
            <CWButton
              type="button"
              variant="glass"
              size="lg"
              className="w-1/3 justify-center"
              onClick={() => setStep(1)}
              disabled={isSubmitting}
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </CWButton>

            <CWButton
              type="submit"
              variant="gradient"
              size="lg"
              className="w-2/3 justify-center"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Submitting...' : 'Request Growth Audit'}</span>
              {!isSubmitting && <ArrowUpRight size={18} />}
            </CWButton>
          </div>
        </div>
      )}

      {/* Reassurance Privacy Note */}
      <div className="pt-2 text-center">
        <p className="text-[11px] text-slate-400 leading-relaxed font-mono uppercase tracking-wider">
          No spam. No automated sales sequence. Direct technical review.
        </p>
      </div>
    </form>
  );
}
