'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MaterialCard from '@/components/ui/MaterialCard';
import CarCard from '@/components/ui/CarCard';
import { Material, Car } from '@/lib/types';
import { INITIAL_MATERIALS, INITIAL_CARS } from '@/lib/initialData';
import { HiArrowRight, HiShieldCheck, HiTruck, HiPrinter, HiGlobeAlt, HiPhone } from 'react-icons/hi2';
import { IoLogoWhatsapp } from 'react-icons/io5';

// Priority Reordering: 1st Printing Materials, 2nd Automobiles, 3rd General Importations
const THREE_DIVISIONS = [
  {
    num: '01',
    title: 'Import & Supply of Printing Materials',
    tagline: 'Wholesale & Retail Consumables',
    desc: 'Premium supply of Photo Papers, Thermal Lamination Films, Eco-Solvent Inks, Vinyl Stickers, and Printing Hardwares.',
    href: '/materials',
    btnText: 'Explore Printing Materials',
    image: '/images/materials-hero.jpg',
  },
  {
    num: '02',
    title: 'Sales of Automobiles',
    tagline: 'Verified Foreign-Used & New Cars',
    desc: 'Clean pre-owned and brand-new cars, luxury SUVs, and commercial pickups (Toyota, Mercedes, BYD, Changan, Geely) with verified documentation.',
    href: '/automobiles',
    btnText: 'View Cars for Sale',
    image: '/images/automobiles-hero.jpg',
  },
  {
    num: '03',
    title: 'General Importations',
    tagline: 'Global Sourcing & Ocean Freight',
    desc: 'Reliable importation, customs clearance at Tema Port, and inland delivery of industrial equipment, electronics, and commercial cargo.',
    href: '/general-importations',
    btnText: 'Explore Import Services',
    image: '/images/imports-hero.jpg',
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
            setMaterials(matData.slice(0, 6) as Material[]);
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
    <div className="flex flex-col min-h-screen bg-[#0B0F19] text-white">
      
      {/* 1. HERO SECTION WITH RICH FULL-BLEED PICTORIAL OVERLAY */}
      <section className="relative w-full min-h-[92vh] flex flex-col justify-center overflow-hidden pt-28 pb-20 border-b border-[#1F2937]">
        {/* Full-bleed pictorial background matching high-end Automobiles aesthetic */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/automobiles-hero.jpg"
            alt="Bengid Legacy Ghana Limited Operations"
            fill
            priority
            className="object-cover object-center scale-105 transition-transform duration-1000 opacity-55"
          />
          {/* Contrast & depth overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/80 to-[#0B0F19]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/60 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto">
          <div className="max-w-4xl">
            {/* Note: Floating green-outlined badge purged completely */}
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              Welcome to <br />
              <span className="text-[#4B6F23] drop-shadow-md">
                BENGID LEGACY GHANA LIMITED
              </span>
            </h1>

            <p className="text-base sm:text-xl text-[#F3F4F6] max-w-2xl leading-relaxed font-medium mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              A premier diversified corporate enterprise operating 3 dedicated divisions: <strong className="text-white">Import &amp; Supply of Printing Materials</strong>, <strong className="text-white">Sales of Automobiles</strong>, and <strong className="text-white">General Importations</strong>.
            </p>

            {/* High-contrast Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/materials"
                className="px-8 py-4 bg-[#4B6F23] hover:bg-[#556B2F] text-white rounded-full font-bold text-sm tracking-wide transition-all shadow-[0_6px_25px_rgba(75,111,35,0.4)] flex items-center justify-center gap-2 border border-[#4B6F23]/60 hover:-translate-y-0.5"
              >
                <HiPrinter className="text-lg" />
                <span>Printing Materials Catalogue</span>
                <HiArrowRight className="text-sm" />
              </Link>
              <Link
                href="/automobiles"
                className="px-8 py-4 bg-[#111827]/90 hover:bg-[#1F2937] text-white rounded-full font-bold text-sm tracking-wide transition-all border border-[#2D3748] hover:border-white/40 flex items-center justify-center gap-2 backdrop-blur-md hover:-translate-y-0.5"
              >
                <span>Automobile Showroom</span>
                <HiArrowRight className="text-sm" />
              </Link>
              <a
                href="https://wa.me/233205761698"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <IoLogoWhatsapp className="text-lg" />
                <span>WhatsApp: 0205761698</span>
              </a>
            </div>
          </div>
        </div>

        {/* Floating Quick Trust Highlights Bar */}
        <div className="relative z-10 mt-16 border-t border-[#1F2937] bg-[#111827]/75 backdrop-blur-xl py-5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <span className="text-2xl sm:text-3xl font-black text-white block">10,000+</span>
              <span className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">Printing Rolls Supplied</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-[#86efac] block">100%</span>
              <span className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">Verified Customs Papers</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-white block">500+</span>
              <span className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">Import Containers Cleared</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-[#86efac] block">Kumasi, GH</span>
              <span className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">Santase Tech Station</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 3 CORE DIVISIONS (REORDERED: 1. Printing Materials, 2. Automobiles, 3. General Importations) */}
      <section className="py-24 bg-[#0B0F19] relative border-b border-[#1F2937]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold text-[#4B6F23] uppercase tracking-widest block mb-2">
              COMMERCIAL PILLARS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Our 3 Specialized Divisions
            </h2>
            <p className="text-[#9CA3AF] text-sm sm:text-base mt-4 leading-relaxed font-medium">
              Delivering verified quality across commercial printing consumables, clean imported automobiles, and direct container logistics in Ghana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {THREE_DIVISIONS.map((div) => (
              <div
                key={div.num}
                className="group relative bg-[#111827] rounded-3xl overflow-hidden border border-[#2D3748] hover:border-[#4B6F23] transition-all duration-500 shadow-[0_10px_35px_rgba(0,0,0,0.4)] flex flex-col hover:-translate-y-2"
              >
                {/* Visual Image Header */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={div.image}
                    alt={div.title}
                    fill
                    className="object-cover object-center group-hover:scale-108 transition-transform duration-700 opacity-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/40 to-transparent" />
                  <span className="absolute top-4 left-4 text-xs font-mono font-black text-[#86efac] bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    DIVISION {div.num}
                  </span>
                </div>

                {/* Division Info */}
                <div className="p-7 flex flex-col flex-grow">
                  <span className="text-xs font-bold text-[#4B6F23] uppercase tracking-wider mb-2 block">
                    {div.tagline}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-3 leading-snug group-hover:text-[#86efac] transition-colors">
                    {div.title}
                  </h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed mb-6 flex-grow font-normal">
                    {div.desc}
                  </p>

                  <Link
                    href={div.href}
                    className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-full bg-[#1F2937] hover:bg-[#4B6F23] text-white text-xs font-bold uppercase tracking-wider transition-all border border-[#2D3748] hover:border-[#4B6F23]"
                  >
                    <span>{div.btnText}</span>
                    <HiArrowRight className="text-sm" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRINTING MATERIALS CATALOG SECTION */}
      <section className="py-24 bg-[#0B0F19] relative border-b border-[#1F2937]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#4B6F23] uppercase tracking-widest block mb-2">
                DIVISION 01 • PRINT CONSUMABLES
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Featured Printing Materials
              </h2>
              <p className="text-[#9CA3AF] text-sm max-w-xl mt-3 font-normal">
                Wholesale photo papers, roll laminates, eco-solvent inks, and flex banners in stock at Santase Tech Station, Kumasi.
              </p>
            </div>
            <Link
              href="/materials"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111827] hover:bg-[#1F2937] text-white font-bold text-xs uppercase tracking-wider border border-[#2D3748] hover:border-[#4B6F23] transition-all self-start md:self-auto"
            >
              <span>View All Printing Materials</span>
              <HiArrowRight className="text-sm" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {materials.slice(0, 6).map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED AUTOMOBILES SECTION (INCLUDING CHINESE MODELS) */}
      <section className="py-24 bg-[#0B0F19] relative border-b border-[#1F2937]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#4B6F23] uppercase tracking-widest block mb-2">
                DIVISION 02 • AUTOMOBILE SHOWROOM
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Vehicles Available in Kumasi
              </h2>
              <p className="text-[#9CA3AF] text-sm max-w-xl mt-3 font-normal">
                Toyota, Mercedes-Benz, and popular Chinese models (BYD, Changan, Geely, Chery, Dongfeng) with verified documentation.
              </p>
            </div>
            <Link
              href="/automobiles"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111827] hover:bg-[#1F2937] text-white font-bold text-xs uppercase tracking-wider border border-[#2D3748] hover:border-[#4B6F23] transition-all self-start md:self-auto"
            >
              <span>View Automobile Catalog</span>
              <HiArrowRight className="text-sm" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.slice(0, 6).map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. GENERAL IMPORTATIONS SPOTLIGHT */}
      <section className="py-20 bg-gradient-to-b from-[#0B0F19] via-[#111827] to-[#0B0F19] border-b border-[#1F2937]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#111827]/90 rounded-3xl p-8 sm:p-14 border border-[#2D3748] shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="lg:max-w-2xl">
              <span className="text-xs font-mono font-bold text-[#4B6F23] uppercase tracking-widest block mb-2">
                DIVISION 03 • GLOBAL CARGO
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
                Direct Global Cargo &amp; Factory Procurement
              </h2>
              <p className="text-[#E5E7EB] text-sm sm:text-base leading-relaxed mb-6 font-normal">
                Import heavy machinery, commercial electronics, spare parts, and construction supplies directly from verified international factories. We manage ocean freight, clearing at Tema Port, and inland haulage to Kumasi.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/general-importations"
                  className="px-6 py-3.5 bg-[#4B6F23] hover:bg-[#556B2F] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all shadow-md flex items-center gap-2"
                >
                  <HiGlobeAlt className="text-base" />
                  <span>Request Importation Quote</span>
                </Link>
                <a
                  href="https://wa.me/233205761698?text=Hello%20BENGID%20LEGACY,%20I%20want%20to%20inquire%20about%20cargo%20importation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all shadow-md flex items-center gap-2"
                >
                  <IoLogoWhatsapp className="text-base" />
                  <span>Direct WhatsApp Line</span>
                </a>
              </div>
            </div>

            <div className="w-full lg:w-96 relative h-64 rounded-2xl overflow-hidden border border-[#2D3748] shadow-lg">
              <Image
                src="/images/imports-hero.jpg"
                alt="Tema Port Cargo Ship Logistics"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs font-bold text-white block">Tema Port &amp; Kotoka Freight</span>
                <span className="text-[11px] text-[#9CA3AF]">Customs clearance &amp; nationwide delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
