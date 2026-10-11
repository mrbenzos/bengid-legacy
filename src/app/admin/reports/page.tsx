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
    <div className="space-y-6 animate-fadeIn text-[#111827]">
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
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Reports &amp; Analytics
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Generate and export consolidated business audit reports for printing materials inventory, automobile catalog, and customer leads.
          </p>
        </div>

        {/* Controls Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 no-print">
          <div className="flex flex-wrap gap-2 mb-6">
            <button 
              onClick={() => setReportType('monthly')}
              className={`px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-colors cursor-pointer ${
                reportType === 'monthly' ? 'bg-[#4B6F23] text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              Monthly Report
            </button>
            <button 
              onClick={() => setReportType('annual')}
              className={`px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-colors cursor-pointer ${
                reportType === 'annual' ? 'bg-[#4B6F23] text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              Annual Report
            </button>
            <button 
              onClick={() => setReportType('custom')}
              className={`px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-colors cursor-pointer ${
                reportType === 'custom' ? 'bg-[#4B6F23] text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              Custom Range
            </button>
          </div>

          <div className="flex flex-wrap items-end gap-4">
            {reportType === 'monthly' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Select Month</label>
                  <select 
                    value={selectedMonth} 
                    onChange={e => setSelectedMonth(Number(e.target.value))}
                    className="border border-gray-300 rounded-xl px-4 py-2.5 bg-[#F9FAFB] text-gray-900 focus:ring-2 focus:ring-[#4B6F23] outline-none text-sm"
                  >
                    {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">Year</label>
                  <input 
                    type="number" 
                    value={selectedYear} 
                    onChange={e => setSelectedYear(Number(e.target.value))}
                    className="border border-gray-300 rounded-xl px-4 py-2.5 bg-[#F9FAFB] text-gray-900 w-28 focus:ring-2 focus:ring-[#4B6F23] outline-none text-sm font-semibold"
                  />
                </div>
              </>
            )}

            {reportType === 'annual' && (
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">Select Year</label>
                <input 
                  type="number" 
                  value={selectedYear} 
                  onChange={e => setSelectedYear(Number(e.target.value))}
                  className="border border-gray-300 rounded-xl px-4 py-2.5 bg-[#F9FAFB] text-gray-900 w-32 focus:ring-2 focus:ring-[#4B6F23] outline-none text-sm font-semibold"
                />
              </div>
            )}

            {reportType === 'custom' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">From Date</label>
                  <input 
                    type="date" 
                    value={customFrom} 
                    onChange={e => setCustomFrom(e.target.value)}
                    className="border border-gray-300 rounded-xl px-4 py-2 bg-[#F9FAFB] text-gray-900 focus:ring-2 focus:ring-[#4B6F23] outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5">To Date</label>
                  <input 
                    type="date" 
                    value={customTo} 
                    onChange={e => setCustomTo(e.target.value)}
                    className="border border-gray-300 rounded-xl px-4 py-2 bg-[#F9FAFB] text-gray-900 focus:ring-2 focus:ring-[#4B6F23] outline-none text-sm"
                  />
                </div>
              </>
            )}

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="bg-[#4B6F23] hover:bg-[#3D5A1C] text-white rounded-xl px-6 py-2.5 font-bold transition-colors flex items-center gap-2 disabled:opacity-70 cursor-pointer shadow-sm text-sm"
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
                className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 rounded-xl px-6 py-2.5 font-bold transition-colors flex items-center gap-2 cursor-pointer text-sm shadow-sm"
              >
                <HiPrinter className="text-lg text-[#4B6F23]" /> Print / Export PDF
              </button>
            )}
          </div>
        </div>

        {/* Generated Report View */}
        {generated && reportData && (
          <div id="printable-report" className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 text-gray-900 mt-8 animate-fadeIn">
            <div className="text-center mb-10 pb-6 border-b border-gray-200">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#4B6F23] block mb-1">Santase Tech Station, Kumasi, Ghana</span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#4B6F23] mb-1">BENGID LEGACY GHANA LIMITED</h1>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Official Business Report</h2>
              <p className="text-gray-600 font-medium flex items-center justify-center gap-2 text-xs sm:text-sm">
                <HiCalendar /> Period: {periodText}
              </p>
              <p className="text-xs text-gray-400 mt-2">Generated on: {new Date().toLocaleDateString('en-US', { timeZone: 'Africa/Accra', month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>

            {/* 1. Inventory Summary */}
            <div className="mb-10">
              <h3 className="text-base sm:text-lg font-black text-gray-900 mb-4 bg-gray-50 p-3 rounded-2xl border border-gray-200">
                1. INVENTORY SUMMARY
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                  <h4 className="font-bold text-[#4B6F23] mb-3 border-b border-gray-200 pb-2 text-sm uppercase tracking-wider">
                    Printing Materials Division
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                    <li className="flex justify-between"><span>Total Catalog Items:</span> <span className="font-bold text-gray-900">{reportData.materials.total}</span></li>
                    <li className="flex justify-between"><span>In Stock:</span> <span className="font-bold text-emerald-600">{reportData.materials.inStock}</span></li>
                    <li className="flex justify-between"><span>Out of Stock:</span> <span className="font-bold text-rose-600">{reportData.materials.outOfStock}</span></li>
                    <li className="flex justify-between pt-2.5 border-t border-gray-200 mt-2"><span>Total Catalog Value:</span> <span className="font-bold text-[#4B6F23]">GHS {reportData.materials.catalogValue.toLocaleString()}</span></li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                  <h4 className="font-bold text-blue-700 mb-3 border-b border-gray-200 pb-2 text-sm uppercase tracking-wider">
                    Automobile Division
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                    <li className="flex justify-between"><span>Total Fleet Vehicles:</span> <span className="font-bold text-gray-900">{reportData.vehicles.total}</span></li>
                    <li className="flex justify-between"><span>Available in Stock:</span> <span className="font-bold text-emerald-600">{reportData.vehicles.available}</span></li>
                    <li className="flex justify-between"><span>Sold:</span> <span className="font-bold text-gray-500">{reportData.vehicles.sold}</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2. Printing Materials Breakdown (Reordered 1st) */}
            <div className="mb-10">
              <h3 className="text-base sm:text-lg font-black text-gray-900 mb-4 bg-gray-50 p-3 rounded-2xl border border-gray-200">
                2. PRINTING MATERIALS BREAKDOWN
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-y border-gray-200 text-gray-600 uppercase text-[11px] tracking-wider">
                      <th className="px-4 py-3 font-bold">Item Name</th>
                      <th className="px-4 py-3 font-bold">Category</th>
                      <th className="px-4 py-3 font-bold">Price (GHS)</th>
                      <th className="px-4 py-3 font-bold">Unit</th>
                      <th className="px-4 py-3 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {reportData.materialsList.length > 0 ? (
                      reportData.materialsList.map((mat: Material) => (
                        <tr key={mat.id} className="hover:bg-gray-50/70 transition-colors">
                          <td className="px-4 py-3 font-semibold text-gray-900">{mat.name}</td>
                          <td className="px-4 py-3 text-gray-700">{mat.category}</td>
                          <td className="px-4 py-3 font-mono font-bold text-[#4B6F23]">{mat.price.toLocaleString()}</td>
                          <td className="px-4 py-3 text-gray-500">{mat.unit}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${mat.stock_status === 'in_stock' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
                              {mat.stock_status.replace('_', ' ')}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan={5} className="px-4 py-4 text-center text-gray-400 italic">No printing materials found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3. Vehicle Breakdown (Reordered 2nd) */}
            <div className="mb-10">
              <h3 className="text-base sm:text-lg font-black text-gray-900 mb-4 bg-gray-50 p-3 rounded-2xl border border-gray-200">
                3. AUTOMOBILE INVENTORY BREAKDOWN
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-y border-gray-200 text-gray-600 uppercase text-[11px] tracking-wider">
                      <th className="px-4 py-3 font-bold">Vehicle Model</th>
                      <th className="px-4 py-3 font-bold">Type</th>
                      <th className="px-4 py-3 font-bold">Brand</th>
                      <th className="px-4 py-3 font-bold">Year</th>
                      <th className="px-4 py-3 font-bold">Price (GHS)</th>
                      <th className="px-4 py-3 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {reportData.carsList.length > 0 ? (
                      reportData.carsList.map((car: Car) => (
                        <tr key={car.id} className="hover:bg-gray-50/70 transition-colors">
                          <td className="px-4 py-3 font-semibold text-gray-900">{car.model_name}</td>
                          <td className="px-4 py-3 text-gray-700">{car.vehicle_type || 'SUV / Sedan'}</td>
                          <td className="px-4 py-3 text-gray-700">{car.brand || '-'}</td>
                          <td className="px-4 py-3 text-gray-700">{car.year || '-'}</td>
                          <td className="px-4 py-3 font-mono font-bold text-blue-700">{car.price ? car.price.toLocaleString() : 'Negotiable'}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${car.status === 'available' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
                              {car.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan={6} className="px-4 py-4 text-center text-gray-400 italic">No vehicles found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4. Leads Summary */}
            <div className="mb-8">
              <h3 className="text-base sm:text-lg font-black text-gray-900 mb-4 bg-gray-50 p-3 rounded-2xl border border-gray-200">
                4. CUSTOMER INQUIRIES &amp; LEADS SUMMARY
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-2">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                  <span className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">Total Inquiries</span>
                  <span className="text-2xl font-black text-gray-900 mt-1 block">{reportData.leads.total}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                  <span className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">Printing Materials</span>
                  <span className="text-2xl font-black text-[#4B6F23] mt-1 block">{reportData.leads.materials}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                  <span className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">Automobiles</span>
                  <span className="text-2xl font-black text-blue-700 mt-1 block">{reportData.leads.cars}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                  <span className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">General Import</span>
                  <span className="text-2xl font-black text-amber-700 mt-1 block">{reportData.leads.importations}</span>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-gray-200 text-center text-xs text-gray-500 font-medium">
              This report was auto-generated by Bengid Legacy Admin System • Official Santase Tech Station, Kumasi, Ghana
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
