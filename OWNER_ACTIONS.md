# Creative World — Agency Owner Action Items (Launch Checklist)

## Business Inputs Required to Complete Production Deployment

While the website code, routes, components, design system, and SEO infrastructure are 100% complete and build-verified, the agency owner must provide the following verified business data prior to public DNS launch:

---

### 1. Contact & Business Data
- [ ] **Official Business Phone & WhatsApp Number**: Replace default contact strings in `data/site.ts` and `data/contact.ts`.
- [ ] **Official Support/Sales Email**: Verify `hello@creativeworld.in` or provide target email address.
- [ ] **Physical Office Address**: Provide street address in Jaipur for Google Business Profile sync and footer display.

### 2. Verified Client Assets & Permissions
- [ ] **Client Vector Logos**: Supply official SVG logos for Jaipur clients to replace placeholder logos in `data/clients.ts`.
- [ ] **Verified Client Case Studies**: Provide real client growth metrics (ROAS, leads generated, revenue increase) and written authorization to convert conceptual Growth Playbooks into verified client case studies.
- [ ] **Signed Client Testimonials**: Provide authentic client quotes, partner names, and titles to replace sentiment placeholders in `data/testimonials.ts`.

### 3. Production Infrastructure & Tracking
- [ ] **Form Submission Endpoint / CRM Webhook**: Connect `GrowthAuditForm.tsx` to target CRM (e.g., Zapier, HubSpot, Supabase, or custom webhook).
- [ ] **Google Analytics 4 (GA4) Measurement ID**: Supply GA4 ID (e.g., `G-XXXXXXXXXX`) for integration in `app/layout.tsx`.
- [ ] **Meta Pixel / Google Tag Manager**: Supply Pixel ID for ad attribution tracking.
- [ ] **Custom Domain DNS**: Point primary domain (`creativeworld.in`) to hosting provider (Vercel / Netlify / AWS).
