'use client';

import { usePathname } from 'next/navigation';
import { IoLogoWhatsapp } from 'react-icons/io5';

export default function WhatsAppFloat() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  // Exclusively hardcoded official WhatsApp line: 0205761698 (+233205761698)
  const whatsappUrl = 'https://wa.me/233205761698';

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_6px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 group animate-pulse hover:animate-none"
      aria-label="Chat with Bengid Legacy on WhatsApp (0205761698)"
    >
      <IoLogoWhatsapp className="w-8 h-8" />
    </a>
  );
}
