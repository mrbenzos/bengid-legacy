'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  HiPlus,
  HiClock,
  HiTruck,
  HiPrinter,
  HiChatBubbleBottomCenterText,
  HiCheckCircle,
  HiEye,
  HiCalendarDays,
  HiGlobeAlt,
} from 'react-icons/hi2';
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

interface DailyPoint {
  date: string;
  visits: number;
}

interface TopPage {
  page: string;
  visits: number;
}

interface VisitorStats {
  today: number;
  this_week: number;
  this_month: number;
  all_time: number;
  daily_30: DailyPoint[];
  top_pages: TopPage[];
}

function VisitorBarChart({ data }: { data: DailyPoint[] }) {
  const max = Math.max(...data.map((d) => d.visits), 1);

  // Show only last 14 days on small charts, full 30 on wide
  return (
    <div className="w-full">
      <div className="flex items-end gap-[3px] h-28 w-full">
        {data.map((point) => {
          const heightPct = Math.max((point.visits / max) * 100, 2);
          const isToday = point.date === new Date().toISOString().slice(0, 10);
          return (
            <div
              key={point.date}
              className="flex-1 flex flex-col items-center justify-end group relative"
              title={`${point.date}: ${point.visits} visit${point.visits !== 1 ? 's' : ''}`}
            >
              {/* Tooltip */}
              <div className="absolute bottom-full mb-1 hidden group-hover:block z-10 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap pointer-events-none">
                {new Date(point.date + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}:{' '}
                {point.visits} visit{point.visits !== 1 ? 's' : ''}
              </div>
              <div
                style={{ height: `${heightPct}%` }}
                className={`w-full rounded-t-sm transition-all duration-200 ${
                  isToday
                    ? 'bg-[#4B6F23] shadow-sm'
                    : 'bg-emerald-200 group-hover:bg-emerald-400'
                }`}
              />
            </div>
          );
        })}
      </div>
      {/* X-axis labels — show first, mid, last */}
      {data.length > 0 && (
        <div className="flex justify-between mt-1.5 text-[10px] text-gray-400 font-mono">
          <span>
            {new Date(data[0].date + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
          </span>
          <span>
            {new Date(data[Math.floor(data.length / 2)].date + 'T12:00:00').toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
            })}
          </span>
          <span>Today</span>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [totalMaterials, setTotalMaterials] = useState(6);
  const [totalCars, setTotalCars] = useState(10);
  const [availableCars, setAvailableCars] = useState(9);
  const [soldCars, setSoldCars] = useState(1);
  const [totalLeads, setTotalLeads] = useState(3);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  const [visitorStats, setVisitorStats] = useState<VisitorStats>({
    today: 0,
    this_week: 0,
    this_month: 0,
    all_time: 0,
    daily_30: [],
    top_pages: [],
  });

  const animatedTotalMaterials = useCountUp(totalMaterials);
  const animatedAvailableCars = useCountUp(availableCars);
  const animatedSoldCars = useCountUp(soldCars);
  const animatedTotalLeads = useCountUp(totalLeads);
  const animatedToday = useCountUp(visitorStats.today);
  const animatedWeek = useCountUp(visitorStats.this_week);
  const animatedMonth = useCountUp(visitorStats.this_month);
  const animatedAllTime = useCountUp(visitorStats.all_time);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime
    ? `${currentTime.toLocaleDateString('en-US', { weekday: 'short' })}, ${currentTime.getDate()} ${currentTime.toLocaleDateString('en-US', { month: 'short' })} ${currentTime.getFullYear()} • ${currentTime.toLocaleTimeString('en-US', { hour12: false })}`
    : '';

  useEffect(() => {
    async function loadData() {
      try {
        const [matsRes, carsRes, leadsRes, actRes, visitRes] = await Promise.all([
          fetch('/api/materials').catch(() => null),
          fetch('/api/cars').catch(() => null),
          fetch('/api/leads').catch(() => null),
          fetch('/api/activity').catch(() => null),
          fetch('/api/pageview').catch(() => null),
        ]);

        if (matsRes && matsRes.ok) {
          const data = await matsRes.json();
          if (Array.isArray(data)) setTotalMaterials(data.length);
        }

        if (carsRes && carsRes.ok) {
          const data = await carsRes.json();
          if (Array.isArray(data)) {
            setTotalCars(data.length);
            const avail = data.filter((c: any) => c.status === 'available').length;
            setAvailableCars(avail);
            setSoldCars(data.length - avail);
          }
        }

        if (leadsRes && leadsRes.ok) {
          const data = await leadsRes.json();
          if (Array.isArray(data)) setTotalLeads(data.length);
        }

        if (actRes && actRes.ok) {
          const data = await actRes.json();
          if (Array.isArray(data)) setActivities(data.slice(0, 10));
        }

        if (visitRes && visitRes.ok) {
          const data = await visitRes.json();
          if (data && typeof data.all_time === 'number') {
            setVisitorStats(data);
          }
        }
      } catch (err) {
        // ignore
      }
    }

    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn text-[#111827]">

      {/* Top Banner & Live Clock */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <div>
          <span className="text-xs font-mono font-bold text-[#4B6F23] uppercase tracking-widest block mb-1">
            EXECUTIVE CONTROL CENTER
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
            Santase Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Real-time tracking of printing materials catalog, automobile showroom, client leads, and website visitors.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {formattedTime && (
            <div className="px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-xs font-mono font-bold text-[#4B6F23] flex items-center gap-2 shadow-sm">
              <HiClock className="text-sm" />
              <span>{formattedTime}</span>
            </div>
          )}

          <Link
            href="/admin/materials"
            className="px-4 py-2 bg-[#4B6F23] hover:bg-[#3D5A1C] text-white rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <HiPlus />
            <span>Add Printing Material</span>
          </Link>
          <Link
            href="/admin/cars"
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-xs font-bold transition-all border border-gray-200 flex items-center gap-1.5"
          >
            <HiPlus />
            <span>Add Vehicle</span>
          </Link>
        </div>
      </div>

      {/* 4 Inventory Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Card 1: Printing Materials */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between hover:border-[#4B6F23] transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Printing Materials</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#4B6F23]">
              <HiPrinter className="text-xl" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-gray-900 mb-1">
              {animatedTotalMaterials}
            </div>
            <p className="text-xs text-[#4B6F23] font-semibold">Active Consumable Rolls &amp; Inks</p>
          </div>
        </div>

        {/* Card 2: Available Vehicles */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between hover:border-[#4B6F23] transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Available Vehicles</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
              <HiTruck className="text-xl" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-gray-900 mb-1">
              {animatedAvailableCars}
            </div>
            <p className="text-xs text-blue-700 font-semibold">Showroom Inventory in Kumasi</p>
          </div>
        </div>

        {/* Card 3: Sold Vehicles */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between hover:border-gray-400 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Vehicles Sold</span>
            <div className="w-10 h-10 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600">
              <HiCheckCircle className="text-xl" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-gray-900 mb-1">
              {animatedSoldCars}
            </div>
            <p className="text-xs text-gray-500 font-semibold">Verified Sales Closed</p>
          </div>
        </div>

        {/* Card 4: Inquiries & Leads */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between hover:border-amber-500 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Customer Inquiries</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <HiChatBubbleBottomCenterText className="text-xl" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-gray-900 mb-1">
              {animatedTotalLeads}
            </div>
            <p className="text-xs text-amber-700 font-semibold">Direct Enquiries Received</p>
          </div>
        </div>

      </div>

      {/* ───────────── VISITOR ANALYTICS SECTION ───────────── */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Section Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HiGlobeAlt className="text-[#4B6F23] text-lg" />
              <h2 className="text-lg font-black text-gray-900">Website Visitor Analytics</h2>
            </div>
            <p className="text-xs text-gray-500">
              Real-time visitor traffic from all public pages — homepage, materials, automobiles &amp; more.
            </p>
          </div>
          <span className="text-xs font-bold bg-emerald-50 text-[#4B6F23] border border-emerald-200 px-3 py-1 rounded-full">
            Live Tracking
          </span>
        </div>

        {/* 4 Visitor Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-y lg:divide-y-0 divide-gray-100 border-b border-gray-100">

          <div className="p-5 sm:p-6 flex flex-col gap-1 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              <HiEye className="text-[#4B6F23]" />
              Today
            </div>
            <div className="text-3xl sm:text-4xl font-black text-gray-900">{animatedToday}</div>
            <p className="text-xs text-[#4B6F23] font-semibold">Page visits today</p>
          </div>

          <div className="p-5 sm:p-6 flex flex-col gap-1 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              <HiCalendarDays className="text-blue-600" />
              This Week
            </div>
            <div className="text-3xl sm:text-4xl font-black text-gray-900">{animatedWeek}</div>
            <p className="text-xs text-blue-600 font-semibold">Since Sunday</p>
          </div>

          <div className="p-5 sm:p-6 flex flex-col gap-1 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              <HiCalendarDays className="text-purple-600" />
              This Month
            </div>
            <div className="text-3xl sm:text-4xl font-black text-gray-900">{animatedMonth}</div>
            <p className="text-xs text-purple-600 font-semibold">Since 1st of this month</p>
          </div>

          <div className="p-5 sm:p-6 flex flex-col gap-1 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              <HiGlobeAlt className="text-amber-600" />
              All Time
            </div>
            <div className="text-3xl sm:text-4xl font-black text-gray-900">{animatedAllTime}</div>
            <p className="text-xs text-amber-600 font-semibold">Total visits recorded</p>
          </div>

        </div>

        {/* Bar Chart + Top Pages side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">

          {/* 30-Day Chart — takes 2/3 width */}
          <div className="lg:col-span-2 p-6 sm:p-8">
            <h3 className="text-sm font-black text-gray-800 mb-1">Daily Traffic — Last 30 Days</h3>
            <p className="text-xs text-gray-400 mb-5">Each bar = page visits on that day. Dark green = today.</p>
            {visitorStats.daily_30.length > 0 ? (
              <VisitorBarChart data={visitorStats.daily_30} />
            ) : (
              <div className="h-28 flex items-center justify-center text-gray-400 text-sm">
                No visit data yet — data will appear once customers visit the site.
              </div>
            )}
          </div>

          {/* Top Pages — 1/3 width */}
          <div className="p-6 sm:p-8">
            <h3 className="text-sm font-black text-gray-800 mb-1">Most Visited Pages</h3>
            <p className="text-xs text-gray-400 mb-4">Top pages in the last 30 days.</p>
            {visitorStats.top_pages.length === 0 ? (
              <div className="text-xs text-gray-400">No page data recorded yet.</div>
            ) : (
              <div className="space-y-3">
                {visitorStats.top_pages.map((p, i) => {
                  const maxVisits = visitorStats.top_pages[0]?.visits || 1;
                  const pct = Math.round((p.visits / maxVisits) * 100);
                  const label = p.page === '/' ? 'Homepage' : p.page.replace(/^\//, '').replace(/\//g, ' › ');
                  return (
                    <div key={p.page}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-700 truncate max-w-[140px]" title={p.page}>
                          {i + 1}. {label}
                        </span>
                        <span className="text-xs font-black text-[#4B6F23] ml-2">{p.visits}</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#4B6F23] rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Recent Activity Table Card */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-black text-gray-900">Recent Operations Activity</h2>
            <p className="text-xs text-gray-500">Live inventory and administrative actions across all 3 divisions.</p>
          </div>
          <Link href="/admin/activity" className="text-xs font-bold text-[#4B6F23] hover:underline">
            View Full Activity Log →
          </Link>
        </div>

        {activities.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm">
            <HiClock className="text-4xl mx-auto mb-2 text-[#4B6F23]" />
            <p>No recent activity logs recorded yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[11px] font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                  <th className="px-4 py-3 rounded-l-xl">Action</th>
                  <th className="px-4 py-3">Item Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3 rounded-r-xl">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {activities.map((act) => (
                  <tr key={act.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-gray-900 uppercase">{act.action}</td>
                    <td className="px-4 py-3.5 text-gray-700">{act.item_name || 'N/A'}</td>
                    <td className="px-4 py-3.5 text-[#4B6F23] font-semibold">{act.item_type || 'General'}</td>
                    <td className="px-4 py-3.5 text-gray-500">{act.user || 'Admin'}</td>
                    <td className="px-4 py-3.5 text-gray-500">
                      {new Date(act.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
