# CREATIVEE WORLD — ADMIN SECURITY HARDENING SPECIFICATION

## Overview
This document specifies the enterprise security architecture for the Creativee World private CMS admin panel.

---

## 1. Authentication Model
- **Password Storage**: Hashed using `bcrypt` (10-12 salt rounds).
- **Brute Force Protection**: IP & account level sliding rate-limiting (max 5 failed attempts within 15 minutes).
- **Enumeration Prevention**: Generic error feedback `"Invalid email or password."` for all failed login attempts.
- **Open Redirect Protection**: Callback URL parameter `callbackUrl` validated server-side to prevent malicious off-site redirects.

---

## 2. Session Architecture & Dual Expiration Policy
- **Cryptographic Tokens**: JWT signed via `jose` library with HS256 algorithm and a server-side secret (`SESSION_SECRET`).
- **Cookie Security**: `cw_admin_session` cookie configured with:
  - `HttpOnly: true` (Tokens invisible to client-side JS)
  - `Secure: true` in production (HTTPS mandatory)
  - `SameSite: Lax` (Blocks cross-site request forgery)
  - `Path: /`
- **Dual Expiration Window**:
  - **Idle Timeout**: 30 minutes of inactivity. Active requests update `lastActivityAt` and extend idle expiration.
  - **Absolute Max Cap**: 12 hours hard limit from login creation time. No activity can extend a session past 12 hours.

---

## 3. Server-Side Session Revocation & Multi-Device Control
- **Database Persistence**: Session records stored in SQLite database (`Session` model).
- **Revocation Triggers**:
  1. Manual Logout: Instantly sets `revokedAt` timestamp and expires session cookie.
  2. Password Change: Instantly revokes all active sessions across all devices for the user.
  3. "Log Out Other Devices": Revokes every active session token except the current device.
  4. Invalidation Check: `middleware.ts` and `getAdminSession()` verify `revokedAt === null` on every protected request.

---

## 4. Cache-Control & Browser Back Button Defense
- Protected admin responses set:
  - `Cache-Control: private, no-store, max-age=0, must-revalidate`
  - `Pragma: no-cache`
  - `Expires: 0`
  - `X-Robots-Tag: noindex, nofollow, noarchive`
- Prevents browsers and CDNs from storing rendered admin pages in local cache memory.
