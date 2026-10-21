'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MaterialCard from '@/components/ui/MaterialCard';
import CarCard from '@/components/ui/CarCard';
import { Material, Car } from '@/lib/types';
import { INITIAL_MATERIALS, INITIAL_CARS } from '@/lib/initialData';
import { HiArrowRight, HiShieldCheck, HiTruck, HiPrinter, HiGlobeAlt, HiPhone, HiStar } from 'react-icons/hi2';
import { IoLogoWhatsapp } from 'react-icons/io5';

// Priority Reordering: 1st Printing Materials, 2nd Automobiles, 3rd General Importations
const THREE_DIVISIONS = [
  {
    num: '01',
    title: 'Import & Supply of Printing Materials',
    tagline: 'Wholesale & Retail Consumables',
    desc: 'Premium supply of Inks, Stationary, Photo Papers, Lamination Films, Hardwares, and Delivery Service across Ghana.',
    href: '/materials',
    btnText: 'Explore Printing Materials',
    image: '/images/materials-hero.jpg',
    badge: 'Consumables & Hardwares',
  },
  {
    num: '02',
    title: 'Sales of Automobiles',
    tagline: 'Verified Foreign-Used & New Cars',
    desc: 'Clean pre-owned and brand-new cars, luxury SUVs, and commercial pickups (Toyota, Hyundai, Mercedes, BYD, Changan, Geely) with verified documentation.',
    href: '/automobiles',
    btnText: 'View Cars for Sale',
    image: '/images/automobiles-hero.jpg',
    badge: 'Automobile Showroom',
  },
  {
    num: '03',
    title: 'General Importations',
    tagline: 'Global Sourcing & Ocean Freight',
    desc: 'Reliable importation, customs clearance at Tema Port, and inland delivery of industrial equipment, electronics, and commercial cargo.',
    href: '/general-importations',
    btnText: 'Explore Import Services',
    image: '/images/imports-hero.jpg',
    badge: 'Global Sourcing',
  },
];

export default function HomePage() {
  const [materials, setMaterials] = useState<Material[]>(INITIAL_MATERIALS);
  const [cars, setCars] = useState<Car[]>(INITIAL_CARS);

  useEffect(() => {
    async function loadData() {
      try {
        const matRes = await fetch('/api/materials').catch(() => null);
        if (matRes && matRes.ok) {
          const matData = await matRes.json();
          if (Array.isArray(matData) && matData.length > 0) {
            const all = matData as Material[];

            // 1. A4 sheets
            const a4Sheets = all.find(m => (m.name || '').toLowerCase().includes('a4 sheets'));

            // 2. Photo Papers - Double sided
            const photoDouble = all.find(
              m => (m.name || '').toLowerCase().includes('photo paper') &&
                   ((m.overview || '').toLowerCase().includes('double') || (m.name || '').toLowerCase().includes('double'))
            );

            // 3. Lamination films
            const lamination = all.find(
              m => (m.name || '').toLowerCase().includes('lamination pouches') ||
                   (m.name || '').toLowerCase().includes('lamination film')
            );

            // 4. Sticker papers
            const sticker = all.find(m => (m.name || '').toLowerCase().includes('sticker'));

            // 5. Photo papers - Single Sided
            const photoSingle = all.find(
              m => (m.name || '').toLowerCase().includes('photo paper') &&
                   !(m.overview || '').toLowerCase().includes('double') &&
                   !(m.name || '').toLowerCase().includes('sticker')
            );

            const requestedItems = [
              a4Sheets ? { ...a4Sheets, name: 'A4 Sheets' } : null,
              photoDouble ? { ...photoDouble, name: 'Photo Papers - Double Sided' } : null,
              lamination ? { ...lamination, name: 'Lamination Films' } : null,
              sticker ? { ...sticker, name: 'Sticker Papers' } : null,
              photoSingle ? { ...photoSingle, name: 'Photo Papers - Single Sided' } : null,
            ].filter(Boolean) as Material[];

            // Fallback in case any item wasn't matched
            if (requestedItems.length > 0) {
              setMaterials(requestedItems);
            } else {
              setMaterials(all.slice(0, 6));
            }
          }
        }

        const carRes = await fetch('/api/cars').catch(() => null);
        if (carRes && carRes.ok) {
          const carData = await carRes.json();
          if (Array.isArray(carData) && carData.length > 0) {
            setCars(carData.slice(0, 6) as Car[]);
          }
        }
      } catch (e) {
        console.error('Error loading home data:', e);
      }
    }
    loadData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB] text-[#111827]">
      
      {/* 1. HERO SECTION WITH LIGHT-OVERLAY LOGISTICS CONTAINER PICTURE BACKGROUND */}
      <section className="relative w-full pt-28 sm:pt-36 pb-20 overflow-hidden border-b border-gray-200">
        {/* Container shipping port picture background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-new.jpg"
            alt="Bengid Legacy Ghana Limited Port Operations"
            fill
            priority
            className="object-cover object-center scale-105 transition-transform duration-1000"
          />
          {/* Lighter, semi-transparent see-through gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-[#f1f3f2]/40 to-[#F9FAFB]" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Semi-Transparent Glassmorphism Hero Card with Backdrop Blur */}
          <div className="text-center max-w-4xl mx-auto mb-14 bg-white/70 backdrop-blur-md px-6 py-10 sm:p-12 rounded-[2.5rem] shadow-xl border border-white/70">
            {/* Note: Floating green-outlined badge purged completely */}
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
              Welcome to <br className="hidden sm:inline" />
              <span className="text-[#4B6F23]">
                BENGID LEGACY GHANA LIMITED
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium mb-8">
              Commercial trading &amp; global supply chain across West Africa. A premier diversified enterprise operating 3 dedicated corporate divisions: <strong>Import &amp; Supply of Printing Materials</strong>, <strong>Sales of Automobiles</strong>, and <strong>General Importations</strong>.
            </p>

            {/* High-contrast Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
              <Link
                href="/materials"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#4B6F23] hover:bg-[#3D5A1C] text-white rounded-full font-bold text-sm tracking-wide transition-all shadow-[0_4px_16px_rgba(75,111,35,0.3)] flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer"
              >
                <HiPrinter className="text-lg" />
                <span>Printing Materials Catalogue</span>
                <HiArrowRight className="text-sm" />
              </Link>
              <Link
                href="/automobiles"
                className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 rounded-full font-bold text-sm tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Automobile Showroom</span>
                <HiArrowRight className="text-sm" />
              </Link>
              <a
                href="https://wa.me/233205761698"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer"
              >
                <IoLogoWhatsapp className="text-lg" />
                <span>WhatsApp: 0205761698</span>
              </a>
            </div>
          </div>

          {/* 3 DISTINCT DIVISION TILES (REORDERED: 1. PRINTING MATERIALS, 2. AUTOMOBILES, 3. GENERAL IMPORTATIONS) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {THREE_DIVISIONS.map((div) => (
              <Link
                key={div.num}
                href={div.href}
                className="group relative bg-white hover:bg-gray-50/80 rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-gray-300 group-hover:text-[#4B6F23] transition-colors">
                      {div.num}
                    </span>
                    <span className="text-[10px] uppercase font-extrabold px-3 py-1 rounded-full text-[#4B6F23] bg-[#EAF4EC] border border-[#C8E6D0]">
                      {div.badge}
                    </span>
                  </div>

                  <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6 shadow-sm border border-gray-200">
                    <Image
                      src={div.image}
                      alt={div.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>

                  <span className="text-xs font-bold text-[#4B6F23] tracking-wider uppercase mb-1 block">
                    {div.tagline}
                  </span>
                  <h2 className="text-xl font-black text-gray-900 group-hover:text-[#4B6F23] transition-colors leading-snug mb-3">
                    {div.title}
                  </h2>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium mb-6">
                    {div.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#4B6F23]">
                  <span>{div.btnText}</span>
                  <span className="text-base group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 2. TRUST HIGHLIGHTS BAR */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black text-[#4B6F23]">100%</span>
            <span className="text-xs font-bold text-gray-800 uppercase tracking-wider mt-1">Verified Documentation</span>
            <span className="text-[11px] text-gray-500">Tema Port &amp; DVLA Certified</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black text-[#4B6F23]">24-48 Hr</span>
            <span className="text-xs font-bold text-gray-800 uppercase tracking-wider mt-1">Nationwide Delivery</span>
            <span className="text-[11px] text-gray-500">Kumasi, Accra, Takoradi &amp; Tamale</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black text-[#4B6F23]">Wholesale</span>
            <span className="text-xs font-bold text-gray-800 uppercase tracking-wider mt-1">Direct Factory Pricing</span>
            <span className="text-[11px] text-gray-500">Lowest Ghana Market Rates</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black text-[#4B6F23]">Kumasi Base</span>
            <span className="text-xs font-bold text-gray-800 uppercase tracking-wider mt-1">Santase Tech Station</span>
            <span className="text-[11px] text-gray-500">Physical Inspection Available</span>
          </div>
        </div>
      </section>

      {/* 3. DIVISION 01: PRINTING MATERIALS HIGHLIGHT (1ST) */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-[#4B6F23] uppercase tracking-widest mb-1 block">Division 01 • Printing Materials</span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">Wholesale Printing Consumables &amp; Supplies</h2>
              <p className="text-sm text-gray-600 mt-1 max-w-xl">
                Premium grade Inks, Studio Stationary, RC Photo Papers, Thermal Lamination Films, and Printing Hardwares with reliable dispatch.
              </p>
            </div>
            <Link 
              href="/materials" 
              className="px-5 py-2.5 rounded-full bg-[#EAF4EC] hover:bg-[#D4EAD7] text-[#4B6F23] font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <span>Browse All Printing Materials</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((mat) => (
              <MaterialCard key={mat.id} material={mat} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. DIVISION 02: AUTOMOBILES HIGHLIGHT (2ND) */}
      <section className="py-20 bg-[#F9FAFB] border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-[#4B6F23] uppercase tracking-widest mb-1 block">Division 02 • Automobiles</span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">Featured Vehicles &amp; Modern Fleet</h2>
              <p className="text-sm text-gray-600 mt-1 max-w-xl">
                Verified foreign-used cars and cutting-edge Chinese electric/hybrid SUVs (BYD, Changan, Geely, Chery, Dongfeng).
              </p>
            </div>
            <Link 
              href="/automobiles" 
              className="px-5 py-2.5 rounded-full bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>Explore Automobile Showroom</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. DIVISION 03: GENERAL IMPORTATIONS HIGHLIGHT (3RD) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#F4F7F2] to-white border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-sm">
            <span className="text-xs font-bold text-[#4B6F23] uppercase tracking-widest mb-1 block">Division 03 • General Importations</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
              Partner With Us For Your Business Supply Needs
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-8 max-w-2xl">
              From global supplier sourcing in China and Europe to customs brokerage at Tema Port and safe inland delivery directly to your warehouse.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded-2xl border border-gray-200">
                <span className="text-xs font-bold text-[#4B6F23] block mb-1">01. Global Sourcing</span>
                <p className="text-xs text-gray-600">Verified manufacturers in Guangzhou, Yiwu &amp; Europe.</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-200">
                <span className="text-xs font-bold text-[#4B6F23] block mb-1">02. Ocean &amp; Air Freight</span>
                <p className="text-xs text-gray-600">FCL &amp; LCL container consolidation with live tracking.</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-200">
                <span className="text-xs font-bold text-[#4B6F23] block mb-1">03. Tema Port Clearing</span>
                <p className="text-xs text-gray-600">Prompt GRA/ICUMS duty computation &amp; clearance.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <Link
                href="/general-importations"
                className="px-6 py-3 bg-[#4B6F23] hover:bg-[#3D5A1C] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
              >
                View General Import Services
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 rounded-full font-bold text-xs uppercase tracking-wider transition-all"
              >
                Request Custom Freight Quotation
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
