# Creative World — Motion Design System & Interaction Protocol

## 01 — Overview & Motion Philosophy

The Creative World motion system translates the **Warm Editorial Growth** brand identity into fluid, intentional, and high-precision digital choreography. Motion is designed to feel:

- **Editorial & Restrained**: Like opening a high-end design monograph; movements are calm, clear, and unhurried.
- **Fluid & Responsive**: Built with natural spring and deceleration curves (`power3.out`, `power2.out`).
- **Quietly Confident**: Avoiding noisy web3 gadgets, HUD overlays, or scroll-hijacking.
- **Purposeful**: Every transition clarifies content hierarchy, guides discovery, or confirms user action.

---

## 02 — Technology Architecture

The motion system is powered strictly by the existing framework stack:

1. **GSAP 3 Core**: Timelines, tweens, and utility functions (`clamp`, `interpolate`, `mapRange`).
2. **GSAP ScrollTrigger**: Scroll-linked reveals and pinned timeline progression scoped to component lifecycles.
3. **@gsap/react (`useGSAP`)**: React lifecycle binding ensuring clean unmounts, context-scoped element queries, and memory safety.
4. **React Lenis**: Smooth scroll engine synchronized directly with the GSAP ticker loop.
5. **Three.js / React Three Fiber**: Interactive 3D Growth Core scene with GPU tiering and pointer-influenced camera micro-tilts.
6. **CSS Hardware-Accelerated Transitions**: Micro-hover states using `transform` and `opacity`.

---

## 03 — The 4-Tier Motion Hierarchy

### LEVEL 1 — Essential (Feedback & Usability)
- **Page & Route Transitions**: 250–350ms subtle opacity fade.
- **Navigation Shell**: Scroll-linked height compression, backdrop blur shifts (`bg-white/80` → `bg-white/90`), and border styling.
- **Button & Link Hovers**: `translateY(-2px)`, line scale (`scaleX: 0 → 1`), arrow displacement (`translateX(3–5px)`).
- **Form Feedback**: Step transitions (350–500ms `power2.out`), progress bar width updates, error pulse.

### LEVEL 2 — Editorial (Content & Visual Entrances)
- **Masked Line Reveals**: Instrument Serif headlines reveal via `overflow-hidden` wrappers (`y: 110% → 0%`, `opacity: 0 → 1`, `duration: 0.8–1.0s`, `ease: power3.out`).
- **Editorial Image Reveals**: Magazine-style clip-path entrance with subtle `scale(1.06) → 1` zoom (`duration: 1.0–1.2s`).
- **Card & Grid Staggers**: Section grids stagger in with `0.06–0.10s` intervals.
- **Verified Number Counters**: Count-up interpolation for verified business metrics (`1.2–1.6s`, `power2.out`).

### LEVEL 3 — Immersive (Contextual Micro-Interactions)
- **Hero 3D Pointer Interaction**: Micro-tilt response (±3–5 degrees rotation, camera shift) tracking cursor movement smoothly.
- **Methodology Timeline Choreography**: Scroll-linked 4-step progress line highlighting active growth stages on desktop and mobile.
- **Article Reading Progress Bar**: Fixed top progress bar (`2px` height, `#F26A4F` Warm Coral) tracking scroll depth on long-form articles.

### LEVEL 4 — Signature (Brand Anchors)
- **Hero Entrance Sequence**: 6-stage choreographed launch (Nav → Eyebrow → Masked Title → Subtitle → CTAs → 3D Mesh settlement).
- **Growth Core Connected Engine**: Ambient glowing ring rotation and pulsing node signal streams.
- **Magnetic CTA Pull**: Restrained 4–8px cursor pull for primary high-conversion CTAs (`Get a Free Growth Audit`).

---

## 04 — Timing, Easings & Performance Rules

| Motion Type | Duration | Easing | Stagger | Hardware Properties |
| :--- | :--- | :--- | :--- | :--- |
| Headline Reveal | 800ms–1000ms | `power3.out` | 80ms–120ms | `transform`, `opacity` |
| Image Reveal | 1000ms–1200ms | `power3.out` | — | `clip-path`, `transform` |
| Card Entrance | 600ms–800ms | `power2.out` | 60ms–80ms | `transform`, `opacity` |
| Button Hover | 250ms–350ms | `power2.out` | — | `transform`, `box-shadow` |
| Magnetic Return | 400ms | `back.out(1.7)` | — | `transform` |
| Section Background Fade | 600ms | `sine.inOut` | — | `background-color`, `border-color` |

---

## 05 — Accessibility & Touch Device Safeguards

1. **`prefers-reduced-motion: reduce`**:
   - Disables all parallax, magnetic pulls, scrubbing, 3D pointer tilts, and text masks.
   - Replaces entrances with instant or standard opacity fades.
2. **Touch & Mobile Devices (`hover: none`)**:
   - Disables magnetic cursor pulls and desktop-only hover state listeners.
   - Converts hover states to responsive active/focus press feedback.
3. **Focus States**:
   - Maintains WCAG AA compliant focus rings (`focus-visible:ring-2 focus-visible:ring-coral`).

---

## 06 — React Lifecycle & GSAP Scoping

All GSAP animations must use `@gsap/react`'s `useGSAP()` hook with explicit `scope` refs:

```tsx
const containerRef = useRef<HTMLDivElement>(null);

useGSAP(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  gsap.from('.stagger-target', {
    y: 30,
    opacity: 0,
    stagger: 0.08,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: containerRef.current,
      start: 'top 85%',
      once: true,
    },
  });
}, { scope: containerRef });
```

This guarantees zero memory leaks, orphaned ScrollTriggers, or duplicate event listeners during Next.js client-side navigation.
