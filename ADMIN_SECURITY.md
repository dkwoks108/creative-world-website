# CEATIVEe WORLD — PRIVATE ADMIN PANEL SECURITY AUDIT & SAFEGUARDS

## Overview
This document specifies the multi-layer security protections implemented for the Ceativee World private administration panel.

---

## 1. Security Safeguards

### A. Obscured Administration Path
- The admin panel is NOT accessible under `/admin` or `/login`.
- It uses an environment-configurable secret path defined via `ADMIN_PANEL_PATH` (default: `/cw-control-x7k9m2`).

### B. Search Engine Exclusion & Anti-Indexing
- Every response from the admin route tree automatically attaches:
  ```http
  X-Robots-Tag: noindex, nofollow, noarchive
  Cache-Control: no-store, max-age=0, must-revalidate
  ```
- All admin routes are explicitly excluded from `sitemap.ts` and `robots.txt`.

### C. Server-Side Session Management
- Authentication relies on signed JWT session tokens stored in HttpOnly, `SameSite=Lax` cookies named `cw_admin_session`.
- Browser JavaScript cannot access or manipulate session cookies (`httpOnly: true`).
- Sessions are validated on the server on every request via `middleware.ts` and database session token tracking.

### D. Password Hashing & Rate-Limiting Protection
- Passwords are salted and hashed using `bcryptjs` with cost factor 10.
- Login attempts are rate-limited to a maximum of 5 failed attempts per 15 minutes per IP/email.
- Generic error messages ("Invalid email or password.") prevent user enumeration attacks.

### E. Media Upload Restrictions
- File uploads are validated server-side for allowed MIME types (`image/jpeg`, `image/png`, `image/webp`, `image/avif`, `image/svg+xml`).
- Maximum file size limit enforced at 5MB per upload.
- Uploaded filenames are sanitized to prevent directory traversal attacks.

### F. Security Audit Logging
- Critical security events (login, post creation, status update, media deletion, inquiry updates) are written to the immutable `AuditLog` table.
