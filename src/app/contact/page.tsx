'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { IoLogoWhatsapp } from 'react-icons/io5';
import Image from 'next/image';
import Link from 'next/link';

export default function ContactPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '233205761698';
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    division: 'cars',
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

      toast.success('Message sent successfully! We will contact you shortly.');
      setFormData({
        name: '',
        phone: '',
        division: 'cars',
        message: ''
      });
      setConsent(false);
    } catch (error) {
      toast.error('Thank you! If online service is busy, please reach us on WhatsApp directly.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO SECTION */}
      {/* 1. GRAPHICAL HERO SECTION */}
      <section className="relative h-[60vh] min-h-[480px] w-full bg-white flex flex-col justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/business-team.jpg"
            alt="BENGID LEGACY GHANA LIMITED Customer Support"
            fill
            className="object-cover opacity-45 object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
          <h1 className="text-5xl sm:text-7xl font-bold text-slate-900 mb-6 leading-tight max-w-3xl">
            Get in touch
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base font-normal">
            Reach out to BENGID LEGACY GHANA LIMITED for inquiries regarding automobiles, printing supplies, or global cargo importations.
          </p>
        </div>
      </section>

      {/* 2. CONTACT FORM & INFO CARD */}
      <section
        aria-label="Contact form and business information"
        className="container mx-auto px-4 max-w-6xl -mt-16 relative z-20 pb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start bg-white rounded-3xl p-6 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
          
          {/* Left: Form */}
          <div className="lg:col-span-7 pt-4">
            <span className="text-xs font-bold text-slate-500 tracking-wider uppercase mb-2 block">Send Us A Message</span>
            <h2 className="text-3xl font-black text-slate-900 mb-4 leading-tight">Seamless Communication,<br/>Global Impact.</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
              Reach out to Bengid Legacy for any inquiries regarding automobile sales, printing materials supply, or general global importations.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-slate-600 mb-1.5">
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
                    className="w-full px-0 py-3 bg-transparent border-b-2 border-slate-200 focus:border-[#165b33] outline-none transition-colors text-sm text-slate-900 placeholder:text-slate-500"
                    placeholder="e.g. Kwame Mensah"
                  />
                </div>
                <div>
                  <label htmlFor="division" className="block text-xs font-bold text-slate-600 mb-1.5">
                    Enquiry Division <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="division"
                    name="division"
                    required
                    aria-required="true"
                    value={formData.division}
                    onChange={handleChange}
                    className="w-full px-0 py-3 bg-transparent border-b-2 border-slate-200 focus:border-[#165b33] outline-none transition-colors text-sm text-slate-900 cursor-pointer"
                  >
                    <option value="cars">Automobiles</option>
                    <option value="materials">Printing Materials</option>
                    <option value="importations">General Importations</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-slate-600 mb-1.5">
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
                    className="w-full px-0 py-3 bg-transparent border-b-2 border-slate-200 focus:border-[#165b33] outline-none transition-colors text-sm text-slate-900 placeholder:text-slate-500"
                    placeholder="e.g. 0205761698"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-slate-600 mb-1.5">
                    Email Address <span className="text-slate-500 font-normal">(optional)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    className="w-full px-0 py-3 bg-transparent border-b-2 border-slate-200 focus:border-[#165b33] outline-none transition-colors text-sm text-slate-900 placeholder:text-slate-500"
                    placeholder="e.g. kwame@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-slate-600 mb-1.5">
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
                  className="w-full px-0 py-3 bg-transparent border-b-2 border-slate-200 focus:border-[#165b33] outline-none transition-colors text-sm text-slate-900 placeholder:text-slate-500 resize-none"
                  placeholder="Tell us about your enquiry..."
                ></textarea>
              </div>

              {/* Data Consent Checkbox */}
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  required
                  aria-required="true"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded accent-[#165b33] cursor-pointer flex-shrink-0"
                />
                <label htmlFor="consent" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
                  I agree that my name, phone number, and message may be used by Bengid Legacy Ghana Limited to process and respond to this enquiry. I have read and understood the{' '}
                  <Link href="/privacy-policy" className="text-[#165b33] underline font-semibold hover:text-[#124b2a]">
                    Privacy Policy
                  </Link>.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !consent}
                aria-label={loading ? 'Sending your message, please wait' : 'Send your enquiry message'}
                className={`px-8 py-3.5 rounded-full text-slate-900 font-bold text-sm transition-all duration-200 shadow-md ${
                  loading || !consent
                    ? 'bg-gray-400 cursor-not-allowed opacity-70'
                    : 'bg-[#557a2b] hover:bg-[#44631e] cursor-pointer'
                }`}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Right: Info Card */}
          <div className="lg:col-span-5 relative">
            <div className="bg-gradient-to-br from-[#1b6b3c] to-[#114b29] rounded-[2rem] p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
               {/* Decorative circle */}
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" aria-hidden="true"></div>
               
               <span className="text-xs font-bold text-[#a8d0b3] tracking-wider uppercase mb-2 block">Get In Touch</span>
               <h3 className="text-2xl font-black mb-8 leading-snug">Seamless Communication,<br/>Global Impact.</h3>
               
               <div className="space-y-8">
                 <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">📍</div>
                    <div>
                      <h4 className="font-bold text-sm mb-1 text-[#eaf4ec]">Head Office</h4>
                      <address className="not-italic text-sm text-[#a8d0b3] leading-relaxed">Afua Ampomah Street (Near Adepa Court)<br/>Kumasi, Ashanti Region — Ghana</address>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">✉️</div>
                    <div>
                      <h4 className="font-bold text-sm mb-1 text-[#eaf4ec]">Email Support</h4>
                      <a href="mailto:info@bengidlegacy.com" className="text-sm text-[#a8d0b3] hover:text-slate-900 transition-colors">
                        info@bengidlegacy.com
                      </a>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">📞</div>
                    <div>
                      <h4 className="font-bold text-sm mb-1 text-[#eaf4ec]">Let&apos;s Talk</h4>
                      <p className="text-sm text-[#a8d0b3]">
                        <a href="tel:+233205761698" className="hover:text-slate-900 transition-colors">+233 (0) 20 576 1698</a><br/>
                        <a href="tel:+233279390432" className="hover:text-slate-900 transition-colors">+233 (0) 27 939 0432</a>
                      </p>
                    </div>
                 </div>
               </div>

               <div className="mt-12 pt-6 border-t border-slate-200 flex items-center gap-4">
                 <span className="text-sm font-bold text-[#eaf4ec]">Follow us:</span>
                 <a
                   href="https://facebook.com/BenGidLegacy"
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label="Visit Bengid Legacy on Facebook (opens in new tab)"
                   className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-slate-50/20 transition-colors font-bold text-sm"
                 >f</a>
                 <a
                   href="https://twitter.com/bengidlegacy"
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label="Visit Bengid Legacy on X / Twitter (opens in new tab)"
                   className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-slate-50/20 transition-colors font-bold text-sm"
                 >x</a>
                 <a
                   href={`https://wa.me/${whatsappNumber}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label="Chat with Bengid Legacy on WhatsApp (opens in new tab)"
                   className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#25D366] transition-colors"
                 ><IoLogoWhatsapp aria-hidden="true" /></a>
               </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. FULL WIDTH MAP */}
      <section aria-label="Map showing Bengid Legacy location on Afua Ampomah Street, Kumasi, Ghana" className="w-full h-[500px] bg-slate-100 relative grayscale-[30%] contrast-[1.1] opacity-90">
         <iframe
          src="https://maps.google.com/maps?q=Afua+Ampomah+Street,+Kumasi,+Ghana&t=&z=16&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Map of Bengid Legacy Ghana location on Afua Ampomah Street, Kumasi, Ashanti Region"
        ></iframe>
      </section>

    </div>
  );
}
