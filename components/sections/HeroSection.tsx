'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MonochromeSection } from '@/components/monochrome/MonochromeSection';
import { MonochromeButton } from '@/components/monochrome/MonochromeButton';
import { VideoScrubber } from '@/components/motion/VideoScrubber';
import { SplitTextReveal } from '@/components/motion/SplitTextReveal';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { ParallaxElement } from '@/components/motion/ParallaxElement';
import { ScrollVelocityText } from '@/components/monochrome/EditorialScrollReveal';
import { ScrambleHover } from '@/components/monochrome/ScrambleText';

export function HeroSection() {
  const HERO_VIDEO_URL =
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4';

  return (
    <MonochromeSection divider="none" texture="lines" className="!py-12 md:!py-24 border-b-4 border-black relative overflow-hidden">
      {/* LAYER 1: Background Watermark (Depth 0.25x) */}
      <ParallaxElement speed={0.25} className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none opacity-5 select-none overflow-hidden" aria-hidden="true">
        <ScrollVelocityText speed={0.25} className="font-serif font-bold text-[18vw] uppercase tracking-tighter leading-none whitespace-nowrap text-black">
          SURNAX DIGITAL ENGINE SURNAX ARCHITECTURE
        </ScrollVelocityText>
      </ParallaxElement>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Title Sequence Content (7 cols, Depth 0.08x) */}
        <ParallaxElement speed={0.08} className="lg:col-span-7 flex flex-col gap-6">
          {/* Stage 3: Clean Metadata Tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-neutral-600 font-bold"
          >
            <span className="w-4 h-4 border-2 border-black bg-white inline-block" aria-hidden="true" />
            <span>DIGITAL ENGINE & PERFORMANCE MARKETING</span>
          </motion.div>

          {/* Stage 6: Line-by-Line Playfair Headline Reveal */}
          <div className="my-2">
            <SplitTextReveal
              as="h1"
              text="DIGITAL ENGINE."
              delay={0.35}
              className="font-serif font-bold text-6xl sm:text-8xl lg:text-9xl uppercase tracking-tighter leading-none text-black"
            />
          </div>

          {/* Stage 2: Travelling Horizontal Rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="w-full h-1 bg-black origin-left my-2"
          />

          {/* Stage 8: Paragraph & CTAs */}
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
              className="font-serif text-xl sm:text-2xl md:text-3xl leading-relaxed text-black tracking-tight font-normal"
            >
              Surnax Technologies engineers high-converting search systems, performance marketing funnels, and bespoke web platforms for ambitious Jaipur brands.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <MagneticButton strength={6}>
                <Link href="/growth-audit">
                  <MonochromeButton variant="primary" showArrow className="justify-center">
                    <ScrambleHover text="Schedule Free Audit" />
                  </MonochromeButton>
                </Link>
              </MagneticButton>
              <MagneticButton strength={4}>
                <Link href="/services">
                  <MonochromeButton variant="secondary" className="justify-center">
                    <ScrambleHover text="Explore Services" />
                  </MonochromeButton>
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </ParallaxElement>

        {/* LAYER 2: Hero Video Layer (Depth 0.15x) */}
        <ParallaxElement speed={0.15} className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="border-4 border-black bg-black shadow-none overflow-hidden relative group"
          >
            <VideoScrubber
              src={HERO_VIDEO_URL}
              priority
              overlayOpacity={0.3}
              grayscale
              contrast={1.2}
              scanlines
              className="h-[320px] sm:h-[420px] md:h-[480px] w-full"
            />
            {/* Corner Badge */}
            <div className="absolute top-4 left-4 bg-white border-2 border-black px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-black z-20">
              INTERACTIVE REEL
            </div>
            {/* Status bar */}
            <div className="absolute bottom-0 inset-x-0 bg-black/90 border-t-2 border-black p-3 font-mono text-[10px] text-white flex justify-between items-center z-20">
              <span>DIGITAL SHOWCASE</span>
              <span className="text-neutral-400">SURNAX REEL</span>
            </div>
          </motion.div>
        </ParallaxElement>
      </div>
    </MonochromeSection>
  );
}




