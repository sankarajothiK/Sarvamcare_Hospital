import React from "react";
import { Helmet } from "react-helmet-async";
import { Scissors, Heart, Sparkles } from "lucide-react";
import { SmilingMonk } from "../sections/SmilingMonk";
import { useLanguage } from "../utils/LanguageContext";

export const SmilingMonkPage: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{language === "en" ? "Smiling Monk Craniofacial Clinic | SarvamCare Hospital" : "புன்னகைத் துறவி முக சீரமைப்பு மையம் | சர்வம் கேர்"}</title>
        <meta name="description" content="Explore Smiling Monk plastic, cosmetic and craniofacial surgery services in Salem: cleft lip repair, facial trauma reconstruction, rhinoplasty and botox." />
        <link rel="canonical" href="https://sarvamcarehospital.in/smiling-monk" />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 md:py-24 text-center md:text-left">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-[#7E3DB5] blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] uppercase block">
            {language === "en" ? "Craniofacial Clinic" : "முக சீரமைப்பு கிளினிக்"}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mt-2 leading-tight">
            {language === "en" ? "Smiling Monk Center" : "புன்னகைத் துறவி முக சீரமைப்பு மையம்"}
          </h1>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto md:mx-0 mt-4.5" />
        </div>
      </section>

      {/* Render the core section */}
      <SmilingMonk />

      {/* Trust factors */}
      <section className="bg-white py-16 md:py-24 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="font-serif text-2xl sm:text-3.5xl font-bold text-[#32105F]">
              {language === "en" ? "Reconstructive Excellence" : "முக மறுசீரமைப்புச் சிறப்பு"}
            </h3>
            <p className="text-xs text-[#665A70] font-light mt-2 leading-relaxed">
              {language === "en"
                ? "We restore facial form, function, and symmetry following trauma, cancer resections, or congenital anomalies."
                : "விபத்துக்கள் அல்லது பிறவிக் குறைபாடுகளால் ஏற்படும் முகக் குறைபாடுகளைச் சீரமைத்து புதிய புன்னகையை வழங்குகிறோம்."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#FAF7FF] border border-[#EDE4F7] space-y-3">
              <Sparkles className="h-6 w-6 text-[#D8B35A]" />
              <h4 className="text-sm font-bold text-[#32105F]">
                {language === "en" ? "Congenital Repairs" : "பிறவிக் குறைபாடுகள் சீரமைப்பு"}
              </h4>
              <p className="text-xs text-[#665A70] leading-relaxed font-light">
                {language === "en"
                  ? "Dedicated surgical pathways for cleft lip corrections, cleft palates restorations, and cranial shape alignments."
                  : "முயல் உதடு, அண்ண பிளவு மற்றும் பிறவி முகக் கோளாறுகளுக்கான பிரத்யேக அறுவைசிகிச்சைகள்."}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7FF] border border-[#EDE4F7] space-y-3">
              <Scissors className="h-6 w-6 text-[#D8B35A]" />
              <h4 className="text-sm font-bold text-[#32105F]">
                {language === "en" ? "Aesthetic Alignment" : "அழகியல் அறுவைசிகிச்சை"}
              </h4>
              <p className="text-xs text-[#665A70] leading-relaxed font-light">
                {language === "en"
                  ? "Professional rhinoplasty, blepharoplasty, scar revision procedures, and botox/filler adjustments."
                  : "மூக்கு வடிவமைப்பு (Rhinoplasty), கண் இமை சீரமைப்பு மற்றும் தழும்புகளை நீக்கும் மேம்பட்ட அழகியல் சிகிச்சைகள்."}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7FF] border border-[#EDE4F7] space-y-3">
              <Heart className="h-6 w-6 text-[#D8B35A]" />
              <h4 className="text-sm font-bold text-[#32105F]">
                {language === "en" ? "Reconstructive trauma" : "விபத்து முக மறுசீரமைப்பு"}
              </h4>
              <p className="text-xs text-[#665A70] leading-relaxed font-light">
                {language === "en"
                  ? "Microvascular muscle/tissue transfers to reconstruct facial structures following vehicular trauma accidents."
                  : "விபத்துக்களால் முக எலும்புகள் அல்லது தசைகளில் ஏற்படும் பாதிப்புகளை நுண்ணிய இரத்த நாள திசு மாற்று மூலம் சீரமைத்தல்."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SmilingMonkPage;
