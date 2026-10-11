'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { HiArrowLeft, HiCheckCircle, HiGlobeAlt, HiPhone, HiMapPin, HiTruck, HiShieldCheck } from 'react-icons/hi2';
import { IMPORT_DIVISIONS } from '../page';

export default function GeneralImportationDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const division = IMPORT_DIVISIONS.find((d) => d.id === id) || IMPORT_DIVISIONS[0];
  const otherDivisions = IMPORT_DIVISIONS.filter((d) => d.id !== division.id);

  // Exclusively hardcoded official WhatsApp line: 0205761698 (+233205761698)
  const whatsappNumber = '233205761698';
  const whatsappMsg = `Hello BENGID LEGACY GHANA LIMITED,\n\nI want to inquire about importing within this division:\n- Category: ${division.name}\n- Estimated Turnaround: ${division.turnaround}\n- Preferred Port: Tema Port / Kotoka Airport\n\nPlease advise on the current tariff schedule and ocean freight quotation.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32">
        
        {/* Breadcrumb Navigation */}
        <Link 
          href="/general-importations" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 font-semibold text-sm transition-colors"
        >
          <HiArrowLeft /> ← Back to General Importations
        </Link>
        
        {/* Main Category Specification Card */}
        <div className="flex flex-col lg:flex-row gap-10 mb-20 bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-md">
          {/* Left: Image Container */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-gray-200 mb-4">
              <Image 
                src={division.image} 
                alt={division.name} 
                fill 
                className="object-cover" 
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs font-mono font-bold text-white bg-black/60 px-3 py-1 rounded-full border border-white/20 backdrop-blur-xs">
                  GLOBAL SOURCING DIVISION
                </span>
              </div>
            </div>

            {/* Quick Sourcing Metrics Box */}
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-3">
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Estimated Turnaround</span>
                <span className="text-sm font-bold text-gray-900">{division.turnaround}</span>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Logistics Route</span>
                <span className="text-xs font-semibold text-gray-700">{division.route}</span>
              </div>
            </div>
          </div>

          {/* Right: Specifications & Quotation Request */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-[#4B6F23] uppercase tracking-widest block mb-2">
                DIVISION 03 • INTERNATIONAL SUPPLY CHAIN
              </span>

              <h1 className="text-2xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
                {division.name}
              </h1>

              <p className="text-sm text-gray-700 leading-relaxed font-normal mb-8">
                {division.desc}
              </p>

              {/* Service Capabilities */}
              <div className="mb-8">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Service Guarantees</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {division.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-800 font-medium bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
                      <HiCheckCircle className="text-[#4B6F23] text-base flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="space-y-3 pt-6 border-t border-gray-100">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#4B6F23] hover:bg-[#3D5A1C] text-white rounded-full font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
              >
                <IoLogoWhatsapp className="text-xl" />
                <span>Request Custom Sourcing Quote (0205761698)</span>
              </a>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:0241749931"
                  className="flex-1 py-3 bg-white hover:bg-gray-50 text-gray-800 rounded-full font-bold text-xs uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-2 border border-gray-300 shadow-xs"
                >
                  <HiPhone className="text-sm text-[#4B6F23]" />
                  <span>Call: 0241749931</span>
                </a>
                <a
                  href="tel:0593132725"
                  className="flex-1 py-3 bg-white hover:bg-gray-50 text-gray-800 rounded-full font-bold text-xs uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-2 border border-gray-300 shadow-xs"
                >
                  <HiPhone className="text-sm text-[#4B6F23]" />
                  <span>Call: 0593132725</span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 pt-2">
                <HiMapPin className="text-[#4B6F23]" />
                <span>Central Clearing Office: Santase Tech Station, Kumasi, Ghana</span>
              </div>
            </div>
          </div>
        </div>

        {/* OTHER IMPORTATION DIVISIONS */}
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-6">Other Importation Divisions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherDivisions.map((od) => (
              <Link
                key={od.id}
                href={`/general-importations/${od.id}`}
                className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 block"
              >
                <h3 className="text-base font-bold text-gray-900 group-hover:text-[#4B6F23] transition-colors mb-2">
                  {od.name}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2 mb-4">{od.desc}</p>
                <span className="text-xs font-bold text-[#4B6F23] flex items-center gap-1">
                  <span>View Details</span>
                  <span>&rarr;</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
