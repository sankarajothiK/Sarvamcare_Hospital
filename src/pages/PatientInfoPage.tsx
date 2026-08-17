import React from "react";
import { Helmet } from "react-helmet-async";
import { Info, ShieldAlert, Clock, BookOpen, CreditCard, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../utils/LanguageContext";

export const PatientInfoPage: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{language === "en" ? "Patient & Visitor Information | SarvamCare Hospital Salem" : "நோயாளிகள் & பார்வையாளர்கள் வழிகாட்டி | சர்வம் கேர் சேலம்"}</title>
        <meta name="description" content="Important information for patients and visitors: admissions guidelines, discharge policies, visitor timings, cashless TPA insurance options, and hospital policies." />
        <link rel="canonical" href="https://sarvamcarehospital.in/patient-information" />
      </Helmet>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 md:py-24 text-center md:text-left">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-[#7E3DB5] blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] uppercase block">
            {language === "en" ? "Guide for Patients & Visitors" : "நோயாளிகள் மற்றும் பார்வையாளர்களுக்கான வழிகாட்டி"}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mt-2 leading-tight">
            {language === "en" ? "Patient Information" : "நோயாளிகள் வழிகாட்டி"}
          </h1>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto md:mx-0 mt-4.5" />
        </div>
      </section>

      {/* Warning Notice about placeholders */}
      <section className="bg-amber-50 border-b border-amber-200/60 py-4 text-center font-sans text-xs text-amber-800">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-center gap-2">
          <ShieldAlert className="h-4.5 w-4.5 text-amber-600 shrink-0" />
          <span>
            <strong>{language === "en" ? "Administrator Notice:" : "நிர்வாக அறிவிப்பு:"}</strong>{" "}
            {language === "en" 
              ? "The policies below contain standard templates and placeholders. Please coordinate with the hospital administration desk to update these details."
              : "கீழே உள்ள விதிகள் பொதுவான வழிகாட்டல்கள் ஆகும். கூடுதல் விவரங்களுக்கு உதவி மையத்தைத் தொடர்பு கொள்ளவும்."}
          </span>
        </div>
      </section>

      {/* Info Sections */}
      <section className="bg-white py-16 md:py-24 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Admissions */}
            <div className="p-6 md:p-8 rounded-3xl border border-[#EDE4F7] bg-[#FAF7FF]/40 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#32105F] text-white">
                    <BookOpen className="h-5 w-5 text-[#D8B35A]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#32105F]">
                    {language === "en" ? "Admission Guidelines" : "சேர்க்கை வழிகாட்டுதல்கள்"}
                  </h3>
                </div>
                <div className="h-[1px] w-12 bg-[#D8B35A]" />
                <ul className="space-y-3.5 text-xs text-[#665A70] leading-relaxed font-light">
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D8B35A] shrink-0 mt-1.5" />
                    <span>
                      <strong>{language === "en" ? "OPD Routing:" : "OPD வழிகாட்டுதல்:"}</strong>{" "}
                      {language === "en" 
                        ? "Patients recommended for surgery will be routed to the admissions clearance desk."
                        : "அறுவைசிகிச்சைக்குப் பரிந்துரைக்கப்படும் நோயாளிகள் சேர்க்கை உதவி மையத்திற்கு அனுப்பப்படுவார்கள்."}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D8B35A] shrink-0 mt-1.5" />
                    <span>
                      <strong>{language === "en" ? "Documents:" : "தேவையான ஆவணங்கள்:"}</strong>{" "}
                      {language === "en" 
                        ? "Please carry valid ID proofs (Aadhaar Card, Voter ID) and relevant clinical reports."
                        : "அடையாள அட்டை (ஆதார் அட்டை, வாக்காளர் அட்டை) மற்றும் முந்தைய மருத்துவ அறிக்கைகளைக் கொண்டு வரவும்."}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D8B35A] shrink-0 mt-1.5" />
                    <span>
                      <strong>{language === "en" ? "Clearance:" : "அனுமதி அனுமதி:"}</strong>{" "}
                      {language === "en" 
                        ? "Pre-surgical diagnostics must be cleared prior to ward/ICU transfer."
                        : "வார்டு அல்லது தீவிர சிகிச்சைப் பிரிவுக்கு மாற்றுவதற்கு முன் தேவையான பரிசோதனைகள் முடிக்கப்பட வேண்டும்."}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-xl border border-dashed border-[#EDE4F7] bg-white text-[10px] text-[#665A70] italic">
                {language === "en" ? "[Editable admission policies placeholder]" : "[சேர்க்கை விதிமுறைகள்]"}
              </div>
            </div>

            {/* Discharge */}
            <div className="p-6 md:p-8 rounded-3xl border border-[#EDE4F7] bg-[#FAF7FF]/40 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#32105F] text-white">
                    <Info className="h-5 w-5 text-[#D8B35A]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#32105F]">
                    {language === "en" ? "Discharge Process" : "வெளியேற்ற முறை (Discharge)"}
                  </h3>
                </div>
                <div className="h-[1px] w-12 bg-[#D8B35A]" />
                <ul className="space-y-3.5 text-xs text-[#665A70] leading-relaxed font-light">
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D8B35A] shrink-0 mt-1.5" />
                    <span>
                      <strong>{language === "en" ? "Discharge Timing:" : "வெளியேற்ற நேரம்:"}</strong>{" "}
                      {language === "en" 
                        ? "Patient discharges are typically processed in the morning hours between 10:00 AM - 12:00 PM."
                        : "டிஸ்சார்ஜ் வழக்கமாக காலை 10:00 மணி முதல் மதியம் 12:00 மணிக்குள் செய்யப்படும்."}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D8B35A] shrink-0 mt-1.5" />
                    <span>
                      <strong>{language === "en" ? "Billing Clearance:" : "கட்டண தீர்வு:"}</strong>{" "}
                      {language === "en" 
                        ? "Settlement of pending clinical and pharmacy invoices must be completed at the counter."
                        : "மருத்துவ மற்றும் மருந்துக்கடை கட்டணங்கள் கவுண்டரில் செலுத்தப்பட வேண்டும்."}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D8B35A] shrink-0 mt-1.5" />
                    <span>
                      <strong>{language === "en" ? "Discharge Summary:" : "டிஸ்சார்ஜ் அறிக்கை:"}</strong>{" "}
                      {language === "en" 
                        ? "Collect prescription guides and recovery details prior to checkout."
                        : "வெளியேறும் முன் மருந்துச் சீட்டு வழிகாட்டிகள் மற்றும் அடுத்த கட்ட ஆலோசனை விவரங்களை வாங்கிக் கொள்ளவும்."}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-xl border border-dashed border-[#EDE4F7] bg-white text-[10px] text-[#665A70] italic">
                {language === "en" ? "[Editable discharge guidelines placeholder]" : "[வெளியேற்ற விதிமுறைகள்]"}
              </div>
            </div>

            {/* Visitor Policies */}
            <div className="p-6 md:p-8 rounded-3xl border border-[#EDE4F7] bg-[#FAF7FF]/40 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#32105F] text-white">
                    <Clock className="h-5 w-5 text-[#D8B35A]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#32105F]">
                    {language === "en" ? "Visitor Guidelines & Timings" : "பார்வையாளர்கள் விதிமுறைகள் & நேரம்"}
                  </h3>
                </div>
                <div className="h-[1px] w-12 bg-[#D8B35A]" />
                <ul className="space-y-3.5 text-xs text-[#665A70] leading-relaxed font-light">
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D8B35A] shrink-0 mt-1.5" />
                    <span>
                      <strong>{language === "en" ? "Visitor Timings (General Wards):" : "பார்வையாளர்கள் நேரம் (பொது வார்டுகள்):"}</strong>{" "}
                      {language === "en" 
                        ? "Standard template timings are 4:00 PM to 6:00 PM daily."
                        : "பார்வையாளர்கள் தினசரி மாலை 4:00 மணி முதல் மாலை 6:00 மணி வரை அனுமதிக்கப்படுவர்."}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D8B35A] shrink-0 mt-1.5" />
                    <span>
                      <strong>{language === "en" ? "ICU Regulations:" : "ICU கட்டுப்பாடுகள்:"}</strong>{" "}
                      {language === "en" 
                        ? "Visitors are highly restricted in the 14-bed Hybrid ICU. Permits are subject to intensivist clearance."
                        : "14 படுக்கைகள் கொண்ட தீவிர சிகிச்சைப் பிரிவில் (ICU) பார்வையாளர்கள் அனுமதி மிகவும் கட்டுப்படுத்தப்பட்டுள்ளது."}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D8B35A] shrink-0 mt-1.5" />
                    <span>
                      <strong>{language === "en" ? "Pass Limit:" : "பாஸ் வரம்பு:"}</strong>{" "}
                      {language === "en" 
                        ? "Only one attendant pass is issued per patient at the time of admission."
                        : "நோயாளி சேர்க்கையின் போது ஒரு நோயாளிக்கு ஒரு உதவியாளர் பாஸ் மட்டுமே வழங்கப்படும்."}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-xl border border-dashed border-[#EDE4F7] bg-white text-[10px] text-[#665A70] italic">
                {language === "en" ? "[Editable visitor timings & guidelines placeholder]" : "[பார்வையாளர் விதிமுறைகள்]"}
              </div>
            </div>

            {/* Insurance & TPA Cashless */}
            <div className="p-6 md:p-8 rounded-3xl border border-[#EDE4F7] bg-[#FAF7FF]/40 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#32105F] text-white">
                    <CreditCard className="h-5 w-5 text-[#D8B35A]" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#32105F]">
                    {language === "en" ? "TPA & Cashless Policies" : "காப்பீடு & பணமில்லா சிகிச்சை (TPA)"}
                  </h3>
                </div>
                <div className="h-[1px] w-12 bg-[#D8B35A]" />
                <ul className="space-y-3.5 text-xs text-[#665A70] leading-relaxed font-light">
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D8B35A] shrink-0 mt-1.5" />
                    <span>
                      <strong>{language === "en" ? "Insurance Pre-authorization:" : "காப்பீடு அனுமதி முன்பதிவு:"}</strong>{" "}
                      {language === "en" 
                        ? "Pre-auth requests must be submitted within 24 hours of hospitalization."
                        : "மருத்துவமனையில் அனுமதிக்கப்பட்ட 24 மணி நேரத்திற்குள் காப்பீடு முன் அனுமதி கோரப்பட வேண்டும்."}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D8B35A] shrink-0 mt-1.5" />
                    <span>
                      <strong>{language === "en" ? "Empaneled TPAs:" : "அங்கீகரிக்கப்பட்ட காப்பீட்டு நிறுவனங்கள்:"}</strong>{" "}
                      {language === "en" 
                        ? "Cashless policies are subject to third-party agreements with the hospital billing cell."
                        : "பணமில்லா சிகிச்சை காப்பீட்டு ஒப்பந்தங்களுக்கு உட்பட்டது."}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D8B35A] shrink-0 mt-1.5" />
                    <span>
                      <strong>{language === "en" ? "Reimbursements:" : "மறுசெலுத்துகை (Reimbursement):"}</strong>{" "}
                      {language === "en" 
                        ? "Detailed claim kits can be collected from the billing manager."
                        : "காப்பீடு கோரல் படிவங்களை பில்லிங் பிரிவில் பெற்றுக்கொள்ளலாம்."}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-xl border border-dashed border-[#EDE4F7] bg-white text-[10px] text-[#665A70] italic">
                {language === "en" ? "[Editable cashless insurance & TPA list placeholder]" : "[காப்பீட்டு நிறுவனங்கள் பட்டியல்]"}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Helpdesk Contact CTA */}
      <section className="bg-[#FAF7FF] py-16 border-t border-[#EDE4F7]">
        <div className="max-w-4xl mx-auto text-center px-4 space-y-6">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#32105F]">
            {language === "en" ? "Need help regarding patient services?" : "நோயாளி சேவைகள் பற்றி உதவி தேவையா?"}
          </h3>
          <p className="text-xs text-[#665A70] max-w-lg mx-auto font-light leading-relaxed">
            {language === "en"
              ? "If you need to verify if your specific corporate insurance is empaneled or have questions about ward rates, contact our admissions helpdesk coordinators."
              : "உங்களது காப்பீடு அங்கீகரிக்கப்பட்டுள்ளதா என்பதை அறிய அல்லது கட்டணங்களை அறிய சேர்க்கை உதவி மையத்தைத் தொடர்பு கொள்ளவும்."}
          </p>
          <div className="pt-2">
            <Link to="/contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6D2FA0] hover:text-[#32105F] uppercase tracking-wider">
              <span>{language === "en" ? "Contact Admissions Cell" : "சேர்க்கை உதவி மையத்தைத் தொடர்பு கொள்ள"}</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default PatientInfoPage;
