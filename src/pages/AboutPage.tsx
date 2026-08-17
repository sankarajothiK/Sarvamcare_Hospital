import React from "react";
import { Helmet } from "react-helmet-async";
import { Award, Compass, HeartPulse, ShieldCheck, Users, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { contactInfo } from "../data/contact";
import { useLanguage } from "../utils/LanguageContext";

export const AboutPage: React.FC = () => {
  const { language, t } = useLanguage();

  const values = [
    {
      title: language === "en" ? "Clinical Excellence" : "மருத்துவச் சிறப்பு",
      desc: language === "en" ? "Delivering advanced microsurgical and clinical treatments with precision and safety." : "துல்லியமான மற்றும் பாதுகாப்பான நரம்பியல் மற்றும் பொது மருத்துவ அறுவைசிகிச்சைகள்.",
      icon: Award
    },
    {
      title: language === "en" ? "Compassionate Care" : "அன்பான அரவணைப்பு",
      desc: language === "en" ? "Putting patients and families first, ensuring absolute comfort and emotional support." : "நோயாளிகள் மற்றும் அவர்தம் குடும்பத்தினருக்குத் தேவையான மனரீதியான ஆதரவு மற்றும் கவனிப்பு.",
      icon: HeartPulse
    },
    {
      title: language === "en" ? "Ethical Integrity" : "மருத்துவ நெறிமுறைகள்",
      desc: language === "en" ? "Practicing transparent, evidence-based medicine with zero commercial compromise." : "வெளிப்படையான, நெறிமுறை தவறாத மற்றும் வர்த்தக நோக்கமற்ற மருத்துவச் சேவை.",
      icon: ShieldCheck
    },
    {
      title: language === "en" ? "Patient Advocacy" : "நோயாளி நலன்",
      desc: language === "en" ? "Guiding patients through personalized care plans tailored for best-quality recovery." : "நோயாளிகள் விரைவில் குணமடைய தனிப்பயனாக்கப்பட்ட சிகிச்சை வழிகாட்டல்கள்.",
      icon: Users
    }
  ];

  return (
    <>
      <Helmet>
        <title>{language === "en" ? "About Us | SarvamCare Hospital Salem | MultiSpeciality Care" : "எங்களைப் பற்றி | சர்வம் கேர் மருத்துவமனை சேலம்"}</title>
        <meta name="description" content="Learn about SarvamCare Hospital in Salem, Mamangam. Established under senior neurosurgical leadership, we specialize in polytrauma care, craniofacial surgery, and spine care." />
        <link rel="canonical" href="https://sarvamcarehospital.in/about" />
      </Helmet>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 md:py-24 text-center md:text-left">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-[#7E3DB5] blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] uppercase block">
            {language === "en" ? "Our Institution" : "நிறுவனம் பற்றி"}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mt-2 leading-tight">
            {language === "en" ? "About SarvamCare Hospital" : "சர்வம் கேர் மருத்துவமனை பற்றி"}
          </h1>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto md:mx-0 mt-4.5" />
        </div>
      </section>

      {/* Section 1: Intro */}
      <section className="bg-white py-16 md:py-24 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Image */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative rounded-3xl p-1.5 bg-[#FAF7FF] border border-[#EDE4F7] shadow-xl w-full max-w-[370px]">
                <div className="relative aspect-[4/5] rounded-[22px] overflow-hidden">
                  <img
                    src="/sarvam_building_exterior.png"
                    alt="SarvamCare Hospital Entrance"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#32105F]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#32105F]/95 border border-[#D8B35A]/30 text-center">
                    <h4 className="font-serif text-white font-bold text-sm tracking-wider">SARVAMCare Hospital</h4>
                    <p className="text-[9px] text-[#D8B35A] uppercase tracking-[0.2em] font-semibold mt-0.5">{language === "ta" ? "மாமாங்கம், சேலம்" : "Mamangam, Salem"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Text */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-serif text-2xl sm:text-3.5xl font-bold text-[#32105F]">
                {language === "en" ? "An Institution of Trust, Care & Clinical Excellence" : "நம்பிக்கை, அரவணைப்பு மற்றும் மருத்துவச் சிறப்பு கொண்ட நிறுவனம்"}
              </h2>
              <p className="text-sm text-[#665A70] leading-relaxed font-light">
                {language === "en" 
                  ? "SarvamCare Hospital Pvt. Ltd., located in Mamangam, Salem, is a premium multispeciality hospital dedicated to state-of-the-art emergency, surgical, and therapeutic medical services. Built upon the foundation of ethical clinical practice, our hospital coordinates senior doctors, specialized surgical units, and high-resolution imaging configurations to deliver reliable healthcare."
                  : "சேலம் மாமாங்கத்தில் அமைந்துள்ள சர்வம் கேர் மருத்துவமனை, அவசர சிகிச்சை, நவீன அறுவைசிகிச்சை மற்றும் பொது மருத்துவ சேவைகளை வழங்கும் ஒரு முதன்மையான மருத்துவமனையாகும். நேர்மையான மருத்துவ நெறிமுறைகளின் அடிப்படையில், சிறந்த மருத்துவர்கள் மற்றும் அதிநவீன தொழில்நுட்பங்களை ஒருங்கிணைத்து நம்பகமான சேவைகளை வழங்கி வருகிறோம்."}
              </p>
              <p className="text-sm text-[#665A70] leading-relaxed font-light">
                {language === "en"
                  ? "Under the medical direction of Prof. Dr. V. Suresh Kumar (HOD Neurosurgery, Govt. Mohan Kumaramangalam Medical College), our centers of excellence manage high-complexity polytrauma cases, advanced brain and spine surgeries, and dedicated craniofacial corrections. Our approach is characterized by absolute medical discipline, modern diagnostics, and a persistent focus on patient comfort."
                  : "நரம்பியல் அறுவைசிகிச்சை பேராசிரியர் மற்றும் துறைத் தலைவர் Prof. Dr. V. சுரேஷ் குமார் அவர்களின் மருத்துவ வழிகாட்டுதலின் கீழ் இயங்கும் எங்களது மருத்துவமனையில், அவசர விபத்து தீவிர சிகிச்சை, நரம்பியல் அறுவைசிகிச்சைகள், மற்றும் முக மறுசீரமைப்பு சிகிச்சைகள் மிகச் சிறந்த முறையில் செய்யப்படுகின்றன."}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#F3EDFA]">
                <div>
                  <h4 className="font-serif text-2xl font-extrabold text-[#32105F]">24/7</h4>
                  <p className="text-[10px] text-[#665A70] font-medium uppercase tracking-wider mt-1">
                    {language === "en" ? "Trauma & Emergency" : "விபத்து & அவசர சிகிச்சை"}
                  </p>
                </div>
                <div>
                  <h4 className="font-serif text-2xl font-extrabold text-[#32105F]">14 {language === "en" ? "Beds" : "படுக்கைகள்"}</h4>
                  <p className="text-[10px] text-[#665A70] font-medium uppercase tracking-wider mt-1">
                    {language === "en" ? "Dedicated Hybrid ICU" : "தீவிர கண்காணிப்புப் பிரிவு (ICU)"}
                  </p>
                </div>
                <div>
                  <h4 className="font-serif text-2xl font-extrabold text-[#32105F]">2 {language === "en" ? "Suites" : "கூடங்கள்"}</h4>
                  <p className="text-[10px] text-[#665A70] font-medium uppercase tracking-wider mt-1">
                    {language === "en" ? "Modular Operating OTs" : "அறுவைசிகிச்சை கூடங்கள்"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Message from MD's Desk */}
      <section className="bg-[#FAF7FF] py-16 md:py-24 font-sans border-t border-b border-[#EDE4F7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#6D2FA0] uppercase block">
              {language === "en" ? "Director's Vision" : "இயக்குநரின் தொலைநோக்கு பார்வை"}
            </span>
            <h2 className="font-serif text-2xl sm:text-3.5xl font-bold text-[#32105F]">
              {language === "en" ? "A Message from Our Leadership" : "எங்கள் தலைமையின் செய்தி"}
            </h2>
            <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto" />
            <blockquote className="italic text-base sm:text-lg text-[#32105F] font-serif leading-relaxed">
              {language === "en"
                ? '"At SarvamCare Hospital, we believe that advanced clinical capabilities must always go hand-in-hand with compassion and absolute ethical integrity. Our mission is to build a medical institution where patients from all walks of life can access world-class neurosurgical, trauma, and multispeciality care without commercial dilution. We measure our success solely by the safety and recovery of the lives entrusted to us."'
                : '"சர்வம் கேர் மருத்துவமனையில், அதிநவீன மருத்துவ வசதிகள் எப்போதும் அரவணைப்புடனும் நேர்மையுடனும் வழங்கப்பட வேண்டும் என்று நாங்கள் நம்புகிறோம். விபத்து மற்றும் நரம்பியல் தீவிர சிகிச்சைகளை அனைத்து தரப்பு மக்களும் எளிதாகப் பெற்று நலம் பெற வேண்டும் என்பதே எங்களது நோக்கம். எங்களை நம்பி வரும் நோயாளிகளின் நல்வாழ்வே எங்களது வெற்றி."'}
            </blockquote>
            <div>
              <h4 className="text-sm font-extrabold text-[#32105F] uppercase tracking-wider">
                {language === "ta" ? "Prof. Dr. V. சுரேஷ் குமார்" : "Prof. Dr. V. Suresh Kumar"}
              </h4>
              <p className="text-xs text-[#665A70] font-medium mt-0.5">
                {language === "en" ? "Medical Director, Chief Consultant Neurosurgeon" : "மருத்துவ இயக்குநர், தலைமை நரம்பியல் அறுவைசிகிச்சை நிபுணர்"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-16 md:py-24 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="font-serif text-2xl sm:text-3.5xl font-bold text-[#32105F]">
              {language === "en" ? "Our Core Clinical Values" : "எங்கள் முக்கிய மருத்துவ நெறிமுறைகள்"}
            </h2>
            <p className="text-xs text-[#665A70] font-light mt-2 leading-relaxed">
              {language === "en"
                ? "These principles guide our clinical routines, surgical decisions, and patient care management every single day."
                : "இந்த கொள்கைகளே எங்களது தினசரி சிகிச்சை முறைகளையும் அறுவைசிகிச்சை முடிவுகளையும் வழிநடத்துகின்றன."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="p-6 rounded-2xl border border-[#EDE4F7] bg-[#FAF7FF]/35 text-center space-y-4 hover:shadow-lg transition-all duration-300">
                  <div className="p-3 rounded-full bg-[#F3EDFA] text-[#D8B35A] border border-[#D8B35A]/25 w-fit mx-auto shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-[#32105F]">{v.title}</h3>
                  <p className="text-xs text-[#665A70] leading-relaxed font-light">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#32105F] to-[#431A7D] py-12 text-center text-white font-sans border-t-2 border-[#D8B35A]/45">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            {language === "en" ? "Schedule an Outpatient Consultation Today" : "மருத்துவ ஆலோசனைக்கு முன்பதிவு செய்யுங்கள்"}
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100 font-light max-w-xl mx-auto leading-relaxed">
            {language === "en"
              ? "Our helper desk coordinators are available to route your requirements to the appropriate clinical consultant."
              : "எங்களது உதவி மைய ஊழியர்கள் தங்களுக்குத் தேவையான சிறப்பு மருத்துவர்களை அணுக உதவுவார்கள்."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/appointment"
              className="flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#32105F] bg-[#FAF7FF] hover:bg-white active:scale-95 transition-all shadow-md"
            >
              <Calendar className="h-4.5 w-4.5" />
              <span>{t("book_appointment")}</span>
            </Link>
            <a
              href={`tel:${contactInfo.phoneRaw}`}
              className="flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white border border-white/20 hover:bg-white/5 active:scale-95 transition-all"
            >
              <span>{language === "en" ? "Call Helpline: " : "உதவி எண்: "} {contactInfo.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
