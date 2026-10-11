'use client';

import { useState, useEffect } from 'react';
import { ActivityLog } from '@/lib/types';
import {
  HiCheckCircle,
  HiArrowPath,
  HiTrash,
  HiTag,
  HiCurrencyDollar,
  HiChatBubbleLeftRight,
  HiShieldCheck,
} from 'react-icons/hi2';

export default function ActivityLogPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [filter, setFilter] = useState('All Actions');
  const [loading, setLoading] = useState(true);

  const filters = [
    'All Actions',
    'created',
    'modified',
    'deleted',
    'sold',
    'price_changed',
    'new_lead',
  ];

  useEffect(() => {
    fetchLogs();
  }, [filter]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/activity');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          const filtered =
            filter === 'All Actions'
              ? data
              : data.filter((item) => item.action === filter);
          setLogs(filtered as ActivityLog[]);
          setLoading(false);
          return;
        }
      }
      setLogs([]);
    } catch (err) {
      console.error('Failed to fetch activity logs:', err);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  const getActionBadge = (action: string) => {
    switch (action.toLowerCase()) {
      case 'created':
        return {
          icon: <HiCheckCircle className="text-emerald-400 text-sm" />,
          classes: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          label: 'Created',
        };
      case 'modified':
        return {
          icon: <HiArrowPath className="text-blue-400 text-sm" />,
          classes: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
          label: 'Modified',
        };
      case 'deleted':
        return {
          icon: <HiTrash className="text-rose-400 text-sm" />,
          classes: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          label: 'Deleted',
        };
      case 'sold':
        return {
          icon: <HiCurrencyDollar className="text-amber-400 text-sm" />,
          classes: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          label: 'Marked Sold',
        };
      case 'price_changed':
        return {
          icon: <HiTag className="text-purple-400 text-sm" />,
          classes: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
          label: 'Price Changed',
        };
      case 'new_lead':
        return {
          icon: <HiChatBubbleLeftRight className="text-teal-400 text-sm" />,
          classes: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
          label: 'New Lead',
        };
      default:
        return {
          icon: <HiShieldCheck className="text-[#9CA3AF] text-sm" />,
          classes: 'bg-[#1F2937] text-[#9CA3AF] border-[#2D3748]',
          label: action,
        };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      timeZone: 'Africa/Accra',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Activity Audit Log
          </h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-0.5">
            Immutable audit record of inventory updates, price adjustments, leads, and Vynfy SMS notifications.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-[#0B0F19] p-1.5 rounded-full border border-[#2D3748] shadow-inner overflow-x-auto max-w-full">
          {filters.map((f) => {
            const isActive = filter === f;
            const label =
              f === 'All Actions'
                ? 'All'
                : f === 'price_changed'
                ? 'Price'
                : f === 'new_lead'
                ? 'Leads'
                : f.charAt(0).toUpperCase() + f.slice(1);

            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#4B6F23] text-white shadow-md'
                    : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Audit Log Card */}
      <div className="bg-[#111827] rounded-3xl border border-[#2D3748] shadow-xl overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#2D3748] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-white">Live Activity Feed</span>
          </div>
          <span className="text-xs font-bold text-[#9CA3AF]">
            {logs.length} events logged
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-[#9CA3AF] font-semibold text-sm">
            Loading activity records...
          </div>
        ) : logs.length === 0 ? (
          <div className="p-12 text-center text-[#9CA3AF] font-semibold text-sm">
            No activity logs found for this filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0B0F19] border-b border-[#2D3748] text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider">
                  <th className="px-6 py-3.5">Action</th>
                  <th className="px-6 py-3.5">Item & Description</th>
                  <th className="px-6 py-3.5">Type</th>
                  <th className="px-6 py-3.5">Author</th>
                  <th className="px-6 py-3.5 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F2937]">
                {logs.map((log) => {
                  const badge = getActionBadge(log.action);
                  return (
                    <tr key={log.id} className="hover:bg-white/5 transition-colors">
                      {/* Action badge */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badge.classes}`}
                        >
                          {badge.icon}
                          <span>{badge.label}</span>
                        </span>
                      </td>

                      {/* Item description */}
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-white block max-w-md truncate">
                          {log.item_name}
                        </span>
                      </td>

                      {/* Type */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#1F2937] text-[#D1D5DB] border border-[#2D3748]">
                          {log.item_type || 'System'}
                        </span>
                      </td>

                      {/* Author */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#4B6F23] text-white text-[10px] font-bold flex items-center justify-center">
                            {(log.user || 'A')[0].toUpperCase()}
                          </div>
                          <span className="text-xs font-semibold text-[#D1D5DB]">
                            {log.user || 'Admin'}
                          </span>
                        </div>
                      </td>

                      {/* Timestamp */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium text-[#9CA3AF]">
                        {formatDate(log.created_at)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
