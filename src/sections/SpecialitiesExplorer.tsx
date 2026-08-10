import React, { useState } from "react";
import { Search, Compass, ChevronRight, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "../data/services";
import { departments } from "../data/departments";
import { contactInfo } from "../data/contact";

export const SpecialitiesExplorer: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filters = [
    { id: "all", label: "All Specialities" },
    { id: "neuro", label: "Neuro Center" },
    { id: "trauma", label: "Trauma Care" },
    { id: "orthopaedics", label: "Orthopaedics" },
    { id: "craniofacial", label: "Craniofacial Clinic" },
    { id: "other", label: "Other Specialties" }
  ];

  const getDeptName = (deptId: string) => {
    return departments.find((d) => d.id === deptId)?.name || deptId;
  };

  const filteredServices = services.filter((service) => {
    // 1. Filter by category
    if (activeCategory !== "all" && service.category !== activeCategory) {
      return false;
    }
    // 2. Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const nameMatch = service.name.toLowerCase().includes(query);
      const descMatch = service.description?.toLowerCase().includes(query) || false;
      const deptMatch = getDeptName(service.departmentId).toLowerCase().includes(query);
      return nameMatch || descMatch || deptMatch;
    }
    return true;
  });

  return (
    <section id="specialities" className="bg-[#FFFFFF] py-16 md:py-24 border-b border-[#F3EDFA] font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#6D2FA0] uppercase">
            Treatments & Capabilities
          </span>
          <h2 className="font-serif text-3xl sm:text-4.5xl font-extrabold text-[#32105F] mt-2">
            Clinical Services Explorer
          </h2>
          <p className="text-xs sm:text-sm text-[#665A70] mt-3 font-light">
            Filter or search our complete clinical diagnostics, neurosurgeries, and therapies.
          </p>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto mt-4.5" />
        </div>

        {/* Filters and Search Bar Container */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10 md:mb-12">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 w-full lg:w-auto">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveCategory(f.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                  activeCategory === f.id
                    ? "bg-[#32105F] text-white shadow-md"
                    : "bg-[#FAF7FF] border border-[#EDE4F7] text-[#32105F] hover:bg-[#F3EDFA]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:max-w-xs shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#665A70]" />
            <input
              type="text"
              placeholder="Search clinical procedures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#FAF7FF] border border-[#EDE4F7] rounded-full focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#D8B35A] focus:border-[#D8B35A] transition-all text-[#24152F]"
            />
          </div>
        </div>

        {/* Services Grid with Animation */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                layout
                key={service.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col justify-between p-6 rounded-2xl border border-[#EDE4F7] bg-white hover-glow-purple hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between pb-3.5 border-b border-dashed border-[#EDE4F7]">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">
                      {getDeptName(service.departmentId)}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-[#6D2FA0] bg-[#FAF7FF] border border-[#EDE4F7] px-2.5 py-0.5 rounded-full">
                      {service.category === "craniofacial" ? "Smiling Monk" : service.category}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-[#32105F] text-base mt-4 group-hover:text-[#6D2FA0] transition-colors">
                    {service.name}
                  </h3>
                  {service.description && (
                    <p className="text-xs text-[#665A70] mt-2.5 leading-relaxed font-light font-sans">
                      {service.description}
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-[#F3EDFA] flex items-center justify-between">
                  <a
                    href={contactInfo.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#6D2FA0] hover:text-[#32105F] flex items-center gap-0.5 transition-colors"
                  >
                    <span>Enquire Service</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </a>
                  <div className="p-1.5 rounded bg-[#FAF7FF] text-[#D8B35A] border border-[#D8B35A]/25">
                    <Activity className="h-4 w-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16 border border-dashed border-[#EDE4F7] rounded-3xl max-w-md mx-auto bg-[#FAF7FF]">
            <Compass className="h-9 w-9 text-[#D8B35A] mx-auto animate-spin-slow mb-4" />
            <h3 className="font-serif font-bold text-[#32105F] text-base">No services found</h3>
            <p className="text-xs text-[#665A70] font-light mt-1.5 px-4 leading-relaxed">
              We couldn't find matches for "{searchQuery}". Please check spelling or contact the hospital helper line directly.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
export default SpecialitiesExplorer;
