'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { HiEye, HiArrowRight } from 'react-icons/hi2';
import { Material } from '@/lib/types';

interface MaterialCardProps {
  material: Material;
}

const CATEGORY_DEFAULT_IMAGES: Record<string, string> = {
  'Inks': '/images/categories/inks-toners.jpg',
  'Stationary': '/images/categories/stationery-cutters.jpg',
  'Stationery': '/images/categories/stationery-cutters.jpg',
  'Photo Papers': '/images/categories/photo-papers.jpg',
  'Photo Paper': '/images/categories/photo-papers.jpg',
  'Lamination Films': '/images/categories/lamination-films.jpg',
  'Lamination': '/images/categories/lamination-films.jpg',
  'Hardwares': '/images/categories/heavy-machinery.jpg',
  'Hardware': '/images/categories/heavy-machinery.jpg',
  'Delivery Service': '/images/warehouse-logistics.jpg',
  'Delivery': '/images/warehouse-logistics.jpg',
  'Other': '/images/categories/photo-papers.jpg',
};

const DEFAULT_IMAGE = '/images/categories/photo-papers.jpg';

export default function MaterialCard({ material }: MaterialCardProps) {
  const [qty, setQty] = useState(1);

  // Exclusively hardcoded official WhatsApp line: 0205761698 (+233205761698)
  const whatsappNumber = '233205761698';
  const inStock = material.stock_status === 'in_stock';
  const displayImage = material.image_url || CATEGORY_DEFAULT_IMAGES[material.category] || DEFAULT_IMAGE;
  const sku = material.sku || `BGL-MAT-${material.id.slice(0, 4).toUpperCase()}`;

  const isPriceOnRequest = Boolean(material.priceOnRequest || material.price_on_request);
  const totalPrice = (material.price || 0) * qty;

  const message = isPriceOnRequest
    ? encodeURIComponent(
        `Hello BENGID LEGACY,\n\nI am inquiring about the price for the following Printing Material:\n- Product: ${material.name}\n- Ref: ${sku}\n- Category: ${material.category}\n- Unit: ${material.unit}\n\nPlease provide your latest price quote and availability.`
      )
    : encodeURIComponent(
        `Hello BENGID LEGACY,\n\nI would like to order the following Printing Material:\n- Product: ${material.name}\n- Ref: ${sku}\n- Quantity: ${qty} ${material.unit}\n- Total: GHS ${totalPrice.toFixed(2)}\n\nPlease confirm availability and delivery.`
      );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="group relative bg-white rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.07),0_2px_4px_-1px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_28px_-4px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col h-full overflow-hidden border border-gray-200/90 hover:border-[#4B6F23]/60 hover:-translate-y-1">

      {/* Media & Dynamic Parametric Route Trigger */}
      <Link 
        href={`/materials/${material.id}`} 
        className="relative h-56 w-full bg-gray-100 overflow-hidden flex-shrink-0 block cursor-pointer"
        aria-label={`View full specifications for ${material.name}`}
      >
        <Image
          src={displayImage}
          alt={`${material.name} — ${material.category} Printing Material`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

        {/* Hover Inspect Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/25 backdrop-blur-[2px]">
          <span className="bg-white text-gray-900 px-4 py-2 rounded-full font-bold text-xs shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <HiEye className="text-base text-[#4B6F23]" />
            View Specifications
          </span>
        </div>

        {/* Category Pill Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-gray-800 border border-gray-200 shadow-sm backdrop-blur-xs">
            {material.category}
          </span>
        </div>

        {/* Stock Status Badge */}
        <div className="absolute top-3 right-3 z-10">
          <div className={`px-2.5 py-1 rounded-full shadow-sm text-[10px] font-extrabold uppercase tracking-wider border backdrop-blur-xs ${
            inStock 
              ? 'bg-emerald-50/95 text-emerald-800 border-emerald-200' 
              : 'bg-rose-50/95 text-rose-800 border-rose-200'
          }`}>
            {inStock ? '● In Stock' : '○ Out of Stock'}
          </div>
        </div>

        {/* SKU Ref bottom left */}
        <div className="absolute bottom-2.5 left-3 z-10">
          <span className="text-[10px] font-mono font-bold text-white bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
            {sku}
          </span>
        </div>

        {/* Unit badge bottom right */}
        <div className="absolute bottom-2.5 right-3 z-10">
          <span className="text-[10px] font-bold text-white bg-[#4B6F23]/90 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
            {material.unit}
          </span>
        </div>
      </Link>

      {/* Card Content in Crisp Light Theme */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          <Link href={`/materials/${material.id}`} className="block group-hover:text-[#4B6F23] transition-colors">
            <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-2 mb-2 group-hover:text-[#4B6F23] transition-colors">
              {material.name}
            </h3>
          </Link>

          {material.overview && (
            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
              {material.overview}
            </p>
          )}
        </div>

        <div className="pt-4 border-t border-gray-100 mt-2">
          {/* Price & Quantity Selector */}
          {isPriceOnRequest ? (
            <div className="flex items-center justify-between mb-4 py-1">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider block">Price</span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black bg-amber-50 text-amber-900 border border-amber-300 shadow-2xs">
                  Contact for Price
                </span>
              </div>
              <span className="text-[11px] font-semibold text-gray-400 italic">
                Quote on Request
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider block">Ghana Cedis</span>
                <div className="text-xl font-black text-gray-900 leading-none">
                  GHS {material.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors font-bold text-xs"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-bold text-gray-800">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors font-bold text-xs"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#4B6F23] hover:bg-[#3D5A1C] text-white py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <IoLogoWhatsapp className="text-base text-white" />
              <span>
                {isPriceOnRequest
                  ? 'Contact for Price via WhatsApp'
                  : `Order via WhatsApp (GHS ${totalPrice.toFixed(2)})`}
              </span>
            </a>

            <Link
              href={`/materials/${material.id}`}
              className="w-full py-2 px-3 text-center text-xs font-semibold text-gray-600 hover:text-[#4B6F23] hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span>View Full Specs</span>
              <HiArrowRight className="text-xs" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
