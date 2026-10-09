'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CarCard from '@/components/ui/CarCard';
import { Car } from '@/lib/types';
import { HiArrowRight } from 'react-icons/hi2';

const DEFAULT_CARS: Car[] = [
  { id: '1', sku: 'BGL-CAR-3001', model_name: 'Toyota Yaris Sedan (Automatic)', vehicle_type: 'Sedan', brand: 'Toyota', color: 'White', fuel_type: 'Petrol', seating_capacity: 5, overview: 'Clean used Toyota Yaris', licence_number: null, registration_type: null, accessories: [], images: [], year: 2018, price: 85000.0, status: 'available', image_url: null, created_at: new Date().toISOString() },
  { id: '2', sku: 'BGL-CAR-3002', model_name: 'Hyundai Accent GLS', vehicle_type: 'Sedan', brand: 'Hyundai', color: 'Silver', fuel_type: 'Petrol', seating_capacity: 5, overview: 'Clean used Hyundai Accent', licence_number: null, registration_type: null, accessories: [], images: [], year: 2019, price: 92000.0, status: 'available', image_url: null, created_at: new Date().toISOString() },
  { id: '3', sku: 'BGL-CAR-3003', model_name: 'Mercedes-Benz GLE', vehicle_type: 'SUV', brand: 'Mercedes', color: 'Black', fuel_type: 'Petrol', seating_capacity: 5, overview: 'Clean used GLE', licence_number: null, registration_type: null, accessories: [], images: [], year: 2021, price: 450000.0, status: 'available', image_url: '/images/categories/mercedes.jpg', created_at: new Date().toISOString() },
  { id: '4', sku: 'BGL-CAR-3004', model_name: 'Porsche 911 Carrera', vehicle_type: 'Coupe', brand: 'Porsche', color: 'Grey', fuel_type: 'Petrol', seating_capacity: 2, overview: 'Sport coupe', licence_number: null, registration_type: null, accessories: [], images: [], year: 2022, price: 850000.0, status: 'available', image_url: '/images/categories/porsche.jpg', created_at: new Date().toISOString() }
];

const CAR_CATEGORIES = [
  { name: 'Mercedes-Benz', image: '/images/categories/mercedes.jpg' },
  { name: 'Audi', image: '/images/categories/audi.jpg' },
  { name: 'BMW', image: '/images/categories/bmw.jpg' },
  { name: 'Porsche', image: '/images/categories/porsche.jpg' },
];

export default function AutomobilesPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [brandFilter, setBrandFilter] = useState('All');

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
        setCars(DEFAULT_CARS);
      } catch (err) {
        console.error('Error fetching cars:', err);
        setCars(DEFAULT_CARS);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      if (brandFilter === 'All') return true;
      return car.brand?.toLowerCase() === brandFilter.toLowerCase() || car.model_name?.toLowerCase().includes(brandFilter.toLowerCase());
    });
  }, [cars, brandFilter]);

  const handleCategoryClick = (brandName: string) => {
    setBrandFilter(brandName);
    document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative h-[80vh] min-h-[600px] w-full bg-white flex flex-col justify-center">
        {/* Background Car Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/automobiles-hero.jpg"
            alt="BENGID LEGACY GHANA LIMITED Premium Car Sales"
            fill
            className="object-cover opacity-70 object-center scale-105 transition-transform duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <h1 className="text-5xl sm:text-7xl font-bold text-slate-900 mb-6 leading-tight max-w-3xl">
            Premium car <br />sales
          </h1>
          <p className="text-slate-600 max-w-xl text-sm sm:text-base leading-relaxed">
            We want you to have a stress-free vehicle experience, so we make it easy to find a car — by providing simple search tools, customer reviews and plenty of pick-up locations across the city.
          </p>
        </div>

        {/* Floating Search/Filter Bar */}
        <div className="absolute bottom-0 left-0 w-full translate-y-1/2 z-20 px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-none sm:rounded-lg shadow-2xl flex flex-col sm:flex-row overflow-hidden border border-slate-200">
            <div className="flex-1 p-5 border-b sm:border-b-0 sm:border-r border-slate-200">
              <label className="block text-xs font-semibold text-slate-500 mb-1">Vehicle Type</label>
              <select className="w-full bg-transparent text-sm font-bold text-slate-900 outline-none cursor-pointer">
                <option>All Types</option>
                <option>Sedan</option>
                <option>SUV</option>
                <option>Hatchback</option>
                <option>Truck/Pickup</option>
                <option>Van/Minivan</option>
                <option>Coupe</option>
                <option>Convertible</option>
                <option>Luxury</option>
                <option>Electric</option>
                <option>Hybrid</option>
              </select>
            </div>
            <div className="flex-1 p-5 border-b sm:border-b-0 sm:border-r border-slate-200">
              <label className="block text-xs font-semibold text-slate-500 mb-1">Make / Brand</label>
              <select className="w-full bg-transparent text-sm font-bold text-slate-900 outline-none cursor-pointer">
                <option>Any Brand</option>
                <option>Mercedes-Benz</option>
                <option>Toyota</option>
              </select>
            </div>
            <div className="flex-1 p-5 border-b sm:border-b-0 sm:border-r border-slate-200">
              <label className="block text-xs font-semibold text-slate-500 mb-1">Max Price</label>
              <select className="w-full bg-transparent text-sm font-bold text-slate-900 outline-none cursor-pointer">
                <option>Any Price</option>
                <option>Below GHS 100k</option>
                <option>Below GHS 500k</option>
              </select>
            </div>
            <button className="bg-blue-400 hover:bg-blue-500 text-white font-bold px-8 py-5 transition-colors sm:w-auto w-full">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* 2. CAR CATEGORY SECTION */}
      <section className="pt-32 pb-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-slate-900 mb-10">Car Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAR_CATEGORIES.map((cat, idx) => (
              <div 
                key={idx} 
                onClick={() => handleCategoryClick(cat.name)}
                className="group relative h-96 w-full rounded-none overflow-hidden cursor-pointer"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-transparent group-hover:from-black/70 transition-colors duration-500" />
                <h3 className="absolute top-6 left-6 text-2xl font-medium text-white max-w-[120px] leading-tight">
                  {cat.name.split('-').join('-\n')}
                </h3>
                <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center group-hover:bg-blue-400 transition-colors">
                  <HiArrowRight className="text-lg text-slate-900 group-hover:text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TREND VEHICLES SECTION */}
      <section id="inventory" className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-4xl font-bold text-slate-900">Trend vehicles {brandFilter !== 'All' ? `- ${brandFilter}` : ''}</h2>
            <div className="flex items-center gap-4">
              {brandFilter !== 'All' && (
                <button onClick={() => setBrandFilter('All')} className="text-sm font-semibold text-slate-500 hover:text-slate-900 underline">
                  Clear Filter
                </button>
              )}
              <Link href="/automobiles" className="px-6 py-2 rounded-full bg-blue-400 hover:bg-blue-500 text-white font-semibold text-sm transition-colors">
                View all ➔
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl h-80 animate-pulse border border-slate-200 p-4" />
                ))
              : filteredCars.slice(0, 8).map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
          </div>
        </div>
      </section>

      {/* 4. PROMO SECTION */}
      <section className="bg-[#0B0F19] text-slate-900 overflow-hidden relative border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 z-10">
            <h2 className="text-5xl font-bold mb-8 leading-tight">
              Book Tesla with <br />a big discount
            </h2>
            <button className="px-8 py-3 bg-blue-400 hover:bg-blue-500 text-white rounded-full font-bold transition-colors">
              Book Now
            </button>
          </div>
          <div className="md:w-1/2 relative h-[400px] w-full mt-10 md:mt-0 z-0">
            <Image
              src="/images/cars-showroom.jpg"
              alt="Tesla Model X"
              fill
              className="object-contain"
            />
          </div>

          {/* Discount Badge */}
          <div className="hidden md:flex absolute right-0 top-0 bottom-0 w-1/4 bg-blue-400 flex-col items-center justify-center p-8 z-10">
            <h3 className="text-6xl font-black text-slate-900 mb-2">50%</h3>
            <p className="text-white/90 text-lg text-center font-medium">For everyone<br/>Tesla cars</p>
          </div>
        </div>
      </section>

    </div>
  );
}
