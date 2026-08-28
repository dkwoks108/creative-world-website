# CREATIVEE WORLD — BLOG CMS & CONTENT PUBLISHING SPECIFICATION

## Overview
The Blog CMS module provides the agency owner and editorial team with a rich publishing workflow for managing growth articles, SEO metadata, and dynamic insights listings.

---

## 1. Publishing Workflow States

- **`DRAFT`**: Article is stored in the database but is NOT visible on the public `/insights` section. Can be previewed via admin draft token link.
- **`REVIEW`**: Article marked as complete and awaiting final review before publishing.
- **`SCHEDULED`**: Article set to automatically become visible when `publishAt` timestamp is reached.
- **`PUBLISHED`**: Article live on `/insights` and `/insights/[slug]`.
- **`ARCHIVED`**: Article hidden from public listings but preserved for historical reference.

---

## 2. Slug Management & 301 Redirect Safety

- When a new title is typed, the editor automatically generates a clean, URL-safe slug.
- **Redirect Safety Guarantee**: If a **published** article's slug is updated in the editor, the CMS automatically creates a record in the `Redirect` table (`301 Moved Permanently`) from `/insights/[old-slug]` to `/insights/[new-slug]`. This guarantees zero broken backlinks or 404 search errors.

---

## 3. SEO Metadata & Schema Controls

Each post includes custom input fields for:
- SEO Title Tag (with real-time 30-65 character counter)
- Meta Description (with real-time 70-155 character counter)
- Canonical URL override
- OpenGraph title, description, and preview image
- Custom Article JSON-LD schema generation for search engine rich results
- SEO Quality Checklist providing real-time feedback before publishing

---

## 4. Cache Invalidation & On-Demand Revalidation

When an article is published or updated, server actions invoke:
```typescript
revalidatePath('/insights');
revalidatePath(`/insights/${slug}`);
```
This ensures instant updates for visitors while retaining static performance.
