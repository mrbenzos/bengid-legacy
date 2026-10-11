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
      <header className="fixed top-4 sm:top-6 left-0 w-full z-50 pointer-events-none px-4 sm:px-8 flex items-center justify-between">
        
        {/* 1. Left: Official BG Emblem Logo on Frosted Glass Card */}
        <div className="pointer-events-auto bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
          <BrandLogo />
        </div>

        {/* 2. Center: The Dark Glassmorphism Pill Dock (Desktop) */}
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="hidden lg:flex pointer-events-auto items-center gap-1.5 px-3 py-2 rounded-full bg-[#0a1120]/75 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  active
                    ? 'bg-[#4B6F23] text-white shadow-[0_0_16px_rgba(75,111,35,0.55)] font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`text-base ${active ? 'text-white' : 'text-slate-400'}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* 3. Right: CTA / Mobile Toggle */}
        <div className="pointer-events-auto flex items-center gap-3">
          <a
            href="https://wa.me/233205761698"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex bg-[#4B6F23] hover:bg-[#3D5A1C] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-[0_4px_16px_rgba(75,111,35,0.35)] transition-all hover:-translate-y-0.5 items-center gap-2"
          >
            <IoLogoWhatsapp className="text-base text-white" />
            <span>WhatsApp</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-menu"
            className="lg:hidden inline-flex items-center justify-center p-3 rounded-full bg-[#0a1120]/75 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 transition-colors shadow-lg"
          >
            {isOpen ? <HiX className="block h-6 w-6 text-white" /> : <HiMenu className="block h-6 w-6 text-white" />}
          </button>
        </div>
      </header>

      {/* Mobile Slide Drawer with Dark Glassmorphism Backdrop */}
      {isOpen && (
        <div
          id="mobile-nav-menu"
          role="navigation"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        >
          <div className="absolute top-24 left-4 right-4 bg-[#0a1120]/95 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl p-4 animate-fadeIn">
            <div className="space-y-1.5">
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
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="text-lg" />
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-4 mt-2 border-t border-white/10">
                <a
                  href="https://wa.me/233205761698"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-colors"
                >
                  <IoLogoWhatsapp className="text-xl" />
                  <span>Chat on WhatsApp (0205761698)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
