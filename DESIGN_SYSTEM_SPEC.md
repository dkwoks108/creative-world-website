# DESIGN SYSTEM TECHNICAL SPECIFICATION
## Brand: [PROVISIONAL BRAND NAME: VALENCE GROWTH LABS]

---

### 1. CSS DESIGN TOKENS SCHEMA (`globals.css`)

The design system is codified as native CSS Custom Properties in `:root`, integrated seamlessly into Tailwind CSS utilities:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Canvas & Background Colors */
  --bg-obsidian: #07090E;         /* Main application canvas background */
  --surface-primary: #0F131C;     /* Cards, containers, section blocks */
  --surface-secondary: #171D2A;   /* Interactive hover states, elevated surfaces */
  --border-subtle: #232C3F;       /* 1px structural grid lines and section dividers */
  --border-active: #384663;       /* Active input and focused card borders */

  /* Text & Typography Colors */
  --text-primary: #F1F5F9;         /* High-contrast headlines and active text (WCAG 15.8:1) */
  --text-secondary: #94A3B8;       /* Body copy and secondary navigation (WCAG 6.2:1) */
  --text-muted: #64748B;           /* Captions, tags, disabled indicators (WCAG 4.6:1) */

  /* Brand Accents & Signals (10% Accent Rule) */
  --accent-signal-cyan: #00F0FF;   /* Primary action CTAs, active indicators, metrics */
  --accent-quantum-violet: #7C3AED;/* Secondary ambient glow, data node connectors */
  --accent-signal-hover: #00C8D7;  /* Hover state for signal-cyan elements */

  /* Functional Semantic Colors */
  --semantic-success: #10B981;     /* Verified indicators, positive revenue delta */
  --semantic-warning: #F59E0B;     /* Capacity alerts, limited availability */
  --semantic-error: #EF4444;       /* Form validation errors */

  /* Font Families */
  --font-display: 'Plus Jakarta Sans', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Border Radius Tokens */
  --radius-sm: 4px;      /* Tags, badge indicators */
  --radius-md: 8px;      /* Form inputs, standard buttons */
  --radius-lg: 16px;     /* Cards, containers, modals */
  --radius-pill: 9999px; /* Pill tags, magnetic buttons */

  /* Surface Elevation Shadows & Glows */
  --shadow-card: 0 4px 20px -2px rgba(0, 0, 0, 0.5);
  --glow-signal: 0 0 30px rgba(0, 240, 255, 0.25);
  --glow-violet: 0 0 40px rgba(124, 58, 237, 0.20);

  /* Vertical Section Spacing */
  --section-padding-desktop: 160px;
  --section-padding-tablet: 112px;
  --section-padding-mobile: 80px;
}
```

---

### 2. TYPOGRAPHY IMPLEMENTATION & FONT LOADING

Font loading uses Next.js native `next/font/google` for zero layout shift (CLS) and automatic font subsetting:

```typescript
// app/layout.tsx Specification
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google';

const fontDisplay = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['600', '700', '800'],
});

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500'],
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});
```

---

### 3. CONTAINER & GRID ARCHITECTURE

- **Grid Base**: 12-column responsive fluid grid (`gap-6` desktop, `gap-4` mobile).
- **Container Breakpoints**:
  - `container-narrow` (`max-w-[720px]`): Optimal reading line length (65-75 characters).
  - `container-standard` (`max-w-[1280px]`): Standard section layout grid.
  - `container-wide` (`max-w-[1600px]`): Full-width showcase hero and footer.

---

### 4. COMPONENT INVENTORY MATRIX

| Category | Component Name | File Target | Responsibilities & Props |
| :--- | :--- | :--- | :--- |
| **Layout** | `Container` | `components/ui/Container.tsx` | Max-width layout wrapper (`variant: 'narrow' \| 'standard' \| 'wide'`). |
| | `Section` | `components/ui/Section.tsx` | Standardized vertical padding wrapper with optional background grid lines. |
| **Typography** | `DisplayText` | `components/ui/DisplayText.tsx` | Hero & H1 display headers with Plus Jakarta Sans styling (`size: 'hero' \| 'h1' \| 'h2'`). |
| | `MonoLabel` | `components/ui/MonoLabel.tsx` | Uppercase technical tag (`size: 'sm' \| 'md'`, `color: 'cyan' \| 'muted'`). |
| **UI Controls** | `Button` | `components/ui/Button.tsx` | High-contrast action button (`variant: 'primary' \| 'secondary' \| 'outline'`, `isMagnetic: boolean`). |
| | `MetricCard` | `components/ui/MetricCard.tsx` | Count-up stat display with label and trend indicator. |
| **Content Cards**| `ServiceCard` | `components/sections/ServiceCard.tsx` | Interactive capability card with hover indicator and feature list. |
| | `CaseStudyCard` | `components/sections/CaseStudyCard.tsx` | Case study preview panel with client placeholder badge and outcome metrics. |
| **Forms** | `LeadCaptureForm` | `components/forms/LeadCaptureForm.tsx` | 2-step lead audit form with Zod schema validation and step indicator. |
| **Navigation** | `Navbar` | `components/layout/Navbar.tsx` | Sticky header with dynamic capacity indicator and mobile drawer toggle. |
