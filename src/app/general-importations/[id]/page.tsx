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
    <div className="min-h-screen bg-[#0B0F19] text-white pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32">
        
        {/* Breadcrumb Navigation */}
        <Link 
          href="/general-importations" 
          className="inline-flex items-center gap-2 text-[#9CA3AF] hover:text-white mb-8 font-semibold text-sm transition-colors"
        >
          <HiArrowLeft /> ← Back to General Importations
        </Link>
        
        {/* Main Category Specification Card */}
        <div className="flex flex-col lg:flex-row gap-10 mb-20 bg-[#111827] rounded-3xl p-6 sm:p-10 border border-[#2D3748] shadow-2xl">
          {/* Left: Image Container */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#0B0F19] shadow-lg border border-[#2D3748] mb-4">
              <Image 
                src={division.image} 
                alt={division.name} 
                fill 
                className="object-cover" 
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs font-mono font-bold text-[#86efac] bg-black/70 px-3 py-1 rounded-full border border-white/10">
                  GLOBAL SOURCING DIVISION
                </span>
              </div>
            </div>

            {/* Quick Sourcing Metrics Box */}
            <div className="bg-[#0B0F19] p-5 rounded-2xl border border-[#2D3748] space-y-3">
              <div>
                <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Estimated Turnaround</span>
                <span className="text-sm font-bold text-white">{division.turnaround}</span>
              </div>
              <div className="pt-2 border-t border-[#1F2937]">
                <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Logistics Route</span>
                <span className="text-xs font-semibold text-[#86efac]">{division.route}</span>
              </div>
            </div>
          </div>

          {/* Right: Specifications & Direct Quotation Form */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#0B0F19] text-[#86efac] border border-[#2D3748]">
                  Division 03 Spec
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-[#4B6F23]">
                  Factory Direct
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
                {division.name}
              </h1>

              <p className="text-[#E5E7EB] text-sm leading-relaxed mb-6 font-normal">
                {division.desc}
              </p>

              {/* Verified Features */}
              <div className="mb-8">
                <h3 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">
                  Logistics &amp; Customs Services Included
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {division.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#E5E7EB] font-medium bg-[#0B0F19] px-3.5 py-2.5 rounded-xl border border-[#2D3748]">
                      <HiCheckCircle className="text-[#86efac] text-base flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-6 border-t border-[#1F2937]">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full font-bold text-sm tracking-wide transition-all shadow-[0_6px_25px_rgba(37,211,102,0.35)] flex items-center justify-center gap-2"
              >
                <IoLogoWhatsapp className="text-xl" />
                <span>Request Quotation on WhatsApp (0205761698)</span>
              </a>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:0241749931"
                  className="flex-1 py-3 bg-[#1F2937] hover:bg-[#2D3748] text-white rounded-full font-bold text-xs uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-2 border border-[#2D3748]"
                >
                  <HiPhone className="text-sm text-[#4B6F23]" />
                  <span>Call: 0241749931</span>
                </a>
                <a
                  href="tel:0593132725"
                  className="flex-1 py-3 bg-[#1F2937] hover:bg-[#2D3748] text-white rounded-full font-bold text-xs uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-2 border border-[#2D3748]"
                >
                  <HiPhone className="text-sm text-[#4B6F23]" />
                  <span>Call: 0593132725</span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#9CA3AF] pt-2">
                <HiMapPin className="text-[#4B6F23]" />
                <span>Customs Point: Tema Port &amp; Kotoka Airport • Kumasi Office: Santase Tech Station</span>
              </div>
            </div>
          </div>
        </div>

        {/* OTHER IMPORTATION DIVISIONS */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-white">Other Importation Divisions</h2>
            <Link href="/general-importations" className="text-xs font-bold text-[#86efac] hover:underline">
              View All Import Divisions →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherDivisions.map((other) => (
              <Link
                key={other.id}
                href={`/general-importations/${other.id}`}
                className="group bg-[#111827] rounded-2xl p-5 border border-[#2D3748] hover:border-[#4B6F23] transition-all hover:-translate-y-1"
              >
                <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                  <Image src={other.image} alt={other.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                </div>
                <h3 className="font-bold text-white text-base mb-1 group-hover:text-[#86efac] transition-colors">{other.name}</h3>
                <p className="text-xs text-[#9CA3AF] line-clamp-2">{other.desc}</p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
