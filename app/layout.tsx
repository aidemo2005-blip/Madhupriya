import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display, Caveat } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-hand',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'For You \u2661',
  description: 'A small, honest thing I made for you.',
  openGraph: {
    title: 'For You \u2661',
    description: 'A small, honest thing I made for you.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${caveat.variable}`}>
      <body className="font-sans antialiased bg-[#fff5f7] text-[#4a1f2e] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
