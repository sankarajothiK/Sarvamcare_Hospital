import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { departments } from "../data/departments";
import * as LucideIcons from "lucide-react";
import { useLanguage } from "../utils/LanguageContext";

export const SpecialitiesPage: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{language === "en" ? "Medical Specialities & Clinical Departments | SarvamCare Hospital Salem" : "மருத்துவப் பிரிவுகள் & சிறப்புத் துறைகள் | சர்வம் கேர் சேலம்"}</title>
        <meta name="description" content="Explore our medical specialities in Salem: neurosurgery, neurology, orthopaedics, plastic surgery, ent, ophthalmology, general medicine, and advanced hybrid ICU care." />
        <link rel="canonical" href="https://sarvamcarehospital.in/specialities" />
      </Helmet>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 md:py-24 text-center md:text-left">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-[#7E3DB5] blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] uppercase block">
            {language === "en" ? "Clinical Verticals" : "சிறப்பு மருத்துவத் துறைகள்"}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mt-2 leading-tight">
            {language === "en" ? "Our Medical Specialities" : "எங்கள் மருத்துவப் பிரிவுகள்"}
          </h1>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto md:mx-0 mt-4.5" />
        </div>
      </section>

      {/* Specialties Directory Section */}
      <section className="bg-[#FAF7FF] py-16 md:py-24 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-2xl sm:text-3.5xl font-bold text-[#32105F]">
              {language === "en" ? "Comprehensive Clinical Care" : "முழுமையான மருத்துவக் கவனிப்பு"}
            </h2>
            <p className="text-xs text-[#665A70] font-light mt-2 leading-relaxed">
              {language === "en"
                ? "We host specialized consultant doctors across multiple therapeutic areas, coordinating multi-disciplinary clinics to secure optimal patient recovery."
                : "பல்வேறு மருத்துவத் தேவைகளுக்காகத் தகுதி வாய்ந்த சிறப்பு மருத்துவர்கள் கொண்டு சிறந்த முறையில் சிகிச்சை வழங்கி வருகிறோம்."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => {
              // Dynamically map icon name string to Lucide component
              const IconComponent = (LucideIcons as any)[dept.iconName] || LucideIcons.Stethoscope;
              return (
                <div
                  key={dept.id}
                  className="p-6 rounded-2xl border border-[#EDE4F7] bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="p-3 rounded-xl bg-[#FAF7FF] text-[#D8B35A] border border-[#D8B35A]/25 w-fit group-hover:bg-[#32105F] group-hover:text-white transition-colors duration-300">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-[#32105F] group-hover:text-[#6D2FA0] transition-colors leading-tight">
                      {language === "ta" && dept.tamilName ? dept.tamilName : dept.name}
                    </h3>
                    <p className="text-xs text-[#665A70] leading-relaxed font-light">
                      {language === "ta" && dept.tamilDescription ? dept.tamilDescription : (dept.description || "Expert clinical consultants providing personalized outpatient and inpatient care programs.")}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#F3EDFA] flex items-center justify-between">
                    <Link
                      to={`/specialities/${dept.slug}`}
                      className="text-xs font-bold text-[#6D2FA0] hover:text-[#32105F] flex items-center gap-1 transition-colors"
                    >
                      <span>{language === "en" ? "Explore Services" : "மேலும் அறிய"}</span>
                      <LucideIcons.ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default SpecialitiesPage;
