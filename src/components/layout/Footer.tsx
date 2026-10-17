'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BrandLogo from '@/components/ui/BrandLogo';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaXTwitter, FaTiktok } from 'react-icons/fa6';
import { HiPhone, HiEnvelope, HiMapPin } from 'react-icons/hi2';

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-[#0B0F19] text-[#E5E7EB] border-t border-[#1F2937]">
      {/* Catchy CTA Banner */}
      <div className="bg-gradient-to-r from-[#1B3310] via-[#2D4414] to-[#11240A] border-b border-[#4B6F23]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">
              Ready to do business with Bengid Legacy?
            </h2>
            <p className="text-emerald-100/90 text-sm sm:text-base max-w-xl font-medium">
              Wholesale printing consumables, certified imported vehicles, and global freight forwarding — our team is ready to serve you.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <a
              href="https://wa.me/233205761698"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold px-8 py-4 rounded-full shadow-[0_8px_25px_rgba(37,211,102,0.35)] transition-transform hover:-translate-y-1 flex items-center gap-2.5 text-sm sm:text-base"
            >
              <IoLogoWhatsapp className="text-xl" />
              WhatsApp: 0205761698
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-8">
          
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-1 space-y-4">
            <BrandLogo />
            <p className="text-[#9CA3AF] text-sm leading-relaxed mt-4 font-normal">
              Established in 2010, BENGID LEGACY GHANA LIMITED is a registered commercial enterprise specializing in the import &amp; supply of printing materials, verified automobiles, and global cargo importations.
            </p>
          </div>

          {/* Column 2: 3 Divisions (Standardized Order) */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4 border-b border-[#2D3748] pb-2">
              Our 3 Divisions
            </h4>
            <ul className="space-y-3 text-sm text-[#9CA3AF] font-medium">
              <li>
                <Link href="/materials" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-[#4B6F23] text-xs">■</span> Printing Materials
                </Link>
              </li>
              <li>
                <Link href="/automobiles" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-[#4B6F23] text-xs">■</span> Automobile Sales
                </Link>
              </li>
              <li>
                <Link href="/general-importations" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-[#4B6F23] text-xs">■</span> General Importations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4 border-b border-[#2D3748] pb-2">
              Company &amp; Legal
            </h4>
            <ul className="space-y-3 text-sm text-[#9CA3AF] font-medium">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Our Company</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact &amp; Inquiries</Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/cookies-policy" className="hover:text-white transition-colors">Cookies Policy</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info & Official Direct Call Lines */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4 border-b border-[#2D3748] pb-2">
              Contact Lines
            </h4>
            <ul className="space-y-4 text-sm text-[#9CA3AF] font-medium">
              <li className="flex items-start gap-3">
                <HiPhone className="text-[#4B6F23] text-lg mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">Direct Call Lines:</div>
                  <a href="tel:0241749931" className="hover:text-white transition-colors block text-white font-semibold">0241749931</a>
                  <a href="tel:0593132725" className="hover:text-white transition-colors block text-white font-semibold">0593132725</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <IoLogoWhatsapp className="text-[#25D366] text-lg mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">WhatsApp Orders:</div>
                  <a href="https://wa.me/233205761698" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] text-[#E5E7EB] transition-colors font-semibold">0205761698</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <HiEnvelope className="text-[#4B6F23] text-lg mt-0.5 flex-shrink-0" />
                <a href="mailto:info@bengidlegacyghltd.com" className="hover:text-white transition-colors text-white break-all">
                  info@bengidlegacyghltd.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <HiMapPin className="text-[#4B6F23] text-lg mt-0.5 flex-shrink-0" />
                <span>Santase Tech Station, Kumasi, Ghana<br/><span className="text-xs text-[#9CA3AF]">(Nationwide Delivery Across Ghana)</span></span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Verified Social Media Icons (Including TikTok) */}
        <div className="border-t border-[#1F2937] pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-[#9CA3AF]">
          <p className="m-0 text-center md:text-left">
            &copy; {new Date().getFullYear()} BENGID LEGACY GHANA LIMITED. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://facebook.com/BenGidLegacy"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#111827] border border-[#2D3748] flex items-center justify-center hover:bg-[#4B6F23] hover:text-white transition-colors text-white"
              aria-label="Facebook"
            >
              <FaFacebookF className="text-sm" />
            </a>
            <a
              href="https://instagram.com/bengidlegacy"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#111827] border border-[#2D3748] flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors text-white"
              aria-label="Instagram"
            >
              <FaInstagram className="text-sm" />
            </a>
            <a
              href="https://twitter.com/bengidlegacy"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#111827] border border-[#2D3748] flex items-center justify-center hover:bg-white hover:text-black transition-colors text-white"
              aria-label="X (Twitter)"
            >
              <FaXTwitter className="text-sm" />
            </a>
            <a
              href="https://www.tiktok.com/@legacyautomobile"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#111827] border border-[#2D3748] flex items-center justify-center hover:bg-black hover:text-[#00F2FE] hover:border-[#00F2FE] transition-colors text-white"
              aria-label="TikTok (@legacyautomobile)"
            >
              <FaTiktok className="text-sm" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
