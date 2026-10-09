'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  HiSquares2X2,
  HiCube,
  HiTruck,
  HiChatBubbleBottomCenterText,
  HiClock,
  HiMagnifyingGlass,
  HiBell,
  HiEnvelope,
  HiArrowRightOnRectangle,
  HiBars3,
  HiXMark,
  HiArrowUpRight,
  HiSignal,
  HiDocumentText,
} from 'react-icons/hi2';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [counts, setCounts] = useState({ materials: 7, cars: 4, leads: 3 });

  const isAuthPage = pathname === '/admin/login' || pathname === '/admin/verify';

  useEffect(() => {
    async function loadCounts() {
      try {
        const [matsRes, carsRes, leadsRes] = await Promise.all([
          fetch('/api/materials').catch(() => null),
          fetch('/api/cars').catch(() => null),
          fetch('/api/leads').catch(() => null),
        ]);
        if (matsRes && matsRes.ok) {
          const data = await matsRes.json();
          if (Array.isArray(data)) setCounts((prev) => ({ ...prev, materials: data.length }));
        }
        if (carsRes && carsRes.ok) {
          const data = await carsRes.json();
          if (Array.isArray(data)) setCounts((prev) => ({ ...prev, cars: data.length }));
        }
        if (leadsRes && leadsRes.ok) {
          const data = await leadsRes.json();
          if (Array.isArray(data)) setCounts((prev) => ({ ...prev, leads: data.length }));
        }
      } catch (e) {
        // ignore
      }
    }
    if (!isAuthPage) {
      loadCounts();
    }
  }, [pathname, isAuthPage]);

  if (isAuthPage) {
    return <>{children}</>;
  }

  const navMenuItems = [
    { name: 'Dashboard', href: '/admin', icon: HiSquares2X2 },
    { name: 'Materials', href: '/admin/materials', icon: HiCube, badge: counts.materials },
    { name: 'Automobiles', href: '/admin/cars', icon: HiTruck, badge: counts.cars },
    { name: 'Leads & Inquiries', href: '/admin/leads', icon: HiChatBubbleBottomCenterText, badge: counts.leads },
    { name: 'Activity Log', href: '/admin/activity', icon: HiClock },
    { name: 'Reports', href: '/admin/reports', icon: HiDocumentText },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white p-2 sm:p-4 lg:p-6 flex flex-col justify-center">
      <Toaster position="top-right" toastOptions={{ style: { fontSize: '13px', fontWeight: '600' } }} />
      {/* Framed Application Container (Donezo Style) */}
      <div className="bg-white rounded-3xl sm:rounded-[32px] shadow-xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row min-h-[92vh] max-w-[1600px] w-full mx-auto">
        
        {/* Mobile Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* 1. LEFT SIDEBAR */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-50 border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
          }`}
        >
          {/* Brand Header */}
          <div className="p-6 pb-5 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              {/* Organic Double-Loop Logo Mark (matching Donezo visual) */}
              <div className="w-10 h-10 rounded-2xl bg-[#eaf4ec] flex items-center justify-center text-[#165b33]">
                <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round">
                  <path d="M12 2a10 10 0 0 0-7.07 17.07A10 10 0 0 0 12 22a10 10 0 0 0 7.07-2.93" />
                  <path d="M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0" />
                  <path d="M12 9v6" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-slate-900 block leading-tight">Bengid</span>
                <span className="text-[10px] font-bold text-[#165b33] uppercase tracking-wider block">Admin Suite</span>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-600"
            >
              <HiXMark className="text-xl" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 px-4 py-2 space-y-6 overflow-y-auto">
            {/* MENU SECTION */}
            <div>
              <span className="px-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-2">
                Menu
              </span>
              <nav className="space-y-1">
                {navMenuItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`group relative flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-200 ${
                        isActive
                          ? 'bg-[#eaf4ec] text-[#165b33]'
                          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/70'
                      }`}
                    >
                      {/* Left active green vertical bar (exact Donezo detail) */}
                      {isActive && (
                        <div className="absolute left-0 top-2 bottom-2 w-1.5 bg-[#165b33] rounded-r-full" />
                      )}

                      <div className="flex items-center gap-3">
                        <Icon className={`text-lg transition-transform group-hover:scale-110 ${isActive ? 'text-[#165b33]' : 'text-slate-500 group-hover:text-slate-600'}`} />
                        <span>{item.name}</span>
                      </div>

                      {item.badge !== undefined && (
                        <span
                          className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${
                            isActive
                              ? 'bg-[#165b33] text-white'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* GENERAL SECTION */}
            <div>
              <span className="px-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-2">
                General
              </span>
              <nav className="space-y-1">
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100/70 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <HiArrowUpRight className="text-lg text-slate-500" />
                    <span>View Public Website</span>
                  </div>
                  <span className="text-[10px] bg-slate-50 text-slate-500 px-2 py-0.5 rounded-md font-semibold">Live</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-bold text-rose-600 hover:bg-rose-50 transition-all text-left cursor-pointer"
                >
                  <HiArrowRightOnRectangle className="text-lg text-rose-500" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Bottom Card (Donezo Download App Card style, tailored to Vynfy SMS Gateway) */}
          <div className="p-4 pt-2">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#103d24] to-[#1a5b35] text-white p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center text-slate-900">
                  <HiSignal className="text-sm" />
                </div>
                <span className="text-xs font-bold text-[#86efac]">Vynfy SMS Live</span>
              </div>
              <p className="text-[11px] text-slate-800 font-medium leading-relaxed mb-3">
                156 SMS balance active. Auto alerts sent to 0538973984.
              </p>
              <div className="text-center">
                <span className="inline-block w-full py-1.5 px-3 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-slate-950 font-black text-xs transition-colors">
                  BENZOSTECH
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* 2. MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          {/* Top Header Bar */}
          <header className="h-20 px-6 sm:px-8 border-b border-slate-200 flex items-center justify-between gap-4 bg-white/95 sticky top-0 z-30 backdrop-blur-xs">
            {/* Mobile Hamburger & Search Input */}
            <div className="flex items-center gap-3 flex-1 max-w-lg">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              >
                <HiBars3 className="text-2xl" />
              </button>

              {/* Pill Search (Donezo visual) */}
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <HiMagnifyingGlass className="text-base" />
                </div>
                <input
                  type="text"
                  placeholder="Search materials, cars, inquiries..."
                  className="w-full pl-10 pr-12 py-2 bg-slate-50 hover:bg-[#ebf0eb] focus:bg-white text-sm text-slate-800 placeholder-slate-400 rounded-full border border-transparent focus:border-slate-300 focus:outline-none transition-all shadow-inner/10"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-xs">
                    ⌘K
                  </span>
                </div>
              </div>
            </div>

            {/* Right Header Items: Notifications & User Profile */}
            <div className="flex items-center gap-3">
              {/* Mail / Message Icon */}
              <Link
                href="/admin/leads"
                className="w-10 h-10 rounded-full border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
                title="Customer Inquiries"
              >
                <HiEnvelope className="text-lg" />
              </Link>

              {/* Bell Icon with badge */}
              <Link
                href="/admin/activity"
                className="relative w-10 h-10 rounded-full border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
                title="Activity Log"
              >
                <HiBell className="text-lg" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#165b33]" />
              </Link>

              {/* User Profile Pill (Donezo avatar pill) */}
              <div className="flex items-center gap-3 pl-2 sm:pl-3">
                <div className="w-10 h-10 rounded-full bg-[#dcfce7] border-2 border-[#165b33] flex items-center justify-center text-slate-900 font-extrabold text-sm shadow-sm overflow-hidden">
                  <span className="text-base">👨🏽‍💼</span>
                </div>
                <div className="hidden sm:block text-left">
                  <span className="text-xs font-extrabold text-slate-900 block leading-tight">Admin Bengid</span>
                  <span className="text-[11px] font-medium text-slate-500 block leading-tight">admin@bengidlegacy.com</span>
                </div>
              </div>
            </div>
          </header>

          {/* Page Inner Content Container */}
          <main className="flex-1 p-5 sm:p-7 lg:p-8 overflow-y-auto bg-white">
            {children}
          </main>
        </div>

      </div>
    </div>
  );
}

