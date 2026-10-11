'use client';

import Link from 'next/link';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export default function BrandLogo({ className = '', variant = 'dark' }: BrandLogoProps) {
  return (
    <Link 
      href="/" 
      aria-label="Bengid Legacy Ghana Limited Home"
      className={`group inline-flex items-center gap-3 transition-transform duration-200 hover:opacity-95 cursor-pointer select-none ${className}`}
    >
      {/* Official "BG" Emblem Mark - Scalable Vector SVG */}
      <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 rounded-xl overflow-hidden p-0.5 bg-gradient-to-br from-[#4B6F23] via-[#556B2F] to-[#2D4414] shadow-[0_4px_16px_rgba(75,111,35,0.4)] border border-[#4B6F23]/60 group-hover:border-[#10B981]/70 transition-all duration-300">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Subtle Geometric Emblem Shield Background */}
          <rect width="100" height="100" rx="20" fill="#0B120B" />
          <path
            d="M50 8L88 22V52C88 74 72 90 50 96C28 90 12 74 12 52V22L50 8Z"
            fill="url(#emblemGrad)"
            stroke="#4B6F23"
            strokeWidth="2.5"
            strokeOpacity="0.6"
          />

          {/* Letter "B" Geometry */}
          <path
            d="M26 28H46C53 28 58 32 58 38C58 43 54 46.5 49 48C56 49.5 61 54 61 61C61 68 55 72 46 72H26V28ZM36 37V46H44C47.5 46 50 44 50 41.5C50 39 47.5 37 44 37H36ZM36 53V63H45C49 63 52 61 52 58C52 55 49 53 45 53H36Z"
            fill="#FFFFFF"
          />

          {/* Letter "G" Interlocking Geometry (Corporate Olive/Emerald Accent) */}
          <path
            d="M74 41C72 35 66 30 57 30C45 30 38 39 38 50C38 61 46 70 58 70C67 70 73 65 74 57H56V49H83V70C76 77 67 80 57 80C40 80 28 68 28 50C28 32 42 21 58 21C69 21 78 27 82 36L74 41Z"
            fill="url(#accentGold)"
            fillOpacity="0.95"
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="emblemGrad" x1="12" y1="8" x2="88" y2="96" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1B3310" />
              <stop offset="0.6" stopColor="#0E1D09" />
              <stop offset="1" stopColor="#081005" />
            </linearGradient>
            <linearGradient id="accentGold" x1="28" y1="21" x2="83" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#A3E635" />
              <stop offset="0.5" stopColor="#4B6F23" />
              <stop offset="1" stopColor="#365314" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Corporate Brand Typography in Official Forest / Olive Green (#4B6F23 / #556B2F) */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline tracking-tight">
          <span className="font-extrabold text-base sm:text-lg text-[#4B6F23] leading-none tracking-wide group-hover:text-[#556B2F] transition-colors">
            BENGID
          </span>
          <span className="font-bold text-base sm:text-lg text-[#556B2F] ml-1.5 leading-none tracking-wide group-hover:text-[#4B6F23] transition-colors">
            LEGACY
          </span>
        </div>
        <span className="text-[8px] sm:text-[9.5px] font-black text-[#4B6F23] uppercase tracking-widest mt-1 leading-none">
          GHANA LIMITED
        </span>
      </div>
    </Link>
  );
}
