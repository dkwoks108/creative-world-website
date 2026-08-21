'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/data/site';
import { CinematicVideoPlayer } from '@/components/monochrome/CinematicVideoPlayer';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { ScrambleHover } from '@/components/monochrome/ScrambleText';

export function Footer() {
  const FOOTER_VIDEO_URL =
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_080203_fd7f4f85-3a86-4837-8192-85e7bfe68e75.mp4';

  return (
    <footer className="relative bg-black text-white border-t-8 border-black pt-20 pb-12 overflow-hidden font-serifBody">
      {/* Cinematic Video Background Atmosphere Layer */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <CinematicVideoPlayer
          src={FOOTER_VIDEO_URL}
          overlayOpacity={0.8}
          grayscale
          contrast={1.3}
          scanlines
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 lg:px-12 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Brand Identity & Positioning (4 cols) */}
          <ScrollReveal direction="bottom" delay={0.1} className="md:col-span-4 space-y-6">
            <Link href="/" aria-label="Surnax Technologies home" className="inline-block">
              <div className="p-3 bg-white border-2 border-black inline-flex items-center">
                <Image
                  src="/brand/logo-horizontal-transparent.png"
                  alt="Surnax Technologies"
                  width={155}
                  height={40}
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="font-serif text-sm sm:text-base text-neutral-300 leading-relaxed max-w-sm">
              {siteConfig.subheadline}
            </p>

            <div className="p-5 bg-neutral-900 border-2 border-neutral-800 space-y-1 font-mono text-xs text-neutral-300">
              <span className="text-white block font-bold uppercase text-[10px] tracking-widest mb-1">
                JAIPUR STUDIO • EDITORIAL & PERFORMANCE
              </span>
              <p className="text-white font-semibold">{siteConfig.contactEmailPlaceholder}</p>
              <p className="text-neutral-400 text-[11px]">{siteConfig.locationPlaceholder}</p>
            </div>
          </ScrollReveal>

          {/* Growth Services Links (3 cols) */}
          <ScrollReveal direction="bottom" delay={0.2} className="md:col-span-3 space-y-4">
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block font-bold">
              01 / GROWTH SERVICES
            </span>
            <ul className="space-y-2.5 font-mono text-xs text-neutral-300">
              <li>
                <Link href="/services/performance-marketing" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                  <ScrambleHover text="PERFORMANCE MARKETING" />
                </Link>
              </li>
              <li>
                <Link href="/services/seo" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                  <ScrambleHover text="SEO & LOCAL SEARCH" />
                </Link>
              </li>
              <li>
                <Link href="/services/social-media-marketing" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                  <ScrambleHover text="SOCIAL MEDIA & BRAND" />
                </Link>
              </li>
              <li>
                <Link href="/services/website-development" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                  <ScrambleHover text="WEBSITES & LANDING PAGES" />
                </Link>
              </li>
              <li>
                <Link href="/services/growth-strategy" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                  <ScrambleHover text="INTEGRATED STRATEGY" />
                </Link>
              </li>
              <li className="pt-2">
                <MagneticButton strength={4}>
                  <Link href="/packages" className="hover:text-white hover:underline underline-offset-4 transition-colors font-bold text-white block">
                    <ScrambleHover text="EXPLORE PACKAGES →" />
                  </Link>
                </MagneticButton>
              </li>
            </ul>
          </ScrollReveal>

          {/* Sectors & Industries Links (3 cols) */}
          <ScrollReveal direction="bottom" delay={0.3} className="md:col-span-3 space-y-4">
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block font-bold">
              02 / SECTORS & PLAYBOOKS
            </span>
            <ul className="space-y-2.5 font-mono text-xs text-neutral-300">
              <li>
                <Link href="/industries/coaching" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                  <ScrambleHover text="COACHING INSTITUTES" />
                </Link>
              </li>
              <li>
                <Link href="/industries/real-estate" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                  <ScrambleHover text="REAL ESTATE DEVELOPERS" />
                </Link>
              </li>
              <li>
                <Link href="/industries/restaurants" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                  <ScrambleHover text="CAFES & HOSPITALITY" />
                </Link>
              </li>
              <li>
                <Link href="/industries/salons-clinics" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                  <ScrambleHover text="SALONS & HEALTHCARE" />
                </Link>
              </li>
              <li>
                <Link href="/industries/jewelry" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                  <ScrambleHover text="JEWELRY & LUXURY RETAIL" />
                </Link>
              </li>
              <li>
                <Link href="/industries/clothing" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                  <ScrambleHover text="CLOTHING & BOUTIQUES" />
                </Link>
              </li>
              <li className="pt-2">
                <MagneticButton strength={4}>
                  <Link href="/work" className="hover:text-white hover:underline underline-offset-4 transition-colors font-bold text-white block">
                    <ScrambleHover text="VIEW CASE STUDIES →" />
                  </Link>
                </MagneticButton>
              </li>
            </ul>
          </ScrollReveal>

          {/* Agency & Resources Links (2 cols) */}
          <ScrollReveal direction="bottom" delay={0.4} className="md:col-span-2 space-y-4">
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block font-bold">
              03 / AGENCY
            </span>
            <ul className="space-y-2.5 font-mono text-xs text-neutral-300">
              <li>
                <Link href="/insights" className="hover:text-white hover:underline underline-offset-4 transition-colors font-semibold text-white">
                  <ScrambleHover text="INSIGHTS & BLOG" />
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                  <ScrambleHover text="ABOUT AGENCY" />
                </Link>
              </li>
              <li>
                <Link href="/growth-audit" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                  <ScrambleHover text="FREE GROWTH AUDIT" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                  <ScrambleHover text="CONTACT STUDIO" />
                </Link>
              </li>
            </ul>
          </ScrollReveal>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.</p>

          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-white hover:underline underline-offset-4 transition-colors">
              PRIVACY POLICY
            </Link>
            <Link href="/terms" className="hover:text-white hover:underline underline-offset-4 transition-colors">
              TERMS OF SERVICE
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}



