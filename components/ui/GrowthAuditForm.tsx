'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, AlertCircle, Loader2 } from 'lucide-react';
import { MonochromeButton } from '@/components/monochrome/MonochromeButton';

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid business email address.'),
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
      website: '',
      primaryGoal: 'Performance Marketing',
      budgetRange: 'Not sure yet',
      timeline: 'Exploring',
      notes: '',
    },
  });

  const handleNextStep = async () => {
    const isStep1Valid = await trigger(['fullName', 'email', 'primaryGoal']);
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
      <div className="p-8 sm:p-10 border-4 border-black bg-white text-center space-y-6">
        <div className="w-16 h-16 border-2 border-black bg-black text-white flex items-center justify-center mx-auto">
          <Check size={32} strokeWidth={2} />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs text-neutral-600 uppercase tracking-widest block font-bold">
            REQUEST RECEIVED
          </span>
          <h3 className="font-serif font-bold text-3xl text-black uppercase">
            YOUR GROWTH AUDIT REQUEST IS IN.
          </h3>
          <p className="font-serifBody text-sm text-neutral-800 leading-relaxed max-w-md mx-auto">
            We will review your submission details and analyze your growth opportunities. Expect a direct email from our strategic team within 24 hours.
          </p>
        </div>

        <div className="pt-4 border-t-2 border-black text-xs font-mono text-black font-bold uppercase tracking-widest">
          <span>NO AUTOMATED SALES SEQUENCE • DIRECT STRATEGIC REVIEW</span>
        </div>
      </div>
    );
  }

  return (
    <form
      id="audit-form"
      onSubmit={handleSubmit(onSubmit)}
      className="p-8 sm:p-10 border-4 border-black bg-white space-y-6"
    >
      {/* Form Progress Indicator */}
      <div className="flex items-center justify-between border-b-2 border-black pb-4">
        <span className="font-mono text-xs text-black uppercase tracking-widest font-bold">
          STEP {step} OF 2 — {step === 1 ? 'GROWTH CONTEXT' : 'PROJECT DETAILS'}
        </span>
        <div className="flex items-center space-x-2">
          <span
            className={`w-6 h-2 inline-block border border-black ${
              step >= 1 ? 'bg-black' : 'bg-white'
            }`}
          />
          <span
            className={`w-6 h-2 inline-block border border-black ${
              step === 2 ? 'bg-black' : 'bg-white'
            }`}
          />
        </div>
      </div>

      {/* STEP 1 FIELDS */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-black mb-1.5 font-bold tracking-widest">
              FULL NAME <span className="text-neutral-500">*</span>
            </label>
            <input
              {...register('fullName')}
              placeholder="e.g. Sarah Jenkins"
              className="w-full px-4 py-3 border-2 border-black bg-white text-black placeholder-neutral-400 text-sm font-serifBody focus:outline-none focus:bg-neutral-50 transition-colors"
            />
            {errors.fullName && (
              <span className="text-xs font-mono text-black font-bold mt-1 block">[!] {errors.fullName.message}</span>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-black mb-1.5 font-bold tracking-widest">
              BUSINESS EMAIL <span className="text-neutral-500">*</span>
            </label>
            <input
              {...register('email')}
              type="email"
              placeholder="sarah@company.com"
              className="w-full px-4 py-3 border-2 border-black bg-white text-black placeholder-neutral-400 text-sm font-serifBody focus:outline-none focus:bg-neutral-50 transition-colors"
            />
            {errors.email && (
              <span className="text-xs font-mono text-black font-bold mt-1 block">[!] {errors.email.message}</span>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-black mb-1.5 font-bold tracking-widest">
              COMPANY WEBSITE (OPTIONAL)
            </label>
            <input
              {...register('website')}
              placeholder="https://company.com"
              className="w-full px-4 py-3 border-2 border-black bg-white text-black placeholder-neutral-400 text-sm font-serifBody focus:outline-none focus:bg-neutral-50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-black mb-1.5 font-bold tracking-widest">
              PRIMARY GROWTH GOAL <span className="text-neutral-500">*</span>
            </label>
            <select
              {...register('primaryGoal')}
              className="w-full px-4 py-3 border-2 border-black bg-white text-black text-sm font-serifBody focus:outline-none focus:bg-neutral-50 transition-colors cursor-pointer"
            >
              <option value="Performance Marketing">Performance Marketing & Paid Ads (Google / Meta)</option>
              <option value="Local SEO & Search">SEO & Local Search Visibility (Jaipur Focus)</option>
              <option value="Social Media & Creative">Social Media Strategy & Short-Form Reels</option>
              <option value="Website & Conversion">Business Website & Lead Landing Pages</option>
              <option value="Integrated Growth Package">Integrated Growth Package (Starter / Growth / Premium)</option>
              <option value="Full Growth Audit">Not Sure Yet / Full Digital Growth Audit</option>
            </select>
          </div>

          <MonochromeButton
            type="button"
            variant="primary"
            showArrow
            className="w-full mt-4 justify-center"
            onClick={handleNextStep}
          >
            Continue to Project Details
          </MonochromeButton>
        </div>
      )}

      {/* STEP 2 FIELDS */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-black mb-1.5 font-bold tracking-widest">
              ESTIMATED MONTHLY BUDGET
            </label>
            <select
              {...register('budgetRange')}
              className="w-full px-4 py-3 border-2 border-black bg-white text-black text-sm font-serifBody focus:outline-none focus:bg-neutral-50 transition-colors cursor-pointer"
            >
              <option value="Starter (₹7.9k–₹13k/mo)">Starter Package (₹7,999 – ₹12,999 / month)</option>
              <option value="Growth (₹15k–₹25k/mo)">Growth Package (₹15,000 – ₹25,000 / month)</option>
              <option value="Premium (₹40k+/mo)">Premium Growth Package (₹40,000+ / month)</option>
              <option value="Custom Project">Custom Project / Enterprise Budget</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-black mb-1.5 font-bold tracking-widest">
              EXPECTED TIMELINE
            </label>
            <select
              {...register('timeline')}
              className="w-full px-4 py-3 border-2 border-black bg-white text-black text-sm font-serifBody focus:outline-none focus:bg-neutral-50 transition-colors cursor-pointer"
            >
              <option value="As soon as possible">As soon as possible</option>
              <option value="Within 30 days">Within 30 days</option>
              <option value="1–3 months">1–3 months</option>
              <option value="Exploring">Exploring options</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-black mb-1.5 font-bold tracking-widest">
              PROJECT NOTES / GROWTH CHALLENGES
            </label>
            <textarea
              {...register('notes')}
              rows={3}
              placeholder="What are your current growth bottlenecks?"
              className="w-full px-4 py-3 border-2 border-black bg-white text-black placeholder-neutral-400 text-sm font-serifBody focus:outline-none focus:bg-neutral-50 transition-colors resize-none"
            />
          </div>

          {submitError && (
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-black p-3 border-2 border-black bg-neutral-100">
              <AlertCircle size={16} className="shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <div className="flex items-center space-x-3 pt-2">
            <MonochromeButton
              type="button"
              variant="secondary"
              className="w-1/3 justify-center"
              onClick={() => setStep(1)}
              disabled={isSubmitting}
            >
              Back
            </MonochromeButton>

            <MonochromeButton
              type="submit"
              variant="primary"
              showArrow={!isSubmitting}
              className="w-2/3 justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Request Growth Audit'}
            </MonochromeButton>
          </div>
        </div>
      )}

      {/* Reassurance Privacy Note */}
      <div className="pt-2 text-center">
        <p className="text-[11px] text-neutral-600 leading-relaxed font-mono uppercase tracking-widest font-bold">
          No spam. No automated sales sequence. Direct technical review.
        </p>
      </div>
    </form>
  );
}

