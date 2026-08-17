import React from "react";
import { Helmet } from "react-helmet-async";
import { ChevronRight, AlertTriangle } from "lucide-react";
import { TraumaCare } from "../sections/TraumaCare";
import { contactInfo } from "../data/contact";
import { useLanguage } from "../utils/LanguageContext";

export const TraumaPage: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{language === "en" ? "24/7 PolyTrauma & ICU emergency Care Salem | SarvamCare Hospital" : "24/7 விபத்து & அவசர சிகிச்சை சேலம் | சர்வம் கேர்"}</title>
        <meta name="description" content="Sarvam Polytrauma emergency ICU provides specialized neurosurgeons, orthopaedicians, plastic surgeons, and 24/7 life support systems." />
        <link rel="canonical" href="https://sarvamcarehospital.in/trauma-care" />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 md:py-24 text-center md:text-left">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-[#7E3DB5] blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] uppercase block">
            {language === "en" ? "Emergency Care" : "அவசர சிகிச்சை"}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mt-2 leading-tight">
            {language === "en" ? "Polytrauma & ICU Center" : "விபத்து & தீவிர சிகிச்சை மையம்"}
          </h1>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto md:mx-0 mt-4.5" />
        </div>
      </section>

      {/* Trauma Specific Overview */}
      <section className="bg-white py-16 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 md:p-8 rounded-3xl bg-red-50 border border-red-200/50 flex flex-col md:flex-row items-center gap-6 mb-12 shadow-sm">
            <div className="p-3 rounded-2xl bg-red-100 text-red-600 shrink-0">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <div className="text-center md:text-left space-y-1">
              <h4 className="text-sm font-bold text-red-800 uppercase tracking-wider">
                {language === "en" ? "Emergency Response Unit" : "அவசர சிகிச்சை பிரிவு"}
              </h4>
              <p className="text-xs text-red-700 font-light leading-relaxed">
                {language === "en"
                  ? "If you are coordinating transfer for a critical head injury, polytrauma, or fracture patient, call our dedicated trauma hotline immediately for ambulance dispatch and trauma bay clearance."
                  : "தலைக்காயம், தீவிர விபத்து அல்லது எலும்பு முறிவு நோயாளிகளுக்கு அவசர ஆம்புலன்ஸ் தேவைப்பட்டால், உடனடியாக எங்களது உதவி எண்ணை அழைக்கவும்."}
              </p>
              <div className="pt-2">
                <a href={`tel:${contactInfo.phoneRaw}`} className="inline-flex items-center gap-2 text-xs font-extrabold text-red-700 hover:text-red-900 transition-colors">
                  <span>{language === "en" ? "Trauma Hotline: " : "விபத்து அவசர எண்: "} {contactInfo.phone}</span>
                  <ChevronRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Render the core visual node component */}
      <TraumaCare />

      {/* Trauma details blocks */}
      <section className="bg-[#FAF7FF] py-16 border-t border-[#EDE4F7] font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-serif text-2xl sm:text-3.5xl font-bold text-[#32105F] text-center mb-12">
            {language === "en" ? "Polytrauma Treatment Capabilities" : "விபத்து சிகிச்சை வசதிகள்"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-white border border-[#EDE4F7] shadow-sm space-y-3">
              <span className="text-[10px] text-[#6D2FA0] font-bold uppercase tracking-wider block">
                {language === "en" ? "Diagnostics" : "நோயறிதல்"}
              </span>
              <h4 className="text-sm font-bold text-[#32105F]">
                {language === "en" ? "Immediate Brain & Spine Trauma scans" : "உடனடி மூளை & தண்டுவட ஸ்கேன்"}
              </h4>
              <p className="text-xs text-[#665A70] leading-relaxed font-light">
                {language === "en"
                  ? "High-definition CT and digital X-ray diagnostics run concurrently during trauma bay admission."
                  : "அதிநவீன சிடி ஸ்கேன் மற்றும் எக்ஸ்ரே பரிசோதனைகள் அவசர பிரிவிலேயே உடனடியாகச் செய்யப்படும்."}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#EDE4F7] shadow-sm space-y-3">
              <span className="text-[10px] text-[#6D2FA0] font-bold uppercase tracking-wider block">
                {language === "en" ? "Critical Care" : "தீவிர சிகிச்சை"}
              </span>
              <h4 className="text-sm font-bold text-[#32105F]">
                {language === "en" ? "24/7 Dedicated Trauma ICU beds" : "24/7 தீவிர சிகிச்சைப் படுக்கைகள்"}
              </h4>
              <p className="text-xs text-[#665A70] leading-relaxed font-light">
                {language === "en"
                  ? "Ventilatory support, invasive monitoring lines, and dedicated critical care nursing teams active around the clock."
                  : "செயற்கை சுவாசக் கருவிகள் மற்றும் பிரத்யேக மருத்துவக் கண்காணிப்பு 24 மணி நேரமும் கிடைக்கும்."}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#EDE4F7] shadow-sm space-y-3">
              <span className="text-[10px] text-[#6D2FA0] font-bold uppercase tracking-wider block">
                {language === "en" ? "Surgical Support" : "அறுவைசிகிச்சை ஆதரவு"}
              </span>
              <h4 className="text-sm font-bold text-[#32105F]">
                {language === "en" ? "Emergency Micro-reconstruction" : "அவசர மறுசீரமைப்பு அறுவைசிகிச்சை"}
              </h4>
              <p className="text-xs text-[#665A70] leading-relaxed font-light">
                {language === "en"
                  ? "Plastic, neuro, orthopaedic, and faciomaxillary surgeons work in sync to reconstruct multi-site injuries."
                  : "விபத்துக் காயங்களைச் சீரமைக்க பிளாஸ்டிக், நரம்பியல் மற்றும் எலும்பியல் மருத்துவர்கள் இணைந்து செயல்படுகின்றனர்."}
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default TraumaPage;
