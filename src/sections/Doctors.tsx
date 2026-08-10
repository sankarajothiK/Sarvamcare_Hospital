import React, { useState, useEffect } from "react";
import { Award, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { doctors as staticDoctors } from "../data/doctors";
import { departments } from "../data/departments";
import { contactInfo } from "../data/contact";

interface DoctorData {
  id?: string;
  _id: string;
  name: string;
  qualification: string;
  designation: string;
  departmentId: string;
  profileImage?: string;
  biography?: string;
  expertise?: string[];
  isFeatured?: boolean;
}

export const Doctors: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [doctorsList, setDoctorsList] = useState<DoctorData[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: "all", label: "All Specialists" },
    { id: "neuro", label: "Neurosurgery & Spine" },
    { id: "ortho", label: "Orthopaedics & Trauma" },
    { id: "cranio", label: "Craniofacial & Plastic" },
    { id: "general", label: "Medicine & General Surgery" },
    { id: "support", label: "Critical Care & Support" }
  ];

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await fetch("/api/doctors");
        if (res.ok) {
          const data = await res.json();
          setDoctorsList(data);
          return;
        }
        throw new Error("Load failed");
      } catch (err) {
        // Map our comprehensive 20+ static doctors list to the expected DoctorData shape
        const mapped: DoctorData[] = staticDoctors.map((doc) => {
          let designation = "Consultant Specialist";
          if (doc.id === "dr-v-suresh-kumar") {
            designation = "Chief Consultant Neurosurgeon & HOD";
          } else if (doc.specialties.includes("neurosurgery")) {
            designation = "Consultant Neurosurgeon";
          } else if (doc.specialties.includes("neurology")) {
            designation = "Consultant Neurologist";
          } else if (doc.specialties.includes("plastic-surgery")) {
            designation = "Consultant Reconstructive Surgeon";
          } else if (doc.specialties.includes("faciomaxillary")) {
            designation = "Consultant Facio Maxillary Surgeon";
          } else if (doc.specialties.includes("orthopaedics")) {
            designation = "Consultant Orthopaedic Surgeon";
          }

          return {
            _id: doc.id,
            name: doc.name,
            qualification: doc.qualification,
            designation,
            departmentId: doc.specialties[0] || "general-medicine",
            biography: doc.bio || "",
            expertise: doc.bio ? [doc.bio] : ["Outpatient Care", "Precision Surgery"],
            isFeatured: doc.isFeatured || false
          };
        });
        setDoctorsList(mapped);
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, []);

  const getDeptName = (deptId: string) => {
    return departments.find((d) => d.id === deptId)?.name || deptId;
  };

  const getInitials = (name: string) => {
    const parts = name.replace("Prof.", "").replace("Dr.", "").trim().split(" ");
    return parts.slice(0, 2).map((p) => p[0]).join("");
  };

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

  const filteredDoctors = doctorsList.filter((doc) => {
    if (activeTab === "all") return true;
    
    // Neuro & Psychiatry
    if (activeTab === "neuro") {
      return ["neurosurgery", "neurology", "psychiatry"].includes(doc.departmentId);
    }
    // Ortho & Pain
    if (activeTab === "ortho") {
      return ["orthopaedics", "pain-clinic"].includes(doc.departmentId);
    }
    // Craniofacial & Plastic
    if (activeTab === "cranio") {
      return ["faciomaxillary", "plastic-surgery"].includes(doc.departmentId);
    }
    // Medicine & Surgery
    if (activeTab === "general") {
      return ["general-medicine", "general-surgery", "ent", "ophthalmology"].includes(doc.departmentId);
    }
    // Support & diagnostics
    if (activeTab === "support") {
      return ["anaesthesia", "radiology", "medico-legal"].includes(doc.departmentId);
    }
    return true;
  });

  return (
    <section id="doctors" className="bg-[#FAF7FF] py-16 md:py-24 border-b border-[#EDE4F7] font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#6D2FA0] uppercase">
            Medical Board
          </span>
          <h2 className="font-serif text-3xl sm:text-4.5xl font-extrabold text-[#32105F] mt-2">
            Our Consultant Directory
          </h2>
          <p className="text-xs sm:text-sm text-[#665A70] mt-3 font-light max-w-xl mx-auto leading-relaxed">
            Review our complete board of registered consultants, medical surgeons, and diagnostic specialists.
          </p>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto mt-4.5" />
        </div>

        {/* Directory Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Department filters (Vertical Menu) */}
          <div className="lg:col-span-3 flex flex-col gap-2 bg-white/40 p-3 rounded-2xl border border-[#EDE4F7]">
            <span className="text-[9px] uppercase font-bold tracking-widest text-[#665A70] px-4 py-2 border-b border-[#EDE4F7]">
              Filter Specialties
            </span>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-left px-4 py-3 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 flex items-center justify-between ${
                  activeTab === tab.id
                    ? "bg-[#32105F] text-white shadow-md border-l-4 border-[#D8B35A] pl-3"
                    : "bg-white/80 border border-[#EDE4F7]/40 text-[#32105F] hover:bg-[#FAF7FF]"
                }`}
              >
                <span>{tab.label}</span>
                <Compass className={`h-3.5 w-3.5 ${activeTab === tab.id ? "text-[#D8B35A]" : "text-slate-400"}`} />
              </button>
            ))}
          </div>

          {/* Right Column: Doctors List (Vertically aligned cards) */}
          <div className="lg:col-span-9 space-y-4">
            {loading ? (
              <div className="text-center py-12 text-[#6D2FA0] animate-pulse text-xs font-bold uppercase tracking-wider">
                Loading Consultants...
              </div>
            ) : (
              <motion.div layout className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {filteredDoctors.map((doc, index) => (
                    <motion.div
                      layout
                      key={doc._id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.02 }}
                      className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-[#EDE4F7] bg-white transition-all duration-300 hover:bg-[#FAF7FF] hover:border-[#D8B35A]/50 hover-glow-purple overflow-hidden shadow-sm"
                    >
                      {/* Left gold border expander */}
                      <div className="absolute top-0 left-0 bottom-0 w-[3.5px] bg-[#D8B35A] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                      
                      {/* Info block - slides slightly right on hover */}
                      <div className="flex items-start gap-4 transition-transform duration-300 group-hover:translate-x-2">
                        
                        {/* Avatar Image or Initials */}
                        {doc.profileImage ? (
                          <img
                            src={doc.profileImage}
                            alt={doc.name}
                            className="h-11 w-11 rounded-full object-cover shrink-0 border border-[#D8B35A]/25 group-hover:border-[#D8B35A] transition-all duration-300"
                          />
                        ) : (
                          <div className="h-11 w-11 rounded-full bg-[#FAF7FF] text-[#6D2FA0] border border-[#D8B35A]/25 font-serif font-bold text-sm flex items-center justify-center shrink-0 uppercase group-hover:bg-[#32105F] group-hover:text-[#D8B35A] group-hover:border-[#D8B35A] transition-all duration-300">
                            {getInitials(doc.name)}
                          </div>
                        )}
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-serif font-bold text-base text-[#32105F] leading-none">
                              {doc.name}
                            </h3>
                            {doc.isFeatured && (
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white text-[8px] font-bold text-[#D8B35A] border border-[#D8B35A]/30 uppercase tracking-widest leading-none">
                                <Award className="h-2.5 w-2.5" /> board certified
                              </span>
                            )}
                          </div>
                          
                          <p className="text-xs text-[#665A70] font-light leading-relaxed">
                            <span className="font-semibold text-[#6D2FA0]">{doc.qualification}</span> • {getDeptName(doc.departmentId)}
                          </p>
                          
                          {doc.biography && (
                            <p className="text-[11px] text-[#665A70]/90 font-light italic leading-relaxed pt-1.5 border-t border-dashed border-[#EDE4F7] max-w-2xl">
                              {doc.biography}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2.5 mt-4 sm:mt-0 shrink-0 relative z-10 pl-14 sm:pl-0">
                        <a
                          href={contactInfo.whatsapp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-full bg-green-600 text-white text-xs font-bold hover:bg-green-700 transition-colors shadow-sm"
                        >
                          Consult
                        </a>
                        
                        <a
                          href="#appointment"
                          onClick={(e) => handleLinkClick(e, "#appointment")}
                          className="px-4 py-2 rounded-full border border-[#EDE4F7] text-[#32105F] bg-white hover:bg-[#F3EDFA] text-xs font-bold transition-all"
                        >
                          Book Visit
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
export default Doctors;
