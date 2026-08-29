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
  { label: 'Industries', href: '/industries' },
  { label: 'Work', href: '/work' },
  { label: 'Packages', href: '/packages' },
  { label: 'About', href: '/about' },
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
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

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
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div
          className={`w-full px-6 sm:px-10 py-3.5 transition-all duration-300 flex items-center justify-between ${
            isScrolled
              ? 'cw-navbar-glass shadow-xl shadow-black/40'
              : 'bg-[#07090E]/80 backdrop-blur-md border-b border-white/5'
          }`}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            aria-label="Creativee World home"
            className="flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-[#00CFFF]"
          >
            <CreativeeLogo textColor="#ffffff" height={32} />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(`${link.href}`));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-200 relative py-1 ${
                    isActive ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00CFFF] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Menu Trigger */}
          <div className="flex items-center space-x-4">
            <Link href={ctaHref} className="hidden sm:block">
              <CWButton variant="gradient" size="sm">
                <span>{ctaLabel}</span>
                <ArrowUpRight size={15} />
              </CWButton>
            </Link>

            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-xl border border-slate-800 bg-[#0B0F19] text-white hover:border-[#00CFFF] transition-colors"
                aria-label="Toggle navigation menu"
              >
                <SquashHamburger isOpen={isMobileMenuOpen} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
}
