'use client';

import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import MultiImageUpload from '@/components/ui/MultiImageUpload';
import Modal from '@/components/ui/Modal';
import {
  HiPlus,
  HiMagnifyingGlass,
  HiPencil,
  HiTrash,
} from 'react-icons/hi2';

interface Material {
  id: string;
  sku: string | null;
  name: string;
  category: string;
  brand: string | null;
  color: string | null;
  overview: string | null;
  features: string[];
  images: { label: string; url: string }[];
  price: number;
  unit: string;
  image_url: string | null;
  stock_status: string;
  created_at: string;
}

const DEFAULT_CATEGORIES = [
  'Inks',
  'Stationary',
  'Photo Papers',
  'Lamination Films',
  'Hardwares',
  'Delivery Service',
];

const emptyForm = () => ({
  name: '',
  category: '',
  brand: '',
  color: '',
  price: 0,
  priceOnRequest: false,
  unit: 'per roll',
  stock_status: 'in_stock',
  overview: '',
  features: [] as string[],
  images: [] as { label: string; url: string }[],
  image_url: '',
});

export default function AdminPrintingMaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState(emptyForm());
  const [customCategory, setCustomCategory] = useState('');

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/materials');
      if (res.ok) {
        const data = await res.json();
        setMaterials(data);
      }
    } catch (error) {
      console.error('Failed to fetch printing materials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (material: Material | null = null) => {
    if (material) {
      setEditingMaterial(material);
      const matchedCategory = DEFAULT_CATEGORIES.find(
        c => c.toLowerCase() === (material.category || '').toLowerCase()
      );
      const isPriceOnReq = Boolean(material.priceOnRequest || material.price_on_request);
      setFormData({
        name: material.name || '',
        category: matchedCategory ? matchedCategory : 'Other',
        brand: material.brand || '',
        color: material.color || '',
        price: material.price || 0,
        priceOnRequest: isPriceOnReq,
        unit: material.unit || 'per roll',
        stock_status: material.stock_status || 'in_stock',
        overview: material.overview || '',
        features: material.features || [],
        images: (material.images && material.images.length > 0) ? material.images : (material.image_url ? [{ label: 'Main Media', url: material.image_url }] : []),
        image_url: material.image_url || '',
      });
      setCustomCategory(matchedCategory ? '' : (material.category || ''));
    } else {
      setEditingMaterial(null);
      setFormData(emptyForm());
      setCustomCategory('');
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingMaterial(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this printing material?')) {
      try {
        const res = await fetch(`/api/materials/${id}`, { method: 'DELETE' });
        if (res.ok) {
          fetchMaterials();
          toast.success('Printing material deleted successfully.');
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
    
    // Dynamic Category validation & binding
    let finalCategory = formData.category;
    if (formData.category === 'Other') {
      const trimmedCustom = customCategory.trim();
      if (!trimmedCustom) {
        toast.error('Please enter a custom category name.');
        return;
      }
      finalCategory = trimmedCustom;
    } else if (!formData.category) {
      toast.error('Please select a category.');
      return;
    }

    // Price validation: only required if Call/Contact for Price is disabled
    if (!formData.priceOnRequest && (formData.price === undefined || formData.price === null || isNaN(formData.price))) {
      toast.error('Please enter a valid price or enable Call/Contact for Price.');
      return;
    }

    setSaving(true);
    const toastId = toast.loading(editingMaterial ? 'Updating printing material...' : 'Adding printing material...');
    
    try {
      const payload = { 
        ...formData, 
        price: formData.priceOnRequest ? (formData.price || 0) : formData.price,
        priceOnRequest: Boolean(formData.priceOnRequest),
        price_on_request: Boolean(formData.priceOnRequest),
        category: finalCategory,
        images: formData.images.filter((img) => img.url),
        image_url: formData.images.find((img) => img.url)?.url || null,
      };

      const res = await fetch(editingMaterial ? `/api/materials/${editingMaterial.id}` : '/api/materials', {
        method: editingMaterial ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Request failed');

      toast.success(editingMaterial ? 'Printing material updated!' : 'Printing material added!', { id: toastId });
      handleCloseModal();
      fetchMaterials();
    } catch (error) {
      toast.error('Failed to save printing material.', { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  const searchLower = (searchTerm || '').toLowerCase();
  const filteredMaterials = materials.filter(m => {
    const matchesSearch = !searchTerm || 
      (m.name || '').toLowerCase().includes(searchLower) || 
      (m.category || '').toLowerCase().includes(searchLower) ||
      (m.brand || '').toLowerCase().includes(searchLower);

    let matchesCategory = true;
    if (categoryFilter !== 'All') {
      if (categoryFilter === 'Other') {
        matchesCategory = !DEFAULT_CATEGORIES.some(c => c.toLowerCase() === (m.category || '').toLowerCase());
      } else {
        matchesCategory = (m.category || '').toLowerCase() === categoryFilter.toLowerCase();
      }
    }

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fadeIn text-[#111827]">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Printing Materials Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Add, update, and manage inventory of printing media rolls, photo papers, laminates, and inks.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 bg-[#4B6F23] hover:bg-[#3D5A1C] text-white px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
        >
          <HiPlus className="text-base" />
          <span>Add Printing Material</span>
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Search & Category Filter Bar */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto flex-1 max-w-2xl">
            <div className="relative flex-1">
              <HiMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search printing materials by name, category, or brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F9FAFB] text-sm text-gray-900 rounded-full border border-gray-300 focus:border-[#4B6F23] focus:outline-none transition-all placeholder-gray-400"
              />
            </div>

            {/* Category Dropdown Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2.5 bg-[#F9FAFB] text-xs sm:text-sm font-semibold text-gray-800 rounded-full border border-gray-300 focus:border-[#4B6F23] focus:outline-none transition-all cursor-pointer"
            >
              <option value="All">All Categories</option>
              {DEFAULT_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
              <option value="Other">Other (Custom)</option>
            </select>
          </div>
          <span className="text-xs font-mono font-bold text-[#4B6F23] whitespace-nowrap">
            {filteredMaterials.length} printing materials
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-500 font-semibold text-sm">Loading printing materials...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                  <th className="px-6 py-4">Item Details</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price (GHS)</th>
                  <th className="px-6 py-4">Unit</th>
                  <th className="px-6 py-4">Stock Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredMaterials.map((material) => (
                  <tr key={material.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-bold text-gray-900">{material.name}</p>
                      <p className="text-[11px] text-gray-500">{material.brand || 'No Brand'}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#4B6F23] border border-emerald-200">
                        {material.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {material.priceOnRequest || material.price_on_request ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs">
                          Contact for Price
                        </span>
                      ) : (
                        <span className="text-sm font-extrabold text-gray-900">
                          GHS {Number(material.price).toFixed(2)}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                      {material.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                        material.stock_status === 'in_stock'
                          ? 'bg-emerald-50 text-[#4B6F23] border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${material.stock_status === 'in_stock' ? 'bg-[#4B6F23]' : 'bg-rose-500'}`} />
                        {material.stock_status === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(material)}
                          className="p-2 rounded-xl bg-gray-50 border border-gray-200 hover:border-[#4B6F23] text-gray-700 hover:text-[#4B6F23] transition-all"
                          title="Edit"
                        >
                          <HiPencil className="text-sm" />
                        </button>
                        <button
                          onClick={() => handleDelete(material.id)}
                          className="p-2 rounded-xl bg-gray-50 border border-gray-200 hover:border-rose-400 text-gray-400 hover:text-rose-600 transition-all"
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

      {/* Modal with Dynamic Category Logic & Crisp Light Theme */}
      <Modal open={showModal} onClose={handleCloseModal} title={editingMaterial ? 'Edit Printing Material' : 'Add New Printing Material'}>
        <form onSubmit={handleSave} className="space-y-6 text-gray-900 p-6 overflow-y-auto max-h-[75vh]">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Printing Material Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Premium High-Gloss RC Photo Paper (A4 / 260gsm)"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F9FAFB] border border-gray-300 text-sm text-gray-900 focus:outline-none focus:border-[#4B6F23]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Brand</label>
                <input
                  type="text"
                  placeholder="e.g. Epson Compatible / MasterLam"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F9FAFB] border border-gray-300 text-sm text-gray-900 focus:outline-none focus:border-[#4B6F23]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData({ ...formData, category: val });
                    if (val !== 'Other') {
                      setCustomCategory('');
                    }
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F9FAFB] border border-gray-300 text-sm text-gray-900 focus:outline-none focus:border-[#4B6F23] cursor-pointer"
                >
                  <option value="">Select a category</option>
                  {DEFAULT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                  <option value="Other">Other</option>
                </select>

                {/* DYNAMIC CATEGORY FIELD: Rendered directly underneath dropdown when "Other" is chosen */}
                {formData.category === 'Other' && (
                  <div className="animate-fadeIn mt-2.5 p-3.5 rounded-xl bg-emerald-50/80 border border-[#4B6F23]/40 shadow-xs">
                    <label className="block text-xs font-bold text-[#4B6F23] mb-1.5">
                      Custom Category Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter custom category name (e.g. Backlit Film Media)"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-white border border-[#4B6F23] text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4B6F23]/20"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-gray-700">
                    Price (GHS) {!formData.priceOnRequest && <span className="text-red-500">*</span>}
                  </label>
                  <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.priceOnRequest}
                      onChange={(e) => setFormData({ ...formData, priceOnRequest: e.target.checked })}
                      className="w-3.5 h-3.5 rounded text-[#4B6F23] focus:ring-[#4B6F23] border-gray-300 cursor-pointer accent-[#4B6F23]"
                    />
                    <span className="text-[11px] font-bold text-[#4B6F23]">Call/Contact for Price</span>
                  </label>
                </div>

                {formData.priceOnRequest ? (
                  <div className="w-full px-4 py-2.5 rounded-xl bg-amber-50/90 border border-amber-300 text-amber-900 text-xs font-bold flex items-center justify-between shadow-2xs">
                    <span>Contact for Price</span>
                    <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-200/60 px-2 py-0.5 rounded">Enabled</span>
                  </div>
                ) : (
                  <input
                    type="number"
                    step="0.01"
                    required={!formData.priceOnRequest}
                    placeholder="0.00"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F9FAFB] border border-gray-300 text-sm text-gray-900 focus:outline-none focus:border-[#4B6F23]"
                  />
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Unit <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. per roll / per pack"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F9FAFB] border border-gray-300 text-sm text-gray-900 focus:outline-none focus:border-[#4B6F23]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Stock Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.stock_status}
                  onChange={(e) => setFormData({ ...formData, stock_status: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F9FAFB] border border-gray-300 text-sm text-gray-900 focus:outline-none focus:border-[#4B6F23] cursor-pointer"
                >
                  <option value="in_stock">In Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Product Overview</label>
              <textarea
                rows={3}
                placeholder="Brief technical and operational description of this printing media..."
                value={formData.overview}
                onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F9FAFB] border border-gray-300 text-sm text-gray-900 focus:outline-none focus:border-[#4B6F23] resize-none"
              ></textarea>
            </div>

            {/* Media Uploads */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Printing Media Photos</label>
              <MultiImageUpload
                images={formData.images}
                onChange={(imgs) => setFormData({ ...formData, images: imgs })}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-5 py-2.5 rounded-full text-xs font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-full bg-[#4B6F23] hover:bg-[#3D5A1C] text-white text-xs font-bold shadow-sm transition-all disabled:opacity-50 cursor-pointer"
            >
              {saving ? 'Saving...' : editingMaterial ? 'Update Printing Material' : 'Create Printing Material'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
