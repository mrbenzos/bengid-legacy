'use client';

import { useState, useEffect, useRef } from 'react';
import { Car } from '@/lib/types';
import toast, { Toaster } from 'react-hot-toast';
import VehicleMediaSlots, { sortMedia } from '@/components/ui/VehicleMediaSlots';
import Modal from '@/components/ui/Modal';
import {
  HiPlus,
  HiPencil,
  HiTrash,
  HiXMark,
  HiCheck,
  HiPhoto,
  HiMagnifyingGlass,
  HiChevronDown,
} from 'react-icons/hi2';

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_VEHICLE_TYPES = ['Salon', 'SUV / 4WD', 'Heavy Duty', 'Pickup', 'Mini Van', 'Bus / Coaster'];

const DEFAULT_ACCESSORIES = [
  'Air Conditioner',
  'Antilock Braking System (ABS)',
  'Brake Assist',
  'CD Player',
  'Central Locking',
  'Crash Sensor',
  'Driver Airbag',
  'Leather Seats',
  'Passenger Airbag',
  'Power Door Locks',
  'Power Steering',
  'Power Windows',
  'Sunroof',
  'Bluetooth / USB Audio',
  'Reverse Camera',
  'Keyless Entry',
  'Navigation / GPS',
  'Heated Seats',
  'Alloy Wheels',
  'Traction Control',
];

const FUEL_TYPES = ['Petrol', 'Diesel', 'Hybrid', 'Electric', 'LPG'];

const REGISTRATION_TYPES = ['Private', 'Commercial', 'Government', 'Diplomatic', 'Dealer'];

// ─── Empty form ───────────────────────────────────────────────────────────────

const emptyForm = () => ({
  model_name: '',
  vehicle_type: 'Salon',
  brand: '',
  year: new Date().getFullYear(),
  price: 0,
  color: '',
  fuel_type: 'Petrol',
  seating_capacity: 5,
  overview: '',
  licence_number: '',
  registration_type: '',
  status: 'available' as 'available' | 'sold',
  accessories: [] as string[],
  images: [] as { label: string; url: string }[],
  image_url: '',
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(emptyForm());
  const [vehicleTypes, setVehicleTypes] = useState<string[]>(DEFAULT_VEHICLE_TYPES);
  const [accessories, setAccessories] = useState<string[]>(DEFAULT_ACCESSORIES);
  const [newTypeInput, setNewTypeInput] = useState('');
  const [newAccessoryInput, setNewAccessoryInput] = useState('');
  const [showNewTypeInput, setShowNewTypeInput] = useState(false);
  const [showNewAccessoryInput, setShowNewAccessoryInput] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => { fetchCars(); }, []);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cars');
      if (res.ok) {
        const data = await res.json();
        setCars(data);
      } else {
        setCars([
          { id: '1', sku: null, model_name: 'Toyota Yaris', vehicle_type: 'Salon', brand: 'Toyota', year: 2018, price: 85000, color: 'White', fuel_type: 'Petrol', seating_capacity: 5, overview: '', licence_number: null, registration_type: null, accessories: [], images: [], status: 'available', image_url: null, created_at: new Date().toISOString() },
          { id: '2', sku: null, model_name: 'Hyundai Accent', vehicle_type: 'Salon', brand: 'Hyundai', year: 2019, price: 92000, color: 'Silver', fuel_type: 'Petrol', seating_capacity: 5, overview: '', licence_number: null, registration_type: null, accessories: [], images: [], status: 'available', image_url: null, created_at: new Date().toISOString() },
        ]);
      }
    } catch {
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (car: Car | null = null) => {
    if (car) {
      setEditingCar(car);
      setFormData({
        model_name: car.model_name,
        vehicle_type: car.vehicle_type || 'Salon',
        brand: car.brand || '',
        year: car.year || new Date().getFullYear(),
        price: car.price || 0,
        color: car.color || '',
        fuel_type: car.fuel_type || 'Petrol',
        seating_capacity: car.seating_capacity || 5,
        overview: car.overview || '',
        licence_number: car.licence_number || '',
        registration_type: car.registration_type || '',
        status: (car.status?.toLowerCase() === 'sold' ? 'sold' : 'available') as 'available' | 'sold',
        accessories: car.accessories || [],
        images: (car.images && car.images.length > 0) ? car.images : (car.image_url ? [{ label: 'Exterior – Front', url: car.image_url }] : []),
        image_url: car.image_url || '',
      });
    } else {
      setEditingCar(null);
      setFormData(emptyForm());
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCar(null);
    setNewTypeInput('');
    setNewAccessoryInput('');
    setShowNewTypeInput(false);
    setShowNewAccessoryInput(false);
  };

  const toggleAccessory = (acc: string) => {
    setFormData((prev) => ({
      ...prev,
      accessories: prev.accessories.includes(acc)
        ? prev.accessories.filter((a) => a !== acc)
        : [...prev.accessories, acc],
    }));
  };

  const addNewType = () => {
    const trimmed = newTypeInput.trim();
    if (!trimmed) return;
    if (!vehicleTypes.includes(trimmed)) setVehicleTypes((prev) => [...prev, trimmed]);
    setFormData((prev) => ({ ...prev, vehicle_type: trimmed }));
    setNewTypeInput('');
    setShowNewTypeInput(false);
  };

  const addNewAccessory = () => {
    const trimmed = newAccessoryInput.trim();
    if (!trimmed) return;
    if (!accessories.includes(trimmed)) setAccessories((prev) => [...prev, trimmed]);
    setFormData((prev) => ({ ...prev, accessories: [...prev.accessories, trimmed] }));
    setNewAccessoryInput('');
    setShowNewAccessoryInput(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this vehicle?')) return;
    try {
      await fetch(`/api/cars/${id}`, { method: 'DELETE' });
      setCars((prev) => prev.filter((c) => c.id !== id));
      toast.success('Vehicle deleted.');
    } catch {
      toast.error('Delete failed. Please try again.');
    }
  };

  const handleMarkAsSold = async (id: string) => {
    try {
      const res = await fetch(`/api/cars/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'sold' }),
      });
      if (res.ok) fetchCars();
      else setCars((prev) => prev.map((c) => c.id === id ? { ...c, status: 'sold' } : c));
      toast.success('Vehicle marked as sold!');
    } catch {
      setCars((prev) => prev.map((c) => c.id === id ? { ...c, status: 'sold' } : c));
      toast.success('Vehicle marked as sold!');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.model_name.trim() || !formData.brand.trim()) {
      toast.error('Model name and brand are required.');
      return;
    }
    setSaving(true);
    const toastId = toast.loading(editingCar ? 'Updating vehicle...' : 'Adding vehicle...');
    try {
      const orderedImages = sortMedia(formData.images.filter((img) => img.url));
      const payload = {
        ...formData,
        images: orderedImages,
        image_url: orderedImages[0]?.url || null,
      };

      const res = await fetch(editingCar ? `/api/cars/${editingCar.id}` : '/api/cars', {
        method: editingCar ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Server rejected the vehicle.');
      }
      await fetchCars();
      toast.success(editingCar ? 'Vehicle updated!' : 'Vehicle added!', { id: toastId });
      handleCloseModal();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save. Please try again.', { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  const searchLower = (searchTerm || '').toLowerCase();
  const filteredCars = cars.filter(c => {
    if (!searchTerm) return true;
    return (c.model_name || '').toLowerCase().includes(searchLower) ||
           (c.brand || '').toLowerCase().includes(searchLower) ||
           (c.vehicle_type || '').toLowerCase().includes(searchLower) ||
           (c.year || '').toString().includes(searchLower);
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      <Toaster position="top-right" toastOptions={{ style: { fontSize: '13px', fontWeight: '600' } }} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Vehicles</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Manage your automobile division inventory.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 bg-[#165b33] hover:bg-[#124b2a] text-white px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <HiPlus className="text-base" />
          <span>Add Vehicle</span>
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
            <input
              type="text"
              placeholder="Search by model, brand, type or year..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#f4f6f4] focus:bg-white text-sm text-slate-800 rounded-full border border-transparent focus:border-slate-300 focus:outline-none transition-all"
            />
          </div>
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap">{filteredCars.length} vehicles</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 font-semibold text-sm">Loading vehicles...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#fafbfa] border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-3.5">Vehicle</th>
                  <th className="px-6 py-3.5">Type</th>
                  <th className="px-6 py-3.5">Year</th>
                  <th className="px-6 py-3.5">Price (GHS)</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCars.map((car) => {
                  const isAvailable = car.status?.toLowerCase() === 'available';
                  return (
                    <tr key={car.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-900">{car.model_name}</p>
                        <p className="text-[11px] text-slate-500">{car.brand}</p>
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-500">{car.vehicle_type || '—'}</td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-500">{car.year || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm font-black text-[#165b33]">
                        {car.price != null ? `GHS ${Number(car.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}` : 'Negotiable'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${isAvailable ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-500'}`}>
                          {isAvailable ? 'Available' : 'Sold'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm">
                        {isAvailable && (
                          <button onClick={() => handleMarkAsSold(car.id)} className="text-amber-600 hover:underline font-bold text-xs mr-3 cursor-pointer">
                            Mark Sold
                          </button>
                        )}
                        <button onClick={() => handleOpenModal(car)} className="text-[#165b33] hover:underline font-bold text-xs mr-3 cursor-pointer">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(car.id)} className="text-rose-500 hover:underline font-bold text-xs cursor-pointer">
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filteredCars.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-400">No vehicles found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── MODAL ── */}
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        title={editingCar ? 'Edit Vehicle' : 'Add New Vehicle'}
        subtitle="Fill in vehicle details accurately"
      >
            <form onSubmit={handleSave} className="p-4 sm:p-7 space-y-8">

              {/* ── SECTION 1: Classification ── */}
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-4">Vehicle Classification</p>
                <div className="space-y-4">

                  {/* Vehicle Type */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-2">Vehicle Type <span className="text-rose-500">*</span></label>
                    <div className="flex flex-wrap gap-2">
                      {vehicleTypes.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, vehicle_type: t }))}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            formData.vehicle_type === t
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setShowNewTypeInput(!showNewTypeInput)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold border border-dashed border-slate-300 text-slate-500 hover:border-slate-500 hover:text-slate-600 transition-all cursor-pointer flex items-center gap-1"
                      >
                        <HiPlus className="text-xs" /> Add Type
                      </button>
                    </div>
                    {showNewTypeInput && (
                      <div className="flex gap-2 mt-2">
                        <input
                          type="text"
                          value={newTypeInput}
                          onChange={(e) => setNewTypeInput(e.target.value)}
                          placeholder="e.g. Ambulance"
                          className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#165b33]"
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addNewType())}
                        />
                        <button type="button" onClick={addNewType} className="px-4 py-2 bg-[#165b33] text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-[#124b2a]">Add</button>
                      </div>
                    )}
                  </div>

                  {/* Brand + Model */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Vehicle Brand <span className="text-rose-500">*</span></label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Toyota"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#165b33]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Model Name <span className="text-rose-500">*</span></label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Land Cruiser Prado"
                        value={formData.model_name}
                        onChange={(e) => setFormData({ ...formData, model_name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#165b33]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-slate-200" />

              {/* ── SECTION 2: Vehicle Info ── */}
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-4">Vehicle Information</p>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Model Year */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Model Year</label>
                      <input
                        type="number"
                        min="1980"
                        max={new Date().getFullYear() + 1}
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#165b33]"
                      />
                    </div>

                    {/* Fuel Type */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Fuel Type</label>
                      <select
                        value={formData.fuel_type || 'Petrol'}
                        onChange={(e) => setFormData({ ...formData, fuel_type: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#165b33] bg-white"
                      >
                        {FUEL_TYPES.map((f) => <option key={f}>{f}</option>)}
                      </select>
                    </div>

                    {/* Seating Capacity */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Seating Capacity</label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={formData.seating_capacity || 5}
                        onChange={(e) => setFormData({ ...formData, seating_capacity: parseInt(e.target.value) || 5 })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#165b33]"
                      />
                    </div>

                    {/* Color */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Color <span className="text-rose-500">*</span></label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Pearl White"
                        value={formData.color || ''}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#165b33]"
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Price (GHS) <span className="text-rose-500">*</span></label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                        placeholder="0.00"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#165b33]"
                      />
                    </div>

                    {/* Status */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Availability</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as 'available' | 'sold' })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#165b33] bg-white"
                      >
                        <option value="available">Available</option>
                        <option value="sold">Sold</option>
                      </select>
                    </div>
                  </div>

                  {/* Licence Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Licence Number <span className="text-slate-500 font-normal">(optional)</span></label>
                      <input
                        type="text"
                        placeholder="e.g. GR-2345-21"
                        value={formData.licence_number || ''}
                        onChange={(e) => setFormData({ ...formData, licence_number: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#165b33]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Registration Type <span className="text-slate-500 font-normal">(optional)</span></label>
                      <select
                        value={formData.registration_type || ''}
                        onChange={(e) => setFormData({ ...formData, registration_type: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#165b33] bg-white"
                      >
                        <option value="">Select registration type...</option>
                        {REGISTRATION_TYPES.map((r) => <option key={r}>{r}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Overview */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Vehicle Overview</label>
                    <textarea
                      rows={3}
                      placeholder="Describe the vehicle condition, history, features, and any notable information..."
                      value={formData.overview || ''}
                      onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#165b33] resize-none"
                    />
                  </div>
                </div>
              </div>

              <hr className="border-slate-200" />

              {/* ── SECTION 3: Images ── */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6">
                <VehicleMediaSlots
                  images={formData.images.filter((img) => img.url)}
                  onChange={(images) => setFormData((prev) => ({ ...prev, images }))}
                />
              </div>

              <hr className="border-slate-200" />

              {/* ── SECTION 4: Accessories ── */}
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-4">Accessories & Features</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {accessories.map((acc) => {
                    const selected = formData.accessories.includes(acc);
                    return (
                      <button
                        key={acc}
                        type="button"
                        onClick={() => toggleAccessory(acc)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          selected
                            ? 'bg-[#165b33] text-white border-[#165b33]'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        {selected && <HiCheck className="text-xs" />}
                        {acc}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => setShowNewAccessoryInput(!showNewAccessoryInput)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border border-dashed border-slate-300 text-slate-500 hover:border-slate-500 hover:text-slate-600 transition-all cursor-pointer"
                  >
                    <HiPlus className="text-xs" /> Add Accessory
                  </button>
                </div>
                {showNewAccessoryInput && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newAccessoryInput}
                      onChange={(e) => setNewAccessoryInput(e.target.value)}
                      placeholder="e.g. Dual Exhaust"
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#165b33]"
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addNewAccessory())}
                    />
                    <button type="button" onClick={addNewAccessory} className="px-4 py-2 bg-[#165b33] text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-[#124b2a]">Add</button>
                  </div>
                )}
                {formData.accessories.length > 0 && (
                  <p className="text-[11px] text-slate-500 mt-2">{formData.accessories.length} accessorie(s) selected</p>
                )}
              </div>

              {/* Footer Actions */}
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 sticky bottom-0 -mx-4 sm:-mx-7 -mb-4 sm:-mb-7 px-4 sm:px-7 py-4 bg-white/95 backdrop-blur border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-full bg-[#165b33] hover:bg-[#124b2a] text-white font-bold text-sm shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                >
                  {saving ? 'Saving...' : editingCar ? 'Update Vehicle' : 'Save Vehicle'}
                </button>
              </div>

            </form>
      </Modal>
    </div>
  );
}
