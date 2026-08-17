import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Phone, MessageCircle, ChevronDown, ChevronRight, Activity, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { contactInfo } from "../data/contact";
import { doctors as staticDoctors } from "../data/doctors";
import { departments as staticDepts } from "../data/departments";
import { services as staticServices } from "../data/services";
import { useLanguage } from "../utils/LanguageContext";

interface DepartmentData {
  _id: string;
  name: string;
  tamilName?: string;
  slug: string;
  description: string;
  tamilDescription?: string;
  icon?: string;
  services: string[];
  faq: { question: string; tamilQuestion?: string; answer: string; tamilAnswer?: string }[];
  seoTitle?: string;
  seoDescription?: string;
}

interface DoctorData {
  _id: string;
  name: string;
  tamilName?: string;
  qualification: string;
  designation: string;
  tamilDesignation?: string;
  departmentId: string;
}

export const DepartmentDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  const [dept, setDept] = useState<DepartmentData | null>(null);
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    const fetchDeptData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/departments/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setDept(data);
        } else {
          throw new Error("Dept not found");
        }

        // Fetch doctors
        const docRes = await fetch("/api/doctors");
        if (docRes.ok) {
          const docData = await docRes.json();
          setDoctors(docData.filter((d: DoctorData) => d.departmentId === slug));
        }
      } catch (err) {
        // Fallback local mock data seed
        const fallbackDepts = {
          neurosurgery: {
            _id: "1",
            name: "Neurosurgery",
            tamilName: "நரம்பியல் அறுவைசிகிச்சை",
            slug: "neurosurgery",
            description: "Advanced management of brain tumors, skull-base procedures, vascular aneurysm clippings, and complex spine reconstruction services led by senior leadership.",
            tamilDescription: "மூளைக் கட்டிகள், இரத்தக் குழாய் வீக்கம் (அனூரிசம்), தண்டுவடக் கோளாறுகள் மற்றும் நரம்புக் காயங்களுக்கான அதிநவீன அறுவைசிகிச்சை மேலாண்மை.",
            services: ["Brain Tumor Microsurgery", "Spinal Decompression", "Skull Base Surgery", "Aneurysm Clipping", "Stereotactic Biopsy"],
            faq: [
              { 
                question: "What is microdiscectomy?", 
                tamilQuestion: "மைக்ரோடிஸெக்டமி (microdiscectomy) என்றால் என்ன?",
                answer: "A minimally invasive spine procedure performed to relieve nerve root compression.",
                tamilAnswer: "தண்டுவட நரம்பு அழுத்தத்தை நீக்குவதற்காக நுண்ணிய துளை வழியாக செய்யப்படும் ஒரு மேம்பட்ட தண்டுவட அறுவைசிகிச்சை."
              },
              { 
                question: "When should I consult a neurosurgeon?", 
                tamilQuestion: "நான் எப்போது நரம்பியல் அறுவைசிகிச்சை மருத்துவரை அணுக வேண்டும்?",
                answer: "For chronic head injuries, persistent limb numbness, or spine tumors.",
                tamilAnswer: "தலையில் பலத்த காயம், கை, கால்களில் தொடர்ச்சியான மரத்துப்போதல், அல்லது தண்டுவட கட்டிகள் போன்ற பிரச்சனைகளுக்கு அணுக வேண்டும்."
              }
            ],
            seoTitle: "Best Neurosurgery Hospital in Salem | SarvamCare",
            seoDescription: "Consult senior neurosurgeon Prof. Dr. V. Suresh Kumar at SarvamCare Hospital Mamangam. Advanced microsurgery theaters."
          },
          neurology: {
            _id: "2",
            name: "Neurology",
            tamilName: "நரம்பியல் மருத்துவம்",
            slug: "neurology",
            description: "Stroke management clinic, epilepsy, and neurological disorders diagnostics utilizing EEG and modern telemetry.",
            tamilDescription: "மூளை பக்கவாதம் (ஸ்ட்ரோக்) மேலாண்மை, நரம்புத் தளர்ச்சி மற்றும் நரம்பு சார்ந்த நோய்களுக்கான முழுமையான மருத்துவ சிகிச்சை.",
            services: ["Stroke Management", "EEG Diagnostics", "Epilepsy Clinic", "Parkinson's Therapy"],
            faq: [
              { 
                question: "What is FAST?", 
                tamilQuestion: "FAST என்றால் என்ன?",
                answer: "Warning signs of stroke: Face drooping, Arm weakness, Speech difficulty, Time to call.",
                tamilAnswer: "பக்கவாதத்தின் எச்சரிக்கை அறிகுறிகள்: முகம் கோணலாவது (Face drooping), கைகள் தளர்ச்சி (Arm weakness), பேச்சு குளறுவது (Speech difficulty), மற்றும் உடனடியாக மருத்துவரை அழைக்க வேண்டிய நேரம் (Time to call)."
              }
            ],
            seoTitle: "Neurology Specialist Clinic in Salem | SarvamCare",
            seoDescription: "Experienced neurologist consultation, electroencephalogram (EEG) tests, and epilepsy care programs."
          },
          orthopaedics: {
            _id: "3",
            name: "Orthopaedics",
            tamilName: "எலும்பு மற்றும் மூட்டு மருத்துவம்",
            slug: "orthopaedics",
            description: "Dedicated polytrauma fracture fixations, total hip & knee replacements, and sports medicine therapies.",
            tamilDescription: "எலும்பு முறிவுகள், மூட்டு மாற்று சிகிச்சைகள், விளையாட்டுக் காயங்கள் மற்றும் எலும்பியல் விபத்து காயங்களுக்கான நவீன சிகிச்சை.",
            services: ["Joint Replacement Surgery", "Complex Fracture Fixation", "Arthroscopic Surgery", "Physical Rehabilitation"],
            faq: [
              { 
                question: "Do you offer post-op rehabilitation?", 
                tamilQuestion: "அறுவைசிகிச்சைக்குப் பிந்தைய உடற்பயிற்சி சிகிச்சை (rehabilitation) உள்ளதா?",
                answer: "Yes, our post-operative team manages customized physio plans.",
                tamilAnswer: "ஆம், எங்களது இயன்முறை மருத்துவக் குழுவினர் ஒவ்வொரு நோயாளிக்கும் தேவையான உடற்பயிற்சி திட்டங்களை வகுத்துச் செயல்படுத்துகின்றனர்."
              }
            ],
            seoTitle: "Best Orthopaedic Hospital in Salem | SarvamCare",
            seoDescription: "Joint replacements, joint reconstruction, and fracture fixation at SarvamCare Salem Mamangam."
          },
          "plastic-surgery": {
            _id: "4",
            name: "Plastic Surgery",
            tamilName: "பிளாஸ்டிக் மற்றும் மறுசீரமைப்பு அறுவைசிகிச்சை",
            slug: "plastic-surgery",
            description: "Specialized reconstructive surgery, craniofacial correction, microvascular tissue transfers, and cleft lip repairs.",
            tamilDescription: "விபத்துக் காயம் மற்றும் பிறவி குறைபாடுகளுக்கான மறுசீரமைப்பு சிகிச்சைகள், தழும்புகள் திருத்தம் மற்றும் முகப் பொலிவு அறுவைசிகிச்சைகள்.",
            services: ["Cleft lip/palate reconstruction", "Facial trauma reconstruction", "Revision cosmetic surgery", "Botox & fillers"],
            faq: [
              { 
                question: "What is microvascular surgery?", 
                tamilQuestion: "மைக்ரோவாஸ்குலர் (microvascular) அறுவைசிகிச்சை என்றால் என்ன?",
                answer: "Surgical reconstruction utilizing tiny blood vessels transfers.",
                tamilAnswer: "நுண்ணிய இரத்த நாளங்களை மறுஇணைப்பு செய்து திசுக்களைப் புதிய பகுதிக்கு மாற்றி அமைக்கும் அதிநவீன மறுசீரமைப்பு அறுவைசிகிச்சை."
              }
            ],
            seoTitle: "Plastic & Reconstructive Surgery in Salem | SarvamCare",
            seoDescription: "Craniofacial repairs and microvascular tissue reconstructions at SarvamCare."
          }
        };

        const currentDept = fallbackDepts[slug as keyof typeof fallbackDepts];
        if (currentDept) {
          setDept(currentDept);
          // Fallback doctors from static database
          const mappedDocs: DoctorData[] = staticDoctors
            .filter((doc) => doc.specialties.includes(slug))
            .map((doc) => {
              let designation = "Consultant Specialist";
              let tamilDesignation = "சிறப்பு ஆலோசகர்";
              if (doc.id === "dr-v-suresh-kumar") {
                designation = "Chief Consultant Neurosurgeon & HOD";
                tamilDesignation = "தலைமை நரம்பியல் அறுவைசிகிச்சை நிபுணர் மற்றும் துறைத் தலைவர்";
              } else if (doc.specialties.includes("neurosurgery")) {
                designation = "Consultant Neurosurgeon";
                tamilDesignation = "நரம்பியல் அறுவைசிகிச்சை நிபுணர்";
              } else if (doc.specialties.includes("neurology")) {
                designation = "Consultant Neurologist";
                tamilDesignation = "நரம்பியல் சிறப்பு மருத்துவர்";
              } else if (doc.specialties.includes("plastic-surgery")) {
                designation = "Consultant Reconstructive Surgeon";
                tamilDesignation = "மறுசீரமைப்பு அறுவைசிகிச்சை நிபுணர்";
              } else if (doc.specialties.includes("orthopaedics")) {
                designation = "Consultant Orthopaedic Surgeon";
                tamilDesignation = "எலும்பு மற்றும் மூட்டு அறுவைசிகிச்சை நிபுணர்";
              } else if (doc.specialties.includes("pain-clinic")) {
                designation = "Consultant Pain Specialist";
                tamilDesignation = "வலி நிவாரண சிறப்பு மருத்துவர்";
              }
              return {
                _id: doc.id,
                name: doc.name,
                tamilName: doc.tamilName,
                qualification: doc.qualification,
                designation,
                tamilDesignation,
                departmentId: slug
              };
            });
          setDoctors(mappedDocs);
        } else {
          setDept(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDeptData();
    window.scrollTo(0, 0);
  }, [slug]);

  // Try to find matching static department information for extended description
  const staticDeptInfo = staticDepts.find(d => d.id === slug);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-[#32105F] border-t-[#D8B35A] rounded-full animate-spin" />
      </div>
    );
  }

  if (!dept) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <h2 className="font-serif text-2xl font-bold text-[#32105F]">{t("not_found_title")}</h2>
        <p className="text-sm text-[#665A70] mt-2 text-center max-w-md">{t("not_found_desc")}</p>
        <Link to="/" className="mt-6 px-6 py-2.5 rounded-full bg-[#32105F] text-white text-xs font-bold uppercase tracking-wider">
          {t("back_to_home")}
        </Link>
      </div>
    );
  }

  const getTranslatedService = (serviceName: string) => {
    const matched = staticServices.find(s => s.name.toLowerCase() === serviceName.toLowerCase());
    return language === "ta" && matched?.tamilName ? matched.tamilName : serviceName;
  };

  const getDoctorName = (doc: DoctorData) => {
    return language === "ta" && doc.tamilName ? doc.tamilName : doc.name;
  };

  return (
    <>
      <Helmet>
        <title>{language === "en" ? `${dept.name} Specialist Clinic Salem | SarvamCare` : `${dept.tamilName || dept.name} சிறப்பு பிரிவு சேலம் | சர்வம் கேர்`}</title>
        <meta name="description" content={dept.description} />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 md:py-24 text-center md:text-left">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-[#7E3DB5] blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] uppercase block">
            {t("dept_detail_eyebrow")}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mt-2 leading-tight">
            {language === "ta" && (dept.tamilName || staticDeptInfo?.tamilName) ? (dept.tamilName || staticDeptInfo?.tamilName) : dept.name}
          </h1>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto md:mx-0 mt-4.5" />
        </div>
      </section>

      {/* Main Section */}
      <section className="bg-white py-16 md:py-24 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Content (Overview & Services) */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Description */}
              <div className="space-y-4">
                <h2 className="font-serif text-2xl sm:text-3.5xl font-bold text-[#32105F]">
                  {language === "en" ? "Clinical Overview" : "மருத்துவ விவரக்குறிப்பு"}
                </h2>
                <p className="text-sm text-[#665A70] leading-relaxed font-light">
                  {language === "ta" && (dept.tamilDescription || staticDeptInfo?.tamilDescription) 
                    ? (dept.tamilDescription || staticDeptInfo?.tamilDescription) 
                    : dept.description}
                </p>
              </div>

              {/* Services List */}
              <div className="space-y-6">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#32105F]">
                  {t("dept_detail_services")}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {dept.services.map((service, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 rounded-xl border border-[#EDE4F7] bg-[#FAF7FF]/50 hover:bg-white transition-all">
                      <div className="p-1.5 rounded-lg bg-[#32105F] text-[#D8B35A]">
                        <Activity className="h-4 w-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-[#32105F]">
                        {getTranslatedService(service)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Department specific FAQs */}
              {dept.faq && dept.faq.length > 0 && (
                <div className="space-y-6">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#32105F]">
                    {language === "en" ? "Frequently Asked Questions" : "அடிக்கடி கேட்கப்படும் கேள்விகள்"}
                  </h3>
                  <div className="space-y-3">
                    {dept.faq.map((item, index) => (
                      <div key={index} className="border border-[#EDE4F7] rounded-xl overflow-hidden">
                        <button
                          onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                          className="w-full flex items-center justify-between p-4 bg-[#FAF7FF]/50 hover:bg-[#FAF7FF] text-left transition-colors"
                        >
                          <span className="text-xs sm:text-sm font-bold text-[#32105F]">
                            {language === "ta" && item.tamilQuestion ? item.tamilQuestion : item.question}
                          </span>
                          <ChevronDown className={`h-4 w-4 text-[#D8B35A] transition-transform ${activeFaq === index ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {activeFaq === index && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: "auto" }}
                              exit={{ height: 0 }}
                              className="overflow-hidden bg-white"
                            >
                              <div className="p-4 text-xs sm:text-sm text-[#665A70] leading-relaxed border-t border-[#F3EDFA] font-light">
                                {language === "ta" && item.tamilAnswer ? item.tamilAnswer : item.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Content (Physicians & Booking CTAs) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Department Doctors List */}
              <div className="p-6 rounded-2xl border border-[#EDE4F7] bg-[#FAF7FF]">
                <h3 className="font-serif text-lg font-bold text-[#32105F] mb-4">{t("dept_detail_doctors")}</h3>
                {doctors.length > 0 ? (
                  <div className="space-y-4">
                    {doctors.map(doc => {
                      const docSlug = doc.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                      return (
                        <Link
                          key={doc._id}
                          to={`/doctors/${docSlug}`}
                          className="flex items-center gap-3.5 p-3 rounded-xl border border-white bg-white hover:border-[#D8B35A]/30 hover:shadow-md transition-all duration-300 group"
                        >
                          <div className="h-11 w-11 rounded-full bg-[#32105F] flex items-center justify-center font-bold text-white text-xs shrink-0 relative border border-[#D8B35A]/35">
                            {doc.name.split(" ").slice(-2).map(n => n[0]).join("")}
                            <Award className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 text-[#D8B35A] fill-[#32105F]" />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-1.5">
                              <h4 className="text-xs font-bold text-[#32105F] group-hover:text-[#6D2FA0] transition-colors leading-tight">
                                {getDoctorName(doc)}
                              </h4>
                              {doc.qualification && (
                                <span className="text-[9px] px-1.5 py-0.25 rounded bg-[#FAF7FF] border border-[#EDE4F7] text-[#6D2FA0] font-bold font-sans">
                                  {doc.qualification}
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-[#665A70] font-light truncate mt-0.5">
                              {language === "ta" && doc.tamilDesignation ? doc.tamilDesignation : doc.designation}
                            </p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-[#D8B35A] ml-auto" />
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-[#665A70] font-light">{t("dept_detail_no_doctors")}</p>
                )}
              </div>

              {/* CTAs */}
              <div className="p-6 rounded-2xl border border-[#EDE4F7] bg-white space-y-4 text-center">
                <h4 className="font-serif text-base font-bold text-[#32105F]">
                  {language === "en" ? "Need Medical Advice?" : "மருத்துவ ஆலோசனை தேவையா?"}
                </h4>
                <p className="text-xs text-[#665A70] font-light leading-relaxed">
                  {language === "en" 
                    ? "Book a priority direct checkup slot or chat with our helpdesk specialist team online." 
                    : "ஆன்லைனில் முன்பதிவு செய்து முன்னுரிமை பெற்று மருத்துவரைச் சந்திக்கவும்."}
                </p>
                <div className="space-y-3 pt-2">
                  <a
                    href={`tel:${contactInfo.phoneRaw}`}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#32105F] hover:bg-[#3D176E] transition-all"
                  >
                    <Phone className="h-4 w-4" />
                    <span>{language === "en" ? "Call Direct Line" : "நேரடி உதவி எண்"}</span>
                  </a>
                  <a
                    href={contactInfo.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-green-600 hover:bg-green-700 transition-all"
                  >
                    <MessageCircle className="h-4.5 w-4.5" />
                    <span>{t("whatsapp_chat")}</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default DepartmentDetail;
