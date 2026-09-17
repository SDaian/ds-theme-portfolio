import type { Metadata } from 'next';

import { Geist, Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AnalyticsWrapper } from '@/components/Analytics';
import { SITE_NAME, SITE_URL } from '@/lib/site-metadata';

// The only metadataBase in the app. Routes set their own canonical via
// pageMetadata(); putting the base here keeps every URL on one convention.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: 'Personal portfolio and blog of Daian Scuarissi, a passionate software engineer.',
};

const geist = Geist({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-geist',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-inter',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang='en'>
      <body
        className={`${geist.variable} ${inter.variable} antialiased transition-colors duration-300`}
      >
        {/* First focusable element on every page, off-screen until focused. */}
        <a
          className='bg-brand sr-only z-50 rounded-md px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4'
          href='#main-content'
        >
          Skip to content
        </a>
        <ThemeProvider
          disableTransitionOnChange
          enableSystem
          attribute='class'
          defaultTheme='light'
        >
          <Navbar />
          <main id='main-content'>{children}</main>
          <AnalyticsWrapper />
          <Footer />
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
