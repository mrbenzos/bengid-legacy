'use client';

import { useState } from 'react';
import { HiPrinter, HiDocumentText, HiCalendar } from 'react-icons/hi2';
import { Toaster, toast } from 'react-hot-toast';
import { Car, Material, Lead } from '@/lib/types';

type ReportType = 'monthly' | 'annual' | 'custom';

export default function ReportsPage() {
  const [reportType, setReportType] = useState<ReportType>('monthly');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');
  
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  const months = [
    { value: 1, label: 'January' }, { value: 2, label: 'February' }, { value: 3, label: 'March' },
    { value: 4, label: 'April' }, { value: 5, label: 'May' }, { value: 6, label: 'June' },
    { value: 7, label: 'July' }, { value: 8, label: 'August' }, { value: 9, label: 'September' },
    { value: 10, label: 'October' }, { value: 11, label: 'November' }, { value: 12, label: 'December' }
  ];

  const handleGenerate = async () => {
    setGenerating(true);
    setGenerated(false);
    
    try {
      const [carsRes, matRes, leadsRes] = await Promise.all([
        fetch('/api/cars').catch(() => ({ ok: false, json: () => [] })),
        fetch('/api/materials').catch(() => ({ ok: false, json: () => [] })),
        fetch('/api/leads').catch(() => ({ ok: false, json: () => [] }))
      ]);

      const cars: Car[] = carsRes.ok ? await carsRes.json() : [];
      const materials: Material[] = matRes.ok ? await matRes.json() : [];
      const leads: Lead[] = leadsRes.ok ? await leadsRes.json() : [];

      const report = {
        materials: {
          total: materials.length,
          inStock: materials.filter(m => m.stock_status === 'in_stock').length,
          outOfStock: materials.filter(m => m.stock_status === 'out_of_stock').length,
          catalogValue: materials.reduce((sum, m) => sum + (m.price || 0), 0)
        },
        vehicles: {
          total: cars.length,
          available: cars.filter(c => c.status === 'available').length,
          sold: cars.filter(c => c.status === 'sold').length
        },
        carsList: cars,
        materialsList: materials,
        leads: {
          total: leads.length,
          materials: leads.filter(l => (l.division || '').toLowerCase().includes('mat') || (l.division || '').toLowerCase().includes('print')).length,
          cars: leads.filter(l => (l.division || '').toLowerCase().includes('car') || (l.division || '').toLowerCase().includes('auto')).length,
          importations: leads.filter(l => (l.division || '').toLowerCase().includes('import') || (l.division || '').toLowerCase().includes('contract')).length,
        }
      };

      setTimeout(() => {
        setReportData(report);
        setGenerated(true);
        setGenerating(false);
        toast.success('Official business report generated successfully');
      }, 700);
      
    } catch (error) {
      toast.error('Failed to generate report');
      setGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  let periodText = '';
  if (reportType === 'monthly') periodText = `${months.find(m => m.value === selectedMonth)?.label} ${selectedYear}`;
  else if (reportType === 'annual') periodText = `Year ${selectedYear}`;
  else periodText = `${customFrom} to ${customTo}`;

  return (
    <div className="space-y-6 animate-fadeIn">
      <Toaster position="top-right" />
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-report, #printable-report * {
            visibility: visible !important;
          }
          #printable-report {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 30px !important;
            box-shadow: none !important;
            background: white !important;
            color: black !important;
          }
          #printable-report * {
            color: black !important;
            border-color: #cbd5e1 !important;
            background: transparent !important;
          }
          .no-print {
            display: none !important;
          }
        }
      ` }} />

      <div className="space-y-6">
        <div className="no-print">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Reports & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-0.5">
            Generate and export consolidated business audit reports for printing materials inventory, automobile catalog, and customer leads.
          </p>
        </div>

        {/* Controls Card */}
        <div className="bg-[#111827] rounded-3xl p-6 shadow-xl border border-[#2D3748] no-print">
          <div className="flex flex-wrap gap-2 mb-6">
            <button 
              onClick={() => setReportType('monthly')}
              className={`px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-colors cursor-pointer ${
                reportType === 'monthly' ? 'bg-[#4B6F23] text-white shadow-md' : 'bg-[#1F2937] text-[#9CA3AF] hover:text-white hover:bg-[#2D3748]'
              }`}
            >
              Monthly Report
            </button>
            <button 
              onClick={() => setReportType('annual')}
              className={`px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-colors cursor-pointer ${
                reportType === 'annual' ? 'bg-[#4B6F23] text-white shadow-md' : 'bg-[#1F2937] text-[#9CA3AF] hover:text-white hover:bg-[#2D3748]'
              }`}
            >
              Annual Report
            </button>
            <button 
              onClick={() => setReportType('custom')}
              className={`px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-colors cursor-pointer ${
                reportType === 'custom' ? 'bg-[#4B6F23] text-white shadow-md' : 'bg-[#1F2937] text-[#9CA3AF] hover:text-white hover:bg-[#2D3748]'
              }`}
            >
              Custom Range
            </button>
          </div>

          <div className="flex flex-wrap items-end gap-4">
            {reportType === 'monthly' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-[#9CA3AF] mb-1.5">Select Month</label>
                  <select 
                    value={selectedMonth} 
                    onChange={e => setSelectedMonth(Number(e.target.value))}
                    className="border border-[#2D3748] rounded-xl px-4 py-2.5 bg-[#0B0F19] text-white focus:ring-2 focus:ring-[#4B6F23] outline-none text-sm"
                  >
                    {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#9CA3AF] mb-1.5">Year</label>
                  <input 
                    type="number" 
                    value={selectedYear} 
                    onChange={e => setSelectedYear(Number(e.target.value))}
                    className="border border-[#2D3748] rounded-xl px-4 py-2.5 bg-[#0B0F19] text-white w-28 focus:ring-2 focus:ring-[#4B6F23] outline-none text-sm font-semibold"
                  />
                </div>
              </>
            )}

            {reportType === 'annual' && (
              <div>
                <label className="block text-xs font-bold text-[#9CA3AF] mb-1.5">Select Year</label>
                <input 
                  type="number" 
                  value={selectedYear} 
                  onChange={e => setSelectedYear(Number(e.target.value))}
                  className="border border-[#2D3748] rounded-xl px-4 py-2.5 bg-[#0B0F19] text-white w-32 focus:ring-2 focus:ring-[#4B6F23] outline-none text-sm font-semibold"
                />
              </div>
            )}

            {reportType === 'custom' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-[#9CA3AF] mb-1.5">From Date</label>
                  <input 
                    type="date" 
                    value={customFrom} 
                    onChange={e => setCustomFrom(e.target.value)}
                    className="border border-[#2D3748] rounded-xl px-4 py-2 bg-[#0B0F19] text-white focus:ring-2 focus:ring-[#4B6F23] outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#9CA3AF] mb-1.5">To Date</label>
                  <input 
                    type="date" 
                    value={customTo} 
                    onChange={e => setCustomTo(e.target.value)}
                    className="border border-[#2D3748] rounded-xl px-4 py-2 bg-[#0B0F19] text-white focus:ring-2 focus:ring-[#4B6F23] outline-none text-sm"
                  />
                </div>
              </>
            )}

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="bg-[#4B6F23] hover:bg-[#3D5A1C] text-white rounded-xl px-6 py-2.5 font-bold transition-colors flex items-center gap-2 disabled:opacity-70 cursor-pointer shadow-md text-sm"
            >
              {generating ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Generating...</>
              ) : (
                <><HiDocumentText className="text-lg" /> Generate Report</>
              )}
            </button>

            {generated && (
              <button
                onClick={handlePrint}
                className="border border-[#2D3748] bg-[#1F2937] hover:bg-[#2D3748] text-white rounded-xl px-6 py-2.5 font-bold transition-colors flex items-center gap-2 cursor-pointer text-sm"
              >
                <HiPrinter className="text-lg text-[#86efac]" /> Print / Export PDF
              </button>
            )}
          </div>
        </div>

        {/* Generated Report View */}
        {generated && reportData && (
          <div id="printable-report" className="bg-[#111827] rounded-3xl p-8 shadow-xl border border-[#2D3748] text-white mt-8 animate-fadeIn">
            <div className="text-center mb-10 pb-6 border-b border-[#2D3748]">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#86efac] block mb-1">Santase Tech Station, Kumasi, Ghana</span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#86efac] mb-1">BENGID LEGACY GHANA LIMITED</h1>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2">Official Business Report</h2>
              <p className="text-[#9CA3AF] font-medium flex items-center justify-center gap-2 text-xs sm:text-sm">
                <HiCalendar /> Period: {periodText}
              </p>
              <p className="text-xs text-[#9CA3AF] mt-2">Generated on: {new Date().toLocaleDateString('en-US', { timeZone: 'Africa/Accra', month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>

            {/* 1. Inventory Summary */}
            <div className="mb-10">
              <h3 className="text-base sm:text-lg font-black text-white mb-4 bg-[#0B0F19] p-3 rounded-2xl border border-[#2D3748]">
                1. INVENTORY SUMMARY
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
                <div className="bg-[#0B0F19] p-5 rounded-2xl border border-[#2D3748]">
                  <h4 className="font-bold text-[#86efac] mb-3 border-b border-[#2D3748] pb-2 text-sm uppercase tracking-wider">
                    Printing Materials Division
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#D1D5DB]">
                    <li className="flex justify-between"><span>Total Catalog Items:</span> <span className="font-bold text-white">{reportData.materials.total}</span></li>
                    <li className="flex justify-between"><span>In Stock:</span> <span className="font-bold text-emerald-400">{reportData.materials.inStock}</span></li>
                    <li className="flex justify-between"><span>Out of Stock:</span> <span className="font-bold text-rose-400">{reportData.materials.outOfStock}</span></li>
                    <li className="flex justify-between pt-2.5 border-t border-[#1F2937] mt-2"><span>Total Catalog Value:</span> <span className="font-bold text-[#86efac]">GHS {reportData.materials.catalogValue.toLocaleString()}</span></li>
                  </ul>
                </div>
                <div className="bg-[#0B0F19] p-5 rounded-2xl border border-[#2D3748]">
                  <h4 className="font-bold text-blue-300 mb-3 border-b border-[#2D3748] pb-2 text-sm uppercase tracking-wider">
                    Automobile Division
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#D1D5DB]">
                    <li className="flex justify-between"><span>Total Fleet Vehicles:</span> <span className="font-bold text-white">{reportData.vehicles.total}</span></li>
                    <li className="flex justify-between"><span>Available in Stock:</span> <span className="font-bold text-emerald-400">{reportData.vehicles.available}</span></li>
                    <li className="flex justify-between"><span>Sold:</span> <span className="font-bold text-[#9CA3AF]">{reportData.vehicles.sold}</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2. Printing Materials Breakdown (Reordered 1st) */}
            <div className="mb-10">
              <h3 className="text-base sm:text-lg font-black text-white mb-4 bg-[#0B0F19] p-3 rounded-2xl border border-[#2D3748]">
                2. PRINTING MATERIALS BREAKDOWN
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0B0F19] border-y border-[#2D3748] text-[#9CA3AF] uppercase text-[11px] tracking-wider">
                      <th className="px-4 py-3 font-bold">Item Name</th>
                      <th className="px-4 py-3 font-bold">Category</th>
                      <th className="px-4 py-3 font-bold">Price (GHS)</th>
                      <th className="px-4 py-3 font-bold">Unit</th>
                      <th className="px-4 py-3 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1F2937]">
                    {reportData.materialsList.length > 0 ? (
                      reportData.materialsList.map((mat: Material) => (
                        <tr key={mat.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-4 py-3 font-semibold text-white">{mat.name}</td>
                          <td className="px-4 py-3 text-[#D1D5DB]">{mat.category}</td>
                          <td className="px-4 py-3 font-mono font-bold text-[#86efac]">{mat.price.toLocaleString()}</td>
                          <td className="px-4 py-3 text-[#9CA3AF]">{mat.unit}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${mat.stock_status === 'in_stock' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'}`}>
                              {mat.stock_status.replace('_', ' ')}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan={5} className="px-4 py-4 text-center text-[#9CA3AF] italic">No printing materials found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3. Vehicle Breakdown (Reordered 2nd) */}
            <div className="mb-10">
              <h3 className="text-base sm:text-lg font-black text-white mb-4 bg-[#0B0F19] p-3 rounded-2xl border border-[#2D3748]">
                3. AUTOMOBILE INVENTORY BREAKDOWN
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0B0F19] border-y border-[#2D3748] text-[#9CA3AF] uppercase text-[11px] tracking-wider">
                      <th className="px-4 py-3 font-bold">Vehicle Model</th>
                      <th className="px-4 py-3 font-bold">Type</th>
                      <th className="px-4 py-3 font-bold">Brand</th>
                      <th className="px-4 py-3 font-bold">Year</th>
                      <th className="px-4 py-3 font-bold">Price (GHS)</th>
                      <th className="px-4 py-3 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1F2937]">
                    {reportData.carsList.length > 0 ? (
                      reportData.carsList.map((car: Car) => (
                        <tr key={car.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-4 py-3 font-semibold text-white">{car.model_name}</td>
                          <td className="px-4 py-3 text-[#D1D5DB]">{car.vehicle_type || 'SUV / Sedan'}</td>
                          <td className="px-4 py-3 text-[#D1D5DB]">{car.brand || '-'}</td>
                          <td className="px-4 py-3 text-[#D1D5DB]">{car.year || '-'}</td>
                          <td className="px-4 py-3 font-mono font-bold text-blue-300">{car.price ? car.price.toLocaleString() : 'Negotiable'}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${car.status === 'available' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-700 text-[#9CA3AF]'}`}>
                              {car.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan={6} className="px-4 py-4 text-center text-[#9CA3AF] italic">No vehicles found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4. Leads Summary */}
            <div className="mb-8">
              <h3 className="text-base sm:text-lg font-black text-white mb-4 bg-[#0B0F19] p-3 rounded-2xl border border-[#2D3748]">
                4. CUSTOMER INQUIRIES & LEADS SUMMARY
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-2">
                <div className="bg-[#0B0F19] p-4 rounded-2xl border border-[#2D3748]">
                  <span className="block text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider">Total Inquiries</span>
                  <span className="text-2xl font-black text-white mt-1 block">{reportData.leads.total}</span>
                </div>
                <div className="bg-[#0B0F19] p-4 rounded-2xl border border-[#2D3748]">
                  <span className="block text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider">Printing Materials</span>
                  <span className="text-2xl font-black text-[#86efac] mt-1 block">{reportData.leads.materials}</span>
                </div>
                <div className="bg-[#0B0F19] p-4 rounded-2xl border border-[#2D3748]">
                  <span className="block text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider">Automobiles</span>
                  <span className="text-2xl font-black text-blue-300 mt-1 block">{reportData.leads.cars}</span>
                </div>
                <div className="bg-[#0B0F19] p-4 rounded-2xl border border-[#2D3748]">
                  <span className="block text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider">General Import</span>
                  <span className="text-2xl font-black text-amber-300 mt-1 block">{reportData.leads.importations}</span>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-[#2D3748] text-center text-xs text-[#9CA3AF] font-medium">
              This report was auto-generated by Bengid Legacy Admin System • Official Santase Tech Station, Kumasi, Ghana
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
