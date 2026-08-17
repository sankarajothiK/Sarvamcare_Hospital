import React from "react";
import { Sparkles, User, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { SmilingMonkLogo } from "../components/BrandLogos";
import { useLanguage } from "../utils/LanguageContext";

export const SmilingMonk: React.FC = () => {
  const { language, t } = useLanguage();

  const services = [
    { title: "Facial Trauma Reconstruction", subtitle: "Acute fracture repairs and secondary correction of old, misaligned facial injuries." },
    { title: "Craniofacial Syndromic Correction", subtitle: "Congenital deformities, microtia, and comprehensive facial syndrome surgeries." },
    { title: "Functional Rhinoplasty", subtitle: "Aesthetic nose reshaping coupled with airway obstruction correction." },
    { title: "Eyelid Restoration (Blepharoplasty)", subtitle: "Aesthetic upper and lower eyelid lifting and bag evacuation." },
    { title: "Orbital Wall Reconstruction", subtitle: "Surgical repair of eye socket fractures and enophthalmos correction." },
    { title: "Cleft Lip & Palate Correction", subtitle: "Reconstructive cleft lips and cleft palate repairs for pediatric and adult patients." },
    { title: "Facial Nerve Reanimation", subtitle: "Reconstructive nerve grafting and muscle transfers for facial palsy." },
    { title: "Aesthetic Otoplasty", subtitle: "Cosmetic reshaping of deformed, asymmetrical, or prominent ears." },
    { title: "Scar Revision", subtitle: "Advanced revision of prominent facial and cutaneous surgical scars." }
  ];

  const team = [
    "Facio Maxillary Surgeons",
    "Plastic Surgeons",
    "Ophthalmologist",
    "Neurosurgeons"
  ];

  const getTranslatedTeamRole = (role: string) => {
    if (language === "ta") {
      if (role === "Facio Maxillary Surgeons") return "தாடை மற்றும் முக அறுவைசிகிச்சை நிபுணர்";
      if (role === "Plastic Surgeons") return "பிளாஸ்டிக் அறுவைசிகிச்சை நிபுணர்";
      if (role === "Ophthalmologist") return "கண் மருத்துவ நிபுணர்";
      if (role === "Neurosurgeons") return "நரம்பியல் அறுவைசிகிச்சை நிபுணர்";
    }
    return role;
  };

  const getTranslatedTitle = (title: string) => {
    if (language === "ta") {
      if (title === "Facial Trauma Reconstruction") return "முகக் காயங்கள் சீரமைப்பு";
      if (title === "Craniofacial Syndromic Correction") return "முக வடிவக் குறைபாடு சீரமைப்பு";
      if (title === "Functional Rhinoplasty") return "மூக்கு வடிவமைப்பு (Rhinoplasty)";
      if (title === "Eyelid Restoration (Blepharoplasty)") return "இமை வடிவமைப்பு (Blepharoplasty)";
      if (title === "Orbital Wall Reconstruction") return "கண் கூண்டு முறிவு அறுவைசிகிச்சை";
      if (title === "Cleft Lip & Palate Correction") return "முயல் உதடு & அண்ண பிளவு சீரமைப்பு";
      if (title === "Facial Nerve Reanimation") return "முக நரம்பு வாத மறுசீரமைப்பு";
      if (title === "Aesthetic Otoplasty") return "காது வடிவமைப்பு (Otoplasty)";
      if (title === "Scar Revision") return "முக தழும்பு திருத்தம்";
    }
    return title;
  };

  const getTranslatedSubtitle = (title: string, subtitle: string) => {
    if (language === "ta") {
      if (title === "Facial Trauma Reconstruction") return "விபத்துகளால் ஏற்படும் முக எலும்பு முறிவுகள் மற்றும் பழைய முகக் காயங்களைச் சீரமைத்தல்.";
      if (title === "Craniofacial Syndromic Correction") return "பிறவிக் குறைபாடுகள் மற்றும் முக வடிவமைப்புக் கோளாறுகளுக்கான சிறப்பு சிகிச்சைகள்.";
      if (title === "Functional Rhinoplasty") return "சுவாசக் கோளாறுகளைச் சரிசெய்யும் அதே வேளையில் அழகியல் மூக்கு வடிவமைப்பு.";
      if (title === "Eyelid Restoration (Blepharoplasty)") return "கண் இமை தளர்ச்சி மற்றும் கண் இமைகளில் உள்ள சுருக்கங்களை நீக்கும் சிகிச்சை.";
      if (title === "Orbital Wall Reconstruction") return "கண்களைச் சுற்றியுள்ள எலும்பு முறிவுகள் மற்றும் கண் வீக்கங்களைச் சரிசெய்தல்.";
      if (title === "Cleft Lip & Palate Correction") return "குழந்தைகள் மற்றும் பெரியவர்களுக்கான முயல் உதடு மற்றும் அண்ண பிளவு அறுவைசிகிச்சைகள்.";
      if (title === "Facial Nerve Reanimation") return "முக பக்கவாதத்தால் பாதிக்கப்பட்ட நரம்புகள் மற்றும் தசைகளை மறுசீரமைக்கும் அறுவைசிகிச்சை.";
      if (title === "Aesthetic Otoplasty") return "வடிவமற்ற அல்லது துருத்திக்கொண்டிருக்கும் காதுகளை அழகாக வடிவமைத்தல்.";
      if (title === "Scar Revision") return "முகத்தில் உள்ள தழும்புகள் மற்றும் அறுவைசிகிச்சை வடுக்களை மறையச் செய்யும் மேம்பட்ட சிகிச்சைகள்.";
    }
    return subtitle;
  };

  return (
    <section id="smiling-monk" className="bg-[#FAF7FF] py-16 md:py-24 border-b border-[#EDE4F7] relative overflow-hidden font-sans">
      {/* Aesthetic curved shapes transition in background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[45%] h-full bg-gradient-to-br from-[#7E3DB5]/5 to-transparent transform -skew-x-12 origin-top-left" />
        <div className="absolute bottom-0 right-0 w-[30%] h-1/2 bg-[#D8B35A]/5 rounded-tl-full blur-2xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header containing the Smiling Monk Logo */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SmilingMonkLogo className="h-20 w-20" showText={false} />
          </motion.div>
          
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#6D2FA0] uppercase mt-4">
            {language === "en" ? "Smiling Monk® Cranio Facial Clinic" : "புன்னகைத் துறவி® முக சீரமைப்பு கிளினிக்"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4.5xl font-extrabold text-[#32105F] mt-2">
            {language === "en" ? "Reconstructive Facial Surgery" : "முக சீரமைப்பு மற்றும் பிளாஸ்டிக் அறுவைசிகிச்சை"}
          </h2>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto mt-4.5" />
          
          <p className="text-xs sm:text-sm text-[#665A70] mt-4 leading-relaxed font-sans font-light max-w-2xl">
            {language === "en"
              ? "Dedicated clinic for acute facial trauma repair, correction of cleft deformities, and secondary aesthetic revision of facial features."
              : "முக விபத்துக் காயங்கள், முயல் உதடு பிறவிக் குறைபாடுகள் மற்றும் அழகியல் முக அறுவைசிகிச்சைகளுக்கான சிறப்புப் பிரிவு."}
          </p>
        </div>

        {/* Team Grid Banner */}
        <div className="max-w-3xl mx-auto mb-12 p-5 rounded-2xl bg-white border border-[#EDE4F7] flex flex-wrap items-center justify-around gap-4 shadow-sm">
          <span className="text-[11px] font-bold text-[#32105F] uppercase tracking-wider flex items-center gap-1.5 shrink-0">
            <User className="h-4 w-4 text-[#D8B35A]" />
            <span>{language === "en" ? "Clinic Specialists:" : "துறை மருத்துவர்கள்:"}</span>
          </span>
          <div className="flex flex-wrap items-center gap-2 justify-center">
            {team.map((role) => (
              <span
                key={role}
                className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-[#FAF7FF] text-[#6D2FA0] border border-[#EDE4F7]"
              >
                {getTranslatedTeamRole(role)}
              </span>
            ))}
          </div>
        </div>

        {/* Reconstructive and Cosmetic Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              className="group p-6 rounded-2xl border border-[#EDE4F7] bg-white hover:shadow-xl hover:-translate-y-1 hover:border-[#D8B35A] hover-glow-purple transition-all duration-300 relative overflow-hidden shadow-sm"
            >
              {/* Sparkle badge in top corner */}
              <div className="absolute top-0 right-0 h-14 w-14 bg-[#FAF7FF] rounded-bl-full flex justify-center items-center pointer-events-none group-hover:bg-[#FAF7FF] transition-colors border-l border-b border-[#EDE4F7]/60">
                <Sparkles className="h-3.5 w-3.5 text-[#D8B35A] opacity-80" />
              </div>

              <div className="space-y-3">
                {/* Icon wrapper - moves slightly upward on hover */}
                <div className="p-2.5 w-fit rounded-lg bg-[#FAF7FF] text-[#D8B35A] border border-[#D8B35A]/25 transition-transform duration-300 group-hover:-translate-y-1.5">
                  <HelpCircle className="h-5 w-5" />
                </div>
                
                <h3 className="font-serif text-base font-bold text-[#32105F] pr-4 leading-snug">
                  {getTranslatedTitle(item.title)}
                </h3>
                
                <p className="text-xs text-[#665A70] leading-relaxed font-sans font-light">
                  {getTranslatedSubtitle(item.title, item.subtitle)}
                </p>

                {/* Small gold line - expands on hover */}
                <div className="h-[1.5px] w-6 bg-[#D8B35A] group-hover:w-14 transition-all duration-300 mt-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default SmilingMonk;
