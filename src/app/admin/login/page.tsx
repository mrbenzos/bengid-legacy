'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiEye, HiEyeSlash, HiShieldCheck } from 'react-icons/hi2';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || data.message || 'Login failed. Check your credentials.');
      }

      toast.success('Credentials verified. OTP sent via SMS.');
      router.push(`/admin/verify?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] text-[#111827]">
      {/* Left Branded Panel - Hidden on Mobile */}
      <div className="hidden lg:flex lg:w-5/12 flex-col justify-between bg-gradient-to-br from-[#1B3310] via-[#2D4414] to-[#11240A] p-12 text-white shadow-xl">
        <div>
          <div className="w-12 h-12 rounded-2xl bg-[#4B6F23] border border-emerald-400 flex items-center justify-center text-white font-black text-xl mb-4 shadow-md">
            BG
          </div>
          <h1 className="font-black text-3xl text-white tracking-tight">
            BENGID LEGACY
          </h1>
          <p className="text-emerald-200 text-xs font-bold tracking-widest mt-1 uppercase">
            GHANA LIMITED • SANTASE HEADQUARTERS
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center my-10">
          <h2 className="text-white text-3xl font-extrabold mb-3">
            Secure Admin Portal
          </h2>
          <p className="text-emerald-100/90 text-sm leading-relaxed mb-8 max-w-sm font-normal">
            Centralized operations management for printing materials inventory, automobile showroom, and global cargo importations in Kumasi.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-2.5 w-max">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white text-xs font-semibold">3 Active Commercial Divisions</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-2.5 w-max">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white text-xs font-semibold">Real-time Stock Synchronization</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-2.5 w-max">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white text-xs font-semibold">SMS 2FA Gateway Active</span>
            </div>
          </div>
        </div>

        <div>
          <p className="text-emerald-300/70 text-xs font-mono">
            Protected by Bengid Administrative Shield • Ghana
          </p>
        </div>
      </div>

      {/* Right Form Panel in Clean Light Mode */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 bg-[#F9FAFB]">
        <div className="mx-auto w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-xl">
          <div className="mb-8">
            <span className="text-[#4B6F23] text-xs font-mono font-bold uppercase tracking-widest block mb-2">
              ADMINISTRATIVE ACCESS
            </span>
            <h2 className="text-gray-900 font-black text-2xl sm:text-3xl mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm">
              Enter your credentials to access the Bengid Legacy control desk.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-2xl">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                Corporate Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bengidlegacy.com"
                className="w-full px-4 py-3 bg-[#F9FAFB] rounded-xl border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#4B6F23] focus:ring-2 focus:ring-[#4B6F23]/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 bg-[#F9FAFB] rounded-xl border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#4B6F23] focus:ring-2 focus:ring-[#4B6F23]/20 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <HiEyeSlash className="text-lg" /> : <HiEye className="text-lg" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#4B6F23] hover:bg-[#3D5A1C] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Authenticating...' : 'Sign In & Request OTP'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <span className="text-xs text-gray-400 font-medium">
              Kumasi Head Office Desk • Bengid Legacy Ghana Limited
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
