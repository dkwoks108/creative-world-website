import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/data/site';

export function Footer() {
  return (
    <footer className="relative bg-[#08090C] text-white border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Top Subtle Brand Line */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#B8FF2C] via-[#4D5CFF] to-[#31E7FF] opacity-80" />

      <Container variant="wide" className="space-y-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Identity & Positioning (4 cols) */}
          <div className="md:col-span-4 space-y-5">
            {/* White Container Card for Official Logo to ensure black wordmark remains 100% legible */}
            <Link href="/" aria-label="Surnax Technologies home" className="inline-block">
              <div className="p-2.5 px-4 bg-white rounded-xl shadow-sm border border-white/20 inline-flex items-center">
                <Image
                  src="/brand/logo-horizontal-transparent.png"
                  alt="Surnax Technologies"
                  width={155}
                  height={40}
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#9299A8] leading-relaxed max-w-sm font-normal">
              {siteConfig.subheadline}
            </p>

            <div className="p-4 rounded-xl bg-[#151821] border border-white/10 space-y-1 text-xs font-mono text-[#9299A8]">
              <span className="text-[#B8FF2C] block font-bold uppercase text-[10px] tracking-wider">
                JAIPUR STUDIO • EDITORIAL & PERFORMANCE
              </span>
              <p className="text-white font-medium">{siteConfig.contactEmailPlaceholder}</p>
              <p className="text-[11px] text-[#9299A8]">{siteConfig.locationPlaceholder}</p>
            </div>
          </div>

          {/* Growth Services Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-xs text-[#B8FF2C] uppercase tracking-widest block font-bold">
              GROWTH SERVICES
            </span>
            <ul className="space-y-2 text-xs font-mono text-[#9299A8]">
              <li>
                <Link href="/services/performance-marketing" className="hover:text-white transition-colors">
                  PERFORMANCE MARKETING
                </Link>
              </li>
              <li>
                <Link href="/services/seo" className="hover:text-white transition-colors">
                  SEO & LOCAL SEARCH
                </Link>
              </li>
              <li>
                <Link href="/services/social-media-marketing" className="hover:text-white transition-colors">
                  SOCIAL MEDIA & BRAND
                </Link>
              </li>
              <li>
                <Link href="/services/website-development" className="hover:text-white transition-colors">
                  WEBSITES & LANDING PAGES
                </Link>
              </li>
              <li>
                <Link href="/services/growth-strategy" className="hover:text-white transition-colors">
                  INTEGRATED STRATEGY
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-[#B8FF2C] transition-colors font-bold text-[#B8FF2C]">
                  EXPLORE PACKAGES & PRICING →
                </Link>
              </li>
            </ul>
          </div>

          {/* Sectors & Industries Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="font-mono text-xs text-[#B8FF2C] uppercase tracking-widest block font-bold">
              SECTORS & PLAYBOOKS
            </span>
            <ul className="space-y-2 text-xs font-mono text-[#9299A8]">
              <li>
                <Link href="/industries/coaching" className="hover:text-white transition-colors">
                  COACHING INSTITUTES
                </Link>
              </li>
              <li>
                <Link href="/industries/real-estate" className="hover:text-white transition-colors">
                  REAL ESTATE DEVELOPERS
                </Link>
              </li>
              <li>
                <Link href="/industries/restaurants" className="hover:text-white transition-colors">
                  CAFES & HOSPITALITY
                </Link>
              </li>
              <li>
                <Link href="/industries/salons-clinics" className="hover:text-white transition-colors">
                  SALONS & HEALTHCARE
                </Link>
              </li>
              <li>
                <Link href="/industries/jewelry" className="hover:text-white transition-colors">
                  JEWELRY & LUXURY RETAIL
                </Link>
              </li>
              <li>
                <Link href="/industries/clothing" className="hover:text-white transition-colors">
                  CLOTHING & BOUTIQUES
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-[#B8FF2C] transition-colors font-bold text-[#B8FF2C]">
                  VIEW CASE STUDIES →
                </Link>
              </li>
            </ul>
          </div>

          {/* Agency & Resources Links (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-mono text-xs text-[#B8FF2C] uppercase tracking-widest block font-bold">
              AGENCY & BLOG
            </span>
            <ul className="space-y-2 text-xs font-mono text-[#9299A8]">
              <li>
                <Link href="/insights" className="hover:text-white transition-colors font-semibold text-white">
                  INSIGHTS & BLOG
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  ABOUT AGENCY
                </Link>
              </li>
              <li>
                <Link href="/growth-audit" className="hover:text-white transition-colors">
                  FREE GROWTH AUDIT
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  CONTACT STUDIO
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#9299A8]">
          <p>© {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.</p>

          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              PRIVACY POLICY
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              TERMS OF SERVICE
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
