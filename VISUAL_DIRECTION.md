# VISUAL DIRECTION & DESIGN SYSTEM SPECIFICATION
## Brand: [PROVISIONAL BRAND NAME: VALENCE GROWTH LABS]

---

### 1. VISUAL DIRECTION AUDIT & PALETTE COMPARISON

We evaluated the primary dark visual direction against alternative premium styles to ensure the agency's visual identity feels distinct, modern, and mature.

#### Evaluated Palette Options:
- **Option 1: Obsidian + Signal Cyan & Violet** *(PRIMARY RECOMMENDED)*
  - *Base*: Deep Obsidian (`#07090E`), Surface: Slate (`#0F131C`).
  - *Accents*: Signal Cyan (`#00F0FF`) for primary CTAs & active nodes; Quantum Violet (`#7C3AED`) for subtle ambient glow.
  - *Character*: High-tech, futuristic, precision-focused.
- **Option 2: Charcoal + Electric Emerald & Platinum** *(ALTERNATIVE OPTION)*
  - *Base*: Dark Charcoal (`#0B0F17`), Accent: Emerald Green (`#10B981`).
  - *Character*: Financial growth, high-trust performance, investment studio aesthetic.

#### Recommendation:
Maintain **Option 1** as the core color tokens schema, enforcing strict 10% accent discipline so glowing accents remain sparse highlights rather than overwhelming gradients.

---

### 2. COLOR SYSTEM TOKENS SCHEMA

```css
:root {
  /* Canvas & Backgrounds */
  --bg-obsidian: #07090E;         /* Main application canvas background */
  --surface-primary: #0F131C;     /* Cards, containers, section blocks */
  --surface-secondary: #171D2A;   /* Interactive hover states, elevated surfaces */
  --border-subtle: #232C3F;       /* 1px structural grid lines and section dividers */
  --border-active: #384663;       /* Active input and focused card borders */

  /* Text & Typography Colors */
  --text-primary: #F1F5F9;         /* High-contrast headlines and active text (WCAG 15.8:1) */
  --text-secondary: #94A3B8;       /* Body copy and secondary navigation (WCAG 6.2:1) */
  --text-muted: #64748B;           /* Captions, tags, disabled indicators (WCAG 4.6:1) */

  /* Brand Accents & Signals */
  --accent-signal-cyan: #00F0FF;   /* Primary action CTAs, active indicators, metrics */
  --accent-quantum-violet: #7C3AED;/* Secondary ambient glow, data node connectors */
  --accent-signal-hover: #00C8D7;  /* Hover state for signal-cyan elements */

  /* Functional Semantic Colors */
  --semantic-success: #10B981;     /* Verified indicators, positive revenue delta */
  --semantic-warning: #F59E0B;     /* Capacity alerts, limited availability */
  --semantic-error: #EF4444;       /* Form validation errors */
}
```

---

### 3. TYPOGRAPHY SYSTEM

- **Display Font**: **Plus Jakarta Sans** (Variable, Geometric, Authoritative). Used for Display, H1, H2, and H3 headers.
- **Body & Interface Font**: **Inter** (Variable, Hyper-legible). Used for body copy, navigation, buttons, and form inputs.
- **Monospace Font**: **JetBrains Mono** (Technical, Clean). Used for metric tags, step numbers, and technical labels.

#### Typography Scale:
- `Display / Hero`: `clamp(3.0rem, 6vw, 6.0rem)` (48px – 96px), Line Height `1.05`, Weight `800`.
- `H1 Heading`: `clamp(2.25rem, 4vw, 3.75rem)` (36px – 60px), Line Height `1.1`, Weight `700`.
- `H2 Heading`: `clamp(1.75rem, 3vw, 2.75rem)` (28px – 44px), Line Height `1.15`, Weight `700`.
- `Body Large`: `1.125rem` (18px), Line Height `1.6`, Weight `400`.
- `Body Standard`: `1.0rem` (16px), Line Height `1.6`, Weight `400`.
- `Mono Tag`: `0.875rem` (14px), Line Height `1.4`, Weight `500`, Tracking `0.08em` (Uppercase).

---

### 4. REFINED 3D HERO CONCEPT SPECIFICATION

#### Visual Metaphor: **The Connected Growth Core**
- **Intuitive Metaphor**: Multiple streams of light and interconnected data nodes (representing channels, data, and creative) flowing smoothly into a central glowing upward core (representing business growth).
- **Why It Works**: Instantly understandable to any business owner or CMO without technical explanation. It visually communicates *"inputs connecting to create upward momentum."*
- **Technical Asset Breakdown**:
  - *Core Object*: Central matte-rendered geometric polyhedron or ring core with emissive inner light.
  - *Supporting Elements*: Orbiting node particles flowing along spline paths into the central core.
  - *Camera*: Wide perspective angle with subtle mouse-driven parallax tilt (`max 5deg`).
  - *Lighting*: Dual point lights (Signal Cyan `#00F0FF` + Ambient Violet `#7C3AED`) + directional key light.
  - *Mobile Safeguard*: Automatically disables particle trails on mobile viewports; falls back to static high-resolution 2D graphic asset on low-power devices.
