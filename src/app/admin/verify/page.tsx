'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { HiShieldCheck, HiArrowLeft } from 'react-icons/hi2';
import Link from 'next/link';

function VerifyForm() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || data.message || 'Verification failed. Please check the 6-digit code.');
      }

      router.push('/admin');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl border border-gray-200 shadow-xl p-8 sm:p-10 text-gray-900">
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#4B6F23] flex items-center justify-center text-2xl mx-auto mb-4">
          <HiShieldCheck />
        </div>
        <h1 className="text-2xl font-black text-gray-900">Security Verification</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          Enter the 6-digit verification code sent to your registered telephone via SMS.
        </p>
        {email && (
          <p className="text-[11px] font-mono text-[#4B6F23] font-bold mt-1">
            Account: {email}
          </p>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-2xl text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-2 text-center uppercase tracking-wider">
            6-Digit Authentication Code
          </label>
          <input
            type="text"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
            className="w-full px-4 py-4 text-center text-3xl font-mono tracking-[0.5em] bg-[#F9FAFB] text-gray-900 rounded-2xl border border-gray-300 focus:border-[#4B6F23] focus:ring-2 focus:ring-[#4B6F23]/20 focus:outline-none transition-all placeholder:text-gray-300"
            required
            placeholder="000000"
            autoFocus
          />
        </div>

        <button
          type="submit"
          disabled={loading || code.length !== 6}
          className="w-full py-4 bg-[#4B6F23] hover:bg-[#3D5A1C] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Verifying...' : 'Authenticate & Enter Dashboard'}
        </button>

        <div className="text-center pt-4 border-t border-gray-200 flex items-center justify-between text-xs">
          <Link
            href="/admin/login"
            className="text-gray-500 hover:text-gray-900 flex items-center gap-1 font-semibold"
          >
            <HiArrowLeft />
            <span>Back to Login</span>
          </Link>
          <span className="text-[#4B6F23] font-bold">Valid for 5 mins</span>
        </div>
      </form>
    </div>
  );
}

export default function AdminVerifyPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-gray-500 text-sm">Loading verification...</div>}>
        <VerifyForm />
      </Suspense>
    </div>
  );
}
