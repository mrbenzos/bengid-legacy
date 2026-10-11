'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { HiArrowRight, HiGlobeAlt, HiShieldCheck, HiTruck } from 'react-icons/hi2';
import { FaShip } from 'react-icons/fa';

export const IMPORT_DIVISIONS = [
  { 
    id: 'heavy-machinery',
    name: 'Industrial & Heavy Machinery', 
    image: '/images/categories/heavy-machinery.jpg', 
    desc: 'Heavy mining equipment, industrial generators, manufacturing machinery, CNC tooling, and factory machinery sourced directly from certified global manufacturers.',
    turnaround: '30 - 45 Days (Ocean Freight)',
    route: 'Direct Factory → Tema Port → Kumasi Inland Depot',
    features: ['Pre-Shipment Mechanical Inspection', 'Full Customs Tariff Valuation', 'Marine Cargo Insurance Cover', 'Heavy Haulage to Kumasi'],
  },
  { 
    id: 'electronics-it',
    name: 'Commercial Electronics & IT', 
    image: '/images/categories/electronics-it.jpg', 
    desc: 'Digital LED advertising billboards, commercial server gear, enterprise surveillance networks, printing plotters, and office IT infrastructure.',
    turnaround: '7 - 14 Days (Air) / 35 Days (Sea)',
    route: 'Global Electronics Hub → Kotoka / Tema → Nationwide Delivery',
    features: ['Original Factory Warranties', 'Safe Fragile Container Packing', 'Expedited Customs Clearance', 'Direct On-Site Unloading'],
  },
  { 
    id: 'construction',
    name: 'Construction & Structural Supplies', 
    image: '/images/categories/construction.jpg', 
    desc: 'Reinforced structural steel, architectural glass, plumbing fittings, heavy-duty tile adhesive, and wholesale hardware commodities.',
    turnaround: '25 - 40 Days (Ocean Freight)',
    route: 'Steel Mills / Factory Yards → Tema Port → Site Haulage',
    features: ['Mill Test Certification (MTC)', 'Bulk Volume Discount Negotiation', 'Port Demurrage Minimization', 'Flatbed Truck Logistics'],
  },
  { 
    id: 'spare-parts',
    name: 'Automobile Spare Parts & Tires', 
    image: '/images/categories/spare-parts.jpg', 
    desc: 'Original OEM mechanical parts, heavy-duty truck tires, commercial fleet consumables, engine rebuild kits, and suspension units.',
    turnaround: '20 - 35 Days (Ocean Freight)',
    route: 'Component Manufacturing Hubs → Tema Port → Santase Warehouse',
    features: ['Exact VIN Match Verification', 'OEM Certificate of Conformity', 'Batch Container Stacking', 'Direct Distribution in Kumasi'],
  },
];

const TRUSTED_LOGOS = ['TEMA PORT FREIGHT', 'MAERSK GHANA', 'COSCO SHIPPING', 'GRIMALDI LINES', 'DHL GLOBAL FORWARDING'];

export default function GeneralImportationsPage() {
  const [productCategory, setProductCategory] = useState('Industrial & Heavy Machinery');
  const [targetDestination, setTargetDestination] = useState('Kumasi (Ashanti Region)');

  // Exclusively hardcoded official WhatsApp line: 0205761698 (+233205761698)
  const whatsappMessage = encodeURIComponent(
    `Hello BENGID LEGACY GHANA LIMITED,\n\nI want to request a quotation for importing the following:\n- Category: ${productCategory}\n- Delivery Destination: ${targetDestination}\n\nPlease advise on factory sourcing, ocean freight, and Tema Port customs clearance rates.`
  );
  const whatsappUrl = `https://wa.me/233205761698?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      {/* 1. CINEMATIC HERO SECTION (Preserving exact layout and typography structure in dark palette) */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-between overflow-hidden pt-28 pb-12 border-b border-[#1F2937]">
        {/* Full-bleed background port image with dark overlays */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/imports-hero.jpg"
            alt="BENGID LEGACY GHANA LIMITED Global Cargo Ship & Freight"
            fill
            className="object-cover object-center opacity-40 scale-105 transition-transform duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/80 to-[#0B0F19]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/60 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            
            {/* Left Column: Headline + Floating Stat Badge */}
            <div className="lg:col-span-8">
              <span className="text-xs font-mono font-bold text-[#86efac] uppercase tracking-widest block mb-3">
                DIVISION 03 • INTERNATIONAL PROCUREMENT &amp; LOGISTICS
              </span>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                GLOBAL IMPORTATION,<br />
                <span className="text-[#4B6F23] drop-shadow-md">
                  SIMPLIFIED.
                </span>
              </h1>

              {/* Floating Stat Badge */}
              <div className="inline-flex items-center gap-4 p-4 rounded-2xl bg-[#111827]/90 border border-[#2D3748] backdrop-blur-md shadow-2xl max-w-md">
                <div className="w-12 h-12 rounded-xl bg-[#4B6F23] flex items-center justify-center flex-shrink-0">
                  <FaShip className="text-white text-2xl" />
                </div>
                <div>
                  <div className="text-lg font-black text-white tracking-tight">500+ Containers Cleared</div>
                  <div className="text-xs text-[#9CA3AF] font-medium">Direct factory sourcing across Asia, Europe &amp; the Americas — delivered to Kumasi.</div>
                </div>
              </div>
            </div>

            {/* Right Column: Description + Dual Action Buttons */}
            <div className="lg:col-span-4 space-y-6">
              <p className="text-[#E5E7EB] text-sm sm:text-base leading-relaxed font-normal bg-[#111827]/80 p-6 rounded-2xl border border-[#2D3748] backdrop-blur-md">
                We connect Ghanaian commercial enterprises with verified global manufacturers, managing factory procurement, ocean freight, customs clearance at Tema Port, and inland haulage to Kumasi.
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-2 transition-all shadow-[0_6px_25px_rgba(37,211,102,0.35)]"
                >
                  <IoLogoWhatsapp className="text-lg" /> 
                  <span>Ship Your Cargo</span>
                  <HiArrowRight />
                </a>
                <a
                  href="#quote-bar"
                  className="px-6 py-4 bg-[#1F2937] hover:bg-[#2D3748] text-white border border-[#2D3748] shadow-sm font-bold text-xs uppercase tracking-wider rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
                >
                  Get A Quote
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* TRUSTED CLIENTS TICKER BAR AT BOTTOM OF HERO */}
        <div className="relative z-10 border-t border-[#1F2937] bg-[#111827]/80 backdrop-blur-md py-4 mt-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs font-mono font-bold text-[#9CA3AF] uppercase tracking-widest flex-shrink-0">
              TRUSTED FREIGHT LINES &amp; LOGISTICS PARTNERS
            </span>
            <div className="flex flex-wrap items-center gap-6 md:gap-10 opacity-80">
              {TRUSTED_LOGOS.map((partner, idx) => (
                <span key={idx} className="font-extrabold text-xs sm:text-sm tracking-widest text-[#E5E7EB] hover:text-white transition-colors">
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. INSTANT SOURCING CALCULATOR / ESTIMATION SECTION */}
      <section id="quote-bar" className="py-14 bg-[#0B0F19] border-b border-[#1F2937]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#111827] rounded-3xl p-6 sm:p-10 border border-[#2D3748] shadow-2xl">
            <div className="text-xs font-mono font-bold text-[#86efac] uppercase tracking-widest mb-2">
              INSTANT CARGO SOURCING INQUIRY
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-6">
              Request Your Custom Importation Quote
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0B0F19] p-4 rounded-2xl border border-[#2D3748]">
                <label className="block text-xs font-semibold text-[#9CA3AF] mb-2">Category to Import</label>
                <select
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className="w-full bg-[#111827] text-white text-sm font-bold p-3 rounded-xl outline-none border border-[#2D3748] cursor-pointer"
                >
                  <option value="Industrial & Heavy Machinery">Industrial &amp; Heavy Machinery</option>
                  <option value="Commercial Electronics & IT">Commercial Electronics &amp; IT</option>
                  <option value="Construction & Structural Supplies">Construction &amp; Building Supplies</option>
                  <option value="Automobile Spare Parts & Tires">Automobile Spare Parts &amp; Tires</option>
                  <option value="Raw Materials & Printing Consumables">Printing Media &amp; Consumables</option>
                </select>
              </div>

              <div className="bg-[#0B0F19] p-4 rounded-2xl border border-[#2D3748]">
                <label className="block text-xs font-semibold text-[#9CA3AF] mb-2">Destination Depot in Ghana</label>
                <select
                  value={targetDestination}
                  onChange={(e) => setTargetDestination(e.target.value)}
                  className="w-full bg-[#111827] text-white text-sm font-bold p-3 rounded-xl outline-none border border-[#2D3748] cursor-pointer"
                >
                  <option value="Kumasi (Ashanti Region)">Kumasi — Santase Tech Station</option>
                  <option value="Accra (Greater Accra)">Accra Central &amp; Tema Depot</option>
                  <option value="Takoradi (Western Region)">Takoradi Commercial Depot</option>
                  <option value="Tamale (Northern Region)">Tamale Northern Hub</option>
                  <option value="Nationwide Direct Site Delivery">Nationwide Direct Delivery</option>
                </select>
              </div>

              <div className="flex items-end">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-4 bg-[#4B6F23] hover:bg-[#556B2F] text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <IoLogoWhatsapp className="text-xl" /> Send Sourcing Inquiry (0205761698)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISUAL CATEGORIES GRID WITH DYNAMIC PARAMETRIC ROUTING */}
      <section className="py-20 bg-[#0B0F19] border-b border-[#1F2937]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#4B6F23] uppercase tracking-widest block mb-2">
                PRODUCT SPECTRUM
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
                Importation Divisions
              </h2>
            </div>
            <p className="text-[#9CA3AF] text-sm max-w-md mt-4 md:mt-0 font-normal">
              BENGID LEGACY GHANA LIMITED sources certified factory goods with guaranteed shipping schedules and complete customs handling.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {IMPORT_DIVISIONS.map((cat, idx) => (
              <Link
                key={cat.id}
                href={`/general-importations/${cat.id}`}
                className="group relative h-[440px] w-full rounded-3xl overflow-hidden cursor-pointer border border-[#2D3748] hover:border-[#4B6F23] transition-all duration-500 shadow-xl flex flex-col justify-between p-6 bg-[#111827]"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/60 to-transparent" />
                
                <div className="relative z-10">
                  <span className="text-[10px] font-mono font-bold text-[#86efac] uppercase tracking-widest bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 inline-block mb-3">
                    CATEGORY 0{idx + 1}
                  </span>
                  <h3 className="text-2xl font-bold text-white leading-tight group-hover:text-[#86efac] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#E5E7EB] font-normal mt-2 line-clamp-3">
                    {cat.desc}
                  </p>
                </div>

                <div className="relative z-10 flex items-center justify-between border-t border-[#2D3748] pt-4 mt-auto">
                  <span className="text-xs font-bold text-white uppercase tracking-wider group-hover:text-[#86efac] transition-colors">
                    View Sourcing Specs
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center group-hover:bg-[#4B6F23] transition-colors">
                    <HiArrowRight className="text-base text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VERIFIED LOGISTICS ROADMAP */}
      <section className="py-20 bg-[#0B0F19]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold text-[#4B6F23] uppercase tracking-widest block mb-2">
              END-TO-END SUPPLY CHAIN
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              How We Deliver Cargo To Ghana
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#111827] rounded-3xl p-8 border border-[#2D3748] relative shadow-lg">
              <div className="w-14 h-14 rounded-2xl bg-[#4B6F23]/20 border border-[#4B6F23]/40 text-[#86efac] flex items-center justify-center text-3xl font-black mb-6">
                <HiGlobeAlt />
              </div>
              <span className="text-xs font-mono font-bold text-[#9CA3AF] uppercase tracking-widest block mb-1">STAGE 01</span>
              <h3 className="text-xl font-bold text-white mb-3">1. International Factory Procurement</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed font-normal">
                Direct purchasing from verified manufacturers in China, Europe, and US with negotiated wholesale trade pricing and factory inspections.
              </p>
            </div>

            <div className="bg-[#111827] rounded-3xl p-8 border border-[#2D3748] relative shadow-lg">
              <div className="w-14 h-14 rounded-2xl bg-[#4B6F23]/20 border border-[#4B6F23]/40 text-[#86efac] flex items-center justify-center text-3xl font-black mb-6">
                <HiShieldCheck />
              </div>
              <span className="text-xs font-mono font-bold text-[#9CA3AF] uppercase tracking-widest block mb-1">STAGE 02</span>
              <h3 className="text-xl font-bold text-white mb-3">2. Pre-Shipment Inspection &amp; Freight</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed font-normal">
                Full quality verification before container loading, comprehensive marine cargo insurance, and ocean freight booking with top shipping lines.
              </p>
            </div>

            <div className="bg-[#111827] rounded-3xl p-8 border border-[#2D3748] relative shadow-lg">
              <div className="w-14 h-14 rounded-2xl bg-[#4B6F23]/20 border border-[#4B6F23]/40 text-[#86efac] flex items-center justify-center text-3xl font-black mb-6">
                <HiTruck />
              </div>
              <span className="text-xs font-mono font-bold text-[#9CA3AF] uppercase tracking-widest block mb-1">STAGE 03</span>
              <h3 className="text-xl font-bold text-white mb-3">3. Customs Clearance &amp; Inland Haulage</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed font-normal">
                Seamless clearance at Tema Port / Kotoka Airport and direct transport to your warehouse in Kumasi or Accra with zero demurrage delays.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
