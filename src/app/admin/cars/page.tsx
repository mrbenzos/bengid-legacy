'use client';

import { useState, useEffect } from 'react';
import { Car } from '@/lib/types';
import toast, { Toaster } from 'react-hot-toast';
import VehicleMediaSlots from '@/components/ui/VehicleMediaSlots';
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
  registration_type: 'Private',
  status: 'available' as 'available' | 'sold',
  accessories: [] as string[],
  images: [] as { label: string; url: string }[],
  image_url: '',
});

export default function AdminCarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(emptyForm());

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cars');
      if (res.ok) {
        const data = await res.json();
        setCars(data);
      }
    } catch (error) {
      console.error('Failed to fetch cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (car: Car | null = null) => {
    if (car) {
      setEditingCar(car);
      setFormData({
        model_name: car.model_name || '',
        vehicle_type: car.vehicle_type || 'Salon',
        brand: car.brand || '',
        year: car.year || new Date().getFullYear(),
        price: car.price || 0,
        color: car.color || '',
        fuel_type: car.fuel_type || 'Petrol',
        seating_capacity: car.seating_capacity || 5,
        overview: car.overview || '',
        licence_number: car.licence_number || '',
        registration_type: car.registration_type || 'Private',
        status: car.status || 'available',
        accessories: car.accessories || [],
        images: car.images || (car.image_url ? [{ label: 'Exterior', url: car.image_url }] : []),
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
  };

  const toggleAccessory = (acc: string) => {
    setFormData((prev) => ({
      ...prev,
      accessories: prev.accessories.includes(acc)
        ? prev.accessories.filter((a) => a !== acc)
        : [...prev.accessories, acc],
    }));
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this vehicle listing?')) {
      try {
        const res = await fetch(`/api/cars/${id}`, { method: 'DELETE' });
        if (res.ok) {
          fetchCars();
          toast.success('Vehicle deleted successfully.');
        } else {
          toast.error('Delete failed.');
        }
      } catch (error) {
        toast.error('Delete failed. Please try again.');
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const toastId = toast.loading(editingCar ? 'Updating vehicle...' : 'Adding vehicle...');

    try {
      const payload = {
        ...formData,
        images: formData.images.filter((img) => img.url),
        image_url: formData.images.find((img) => img.url)?.url || null,
      };

      const res = await fetch(editingCar ? `/api/cars/${editingCar.id}` : '/api/cars', {
        method: editingCar ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to save vehicle.');
      }

      await fetchCars();
      toast.success(editingCar ? 'Vehicle updated!' : 'Vehicle created!', { id: toastId });
      handleCloseModal();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error saving vehicle.', { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  const searchLower = (searchTerm || '').toLowerCase();
  const filteredCars = cars.filter((c) => {
    if (!searchTerm) return true;
    return (
      (c.model_name || '').toLowerCase().includes(searchLower) ||
      (c.brand || '').toLowerCase().includes(searchLower) ||
      (c.vehicle_type || '').toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6 animate-fadeIn text-white">
      <Toaster position="top-right" toastOptions={{ style: { background: '#111827', color: '#fff', border: '1px solid #2D3748' } }} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Automobile Inventory Management
          </h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-0.5">
            Manage showroom vehicles, luxury SUVs, Chinese EV models, and commercial trucks in Kumasi.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 bg-[#4B6F23] hover:bg-[#556B2F] text-white px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
        >
          <HiPlus className="text-base" />
          <span>Add Vehicle</span>
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-[#111827] rounded-3xl border border-[#2D3748] shadow-2xl overflow-hidden">
        {/* Search Bar */}
        <div className="p-4 sm:p-5 border-b border-[#1F2937] flex items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <HiMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Search vehicles by model, brand, or body type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#0B0F19] text-sm text-white rounded-full border border-[#2D3748] focus:border-[#4B6F23] focus:outline-none transition-all placeholder-slate-500"
            />
          </div>
          <span className="text-xs font-mono font-bold text-[#86efac] whitespace-nowrap">
            {filteredCars.length} vehicles
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-[#9CA3AF] font-semibold text-sm">Loading vehicles...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0B0F19] border-b border-[#1F2937] text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider">
                  <th className="px-6 py-4">Vehicle Model</th>
                  <th className="px-6 py-4">Brand</th>
                  <th className="px-6 py-4">Year</th>
                  <th className="px-6 py-4">Price (GHS)</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F2937]">
                {filteredCars.map((car) => (
                  <tr key={car.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-bold text-white">{car.model_name}</p>
                      <p className="text-[11px] text-[#9CA3AF]">{car.vehicle_type} • {car.fuel_type}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#0B0F19] text-[#86efac] border border-[#2D3748]">
                        {car.brand || 'Custom'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {car.year || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-extrabold text-white">
                        GHS {Number(car.price || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                        car.status === 'available'
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                          : 'bg-zinc-900/80 text-zinc-400 border border-zinc-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${car.status === 'available' ? 'bg-emerald-400' : 'bg-zinc-500'}`} />
                        {car.status === 'available' ? 'Available' : 'Sold'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(car)}
                          className="p-2 rounded-xl bg-[#0B0F19] border border-[#2D3748] hover:border-[#4B6F23] text-white hover:text-[#86efac] transition-all"
                          title="Edit"
                        >
                          <HiPencil className="text-sm" />
                        </button>
                        <button
                          onClick={() => handleDelete(car.id)}
                          className="p-2 rounded-xl bg-[#0B0F19] border border-[#2D3748] hover:border-rose-500 text-slate-400 hover:text-rose-400 transition-all"
                          title="Delete"
                        >
                          <HiTrash className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal in Dark Theme */}
      <Modal isOpen={showModal} onClose={handleCloseModal} title={editingCar ? 'Edit Vehicle Listing' : 'Add New Vehicle'}>
        <form onSubmit={handleSave} className="space-y-6 text-white">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#E5E7EB] mb-1.5">
                Model Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. BYD Seal EV Performance AWD / Toyota Yaris"
                value={formData.model_name}
                onChange={(e) => setFormData({ ...formData, model_name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-[#2D3748] text-sm text-white focus:outline-none focus:border-[#4B6F23]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#E5E7EB] mb-1.5">
                  Brand <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BYD / Changan / Toyota"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-[#2D3748] text-sm text-white focus:outline-none focus:border-[#4B6F23]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#E5E7EB] mb-1.5">
                  Vehicle Type <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.vehicle_type}
                  onChange={(e) => setFormData({ ...formData, vehicle_type: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-[#2D3748] text-sm text-white focus:outline-none focus:border-[#4B6F23] cursor-pointer"
                >
                  {DEFAULT_VEHICLE_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#E5E7EB] mb-1.5">
                  Year
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || new Date().getFullYear() })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-[#2D3748] text-sm text-white focus:outline-none focus:border-[#4B6F23]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#E5E7EB] mb-1.5">
                  Price (GHS) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-[#2D3748] text-sm text-white focus:outline-none focus:border-[#4B6F23]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#E5E7EB] mb-1.5">
                  Fuel Type
                </label>
                <select
                  value={formData.fuel_type}
                  onChange={(e) => setFormData({ ...formData, fuel_type: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-[#2D3748] text-sm text-white focus:outline-none focus:border-[#4B6F23] cursor-pointer"
                >
                  {FUEL_TYPES.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#E5E7EB] mb-1.5">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'available' | 'sold' })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-[#2D3748] text-sm text-white focus:outline-none focus:border-[#4B6F23] cursor-pointer"
                >
                  <option value="available">Available</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#E5E7EB] mb-1.5">Vehicle Overview</label>
              <textarea
                rows={3}
                placeholder="Overview of mechanical condition, transmission, customs papers..."
                value={formData.overview}
                onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-[#2D3748] text-sm text-white focus:outline-none focus:border-[#4B6F23] resize-none"
              ></textarea>
            </div>

            {/* Accessories Selection */}
            <div>
              <label className="block text-xs font-bold text-[#E5E7EB] mb-2">Accessories &amp; Features</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto p-3 bg-[#0B0F19] rounded-2xl border border-[#2D3748]">
                {DEFAULT_ACCESSORIES.map((acc) => {
                  const isChecked = formData.accessories.includes(acc);
                  return (
                    <button
                      type="button"
                      key={acc}
                      onClick={() => toggleAccessory(acc)}
                      className={`text-left text-xs px-2.5 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 ${
                        isChecked
                          ? 'bg-[#4B6F23] text-white border-[#86efac]'
                          : 'bg-[#111827] text-[#9CA3AF] border-[#2D3748] hover:text-white'
                      }`}
                    >
                      <span className="text-[10px]">{isChecked ? '✓' : '+'}</span>
                      <span className="truncate">{acc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Vehicle Media Slots */}
            <div>
              <label className="block text-xs font-bold text-[#E5E7EB] mb-2">Vehicle Image Photos</label>
              <VehicleMediaSlots
                media={formData.images}
                onChange={(imgs) => setFormData({ ...formData, images: imgs })}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#1F2937]">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-5 py-2.5 rounded-full text-xs font-bold text-[#9CA3AF] hover:text-white hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-full bg-[#4B6F23] hover:bg-[#556B2F] text-white text-xs font-bold shadow-md transition-all disabled:opacity-50"
            >
              {saving ? 'Saving...' : editingCar ? 'Update Vehicle' : 'Create Vehicle Listing'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
