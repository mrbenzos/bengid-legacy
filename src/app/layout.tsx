import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';
import CookieBanner from '@/components/layout/CookieBanner';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BENGID LEGACY GHANA LTD | 3 Core Divisions: Materials, Printing & Automobiles',
  description: 'BENGID LEGACY GHANA LTD is your trusted source for premium flex banners, photo papers, inks, digital printing press, and verified imported cars in Ghana.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen antialiased bg-white text-slate-900`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <Toaster position="top-right" />
        <CookieBanner />
      </body>
    </html>
  );
}
