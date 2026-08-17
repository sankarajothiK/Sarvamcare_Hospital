import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "../utils/LanguageContext";

export const CentersPage: React.FC = () => {
  const { language, t } = useLanguage();

  const centers = [
    {
      id: "trauma-care",
      name: "Sarvam Trauma Care",
      logo: "/centers/logo_2.png",
      slug: "trauma-care",
      description: "Dedicated emergency polytrauma center operating 24/7. Equipped to address critical head injuries, compound skeletal fractures, and chest/abdominal trauma under code priorities.",
      services: ["Cranial Decompression", "Spinal Stabilization", "Compound Fracture Management", "Visceral Organ Reconstruction"],
      badge: "24/7 Emergency Care"
    },
    {
      id: "neuro-center",
      name: "SarvamCare Neuro Center",
      logo: "/centers/logo_1.png",
      slug: "neuro-center",
      description: "Premier center for comprehensive brain, spine, and nerve care. Under senior leadership, we perform microscopic resections of skull-base tumors, aneurysm clippings, and keyhole spine surgeries.",
      services: ["Skull Base Surgery", "Aneurysm Clippings", "Trigeminal Neuralgia Relief", "Minimally Invasive Discectomy"],
      badge: "Advanced Microsurgery"
    },
    {
      id: "spine-surgery",
      name: "Sarvam Spine Clinic",
      logo: "/centers/logo_3.png",
      slug: "spine-surgery",
      description: "Specialized spine & spinal cord surgery unit. Equipped with advanced technology for correction of congenital spinal deformities, microdiscectomies, and instrumented stabilization for spinal fractures.",
      services: ["Congenital Deformity Correction", "Microdiscectomy", "Spinal Cord Decompression", "Instrumented Fixation"],
      badge: "Spine & Spinal Cord Surgery"
    },
    {
      id: "orthopaedics",
      name: "SarvamCare Bone & Joint Clinix",
      logo: "/centers/logo_4.png",
      slug: "orthopaedic-surgery",
      description: "Advanced orthopaedic surgery center specializing in complex fracture fixation, total knee and hip replacements, arthroscopy, and sports medicine reconstruction.",
      services: ["Joint Replacement (Arthroplasty)", "Complex Fracture Fixation", "Knee & Shoulder Arthroscopy", "Sports Injury Reconstruction"],
      badge: "Orthopaedic & Joint Surgery"
    },
    {
      id: "psychiatry",
      name: "Sahasra Mind Clinix",
      logo: "/centers/logo_5.png",
      slug: "psychiatry-psychology",
      description: "Sahasra Mind Clinix offers clinical psychological assessments, neuro-cognitive therapy, developmental psychology, de-addiction programs, and compassionate psychiatric counselling.",
      services: ["Psychiatric Assessments", "Neuro-Cognitive Therapy", "CBT & Psychotherapy", "Adolescent Counselling"],
      badge: "Psychiatry & Psychology"
    },
    {
      id: "craniofacial",
      name: "Smiling Monk Cranio Facial Clinic",
      logo: "/centers/logo_6.png",
      slug: "craniofacial",
      description: "Specialized reconstructive and cosmetic facial surgical unit. We repair acute facial skeletal fractures, correct congenital syndromic cleft lips, and perform aesthetic nose and scar revisions.",
      services: ["Facial Skeletal Fracture Repair", "Cleft Lip & Palate Correction", "Rhinoplasty & Scar Revision", "Facial Animation Palsy Recovery"],
      badge: "Cosmetic & Reconstruction"
    }
  ];

  const getTranslatedCenterName = (id: string, name: string) => {
    if (language === "ta") {
      if (id === "trauma-care") return "சர்வம் விபத்து தீவிர சிகிச்சை மையம்";
      if (id === "neuro-center") return "சர்வம் கேர் நரம்பியல் மையம்";
      if (id === "spine-surgery") return "சர்வம் தண்டுவட சிகிச்சை பிரிவு";
      if (id === "orthopaedics") return "சர்வம் கேர் எலும்பு மற்றும் மூட்டு கிளினிக்";
      if (id === "psychiatry") return "சஹஸ்ரா மனநல மருத்துவமனை";
      if (id === "craniofacial") return "புன்னகைத் துறவி முக சீரமைப்பு மையம்";
    }
    return name;
  };

  const getTranslatedCenterBadge = (id: string, badge: string) => {
    if (language === "ta") {
      if (id === "trauma-care") return "24/7 அவசர சிகிச்சை";
      if (id === "neuro-center") return "மேம்பட்ட நுண் அறுவைசிகிச்சை";
      if (id === "spine-surgery") return "தண்டுவட அறுவைசிகிச்சை";
      if (id === "orthopaedics") return "மூட்டு & எலும்பியல் சிகிச்சை";
      if (id === "psychiatry") return "மனநல ஆலோசனை";
      if (id === "craniofacial") return "அழகியல் & மறுசீரமைப்பு";
    }
    return badge;
  };

  const getTranslatedCenterDesc = (id: string, desc: string) => {
    if (language === "ta") {
      if (id === "trauma-care") return "24 மணி நேரமும் செயல்படும் அவசர விபத்து மற்றும் தீவிர சிகிச்சை பிரிவு. தலைக்காயங்கள், எலும்பு முறிவுகள் மற்றும் விபத்து காயங்களுக்கு உடனடி சிகிச்சை வழங்கப்படுகிறது.";
      if (id === "neuro-center") return "மூளை, தண்டுவடம் மற்றும் நரம்பு மண்டல கோளாறுகளுக்கான முதன்மை நரம்பியல் மையம். நவீன நுண்ணோக்கி அறுவைசிகிச்சைகள் மற்றும் மூளைக் கட்டி அறுவைசிகிச்சைகள் செய்யப்படுகின்றன.";
      if (id === "spine-surgery") return "தண்டுவட அறுவைசிகிச்சைக்கான பிரத்யேக பிரிவு. தண்டுவட வளைவு திருத்தம், மைக்ரோடிஸெக்டமி மற்றும் தண்டுவட முறிவு சிகிச்சைக்கான அதிநவீன வசதிகள்.";
      if (id === "orthopaedics") return "மூட்டு மாற்று அறுவைசிகிச்சை, விபத்து எலும்பு முறிவுகள் மற்றும் விளையாட்டு காயங்களுக்கான பிரத்யேக சிகிச்சை மையம்.";
      if (id === "psychiatry") return "மனநல பரிசோதனைகள், நரம்பு சார் நடத்தை சிகிச்சைகள், மற்றும் மனநல ஆலோசனைகள் வழங்கும் நவீன மையம்.";
      if (id === "craniofacial") return "முக எலும்பு முறிவுகள், முயல் உதடு அண்ண பிளவு மற்றும் முக மறுசீரமைப்பு சிகிச்சைகளுக்கான சிறப்பு அழகியல் அறுவைசிகிச்சை மையம்.";
    }
    return desc;
  };

  const getTranslatedCenterService = (srv: string) => {
    if (language === "ta") {
      const map: Record<string, string> = {
        "Cranial Decompression": "மூளை அழுத்த நிவாரண அறுவைசிகிச்சை",
        "Spinal Stabilization": "தண்டுவட நிலைநிறுத்தம்",
        "Compound Fracture Management": "தீவிர எலும்பு முறிவு மேலாண்மை",
        "Visceral Organ Reconstruction": "வயிற்றுப் பகுதி மறுசீரமைப்பு",
        "Skull Base Surgery": "மூளை தளம் சார்ந்த அறுவைசிகிச்சை",
        "Aneurysm Clippings": "இரத்தக் குழாய் வீக்கம் (அனூரிசம்) அறுவைசிகிச்சை",
        "Trigeminal Neuralgia Relief": "முக நரம்பு வலி நிவாரணம்",
        "Minimally Invasive Discectomy": "நுண்-துளை டிஸெக்டமி",
        "Congenital Deformity Correction": "பிறவிக் குறைபாடு திருத்தம்",
        "Microdiscectomy": "மைக்ரோடிஸெக்டமி",
        "Spinal Cord Decompression": "தண்டுவட அழுத்த நிவாரணம்",
        "Instrumented Fixation": "தண்டுவட நிலைநிறுத்துதல்",
        "Joint Replacement (Arthroplasty)": "மூட்டு மாற்று அறுவைசிகிச்சை",
        "Complex Fracture Fixation": "தீவிர எலும்பு முறிவு சீரமைப்பு",
        "Knee & Shoulder Arthroscopy": "முழங்கால் மற்றும் தோள்பட்டை எண்டோஸ்கோபி",
        "Sports Injury Reconstruction": "விளையாட்டுக் காயங்கள் சீரமைப்பு",
        "Psychiatric Assessments": "மனநல பரிசோதனை",
        "Neuro-Cognitive Therapy": "நரம்பு சார் நடத்தை சிகிச்சை",
        "CBT & Psychotherapy": "மனநல ஆலோசனை சிகிச்சை",
        "Adolescent Counselling": "வளரிளம் பருவத்தினர் ஆலோசனை",
        "Facial Skeletal Fracture Repair": "முக எலும்பு முறிவு சீரமைப்பு",
        "Cleft Lip & Palate Correction": "முயல் உதடு & அண்ண பிளவு திருத்தம்",
        "Rhinoplasty & Scar Revision": "மூக்கு வடிவமைப்பு மற்றும் தழும்பு திருத்தம்",
        "Facial Animation Palsy Recovery": "முக வாதத்திலிருந்து மீட்பு சிகிச்சை"
      };
      return map[srv] || srv;
    }
    return srv;
  };

  return (
    <>
      <Helmet>
        <title>{language === "en" ? "Centers of Excellence | SarvamCare Hospital Salem" : "சிறப்பு மருத்துவ மையங்கள் | சர்வம் கேர் மருத்துவமனை சேலம்"}</title>
        <meta name="description" content="Explore our 6 centers of excellence: Trauma Care, Neuro Center, Spine Clinic, Bone & Joint Clinix, Sahasra Mind Clinix, and Smiling Monk Cranio Facial Clinic in Salem." />
        <link rel="canonical" href="https://sarvamcarehospital.in/centers" />
      </Helmet>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 md:py-24 text-center md:text-left">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-[#7E3DB5] blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] uppercase block">
            {language === "en" ? "Specialized Care Centers" : "சிறப்பு மருத்துவப் பிரிவுகள்"}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mt-2 leading-tight">
            {language === "en" ? "Centers of Excellence" : "சிறப்பு மருத்துவ மையங்கள்"}
          </h1>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto md:mx-0 mt-4.5" />
        </div>
      </section>

      {/* Directory Grid */}
      <section className="bg-[#FAF7FF] py-16 md:py-24 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="font-serif text-2xl sm:text-3.5xl font-bold text-[#32105F]">
              {language === "en" ? "Surgical & Clinical Leadership" : "அறுவைசிகிச்சை மற்றும் மருத்துவத் தலைமை"}
            </h2>
            <p className="text-xs text-[#665A70] font-light mt-2 leading-relaxed">
              {language === "en"
                ? "Our clinical capabilities are organized into 6 specialized centers of excellence, combining top-tier medical specialists, state-of-the-art facilities, and compassionate patient care."
                : "எங்களது சேவைகள் 6 அதிநவீன சிறப்புப் பிரிவுகளாகப் பிரிக்கப்பட்டு, தகுதியான மருத்துவர்கள் மற்றும் நவீன வசதிகளுடன் நோயாளிகளுக்கு வழங்கப்படுகின்றன."}
            </p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {centers.map((center) => {
              return (
                <div
                  key={center.id}
                  className="p-6 md:p-8 rounded-3xl border border-[#EDE4F7] bg-white hover:shadow-lg transition-all duration-300 grid grid-cols-1 md:grid-cols-12 gap-6 items-center group"
                >
                  {/* Logo & Badge */}
                  <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left space-y-3">
                    <div className="p-2 rounded-2xl bg-white border border-[#EDE4F7] shadow-sm group-hover:border-[#D8B35A]/30 transition-all duration-300 overflow-hidden w-24 h-24 flex items-center justify-center">
                      <img 
                        src={center.logo} 
                        alt={`${getTranslatedCenterName(center.id, center.name)} Logo`} 
                        className="w-full h-full object-contain select-none"
                      />
                    </div>
                    <span className="text-[9px] bg-red-50 text-red-600 border border-red-200/40 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider block text-center">
                      {getTranslatedCenterBadge(center.id, center.badge)}
                    </span>
                  </div>

                  {/* Description & services */}
                  <div className="md:col-span-6 space-y-4 text-center md:text-left">
                    <h3 className="font-serif text-lg md:text-xl font-bold text-[#32105F] group-hover:text-[#6D2FA0] transition-colors leading-tight">
                      {getTranslatedCenterName(center.id, center.name)}
                    </h3>
                    <p className="text-xs text-[#665A70] leading-relaxed font-light">
                      {getTranslatedCenterDesc(center.id, center.description)}
                    </p>
                    
                    {/* Bullet list of services */}
                    <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
                      {center.services.map((srv, idx) => (
                        <span key={idx} className="text-[9px] bg-[#FAF7FF] border border-[#EDE4F7] text-[#32105F] px-2 py-0.5 rounded-full font-medium">
                          {getTranslatedCenterService(srv)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="md:col-span-3 flex justify-center md:justify-end">
                    <Link
                      to={`/centers/${center.slug}`}
                      className="flex items-center gap-1.5 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#32105F] hover:bg-[#3D176E] active:scale-95 transition-all shadow-md"
                    >
                      <span>{language === "en" ? "Explore Center" : "விவரம் காண்க"}</span>
                      <ChevronRight className="h-4 w-4" />
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

export default CentersPage;
