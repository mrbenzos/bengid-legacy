'use client';

import { useState, useEffect } from 'react';
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
      // In a real app, this would be an API call with filters.
      // We will fetch all and simulate.
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
          materials: leads.filter(l => l.division === 'materials').length,
          cars: leads.filter(l => l.division === 'cars').length,
          importations: leads.filter(l => l.division === 'importations').length,
        }
      };

      setTimeout(() => {
        setReportData(report);
        setGenerated(true);
        setGenerating(false);
        toast.success('Report generated successfully');
      }, 800);
      
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
    <div className="min-h-screen bg-white p-6 md:p-8">
      <Toaster position="top-right" />
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-report, #printable-report * {
            visibility: visible;
          }
          #printable-report {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 20px;
            box-shadow: none;
            background: white;
          }
          .no-print {
            display: none !important;
          }
        }
      ` }} />

      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-black text-slate-900 no-print">Reports & Analytics</h1>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 no-print">
          <div className="flex flex-wrap gap-2 mb-6">
            <button 
              onClick={() => setReportType('monthly')}
              className={`px-4 py-2 rounded-full font-bold text-sm transition-colors ${reportType === 'monthly' ? 'bg-[#165b33] text-white' : 'bg-slate-50 text-slate-300 hover:bg-slate-200'}`}
            >
              Monthly Report
            </button>
            <button 
              onClick={() => setReportType('annual')}
              className={`px-4 py-2 rounded-full font-bold text-sm transition-colors ${reportType === 'annual' ? 'bg-[#165b33] text-white' : 'bg-slate-50 text-slate-300 hover:bg-slate-200'}`}
            >
              Annual Report
            </button>
            <button 
              onClick={() => setReportType('custom')}
              className={`px-4 py-2 rounded-full font-bold text-sm transition-colors ${reportType === 'custom' ? 'bg-[#165b33] text-white' : 'bg-slate-50 text-slate-300 hover:bg-slate-200'}`}
            >
              Custom Range
            </button>
          </div>

          <div className="flex flex-wrap items-end gap-4">
            {reportType === 'monthly' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Month</label>
                  <select 
                    value={selectedMonth} 
                    onChange={e => setSelectedMonth(Number(e.target.value))}
                    className="border border-slate-300 rounded-xl px-4 py-2 bg-white focus:ring-2 focus:ring-[#165b33] outline-none"
                  >
                    {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Year</label>
                  <input 
                    type="number" 
                    value={selectedYear} 
                    onChange={e => setSelectedYear(Number(e.target.value))}
                    className="border border-slate-300 rounded-xl px-4 py-2 bg-white w-24 focus:ring-2 focus:ring-[#165b33] outline-none"
                  />
                </div>
              </>
            )}

            {reportType === 'annual' && (
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Year</label>
                <input 
                  type="number" 
                  value={selectedYear} 
                  onChange={e => setSelectedYear(Number(e.target.value))}
                  className="border border-slate-300 rounded-xl px-4 py-2 bg-white w-24 focus:ring-2 focus:ring-[#165b33] outline-none"
                />
              </div>
            )}

            {reportType === 'custom' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">From</label>
                  <input 
                    type="date" 
                    value={customFrom} 
                    onChange={e => setCustomFrom(e.target.value)}
                    className="border border-slate-300 rounded-xl px-4 py-2 bg-white focus:ring-2 focus:ring-[#165b33] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">To</label>
                  <input 
                    type="date" 
                    value={customTo} 
                    onChange={e => setCustomTo(e.target.value)}
                    className="border border-slate-300 rounded-xl px-4 py-2 bg-white focus:ring-2 focus:ring-[#165b33] outline-none"
                  />
                </div>
              </>
            )}

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="bg-[#165b33] hover:bg-[#0c2f1a] text-white rounded-xl px-6 py-2.5 font-bold transition-colors flex items-center gap-2 disabled:opacity-70"
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
                className="border-2 border-slate-300 hover:bg-slate-50 text-slate-600 rounded-xl px-6 py-2.5 font-bold transition-colors flex items-center gap-2"
              >
                <HiPrinter className="text-lg" /> Print Report
              </button>
            )}
          </div>
        </div>

        {generated && reportData && (
          <div id="printable-report" className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mt-8">
            <div className="text-center mb-10 pb-6 border-b-2 border-slate-200">
              <h1 className="text-2xl font-black text-[#165b33] mb-1">BENGID LEGACY GHANA LIMITED</h1>
              <h2 className="text-xl font-bold text-slate-800 mb-2">Official Business Report</h2>
              <p className="text-slate-500 font-medium flex items-center justify-center gap-2">
                <HiCalendar /> Period: {periodText}
              </p>
              <p className="text-xs text-slate-500 mt-2">Generated on: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="mb-10">
              <h3 className="text-lg font-bold text-slate-900 mb-4 bg-white p-3 rounded-lg border border-slate-200">1. INVENTORY SUMMARY</h3>
              <div className="grid grid-cols-2 gap-8 px-4">
                <div>
                  <h4 className="font-bold text-slate-600 mb-3 border-b pb-1">Materials Division</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex justify-between"><span>Total Items:</span> <span className="font-bold text-slate-900">{reportData.materials.total}</span></li>
                    <li className="flex justify-between"><span>In Stock:</span> <span className="font-bold text-emerald-600">{reportData.materials.inStock}</span></li>
                    <li className="flex justify-between"><span>Out of Stock:</span> <span className="font-bold text-red-600">{reportData.materials.outOfStock}</span></li>
                    <li className="flex justify-between pt-2 border-t mt-2"><span>Total Catalog Value:</span> <span className="font-bold text-[#0369a1]">GHS {reportData.materials.catalogValue.toLocaleString()}</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-600 mb-3 border-b pb-1">Automobile Division</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex justify-between"><span>Total Vehicles:</span> <span className="font-bold text-slate-900">{reportData.vehicles.total}</span></li>
                    <li className="flex justify-between"><span>Available:</span> <span className="font-bold text-emerald-600">{reportData.vehicles.available}</span></li>
                    <li className="flex justify-between"><span>Sold:</span> <span className="font-bold text-slate-500">{reportData.vehicles.sold}</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-lg font-bold text-slate-900 mb-4 bg-white p-3 rounded-lg border border-slate-200">2. VEHICLE BREAKDOWN</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="bg-white border-y border-slate-200">
                      <th className="px-4 py-3 font-bold text-slate-600">Vehicle Name</th>
                      <th className="px-4 py-3 font-bold text-slate-600">Type</th>
                      <th className="px-4 py-3 font-bold text-slate-600">Brand</th>
                      <th className="px-4 py-3 font-bold text-slate-600">Year</th>
                      <th className="px-4 py-3 font-bold text-slate-600">Price (GHS)</th>
                      <th className="px-4 py-3 font-bold text-slate-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.carsList.length > 0 ? (
                      reportData.carsList.map((car: Car) => (
                        <tr key={car.id} className="border-b border-slate-200 hover:bg-slate-50">
                          <td className="px-4 py-2 font-medium">{car.model_name}</td>
                          <td className="px-4 py-2">{car.vehicle_type}</td>
                          <td className="px-4 py-2">{car.brand}</td>
                          <td className="px-4 py-2">{car.year || '-'}</td>
                          <td className="px-4 py-2">{car.price ? car.price.toLocaleString() : 'N/A'}</td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${car.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-slate-50 text-slate-500'}`}>
                              {car.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan={6} className="px-4 py-4 text-center text-slate-500 italic">No vehicles found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-lg font-bold text-slate-900 mb-4 bg-white p-3 rounded-lg border border-slate-200">3. MATERIALS BREAKDOWN</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="bg-white border-y border-slate-200">
                      <th className="px-4 py-3 font-bold text-slate-600">Name</th>
                      <th className="px-4 py-3 font-bold text-slate-600">Category</th>
                      <th className="px-4 py-3 font-bold text-slate-600">Price (GHS)</th>
                      <th className="px-4 py-3 font-bold text-slate-600">Unit</th>
                      <th className="px-4 py-3 font-bold text-slate-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.materialsList.length > 0 ? (
                      reportData.materialsList.map((mat: Material) => (
                        <tr key={mat.id} className="border-b border-slate-200 hover:bg-slate-50">
                          <td className="px-4 py-2 font-medium">{mat.name}</td>
                          <td className="px-4 py-2">{mat.category}</td>
                          <td className="px-4 py-2">{mat.price.toLocaleString()}</td>
                          <td className="px-4 py-2">{mat.unit}</td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${mat.stock_status === 'in_stock' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {mat.stock_status.replace('_', ' ')}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan={5} className="px-4 py-4 text-center text-slate-500 italic">No materials found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4 bg-white p-3 rounded-lg border border-slate-200">4. LEADS SUMMARY</h3>
              <div className="px-4 flex gap-8 text-sm text-slate-600">
                <div><span className="block text-xs font-bold text-slate-500 uppercase">Total Leads</span> <span className="text-xl font-black text-slate-900">{reportData.leads.total}</span></div>
                <div><span className="block text-xs font-bold text-slate-500 uppercase">Materials</span> <span className="text-xl font-black text-[#0369a1]">{reportData.leads.materials}</span></div>
                <div><span className="block text-xs font-bold text-slate-500 uppercase">Automobiles</span> <span className="text-xl font-black text-[#165b33]">{reportData.leads.cars}</span></div>
                <div><span className="block text-xs font-bold text-slate-500 uppercase">Importations</span> <span className="text-xl font-black text-amber-600">{reportData.leads.importations}</span></div>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t-2 border-slate-200 text-center text-xs text-slate-500 font-medium">
              This report was auto-generated by Bengid Legacy Admin System on {new Date().toLocaleDateString()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
