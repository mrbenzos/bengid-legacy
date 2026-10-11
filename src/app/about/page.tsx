'use client';

import Link from 'next/link';
import Image from 'next/image';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { HiArrowRight, HiBuildingOffice2, HiGlobeAlt, HiPrinter, HiTruck, HiUser, HiPhone, HiMapPin } from 'react-icons/hi2';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      {/* 1. CINEMATIC HERO SECTION WITH HIGH-CONTRAST TYPOGRAPHY */}
      <section className="relative w-full min-h-[85vh] flex flex-col justify-center overflow-hidden pt-28 pb-20 border-b border-[#1F2937]">
        {/* Full-bleed pictorial background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/business-team.jpg"
            alt="BENGID LEGACY GHANA LIMITED Corporate Headquarters"
            fill
            className="object-cover opacity-40 object-center scale-105 transition-transform duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/80 to-[#0B0F19]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/60 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <span className="text-xs font-mono font-bold text-[#86efac] uppercase tracking-widest block mb-3">
            ABOUT BENGID LEGACY GHANA LIMITED
          </span>

          {/* High-contrast pure white headline with drop shadow */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight max-w-4xl tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
            Commercial trading &amp; <br />
            <span className="text-[#4B6F23] drop-shadow-md">
              global supply chain.
            </span>
          </h1>

          {/* High-contrast pure light gray subtext */}
          <p className="text-[#F3F4F6] max-w-2xl text-base sm:text-lg leading-relaxed font-normal mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            BENGID LEGACY GHANA LIMITED is a registered commercial enterprise operating in Kumasi, Ashanti Region. We specialize in the import &amp; supply of printing materials, verified automobile sales, and international cargo importations across Ghana.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-[#4B6F23] hover:bg-[#556B2F] text-white rounded-full font-bold text-sm tracking-wide transition-all shadow-[0_6px_25px_rgba(75,111,35,0.4)] flex items-center gap-2 border border-[#4B6F23]/60"
            >
              <span>Get In Touch</span>
              <HiArrowRight className="text-sm" />
            </Link>
            <a
              href="https://wa.me/233205761698"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full font-bold text-sm tracking-wide transition-all shadow-lg flex items-center gap-2"
            >
              <IoLogoWhatsapp className="text-lg" />
              <span>WhatsApp: 0205761698</span>
            </a>
          </div>
        </div>

        {/* Floating Stats Bar */}
        <div className="relative z-10 mt-16 border-t border-[#1F2937] bg-[#111827]/80 backdrop-blur-xl py-5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-3">
              <span className="text-3xl sm:text-4xl font-black text-white block">2020</span>
              <span className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mt-1 block">Established in Ghana</span>
            </div>
            <div className="p-3">
              <span className="text-3xl sm:text-4xl font-black text-[#86efac] block">100%</span>
              <span className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mt-1 block">Inspected Cargo &amp; Cars</span>
            </div>
            <div className="p-3">
              <span className="text-3xl sm:text-4xl font-black text-white block">16</span>
              <span className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mt-1 block">Regions Covered Nationwide</span>
            </div>
            <div className="p-3">
              <span className="text-3xl sm:text-4xl font-black text-[#86efac] block">24/7</span>
              <span className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mt-1 block">WhatsApp Support (0205761698)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE CORE DIVISIONS (REORDERED: 1. Printing Materials, 2. Automobiles, 3. General Importations) */}
      <section className="py-24 bg-[#0B0F19] border-b border-[#1F2937]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-mono font-bold text-[#4B6F23] uppercase tracking-widest block mb-2">COMMERCIAL STRUCTURE</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Our 3 Specialized Divisions</h2>
            <p className="text-[#9CA3AF] text-sm mt-3 font-normal">BENGID LEGACY GHANA LIMITED — Driving commercial growth across Ghana</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Division 1: Printing Materials */}
            <div className="group relative h-96 w-full rounded-3xl overflow-hidden cursor-pointer border border-[#2D3748] hover:border-[#4B6F23] transition-all duration-500 shadow-2xl flex flex-col justify-between p-7 bg-[#111827]">
              <Image
                src="/images/materials-hero.jpg"
                alt="BENGID LEGACY GHANA LIMITED Printing Supplies"
                fill
                className="object-cover object-center group-hover:scale-108 transition-transform duration-700 opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/50 to-transparent" />
              <div className="relative z-10">
                <span className="text-xs font-mono font-black text-[#86efac] bg-black/70 px-3 py-1 rounded-full border border-white/10 inline-block mb-3">
                  DIVISION 01
                </span>
                <h3 className="text-2xl font-bold text-white leading-tight mb-2 group-hover:text-[#86efac] transition-colors">
                  Printing Materials
                </h3>
                <p className="text-xs text-[#E5E7EB] font-normal leading-relaxed">
                  Wholesale photo papers, lamination films, eco-solvent inks, and commercial binding consumables with warehouse dispatch from Kumasi.
                </p>
              </div>
              <Link href="/materials" className="relative z-10 w-11 h-11 rounded-full bg-white/10 backdrop-blur flex items-center justify-center group-hover:bg-[#4B6F23] transition-colors self-end">
                <HiArrowRight className="text-lg text-white" />
              </Link>
            </div>

            {/* Division 2: Automobiles */}
            <div className="group relative h-96 w-full rounded-3xl overflow-hidden cursor-pointer border border-[#2D3748] hover:border-[#4B6F23] transition-all duration-500 shadow-2xl flex flex-col justify-between p-7 bg-[#111827]">
              <Image
                src="/images/automobiles-hero.jpg"
                alt="BENGID LEGACY GHANA LIMITED Automobile Sales"
                fill
                className="object-cover object-center group-hover:scale-108 transition-transform duration-700 opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/50 to-transparent" />
              <div className="relative z-10">
                <span className="text-xs font-mono font-black text-[#86efac] bg-black/70 px-3 py-1 rounded-full border border-white/10 inline-block mb-3">
                  DIVISION 02
                </span>
                <h3 className="text-2xl font-bold text-white leading-tight mb-2 group-hover:text-[#86efac] transition-colors">
                  Automobiles &amp; Vehicles
                </h3>
                <p className="text-xs text-[#E5E7EB] font-normal leading-relaxed">
                  Clean pre-owned and new foreign vehicles, luxury SUVs, and commercial trucks (Toyota, Mercedes, BYD, Changan) with verified papers.
                </p>
              </div>
              <Link href="/automobiles" className="relative z-10 w-11 h-11 rounded-full bg-white/10 backdrop-blur flex items-center justify-center group-hover:bg-[#4B6F23] transition-colors self-end">
                <HiArrowRight className="text-lg text-white" />
              </Link>
            </div>

            {/* Division 3: General Importations */}
            <div className="group relative h-96 w-full rounded-3xl overflow-hidden cursor-pointer border border-[#2D3748] hover:border-[#4B6F23] transition-all duration-500 shadow-2xl flex flex-col justify-between p-7 bg-[#111827]">
              <Image
                src="/images/imports-hero.jpg"
                alt="BENGID LEGACY GHANA LIMITED Global Importations"
                fill
                className="object-cover object-center group-hover:scale-108 transition-transform duration-700 opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/50 to-transparent" />
              <div className="relative z-10">
                <span className="text-xs font-mono font-black text-[#86efac] bg-black/70 px-3 py-1 rounded-full border border-white/10 inline-block mb-3">
                  DIVISION 03
                </span>
                <h3 className="text-2xl font-bold text-white leading-tight mb-2 group-hover:text-[#86efac] transition-colors">
                  General Importations
                </h3>
                <p className="text-xs text-[#E5E7EB] font-normal leading-relaxed">
                  Factory sourcing, ocean freight, customs clearance at Tema Port, and inland haulage across Ghana.
                </p>
              </div>
              <Link href="/general-importations" className="relative z-10 w-11 h-11 rounded-full bg-white/10 backdrop-blur flex items-center justify-center group-hover:bg-[#4B6F23] transition-colors self-end">
                <HiArrowRight className="text-lg text-white" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EXECUTIVE LEADERSHIP PROFILE: CO-FOUNDERS SECTION */}
      <section className="py-24 bg-[#0B0F19] border-b border-[#1F2937]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold text-[#4B6F23] uppercase tracking-widest block mb-2">
              EXECUTIVE LEADERSHIP
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Meet Our Co-Founders
            </h2>
            <p className="text-[#9CA3AF] text-sm sm:text-base mt-4 font-normal">
              Visionary leaders steering Bengid Legacy Ghana Limited with integrity, global procurement expertise, and unwavering dedication to Ghanaian commerce.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            
            {/* Co-Founder 1: Benjamin Owusu */}
            <div className="bg-[#111827] rounded-3xl p-8 border border-[#2D3748] hover:border-[#4B6F23] transition-all duration-300 shadow-xl flex flex-col items-center text-center group">
              {/* Structured image container slot with modern executive avatar placeholder */}
              <div className="relative w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-[#4B6F23] via-[#86efac] to-[#2D4414] mb-6 shadow-xl">
                <div className="w-full h-full rounded-full bg-[#0B0F19] overflow-hidden flex items-center justify-center relative border-2 border-[#111827]">
                  {/* Executive Avatar Placeholder formatted for seamless headshot upload */}
                  <div className="w-full h-full bg-gradient-to-br from-[#1F2937] to-[#111827] flex flex-col items-center justify-center text-white">
                    <span className="text-3xl font-black tracking-wider text-[#86efac]">BO</span>
                    <HiUser className="text-4xl text-[#9CA3AF]/60 mt-1" />
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-black text-white mb-1 group-hover:text-[#86efac] transition-colors">
                Benjamin Owusu
              </h3>
              <div className="px-3 py-1 rounded-full text-xs font-bold text-[#86efac] bg-[#0B0F19] border border-[#2D3748] mb-4">
                Co-Founder
              </div>
              <p className="text-[#9CA3AF] text-sm leading-relaxed font-normal">
                Oversees corporate strategy, international factory partnerships, and commercial supply chain development for Bengid Legacy Ghana Limited.
              </p>
            </div>

            {/* Co-Founder 2: Gideon Owusu */}
            <div className="bg-[#111827] rounded-3xl p-8 border border-[#2D3748] hover:border-[#4B6F23] transition-all duration-300 shadow-xl flex flex-col items-center text-center group">
              {/* Structured image container slot with modern executive avatar placeholder */}
              <div className="relative w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-[#4B6F23] via-[#86efac] to-[#2D4414] mb-6 shadow-xl">
                <div className="w-full h-full rounded-full bg-[#0B0F19] overflow-hidden flex items-center justify-center relative border-2 border-[#111827]">
                  {/* Executive Avatar Placeholder formatted for seamless headshot upload */}
                  <div className="w-full h-full bg-gradient-to-br from-[#1F2937] to-[#111827] flex flex-col items-center justify-center text-white">
                    <span className="text-3xl font-black tracking-wider text-[#86efac]">GO</span>
                    <HiUser className="text-4xl text-[#9CA3AF]/60 mt-1" />
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-black text-white mb-1 group-hover:text-[#86efac] transition-colors">
                Gideon Owusu
              </h3>
              <div className="px-3 py-1 rounded-full text-xs font-bold text-[#86efac] bg-[#0B0F19] border border-[#2D3748] mb-4">
                Co-Founder
              </div>
              <p className="text-[#9CA3AF] text-sm leading-relaxed font-normal">
                Directs vehicle import operations, customer relations, logistics execution at Tema Port, and local warehouse distribution in Kumasi.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. COMPANY HIGHLIGHTS & PHYSICAL LOCATION */}
      <section className="py-24 bg-[#0B0F19] border-b border-[#1F2937]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Collage */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 relative h-72 rounded-3xl overflow-hidden shadow-xl border border-[#2D3748]">
                <Image
                  src="/images/business-team.jpg"
                  alt="BENGID LEGACY GHANA LIMITED Team"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-[#111827] border border-[#2D3748] rounded-3xl p-6 flex flex-col justify-center">
                <HiBuildingOffice2 className="text-3xl text-[#86efac] mb-2" />
                <h4 className="text-lg font-bold text-white">Santase Tech Station</h4>
                <p className="text-xs text-[#9CA3AF] mt-1">Santase Tech Station, Kumasi, Ghana</p>
              </div>
              <div className="relative h-44 rounded-3xl overflow-hidden shadow-xl border border-[#2D3748]">
                <Image
                  src="/images/warehouse-logistics.jpg"
                  alt="BENGID LEGACY GHANA LIMITED Logistics"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Details */}
            <div>
              <span className="text-xs font-mono font-bold text-[#4B6F23] uppercase tracking-widest mb-2 block">
                INTEGRITY &amp; EXCELLENCE
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6">
                Built on transparency, speed &amp; verified delivery
              </h2>
              <p className="text-[#E5E7EB] text-sm leading-relaxed font-normal mb-6">
                BENGID LEGACY GHANA LIMITED was founded to simplify commercial sourcing for Ghanaian business owners. Whether purchasing high-grade photo papers or sourcing industrial equipment from abroad, we ensure every transaction is smooth, verified, and timely.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <HiMapPin className="text-[#86efac] text-xl mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold text-white text-sm">Physical Office &amp; Showroom</h5>
                    <p className="text-xs text-[#9CA3AF]">Santase Tech Station, Kumasi, Ashanti Region, Ghana</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <HiPhone className="text-[#86efac] text-xl mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold text-white text-sm">Official Contact Lines</h5>
                    <p className="text-xs text-[#9CA3AF]">Call: 0241749931 / 0593132725 • WhatsApp: 0205761698</p>
                  </div>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#4B6F23] hover:bg-[#556B2F] text-white px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                <span>Contact Head Office</span>
                <HiArrowRight className="text-sm" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROMOTIONAL BANNER WITH CONTRAST OVERHAUL */}
      <section className="bg-gradient-to-r from-[#1B3310] via-[#2D4414] to-[#11240A] text-white overflow-hidden relative border-t border-[#4B6F23]/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2 z-10">
            {/* Crisp pure white headline */}
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-white drop-shadow-md">
              Partner With Us For Your Business Supply Needs
            </h2>
            {/* Crisp high-contrast light text */}
            <p className="text-[#F3F4F6] text-sm sm:text-base mb-8 max-w-md leading-relaxed font-normal drop-shadow-sm">
              Join hundreds of businesses across Kumasi and Ghana who rely on BENGID LEGACY GHANA LIMITED for verified products and cargo.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full font-bold text-sm transition-all shadow-[0_6px_25px_rgba(37,211,102,0.4)]"
            >
              <span>Get In Touch Today</span>
              <HiArrowRight />
            </Link>
          </div>

          <div className="md:w-1/2 relative h-[360px] w-full z-0 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="/images/business-team.jpg"
              alt="BENGID LEGACY GHANA LIMITED Partnership"
              fill
              className="object-cover opacity-85"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
