'use client';

import { useState, useEffect } from 'react';
import { ActivityLog } from '@/lib/types';
import { HiCheckCircle, HiArrowPath, HiTrash, HiTag, HiCurrencyDollar, HiChatBubbleLeftRight, HiShieldCheck } from 'react-icons/hi2';

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
          icon: <HiCheckCircle className="text-emerald-600 text-sm" />,
          classes: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          label: 'Created',
        };
      case 'modified':
        return {
          icon: <HiArrowPath className="text-blue-600 text-sm" />,
          classes: 'bg-blue-50 text-blue-800 border-blue-200',
          label: 'Modified',
        };
      case 'deleted':
        return {
          icon: <HiTrash className="text-rose-600 text-sm" />,
          classes: 'bg-rose-50 text-rose-800 border-rose-200',
          label: 'Deleted',
        };
      case 'sold':
        return {
          icon: <HiCurrencyDollar className="text-amber-600 text-sm" />,
          classes: 'bg-white text-amber-800 border-amber-200',
          label: 'Marked Sold',
        };
      case 'price_changed':
        return {
          icon: <HiTag className="text-purple-600 text-sm" />,
          classes: 'bg-purple-50 text-purple-800 border-purple-200',
          label: 'Price Changed',
        };
      case 'new_lead':
        return {
          icon: <HiChatBubbleLeftRight className="text-teal-600 text-sm" />,
          classes: 'bg-teal-50 text-teal-800 border-teal-200',
          label: 'New Lead',
        };
      default:
        return {
          icon: <HiShieldCheck className="text-slate-500 text-sm" />,
          classes: 'bg-slate-50 text-slate-600 border-slate-200',
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
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Activity Audit Log
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Immutable audit record of inventory updates, price adjustments, leads, and Vynfy SMS notifications.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-full border border-slate-200 shadow-xs overflow-x-auto max-w-full">
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
                    ? 'bg-[#165b33] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Audit Log Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-600">Live Activity Feed</span>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {logs.length} events logged
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 font-semibold text-sm">
            Loading activity records...
          </div>
        ) : logs.length === 0 ? (
          <div className="p-12 text-center text-slate-500 font-semibold text-sm">
            No activity logs found for this filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#fafbfa] border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-3.5">Action</th>
                  <th className="px-6 py-3.5">Item & Description</th>
                  <th className="px-6 py-3.5">Type</th>
                  <th className="px-6 py-3.5">Author</th>
                  <th className="px-6 py-3.5 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((log) => {
                  const badge = getActionBadge(log.action);
                  return (
                    <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
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
                        <span className="text-sm font-bold text-slate-900 block max-w-md truncate">
                          {log.item_name}
                        </span>
                      </td>

                      {/* Type */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-50 text-slate-600">
                          {log.item_type || 'System'}
                        </span>
                      </td>

                      {/* Author */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#165b33] text-white text-[10px] font-bold flex items-center justify-center">
                            {(log.user || 'A')[0].toUpperCase()}
                          </div>
                          <span className="text-xs font-semibold text-slate-600">
                            {log.user || 'Admin'}
                          </span>
                        </div>
                      </td>

                      {/* Timestamp */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium text-slate-500">
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
