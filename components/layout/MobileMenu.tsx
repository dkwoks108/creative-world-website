'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { X, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { CreativeeLogo } from '@/components/ui/CreativeeLogo';
import { MonochromeButton } from '@/components/monochrome/MonochromeButton';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on Escape keypress & manage scroll locking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Stagger animation when menu opens
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const linkElements = menuRef.current.querySelectorAll('.mobile-link');
    gsap.fromTo(
      linkElements,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.2, stagger: 0.04, ease: 'power2.out' }
    );
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-[60] flex flex-col bg-white text-black border-l-4 border-black transition-all duration-100 lg:hidden font-serifBody"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      {/* Drawer Header */}
      <div className="flex h-20 items-center justify-between px-6 border-b-2 border-black">
        <Link href="/" onClick={onClose} aria-label="Creativee World home">
          <CreativeeLogo accentColor="#000000" brandColor="#000000" textColor="#000000" height={28} />
        </Link>
        <button
          onClick={onClose}
          className="p-2 text-black border-2 border-black hover:bg-black hover:text-white transition-colors focus-visible:outline focus-visible:outline-3 focus-visible:outline-black"
          aria-label="Close menu"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Drawer Links */}
      <div className="flex flex-1 flex-col justify-between p-6 overflow-y-auto">
        <nav className="flex flex-col space-y-4 pt-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="mobile-link font-serif text-3xl sm:text-4xl font-bold text-black hover:underline underline-offset-4 tracking-tight"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Drawer Footer & CTA */}
        <div className="space-y-6 pb-8 border-t-2 border-black pt-6">
          <div className="flex items-center space-x-2 font-mono text-xs text-neutral-600 uppercase font-bold tracking-widest">
            <span className="w-2 h-2 border border-black bg-black inline-block" />
            <span>JAIPUR STUDIO • CONNECTED GROWTH</span>
          </div>

          <Link href="/growth-audit" onClick={onClose} className="block w-full">
            <MonochromeButton variant="primary" showArrow className="w-full justify-center">
              Request Free Sector Audit
            </MonochromeButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

