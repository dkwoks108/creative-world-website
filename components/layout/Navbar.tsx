'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CreativeeLogo } from '@/components/ui/CreativeeLogo';
import { SquashHamburger } from '@/components/ui/SquashHamburger';
import { MobileMenu } from './MobileMenu';
import { ArrowUpRight } from 'lucide-react';
import { CWButton } from '@/components/ui/CWButton';

const defaultNavLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Agency', href: '/agency' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navLinks, setNavLinks] = useState(defaultNavLinks);
  const [ctaLabel, setCtaLabel] = useState('Growth Audit');
  const [ctaHref, setCtaHref] = useState('/growth-audit');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Fetch dynamic site data from DB
    fetch('/api/site-data')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          if (data.navigation && data.navigation.length > 0) {
            setNavLinks(data.navigation);
          }
          if (data.settings?.header_cta_label) {
            setCtaLabel(data.settings.header_cta_label);
          }
          if (data.settings?.header_cta_href) {
            setCtaHref(data.settings.header_cta_href);
          }
        }
      })
      .catch((err) => console.error('Navbar site-data fetch error:', err));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3 transition-all duration-300">
        <div
          className={`max-w-6xl mx-auto rounded-full transition-all duration-300 flex items-center justify-between px-6 py-2.5 ${
            isScrolled
              ? 'bg-[#07090E]/85 backdrop-blur-xl border border-white/15 shadow-2xl shadow-cyan-950/20'
              : 'bg-[#07090E]/60 backdrop-blur-md border border-white/10'
          }`}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            aria-label="Creativee World home"
            className="group flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-[#00CFFF]"
          >
            <CreativeeLogo textColor="#ffffff" height={28} />
          </Link>

          {/* Desktop Dynamic Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-200 relative py-1 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cw-gradient rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Glowing Gradient CTA & Mobile Menu Toggle */}
          <div className="flex items-center space-x-3">
            <Link href={ctaHref} className="hidden sm:block">
              <CWButton variant="gradient" size="sm">
                <span>{ctaLabel}</span>
                <ArrowUpRight size={15} />
              </CWButton>
            </Link>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full border border-white/20 bg-slate-900/80 text-white hover:border-[#00CFFF] transition-colors"
                aria-label="Toggle navigation menu"
              >
                <SquashHamburger isOpen={isMobileMenuOpen} />
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
}
