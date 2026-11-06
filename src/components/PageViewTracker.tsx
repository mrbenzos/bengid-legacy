'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Generate or retrieve a stable anonymous visitor ID stored in localStorage
function getVisitorId(): string {
  try {
    const key = 'bengid_vid';
    let vid = localStorage.getItem(key);
    if (!vid) {
      // Simple random ID — no personal data collected
      vid = Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem(key, vid);
    }
    return vid;
  } catch {
    return 'anonymous';
  }
}

export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't track admin pages — only customer-facing pages
    if (pathname.startsWith('/admin')) return;

    const visitorId = getVisitorId();

    fetch('/api/pageview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: pathname, visitor_id: visitorId }),
    }).catch(() => {
      // Silently fail — tracking should never break the site
    });
  }, [pathname]);

  return null; // Renders nothing
}
