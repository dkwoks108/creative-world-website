# Creative World — Full Site Architecture & Route Map

## 1. Overview & Information Architecture
Creative World is built on Next.js 14+ App Router, providing server-rendered performance, responsive layouts, local SEO optimization, and GSAP motion choreography across all public routes.

---

## 2. Complete Route Map (~26 Indexable Routes)

### Core Agency Routes
- `/` — Homepage (Master positioning, growth audit form, trust systems, methodologies)
- `/about` — Agency Mission, Vision, Principles, and Growth Philosophy (No fake founder stories)
- `/contact` — Direct channels, location, response policy, and audit intake
- `/growth-audit` — Dedicated 2-Step Growth Audit form page
- `/packages` — Commercial packages with clear INR pricing (Starter, Growth, Premium)

### Growth Services Hub (`/services`)
- `/services` — Growth Systems Overview
- `/services/performance-marketing` — Google Search Ads, Instagram Lead Ads, Ad Budget Management
- `/services/seo` — Technical SEO, Local Google Business Profile Optimization, Search Intent
- `/services/social-media-marketing` — Instagram Reels, Brand Storytelling, Social Strategy
- `/services/website-development` — Conversion Infrastructure, Mobile Speed, UX & Copywriting
- `/services/growth-strategy` — Business Diagnosis, Funnel Design, Integrated Monthly Milestones

### Target Industry Verticals (`/industries`)
- `/industries` — Jaipur Sector Strategy Overview
- `/industries/coaching` — Educational & Coaching Institutes
- `/industries/real-estate` — Real Estate & Property Developers
- `/industries/restaurants` — Cafes, Fine Dining & Hospitality
- `/industries/salons-clinics` — Salons, Dental & Aesthetic Healthcare Clinics
- `/industries/jewelry` — Gemstone & Jewelry Houses
- `/industries/clothing` — Fashion Boutiques & Apparel Brands

### Work & Growth Playbooks (`/work`)
- `/work` — Sector Growth Playbooks overview (Clearly framed as strategic execution frameworks)
- `/work/jaipur-education-lead-growth` — Education Sector Acquisition Blueprint
- `/work/jaipur-real-estate-acquisition` — Real Estate Buyer Lead Blueprint
- `/work/jaipur-retail-lifestyle-growth` — Retail & Jewelry Brand Visibility Blueprint

### Insights & Knowledge Hub (`/insights`)
- `/insights` — Article & Guide Directory
- `/insights/why-jaipur-businesses-need-a-website-2026` — Digital Storefront vs. Social Page
- `/insights/seo-vs-google-ads-jaipur-local-businesses` — Local SEO vs. Paid Search Comparison
- `/insights/3-instagram-reels-mistakes-local-brands` — Video Reel Strategy for Local Footfall

---

## 3. Navigation & UX Hierarchy
- **Header Navigation**: Services, Industries, Work, Packages, Insights, About, Contact + CTA button to `/growth-audit`.
- **Mobile Menu**: Full overlay with accessibility keyboard locking and touch-friendly navigation triggers.
- **Footer Sitemap**: Comprehensive links organized under "System Pages" and "Agency & Audit".
- **Breadcrumbs**: Integrated on every subpage with Schema.org `BreadcrumbList` structured data.
