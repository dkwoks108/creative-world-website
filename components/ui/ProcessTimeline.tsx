'use client';

import React from 'react';
import { ProcessStep } from '@/types';
import { Check, ArrowRight } from 'lucide-react';

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
    <div className="w-full space-y-8 font-serifBody">
      {/* Horizontal Interactive Stage Selector (Desktop) */}
      <div className="hidden lg:grid grid-cols-4 gap-4 relative">
        {/* Connecting Pathway Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-black -translate-y-1/2 z-0" />

        {steps.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          const isPassed = idx < activeStepIndex;

          return (
            <button
              key={step.id}
              onClick={() => onStepSelect(idx)}
              className={`relative z-10 p-5 text-left transition-colors duration-100 border-2 border-black cursor-pointer ${
                isActive
                  ? 'bg-black text-white'
                  : isPassed
                  ? 'bg-neutral-200 text-black'
                  : 'bg-white text-black hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-widest">
                  STEP {step.number}
                </span>
                <span className={`w-2.5 h-2.5 inline-block ${isActive ? 'bg-white' : 'bg-black'}`} />
              </div>

              <h3 className="font-serif font-bold text-xl uppercase mt-3 tracking-tight">
                {step.title}
              </h3>
            </button>
          );
        })}
      </div>

      {/* Active Step Detailed Overview Panel */}
      {steps[activeStepIndex] && (
        <div className="p-8 border-4 border-black bg-white space-y-6">
          <div className="flex items-center justify-between border-b-2 border-black pb-4">
            <div>
              <span className="font-mono text-xs text-neutral-600 uppercase tracking-widest block font-bold">
                STAGE {steps[activeStepIndex].number} EXECUTION PROTOCOL
              </span>
              <h3 className="font-serif font-bold text-3xl sm:text-4xl text-black uppercase mt-1">
                {steps[activeStepIndex].title} — {steps[activeStepIndex].kicker}
              </h3>
            </div>
            <span className="px-3 py-1 text-xs font-mono bg-black text-white border border-black font-bold uppercase tracking-widest">
              STAGE {activeStepIndex + 1} OF {steps.length}
            </span>
          </div>

          <p className="font-serifBody text-base text-neutral-800 leading-relaxed max-w-3xl">
            {steps[activeStepIndex].description}
          </p>

          {/* Activities List */}
          <div className="space-y-3 pt-2">
            <span className="font-mono text-xs text-neutral-600 uppercase tracking-widest block font-bold">
              CORE SYSTEM ACTIONS & ACTIVITIES:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {steps[activeStepIndex].activities.map((activity, aIdx) => (
                <div
                  key={aIdx}
                  className="flex items-start space-x-3 p-3 border-2 border-black bg-neutral-50 text-xs text-black"
                >
                  <Check size={16} strokeWidth={2} className="text-black shrink-0 mt-0.5" />
                  <span>{activity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step Outcome Callout */}
          <div className="p-5 border-2 border-black bg-black text-white flex items-center justify-between font-mono">
            <div className="space-y-1">
              <span className="text-neutral-400 font-bold uppercase tracking-widest block text-xs">
                STAGE DELIVERABLE & OUTCOME:
              </span>
              <p className="text-white font-serifBody text-sm font-semibold">
                {steps[activeStepIndex].outcome}
              </p>
            </div>
            <ArrowRight size={20} strokeWidth={2} className="text-white shrink-0 ml-4 hidden sm:block" />
          </div>
        </div>
      )}
    </div>
  );
}

