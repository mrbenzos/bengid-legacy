'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { HiArrowLeft, HiCheckCircle, HiPhoto, HiMapPin, HiPhone } from 'react-icons/hi2';
import { Car } from '@/lib/types';

export default function AutomobileDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCar() {
      try {
        const res = await fetch(`/api/cars/${id}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Not found');
        const data: Car = await res.json();
        setCar(data);
        const first = data.images?.find((i) => i.url)?.url || data.image_url || null;
        setMainImage(first);
      } catch (err) {
        // Never substitute made-up data: show "Vehicle not found" instead.
        setCar(null);
      } finally {
        setLoading(false);
      }
    }
    fetchCar();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-6 md:p-12 animate-pulse">
        <div className="h-6 w-32 bg-slate-200 rounded mb-8"></div>
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 h-96 bg-slate-200 rounded-3xl"></div>
          <div className="lg:col-span-5 h-96 bg-slate-200 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h1 className="text-3xl font-black text-slate-900 mb-4">Vehicle not found</h1>
        <Link href="/automobiles" className="text-[#165b33] font-bold flex items-center gap-2 hover:underline">
          <HiArrowLeft /> ← Back to Automobiles
        </Link>
      </div>
    );
  }

  const sku = car.id;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '233205761698';
  const whatsappMsg = `Hello BENGID LEGACY, I am inquiring about vehicle ${car.model_name} (Ref: ${sku}). Please advise on availability.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

  const gallery: { label: string; url: string }[] = [];
  const seen = new Set<string>();
  const pushImg = (label: string, url?: string | null) => {
    if (url && !seen.has(url)) {
      seen.add(url);
      gallery.push({ label, url });
    }
  };
  (car.images || []).forEach((img) => pushImg(img.label, img.url));
  pushImg('Main photo', car.image_url);
  const activeImage = mainImage && seen.has(mainImage) ? mainImage : gallery[0]?.url || null;
  const activeLabel = gallery.find((g) => g.url === activeImage)?.label;

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-slate-50 border-b border-slate-200 pt-28 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Link href="/automobiles" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 font-semibold transition-colors">
            <HiArrowLeft /> Back to Automobiles
          </Link>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left 60% Image Gallery */}
            <div className="w-full lg:w-[60%]">
              <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-100 mb-4 border border-slate-200">
                {activeImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={activeImage} alt={car.model_name} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    <HiPhoto className="text-6xl" />
                  </div>
                )}
                {activeLabel && (
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 text-white text-xs font-bold backdrop-blur">
                    {activeLabel}
                  </span>
                )}
              </div>
              
              {gallery.length > 1 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {gallery.map((g) => (
                    <button 
                      key={g.url}
                      onClick={() => setMainImage(g.url)}
                      title={g.label}
                      className={`relative h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${activeImage === g.url ? 'border-[#165b33]' : 'border-transparent hover:border-slate-300'}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={g.url} alt={g.label} className="absolute inset-0 w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right 40% Details */}
            <div className="w-full lg:w-[40%]">
              <div className="bg-white rounded-3xl p-8 shadow-xl relative">
                <div className="absolute top-6 right-6 bg-[#165b33] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                  {sku}
                </div>
                
                <span className="inline-block px-3 py-1 bg-slate-50 text-slate-600 text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                  {car.vehicle_type || 'Vehicle'}
                </span>
                
                <h1 className="text-3xl font-black text-slate-900 leading-tight mb-2">{car.model_name}</h1>
                <p className="text-slate-500 font-medium mb-4">{car.brand} • {car.year}</p>
                
                <div className="mb-6">
                  <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold ${car.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-slate-50 text-slate-600'}`}>
                    {car.status === 'available' ? 'Available' : 'Sold'}
                  </span>
                </div>
                
                <div className="mb-6">
                  <p className="text-4xl font-black text-[#0369a1]">
                    GHS {car.price ? Number(car.price).toLocaleString() : 'Call for price'}
                  </p>
                </div>
                
                <hr className="border-slate-200 mb-6" />
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm mb-6">
                  <div>
                    <span className="block text-slate-500 text-xs uppercase font-bold">Color</span>
                    <span className="font-semibold text-slate-800">{car.color || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 text-xs uppercase font-bold">Fuel Type</span>
                    <span className="font-semibold text-slate-800">{car.fuel_type || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 text-xs uppercase font-bold">Seating</span>
                    <span className="font-semibold text-slate-800">{car.seating_capacity || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 text-xs uppercase font-bold">Year</span>
                    <span className="font-semibold text-slate-800">{car.year || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 text-xs uppercase font-bold">Reg Type</span>
                    <span className="font-semibold text-slate-800">{car.registration_type || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 text-xs uppercase font-bold">Licence</span>
                    <span className="font-semibold text-slate-800">{car.licence_number || 'N/A'}</span>
                  </div>
                </div>
                
                <hr className="border-slate-200 mb-6" />
                
                <div className="space-y-3">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-[#165b33] hover:bg-[#124b2a] text-white py-3.5 rounded-xl font-bold transition-colors">
                    <IoLogoWhatsapp className="text-xl" /> WhatsApp Inquiry
                  </a>
                  <a href="tel:0205761698" className="flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold transition-colors">
                    <HiPhone className="text-xl" /> Call to Inquire
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-black text-slate-900 mb-6 border-b border-slate-200 pb-4">Vehicle Overview</h2>
            <div className="prose max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
              {car.overview || 'No overview available for this vehicle.'}
            </div>
          </div>
          <div className="md:col-span-1">
            <h2 className="text-2xl font-black text-slate-900 mb-6 border-b border-slate-200 pb-4">Accessories</h2>
            {car.accessories && car.accessories.length > 0 ? (
              <div className="grid gap-4">
                {car.accessories.map((acc, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                    <HiCheckCircle className="text-[#165b33] text-xl flex-shrink-0" />
                    <span className="font-semibold text-slate-800">{acc}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 italic">No accessories listed.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
