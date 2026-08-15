# Creative World — Local SEO & Technical Metadata Map

## 1. Local Search Focus
All pages target high-intent commercial keywords centered on Jaipur, Rajasthan.

---

## 2. Page Metadata & Schema Mapping

| Route | Primary Keyword Focus | Title Tag Structure | Schema.org Type |
| :--- | :--- | :--- | :--- |
| `/` | Digital marketing agency Jaipur | Creative World | Digital Growth Agency Jaipur | `Organization`, `LocalBusiness` |
| `/about` | About digital agency Jaipur | About Creative World \| Digital Growth Agency in Jaipur | `AboutPage` |
| `/services` | Growth marketing services Jaipur | Digital Marketing & Growth Services in Jaipur \| Creative World | `CollectionPage` |
| `/services/performance-marketing` | Google ads agency Jaipur, Meta ads | Performance Marketing & Lead Ads in Jaipur \| Creative World | `Service` |
| `/services/seo` | Local SEO Jaipur, Google Business Profile | SEO & Local Search Visibility in Jaipur \| Creative World | `Service` |
| `/services/social-media-marketing` | Social media agency Jaipur, Instagram reels | Social Media & Brand Growth in Jaipur \| Creative World | `Service` |
| `/services/website-development` | Website development Jaipur, web design | Business Websites & Conversion in Jaipur \| Creative World | `Service` |
| `/services/growth-strategy` | Digital marketing packages Jaipur | Growth Strategy & Monthly Packages \| Creative World | `Service` |
| `/industries/coaching` | Coaching institute digital marketing Jaipur | Coaching & Educational Institutes Marketing Jaipur \| Creative World | `Service` |
| `/industries/real-estate` | Real estate lead generation Jaipur | Real Estate Digital Marketing Jaipur \| Creative World | `Service` |
| `/insights` | Digital marketing blog Jaipur | Insights & Digital Growth Guides \| Creative World Jaipur | `Blog` |
| `/contact` | Digital agency contact Jaipur | Contact Creative World \| Digital Growth Agency Jaipur | `ContactPage` |
| `/growth-audit` | Free marketing audit Jaipur | Free Digital Growth Audit \| Creative World Jaipur | `Service` |

---

## 3. Structured Data Implementations
- **Organization & LocalBusiness**: Injected globally via `app/layout.tsx`.
- **BreadcrumbList**: Injected via `Breadcrumbs.tsx` component across all subpages.
- **Service Schema**: Injected via `app/services/[slug]/page.tsx`.
- **Article Schema**: Injected via `app/insights/[slug]/page.tsx`.
