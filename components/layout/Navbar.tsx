'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SurnaxLogo } from '@/components/ui/SurnaxLogo';
import { MonochromeButton } from '@/components/monochrome/MonochromeButton';
import { SquashHamburger } from '@/components/ui/SquashHamburger';
import { ScrambleHover } from '@/components/monochrome/ScrambleText';
import { MobileMenu } from './MobileMenu';

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
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black text-black transform transition-transform duration-300 ease-in-out translate-y-0 ${
          isScrolled ? 'py-2 shadow-sm' : 'py-4'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              aria-label="Surnax Technologies home"
              className="group flex items-center focus-visible:outline focus-visible:outline-3 focus-visible:outline-black focus-visible:outline-offset-2"
            >
              <SurnaxLogo accentColor="#000000" brandColor="#000000" textColor="#000000" height={isScrolled ? 26 : 30} />
            </Link>
          </div>

          {/* Desktop Navigation Links with ScrambleHover */}
          <nav
            className="hidden lg:flex items-center space-x-6 font-serif"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-bold tracking-tight transition-all duration-100 py-1 focus-visible:outline focus-visible:outline-3 focus-visible:outline-black ${
                    isActive
                      ? 'text-black underline underline-offset-8 decoration-2'
                      : 'text-neutral-700 hover:text-black hover:underline underline-offset-4'
                  }`}
                >
                  <ScrambleHover text={link.label} />
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden lg:flex items-center">
            <Link href="/growth-audit">
              <MonochromeButton variant="primary" showArrow className="!py-2 !px-4 !text-xs">
                <ScrambleHover text="Start Audit" />
              </MonochromeButton>
            </Link>
          </div>

          {/* Mobile Menu Trigger with SquashHamburger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center gap-3 px-3.5 py-2 border-2 border-black bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-colors duration-100 focus-visible:outline focus-visible:outline-3 focus-visible:outline-black"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span>{isMobileMenuOpen ? 'CLOSE' : 'MENU'}</span>
              <SquashHamburger isOpen={isMobileMenuOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className={isScrolled ? 'h-16' : 'h-20'} aria-hidden="true" />

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
}



