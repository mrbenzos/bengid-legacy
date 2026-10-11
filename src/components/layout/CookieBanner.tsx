'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie_consent');
      if (!consent) {
        const timer = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('cookie_consent', 'accepted');
    } catch {}
    setVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('cookie_consent', 'declined');
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-[9999] animate-fadeInUp"
    >
      <div className="bg-[#111827] border-t border-[#2D3748] shadow-2xl px-4 py-4 sm:py-5 text-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
          {/* Text */}
          <div className="flex-1 text-sm text-[#E5E7EB] leading-relaxed">
            <span className="text-white font-bold">🍪 Cookie Notice:</span> We use essential cookies to ensure our website operates smoothly and remembers your preferences. We do not use third-party advertising cookies.{' '}
            <Link
              href="/cookies-policy"
              className="text-[#10B981] underline hover:text-[#34D399] transition-colors font-medium ml-1"
            >
              Learn more in Cookies Policy
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-xs font-semibold text-[#9CA3AF] hover:text-white border border-[#374151] rounded-full transition-colors cursor-pointer"
            >
              Essential Only
            </button>
            <button
              onClick={handleAccept}
              className="px-5 py-2 text-xs font-bold bg-[#4B6F23] hover:bg-[#556B2F] text-white rounded-full transition-colors shadow-md cursor-pointer"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
