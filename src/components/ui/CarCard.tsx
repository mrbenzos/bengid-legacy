'use client';

import Link from 'next/link';
import Image from 'next/image';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { HiEye, HiMapPin } from 'react-icons/hi2';
import { Car } from '@/lib/types';

interface CarCardProps {
  car: Car;
}

const DEFAULT_CAR_IMG = '/images/automobiles-hero.jpg';

export default function CarCard({ car }: CarCardProps) {
  const isAvailable = car.status?.toLowerCase() === 'available';
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '233538973984';

  // Pick best available image
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
    `Hello BENGID LEGACY,\n\nI am interested in the following vehicle:\n- Vehicle: ${car.model_name}${car.year ? ` (${car.year})` : ''}\n- Ref: ${sku}\n- Price: ${formattedPrice}\n\nPlease advise on availability and arrange inspection.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 flex flex-col h-full relative hover:-translate-y-1">
      {/* Top Half: Light blue/gray background with Car Image */}
      <Link href={`/automobiles/${car.id}`} className="relative h-64 w-full bg-[#dbe8fa] overflow-hidden flex-shrink-0 block flex items-center justify-center p-4">
        <Image
          src={displayImage}
          alt={`${car.year ? car.year + ' ' : ''}${car.brand ? car.brand + ' ' : ''}${car.model_name} — ${car.vehicle_type || 'vehicle'} for sale in Ghana`}
          width={400}
          height={300}
          className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out drop-shadow-2xl"
        />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${
            isAvailable ? 'bg-white text-slate-800' : 'bg-slate-800 text-slate-300'
          }`}>
            {isAvailable ? 'Available' : 'Sold'}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow bg-white">
        <Link href={`/automobiles/${car.id}`}>
          <h3 className="font-bold text-lg text-slate-900 leading-snug group-hover:text-blue-600 transition-colors mb-4">
            {car.model_name}
          </h3>
        </Link>

        <div className="mt-auto flex items-center justify-between">
          <p className="text-slate-900 font-medium text-lg">{formattedPrice}</p>

          <Link
            href={`/automobiles/${car.id}`}
            aria-label={`View full details for ${car.model_name}${car.year ? ' ' + car.year : ''}`}
            className="px-5 py-2 rounded-full border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-100 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
