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
      <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] px-4 py-4 sm:py-5 text-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
          {/* Text */}
          <div className="flex-1 text-sm text-gray-600 leading-relaxed">
            <span className="text-gray-900 font-bold">🍪 Cookie Notice:</span> We use essential cookies to ensure our website operates smoothly and remembers your preferences. We do not use third-party advertising cookies.{' '}
            <Link
              href="/cookies-policy"
              className="text-[#4B6F23] underline hover:text-[#3D5A1C] transition-colors font-medium ml-1"
            >
              Learn more in Cookies Policy
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 border border-gray-300 rounded-full transition-colors cursor-pointer"
            >
              Essential Only
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2 text-xs font-bold text-white bg-[#4B6F23] hover:bg-[#3D5A1C] rounded-full shadow-sm transition-all cursor-pointer"
            >
              Accept Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
