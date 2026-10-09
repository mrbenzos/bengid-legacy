'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { HiArrowLeft, HiCheckCircle, HiPhoto, HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { Material } from '@/lib/types';
import MaterialCard from '@/components/ui/MaterialCard';

export default function MaterialDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const [material, setMaterial] = useState<Material | null>(null);
  const [relatedMaterials, setRelatedMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    async function fetchMaterial() {
      try {
        const res = await fetch(`/api/materials/${id}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        setMaterial(data);

        // fetch related
        const resAll = await fetch('/api/materials');
        if (resAll.ok) {
          const allData: Material[] = await resAll.json();
          const related = allData.filter(m => m.category === data.category && m.id !== data.id).slice(0, 3);
          setRelatedMaterials(related);
        }
      } catch (err) {
        // Never substitute made-up data: show "Product not found" instead.
        setMaterial(null);
      } finally {
        setLoading(false);
      }
    }
    fetchMaterial();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-6 md:p-12 animate-pulse">
        <div className="h-6 w-32 bg-slate-200 rounded mb-8"></div>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="h-96 bg-slate-200 rounded-3xl"></div>
          <div className="h-96 bg-slate-200 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  if (!material) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h1 className="text-3xl font-black text-slate-900 mb-4">Product not found</h1>
        <Link href="/materials" className="text-[#165b33] font-bold flex items-center gap-2 hover:underline">
          <HiArrowLeft /> ← Back to Materials
        </Link>
      </div>
    );
  }

  const sku = material.id;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '233205761698';
  const whatsappMsg = `Hello BENGID LEGACY, I would like to order ${material.name} (Ref: ${sku}). Please advise on availability and bulk pricing.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

  const allImages = [];
  if (material.image_url) allImages.push(material.image_url);
  if (material.images && material.images.length > 0) {
    material.images.forEach(img => {
      if (img.url && img.url !== material.image_url) {
        allImages.push(img.url);
      }
    });
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-28">
        <Link href="/materials" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 font-semibold transition-colors">
          <HiArrowLeft /> ← Back to Materials
        </Link>
        
        {/* TOP SECTION */}
        <div className="flex flex-col lg:flex-row gap-10 mb-16">
          {/* Left: Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 shadow-sm border border-slate-200 mb-4 group">
              {allImages.length > 0 ? (
                <>
                  <Image src={allImages[activeImageIdx]} alt={material.name} fill className="object-cover" />
                  {allImages.length > 1 && (
                    <>
                      <button onClick={() => setActiveImageIdx(prev => (prev === 0 ? allImages.length - 1 : prev - 1))} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-slate-50 rounded-full flex items-center justify-center text-slate-800 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                        <HiChevronLeft className="text-xl" />
                      </button>
                      <button onClick={() => setActiveImageIdx(prev => (prev === allImages.length - 1 ? 0 : prev + 1))} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-slate-50 rounded-full flex items-center justify-center text-slate-800 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                        <HiChevronRight className="text-xl" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                        {activeImageIdx + 1} / {allImages.length}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-slate-500 flex-col gap-2">
                  <HiPhoto className="text-6xl text-slate-600" />
                  <span className="font-semibold text-sm">No Image Available</span>
                </div>
              )}
            </div>
            
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${activeImageIdx === idx ? 'border-[#165b33] shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <Image src={img} alt={`${material.name} thumbnail ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Right: Details */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-3xl p-8 shadow-xl relative border border-slate-200 h-full flex flex-col">
              <div className="absolute top-6 right-6 bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-black tracking-widest border border-slate-200 uppercase">
                REF: {sku.slice(0, 8)}
              </div>
              
              <div className="flex gap-2 mb-4">
                <span className="inline-block px-3 py-1 bg-slate-50 text-slate-600 text-xs font-bold rounded-full uppercase tracking-wider">
                  {material.category}
                </span>
                {material.brand && (
                  <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider">
                    {material.brand}
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">{material.name}</h1>
              
              <div className="mb-6 flex items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold ${material.stock_status.toLowerCase().includes('in') ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  <div className={`w-2 h-2 rounded-full ${material.stock_status.toLowerCase().includes('in') ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                  {material.stock_status}
                </span>
                {material.color && (
                  <span className="text-sm font-semibold text-slate-500 flex items-center gap-2">
                    <span className="w-1 h-4 bg-slate-300 rounded-full"></span> Color: {material.color}
                  </span>
                )}
              </div>
              
              <div className="mb-8 flex items-end gap-2 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="text-4xl font-black text-[#165b33]">
                  GHS {Number(material.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
                <span className="text-slate-500 font-bold mb-1 tracking-wide">/ {material.unit}</span>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-black text-slate-900 mb-3">Product Overview</h3>
                <p className="text-slate-600 leading-relaxed mb-8">
                  {material.overview || `High-quality ${material.category.toLowerCase()} perfect for commercial printing and professional use. Guaranteed best quality in the market.`}
                </p>
                
                {material.features && material.features.length > 0 && (
                  <>
                    <h3 className="text-lg font-black text-slate-900 mb-4">Key Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {material.features.map(feat => (
                        <div key={feat} className="flex items-center gap-2 text-slate-600 font-semibold text-sm">
                          <HiCheckCircle className="text-[#165b33] text-lg flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              <div className="pt-6 border-t border-slate-200 mt-auto">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-[#165b33] hover:bg-[#124b2a] text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  <IoLogoWhatsapp className="text-2xl" /> Request Quote via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* BOTTOM SECTION */}
        {relatedMaterials.length > 0 && (
          <div className="pt-10 border-t border-slate-200">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Similar Materials</h2>
                <p className="text-slate-500 font-medium text-sm mt-1">Other products in the {material.category} category</p>
              </div>
              <Link href="/materials" className="text-[#165b33] font-bold text-sm hover:underline hidden sm:block">
                View All Materials →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedMaterials.map(m => (
                <MaterialCard key={m.id} material={m} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
