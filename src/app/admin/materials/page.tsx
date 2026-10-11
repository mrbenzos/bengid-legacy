'use client';

import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import MultiImageUpload from '@/components/ui/MultiImageUpload';
import Modal from '@/components/ui/Modal';
import {
  HiPlus,
  HiMagnifyingGlass,
  HiXMark,
  HiCheck,
  HiPhoto,
  HiPencil,
  HiTrash,
  HiPrinter,
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
  'Photo Papers',
  'Lamination Films',
  'Inks & Toners',
  'Flex',
  'Vinyl',
  'One-Way-Vision',
  'Stationery & Cutters',
  'Canvas',
  'Tarpaulin',
];

const DEFAULT_FEATURES = [
  'Waterproof Barrier',
  'UV Light Resistant',
  'High Gloss Finish',
  'Matte Finish',
  'Tear Resistant',
  'Eco-Solvent Friendly',
  'Instant Dry',
];

const emptyForm = () => ({
  name: '',
  category: '',
  brand: '',
  color: '',
  price: 0,
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
  const [showModal, setShowModal] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState(emptyForm());
  const [customCategory, setCustomCategory] = useState('');
  
  const [features, setFeatures] = useState<string[]>(DEFAULT_FEATURES);
  const [newFeatureInput, setNewFeatureInput] = useState('');
  const [showNewFeatureInput, setShowNewFeatureInput] = useState(false);

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
      const isStandard = DEFAULT_CATEGORIES.some(c => c.toLowerCase() === (material.category || '').toLowerCase());
      setFormData({
        name: material.name || '',
        category: isStandard ? material.category : 'Other',
        brand: material.brand || '',
        color: material.color || '',
        price: material.price || 0,
        unit: material.unit || 'per roll',
        stock_status: material.stock_status || 'in_stock',
        overview: material.overview || '',
        features: material.features || [],
        images: (material.images && material.images.length > 0) ? material.images : (material.image_url ? [{ label: 'Main Media', url: material.image_url }] : []),
        image_url: material.image_url || '',
      });
      setCustomCategory(isStandard ? '' : material.category);
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
    setNewFeatureInput('');
    setShowNewFeatureInput(false);
  };

  const toggleFeature = (feat: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feat)
        ? prev.features.filter((f) => f !== feat)
        : [...prev.features, feat],
    }));
  };

  const addNewFeature = () => {
    const trimmed = newFeatureInput.trim();
    if (!trimmed) return;
    if (!features.includes(trimmed)) setFeatures((prev) => [...prev, trimmed]);
    setFormData((prev) => ({ ...prev, features: [...prev.features, trimmed] }));
    setNewFeatureInput('');
    setShowNewFeatureInput(false);
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

    setSaving(true);
    const toastId = toast.loading(editingMaterial ? 'Updating printing material...' : 'Adding printing material...');
    
    try {
      const payload = { 
        ...formData, 
        category: finalCategory,
        images: formData.images.filter((img) => img.url),
        image_url: formData.images.find((img) => img.url)?.url || null,
      };

      const res = await fetch(editingMaterial ? `/api/materials/${editingMaterial.id}` : '/api/materials', {
        method: editingMaterial ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Server rejected the printing material payload.');
      }
      
      await fetchMaterials();
      toast.success(editingMaterial ? 'Printing material updated!' : 'Printing material added!', { id: toastId });
      handleCloseModal();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save printing material.', { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  const searchLower = (searchTerm || '').toLowerCase();
  const filteredMaterials = materials.filter(m => {
    if (!searchTerm) return true;
    return (m.name || '').toLowerCase().includes(searchLower) || 
           (m.category || '').toLowerCase().includes(searchLower) ||
           (m.brand || '').toLowerCase().includes(searchLower);
  });

  return (
    <div className="space-y-6 animate-fadeIn text-white">
      <Toaster position="top-right" toastOptions={{ style: { background: '#111827', color: '#fff', border: '1px solid #2D3748' } }} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Printing Materials Management
          </h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-0.5">
            Add, update, and manage inventory of printing media rolls, photo papers, laminates, and inks.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 bg-[#4B6F23] hover:bg-[#556B2F] text-white px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
        >
          <HiPlus className="text-base" />
          <span>Add Printing Material</span>
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
              placeholder="Search printing materials by name, category, or brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#0B0F19] text-sm text-white rounded-full border border-[#2D3748] focus:border-[#4B6F23] focus:outline-none transition-all placeholder-slate-500"
            />
          </div>
          <span className="text-xs font-mono font-bold text-[#86efac] whitespace-nowrap">
            {filteredMaterials.length} printing materials
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-[#9CA3AF] font-semibold text-sm">Loading printing materials...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0B0F19] border-b border-[#1F2937] text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider">
                  <th className="px-6 py-4">Item Details</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price (GHS)</th>
                  <th className="px-6 py-4">Unit</th>
                  <th className="px-6 py-4">Stock Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F2937]">
                {filteredMaterials.map((material) => (
                  <tr key={material.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-bold text-white">{material.name}</p>
                      <p className="text-[11px] text-[#9CA3AF]">{material.brand || 'No Brand'}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#0B0F19] text-[#86efac] border border-[#2D3748]">
                        {material.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-extrabold text-white">
                        GHS {Number(material.price).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-[#9CA3AF]">
                      {material.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                        material.stock_status === 'in_stock'
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                          : 'bg-rose-950/80 text-rose-300 border border-rose-500/30'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${material.stock_status === 'in_stock' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                        {material.stock_status === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(material)}
                          className="p-2 rounded-xl bg-[#0B0F19] border border-[#2D3748] hover:border-[#4B6F23] text-white hover:text-[#86efac] transition-all"
                          title="Edit"
                        >
                          <HiPencil className="text-sm" />
                        </button>
                        <button
                          onClick={() => handleDelete(material.id)}
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

      {/* Modal with Dynamic Category Logic & Dark Theme */}
      <Modal isOpen={showModal} onClose={handleCloseModal} title={editingMaterial ? 'Edit Printing Material' : 'Add New Printing Material'}>
        <form onSubmit={handleSave} className="space-y-6 text-white">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#E5E7EB] mb-1.5">
                Printing Material Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Premium High-Gloss RC Photo Paper (A4 / 260gsm)"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-[#2D3748] text-sm text-white focus:outline-none focus:border-[#4B6F23]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#E5E7EB] mb-1.5">Brand</label>
                <input
                  type="text"
                  placeholder="e.g. Epson Compatible / MasterLam"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-[#2D3748] text-sm text-white focus:outline-none focus:border-[#4B6F23]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#E5E7EB] mb-1.5">
                  Category <span className="text-red-400">*</span>
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-[#2D3748] text-sm text-white focus:outline-none focus:border-[#4B6F23] cursor-pointer"
                >
                  <option value="">Select a category</option>
                  {DEFAULT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* DYNAMIC CATEGORY FIELD: Rendered directly underneath select box when "Other" is chosen */}
            {formData.category === 'Other' && (
              <div className="animate-fadeIn p-4 rounded-2xl bg-[#0B0F19] border border-[#4B6F23]/60 shadow-inner">
                <label className="block text-xs font-bold text-[#86efac] mb-1.5">
                  Custom Category Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter custom category name (e.g. Backlit Film Media)"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#111827] border border-[#4B6F23] text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#86efac]"
                />
              </div>
            )}

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
                  Unit <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. per roll / per pack"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-[#2D3748] text-sm text-white focus:outline-none focus:border-[#4B6F23]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#E5E7EB] mb-1.5">
                  Stock Status <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.stock_status}
                  onChange={(e) => setFormData({ ...formData, stock_status: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-[#2D3748] text-sm text-white focus:outline-none focus:border-[#4B6F23] cursor-pointer"
                >
                  <option value="in_stock">In Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#E5E7EB] mb-1.5">Product Overview</label>
              <textarea
                rows={3}
                placeholder="Brief technical and operational description of this printing media..."
                value={formData.overview}
                onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-[#2D3748] text-sm text-white focus:outline-none focus:border-[#4B6F23] resize-none"
              ></textarea>
            </div>

            {/* Media Uploads */}
            <div>
              <label className="block text-xs font-bold text-[#E5E7EB] mb-2">Printing Media Photos</label>
              <MultiImageUpload
                images={formData.images}
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
              {saving ? 'Saving...' : editingMaterial ? 'Update Printing Material' : 'Create Printing Material'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
