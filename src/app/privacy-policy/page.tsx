import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-12 border-b border-[#1F2937] pb-8">
          <span className="text-xs font-mono font-bold text-[#86efac] uppercase tracking-widest block mb-2">
            DATA PRIVACY &amp; SECURITY
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-[#9CA3AF] text-sm font-medium">
            Effective Date: October 2026 &nbsp;•&nbsp; BENGID LEGACY GHANA LIMITED
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-[#111827] rounded-3xl p-6 sm:p-10 border border-[#2D3748] shadow-2xl space-y-8 text-[#E5E7EB] leading-relaxed text-sm sm:text-base">

          <section>
            <p>
              <strong className="text-white">BENGID LEGACY GHANA LIMITED</strong> (&quot;Bengid Legacy&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is fully committed to safeguarding your personal privacy and protecting the business information you entrust to us. This Privacy Policy details how we collect, process, and protect your data when using <a href="https://bengidlegacyghltd.com" className="text-[#86efac] underline">bengidlegacyghltd.com</a> or communicating with our sales desks.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 border-b border-[#2D3748] pb-2">
              1. Information We Collect
            </h2>
            <p className="text-[#9CA3AF] mb-3">
              We collect information that you directly provide when submitting an enquiry or interacting with our operations:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[#9CA3AF]">
              <li><strong className="text-white">Contact Credentials:</strong> Full name, corporate telephone numbers, email address, and physical business location in Ghana.</li>
              <li><strong className="text-white">Order &amp; Procurement Details:</strong> Requested printing consumables specifications, vehicle identification preferences, container cargo categories, and destination ports.</li>
              <li><strong className="text-white">Technical Log Data:</strong> Minimal diagnostic server metrics (IP address, browser type, page response times) to ensure server security and firewall integrity.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 border-b border-[#2D3748] pb-2">
              2. How We Use Your Data
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-[#9CA3AF]">
              <li>To prepare and issue official commercial quotations and invoices for printing consumables, automobiles, and cargo freight.</li>
              <li>To coordinate physical inspections of vehicles at our Santase Tech Station showroom in Kumasi.</li>
              <li>To arrange customs clearance documentation with Ghana Revenue Authority (GRA) at Tema Port and Kotoka International Airport.</li>
              <li>To communicate dispatch notifications and tracking updates via direct phone call or WhatsApp.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 border-b border-[#2D3748] pb-2">
              3. Data Sharing &amp; Third Parties
            </h2>
            <p className="text-[#9CA3AF]">
              We do not sell, rent, or trade your personal or business data. We only disclose essential information to verified logistics partners (such as shipping lines and licensed inland haulage drivers) strictly as required to fulfill delivery to your specified destination.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 border-b border-[#2D3748] pb-2">
              4. Data Retention &amp; Security
            </h2>
            <p className="text-[#9CA3AF]">
              We implement industry-standard database encryption and secure transmission protocols (HTTPS/SSL). Commercial transaction records are retained in compliance with statutory Ghanaian tax and commercial accounting regulations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 border-b border-[#2D3748] pb-2">
              5. Contact Us Regarding Your Privacy
            </h2>
            <p className="text-[#9CA3AF]">
              If you have any questions or wish to exercise your rights under the Ghana Data Protection Act (Act 843):
            </p>
            <div className="mt-3 p-4 bg-[#0B0F19] rounded-2xl border border-[#2D3748] text-xs sm:text-sm space-y-1.5">
              <p><strong className="text-white">BENGID LEGACY GHANA LIMITED</strong></p>
              <p>Address: Santase Tech Station, Kumasi, Ashanti Region, Ghana</p>
              <p>Email: <a href="mailto:info@bengidlegacyghltd.com" className="text-[#86efac]">info@bengidlegacyghltd.com</a></p>
              <p>Phone: 0241749931 / 0593132725 • WhatsApp: 0205761698</p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
