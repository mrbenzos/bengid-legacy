'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiMenu, HiX, HiHome, HiShoppingBag, HiBriefcase, HiPhone, HiGlobe, HiInformationCircle } from 'react-icons/hi';
import { IoLogoWhatsapp } from 'react-icons/io5';
import BrandLogo from '@/components/ui/BrandLogo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { name: 'Home', href: '/', icon: HiHome },
    { name: 'Materials', href: '/materials', icon: HiShoppingBag },
    { name: 'General Import', href: '/general-importations', icon: HiGlobe },
    { name: 'Automobiles', href: '/automobiles', icon: HiBriefcase },
    { name: 'About', href: '/about', icon: HiInformationCircle },
    { name: 'Contact', href: '/contact', icon: HiPhone },
  ];

  const isActive = (href: string) => {
    if (href === '/' && pathname !== '/') return false;
    return pathname === href || (href !== '/' && pathname?.startsWith(href));
  };

  return (
    <>
      <header className="fixed top-6 left-0 w-full z-50 pointer-events-none px-4 sm:px-8 flex items-center justify-between">
        
        {/* 1. Left: Logo */}
        <div className="pointer-events-auto">
          <BrandLogo />
        </div>

        {/* 2. Center: The Dark Glassmorphism Pill Dock (Desktop) */}
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="hidden lg:flex pointer-events-auto items-center gap-2 px-3 py-2 rounded-full bg-[#0a1120]/70 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  active
                    ? 'bg-[#165b33] text-white shadow-[0_0_15px_rgba(22,91,51,0.5)]'
                    : 'text-slate-300 hover:text-white hover:bg-[#0a0a0a]/10'
                }`}
              >
                <Icon className={`text-lg ${active ? 'text-white' : 'text-slate-400'}`} />
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
            className="hidden sm:flex bg-[#557a2b] hover:bg-[#44631e] text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-lg transition-transform hover:-translate-y-0.5 items-center gap-2"
          >
            <IoLogoWhatsapp className="text-lg" />
            <span>WhatsApp</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-menu"
            className="lg:hidden inline-flex items-center justify-center p-3 rounded-full bg-[#0a1120]/70 backdrop-blur-xl border border-white/10 text-white hover:bg-[#0a0a0a]/10 transition-colors shadow-lg"
          >
            {isOpen ? <HiX className="block h-6 w-6" /> : <HiMenu className="block h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Slide Drawer */}
      {isOpen && (
        <div
          id="mobile-nav-menu"
          role="navigation"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        >
          <div className="absolute top-24 left-4 right-4 bg-[#0a1120]/90 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl p-4 animate-fadeIn">
            <div className="space-y-2">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-4 rounded-2xl text-sm font-bold transition-colors ${
                      active
                        ? 'bg-[#165b33] text-white'
                        : 'text-slate-300 hover:bg-[#0a0a0a]/10 hover:text-white'
                    }`}
                  >
                    <Icon className="text-xl" />
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-4 mt-2 border-t border-white/10">
                <a
                  href="https://wa.me/233205761698"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
                >
                  <IoLogoWhatsapp className="text-xl" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
