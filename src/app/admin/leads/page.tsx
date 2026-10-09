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

  const tabs = ['All', 'Cars', 'Materials', 'Importations'];

  useEffect(() => {
    fetchLeads();
  }, [activeTab]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const url =
        activeTab === 'All'
          ? '/api/leads'
          : `/api/leads?division=${activeTab.toLowerCase()}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      } else {
        setLeads(getMockLeads().filter((l) => activeTab === 'All' || l.division.toLowerCase() === activeTab.toLowerCase()));
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error);
      setLeads(getMockLeads().filter((l) => activeTab === 'All' || l.division.toLowerCase() === activeTab.toLowerCase()));
    } finally {
      setLoading(false);
    }
  };

  const getMockLeads = (): Lead[] => [
    {
      id: '1',
      name: 'Kwame Mensah',
      phone: '+233 20 123 4567',
      division: 'Materials',
      message: 'Hello, I need bulk Photo Paper and Lamination Films delivered to Adum, Kumasi by Friday.',
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: '2',
      name: 'Sandra Owusu',
      phone: '+233 54 987 6543',
      division: 'Cars',
      message: 'Good day! Is the 2018 Toyota Yaris still available for test drive this weekend?',
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: '3',
      name: 'Nana Yaw Addo',
      phone: '+233 24 555 1234',
      division: 'Importations',
      message: 'Looking for a verified supplier for industrial machinery importation.',
      created_at: new Date(Date.now() - 172800000).toISOString(),
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getDivisionBadge = (division: string) => {
    switch (division.toLowerCase()) {
      case 'cars':
        return 'bg-white text-amber-800 border-amber-200';
      case 'materials':
        return 'bg-[#eaf4ec] text-[#165b33] border-[#c8e6d0]';
      case 'importations':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  const cleanPhoneForWhatsApp = (phone: string) => {
    let clean = phone.replace(/[^0-9]/g, '');
    if (clean.startsWith('0')) {
      clean = '233' + clean.slice(1);
    }
    return clean;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Customer Inquiries & Leads
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time inquiries from website visitors, WhatsApp inquiries, and quotation requests.
          </p>
        </div>

        {/* Tab Filter Pills */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-full border border-slate-200 shadow-xs overflow-x-auto max-w-full">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#165b33] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
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
        <div className="bg-white rounded-3xl p-12 text-center text-slate-500 font-semibold text-sm border border-slate-200">
          Loading inquiries...
        </div>
      ) : leads.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-500 mx-auto flex items-center justify-center text-xl mb-3">
            <HiChatBubbleLeftEllipsis />
          </div>
          <h3 className="font-bold text-slate-800 text-base">No inquiries found</h3>
          <p className="text-xs text-slate-500 mt-1">There are no leads in the "{activeTab}" category yet.</p>
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
              `Hello ${lead.name}, thank you for contacting Bengid Legacy Ghana regarding your ${lead.division} inquiry. How can we assist you today?`
            );

            return (
              <div
                key={lead.id}
                className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Meta */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#eaf4ec] text-[#165b33] font-black text-xs flex items-center justify-center border border-[#c8e6d0]">
                        {initials}
                      </div>
                      <div>
                        <h3 className="font-black text-sm text-slate-900 leading-tight">
                          {lead.name}
                        </h3>
                        <span className="text-[11px] text-slate-500 font-medium">
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
                  <div className="bg-[#f8faf8] border border-slate-200/80 rounded-2xl p-3.5 mb-4 text-xs text-slate-600 leading-relaxed">
                    "{lead.message}"
                  </div>
                </div>

                {/* Footer and Actions */}
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                    <HiCalendar className="text-xs" />
                    <span>{formatDate(lead.created_at)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${lead.phone}`}
                      className="p-2 rounded-full bg-slate-50 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-all"
                      title="Call customer"
                    >
                      <HiPhone />
                    </a>
                    <a
                      href={`https://wa.me/${waPhone}?text=${waMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#165b33] hover:bg-[#124b2a] text-white text-xs font-bold shadow-xs transition-all"
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
