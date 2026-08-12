import React from "react";
import { Compass, Calendar, Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { contactInfo } from "../data/contact";

export const Hero: React.FC = () => {
  const handleScroll = (href: string) => {
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = 90;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#240d47] pt-24 md:pt-40 pb-20 md:pb-40 lg:pb-48 min-h-screen md:min-h-[680px] flex items-center font-sans">
      
      {/* Background Visual Layering */}
      <div className="absolute inset-0 pointer-events-none z-0">
        
        {/* Mobile Portrait (below 640px) */}
        <div 
          className="absolute inset-x-0 top-0 bottom-[-60px] bg-cover bg-no-repeat bg-center sm:hidden opacity-100 transition-opacity duration-300"
          style={{ backgroundImage: "url('/mobile_bg.png')" }}
        />

        {/* Mobile Landscape & Tablet (640px to 1023px) */}
        <div 
          className="absolute inset-x-0 top-0 bottom-[-60px] bg-cover bg-no-repeat bg-center hidden sm:block lg:hidden opacity-100 transition-opacity duration-300"
          style={{ backgroundImage: "url('/mobile_bg_2.png')" }}
        />

        {/* Desktop screens (1024px and above) */}
        <div 
          className="absolute inset-x-0 top-0 bottom-[-60px] bg-cover bg-no-repeat lg:bg-[position:5%_center] hidden lg:block opacity-100 transition-opacity duration-300"
          style={{ backgroundImage: "url('/background.png')" }}
        />

        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02] md:opacity-[0.01]" 
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            backgroundPosition: "0 0, 20px 20px"
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column: White bg context on desktop, stacked on mobile */}
          <div className="md:col-span-7 text-center md:text-left pr-4 md:pr-14 lg:pr-20">
            <div className="space-y-4">
              {/* Eyebrow */}
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] md:text-[#6D2FA0] uppercase drop-shadow-sm md:drop-shadow-none invisible pointer-events-none"
              >
                SARVAMCARE HOSPITAL
              </motion.span>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white md:text-[#32105F] leading-[1.12] drop-shadow-sm md:drop-shadow-none invisible pointer-events-none"
              >
                Advanced Healthcare.<br />
                <span className="gold-gradient-text md:bg-none md:text-[#C89B3C] font-black drop-shadow-sm md:drop-shadow-none">Compassionate Care.</span>
              </motion.h1>
              
              {/* Supporting Text */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-sm sm:text-base md:text-lg text-indigo-100 md:text-[#32105F]/85 max-w-xl mx-auto md:mx-0 leading-relaxed font-normal drop-shadow-sm md:drop-shadow-none invisible pointer-events-none"
              >
                Comprehensive, ethical and patient-centred healthcare with experienced specialists and advanced medical facilities.
              </motion.p>
            </div>
          </div>

          {/* Right Column: Empty to allow the customized hospital building and sunset graphic to show clearly */}
          <div className="md:col-span-5 flex justify-center lg:justify-end" />

        {/* Three Floating Bottom Circular Actions (Exactly Replicating Salem Saravana Hospital UI) */}
        <div className="absolute bottom-8 left-0 right-0 z-20 pointer-events-none hidden md:block">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full h-12">
            
            {/* Middle Circle (Grid Menu, placed exactly on the S-curve line!) */}
            <button 
              onClick={() => handleScroll("#departments")}
              className="absolute left-[53.2%] -translate-x-1/2 bottom-0 pointer-events-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#32105F] border-2 border-[#D8B35A] text-[#D8B35A] hover:bg-[#3D176E] shadow-xl hover:scale-110 active:scale-95 transition-all"
              title="Departments Directory"
            >
              {/* Standard 4-grid menu layout */}
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>

          </div>
        </div>

      </div>
      </div>
    </section>
  );
};

export default Hero;
