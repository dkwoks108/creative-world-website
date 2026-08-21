'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { Button } from '@/components/ui/Button';

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
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.1 }
    );
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-[60] flex flex-col bg-surface-white/98 backdrop-blur-xl transition-all duration-300 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      {/* Drawer Header */}
      <div className="flex h-20 items-center justify-between px-6 border-b border-border-subtle">
        <Link href="/" onClick={onClose} aria-label="Ceativee World home">
          <Image
            src="/brand/logo-horizontal-transparent.png"
            alt="Ceativee World"
            width={140}
            height={38}
            className="h-8 w-auto object-contain"
          />
        </Link>
        <button
          onClick={onClose}
          className="p-2 text-txt-secondary hover:text-txt-primary hover:bg-black/5 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-plum"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Drawer Links */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <nav className="flex flex-col space-y-5 pt-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="mobile-link text-3xl sm:text-4xl font-display font-normal text-txt-primary hover:text-brand-blue transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Drawer Footer & CTA */}
        <div className="space-y-6 pb-8 border-t border-border-subtle pt-6">
          <div className="flex items-center space-x-2 font-mono text-xs text-txt-secondary">
            <span className="h-2 w-2 rounded-full bg-brand-cyan animate-pulse" />
            <span>● ACCEPTING SELECT PROJECTS IN JAIPUR</span>
          </div>

          <Link href="/growth-audit" onClick={onClose} className="block w-full">
            <Button
              variant="primary"
              size="lg"
              className="w-full rounded-full bg-plum text-white hover:bg-ink-soft"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Get a Free Growth Audit
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
