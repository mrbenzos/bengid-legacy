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
    <div className="w-full max-w-md bg-[#111827] rounded-3xl border border-[#2D3748] shadow-2xl p-8 sm:p-10 text-white">
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-[#4B6F23]/20 border border-[#4B6F23]/40 text-[#86efac] flex items-center justify-center text-2xl mx-auto mb-4">
          <HiShieldCheck />
        </div>
        <h1 className="text-2xl font-black text-white">Security Verification</h1>
        <p className="text-xs sm:text-sm text-[#9CA3AF] mt-2">
          Enter the 6-digit verification code sent to your registered telephone via SMS.
        </p>
        {email && (
          <p className="text-[11px] font-mono text-[#86efac] mt-1">
            Account: {email}
          </p>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs rounded-2xl text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-[#E5E7EB] mb-2 text-center uppercase tracking-wider">
            6-Digit Authentication Code
          </label>
          <input
            type="text"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
            className="w-full px-4 py-4 text-center text-3xl font-mono tracking-[0.5em] bg-[#0B0F19] text-white rounded-2xl border border-[#2D3748] focus:border-[#4B6F23] focus:outline-none transition-all placeholder:text-slate-600"
            required
            placeholder="000000"
            autoFocus
          />
        </div>

        <button
          type="submit"
          disabled={loading || code.length !== 6}
          className="w-full py-4 bg-[#4B6F23] hover:bg-[#556B2F] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-[0_6px_25px_rgba(75,111,35,0.4)] disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Verifying...' : 'Authenticate & Enter Dashboard'}
        </button>

        <div className="text-center pt-4 border-t border-[#1F2937] flex items-center justify-between text-xs">
          <Link
            href="/admin/login"
            className="text-[#9CA3AF] hover:text-white flex items-center gap-1 font-semibold"
          >
            <HiArrowLeft />
            <span>Back to Login</span>
          </Link>
          <span className="text-[#86efac] font-medium">Valid for 5 mins</span>
        </div>
      </form>
    </div>
  );
}

export default function AdminVerifyPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col justify-center items-center p-4">
      <Suspense fallback={<div className="text-white">Loading security portal...</div>}>
        <VerifyForm />
      </Suspense>
    </div>
  );
}
