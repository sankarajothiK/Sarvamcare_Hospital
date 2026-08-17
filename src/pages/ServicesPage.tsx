import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { services } from "../data/services";
import { departments } from "../data/departments";
import { useLanguage } from "../utils/LanguageContext";
import { Activity, Brain, ShieldAlert, Sparkles, Bone, Search } from "lucide-react";

export const ServicesPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"all" | "neuro" | "trauma" | "craniofacial" | "orthopaedics" | "other">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: t("tab_all"), icon: Activity },
    { id: "neuro", label: t("tab_neuro"), icon: Brain },
    { id: "trauma", label: t("tab_trauma"), icon: ShieldAlert },
    { id: "craniofacial", label: t("tab_craniofacial"), icon: Sparkles },
    { id: "orthopaedics", label: t("tab_ortho"), icon: Bone }
  ];

  const filteredServices = services.filter((srv) => {
    const matchesCategory = activeTab === "all" || srv.category === activeTab;
    const matchesSearch = srv.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (srv.tamilName && srv.tamilName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (srv.description && srv.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (srv.tamilDescription && srv.tamilDescription.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getDeptName = (deptId: string) => {
    const dept = departments.find((d) => d.id === deptId);
    if (!dept) return language === "ta" ? "சிறப்பு பிரிவு" : "Speciality Care";
    return language === "ta" && dept.tamilName ? dept.tamilName : dept.name;
  };

  return (
    <>
      <Helmet>
        <title>{language === "en" ? "Clinical Services & Treatments | SarvamCare Hospital Salem" : "மருத்துவ சிகிச்சைகள் மற்றும் சேவைகள் | சர்வம் கேர் மருத்துவமனை சேலம்"}</title>
        <meta name="description" content="Browse our medical treatments: microscopic neurosurgery, cleft lip reconstruction, compound fracture fixation, stroke care, and diagnostic 32 slice CT scans." />
        <link rel="canonical" href="https://sarvamcarehospital.in/services" />
      </Helmet>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 md:py-24 text-center md:text-left">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-[#7E3DB5] blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] uppercase block">
            {t("spec_explorer_eyebrow")}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mt-2 leading-tight">
            {t("spec_explorer_title")}
          </h1>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto md:mx-0 mt-4.5" />
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-[#FAF7FF] py-16 md:py-24 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filters and search */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
            {/* Category tabs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 w-full lg:w-auto">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id as any)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                      activeTab === cat.id
                        ? "bg-[#32105F] text-white shadow-md"
                        : "bg-white border border-[#EDE4F7] text-[#32105F] hover:bg-[#F3EDFA]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative w-full lg:max-w-xs">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#665A70]" />
              <input
                type="text"
                placeholder={t("search_placeholder_services")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 text-xs bg-white border border-[#EDE4F7] rounded-full focus:outline-none focus:ring-1 focus:ring-[#D8B35A] focus:border-[#D8B35A] transition-all text-[#24152F]"
              />
            </div>
          </div>

          {/* Service items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((srv) => (
              <div
                key={srv.name}
                className="p-6 rounded-2xl border border-[#EDE4F7] bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] bg-[#FAF7FF] text-[#6D2FA0] border border-[#EDE4F7] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      {srv.category === "craniofacial" 
                        ? (language === "ta" ? "புன்னகைத் துறவி" : "Smiling Monk") 
                        : srv.category}
                    </span>
                    <span className="text-[9px] text-[#665A70] font-medium tracking-wide">
                      {getDeptName(srv.departmentId)}
                    </span>
                  </div>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-[#32105F] pt-1 flex flex-col gap-1">
                    <span>{srv.name}</span>
                    {srv.tamilName && language === "ta" && (
                      <span className="text-xs font-sans text-slate-500 font-medium tracking-normal leading-relaxed">{srv.tamilName}</span>
                    )}
                  </h3>
                  {(language === "ta" ? srv.tamilDescription : srv.description) && (
                    <p className="text-xs text-[#665A70] leading-relaxed font-light font-sans">
                      {language === "ta" ? srv.tamilDescription : srv.description}
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-[#F3EDFA] flex items-center justify-between">
                  <Link
                    to={`/specialities/${srv.departmentId}`}
                    className="text-[10px] font-bold text-[#6D2FA0] hover:text-[#32105F] transition-colors uppercase tracking-wider"
                  >
                    {t("view_specialty_details")}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredServices.length === 0 && (
            <div className="text-center py-16 border border-dashed border-[#EDE4F7] rounded-3xl max-w-md mx-auto bg-white shadow-sm">
              <Activity className="h-9 w-9 text-[#D8B35A] mx-auto animate-pulse mb-4" />
              <h3 className="font-serif font-bold text-[#32105F] text-base">{t("no_services_found")}</h3>
              <p className="text-xs text-[#665A70] font-light mt-1.5 px-4 leading-relaxed">
                {t("no_services_desc")}
              </p>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default ServicesPage;
