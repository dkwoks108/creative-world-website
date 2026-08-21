'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { RevealText } from '@/components/motion/RevealText';
import { Hero3DCanvas } from '@/components/3d/Hero3DCanvas';
import { siteConfig } from '@/data/site';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { MouseParallax } from '@/components/motion/MouseParallax';
import { TechScrambler } from '@/components/motion/TechScrambler';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  // Scroll scale transition: scale(0.96) -> scale(1) -> scale(1.03) on scroll exit
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion || !sectionRef.current) return;

      gsap.fromTo(
        heroContentRef.current,
        { scale: 0.97 },
        {
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-ivory"
    >
      {/* Background Lighting Accents with Mouse Parallax Depth (0.10x) */}
      <MouseParallax strength={12} invert className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-cyan/10 blur-[140px] rounded-full" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-brand-magenta/10 blur-[160px] rounded-full" />
      </MouseParallax>

      {/* Grid Pattern Overlay with 0.20x depth */}
      <MouseParallax strength={6} className="pointer-events-none absolute inset-0 z-0">
        <div className="w-full h-full bg-[linear-gradient(to_right,#11111108_1px,transparent_1px),linear-gradient(to_bottom,#11111108_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </MouseParallax>

      <Container variant="wide" className="relative z-10 my-auto">
        <div ref={heroContentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[580px] will-change-transform">
          {/* Left Column: Primary Copy & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-8 text-left">
            {/* Eyebrow Label with TechScrambler */}
            <div className="inline-flex items-center space-x-2 w-fit px-3.5 py-1.5 rounded-full bg-white border border-border-subtle shadow-editorial-sm">
              <span className="h-2 w-2 rounded-full bg-brand-cyan animate-pulse" />
              <TechScrambler
                text="JAIPUR DIGITAL GROWTH AGENCY"
                className="font-mono text-xs uppercase tracking-widest text-txt-secondary"
              />
            </div>

            {/* Main Headline with Masked Reveal Text */}
            <div className="space-y-1">
              <RevealText delay={0}>
                <h1 className="font-display font-normal text-5xl sm:text-7xl xl:text-8xl tracking-tight text-txt-primary leading-[1.05]">
                  Digital Marketing Built
                </h1>
              </RevealText>
              <RevealText delay={0.1}>
                <h1 className="font-display font-normal text-5xl sm:text-7xl xl:text-8xl tracking-tight text-brand-gradient italic leading-[1.05]">
                  Around Business Growth.
                </h1>
              </RevealText>
            </div>

            {/* Supporting Copy (+200ms stagger) */}
            <RevealText delay={0.2}>
              <p className="max-w-2xl text-base sm:text-lg xl:text-xl text-txt-secondary leading-relaxed font-normal">
                {siteConfig.subheadline}
              </p>
            </RevealText>

            {/* CTA Action Group (+300ms stagger) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-2">
              <Link href="/growth-audit">
                <MagneticButton strength={6}>
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto rounded-full bg-plum hover:bg-ink-soft text-white shadow-editorial transition-all hover:shadow-editorial-md"
                    icon={<ArrowRight className="h-4 w-4" />}
                  >
                    {siteConfig.primaryCTA}
                  </Button>
                </MagneticButton>
              </Link>

              <Link href="/work">
                <MagneticButton strength={4}>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full shadow-editorial-sm">
                    {siteConfig.secondaryCTA}
                  </Button>
                </MagneticButton>
              </Link>
            </div>

            {/* Live Availability Badge */}
            <div className="flex items-center space-x-3 pt-2 text-xs font-mono text-txt-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-ping" />
              <TechScrambler text={siteConfig.statusIndicator} scrambleOnHover />
            </div>
          </div>

          {/* Right Column: Integrated 3D Growth Core (+400ms stagger & Mouse Parallax) */}
          <div className="lg:col-span-5 relative w-full h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center">
            <MouseParallax strength={8} className="w-full h-full flex items-center justify-center">
              <Hero3DCanvas />
            </MouseParallax>
          </div>
        </div>
      </Container>

      {/* Visual Section Transition Divider & Scroll Indicator */}
      <div className="relative z-10 pt-8">
        <Container variant="wide">
          <div className="flex items-center justify-between border-t border-border-subtle pt-4 text-xs font-mono text-txt-muted">
            <TechScrambler text="[ SYSTEM LAYER: 01 / HERO ]" />
            <div className="flex items-center space-x-2 animate-bounce">
              <span>SCROLL TO EXPLORE</span>
              <ChevronDown className="h-3.5 w-3.5 text-brand-blue" />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
