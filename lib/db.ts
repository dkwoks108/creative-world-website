import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

function initializeDatabaseUrl() {
  if (process.env.VERCEL || process.env.NODE_ENV === 'production' || !process.env.DATABASE_URL) {
    const tmpDbPath = '/tmp/dev.db';

    // Copy pre-seeded database to writable /tmp directory on serverless startup if missing
    if (!fs.existsSync(tmpDbPath)) {
      const candidates = [
        path.join(process.cwd(), 'prisma', 'seed.db'),
        path.join(process.cwd(), 'prisma', 'dev.db'),
        path.join(process.cwd(), 'dev.db'),
      ];

      let copied = false;
      for (const candidate of candidates) {
        if (fs.existsSync(candidate)) {
          try {
            fs.copyFileSync(candidate, tmpDbPath);
            copied = true;
            break;
          } catch (e) {
            console.error(`Failed to copy database candidate ${candidate}:`, e);
          }
        }
      }

      if (!copied) {
        try {
          fs.writeFileSync(tmpDbPath, '');
        } catch (e) {
          console.error('Failed to create empty /tmp/dev.db:', e);
        }
      }
    }
    return `file:${tmpDbPath}`;
  }
  return process.env.DATABASE_URL || 'file:./dev.db';
}

const dbUrl = initializeDatabaseUrl();
process.env.DATABASE_URL = dbUrl;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
