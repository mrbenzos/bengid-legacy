'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { HiArrowRight, HiMagnifyingGlass, HiPrinter } from 'react-icons/hi2';
import MaterialCard from '@/components/ui/MaterialCard';
import { Material } from '@/lib/types';
import { INITIAL_MATERIALS } from '@/lib/initialData';

const OFFICIAL_CATEGORIES = [
  'Inks',
  'Stationary',
  'Photo Papers',
  'Lamination Films',
  'Hardwares',
  'Delivery Service',
];

const CATEGORIES = [
  { 
    name: 'Inks', 
    image: '/images/categories/inks-toners.jpg', 
    desc: 'Eco-Solvent, Sublimation, Pigment & Large Format Inks' 
  },
  { 
    name: 'Stationary', 
    image: '/images/categories/stationery-cutters.jpg', 
    desc: 'Heavy-Duty Rotary Trimmers, Precision Cutters & Studio Supplies' 
  },
  { 
    name: 'Photo Papers', 
    image: '/images/categories/photo-papers.jpg', 
    desc: 'High-Gloss & Matte Professional Resin-Coated Photo Papers' 
  },
  { 
    name: 'Lamination Films', 
    image: '/images/categories/lamination-films.jpg', 
    desc: 'Thermal & Cold Protective Laminate Roll Films (Gloss / Matte)' 
  },
  { 
    name: 'Hardwares', 
    image: '/images/categories/heavy-machinery.jpg', 
    desc: 'Heat Press Machines, Cutters, Plotters & Commercial Hardwares' 
  },
  { 
    name: 'Delivery Service', 
    image: '/images/warehouse-logistics.jpg', 
    desc: 'Express Doorstep Delivery & Freight Dispatch Across Ghana' 
  },
];

export default function PrintingMaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>(INITIAL_MATERIALS);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchMaterials() {
      try {
        const res = await fetch('/api/materials');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setMaterials(data as Material[]);
            setLoading(false);
            return;
          }
        }
        setMaterials(INITIAL_MATERIALS);
      } catch (err) {
        console.error('Error fetching printing materials:', err);
        setMaterials(INITIAL_MATERIALS);
      } finally {
        setLoading(false);
      }
    }
    fetchMaterials();
  }, []);

  const filteredMaterials = useMemo(() => {
    return materials.filter((mat) => {
      let matchesCategory = true;
      if (activeCategory !== 'All') {
        if (activeCategory === 'Other') {
          // Dynamic category match: any product not belonging to the 6 official standard categories
          matchesCategory = !OFFICIAL_CATEGORIES.some(
            c => c.toLowerCase() === (mat.category || '').toLowerCase()
          );
        } else {
          matchesCategory = (mat.category || '').toLowerCase() === activeCategory.toLowerCase();
        }
      }
      const matchesSearch = !searchQuery || 
        (mat.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
        (Boolean(mat.sku) && (mat.sku as string).toLowerCase().includes(searchQuery.toLowerCase())) ||
        (Boolean(mat.category) && (mat.category as string).toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [materials, activeCategory, searchQuery]);

  const handleCategorySelect = (catName: string) => {
    setActiveCategory(catName);
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827]">
      {/* 1. HERO SECTION WITH LIGHT OVERLAY */}
      <section className="relative w-full pt-28 sm:pt-36 pb-16 overflow-hidden border-b border-gray-200">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/materials-hero.jpg"
            alt="BENGID LEGACY GHANA LIMITED Printing Materials Collection"
            fill
            className="object-cover object-center scale-105 transition-transform duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-[#f1f3f2]/40 to-[#F9FAFB]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl bg-white/70 backdrop-blur-md p-8 sm:p-12 rounded-[2.5rem] shadow-xl border border-white/70 mb-10">
            <span className="text-xs font-mono font-bold text-[#4B6F23] uppercase tracking-widest block mb-2">
              DIVISION 01 • WHOLESALE &amp; RETAIL SUPPLIES
            </span>

            <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-5 leading-tight tracking-tight">
              Premium Printing Materials,<br />
              <span className="text-[#4B6F23]">
                Unmatched Reliability.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-700 max-w-2xl leading-relaxed font-normal mb-8">
              BENGID LEGACY GHANA LIMITED delivers verified high-gloss photo papers, thermal lamination films, eco-solvent inks, and binding consumables with direct dispatch from Santase Tech Station, Kumasi across Ghana.
            </p>

            {/* Dual Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5">
              <a
                href="#catalog"
                className="px-8 py-3.5 bg-[#4B6F23] hover:bg-[#3D5A1C] text-white rounded-full font-bold text-sm tracking-wide transition-all shadow-[0_4px_16px_rgba(75,111,35,0.3)] flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <span>Browse Printing Materials Catalogue</span>
                <HiArrowRight className="text-sm" />
              </a>
              <a
                href="https://wa.me/233205761698?text=Hello%20BENGID%20LEGACY,%20I%20want%20to%20place%20an%20order%20for%20printing%20materials."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <IoLogoWhatsapp className="text-lg" />
                <span>Bulk Order WhatsApp (0205761698)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Category Ticker Bar */}
        <div className="relative z-10 border-t border-gray-200 bg-white/80 backdrop-blur-md py-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs font-mono font-bold text-gray-600 uppercase tracking-widest flex-shrink-0">
              OFFICIAL PRINTING MATERIAL CATEGORIES
            </span>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {OFFICIAL_CATEGORIES.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCategorySelect(cat)}
                  className="text-xs font-bold text-gray-700 hover:text-[#4B6F23] transition-colors cursor-pointer"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. VISUAL CATEGORIES SHOWCASE */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono font-bold text-[#4B6F23] uppercase tracking-widest block mb-1">
              PRINT MEDIA INVENTORY
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Printing Material Categories
            </h2>
            <p className="text-gray-600 text-sm mt-2 font-normal">
              Direct factory imports for commercial print shops, photography studios, and large format advertising agencies across Ghana.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => handleCategorySelect(cat.name)}
                className="group relative h-56 rounded-3xl overflow-hidden cursor-pointer border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#A3E635] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-200 font-medium line-clamp-2">{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PRINTING MATERIALS CATALOG & SEARCH BAR */}
      <section id="catalog" className="py-20 bg-[#F9FAFB]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header & Search */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 mb-12 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                  Printing Materials Catalogue
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Showing {filteredMaterials.length} items in stock at Santase Tech Station warehouse
                </p>
              </div>

              {/* Search input & Category Dropdown Filter */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                <div className="relative w-full sm:w-72 lg:w-80">
                  <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    placeholder="Search printing materials by name or SKU..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-full border border-gray-300 focus:border-[#4B6F23] focus:bg-white text-sm text-gray-900 placeholder-gray-400 outline-none transition-all shadow-inner"
                  />
                </div>

                {/* Frontend Category Dropdown Filter */}
                <div className="relative sm:w-56">
                  <select
                    id="frontend-category-filter"
                    aria-label="Filter by category"
                    value={activeCategory}
                    onChange={(e) => setActiveCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 rounded-full border border-gray-300 focus:border-[#4B6F23] focus:bg-white text-xs sm:text-sm font-semibold text-gray-800 outline-none transition-all cursor-pointer shadow-inner appearance-none pr-10"
                  >
                    <option value="All">All Categories</option>
                    {OFFICIAL_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    <option value="Other">Other (Custom)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-100">
              {['All', ...OFFICIAL_CATEGORIES, 'Other'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-[#4B6F23] text-white shadow-md border border-[#4B6F23]'
                      : 'bg-white hover:bg-gray-100 text-gray-700 hover:text-gray-950 border border-gray-200 shadow-2xs'
                  }`}
                >
                  {cat === 'Other' ? 'Other (Custom)' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="py-20 text-center text-gray-500 font-bold">Loading printing materials...</div>
          ) : filteredMaterials.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-3xl border border-gray-200 p-12 shadow-sm">
              <HiPrinter className="text-5xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">No printing materials found</h3>
              <p className="text-sm text-gray-500 mb-6">Try adjusting your search query or category filter.</p>
              <button
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                className="px-6 py-2.5 rounded-full bg-[#4B6F23] text-white text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMaterials.map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))}
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
