import type { Metadata } from 'next';
import { Fraunces, Manrope } from 'next/font/google';
import { CartDrawer } from '@/features/cart/components/CartDrawer';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['400', '500', '600'],
  display: 'swap'
});

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700'],
  display: 'swap'
});

const SITE_URL = 'https://shafranoff.ru';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Шафраноф — ресторан авторской кухни в Чите',
    template: '%s — Шафраноф, Чита'
  },
  description:
    'Ресторан «Шафраноф» в Чите: кухня на живом огне, редкие специи, продукты Забайкалья. Бронирование столов, банкеты, доставка.',
  keywords: [
    'ресторан Чита',
    'банкет Чита',
    'бронирование стола Чита',
    'кухня на углях Чита',
    'Шафраноф'
  ],
  openGraph: {
    title: 'Шафраноф — ресторан авторской кухни в Чите',
    description:
      'Кухня на живом огне, редкие специи, продукты Забайкалья. Бронирование столов и банкеты в Чите.',
    url: SITE_URL,
    siteName: 'Шафраноф',
    locale: 'ru_RU',
    type: 'website'
  },
  alternates: {
    canonical: SITE_URL
  }
};

const restaurantJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Шафраноф',
  image: `${SITE_URL}/images/hero-poster.jpg`,
  url: SITE_URL,
  telephone: '+7-914-123-45-67',
  servesCuisine: ['Восточная кухня', 'Кухня на углях', 'Авторская кухня'],
  priceRange: '₽₽₽',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. Ленина, 62',
    addressLocality: 'Чита',
    addressRegion: 'Забайкальский край',
    postalCode: '672000',
    addressCountry: 'RU'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 52.0339,
    longitude: 113.4994
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ],
    opens: '12:00',
    closes: '00:00'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${fraunces.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
      </head>
      <body>
        {children}
        <CartDrawer />
      </body>
    </html>
  );
}
