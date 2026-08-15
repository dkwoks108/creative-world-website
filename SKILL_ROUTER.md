# ANTIGRAVITY SKILL ROUTER & SELECTION GUIDE

This document instructs AI agents on which specialized skill to invoke based on the current implementation task for the Premium Digital Marketing Agency Website.

---

## 1. SKILL DOMAIN MAPPING

### 🎨 DESIGN & VISUAL SYSTEM
When working on UI layouts, color tokens, typography hierarchy, or visual style:
- Primary: `@flitzrrr/frontend-design-skills` (`ui-design`, `visual-direction`, `web-typography`, `color-theory`)
- Secondary: `component-patterns`, `branding-identity`
- Rule: Avoid generic AI-generated template designs. Enforce editorial composition and dark/modern aesthetic.

### 🎬 MOTION & ANIMATION (GSAP)
When implementing timelines, scroll triggers, text reveals, pinning, or smooth scroll:
- Primary: `greensock/gsap-skills` (`gsap-core`, `gsap-scrolltrigger`, `gsap-timeline`, `gsap-react`, `gsap-performance`)
- Secondary: `fixing-motion-performance`
- Rule: Never use CSS animations for complex scroll choreography where GSAP Timelines are available. Always support `prefers-reduced-motion`.

### 🧊 3D & GRAPHICS (WebGL / Three.js)
When constructing the 3D growth hero scene, WebGL canvases, particle systems, or GLSL shaders:
- Primary: `threejs-skills`, `threejs-fundamentals`, `threejs-animation`, `threejs-shaders`, `shader-programming-glsl`
- Secondary: `threejs-lighting`, `threejs-materials`, `threejs-postprocessing`
- Rule: Keep 3D performant, lazy-loaded, dynamic-imported, and mobile-degradable.

### 💻 FRONTEND & ARCHITECTURE
When building Next.js App Router components, layout wrappers, React hooks, or state management:
- Primary: `nextjs-app-router-patterns`, `nextjs-best-practices`, `react-best-practices`, `react-patterns`
- Secondary: `zustand-store-ts`, `zod-validation-expert`
- Rule: Strict TypeScript types, modular zero-monolith component architecture.

### ⚡ PERFORMANCE OPTIMIZATION
When tuning Core Web Vitals, dynamic imports, bundle size, font loading, or WebGL frame rates:
- Primary: `web-performance-optimization`, `react-component-performance`, `gsap-performance`
- Rule: All 3D assets and heavy components must be dynamic-imported with client boundaries.

### 🔍 TECHNICAL SEO & STRUCTURED DATA
When configuring metadata, JSON-LD schemas, sitemaps, canonical tags, or semantic headings:
- Primary: `frontend-seo`, `seo-technical`, `seo-schema`, `seo-sitemap`, `seo-meta-optimizer`
- Rule: Single `<h1>` per page, complete OpenGraph meta attributes, clean canonical URLs.

### ♿ ACCESSIBILITY (a11y)
When adding ARIA roles, managing focus states, ensuring contrast ratios, or testing keyboard flow:
- Primary: `accessibility` (Frontend Design Skills), `fixing-accessibility`, `screen-reader-testing`
- Rule: Visible `:focus-visible` styling, full keyboard navigation compliance.

### 🧪 TESTING & QUALITY ASSURANCE
When writing tests, verifying responsive layout behavior, or debugging component renders:
- Primary: `webapp-testing`, `e2e-testing-patterns`, `vitest-skill`
- Rule: Test all form submission flows, interactive states, and mobile viewports.

### 🛡️ SECURITY & INPUT HARDENING
When validating input fields, securing contact forms, auditing npm dependencies, or sanitizing data:
- Primary: `frontend-security-coder`, `security-and-hardening`
- Rule: Sanitize all user inputs, prevent XSS and header injection vulnerabilities.

### 📈 CONVERSION RATE OPTIMIZATION (CRO)
When designing CTA buttons, lead generation forms, trust signals, case study layouts, or value props:
- Primary: `landing-pages` (Frontend Design Skills), `customer-journey`, `marketing-psychology`
- Rule: Clear visual hierarchy prioritizing conversion actions (e.g., "Book Strategy Call", "Request Proposal").

---

## 2. CONFLICT RESOLUTION MATRIX

| Domain Conflict | Authoritative Skill Source | Rationale |
| :--- | :--- | :--- |
| GSAP ScrollTrigger vs Generic CSS/Framer | `greensock/gsap-skills` | Official GreenSock implementation guidelines ensure best performance & ticker synchronization. |
| Visual Design Principles vs Generic Code | `frontend-design-skills` | Guarantees award-quality visual hierarchy and modern typography over default AI output. |
| 3D Scene Performance vs Visual Detail | `threejs-*` skills | Provides accurate buffer geometry disposal, draw call reduction, and dynamic pixel ratio scaling. |
