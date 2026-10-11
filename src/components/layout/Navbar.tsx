'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiMenu, HiX, HiHome, HiPrinter, HiBriefcase, HiPhone, HiGlobeAlt, HiInformationCircle } from 'react-icons/hi';
import { IoLogoWhatsapp } from 'react-icons/io5';
import BrandLogo from '@/components/ui/BrandLogo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  // Priority order: 1. Printing Materials, 2. Automobiles, 3. General Importations
  const navLinks = [
    { name: 'Home', href: '/', icon: HiHome },
    { name: 'Printing Materials', href: '/materials', icon: HiPrinter },
    { name: 'Automobiles', href: '/automobiles', icon: HiBriefcase },
    { name: 'General Import', href: '/general-importations', icon: HiGlobeAlt },
    { name: 'About', href: '/about', icon: HiInformationCircle },
    { name: 'Contact', href: '/contact', icon: HiPhone },
  ];

  const isActive = (href: string) => {
    if (href === '/' && pathname !== '/') return false;
    return pathname === href || (href !== '/' && pathname?.startsWith(href));
  };

  return (
    <>
      <header className="fixed top-5 left-0 w-full z-50 pointer-events-none px-4 sm:px-8 flex items-center justify-between">
        
        {/* 1. Left: Official BG Emblem Logo */}
        <div className="pointer-events-auto bg-[#0B0F19]/80 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/10 shadow-lg">
          <BrandLogo />
        </div>

        {/* 2. Center: Dark Glassmorphism Dock (Desktop) */}
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="hidden lg:flex pointer-events-auto items-center gap-1 px-3 py-2 rounded-full bg-[#111827]/85 backdrop-blur-xl border border-[#2D3748] shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  active
                    ? 'bg-[#4B6F23] text-white shadow-[0_0_18px_rgba(75,111,35,0.6)] font-bold'
                    : 'text-[#E5E7EB] hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`text-base ${active ? 'text-white' : 'text-[#9CA3AF]'}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* 3. Right: WhatsApp Direct CTA / Mobile Hamburger */}
        <div className="pointer-events-auto flex items-center gap-3">
          <a
            href="https://wa.me/233205761698"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex bg-[#4B6F23] hover:bg-[#556B2F] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-[0_4px_20px_rgba(75,111,35,0.4)] border border-[#4B6F23]/40 transition-transform hover:-translate-y-0.5 items-center gap-2"
          >
            <IoLogoWhatsapp className="text-base text-[#25D366]" />
            <span>Chat on WhatsApp</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-menu"
            className="lg:hidden inline-flex items-center justify-center p-3 rounded-2xl bg-[#111827]/90 backdrop-blur-xl border border-[#2D3748] text-white hover:bg-white/10 transition-colors shadow-xl"
          >
            {isOpen ? <HiX className="block h-6 w-6 text-white" /> : <HiMenu className="block h-6 w-6 text-white" />}
          </button>
        </div>
      </header>

      {/* Mobile Slide Drawer in Unified Dark Palette */}
      {isOpen && (
        <div
          id="mobile-nav-menu"
          role="navigation"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md lg:hidden"
        >
          <div className="absolute top-24 left-4 right-4 bg-[#111827]/95 backdrop-blur-2xl border border-[#2D3748] shadow-[0_20px_60px_rgba(0,0,0,0.8)] rounded-3xl p-5 animate-fadeIn">
            <div className="space-y-2">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-colors ${
                      active
                        ? 'bg-[#4B6F23] text-white shadow-md'
                        : 'text-[#E5E7EB] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className="text-xl" />
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-4 mt-2 border-t border-[#2D3748]">
                <a
                  href="https://wa.me/233205761698"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-white py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
                >
                  <IoLogoWhatsapp className="text-xl" />
                  <span>WhatsApp: 0205761698</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
