'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { HiArrowRight, HiMagnifyingGlass } from 'react-icons/hi2';
import MaterialCard from '@/components/ui/MaterialCard';
import { Material } from '@/lib/types';

const CATEGORIES = [
  { name: 'Photo Papers', image: '/images/categories/photo-papers.jpg', desc: 'High-Gloss & Matte Professional RC Photo Papers' },
  { name: 'Lamination Films', image: '/images/categories/lamination-films.jpg', desc: 'Thermal & Cold Protective Roll Laminates (Gloss/Matte)' },
  { name: 'Inks & Toners', image: '/images/categories/inks-toners.jpg', desc: 'Eco-Solvent, Sublimation & Pigment Printing Inks' },
  { name: 'Stationery & Cutters', image: '/images/categories/stationery-cutters.jpg', desc: 'Heavy-Duty Cutters, Binding Equipment & Consumables' },
];

const BRAND_LOGOS = ['EPSON COMPATIBLE', 'CANON DIGITAL', 'ROLAND DG INKS', 'HP INDUSTRIAL', 'BENGID PRINTING'];

const DEFAULT_MATERIALS: Material[] = [
  { id: '1', sku: 'BGL-MAT-001', name: 'Premium High-Gloss RC Photo Paper (A4 / 260gsm)', category: 'Photo Papers', brand: 'Epson Compatible', color: 'White', overview: 'High quality premium photo paper for brilliant, long-lasting prints.', features: ['High Gloss', 'Water Resistant', 'Fast Drying'], images: [], price: 350.0, unit: 'per pack (100 sheets)', stock_status: 'in_stock', image_url: '/images/categories/photo-papers.jpg', created_at: new Date().toISOString() },
  { id: '2', sku: 'BGL-MAT-002', name: 'Thermal Lamination Roll — Gloss (320mm x 50m)', category: 'Lamination Films', brand: 'Generic', color: 'Transparent', overview: 'Durable thermal lamination rolls for protecting documents and prints.', features: ['Gloss Finish', 'Matte Finish Available', 'Anti-Scratch'], images: [], price: 450.0, unit: 'per roll (50m)', stock_status: 'in_stock', image_url: '/images/categories/lamination-films.jpg', created_at: new Date().toISOString() },
  { id: '3', sku: 'BGL-MAT-003', name: 'Eco-Solvent Printing Ink — CMYK Set (1 Liter)', category: 'Inks & Toners', brand: 'EcoColor', color: 'CMYK', overview: 'Vibrant eco-solvent inks designed for high-resolution wide format printers.', features: ['Eco-Friendly', 'UV Resistant', 'Non-Clogging'], images: [], price: 320.0, unit: 'per bottle (1000ml)', stock_status: 'in_stock', image_url: '/images/categories/inks-toners.jpg', created_at: new Date().toISOString() },
  { id: '4', sku: 'BGL-MAT-004', name: 'PVC Frontlit Flex Banner — 440gsm (High Tensile)', category: 'Flex', brand: 'FlexMaster', color: 'White', overview: 'Heavy duty frontlit flex banner material for outdoor billboards and signage.', features: ['Tear Resistant', 'Weatherproof', 'Smooth Surface'], images: [], price: 1200.0, unit: 'per roll (50m)', stock_status: 'in_stock', image_url: null, created_at: new Date().toISOString() },
  { id: '5', sku: 'BGL-MAT-005', name: 'Self-Adhesive Vinyl Sticker Roll — White Gloss', category: 'Vinyl', brand: 'VinylPro', color: 'White', overview: 'Premium self-adhesive vinyl for custom vehicle wraps and window graphics.', features: ['Strong Adhesion', 'Easy Peel', 'Bubble-Free Application'], images: [], price: 850.0, unit: 'per roll (50m)', stock_status: 'in_stock', image_url: null, created_at: new Date().toISOString() },
  { id: '6', sku: 'BGL-MAT-006', name: 'One-Way Vision Perforated Window Film', category: 'One-Way-Vision', brand: 'ClearView', color: 'White/Black', overview: 'Perforated window film that allows graphics on one side and clear visibility on the other.', features: ['High Definition Print', 'Removable Glue', 'Privacy Enhancing'], images: [], price: 950.0, unit: 'per roll (50m)', stock_status: 'in_stock', image_url: null, created_at: new Date().toISOString() },
];

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
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
        setMaterials(DEFAULT_MATERIALS);
      } catch (err) {
        console.error('Error fetching materials:', err);
        setMaterials(DEFAULT_MATERIALS);
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
    <div className="min-h-screen bg-white text-slate-900">
      {/* 1. CINEMATIC HERO SECTION WITH USER UPLOADED PRINTING MACHINERY IMAGE */}
      <section className="relative w-full min-h-[90vh] bg-white flex flex-col justify-between overflow-hidden pt-28 pb-12">
        {/* Full-bleed background image using User Uploaded Printing Supplies Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/materials-hero.jpg"
            alt="BENGID LEGACY GHANA LIMITED Printing Supplies Collection"
            fill
            className="object-cover object-center opacity-65 scale-105 transition-transform duration-1000"
            priority
          />
          {/* Mood overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-white/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            
            {/* Left Column: GIANT HEADLINE + FLOATING BADGE */}
            <div className="lg:col-span-8">


              <h1 className="text-5xl sm:text-7xl font-bold text-slate-900 mb-6 leading-tight max-w-3xl">
                PREMIUM PRINT SUPPLIES,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#165b33] to-[#22c55e]">
                  UNMATCHED QUALITY.
                </span>
              </h1>

              {/* Floating Stat Badge */}
              <div className="inline-flex items-center gap-4 p-4 rounded-xl bg-white/90 border border-slate-200 backdrop-blur-md shadow-xl max-w-md">
                <div>
                  <div className="text-xl font-black text-slate-900 tracking-tight">10,000+ Packs & Rolls Delivered</div>
                  <div className="text-xs text-slate-600 font-medium">Wholesale photo papers, lamination films & inks across Ghana</div>
                </div>
              </div>
            </div>

            {/* Right Column: DESCRIPTION + DUAL ACTION BUTTONS */}
            <div className="lg:col-span-4 space-y-6">
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal bg-white/80 p-5 rounded-xl border border-slate-200 backdrop-blur-sm">
                BENGID LEGACY GHANA LIMITED delivers verified high-gloss photo papers, thermal lamination films, eco-solvent inks, and binding consumables with direct dispatch from Kumasi.
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="https://wa.me/233205761698?text=Hello%20Bengid%20Legacy%20Ghana%20Limited,%20I%20want%20to%20order%20printing%20materials."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-4 bg-[#165b33] hover:bg-[#114b29] text-white font-bold text-sm tracking-wide uppercase rounded-full flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-emerald-900/40"
                >
                  <IoLogoWhatsapp className="text-lg" /> Order Materials <HiArrowRight />
                </a>
                <a
                  href="#catalog"
                  className="px-6 py-4 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 shadow-sm font-bold text-sm tracking-wide uppercase rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
                >
                  View Catalog
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* TRUSTED BRANDS TICKER BAR AT BOTTOM OF HERO */}
        <div className="relative z-10 border-t border-slate-200 bg-white/80 backdrop-blur-md py-4 mt-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest flex-shrink-0">
              TRUSTED BRANDS & SUPPLIERS
            </span>
            <div className="flex flex-wrap items-center gap-8 md:gap-12 opacity-80">
              {BRAND_LOGOS.map((brand, idx) => (
                <span key={idx} className="font-extrabold text-sm tracking-widest text-slate-600 hover:text-slate-900 transition-colors">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & FILTER TOOLBAR */}
      <section id="catalog" className="py-8 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xl flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-slate-200">
              <HiMagnifyingGlass className="text-xl text-slate-500 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search supplies by name or SKU (e.g. Photo Paper, Ink, A4)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-slate-900 outline-none placeholder:text-slate-500"
              />
            </div>
            
            <div className="w-full md:w-64 bg-white px-4 py-3 rounded-xl border border-slate-200">
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-slate-900 outline-none cursor-pointer"
              >
                <option value="All" >All Categories</option>
                <option value="Photo Papers" >Photo Papers</option>
                <option value="Lamination Films" >Lamination Films</option>
                <option value="Inks & Toners" >Inks & Toners</option>
                <option value="Stationery & Cutters" >Stationery & Cutters</option>
              </select>
            </div>

            {activeCategory !== 'All' && (
              <button
                onClick={() => setActiveCategory('All')}
                className="px-4 py-3 text-xs font-bold text-[#165b33] hover:text-[#114b29] underline whitespace-nowrap"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. MATERIAL CATEGORY GRAPHICAL CARDS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono font-bold text-[#165b33] uppercase tracking-widest block mb-2">PRODUCT LINEUP</span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight uppercase">Material Categories</h2>
            </div>
            <p className="text-slate-500 text-sm font-medium max-w-md mt-4 md:mt-0">
              BENGID LEGACY GHANA LIMITED — Verified printing consumables for commercial print shops and studios.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat, idx) => (
              <div 
                key={idx} 
                onClick={() => handleCategorySelect(cat.name)}
                className="group relative h-[420px] w-full rounded-2xl overflow-hidden cursor-pointer border border-slate-200 hover:border-[#165b33] transition-all duration-500 shadow-md hover:shadow-xl"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute top-6 left-6 right-6">
                  <span className="text-[10px] font-mono font-bold text-[#165b33] uppercase tracking-widest bg-white/90 text-slate-900 backdrop-blur-md px-2.5 py-1 rounded border border-slate-200">
                    LINE 0{idx + 1}
                  </span>
                  <h3 className="text-2xl font-bold text-white leading-tight mt-4 group-hover:text-[#86efac] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-200 font-medium mt-2 line-clamp-3">{cat.desc}</p>
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between border-t border-white/40 pt-4">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Explore Supplies</span>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:bg-[#165b33] transition-colors">
                    <HiArrowRight className="text-lg text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MATERIAL INVENTORY CATALOG */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#165b33] uppercase tracking-widest block mb-1">AVAILABLE IN KUMASI</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
                Supplies Catalog {activeCategory !== 'All' ? `- ${activeCategory}` : ''}
              </h2>
            </div>
            <a
              href="https://wa.me/233205761698?text=Hello%20Bengid%20Legacy%20Ghana%20Limited,%20I%20want%20to%20place%20a%20bulk%20materials%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#165b33] hover:bg-[#114b29] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-lg"
            >
              <IoLogoWhatsapp className="text-base" /> Bulk WhatsApp Quote
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-slate-200 rounded-xl h-80 animate-pulse border border-slate-300 p-4" />
                ))
              : filteredMaterials.map((mat) => (
                  <MaterialCard key={mat.id} material={mat} />
                ))}
          </div>
        </div>
      </section>

    </div>
  );
}
