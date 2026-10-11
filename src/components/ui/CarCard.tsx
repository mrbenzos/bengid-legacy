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
      : 'Price on Request';

  const sku = car.sku || `BGL-CAR-${car.id.slice(0, 4).toUpperCase()}`;

  const message = encodeURIComponent(
    `Hello BENGID LEGACY,\n\nI am interested in the following vehicle:\n- Vehicle: ${car.model_name}${car.year ? ` (${car.year})` : ''}\n- Brand: ${car.brand || 'Automobile'}\n- Ref: ${sku}\n- Price: ${formattedPrice}\n\nPlease advise on availability and arrange inspection at Santase Station.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="group relative bg-white rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.07),0_2px_4px_-1px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_28px_-4px_rgba(0,0,0,0.12)] transition-all duration-300 overflow-hidden border border-gray-200/90 hover:border-[#4B6F23]/60 flex flex-col h-full hover:-translate-y-1">
      
      {/* Media Top Container with dynamic route */}
      <Link 
        href={`/automobiles/${car.id}`} 
        className="relative h-60 w-full bg-gray-100 overflow-hidden flex-shrink-0 block cursor-pointer"
        aria-label={`View full vehicle details for ${car.model_name}`}
      >
        <Image
          src={displayImage}
          alt={`${car.year ? car.year + ' ' : ''}${car.brand ? car.brand + ' ' : ''}${car.model_name} for sale in Ghana`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
        
        {/* Hover Inspect Glass Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/25 backdrop-blur-[2px]">
          <span className="bg-white text-gray-900 px-4 py-2 rounded-full font-bold text-xs shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <HiEye className="text-base text-[#4B6F23]" />
            Inspect Vehicle Specs
          </span>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase border backdrop-blur-xs ${
            isAvailable 
              ? 'bg-emerald-50/95 text-emerald-800 border-emerald-200' 
              : 'bg-gray-100/95 text-gray-600 border-gray-300'
          }`}>
            {isAvailable ? '● Available' : '○ Sold'}
          </span>
        </div>

        {/* Brand & Year Pill */}
        <div className="absolute top-3 right-3 z-10 flex gap-1.5">
          {car.brand && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-gray-800 border border-gray-200 shadow-sm backdrop-blur-xs">
              {car.brand}
            </span>
          )}
          {car.year && (
            <span className="px-2 py-1 rounded-full text-[10px] font-bold text-white bg-black/60 backdrop-blur-xs">
              {car.year}
            </span>
          )}
        </div>

        {/* SKU Ref bottom left */}
        <div className="absolute bottom-2.5 left-3 z-10">
          <span className="text-[10px] font-mono font-bold text-white bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
            {sku}
          </span>
        </div>

        {/* Fuel Type bottom right */}
        {car.fuel_type && (
          <div className="absolute bottom-2.5 right-3 z-10">
            <span className="text-[10px] font-bold text-white bg-[#4B6F23]/90 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
              {car.fuel_type}
            </span>
          </div>
        )}
      </Link>

      {/* Card Content in Crisp Light Theme */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-[#4B6F23] uppercase tracking-wider mb-1">
            <span>{car.vehicle_type || 'Vehicle'}</span>
            {car.seating_capacity && <span>• {car.seating_capacity} Seats</span>}
          </div>

          <Link href={`/automobiles/${car.id}`} className="block group-hover:text-[#4B6F23] transition-colors">
            <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-2 mb-2 group-hover:text-[#4B6F23] transition-colors">
              {car.model_name}
            </h3>
          </Link>

          {car.overview && (
            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
              {car.overview}
            </p>
          )}
        </div>

        <div className="pt-4 border-t border-gray-100 mt-2">
          {/* Price */}
          <div className="mb-4">
            <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider block">Official Price (Ghana Cedis)</span>
            <div className="text-xl font-black text-gray-900 leading-none mt-0.5">
              {formattedPrice}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            {isAvailable ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#4B6F23] hover:bg-[#3D5A1C] text-white py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <IoLogoWhatsapp className="text-base text-white" />
                <span>Inquire on WhatsApp</span>
              </a>
            ) : (
              <button
                disabled
                className="w-full bg-gray-100 text-gray-400 py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-not-allowed border border-gray-200"
              >
                <span>Vehicle Marked as Sold</span>
              </button>
            )}

            <Link
              href={`/automobiles/${car.id}`}
              className="w-full py-2 px-3 text-center text-xs font-semibold text-gray-600 hover:text-[#4B6F23] hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Inspect Full Specifications</span>
              <HiArrowRight className="text-xs" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
