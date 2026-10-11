'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { HiArrowLeft, HiCheckCircle, HiPhoto, HiChevronLeft, HiChevronRight, HiPrinter, HiMapPin, HiPhone } from 'react-icons/hi2';
import { Material } from '@/lib/types';
import MaterialCard from '@/components/ui/MaterialCard';
import { INITIAL_MATERIALS } from '@/lib/initialData';

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

        // Fetch related printing materials
        const resAll = await fetch('/api/materials');
        if (resAll.ok) {
          const allData: Material[] = await resAll.json();
          const related = allData.filter(m => m.category === data.category && m.id !== data.id).slice(0, 3);
          setRelatedMaterials(related);
        }
      } catch (err) {
        // Fallback to local catalog if matching
        const found = INITIAL_MATERIALS.find(m => m.id === id || m.sku === id);
        if (found) {
          setMaterial(found);
          setRelatedMaterials(INITIAL_MATERIALS.filter(m => m.id !== found.id).slice(0, 3));
        } else {
          setMaterial(null);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchMaterial();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] p-6 md:p-12 animate-pulse pt-32">
        <div className="h-6 w-48 bg-[#111827] rounded mb-8"></div>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="h-96 bg-[#111827] rounded-3xl"></div>
          <div className="h-96 bg-[#111827] rounded-3xl"></div>
        </div>
      </div>
    );
  }

  if (!material) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B0F19] text-white px-4">
        <HiPrinter className="text-6xl text-[#4B6F23] mb-4" />
        <h1 className="text-3xl font-black mb-3">Printing Material Not Found</h1>
        <p className="text-[#9CA3AF] mb-8 text-sm">The requested printing consumable is not listed or has been removed.</p>
        <Link 
          href="/materials" 
          className="px-6 py-3 rounded-full bg-[#4B6F23] hover:bg-[#556B2F] text-white font-bold flex items-center gap-2 transition-all shadow-lg text-sm"
        >
          <HiArrowLeft /> ← Back to Printing Materials
        </Link>
      </div>
    );
  }

  const sku = material.sku || `BGL-MAT-${material.id.slice(0, 4).toUpperCase()}`;
  // Exclusively hardcoded official WhatsApp line: 0205761698 (+233205761698)
  const whatsappNumber = '233205761698';
  const whatsappMsg = `Hello BENGID LEGACY,\n\nI am inquiring about the following Printing Material:\n- Product: ${material.name}\n- Ref: ${sku}\n- Category: ${material.category}\n- Price: GHS ${material.price.toFixed(2)} (${material.unit})\n\nPlease advise on stock availability at Santase Tech Station, Kumasi.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

  const allImages: string[] = [];
  if (material.image_url) allImages.push(material.image_url);
  if (material.images && material.images.length > 0) {
    material.images.forEach(img => {
      if (img.url && !allImages.includes(img.url)) {
        allImages.push(img.url);
      }
    });
  }
  if (allImages.length === 0) {
    allImages.push('https://images.unsplash.com/photo-1588696879815-585a21b3e7bc?q=80&w=800&auto=format&fit=crop');
  }

  const inStock = material.stock_status === 'in_stock';

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32">
        
        {/* Breadcrumb Navigation */}
        <Link 
          href="/materials" 
          className="inline-flex items-center gap-2 text-[#9CA3AF] hover:text-white mb-8 font-semibold text-sm transition-colors"
        >
          <HiArrowLeft /> ← Back to Printing Materials
        </Link>
        
        {/* TOP SECTION: Media Gallery & Product Specifications */}
        <div className="flex flex-col lg:flex-row gap-10 mb-20 bg-[#111827] rounded-3xl p-6 sm:p-10 border border-[#2D3748] shadow-2xl">
          {/* Left: Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#0B0F19] shadow-lg border border-[#2D3748] mb-4 group">
              <Image 
                src={allImages[activeImageIdx] || allImages[0]} 
                alt={material.name} 
                fill 
                className="object-cover" 
                priority
              />
              {allImages.length > 1 && (
                <>
                  <button 
                    onClick={() => setActiveImageIdx(prev => (prev === 0 ? allImages.length - 1 : prev - 1))}
                    aria-label="Previous Image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-all border border-white/20"
                  >
                    <HiChevronLeft className="text-xl" />
                  </button>
                  <button 
                    onClick={() => setActiveImageIdx(prev => (prev === allImages.length - 1 ? 0 : prev + 1))}
                    aria-label="Next Image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-all border border-white/20"
                  >
                    <HiChevronRight className="text-xl" />
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
                    className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImageIdx === idx ? 'border-[#4B6F23] scale-105' : 'border-[#2D3748] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Detail Card */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#0B0F19] text-[#86efac] border border-[#2D3748]">
                  {material.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
                  inStock 
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40' 
                    : 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                }`}>
                  {inStock ? '● In Stock' : '○ Out of Stock'}
                </span>
                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold text-[#9CA3AF] bg-[#0B0F19] border border-[#2D3748]">
                  {sku}
                </span>
              </div>

              {/* Title & Brand */}
              <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-2">
                {material.name}
              </h1>
              {material.brand && (
                <p className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider mb-6">
                  Brand: <span className="text-white">{material.brand}</span>
                </p>
              )}

              {/* Pricing Box */}
              <div className="bg-[#0B0F19] p-5 rounded-2xl border border-[#2D3748] mb-6">
                <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider block mb-1">
                  Wholesale Price (Ghana Cedis)
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-white">
                    GHS {material.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-sm font-semibold text-[#86efac]">
                    / {material.unit}
                  </span>
                </div>
              </div>

              {/* Overview */}
              {material.overview && (
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Product Overview</h3>
                  <p className="text-sm text-[#E5E7EB] leading-relaxed font-normal">
                    {material.overview}
                  </p>
                </div>
              )}

              {/* Features Checklist */}
              {material.features && material.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Key Performance Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {material.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#E5E7EB] font-medium bg-[#0B0F19] px-3 py-2 rounded-xl border border-[#2D3748]">
                        <HiCheckCircle className="text-[#86efac] text-base flex-shrink-0" />
                        <span>{feat}</span>
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
                <span>Order via WhatsApp (0205761698)</span>
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
                <span>Warehouse Location: Santase Tech Station, Kumasi, Ghana</span>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRINTING MATERIALS */}
        {relatedMaterials.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-white">Other Printing Materials You May Need</h2>
              <Link href="/materials" className="text-xs font-bold text-[#86efac] hover:underline">
                View Full Catalogue →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedMaterials.map((rel) => (
                <MaterialCard key={rel.id} material={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
