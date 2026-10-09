'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';
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
        throw new Error(data.message || 'Login failed');
      }

      toast.success('Login successful');
      router.push(`/admin/verify?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen min-h-screen bg-white">
      {/* Left Panel - Hidden on Mobile */}
      <div className="hidden lg:flex lg:w-2/5 flex-col justify-between bg-gradient-to-br from-[#0c2f1a] via-[#124b2a] to-[#165b33] p-12">
        <div>
          <h1 className="font-black text-3xl text-slate-900 tracking-tight">
            BENGID LEGACY
          </h1>
          <p className="text-[#86efac] text-sm font-semibold tracking-widest mt-1">
            GHANA LIMITED
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-slate-900 text-3xl font-bold mb-3">
            Secure Admin Portal
          </h2>
          <p className="text-emerald-300/70 text-lg mb-10 max-w-sm">
            Centralized management for building materials and vehicle sales operations.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-white/10 rounded-full px-4 py-2 w-max">
              <div className="w-2 h-2 rounded-full bg-[#86efac] animate-pulse" />
              <span className="text-slate-900 text-sm font-medium">3 Active Divisions</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 rounded-full px-4 py-2 w-max">
              <div className="w-2 h-2 rounded-full bg-[#86efac] animate-pulse" />
              <span className="text-slate-900 text-sm font-medium">Real-time Inventory</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 rounded-full px-4 py-2 w-max">
              <div className="w-2 h-2 rounded-full bg-[#86efac] animate-pulse" />
              <span className="text-slate-900 text-sm font-medium">SMS Alerts Active</span>
            </div>
          </div>
        </div>

        <div>
          <p className="text-emerald-900/60 text-sm font-medium">
            Powered by Bengid Operations
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8">
            <p className="text-[#165b33] text-xs font-bold uppercase tracking-widest mb-3">
              Admin Login
            </p>
            <h2 className="text-slate-900 font-black text-3xl mb-2">
              Welcome Back
            </h2>
            <p className="text-slate-500 text-sm">
              Enter your credentials to access the dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#165b33] focus:ring-4 focus:ring-[#165b33]/20 transition-all text-slate-900"
                placeholder="admin@bengidlegacy.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#165b33] focus:ring-4 focus:ring-[#165b33]/20 transition-all text-slate-900 pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-600 p-1"
                >
                  {showPassword ? <HiEyeSlash className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#165b33] hover:bg-[#124b2a] text-white rounded-xl py-3.5 font-bold text-sm transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading && (
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              )}
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>

            <p className="text-slate-500 text-xs text-center mt-6">
              Demo: admin@bengidlegacy.com / admin123
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
