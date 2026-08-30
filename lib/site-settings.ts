import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export interface SiteSettings {
  company_name: string;
  company_tagline: string;
  company_phone: string;
  company_email: string;
  company_whatsapp: string;
  company_address: string;
  google_maps_url: string;
  working_hours: string;
  logo_url: string;
  dark_logo_url: string;
  favicon_url: string;
  social_instagram: string;
  social_linkedin: string;
  social_youtube: string;
  social_facebook: string;
  social_x: string;
  header_cta_label: string;
  header_cta_href: string;
  footer_copyright: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  company_name: 'Creativee World',
  company_tagline: 'Digital Growth & Performance Marketing Agency',
  company_phone: '+91 73571 59122',
  company_email: 'marketing.creativeworld@gmail.com',
  company_whatsapp: '+91 73571 59122',
  company_address: 'Creativee Tower, C-Scheme, Jaipur, Rajasthan 302001, India',
  google_maps_url: 'https://maps.google.com/?q=C-Scheme+Jaipur',
  working_hours: 'Mon - Sat: 9:30 AM - 7:00 PM',
  logo_url: '/logo-symbol.png',
  dark_logo_url: '/logo-symbol.png',
  favicon_url: '/apple-icon.png',
  social_instagram: 'https://instagram.com/creativeworld_in',
  social_linkedin: 'https://linkedin.com/company/creativeworld-in',
  social_youtube: 'https://youtube.com/@creativeworld_in',
  social_facebook: 'https://facebook.com/creativeworld.in',
  social_x: 'https://x.com/creativeworld_in',
  header_cta_label: 'Free Growth Audit',
  header_cta_href: '/growth-audit',
  footer_copyright: '© 2026 Creativee World Digital Agency. All rights reserved.',
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const settingsRows = await prisma.siteSetting.findMany();
    const settingsObj = { ...DEFAULT_SITE_SETTINGS };

    for (const row of settingsRows) {
      if (row.key in settingsObj) {
        (settingsObj as Record<string, string>)[row.key] = row.value;
      }
    }

    return settingsObj;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return DEFAULT_SITE_SETTINGS;
  }
}

export async function getHeaderNavigation() {
  try {
    const menu = await prisma.navigationMenu.findFirst({
      where: { location: 'header' },
      include: {
        items: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (menu && menu.items.length > 0) {
      return menu.items;
    }

    return [
      { id: '1', label: 'Home', href: '/' },
      { id: '2', label: 'Services', href: '/services' },
      { id: '3', label: 'Work', href: '/work' },
      { id: '4', label: 'Packages', href: '/packages' },
      { id: '5', label: 'About', href: '/about' },
      { id: '6', label: 'Contact', href: '/contact' },
    ];
  } catch (error) {
    console.error('Error fetching navigation:', error);
    return [
      { id: '1', label: 'Home', href: '/' },
      { id: '2', label: 'Services', href: '/services' },
      { id: '3', label: 'Work', href: '/work' },
      { id: '4', label: 'Packages', href: '/packages' },
      { id: '5', label: 'About', href: '/about' },
      { id: '6', label: 'Contact', href: '/contact' },
    ];
  }
}
