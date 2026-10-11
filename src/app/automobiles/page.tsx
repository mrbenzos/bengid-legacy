'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CarCard from '@/components/ui/CarCard';
import { Car } from '@/lib/types';
import { INITIAL_CARS } from '@/lib/initialData';
import { HiArrowRight, HiMagnifyingGlass, HiShieldCheck, HiTruck } from 'react-icons/hi2';
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
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827]">
      {/* 1. HERO SECTION WITH LIGHT OVERLAY */}
      <section className="relative w-full pt-28 sm:pt-36 pb-16 overflow-hidden border-b border-gray-200">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/automobiles-hero.jpg"
            alt="BENGID LEGACY GHANA LIMITED Premium Car Sales"
            fill
            className="object-cover object-center scale-105 transition-transform duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-[#f1f3f2]/40 to-[#F9FAFB]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl bg-white/70 backdrop-blur-md p-8 sm:p-12 rounded-[2.5rem] shadow-xl border border-white/70 mb-10">
            <span className="text-xs font-mono font-bold text-[#4B6F23] uppercase tracking-widest block mb-2">
              DIVISION 02 • CERTIFIED AUTOMOBILE SALES
            </span>

            <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-5 leading-tight tracking-tight">
              Premium Automobiles,<br />
              <span className="text-[#4B6F23]">
                Verified Documentation.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-700 max-w-2xl leading-relaxed font-normal mb-8">
              Discover clean foreign-used sedans, executive SUVs, rugged pickups, and popular new-energy Chinese vehicles (BYD, Changan, Geely, Chery, Dongfeng) available for physical inspection at Santase Tech Station, Kumasi.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5">
              <a
                href="#inventory"
                className="px-8 py-3.5 bg-[#4B6F23] hover:bg-[#3D5A1C] text-white rounded-full font-bold text-sm tracking-wide transition-all shadow-[0_4px_16px_rgba(75,111,35,0.3)] flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <span>Browse Vehicle Showroom</span>
                <HiArrowRight className="text-sm" />
              </a>
              <a
                href="https://wa.me/233205761698?text=Hello%20BENGID%20LEGACY,%20I%20want%20to%20inquire%20about%20vehicles%20for%20sale."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <IoLogoWhatsapp className="text-lg" />
                <span>Inquire on WhatsApp (0205761698)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Brand Highlights Bar */}
        <div className="relative z-10 border-t border-gray-200 bg-white/80 backdrop-blur-md py-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs font-mono font-bold text-gray-600 uppercase tracking-widest flex-shrink-0">
              POPULAR BRANDS IN STOCK
            </span>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {['BYD', 'Changan', 'Geely', 'Chery', 'Dongfeng', 'Toyota', 'Mercedes-Benz'].map((b, i) => (
                <button
                  key={i}
                  onClick={() => setBrandFilter(b)}
                  className="text-xs font-bold text-gray-700 hover:text-[#4B6F23] transition-colors cursor-pointer"
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. VEHICLE INVENTORY & FILTER BAR */}
      <section id="inventory" className="py-20 bg-[#F9FAFB]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Controls Bar */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 mb-12 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                  Automobile Inventory
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Showing {filteredCars.length} vehicles available for inspection at Kumasi showroom
                </p>
              </div>

              {/* Search input */}
              <div className="relative w-full lg:w-96">
                <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder="Search model, brand, or SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-full border border-gray-300 focus:border-[#4B6F23] focus:bg-white text-sm text-gray-900 placeholder-gray-400 outline-none transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Brand Filter Pills */}
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-100">
              {BRAND_FILTERS.map((b) => (
                <button
                  key={b}
                  onClick={() => setBrandFilter(b)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    brandFilter.toLowerCase() === b.toLowerCase()
                      ? 'bg-[#4B6F23] text-white shadow-md border border-[#4B6F23]'
                      : 'bg-white hover:bg-gray-100 text-gray-700 hover:text-gray-950 border border-gray-200 shadow-2xs'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="py-20 text-center text-gray-500 font-bold">Loading automobile inventory...</div>
          ) : filteredCars.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-3xl border border-gray-200 p-12 shadow-sm">
              <HiTruck className="text-5xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">No vehicles found</h3>
              <p className="text-sm text-gray-500 mb-6">Try selecting "All" brands or clearing your search term.</p>
              <button
                onClick={() => { setBrandFilter('All'); setSearchQuery(''); }}
                className="px-6 py-2.5 rounded-full bg-[#4B6F23] text-white text-xs font-bold cursor-pointer"
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
