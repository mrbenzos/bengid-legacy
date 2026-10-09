'use client';

import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineArrowUpTray, HiPlus, HiXMark } from 'react-icons/hi2';
import { uploadImage } from '@/lib/uploadClient';

export type MediaImage = { label: string; url: string };

interface Group {
  key: string;
  title: string;
  hint: string;
  slots: string[];
}

const GROUPS: Group[] = [
  {
    key: 'Exterior',
    title: 'Exterior',
    hint: 'Walk-around photos of the outside of the vehicle',
    slots: ['Front', 'Rear', 'Left Side', 'Right Side', 'Front 3/4 Angle'],
  },
  {
    key: 'Interior',
    title: 'Interior',
    hint: 'Cabin, seats and controls',
    slots: ['Dashboard', 'Front Seats', 'Rear Seats', 'Steering & Cluster', 'Boot / Cargo'],
  },
  {
    key: 'Parts',
    title: 'Parts & Details',
    hint: 'Engine, wheels, lights and close-ups',
    slots: ['Engine Bay', 'Wheels & Tyres', 'Headlights', 'Tail Lights', 'Odometer'],
  },
];

const labelFor = (group: string, slot: string) => `${group} – ${slot}`;

interface Props {
  images: MediaImage[];
  onChange: (images: MediaImage[]) => void;
}

export default function VehicleMediaSlots({ images, onChange }: Props) {
  const [busy, setBusy] = useState<string | null>(null);
  const [extraCount, setExtraCount] = useState<Record<string, number>>({});
  const inputs = useRef<Record<string, HTMLInputElement | null>>({});

  const findByLabel = (label: string) => images.find((i) => i.label === label);

  const extrasFor = (group: Group) => {
    const prefix = `${group.key} – Extra `;
    const existing = images
      .filter((i) => i.label.startsWith(prefix))
      .map((i) => i.label.replace(prefix, ''));
    const manual = Array.from({ length: extraCount[group.key] || 0 }, (_, n) => String(n + 1));
    return Array.from(new Set([...existing, ...manual])).sort((a, b) => Number(a) - Number(b));
  };

  const setSlot = (label: string, url: string | null) => {
    const without = images.filter((i) => i.label !== label);
    if (!url) return onChange(without);
    const existingIndex = images.findIndex((i) => i.label === label);
    if (existingIndex >= 0) {
      const copy = [...images];
      copy[existingIndex] = { label, url };
      return onChange(copy);
    }
    onChange([...without, { label, url }]);
  };

  const handleFile = async (label: string, file: File | undefined) => {
    if (!file) return;
    try {
      setBusy(label);
      const url = await uploadImage(file);
      setSlot(label, url);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setBusy(null);
      const el = inputs.current[label];
      if (el) el.value = '';
    }
  };

  const renderSlot = (label: string, caption: string) => {
    const img = findByLabel(label);
    const isBusy = busy === label;
    return (
      <div key={label} className="flex flex-col">
        <div
          className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 ${
            img ? 'border-slate-200 bg-slate-100' : 'border-dashed border-slate-300 bg-slate-50 hover:border-[#165b33] hover:bg-emerald-50/40'
          } transition-colors group`}
        >
          {img ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={label} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setSlot(label, null)}
                aria-label={`Remove ${label}`}
                className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <HiXMark />
              </button>
              <button
                type="button"
                onClick={() => inputs.current[label]?.click()}
                className="absolute bottom-1.5 right-1.5 px-2 py-1 rounded-md bg-white/90 text-[10px] font-bold text-slate-700 hover:bg-white cursor-pointer"
              >
                Replace
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => inputs.current[label]?.click()}
              disabled={isBusy}
              className="w-full h-full flex flex-col items-center justify-center gap-1 text-slate-500 cursor-pointer disabled:cursor-wait"
            >
              {isBusy ? (
                <span className="w-5 h-5 border-2 border-slate-300 border-t-[#165b33] rounded-full animate-spin" />
              ) : (
                <HiOutlineArrowUpTray className="text-xl text-[#165b33]" />
              )}
              <span className="text-[11px] font-semibold">{isBusy ? 'Uploading…' : 'Upload'}</span>
            </button>
          )}
          <input
            ref={(el) => {
              inputs.current[label] = el;
            }}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(label, e.target.files?.[0])}
          />
        </div>
        <p className="mt-1.5 text-[11px] font-bold text-slate-600 text-center truncate">{caption}</p>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] font-black uppercase tracking-widest text-[#165b33]">Vehicle Photos</p>
        <p className="text-xs text-slate-500 mt-1">
          Upload photos into the matching slot. The first Exterior photo is used as the main listing image.
        </p>
      </div>

      {GROUPS.map((group) => {
        const extras = extrasFor(group);
        const uploaded = images.filter((i) => i.label.startsWith(`${group.key} – `)).length;
        return (
          <div key={group.key}>
            <div className="flex items-baseline justify-between mb-3">
              <div>
                <h4 className="text-sm font-extrabold text-slate-900">{group.title}</h4>
                <p className="text-[11px] text-slate-500">{group.hint}</p>
              </div>
              <span className="text-[11px] font-bold text-slate-500">{uploaded} uploaded</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {group.slots.map((slot) => renderSlot(labelFor(group.key, slot), slot))}
              {extras.map((n) => renderSlot(`${group.key} – Extra ${n}`, `Extra ${n}`))}
              <button
                type="button"
                onClick={() =>
                  setExtraCount((prev) => ({
                    ...prev,
                    [group.key]: Math.max(prev[group.key] || 0, extras.length ? Number(extras[extras.length - 1]) : 0) + 1,
                  }))
                }
                className="aspect-[4/3] rounded-xl border-2 border-dashed border-slate-300 text-slate-500 hover:border-[#165b33] hover:text-[#165b33] flex flex-col items-center justify-center gap-1 text-[11px] font-bold cursor-pointer transition-colors"
              >
                <HiPlus className="text-lg" />
                Add slot
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Orders images Exterior → Interior → Parts so the main image is the first exterior shot. */
export function sortMedia(images: MediaImage[]): MediaImage[] {
  const rank = (label: string) => {
    const idx = GROUPS.findIndex((g) => label.startsWith(`${g.key} – `));
    return idx === -1 ? GROUPS.length : idx;
  };
  return [...images].sort((a, b) => rank(a.label) - rank(b.label));
}
