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
  title: 'BENGID LEGACY GHANA LIMITED | Printing Materials, Automobiles & General Importations',
  description: 'Official corporate platform of Bengid Legacy Ghana Limited. Import & supply of premium printing materials, verified automobiles, and global cargo logistics in Kumasi, Ghana.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} flex flex-col min-h-screen antialiased bg-[#0B0F19] text-[#FFFFFF] selection:bg-[#4B6F23] selection:text-white`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#111827',
              color: '#FFFFFF',
              border: '1px solid #2D3748',
              fontSize: '13px',
              fontWeight: '600',
            },
          }}
        />
        <CookieBanner />
      </body>
    </html>
  );
}
