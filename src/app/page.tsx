'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MaterialCard from '@/components/ui/MaterialCard';
import CarCard from '@/components/ui/CarCard';
import { Material, Car } from '@/lib/types';

const DEMO_MATERIALS: Material[] = [
  { id: '1', sku: 'BGL-MAT-001', name: 'Premium High-Gloss RC Photo Paper (A4 / 260gsm)', category: 'Photo Paper', brand: 'Epson Compatible', color: 'White', overview: 'High quality premium photo paper for brilliant, long-lasting prints.', features: ['High Gloss', 'Water Resistant', 'Fast Drying'], images: [], price: 350.0, unit: 'per pack (100 sheets)', stock_status: 'in_stock', image_url: 'https://images.unsplash.com/photo-1588696879815-585a21b3e7bc?q=80&w=800&auto=format&fit=crop', created_at: new Date().toISOString() },
  { id: '2', sku: 'BGL-MAT-002', name: 'Thermal Lamination Roll — Gloss (320mm x 50m)', category: 'Lamination', brand: 'Generic', color: 'Transparent', overview: 'Durable thermal lamination rolls for protecting documents and prints.', features: ['Gloss Finish', 'Matte Finish Available', 'Anti-Scratch'], images: [], price: 450.0, unit: 'per roll (50m)', stock_status: 'in_stock', image_url: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=800&auto=format&fit=crop', created_at: new Date().toISOString() },
  { id: '3', sku: 'BGL-MAT-003', name: 'Eco-Solvent Printing Ink — CMYK Set (1 Liter)', category: 'Inks', brand: 'EcoColor', color: 'CMYK', overview: 'Vibrant eco-solvent inks designed for high-resolution wide format printers.', features: ['Eco-Friendly', 'UV Resistant', 'Non-Clogging'], images: [], price: 320.0, unit: 'per bottle (1000ml)', stock_status: 'in_stock', image_url: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=800&auto=format&fit=crop', created_at: new Date().toISOString() },
  { id: '4', sku: 'BGL-MAT-004', name: 'PVC Frontlit Flex Banner — 440gsm (High Tensile)', category: 'Flex', brand: 'FlexMaster', color: 'White', overview: 'Heavy duty frontlit flex banner material for outdoor billboards and signage.', features: ['Tear Resistant', 'Weatherproof', 'Smooth Surface'], images: [], price: 1200.0, unit: 'per roll (50m)', stock_status: 'in_stock', image_url: 'https://images.unsplash.com/photo-1621360841013-c76831f1dbce?q=80&w=800&auto=format&fit=crop', created_at: new Date().toISOString() },
  { id: '5', sku: 'BGL-MAT-005', name: 'Self-Adhesive Vinyl Sticker Roll — White Gloss', category: 'Vinyl', brand: 'VinylPro', color: 'White', overview: 'Premium self-adhesive vinyl for custom vehicle wraps and window graphics.', features: ['Strong Adhesion', 'Easy Peel', 'Bubble-Free Application'], images: [], price: 850.0, unit: 'per roll (50m)', stock_status: 'in_stock', image_url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop', created_at: new Date().toISOString() },
  { id: '6', sku: 'BGL-MAT-006', name: 'One-Way Vision Perforated Window Film', category: 'One-Way-Vision', brand: 'ClearView', color: 'White/Black', overview: 'Perforated window film that allows graphics on one side and clear visibility on the other.', features: ['High Definition Print', 'Removable Glue', 'Privacy Enhancing'], images: [], price: 950.0, unit: 'per roll (50m)', stock_status: 'in_stock', image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop', created_at: new Date().toISOString() },
];

const DEMO_CARS: Car[] = [
  { id: '1', sku: 'BGL-CAR-2001', model_name: 'Toyota Yaris Sedan (Automatic)', vehicle_type: 'Sedan', brand: 'Toyota', color: 'White', fuel_type: 'Petrol', seating_capacity: 5, overview: 'Clean used Toyota Yaris', licence_number: null, registration_type: null, accessories: [], images: [], year: 2018, price: 85000.0, status: 'available', image_url: '/images/div-auto.jpg', created_at: new Date().toISOString() },
  { id: '2', sku: 'BGL-CAR-2002', model_name: 'Hyundai Accent GLS (Clean Foreign Used)', vehicle_type: 'Sedan', brand: 'Hyundai', color: 'Silver', fuel_type: 'Petrol', seating_capacity: 5, overview: 'Clean used Hyundai Accent', licence_number: null, registration_type: null, accessories: [], images: [], year: 2019, price: 92000.0, status: 'available', image_url: '/images/div-auto.jpg', created_at: new Date().toISOString() },
  { id: '3', sku: 'BGL-CAR-2003', model_name: 'Toyota Corolla LE (Verified Documentation)', vehicle_type: 'Sedan', brand: 'Toyota', color: 'Black', fuel_type: 'Petrol', seating_capacity: 5, overview: 'Clean used Toyota Corolla', licence_number: null, registration_type: null, accessories: [], images: [], year: 2016, price: 78000.0, status: 'sold', image_url: '/images/div-auto.jpg', created_at: new Date().toISOString() },
];

const THREE_DIVISIONS = [
  {
    num: '01',
    title: 'Sales of Automobiles',
    tagline: 'Verified Imported Vehicles',
    desc: 'Clean pre-owned and brand-new cars (Salon cars, SUVs, Heavy Duty, etc.) with verified documentation.',
    href: '/automobiles',
    btnText: 'View Cars for Sale',
    accentColor: 'from-[#165b33] to-[#114b29]',
    borderColor: 'border-[#165b33]',
    badge: 'Car Sales',
    image: '/images/automobiles-hero.jpg',
  },
  {
    num: '02',
    title: 'Import & Supply of Materials',
    tagline: 'Wholesale & Retail Supplies',
    desc: 'Quality supply of Stationary, Photo Papers, Lamination Films, Inks, and Printing Hardwares.',
    href: '/materials',
    btnText: 'View Materials Catalogue',
    accentColor: 'from-[#165b33] to-[#114b29]',
    borderColor: 'border-[#165b33]',
    badge: 'Wholesale Supplies',
    image: '/images/materials-hero.jpg',
  },
  {
    num: '03',
    title: 'General Importations',
    tagline: 'Global Sourcing & Supply',
    desc: 'Reliable importation and supply of general merchandise and specialized goods on demand.',
    href: '/general-importations',
    btnText: 'Explore Import Services',
    accentColor: 'from-[#165b33] to-[#114b29]',
    borderColor: 'border-[#165b33]',
    badge: 'General Imports',
    image: '/images/imports-hero.jpg',
  },
];

export default function HomePage() {
  const [materials, setMaterials] = useState<Material[]>(DEMO_MATERIALS);
  const [cars, setCars] = useState<Car[]>(DEMO_CARS);

  useEffect(() => {
    async function loadData() {
      try {
        const matRes = await fetch('/api/materials').catch(() => null);
        if (matRes && matRes.ok) {
          const matData = await matRes.json();
          if (Array.isArray(matData) && matData.length > 0) {
            setMaterials(matData.slice(0, 6) as Material[]);
          }
        }

        const carRes = await fetch('/api/cars').catch(() => null);
        if (carRes && carRes.ok) {
          const carData = await carRes.json();
          if (Array.isArray(carData) && carData.length > 0) {
            setCars(carData.slice(0, 3) as Car[]);
          }
        }
      } catch (e) {
        console.error('Error loading home data:', e);
      }
    }
    loadData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* 1. HERO SECTION WITH USER UPLOADED PORT IMAGE AS BACKGROUND */}
      <section className="relative w-full bg-white pt-28 sm:pt-36 pb-20 overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-new.jpg"
            alt="Bengid Legacy Ghana Limited Port Operations"
            fill
            priority
            className="object-cover object-center opacity-100 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-[#f1f3f2]/50 to-[#f1f3f2]" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-14 bg-white/70 backdrop-blur-md px-6 py-10 sm:p-12 rounded-[2.5rem] shadow-xl border border-slate-200">
            <h1 className="text-5xl sm:text-7xl font-bold text-slate-900 mb-6 leading-tight max-w-3xl">
              Welcome to <br className="hidden sm:inline" />
              <span className="text-[#165b33]">
                Bengid Legacy Ghana Limited
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
              A diversified corporate enterprise operating 3 dedicated divisions: <strong>Sales of Automobiles</strong>, <strong>Import & Supply of Materials</strong>, and <strong>General Importations</strong>.
            </p>
          </div>

          {/* 3 DISTINCT DIVISION TILES (USING YOUR 3 SPECIFIC SUB DIVISION IMAGES) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {THREE_DIVISIONS.map((div) => (
              <Link
                key={div.num}
                href={div.href}
                className="group relative bg-white hover:bg-slate-100 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-200 group-hover:text-slate-600 transition-colors">
                      {div.num}
                    </span>
                    <span className="text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-full text-[#165b33] bg-[#eaf4ec]">
                      {div.badge}
                    </span>
                  </div>

                  <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6 shadow-sm border border-slate-200">
                    <Image src={div.image} alt={div.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
                  </div>

                  <span className="text-xs font-bold text-[#165b33] tracking-wider uppercase mb-1 block">
                    {div.tagline}
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 group-hover:text-[#165b33] transition-colors leading-snug mb-3">
                    {div.title}
                  </h2>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium mb-6">
                    {div.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-[#165b33]">
                  <span>{div.btnText}</span>
                  <span className="text-base group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 2. AUTOMOBILES HIGHLIGHT */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
            <div>
              <span className="text-xs font-bold text-[#165b33] uppercase tracking-widest mb-2 block">Division 01 • Automobiles</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Featured Vehicles for Sale</h2>
            </div>
            <Link href="/automobiles" className="text-xs font-bold text-[#165b33] uppercase tracking-wider hover:underline mt-4 sm:mt-0 flex items-center gap-1">
              Browse All Cars <span>&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. MATERIALS HIGHLIGHT */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
            <div>
              <span className="text-xs font-bold text-[#165b33] uppercase tracking-widest mb-2 block">Division 02 • Printing Materials</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Wholesale Printing Supplies</h2>
            </div>
            <Link href="/materials" className="text-xs font-bold text-[#165b33] uppercase tracking-wider hover:underline mt-4 sm:mt-0 flex items-center gap-1">
              Browse All Materials <span>&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((mat) => (
              <MaterialCard key={mat.id} material={mat} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
