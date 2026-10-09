'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BrandLogo from '@/components/ui/BrandLogo';
import { IoLogoWhatsapp } from 'react-icons/io5';

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-slate-50 text-slate-900 border-t border-slate-200">
      {/* Catchy CTA Banner */}
      <div className="bg-[#165b33] border-t border-[#114b29]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">Ready to do business?</h2>
            <p className="text-emerald-100 text-sm sm:text-base max-w-xl">
              Whether you need to import a specialized vehicle or order wholesale printing materials, our dedicated agents are ready to assist you instantly.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <a
              href="https://wa.me/233205761698"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-slate-100 text-[#165b33] font-extrabold px-8 py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1 flex items-center gap-2"
            >
              <IoLogoWhatsapp className="text-xl text-[#25D366]" />
              WhatsApp Us Now
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-8">
          
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-1 space-y-4">
            <BrandLogo variant="dark" />
            <p className="text-slate-500 text-sm leading-relaxed mt-4 font-medium">
              BENGID LEGACY GHANA LIMITED is a registered commercial enterprise for printing materials, general importations, and automobile sales.
            </p>
          </div>

          {/* Column 2: 3 Divisions */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
              Our 3 Divisions
            </h4>
            <ul className="space-y-3 text-sm text-slate-500 font-medium">
              <li>
                <Link href="/materials" className="hover:text-[#38bdf8] transition-colors flex items-center gap-2">
                  <span className="text-[#165b33]">■</span> Printing Materials
                </Link>
              </li>
              <li>
                <Link href="/general-importations" className="hover:text-[#38bdf8] transition-colors flex items-center gap-2">
                  <span className="text-[#165b33]">■</span> General Importations
                </Link>
              </li>
              <li>
                <Link href="/automobiles" className="hover:text-[#38bdf8] transition-colors flex items-center gap-2">
                  <span className="text-[#165b33]">■</span> Automobile Sales
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-slate-500 font-medium">
              <li>
                <Link href="/about" className="hover:text-slate-900 transition-colors">About Our Company</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-slate-900 transition-colors">Contact &amp; Inquiries</Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-slate-900 transition-colors">Terms &amp; Conditions</Link>
              </li>
              <li>
                <Link href="/terms-of-service#6" className="hover:text-slate-900 transition-colors">Refund Policy</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/cookies-policy" className="hover:text-slate-900 transition-colors">Cookies Policy</Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-[#00A3E0] transition-colors mt-2 inline-block">
                  Admin Portal &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
              Contact Lines
            </h4>
            <ul className="space-y-4 text-sm text-slate-600 font-medium">
              <li className="flex items-start gap-3">
                <span className="text-[#165b33] text-lg mt-0.5">📞</span>
                <a href="tel:0205761698" className="hover:text-slate-900 transition-colors">0205761698<br/>0279390432</a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#165b33] text-lg mt-0.5">📧</span>
                <a href="mailto:info@bengidlegacy.com" className="hover:text-slate-900 transition-colors">info@bengidlegacy.com</a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#165b33] text-lg mt-0.5">📍</span>
                <span>Afua Ampomah Street, Kumasi, Ghana<br/><span className="text-xs text-slate-500">(Nationwide Shipping)</span></span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-slate-200 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-500">
          <p className="m-0">&copy; {new Date().getFullYear()} BENGID LEGACY GHANA LIMITED. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="https://facebook.com/BenGidLegacy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#38bdf8] transition-colors"
              aria-label="Visit Bengid Legacy on Facebook (opens in new tab)"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com/bengidlegacy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-colors"
              aria-label="Visit Bengid Legacy on Instagram (opens in new tab)"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com/bengidlegacy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors"
              aria-label="Visit Bengid Legacy on X / Twitter (opens in new tab)"
            >
              X (Twitter)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
