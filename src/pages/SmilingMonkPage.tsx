import React from "react";
import { Helmet } from "react-helmet-async";
import { Scissors, Heart, Sparkles } from "lucide-react";
import { SmilingMonk } from "../sections/SmilingMonk";

export const SmilingMonkPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Smiling Monk Craniofacial Clinic | SarvamCare Hospital</title>
        <meta name="description" content="Explore Smiling Monk plastic, cosmetic and craniofacial surgery services in Salem: cleft lip repair, facial trauma reconstruction, rhinoplasty and botox." />
        <link rel="canonical" href="https://sarvamcare.com/smiling-monk" />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 md:py-24 text-center md:text-left">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-[#7E3DB5] blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] uppercase block">
            Craniofacial Clinic
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mt-2 leading-tight">
            Smiling Monk Center
          </h1>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto md:mx-0 mt-4.5" />
        </div>
      </section>

      {/* Render the core section */}
      <SmilingMonk />

      {/* Trust factors */}
      <section className="bg-white py-16 md:py-24 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="font-serif text-2xl sm:text-3.5xl font-bold text-[#32105F]">Reconstructive Excellence</h3>
            <p className="text-xs text-[#665A70] font-light mt-2 leading-relaxed">
              We restore facial form, function, and symmetry following trauma, cancer resections, or congenital anomalies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#FAF7FF] border border-[#EDE4F7] space-y-3">
              <Sparkles className="h-6 w-6 text-[#D8B35A]" />
              <h4 className="text-sm font-bold text-[#32105F]">Congenital Repairs</h4>
              <p className="text-xs text-[#665A70] leading-relaxed font-light">
                Dedicated surgical pathways for cleft lip corrections, cleft palates restorations, and cranial shape alignments.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7FF] border border-[#EDE4F7] space-y-3">
              <Scissors className="h-6 w-6 text-[#D8B35A]" />
              <h4 className="text-sm font-bold text-[#32105F]">Aesthetic Alignment</h4>
              <p className="text-xs text-[#665A70] leading-relaxed font-light">
                Professional rhinoplasty, blepharoplasty, scar revision procedures, and botox/filler adjustments.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7FF] border border-[#EDE4F7] space-y-3">
              <Heart className="h-6 w-6 text-[#D8B35A]" />
              <h4 className="text-sm font-bold text-[#32105F]">Reconstructive trauma</h4>
              <p className="text-xs text-[#665A70] leading-relaxed font-light">
                Microvascular muscle/tissue transfers to reconstruct facial structures following vehicular trauma accidents.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SmilingMonkPage;
