import React from "react";
import { Helmet } from "react-helmet-async";
import { Brain, Activity, ShieldAlert, Award } from "lucide-react";
import { NeuroCenter } from "../sections/NeuroCenter";
import { useLanguage } from "../utils/LanguageContext";

export const NeuroPage: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{language === "en" ? "Advanced Neuro Center in Salem | SarvamCare Hospital" : "மேம்பட்ட நரம்பியல் மையம் சேலம் | சர்வம் கேர்"}</title>
        <meta name="description" content="SarvamCare Neuro Center offers specialized brain tumor resection, aneurysm clipping, minimally invasive spine solutions, and trigeminal neuralgia surgeries." />
        <link rel="canonical" href="https://sarvamcarehospital.in/neuro-center" />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 md:py-24 text-center md:text-left">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-[#7E3DB5] blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] uppercase block">
            {language === "en" ? "Centers of Excellence" : "சிறப்பு மருத்துவ மையங்கள்"}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mt-2 leading-tight">
            {language === "en" ? "Neuro Center Salem" : "நரம்பியல் சிறப்பு மையம் சேலம்"}
          </h1>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto md:mx-0 mt-4.5" />
        </div>
      </section>

      {/* Visual Component Render */}
      <NeuroCenter />

      {/* Grid of clinical capabilities */}
      <section className="bg-white py-16 md:py-24 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="font-serif text-2xl sm:text-3.5xl font-bold text-[#32105F]">
              {language === "en" ? "Clinical Sub-Specialities" : "நரம்பியல் துணைப்பிரிவுகள்"}
            </h3>
            <p className="text-xs text-[#665A70] font-light mt-2">
              {language === "en" ? "Advanced neurological diagnostics, therapies, and surgeries." : "மேம்பட்ட நரம்பியல் நோயறிதல், சிகிச்சைகள் மற்றும் அறுவைசிகிச்சைகள்."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl border border-[#EDE4F7] bg-[#FAF7FF]/30 space-y-3">
              <h4 className="text-sm font-bold text-[#32105F] flex items-center gap-2">
                <Brain className="h-4.5 w-4.5 text-[#D8B35A]" />
                <span>{language === "en" ? "Brain Tumors & Skull Base" : "மூளைக் கட்டிகள் & மூளைத் தளம்"}</span>
              </h4>
              <p className="text-xs text-[#665A70] leading-relaxed font-light">
                {language === "en"
                  ? "Expertise in micro-resection of acoustic neuromas, pituitary adenomas via transsphenoidal approach, and high-grade glioma debulking."
                  : "அதிநவீன நுண்ணோக்கி மூலம் மூளைக் கட்டிகள் அகற்றுதல் மற்றும் பிட்யூட்டரி சுரப்பிக் கட்டிகளுக்கான மூக்கு வழி அறுவைசிகிச்சை."}
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-[#EDE4F7] bg-[#FAF7FF]/30 space-y-3">
              <h4 className="text-sm font-bold text-[#32105F] flex items-center gap-2">
                <Activity className="h-4.5 w-4.5 text-[#D8B35A]" />
                <span>{language === "en" ? "Vascular Neurosurgery" : "இரத்தக் குழாய் நரம்பியல் அறுவைசிகிச்சை"}</span>
              </h4>
              <p className="text-xs text-[#665A70] leading-relaxed font-light">
                {language === "en"
                  ? "Urgent management of subarachnoid hemorrhages, vascular malformations, intracranial aneurysm clipping, and stroke care."
                  : "மூளை இரத்தக் கசிவு, பக்கவாதம் மற்றும் இரத்தக்குழாய் வீக்கத்திற்கான (அனூரிசம்) அவசரக் கிளிப்பிங் அறுவைசிகிச்சைகள்."}
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-[#EDE4F7] bg-[#FAF7FF]/30 space-y-3">
              <h4 className="text-sm font-bold text-[#32105F] flex items-center gap-2">
                <Award className="h-4.5 w-4.5 text-[#D8B35A]" />
                <span>{language === "en" ? "Microscopic Spine Surgery" : "நுண்ணோக்கி தண்டுவட அறுவைசிகிச்சை"}</span>
              </h4>
              <p className="text-xs text-[#665A70] leading-relaxed font-light">
                {language === "en"
                  ? "Spine stabilization for slip disc, cervical myelopathy, microdiscectomies, and spinal canal tumors debulking."
                  : "டிஸ்க் பாதிப்பு, தண்டுவட அழுத்த நோய், மைக்ரோடிஸெக்டமி மற்றும் தண்டுவடக் கட்டிகளுக்கான நவீன சிகிச்சைகள்."}
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-[#EDE4F7] bg-[#FAF7FF]/30 space-y-3">
              <h4 className="text-sm font-bold text-[#32105F] flex items-center gap-2">
                <ShieldAlert className="h-4.5 w-4.5 text-[#D8B35A]" />
                <span>{language === "en" ? "Functional & Pain Management" : "முக நரம்பு வலி & வலி மேலாண்மை"}</span>
              </h4>
              <p className="text-xs text-[#665A70] leading-relaxed font-light">
                {language === "en"
                  ? "Advanced surgical therapies for trigeminal neuralgia, hemifacial spasm, and neuropathic pain syndromes."
                  : "முக நரம்பு வலி (Trigeminal Neuralgia), முகத் தசைத் துடிப்பு மற்றும் நாள்பட்ட நரம்பு வலிகளுக்கான மேம்பட்ட சிகிச்சைகள்."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NeuroPage;
