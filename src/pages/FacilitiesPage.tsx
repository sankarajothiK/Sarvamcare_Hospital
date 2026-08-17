import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { facilities } from "../data/facilities";
import * as LucideIcons from "lucide-react";
import { contactInfo } from "../data/contact";
import { useLanguage } from "../utils/LanguageContext";

export const FacilitiesPage: React.FC = () => {
  const { language, t } = useLanguage();

  const getTranslatedName = (id: string, name: string) => {
    if (language === "ta") {
      if (id === "hospital-exterior") return "நவீன நுழைவாயில் & முகப்புத் தோற்றம்";
      if (id === "operating-theatres") return "அதிநவீன அறுவைசிகிச்சை கூடங்கள் (Modular OT)";
      if (id === "hybrid-icu") return "14 படுக்கைகள் கொண்ட தீவிர கண்காணிப்புப் பிரிவு (ICU)";
      if (id === "ct-scan") return "அதிவேக 32-ஸ்லைஸ் சிடி ஸ்கேன் மையம்";
      if (id === "modern-laboratory") return "தானியங்கி நோயறிதல் மற்றும் பரிசோதனை ஆய்வகம் (Lab)";
      if (id === "patient-suites") return "பிரீமியம் தனிநபர் தங்கும் அறைகள் & வார்டுகள்";
    }
    return name;
  };

  const getTranslatedCategory = (cat: string) => {
    if (language === "ta") {
      if (cat === "Infrastructure") return "கட்டமைப்பு";
      if (cat === "Surgical Suite") return "அறுவைசிகிச்சை கூடம்";
      if (cat === "Critical Care") return "தீவிர சிகிச்சை";
      if (cat === "Diagnostics") return "நோயறிதல்";
      if (cat === "Patient Rooms") return "நோயாளிகள் அறை";
    }
    return cat;
  };

  const getTranslatedDesc = (id: string, desc: string) => {
    if (language === "ta") {
      if (id === "hospital-exterior") return "மாற்றுத்திறனாளிகளுக்கான சாய்தளப் பாதைகள், அவசர ஆம்புலன்ஸ் நிறுத்துமிடம் மற்றும் தூய்மையான வடிவமைப்புடன் கூடிய பிரதான நுழைவாயில்.";
      if (id === "operating-theatres") return "நுண்ணுயிரிகள் அற்ற, கிருமி நீக்கம் செய்யப்பட்ட காற்று சுத்திகரிப்புடன் கூடிய நவீன நரம்பியல் மற்றும் எலும்பியல் அறுவைசிகிச்சை தியேட்டர்கள்.";
      if (id === "hybrid-icu") return "செயற்கை சுவாசக் கருவிகள் மற்றும் அதிநவீன மானிட்டர்களுடன், தகுதி வாய்ந்த மருத்துவர்கள் 24 மணி நேரமும் கண்காணிக்கும் தீவிர சிகிச்சைப் பிரிவு.";
      if (id === "ct-scan") return "தலைக்காயங்கள் மற்றும் எலும்பு முறிவுகளை மிக விரைவாகக் கண்டறியும் அதிநவீன 32-ஸ்லைஸ் சிடி ஸ்கேன் வசதி.";
      if (id === "modern-laboratory") return "துல்லியமான முடிவுகளை விரைவாக வழங்கும் முழு தானியங்கி உயிர்வேதியியல் மற்றும் இரத்தப் பரிசோதனை ஆய்வகம்.";
      if (id === "patient-suites") return "அனைத்து வசதிகளும் கொண்ட தனிநபர் படுக்கையறைகள் மற்றும் நோயாளிகளுக்குத் தேவையான செவிலியர் அழைப்பு வசதிகள் கொண்ட அறைகள்.";
    }
    return desc;
  };

  return (
    <>
      <Helmet>
        <title>{language === "en" ? "Advanced Medical Technology & Facilities | SarvamCare Hospital Salem" : "மேம்பட்ட மருத்துவ வசதிகள் & தொழில்நுட்பங்கள் | சர்வம் கேர் சேலம்"}</title>
        <meta name="description" content="Explore our high-end clinical facilities in Salem: Zeiss neurosurgical microscope, 32 Slice CT scan diagnostics, Storz endoscopes, and 14 bed Hybrid ICU unit." />
        <link rel="canonical" href="https://sarvamcarehospital.in/facilities" />
      </Helmet>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 md:py-24 text-center md:text-left">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-[#7E3DB5] blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] uppercase block">
            {language === "en" ? "Clinical Infrastructure" : "மருத்துவ உள்கட்டமைப்பு"}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mt-2 leading-tight">
            {language === "en" ? "Medical Facilities & Technology" : "மருத்துவ வசதிகள் & தொழில்நுட்பங்கள்"}
          </h1>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto md:mx-0 mt-4.5" />
        </div>
      </section>

      {/* Intro Block */}
      <section className="bg-white py-16 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-serif text-2xl sm:text-3.5xl font-bold text-[#32105F]">
                {language === "en" ? "Modern Equipment Built for Patient Safety & Surgical Precision" : "நோயாளி பாதுகாப்பு & அறுவைசிகிச்சை துல்லியத்திற்கான நவீன உள்கட்டமைப்பு"}
              </h2>
              <p className="text-sm text-[#665A70] leading-relaxed font-light">
                {language === "en"
                  ? "At SarvamCare Hospital, we believe that clinical outcomes depend heavily on the tools and environment in which our specialists operate. Our facility in Salem features two state-of-the-art modular operating theatres, specialized microsurgery equipment, high-speed imaging diagnostics, and a dedicated 14-bed hybrid critical care unit."
                  : "சர்வம் கேர் மருத்துவமனையில், நோயாளிகளின் நலம் மற்றும் வெற்றிகரமான சிகிச்சைகள் அதிநவீன கருவிகள் மற்றும் பாதுகாப்பான சூழலையே சார்ந்துள்ளன என்று நம்புகிறோம். சேலத்தில் உள்ள எங்களது மருத்துவமனையில் இரண்டு நவீன அறுவைசிகிச்சை கூடங்கள், நரம்பியல் நுண்ணோக்கி கருவிகள், அதிவேக சிடி ஸ்கேன் மற்றும் 14 படுக்கைகள் கொண்ட தீவிர சிகிச்சைப் பிரிவு உள்ளன."}
              </p>
              <p className="text-sm text-[#665A70] leading-relaxed font-light">
                {language === "en"
                  ? "Every operating system, from our Carl Zeiss microscopes to our high-resolution GE CT scanner, is calibrated to support senior surgeons in performing high-complexity procedures safely."
                  : "எங்கள் கார்ல் ஜெய்ஸ் நரம்பியல் நுண்ணோக்கி முதல் அதிவேக சிடி ஸ்கேன் வரை அனைத்து உபகரணங்களும், தகுதியான அறுவைசிகிச்சை நிபுணர்கள் மிகச் சிறந்த முறையில் அறுவைசிகிச்சைகள் செய்ய உதவுகின்றன."}
              </p>
            </div>
            
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative rounded-3xl p-1.5 bg-[#FAF7FF] border border-[#EDE4F7] shadow-xl w-full max-w-[370px]">
                <div className="relative aspect-[4/3] rounded-[22px] overflow-hidden">
                  <img
                    src="/sarvam_trauma_neuro_board.png"
                    alt="Sarvam Trauma & Neuro Center Signboard"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="bg-[#FAF7FF] py-16 md:py-24 border-t border-[#EDE4F7] font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((fac) => {
              const Icon = (LucideIcons as any)[fac.iconName] || LucideIcons.HeartPulse;
              return (
                <div key={fac.id} className="p-4 rounded-2xl border border-[#EDE4F7] bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    {/* Facility Image with hover zoom */}
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-4 border border-slate-100 shadow-sm">
                      <img 
                        src={fac.imageUrl} 
                        alt={getTranslatedName(fac.id, fac.name)} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="p-2.5 rounded-lg bg-[#FAF7FF] text-[#D8B35A] border border-[#D8B35A]/25 w-fit group-hover:bg-[#32105F] group-hover:text-white transition-colors duration-300">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-[9px] text-[#6D2FA0] font-bold uppercase tracking-wider block">
                          {getTranslatedCategory(fac.category)}
                        </span>
                      </div>
                      <h3 className="font-serif text-sm sm:text-base font-bold text-[#32105F]">
                        {getTranslatedName(fac.id, fac.name)}
                      </h3>
                      <p className="text-xs text-[#665A70] leading-relaxed font-light">
                        {getTranslatedDesc(fac.id, fac.description)}
                      </p>
                    </div>
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

export default FacilitiesPage;
