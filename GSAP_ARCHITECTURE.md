# GSAP & MOTION ARCHITECTURE SPECIFICATION
## Brand: [PROVISIONAL BRAND NAME: VALENCE GROWTH LABS]

---

### 1. MOTION ARCHITECTURE & LIFECYCLE MANAGEMENT

All motion and scroll choreography are implemented using official GreenSock tools (`gsap`, `@gsap/react`, `ScrollTrigger`).

#### Core Lifecycle Principles:
- **`useGSAP()` Hook**: All animations MUST be declared inside the `useGSAP()` hook for automatic scoping, context isolation, and clean animation garbage collection upon component unmount.
- **Zero Memory Leaks**: Animations automatically call `.revert()` when components unmount, eliminating orphaned ScrollTriggers or stuck inline styles.
- **ScrollTrigger Refresh**: Dynamic content load triggers `ScrollTrigger.refresh()` after DOM updates.

---

### 2. LENIS SMOOTH SCROLL + GSAP TICKER INTEGRATION (OFFICIAL `lenis` API)

To prevent frame stutter and desynchronization between native browser smooth scrolling and GSAP ScrollTrigger offset calculations, the official `lenis` package drives the single GSAP ticker animation loop.

> [!IMPORTANT]
> **OFFICIAL LENIS PACKAGE COMPLIANCE**: Uses official `lenis` (^1.1.9) package and `lenis/react` (`import { ReactLenis } from 'lenis/react'`). The deprecated `@studio-freight/lenis` package is strictly removed.

```typescript
// components/motion/MotionProvider.tsx Blueprint Specification
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis, type LenisRef } from 'lenis/react';

gsap.registerPlugin(ScrollTrigger);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    // Check for reduced motion setting
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Add Lenis requestAnimationFrame handler to GSAP ticker loop
    const updateTicker = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
    };
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, duration: 1.2 }}>
      {children}
    </ReactLenis>
  );
}
```

---

### 3. 3-TIER MOTION IMPLEMENTATION MATRIX

Animations are classified into 3 strict execution tiers:

| Tier | Animation Type | Devices Enabled | Execution Spec | Fallback Behavior |
| :--- | :--- | :--- | :--- | :--- |
| **Tier 1: Essential UX** | Smooth Page Scroll, Hover Feedback, Mobile Drawer | All Devices | CSS Transitions / Lenis | Standard Native Scroll |
| **Tier 2: Premium Differentiation** | Masked Text Line Reveals, Card Grid Staggers | Desktop & Tablet | `useGSAP()` + `ScrollTrigger` (`start: 'top 85%'`) | Instant Opacity Fade |
| **Tier 3: Optional Spectacle** | 3D Camera Scroll Sweep, Parallax Backgrounds | High-GPU Desktop Only | GSAP Scrub (`scrub: 0.5`) tied to R3F Camera | Static Camera Position |

---

### 4. REUSABLE MOTION COMPONENTS

#### Typographic Masked Text Reveal (`RevealText.tsx`)
Wraps headlines in line containers and reveals text using CSS overflow clipping and GSAP `yPercent: 100 ➔ 0`:

```typescript
// components/motion/RevealText.tsx Blueprint
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function RevealText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(containerRef.current?.querySelectorAll('.reveal-line') || [], {
      yPercent: 100,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.06,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
```

---

### 5. ACCESSIBILITY & PREFERS-REDUCED-MOTION

When `@media (prefers-reduced-motion: reduce)` is detected:
- All spatial motion (`yPercent`, `x`, 3D camera pan) is disabled.
- Entrances fall back to instantaneous `0.15s` opacity fades.
- ScrollTrigger scrubbing is bypassed.
