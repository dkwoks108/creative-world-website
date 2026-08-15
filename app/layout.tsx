import type { Metadata } from 'next';
import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google';
import { siteConfig } from '@/data/site';
import { CustomCursor } from '@/components/ui/CustomCursor';
import './globals.css';

const fontDisplay = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400'],
  style: ['normal', 'italic'],
});

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: {
    default: `Ceativee World | Digital Growth & Marketing Agency in Jaipur`,
    template: `%s | Ceativee World Jaipur`,
  },
  description: 'Ceativee World is a result-driven digital growth agency in Jaipur helping local businesses generate qualified leads, improve search engine visibility, run Meta & Google Ads, and build high-converting websites.',
  keywords: [
    'digital marketing agency in Jaipur',
    'digital marketing company Jaipur',
    'SEO services Jaipur',
    'Google Ads agency Jaipur',
    'performance marketing Jaipur',
    'website development in Jaipur',
    'social media marketing Jaipur',
    'local SEO agency Jaipur',
    'digital growth agency Jaipur',
  ],
  authors: [{ name: 'Ceativee World' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Ceativee World',
    title: 'Ceativee World | Digital Growth & Marketing Agency in Jaipur',
    description: 'Result-driven digital growth agency in Jaipur helping local businesses generate qualified leads, scale revenue, and build high-converting digital platforms.',
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteConfig.websiteUrlPlaceholder}/#organization`,
      'name': 'Ceativee World',
      'url': siteConfig.websiteUrlPlaceholder,
      'email': siteConfig.contactEmailPlaceholder,
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
      'name': 'Ceativee World - Digital Growth Agency',
      'url': siteConfig.websiteUrlPlaceholder,
      'email': siteConfig.contactEmailPlaceholder,
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
      <body className="min-h-screen bg-ivory text-txt-primary antialiased selection:bg-brand-blue/20 selection:text-ink">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
