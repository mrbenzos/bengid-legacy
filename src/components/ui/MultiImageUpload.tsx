'use client';

import { useState, useRef } from 'react';
import { uploadImage } from '@/lib/uploadClient';
import toast from 'react-hot-toast';
import { HiOutlineArrowUpTray, HiXMark } from 'react-icons/hi2';

interface MultiImageUploadProps {
  images: { label: string; url: string }[];
  onChange: (images: { label: string; url: string }[]) => void;
  bucket?: string;
  title?: string;
}

export default function MultiImageUpload({
  images,
  onChange,
  bucket = 'images',
  title = 'PRODUCT IMAGES (MULTI-ANGLE)',
}: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!e.target.files || e.target.files.length === 0) {
        return;
      }

      const files = Array.from(e.target.files);
      let next = [...images];
      for (const file of files) {
        const url = await uploadImage(file);
        next = [...next, { label: `Image ${next.length + 1}`, url }];
      }
      onChange(next);
      toast.success(files.length > 1 ? `${files.length} images uploaded` : 'Image uploaded successfully');
    } catch (error: any) {
      toast.error(error.message || 'Error uploading image');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAddUrl = () => {
    const url = urlInput.trim();
    if (!url) return;
    
    // Basic URL validation
    try {
      new URL(url);
    } catch {
      toast.error('Please enter a valid URL');
      return;
    }

    const newImages = [...images, { label: `Image ${images.length + 1}`, url }];
    onChange(newImages);
    setUrlInput('');
    toast.success('Image URL added');
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    // Optionally rename remaining labels
    const renamed = newImages.map((img, idx) => ({ ...img, label: `Image ${idx + 1}` }));
    onChange(renamed);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
        <p className="text-[11px] font-black uppercase tracking-widest text-[#165b33]">
          {title}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <button
          type="button"
          onClick={handleUploadClick}
          disabled={uploading}
          className="w-full sm:w-auto flex-shrink-0 flex items-center justify-center gap-2 bg-slate-100 hover:bg-[#2a2a2a] text-slate-900 px-5 py-3 rounded-xl font-bold text-sm transition-colors border border-slate-700 cursor-pointer disabled:opacity-50"
        >
          <HiOutlineArrowUpTray className="text-[#00e57a] text-lg" />
          {uploading ? 'Uploading...' : 'Upload Photos (Local / Device)'}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />

        <div className="flex w-full items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-700">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddUrl())}
            placeholder="Or paste image URL (https://...)"
            className="flex-1 bg-transparent border-none outline-none text-slate-600 text-sm px-4 py-2 placeholder-slate-500"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-slate-900 px-4 py-2 rounded-lg font-bold text-sm transition-colors cursor-pointer"
          >
            Add URL
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {images.map((img, idx) => (
          <div key={idx} className="relative w-32 h-32 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 group">
            <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                className="bg-white/20 hover:bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
              >
                <HiXMark className="text-lg" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-xs text-white font-medium truncate">
              {img.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
