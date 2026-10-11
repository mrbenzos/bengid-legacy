'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaXTwitter, FaTiktok } from 'react-icons/fa6';
import { HiPhone, HiEnvelope, HiMapPin, HiArrowRight } from 'react-icons/hi2';
import Image from 'next/image';
import Link from 'next/link';

export default function ContactPage() {
  // Exclusively hardcoded official WhatsApp line: 0205761698 (+233205761698)
  const whatsappNumber = '233205761698';
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    division: 'materials',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      toast.error('Please agree to the data consent before submitting.');
      return;
    }
    setLoading(true);
    
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to submit');
      }

      toast.success('Message sent successfully! Our Kumasi office will contact you shortly.');
      setFormData({
        name: '',
        phone: '',
        division: 'materials',
        message: ''
      });
      setConsent(false);
    } catch (error) {
      toast.error('Notice: If online submit is busy, kindly chat our agents on WhatsApp directly.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      {/* 1. CINEMATIC HERO SECTION WITH HIGH-CONTRAST PURE WHITE HEADLINE */}
      <section className="relative w-full min-h-[50vh] flex flex-col justify-center overflow-hidden pt-28 pb-16 border-b border-[#1F2937]">
        {/* Full-bleed pictorial background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/business-team.jpg"
            alt="BENGID LEGACY GHANA LIMITED Customer Support"
            fill
            className="object-cover opacity-35 object-center scale-105 transition-transform duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/80 to-[#0B0F19]/40" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
          <span className="text-xs font-mono font-bold text-[#86efac] uppercase tracking-widest block mb-3">
            CUSTOMER ASSISTANCE &amp; INQUIRIES
          </span>

          {/* High-contrast pure white headline */}
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-4 leading-tight tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
            Get in touch
          </h1>

          {/* High-contrast crisp subtext */}
          <p className="text-[#F3F4F6] max-w-xl mx-auto text-sm sm:text-base font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            Reach out to BENGID LEGACY GHANA LIMITED for wholesale printing materials, certified vehicles, or international cargo importations.
          </p>
        </div>
      </section>

      {/* 2. CONTACT FORM & DIRECT INFO CARDS IN UNIFIED DARK PALETTE */}
      <section
        aria-label="Contact form and business information"
        className="container mx-auto px-4 max-w-6xl -mt-10 relative z-20 pb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start bg-[#111827] rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-[#2D3748]">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 pt-2">
            <span className="text-xs font-mono font-bold text-[#4B6F23] tracking-widest uppercase mb-2 block">
              SEND US A MESSAGE
            </span>
            <h2 className="text-3xl font-black text-white mb-3 leading-tight">
              Seamless Communication,<br/>Direct Support.
            </h2>
            <p className="text-[#9CA3AF] text-sm leading-relaxed mb-8 font-normal">
              Whether you need to stock up on printing materials in Kumasi, inspect a vehicle, or book container freight, our team is ready to respond.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-[#E5E7EB] mb-2">
                    Full Name <span className="text-red-400" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    aria-required="true"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0B0F19] rounded-xl border border-[#2D3748] focus:border-[#4B6F23] outline-none transition-colors text-sm text-white placeholder-slate-500"
                    placeholder="e.g. Kwame Mensah"
                  />
                </div>
                <div>
                  <label htmlFor="division" className="block text-xs font-bold text-[#E5E7EB] mb-2">
                    Enquiry Division <span className="text-red-400" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="division"
                    name="division"
                    required
                    aria-required="true"
                    value={formData.division}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0B0F19] rounded-xl border border-[#2D3748] focus:border-[#4B6F23] outline-none transition-colors text-sm text-white cursor-pointer"
                  >
                    <option value="materials">Printing Materials</option>
                    <option value="cars">Automobiles</option>
                    <option value="importations">General Importations</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-[#E5E7EB] mb-2">
                    Phone Number <span className="text-red-400" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    aria-required="true"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0B0F19] rounded-xl border border-[#2D3748] focus:border-[#4B6F23] outline-none transition-colors text-sm text-white placeholder-slate-500"
                    placeholder="e.g. 0241749931"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-[#E5E7EB] mb-2">
                    Email Address <span className="text-[#9CA3AF] font-normal">(optional)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    className="w-full px-4 py-3 bg-[#0B0F19] rounded-xl border border-[#2D3748] focus:border-[#4B6F23] outline-none transition-colors text-sm text-white placeholder-slate-500"
                    placeholder="e.g. kwame@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-[#E5E7EB] mb-2">
                  Your Message <span className="text-red-400" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  aria-required="true"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0B0F19] rounded-xl border border-[#2D3748] focus:border-[#4B6F23] outline-none transition-colors text-sm text-white placeholder-slate-500 resize-none"
                  placeholder="Tell us about the printing consumables, vehicle, or cargo you need..."
                ></textarea>
              </div>

              {/* Data Consent Checkbox */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0B0F19] border border-[#2D3748]">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  required
                  aria-required="true"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded accent-[#4B6F23] cursor-pointer flex-shrink-0"
                />
                <label htmlFor="consent" className="text-xs text-[#9CA3AF] leading-relaxed cursor-pointer">
                  I agree that my name, phone number, and message may be used by Bengid Legacy Ghana Limited to process and respond to this enquiry. I have read and understood the{' '}
                  <Link href="/privacy-policy" className="text-[#86efac] underline font-semibold hover:text-white">
                    Privacy Policy
                  </Link>.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !consent}
                aria-label={loading ? 'Sending message...' : 'Send Message'}
                className={`px-8 py-4 rounded-full text-white font-bold text-sm tracking-wide transition-all duration-200 shadow-lg ${
                  loading || !consent
                    ? 'bg-gray-700 cursor-not-allowed opacity-60'
                    : 'bg-[#4B6F23] hover:bg-[#556B2F] cursor-pointer shadow-[0_6px_25px_rgba(75,111,35,0.4)]'
                }`}
              >
                {loading ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Right: Direct Information Panel */}
          <div className="lg:col-span-5 relative w-full">
            <div className="bg-[#0B0F19] rounded-3xl p-8 border border-[#2D3748] shadow-2xl relative overflow-hidden space-y-8">
              
              <div>
                <span className="text-xs font-mono font-bold text-[#86efac] tracking-widest uppercase mb-1 block">
                  BENGID DIRECT DESK
                </span>
                <h3 className="text-2xl font-black text-white">Contact Information</h3>
              </div>

              {/* Physical Address */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#111827] border border-[#2D3748] flex items-center justify-center text-[#86efac] flex-shrink-0 text-xl">
                  <HiMapPin />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white mb-0.5">Physical Location</h4>
                  <address className="not-italic text-sm text-[#9CA3AF] leading-relaxed">
                    Santase Tech Station<br/>
                    Kumasi, Ashanti Region — Ghana
                  </address>
                </div>
              </div>

              {/* Email Address */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#111827] border border-[#2D3748] flex items-center justify-center text-[#86efac] flex-shrink-0 text-xl">
                  <HiEnvelope />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white mb-0.5">Email Inquiries</h4>
                  <a href="mailto:info@bengidlegacyghltd.com" className="text-sm text-[#E5E7EB] hover:text-[#86efac] transition-colors break-all">
                    info@bengidlegacyghltd.com
                  </a>
                </div>
              </div>

              {/* Official Direct Call Lines */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#111827] border border-[#2D3748] flex items-center justify-center text-[#86efac] flex-shrink-0 text-xl">
                  <HiPhone />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white mb-0.5">Official Direct Call Lines</h4>
                  <div className="space-y-1">
                    <a href="tel:0241749931" className="text-sm text-white font-bold block hover:text-[#86efac] transition-colors">
                      0241749931
                    </a>
                    <a href="tel:0593132725" className="text-sm text-white font-bold block hover:text-[#86efac] transition-colors">
                      0593132725
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp Action Button */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] flex-shrink-0 text-xl">
                  <IoLogoWhatsapp />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white mb-0.5">Instant WhatsApp Line</h4>
                  <a 
                    href="https://wa.me/233205761698" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-[#25D366] font-extrabold hover:underline"
                  >
                    0205761698 (Click to Chat)
                  </a>
                </div>
              </div>

              {/* Social Channels with Official TikTok Link */}
              <div className="pt-6 border-t border-[#1F2937]">
                <span className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider block mb-3">
                  Follow Our Official Channels:
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://facebook.com/BenGidLegacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-[#111827] border border-[#2D3748] flex items-center justify-center hover:bg-[#4B6F23] hover:text-white transition-colors text-white"
                    aria-label="Facebook"
                  >
                    <FaFacebookF className="text-sm" />
                  </a>
                  <a
                    href="https://instagram.com/bengidlegacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-[#111827] border border-[#2D3748] flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors text-white"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="text-sm" />
                  </a>
                  <a
                    href="https://twitter.com/bengidlegacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-[#111827] border border-[#2D3748] flex items-center justify-center hover:bg-white hover:text-black transition-colors text-white"
                    aria-label="X (Twitter)"
                  >
                    <FaXTwitter className="text-sm" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@legacyautomobile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-[#111827] border border-[#2D3748] flex items-center justify-center hover:bg-black hover:text-[#00F2FE] hover:border-[#00F2FE] transition-colors text-white"
                    aria-label="TikTok (@legacyautomobile)"
                  >
                    <FaTiktok className="text-sm" />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. FULL-WIDTH GOOGLE MAPS PINPOINTING SANTASE TECH STATION, KUMASI */}
      <section 
        aria-label="Map showing Bengid Legacy Ghana location at Santase Tech Station, Kumasi, Ghana" 
        className="w-full h-[500px] bg-[#0B0F19] relative border-t border-[#1F2937]"
      >
        <iframe
          src="https://maps.google.com/maps?q=Santase+Tech+Station,+Kumasi,+Ghana&t=&z=16&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(110%)' }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map pinpointing Bengid Legacy Ghana Limited at Santase Tech Station, Kumasi"
        ></iframe>
      </section>

    </div>
  );
}
