import React from "react";
import { Helmet } from "react-helmet-async";
import { AlertCircle } from "lucide-react";

export const DisclaimerPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Medical Disclaimer | SarvamCare Hospital Salem</title>
        <meta name="description" content="Important clinical notice: Website details and health blog advice do not substitute direct physician consults." />
        <link rel="canonical" href="https://sarvamcarehospital.in/disclaimer" />
      </Helmet>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 text-center">
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-2">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#D8B35A] uppercase block">Clinical Notice</span>
          <h1 className="font-serif text-3xl sm:text-4.5xl font-extrabold text-white">Medical Disclaimer</h1>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto mt-4" />
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16 font-sans">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-sm text-[#665A70] leading-relaxed font-light space-y-6">
          <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200/50 rounded-xl text-yellow-800 font-bold">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <span>Important Professional Consultation Notice</span>
          </div>
          <p className="text-base text-[#32105F] font-semibold leading-relaxed">
            The medical information, treatment details, and clinical descriptions published on this website must not be presented, used, or relied upon as a substitute for direct professional medical consultation, diagnosis, or therapy.
          </p>
          <p>
            Always seek the advice of your consulting physician or qualified health provider with any clinical concerns you may have regarding symptoms or conditions. Never disregard professional clinical advice or delay seeking immediate care because of information read on this website.
          </p>
          <p>
            In the event of an emergency (such as severe head injuries, stroke symptoms, or major physical trauma accidents), immediately proceed to our 24/7 emergency trauma ICU bay at Mamangam, Salem or contact our hotline directly.
          </p>
        </div>
      </section>
    </>
  );
};

export default DisclaimerPage;
