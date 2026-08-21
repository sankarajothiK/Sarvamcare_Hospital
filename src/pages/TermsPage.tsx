import React from "react";
import { Helmet } from "react-helmet-async";
import { BookOpen } from "lucide-react";

export const TermsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions | SarvamCare Hospital Salem</title>
        <meta name="description" content="Review SarvamCare website terms of use, appointment requests parameters, and clinical information guidelines." />
        <link rel="canonical" href="https://sarvamcarehospital.in/terms-and-conditions" />
      </Helmet>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 text-center">
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-2">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#D8B35A] uppercase block">Hospital Legal Policy</span>
          <h1 className="font-serif text-3xl sm:text-4.5xl font-extrabold text-white">Terms & Conditions</h1>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto mt-4" />
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16 font-sans">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-sm text-[#665A70] leading-relaxed font-light space-y-6">
          <div className="flex items-center gap-3 p-4 bg-[#FAF7FF] border border-[#EDE4F7] rounded-xl text-[#32105F] font-bold">
            <BookOpen className="h-5 w-5 text-[#D8B35A]" />
            <span>Usage Agreement</span>
          </div>
          <p>
            By accessing the website at **https://sarvamcarehospital.in**, you agree to abide by these terms of use. The clinical articles, procedures list, and physician profile details displayed on this platform are for general information and referral purposes.
          </p>
          <h3 className="font-serif text-lg font-bold text-[#32105F] pt-2">1. Outpatient Consultations</h3>
          <p>
            Consultation requests submitted through online forms do not constitute confirmed appointments. Slot availability must be verified and officially confirmed by our outpatient booking helper desk staff via phone or WhatsApp check.
          </p>
          <h3 className="font-serif text-lg font-bold text-[#32105F] pt-2">2. Liability Limits</h3>
          <p>
            SarvamCare Hospital is not liable for self-treatment actions taken based on blog articles or descriptions on this site. Patients are urged to seek direct diagnosis in emergency situations.
          </p>
        </div>
      </section>
    </>
  );
};

export default TermsPage;
