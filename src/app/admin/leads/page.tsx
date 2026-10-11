'use client';

import { useState, useEffect } from 'react';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { HiPhone, HiChatBubbleLeftEllipsis, HiCalendar } from 'react-icons/hi2';

interface Lead {
  id: string;
  name: string;
  phone: string;
  division: string;
  message: string;
  created_at: string;
}

export default function LeadsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // Standardized Terminology & Division Ordering: Printing Materials 1st, Automobiles 2nd, General Importations 3rd
  const tabs = ['All', 'Printing Materials', 'Automobiles', 'General Importations'];

  useEffect(() => {
    fetchLeads();
  }, [activeTab]);

  const matchesTab = (division: string, tab: string) => {
    if (tab === 'All') return true;
    const d = (division || '').toLowerCase();
    if (tab === 'Printing Materials') return d.includes('print') || d.includes('mat');
    if (tab === 'Automobiles') return d.includes('car') || d.includes('auto');
    if (tab === 'General Importations') return d.includes('import') || d.includes('contract');
    return d === tab.toLowerCase();
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          const filtered = data.filter((item: Lead) => matchesTab(item.division, activeTab));
          setLeads(filtered);
          setLoading(false);
          return;
        }
      }
      setLeads(getMockLeads().filter((l) => matchesTab(l.division, activeTab)));
    } catch (error) {
      console.error('Failed to fetch leads:', error);
      setLeads(getMockLeads().filter((l) => matchesTab(l.division, activeTab)));
    } finally {
      setLoading(false);
    }
  };

  const getMockLeads = (): Lead[] => [
    {
      id: '1',
      name: 'Kwame Mensah',
      phone: '+233 20 123 4567',
      division: 'Printing Materials',
      message: 'Hello, I need bulk Sav Flex Banner 510 and Vinyl Glossy rolls delivered to Adum, Kumasi by Friday.',
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: '2',
      name: 'Sandra Owusu',
      phone: '+233 54 987 6543',
      division: 'Automobiles',
      message: 'Good day! Is the 2024 BYD Seal EV or Changan CS75 Plus available for inspection at Santase Station this weekend?',
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: '3',
      name: 'Nana Yaw Addo',
      phone: '+233 24 555 1234',
      division: 'General Importations',
      message: 'Looking for a verified quotation and container clearing timeline for industrial printing machinery importation from Guangzhou.',
      created_at: new Date(Date.now() - 172800000).toISOString(),
    },
  ];

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

  const getDivisionBadge = (division: string) => {
    const d = (division || '').toLowerCase();
    if (d.includes('car') || d.includes('auto')) {
      return 'bg-blue-50 text-blue-700 border-blue-200';
    }
    if (d.includes('import') || d.includes('contract')) {
      return 'bg-purple-50 text-purple-700 border-purple-200';
    }
    return 'bg-emerald-50 text-[#4B6F23] border-emerald-200';
  };

  const cleanPhoneForWhatsApp = (phone: string) => {
    let clean = phone.replace(/[^0-9]/g, '');
    if (clean.startsWith('0')) {
      clean = '233' + clean.slice(1);
    }
    return clean;
  };

  return (
    <div className="space-y-6 animate-fadeIn text-[#111827]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Customer Inquiries &amp; Leads
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Real-time inquiries from website visitors, direct calls, and quotation requests across Ghana.
          </p>
        </div>

        {/* Tab Filter Pills */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-full border border-gray-200 shadow-sm overflow-x-auto max-w-full">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#4B6F23] text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span>{tab}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Leads Content */}
      {loading ? (
        <div className="bg-white rounded-3xl p-12 text-center text-gray-500 font-semibold text-sm border border-gray-200 shadow-sm">
          Loading inquiries...
        </div>
      ) : leads.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center text-xl mb-3">
            <HiChatBubbleLeftEllipsis />
          </div>
          <h3 className="font-bold text-gray-900 text-base">No inquiries found</h3>
          <p className="text-xs text-gray-500 mt-1">There are no leads in the "{activeTab}" category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {leads.map((lead) => {
            const initials = lead.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2);

            const waPhone = cleanPhoneForWhatsApp(lead.phone);
            const waMessage = encodeURIComponent(
              `Hello ${lead.name}, thank you for contacting Bengid Legacy Ghana Limited regarding your ${lead.division} inquiry. How can we assist you today?`
            );

            return (
              <div
                key={lead.id}
                className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm hover:border-[#4B6F23]/60 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Meta */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#4B6F23] font-black text-xs flex items-center justify-center border border-emerald-200">
                        {initials}
                      </div>
                      <div>
                        <h3 className="font-black text-sm text-gray-900 leading-tight">
                          {lead.name}
                        </h3>
                        <span className="text-[11px] text-gray-500 font-medium">
                          {lead.phone}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${getDivisionBadge(
                        lead.division
                      )}`}
                    >
                      {lead.division}
                    </span>
                  </div>

                  {/* Message box */}
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 mb-4 text-xs text-gray-700 leading-relaxed">
                    "{lead.message}"
                  </div>
                </div>

                {/* Footer and Actions */}
                <div className="pt-3 border-t border-gray-200 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                    <HiCalendar className="text-xs" />
                    <span>{formatDate(lead.created_at)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${lead.phone}`}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-all"
                      title="Call customer"
                    >
                      <HiPhone />
                    </a>
                    <a
                      href={`https://wa.me/${waPhone}?text=${waMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold shadow-sm transition-all"
                    >
                      <IoLogoWhatsapp className="text-sm" />
                      <span>Reply</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
