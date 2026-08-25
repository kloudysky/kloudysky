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

const title = `${intro.name} · KloudySky`;

export const metadata: Metadata = {
  metadataBase: new URL('https://kloudysky.io'),
  title,
  description: intro.thesis,
  openGraph: { title, description: intro.thesis, url: '/', siteName: 'KloudySky', type: 'website' },
  twitter: { card: 'summary_large_image', title, description: intro.thesis },
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
