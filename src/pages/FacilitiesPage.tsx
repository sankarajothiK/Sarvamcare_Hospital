import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { facilities } from "../data/facilities";
import * as LucideIcons from "lucide-react";
import { contactInfo } from "../data/contact";

export const FacilitiesPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Advanced Medical Technology & Facilities | SarvamCare Hospital Salem</title>
        <meta name="description" content="Explore our high-end clinical facilities in Salem: Zeiss neurosurgical microscope, 32 Slice CT scan diagnostics, Storz endoscopes, and 14 bed Hybrid ICU unit." />
        <link rel="canonical" href="https://sarvamcare.com/facilities" />
      </Helmet>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 md:py-24 text-center md:text-left">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-[#7E3DB5] blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] uppercase block">
            Clinical Infrastructure
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mt-2 leading-tight">
            Medical Facilities & Technology
          </h1>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto md:mx-0 mt-4.5" />
        </div>
      </section>

      {/* Intro Block */}
      <section className="bg-white py-16 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-serif text-2xl sm:text-3.5xl font-bold text-[#32105F]">
                Modern Equipment Built for Patient Safety & Surgical Precision
              </h2>
              <p className="text-sm text-[#665A70] leading-relaxed font-light">
                At SarvamCare Hospital, we believe that clinical outcomes depend heavily on the tools and environment in which our specialists operate. Our facility in Salem features two state-of-the-art modular operating theatres, specialized microsurgery equipment, high-speed imaging diagnostics, and a dedicated 14-bed hybrid critical care unit.
              </p>
              <p className="text-sm text-[#665A70] leading-relaxed font-light">
                Every operating system, from our Carl Zeiss microscopes to our high-resolution GE CT scanner, is calibrated to support senior surgeons in performing high-complexity procedures safely.
              </p>
            </div>
            
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative rounded-3xl p-1.5 bg-[#FAF7FF] border border-[#EDE4F7] shadow-xl w-full max-w-[370px]">
                <div className="relative aspect-[4/3] rounded-[22px] overflow-hidden">
                  <img
                    src="/sarvam_trauma_neuro_board.png"
                    alt="Sarvam Trauma & Neuro Center Signboard"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="bg-[#FAF7FF] py-16 md:py-24 border-t border-[#EDE4F7] font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((fac) => {
              const Icon = (LucideIcons as any)[fac.iconName] || LucideIcons.HeartPulse;
              return (
                <div key={fac.id} className="p-6 rounded-2xl border border-[#EDE4F7] bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="p-3 rounded-xl bg-[#FAF7FF] text-[#D8B35A] border border-[#D8B35A]/25 w-fit group-hover:bg-[#32105F] group-hover:text-white transition-colors duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[9px] text-[#6D2FA0] font-bold uppercase tracking-wider block">{fac.category}</span>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-[#32105F]">
                      {fac.name}
                    </h3>
                    <p className="text-xs text-[#665A70] leading-relaxed font-light">
                      {fac.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
};

export default FacilitiesPage;
