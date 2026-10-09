import Link from 'next/link';
import Image from 'next/image';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export default function BrandLogo({ className = '', variant = 'light' }: BrandLogoProps) {
  return (
    <Link 
      href="/" 
      className={`group inline-flex items-center gap-2.5 transition-transform duration-150 hover:opacity-95 cursor-pointer ${className}`}
    >
      {/* Sleek Compact 3D BG Monogram Badge */}
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 rounded-lg overflow-hidden shadow-xs border border-slate-200/30 group-hover:border-[#00A3E0]/50 transition-colors">
        <Image
          src="/images/bengid-badge.png"
          alt="BENGID BG Logo"
          fill
          sizes="40px"
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Reduced Clean Brand Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline tracking-tight">
          <span className="font-extrabold text-base sm:text-lg text-[#00A3E0] leading-none tracking-wide">
            BENGID
          </span>
          <span className="font-bold text-base sm:text-lg text-[#0284c7] ml-1 leading-none tracking-wide">
            LEGACY
          </span>
        </div>
        <span className="text-[8px] sm:text-[9px] font-bold text-[#557a2b] uppercase tracking-widest mt-0.5 leading-none">
          GHANA LIMITED
        </span>
      </div>
    </Link>
  );
}
