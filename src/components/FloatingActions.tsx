import React, { useState, useEffect, useRef } from "react";
import { Phone, Calendar, Send, X, Globe } from "lucide-react";
import { contactInfo } from "../data/contact";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "../utils/LanguageContext";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export const FloatingActions: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! I am SarvamCare's AI Medical Coordinator. How can I assist you today? You can ask me about our brain/spine neurosurgery, Smiling Monk cleft lip corrections, emergency trauma response, doctor slots, or visiting hours."
    }
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isChatOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputText("");

    // Simulate AI response
    setTimeout(() => {
      const query = userText.toLowerCase();
      let botReply = "";

      if (language === "ta") {
        botReply = "தொடர்பு கொண்டமைக்கு நன்றி. தங்களது கேள்வியை நாங்கள் பதிவு செய்துள்ளோம். அவசர அல்லது விபத்து சிகிச்சைக்கு எங்களது 24/7 உதவி எண்ணை உடனடியாக அழைக்கவும்: +91 94898 78908, அல்லது சேலம்-பெங்களூரு தேசிய நெடுஞ்சாலை, மாமங்கத்தில் உள்ள எங்களது மருத்துவமனைக்கு வரவும்.";
        
        if (query.includes("neuro") || query.includes("brain") || query.includes("spine") || query.includes("stroke") || query.includes("head") || query.includes("மூளை") || query.includes("நரம்பு") || query.includes("தண்டுவடம்")) {
          botReply = "எங்கள் மேம்பட்ட நரம்பியல் & தண்டுவட சிகிச்சை மையம் பேராசிரியர் Dr. V. சுரேஷ் குமார் தலைமையில் இயங்குகிறது. மூளைக் கட்டிகள், நரம்புத் தளர்ச்சி மற்றும் பக்கவாத சிகிச்சைகளில் நாங்கள் நிபுணத்துவம் பெற்றுள்ளோம். மருத்துவர் சந்திப்பை முன்பதிவு செய்ய விரும்புகிறீர்களா?";
        } else if (query.includes("cleft") || query.includes("smile") || query.includes("lip") || query.includes("child") || query.includes("plastic") || query.includes("உதடு") || query.includes("புன்னகை")) {
          botReply = "முயல் உதடு மற்றும் அண்ணப் பிளவு உள்ள குழந்தைகளுக்கு 'புன்னகைத் துறவி' திட்டத்தின் கீழ் எங்களது நிபுணர்கள் பிளாஸ்டிக் மறுசீரமைப்பு அறுவைசிகிச்சைகளை மேற்கொள்கின்றனர். மேலும் அறிய எங்களது சிறப்புத் துறைகள் பக்கத்தைப் பார்க்கவும்.";
        } else if (query.includes("trauma") || query.includes("accident") || query.includes("emergency") || query.includes("fracture") || query.includes("ortho") || query.includes("விபத்து") || query.includes("எலும்பு")) {
          botReply = "எங்களது 24/7 விபத்து & அவசர சிகிச்சை பிரிவு 32-ஸ்லைஸ் சிடி ஸ்கேன் மற்றும் நவீன அறுவைசிகிச்சை கூடங்களைக் கொண்டுள்ளது. ஆம்புலன்ஸ் தேவைக்கு +91 94898 78908 என்ற எண்ணை அழைக்கவும்.";
        } else if (query.includes("appointment") || query.includes("book") || query.includes("slot") || query.includes("consult") || query.includes("visit") || query.includes("பதிவு") || query.includes("நேரம்")) {
          botReply = "எங்களது இணையதளம் மூலமாக நீங்கள் எளிதாக முன்பதிவு செய்யலாம். மெனுவில் உள்ள 'முன்பதிவு செய்ய' பொத்தானைக் கிளிக் செய்யவும் அல்லது '/appointment' பக்கத்திற்குச் செல்லவும்.";
        } else if (query.includes("doctor") || query.includes("surgeon") || query.includes("specialist") || query.includes("registry") || query.includes("மருத்துவர்") || query.includes("டாக்டர்")) {
          botReply = "சர்வம் கேர் மருத்துவமனையில் நரம்பியல், எலும்பியல், பொது மருத்துவம் எனப் பல பிரிவுகளில் 20-க்கும் மேற்பட்ட சிறப்பு மருத்துவர்கள் உள்ளனர். மருத்துவர்கள் பக்கத்தில் முழுப் பட்டியலைக் காணலாம்.";
        } else if (query.includes("cashless") || query.includes("insurance") || query.includes("tpa") || query.includes("policy") || query.includes("காப்பீடு") || query.includes("இன்சூரன்ஸ்")) {
          botReply = "அனைத்து முக்கிய காப்பீட்டு நிறுவனங்கள் மூலமாகவும் பணமில்லா (Cashless TPA) சிகிச்சைகளை நாங்கள் வழங்குகிறோம். கூடுதல் விவரங்களுக்கு நோயாளிகள் வழிகாட்டி பக்கத்தைப் பார்க்கவும்.";
        }
      } else {
        botReply = "Thank you for reaching out. I'm noting down your inquiry. For immediate emergency/trauma assistance, please contact our 24/7 hotline at +91 94898 78908, or visit our hospital at Salem-Bangalore National Highway, Mamangam.";
        
        if (query.includes("neuro") || query.includes("brain") || query.includes("spine") || query.includes("stroke") || query.includes("head")) {
          botReply = "Our Advanced Neuro & Spine Center is led by Prof. Dr. V. Suresh Kumar. We specialize in microscopic neurosurgery, complex spine fixations, stroke interventions, and brain tumor removals. Would you like to check doctor availability?";
        } else if (query.includes("cleft") || query.includes("smile") || query.includes("lip") || query.includes("child") || query.includes("plastic")) {
          botReply = "SarvamCare runs the renowned 'Smiling Monk Cleft Project' providing specialized cleft lip and palate corrective plastic surgery. Our reconstructive team provides caring, child-friendly recovery programs. You can read more in our Specialties section.";
        } else if (query.includes("trauma") || query.includes("accident") || query.includes("emergency") || query.includes("fracture") || query.includes("ortho")) {
          botReply = "Our 24/7 Emergency & Trauma unit is always active and equipped with high-speed 32-Slice CT scanning, modern hybrid OTs, and trauma surgeons. Call our helpline at +91 94898 78908 for immediate ambulance dispatch.";
        } else if (query.includes("appointment") || query.includes("book") || query.includes("slot") || query.includes("consult") || query.includes("visit")) {
          botReply = "You can schedule a priority visit directly through our digital portal. Please navigate to our '/appointment' section or click the 'Book Consultation Slot' button in our menu drawer.";
        } else if (query.includes("doctor") || query.includes("surgeon") || query.includes("specialist") || query.includes("registry")) {
          botReply = "SarvamCare features a board of 20+ specialized medical consultants across Neurosurgery, Neurology, Orthopaedics, ENT, and General Medicine. You can browse the full board under our Doctors section.";
        } else if (query.includes("cashless") || query.includes("insurance") || query.includes("tpa") || query.includes("policy")) {
          botReply = "We support cashless hospitalization and lead insurance claims for major TPAs. Please visit our Patient Information page or contact our front desk at the hospital lobby during admission.";
        }
      }

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    }, 850);
  };

  return (
    <>
      {/* 1. Mobile Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#32105F] border-t border-[#D8B35A]/50 shadow-[0_-5px_20px_rgba(0,0,0,0.15)] grid grid-cols-2 divide-x divide-white/10 text-center select-none">
        
        {/* Call Now */}
        <a
          href={`tel:${contactInfo.phoneRaw}`}
          className="flex flex-col items-center justify-center py-2.5 text-white active:bg-white/5 transition-colors"
        >
          <Phone className="h-5 w-5 text-[#D8B35A] animate-pulse" />
          <span className="text-[9px] font-bold uppercase tracking-widest mt-1">Call Now</span>
        </a>

        {/* Appointment */}
        <Link
          to="/appointment"
          className="flex flex-col items-center justify-center py-2.5 text-white active:bg-white/5 transition-colors"
        >
          <Calendar className="h-5 w-5 text-[#D8B35A]" />
          <span className="text-[9px] font-bold uppercase tracking-widest mt-1">Book Now</span>
        </Link>
      </div>

      {/* 2. Floating AI Agent Bot Icon Button (Sits above mobile bar / bottom right of screen) */}
      <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 flex flex-col items-end pointer-events-none gap-2.5">
        {/* Language Toggle Button (Floating) */}
        <div className="pointer-events-auto">
          <button
            onClick={() => setLanguage(language === "en" ? "ta" : "en")}
            className="flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-full bg-[#32105F] border border-[#D8B35A] text-[#D8B35A] hover:bg-[#3D176E] shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold text-[9px] uppercase tracking-wider"
            title={language === "en" ? "தமிழ் மொழிக்கு மாற்றவும்" : "Switch to English"}
          >
            <Globe className="h-3 w-3" />
            <span>{language === "en" ? "தமிழ்" : "English"}</span>
          </button>
        </div>

        <div className="pointer-events-auto group relative flex items-center">
          
          {/* Tooltip */}
          <span className="absolute right-16 scale-0 group-hover:scale-100 transition-all duration-300 origin-right bg-[#32105F] text-white text-[9px] font-bold uppercase tracking-wider px-3 py-2 rounded-xl shadow-xl border border-[#D8B35A]/30 whitespace-nowrap">
            AI Coordinator
          </span>

          <motion.button
            onClick={() => setIsChatOpen(!isChatOpen)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.08 }}
            className={`flex items-center justify-center h-14 w-14 rounded-full bg-[#32105F] border-2 border-[#D8B35A] text-[#D8B35A] shadow-2xl hover:bg-[#3D176E] active:scale-95 transition-all cursor-pointer`}
            aria-label="AI Help desk"
          >
            {isChatOpen ? (
              <X className="h-6 w-6" />
            ) : (
              /* Custom Robot Bot SVG for absolute compliance */
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <circle cx="12" cy="5" r="2" />
                <path d="M12 7v4M8 16h.01M16 16h.01" />
              </svg>
            )}
          </motion.button>
        </div>
      </div>

      {/* 3. AI Agent Chat Window Overlay */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-36 md:bottom-24 right-4 md:right-6 z-50 w-[355px] max-w-[calc(100vw-2rem)] h-[460px] bg-[#1d0a36] border-2 border-[#D8B35A]/45 rounded-[28px] shadow-2xl overflow-hidden flex flex-col justify-between pointer-events-auto font-sans"
          >
            {/* Chat Header */}
            <div className="bg-[#32105F] border-b border-[#D8B35A]/25 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[#240d47] border border-[#D8B35A]/35 flex items-center justify-center text-[#D8B35A]">
                  <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="10" rx="2" />
                    <circle cx="12" cy="5" r="2" />
                    <path d="M12 7v4M8 16h.01M16 16h.01" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider">
                    {language === "en" ? "AI Coordinator" : "AI ஒருங்கிணைப்பாளர்"}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] text-green-400 font-bold uppercase tracking-wide">
                      {language === "en" ? "Online" : "ஆன்லைனில்"}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-indigo-200 hover:text-white transition-colors p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Message Logs */}
            <div className="flex-grow p-4 overflow-y-auto space-y-3 scrollbar-thin">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                      msg.sender === "user" 
                        ? "bg-[#D8B35A] text-[#32105F] font-bold rounded-tr-none" 
                        : "bg-[#240d47] text-white border border-[#D8B35A]/15 rounded-tl-none font-light"
                    }`}
                  >
                    {i === 0 && msg.sender === "bot" && msg.text.startsWith("Hello!")
                      ? (language === "ta" 
                          ? "வணக்கம்! நான் சர்வம் கேர் நிறுவனத்தின் செயற்கை நுண்ணறிவு மருத்துவ ஒருங்கிணைப்பாளர். இன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்? எங்களது மூளை/தண்டுவட அறுவைசிகிச்சை, புன்னகைத் துறவி முயல் உதடு சீரமைப்பு, அவசர விபத்து சிகிச்சை, மருத்துவர் நேரம் அல்லது பார்வையாளர்கள் நேரம் பற்றி நீங்கள் என்னிடம் கேட்கலாம்."
                          : msg.text)
                      : msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Bar */}
            <form 
              onSubmit={handleSend}
              className="p-3 border-t border-white/10 bg-[#32105F] flex items-center gap-2"
            >
              <input
                type="text"
                placeholder={language === "en" ? "Ask me about treatments, timings, doctors..." : "சிகிச்சைகள், நேரம், மருத்துவர்கள் பற்றி கேட்க..."}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-grow bg-[#240d47] border border-[#D8B35A]/20 text-white placeholder-indigo-300/40 text-xs px-3.5 py-2.5 rounded-full focus:outline-none focus:border-[#D8B35A] transition-all"
              />
              <button 
                type="submit"
                className="p-2.5 rounded-full bg-[#D8B35A] text-[#32105F] hover:bg-[#F3D98A] transition-all shrink-0 shadow-md active:scale-95"
                aria-label="Send message"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Spacer padding at page bottom for mobile sticky bar layout */}
      <div className="h-14 md:hidden" />
    </>
  );
};

export default FloatingActions;
