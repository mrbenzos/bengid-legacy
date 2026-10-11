export default function CookiesPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        <div className="mb-10 border-b border-gray-200 pb-8">
          <span className="text-xs font-mono font-bold text-[#4B6F23] uppercase tracking-widest block mb-2">
            LEGAL &amp; COMPLIANCE
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight mb-3">
            Cookies Policy
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            Effective Date: October 2026 &nbsp;•&nbsp; BENGID LEGACY GHANA LIMITED
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xl space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base">

          <section>
            <p>
              This Cookies Policy explains what cookies are, how <strong className="text-gray-900">BENGID LEGACY GHANA LIMITED</strong> uses them on this website, and how you can manage your preferences.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              1. What Are Cookies?
            </h2>
            <p className="text-gray-600">
              Cookies are small text files stored on your device when you visit a website. They help websites remember preferences, maintain secure login sessions, and understand operational health.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              2. How We Use Cookies
            </h2>
            <p className="text-gray-600 mb-4">
              We employ only essential security and operational session cookies. We do not deploy third-party advertising or commercial retargeting cookies.
            </p>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-xs sm:text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gray-50 text-gray-900">
                    <th className="text-left px-4 py-3 font-bold border border-gray-200">Cookie Name</th>
                    <th className="text-left px-4 py-3 font-bold border border-gray-200">Provider</th>
                    <th className="text-left px-4 py-3 font-bold border border-gray-200">Purpose</th>
                    <th className="text-left px-4 py-3 font-bold border border-gray-200">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border border-gray-200">
                    <td className="px-4 py-3 border border-gray-200 font-mono text-xs text-gray-900 font-medium">bengid-admin-session</td>
                    <td className="px-4 py-3 border border-gray-200">Bengid Server</td>
                    <td className="px-4 py-3 border border-gray-200">Secure encrypted administrative authentication session</td>
                    <td className="px-4 py-3 border border-gray-200">8 Hours</td>
                  </tr>
                  <tr className="border border-gray-200 bg-gray-50/50">
                    <td className="px-4 py-3 border border-gray-200 font-mono text-xs text-gray-900 font-medium">cookie_consent</td>
                    <td className="px-4 py-3 border border-gray-200">This website</td>
                    <td className="px-4 py-3 border border-gray-200">Stores your essential cookie preference selection</td>
                    <td className="px-4 py-3 border border-gray-200">1 Year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              3. Managing Cookie Preferences
            </h2>
            <p className="text-gray-600">
              You can manage or disable cookies at any time through your browser settings. However, blocking session cookies will prevent login access to the administrative control desk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              4. Contact Information
            </h2>
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 text-xs sm:text-sm space-y-1.5 text-gray-700">
              <p><strong className="text-gray-900">BENGID LEGACY GHANA LIMITED</strong></p>
              <p>Address: Santase Tech Station, Kumasi, Ashanti Region, Ghana</p>
              <p>Email: <a href="mailto:info@bengidlegacyghltd.com" className="text-[#4B6F23] font-semibold hover:underline">info@bengidlegacyghltd.com</a></p>
              <p>Direct Phone Lines: 0241749931 / 0593132725 • WhatsApp: 0205761698</p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
