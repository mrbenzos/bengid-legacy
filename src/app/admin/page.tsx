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
            Real-time tracking of printing materials catalog, automobile showroom, and client leads.
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

      {/* 4 Metric Cards in Crisp Light Palette */}
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
