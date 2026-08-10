import React from "react";
import { Phone, MessageCircle, Award, Check } from "lucide-react";
import { motion } from "framer-motion";
import { contactInfo } from "../data/contact";

export const DoctorSpotlight: React.FC = () => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#32105F] border-b border-[#D8B35A]/20 py-16 md:py-24">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-[#7E3DB5]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#D8B35A]/5 blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] uppercase">
            Specialist Spotlight
          </span>
          <h2 className="font-serif text-3xl sm:text-4.5xl font-extrabold text-white mt-1">
            Clinical Leadership
          </h2>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto mt-4" />
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl bg-[#3D176E]/50 border border-[#D8B35A]/30 p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-8 md:gap-12"
        >
          {/* Accent Gold Corner */}
          <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-[#D8B35A]/15 to-transparent rounded-tr-3xl pointer-events-none" />

          {/* Left Column: Avatar & Logo representation */}
          <div className="flex-shrink-0 text-center flex flex-col items-center">
            <div className="h-28 w-28 rounded-full border-2 border-[#D8B35A] p-1.5 bg-[#32105F] flex items-center justify-center shadow-lg relative">
              <div className="h-full w-full rounded-full bg-white/5 flex items-center justify-center font-serif text-white font-bold text-2xl select-none">
                VSK
              </div>
              <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-[#D8B35A] text-[#32105F] border border-[#32105F]">
                <Award className="h-4.5 w-4.5" />
              </div>
            </div>
            
            <div className="mt-4 space-y-1">
              <span className="inline-block text-[9px] uppercase font-bold text-[#D8B35A] tracking-widest leading-none bg-[#FAF7FF]/10 px-2.5 py-1 rounded-full border border-[#D8B35A]/20">
                Neurosurgery
              </span>
            </div>
          </div>

          {/* Right Column: Doctor Info */}
          <div className="flex-grow space-y-5 text-center md:text-left">
            <div className="space-y-1">
              <h3 className="font-serif text-2xl sm:text-3.5xl font-extrabold text-white leading-tight">
                Prof. Dr. V. Suresh Kumar
              </h3>
              <p className="text-[#F3D98A] font-semibold tracking-wide text-sm sm:text-base">
                MCh (Neuro) — Chief Consultant Neurosurgeon
              </p>
            </div>

            {/* Factual qualifications/positions based strictly on source materials */}
            <div className="py-4.5 border-t border-b border-white/10 text-indigo-100/90 text-xs sm:text-sm leading-relaxed font-sans font-light space-y-2">
              <div className="flex items-start gap-2.5 justify-center md:justify-start">
                <div className="p-0.5 rounded-full bg-[#3D176E] text-[#D8B35A] shrink-0 mt-0.5 border border-[#D8B35A]/20">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span>Prof & HOD Department of Neurosurgery</span>
              </div>
              <div className="flex items-start gap-2.5 justify-center md:justify-start">
                <div className="p-0.5 rounded-full bg-[#3D176E] text-[#D8B35A] shrink-0 mt-0.5 border border-[#D8B35A]/20">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span>Government Mohan Kumaramangalam Medical College, Salem</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2">
              <a
                href="#appointment"
                onClick={(e) => handleLinkClick(e, "#appointment")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#32105F] bg-white border border-[#D8B35A]/20 hover:bg-indigo-50 transition-all duration-200"
              >
                <Phone className="h-4.5 w-4.5 text-[#C89B3C] animate-pulse" />
                <span>Book Direct Visit</span>
              </a>
              <a
                href={contactInfo.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-green-600 hover:bg-green-700 transition-all duration-200"
              >
                <MessageCircle className="h-4.5 w-4.5" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default DoctorSpotlight;
