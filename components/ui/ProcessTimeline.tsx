'use client';

import React from 'react';
import { ProcessStep } from '@/types';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface ProcessTimelineProps {
  steps: ProcessStep[];
  activeStepIndex: number;
  onStepSelect: (index: number) => void;
}

export function ProcessTimeline({
  steps,
  activeStepIndex,
  onStepSelect,
}: ProcessTimelineProps) {
  return (
    <div className="w-full space-y-8">
      {/* Horizontal Interactive Stage Selector (Desktop) */}
      <div className="hidden lg:grid grid-cols-4 gap-4 relative">
        {/* Connecting Pathway Line */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-border-subtle -translate-y-1/2 z-0" />

        {steps.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          const isPassed = idx < activeStepIndex;

          return (
            <button
              key={step.id}
              onClick={() => onStepSelect(idx)}
              className={`relative z-10 p-5 rounded-xl text-left transition-all duration-300 border ${
                isActive
                  ? 'bg-white border-plum shadow-editorial'
                  : isPassed
                  ? 'bg-white/80 border-border-active'
                  : 'bg-cream/30 border-border-subtle hover:border-border-active'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-mono text-xs font-bold ${
                    isActive ? 'text-coral' : 'text-txt-muted'
                  }`}
                >
                  STEP {step.number}
                </span>
                <span
                  className={`h-2 w-2 rounded-full ${
                    isActive
                      ? 'bg-coral animate-pulse'
                      : isPassed
                      ? 'bg-semantic-success'
                      : 'bg-txt-muted/30'
                  }`}
                />
              </div>

              <h3
                className={`font-display font-normal text-xl mt-3 ${
                  isActive ? 'text-plum font-semibold' : 'text-txt-secondary'
                }`}
              >
                {step.title}
              </h3>
            </button>
          );
        })}
      </div>

      {/* Active Step Detailed Overview Panel */}
      {steps[activeStepIndex] && (
        <div className="p-8 rounded-2xl bg-white border border-border-subtle shadow-editorial space-y-6">
          <div className="flex items-center justify-between border-b border-border-subtle pb-4">
            <div>
              <span className="font-mono text-xs text-coral uppercase tracking-widest block font-medium">
                STAGE {steps[activeStepIndex].number} EXECUTION PROTOCOL
              </span>
              <h3 className="font-display font-normal text-3xl sm:text-4xl text-plum mt-1">
                {steps[activeStepIndex].title} — {steps[activeStepIndex].kicker}
              </h3>
            </div>
            <span className="px-3 py-1 text-xs font-mono bg-cream/60 border border-border-subtle rounded text-plum font-medium">
              STAGE {activeStepIndex + 1} OF {steps.length}
            </span>
          </div>

          <p className="text-base text-txt-secondary leading-relaxed max-w-3xl">
            {steps[activeStepIndex].description}
          </p>

          {/* Activities List */}
          <div className="space-y-3 pt-2">
            <span className="font-mono text-xs text-txt-muted uppercase tracking-wider block font-medium">
              CORE SYSTEM ACTIONS & ACTIVITIES:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {steps[activeStepIndex].activities.map((activity, aIdx) => (
                <div
                  key={aIdx}
                  className="flex items-start space-x-2.5 p-3 rounded-lg bg-cream/40 border border-border-subtle text-xs text-plum"
                >
                  <CheckCircle2 className="h-4 w-4 text-coral shrink-0 mt-0.5" />
                  <span>{activity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step Outcome Callout */}
          <div className="p-4 rounded-xl bg-cream/60 border border-border-active flex items-center justify-between text-xs font-mono">
            <div className="space-y-1">
              <span className="text-coral font-bold uppercase tracking-wider block">
                STAGE DELIVERABLE & OUTCOME:
              </span>
              <p className="text-plum font-normal text-xs">
                {steps[activeStepIndex].outcome}
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-coral shrink-0 ml-4 hidden sm:block" />
          </div>
        </div>
      )}
    </div>
  );
}
