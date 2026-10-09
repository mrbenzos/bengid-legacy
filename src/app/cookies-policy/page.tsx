export default function CookiesPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        <div className="mb-10">
          <span className="text-xs font-bold text-[#165b33] uppercase tracking-widest">Legal</span>
          <h1 className="text-3xl sm:text-5xl font-black mt-2 mb-3 text-slate-900">Cookies Policy</h1>
          <p className="text-slate-500 text-sm">Last updated: September 2026 &nbsp;•&nbsp; BENGID LEGACY GHANA LIMITED</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed text-sm sm:text-base">

          <section>
            <p>
              This Cookies Policy explains what cookies are, how BENGID LEGACY GHANA LIMITED uses them on this website, and how you can manage your cookie preferences.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 mt-8 border-b border-slate-200 pb-2">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device (computer, tablet, or phone) when you visit a website. They help websites remember your preferences, maintain your session, and understand how the site is used.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 mt-8 border-b border-slate-200 pb-2">2. How We Use Cookies</h2>
            <p>We use a minimal set of cookies. The table below describes the cookies used on this website:</p>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border-collapse border border-slate-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-[#eaf4ec] text-slate-600">
                    <th className="text-left px-4 py-3 font-bold border border-slate-200">Cookie Name</th>
                    <th className="text-left px-4 py-3 font-bold border border-slate-200">Provider</th>
                    <th className="text-left px-4 py-3 font-bold border border-slate-200">Purpose</th>
                    <th className="text-left px-4 py-3 font-bold border border-slate-200">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-slate-200">
                    <td className="px-4 py-3 border border-slate-200 font-mono text-xs">sb-access-token</td>
                    <td className="px-4 py-3 border border-slate-200">Supabase</td>
                    <td className="px-4 py-3 border border-slate-200">Admin authentication session (admin portal only)</td>
                    <td className="px-4 py-3 border border-slate-200">Session</td>
                  </tr>
                  <tr className="border border-slate-200 bg-slate-50">
                    <td className="px-4 py-3 border border-slate-200 font-mono text-xs">sb-refresh-token</td>
                    <td className="px-4 py-3 border border-slate-200">Supabase</td>
                    <td className="px-4 py-3 border border-slate-200">Admin session refresh (admin portal only)</td>
                    <td className="px-4 py-3 border border-slate-200">1 week</td>
                  </tr>
                  <tr className="border border-slate-200">
                    <td className="px-4 py-3 border border-slate-200 font-mono text-xs">cookie_consent</td>
                    <td className="px-4 py-3 border border-slate-200">This website</td>
                    <td className="px-4 py-3 border border-slate-200">Stores your cookie consent preference to avoid showing the banner again</td>
                    <td className="px-4 py-3 border border-slate-200">1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4">
              We do <strong>not</strong> use advertising cookies, analytics tracking cookies (e.g. Google Analytics), or social media tracking pixels.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 mt-8 border-b border-slate-200 pb-2">3. Third-Party Cookies</h2>
            <p>
              Our Contact page includes an embedded <strong>Google Maps</strong> iframe. When you view this map, Google may set its own cookies on your device. This is governed by{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#165b33] underline">Google&apos;s Privacy &amp; Cookie Policy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 mt-8 border-b border-slate-200 pb-2">4. Managing Your Cookies</h2>
            <p>You can control and manage cookies in several ways:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Browser settings:</strong> Most browsers allow you to block or delete cookies. Refer to your browser&apos;s help documentation for instructions.</li>
              <li><strong>Our consent banner:</strong> When you first visit our site, a consent banner will appear. You can accept or decline non-essential cookies.</li>
              <li><strong>Opt-out tools:</strong> For Google&apos;s cookies, you can use the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#165b33] underline">Google Analytics Opt-out Browser Add-on</a>.</li>
            </ul>
            <p className="mt-3">
              Please note that disabling certain cookies may affect the functionality of this website, particularly admin portal access.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 mt-8 border-b border-slate-200 pb-2">5. Changes to This Policy</h2>
            <p>
              We may update this Cookies Policy from time to time. Any changes will be reflected on this page with a revised date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 mt-8 border-b border-slate-200 pb-2">6. Contact Us</h2>
            <p>If you have any questions about our use of cookies, please contact us:</p>
            <address className="not-italic mt-3 space-y-1 text-slate-600">
              <p><strong>BENGID LEGACY GHANA LIMITED</strong></p>
              <p>Afua Ampomah Street, Kumasi, Ashanti Region, Ghana</p>
              <p>Email: <a href="mailto:info@bengidlegacy.com" className="text-[#165b33] underline">info@bengidlegacy.com</a></p>
              <p>Phone: <a href="tel:+233205761698" className="text-[#165b33] underline">+233 (0) 20 576 1698</a></p>
            </address>
          </section>

        </div>
      </div>
    </div>
  );
}
