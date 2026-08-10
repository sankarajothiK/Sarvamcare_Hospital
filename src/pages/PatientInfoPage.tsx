import React from "react";
import { Helmet } from "react-helmet-async";
import { Info, ShieldAlert, Clock, BookOpen, CreditCard, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const PatientInfoPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Patient & Visitor Information | SarvamCare Hospital Salem</title>
        <meta name="description" content="Important information for patients and visitors: admissions guidelines, discharge policies, visitor timings, cashless TPA insurance options, and hospital policies." />
        <link rel="canonical" href="https://sarvamcare.com/patient-information" />
      </Helmet>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 md:py-24 text-center md:text-left">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-[#7E3DB5] blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] uppercase block">
            Guide for Patients & Visitors
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mt-2 leading-tight">
            Patient Information
          </h1>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto md:mx-0 mt-4.5" />
        </div>
      </section>

      {/* Warning Notice about placeholders */}
      <section className="bg-amber-50 border-b border-amber-200/60 py-4 text-center font-sans text-xs text-amber-800">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-center gap-2">
          <ShieldAlert className="h-4.5 w-4.5 text-amber-600 shrink-0" />
          <span><strong>Administrator Notice:</strong> The policies below contain standard templates and placeholders. Please coordinate with the hospital administration desk to update these details.</span>
        </div>
      </section>

      {/* Info Sections */}
      <section className="bg-white py-16 md:py-24 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Admissions */}
            <div className="p-6 md:p-8 rounded-3xl border border-[#EDE4F7] bg-[#FAF7FF]/40 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#32105F] text-white">
                    <BookOpen className="h-5 w-5 text-[#D8B35A]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#32105F]">Admission Guidelines</h3>
                </div>
                <div className="h-[1px] w-12 bg-[#D8B35A]" />
                <ul className="space-y-3.5 text-xs text-[#665A70] leading-relaxed font-light">
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D8B35A] shrink-0 mt-1.5" />
                    <span><strong>OPD Routing:</strong> Patients recommended for surgery will be routed to the admissions clearance desk.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D8B35A] shrink-0 mt-1.5" />
                    <span><strong>Documents:</strong> Please carry valid ID proofs (Aadhaar Card, Voter ID) and relevant clinical reports.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D8B35A] shrink-0 mt-1.5" />
                    <span><strong>Clearance:</strong> Pre-surgical diagnostics must be cleared prior to ward/ICU transfer.</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-xl border border-dashed border-[#EDE4F7] bg-white text-[10px] text-[#665A70] italic">
                [Editable admission policies placeholder]
              </div>
            </div>

            {/* Discharge */}
            <div className="p-6 md:p-8 rounded-3xl border border-[#EDE4F7] bg-[#FAF7FF]/40 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#32105F] text-white">
                    <Info className="h-5 w-5 text-[#D8B35A]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#32105F]">Discharge Process</h3>
                </div>
                <div className="h-[1px] w-12 bg-[#D8B35A]" />
                <ul className="space-y-3.5 text-xs text-[#665A70] leading-relaxed font-light">
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D8B35A] shrink-0 mt-1.5" />
                    <span><strong>Discharge Timing:</strong> Patient discharges are typically processed in the morning hours between 10:00 AM - 12:00 PM.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D8B35A] shrink-0 mt-1.5" />
                    <span><strong>Billing Clearance:</strong> Settlement of pending clinical and pharmacy invoices must be completed at the counter.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D8B35A] shrink-0 mt-1.5" />
                    <span><strong>Discharge Summary:</strong> Collect prescription guides and recovery details prior to checkout.</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-xl border border-dashed border-[#EDE4F7] bg-white text-[10px] text-[#665A70] italic">
                [Editable discharge guidelines placeholder]
              </div>
            </div>

            {/* Visitor Policies */}
            <div className="p-6 md:p-8 rounded-3xl border border-[#EDE4F7] bg-[#FAF7FF]/40 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#32105F] text-white">
                    <Clock className="h-5 w-5 text-[#D8B35A]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#32105F]">Visitor Guidelines & Timings</h3>
                </div>
                <div className="h-[1px] w-12 bg-[#D8B35A]" />
                <ul className="space-y-3.5 text-xs text-[#665A70] leading-relaxed font-light">
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D8B35A] shrink-0 mt-1.5" />
                    <span><strong>Visitor Timings (General Wards):</strong> Standard template timings are 4:00 PM to 6:00 PM daily.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D8B35A] shrink-0 mt-1.5" />
                    <span><strong>ICU Regulations:</strong> Visitors are highly restricted in the 14-bed Hybrid ICU. Permits are subject to intensivist clearance.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D8B35A] shrink-0 mt-1.5" />
                    <span><strong>Pass Limit:</strong> Only one attendant pass is issued per patient at the time of admission.</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-xl border border-dashed border-[#EDE4F7] bg-white text-[10px] text-[#665A70] italic">
                [Editable visitor timings & guidelines placeholder]
              </div>
            </div>

            {/* Insurance & TPA Cashless */}
            <div className="p-6 md:p-8 rounded-3xl border border-[#EDE4F7] bg-[#FAF7FF]/40 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#32105F] text-white">
                    <CreditCard className="h-5 w-5 text-[#D8B35A]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#32105F]">TPA & Cashless Policies</h3>
                </div>
                <div className="h-[1px] w-12 bg-[#D8B35A]" />
                <ul className="space-y-3.5 text-xs text-[#665A70] leading-relaxed font-light">
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D8B35A] shrink-0 mt-1.5" />
                    <span><strong>Insurance Pre-authorization:</strong> Pre-auth requests must be submitted within 24 hours of hospitalization.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D8B35A] shrink-0 mt-1.5" />
                    <span><strong>Empaneled TPAs:</strong> Cashless policies are subject to third-party agreements with the hospital billing cell.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D8B35A] shrink-0 mt-1.5" />
                    <span><strong>Reimbursements:</strong> Detailed claim kits can be collected from the billing manager.</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-xl border border-dashed border-[#EDE4F7] bg-white text-[10px] text-[#665A70] italic">
                [Editable cashless insurance & TPA list placeholder]
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Helpdesk Contact CTA */}
      <section className="bg-[#FAF7FF] py-16 border-t border-[#EDE4F7]">
        <div className="max-w-4xl mx-auto text-center px-4 space-y-6">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#32105F]">Need help regarding patient services?</h3>
          <p className="text-xs text-[#665A70] max-w-lg mx-auto font-light leading-relaxed">
            If you need to verify if your specific corporate insurance is empaneled or have questions about ward rates, contact our admissions helpdesk coordinators.
          </p>
          <div className="pt-2">
            <Link to="/contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6D2FA0] hover:text-[#32105F] uppercase tracking-wider">
              <span>Contact Admissions Cell</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default PatientInfoPage;
