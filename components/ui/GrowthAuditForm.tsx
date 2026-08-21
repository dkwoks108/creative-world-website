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
      <div className="p-8 sm:p-10 rounded-2xl bg-white border border-border-active shadow-editorial-lg text-center space-y-6">
        <div className="h-16 w-16 rounded-full bg-coral/10 border border-coral flex items-center justify-center mx-auto text-coral shadow-subtle">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs text-coral uppercase tracking-widest block font-medium">
            REQUEST RECEIVED
          </span>
          <h3 className="font-display font-normal text-3xl text-plum">
            Your Growth Audit Request Is In.
          </h3>
          <p className="text-sm text-txt-secondary leading-relaxed max-w-md mx-auto">
            We will review your submission details and analyze your growth opportunities. Expect a direct email from our strategic team.
          </p>
        </div>

        <div className="pt-4 border-t border-border-subtle text-xs font-mono text-txt-muted">
          <span>NO AUTOMATED SALES SEQUENCE • DIRECT STRATEGIC REVIEW</span>
        </div>
      </div>
    );
  }

  return (
    <form
      id="audit-form"
      onSubmit={handleSubmit(onSubmit)}
      className="p-8 sm:p-10 rounded-2xl bg-white border border-border-subtle space-y-6 shadow-editorial-lg"
    >
      {/* Form Progress Indicator */}
      <div className="flex items-center justify-between border-b border-border-subtle pb-4">
        <span className="font-mono text-xs text-coral uppercase tracking-widest font-medium">
          STEP {step} OF 2 — {step === 1 ? 'GROWTH CONTEXT' : 'PROJECT DETAILS'}
        </span>
        <div className="flex items-center space-x-1.5">
          <span
            className={`h-2 w-8 rounded-full transition-colors ${
              step >= 1 ? 'bg-coral' : 'bg-border-subtle'
            }`}
          />
          <span
            className={`h-2 w-8 rounded-full transition-colors ${
              step === 2 ? 'bg-coral' : 'bg-border-subtle'
            }`}
          />
        </div>
      </div>

      {/* STEP 1 FIELDS */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-txt-secondary mb-1.5">
              FULL NAME <span className="text-semantic-error">*</span>
            </label>
            <input
              {...register('fullName')}
              placeholder="e.g. Sarah Jenkins"
              className="w-full px-4 py-3 rounded-xl bg-ivory/60 border border-border-subtle text-plum text-sm focus:outline-none focus:border-plum focus:ring-1 focus:ring-plum transition-all shadow-input-recessed"
            />
            {errors.fullName && (
              <span className="text-xs text-semantic-error mt-1 block">{errors.fullName.message}</span>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-txt-secondary mb-1.5">
              BUSINESS EMAIL <span className="text-semantic-error">*</span>
            </label>
            <input
              {...register('email')}
              type="email"
              placeholder="sarah@company.com"
              className="w-full px-4 py-3 rounded-xl bg-ivory/60 border border-border-subtle text-plum text-sm focus:outline-none focus:border-plum focus:ring-1 focus:ring-plum transition-all shadow-input-recessed"
            />
            {errors.email && (
              <span className="text-xs text-semantic-error mt-1 block">{errors.email.message}</span>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-txt-secondary mb-1.5">
              COMPANY WEBSITE (OPTIONAL)
            </label>
            <input
              {...register('website')}
              placeholder="https://company.com"
              className="w-full px-4 py-3 rounded-xl bg-ivory/60 border border-border-subtle text-plum text-sm focus:outline-none focus:border-plum focus:ring-1 focus:ring-plum transition-all shadow-input-recessed"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-txt-secondary mb-1.5">
              PRIMARY GROWTH GOAL <span className="text-semantic-error">*</span>
            </label>
            <select
              {...register('primaryGoal')}
              className="w-full px-4 py-3 rounded-xl bg-ivory/60 border border-border-subtle text-plum text-sm focus:outline-none focus:border-plum focus:ring-1 focus:ring-plum transition-all shadow-input-recessed cursor-pointer"
            >
              <option value="Performance Marketing">Performance Marketing & Paid Ads (Google / Meta)</option>
              <option value="Local SEO & Search">SEO & Local Search Visibility (Jaipur Focus)</option>
              <option value="Social Media & Creative">Social Media Strategy & Short-Form Reels</option>
              <option value="Website & Conversion">Business Website & Lead Landing Pages</option>
              <option value="Integrated Growth Package">Integrated Growth Package (Starter / Growth / Premium)</option>
              <option value="Full Growth Audit">Not Sure Yet / Full Digital Growth Audit</option>
            </select>
          </div>

          <Button
            type="button"
            variant="primary"
            size="lg"
            className="w-full mt-4 shadow-elevated hover:shadow-hover"
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
            <label className="block text-xs font-mono uppercase text-txt-secondary mb-1.5">
              ESTIMATED MONTHLY BUDGET
            </label>
            <select
              {...register('budgetRange')}
              className="w-full px-4 py-3 rounded-xl bg-ivory/60 border border-border-subtle text-plum text-sm focus:outline-none focus:border-plum focus:ring-1 focus:ring-plum transition-all shadow-input-recessed cursor-pointer"
            >
              <option value="Starter">Starter Package (Custom Quotation / month)</option>
              <option value="Growth">Growth Package (Custom Quotation / month)</option>
              <option value="Premium">Premium Growth Package (Custom Quotation / month)</option>
              <option value="Custom Project">Custom Project / Enterprise Scope</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-txt-secondary mb-1.5">
              EXPECTED TIMELINE
            </label>
            <select
              {...register('timeline')}
              className="w-full px-4 py-3 rounded-xl bg-ivory/60 border border-border-subtle text-plum text-sm focus:outline-none focus:border-plum focus:ring-1 focus:ring-plum transition-all shadow-input-recessed cursor-pointer"
            >
              <option value="As soon as possible">As soon as possible</option>
              <option value="Within 30 days">Within 30 days</option>
              <option value="1–3 months">1–3 months</option>
              <option value="Exploring">Exploring options</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-txt-secondary mb-1.5">
              PROJECT NOTES / GROWTH CHALLENGES
            </label>
            <textarea
              {...register('notes')}
              rows={3}
              placeholder="What are your current growth bottlenecks?"
              className="w-full px-4 py-3 rounded-xl bg-ivory/60 border border-border-subtle text-plum text-sm focus:outline-none focus:border-plum focus:ring-1 focus:ring-plum transition-all shadow-input-recessed resize-none"
            />
          </div>

          {submitError && (
            <div className="flex items-center space-x-2 text-xs text-semantic-error p-3 rounded bg-semantic-error/10 border border-semantic-error/20">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <div className="flex items-center space-x-3 pt-2">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-1/3 shadow-subtle"
              onClick={() => setStep(1)}
              disabled={isSubmitting}
            >
              Back
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-2/3 shadow-elevated hover:shadow-hover"
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
        <p className="text-[11px] text-txt-muted leading-relaxed font-mono">
          No spam. No automated sales sequence. Just a focused conversation about your growth opportunities.
        </p>
      </div>
    </form>
  );
}
