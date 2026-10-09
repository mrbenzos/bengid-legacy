'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { HiArrowRight, HiGlobeAlt, HiShieldCheck, HiTruck } from 'react-icons/hi2';
import { FaShip } from 'react-icons/fa';

const IMPORT_CATEGORIES = [
  { name: 'Industrial & Heavy Machinery', image: '/images/categories/heavy-machinery.jpg', desc: 'Heavy equipment, generators & factory tools' },
  { name: 'Commercial Electronics & IT', image: '/images/categories/electronics-it.jpg', desc: 'Digital signage, smart office gear & enterprise appliances' },
  { name: 'Construction & Structural Supplies', image: '/images/categories/construction.jpg', desc: 'Structural steel, fittings, hardware & building raw materials' },
  { name: 'Automobile Spare Parts & Tires', image: '/images/categories/spare-parts.jpg', desc: 'OEM components, heavy-duty tires & fleet accessories' },
];

const TRUSTED_LOGOS = ['TEMA PORT FREIGHT', 'MAERSK GHANA', 'COSCO SHIPPING', 'GRIMALDI LINES', 'DHL LOGISTICS'];

export default function GeneralImportationsPage() {
  const [productCategory, setProductCategory] = useState('Industrial Machinery');
  const [targetDestination, setTargetDestination] = useState('Kumasi (Ashanti Region)');

  const whatsappMessage = encodeURIComponent(
    `Hello BENGID LEGACY GHANA LIMITED, I want to request a quote for importing ${productCategory} to ${targetDestination}.`
  );

  return (
    <div className="min-h-screen bg-white">
      {/* 1. CINEMATIC HERO SECTION WITH USER UPLOADED PORT IMAGE */}
      <section className="relative w-full min-h-[90vh] bg-white flex flex-col justify-between overflow-hidden pt-28 pb-12">
        {/* Full-bleed background image using User Uploaded Port Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/imports-hero.jpg"
            alt="BENGID LEGACY GHANA LIMITED Global Cargo Ship & Freight"
            fill
            className="object-cover object-center opacity-60 scale-105 transition-transform duration-1000"
            priority
          />
          {/* Vignette & contrast gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-white/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            
            {/* Left Column: GIANT HEADLINE + FLOATING STATS BADGE */}
            <div className="lg:col-span-8">


              <h1 className="text-5xl sm:text-7xl font-bold text-slate-900 mb-6 leading-tight max-w-3xl">
                GLOBAL IMPORTATION,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#165b33] to-[#22c55e]">
                  SIMPLIFIED.
                </span>
              </h1>

              {/* Floating Stat Badge */}
              <div className="inline-flex items-center gap-4 p-4 rounded-xl bg-white/90 border border-slate-200 backdrop-blur-md shadow-xl max-w-md">
                <div className="w-12 h-12 rounded-lg bg-[#165b33] flex items-center justify-center flex-shrink-0">
                  <FaShip className="text-white text-2xl" />
                </div>
                <div>
                  <div className="text-xl font-black text-slate-900 tracking-tight">500+ Containers Cleared</div>
                  <div className="text-xs text-slate-600 font-medium">Direct sourcing across Asia, Europe & the Americas — delivered to Kumasi.</div>
                </div>
              </div>
            </div>

            {/* Right Column: DESCRIPTION + DUAL ACTION BUTTONS */}
            <div className="lg:col-span-4 space-y-6">
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal bg-white/80 p-5 rounded-xl border border-slate-200 backdrop-blur-sm">
                We connect Ghanaian businesses with verified global manufacturers, handling ocean freight, customs clearance at Tema Port, and inland delivery to Kumasi.
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`https://wa.me/233205761698?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-4 bg-[#165b33] hover:bg-[#114b29] text-white font-bold text-sm tracking-wide uppercase rounded-full flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-emerald-900/40"
                >
                  <IoLogoWhatsapp className="text-lg" /> Ship Your Cargo <HiArrowRight />
                </a>
                <a
                  href="#quote-bar"
                  className="px-6 py-4 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 shadow-sm font-bold text-sm tracking-wide uppercase rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
                >
                  Get A Quote
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* TRUSTED CLIENTS TICKER BAR AT BOTTOM OF HERO */}
        <div className="relative z-10 border-t border-slate-200 bg-white/80 backdrop-blur-md py-4 mt-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest flex-shrink-0">
              TRUSTED FREIGHT LINES & PARTNERS
            </span>
            <div className="flex flex-wrap items-center gap-8 md:gap-12 opacity-80">
              {TRUSTED_LOGOS.map((partner, idx) => (
                <span key={idx} className="font-extrabold text-sm tracking-widest text-slate-600 hover:text-slate-900 transition-colors">
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. INSTANT SOURCING CALCULATOR */}
      <section id="quote-bar" className="py-12 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl">
            <div className="text-xs font-mono font-bold text-[#165b33] uppercase tracking-widest mb-2">INSTANT SOURCING CALCULATOR</div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6">Request Your Custom Importation Quote</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <label className="block text-xs font-semibold text-slate-500 mb-2">Category to Import</label>
                <select
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className="w-full bg-white text-slate-900 text-sm font-bold p-3 rounded-lg outline-none border border-slate-200 cursor-pointer"
                >
                  <option value="Industrial Machinery">Industrial & Heavy Machinery</option>
                  <option value="Electronics & Appliances">Commercial Electronics & IT</option>
                  <option value="Construction Materials">Construction & Building Supplies</option>
                  <option value="Automobile Spare Parts">Automobile Spare Parts & Tires</option>
                  <option value="Raw Materials">Raw Materials & Printing Consumables</option>
                </select>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <label className="block text-xs font-semibold text-slate-500 mb-2">Destination City in Ghana</label>
                <select
                  value={targetDestination}
                  onChange={(e) => setTargetDestination(e.target.value)}
                  className="w-full bg-white text-slate-900 text-sm font-bold p-3 rounded-lg outline-none border border-slate-200 cursor-pointer"
                >
                  <option value="Kumasi (Ashanti Region)">Kumasi (Ashanti Region)</option>
                  <option value="Accra (Greater Accra)">Accra (Greater Accra)</option>
                  <option value="Takoradi (Western Region)">Takoradi (Western Region)</option>
                  <option value="Tamale (Northern Region)">Tamale (Northern Region)</option>
                  <option value="Nationwide Delivery">Nationwide Delivery</option>
                </select>
              </div>

              <div className="flex items-end">
                <a
                  href={`https://wa.me/233205761698?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-4 bg-[#165b33] hover:bg-[#114b29] text-white font-bold text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <IoLogoWhatsapp className="text-xl" /> Send Sourcing Inquiry
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISUAL CATEGORIES GRID */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono font-bold text-[#165b33] uppercase tracking-widest block mb-2">PRODUCT SPECTRUM</span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase">Importation Divisions</h2>
            </div>
            <p className="text-slate-500 text-sm max-w-md mt-4 md:mt-0">
              BENGID LEGACY GHANA LIMITED sources certified factory goods with guaranteed shipping schedules.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {IMPORT_CATEGORIES.map((cat, idx) => (
              <a
                key={idx}
                href={`https://wa.me/233205761698?text=Hello%20Bengid%20Legacy%20Ghana%20Limited,%20I%20want%20to%20import%20${encodeURIComponent(cat.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative h-[420px] w-full rounded-2xl overflow-hidden cursor-pointer border border-slate-200 hover:border-emerald-500/50 transition-all duration-500 shadow-xl"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute top-6 left-6 right-6">
                  <span className="text-[10px] font-mono font-bold text-[#165b33] uppercase tracking-widest bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-slate-200">
                    CATEGORY 0{idx + 1}
                  </span>
                  <h3 className="text-2xl font-bold text-white leading-tight mt-4 group-hover:text-[#86efac] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-200 font-medium mt-2 line-clamp-3">{cat.desc}</p>
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between border-t border-white/40 pt-4">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Inquire Import</span>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:bg-[#165b33] transition-colors">
                    <HiArrowRight className="text-lg text-white" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VERIFIED LOGISTICS ROADMAP */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold text-[#165b33] uppercase tracking-widest block mb-2">END-TO-END SUPPLY CHAIN</span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase">How We Deliver To Ghana</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 relative shadow-sm">
              <div className="w-14 h-14 rounded-xl bg-[#165b33]/10 border border-emerald-500/30 text-[#165b33] flex items-center justify-center text-3xl font-black mb-6">
                <HiGlobeAlt />
              </div>
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">STAGE 01</span>
              <h3 className="text-xl font-bold text-slate-900 mb-3">1. International Factory Procurement</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Direct purchasing from verified manufacturers in China, Europe, and US with negotiated wholesale trade pricing.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200 relative shadow-sm">
              <div className="w-14 h-14 rounded-xl bg-[#165b33]/10 border border-emerald-500/30 text-[#165b33] flex items-center justify-center text-3xl font-black mb-6">
                <HiShieldCheck />
              </div>
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">STAGE 02</span>
              <h3 className="text-xl font-bold text-slate-900 mb-3">2. Pre-Shipment Inspection & Freight</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Full quality verification before container loading, marine insurance, and oceanic/air freight booking.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200 relative shadow-sm">
              <div className="w-14 h-14 rounded-xl bg-[#165b33]/10 border border-emerald-500/30 text-[#165b33] flex items-center justify-center text-3xl font-black mb-6">
                <HiTruck />
              </div>
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">STAGE 03</span>
              <h3 className="text-xl font-bold text-slate-900 mb-3">3. Customs Clearance & Inland Haulage</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Seamless clearing at Tema Port / Kotoka Airport and direct transport to your warehouse in Kumasi or Accra.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
