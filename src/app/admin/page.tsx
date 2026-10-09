'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  HiPlus,
  HiArrowUpRight,
  HiClock,
  HiPause,
  HiPlay,
  HiStop,
  HiCheckCircle,
  HiVideoCamera,
  HiCalendar,
  HiSparkles,
  HiTruck,
  HiDocumentText,
} from 'react-icons/hi2';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { ActivityLog } from '@/lib/types';

function useCountUp(target: number, duration: number = 800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const ease = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(target * ease));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return count;
}

export default function AdminDashboard() {
  const [totalMaterials, setTotalMaterials] = useState(7);
  const [totalCars, setTotalCars] = useState(4);
  const [availableCars, setAvailableCars] = useState(3);
  const [soldCars, setSoldCars] = useState(1);
  const [totalLeads, setTotalLeads] = useState(3);
  const [activities, setActivities] = useState<ActivityLog[]>([]);

  // Live Timer Tracker state (matching the Donezo Time Tracker card)
  const [secondsElapsed, setSecondsElapsed] = useState(5048); // default to 01:24:08
  const [timerRunning, setTimerRunning] = useState(true);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  const animatedTotalMaterials = useCountUp(totalMaterials);
  const animatedSoldCars = useCountUp(soldCars);
  const animatedAvailableCars = useCountUp(availableCars);
  const animatedTotalLeads = useCountUp(totalLeads);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime
    ? `${currentTime.toLocaleDateString('en-US', { weekday: 'short' })}, ${currentTime.getDate()} ${currentTime.toLocaleDateString('en-US', { month: 'short' })} ${currentTime.getFullYear()} • ${currentTime.toLocaleTimeString('en-US', { hour12: false })}`
    : '';

  useEffect(() => {
    let interval: any = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTimer = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  useEffect(() => {
    async function loadData() {
      try {
        const [matsRes, carsRes, leadsRes, actRes] = await Promise.all([
          fetch('/api/materials').catch(() => null),
          fetch('/api/cars').catch(() => null),
          fetch('/api/leads').catch(() => null),
          fetch('/api/activity').catch(() => null),
        ]);

        if (matsRes && matsRes.ok) {
          const data = await matsRes.json();
          if (Array.isArray(data)) setTotalMaterials(data.length);
        }

        if (carsRes && carsRes.ok) {
          const data = await carsRes.json();
          if (Array.isArray(data)) {
            setTotalCars(data.length);
            setAvailableCars(data.filter((c: any) => (c.status || '').toLowerCase() === 'available').length);
            setSoldCars(data.filter((c: any) => (c.status || '').toLowerCase() === 'sold').length);
          }
        }

        if (leadsRes && leadsRes.ok) {
          const data = await leadsRes.json();
          if (Array.isArray(data)) setTotalLeads(data.length);
        }

        if (actRes && actRes.ok) {
          const data = await actRes.json();
          if (Array.isArray(data)) setActivities(data.slice(0, 5));
        }
      } catch (err) {
        console.error('Error fetching admin dashboard data:', err);
      }
    }
    loadData();
    const refreshInterval = setInterval(loadData, 30000);
    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <div className="space-y-7 animate-fadeIn">
      {/* 1. TOP HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Plan, prioritize, and accomplish your inventory & dispatch tasks with ease.
          </p>
        </div>

        {/* Action Buttons (matching Donezo + Add Project / Import Data) */}
        <div className="flex items-center gap-3">
          {formattedTime && (
            <div className="hidden sm:block text-xs font-mono text-slate-500 mr-2 bg-white px-3 py-1.5 rounded-full border border-slate-200">
              {formattedTime}
            </div>
          )}
          <Link
            href="/admin/materials"
            className="inline-flex items-center gap-2 bg-[#165b33] hover:bg-[#124b2a] text-white px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-200"
          >
            <HiPlus className="text-base" />
            <span>Add Material</span>
          </Link>

          <Link
            href="/admin/cars"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-xs transition-all duration-200"
          >
            <span>Add Vehicle</span>
          </Link>
        </div>
      </div>

      {/* CSS for fadeInUp animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}} />

      {/* 2. ROW 1: 4 KEY METRIC CARDS (Exact Donezo Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* CARD 1: Deep Forest Green Hero Card (Total Projects in reference) */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#124d2c] via-[#165b33] to-[#1c6e3f] text-white p-6 shadow-sm flex flex-col justify-between overflow-hidden group animate-fadeInUp" style={{ animationDelay: '0ms' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-800">Total Materials</span>
            <Link
              href="/admin/materials"
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-slate-50/30 flex items-center justify-center text-slate-900 transition-colors"
            >
              <HiArrowUpRight className="text-base" />
            </Link>
          </div>

          <div>
            <span className="text-4xl sm:text-5xl font-black tracking-tight block mb-3">
              {animatedTotalMaterials}
            </span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-[11px] font-bold text-slate-900">
              <HiCheckCircle className="text-[#86efac]" />
              <span>Active in catalog</span>
            </div>
          </div>
        </div>

        {/* CARD 2: White Card (Ended Projects in reference -> Sold Vehicles) */}
        <div className="rounded-3xl bg-white p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-500">Sold Vehicles</span>
            <Link
              href="/admin/cars"
              className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors"
            >
              <HiArrowUpRight className="text-base" />
            </Link>
          </div>

          <div>
            <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight block mb-3">
              {animatedSoldCars}
            </span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 text-[11px] font-bold text-slate-600">
              <HiSparkles className="text-amber-500" />
              <span>Completed sales</span>
            </div>
          </div>
        </div>

        {/* CARD 3: White Card (Running Projects in reference -> Available Cars) */}
        <div className="rounded-3xl bg-white p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-500">Available Cars</span>
            <Link
              href="/admin/cars"
              className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors"
            >
              <HiArrowUpRight className="text-base" />
            </Link>
          </div>

          <div>
            <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight block mb-3">
              {animatedAvailableCars}
            </span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0f9f3] text-[11px] font-bold text-[#165b33]">
              <span>Ready in Kumasi</span>
            </div>
          </div>
        </div>

        {/* CARD 4: White Card (Pending Project in reference -> Pending Leads) */}
        <div className="rounded-3xl bg-white p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-500">Customer Leads</span>
            <Link
              href="/admin/leads"
              className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors"
            >
              <HiArrowUpRight className="text-base" />
            </Link>
          </div>

          <div>
            <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight block mb-3">
              {animatedTotalLeads}
            </span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-[11px] font-bold text-orange-700">
              <span>On Discussion</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. ROW 2: 3 OPERATIONAL WIDGETS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* WIDGET 1: Quick Actions */}
        <div className="lg:col-span-4 rounded-3xl bg-white p-6 border border-slate-200/90 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-extrabold text-base text-slate-900">Quick Actions</h3>
          </div>
          <div className="space-y-3">
            <Link href="/admin/cars" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 border border-slate-200 transition-all group">
              <div className="w-9 h-9 rounded-xl bg-white text-amber-600 flex items-center justify-center flex-shrink-0">
                <HiTruck className="text-lg" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900">Add New Vehicle</p>
                <p className="text-[10px] text-slate-500">List a car, SUV or truck</p>
              </div>
              <HiArrowUpRight className="text-slate-600 group-hover:text-slate-600 transition-colors text-sm" />
            </Link>
            <Link href="/admin/materials" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 border border-slate-200 transition-all group">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <HiSparkles className="text-lg" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900">Add Material</p>
                <p className="text-[10px] text-slate-500">Add stock to inventory</p>
              </div>
              <HiArrowUpRight className="text-slate-600 group-hover:text-slate-600 transition-colors text-sm" />
            </Link>
            <Link href="/admin/leads" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 border border-slate-200 transition-all group">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <HiVideoCamera className="text-lg" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900">View Leads</p>
                <p className="text-[10px] text-slate-500">Customer inquiries</p>
              </div>
              <HiArrowUpRight className="text-slate-600 group-hover:text-slate-600 transition-colors text-sm" />
            </Link>
            <Link href="/admin/activity" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 border border-slate-200 transition-all group">
              <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center flex-shrink-0">
                <HiClock className="text-lg" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900">Activity Log</p>
                <p className="text-[10px] text-slate-500">Recent admin actions</p>
              </div>
              <HiArrowUpRight className="text-slate-600 group-hover:text-slate-600 transition-colors text-sm" />
            </Link>
            <Link href="/admin/reports" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 border border-slate-200 transition-all group">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                <HiDocumentText className="text-lg" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900">Generate Report</p>
                <p className="text-[10px] text-slate-500">Business analytics & summary</p>
              </div>
              <HiArrowUpRight className="text-slate-600 group-hover:text-slate-600 transition-colors text-sm" />
            </Link>
          </div>
        </div>

        {/* WIDGET 2: Reminders Card (4 Cols) */}
        <div className="lg:col-span-4 rounded-3xl bg-white p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
              Reminders
            </span>
            <h3 className="text-xl font-black text-slate-900 leading-snug mb-1">
              Vehicle Inspection in Kumasi
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Physical test drive for Toyota Yaris Sedan (Automatic)
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-xl mb-6">
              <HiCalendar className="text-slate-500" />
              <span>Time : 02.00 pm - 04.00 pm</span>
            </div>
          </div>

          <a
            href="https://wa.me/233205761698?text=Hello%20Client,%20this%20is%20Bengid%20Legacy%20confirming%20our%20inspection%20meeting%20in%20Kumasi."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#165b33] hover:bg-[#124b2a] text-white py-3 px-4 rounded-2xl font-bold text-sm shadow-sm transition-all cursor-pointer"
          >
            <IoLogoWhatsapp className="text-lg" />
            <span>Open WhatsApp Chat</span>
          </a>
        </div>

        {/* WIDGET 3: Projects / Inventory Items List (4 Cols) */}
        <div className="lg:col-span-4 rounded-3xl bg-white p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-base text-slate-900">Inventory Items</h3>
            <Link
              href="/admin/materials"
              className="text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-200 px-3 py-1 rounded-full transition-colors"
            >
              + New
            </Link>
          </div>

          <div className="space-y-3">
            {/* Item 1 */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                //
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">SAV Flex Banner 510gsm</p>
                <p className="text-[10px] text-slate-500">Due date: In Stock • 50m Roll</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs">
                ◓
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">RC Glossy Photo Paper</p>
                <p className="text-[10px] text-slate-500">Due date: In Stock • 100 Sheets</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                ✤
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">Toyota Yaris Sedan 2018</p>
                <p className="text-[10px] text-slate-500">Kumasi Lot • Available</p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white text-amber-600 flex items-center justify-center font-bold text-xs">
                ◕
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">Eco-Solvent Inks CMYK</p>
                <p className="text-[10px] text-slate-500">High Demand • 1000ml</p>
              </div>
            </div>

            {/* Item 5 */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">
                ∴
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">White Vinyl Sticker Roll</p>
                <p className="text-[10px] text-slate-500">Fast Mover • 50m Roll</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 4. ROW 3: 3 BOTTOM CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* CARD 1: Customer Collaboration / Leads List (5 Cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white p-6 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-base text-slate-900">Customer Inquiries</h3>
            <Link
              href="/admin/leads"
              className="text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-200 px-3 py-1 rounded-full transition-colors"
            >
              + View All
            </Link>
          </div>

          <div className="space-y-3.5">
            {/* Row 1 */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xs">
                  👩🏽
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Alexandra Deff</h4>
                  <p className="text-[10px] text-slate-500">Inquiring on SAV Flex Banner Roll</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                Completed
              </span>
            </div>

            {/* Row 2 */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  👨🏾
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Edwin Adenike</h4>
                  <p className="text-[10px] text-slate-500">Scheduled Toyota Yaris Test Drive</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white text-amber-700">
                In Progress
              </span>
            </div>

            {/* Row 3 */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-xs">
                  👨🏿
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Isaac Oluwatemilorun</h4>
                  <p className="text-[10px] text-slate-500">Bulk Eco-Solvent Ink Quote</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700">
                Pending
              </span>
            </div>

            {/* Row 4 */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xs">
                  👨🏽
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">David Oshodi</h4>
                  <p className="text-[10px] text-slate-500">Vehicle Branding Order Discussion</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white text-amber-700">
                In Progress
              </span>
            </div>
          </div>
        </div>

        {/* CARD 2: Project Progress Gauge (4 Cols) */}
        <div className="lg:col-span-4 rounded-3xl bg-white p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="mb-2">
            <h3 className="font-extrabold text-base text-slate-900">Catalog Fulfillment</h3>
          </div>

          {/* Radial Donut Gauge Visual (Matching Donezo 41% gauge) */}
          <div className="flex flex-col items-center justify-center my-2">
            <div className="relative w-44 h-24 flex items-end justify-center overflow-hidden">
              {/* Semi circle SVG track */}
              <svg className="w-44 h-44" viewBox="0 0 100 100">
                <defs>
                  <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="4" height="4">
                    <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" stroke="#94a3b8" strokeWidth="1" />
                  </pattern>
                </defs>
                {/* Background Arc */}
                <path
                  d="M 10,50 A 40,40 0 0,1 90,50"
                  fill="none"
                  stroke="url(#diagonalHatch)"
                  strokeWidth="14"
                />
                {/* Active Dark Forest Green Arc */}
                <path
                  d="M 10,50 A 40,40 0 0,1 70,16"
                  fill="none"
                  stroke="#165b33"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute bottom-0 text-center">
                <span className="text-3xl font-black text-slate-900 block leading-tight">
                  85%
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  In Stock Active
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 mt-4 text-[11px] font-bold text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#165b33]" />
                <span>In Stock</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#52b788]" />
                <span>In Discussion</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full border border-slate-400 bg-slate-200" />
                <span>Sold</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: Time Tracker / SMS Gateway Card (3 Cols) */}
        <div className="lg:col-span-3 rounded-3xl bg-gradient-to-br from-[#0c2f1a] via-[#103d24] to-[#154d2e] text-white p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
          {/* Topographic Wave BG Lines */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none">
              <path d="M0,100 C50,150 150,50 200,100 L200,200 L0,200 Z" fill="currentColor" />
            </svg>
          </div>

          <div className="relative z-10 mb-4">
            <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider block">
              Time Tracker
            </span>
          </div>

          {/* Digital Timer */}
          <div className="relative z-10 my-4 text-center">
            <span className="text-3xl sm:text-4xl font-mono font-black tracking-widest text-slate-900 block">
              {formatTimer(secondsElapsed)}
            </span>
            <span className="text-[10px] font-semibold text-emerald-200 mt-1 block">
              Live Gateway Session
            </span>
          </div>

          {/* Interactive Player Controls */}
          <div className="relative z-10 flex items-center justify-center gap-3">
            <button
              onClick={() => setTimerRunning(!timerRunning)}
              className="w-11 h-11 rounded-full bg-white hover:bg-slate-100 text-[#103d24] flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
              title={timerRunning ? 'Pause Session' : 'Resume Session'}
            >
              {timerRunning ? <HiPause className="text-xl" /> : <HiPlay className="text-xl ml-0.5" />}
            </button>

            <button
              onClick={() => setSecondsElapsed(0)}
              className="w-11 h-11 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
              title="Reset Timer"
            >
              <HiStop className="text-xl" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
