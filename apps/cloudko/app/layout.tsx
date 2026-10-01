import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { JetBrains_Mono } from 'next/font/google';
import RevealController from '@/components/RevealController';
import { intro } from '@/lib/content';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const title = intro.name;

export const metadata: Metadata = {
  metadataBase: new URL('https://cloudko.dev'),
  title,
  description: intro.thesis,
  alternates: { canonical: '/' },
  openGraph: { title, description: intro.thesis, url: '/', siteName: intro.name, type: 'website' },
  twitter: { card: 'summary_large_image', title, description: intro.thesis },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Runs before first paint so entrance animations never flash their end state. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className={`${GeistSans.variable} ${jetbrainsMono.variable} bg-ink text-fg antialiased`}>
        {children}
        <RevealController />
      </body>
    </html>
  );
}
