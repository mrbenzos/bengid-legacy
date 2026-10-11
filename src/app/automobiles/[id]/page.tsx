'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { HiArrowLeft, HiCheckCircle, HiPhoto, HiChevronLeft, HiChevronRight, HiPhone, HiMapPin, HiShieldCheck } from 'react-icons/hi2';
import { Car } from '@/lib/types';
import CarCard from '@/components/ui/CarCard';
import { INITIAL_CARS } from '@/lib/initialData';

export default function AutomobileDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const [car, setCar] = useState<Car | null>(null);
  const [similarCars, setSimilarCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    async function fetchCar() {
      try {
        const res = await fetch(`/api/cars/${id}`);
        if (!res.ok) throw new Error('Not found');
        const data: Car = await res.json();
        setCar(data);

        // Fetch similar cars
        const resAll = await fetch('/api/cars');
        if (resAll.ok) {
          const allCars: Car[] = await resAll.json();
          setSimilarCars(allCars.filter(c => c.id !== data.id).slice(0, 3));
        }
      } catch (err) {
        // Fallback to local catalog
        const found = INITIAL_CARS.find(c => c.id === id || c.sku === id);
        if (found) {
          setCar(found);
          setSimilarCars(INITIAL_CARS.filter(c => c.id !== found.id).slice(0, 3));
        } else {
          setCar(null);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchCar();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] p-6 md:p-12 animate-pulse pt-32">
        <div className="h-6 w-48 bg-[#111827] rounded mb-8"></div>
        <div className="grid lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-7 h-96 bg-[#111827] rounded-3xl"></div>
          <div className="lg:col-span-5 h-96 bg-[#111827] rounded-3xl"></div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B0F19] text-white px-4">
        <h1 className="text-3xl font-black mb-3">Vehicle Not Found</h1>
        <p className="text-[#9CA3AF] mb-8 text-sm">The requested vehicle listing is unavailable or has been sold.</p>
        <Link 
          href="/automobiles" 
          className="px-6 py-3 rounded-full bg-[#4B6F23] hover:bg-[#556B2F] text-white font-bold flex items-center gap-2 transition-all shadow-lg text-sm"
        >
          <HiArrowLeft /> ← Back to Automobile Showroom
        </Link>
      </div>
    );
  }

  const sku = car.sku || `BGL-CAR-${car.id.slice(0, 4).toUpperCase()}`;
  // Exclusively hardcoded official WhatsApp line: 0205761698 (+233205761698)
  const whatsappNumber = '233205761698';
  const formattedPrice =
    car.price != null
      ? `GHS ${Number(car.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : 'Negotiable';

  const whatsappMsg = `Hello BENGID LEGACY,\n\nI am inquiring about vehicle ${car.model_name}${car.year ? ` (${car.year})` : ''} (Ref: ${sku}).\nPrice: ${formattedPrice}\n\nPlease advise on availability and arrange physical inspection at Santase Tech Station, Kumasi.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

  const allImages: string[] = [];
  if (car.image_url) allImages.push(car.image_url);
  if (car.images && car.images.length > 0) {
    car.images.forEach(img => {
      if (img.url && !allImages.includes(img.url)) {
        allImages.push(img.url);
      }
    });
  }
  if (allImages.length === 0) {
    allImages.push('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop');
  }

  const isAvailable = car.status?.toLowerCase() === 'available';

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32">
        
        {/* Breadcrumb Navigation */}
        <Link 
          href="/automobiles" 
          className="inline-flex items-center gap-2 text-[#9CA3AF] hover:text-white mb-8 font-semibold text-sm transition-colors"
        >
          <HiArrowLeft /> ← Back to Automobile Showroom
        </Link>
        
        {/* TOP SECTION: Media Gallery & Vehicle Specifications */}
        <div className="flex flex-col lg:flex-row gap-10 mb-20 bg-[#111827] rounded-3xl p-6 sm:p-10 border border-[#2D3748] shadow-2xl">
          {/* Left: Image Gallery */}
          <div className="w-full lg:w-3/5 flex flex-col">
            <div className="relative w-full h-80 sm:h-[460px] rounded-2xl overflow-hidden bg-[#0B0F19] shadow-lg border border-[#2D3748] mb-4 group">
              <Image 
                src={allImages[activeImageIdx] || allImages[0]} 
                alt={car.model_name} 
                fill 
                className="object-cover" 
                priority
              />
              {allImages.length > 1 && (
                <>
                  <button 
                    onClick={() => setActiveImageIdx(prev => (prev === 0 ? allImages.length - 1 : prev - 1))}
                    aria-label="Previous Image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-all border border-white/20"
                  >
                    <HiChevronLeft className="text-2xl" />
                  </button>
                  <button 
                    onClick={() => setActiveImageIdx(prev => (prev === allImages.length - 1 ? 0 : prev + 1))}
                    aria-label="Next Image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-all border border-white/20"
                  >
                    <HiChevronRight className="text-2xl" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-24 h-18 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImageIdx === idx ? 'border-[#4B6F23] scale-105' : 'border-[#2D3748] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Vehicle Detail Card */}
          <div className="w-full lg:w-2/5 flex flex-col justify-between">
            <div>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
                  isAvailable 
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40' 
                    : 'bg-zinc-900/80 text-zinc-400 border-zinc-700'
                }`}>
                  {isAvailable ? '● Available' : '○ Sold'}
                </span>
                {car.brand && (
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#0B0F19] text-[#86efac] border border-[#2D3748]">
                    {car.brand}
                  </span>
                )}
                {car.vehicle_type && (
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#0B0F19] text-[#9CA3AF] border border-[#2D3748]">
                    {car.vehicle_type}
                  </span>
                )}
                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold text-[#9CA3AF] bg-[#0B0F19] border border-[#2D3748]">
                  {sku}
                </span>
              </div>

              {/* Vehicle Title & Model */}
              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-4">
                {car.model_name}
              </h1>

              {/* Price Box */}
              <div className="bg-[#0B0F19] p-5 rounded-2xl border border-[#2D3748] mb-6">
                <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider block mb-1">
                  Asking Price (Ghana Cedis)
                </span>
                <span className="text-3xl sm:text-4xl font-black text-white">
                  {formattedPrice}
                </span>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6 bg-[#0B0F19] p-4 rounded-2xl border border-[#2D3748]">
                <div>
                  <span className="text-[10px] font-bold text-[#9CA3AF] uppercase block">Year</span>
                  <span className="text-sm font-bold text-white">{car.year || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#9CA3AF] uppercase block">Fuel Type</span>
                  <span className="text-sm font-bold text-white">{car.fuel_type || 'Petrol'}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#9CA3AF] uppercase block">Color</span>
                  <span className="text-sm font-bold text-white">{car.color || 'Standard'}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#9CA3AF] uppercase block">Seating</span>
                  <span className="text-sm font-bold text-white">{car.seating_capacity ? `${car.seating_capacity} Seats` : '5 Seats'}</span>
                </div>
              </div>

              {/* Overview */}
              {car.overview && (
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Vehicle Overview</h3>
                  <p className="text-sm text-[#E5E7EB] leading-relaxed font-normal">
                    {car.overview}
                  </p>
                </div>
              )}

              {/* Accessories / Features */}
              {car.accessories && car.accessories.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2.5">Key Accessories &amp; Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {car.accessories.map((acc, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#E5E7EB] font-medium bg-[#0B0F19] px-3 py-1.5 rounded-xl border border-[#2D3748]">
                        <HiCheckCircle className="text-[#86efac] text-sm flex-shrink-0" />
                        <span className="truncate">{acc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Direct Action Buttons */}
            <div className="space-y-3 pt-6 border-t border-[#1F2937]">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full font-bold text-sm tracking-wide transition-all shadow-[0_6px_25px_rgba(37,211,102,0.35)] flex items-center justify-center gap-2"
              >
                <IoLogoWhatsapp className="text-xl" />
                <span>Inquire on WhatsApp (0205761698)</span>
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
                <span>Inspection Location: Santase Tech Station, Kumasi, Ghana</span>
              </div>
            </div>
          </div>
        </div>

        {/* SIMILAR AUTOMOBILES */}
        {similarCars.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-white">Other Vehicles in Stock</h2>
              <Link href="/automobiles" className="text-xs font-bold text-[#86efac] hover:underline">
                View All Automobiles →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarCars.map((sim) => (
                <CarCard key={sim.id} car={sim} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
