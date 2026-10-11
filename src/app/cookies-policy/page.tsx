export default function CookiesPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        <div className="mb-12 border-b border-[#1F2937] pb-8">
          <span className="text-xs font-mono font-bold text-[#86efac] uppercase tracking-widest block mb-2">
            LEGAL &amp; COMPLIANCE
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
            Cookies Policy
          </h1>
          <p className="text-[#9CA3AF] text-sm font-medium">
            Effective Date: October 2026 &nbsp;•&nbsp; BENGID LEGACY GHANA LIMITED
          </p>
        </div>

        <div className="bg-[#111827] rounded-3xl p-6 sm:p-10 border border-[#2D3748] shadow-2xl space-y-8 text-[#E5E7EB] leading-relaxed text-sm sm:text-base">

          <section>
            <p>
              This Cookies Policy explains what cookies are, how <strong className="text-white">BENGID LEGACY GHANA LIMITED</strong> uses them on this website, and how you can manage your preferences.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 border-b border-[#2D3748] pb-2">
              1. What Are Cookies?
            </h2>
            <p className="text-[#9CA3AF]">
              Cookies are small text files stored on your device when you visit a website. They help websites remember preferences, maintain secure login sessions, and understand operational health.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 border-b border-[#2D3748] pb-2">
              2. How We Use Cookies
            </h2>
            <p className="text-[#9CA3AF] mb-4">
              We employ only essential security and operational session cookies. We do not deploy third-party advertising or commercial retargeting cookies.
            </p>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-xs sm:text-sm border-collapse border border-[#2D3748] rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-[#0B0F19] text-[#86efac]">
                    <th className="text-left px-4 py-3 font-bold border border-[#2D3748]">Cookie Name</th>
                    <th className="text-left px-4 py-3 font-bold border border-[#2D3748]">Provider</th>
                    <th className="text-left px-4 py-3 font-bold border border-[#2D3748]">Purpose</th>
                    <th className="text-left px-4 py-3 font-bold border border-[#2D3748]">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-[#9CA3AF]">
                  <tr className="border border-[#2D3748]">
                    <td className="px-4 py-3 border border-[#2D3748] font-mono text-xs text-white">bengid-admin-session</td>
                    <td className="px-4 py-3 border border-[#2D3748]">Bengid Server</td>
                    <td className="px-4 py-3 border border-[#2D3748]">Secure encrypted administrative authentication session</td>
                    <td className="px-4 py-3 border border-[#2D3748]">8 Hours</td>
                  </tr>
                  <tr className="border border-[#2D3748] bg-[#0B0F19]/50">
                    <td className="px-4 py-3 border border-[#2D3748] font-mono text-xs text-white">cookie_consent</td>
                    <td className="px-4 py-3 border border-[#2D3748]">This website</td>
                    <td className="px-4 py-3 border border-[#2D3748]">Stores your essential cookie preference selection</td>
                    <td className="px-4 py-3 border border-[#2D3748]">1 Year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 border-b border-[#2D3748] pb-2">
              3. Managing Cookie Preferences
            </h2>
            <p className="text-[#9CA3AF]">
              You can manage or disable cookies at any time through your browser settings. However, blocking session cookies will prevent login access to the administrative control desk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 border-b border-[#2D3748] pb-2">
              4. Contact Information
            </h2>
            <div className="p-4 bg-[#0B0F19] rounded-2xl border border-[#2D3748] text-xs sm:text-sm space-y-1.5">
              <p><strong className="text-white">BENGID LEGACY GHANA LIMITED</strong></p>
              <p>Address: Santase Tech Station, Kumasi, Ashanti Region, Ghana</p>
              <p>Email: <a href="mailto:info@bengidlegacyghltd.com" className="text-[#86efac]">info@bengidlegacyghltd.com</a></p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
