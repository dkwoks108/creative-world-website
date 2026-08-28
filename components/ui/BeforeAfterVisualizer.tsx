'use client';

import React, { useState } from 'react';
import { ArrowRight, XCircle, CheckCircle2, Zap, Layers, RefreshCw } from 'lucide-react';

interface BeforeAfterProps {
  beforePoints?: string[];
  afterPoints?: string[];
  title?: string;
  className?: string;
}

const defaultBefore = [
  'Manual enquiries & phone calls',
  'Scattered lead data in spreadsheets',
  'Slow response times causing lead drop-off',
  'Poor mobile online experience & low trust'
];

const defaultAfter = [
  'Centralized automated digital workflow',
  'Real-time CRM lead tracking & routing',
  'Instant 24/7 automated messaging & booking',
  'Scalable, high-converting digital infrastructure'
];

export function BeforeAfterVisualizer({
  beforePoints = defaultBefore,
  afterPoints = defaultAfter,
  title = "Digital Transformation Paradigm",
  className = ""
}: BeforeAfterProps) {
  const [activeTab, setActiveTab] = useState<'both' | 'before' | 'after'>('both');

  return (
    <div className={`border-4 border-black bg-white p-6 md:p-8 space-y-8 ${className}`}>
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500 font-bold mb-1">
            <Layers size={14} className="text-black" />
            <span>OPERATIONAL METAMORPHOSIS</span>
          </div>
          <h3 className="font-serif font-bold text-2xl md:text-3xl text-black tracking-tight">
            {title}
          </h3>
        </div>

        {/* View Toggle Buttons */}
        <div className="flex items-center p-1 border-2 border-black bg-neutral-100 font-mono text-xs font-bold">
          <button
            onClick={() => setActiveTab('both')}
            className={`px-3 py-1.5 transition-colors ${
              activeTab === 'both' ? 'bg-black text-white' : 'text-black hover:bg-neutral-200'
            }`}
          >
            SIDE-BY-SIDE
          </button>
          <button
            onClick={() => setActiveTab('before')}
            className={`px-3 py-1.5 transition-colors ${
              activeTab === 'before' ? 'bg-black text-white' : 'text-black hover:bg-neutral-200'
            }`}
          >
            BEFORE
          </button>
          <button
            onClick={() => setActiveTab('after')}
            className={`px-3 py-1.5 transition-colors ${
              activeTab === 'after' ? 'bg-black text-white' : 'text-black hover:bg-neutral-200'
            }`}
          >
            AFTER
          </button>
        </div>
      </div>

      {/* Side-by-Side Comparison Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* BEFORE BOX */}
        {(activeTab === 'both' || activeTab === 'before') && (
          <div className={`${activeTab === 'both' ? 'lg:col-span-5' : 'lg:col-span-12'} border-2 border-black bg-neutral-50 p-6 space-y-6 flex flex-col justify-between`}>
            <div>
              <div className="flex items-center justify-between font-mono text-xs uppercase font-bold tracking-widest text-neutral-600 mb-4 pb-3 border-b-2 border-neutral-300">
                <span className="flex items-center gap-2 text-neutral-700">
                  <XCircle size={16} className="text-black" />
                  TRADITIONAL MANUAL STATE
                </span>
                <span className="px-2 py-0.5 bg-neutral-200 text-neutral-700 text-[10px]">LEGACY</span>
              </div>

              <ul className="space-y-3">
                {beforePoints.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 bg-white border border-neutral-300 font-serifBody text-sm text-neutral-700">
                    <span className="w-5 h-5 shrink-0 rounded-none bg-neutral-200 text-neutral-600 flex items-center justify-center font-mono text-xs font-bold mt-0.5">
                      ✕
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-neutral-200 text-neutral-500 font-mono text-[11px] uppercase tracking-wider">
              Status: High Friction &amp; Lead Leakage
            </div>
          </div>
        )}

        {/* CENTER CONVERTER NODE */}
        {activeTab === 'both' && (
          <div className="lg:col-span-2 flex flex-col items-center justify-center py-4 lg:py-0">
            <div className="p-4 border-2 border-black bg-black text-white font-mono text-center space-y-2 w-full max-w-[200px]">
              <Zap size={20} className="mx-auto text-white animate-pulse" />
              <div className="text-[10px] uppercase font-bold tracking-widest text-white">CREATIVEE ENGINE</div>
              <div className="text-[9px] text-neutral-300 leading-tight">AUTOMATION &amp; TECH MATRIX</div>
              <ArrowRight size={16} className="mx-auto text-white hidden lg:block" />
            </div>
          </div>
        )}

        {/* AFTER BOX */}
        {(activeTab === 'both' || activeTab === 'after') && (
          <div className={`${activeTab === 'both' ? 'lg:col-span-5' : 'lg:col-span-12'} border-2 border-black bg-black text-white p-6 space-y-6 flex flex-col justify-between`}>
            <div>
              <div className="flex items-center justify-between font-mono text-xs uppercase font-bold tracking-widest text-neutral-300 mb-4 pb-3 border-b-2 border-neutral-800">
                <span className="flex items-center gap-2 text-white">
                  <CheckCircle2 size={16} className="text-white" />
                  CREATIVEE DIGITAL SYSTEM
                </span>
                <span className="px-2 py-0.5 bg-white text-black text-[10px] font-bold">TRANSFORMED</span>
              </div>

              <ul className="space-y-3">
                {afterPoints.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 bg-neutral-900 border border-neutral-800 font-serifBody text-sm text-neutral-200">
                    <span className="w-5 h-5 shrink-0 rounded-none bg-white text-black flex items-center justify-center font-mono text-xs font-bold mt-0.5">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-neutral-800 text-neutral-300 font-mono text-[11px] uppercase tracking-wider flex items-center gap-2">
              <RefreshCw size={12} className="animate-spin text-white" />
              Status: Predictable Growth &amp; Automation
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
