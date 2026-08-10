import React from "react";
import { Helmet } from "react-helmet-async";
import { Brain, Activity, ShieldAlert, Award } from "lucide-react";
import { NeuroCenter } from "../sections/NeuroCenter";

export const NeuroPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Advanced Neuro Center in Salem | SarvamCare Hospital</title>
        <meta name="description" content="SarvamCare Neuro Center offers specialized brain tumor resection, aneurysm clipping, minimally invasive spine solutions, and trigeminal neuralgia surgeries." />
        <link rel="canonical" href="https://sarvamcare.com/neuro-center" />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 md:py-24 text-center md:text-left">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-[#7E3DB5] blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] uppercase block">
            Centers of Excellence
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mt-2 leading-tight">
            Neuro Center Salem
          </h1>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto md:mx-0 mt-4.5" />
        </div>
      </section>

      {/* Visual Component Render */}
      <NeuroCenter />

      {/* Grid of clinical capabilities */}
      <section className="bg-white py-16 md:py-24 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="font-serif text-2xl sm:text-3.5xl font-bold text-[#32105F]">Clinical Sub-Specialities</h3>
            <p className="text-xs text-[#665A70] font-light mt-2">Advanced neurological diagnostics, therapies, and surgeries.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl border border-[#EDE4F7] bg-[#FAF7FF]/30 space-y-3">
              <h4 className="text-sm font-bold text-[#32105F] flex items-center gap-2">
                <Brain className="h-4.5 w-4.5 text-[#D8B35A]" />
                <span>Brain Tumors & Skull Base</span>
              </h4>
              <p className="text-xs text-[#665A70] leading-relaxed font-light">
                Expertise in micro-resection of acoustic neuromas, pituitary adenomas via transsphenoidal approach, and high-grade glioma debulking.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-[#EDE4F7] bg-[#FAF7FF]/30 space-y-3">
              <h4 className="text-sm font-bold text-[#32105F] flex items-center gap-2">
                <Activity className="h-4.5 w-4.5 text-[#D8B35A]" />
                <span>Vascular Neurosurgery</span>
              </h4>
              <p className="text-xs text-[#665A70] leading-relaxed font-light">
                Urgent management of subarachnoid hemorrhages, vascular malformations, intracranial aneurysm clipping, and stroke care.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-[#EDE4F7] bg-[#FAF7FF]/30 space-y-3">
              <h4 className="text-sm font-bold text-[#32105F] flex items-center gap-2">
                <Award className="h-4.5 w-4.5 text-[#D8B35A]" />
                <span>Microscopic Spine Surgery</span>
              </h4>
              <p className="text-xs text-[#665A70] leading-relaxed font-light">
                Spine stabilization for slip disc, cervical myelopathy, microdiscectomies, and spinal canal tumors debulking.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-[#EDE4F7] bg-[#FAF7FF]/30 space-y-3">
              <h4 className="text-sm font-bold text-[#32105F] flex items-center gap-2">
                <ShieldAlert className="h-4.5 w-4.5 text-[#D8B35A]" />
                <span>Functional & Pain Management</span>
              </h4>
              <p className="text-xs text-[#665A70] leading-relaxed font-light">
                Advanced surgical therapies for trigeminal neuralgia, hemifacial spasm, and neuropathic pain syndromes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NeuroPage;
