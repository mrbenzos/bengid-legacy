'use client';

import Link from 'next/link';
import Image from 'next/image';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { HiEye, HiArrowRight, HiShieldCheck } from 'react-icons/hi2';
import { Car } from '@/lib/types';

interface CarCardProps {
  car: Car;
}

const DEFAULT_CAR_IMG = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop';

export default function CarCard({ car }: CarCardProps) {
  const isAvailable = car.status?.toLowerCase() === 'available';
  // Exclusively hardcoded official WhatsApp line: 0205761698 (+233205761698)
  const whatsappNumber = '233205761698';

  // Pick best available high-res image
  const displayImage =
    car.image_url ||
    (car.images && car.images.length > 0 ? car.images[0].url : null) ||
    DEFAULT_CAR_IMG;

  const formattedPrice =
    car.price != null
      ? `GHS ${Number(car.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : 'Negotiable';

  const sku = car.sku || `BGL-CAR-${car.id.slice(0, 4).toUpperCase()}`;

  const message = encodeURIComponent(
    `Hello BENGID LEGACY,\n\nI am interested in the following vehicle:\n- Vehicle: ${car.model_name}${car.year ? ` (${car.year})` : ''}\n- Brand: ${car.brand || 'Import'}\n- Ref: ${sku}\n- Price: ${formattedPrice}\n\nPlease advise on availability and arrange inspection.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="group relative bg-[#111827]/90 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_40px_rgba(75,111,35,0.25)] transition-all duration-300 overflow-hidden border border-[#2D3748] hover:border-[#4B6F23] flex flex-col h-full hover:-translate-y-1.5">
      
      {/* Media Top Container with dynamic route */}
      <Link 
        href={`/automobiles/${car.id}`} 
        className="relative h-64 w-full bg-[#0B0F19] overflow-hidden flex-shrink-0 block cursor-pointer"
        aria-label={`View full vehicle details for ${car.model_name}`}
      >
        <Image
          src={displayImage}
          alt={`${car.year ? car.year + ' ' : ''}${car.brand ? car.brand + ' ' : ''}${car.model_name} for sale in Ghana`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-black/30 pointer-events-none" />
        
        {/* Hover Inspect Glass Badge */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
          <span className="bg-white/95 text-slate-900 px-4 py-2 rounded-full font-bold text-xs shadow-xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <HiEye className="text-base text-[#4B6F23]" />
            Inspect Vehicle Specs
          </span>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase border backdrop-blur-md ${
            isAvailable 
              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40' 
              : 'bg-zinc-900/80 text-zinc-400 border-zinc-700'
          }`}>
            {isAvailable ? '● Available' : '○ Sold'}
          </span>
        </div>

        {/* Brand & Year Pill */}
        <div className="absolute top-3.5 right-3.5 z-10 flex gap-1.5">
          {car.brand && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0B0F19]/80 text-[#86efac] border border-[#2D3748] backdrop-blur-md">
              {car.brand}
            </span>
          )}
          {car.year && (
            <span className="px-2 py-1 rounded-full text-[10px] font-bold text-white bg-black/70 border border-white/10 backdrop-blur-md">
              {car.year}
            </span>
          )}
        </div>

        {/* SKU Ref bottom left */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="text-[10px] font-mono font-bold text-slate-300 bg-black/70 px-2 py-0.5 rounded border border-white/10">
            {sku}
          </span>
        </div>

        {/* Fuel Type bottom right */}
        {car.fuel_type && (
          <div className="absolute bottom-3 right-3 z-10">
            <span className="text-[10px] font-bold text-white bg-[#4B6F23]/80 px-2.5 py-0.5 rounded-full border border-white/10 backdrop-blur-xs">
              {car.fuel_type}
            </span>
          </div>
        )}
      </Link>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow bg-[#111827]">
        <Link href={`/automobiles/${car.id}`}>
          <h3 className="font-bold text-lg text-white leading-snug group-hover:text-[#86efac] transition-colors mb-2 line-clamp-1 cursor-pointer">
            {car.model_name}
          </h3>
        </Link>

        {car.overview && (
          <p className="text-xs text-[#9CA3AF] line-clamp-2 mb-4 leading-relaxed font-normal">
            {car.overview}
          </p>
        )}

        <div className="mt-auto pt-3 border-t border-[#1F2937] flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Asking Price</span>
            <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {formattedPrice}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct WhatsApp Action Button (0205761698) */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Inquire about ${car.model_name} on WhatsApp`}
              className="w-10 h-10 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-all shadow-sm"
              title="Inquire via WhatsApp (0205761698)"
            >
              <IoLogoWhatsapp className="text-lg" />
            </a>

            {/* View Full Vehicle Specs Button */}
            <Link
              href={`/automobiles/${car.id}`}
              className="px-4 py-2 rounded-full bg-[#1F2937] hover:bg-[#4B6F23] text-white text-xs font-bold transition-all flex items-center gap-1 border border-[#2D3748] hover:border-[#4B6F23]"
            >
              <span>Inspect</span>
              <HiArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
