import type { Metadata } from 'next';

import { Geist, Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AnalyticsWrapper } from '@/components/Analytics';

export const metadata: Metadata = {
  metadataBase: new URL('https://daian-scuarissi.vercel.app'),
  title: 'Daian Scuarissi - Software Engineer',
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
        <ThemeProvider
          disableTransitionOnChange
          enableSystem
          attribute='class'
          defaultTheme='light'
        >
          <Navbar />
          {children}
          <AnalyticsWrapper />
          <Footer />
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
