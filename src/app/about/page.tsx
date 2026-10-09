'use client';

import Link from 'next/link';
import Image from 'next/image';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { HiArrowRight, HiBuildingOffice2, HiGlobeAlt, HiPrinter, HiTruck } from 'react-icons/hi2';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. GRAPHICAL HERO SECTION */}
      <section className="relative h-[80vh] min-h-[600px] w-full bg-white flex flex-col justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/business-team.jpg"
            alt="BENGID LEGACY GHANA LIMITED Corporate Headquarters"
            fill
            className="object-cover opacity-40 object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <h1 className="text-5xl sm:text-7xl font-bold text-slate-900 mb-6 leading-tight max-w-3xl">
            Commercial trading & <br />global supply chain
          </h1>
          <p className="text-slate-600 max-w-xl text-sm sm:text-base leading-relaxed font-normal">
            BENGID LEGACY GHANA LIMITED is a registered commercial enterprise operating in Kumasi, Ashanti Region. We specialize in automobile sales, commercial printing materials supply, and international cargo importations across Ghana.
          </p>
        </div>

        {/* Floating Stats Bar */}
        <div className="absolute bottom-0 left-0 w-full translate-y-1/2 z-20 px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-none sm:rounded-lg shadow-2xl grid grid-cols-2 md:grid-cols-4 overflow-hidden border border-slate-200 divide-x divide-slate-100">
            <div className="p-6 text-center">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 block">2020</span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 block">Est. In Ghana</span>
            </div>
            <div className="p-6 text-center">
              <span className="text-3xl sm:text-4xl font-black text-[#165b33] block">100%</span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 block">Inspected Cargo</span>
            </div>
            <div className="p-6 text-center">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 block">16</span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 block">Regions Covered</span>
            </div>
            <div className="p-6 text-center">
              <span className="text-3xl sm:text-4xl font-black text-[#165b33] block">24/7</span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 block">WhatsApp Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE CORE DIVISIONS (GRAPHICAL CARDS) */}
      <section className="pt-32 pb-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-slate-900 mb-2">Commercial Divisions</h2>
          <p className="text-slate-500 text-sm mb-10 font-medium">BENGID LEGACY GHANA LIMITED — Driving business growth across Ghana</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Division 1: Automobiles */}
            <div className="group relative h-96 w-full overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all">
              <Image
                src="/images/automobiles-hero.jpg"
                alt="BENGID LEGACY GHANA LIMITED Automobile Sales"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500" />
              <div className="absolute top-6 left-6 right-6">
                <span className="text-xs font-bold text-[#86efac] uppercase tracking-widest block mb-1">Division 01</span>
                <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-2">Automobiles & Vehicles</h3>
                <p className="text-xs text-slate-200 font-medium">Pre-owned & imported cars, sedans, SUVs, and commercial trucks in Kumasi.</p>
              </div>
              <Link href="/automobiles" className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center group-hover:bg-[#165b33] group-hover:text-white transition-colors">
                <HiArrowRight className="text-lg text-slate-900 group-hover:text-slate-900" />
              </Link>
            </div>

            {/* Division 2: Printing Materials */}
            <div className="group relative h-96 w-full overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all">
              <Image
                src="/images/materials-hero.jpg"
                alt="BENGID LEGACY GHANA LIMITED Printing Supplies"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500" />
              <div className="absolute top-6 left-6 right-6">
                <span className="text-xs font-bold text-[#86efac] uppercase tracking-widest block mb-1">Division 02</span>
                <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-2">Printing Supplies</h3>
                <p className="text-xs text-slate-200 font-medium">Wholesale photo papers, lamination films, eco-solvent inks, and binding consumables.</p>
              </div>
              <Link href="/materials" className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center group-hover:bg-[#165b33] group-hover:text-white transition-colors">
                <HiArrowRight className="text-lg text-slate-900 group-hover:text-slate-900" />
              </Link>
            </div>

            {/* Division 3: General Importations */}
            <div className="group relative h-96 w-full overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all">
              <Image
                src="/images/imports-hero.jpg"
                alt="BENGID LEGACY GHANA LIMITED Global Importations"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500" />
              <div className="absolute top-6 left-6 right-6">
                <span className="text-xs font-bold text-[#86efac] uppercase tracking-widest block mb-1">Division 03</span>
                <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-2">Global Importations</h3>
                <p className="text-xs text-slate-200 font-medium">Direct factory sourcing, customs clearance, and freight forwarding to Ghana.</p>
              </div>
              <Link href="/general-importations" className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center group-hover:bg-[#165b33] group-hover:text-white transition-colors">
                <HiArrowRight className="text-lg text-slate-900 group-hover:text-slate-900" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMPANY HIGHLIGHTS */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Collage */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 relative h-72 rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src="/images/business-team.jpg"
                  alt="BENGID LEGACY GHANA LIMITED Team"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-[#165b33] text-white rounded-2xl p-6 flex flex-col justify-center">
                <HiBuildingOffice2 className="text-3xl text-[#86efac] mb-2" />
                <h4 className="text-xl font-bold">Kumasi Head Office</h4>
                <p className="text-xs text-slate-200 mt-1">Afua Ampomah Street, Kumasi, Ghana</p>
              </div>
              <div className="relative h-44 rounded-2xl overflow-hidden shadow-sm">
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
              <span className="text-xs font-bold text-[#165b33] uppercase tracking-widest mb-2 block">
                BENGID LEGACY GHANA LIMITED
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-6">
                Built on integrity, speed & reliable delivery
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-medium mb-6">
                BENGID LEGACY GHANA LIMITED was founded to simplify commercial sourcing for Ghanaian business owners. Whether purchasing high-grade photo papers or sourcing industrial equipment from abroad, we ensure every transaction is smooth and transparent.
              </p>

              <div className="flex items-center gap-4 mb-8">
                <Link
                  href="/contact"
                  className="bg-[#165b33] text-white hover:bg-[#114b29] px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-sm"
                >
                  Contact Head Office <span>&rarr;</span>
                </Link>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#165b33] flex items-center justify-center text-white font-extrabold text-base">B</div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Gideon B.</div>
                    <div className="text-xs text-slate-500 font-medium">Founder &amp; CEO, Bengid Legacy Ghana Limited</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROMOTIONAL BANNER */}
      <section className="bg-[#0a1a10] text-slate-900 overflow-hidden relative border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Partner With Us For Your Business Supply Needs
            </h2>
            <p className="text-slate-600 text-sm mb-8 max-w-md leading-relaxed font-medium">
              Join hundreds of businesses across Kumasi and Ghana who rely on BENGID LEGACY GHANA LIMITED for verified products and cargo.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3.5 bg-[#165b33] hover:bg-[#114b29] text-white rounded-full font-bold transition-colors shadow-lg"
            >
              Get In Touch Today ➔
            </Link>
          </div>

          <div className="md:w-1/2 relative h-[360px] w-full mt-10 md:mt-0 z-0">
            <Image
              src="/images/business-team.jpg"
              alt="BENGID LEGACY GHANA LIMITED Partnership"
              fill
              className="object-cover rounded-2xl opacity-80"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
