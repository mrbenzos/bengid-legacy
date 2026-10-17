export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10 border-b border-gray-200 pb-8">
          <span className="text-xs font-mono font-bold text-[#4B6F23] uppercase tracking-widest block mb-2">
            LEGAL GOVERNANCE
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight mb-3">
            Terms &amp; Conditions
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            Effective Date: October 2026 &nbsp;•&nbsp; BENGID LEGACY GHANA LIMITED
          </p>
        </div>

        {/* Content Box in Crisp Light Corporate Palette */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xl space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base">

          <section>
            <p>
              Welcome to <strong className="text-gray-900">BENGID LEGACY GHANA LIMITED</strong>. By accessing our corporate platform at <a href="https://bengidlegacyghltd.com" className="text-[#4B6F23] font-semibold underline">bengidlegacyghltd.com</a>, engaging our customer agents, or purchasing goods through our divisions, you agree to be bound by these formal Terms and Conditions. Please review them thoroughly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              1. Corporate Entity &amp; Divisions
            </h2>
            <p>
              Established in 2010, BENGID LEGACY GHANA LIMITED is a duly registered commercial company operating under the laws of the Republic of Ghana, with headquarters at Santase Tech Station, Kumasi, Ashanti Region. The company operates three core business units:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 mt-3 text-gray-600">
              <li><strong className="text-gray-900">Division 01:</strong> Import &amp; Supply of Printing Materials (Photo papers, lamination films, eco-solvent inks, vinyl, banners).</li>
              <li><strong className="text-gray-900">Division 02:</strong> Sales of Automobiles (Foreign-used, brand-new, and new energy Chinese vehicles).</li>
              <li><strong className="text-gray-900">Division 03:</strong> General Importations (International factory procurement, freight, and customs clearance).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              2. Product Availability &amp; Specifications
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>All printing materials, vehicles, and imported merchandise displayed on the website are subject to real-time warehouse availability.</li>
              <li>Vehicle listings are accompanied by vehicle identification numbers (VIN), mileage, and specifications verified prior to physical delivery. Buyers are invited to perform physical inspections at our Santase Tech Station depot.</li>
              <li>Product photographs reflect genuine inventory stock. Minor manufacturer packaging revisions may occur without notice.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              3. Quotations, Invoicing &amp; Pricing
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>All prices are quoted in <strong className="text-gray-900">Ghana Cedis (GHS)</strong> unless expressly agreed upon in writing for foreign cargo.</li>
              <li>Due to fluctuating ocean freight rates, international tariff schedules, and port charges, quotations for custom importations are valid for 14 calendar days from issuance.</li>
              <li>A binding price is confirmed only upon the issuance of an official company commercial invoice or stamped purchase agreement.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              4. Payment Procedures &amp; Title Transfer
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Payments may be executed via approved corporate bank transfer, certified banker&apos;s draft, authorized mobile money accounts, or cash at our Kumasi head office.</li>
              <li>Ownership and title of vehicles or printing consumables pass to the client only upon full receipt of verified funds.</li>
              <li>For general cargo importations, progressive milestones (Factory Deposit, Freight Booking, Port Clearance) are specified in the individual consignment contract.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              5. Delivery, Haulage &amp; Risk
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>We provide nationwide delivery across all 16 regions of Ghana via direct logistics or trusted haulage carriers.</li>
              <li>Risk of loss transfers upon customer receipt at our Santase Tech Station depot or upon signature of delivery by the client&apos;s designated agent.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              6. Refund, Return &amp; Inspection Policy
            </h2>
            <p>
              Printing materials may be exchanged within 48 hours of dispatch if proven defective or damaged prior to receipt, provided seals and roll wrappers remain intact. Automobile purchases are governed by our Vehicle Inspection &amp; Sales Agreement signed prior to transfer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">
              7. Contact Information
            </h2>
            <p className="text-gray-600">
              For inquiries regarding these Terms and Conditions:
            </p>
            <div className="mt-3 p-5 bg-gray-50 rounded-2xl border border-gray-200 text-xs sm:text-sm space-y-1.5 text-gray-700">
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
