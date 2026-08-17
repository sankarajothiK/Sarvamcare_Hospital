import React from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { NeuroCenterLogo } from "../components/BrandLogos";
import { useLanguage } from "../utils/LanguageContext";

export const NeuroCenter: React.FC = () => {
  const { language, t } = useLanguage();

  const services = [
    "Microscopic & Endoscopic Neurosurgical Solutions for Brain Tumors, Aneurysms & Skull Base lesions",
    "Comprehensive Multimodal Cerebral Stroke & Ischemic Attack Management",
    "Multimodality Management for Pituitary Adenomas & Hormonal Tumors",
    "Functional Surgery for Trigeminal Neuralgia & Hemifacial Spasm",
    "Minimally Invasive Solutions for Spinal Tumors, Herniations & Disc Diseases",
    "Spinal Instrumentations & Decompression Stabilizations",
    "Complex Peripheral Nerve Reconstruction Surgery"
  ];

  const getTranslatedService = (srv: string) => {
    if (language === "ta") {
      if (srv.startsWith("Microscopic & Endoscopic")) return "மூளைக் கட்டிகள், இரத்தக்குழாய் வீக்கம் மற்றும் தண்டுவடக் கோளாறுகளுக்கான அதிநவீன நுண்ணோக்கி & எண்டோஸ்கோபிக் அறுவைசிகிச்சைகள்.";
      if (srv.startsWith("Comprehensive Multimodal Cerebral")) return "மூளை பக்கவாதம் (ஸ்ட்ரோக்) மற்றும் தற்காலிக நரம்பு செயலிழப்புகளுக்கான முழுமையான அவசர நரம்பியல் மேலாண்மை.";
      if (srv.startsWith("Multimodality Management for Pituitary")) return "பிட்யூட்டரி சுரப்பிக் கட்டிகள் மற்றும் ஹார்மோன் சுரப்புக் கோளாறுகளுக்கான நவீன சிகிச்சைகள்.";
      if (srv.startsWith("Functional Surgery for Trigeminal")) return "முக நரம்பு வலி (Trigeminal Neuralgia) மற்றும் முகத் தசைத் துடிப்புகளுக்கான சிறப்பு அறுவைசிகிச்சைகள்.";
      if (srv.startsWith("Minimally Invasive Solutions")) return "தண்டுவடக் கட்டிகள், டிஸ்க் பாதிப்புகள் மற்றும் தண்டுவட நரம்பு அழுத்தத்திற்கான நுண்-துளை அறுவைசிகிச்சைகள்.";
      if (srv.startsWith("Spinal Instrumentations & Decompression")) return "தண்டுவட முறிவுகள் மற்றும் தண்டுவட அழுத்தத்தை நீக்கி நிலைநிறுத்தும் சிறப்பு சிகிச்சைகள்.";
      if (srv.startsWith("Complex Peripheral Nerve Reconstruction")) return "கை, கால்களில் உள்ள நரம்புக் காயங்கள் மற்றும் நரம்பு பாதிப்புகளுக்கான மறுசீரமைப்பு அறுவைசிகிச்சை.";
    }
    return srv;
  };

  return (
    <section id="neuro-center" className="relative overflow-hidden bg-[#32105F] border-b border-[#D8B35A]/20 py-16 md:py-24">
      {/* Background Neural Particles shifting (scroll-effect simulator) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/4 h-[400px] w-[400px] rounded-full bg-[#7E3DB5]/10 blur-[100px]" />
        <div className="absolute bottom-10 right-1/4 h-[300px] w-[300px] rounded-full bg-[#D8B35A]/5 blur-[80px]" />
        
        {/* Animated neural particles lines */}
        <svg className="w-full h-full opacity-10" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M 50 150 C 200 50, 400 250, 600 150 C 700 100, 750 300, 800 200"
            fill="none"
            stroke="#D8B35A"
            strokeWidth="1.5"
            animate={{ d: [
              "M 50 150 C 200 50, 400 250, 600 150 C 700 100, 750 300, 800 200",
              "M 50 170 C 210 30, 390 270, 610 130 C 690 120, 760 280, 800 220",
              "M 50 150 C 200 50, 400 250, 600 150 C 700 100, 750 300, 800 200"
            ]}}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M 0 350 Q 200 500, 450 300 T 800 400"
            fill="none"
            stroke="#FAF7FF"
            strokeWidth="1"
            strokeDasharray="4 4"
            animate={{ d: [
              "M 0 350 Q 200 500, 450 300 T 800 400",
              "M 0 330 Q 220 480, 430 320 T 800 380",
              "M 0 350 Q 200 500, 450 300 T 800 400"
            ]}}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>

        {/* Floating background nodes */}
        {[
          { cx: "25%", cy: "15%", delay: 0 },
          { cx: "75%", cy: "30%", delay: 1.5 },
          { cx: "15%", cy: "65%", delay: 3 },
          { cx: "85%", cy: "80%", delay: 4.5 }
        ].map((node, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-[#D8B35A]/30"
            style={{ left: node.cx, top: node.cy }}
            animate={{ y: [0, -15, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, delay: node.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header (Neuro Center Identity) */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <NeuroCenterLogo className="h-20 w-20" showText={false} />
          </motion.div>
          
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] uppercase mt-4">
            {language === "ta" ? "பேராசிரியர் Dr. V. சுரேஷ் குமார் அவர்களின் நரம்பியல் மையம்" : "Dr. V. Suresh Kumar's Neuro Center"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4.5xl font-extrabold text-white mt-2">
            {language === "ta" ? (
              <>மூளை, தண்டுவடம் & நரம்புகளுக்கான <span className="gold-gradient-text">மேம்பட்ட சிகிச்சை</span></>
            ) : (
              <>Advanced Care for the <span className="gold-gradient-text">Brain, Spine & Nerves</span></>
            )}
          </h2>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto mt-4.5" />
          
          <p className="text-xs sm:text-sm text-indigo-100/90 mt-4 leading-relaxed font-sans font-light max-w-2xl">
            {language === "en"
              ? "A highly dedicated clinical center coordinating senior neurologists, neurosurgeons, and psychiatrists, offering advanced diagnostics, micro-surgical precision, and dedicated nerve stabilization."
              : "சிறந்த நரம்பியல் நிபுணர்கள், நரம்பியல் அறுவைசிகிச்சை மருத்துவர்கள் மற்றும் மனநல மருத்துவர்களை ஒருங்கிணைத்து, நவீன நோயறிதல், துல்லியமான நுண்-அறுவைசிகிச்சை மற்றும் நரம்பு நிலைநிறுத்த சிகிச்சைகளை வழங்கும் பிரத்யேக மையம்."}
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Spine & Nerve representation (Central Brain Gently Scales) */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-[340px] aspect-square rounded-3xl bg-[#3D176E]/50 border border-[#D8B35A]/30 p-8 flex flex-col justify-center items-center text-center overflow-hidden shadow-2xl hover-glow-purple group"
            >
              {/* Inner glowing layout */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#32105F] via-transparent to-transparent z-0" />
              
              <svg className="h-4/5 w-4/5 text-indigo-200/90 relative z-10 overflow-visible group-hover:scale-105 transition-transform duration-700" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                {/* Brain lobes */}
                <path d="M50 16 C41 16 33 22 33 30 C33 34 36 37 39 39 M50 16 C59 16 67 22 67 30 C67 34 64 37 61 39" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.9" />
                {/* Spine bone column */}
                <path d="M50 35 L50 90" stroke="#D8B35A" strokeWidth="3" strokeLinecap="round" />
                <path d="M44 42 H56 M42 50 H58 M42 58 H58 M43 66 H57 M45 74 H55 M47 82 H53" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                
                {/* Nerve branches */}
                <path d="M42 50 C30 50 25 45 20 40 M58 50 C70 50 75 45 80 40 M42 58 C28 58 20 62 15 65 M58 58 C72 58 80 62 85 65 M43 66 C25 66 18 72 12 78 M57 66 C75 66 82 72 88 78" stroke="#7E3DB5" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
                
                {/* Pulsing focal nodes */}
                <circle cx="50" cy="30" r="3.5" fill="#D8B35A" />
                <circle cx="50" cy="50" r="2.5" fill="#ffffff" />
                <circle cx="50" cy="66" r="2.5" fill="#ffffff" />
              </svg>
              
              <div className="relative z-10 mt-4 space-y-1">
                <span className="text-white font-serif text-sm font-semibold tracking-wide">
                  {language === "ta" ? "நுண்ணோக்கி அறுவைசிகிச்சை" : "Microsurgical Systems"}
                </span>
                <p className="text-[10px] text-indigo-200/80 font-sans tracking-wide">
                  {language === "ta" ? "துல்லியமான நரம்பு & தண்டுவட அழுத்த நிவாரணம்" : "Precision Nerve & Disc Decompression"}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Service list rendering sequentially */}
          <div className="lg:col-span-7 space-y-4.5 order-1 lg:order-2">
            <div className="grid grid-cols-1 gap-3">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#3D176E]/40 border border-white/5 hover:border-[#D8B35A]/30 hover:bg-[#3D176E]/60 transition-all duration-300 shadow-sm"
                >
                  <div className="p-1 rounded bg-[#FAF7FF] text-[#D8B35A] shrink-0 border border-[#D8B35A]/30 mt-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="text-xs sm:text-sm text-indigo-100 font-sans leading-relaxed font-light">
                    {getTranslatedService(service)}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
export default NeuroCenter;
