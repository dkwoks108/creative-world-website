# CREATIVEE WORLD — PRIVATE ADMIN PANEL ARCHITECTURE

## Overview
The **Creativee World Private Admin Panel & Mini CMS** is a production-grade content and lead management system integrated directly into the Next.js App Router workspace.

---

## 1. System Architecture Diagram

```
+-----------------------------------------------------------------------+
|                           CLIENT BROWSER                              |
+-----------------------------------------------------------------------+
        |                                                 |
  Public Routes                                    Admin Secret Route
  (/, /insights, /services, etc.)                  (/cw-control-x7k9m2/*)
        |                                                 |
        v                                                 v
+-----------------------+                         +---------------------+
| Next.js App Router    |                         | Security Middleware |
| Public Server Components                        | (Session & Headers) |
+-----------------------+                         +---------------------+
        |                                                 |
        |                                           Authenticated?
        |                                           /     \
        |                                         YES      NO
        |                                          /        \
        v                                         v          v
+-----------------------+               +-----------+  +----------------+
| DB Content Layer      |               | Admin UI  |  | Redirect to    |
| (lib/db-content.ts)   |               | Dashboard |  | /login         |
+-----------------------+               +-----------+  +----------------+
        \                                     /
         \                                   /
          v                                 v
+-----------------------------------------------------------------------+
|                    PRISMA ORM & SQLITE DATABASE                        |
|                    (prisma/dev.db or PostgreSQL)                      |
+-----------------------------------------------------------------------+
```

---

## 2. Key Technology Stack & Modules

- **ORM & Database**: Prisma 5.22 + SQLite (`prisma/dev.db`)
- **Authentication**: `bcryptjs` password hashing + `jose` JWT cookie signing
- **Session Store**: HttpOnly `cw_admin_session` cookies + `Session` DB table for revocation tracking
- **Route Isolation**: Dynamic environment variable `ADMIN_PANEL_PATH=/cw-control-x7k9m2`
- **Revalidation**: Next.js `revalidatePath('/insights')` & `revalidatePath('/insights/[slug]')`

---

## 3. Database Schema Models

1. **`AdminUser`**: Master credentials and role specifications (`ADMIN`, `EDITOR`).
2. **`Session`**: Active JWT session tokens with expiration timestamps.
3. **`Post`**: Blog articles with status (`DRAFT`, `REVIEW`, `SCHEDULED`, `PUBLISHED`, `ARCHIVED`), slug, content, author, category, and full SEO metadata fields.
4. **`PostRevision`**: Historical snapshot of post content and metadata saved on every edit.
5. **`Category` & `Tag`**: Content taxonomies for organizing articles.
6. **`Author`**: Writer profiles attached to insights.
7. **`Media`**: Uploaded image assets with mime-type, size, alt text, and public file paths.
8. **`Inquiry`**: Submitted audit and contact form requests with status tracking (`NEW`, `READ`, `CONTACTED`, `QUALIFIED`, `CLOSED`, `SPAM`).
9. **`InquiryNote`**: Private internal team notes attached to client inquiries.
10. **`Redirect`**: Automated 301 permanent redirect mappings created when published post slugs change.
11. **`AuditLog`**: Security event logs recording logins, post edits, status changes, and deletions.
