import type { Metadata } from 'next';
import { Instrument_Serif, Inter, JetBrains_Mono, Playfair_Display, Source_Serif_4, Space_Grotesk } from 'next/font/google';
import { siteConfig } from '@/data/site';
import { CustomCursor } from '@/components/ui/CustomCursor';
import './globals.css';

const fontDisplayGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const fontDisplaySerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-display-serif',
  display: 'swap',
  weight: ['400'],
  style: ['normal', 'italic'],
});

const fontPlayfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

const fontSourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
  weight: ['400', '600'],
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
    default: `Surnax Technologies | Digital Innovation & Marketing Edge`,
    template: `%s | Surnax Technologies`,
  },
  description: 'Surnax Technologies is a performance-first digital marketing agency, web engineering studio, and video production house in Jaipur, India. Founded by Anuj Bhamboo.',
  keywords: [
    'surnax tech',
    'surnax technologies',
    'website development services in jaipur',
    'custom react website development india',
    'video editing services in jaipur',
    'short form reel editing agency for brands',
    'social media marketing jaipur',
    'digital marketing agency jaipur',
    'Google Ads agency Jaipur',
    'performance marketing Jaipur',
  ],
  authors: [{ name: 'Surnax Technologies' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Surnax Technologies',
    title: 'Surnax Technologies | Digital Innovation & Marketing Edge',
    description: 'Surnax Technologies combines custom web development, video production, performance marketing, and search intelligence for brands in Jaipur and across India.',
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteConfig.websiteUrlPlaceholder}/#organization`,
      'name': 'Surnax Technologies',
      'url': siteConfig.websiteUrlPlaceholder,
      'email': siteConfig.contactEmailPlaceholder,
      'founder': {
        '@type': 'Person',
        'name': 'Anuj Bhamboo'
      },
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Jaipur',
        'addressRegion': 'Rajasthan',
        'addressCountry': 'IN',
      },
      'description': 'Digital marketing, custom web engineering, video production, and search intelligence agency based in Jaipur, Rajasthan, India.',
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${siteConfig.websiteUrlPlaceholder}/#localbusiness`,
      'name': 'Surnax Technologies',
      'url': siteConfig.websiteUrlPlaceholder,
      'email': siteConfig.contactEmailPlaceholder,
      'telephone': '+917062597062',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Jaipur',
        'addressRegion': 'Rajasthan',
        'addressCountry': 'IN',
      },
      'areaServed': ['Jaipur', 'Rajasthan', 'India'],
      'priceRange': 'Custom Quote',
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
      className={`${fontDisplayGrotesk.variable} ${fontDisplaySerif.variable} ${fontPlayfair.variable} ${fontSourceSerif.variable} ${fontBody.variable} ${fontMono.variable}`}
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
