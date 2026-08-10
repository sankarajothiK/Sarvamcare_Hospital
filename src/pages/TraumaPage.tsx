import React from "react";
import { Helmet } from "react-helmet-async";
import { ChevronRight, AlertTriangle } from "lucide-react";
import { TraumaCare } from "../sections/TraumaCare";
import { contactInfo } from "../data/contact";

export const TraumaPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>24/7 PolyTrauma & ICU emergency Care Salem | SarvamCare Hospital</title>
        <meta name="description" content="Sarvam Polytrauma emergency ICU provides specialized neurosurgeons, orthopaedicians, plastic surgeons, and 24/7 life support systems." />
        <link rel="canonical" href="https://sarvamcare.com/trauma-care" />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 md:py-24 text-center md:text-left">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-[#7E3DB5] blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] uppercase block">
            Emergency Care
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mt-2 leading-tight">
            Polytrauma & ICU Center
          </h1>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto md:mx-0 mt-4.5" />
        </div>
      </section>

      {/* Trauma Specific Overview */}
      <section className="bg-white py-16 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 md:p-8 rounded-3xl bg-red-50 border border-red-200/50 flex flex-col md:flex-row items-center gap-6 mb-12 shadow-sm">
            <div className="p-3 rounded-2xl bg-red-100 text-red-600 shrink-0">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <div className="text-center md:text-left space-y-1">
              <h4 className="text-sm font-bold text-red-800 uppercase tracking-wider">Emergency Response Unit</h4>
              <p className="text-xs text-red-700 font-light leading-relaxed">
                If you are coordinating transfer for a critical head injury, polytrauma, or fracture patient, call our dedicated trauma hotline immediately for ambulance dispatch and trauma bay clearance.
              </p>
              <div className="pt-2">
                <a href={`tel:${contactInfo.phoneRaw}`} className="inline-flex items-center gap-2 text-xs font-extrabold text-red-700 hover:text-red-900 transition-colors">
                  <span>Trauma Hotline: {contactInfo.phone}</span>
                  <ChevronRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Render the core visual node component */}
      <TraumaCare />

      {/* Trauma details blocks */}
      <section className="bg-[#FAF7FF] py-16 border-t border-[#EDE4F7] font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-serif text-2xl sm:text-3.5xl font-bold text-[#32105F] text-center mb-12">
            Polytrauma Treatment Capabilities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-white border border-[#EDE4F7] shadow-sm space-y-3">
              <span className="text-[10px] text-[#6D2FA0] font-bold uppercase tracking-wider block">Diagnostics</span>
              <h4 className="text-sm font-bold text-[#32105F]">Immediate Brain & Spine Trauma scans</h4>
              <p className="text-xs text-[#665A70] leading-relaxed font-light">
                High-definition CT and digital X-ray diagnostics run concurrently during trauma bay admission.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#EDE4F7] shadow-sm space-y-3">
              <span className="text-[10px] text-[#6D2FA0] font-bold uppercase tracking-wider block">Critical Care</span>
              <h4 className="text-sm font-bold text-[#32105F]">24/7 Dedicated Trauma ICU beds</h4>
              <p className="text-xs text-[#665A70] leading-relaxed font-light">
                Ventilatory support, invasive monitoring lines, and dedicated critical care nursing teams active around the clock.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#EDE4F7] shadow-sm space-y-3">
              <span className="text-[10px] text-[#6D2FA0] font-bold uppercase tracking-wider block">Surgical Support</span>
              <h4 className="text-sm font-bold text-[#32105F]">Emergency Micro-reconstruction</h4>
              <p className="text-xs text-[#665A70] leading-relaxed font-light">
                Plastic, neuro, orthopaedic, and faciomaxillary surgeons work in sync to reconstruct multi-site injuries.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default TraumaPage;
