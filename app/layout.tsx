import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google';
import { siteConfig } from '@/data/site';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { InitialLoader } from '@/components/ui/InitialLoader';
import { CreativeeAssistantBot } from '@/components/ui/CreativeeAssistantBot';
import './globals.css';

const fontDisplay = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
});

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: {
    default: `Creativee World | Digital Growth & Marketing Agency in Jaipur`,
    template: `%s | Creativee World Jaipur`,
  },
  description: 'Creativee World is a result-driven digital growth agency in Jaipur helping local businesses generate qualified leads, improve search engine visibility, run Meta & Google Ads, and build high-converting websites.',
  keywords: [
    'digital marketing agency in Jaipur',
    'digital marketing company Jaipur',
    'SEO services Jaipur',
    'SEO agency Jaipur',
    'Google Ads agency Jaipur',
    'performance marketing Jaipur',
    'website development company Jaipur',
    'social media marketing agency Jaipur',
    'local SEO agency Jaipur',
    'digital growth agency Jaipur',
  ],
  authors: [{ name: 'Creativee World' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Creativee World',
    title: 'Creativee World | Digital Growth & Marketing Agency in Jaipur',
    description: 'Creativee World combines custom web development, video production, performance marketing, and search intelligence for brands in Jaipur and across Rajasthan.',
    images: [{ url: '/brand/og-image.png', width: 1200, height: 630, alt: 'Creativee World' }],
  },
  icons: {
    icon: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteConfig.websiteUrlPlaceholder}/#organization`,
      'name': 'Creativee World',
      'url': siteConfig.websiteUrlPlaceholder,
      'email': siteConfig.contactEmailPlaceholder,
      'telephone': '+917357159122',
      'contactPoint': [
        {
          '@type': 'ContactPoint',
          'telephone': '+917357159122',
          'contactType': 'customer service',
          'email': siteConfig.contactEmailPlaceholder,
          'areaServed': 'IN',
          'availableLanguage': ['English', 'Hindi']
        }
      ],
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Jaipur',
        'addressRegion': 'Rajasthan',
        'addressCountry': 'IN',
      },
      'description': 'Result-driven digital growth agency helping Jaipur businesses generate leads, improve online search visibility, and build high-converting web systems.',
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${siteConfig.websiteUrlPlaceholder}/#localbusiness`,
      'name': 'Creativee World - Digital Growth Agency',
      'url': siteConfig.websiteUrlPlaceholder,
      'email': siteConfig.contactEmailPlaceholder,
      'telephone': '+917357159122',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Jaipur',
        'addressRegion': 'Rajasthan',
        'addressCountry': 'IN',
      },
      'areaServed': 'Jaipur',
      'priceRange': '₹7999 - ₹40000+',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="min-h-screen bg-[#07090E] text-slate-100 antialiased selection:bg-[#1769FF]/30 selection:text-white">
        <InitialLoader />
        {children}
        <CreativeeAssistantBot />
      </body>
    </html>
  );
}
