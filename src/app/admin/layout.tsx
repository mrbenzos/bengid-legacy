'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  HiSquares2X2,
  HiPrinter,
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
  const [counts, setCounts] = useState({ materials: 6, cars: 10, leads: 3 });

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

  // Standardized Terminology: "Printing Materials"
  const navMenuItems = [
    { name: 'Dashboard', href: '/admin', icon: HiSquares2X2 },
    { name: 'Printing Materials', href: '/admin/materials', icon: HiPrinter, badge: counts.materials },
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
    <div className="min-h-screen bg-[#0B0F19] text-white p-2 sm:p-4 lg:p-6 flex flex-col justify-center">
      <Toaster 
        position="top-right" 
        toastOptions={{ 
          style: { 
            background: '#111827', 
            color: '#FFFFFF', 
            border: '1px solid #2D3748', 
            fontSize: '13px', 
            fontWeight: '600' 
          } 
        }} 
      />

      {/* Framed Application Container in Dark Theme */}
      <div className="bg-[#111827] rounded-3xl sm:rounded-[32px] shadow-2xl border border-[#2D3748] overflow-hidden flex flex-col lg:flex-row min-h-[92vh] max-w-[1600px] w-full mx-auto">
        
        {/* Mobile Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* 1. LEFT SIDEBAR */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0B0F19] border-r border-[#1F2937] flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
          }`}
        >
          {/* Brand Header */}
          <div className="p-6 pb-5 flex items-center justify-between border-b border-[#1F2937]">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#4B6F23] flex items-center justify-center text-white font-black text-sm shadow-md">
                BG
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white block leading-tight">Bengid</span>
                <span className="text-[10px] font-bold text-[#86efac] uppercase tracking-wider block">Admin Suite</span>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-[#9CA3AF] hover:text-white"
            >
              <HiXMark className="text-xl" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 px-4 py-4 space-y-6 overflow-y-auto">
            {/* MENU SECTION */}
            <div>
              <span className="px-3 text-[10px] font-mono font-bold text-[#86efac] uppercase tracking-widest block mb-2">
                MANAGEMENT MENU
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
                      className={`group relative flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                        isActive
                          ? 'bg-[#4B6F23] text-white shadow-md'
                          : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-2 bottom-2 w-1.5 bg-[#86efac] rounded-r-full" />
                      )}

                      <div className="flex items-center gap-3">
                        <Icon className={`text-lg transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-[#9CA3AF] group-hover:text-white'}`} />
                        <span>{item.name}</span>
                      </div>

                      {item.badge !== undefined && (
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            isActive
                              ? 'bg-[#0B0F19] text-[#86efac]'
                              : 'bg-[#1F2937] text-[#9CA3AF]'
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
              <span className="px-3 text-[10px] font-mono font-bold text-[#9CA3AF] uppercase tracking-widest block mb-2">
                SYSTEM LINKS
              </span>
              <nav className="space-y-1">
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-[#9CA3AF] hover:text-white hover:bg-white/5 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <HiArrowUpRight className="text-lg text-[#9CA3AF]" />
                    <span>View Public Website</span>
                  </div>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-md font-semibold">Live</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-rose-400 hover:bg-rose-950/30 hover:text-rose-300 transition-all text-left cursor-pointer"
                >
                  <HiArrowRightOnRectangle className="text-lg text-rose-400" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Bottom Card - SMS Gateway Status */}
          <div className="p-4 pt-2 border-t border-[#1F2937]">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1B3310] to-[#2D4414] text-white p-4 shadow-sm border border-[#4B6F23]/40">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-xl bg-white/10 flex items-center justify-center text-[#86efac]">
                  <HiSignal className="text-sm" />
                </div>
                <span className="text-xs font-bold text-white">Vynfy SMS Gateway</span>
              </div>
              <p className="text-[11px] text-[#E5E7EB] leading-relaxed mb-3">
                Production OTP service active. Owner alerts routed to Kumasi headquarters.
              </p>
              <div className="text-center">
                <span className="inline-block w-full py-1.5 px-3 rounded-xl bg-[#4B6F23] text-white font-black text-xs">
                  BENGID SECURE
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* 2. MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#0B0F19]">
          {/* Top Header Bar */}
          <header className="h-20 px-6 sm:px-8 border-b border-[#1F2937] flex items-center justify-between gap-4 bg-[#111827]/95 sticky top-0 z-30 backdrop-blur-md">
            {/* Mobile Hamburger & Search Input */}
            <div className="flex items-center gap-3 flex-1 max-w-lg">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl text-white hover:bg-white/10"
              >
                <HiBars3 className="text-2xl" />
              </button>

              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <HiMagnifyingGlass className="text-base" />
                </div>
                <input
                  type="text"
                  placeholder="Search printing materials, vehicles, leads..."
                  className="w-full pl-10 pr-12 py-2.5 bg-[#0B0F19] focus:bg-[#0B0F19] text-xs sm:text-sm text-white placeholder-slate-500 rounded-full border border-[#2D3748] focus:border-[#4B6F23] focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Right Header Items: Notifications & User Profile */}
            <div className="flex items-center gap-3">
              <Link
                href="/admin/leads"
                className="w-10 h-10 rounded-full bg-[#0B0F19] border border-[#2D3748] hover:bg-[#1F2937] flex items-center justify-center text-[#9CA3AF] hover:text-white transition-colors"
                title="Customer Inquiries"
              >
                <HiEnvelope className="text-lg" />
              </Link>

              <Link
                href="/admin/activity"
                className="relative w-10 h-10 rounded-full bg-[#0B0F19] border border-[#2D3748] hover:bg-[#1F2937] flex items-center justify-center text-[#9CA3AF] hover:text-white transition-colors"
                title="Activity Log"
              >
                <HiBell className="text-lg" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#4B6F23]" />
              </Link>

              {/* User Profile Pill */}
              <div className="flex items-center gap-3 pl-2 sm:pl-3">
                <div className="w-10 h-10 rounded-full bg-[#4B6F23] border border-[#86efac] flex items-center justify-center text-white font-extrabold text-sm shadow-sm overflow-hidden">
                  <span>BO</span>
                </div>
                <div className="hidden sm:block text-left">
                  <span className="text-xs font-black text-white block leading-tight">Admin Portal</span>
                  <span className="text-[11px] font-medium text-[#86efac] block leading-tight">Santase Headquarters</span>
                </div>
              </div>
            </div>
          </header>

          {/* Page Inner Content Container */}
          <main className="flex-1 p-5 sm:p-7 lg:p-8 overflow-y-auto bg-[#0B0F19]">
            {children}
          </main>
        </div>

      </div>
    </div>
  );
}
