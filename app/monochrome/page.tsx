import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Layers, Shield, Sparkles, Compass, Eye, Check, ArrowRight } from 'lucide-react';
import { MonochromeButton } from '@/components/monochrome/MonochromeButton';
import { MonochromeCard } from '@/components/monochrome/MonochromeCard';
import { MonochromeInput, MonochromeTextarea } from '@/components/monochrome/MonochromeInput';
import { MonochromeSection } from '@/components/monochrome/MonochromeSection';
import { MonochromeDropCap, MonochromePullQuote } from '@/components/monochrome/MonochromeEditorial';

export const metadata: Metadata = {
  title: 'Minimalist Monochrome | Editorial Design System',
  description: 'A stark, authoritative, editorial visual experience built with pure black & white palette, serif typography, and zero border radius.',
};

export default function MonochromeShowcasePage() {
  return (
    <main className="min-h-screen bg-white text-black font-serifBody selection:bg-black selection:text-white">
      {/* Editorial Top Bar / Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-black py-4 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest font-bold">
          <span className="w-3 h-3 border border-black bg-black inline-block" />
          <span>SURNAX EDITORIAL</span>
          <span className="text-neutral-400">/ ISSUE N° 01</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest font-medium">
          <a href="#philosophy" className="hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black">Philosophy</a>
          <a href="#editorial" className="hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black">Editorial</a>
          <a href="#gallery" className="hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black">Gallery</a>
          <a href="#pricing" className="hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black">Monograph</a>
        </nav>
        <Link href="/">
          <MonochromeButton variant="secondary" className="!py-2 !px-4 text-xs">
            ← Main Site
          </MonochromeButton>
        </Link>
      </header>

      {/* 1. HERO SECTION (Oversized Headline, Decorative Square Rule, Textures) */}
      <MonochromeSection divider="none" texture="lines" className="!py-16 md:!py-24 border-b-4 border-black">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-neutral-600">
            <span className="w-4 h-4 border-2 border-black bg-white inline-block" aria-hidden="true" />
            <span>ESSAY N° 01 — DESIGN AS DISCIPLINE</span>
          </div>

          <h1 className="font-serif font-bold text-6xl sm:text-8xl lg:text-9xl uppercase tracking-tighter leading-none text-black my-4">
            REDUCTION<br />
            TO ESSENCE<span className="text-neutral-400">.</span>
          </h1>

          <div className="w-full h-1 bg-black my-4" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <p className="font-serif text-xl sm:text-2xl md:text-3xl leading-relaxed text-black tracking-tight font-normal">
                Minimalist Monochrome strips design down to its most fundamental elements: black, white, and typography. Every decision stands on its own merit—where restraint becomes the ultimate form of expression.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end gap-4">
              <MonochromeButton variant="primary" showArrow>
                Explore Monograph
              </MonochromeButton>
              <MonochromeButton variant="secondary">
                View Manifesto
              </MonochromeButton>
            </div>
          </div>
        </div>
      </MonochromeSection>

      {/* 2. INVERTED STATS SECTION (Black background, white text, vertical texture) */}
      <section className="bg-black text-white relative py-16 md:py-24 border-b-8 border-black overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-texture-stats" aria-hidden="true" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
            <div className="pt-4 md:pt-0 md:pl-0">
              <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-2">Contrast Ratio</p>
              <p className="font-serif text-5xl md:text-7xl font-bold tracking-tight">21:1</p>
              <p className="font-mono text-xs text-neutral-400 mt-2">WCAG AAA Certified</p>
            </div>
            <div className="pt-4 md:pt-0 md:pl-8">
              <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-2">Border Radius</p>
              <p className="font-serif text-5xl md:text-7xl font-bold tracking-tight">0<span className="text-sm font-mono font-normal">px</span></p>
              <p className="font-mono text-xs text-neutral-400 mt-2">Architectural Precision</p>
            </div>
            <div className="pt-4 md:pt-0 md:pl-8">
              <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-2">Hover Delay</p>
              <p className="font-serif text-5xl md:text-7xl font-bold tracking-tight">100<span className="text-sm font-mono font-normal">ms</span></p>
              <p className="font-mono text-xs text-neutral-400 mt-2">Instant State Transition</p>
            </div>
            <div className="pt-4 md:pt-0 md:pl-8">
              <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-2">Color Palette</p>
              <p className="font-serif text-5xl md:text-7xl font-bold tracking-tight">B/W</p>
              <p className="font-mono text-xs text-neutral-400 mt-2">Absolute Monochrome</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EDITORIAL ARTICLE SECTION (Boxed Drop Cap, Line Grid Texture) */}
      <MonochromeSection id="editorial" divider="thick" texture="grid">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-bold block mb-3">01 / ARCHITECTURE</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight leading-none mb-6">
              The Discipline of Absence
            </h2>
            <div className="w-12 h-1 bg-black mb-6" />
            <p className="font-serifBody text-base text-neutral-600 leading-relaxed mb-6">
              In a digital ecosystem saturated with colorful gradients and artificial depth, restraint becomes an authoritative visual statement.
            </p>
            <div className="p-4 border-2 border-black bg-white">
              <p className="font-mono text-xs uppercase tracking-wider font-semibold text-black">
                KEY RULE: Zero accent colors. Black is the accent.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <MonochromeDropCap text="Monochrome typography demands unyielding rigor. Without color to differentiate visual priority, scale, weight, tracking, and negative space become the sole instruments of hierarchy. The page is not merely a container for copy; it is a carefully structured grid of black ink on paper-white canvas." />

            <p className="font-serifBody text-lg md:text-xl leading-relaxed text-black">
              Every horizontal rule acts as a structural girder. Every sharp 90-degree corner reinforces architectural discipline. When interactive controls flip instantly between black and white, the user experiences a tactile, binary response that feels authoritative and crisp.
            </p>

            {/* Editorial Pull Quote */}
            <MonochromePullQuote
              quote="Typography is not merely content—it is the primary visual element that commands respect through confidence."
              author="Vogue Architectural Monograph"
              title="Vol. IV"
            />
          </div>
        </div>
      </MonochromeSection>

      {/* 4. FEATURE CARDS GRID (100ms Hover Inversion, Sharp Borders) */}
      <MonochromeSection id="philosophy" divider="thick" texture="diagonal">
        <div className="mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-bold block mb-2">02 / CORE PILLARS</span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight leading-none">
            Design Standards
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MonochromeCard variant="standard" className="flex flex-col justify-between h-full min-h-[300px]">
            <div>
              <div className="w-10 h-10 border border-black flex items-center justify-center mb-6 group-hover:border-white transition-colors duration-100">
                <Layers size={20} strokeWidth={1.5} className="text-black group-hover:text-white transition-colors duration-100" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 group-hover:text-neutral-400 block mb-2">Pillar 01</span>
              <h3 className="font-serif text-2xl font-bold mb-4 tracking-tight">Line-Based Hierarchy</h3>
              <p className="font-serifBody text-base leading-relaxed opacity-80">
                Structure created exclusively through hairlines, thick rules, and borders instead of drop shadows or elevation.
              </p>
            </div>
            <div className="pt-6 border-t border-current flex items-center justify-between font-mono text-xs uppercase tracking-widest">
              <span>Read Detail</span>
              <span>→</span>
            </div>
          </MonochromeCard>

          <MonochromeCard variant="standard" className="flex flex-col justify-between h-full min-h-[300px]">
            <div>
              <div className="w-10 h-10 border border-black flex items-center justify-center mb-6 group-hover:border-white transition-colors duration-100">
                <Shield size={20} strokeWidth={1.5} className="text-black group-hover:text-white transition-colors duration-100" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 group-hover:text-neutral-400 block mb-2">Pillar 02</span>
              <h3 className="font-serif text-2xl font-bold mb-4 tracking-tight">Sharp 90° Geometry</h3>
              <p className="font-serifBody text-base leading-relaxed opacity-80">
                Strict zero-radius across all buttons, cards, containers, and inputs. Architectural precision with no soft edges.
              </p>
            </div>
            <div className="pt-6 border-t border-current flex items-center justify-between font-mono text-xs uppercase tracking-widest">
              <span>Read Detail</span>
              <span>→</span>
            </div>
          </MonochromeCard>

          <MonochromeCard variant="standard" className="flex flex-col justify-between h-full min-h-[300px]">
            <div>
              <div className="w-10 h-10 border border-black flex items-center justify-center mb-6 group-hover:border-white transition-colors duration-100">
                <Sparkles size={20} strokeWidth={1.5} className="text-black group-hover:text-white transition-colors duration-100" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 group-hover:text-neutral-400 block mb-2">Pillar 03</span>
              <h3 className="font-serif text-2xl font-bold mb-4 tracking-tight">Binary Interactions</h3>
              <p className="font-serifBody text-base leading-relaxed opacity-80">
                Instant hover color inversion (0-100ms) with high-contrast outlines for maximum clarity and tactile feedback.
              </p>
            </div>
            <div className="pt-6 border-t border-current flex items-center justify-between font-mono text-xs uppercase tracking-widest">
              <span>Read Detail</span>
              <span>→</span>
            </div>
          </MonochromeCard>
        </div>
      </MonochromeSection>

      {/* 5. GALLERY GRID (Image Hover Thicken Border 2px->4px, Scale 105%, Grayscale off) */}
      <MonochromeSection id="gallery" divider="thick" texture="noise">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-bold block mb-2">03 / VISUAL CURATION</span>
            <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight leading-none">
              Monochrome Archive
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-600 max-w-xs">
            Hover images to observe border weight expansion (2px → 4px) and instant scale effect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Architectural Card */}
          <div className="group relative overflow-hidden bg-white border-2 border-black p-4 transition-all duration-100 group-hover:border-[4px]">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100 border border-black mb-4">
              <Image
                src="/images/monochrome_arch.png"
                alt="Minimalist brutalist architectural photography"
                fill
                className="object-cover grayscale transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest pt-2">
              <span className="font-bold text-black">Plate 01 — Architectural Form</span>
              <span className="text-neutral-500">Museum Series</span>
            </div>
          </div>

          {/* Fashion Card */}
          <div className="group relative overflow-hidden bg-white border-2 border-black p-4 transition-all duration-100 group-hover:border-[4px]">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100 border border-black mb-4">
              <Image
                src="/images/monochrome_fashion.png"
                alt="High contrast fashion editorial portrait"
                fill
                className="object-cover grayscale transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest pt-2">
              <span className="font-bold text-black">Plate 02 — High Fashion Editorial</span>
              <span className="text-neutral-500">Vogue Specimen</span>
            </div>
          </div>
        </div>
      </MonochromeSection>

      {/* 6. ELEVATED PRICING TIER SECTION (Vertical Extension, Inversion) */}
      <MonochromeSection id="pricing" divider="ultra" texture="lines">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-bold block mb-2">04 / MONOGRAPH EDITIONS</span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight leading-none mb-4">
            Editorial Publications
          </h2>
          <p className="font-serifBody text-lg text-neutral-600">
            Select an architectural print edition suited for your studio or design collection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Digital Edition */}
          <div className="bg-white border-2 border-black p-8 flex flex-col justify-between transition-colors duration-100 hover:bg-black hover:text-white group">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 group-hover:text-neutral-400 block mb-2">Standard</span>
              <h3 className="font-serif text-3xl font-bold mb-2">Digital Monograph</h3>
              <p className="font-mono text-2xl font-bold mb-6">$149</p>
              <ul className="space-y-4 font-serifBody text-sm mb-8 border-t border-current pt-6">
                <li className="flex items-center gap-3"><Check size={16} strokeWidth={2} /> High-Resolution PDF Asset Suite</li>
                <li className="flex items-center gap-3"><Check size={16} strokeWidth={2} /> Complete Type Token Hierarchy</li>
                <li className="flex items-center gap-3"><Check size={16} strokeWidth={2} /> Figma Editorial Template Kit</li>
              </ul>
            </div>
            <MonochromeButton variant="secondary" className="w-full group-hover:!bg-white group-hover:!text-black">
              Select Edition
            </MonochromeButton>
          </div>

          {/* Hardcover Collector Edition (Elevated Tier) */}
          <div className="bg-black text-white border-4 border-black p-8 flex flex-col justify-between lg:-translate-y-4 shadow-[0_0_0_8px_#000000] relative">
            <div className="absolute top-0 right-0 bg-white text-black font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 border-b-2 border-l-2 border-black">
              RECOMMENDED
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block mb-2">Collector</span>
              <h3 className="font-serif text-3xl font-bold mb-2">Hardcover Edition</h3>
              <p className="font-mono text-2xl font-bold mb-6">$499</p>
              <ul className="space-y-4 font-serifBody text-sm mb-8 border-t border-neutral-700 pt-6">
                <li className="flex items-center gap-3"><Check size={16} strokeWidth={2} /> Linen Hardcover Architectural Monograph</li>
                <li className="flex items-center gap-3"><Check size={16} strokeWidth={2} /> Includes Complete Digital Asset Suite</li>
                <li className="flex items-center gap-3"><Check size={16} strokeWidth={2} /> Signed & Numbered Limited Printing</li>
                <li className="flex items-center gap-3"><Check size={16} strokeWidth={2} /> Custom Black Foil Slipcase</li>
              </ul>
            </div>
            <MonochromeButton variant="primary" className="w-full !bg-white !text-black hover:!bg-neutral-200">
              Claim Collector Edition
            </MonochromeButton>
          </div>

          {/* Institutional Edition */}
          <div className="bg-white border-2 border-black p-8 flex flex-col justify-between transition-colors duration-100 hover:bg-black hover:text-white group">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 group-hover:text-neutral-400 block mb-2">Enterprise</span>
              <h3 className="font-serif text-3xl font-bold mb-2">Institutional Archival</h3>
              <p className="font-mono text-2xl font-bold mb-6">$1,250</p>
              <ul className="space-y-4 font-serifBody text-sm mb-8 border-t border-current pt-6">
                <li className="flex items-center gap-3"><Check size={16} strokeWidth={2} /> Full Studio Redistribution Rights</li>
                <li className="flex items-center gap-3"><Check size={16} strokeWidth={2} /> Museum Exhibition Print Plates</li>
                <li className="flex items-center gap-3"><Check size={16} strokeWidth={2} /> Dedicated Typography Workshop</li>
              </ul>
            </div>
            <MonochromeButton variant="secondary" className="w-full group-hover:!bg-white group-hover:!text-black">
              Contact Gallery
            </MonochromeButton>
          </div>
        </div>
      </MonochromeSection>

      {/* 7. FINAL INVERTED CTA SECTION (Radial white texture, Input focus thickening, Instant button) */}
      <section className="bg-black text-white relative py-24 md:py-36 border-t-8 border-black overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-texture-cta" aria-hidden="true" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block mb-4">SUBSCRIPTION N° 01</span>
          <h2 className="font-serif text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6">
            Join the Editorial Desk
          </h2>
          <p className="font-serifBody text-lg md:text-xl text-neutral-300 max-w-xl mx-auto mb-10">
            Receive monthly architectural monograph essays, typographic critique, and luxury design system updates.
          </p>

          <form className="flex flex-col sm:flex-row items-center gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <div className="w-full flex-1">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="w-full bg-black text-white font-serifBody text-base px-0 py-3 border-b-2 border-white rounded-none transition-all duration-100 placeholder:text-neutral-500 placeholder:italic focus:border-b-[4px] focus:outline-none focus-visible:border-b-[4px]"
                required
              />
            </div>
            <MonochromeButton variant="primary" className="w-full sm:w-auto !bg-white !text-black hover:!bg-neutral-200">
              Subscribe
            </MonochromeButton>
          </form>
          <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 mt-6">
            Zero spam. Unsubscribe at any time with one click.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t-4 border-black py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs uppercase tracking-widest text-neutral-600">
          <div className="flex items-center gap-3 font-bold text-black">
            <span className="w-3 h-3 border border-black bg-black inline-block" />
            <span>SURNAX TECHNOLOGIES © 2026</span>
          </div>
          <div>MINIMALIST MONOCHROME DESIGN SYSTEM</div>
          <Link href="/" className="hover:underline underline-offset-4 text-black font-bold">
            Back to Agency Homepage →
          </Link>
        </div>
      </footer>
    </main>
  );
}
