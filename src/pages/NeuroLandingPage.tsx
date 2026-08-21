import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Brain, Activity, ShieldAlert, Award, Phone, MapPin, Calendar, Plus, Minus, CheckCircle, ExternalLink, HelpCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "../utils/LanguageContext";
import { contactInfo } from "../data/contact";

export const NeuroLandingPage: React.FC = () => {
  const { language } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      qEn: "What is a neuro hospital?",
      aEn: "A neuro hospital or neuro center is a specialized medical facility equipped with advanced diagnostic tools, recovery ICUs, and specialized physicians (neurologists and neurosurgeons) dedicated to diagnosing, managing, and surgically treating brain, spinal cord, nerve, and neuromuscular system conditions.",
      qTa: "நரம்பியல் மருத்துவமனை (Neuro Hospital) என்றால் என்ன?",
      aTa: "நரம்பியல் மருத்துவமனை என்பது மூளை, தண்டுவடம், நரம்புகள் மற்றும் தசை நரம்பு மண்டலம் தொடர்பான நோய்களைக் கண்டறிந்து, அவற்றுக்கு மருந்து மற்றும் அறுவைசிகிச்சை மூலம் பிரத்யேக சிகிச்சை அளிக்கும் அதிநவீன வசதிகள், தீவிர சிகிச்சைப் பிரிவுகள் (ICU) மற்றும் நரம்பியல் நிபுணர்களைக் கொண்ட ஒரு சிறப்பு மருத்துவ மையமாகும்."
    },
    {
      qEn: "What neurological conditions does SarvamCare treat?",
      aEn: "SarvamCare Neuro Center provides treatment for a wide range of conditions including brain and spine tumors, cerebral strokes, intracranial aneurysms, slipped discs, cervical spondylosis, trigeminal neuralgia, epilepsy, chronic migraines, neuropathic pain, and traumatic head or spine injuries.",
      qTa: "சர்வம் கேர் மருத்துவமனையில் என்னென்ன நரம்பியல் நோய்க்கு சிகிச்சை அளிக்கப்படுகிறது?",
      aTa: "சர்வம் கேர் நரம்பியல் மையத்தில் மூளை மற்றும் தண்டுவடம் சார்ந்த கட்டிகள், பக்கவாதம் (ஸ்ட்ரோக்), இரத்தக்குழாய் வீக்கம் (அனூரிசம்), தண்டுவட டிஸ்க் விலகல், கழுத்துவலி மற்றும் இடுப்புவலி, முக நரம்பு வலி (Trigeminal Neuralgia), வலிப்பு நோய், கடுமையான ஒற்றைத் தலைவலி மற்றும் விபத்து நரம்பியல் காயங்களுக்கு சிறப்பு சிகிச்சைகள் வழங்கப்படுகின்றன."
    },
    {
      qEn: "Does SarvamCare provide neurology and neurosurgery care in Salem?",
      aEn: "Yes, SarvamCare is a dedicated neuro center in Mamangam, Salem, featuring specialized consulting suites, dynamic CT scan diagnostics, specialized post-operative ICUs, and an operating microscope suite led by experienced neurosurgeons and neurologists.",
      qTa: "சேலத்தில் சர்வம் கேர் நரம்பியல் மற்றும் நரம்பு அறுவை சிகிச்சை வசதிகளை வழங்குகிறதா?",
      aTa: "ஆம், சேலம் மாமாங்கத்தில் அமைந்துள்ள சர்வம் கேர் மருத்துவமனை, அனுபவம் வாய்ந்த நரம்பியல் நிபுணர்கள் மற்றும் நரம்பு அறுவைசிகிச்சை நிபுணர்கள் குழுவுடன், அதிநவீன சிடி ஸ்கேன், சிறப்பு தீவிர சிகிச்சை பிரிவுகள் மற்றும் மைக்ரோஸ்கோபிக் அறுவைசிகிச்சை தியேட்டர்களைக் கொண்ட ஒரு அர்ப்பணிக்கப்பட்ட நரம்பியல் மையமாகும்."
    },
    {
      qEn: "Where is SarvamCare Hospital located in Salem?",
      aEn: "SarvamCare Hospital is located at #157, Salem Bangalore National Highway, Mamangam, Salem, Tamil Nadu - 636032, India. It is situated in a highly accessible highway location for prompt emergency trauma arrivals.",
      qTa: "சேலத்தில் சர்வம் கேர் மருத்துவமனை எங்கு அமைந்துள்ளது?",
      aTa: "சர்வம் கேர் மருத்துவமனை எண் 157, சேலம் பெங்களூரு தேசிய நெடுஞ்சாலை, மாமாங்கம், சேலம், தமிழ்நாடு - 636032, இந்தியா என்ற முகவரியில் அமைந்துள்ளது. இது அவசர காலங்களில் நோயாளிகள் எளிதில் வந்தடையும் வகையில் தேசிய நெடுஞ்சாலையின் மிக அருகில் அமைந்துள்ளது."
    },
    {
      qEn: "When should I consult a neurologist?",
      aEn: "You should consult a neurologist if you experience persistent severe headaches, tingling or numbness in your hands and feet, muscle weakness, loss of coordination, chronic back pain radiating down your legs, sudden dizziness, memory issues, or seizures.",
      qTa: "நான் எப்போது ஒரு நரம்பியல் மருத்துவரை அணுக வேண்டும்?",
      aTa: "உங்களுக்குத் தொடர்ச்சியான கடுமையான தலைவலி, கை கால்களில் மரத்துப்போதல் அல்லது ஊசி குத்துவது போன்ற உணர்வு, தசை பலவீனம், சமநிலை இழப்பு, கால்களுக்குப் பரவும் கடுமையான முதுகுவலி, திடீர் தலைச்சுற்றல், ஞாபக மறதி அல்லது வலிப்பு ஏற்பட்டால் நரம்பியல் நிபுணரை அணுக வேண்டும்."
    },
    {
      qEn: "When is neurosurgery required?",
      aEn: "Neurosurgery is typically required for surgically correctable pathologies of the nervous system. This includes brain tumor removal, repairing bulging blood vessels (aneurysms), relieving severe nerve compression (such as microdiscectomy for slipped disc), treating traumatic skull fractures, or microvascular decompression for trigeminal neuralgia.",
      qTa: "நரம்பு அறுவை சிகிச்சை (Neurosurgery) எப்போது தேவைப்படுகிறது?",
      aTa: "மூளைக் கட்டிகளை அகற்றுதல், வீங்கிய இரத்தக் குழாய்களைச் சரிசெய்தல் (அனூரிசம் கிளிப்பிங்), நரம்பு அழுத்தத்தை நீக்குதல் (டிஸ்க் பாதிப்பிற்கான மைக்ரோடிஸெக்டமி), மண்டை ஓட்டு முறிவுகளைச் சரிசெய்தல் மற்றும் முக நரம்பு வலியை குணப்படுத்துதல் போன்ற நரம்பு மண்டல பாதிப்புகளுக்கு அறுவைசிகிச்சை தேவைப்படுகிறது."
    },
    {
      qEn: "Does SarvamCare provide stroke-related care?",
      aEn: "Yes, we provide comprehensive diagnostic evaluation and critical management for cerebral ischemic strokes, subarachnoid hemorrhages, and transient ischemic attacks (TIA) supported by our round-the-clock emergency team.",
      qTa: "சர்வம் கேர் மருத்துவமனையில் பக்கவாதம் (ஸ்ட்ரோக்) தொடர்பான சிகிச்சைகள் வழங்கப்படுகிறதா?",
      aTa: "ஆம், எங்களது 24/7 அவசர மருத்துவக் குழுவின் ஆதரவுடன் பக்கவாதம் (Cerebral Stroke), மூளை இரத்தக் கசிவு மற்றும் தற்காலிக நரம்பு செயலிழப்புகளுக்கான விரிவான நோயறிதல் மற்றும் தீவிர நரம்பியல் சிகிச்சைகளை நாங்கள் வழங்குகிறோம்."
    },
    {
      qEn: "Can I book a neurology consultation at SarvamCare?",
      aEn: "Yes. You can book an outpatient consultation by clicking 'Book an Appointment' on our website, visiting our center, or calling our helpline at +91 94898 78908.",
      qTa: "சர்வம் கேர் மருத்துவமனையில் நரம்பியல் ஆலோசனைக்கு முன்பதிவு செய்ய முடியுமா?",
      aTa: "ஆம். எங்களது இணையதளத்தில் உள்ள 'முன்பதிவு செய்ய' பொத்தானைக் கிளிக் செய்வதன் மூலமாகவோ அல்லது +91 94898 78908 என்ற உதவி எண்ணை அழைப்பதன் மூலமாகவோ நரம்பியல் ஆலோசனைக்கான சந்திப்பை நீங்கள் எளிதாக முன்பதிவு செய்யலாம்."
    }
  ];

  // Schema structured data for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": language === "en" ? faq.qEn : faq.qTa,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": language === "en" ? faq.aEn : faq.aTa
      }
    }))
  };

  const hospitalSchema = {
    "@context": "https://schema.org",
    "@type": "Hospital",
    "name": "SarvamCare Hospital Pvt. Ltd.",
    "alternateName": "SarvamCare Neuro Center",
    "description": "SarvamCare is a premier neuro hospital in Salem offering specialized neurology and neurosurgery care for brain, spine, stroke, epilepsy, and neurological conditions.",
    "url": "https://sarvamcare.com/neuro-hospital-in-salem",
    "logo": "https://sarvamcare.com/logo.png",
    "telephone": contactInfo.phoneRaw,
    "email": contactInfo.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "#157, Salem Bangalore National Highway, Mamangam",
      "addressLocality": "Salem",
      "addressRegion": "Tamil Nadu",
      "postalCode": "636032",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": contactInfo.phoneRaw,
      "contactType": "Emergency Line",
      "availableLanguage": ["en", "ta"]
    }
  };

  return (
    <>
      <Helmet>
        <title>{language === "en" ? "Neuro Hospital in Salem | Neurology & Neurosurgery | SarvamCare" : "நரம்பியல் மருத்துவமனை சேலம் | நரம்பியல் & நரம்பு அறுவை சிகிச்சை | சர்வம் கேர்"}</title>
        <meta 
          name="description" 
          content={language === "en" 
            ? "SarvamCare is a neuro hospital in Salem offering specialized neurology and neurosurgery care for brain, spine, stroke, epilepsy and neurological conditions at Mamangam, Salem." 
            : "சர்வம் கேர் சேலத்தில் உள்ள ஒரு நரம்பியல் மருத்துவமனையாகும். மூளை, தண்டுவடம், பக்கவாதம், வலிப்பு மற்றும் நரம்பு மண்டல கோளாறுகளுக்கு மாமாங்கம், சேலத்தில் சிறப்பு சிகிச்சை அளிக்கிறது."} 
        />
        <link rel="canonical" href="https://sarvamcare.com/neuro-hospital-in-salem" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sarvamcare.com/neuro-hospital-in-salem" />
        <meta property="og:title" content={language === "en" ? "Neuro Hospital in Salem | Neurology & Neurosurgery | SarvamCare" : "நரம்பியல் மருத்துவமனை சேலம் | சர்வம் கேர்"} />
        <meta property="og:description" content={language === "en" ? "SarvamCare is a specialized neuro hospital in Salem for brain, spine, and stroke care." : "சேலத்தில் மூளை, தண்டுவடம், மற்றும் நரம்பியல் அறுவை சிகிச்சைகளுக்கான சிறப்பு நரம்பியல் மருத்துவமனை."} />
        <meta property="og:image" content="https://sarvamcare.com/sarvam_logo.jpg" />
        
        {/* Structured Data Scripts */}
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(hospitalSchema)}</script>
      </Helmet>

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#240d47] to-[#32105F] pt-32 pb-20 md:pt-40 md:pb-28 text-center md:text-left select-none">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-[#7E3DB5] blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 h-[350px] w-[350px] rounded-full bg-[#D8B35A]/30 blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/35 text-[10px] sm:text-xs font-bold tracking-wider text-red-200 uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span>{language === "en" ? "24/7 Trauma & Emergency Active" : "24/7 அவசர விபத்து சிகிச்சைப்பிரிவு"}</span>
            </span>

            <h1 className="font-serif text-4xl sm:text-5.5xl font-extrabold text-white leading-tight">
              {language === "en" ? "Neuro Hospital in Salem" : "நரம்பியல் மருத்துவமனை சேலம்"}
            </h1>
            <p className="text-md sm:text-lg text-[#F3D98A] font-semibold tracking-wide font-sans">
              {language === "en" ? "Advanced Neurology & Neurosurgery Care at SarvamCare" : "சர்வம் கேர் மருத்துவமனையின் மேம்பட்ட நரம்பியல் & நரம்பு அறுவை சிகிச்சை"}
            </p>
            <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed font-light font-sans max-w-2xl">
              {language === "en" 
                ? "SarvamCare Hospital in Salem is a premier medical center dedicated to comprehensive brain, spine, and neurovascular care. Our facility integrates professional medical specialists and advanced diagnostics to manage clinical neurological disorders and neurosurgical trauma."
                : "சேலம் சர்வம் கேர் மருத்துவமனை மூளை, தண்டுவடம் மற்றும் நரம்பியல் கோளாறுகளுக்கு விரிவான சிகிச்சை வழங்கும் முதன்மை சிறப்பு மையமாகும். அனுபவம் வாய்ந்த மருத்துவர்கள் மற்றும் நவீன வசதிகளுடன் கூடிய அவசர நரம்பியல் சேவைகளை நாங்கள் வழங்குகிறோம்."}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-3 pointer-events-auto">
              <Link
                to="/appointment"
                className="px-6 py-3 rounded-full bg-[#D8B35A] hover:bg-[#F3D98A] text-[#32105F] font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all duration-300 cursor-pointer"
              >
                {language === "en" ? "Book an Appointment" : "சந்திப்பு முன்பதிவு"}
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                {language === "en" ? "Contact Us" : "தொடர்பு கொள்ள"}
              </Link>
              <a
                href={`tel:${contactInfo.phoneRaw}`}
                className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider active:scale-95 transition-all duration-300 flex items-center gap-1.5"
              >
                <Phone className="h-3.5 w-3.5 animate-pulse" />
                <span>{language === "en" ? "Emergency Care" : "அவசர உதவி எண்"}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION SECTION */}
      <section className="bg-white py-16 md:py-24 font-sans border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#32105F] tracking-tight">
                {language === "en" ? "Specialized Neuro Care in Salem" : "சேலத்தில் சிறப்பு நரம்பியல் சிகிச்சை"}
              </h2>
              <div className="h-[2px] w-14 bg-[#D8B35A]" />
              
              <p className="text-xs sm:text-sm text-[#665A70] leading-relaxed font-light">
                {language === "en"
                  ? "At SarvamCare Hospital, we address the full spectrum of neurological disorders. Our neuro care approach bridges precise clinical evaluations with customized medical and surgical therapy pathways to treat conditions of the central and peripheral nervous systems. Serving Salem and surrounding regions, we are committed to providing medical care near Mamangam, Salem."
                  : "சர்வம் கேர் மருத்துவமனையில், நரம்பியல் கோளாறுகளுக்கான முழுமையான சிகிச்சைகளை நாங்கள் வழங்குகிறோம். மத்திய மற்றும் புற நரம்பு மண்டல பாதிப்புகளுக்குத் தகுந்த மருத்துவ மேலாண்மை மற்றும் தண்டுவட அறுவைசிகிச்சைகள் மாமாங்கம், சேலத்தில் வழங்கப்படுகின்றன. சேலம் மற்றும் அதன் சுற்றுவட்டாரப் பகுதிகளைச் சேர்ந்த மக்களுக்கு உதவ எங்கள் குழுவினர் கடமைப்பட்டுள்ளனர்."}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  { en: "Neurology Management", ta: "நரம்பியல் மேலாண்மை" },
                  { en: "Neurosurgical Interventions", ta: "நரம்பு அறுவை சிகிச்சை" },
                  { en: "Brain Pathology Care", ta: "மூளைக் கட்டிகள் & கோளாறுகள்" },
                  { en: "Spine & Disc Stabilizations", ta: "தண்டுவட & டிஸ்க் சிகிச்சை" },
                  { en: "Cerebral Stroke Care", ta: "பக்கவாதம் (ஸ்ட்ரோக்) மேலாண்மை" },
                  { en: "Epilepsy & Seizure Therapy", ta: "வலிப்பு நோய் சிகிச்சை" },
                  { en: "Neurological Trauma Support", ta: "அவசர நரம்பியல் அதிர்ச்சி சிகிச்சை" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <CheckCircle className="h-4.5 w-4.5 text-[#D8B35A] shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-[#32105F]">
                      {language === "en" ? item.en : item.ta}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-[#FAF7FF] flex items-center justify-center">
                <Brain className="h-28 w-28 text-[#32105F]/10 absolute" />
                <img 
                  src="/sarvam_building_exterior.png" 
                  alt="SarvamCare Hospital Entrance Facade" 
                  className="w-full h-full object-cover relative z-10 animate-fade-in"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#32105F] text-white p-4.5 rounded-2xl shadow-xl z-20 hidden sm:block border border-[#D8B35A]/30">
                <p className="text-[9px] font-bold uppercase tracking-wider text-[#D8B35A]">{language === "en" ? "Integrated Support" : "ஒருகினைந்த ஆதரவு"}</p>
                <p className="text-xs font-semibold font-serif mt-0.5">{language === "en" ? "24/7 Trauma Diagnostics" : "24/7 விபத்து கண்டறிதல்"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NEUROLOGY SERVICES SECTION */}
      <section className="bg-[#FAF7FF]/40 py-16 md:py-24 font-sans border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#32105F]">
              {language === "en" ? "Neurology Care" : "நரம்பியல் சிகிச்சை"}
            </h2>
            <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto" />
            <p className="text-xs sm:text-sm text-[#665A70] leading-relaxed font-light">
              {language === "en"
                ? "Our clinical neurology services focus on the medical diagnosis, non-surgical management, and physiological rehabilitation of disorders affecting the brain and nervous system."
                : "நமது நரம்பியல் சேவைகள் மூளை மற்றும் நரம்பு மண்டலத்தை பாதிக்கும் நோய்களைக் கண்டறிதல், அறுவைசிகிச்சை அல்லாத மருத்துவ மேலாண்மை மற்றும் இயன்முறை மறுவாழ்வு சிகிச்சைகளில் கவனம் செலுத்துகின்றன."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                titleEn: "Stroke Evaluation & Management",
                titleTa: "பக்கவாதம் (ஸ்ட்ரோக்) மேலாண்மை",
                descEn: "Urgent diagnostic protocols and post-stroke rehabilitation plans to recover sensory-motor functions.",
                descTa: "பாதிப்புகளைக் கண்டறிந்து அவசர நரம்பியல் சிகிச்சைகள் மற்றும் பக்கவாதத்திற்குப் பிந்தைய உடல் இயக்க மீட்புப் பயிற்சிகள்."
              },
              {
                titleEn: "Epilepsy & Seizure Care",
                titleTa: "வலிப்பு மற்றும் அதிர்ச்சி சிகிச்சைகள்",
                descEn: "Targeted clinical evaluation and medical management options to stabilize and control electrical activity in the brain.",
                descTa: "மூளையின் மின் அதிர்வு தூண்டுதல்களைக் கட்டுப்படுத்தத் துல்லியமான கண்டறிதல் மற்றும் சிறப்பு மருத்துவ வழிகாட்டுதல்."
              },
              {
                titleEn: "Chronic Migraine & Headache Evaluation",
                titleTa: "ஒற்றைத் தலைவலி & தலைவலி கண்டறிதல்",
                descEn: "Specialized evaluation and therapeutic care plan for patients suffering from severe chronic headaches and migraines.",
                descTa: "தீவிரமான மற்றும் நாள்பட்ட ஒற்றைத் தலைவலிப் பிரச்சனைகளுக்குப் பிரத்யேக காரணங்களைக் கண்டறிந்து முறையான சிகிச்சை வழங்குதல்."
              },
              {
                titleEn: "Movement & Coordination Disorders",
                titleTa: "உடல் இயக்கக் கோளாறுகள்",
                descEn: "Clinical review and care pathways for tremors, gait instability, and coordination issues affecting normal movement.",
                descTa: "கை நடுக்கம், தள்ளாட்டம் மற்றும் தினசரி உடல் இயக்கங்களைப் பாதிக்கும் சமநிலை குறைபாடுகளுக்கான மருத்துவ ஆலோசனைகள்."
              },
              {
                titleEn: "Nerve & Muscle Disorders",
                titleTa: "நரம்பு & தசை மண்டல நோய்கள்",
                descEn: "Diagnostic guidance and medical management for neuropathies, localized numbness, and neuromuscular weakness.",
                descTa: "நரம்புத் தளர்ச்சி, உடல் மரத்துப்போதல் மற்றும் தசை பலவீனப் பிரச்சனைகளுக்கான சிறப்பு நரம்பியல் சிகிச்சைகள்."
              },
              {
                titleEn: "Memory & Cognitive Evaluation",
                titleTa: "ஞாபக மறதி & அறிவாற்றல் மதிப்பீடு",
                descEn: "Assessment and supportive protocols for age-related cognitive decline, memory impairment, and neurological health.",
                descTa: "முதுமை மற்றும் நரம்புச் சிதைவு காரணமாக ஏற்படும் ஞாபக மறதி, சிந்தனைக் குறைபாடுகளுக்கான சிறப்புப் பராமரிப்பு."
              }
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200/60 shadow-sm space-y-3 hover:shadow-md transition-shadow duration-300">
                <div className="p-3.5 rounded-xl bg-purple-50 text-[#32105F] shrink-0 w-fit">
                  <Activity className="h-5 w-5 text-[#D8B35A]" />
                </div>
                <h3 className="font-serif font-bold text-[#32105F] text-base">
                  {language === "en" ? item.titleEn : item.titleTa}
                </h3>
                <p className="text-xs text-[#665A70] leading-relaxed font-light">
                  {language === "en" ? item.descEn : item.descTa}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. NEUROSURGERY SECTION */}
      <section className="bg-white py-16 md:py-24 font-sans border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative order-last lg:order-first">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-[#FAF7FF] flex items-center justify-center">
                <Brain className="h-28 w-28 text-[#32105F]/10 absolute" />
                <img 
                  src="/Gallery Images/IMG-20260812-WA0010.jpg" 
                  alt="Neurosurgical Microscope Room" 
                  className="w-full h-full object-cover relative z-10"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#32105F] text-white p-4.5 rounded-2xl shadow-xl z-20 hidden sm:block border border-[#D8B35A]/30">
                <p className="text-[9px] font-bold uppercase tracking-wider text-[#D8B35A]">{language === "en" ? "Microsurgery Setup" : "மைக்ரோ சர்ஜரி வசதி"}</p>
                <p className="text-xs font-semibold font-serif mt-0.5">{language === "en" ? "Microscopic Brain Navigation" : "நுண்ணோக்கி நரம்பியல் அறுவை சிகிச்சை"}</p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#32105F] tracking-tight">
                {language === "en" ? "Neurosurgery at SarvamCare" : "சர்வம் கேர் நரம்பு அறுவை சிகிச்சை"}
              </h2>
              <div className="h-[2px] w-14 bg-[#D8B35A]" />
              
              <p className="text-xs sm:text-sm text-[#665A70] leading-relaxed font-light">
                {language === "en"
                  ? "Neurosurgery plays a critical role in treating conditions affecting the brain, spinal cord, and peripheral nerves. At SarvamCare, our surgical team works to deliver precise, micro-surgical interventions designed to optimize recovery outcomes while prioritizing neural preservation. From traumatic head injuries to complex spinal stabilization procedures, our operating rooms support advanced care standards."
                  : "மூளை, தண்டுவடம் மற்றும் புற நரம்பு மண்டல பாதிப்புகளுக்கு அறுவைசிகிச்சை மூலம் தீர்வு காண்பதில் நரம்பு அறுவை சிகிச்சை முக்கியப் பங்கு வகிக்கிறது. சர்வம் கேர் மருத்துவமனையில், நரம்புகளைப் பாதுகாப்பாகப் பராமரித்து, நோயாளிகள் விரைவாகக் குணமடைய நுண்ணோக்கி உதவியுடன் கூடிய நுட்பமான அறுவைசிகிச்சைகள் மேற்கொள்ளப்படுகின்றன. விபத்து நரம்புக் காயங்கள் முதல் தண்டுவட நிலைநிறுத்தம் வரையிலான சிகிச்சைகளுக்கு எங்களது தியேட்டர்கள் முழு ஆதரவளிக்கின்றன."}
              </p>

              <div className="space-y-4">
                {[
                  {
                    titleEn: "Tumor Resection & Excision",
                    titleTa: "மூளைக் கட்டிகள் அகற்றுதல்",
                    descEn: "Precision microsurgery for pituitary adenomas, meningiomas, and glioma debulking.",
                    descTa: "அதிநவீன மைக்ரோஸ்கோப் வசதியுடன் மூளைக் கட்டிகள் மற்றும் பிட்யூட்டரி சுரப்பிக் கட்டிகளைப் பாதுகாப்பாக அகற்றும் அறுவைசிகிச்சைகள்."
                  },
                  {
                    titleEn: "Complex Spine Interventions",
                    titleTa: "தண்டுவட நிலைநிறுத்த அறுவைசிகிச்சை",
                    descEn: "Decompressions, instrumented spinal fusion, and microdiscectomy for nerve root compression.",
                    descTa: "விலகிய தண்டுவட டிஸ்க் அழுத்தத்தை நீக்கும் மைக்ரோடிஸெக்டமி மற்றும் தண்டுவட முறிவை நிலைநிறுத்தும் சிகிச்சைகள்."
                  },
                  {
                    titleEn: "Peripheral Nerve Reconstruction",
                    titleTa: "புற நரம்பு மறுசீரமைப்பு",
                    descEn: "Micro-suture repair of injured or compressed nerves in the extremities to restore motor functions.",
                    descTa: "கை, கால்களில் ஏற்படும் நரம்புக் காயங்கள் மற்றும் நரம்பு அழுத்தப் பாதிப்புகளுக்கான நுண்ணிய தையல் அறுவைசிகிச்சைகள்."
                  }
                ].map((sub, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-[#FAF7FF]/20 flex gap-4">
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200/50 text-[#D8B35A] shrink-0 h-fit">
                      <Award className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#32105F] text-xs uppercase tracking-wide">
                        {language === "en" ? sub.titleEn : sub.titleTa}
                      </h4>
                      <p className="text-xs text-[#665A70] font-light mt-1">
                        {language === "en" ? sub.descEn : sub.descTa}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BRAIN & SPINE CARE SECTION */}
      <section className="bg-[#FAF7FF]/40 py-16 md:py-24 font-sans border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#32105F]">
              {language === "en" ? "Brain & Spine Care" : "மூளை & தண்டுவட சிகிச்சை"}
            </h2>
            <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto" />
            <p className="text-xs sm:text-sm text-[#665A70] leading-relaxed font-light">
              {language === "en"
                ? "Specialized clinical workflows designed for targeted diagnostic evaluation and therapeutic management of neurological conditions."
                : "மூளை மற்றும் தண்டுவட நோய்களைத் துல்லியமாகக் கண்டறிந்து அவற்றுக்கு உகந்த சிகிச்சைகளை வழங்குவதற்கான பிரத்யேக மருத்துவ செயல்பாடுகள்."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brain Care Card */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 text-[#32105F] rounded-2xl w-fit">
                  <Brain className="h-6 w-6 text-[#D8B35A]" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#32105F]">
                  {language === "en" ? "Brain Care" : "மூளைச் சிகிச்சை"}
                </h3>
                <p className="text-xs text-[#665A70] leading-relaxed font-light">
                  {language === "en"
                    ? "Advanced diagnostic evaluation and micro-resection of acoustic neuromas, pituitary adenomas via transsphenoidal approach, and high-grade glioma debulking."
                    : "அதிநவீன நுண்ணோக்கி மூலம் மூளைக் கட்டிகள் அகற்றுதல் மற்றும் பிட்யூட்டரி சுரப்பிக் கட்டிகளுக்கான மூக்கு வழி அறுவைசிகிச்சைகள்."}
                </p>
              </div>
              <Link to="/services" className="text-xs font-bold text-[#6D2FA0] hover:text-[#32105F] flex items-center gap-1 mt-6 transition-colors cursor-pointer">
                <span>{language === "en" ? "Learn More" : "மேலும் அறிய"}</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Spine Care Card */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 text-[#32105F] rounded-2xl w-fit">
                  <Award className="h-6 w-6 text-[#D8B35A]" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#32105F]">
                  {language === "en" ? "Spine Care" : "தண்டுவடச் சிகிச்சை"}
                </h3>
                <p className="text-xs text-[#665A70] leading-relaxed font-light">
                  {language === "en"
                    ? "Expertise in spine stabilization for slipped disc, cervical myelopathy, microdiscectomies, spinal canal narrowing, and spinal canal tumors debulking."
                    : "டிஸ்க் பாதிப்பு, கழுத்துத் தண்டுவட அழுத்த நோய், மைக்ரோடிஸெக்டமி மற்றும் தண்டுவடக் கட்டிகளுக்கான நவீன சிகிச்சைகள்."}
                </p>
              </div>
              <Link to="/services" className="text-xs font-bold text-[#6D2FA0] hover:text-[#32105F] flex items-center gap-1 mt-6 transition-colors cursor-pointer">
                <span>{language === "en" ? "Learn More" : "மேலும் அறிய"}</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Neuro Trauma Care Card */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
              <div className="space-y-4">
                <div className="p-4 bg-red-50 text-red-600 rounded-2xl w-fit">
                  <ShieldAlert className="h-6 w-6 text-[#D8B35A]" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#32105F]">
                  {language === "en" ? "Neuro Trauma Care" : "அவசர நரம்பியல் அதிர்ச்சி சிகிச்சை"}
                </h3>
                <p className="text-xs text-[#665A70] leading-relaxed font-light">
                  {language === "en"
                    ? "24/7 synchronized response for traumatic head injuries, subdural/epidural hematoma evacuation, and compound skull fractures recovery."
                    : "விபத்துகளால் ஏற்படும் மண்டை ஓட்டு முறிவுகள், மூளை இரத்தக் கசிவுகள் மற்றும் தலைக்காயங்களுக்கு 24 மணி நேரமும் உடனடியாக வழங்கப்படும் அவசர நரம்பு அறுவை சிகிச்சைகள்."}
                </p>
              </div>
              <a href={`tel:${contactInfo.phoneRaw}`} className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 mt-6 transition-colors">
                <span>{language === "en" ? "Call Emergency" : "உடனடியாக அழைக்க"}</span>
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE SECTION */}
      <section className="bg-white py-16 md:py-24 font-sans border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#32105F]">
              {language === "en" ? "Why Choose SarvamCare for Neuro Care?" : "நரம்பியல் சிகிச்சைக்கு ஏன் சர்வம் கேர்?"}
            </h2>
            <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto" />
            <p className="text-xs text-[#665A70] font-light">
              {language === "en" ? "Factual and patient-first medical support in Salem." : "சேலத்தில் நோயாளிகளுக்கு முன்னுரிமை அளிக்கும் உண்மையான மருத்துவச் சேவைகள்."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                titleEn: "Experienced Neurosurgical Team",
                titleTa: "அனுபவம் வாய்ந்த நரம்பு அறுவைசிகிச்சை குழு",
                descEn: "Our neuro department is led by Chief Neurosurgeon Prof. Dr. V. Sureshkumar, bringing advanced clinical expertise in microscopic and endoscopic surgeries.",
                descTa: "எங்களது நரம்பியல் துறை, மைக்ரோஸ்கோபிக் மற்றும் எண்டோஸ்கோபிக் அறுவைசிகிச்சைகளில் சிறந்த அனுபவம் வாய்ந்த முதன்மை நரம்பு அறுவைசிகிச்சை நிபுணர் பேராசிரியர் Dr. V. சுரேஷ்குமார் தலைமையில் இயங்குகிறது."
              },
              {
                titleEn: "24/7 Emergency & Trauma Active",
                titleTa: "24/7 அவசர விபத்து சிகிச்சைப்பிரிவு",
                descEn: "Ready with active emergency beds and diagnostic CT scan support to handle traumatic head and spine injury emergencies around the clock.",
                descTa: "மூளை மற்றும் தண்டுவட விபத்து நரம்புக் காயங்களை உடனடியாகக் கையாளுவதற்குத் தேவையான அவசர சிகிச்சை படுக்கைகள் மற்றும் சிடி ஸ்கேன் வசதியுடன் 24 மணி நேரமும் செயல்படுகிறது."
              },
              {
                titleEn: "Integrated Multi-Specialty Support",
                titleTa: "ஒருங்கிணைந்த மருத்துவமனை வசதிகள்",
                descEn: "Access to in-house critical care ICUs, modular operation theaters, diagnostic imaging, and post-operative physical rehabilitation.",
                descTa: "பாதுகாப்பான அறுவைசிகிச்சை கூடங்கள், தீவிர சிகிச்சைப் பிரிவுகள் (ICU), மருத்துவக் கண்டறியும் மையங்கள் மற்றும் அறுவைசிகிச்சைக்குப் பிந்தைய இயன்முறை சிகிச்சை (Physiotherapy) ஆகியவற்றின் ஒருங்கிணைந்த கட்டமைப்பு."
              },
              {
                titleEn: "Highly Accessible Location in Salem",
                titleTa: "சேலத்தில் எளிதில் வந்தடையும் முகவரி",
                descEn: "Conveniently situated at Mamangam along the Salem-Bangalore National Highway, enabling rapid transfer times for emergency patients.",
                descTa: "சேலம் பெங்களூரு தேசிய நெடுஞ்சாலையில் மாமாங்கம் பகுதியில் அமைந்துள்ளதால், அவசர காலங்களில் நோயாளிகள் மிக விரைவாகவும் எளிதாகவும் வந்தடைய முடிகிறது."
              }
            ].map((benefit, idx) => (
              <div key={idx} className="flex gap-4 p-5 rounded-2xl border border-slate-100 hover:bg-[#FAF7FF]/20 transition-all duration-300">
                <div className="p-3 bg-purple-50 text-[#32105F] rounded-xl shrink-0 h-fit">
                  <CheckCircle className="h-5 w-5 text-[#D8B35A]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-[#32105F] text-base">
                    {language === "en" ? benefit.titleEn : benefit.titleTa}
                  </h3>
                  <p className="text-xs text-[#665A70] leading-relaxed font-light">
                    {language === "en" ? benefit.descEn : benefit.descTa}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. LOCAL SEO SECTION */}
      <section className="bg-white py-16 md:py-24 font-sans border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#32105F] tracking-tight">
                {language === "en" ? "Neuro Hospital in Mamangam, Salem" : "மாமாங்கம், சேலத்தில் நரம்பியல் மருத்துவமனை"}
              </h2>
              <div className="h-[2px] w-14 bg-[#D8B35A]" />

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#D8B35A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-[#32105F] text-xs uppercase tracking-wider">{language === "en" ? "Location Address" : "முகவரி"}</h4>
                    <p className="text-xs text-[#665A70] font-light mt-1">
                      <strong>SarvamCare Hospital Pvt. Ltd.</strong><br />
                      {contactInfo.address.full}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-[#D8B35A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-[#32105F] text-xs uppercase tracking-wider">{language === "en" ? "Helpline Contact" : "தொடர்பு எண்கள்"}</h4>
                    <p className="text-xs text-[#665A70] font-light mt-1 flex flex-col gap-1">
                      <a href={`tel:${contactInfo.phoneRaw}`} className="hover:text-[#6D2FA0] font-semibold transition-colors">{contactInfo.phone}</a>
                      <a href="tel:+919080509321" className="hover:text-[#6D2FA0] font-semibold transition-colors">90805 09321</a>
                      <a href="tel:04272334434" className="hover:text-[#6D2FA0] font-semibold transition-colors">0427-2334434</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 pointer-events-auto">
                <a
                  href={contactInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#32105F] hover:bg-[#3D176E] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all active:scale-95"
                >
                  <span>{language === "en" ? "Get Directions" : "இருப்பிட வழிகாட்டி"}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="w-full h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl border border-slate-200 relative">
                <iframe
                  title="SarvamCare Hospital Salem Location Map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src="https://maps.google.com/maps?q=SarvamCare%20Hospital%20Mamangam%20Salem&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="border-none"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="bg-[#FAF7FF]/40 py-16 md:py-24 font-sans">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#32105F] flex items-center justify-center gap-2.5">
              <HelpCircle className="h-7 w-7 text-[#D8B35A] shrink-0" />
              <span>{language === "en" ? "Frequently Asked Questions" : "அடிக்கடி கேட்கப்படும் கேள்விகள்"}</span>
            </h2>
            <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto" />
            <p className="text-xs text-[#665A70] font-light">
              {language === "en" ? "Common inquiries regarding neurology and neurosurgery services in Salem." : "சேலத்தில் நரம்பியல் மற்றும் நரம்பு அறுவை சிகிச்சை சேவைகள் குறித்த பொதுவான சந்தேகங்கள்."}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              const question = language === "en" ? faq.qEn : faq.qTa;
              const answer = language === "en" ? faq.aEn : faq.aTa;

              return (
                <div 
                  key={idx} 
                  className="border border-slate-200/80 rounded-2xl bg-white shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4.5 text-left flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="font-bold text-[#32105F] text-xs sm:text-sm leading-relaxed">
                      {question}
                    </span>
                    <span className="shrink-0 text-slate-400 p-1 rounded-lg border border-slate-100">
                      {isOpen ? <Minus className="h-4 w-4 text-[#D8B35A]" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs text-[#665A70] leading-relaxed font-light border-t border-slate-50 animate-fade-in">
                      {answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

// Add internal Router Link wrapper matching local routing settings
import { Link as RouterLink } from "react-router-dom";
const Link: React.FC<any> = ({ to, children, ...props }) => {
  if (to.startsWith("http") || to.startsWith("tel:") || to.startsWith("mailto:")) {
    return <a href={to} {...props}>{children}</a>;
  }
  return <RouterLink to={to} {...props}>{children}</RouterLink>;
};

export default NeuroLandingPage;
