# PERFORMANCE & CORE WEB VITALS SPECIFICATION
## Project: [PROVISIONAL BRAND NAME: VALENCE GROWTH LABS]

---

### 1. TARGET PERFORMANCE BUDGET MATRIX

The website must achieve top-tier performance metrics across mobile and desktop devices.

| Metric | Target Threshold | Measurement Tool | Optimization Strategy |
| :--- | :--- | :--- | :--- |
| **LCP** (Largest Contentful Paint) | **< 2.2s** | Lighthouse / Web Vitals | SSR primary headline typography; dynamic lazy load 3D canvas after HTML render. |
| **CLS** (Cumulative Layout Shift) | **< 0.05** | Lighthouse / Web Vitals | Zero-CLS font loading (`next/font`); fixed aspect-ratio containers for images and canvas placeholders. |
| **INP** (Interaction to Next Paint) | **< 150ms** | Chrome UX Report (CrUX) | Isolated client state; lightweight Zod form validation; offload 3D animation loop to GPU. |
| **Initial JS Bundle Size** | **< 160 kB** (gzipped) | Next.js Build Analyzer | Code splitting; dynamic client imports for Three.js and heavy libraries. |
| **Lighthouse Score** | **> 90+** (Performance) | Google PageSpeed Insights | Optimized font subsets, responsive WebP/AVIF images, zero main-thread blocking scripts. |

---

### 2. ASSET & CODE OPTIMIZATION STRATEGIES

#### A. Typography & Font Optimization
- Loaded using Next.js native `next/font/google` with `display: 'swap'`.
- Only essential weights subset (`Plus Jakarta Sans`: 600, 700, 800; `Inter`: 400, 500; `JetBrains Mono`: 500).
- Zero external font requests (fonts self-hosted automatically by Next.js build).

#### B. Image & Visual Asset Optimization
- SVG icons used for all functional controls (`lucide-react`).
- Raster images loaded via `next/image` with format auto-conversion to AVIF/WebP.
- Explicit `width` and `height` attributes on all image containers to prevent layout shifts.
- Below-the-fold images set to `loading="lazy"`.

#### C. 3D WebGL Performance Safeguards
- 3D Hero scene dynamically imported with `ssr: false` via `next/dynamic`.
- Resolution scale capped at `Math.min(window.devicePixelRatio, 2.0)`.
- Automatic GPU tier detection scales particle count from 1,200 (desktop) down to 200 (mobile).
- Strict unmount disposal of Three.js geometries, materials, textures, and render targets.

---

### 3. THIRD-PARTY SCRIPT & ANALYTICS POLICY

- Analytics tags (Google Tag Manager / GA4) loaded using `next/script` with `strategy="afterInteractive"` or `strategy="lazyOnload"`.
- Zero third-party blocking scripts in document `<head>`.
- All analytics tracking calls wrapped in non-blocking `requestIdleCallback` handlers.
