'use client';

import { usePathname } from 'next/navigation';
import { IoLogoWhatsapp } from 'react-icons/io5';

export default function WhatsAppFloat() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '233205761698';
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group animate-pulse hover:animate-none"
      aria-label="Contact us on WhatsApp"
    >
      <IoLogoWhatsapp className="w-8 h-8" />
    </a>
  );
}
