'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  HiPlus,
  HiArrowUpRight,
  HiClock,
  HiTruck,
  HiPrinter,
  HiGlobeAlt,
  HiChatBubbleBottomCenterText,
  HiCheckCircle,
  HiCalendar,
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
  const [totalMaterials, setTotalMaterials] = useState(6);
  const [totalCars, setTotalCars] = useState(10);
  const [availableCars, setAvailableCars] = useState(9);
  const [soldCars, setSoldCars] = useState(1);
  const [totalLeads, setTotalLeads] = useState(3);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  const animatedTotalMaterials = useCountUp(totalMaterials);
  const animatedAvailableCars = useCountUp(availableCars);
  const animatedSoldCars = useCountUp(soldCars);
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
      } catch (err) {
        // ignore
      }
    }

    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn text-white">
      
      {/* Top Banner & Live Clock */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#111827] rounded-3xl p-6 sm:p-8 border border-[#2D3748] shadow-xl">
        <div>
          <span className="text-xs font-mono font-bold text-[#86efac] uppercase tracking-widest block mb-1">
            EXECUTIVE CONTROL CENTER
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Santase Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
            Real-time tracking of printing materials catalog, automobile showroom, and client leads.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {formattedTime && (
            <div className="px-4 py-2 rounded-full bg-[#0B0F19] border border-[#2D3748] text-xs font-mono font-bold text-[#86efac] flex items-center gap-2">
              <HiClock className="text-sm" />
              <span>{formattedTime}</span>
            </div>
          )}

          <Link
            href="/admin/materials"
            className="px-4 py-2 bg-[#4B6F23] hover:bg-[#556B2F] text-white rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
          >
            <HiPlus />
            <span>Add Printing Material</span>
          </Link>
          <Link
            href="/admin/cars"
            className="px-4 py-2 bg-[#1F2937] hover:bg-[#2D3748] text-white rounded-full text-xs font-bold transition-all border border-[#2D3748] flex items-center gap-1.5"
          >
            <HiPlus />
            <span>Add Vehicle</span>
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards in Dark Palette */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Printing Materials */}
        <div className="bg-[#111827] rounded-3xl p-6 border border-[#2D3748] shadow-xl flex flex-col justify-between hover:border-[#4B6F23] transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">Printing Materials</span>
            <div className="w-10 h-10 rounded-2xl bg-[#4B6F23]/20 border border-[#4B6F23]/40 flex items-center justify-center text-[#86efac]">
              <HiPrinter className="text-xl" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white mb-1">
              {animatedTotalMaterials}
            </div>
            <p className="text-xs text-[#86efac] font-semibold">Active Consumable Rolls &amp; Inks</p>
          </div>
        </div>

        {/* Card 2: Available Vehicles */}
        <div className="bg-[#111827] rounded-3xl p-6 border border-[#2D3748] shadow-xl flex flex-col justify-between hover:border-[#4B6F23] transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">Available Vehicles</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
              <HiTruck className="text-xl" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white mb-1">
              {animatedAvailableCars}
            </div>
            <p className="text-xs text-emerald-400 font-semibold">Showroom Inventory in Kumasi</p>
          </div>
        </div>

        {/* Card 3: Sold Vehicles */}
        <div className="bg-[#111827] rounded-3xl p-6 border border-[#2D3748] shadow-xl flex flex-col justify-between hover:border-[#4B6F23] transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">Vehicles Sold</span>
            <div className="w-10 h-10 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-300">
              <HiCheckCircle className="text-xl" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white mb-1">
              {animatedSoldCars}
            </div>
            <p className="text-xs text-[#9CA3AF] font-semibold">Verified Sales Closed</p>
          </div>
        </div>

        {/* Card 4: Inquiries & Leads */}
        <div className="bg-[#111827] rounded-3xl p-6 border border-[#2D3748] shadow-xl flex flex-col justify-between hover:border-[#4B6F23] transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">Customer Inquiries</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-950/60 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <HiChatBubbleBottomCenterText className="text-xl" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white mb-1">
              {animatedTotalLeads}
            </div>
            <p className="text-xs text-amber-400 font-semibold">Direct Enquiries Received</p>
          </div>
        </div>

      </div>

      {/* Recent Activity Table Card */}
      <div className="bg-[#111827] rounded-3xl border border-[#2D3748] shadow-2xl overflow-hidden p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1F2937]">
          <div>
            <h2 className="text-lg font-black text-white">Recent Operations Activity</h2>
            <p className="text-xs text-[#9CA3AF]">Live inventory and administrative actions across all 3 divisions.</p>
          </div>
          <Link href="/admin/activity" className="text-xs font-bold text-[#86efac] hover:underline">
            View Full Activity Log →
          </Link>
        </div>

        {activities.length === 0 ? (
          <div className="py-12 text-center text-[#9CA3AF] text-sm">
            <HiClock className="text-4xl mx-auto mb-2 text-[#4B6F23]" />
            <p>No recent activity logs recorded yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0B0F19] text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider">
                  <th className="px-4 py-3 rounded-l-xl">Action</th>
                  <th className="px-4 py-3">Item Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3 rounded-r-xl">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F2937] text-xs">
                {activities.map((act) => (
                  <tr key={act.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-white uppercase">{act.action}</td>
                    <td className="px-4 py-3.5 text-[#E5E7EB]">{act.item_name || 'N/A'}</td>
                    <td className="px-4 py-3.5 text-[#86efac]">{act.item_type || 'General'}</td>
                    <td className="px-4 py-3.5 text-[#9CA3AF]">{act.user || 'Admin'}</td>
                    <td className="px-4 py-3.5 text-[#9CA3AF]">
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
