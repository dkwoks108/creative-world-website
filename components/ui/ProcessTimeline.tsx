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
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/10 -translate-y-1/2 z-0" />

        {steps.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          const isPassed = idx < activeStepIndex;

          return (
            <button
              key={step.id}
              onClick={() => onStepSelect(idx)}
              className={`relative z-10 p-5 rounded-xl text-left transition-all duration-300 border ${
                isActive
                  ? 'bg-[#08090C] border-[#B8FF2C] shadow-[0_0_20px_rgba(184,255,44,0.15)]'
                  : isPassed
                  ? 'bg-[#08090C]/80 border-white/20'
                  : 'bg-[#08090C]/40 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-mono text-xs font-bold ${
                    isActive ? 'text-[#B8FF2C]' : 'text-[#9299A8]'
                  }`}
                >
                  STEP {step.number}
                </span>
                <span
                  className={`h-2 w-2 rounded-full ${
                    isActive
                      ? 'bg-[#B8FF2C] animate-pulse'
                      : isPassed
                      ? 'bg-[#4D5CFF]'
                      : 'bg-white/20'
                  }`}
                />
              </div>

              <h3
                className={`font-display font-bold text-xl uppercase mt-3 ${
                  isActive ? 'text-white' : 'text-white/70'
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
        <div className="p-8 rounded-2xl bg-[#08090C] border border-white/10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-xs text-[#B8FF2C] uppercase tracking-widest block font-bold">
                STAGE {steps[activeStepIndex].number} EXECUTION PROTOCOL
              </span>
              <h3 className="font-display font-bold text-3xl sm:text-4xl text-white uppercase mt-1">
                {steps[activeStepIndex].title} — {steps[activeStepIndex].kicker}
              </h3>
            </div>
            <span className="px-3 py-1 text-xs font-mono bg-white/10 border border-white/10 rounded text-white font-medium">
              STAGE {activeStepIndex + 1} OF {steps.length}
            </span>
          </div>

          <p className="text-base text-[#C5CBD3] leading-relaxed max-w-3xl">
            {steps[activeStepIndex].description}
          </p>

          {/* Activities List */}
          <div className="space-y-3 pt-2">
            <span className="font-mono text-xs text-[#9299A8] uppercase tracking-wider block font-bold">
              CORE SYSTEM ACTIONS & ACTIVITIES:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {steps[activeStepIndex].activities.map((activity, aIdx) => (
                <div
                  key={aIdx}
                  className="flex items-start space-x-2.5 p-3 rounded-lg bg-[#151821] border border-white/10 text-xs text-white"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#B8FF2C] shrink-0 mt-0.5" />
                  <span>{activity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step Outcome Callout */}
          <div className="p-4 rounded-xl bg-[#151821] border border-[#B8FF2C]/30 flex items-center justify-between text-xs font-mono">
            <div className="space-y-1">
              <span className="text-[#B8FF2C] font-bold uppercase tracking-wider block">
                STAGE DELIVERABLE & OUTCOME:
              </span>
              <p className="text-white font-medium text-xs">
                {steps[activeStepIndex].outcome}
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-[#B8FF2C] shrink-0 ml-4 hidden sm:block" />
          </div>
        </div>
      )}
    </div>
  );
}
