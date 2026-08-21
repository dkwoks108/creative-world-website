'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SurnaxLogo } from '@/components/ui/SurnaxLogo';
import { usePathname } from 'next/navigation';
import { Menu, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MobileMenu } from './MobileMenu';
import { MagneticButton } from '@/components/motion/MagneticButton';

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Work', href: '/work' },
  { label: 'Packages', href: '/packages' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-4 px-3 sm:px-6 pointer-events-none transition-all duration-300">
        <div className="w-full max-w-[1280px] mx-auto pointer-events-auto">
          <div
            className={`flex items-center justify-between px-4 sm:px-6 transition-all duration-300 rounded-[18px] border border-white/10 min-w-0 ${
              isScrolled
                ? 'h-[60px] sm:h-[64px] bg-[#08090C]/90 backdrop-blur-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
                : 'h-[66px] sm:h-[70px] bg-[#08090C]/80 backdrop-blur-[18px] shadow-[0_6px_24px_rgba(0,0,0,0.3)]'
            }`}
          >
            {/* Left: Official Brand Logo & Status */}
            <div className="flex items-center shrink-0 min-w-0 gap-3">
              <Link
                href="/"
                aria-label="Surnax Technologies home"
                className="group flex items-center focus:outline-none shrink-0 cursor-pointer"
              >
                <SurnaxLogo accentColor="#B8FF2C" textColor="#F5F7FA" height={28} />
              </Link>

              {/* Wide Desktop Availability Status */}
              <div className="hidden xl:flex items-center border-l border-white/10 pl-3 ml-1 shrink-0">
                <div className="flex items-center space-x-2 font-mono text-[10px] tracking-[0.08em] uppercase shrink-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#B8FF2C] animate-pulse shrink-0" />
                  <span className="text-[#B8FF2C] font-semibold">AVAILABLE FOR Q3/Q4 PROJECTS</span>
                </div>
              </div>
            </div>

            {/* Center: Desktop Navigation Links (>= 1024px) */}
            <nav
              className="hidden lg:flex items-center space-x-4 xl:space-x-6 min-w-0 shrink-0 font-display"
              aria-label="Main Navigation"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-[13px] xl:text-[14px] font-medium transition-colors py-1 cursor-pointer whitespace-nowrap tracking-wide ${
                      isActive ? 'text-white font-bold' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-[#B8FF2C] rounded-full transition-all" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Primary CTA (Desktop >= 1024px) */}
            <div className="hidden lg:flex items-center shrink-0">
              <Link href="/growth-audit" className="cursor-pointer">
                <MagneticButton strength={4}>
                  <Button
                    variant="primary"
                    size="sm"
                    className="h-9 xl:h-10 px-5 rounded-lg text-xs font-bold bg-[#B8FF2C] text-[#08090C] hover:bg-[#a6f514] shadow-sm transition-all cursor-pointer whitespace-nowrap"
                    icon={<ArrowUpRight className="h-3.5 w-3.5 ml-1 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
                  >
                    <span>START A PROJECT →</span>
                  </Button>
                </MagneticButton>
              </Link>
            </div>

            {/* Mobile / Tablet Menu Trigger (< 1024px) */}
            <div className="flex items-center lg:hidden space-x-2 shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-all font-mono text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#B8FF2C] cursor-pointer"
                aria-label="Open navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="text-[11px] uppercase tracking-wider font-semibold">MENU</span>
                <Menu className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile / Tablet Navigation Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
}
