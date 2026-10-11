'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { HiArrowRight, HiMagnifyingGlass, HiPrinter } from 'react-icons/hi2';
import MaterialCard from '@/components/ui/MaterialCard';
import { Material } from '@/lib/types';
import { INITIAL_MATERIALS } from '@/lib/initialData';

const CATEGORIES = [
  { name: 'Photo Papers', image: 'https://images.unsplash.com/photo-1588696879815-585a21b3e7bc?q=80&w=800&auto=format&fit=crop', desc: 'High-Gloss & Matte Professional RC Photo Papers' },
  { name: 'Lamination Films', image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=800&auto=format&fit=crop', desc: 'Thermal & Cold Protective Roll Laminates (Gloss/Matte)' },
  { name: 'Inks & Toners', image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=800&auto=format&fit=crop', desc: 'Eco-Solvent, Sublimation & Pigment Printing Inks' },
  { name: 'Flex & Banner Media', image: 'https://images.unsplash.com/photo-1621360841013-c76831f1dbce?q=80&w=800&auto=format&fit=crop', desc: 'Heavy-Duty 440gsm Frontlit & Backlit Billboard Flex' },
  { name: 'Vinyl Stickers', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop', desc: 'Self-Adhesive Polymeric & Monomeric Vinyl Rolls' },
  { name: 'One-Way-Vision', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop', desc: 'Micro-Perforated Architectural & Vehicle Window Film' },
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
      const matchesCategory = activeCategory === 'All' || mat.category?.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch = !searchQuery || mat.name.toLowerCase().includes(searchQuery.toLowerCase()) || (Boolean(mat.sku) && (mat.sku as string).toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [materials, activeCategory, searchQuery]);

  const handleCategorySelect = (catName: string) => {
    setActiveCategory(catName);
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative w-full min-h-[85vh] flex flex-col justify-between overflow-hidden pt-28 pb-16 border-b border-[#1F2937]">
        {/* Full-bleed background image with dark mood overlays */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/materials-hero.jpg"
            alt="BENGID LEGACY GHANA LIMITED Printing Materials Collection"
            fill
            className="object-cover object-center opacity-40 scale-105 transition-transform duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/80 to-[#0B0F19]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/60 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 my-auto">
          <div className="max-w-4xl">
            {/* Note: Floating green-outlined badge purged completely */}
            
            <span className="text-xs font-mono font-bold text-[#86efac] uppercase tracking-widest block mb-3">
              DIVISION 01 • WHOLESALE &amp; RETAIL SUPPLIES
            </span>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              PREMIUM PRINTING MATERIALS,<br />
              <span className="text-[#4B6F23] drop-shadow-md">
                UNMATCHED RELIABILITY.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#F3F4F6] max-w-2xl leading-relaxed font-normal mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              BENGID LEGACY GHANA LIMITED delivers verified high-gloss photo papers, thermal lamination films, eco-solvent inks, and binding consumables with direct dispatch from Santase Tech Station, Kumasi across Ghana.
            </p>

            {/* Dual Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#catalog"
                className="px-8 py-4 bg-[#4B6F23] hover:bg-[#556B2F] text-white rounded-full font-bold text-sm tracking-wide transition-all shadow-[0_6px_25px_rgba(75,111,35,0.4)] flex items-center justify-center gap-2 border border-[#4B6F23]/60 hover:-translate-y-0.5"
              >
                <span>Browse Printing Materials</span>
                <HiArrowRight className="text-sm" />
              </a>
              <a
                href="https://wa.me/233205761698?text=Hello%20BENGID%20LEGACY,%20I%20want%20to%20place%20an%20order%20for%20printing%20materials."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <IoLogoWhatsapp className="text-lg" />
                <span>Bulk Order WhatsApp (0205761698)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Category Ticker Bar */}
        <div className="relative z-10 border-t border-[#1F2937] bg-[#111827]/80 backdrop-blur-xl py-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs font-mono font-bold text-[#9CA3AF] uppercase tracking-widest flex-shrink-0">
              FEATURED PRINTING MATERIAL CATEGORIES
            </span>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {['Photo Papers', 'Lamination Films', 'Inks & Toners', 'Flex Banners', 'Vinyl Stickers'].map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCategorySelect(cat)}
                  className="text-xs font-bold text-[#E5E7EB] hover:text-[#86efac] transition-colors cursor-pointer"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. VISUAL CATEGORIES SHOWCASE */}
      <section className="py-20 bg-[#0B0F19] border-b border-[#1F2937]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono font-bold text-[#4B6F23] uppercase tracking-widest block mb-2">
              PRINT MEDIA INVENTORY
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Printing Material Categories
            </h2>
            <p className="text-[#9CA3AF] text-sm mt-3 font-normal">
              Direct factory imports for commercial print shops, photography studios, and large format advertising agencies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => handleCategorySelect(cat.name)}
                className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer border border-[#2D3748] hover:border-[#4B6F23] transition-all duration-500 shadow-xl"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#86efac] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#9CA3AF] font-medium line-clamp-2">{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PRINTING MATERIALS CATALOG & SEARCH BAR */}
      <section id="catalog" className="py-20 bg-[#0B0F19]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header & Search */}
          <div className="bg-[#111827] rounded-3xl p-6 sm:p-8 border border-[#2D3748] mb-12 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Printing Materials Catalogue
                </h2>
                <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
                  Showing {filteredMaterials.length} items in stock at Kumasi warehouse
                </p>
              </div>

              {/* Search input */}
              <div className="relative w-full lg:w-96">
                <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                <input
                  type="text"
                  placeholder="Search printing materials by name or SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#0B0F19] rounded-full border border-[#2D3748] focus:border-[#4B6F23] text-sm text-white placeholder-slate-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-[#1F2937]">
              {['All', 'Photo Papers', 'Lamination Films', 'Inks & Toners', 'Flex', 'Vinyl', 'One-Way-Vision'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-[#4B6F23] text-white shadow-md border border-[#4B6F23]'
                      : 'bg-[#1F2937] text-[#9CA3AF] hover:text-white hover:bg-[#2D3748] border border-transparent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="py-20 text-center text-[#9CA3AF] font-bold">Loading printing materials...</div>
          ) : filteredMaterials.length === 0 ? (
            <div className="py-20 text-center bg-[#111827] rounded-3xl border border-[#2D3748] p-12">
              <HiPrinter className="text-5xl text-[#9CA3AF] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No printing materials found</h3>
              <p className="text-sm text-[#9CA3AF] mb-6">Try adjusting your search query or category filter.</p>
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
