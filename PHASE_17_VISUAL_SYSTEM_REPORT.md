# PHASE 17 — VISUAL CONTENT SYSTEM REPORT

## 1. Existing Visual Audit
- **Foundational Aesthetic**: Dark editorial layout based on Deep Obsidian (`#07090E`), Slate Surfaces (`#0F131C`), crisp white text (`#F1F5F9`), and Signal Cyan (`#00F0FF`) 10% accent discipline.
- **Three.js Hero Layer**: The *Connected Growth Core* (`Hero3DCanvas.tsx`) remains the primary interactive hero experience on the homepage. Photography will NOT replace or compete with WebGL hero shaders.

---

## 2. Visual Strategy
- **Core Concept**: Imagery communicates **Business Growth, Strategy, Local Entrepreneurship, and Modern Execution**.
- **Execution Rule**: Zero generic SaaS card grids, zero fake corporate stock handshakes, zero floating cybernetic holograms, and zero AI plastic skin.

---

## 3. Photography Direction
- **Commercial Editorial Quality**: High-end advertising photography with controlled directional key lighting, deep natural shadows, and sharp architectural composition.
- **Lens & Framing**: 35mm (environment), 50mm (human portraits), 85mm (macro craftsmanship).
- **Text-Safe Zones**: Every image maintains a 40%+ dark negative space on the left or right third for typography contrast.

---

## 4. Jaipur Art Direction
- **Subtle Cultural Influence**: Pink sandstone textures, jaali geometric lattice light patterns, modern Rajasthani commercial interiors, gemstone craftsmanship, and textile design studios.
- **No Tourism Clichés**: Zero camels, elephants, tourist Fort crowds, or snake charmers.

---

## 5. Human Casting Direction
- **Believable Indian Entrepreneurs**: Authentic Indian business founders, marketers, and strategists aged 28–50.
- **Natural Expressions**: Real working postures, clean professional wardrobe, 100% realistic skin texture and pores.

---

## 6. Page Asset Requirements
- **Total Indexable Routes Audited**: 31 static routes.
- **Pages Receiving Visual Assets**: `/about`, `/services` (+ 5 detail routes), `/industries` (+ 6 detail routes), `/work` (+ 3 detail routes), `/insights` (+ 3 detail routes).

---

## 7. Asset Count
- **Total Curated Visual Assets**: **19 Assets**.
  - **P0 (Essential Brand & Industry Visuals)**: 7 Assets
  - **P1 (High-Value Service & Playbook Storytelling)**: 9 Assets
  - **P2 (Supporting Editorial Insight Covers)**: 3 Assets
  - **P3 (Decorative / Gratuitous Images)**: 0 (Excluded).

---

## 8. P0 Assets (Essential Brand & Industry Visuals)
1. `cw-about-founder-editorial-01.webp` (`/about`)
2. `cw-industry-coaching-01.webp` (`/industries/coaching`)
3. `cw-industry-realestate-01.webp` (`/industries/real-estate`)
4. `cw-industry-hospitality-01.webp` (`/industries/restaurants`)
5. `cw-industry-clinic-01.webp` (`/industries/salons-clinics`)
6. `cw-industry-jewelry-01.webp` (`/industries/jewelry`)
7. `cw-industry-apparel-01.webp` (`/industries/clothing`)

---

## 9. P1 Assets (High-Value Service & Playbook Storytelling)
1. `cw-services-hero-01.webp` (`/services`)
2. `cw-service-performance-01.webp` (`/services/performance-marketing`)
3. `cw-service-seo-01.webp` (`/services/seo`)
4. `cw-service-social-01.webp` (`/services/social-media-marketing`)
5. `cw-service-web-01.webp` (`/services/website-development`)
6. `cw-service-strategy-01.webp` (`/services/growth-strategy`)
7. `cw-work-playbook-education-01.webp` (`/work/jaipur-education-lead-growth`)
8. `cw-work-playbook-realestate-01.webp` (`/work/jaipur-real-estate-acquisition`)
9. `cw-work-playbook-retail-01.webp` (`/work/jaipur-retail-lifestyle-growth`)

---

## 10. P2 Assets (Supporting Editorial Insight Covers)
1. `cw-insight-website-2026-01.webp` (`/insights/why-jaipur-businesses-need-a-website-2026`)
2. `cw-insight-seo-vs-ads-01.webp` (`/insights/seo-vs-google-ads-jaipur-local-businesses`)
3. `cw-insight-reels-mistakes-01.webp` (`/insights/3-instagram-reels-mistakes-local-brands`)

---

## 11. Assets Rejected as Unnecessary
- **Homepage Hero**: Kept pure Three.js canvas to preserve interactive 3D identity and optimize LCP.
- **Packages Page (`/packages`)**: Pure clean UI pricing cards. Photography rejected to avoid visual clutter.
- **Contact (`/contact`) & Growth Audit (`/growth-audit`)**: Pure conversion forms to maximize submission velocity.

---

## 12. Responsive Art Direction
- Widescreen `16:9` / `3:2` for desktop with text-safe negative space.
- Mobile `4:3` / `4:5` vertical crops keeping subjects centered without obscuring text readability.

---

## 13. Image Performance Strategy
- **Format**: Next-generation WebP / AVIF.
- **Target Sizes**: Card/Cover < 150 KB, Hero Editorial < 250 KB.
- **Loader**: `next/image` with responsive `sizes` attribute and priority loading for LCP elements.

---

## 14. AI Prompt Library
- Complete art-directed prompts documented in **[AI_IMAGE_PRODUCTION_PROMPTS.md](file:///media/bumble/DATA_DISK/X-WEB/creative-world-website/AI_IMAGE_PRODUCTION_PROMPTS.md)**.

---

## 15. Public Asset Structure
```
public/images/
├── brand/
├── about/
├── services/
├── industries/
├── work/
└── insights/
```

---

## 16. Implementation Plan
1. Receive approval on `VISUAL_ASSET_MAP.md` and `AI_IMAGE_PRODUCTION_PROMPTS.md`.
2. Generate the **7 P0 Images** using the prompt library.
3. Perform Visual QA review (anatomy, lighting, color, text safety, web crop).
4. Compress and place approved `.webp` files in `public/images/`.
5. Update Next.js image components in subpage templates.

---

## 17. First Images to Generate (7 P0 Assets)
1. `cw-about-founder-editorial-01.webp`
2. `cw-industry-coaching-01.webp`
3. `cw-industry-realestate-01.webp`
4. `cw-industry-hospitality-01.webp`
5. `cw-industry-clinic-01.webp`
6. `cw-industry-jewelry-01.webp`
7. `cw-industry-apparel-01.webp`

---

## 18. Remaining Real Assets Needed From Owner
Prior to live launch, the agency owner should provide:
1. **Authentic Team & Founder Photography**: To replace conceptual editorial founder visual `cw-about-founder-editorial-01.webp`.
2. **Verified Client Vector Logos**: To populate `data/clients.ts`.
3. **Real Client Project & Workplace Photography**: Optional authentic photography for verified case studies.
