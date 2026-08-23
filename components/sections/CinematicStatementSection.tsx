'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { MonochromeSection } from '@/components/monochrome/MonochromeSection';
import { MonochromeButton } from '@/components/monochrome/MonochromeButton';
import { CinematicVideoPlayer } from '@/components/monochrome/CinematicVideoPlayer';
import { ScrambleIn, ScrambleHover } from '@/components/monochrome/ScrambleText';
import { MagneticButton } from '@/components/motion/MagneticButton';

export function CinematicStatementSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const VIDEO_2_URL =
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4';

  // 3D Scroll Perspective Transformation continuous scroll journey
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 1,
  });

  // Art Direction Spec: Entry: rotateX(18deg) scale(0.92) opacity(0) -> Middle: rotateX(0deg) scale(1) opacity(1) -> Exit: rotateX(-8deg) scale(1.03) opacity(0.5)
  const rotateX = useTransform(smoothProgress, [0.1, 0.45, 0.9], [18, 0, -8]);
  const scale = useTransform(smoothProgress, [0.1, 0.45, 0.9], [0.92, 1.0, 1.03]);
  const opacity = useTransform(smoothProgress, [0.1, 0.3, 0.75, 0.95], [0, 1, 1, 0.5]);
  const translateY = useTransform(smoothProgress, [0, 1], [40, -80]);

  return (
    <MonochromeSection divider="ultra" texture="grid" className="!p-0 border-y-4 border-black relative overflow-hidden">
      <div ref={containerRef} className="relative min-h-[550px] sm:min-h-[700px] flex items-center justify-center p-8 sm:p-16 md:p-24">
        {/* Full-width Monochrome Background Video Player */}
        <div className="absolute inset-0 z-0">
          <CinematicVideoPlayer
            src={VIDEO_2_URL}
            overlayOpacity={0.65}
            grayscale
            contrast={1.25}
            scanlines
            className="w-full h-full"
          />
        </div>

        {/* 3D Perspective Content Box */}
        <div className="relative z-10 max-w-4xl mx-auto text-center" style={{ perspective: '600px' }}>
          <motion.div
            style={{
              rotateX,
              scale,
              translateY,
              opacity,
            }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 border-2 border-white bg-black font-mono text-xs uppercase tracking-widest text-white font-bold">
              <span className="w-2 h-2 bg-white inline-block animate-pulse" aria-hidden="true" />
              <span>
                <ScrambleHover text="PERFORMANCE & STRATEGY ENGINE" />
              </span>
            </div>

            <h2 className="font-serif font-bold text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-tight leading-none">
              <ScrambleIn text="WE DO NOT BUILD VANITY CAMPAIGNS." delay={200} as="span" />
              <br />
              <ScrambleIn text="WE ENGINEER REVENUE ENGINES." delay={600} as="span" />
              <span className="text-neutral-500">.</span>
            </h2>

            <p className="font-serifBody text-lg sm:text-2xl text-neutral-200 leading-relaxed font-normal max-w-3xl mx-auto">
              Traditional agency models burn budget on meaningless impressions. Surnax unifies search intent, performance video ads, and conversion engineering into one connected system.
            </p>

            <div className="pt-4 flex justify-center">
              <MagneticButton strength={5}>
                <Link href="/growth-audit">
                  <MonochromeButton variant="primary" className="!bg-white !text-black hover:!bg-neutral-200" showArrow>
                    <ScrambleHover text="Inspect Performance System" />
                  </MonochromeButton>
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>
    </MonochromeSection>
  );
}


