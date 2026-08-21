'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Zod Schema Definition for 2-Step Growth Audit Form
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
      <div className="p-8 sm:p-10 rounded-2xl bg-[#151821] border border-white/10 shadow-2xl text-center space-y-6">
        <div className="h-16 w-16 rounded-full bg-[#B8FF2C]/10 border border-[#B8FF2C] flex items-center justify-center mx-auto text-[#B8FF2C]">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs text-[#B8FF2C] uppercase tracking-widest block font-bold">
            REQUEST RECEIVED
          </span>
          <h3 className="font-display font-bold text-3xl text-white uppercase">
            Your Growth Audit Request Is In.
          </h3>
          <p className="text-sm text-[#C5CBD3] leading-relaxed max-w-md mx-auto">
            We will review your submission details and analyze your growth opportunities. Expect a direct email from our strategic team.
          </p>
        </div>

        <div className="pt-4 border-t border-white/10 text-xs font-mono text-white/50">
          <span>NO AUTOMATED SALES SEQUENCE • DIRECT STRATEGIC REVIEW</span>
        </div>
      </div>
    );
  }

  return (
    <form
      id="audit-form"
      onSubmit={handleSubmit(onSubmit)}
      className="p-8 sm:p-10 rounded-2xl bg-[#151821] border border-white/10 space-y-6 shadow-2xl"
    >
      {/* Form Progress Indicator */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <span className="font-mono text-xs text-[#B8FF2C] uppercase tracking-widest font-bold">
          STEP {step} OF 2 — {step === 1 ? 'GROWTH CONTEXT' : 'PROJECT DETAILS'}
        </span>
        <div className="flex items-center space-x-1.5">
          <span
            className={`h-2 w-8 rounded-full transition-colors ${
              step >= 1 ? 'bg-[#B8FF2C]' : 'bg-white/10'
            }`}
          />
          <span
            className={`h-2 w-8 rounded-full transition-colors ${
              step === 2 ? 'bg-[#B8FF2C]' : 'bg-white/10'
            }`}
          />
        </div>
      </div>

      {/* STEP 1 FIELDS */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-white/70 mb-1.5 font-semibold">
              FULL NAME <span className="text-[#B8FF2C]">*</span>
            </label>
            <input
              {...register('fullName')}
              placeholder="e.g. Sarah Jenkins"
              className="w-full px-4 py-3 rounded-xl bg-[#08090C] border border-white/10 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#B8FF2C] focus:ring-1 focus:ring-[#B8FF2C] transition-colors"
            />
            {errors.fullName && (
              <span className="text-xs text-red-400 mt-1 block">{errors.fullName.message}</span>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-white/70 mb-1.5 font-semibold">
              BUSINESS EMAIL <span className="text-[#B8FF2C]">*</span>
            </label>
            <input
              {...register('email')}
              type="email"
              placeholder="sarah@company.com"
              className="w-full px-4 py-3 rounded-xl bg-[#08090C] border border-white/10 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#B8FF2C] focus:ring-1 focus:ring-[#B8FF2C] transition-colors"
            />
            {errors.email && (
              <span className="text-xs text-red-400 mt-1 block">{errors.email.message}</span>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-white/70 mb-1.5 font-semibold">
              COMPANY WEBSITE (OPTIONAL)
            </label>
            <input
              {...register('website')}
              placeholder="https://company.com"
              className="w-full px-4 py-3 rounded-xl bg-[#08090C] border border-white/10 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#B8FF2C] focus:ring-1 focus:ring-[#B8FF2C] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-white/70 mb-1.5 font-semibold">
              PRIMARY GROWTH GOAL <span className="text-[#B8FF2C]">*</span>
            </label>
            <select
              {...register('primaryGoal')}
              className="w-full px-4 py-3 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm focus:outline-none focus:border-[#B8FF2C] focus:ring-1 focus:ring-[#B8FF2C] transition-colors"
            >
              <option value="Performance Marketing" className="bg-[#08090C]">Performance Marketing & Paid Ads (Google / Meta)</option>
              <option value="Local SEO & Search" className="bg-[#08090C]">SEO & Local Search Visibility (Jaipur Focus)</option>
              <option value="Social Media & Creative" className="bg-[#08090C]">Social Media Strategy & Short-Form Reels</option>
              <option value="Website & Conversion" className="bg-[#08090C]">Business Website & Lead Landing Pages</option>
              <option value="Integrated Growth Package" className="bg-[#08090C]">Integrated Growth Package (Starter / Growth / Premium)</option>
              <option value="Full Growth Audit" className="bg-[#08090C]">Not Sure Yet / Full Digital Growth Audit</option>
            </select>
          </div>

          <Button
            type="button"
            variant="primary"
            size="lg"
            className="w-full mt-4 bg-[#B8FF2C] text-[#08090C] font-bold hover:bg-[#a6f514]"
            onClick={handleNextStep}
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Continue to Project Details
          </Button>
        </div>
      )}

      {/* STEP 2 FIELDS */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-white/70 mb-1.5 font-semibold">
              ESTIMATED MONTHLY BUDGET
            </label>
            <select
              {...register('budgetRange')}
              className="w-full px-4 py-3 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm focus:outline-none focus:border-[#B8FF2C] focus:ring-1 focus:ring-[#B8FF2C] transition-colors"
            >
              <option value="Starter (₹7.9k–₹13k/mo)" className="bg-[#08090C]">Starter Package (₹7,999 – ₹12,999 / month)</option>
              <option value="Growth (₹15k–₹25k/mo)" className="bg-[#08090C]">Growth Package (₹15,000 – ₹25,000 / month)</option>
              <option value="Premium (₹40k+/mo)" className="bg-[#08090C]">Premium Growth Package (₹40,000+ / month)</option>
              <option value="Custom Project" className="bg-[#08090C]">Custom Project / Enterprise Budget</option>
              <option value="Not sure yet" className="bg-[#08090C]">Not sure yet</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-white/70 mb-1.5 font-semibold">
              EXPECTED TIMELINE
            </label>
            <select
              {...register('timeline')}
              className="w-full px-4 py-3 rounded-xl bg-[#08090C] border border-white/10 text-white text-sm focus:outline-none focus:border-[#B8FF2C] focus:ring-1 focus:ring-[#B8FF2C] transition-colors"
            >
              <option value="As soon as possible" className="bg-[#08090C]">As soon as possible</option>
              <option value="Within 30 days" className="bg-[#08090C]">Within 30 days</option>
              <option value="1–3 months" className="bg-[#08090C]">1–3 months</option>
              <option value="Exploring" className="bg-[#08090C]">Exploring options</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-white/70 mb-1.5 font-semibold">
              PROJECT NOTES / GROWTH CHALLENGES
            </label>
            <textarea
              {...register('notes')}
              rows={3}
              placeholder="What are your current growth bottlenecks?"
              className="w-full px-4 py-3 rounded-xl bg-[#08090C] border border-white/10 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#B8FF2C] focus:ring-1 focus:ring-[#B8FF2C] transition-colors resize-none"
            />
          </div>

          {submitError && (
            <div className="flex items-center space-x-2 text-xs text-red-400 p-3 rounded bg-red-500/10 border border-red-500/20">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <div className="flex items-center space-x-3 pt-2">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-1/3 text-white border-white/20 hover:border-[#B8FF2C]"
              onClick={() => setStep(1)}
              disabled={isSubmitting}
            >
              Back
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-2/3 bg-[#B8FF2C] text-[#08090C] font-bold hover:bg-[#a6f514]"
              disabled={isSubmitting}
              icon={isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            >
              {isSubmitting ? 'Sending...' : 'Request Growth Audit'}
            </Button>
          </div>
        </div>
      )}

      {/* Reassurance Privacy Note */}
      <div className="pt-2 text-center">
        <p className="text-[11px] text-white/40 leading-relaxed font-mono">
          No spam. No automated sales sequence. Just a focused conversation about your growth opportunities.
        </p>
      </div>
    </form>
  );
}
