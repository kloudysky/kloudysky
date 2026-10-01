import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { JetBrains_Mono } from 'next/font/google';
import { studio } from '@/lib/content';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const description = 'A software development studio in Austin, Texas.';

export const metadata: Metadata = {
  metadataBase: new URL('https://kloudysky.io'),
  title: studio.name,
  description,
  alternates: { canonical: '/' },
  openGraph: { title: studio.name, description, url: '/', siteName: studio.name, type: 'website' },
  twitter: { card: 'summary', title: studio.name, description },
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
        {/* Runs before first paint so the still mark never flashes ahead of the canvas. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className={`${GeistSans.variable} ${jetbrainsMono.variable} bg-black font-sans text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
