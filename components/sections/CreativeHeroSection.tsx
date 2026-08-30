'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CWButton } from '@/components/ui/CWButton';
import { ArrowUpRight, ShieldCheck, Zap, TrendingUp, Check } from 'lucide-react';

// Typewriter Hook
function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    let intervalId: NodeJS.Timeout;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        if (index < text.length) {
          setDisplayed(text.slice(0, index + 1));
          index++;
        } else {
          setDone(true);
          clearInterval(intervalId);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

export function CreativeHeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  // Available service pills for growth diagnosis
  const serviceOptions = [
    'Connected Search SEO',
    'Performance Ads (Meta/Google)',
    'Next.js Web Engineering',
    'High-Converting Reels',
    'Local GMB Dominance',
  ];

  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Connected Search SEO',
    'Performance Ads (Meta/Google)',
  ]);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  // Video Scrubbing & Autoplay Logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.innerWidth < 1024) {
      video.autoplay = true;
      video.loop = true;
      video.play().catch(() => {});
      return;
    }

    video.pause();

    const handleSeeked = () => {
      isSeekingRef.current = false;
    };
    video.addEventListener('seeked', handleSeeked);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;

      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      if (!video.duration || isNaN(video.duration)) return;

      const deltaFraction = (delta / window.innerWidth) * 0.8;
      const newTargetTime = Math.min(
        Math.max(targetTimeRef.current + deltaFraction * video.duration, 0),
        video.duration
      );

      targetTimeRef.current = newTargetTime;

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = newTargetTime;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, []);

  // Typewriter Headline text
  const headlineText = "We build connected search visibility\n& high-conversion revenue systems.";
  const { displayed, done } = useTypewriter(headlineText, 35, 400);

  return (
    <section className="relative bg-[#07090E] pt-32 pb-20 md:pt-36 md:pb-28 overflow-hidden border-b border-slate-800/80 min-h-[90vh] flex items-center">
      
      {/* Background Interactive Video (100% visible on RIGHT side, no dark filter or overlay text box) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none w-full h-full bg-[#07090E]">
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4"
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-right opacity-100 scale-105"
        />
        {/* Soft horizontal gradient transition for left-side text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090E] via-[#07090E]/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07090E]/40 via-transparent to-[#07090E] pointer-events-none" />
      </div>

      {/* Grid Pattern Mask */}
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Main Content Layer (Left: Text & Service Selector; Right: 100% Unobstructed 3D Video) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* LEFT COLUMN: All Text Content & Interactive Service Selector (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Category Pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#00CFFF]/30 bg-[#00CFFF]/10 text-xs font-mono text-[#00CFFF]"
            >
              <span className="w-2 h-2 rounded-full bg-[#00CFFF] animate-pulse" />
              <span>JAIPUR DIGITAL GROWTH &amp; CREATIVE TECHNOLOGY STUDIO</span>
            </motion.div>

            {/* Main Typewriter Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[58px] tracking-tight text-white leading-[1.08] select-none w-full whitespace-pre-wrap">
                {displayed}
                {!done && (
                  <span className="inline-block w-[3px] h-[1.05em] bg-[#00CFFF] align-middle ml-1.5 animate-blink" />
                )}
                {done && (
                  <span className="bg-gradient-to-r from-[#00CFFF] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent ml-2">.</span>
                )}
              </h1>
            </motion.div>

            {/* Secondary Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg sm:text-xl text-slate-300 leading-relaxed font-sans max-w-2xl font-light"
            >
              Creativee World combines authority SEO, high-converting Meta reels, intent Google Ads, and sub-2s web software for commercial brands in Jaipur.
            </motion.p>

            {/* Multi-Select Growth Capability Selector */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 pt-2"
            >
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-display font-bold text-white tracking-tight">
                  What growth capabilities do you need?
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  Select all that apply to customize your growth audit
                </p>
              </div>

              {/* Service Pills Container */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                {serviceOptions.map((service) => {
                  const isSelected = selectedServices.includes(service);
                  return (
                    <motion.button
                      key={service}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => toggleService(service)}
                      className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-[#00CFFF] text-[#07090E] font-bold shadow-[0_0_20px_rgba(0,207,255,0.4)] border border-[#00CFFF]'
                          : 'bg-[#0B0F19]/90 text-slate-300 border border-white/10 hover:border-[#00CFFF]/40 hover:bg-[#121826]'
                      }`}
                    >
                      {isSelected && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                          <Check size={14} strokeWidth={3} className="text-[#07090E]" />
                        </motion.span>
                      )}
                      <span>{service}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Contingent Feedback Status Banner */}
              <AnimatePresence mode="wait">
                {selectedServices.length === 0 ? (
                  <motion.p
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    className="text-xs italic text-slate-400 font-mono pt-1"
                  >
                    Please click to select services above to customize your growth audit request.
                  </motion.p>
                ) : (
                  <motion.div
                    key="selected"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    className="overflow-hidden pt-2"
                  >
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#0B0F19]/95 border border-[#00CFFF]/40 shadow-[0_0_30px_rgba(0,207,255,0.15)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#00CFFF] font-bold block">
                          READY TO INQUIRE ABOUT:
                        </span>
                        <p className="text-xs sm:text-sm font-sans text-white font-medium">
                          {selectedServices.join(' • ')}
                        </p>
                      </div>
                      <Link
                        href={`/growth-audit?services=${encodeURIComponent(selectedServices.join(','))}`}
                        className="shrink-0"
                      >
                        <CWButton variant="gradient" size="sm" className="group shadow-lg">
                          <span>Claim Custom Audit</span>
                          <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </CWButton>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Trust Signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs font-mono text-slate-400"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#00CFFF]" />
                <span>100% Attributable Commercial Growth</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-[#1769FF]" />
                <span>Sub-2s Next.js Web Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-[#D900FF]" />
                <span>Closed-Loop Lead CRM</span>
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Clear 3D Visual Zone (5 cols - Completely Unobstructed on Right) */}
          <div className="hidden lg:block lg:col-span-5 min-h-[400px] pointer-events-none" />

        </div>
      </div>
    </section>
  );
}
