# CREATIVEE WORLD — ADMIN PANEL SETUP & DEVELOPER GUIDE

## Overview
This document guides developers on setting up and maintaining the Creativee World private administration panel locally or in production.

---

## 1. Environment Configuration (`.env`)

Create or update `.env` in the root workspace with:

```env
DATABASE_URL="file:./dev.db"
ADMIN_PANEL_PATH="/cw-control-x7k9m2"
ADMIN_EMAIL="admin@creativeworld.in"
ADMIN_PASSWORD_HASH="$2a$10$wN9aWf/w1eE7t5A9J3yHk.1qN3Z10A1b2c3d4e5f6g7h8i9j0k"
SESSION_SECRET="creativee-world-super-secret-session-key-2026-jaipur-growth"
```

---

## 2. Initializing Database & Seeding

Run the following commands to initialize the SQLite database and seed initial admin credentials and default blog articles:

```bash
# Push Prisma schema to SQLite database
npx prisma db push

# Execute database seed script
npx tsx prisma/seed.ts
```

---

## 3. Default Master Admin Credentials

- **Login URL**: `http://localhost:3000/cw-control-x7k9m2/login`
- **Email**: `admin@creativeworld.in`
- **Password**: `CreativeeAdmin2026!`

*Note: Change your master password in the database or via environment variables after initial deployment.*
