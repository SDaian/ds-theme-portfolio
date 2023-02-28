'use client';
import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AnalyticsWrapper } from '@/components/Analytics';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head />
      <body className='transition-colors duration-300'>
        <ThemeProvider enableSystem={true} attribute='class'>
          <Navbar />
          {children}
          <AnalyticsWrapper />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
