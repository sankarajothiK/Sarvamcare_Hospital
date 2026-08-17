import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search, ChevronRight, Stethoscope } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { doctors as staticDoctors } from "../data/doctors";
import { departments } from "../data/departments";
import { useLanguage } from "../utils/LanguageContext";

interface DoctorData {
  _id: string;
  name: string;
  tamilName?: string;
  qualification: string;
  designation: string;
  tamilDesignation?: string;
  departmentId: string;
  profileImage?: string;
  expertise?: string[];
}

export const DoctorsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [loading, setLoading] = useState(true);

  const departmentsFilter = [
    { id: "all", label: language === "en" ? "All Specialists" : "அனைத்து மருத்துவர்கள்" },
    ...departments.map((d) => ({ id: d.id, label: language === "ta" && d.tamilName ? d.tamilName : d.name }))
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("/api/doctors");
        if (res.ok) {
          const data = await res.json();
          setDoctors(data);
        } else {
          throw new Error("Load failed");
        }
      } catch (err) {
        // Fallback to our comprehensive data array
        const mappedDocs: DoctorData[] = staticDoctors.map((doc) => {
          let designation = "Consultant Specialist";
          let tamilDesignation = "சிறப்பு ஆலோசகர்";
          if (doc.id === "dr-v-suresh-kumar") {
            designation = "Chief Consultant Neurosurgeon & HOD";
            tamilDesignation = "தலைமை நரம்பியல் அறுவைசிகிச்சை நிபுணர் & துறைத் தலைவர்";
          } else if (doc.specialties.includes("neurosurgery")) {
            designation = "Consultant Neurosurgeon";
            tamilDesignation = "நரம்பியல் அறுவைசிகிச்சை நிபுணர்";
          } else if (doc.specialties.includes("neurology")) {
            designation = "Consultant Neurologist";
            tamilDesignation = "நரம்பியல் சிறப்பு மருத்துவர்";
          } else if (doc.specialties.includes("plastic-surgery")) {
            designation = "Consultant Reconstructive Surgeon";
            tamilDesignation = "மறுசீரமைப்பு அறுவைசிகிச்சை நிபுணர்";
          } else if (doc.specialties.includes("faciomaxillary")) {
            designation = "Consultant Facio Maxillary Surgeon";
            tamilDesignation = "தாடை மற்றும் முக அறுவைசிகிச்சை நிபுணர்";
          } else if (doc.specialties.includes("orthopaedics")) {
            designation = "Consultant Orthopaedic Surgeon";
            tamilDesignation = "எலும்பு மற்றும் மூட்டு அறுவைசிகிச்சை நிபுணர்";
          } else if (doc.specialties.includes("psychiatry")) {
            designation = "Consultant Psychiatrist";
            tamilDesignation = "மனநல சிறப்பு மருத்துவர்";
          } else if (doc.specialties.includes("ent")) {
            designation = "Consultant ENT Surgeon";
            tamilDesignation = "காது, மூக்கு, தொண்டை சிறப்பு மருத்துவர்";
          } else if (doc.specialties.includes("ophthalmology")) {
            designation = "Consultant Ophthalmologist";
            tamilDesignation = "கண் மருத்துவ நிபுணர்";
          } else if (doc.specialties.includes("general-medicine")) {
            designation = "Consultant General Physician";
            tamilDesignation = "பொது நலம் மற்றும் சர்க்கரை நோய் சிறப்பு மருத்துவர்";
          } else if (doc.specialties.includes("general-surgery")) {
            designation = "Consultant General Surgeon";
            tamilDesignation = "பொது அறுவைசிகிச்சை நிபுணர்";
          } else if (doc.specialties.includes("radiology")) {
            designation = "Consultant Radiologist";
            tamilDesignation = "கதிரியக்கவியல் (ஸ்கேன்) நிபுணர்";
          }
          
          return {
            _id: doc.id,
            name: doc.name,
            tamilName: doc.tamilName,
            qualification: doc.qualification,
            designation,
            tamilDesignation,
            departmentId: doc.specialties[0] || "general-medicine",
            expertise: doc.bio ? [doc.bio] : ["Comprehensive Clinical Care", "Outpatient Diagnostics"]
          };
        });
        setDoctors(mappedDocs);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
    window.scrollTo(0, 0);
  }, []);

  const getDeptName = (deptId: string) => {
    const dept = departments.find(d => d.id === deptId);
    if (!dept) return deptId;
    return language === "ta" && dept.tamilName ? dept.tamilName : dept.name;
  };

  const getDocName = (doc: DoctorData) => {
    const staticDoc = staticDoctors.find(d => d.id === doc._id || d.name === doc.name);
    return language === "ta" && staticDoc?.tamilName ? staticDoc.tamilName : doc.name;
  };

  const getDocDesignation = (doc: DoctorData) => {
    const staticDoc = staticDoctors.find(d => d.id === doc._id || d.name === doc.name);
    if (language === "ta") {
      if (staticDoc?.id === "dr-v-suresh-kumar") {
        return "தலைமை நரம்பியல் அறுவைசிகிச்சை நிபுணர் & துறைத் தலைவர்";
      }
      return doc.tamilDesignation || doc.designation;
    }
    return doc.designation;
  };

  const getExpertise = (exp: string) => {
    if (language === "ta") {
      if (exp.includes("Prof & HOD Department of Neurosurgery")) {
        return "தலைவர் மற்றும் பேராசிரியர், நரம்பியல் அறுவைசிகிச்சைப் பிரிவு, சேலம் அரசு மருத்துவக் கல்லூரி.";
      }
      if (exp === "Comprehensive Clinical Care") return "பொது மருத்துவ கவனிப்பு";
      if (exp === "Outpatient Diagnostics") return "வெளிநோயாளி நோயறிதல்";
    }
    return exp;
  };

  const filteredDoctors = doctors.filter(doc => {
    const query = searchQuery.toLowerCase();
    const docName = getDocName(doc);
    const docDesig = getDocDesignation(doc);
    const matchesSearch = doc.name.toLowerCase().includes(query) || 
      docName.toLowerCase().includes(query) ||
      doc.qualification.toLowerCase().includes(query) || 
      docDesig.toLowerCase().includes(query);
    const matchesDept = selectedDept === "all" || doc.departmentId === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <>
      <Helmet>
        <title>{language === "en" ? "Specialist Doctors Directory | SarvamCare Hospital Salem" : "மருத்துவ நிபுணர்கள் விபரப்பட்டியல் | சர்வம் கேர் மருத்துவமனை சேலம்"}</title>
        <meta name="description" content="Meet our consultant physicians and neurosurgeons. View doctor qualifications, specialties, and schedule direct clinic consultations." />
        <link rel="canonical" href="https://sarvamcarehospital.in/doctors" />
      </Helmet>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 md:py-24 text-center md:text-left">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-[#7E3DB5] blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] uppercase block">
            {language === "en" ? "Sarvam Medical Registry" : "மருத்துவ நிபுணர்கள் குழு"}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mt-2 leading-tight">
            {language === "en" ? "Our Specialist Directory" : "மருத்துவர்கள் விபரப்பட்டியல்"}
          </h1>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto md:mx-0 mt-4.5" />
        </div>
      </section>

      {/* Directory Section */}
      <section className="bg-[#FAF7FF] py-16 md:py-24 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filter Toolbar */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
            
            {/* Category Tabs */}
            <div className="flex overflow-x-auto pb-2 gap-2 w-full lg:max-w-[75%] scrollbar-none snap-x snap-mandatory justify-start whitespace-nowrap">
              {departmentsFilter.map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedDept(f.id)}
                  className={`px-4 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 shrink-0 ${
                    selectedDept === f.id
                      ? "bg-[#32105F] text-white shadow-md"
                      : "bg-white border border-[#EDE4F7] text-[#32105F] hover:bg-[#F3EDFA]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:max-w-xs shrink-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#665A70]" />
              <input
                type="text"
                placeholder={language === "en" ? "Search doctors by name or title..." : "பெயர் அல்லது சிறப்புப் பிரிவு மூலம் தேடுக..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 text-xs bg-white border border-[#EDE4F7] rounded-full focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#D8B35A] focus:border-[#D8B35A] transition-all text-[#24152F]"
              />
            </div>
          </div>

          {/* Grid Render */}
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="h-8 w-8 border-2 border-brand-purple border-t-brand-gold rounded-full animate-spin" />
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredDoctors.map((doc, idx) => {
                  const docSlug = doc.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                  return (
                    <motion.div
                      layout
                      key={doc._id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="group relative flex flex-col justify-between p-6 rounded-2xl border border-[#EDE4F7] bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div>
                        {/* Avatar */}
                        <div className="flex items-center gap-4 pb-4 border-b border-[#F3EDFA]">
                          {doc.profileImage ? (
                            <img
                              src={doc.profileImage}
                              alt={getDocName(doc)}
                              className="h-14 w-14 rounded-full object-cover shrink-0 border border-[#D8B35A]/35 shadow-sm"
                            />
                          ) : (
                            <div className="h-14 w-14 rounded-full bg-[#32105F] flex items-center justify-center font-bold text-white text-sm border border-[#D8B35A]/35 shadow-sm shrink-0">
                              {doc.name.split(" ").slice(-2).map(n => n[0]).join("")}
                            </div>
                          )}
                          <div>
                            <span className="text-[9px] uppercase tracking-wider font-bold text-[#6D2FA0]">
                              {getDeptName(doc.departmentId)}
                            </span>
                            <h3 className="text-sm font-bold text-[#32105F] group-hover:text-[#6D2FA0] transition-colors leading-tight mt-0.5">
                              {getDocName(doc)}
                            </h3>
                            <p className="text-[10px] text-[#665A70] font-light mt-0.5">
                              {getDocDesignation(doc)}
                            </p>
                          </div>
                        </div>

                        {/* Qualifications / Skills */}
                        <div className="py-4 space-y-2">
                          <p className="text-xs text-[#32105F] font-bold">
                            {language === "en" ? "Credentials:" : "தகுதிகள்:"} <span className="text-[#665A70] font-normal">{doc.qualification}</span>
                          </p>
                          {doc.expertise && doc.expertise.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {doc.expertise.map((exp, i) => (
                                <span key={i} className="text-[9px] bg-[#FAF7FF] text-[#6D2FA0] border border-[#EDE4F7] px-2 py-0.5 rounded-full font-medium">
                                  {getExpertise(exp)}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Direct details redirect */}
                      <div className="mt-4 pt-4 border-t border-[#F3EDFA] flex items-center justify-between">
                        <Link
                          to={`/doctors/${docSlug}`}
                          className="text-xs font-bold text-[#6D2FA0] hover:text-[#32105F] flex items-center gap-0.5 transition-colors"
                        >
                          <span>{language === "en" ? "View Doctor Profile" : "விவரக் குறிப்பு காண்க"}</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                        <div className="p-1.5 rounded-lg bg-[#FAF7FF] text-[#D8B35A] border border-[#D8B35A]/25">
                          <Stethoscope className="h-4 w-4" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Empty state */}
          {!loading && filteredDoctors.length === 0 && (
            <div className="text-center py-16 border border-dashed border-[#EDE4F7] rounded-3xl max-w-md mx-auto bg-white shadow-sm">
              <Stethoscope className="h-9 w-9 text-[#D8B35A] mx-auto animate-pulse mb-4" />
              <h3 className="font-serif font-bold text-[#32105F] text-base">
                {language === "en" ? "No physicians found" : "மருத்துவர்கள் யாரும் இல்லை"}
              </h3>
              <p className="text-xs text-[#665A70] font-light mt-1.5 px-4 leading-relaxed">
                {language === "en" 
                  ? `We couldn't find matching consultants for "${searchQuery}". Try modifying your filter tabs or search queries.`
                  : `தாங்கள் தேடிய "${searchQuery}" பெயரில் மருத்துவ நிபுணர்கள் யாரும் இல்லை. வேறு வார்த்தைகளைப் பயன்படுத்தவும்.`}
              </p>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default DoctorsPage;
