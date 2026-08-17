import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle } from "lucide-react";
import { contactInfo } from "../data/contact";
import { useLanguage } from "../utils/LanguageContext";

export const ContactPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, subject, message })
      });
      if (res.ok) {
        setSuccess(true);
        setName("");
        setPhone("");
        setEmail("");
        setSubject("");
        setMessage("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{language === "en" ? "Contact SarvamCare Hospital Salem | Location & Map Coordinates" : "சர்வம் கேர் மருத்துவமனையைத் தொடர்பு கொள்ள | இருப்பிடம் & வரைபடம்"}</title>
        <meta name="description" content="Reach us at Mamangam, Salem on Salem-Bangalore National Highway. Contact details, emergency numbers, email support and appointment scheduling helpline." />
        <link rel="canonical" href="https://sarvamcarehospital.in/contact" />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 md:py-24 text-center md:text-left">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-[#7E3DB5] blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] uppercase block">
            {language === "en" ? "Emergency & General Helpdesk" : "அவசர மற்றும் பொது உதவி மையம்"}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mt-2 leading-tight">
            {t("contact")}
          </h1>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto md:mx-0 mt-4.5" />
        </div>
      </section>

      {/* Main Grid */}
      <section className="bg-white py-16 md:py-24 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-bold text-[#32105F]">
                    {language === "en" ? "Hospital Coordinates" : "மருத்துவமனை முகவரி"}
                  </h3>
                  <p className="text-xs text-[#665A70] font-light">
                    {language === "en" ? "Get in touch directly or visit our campus for OPD consultations." : "ஆலோசனைகளுக்கு அல்லது அவசர உதவிகளுக்கு எங்களை நேரடியாகத் தொடர்பு கொள்ளவும்."}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl border border-[#EDE4F7] bg-[#FAF7FF]">
                    <div className="p-2.5 rounded-xl bg-[#32105F]/5 text-[#D8B35A] border border-[#D8B35A]/20 shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[9px] text-[#665A70] font-bold uppercase tracking-wider block">
                        {language === "en" ? "Campus Address" : "முகவரி"}
                      </span>
                      <p className="text-xs sm:text-sm text-[#32105F] font-semibold mt-0.5 leading-relaxed">
                        {language === "ta" ? "மாமாங்கம், சேலம், தமிழ்நாடு, இந்தியா." : contactInfo.address.full}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <a
                    href={`tel:${contactInfo.phoneRaw}`}
                    className="flex items-start gap-4 p-4 rounded-2xl border border-[#EDE4F7] bg-[#FAF7FF] hover:bg-white hover:shadow-md transition-all group"
                  >
                    <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-500/20 shrink-0 shadow-sm">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[9px] text-[#665A70] font-bold uppercase tracking-wider block">
                        {t("helpline")}
                      </span>
                      <p className="text-xs sm:text-sm text-[#32105F] font-bold mt-0.5">
                        {contactInfo.phone}
                      </p>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={contactInfo.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-2xl border border-[#EDE4F7] bg-[#FAF7FF] hover:bg-white hover:shadow-md transition-all group"
                  >
                    <div className="p-2.5 rounded-xl bg-green-50 text-green-600 border border-green-500/20 shrink-0 shadow-sm">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[9px] text-[#665A70] font-bold uppercase tracking-wider block">
                        {language === "en" ? "WhatsApp Helpline" : "வாட்ஸ்அப் உதவி எண்"}
                      </span>
                      <p className="text-xs sm:text-sm text-[#32105F] font-bold mt-0.5">
                        {language === "en" ? "Chat Online With Helper" : "வாட்ஸ்அப் அரட்டை"}
                      </p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-start gap-4 p-4 rounded-2xl border border-[#EDE4F7] bg-[#FAF7FF] hover:bg-white hover:shadow-md transition-all group"
                  >
                    <div className="p-2.5 rounded-xl bg-[#32105F]/5 text-[#6D2FA0] border border-[#EDE4F7] shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[9px] text-[#665A70] font-bold uppercase tracking-wider block">
                        {language === "en" ? "Support Email" : "மின்னஞ்சல் முகவரி"}
                      </span>
                      <p className="text-xs sm:text-sm text-[#32105F] font-bold mt-0.5 truncate max-w-[200px] sm:max-w-none">
                        {contactInfo.email}
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Working hours info */}
              <div className="p-4 rounded-2xl bg-[#FAF7FF]/50 border border-[#EDE4F7] text-xs text-[#665A70] leading-relaxed font-light">
                {language === "en" 
                  ? "Our emergency trauma bay, critical care ventilation ICU beds, and scanning units are active 24 Hours, 365 Days a Year." 
                  : "எங்களது அவசர விபத்து சிகிச்சை பிரிவு, தீவிர சிகிச்சை பிரிவு (ICU) மற்றும் ஸ்கேன் வசதிகள் வருடத்தில் 365 நாட்களும் 24 மணி நேரமும் செயல்படுகின்றன."}
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7">
              <div className="p-6 md:p-8 rounded-3xl border border-[#EDE4F7] bg-[#FAF7FF] shadow-inner space-y-6">
                
                {success ? (
                  <div className="text-center py-16 space-y-4">
                    <CheckCircle className="h-16 w-16 text-[#6D2FA0] mx-auto animate-pulse" />
                    <h3 className="font-serif font-bold text-[#32105F] text-lg">
                      {language === "en" ? "Message Submitted!" : "செய்தி சமர்ப்பிக்கப்பட்டது!"}
                    </h3>
                    <p className="text-xs text-[#665A70] max-w-sm mx-auto leading-relaxed">
                      {language === "en" 
                        ? "Thank you for contacting SarvamCare. Our outpatient helper desk coordinators will review and reply via email or phone shortly." 
                        : "தொடர்பு கொண்டதற்கு நன்றி! எங்களது உதவி மையப் பிரதிநிதிகள் தங்களை விரைவில் தொடர்பு கொள்வார்கள்."}
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="px-6 py-2.5 rounded-full bg-[#32105F] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#3D176E]"
                    >
                      {language === "en" ? "Send New Message" : "புதிய செய்தி அனுப்பவும்"}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-serif font-bold text-[#32105F] text-lg">
                        {language === "en" ? "Leave a Message" : "செய்தி அனுப்பவும்"}
                      </h3>
                      <p className="text-xs text-[#665A70] font-light">
                        {language === "en" ? "Submit details for general, pricing, or department enquiries." : "சிகிச்சைக் கட்டணங்கள் அல்லது இதர விவரங்களை அறிய கீழே உள்ள படிவத்தை நிரப்பவும்."}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#665A70]">
                          {language === "en" ? "Your Name *" : "உங்கள் பெயர் *"}
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={language === "en" ? "Full Name" : "முழு பெயர்"}
                          className="w-full bg-white border border-[#EDE4F7] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#D8B35A] focus:border-[#D8B35A] focus:outline-none transition-all text-[#24152F]"
                        />
                      </div>
                      
                      {/* Phone */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#665A70]">
                          {language === "en" ? "Phone Number *" : "தொலைபேசி எண் *"}
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder={language === "en" ? "Phone Number" : "தொலைபேசி எண்"}
                          className="w-full bg-white border border-[#EDE4F7] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#D8B35A] focus:border-[#D8B35A] focus:outline-none transition-all text-[#24152F]"
                        />
                      </div>
                    </div>

                    {/* Email & Subject */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#665A70]">
                          {language === "en" ? "Email Address" : "மின்னஞ்சல் முகவரி"}
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={language === "en" ? "Email" : "மின்னஞ்சல்"}
                          className="w-full bg-white border border-[#EDE4F7] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#D8B35A] focus:border-[#D8B35A] focus:outline-none transition-all text-[#24152F]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#665A70]">
                          {language === "en" ? "Subject *" : "விஷயம் *"}
                        </label>
                        <input
                          type="text"
                          required
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder={language === "en" ? "Subject" : "செய்தியின் சுருக்கம்"}
                          className="w-full bg-white border border-[#EDE4F7] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#D8B35A] focus:border-[#D8B35A] focus:outline-none transition-all text-[#24152F]"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#665A70]">
                        {language === "en" ? "Your Message *" : "உங்கள் செய்தி *"}
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={language === "en" ? "Write your queries or diagnostic request details here..." : "உங்கள் கேள்விகள் அல்லது மருத்துவத் தேவைகளை இங்கு எழுதவும்..."}
                        className="w-full bg-white border border-[#EDE4F7] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#D8B35A] focus:border-[#D8B35A] focus:outline-none transition-all resize-none text-[#24152F]"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 rounded-full bg-[#32105F] text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#3D176E] transition-all disabled:opacity-50"
                    >
                      <Send className="h-4 w-4" />
                      <span>
                        {submitting 
                          ? (language === "en" ? "Submitting..." : "சமர்ப்பிக்கப்படுகிறது...") 
                          : (language === "en" ? "Send Message" : "செய்தி அனுப்பு")}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

          {/* Map Section */}
          <div className="mt-16 h-[350px] rounded-3xl border border-[#EDE4F7] overflow-hidden bg-slate-200">
            <iframe
              title="SarvamCare Map"
              width="100%"
              height="100%"
              frameBorder="0"
              src="https://maps.google.com/maps?q=SarvamCare%20Hospital%20Mamangam%20Salem&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="grayscale contrast-125 border-none"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
