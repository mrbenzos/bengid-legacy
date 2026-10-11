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
    <div className="flex h-screen min-h-screen bg-[#0B0F19] text-white">
      {/* Left Panel - Hidden on Mobile */}
      <div className="hidden lg:flex lg:w-5/12 flex-col justify-between bg-gradient-to-br from-[#1B3310] via-[#2D4414] to-[#0B0F19] p-12 border-r border-[#2D3748]">
        <div>
          <div className="w-12 h-12 rounded-2xl bg-[#4B6F23] border border-[#86efac] flex items-center justify-center text-white font-black text-xl mb-4 shadow-lg">
            BG
          </div>
          <h1 className="font-black text-3xl text-white tracking-tight">
            BENGID LEGACY
          </h1>
          <p className="text-[#86efac] text-xs font-bold tracking-widest mt-1">
            GHANA LIMITED • SANTASE HEADQUARTERS
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-white text-3xl font-extrabold mb-3">
            Secure Admin Portal
          </h2>
          <p className="text-[#E5E7EB] text-sm leading-relaxed mb-8 max-w-sm font-normal">
            Centralized management for printing materials inventory, automobile showroom, and global import operations in Kumasi.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-[#0B0F19]/60 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2.5 w-max">
              <div className="w-2.5 h-2.5 rounded-full bg-[#86efac] animate-pulse" />
              <span className="text-white text-xs font-semibold">3 Active Commercial Divisions</span>
            </div>
            <div className="flex items-center gap-3 bg-[#0B0F19]/60 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2.5 w-max">
              <div className="w-2.5 h-2.5 rounded-full bg-[#86efac] animate-pulse" />
              <span className="text-white text-xs font-semibold">Real-time Stock Synchronization</span>
            </div>
            <div className="flex items-center gap-3 bg-[#0B0F19]/60 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2.5 w-max">
              <div className="w-2.5 h-2.5 rounded-full bg-[#86efac] animate-pulse" />
              <span className="text-white text-xs font-semibold">Vynfy SMS 2FA Security Active</span>
            </div>
          </div>
        </div>

        <div>
          <p className="text-[#9CA3AF] text-xs font-mono">
            Protected by Bengid Administrative Shield
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 bg-[#0B0F19]">
        <div className="mx-auto w-full max-w-md bg-[#111827] p-8 sm:p-10 rounded-3xl border border-[#2D3748] shadow-2xl">
          <div className="mb-8">
            <span className="text-[#86efac] text-xs font-mono font-bold uppercase tracking-widest block mb-2">
              ADMINISTRATIVE ACCESS
            </span>
            <h2 className="text-white font-black text-2xl sm:text-3xl mb-2">
              Welcome Back
            </h2>
            <p className="text-[#9CA3AF] text-xs sm:text-sm">
              Enter your authorized credentials to access the control desk
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs rounded-2xl">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#E5E7EB] mb-2">
                Administrator Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bengidlegacyghltd.com"
                className="w-full px-4 py-3 bg-[#0B0F19] rounded-xl border border-[#2D3748] focus:border-[#4B6F23] outline-none text-sm text-white placeholder-slate-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#E5E7EB] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-4 pr-12 py-3 bg-[#0B0F19] rounded-xl border border-[#2D3748] focus:border-[#4B6F23] outline-none text-sm text-white placeholder-slate-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <HiEyeSlash className="text-lg" /> : <HiEye className="text-lg" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#4B6F23] hover:bg-[#556B2F] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-[0_6px_25px_rgba(75,111,35,0.4)] disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Authenticating...' : 'Sign In & Request OTP'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#1F2937] text-center">
            <span className="text-[11px] text-[#9CA3AF]">
              Protected System • Bengid Legacy Ghana Limited
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
