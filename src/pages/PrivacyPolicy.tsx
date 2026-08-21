import React from "react";
import { Helmet } from "react-helmet-async";
import { Shield } from "lucide-react";

export const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | SarvamCare Hospital Salem</title>
        <meta name="description" content="Read SarvamCare privacy policy. We protect patient clinical records, medical history, contact queries, and site cookies data." />
        <link rel="canonical" href="https://sarvamcarehospital.in/privacy-policy" />
      </Helmet>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 text-center">
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-2">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#D8B35A] uppercase block">Hospital Trust Policy</span>
          <h1 className="font-serif text-3xl sm:text-4.5xl font-extrabold text-white">Privacy Policy</h1>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto mt-4" />
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16 font-sans">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-sm text-[#665A70] leading-relaxed font-light space-y-6">
          <div className="flex items-center gap-3 p-4 bg-[#FAF7FF] border border-[#EDE4F7] rounded-xl text-[#32105F] font-bold">
            <Shield className="h-5 w-5 text-[#D8B35A]" />
            <span>Patient Data Security Commitment</span>
          </div>
          <p>
            At SarvamCare Hospital Pvt. Ltd., we hold patient clinical records, personal identifiers, and email queries with strict security protocols. We do not disclose patient medical details or diagnostic records without direct written consent, except where mandated by local Tamil Nadu health guidelines or medical-legal requirements.
          </p>
          <h3 className="font-serif text-lg font-bold text-[#32105F] pt-2">1. Data Capture & Utilization</h3>
          <p>
            We collect basic contact parameters (patient names, phone numbers, preferred clinical departments) through general Outpatient checkup request forms. These details are routed to our outpatient front-office staff for slot scheduling purposes.
          </p>
          <h3 className="font-serif text-lg font-bold text-[#32105F] pt-2">2. Digital Analytics & Cookie Guidelines</h3>
          <p>
            We utilize standard Google Analytics 4 monitoring keys to evaluate page loading speeds, link interaction counts, and visual gallery usage metrics. This diagnostic tracking is anonymous and does not capture any patient-specific files.
          </p>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
