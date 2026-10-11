'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { HiEye, HiArrowRight, HiSparkles } from 'react-icons/hi2';
import { Material } from '@/lib/types';

interface MaterialCardProps {
  material: Material;
}

const CATEGORY_DEFAULT_IMAGES: Record<string, string> = {
  'Photo Papers': 'https://images.unsplash.com/photo-1588696879815-585a21b3e7bc?q=80&w=800&auto=format&fit=crop',
  'Photo Paper': 'https://images.unsplash.com/photo-1588696879815-585a21b3e7bc?q=80&w=800&auto=format&fit=crop',
  'Lamination Films': 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=800&auto=format&fit=crop',
  'Lamination': 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=800&auto=format&fit=crop',
  'Inks & Toners': 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=800&auto=format&fit=crop',
  'Inks': 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=800&auto=format&fit=crop',
  'Flex': 'https://images.unsplash.com/photo-1621360841013-c76831f1dbce?q=80&w=800&auto=format&fit=crop',
  'Vinyl': 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop',
  'One-Way-Vision': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
};

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1588696879815-585a21b3e7bc?q=80&w=800&auto=format&fit=crop';

export default function MaterialCard({ material }: MaterialCardProps) {
  const [qty, setQty] = useState(1);

  // Exclusively hardcoded official WhatsApp line: 0205761698 (+233205761698)
  const whatsappNumber = '233205761698';
  const inStock = material.stock_status === 'in_stock';
  const displayImage = material.image_url || CATEGORY_DEFAULT_IMAGES[material.category] || DEFAULT_IMAGE;
  const sku = material.sku || `BGL-MAT-${material.id.slice(0, 4).toUpperCase()}`;

  const totalPrice = material.price * qty;

  const message = encodeURIComponent(
    `Hello BENGID LEGACY,\n\nI would like to order the following Printing Material:\n- Product: ${material.name}\n- Ref: ${sku}\n- Quantity: ${qty} ${material.unit}\n- Total: GHS ${totalPrice.toFixed(2)}\n\nPlease confirm availability and delivery.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="group relative bg-[#111827]/90 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_40px_rgba(75,111,35,0.25)] transition-all duration-300 flex flex-col h-full overflow-hidden border border-[#2D3748] hover:border-[#4B6F23] hover:-translate-y-1.5">

      {/* Media & Dynamic Parametric Route Trigger */}
      <Link 
        href={`/materials/${material.id}`} 
        className="relative h-60 w-full bg-[#0B0F19] overflow-hidden flex-shrink-0 block cursor-pointer"
        aria-label={`View full specifications for ${material.name}`}
      >
        <Image
          src={displayImage}
          alt={`${material.name} — ${material.category} Printing Material`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-black/30 pointer-events-none" />

        {/* Hover Inspect Glass Badge */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
          <span className="bg-white/95 text-slate-900 px-4 py-2 rounded-full font-bold text-xs shadow-xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <HiEye className="text-base text-[#4B6F23]" />
            View Specifications
          </span>
        </div>

        {/* Category Pill Badge */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#0B0F19]/80 text-[#86efac] border border-[#2D3748] shadow-md backdrop-blur-md">
            {material.category}
          </span>
        </div>

        {/* Stock Status Badge */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <div className={`px-3 py-1 rounded-full backdrop-blur-md shadow-md text-white text-[10px] font-black uppercase tracking-wider border ${
            inStock 
              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40' 
              : 'bg-rose-950/80 text-rose-300 border-rose-500/40'
          }`}>
            {inStock ? '● In Stock' : '○ Out of Stock'}
          </div>
        </div>

        {/* SKU Ref bottom left */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="text-[10px] font-mono font-bold text-slate-300 bg-black/70 px-2 py-0.5 rounded border border-white/10">
            {sku}
          </span>
        </div>

        {/* Unit badge bottom right */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="text-[10px] font-bold text-white bg-[#4B6F23]/80 px-2.5 py-0.5 rounded-full border border-white/10 backdrop-blur-xs">
            {material.unit}
          </span>
        </div>
      </Link>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow bg-[#111827]">
        <Link href={`/materials/${material.id}`}>
          <h3 className="font-bold text-base text-white mb-2 line-clamp-2 leading-snug group-hover:text-[#86efac] transition-colors cursor-pointer">
            {material.name}
          </h3>
        </Link>

        {material.overview && (
          <p className="text-xs text-[#9CA3AF] line-clamp-2 mb-4 leading-relaxed font-normal">
            {material.overview}
          </p>
        )}

        {/* Clear GHS Pricing Typography */}
        <div className="mt-auto pt-3 border-t border-[#1F2937] flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider block">Ghana Cedis</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                GHS {material.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* WhatsApp Order Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Order ${material.name} on WhatsApp`}
              className="w-10 h-10 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-all shadow-sm"
              title="Quick Order via WhatsApp (0205761698)"
            >
              <IoLogoWhatsapp className="text-lg" />
            </a>

            {/* View Details Link */}
            <Link
              href={`/materials/${material.id}`}
              className="px-3.5 py-2 rounded-full bg-[#1F2937] hover:bg-[#4B6F23] text-white text-xs font-bold transition-all flex items-center gap-1 border border-[#2D3748] hover:border-[#4B6F23]"
            >
              <span>Details</span>
              <HiArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
