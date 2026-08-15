# MOTION DIRECTION & GSAP ANIMATION SPECIFICATION
## Brand: [PROVISIONAL BRAND NAME: VALENCE GROWTH LABS]

---

### 1. MOTION HIERARCHY AUDIT

To ensure the website remains performant, responsive, and clear across all devices, animations are categorized into a 3-tier implementation hierarchy.

```
TIER 1: ESSENTIAL MOTION (UX & Responsiveness — Always Enabled)
├── Smooth page scrolling (Lenis)
├── Hover states & active button responses
└── Mobile menu overlay open/close transitions

TIER 2: PREMIUM DIFFERENTIATION (Brand Quality — Enabled on Desktop/Tablet)
├── Typographic line-by-line masked reveals (GSAP ScrollTrigger)
├── Staggered card entrance transitions
└── Counter number count-up animations

TIER 3: OPTIONAL SPECTACLE (Visual Polish — Disabled on Low-Power Devices)
├── 3D camera pan tied to scroll progress
└── Subtle ambient particle float physics
```

---

### 2. GSAP ANIMATION SPECIFICATIONS

- **ScrollTrigger Text Reveals**: `yPercent: 100` to `0`, duration `0.8s`, ease `power3.out`, stagger `0.06s`.
- **Grid Item Entrances**: `y: 30` to `0`, `opacity: 0` to `1`, duration `0.6s`, ease `power2.out`, stagger `0.1s`.
- **Lenis + GSAP Synchronization**: Driven via single GSAP ticker callback (`gsap.ticker.add((time) => lenis.raf(time * 1000))`).

---

### 3. MOBILE & REDUCED MOTION SAFEGUARDS

- **Mobile Viewports (< 768px)**: Complex 3D scroll triggers and multi-layer parallax effects are disabled to preserve battery life and 60fps frame rates.
- **Accessibility (`prefers-reduced-motion: reduce`)**:
  - All spatial translations (`yPercent`, `x: 100`) are disabled.
  - Animations fall back to instantaneous 0.15s opacity fades.
  - Continuous 3D rotation pauses into static keyframe positions.
