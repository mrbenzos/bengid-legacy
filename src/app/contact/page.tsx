'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { FaFacebookF, FaInstagram, FaXTwitter, FaTiktok } from 'react-icons/fa6';
import { HiPhone, HiEnvelope, HiMapPin } from 'react-icons/hi2';
import Image from 'next/image';
import Link from 'next/link';

export default function ContactPage() {
  // Exclusively hardcoded official WhatsApp line: 0205761698 (+233205761698)
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
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827]">
      {/* 1. CINEMATIC LIGHT HERO SECTION */}
      <section className="relative w-full pt-28 sm:pt-36 pb-20 overflow-hidden border-b border-gray-200">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/business-team.jpg"
            alt="BENGID LEGACY GHANA LIMITED Customer Support"
            fill
            className="object-cover object-center scale-105 transition-transform duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/80 to-[#F9FAFB]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="max-w-3xl bg-white/90 backdrop-blur-md p-8 sm:p-12 rounded-[2.5rem] shadow-xl border border-gray-200/80 mb-6 text-center sm:text-left mx-auto">
            <span className="text-xs font-mono font-bold text-[#4B6F23] uppercase tracking-widest block mb-3">
              CUSTOMER ASSISTANCE &amp; INQUIRIES
            </span>

            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 leading-tight tracking-tight">
              Get in touch with us
            </h1>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
              Reach out to BENGID LEGACY GHANA LIMITED for wholesale printing materials, certified vehicles, or international cargo importations. Our Kumasi office is at your service.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CONTACT FORM & DIRECT INFO CARDS IN LIGHT PALETTE */}
      <section
        aria-label="Contact form and business information"
        className="container mx-auto px-4 max-w-6xl -mt-8 relative z-20 pb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 pt-2">
            <span className="text-xs font-mono font-bold text-[#4B6F23] tracking-widest uppercase mb-2 block">
              SEND US A MESSAGE
            </span>
            <h2 className="text-3xl font-black text-gray-900 mb-3 leading-tight">
              Seamless Communication,<br/>Direct Support.
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-8 font-normal">
              Whether you need to stock up on printing materials in Kumasi, inspect a vehicle, or book container freight, our team is ready to respond.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-gray-700 mb-2">
                    Full Name <span className="text-red-500" aria-hidden="true">*</span>
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
                    className="w-full px-4 py-3 bg-[#F9FAFB] rounded-xl border border-gray-300 focus:border-[#4B6F23] focus:ring-2 focus:ring-[#4B6F23]/20 outline-none transition-colors text-sm text-gray-900 placeholder-gray-400"
                    placeholder="e.g. Kwame Mensah"
                  />
                </div>
                <div>
                  <label htmlFor="division" className="block text-xs font-bold text-gray-700 mb-2">
                    Enquiry Division <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="division"
                    name="division"
                    required
                    aria-required="true"
                    value={formData.division}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F9FAFB] rounded-xl border border-gray-300 focus:border-[#4B6F23] focus:ring-2 focus:ring-[#4B6F23]/20 outline-none transition-colors text-sm text-gray-900 cursor-pointer"
                  >
                    <option value="materials">Printing Materials</option>
                    <option value="cars">Automobiles</option>
                    <option value="importations">General Importations</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-gray-700 mb-2">
                    Phone Number <span className="text-red-500" aria-hidden="true">*</span>
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
                    className="w-full px-4 py-3 bg-[#F9FAFB] rounded-xl border border-gray-300 focus:border-[#4B6F23] focus:ring-2 focus:ring-[#4B6F23]/20 outline-none transition-colors text-sm text-gray-900 placeholder-gray-400"
                    placeholder="e.g. 0241749931"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-gray-700 mb-2">
                    Email Address <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    className="w-full px-4 py-3 bg-[#F9FAFB] rounded-xl border border-gray-300 focus:border-[#4B6F23] focus:ring-2 focus:ring-[#4B6F23]/20 outline-none transition-colors text-sm text-gray-900 placeholder-gray-400"
                    placeholder="e.g. kwame@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-gray-700 mb-2">
                  Your Message <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  aria-required="true"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F9FAFB] rounded-xl border border-gray-300 focus:border-[#4B6F23] focus:ring-2 focus:ring-[#4B6F23]/20 outline-none transition-colors text-sm text-gray-900 placeholder-gray-400 resize-none"
                  placeholder="Tell us about the printing consumables, vehicle, or cargo you need..."
                ></textarea>
              </div>

              {/* Data Consent Checkbox */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200">
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
                <label htmlFor="consent" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
                  I agree that my name, phone number, and message may be used by Bengid Legacy Ghana Limited to process and respond to this enquiry. I have read and understood the{' '}
                  <Link href="/privacy-policy" className="text-[#4B6F23] underline font-semibold hover:text-gray-900">
                    Privacy Policy
                  </Link>.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !consent}
                aria-label={loading ? 'Sending message...' : 'Send Message'}
                className={`px-8 py-4 rounded-full text-white font-bold text-sm tracking-wide transition-all duration-200 shadow-md ${
                  loading || !consent
                    ? 'bg-gray-400 cursor-not-allowed opacity-60'
                    : 'bg-[#4B6F23] hover:bg-[#3D5A1C] cursor-pointer shadow-[0_6px_20px_rgba(75,111,35,0.3)] hover:-translate-y-0.5'
                }`}
              >
                {loading ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Right: Direct Information Panel */}
          <div className="lg:col-span-5 relative w-full">
            <div className="bg-[#F9FAFB] rounded-3xl p-8 border border-gray-200 shadow-sm relative overflow-hidden space-y-8">
              
              <div>
                <span className="text-xs font-mono font-bold text-[#4B6F23] tracking-widest uppercase mb-1 block">
                  BENGID DIRECT DESK
                </span>
                <h3 className="text-2xl font-black text-gray-900">Contact Information</h3>
              </div>

              {/* Physical Address */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-[#4B6F23] flex-shrink-0 text-xl shadow-sm">
                  <HiMapPin />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 mb-0.5">Physical Location</h4>
                  <address className="not-italic text-sm text-gray-600 leading-relaxed">
                    Santase Tech Station<br/>
                    Kumasi, Ashanti Region — Ghana
                  </address>
                </div>
              </div>

              {/* Email Address */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-[#4B6F23] flex-shrink-0 text-xl shadow-sm">
                  <HiEnvelope />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 mb-0.5">Email Inquiries</h4>
                  <a href="mailto:info@bengidlegacyghltd.com" className="text-sm text-gray-700 hover:text-[#4B6F23] transition-colors break-all font-medium">
                    info@bengidlegacyghltd.com
                  </a>
                </div>
              </div>

              {/* Official Direct Call Lines */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-[#4B6F23] flex-shrink-0 text-xl shadow-sm">
                  <HiPhone />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 mb-0.5">Official Direct Call Lines</h4>
                  <div className="space-y-1">
                    <a href="tel:0241749931" className="text-sm text-gray-900 font-bold block hover:text-[#4B6F23] transition-colors">
                      0241749931
                    </a>
                    <a href="tel:0593132725" className="text-sm text-gray-900 font-bold block hover:text-[#4B6F23] transition-colors">
                      0593132725
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp Action Button */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] flex-shrink-0 text-xl shadow-sm">
                  <IoLogoWhatsapp />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 mb-0.5">Instant WhatsApp Line</h4>
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
              <div className="pt-6 border-t border-gray-200">
                <span className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-3">
                  Follow Our Official Channels:
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://facebook.com/BenGidLegacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:bg-[#4B6F23] hover:text-white transition-colors text-gray-700 shadow-sm"
                    aria-label="Facebook"
                  >
                    <FaFacebookF className="text-sm" />
                  </a>
                  <a
                    href="https://instagram.com/bengidlegacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors text-gray-700 shadow-sm"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="text-sm" />
                  </a>
                  <a
                    href="https://twitter.com/bengidlegacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors text-gray-700 shadow-sm"
                    aria-label="X (Twitter)"
                  >
                    <FaXTwitter className="text-sm" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@legacyautomobile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:bg-black hover:text-[#00F2FE] hover:border-[#00F2FE] transition-colors text-gray-700 shadow-sm"
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
        className="w-full h-[500px] bg-gray-100 relative border-t border-gray-200"
      >
        <iframe
          src="https://maps.google.com/maps?q=Santase+Tech+Station,+Kumasi,+Ghana&t=&z=16&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map pinpointing Bengid Legacy Ghana Limited at Santase Tech Station, Kumasi"
        ></iframe>
      </section>

    </div>
  );
}
