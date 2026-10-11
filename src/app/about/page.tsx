'use client';

import Link from 'next/link';
import Image from 'next/image';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { HiArrowRight, HiBuildingOffice2, HiGlobeAlt, HiPrinter, HiTruck, HiUser, HiPhone, HiMapPin, HiCheckBadge } from 'react-icons/hi2';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827]">
      {/* 1. HERO SECTION WITH LIGHT OVERLAY */}
      <section className="relative w-full pt-28 sm:pt-36 pb-20 overflow-hidden border-b border-gray-200">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/business-team.jpg"
            alt="BENGID LEGACY GHANA LIMITED Corporate Headquarters"
            fill
            className="object-cover object-center scale-105 transition-transform duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-[#f1f3f2]/40 to-[#F9FAFB]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="max-w-4xl bg-white/70 backdrop-blur-md p-8 sm:p-12 rounded-[2.5rem] shadow-xl border border-white/70 mb-10">
            <span className="text-xs font-mono font-bold text-[#4B6F23] uppercase tracking-widest block mb-2">
              ABOUT BENGID LEGACY GHANA LIMITED
            </span>

            <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
              Commercial Trading &amp;<br />
              <span className="text-[#4B6F23]">
                Global Supply Chain.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-700 max-w-2xl leading-relaxed font-normal mb-8">
              BENGID LEGACY GHANA LIMITED is a registered commercial enterprise operating in Kumasi, Ashanti Region. We specialize in the import &amp; supply of printing materials, verified automobile sales, and international cargo importations across Ghana.
            </p>

            <div className="flex flex-wrap gap-3.5">
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-[#4B6F23] hover:bg-[#3D5A1C] text-white rounded-full font-bold text-sm tracking-wide transition-all shadow-[0_4px_16px_rgba(75,111,35,0.3)] flex items-center gap-2 hover:-translate-y-0.5"
              >
                <span>Get In Touch</span>
                <HiArrowRight className="text-sm" />
              </Link>
              <a
                href="https://wa.me/233205761698"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full font-bold text-sm tracking-wide transition-all shadow-md flex items-center gap-2 hover:-translate-y-0.5"
              >
                <IoLogoWhatsapp className="text-lg" />
                <span>WhatsApp: 0205761698</span>
              </a>
            </div>
          </div>
        </div>

        {/* Floating Stats Bar */}
        <div className="relative z-10 border-t border-gray-200 bg-white/80 backdrop-blur-md py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-2">
              <span className="text-3xl sm:text-4xl font-black text-gray-900 block">2020</span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1 block">Established in Ghana</span>
            </div>
            <div className="p-2">
              <span className="text-3xl sm:text-4xl font-black text-[#4B6F23] block">100%</span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1 block">Inspected Cargo &amp; Cars</span>
            </div>
            <div className="p-2">
              <span className="text-3xl sm:text-4xl font-black text-gray-900 block">16</span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1 block">Regions Covered Nationwide</span>
            </div>
            <div className="p-2">
              <span className="text-3xl sm:text-4xl font-black text-[#4B6F23] block">24/7</span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1 block">WhatsApp Support (0205761698)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE CORE DIVISIONS (REORDERED: 1. Printing Materials, 2. Automobiles, 3. General Importations) */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono font-bold text-[#4B6F23] uppercase tracking-widest block mb-1">COMMERCIAL STRUCTURE</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">Our 3 Specialized Divisions</h2>
            <p className="text-gray-600 text-sm mt-2 font-normal">BENGID LEGACY GHANA LIMITED — Driving commercial growth across Ghana</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Division 1: Printing Materials */}
            <div className="group relative h-96 w-full rounded-3xl overflow-hidden cursor-pointer border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-7 bg-white hover:-translate-y-1">
              <Image
                src="/images/materials-hero.jpg"
                alt="BENGID LEGACY GHANA LIMITED Printing Materials"
                fill
                className="object-cover object-center group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
              <div className="relative z-10">
                <span className="text-xs font-mono font-black text-white bg-[#4B6F23] px-3 py-1 rounded-full inline-block mb-3">
                  DIVISION 01
                </span>
                <h3 className="text-2xl font-bold text-white leading-tight mb-2 group-hover:text-[#A3E635] transition-colors">
                  Printing Materials
                </h3>
                <p className="text-xs text-gray-200 font-normal leading-relaxed">
                  Direct factory imports of photo papers, thermal lamination rolls, inks, flex banners, and print shop media.
                </p>
              </div>
              <Link href="/materials" className="relative z-10 w-11 h-11 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center group-hover:bg-[#4B6F23] transition-colors self-end">
                <HiArrowRight className="text-lg text-white" />
              </Link>
            </div>

            {/* Division 2: Automobiles */}
            <div className="group relative h-96 w-full rounded-3xl overflow-hidden cursor-pointer border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-7 bg-white hover:-translate-y-1">
              <Image
                src="/images/automobiles-hero.jpg"
                alt="BENGID LEGACY GHANA LIMITED Automobile Sales"
                fill
                className="object-cover object-center group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
              <div className="relative z-10">
                <span className="text-xs font-mono font-black text-white bg-[#4B6F23] px-3 py-1 rounded-full inline-block mb-3">
                  DIVISION 02
                </span>
                <h3 className="text-2xl font-bold text-white leading-tight mb-2 group-hover:text-[#A3E635] transition-colors">
                  Automobiles
                </h3>
                <p className="text-xs text-gray-200 font-normal leading-relaxed">
                  Clean foreign-used sedans, executive SUVs, pickup trucks, and modern Chinese electric/hybrid vehicles.
                </p>
              </div>
              <Link href="/automobiles" className="relative z-10 w-11 h-11 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center group-hover:bg-[#4B6F23] transition-colors self-end">
                <HiArrowRight className="text-lg text-white" />
              </Link>
            </div>

            {/* Division 3: General Importations */}
            <div className="group relative h-96 w-full rounded-3xl overflow-hidden cursor-pointer border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-7 bg-white hover:-translate-y-1">
              <Image
                src="/images/imports-hero.jpg"
                alt="BENGID LEGACY GHANA LIMITED Global Importations"
                fill
                className="object-cover object-center group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
              <div className="relative z-10">
                <span className="text-xs font-mono font-black text-white bg-[#4B6F23] px-3 py-1 rounded-full inline-block mb-3">
                  DIVISION 03
                </span>
                <h3 className="text-2xl font-bold text-white leading-tight mb-2 group-hover:text-[#A3E635] transition-colors">
                  General Importations
                </h3>
                <p className="text-xs text-gray-200 font-normal leading-relaxed">
                  Factory sourcing, ocean freight, customs clearance at Tema Port, and inland haulage across Ghana.
                </p>
              </div>
              <Link href="/general-importations" className="relative z-10 w-11 h-11 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center group-hover:bg-[#4B6F23] transition-colors self-end">
                <HiArrowRight className="text-lg text-white" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EXECUTIVE LEADERSHIP PROFILE: CO-FOUNDERS SECTION (Requirement 5) */}
      <section className="py-20 bg-[#F9FAFB] border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold text-[#4B6F23] uppercase tracking-widest block mb-1">
              EXECUTIVE LEADERSHIP
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Meet Our Co-Founders
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2 font-normal">
              Visionary leaders steering Bengid Legacy Ghana Limited with integrity, global procurement expertise, and unwavering dedication to Ghanaian commerce.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Co-Founder 1: Benjamin Owusu */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1">
              {/* Official Executive Headshot */}
              <div className="relative w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-[#4B6F23] via-[#86efac] to-[#3D5A1C] mb-6 shadow-md">
                <div className="w-full h-full rounded-full overflow-hidden relative border-2 border-white shadow-inner">
                  <Image
                    src="/images/benjamin-owusu.png"
                    alt="Benjamin Owusu — Co-Founder"
                    fill
                    className="object-cover object-top scale-105"
                    priority
                  />
                </div>
              </div>

              <h3 className="text-2xl font-black text-gray-900 mb-1 group-hover:text-[#4B6F23] transition-colors">
                Benjamin Owusu
              </h3>
              <div className="px-3 py-1 rounded-full text-xs font-bold text-[#4B6F23] bg-[#EAF4EC] border border-[#C8E6D0] mb-4">
                Co-Founder
              </div>
              <p className="text-gray-600 text-sm leading-relaxed font-normal">
                Oversees corporate strategy, international factory partnerships, and commercial supply chain development for Bengid Legacy Ghana Limited.
              </p>
            </div>

            {/* Co-Founder 2: Gideon Owusu */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1">
              {/* Structured image container slot formatted to accept official executive headshot uploads */}
              <div className="relative w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-[#4B6F23] via-[#86efac] to-[#3D5A1C] mb-6 shadow-md">
                <div className="w-full h-full rounded-full bg-gray-50 overflow-hidden flex items-center justify-center relative border-2 border-white">
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center text-gray-700">
                    <span className="text-3xl font-black tracking-wider text-[#4B6F23]">GO</span>
                    <HiUser className="text-4xl text-gray-400 mt-1" />
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-black text-gray-900 mb-1 group-hover:text-[#4B6F23] transition-colors">
                Gideon Owusu
              </h3>
              <div className="px-3 py-1 rounded-full text-xs font-bold text-[#4B6F23] bg-[#EAF4EC] border border-[#C8E6D0] mb-4">
                Co-Founder
              </div>
              <p className="text-gray-600 text-sm leading-relaxed font-normal">
                Directs operations, fleet logistics, customer service, and distribution centers across the Ashanti Region and nationwide Ghana.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PHYSICAL PRESENCE & MISSION */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-mono font-bold text-[#4B6F23] uppercase tracking-widest block mb-1">
                KUMASI OPERATIONS HEADQUARTERS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-6">
                Based at Santase Tech Station, Serving All 16 Regions
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-6 font-normal">
                Our operations depot in Santase Tech Station, Kumasi serves as our strategic distribution hub. Clients can physically inspect automobile fleets, verify printing material quality, and collect wholesale consignments directly.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-xs font-semibold text-gray-800">
                  <HiCheckBadge className="text-lg text-[#4B6F23]" />
                  <span>Licensed and registered with the Registrar General’s Department of Ghana</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-gray-800">
                  <HiCheckBadge className="text-lg text-[#4B6F23]" />
                  <span>Full customs clearance compliance via GRA ICUMS at Tema Port</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-gray-800">
                  <HiCheckBadge className="text-lg text-[#4B6F23]" />
                  <span>Transparent GHS pricing with zero hidden surcharges</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:0241749931"
                  className="px-6 py-3 rounded-full bg-[#EAF4EC] hover:bg-[#D4EAD7] text-[#4B6F23] font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  <HiPhone />
                  <span>Direct Line: 0241749931</span>
                </a>
                <a
                  href="tel:0593132725"
                  className="px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  <HiPhone />
                  <span>Direct Line: 0593132725</span>
                </a>
              </div>
            </div>

            <div className="relative h-96 w-full rounded-3xl overflow-hidden border border-gray-200 shadow-md">
              <Image
                src="/images/warehouse-logistics.jpg"
                alt="Santase Tech Station Warehouse Operations"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-mono font-bold text-white bg-black/60 px-3 py-1 rounded-full border border-white/20 backdrop-blur-xs">
                  SANTASE TECH STATION • KUMASI
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
