import React, { useState } from "react";
import * as Icons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { departments } from "../data/departments";
import { doctors } from "../data/doctors";
import { contactInfo } from "../data/contact";

export const Departments: React.FC = () => {
  const [selectedDeptId, setSelectedDeptId] = useState<string | null>(null);

  // Dynamic Lucide Icon mapping
  const getIcon = (iconName: string, className = "h-7 w-7") => {
    const IconComp = (Icons as any)[iconName];
    return IconComp ? <IconComp className={className} /> : <Icons.Activity className={className} />;
  };

  const selectedDepartment = departments.find((d) => d.id === selectedDeptId);
  const activeDoctors = selectedDeptId
    ? doctors.filter((doc) => doc.specialties.includes(selectedDeptId))
    : [];

  return (
    <section id="departments" className="bg-[#FAF7FF] py-16 md:py-24 border-b border-[#EDE4F7] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#6D2FA0] uppercase">
            Our Clinical Focus
          </span>
          <h2 className="font-serif text-3xl sm:text-4.5xl font-extrabold text-[#32105F] mt-2">
            Specialized Medical Departments
          </h2>
          <p className="text-xs sm:text-sm text-[#665A70] mt-3 font-light font-sans max-w-xl mx-auto leading-relaxed">
            SarvamCare Hospital is staffed by highly qualified medical professionals across multiple specialized disciplines.
          </p>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto mt-4.5" />
        </div>

        {/* Responsive Grid - Cards entering from alternating directions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept, index) => {
            // Alternating entrance animation coordinate values
            const directionX = index % 2 === 0 ? -30 : 30;
            
            return (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, x: directionX }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
                className="group flex flex-col justify-between p-7 rounded-2xl border border-[#EDE4F7] bg-white hover:shadow-xl hover:-translate-y-1 hover:border-[#D8B35A] hover-glow-purple transition-all duration-300 cursor-pointer shadow-sm"
                onClick={() => setSelectedDeptId(dept.id)}
              >
                <div>
                  {/* Large Minimalist Icon wrapper */}
                  <div className="p-3 w-fit rounded-xl bg-[#FAF7FF] text-[#6D2FA0] group-hover:scale-110 transition-transform duration-300 border border-[#EDE4F7]">
                    {getIcon(dept.iconName)}
                  </div>
                  
                  <h3 className="font-serif text-lg font-bold text-[#32105F] mt-5 group-hover:text-[#6D2FA0] transition-colors duration-200">
                    {dept.name}
                  </h3>
                  
                  {dept.description && (
                    <p className="text-xs text-[#665A70] font-sans font-light mt-2.5 leading-relaxed line-clamp-3">
                      {dept.description}
                    </p>
                  )}
                </div>

                <div>
                  {/* Small gold line that expands on hover */}
                  <div className="h-[1.5px] w-7 bg-[#D8B35A] group-hover:w-14 transition-all duration-300 mt-5" />
                  
                  {/* Explore link */}
                  <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-[#6D2FA0] uppercase tracking-wider group-hover:text-[#32105F] transition-colors">
                    <span>Explore Department</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal Overlay for Doctors Roster */}
      <AnimatePresence>
        {selectedDeptId && selectedDepartment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#32105F]/65 backdrop-blur-sm"
              onClick={() => setSelectedDeptId(null)}
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative bg-white rounded-3xl shadow-2xl border border-[#EDE4F7] max-w-lg w-full overflow-hidden z-10"
            >
              {/* Modal Header */}
              <div className="bg-[#32105F] p-6 text-white flex items-center justify-between border-b border-[#D8B35A]/30">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/10 text-[#D8B35A]">
                    {getIcon(selectedDepartment.iconName, "h-6 w-6")}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold">{selectedDepartment.name}</h3>
                    <p className="text-[9px] tracking-widest text-[#F3D98A] uppercase font-bold">Consultants Roster</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDeptId(null)}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                  aria-label="Close modal"
                >
                  <Icons.X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 max-h-[380px] overflow-y-auto space-y-4">
                {activeDoctors.length > 0 ? (
                  <div className="divide-y divide-[#F3EDFA]">
                    {activeDoctors.map((doc) => (
                      <div key={doc.id} className="py-4.5 first:pt-0 last:pb-0 flex items-start gap-4">
                        {/* Elegant initials/avatar */}
                        <div className="h-10 w-10 rounded-full bg-[#FAF7FF] text-[#6D2FA0] border border-[#D8B35A]/30 font-serif font-bold text-sm flex items-center justify-center shrink-0 uppercase">
                          {doc.name.split(" ").slice(-2).map((w) => w[0]).join("")}
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-serif font-bold text-[#32105F] text-sm sm:text-base">{doc.name}</h4>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF7FF] border border-[#EDE4F7] text-[#6D2FA0] font-bold">
                              {doc.qualification}
                            </span>
                            <span className="text-[11px] text-[#665A70]">
                              {selectedDepartment.name} Consultant
                            </span>
                          </div>
                          {doc.bio && (
                            <p className="text-xs text-[#665A70] leading-relaxed font-sans font-light pt-2 border-t border-dashed border-[#F3EDFA]">
                              {doc.bio}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 space-y-2">
                    <Icons.AlertCircle className="h-8 w-8 text-[#D8B35A] mx-auto" />
                    <p className="text-sm font-bold text-[#32105F]">Consultant details updating</p>
                    <p className="text-xs text-[#665A70] font-light">Please contact our helpdesk directly for scheduling info.</p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="bg-[#FAF7FF] p-4.5 border-t border-[#EDE4F7] flex items-center justify-between gap-3">
                <a
                  href={`tel:${contactInfo.phoneRaw}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 px-4 rounded-full bg-white border border-[#EDE4F7] text-xs font-bold text-[#32105F] hover:bg-[#F3EDFA] transition-colors"
                >
                  <Icons.Phone className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
                  <span>Call Hospital</span>
                </a>
                <a
                  href={contactInfo.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 px-4 rounded-full bg-green-600 text-white text-xs font-bold hover:bg-green-700 transition-colors"
                >
                  <Icons.MessageCircle className="h-3.5 w-3.5" />
                  <span>WhatsApp Booking</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default Departments;
