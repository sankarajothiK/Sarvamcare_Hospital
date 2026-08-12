import React from "react";
import { MessageCircle, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import { TraumaCareLogo } from "../components/BrandLogos";
import { contactInfo } from "../data/contact";

export const TraumaCare: React.FC = () => {
  const injuries = [
    { title: "Traumatic Head Injuries", desc: "Emergency cranial decompression & immediate hematoma evacuations." },
    { title: "Complex Craniofacial Trauma", desc: "Stabilization and repair of facial skeletal fractures and tissue lacerations." },
    { title: "Acute Spine & Cord Injury", desc: "Surgical decompression and instrumentation of spinal cord fractures." },
    { title: "Severe Orthopaedic Injuries", desc: "Rapid reconstruction of complex compound, pelvic, and multiple bone fractures." },
    { title: "Thoracic & Chest Trauma", desc: "Emergency interventions for lung, rib cage, and internal airway damage." },
    { title: "Abdominal Injuries", desc: "Emergency laparotomy for visceral organ trauma and arterial bleeders." }
  ];

  const roles = [
    "Neuro Surgeon",
    "Orthopedician",
    "Plastic Surgeon",
    "Facio Maxillary",
    "General Surgeon",
    "Intensivists",
    "Emergency Care"
  ];

  return (
    <section id="trauma-care" className="relative overflow-hidden bg-gradient-to-br from-[#3D176E] via-[#32105F] to-[#2E0827] border-b border-[#D8B35A]/20 py-16 md:py-24 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <TraumaCareLogo className="h-20 w-20" showText={false} />
          </motion.div>
          
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] uppercase mt-4">
            Emergency & Trauma Services
          </span>
          <h2 className="font-serif text-3xl sm:text-4.5xl font-extrabold text-white mt-2">
            Sarvam Trauma Care
          </h2>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto mt-4.5" />
          
          <p className="text-xs sm:text-sm text-indigo-100/90 mt-4 leading-relaxed font-sans font-light max-w-2xl">
            Salem's dedicated center for the synchronization of senior surgeons, critical care physicians, and imaging suites, operating 24/7 to manage compound polytrauma.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Injury Management Spectrum */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5 pb-2 border-b border-white/10">
              <ShieldAlert className="h-5 w-5 text-[#D8B35A]" />
              <span>Injury Management Spectrum</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {injuries.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 shadow-sm"
                >
                  <h4 className="font-serif font-bold text-[#F3D98A] text-sm sm:text-base">{item.title}</h4>
                  <p className="text-xs text-indigo-200/80 font-light mt-2 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Multidisciplinary Trauma network (Curved node connections) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* Visual Node container */}
            <div className="relative w-[300px] h-[300px] flex justify-center items-center">
              
              {/* Dynamic Connecting Lines underneath */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 300">
                {roles.map((_, i) => {
                  const angle = (i * 2 * Math.PI) / roles.length;
                  const radius = 100; // px radius
                  const x2 = 150 + Math.sin(angle) * radius;
                  const y2 = 150 - Math.cos(angle) * radius;
                  
                  return (
                    <motion.line
                      key={i}
                      x1="150"
                      y1="150"
                      x2={x2}
                      y2={y2}
                      stroke="#D8B35A"
                      strokeWidth="1.8"
                      strokeOpacity="0.4"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.15 + i * 0.05 }}
                    />
                  );
                })}
              </svg>

              {/* Central trauma hub shield */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
                className="w-20 h-20 rounded-full bg-white flex items-center justify-center border-2 border-[#D8B35A] shadow-2xl z-20 shadow-[#32105F]/50"
              >
                <TraumaCareLogo className="h-10 w-10 text-[#32105F]" showText={false} />
              </motion.div>

              {/* Satellite specialist nodes */}
              {roles.map((role, i) => {
                const angle = (i * 2 * Math.PI) / roles.length;
                const radius = 105; // px distance
                const x = Math.sin(angle) * radius;
                const y = -Math.cos(angle) * radius;
                
                return (
                  <motion.div
                    key={role}
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    whileInView={{ opacity: 1, x, y }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.4 + i * 0.08, type: "spring", stiffness: 80 }}
                    className="absolute w-24 h-10 -ml-12 -mt-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-center p-1 z-10 hover:border-[#D8B35A] transition-all"
                    style={{ left: "50%", top: "50%" }}
                  >
                    <span className="text-[9px] font-bold text-indigo-100 leading-tight uppercase tracking-wider">
                      {role}
                    </span>
                  </motion.div>
                );
              })}

            </div>

            <div className="text-center mt-10 space-y-4">
              <p className="text-xs text-indigo-200/90 leading-relaxed font-light max-w-sm">
                Our trauma unit runs under a synchronized clinical priority code. Specialists are dispatched simultaneously to secure immediate diagnostics.
              </p>
              <a
                href={contactInfo.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-green-600 hover:bg-green-700 active:scale-95 transition-all shadow-md"
              >
                <MessageCircle className="h-4.5 w-4.5" />
                <span>Enquire Trauma Care</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
export default TraumaCare;
