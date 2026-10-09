'use client';

import { useState, useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import MultiImageUpload from '@/components/ui/MultiImageUpload';
import Modal from '@/components/ui/Modal';
import {
  HiPlus,
  HiMagnifyingGlass,
  HiXMark,
  HiCheck,
  HiPhoto,
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

const DEFAULT_CATEGORIES = ['Flex', 'Banner', 'Vinyl', 'Sticker', 'Tarpaulin', 'Canvas', 'One-Way-Vision', 'Backlit', 'Mesh', 'Photo Paper', 'Lamination', 'Inks'];
const DEFAULT_FEATURES = ['Waterproof', 'UV Resistant', 'High Gloss', 'Matte Finish', 'Tear Resistant', 'Eco-Friendly'];

const emptyForm = () => ({
  name: '',
  category: '',
  brand: '',
  color: '',
  price: 0,
  unit: 'per roll',
  stock_status: 'In Stock',
  overview: '',
  features: [] as string[],
  images: [] as { label: string; url: string }[],
  image_url: '',
});

export default function MaterialsPage() {
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
  
  const modalRef = useRef<HTMLDivElement>(null);

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
      console.error('Failed to fetch materials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (material: Material | null = null) => {
    if (material) {
      setEditingMaterial(material);
      const isStandard = DEFAULT_CATEGORIES.includes(material.category);
      setFormData({
        name: material.name || '',
        category: isStandard ? material.category : 'Other',
        brand: material.brand || '',
        color: material.color || '',
        price: material.price || 0,
        unit: material.unit || 'per roll',
        stock_status: material.stock_status || 'In Stock',
        overview: material.overview || '',
        features: material.features || [],
        images: (material.images && material.images.length > 0) ? material.images : (material.image_url ? [{ label: 'Image 1', url: material.image_url }] : []),
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
    if (window.confirm('Are you sure you want to delete this material?')) {
      try {
        const res = await fetch(`/api/materials/${id}`, { method: 'DELETE' });
        if (res.ok) {
          fetchMaterials();
          toast.success('Material deleted successfully.');
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
    const toastId = toast.loading(editingMaterial ? 'Updating material...' : 'Adding material...');
    
    try {
      const finalCategory = formData.category === 'Other' ? customCategory : formData.category;
      
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
        throw new Error(err.error || 'Server rejected the material.');
      }
      await fetchMaterials();
      toast.success(editingMaterial ? 'Material updated!' : 'Material added!', { id: toastId });
      handleCloseModal();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save material. Please try again.', { id: toastId });
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
    <div className="space-y-6 animate-fadeIn">
      <Toaster position="top-right" toastOptions={{ style: { fontSize: '13px', fontWeight: '600' } }} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Materials Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Add, edit, and organize printing media rolls, photo papers, and inks.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 bg-[#165b33] hover:bg-[#124b2a] text-white px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <HiPlus className="text-base" />
          <span>Add Material</span>
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Search Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
            <input
              type="text"
              placeholder="Search materials by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#f4f6f4] focus:bg-white text-sm text-slate-800 rounded-full border border-transparent focus:border-slate-300 focus:outline-none transition-all"
            />
          </div>
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap">
            {filteredMaterials.length} materials
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 font-semibold text-sm">Loading materials...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#fafbfa] border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-3.5">Material</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Price (GHS)</th>
                  <th className="px-6 py-3.5">Unit</th>
                  <th className="px-6 py-3.5">Stock</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMaterials.map((material) => (
                  <tr key={material.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-bold text-slate-900">{material.name}</p>
                      <p className="text-[11px] text-slate-500">{material.brand || 'No Brand'}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-50 text-slate-600">
                        {material.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-black text-[#165b33]">
                      GHS {Number(material.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-500">
                      {material.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          material.stock_status?.toLowerCase().includes('in')
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {material.stock_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={() => handleOpenModal(material)}
                        className="text-[#165b33] hover:underline font-bold text-xs mr-3 cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(material.id)}
                        className="text-rose-500 hover:underline font-bold text-xs cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredMaterials.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500 font-medium text-sm">No materials found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modern Add / Edit Modal */}
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        title={editingMaterial ? 'Edit Material' : 'Add New Material'}
        subtitle="Provide detailed specifications"
      >
            <form onSubmit={handleSave} className="p-4 sm:p-7 space-y-8">
              
              {/* ── SECTION 1: Basic Info ── */}
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-4">Basic Information</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Material Name <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SAV Flex Banner 510gsm"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#165b33]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Brand <span className="text-slate-500 font-normal">(optional)</span></label>
                      <input
                        type="text"
                        placeholder="e.g. Epson Compatible"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#165b33]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Category <span className="text-rose-500">*</span></label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#165b33] bg-white"
                      >
                        <option value="">Select a category</option>
                        {DEFAULT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {formData.category === 'Other' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Custom Category Name <span className="text-rose-500">*</span></label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Laminating Film"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#165b33]"
                      />
                    </div>
                  )}
                </div>
              </div>

              <hr className="border-slate-200" />

              {/* ── SECTION 2: Pricing & Specs ── */}
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-4">Pricing & Specifications</p>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Price (GHS) <span className="text-rose-500">*</span></label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#165b33]"
                        placeholder="0.00"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Unit <span className="text-rose-500">*</span></label>
                      <input
                        type="text"
                        required
                        value={formData.unit}
                        onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#165b33]"
                        placeholder="e.g. per roll"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Color</label>
                      <input
                        type="text"
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#165b33]"
                        placeholder="e.g. White / Transparent"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Stock Status</label>
                      <select
                        required
                        value={formData.stock_status}
                        onChange={(e) => setFormData({ ...formData, stock_status: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#165b33] bg-white"
                      >
                        <option value="In Stock">In Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Material Overview</label>
                    <textarea
                      rows={3}
                      placeholder="Describe the material quality, common uses, and technical details..."
                      value={formData.overview}
                      onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#165b33] resize-none"
                    />
                  </div>
                </div>
              </div>

              <hr className="border-slate-200" />

              {/* ── SECTION 3: Features ── */}
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-4">Material Features</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {features.map((feat) => {
                    const selected = formData.features.includes(feat);
                    return (
                      <button
                        key={feat}
                        type="button"
                        onClick={() => toggleFeature(feat)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          selected
                            ? 'bg-[#165b33] text-white border-[#165b33]'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        {selected && <HiCheck className="text-xs" />}
                        {feat}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => setShowNewFeatureInput(!showNewFeatureInput)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border border-dashed border-slate-300 text-slate-500 hover:border-slate-500 hover:text-slate-600 transition-all cursor-pointer"
                  >
                    <HiPlus className="text-xs" /> Add Feature
                  </button>
                </div>
                {showNewFeatureInput && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newFeatureInput}
                      onChange={(e) => setNewFeatureInput(e.target.value)}
                      placeholder="e.g. Non-curling"
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#165b33]"
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addNewFeature())}
                    />
                    <button type="button" onClick={addNewFeature} className="px-4 py-2 bg-[#165b33] text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-[#124b2a]">Add</button>
                  </div>
                )}
                {formData.features.length > 0 && (
                  <p className="text-[11px] text-slate-500 mt-2">{formData.features.length} feature(s) selected</p>
                )}
              </div>

              <hr className="border-slate-200" />

              {/* ── SECTION 4: Images ── */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <MultiImageUpload
                  title="MATERIAL IMAGES (MULTI-ANGLE)"
                  bucket="images"
                  images={formData.images.filter(img => img.url)}
                  onChange={(images) => setFormData({ ...formData, images })}
                />
              </div>

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
                  {saving ? 'Saving...' : editingMaterial ? 'Update Material' : 'Save Material'}
                </button>
              </div>
            </form>
      </Modal>
    </div>
  );
}
