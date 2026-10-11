'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CarCard from '@/components/ui/CarCard';
import { Car } from '@/lib/types';
import { INITIAL_CARS } from '@/lib/initialData';
import { HiArrowRight, HiMagnifyingGlass, HiShieldCheck } from 'react-icons/hi2';
import { IoLogoWhatsapp } from 'react-icons/io5';

const BRAND_FILTERS = [
  'All',
  'BYD',
  'Changan',
  'Geely',
  'Chery',
  'Dongfeng',
  'Toyota',
  'Hyundai',
  'Mercedes-Benz',
];

export default function AutomobilesPage() {
  const [cars, setCars] = useState<Car[]>(INITIAL_CARS);
  const [loading, setLoading] = useState(true);
  const [brandFilter, setBrandFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchCars() {
      try {
        const res = await fetch('/api/cars');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setCars(data as Car[]);
            setLoading(false);
            return;
          }
        }
        setCars(INITIAL_CARS);
      } catch (err) {
        console.error('Error fetching cars:', err);
        setCars(INITIAL_CARS);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesBrand =
        brandFilter === 'All' ||
        car.brand?.toLowerCase() === brandFilter.toLowerCase() ||
        car.model_name?.toLowerCase().includes(brandFilter.toLowerCase());

      const matchesType =
        typeFilter === 'All' ||
        (car.vehicle_type && car.vehicle_type.toLowerCase().includes(typeFilter.toLowerCase()));

      const matchesSearch =
        !searchQuery ||
        car.model_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (car.brand && car.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (car.sku && car.sku.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesBrand && matchesType && matchesSearch;
    });
  }, [cars, brandFilter, typeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative w-full min-h-[85vh] flex flex-col justify-between overflow-hidden pt-28 pb-16 border-b border-[#1F2937]">
        {/* Full-bleed background car image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/automobiles-hero.jpg"
            alt="BENGID LEGACY GHANA LIMITED Premium Car Sales"
            fill
            className="object-cover object-center opacity-45 scale-105 transition-transform duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/80 to-[#0B0F19]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/60 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 my-auto">
          <div className="max-w-4xl">
            {/* Note: Purged floating badge */}
            <span className="text-xs font-mono font-bold text-[#86efac] uppercase tracking-widest block mb-3">
              DIVISION 02 • CERTIFIED AUTOMOBILE SALES
            </span>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              PREMIUM AUTOMOBILES,<br />
              <span className="text-[#4B6F23] drop-shadow-md">
                VERIFIED DOCUMENTATION.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#F3F4F6] max-w-2xl leading-relaxed font-normal mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              Discover clean foreign-used sedans, executive SUVs, rugged pickups, and popular new-energy Chinese vehicles (BYD, Changan, Geely, Chery, Dongfeng) available for inspection at Santase Tech Station, Kumasi.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#inventory"
                className="px-8 py-4 bg-[#4B6F23] hover:bg-[#556B2F] text-white rounded-full font-bold text-sm tracking-wide transition-all shadow-[0_6px_25px_rgba(75,111,35,0.4)] flex items-center justify-center gap-2 border border-[#4B6F23]/60 hover:-translate-y-0.5"
              >
                <span>Browse Vehicle Showroom</span>
                <HiArrowRight className="text-sm" />
              </a>
              <a
                href="https://wa.me/233205761698?text=Hello%20BENGID%20LEGACY,%20I%20want%20to%20inquire%20about%20vehicles%20for%20sale."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <IoLogoWhatsapp className="text-lg" />
                <span>Inquire on WhatsApp (0205761698)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Brand Highlights Bar */}
        <div className="relative z-10 border-t border-[#1F2937] bg-[#111827]/80 backdrop-blur-xl py-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs font-mono font-bold text-[#9CA3AF] uppercase tracking-widest flex-shrink-0">
              POPULAR BRANDS IN STOCK
            </span>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {['BYD', 'Changan', 'Geely', 'Chery', 'Dongfeng', 'Toyota', 'Mercedes-Benz'].map((b, i) => (
                <button
                  key={i}
                  onClick={() => setBrandFilter(b)}
                  className="text-xs font-bold text-[#E5E7EB] hover:text-[#86efac] transition-colors cursor-pointer"
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. VEHICLE INVENTORY & FILTER BAR */}
      <section id="inventory" className="py-20 bg-[#0B0F19]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Controls Bar */}
          <div className="bg-[#111827] rounded-3xl p-6 sm:p-8 border border-[#2D3748] mb-12 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Automobile Showroom
                </h2>
                <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
                  Showing {filteredCars.length} vehicles available for inspection in Kumasi
                </p>
              </div>

              {/* Search & Type Select */}
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="relative flex-grow sm:w-72">
                  <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                  <input
                    type="text"
                    placeholder="Search model, brand or SKU..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-[#0B0F19] rounded-full border border-[#2D3748] focus:border-[#4B6F23] text-sm text-white placeholder-slate-500 outline-none transition-all"
                  />
                </div>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="bg-[#0B0F19] text-white text-xs font-bold px-4 py-3 rounded-full border border-[#2D3748] focus:border-[#4B6F23] outline-none cursor-pointer"
                >
                  <option value="All">All Body Types</option>
                  <option value="Salon">Sedan / Salon</option>
                  <option value="SUV">SUV / 4WD</option>
                  <option value="Pickup">Pickup Truck</option>
                </select>
              </div>
            </div>

            {/* Brand Filter Pills */}
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-[#1F2937]">
              {BRAND_FILTERS.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setBrandFilter(brand)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    brandFilter.toLowerCase() === brand.toLowerCase()
                      ? 'bg-[#4B6F23] text-white shadow-md border border-[#4B6F23]'
                      : 'bg-[#1F2937] text-[#9CA3AF] hover:text-white hover:bg-[#2D3748] border border-transparent'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Cards Grid */}
          {loading ? (
            <div className="py-20 text-center text-[#9CA3AF] font-bold">Loading vehicles...</div>
          ) : filteredCars.length === 0 ? (
            <div className="py-20 text-center bg-[#111827] rounded-3xl border border-[#2D3748] p-12">
              <h3 className="text-xl font-bold text-white mb-2">No vehicles found</h3>
              <p className="text-sm text-[#9CA3AF] mb-6">No vehicles match your active search filters.</p>
              <button
                onClick={() => { setBrandFilter('All'); setTypeFilter('All'); setSearchQuery(''); }}
                className="px-6 py-2.5 rounded-full bg-[#4B6F23] text-white text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
