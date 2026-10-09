'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { HiEye, HiPlus, HiMinus, HiMapPin } from 'react-icons/hi2';
import { Material } from '@/lib/types';

interface MaterialCardProps {
  material: Material;
}

const CATEGORY_DEFAULT_IMAGES: Record<string, string> = {
  'Photo Paper': '/images/printing-shop.jpg',
  'Stationary': '/images/materials-hero.jpg',
  'Lamination': '/images/printing-shop.jpg',
  'Lamination Films': '/images/printing-shop.jpg',
  'Inks': '/images/materials-hero.jpg',
  'Flex': '/images/materials-hero.jpg',
  'Vinyl': '/images/materials-hero.jpg',
  'One-Way-Vision': '/images/printing-shop.jpg',
  'Hardwares': '/images/printing-shop.jpg',
};

const DEFAULT_IMAGE = '/images/materials-hero.jpg';

export default function MaterialCard({ material }: MaterialCardProps) {
  const [qty, setQty] = useState(1);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '233538973984';
  const inStock = material.stock_status === 'in_stock';
  const displayImage = material.image_url || CATEGORY_DEFAULT_IMAGES[material.category] || DEFAULT_IMAGE;
  const sku = material.sku || `BGL-MAT-${material.id.slice(0, 4).toUpperCase()}`;

  const totalPrice = material.price * qty;

  const message = encodeURIComponent(
    `Hello BENGID LEGACY,\n\nI would like to order the following:\n- Product: ${material.name}\n- Ref: ${sku}\n- Quantity: ${qty} ${material.unit}\n- Total: GHS ${totalPrice.toFixed(2)}\n\nPlease confirm availability and delivery.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden border border-slate-200/80 hover:border-[#0369a1]/30 hover:-translate-y-1">

      {/* Image */}
      <Link href={`/materials/${material.id}`} className="relative h-56 w-full bg-slate-100 overflow-hidden flex-shrink-0 block">
        <Image
          src={displayImage}
          alt={`${material.name} — ${material.category} printing material, sold ${material.unit}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/10 pointer-events-none" />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[2px]">
          <span className="bg-white/95 text-slate-900 px-4 py-2 rounded-full font-bold text-xs shadow-lg flex items-center gap-1.5">
            <HiEye className="text-base text-[#0369a1]" />
            View Details
          </span>
        </div>

        {/* Category pill */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/95 text-[#0369a1] shadow-md backdrop-blur-sm">
            {material.category}
          </span>
        </div>

        {/* Stock status */}
        <div className="absolute top-4 right-4 z-10">
          <div className={`px-3 py-1.5 rounded-full backdrop-blur-md shadow-md text-white text-[10px] font-bold uppercase tracking-widest ${inStock ? 'bg-emerald-500/95' : 'bg-rose-500/95'}`}>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </div>
        </div>

        {/* SKU bottom */}
        <div className="absolute bottom-4 left-4 z-10">
          <span className="text-[11px] font-bold text-white bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-md shadow-sm border border-white/20">
            {sku}
          </span>
        </div>

        {/* Unit */}
        <div className="absolute bottom-4 right-4 z-10">
          <span className="text-[11px] font-bold text-white bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-md shadow-sm border border-white/20">
            {material.unit}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow bg-white">
        <Link href={`/materials/${material.id}`}>
          <h3 className="font-bold text-base text-slate-900 mb-4 line-clamp-2 h-12 leading-snug group-hover:text-[#0369a1] transition-colors cursor-pointer">
            {material.name}
          </h3>
        </Link>

        {/* Qty counter */}
        <div className="flex items-center justify-between mb-5 bg-slate-50 p-2 rounded-xl border border-slate-200">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-2">Quantity</span>
          <div className="flex items-center bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-1.5 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors border-r border-slate-200">
              <HiMinus className="text-sm" />
            </button>
            <span className="w-10 text-center py-1.5 font-bold text-sm text-slate-900">{qty}</span>
            <button type="button" onClick={() => setQty(qty + 1)} className="px-3 py-1.5 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors border-l border-slate-200">
              <HiPlus className="text-sm" />
            </button>
          </div>
        </div>

        {/* Order footer */}
        <div className="mt-auto pt-5 flex items-center justify-between border-t border-slate-200">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-0.5">Total Amount</span>
            <p className="text-[#0369a1] font-black text-xl leading-none">
              <span className="text-xs mr-0.5 font-bold">GHS</span>{totalPrice.toFixed(2)}
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#165b33] hover:bg-[#114b29] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <IoLogoWhatsapp className="text-lg" />
            <span>Order</span>
          </a>
        </div>
      </div>
    </div>
  );
}
