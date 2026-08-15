# PROJECT SETUP & ARCHITECTURE SPECIFICATION
## Premium Digital Marketing Agency Website

---

### 1. PROJECT PURPOSE & OVERVIEW

This repository is configured for building an **award-quality, high-converting digital marketing agency website**. 

Inspired by the visual density, scroll choreography, and aesthetic sophistication of world-class AI/SaaS reference experiences (such as Sapforce), this website will serve as a high-performance lead-generation engine and brand asset for a top-tier digital agency.

#### Core Principles:
- **100% Original Asset & Copy System**: Distinct branding, original editorial copy, custom 3D concepts, custom motion system, and composable architecture.
- **Conversion-Driven Art Direction**: Balances cinematic visual grandeur with clear value propositions, trust signals, case study outcomes, and interactive call-to-actions.
- **Uncompromised Technical Quality**: Fast page loads (Core Web Vitals), full WCAG accessibility compliance, strict technical SEO, and mobile-optimized responsiveness.

---

### 2. INSTALLED SKILL ECOSYSTEM

The agent environment has been provisioned with three authoritative skill libraries:

| Skill Library | Source Repository | Primary Domain | Installation Location |
| :--- | :--- | :--- | :--- |
| **Frontend Design Skills** | `github.com/flitzrrr/frontend-design-skills` | UI/UX, Typography, Visual Hierarchy, Layout | `~/.gemini/antigravity/skills/` & `./.agents/skills/` |
| **Official GSAP Skills** | `github.com/greensock/gsap-skills` | ScrollTrigger, Timelines, Motion Choreography | `./.agents/skills/` & `~/.gemini/antigravity/skills/` |
| **Antigravity Awesome Skills** | `github.com/iradoweck/antigravity-awesome-skills` | 3D (Three.js), Next.js, SEO, Security, QA, CRO | `~/.agents/skills/` & `./.agents/skills/` |

---

### 3. RELEVANT SKILL CATALOG INVENTORY

The following skills have been indexed and categorized for active use throughout development:

```
├── 🎨 DESIGN & VISUAL SYSTEM
│   ├── ui-design (Frontend Design)
│   ├── visual-direction (Frontend Design)
│   ├── web-typography (Frontend Design)
│   ├── color-theory (Frontend Design)
│   ├── component-patterns (Frontend Design)
│   └── branding-identity (Frontend Design)
│
├── 🎬 MOTION & ANIMATION
│   ├── gsap-core (GreenSock Official)
│   ├── gsap-scrolltrigger (GreenSock Official)
│   ├── gsap-timeline (GreenSock Official)
│   ├── gsap-react (GreenSock Official)
│   └── gsap-performance (GreenSock Official)
│
├── 🧊 3D & GRAPHICS
│   ├── threejs-skills (Awesome Skills)
│   ├── threejs-fundamentals (Awesome Skills)
│   ├── threejs-animation (Awesome Skills)
│   ├── threejs-shaders (Awesome Skills)
│   └── shader-programming-glsl (Awesome Skills)
│
├── 💻 FRONTEND & ARCHITECTURE
│   ├── nextjs-app-router-patterns (Awesome Skills)
│   ├── nextjs-best-practices (Awesome Skills)
│   ├── react-best-practices (Awesome Skills)
│   ├── react-patterns (Awesome Skills)
│   └── zustand-store-ts (Awesome Skills)
│
├── ⚡ PERFORMANCE & OPTIMIZATION
│   ├── web-performance-optimization (Awesome Skills)
│   ├── fixing-motion-performance (Awesome Skills)
│   └── react-component-performance (Awesome Skills)
│
├── 🔍 SEO & DISCOVERABILITY
│   ├── frontend-seo (Awesome Skills)
│   ├── seo-technical (Awesome Skills)
│   ├── seo-schema (Awesome Skills)
│   ├── seo-sitemap (Awesome Skills)
│   └── seo-meta-optimizer (Awesome Skills)
│
├── ♿ ACCESSIBILITY (a11y)
│   ├── accessibility (Frontend Design)
│   ├── fixing-accessibility (Awesome Skills)
│   └── screen-reader-testing (Awesome Skills)
│
├── 🧪 QA & TESTING
│   ├── webapp-testing (Awesome Skills)
│   ├── e2e-testing-patterns (Awesome Skills)
│   └── vitest-skill (Awesome Skills)
│
├── 🛡️ SECURITY & HARDENING
│   ├── frontend-security-coder (Awesome Skills)
│   └── security-and-hardening (Awesome Skills)
│
└── 📈 CRO & CONVERSION
    ├── landing-pages (Frontend Design)
    ├── customer-journey (Frontend Design)
    └── marketing-psychology (Awesome Skills)
```

---

### 4. SKILL CONFLICT & PRIORITY RESOLUTION

When multiple skill libraries contain overlapping guidance, the agent must adhere to the following hierarchy:

1. **GSAP & Motion Implementation**: Official GreenSock GSAP skills (`gsap-*`) take absolute precedence over general animation skills.
2. **Visual Design & Aesthetics**: `frontend-design-skills` take precedence for typography, spacing scale, visual hierarchy, color systems, and UI layout decisions.
3. **3D & WebGL Architecture**: `threejs-*` skills take precedence for Three.js scene creation, camera management, shader compilation, and WebGL rendering pipelines.
4. **Engineering, SEO & Security**: `antigravity-awesome-skills` take precedence for Next.js patterns, React state management, technical SEO, web security, and QA strategies.

---

### 5. TARGET TECHNICAL ARCHITECTURE

- **Framework**: Next.js (App Router), React, TypeScript (strict mode enabled).
- **Styling**: Modern CSS Variables + Tailwind CSS for utility orchestration, styled with custom design tokens.
- **Motion Engine**: GSAP 3 with ScrollTrigger, Flip, and CustomEase plugins.
- **Smooth Scroll**: Lenis Smooth Scroll (integrated with GSAP ScrollTrigger ticker).
- **3D Render Layer**: Three.js / React Three Fiber (R3F) + @react-three/drei for modular WebGL components.
- **Iconography**: Lucide React / Tabler Icons (vector-consistent, accessible SVG set).
- **Typography**: Variable web fonts loaded via `next/font` with zero layout shift (`font-display: swap`).
- **Form Handling**: React Hook Form + Zod schema validation.

---

### 6. DESIGN & Visual QUALITY BAR

The website MUST NEVER resemble generic AI-generated templates or uninspired corporate landing pages.

#### Strictly Prohibited Design Anti-Patterns:
- ❌ Cluttered grids of uniform rounded cards ("card soup").
- ❌ Generic, meaningless purple/blue gradient glowing blobs.
- ❌ Unrestrained glassmorphism that destroys contrast and readability.
- ❌ Default browser typography or weak font scaling hierarchies.
- ❌ Purely decorative, laggy, or distracting animations without narrative purpose.

#### Required Design Qualities:
- ✅ Editorial composition with strong contrast and generous whitespace.
- ✅ Tailored dark/futuristic palette anchored by rich neutral tones and targeted brand accents.
- ✅ Micro-interactions that respond intuitively to hover and focus states.
- ✅ Pinned section storytelling and dynamic text reveals.

---

### 7. MOTION & 3D STORYTELLING DIRECTION

#### Motion Choreography:
- Masked line-by-line text reveals on scroll.
- Staggered entrances for list items, statistics, and cards.
- Pinned horizontal scroll sections for showcase portfolios or case studies.
- Reduced motion support via `@media (prefers-reduced-motion: reduce)`.

#### 3D Growth Ecosystem Concept:
- **Narrative**: Represents digital marketing as an interconnected engine:  
  `DATA ➔ INSIGHTS ➔ STRATEGY ➔ CREATIVE ➔ CAMPAIGNS ➔ OPTIMIZATION ➔ GROWTH`
- **Performance Rules**:
  - Dynamic dynamic-import lazy loading for WebGL canvases.
  - Fallback 2D canvas/SVG or static dynamic art for low-power mobile GPUs.
  - Automatic WebGL context loss handling and memory cleanup on unmount.
  - Pixel ratio capped at `min(window.devicePixelRatio, 2)`.

---

### 8. ACCESSIBILITY & SEO COMPLIANCE

- **Accessibility**:
  - Full keyboard navigation loop support.
  - Visible, high-contrast focus rings (`:focus-visible`).
  - Screen reader attributes (`aria-expanded`, `aria-label`, `role`).
  - Strict color contrast ratios meeting WCAG 2.1 AA standards.
- **Technical SEO**:
  - Dynamic OpenGraph and Twitter card image generation.
  - Semantic HTML5 structure (`<header>`, `<main>`, `<section>`, `<footer>`, single `<h1>`).
  - JSON-LD Structured Data (`Organization`, `ProfessionalService`, `WebSite`).
  - Automated `sitemap.xml` and `robots.txt` routing.

---

### 9. FUTURE DEVELOPMENT ROADMAP

- **Phase 1: Environment & Skills Configuration** *(COMPLETE)*
- **Phase 2**: Brand Strategy & Creative Direction Specification
- **Phase 3**: UX Architecture & Sitemap Engineering
- **Phase 4**: Design System & Token Specification
- **Phase 5**: Wireframe & Layout Blueprinting
- **Phase 6**: Next.js App Core & Layout Implementation
- **Phase 7**: Interactive 3D Growth Hero Scene
- **Phase 8**: GSAP Motion & ScrollTrigger Choreography
- **Phase 9**: Interactive Service Matrix & Case Study Showcase
- **Phase 10**: High-Conversion Contact & Proposal Flow
- **Phase 11**: Technical SEO & Metadata Pipeline
- **Phase 12**: Accessibility (a11y) Verification & Polish
- **Phase 13**: Core Web Vitals & WebGL Performance Optimization
- **Phase 14**: Cross-Browser & Device QA Audit
- **Phase 15**: Mobile UX Refinement
- **Phase 16**: Production Deployment Readiness
