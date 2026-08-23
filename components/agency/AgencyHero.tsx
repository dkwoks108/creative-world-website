'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Menu, X, TrendingUp } from 'lucide-react';
import { AgencyShinyText } from './AgencyShinyText';
import { SurnaxLogo } from '@/components/ui/SurnaxLogo';

export function AgencyHero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative w-full min-h-screen bg-[#050608] text-[#F5F7FA] font-sans overflow-hidden flex flex-col justify-between select-none">
      {/* 1. Cinematic Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 pointer-events-none"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4"
      />

      {/* Sophisticated Dark Overlay & Directional Gradient */}
      <div className="absolute inset-0 bg-[#050608]/60 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050608]/40 to-[#050608]/90 z-0 pointer-events-none" />

      {/* Atmospheric Lighting (Cobalt Glow Top-Right, Lime Light Bottom-Left) */}
      <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#4D5CFF]/15 blur-[160px] rounded-full z-0" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#B8FF2C]/8 blur-[150px] rounded-full z-0" />

      {/* 2. Refined Transparent Navigation */}
      <header className="relative z-20 w-full border-b border-white/10 bg-[#050608]/50 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between gap-6">
          {/* Logo */}
          <a href="#" className="flex items-center group">
            <SurnaxLogo accentColor="#B8FF2C" textColor="#F5F7FA" height={32} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-mono uppercase tracking-widest text-[#A2A8B4]">
            <a href="#work" className="hover:text-[#F5F7FA] transition-colors">
              Work
            </a>
            <a href="#services" className="hover:text-[#F5F7FA] transition-colors">
              Services
            </a>
            <a href="#about" className="hover:text-[#F5F7FA] transition-colors">
              About
            </a>
            <a href="#insights" className="hover:text-[#F5F7FA] transition-colors">
              Insights
            </a>
            <a href="#contact" className="hover:text-[#F5F7FA] transition-colors">
              Contact
            </a>
          </nav>

          {/* Desktop Primary CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="#contact"
              className="group inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#B8FF2C] text-[#050608] font-semibold text-xs uppercase tracking-wider hover:bg-[#c4ff47] transition-all duration-300 hover:scale-[1.03] shadow-[0_0_20px_rgba(184,255,44,0.25)]"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Hamburger Button (< lg) */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl border border-white/10 bg-[#11151C] text-[#F5F7FA] hover:border-[#B8FF2C]/40 focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Full-Screen Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden absolute top-full left-0 right-0 border-b border-white/10 bg-[#050608]/95 backdrop-blur-2xl p-6 space-y-6 shadow-2xl"
            >
              <nav className="flex flex-col space-y-4 font-mono text-sm uppercase tracking-widest text-[#A2A8B4]">
                <a href="#work" className="hover:text-[#B8FF2C] transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                  01 // Work
                </a>
                <a href="#services" className="hover:text-[#B8FF2C] transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                  02 // Services
                </a>
                <a href="#about" className="hover:text-[#B8FF2C] transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                  03 // About
                </a>
                <a href="#insights" className="hover:text-[#B8FF2C] transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                  04 // Insights
                </a>
                <a href="#contact" className="hover:text-[#B8FF2C] transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                  05 // Contact
                </a>
              </nav>

              <div className="pt-4 border-t border-white/10">
                <a
                  href="#contact"
                  className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-[#B8FF2C] text-[#050608] font-bold text-xs uppercase tracking-wider"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>START A PROJECT</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-12 py-8 my-auto flex flex-col justify-center space-y-12">
        {/* 3. Hero Supporting Text (Two-column layout below navigation) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end border-b border-white/10 pb-8"
        >
          {/* Left Supporting Text (7 cols) */}
          <div className="lg:col-span-7 space-y-2">
            <span className="font-mono text-[10px] md:text-xs text-[#6E7582] uppercase tracking-[0.25em] block font-semibold">
              DIGITAL / CREATIVE / PERFORMANCE
            </span>
            <p className="text-xs sm:text-sm md:text-base text-[#F5F7FA] font-medium leading-relaxed max-w-xl">
              We build brands people remember and growth systems businesses can measure.
            </p>
          </div>

          {/* Right Supporting Metric (5 cols, right-aligned on lg+) */}
          <div className="lg:col-span-5 lg:text-right space-y-1">
            <div className="font-mono font-bold text-3xl sm:text-4xl lg:text-5xl text-[#B8FF2C] tracking-tight">
              ₹1.4Cr+
            </div>
            <span className="font-mono text-[10px] md:text-xs text-[#A2A8B4] uppercase tracking-wider block">
              Revenue influenced across campaigns
            </span>
          </div>
        </motion.div>

        {/* 4. Asymmetric Headline & Floating Performance Element Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Large Editorial Headline (8 cols on lg+) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-8 space-y-6"
          >
            {/* Hero Eyebrow */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#11151C] border border-white/10">
              <span className="h-2 w-2 rounded-full bg-[#B8FF2C] animate-pulse" />
              <span className="font-mono text-[11px] md:text-xs text-[#A2A8B4] uppercase tracking-widest font-semibold">
                WE BUILD DEMAND.
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-sans font-bold uppercase tracking-[-0.05em] leading-[0.88] text-[4rem] sm:text-[6.5rem] md:text-[8rem] xl:text-[9.5rem] text-[#F5F7FA]">
              <span className="block">MAKE YOUR</span>
              <span className="block">BRAND</span>
              <span className="block">IMPOSSIBLE</span>
              <span className="block">
                TO{' '}
                <AgencyShinyText
                  text="IGNORE."
                  baseColor="#B8FF2C"
                  shineColor="#F5F7FA"
                  speed={4}
                  spread={100}
                />
              </span>
            </h1>
          </motion.div>

          {/* Right Floating Performance Card & Technical Micro Details (4 cols on lg+) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-4 flex flex-col justify-between items-start lg:items-end space-y-8"
          >
            {/* Controlled Single Floating Performance Glass Card */}
            <div className="p-6 rounded-2xl bg-[#11151C]/80 border border-white/10 backdrop-blur-md shadow-2xl space-y-4 max-w-xs w-full">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#6E7582] font-semibold flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#B8FF2C]" />
                  CAMPAIGN PERFORMANCE
                </span>
                <TrendingUp className="h-4 w-4 text-[#B8FF2C]" />
              </div>

              <div className="space-y-1">
                <span className="font-mono font-bold text-4xl text-[#B8FF2C] tracking-tight block">
                  +218%
                </span>
                <span className="text-xs font-sans text-[#A2A8B4] block">
                  Average client revenue growth in 90 days
                </span>
              </div>
            </div>

            {/* Micro Technical Data Details */}
            <div className="font-mono text-[10px] text-[#6E7582] tracking-widest uppercase space-y-1.5 text-left lg:text-right">
              <div>01 / 05 — SYSTEM STATE: ACTIVE</div>
              <div>BRAND → DEMAND PLATFORM</div>
              <div>JAIPUR STUDIO • LIVE 2026</div>
            </div>
          </motion.div>
        </div>

        {/* 5. CTAs & Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/10"
        >
          {/* Primary CTA */}
          <a
            href="#contact"
            className="group inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-[#B8FF2C] text-[#050608] font-bold text-sm uppercase tracking-wider hover:bg-[#c4ff47] transition-all duration-300 hover:scale-[1.03] shadow-[0_0_30px_rgba(184,255,44,0.3)]"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </a>

          {/* Secondary CTA */}
          <a
            href="#work"
            className="group inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#F5F7FA] hover:text-[#B8FF2C] transition-colors py-2"
          >
            <span className="border-b border-white/20 group-hover:border-[#B8FF2C] transition-colors pb-0.5">
              VIEW OUR WORK
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#B8FF2C]" />
          </a>
        </motion.div>
      </div>

      {/* 6. Bottom Scroll Explorer Indicator */}
      <footer className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pb-6 flex items-center justify-between font-mono text-[10px] text-[#6E7582] uppercase tracking-widest">
        <span>SURNAX</span>
        <div className="flex items-center space-x-2 text-[#A2A8B4] animate-bounce">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#B8FF2C]" />
        </div>
        <span>EST. 2026</span>
      </footer>
    </section>
  );
}
