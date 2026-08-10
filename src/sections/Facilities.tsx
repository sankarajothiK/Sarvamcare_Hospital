import React from "react";
import { Scan, Building, ZoomIn, Tv, Zap, HeartPulse, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { facilities } from "../data/facilities";

const iconMap: Record<string, React.ComponentType<any>> = {
  Scan: Scan,
  Building: Building,
  ZoomIn: ZoomIn,
  Tv: Tv,
  Zap: Zap,
  HeartPulse: HeartPulse
};

export const Facilities: React.FC = () => {
  return (
    <section id="facilities" className="bg-[#FFFFFF] py-16 md:py-24 border-b border-[#F3EDFA] relative overflow-hidden font-sans">
      
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 right-0 w-56 h-56 rounded-full bg-[#FAF7FF] blur-2xl opacity-70" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#6D2FA0] uppercase">
            Clinical Quality & Care
          </span>
          <h2 className="font-serif text-3xl sm:text-4.5xl font-extrabold text-[#32105F] mt-2">
            Advanced Medical Facilities
          </h2>
          <p className="text-xs sm:text-sm text-[#665A70] mt-3 font-light max-w-xl mx-auto leading-relaxed">
            Equipped with state-of-the-art diagnostic machinery and modular surgical operating suites to ensure optimal safety.
          </p>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto mt-4.5" />
        </div>

        {/* Horizontal Storytelling Showcase scroll list */}
        <div className="flex gap-6 overflow-x-auto pb-10 pt-4 px-4 -mx-4 scroll-smooth snap-x snap-mandatory scrollbar-thin">
          {facilities.map((item, index) => {
            const Icon = iconMap[item.iconName] || Scan;
            const num = String(index + 1).padStart(2, "0");
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group min-w-[280px] sm:min-w-[340px] max-w-[340px] snap-center relative p-8 rounded-3xl border border-[#EDE4F7] bg-white hover:shadow-2xl hover:-translate-y-1.5 hover:border-[#D8B35A] hover-glow-purple transition-all duration-500 flex flex-col justify-between shadow-sm"
              >
                {/* Oversized elegant translucent number */}
                <div className="font-serif text-8xl font-black text-[#32105F]/5 group-hover:text-[#D8B35A]/12 transition-colors duration-500 absolute -top-3 right-4 select-none pointer-events-none">
                  {num}
                </div>

                <div className="space-y-6">
                  {/* Category tag & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-[#FAF7FF] text-[#6D2FA0] group-hover:bg-[#32105F] group-hover:text-[#D8B35A] transition-all duration-300 border border-[#EDE4F7]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[9px] font-bold text-[#6D2FA0] bg-[#FAF7FF] border border-[#EDE4F7] px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  {/* Name and Description */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg font-bold text-[#32105F] leading-snug group-hover:text-[#6D2FA0] transition-colors duration-200">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#665A70] leading-relaxed font-light font-sans line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#F3EDFA] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[#32105F]/70 text-[11px] font-semibold">
                    <ShieldCheck className="h-4 w-4 text-[#D8B35A]" />
                    <span>Safety Certified</span>
                  </div>
                  
                  {/* Small gold line expands on hover */}
                  <div className="h-[2px] w-6 bg-[#D8B35A] group-hover:w-12 transition-all duration-300" />
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
export default Facilities;
