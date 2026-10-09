'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if user hasn't already consented
    try {
      const consent = localStorage.getItem('cookie_consent');
      if (!consent) {
        // Small delay so it doesn't flash on first paint
        const timer = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage may be blocked in some environments
    }
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
      <div className="bg-white border-t border-slate-200 shadow-2xl px-4 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
          {/* Text */}
          <div className="flex-1 text-sm text-slate-600 leading-relaxed">
            <span className="text-slate-900 font-bold">🍪 We use cookies</span> to ensure our website works correctly and to remember your preferences. We do not use advertising or tracking cookies.{' '}
            <Link
              href="/cookies-policy"
              className="text-[#52b788] underline hover:text-[#74c69d] transition-colors font-medium"
            >
              Learn more
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handleDecline}
              className="px-4 py-2 rounded-full text-xs font-bold text-slate-500 hover:text-slate-900 border border-slate-600 hover:border-slate-400 transition-colors cursor-pointer"
              aria-label="Decline non-essential cookies"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="px-5 py-2 rounded-full text-xs font-bold bg-[#165b33] hover:bg-[#1b6b3c] text-white transition-colors cursor-pointer shadow-sm"
              aria-label="Accept cookies and close this banner"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
