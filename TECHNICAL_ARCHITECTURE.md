# TECHNICAL ARCHITECTURE SPECIFICATION
## Project: [PROVISIONAL BRAND NAME: VALENCE GROWTH LABS]

---

### 1. TARGET TECHNOLOGY STACK (VERIFIED INSTALLED VERSIONS)

The technical stack is selected for maximum performance, strict type safety, SEO discoverability, and award-quality interactive visual capabilities.

| Layer | Technology | Installed Version | Rationale |
| :--- | :--- | :--- | :--- |
| **Framework** | **Next.js** | `^14.2.25` | React Server Components (RSC) for fast initial HTML delivery, automatic code-splitting, native metadata SEO engine, and static/dynamic route optimization. |
| **Language** | **TypeScript** | `^5.5.4` (Strict Mode) | Complete type-safety across props, data models, state handlers, and API payloads; prevents runtime type errors. |
| **Styling** | **Tailwind CSS + CSS Variables** | `^3.4.7` + Custom Tokens | Utility-first styling efficiency combined with centralized CSS Custom Properties (`:root`) for color, spacing, typography, and theme tokens. |
| **Motion Engine** | **GSAP 3** | `gsap ^3.12.5` + `@gsap/react ^2.1.1` | Official GreenSock integration for high-performance scroll choreography, line-by-line text masking, and timeline control. |
| **Smooth Scroll** | **Lenis** | `lenis ^1.1.9` (`lenis/react`) | Official Lenis smooth scrolling synchronized with the GSAP ticker to eliminate scroll-jank between native scroll and GSAP ScrollTrigger computations. |
| **3D Render Layer** | **Three.js + R3F** | `three ^0.167.0`, `@react-three/fiber ^8.16.8`, `@react-three/drei ^9.109.2` | Declarative, componentized WebGL 3D canvas rendering for *The Connected Growth Core* hero scene; dynamic client-side lazy loading. |
| **Form Handling** | **React Hook Form + Zod** | `react-hook-form ^7.52.1`, `zod ^3.23.8`, `@hookform/resolvers ^3.9.0` | Lightweight, accessible form validation with zero unnecessary re-renders for the 2-step lead capture workflow. |
| **Icons & Fonts** | **Lucide React + `next/font`** | `lucide-react ^0.417.0`, Google Fonts | Accessible vector icon set + zero-CLS variable font loading (*Plus Jakarta Sans*, *Inter*, *JetBrains Mono*). |

---

### 2. DEPENDENCY SPECIFICATION MATRIX (`package.json`)

```json
{
  "name": "creative-world-website",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@gsap/react": "^2.1.1",
    "@hookform/resolvers": "^3.9.0",
    "@react-three/drei": "^9.109.2",
    "@react-three/fiber": "^8.16.8",
    "clsx": "^2.1.1",
    "gsap": "^3.12.5",
    "lenis": "^1.1.9",
    "lucide-react": "^0.417.0",
    "next": "^14.2.25",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.52.1",
    "tailwind-merge": "^2.4.0",
    "three": "^0.167.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/node": "^20.14.12",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@types/three": "^0.167.0",
    "autoprefixer": "^10.4.20",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.25",
    "postcss": "^8.4.40",
    "tailwindcss": "^3.4.7",
    "typescript": "^5.5.4"
  }
}
```

---

### 3. FOLDER ARCHITECTURE & DIRECTORY STRUCTURE

```
creative-world-website/
├── app/                            # Next.js App Router Pages & Layouts
│   ├── layout.tsx                  # Root Layout (Font loading, Providers, Metadata)
│   ├── page.tsx                    # Foundational Root Placeholder
│   ├── globals.css                 # Global CSS Tokens & Base Styles
│   ├── robots.ts                   # Dynamic Robots.txt Generator
│   └── sitemap.ts                  # Dynamic XML Sitemap Generator
│
├── components/                     # Component Hierarchy
│   ├── ui/                         # Atomic Design Tokens & Primitive UI Controls
│   ├── layout/                     # Application Shell Components (Navbar, Footer)
│   ├── sections/                   # 8 Major Homepage Section Modules
│   ├── 3d/                         # Isolated WebGL & Three.js Canvas Subsystem
│   ├── motion/                     # GSAP Motion Components & Lenis Provider
│   └── forms/                      # Form Components & Qualification Steps
│
├── lib/                            # Shared Utilities & Helpers
│   └── utils.ts                    # Classname merger (clsx + tailwind-merge)
│
├── data/                           # Configurable Site Brand Data & Typed Placeholders
│   ├── site.ts                     # Configurable Provisional Brand Config
│   ├── services.ts                 # Service Capability Definitions
│   ├── case-studies.ts             # Case Study Placeholders
│   ├── metrics.ts                  # Performance Metric Placeholders
│   └── testimonials.ts             # Client Testimonial Placeholders
│
├── types/                          # Global TypeScript Interfaces
│   └── index.ts                    # Component & Data Type Definitions
│
└── public/                         # Static Assets & Placeholders
    └── placeholders/               # Client Logo & Case Study Image Placeholders
```
