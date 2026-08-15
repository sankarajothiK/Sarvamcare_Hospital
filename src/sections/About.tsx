import React from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

export const About: React.FC = () => {
  const specialties = [
    "Neurosurgery",
    "Neurology",
    "Psychiatry & Clinical Psychology",
    "Orthopaedics",
    "Facio Maxillary Surgery",
    "Trauma Management"
  ];

  const whyChooseUs = [
    "Experienced senior specialists",
    "Modern diagnostic & surgical technology",
    "Dedicated trauma response teams",
    "Advanced brain and spine interventions",
    "Multidisciplinary critical care suite",
    "Patient-first ethical healthcare values"
  ];

  return (
    <section id="about" className="bg-[#FFFFFF] py-16 md:py-24 border-b border-[#F3EDFA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Real Hospital Photo + Layered Brand Emblem */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl p-1.5 bg-[#FAF7FF] border border-[#EDE4F7] shadow-xl w-full max-w-[370px] overflow-hidden"
            >
              {/* Photo Frame */}
              <div className="relative aspect-[4/5] rounded-[22px] overflow-hidden">
                <img
                  src="/sarvam_building_exterior.png"
                  alt="SarvamCare Hospital Building Entrance"
                  className="w-full h-full object-cover"
                />
                
                {/* Subtle dark purple overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#32105F]/80 via-transparent to-transparent" />
                
                {/* Floating Brand Badge */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#32105F]/95 border border-[#D8B35A]/30 backdrop-blur-sm text-center">
                  <h4 className="font-serif text-white font-bold text-sm tracking-wider">SARVAMCare Hospital</h4>
                  <p className="text-[9px] text-[#D8B35A] uppercase tracking-[0.2em] font-semibold mt-0.5">Mamangam, Salem</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 order-1 lg:order-2">
            <div className="space-y-3">
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#6D2FA0] uppercase">
                About Our Institution
              </span>
              <h2 className="font-serif text-3xl sm:text-4.5xl font-extrabold text-[#32105F] leading-tight">
                Pioneering Healthcare Excellence
              </h2>
              <div className="h-[2px] w-14 bg-[#D8B35A]" />
            </div>

            <div className="space-y-4 text-[#665A70] leading-relaxed font-sans text-sm sm:text-base font-light">
              <p className="font-medium text-[#32105F] text-base sm:text-lg">
                SARVAMCare Hospital Pvt. Ltd. is Salem's premier medical hub for advanced, ethical, and patient-centered clinical care.
              </p>
              <p>
                Under the medical direction of **Dr. V. Suresh Kumar**, our center coordinates senior consultants, high-definition diagnostics, and cutting-edge surgical systems. We address complex neurological diseases, severe orthopaedic trauma, and comprehensive craniofacial reconstruction with precision and compassion.
              </p>
            </div>

            {/* Specialties Array */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#32105F]/80">Key Clinical Verticals</h4>
              <div className="flex flex-wrap gap-2">
                {specialties.map((item) => (
                  <span
                    key={item}
                    className="px-3.5 py-1.5 rounded-full bg-[#FAF7FF] border border-[#EDE4F7] text-xs text-[#24152F] font-semibold shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Why Choose Us checklist */}
            <div className="pt-2">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#32105F]/80 mb-3.5">Why SarvamCare</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {whyChooseUs.map((why) => (
                  <div key={why} className="flex items-start gap-2.5">
                    <div className="p-0.5 rounded-full bg-[#FAF7FF] border border-[#D8B35A]/30 text-[#D8B35A] shrink-0 mt-0.5 shadow-sm">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="text-xs sm:text-sm text-[#665A70] font-medium leading-tight">{why}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
export default About;
