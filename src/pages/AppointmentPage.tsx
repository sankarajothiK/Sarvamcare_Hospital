import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Calendar, Phone, MessageCircle, Mail, MapPin, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { contactInfo } from "../data/contact";
import { departments as staticDepts } from "../data/departments";
import { doctors as staticDocs } from "../data/doctors";
import { useLanguage } from "../utils/LanguageContext";

export const AppointmentPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dept, setDept] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  
  const [deptsList, setDeptsList] = useState<any[]>(staticDepts);
  const [dbDoctorsList, setDbDoctorsList] = useState<any[]>(staticDocs);
  const [filteredDoctors, setFilteredDoctors] = useState<any[]>(staticDocs);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Load database lists on mount
  useEffect(() => {
    const loadDynamicData = async () => {
      try {
        const [deptsRes, docsRes] = await Promise.all([
          fetch("/api/departments"),
          fetch("/api/doctors")
        ]);
        if (deptsRes.ok) {
          const deptsData = await deptsRes.json();
          if (deptsData && deptsData.length > 0) setDeptsList(deptsData);
        }
        if (docsRes.ok) {
          const docsData = await docsRes.json();
          if (docsData && docsData.length > 0) {
            setDbDoctorsList(docsData);
            setFilteredDoctors(docsData);
          }
        }
      } catch (err) {
        console.warn("Could not load dynamic appointment form data, using static fallback", err);
      }
    };
    loadDynamicData();
  }, []);

  // Filter doctors list whenever department selection changes
  useEffect(() => {
    if (!dept) {
      setFilteredDoctors(dbDoctorsList);
      setDoctor("");
    } else {
      const matchedDept = deptsList.find((d) => d.name === dept || d.slug === dept || d.id === dept);
      if (matchedDept) {
        const deptIdentifier = matchedDept.slug || matchedDept.id;
        const filtered = dbDoctorsList.filter((doc) => {
          if (doc.departmentId) {
            return doc.departmentId === deptIdentifier;
          }
          if (doc.specialties) {
            return doc.specialties.includes(deptIdentifier);
          }
          return false;
        });
        setFilteredDoctors(filtered);
      } else {
        setFilteredDoctors([]);
      }
      setDoctor("");
    }
  }, [dept, deptsList, dbDoctorsList]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !dept || !doctor || !date || !time) return;
    setSubmitting(true);

    const payload = {
      name,
      phone,
      email,
      department: dept,
      doctor,
      date,
      time,
      message
    };

    try {
      // Submit to MongoDB/Express backend
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setSuccess(true);
        // Build whatsapp prefilled details
        const leadText = `Hello SarvamCare Hospital,\n\nI would like to request an appointment:\n- *Patient Name*: ${name}\n- *Mobile*: ${phone}\n- *Email*: ${email || "Not Provided"}\n- *Department*: ${dept}\n- *Doctor*: ${doctor}\n- *Preferred Date*: ${date}\n- *Preferred Time*: ${time}\n- *Message*: ${message || "Please share availability"}`;
        
        // Open WhatsApp redirect after brief timeout
        setTimeout(() => {
          window.open(`https://wa.me/${contactInfo.whatsapp.numberRaw}?text=${encodeURIComponent(leadText)}`, "_blank");
          setSuccess(false);
          setName("");
          setPhone("");
          setEmail("");
          setDept("");
          setDoctor("");
          setDate("");
          setTime("");
          setMessage("");
        }, 2000);
      } else {
        throw new Error("API call failed");
      }
    } catch (err) {
      // Fallback: If backend is not running, simulate successful redirect to WhatsApp
      console.warn("Express server unavailable. Falling back to direct WhatsApp redirect...", err);
      setSuccess(true);
      const leadText = `Hello SarvamCare Hospital,\n\nI would like to request an appointment:\n- *Patient Name*: ${name}\n- *Mobile*: ${phone}\n- *Email*: ${email || "Not Provided"}\n- *Department*: ${dept}\n- *Doctor*: ${doctor}\n- *Preferred Date*: ${date}\n- *Preferred Time*: ${time}\n- *Message*: ${message || "Please share availability"}`;
      
      setTimeout(() => {
        window.open(`https://wa.me/${contactInfo.whatsapp.numberRaw}?text=${encodeURIComponent(leadText)}`, "_blank");
        setSuccess(false);
        setName("");
        setPhone("");
        setEmail("");
        setDept("");
        setDoctor("");
        setDate("");
        setTime("");
        setMessage("");
      }, 2000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{language === "en" ? "Request Appointment Online | SarvamCare Hospital Salem" : "மருத்துவ ஆலோசனைக்கு ஆன்லைனில் முன்பதிவு செய்க | சர்வம் கேர் மருத்துவமனை சேலம்"}</title>
        <meta name="description" content="Schedule a priority consultation at SarvamCare Hospital. Fill out patient name, mobile, preferred department, doctor, and consultation slot timings." />
        <link rel="canonical" href="https://sarvamcarehospital.in/appointment" />
      </Helmet>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 md:py-24 text-center md:text-left">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-[#7E3DB5] blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] uppercase block">
            {language === "en" ? "Outpatient Consultations" : "வெளிநோயாளி ஆலோசனை"}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mt-2 leading-tight">
            {t("book_appointment")}
          </h1>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto md:mx-0 mt-4.5" />
        </div>
      </section>

      {/* Form Page Grid */}
      <section className="bg-white py-16 md:py-24 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Helpdesk details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#6D2FA0] uppercase">
                  {language === "en" ? "Admissions Helpdesk" : "சேர்க்கை உதவி மையம்"}
                </span>
                <h2 className="font-serif text-2xl sm:text-3.5xl font-bold text-[#32105F] leading-tight">
                  {language === "en" ? "Connect Directly to Our Care Team" : "எங்கள் உதவி மையத்தை உடனடியாகத் தொடர்புகொள்ள"}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#665A70] leading-relaxed font-light">
                {language === "en"
                  ? "Our medical helpdesk is active daily to streamline outpatient checkups. You can submit your booking requirements using the form or reach out directly to coordinate ambulance or critical trauma admissions."
                  : "எங்களது மருத்துவ உதவி மையம் தினசரி வெளிநோயாளி ஆலோசனைகளை எளிதாக்க செயல்படுகிறது. தாங்கள் படிவத்தைப் பயன்படுத்தி முன்பதிவு செய்யலாம் அல்லது அவசர ஆம்புலன்ஸ் தேவைகளுக்கு எங்களை நேரடியாக அழைக்கலாம்."}
              </p>

              <div className="space-y-4 pt-4 border-t border-[#F3EDFA]">
                {/* Call */}
                <a
                  href={`tel:${contactInfo.phoneRaw}`}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-[#EDE4F7] bg-[#FAF7FF] hover:bg-white hover:shadow-lg transition-all"
                >
                  <div className="p-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-500/20 shrink-0 shadow-sm">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[9px] text-[#665A70] font-bold uppercase tracking-wider block">
                      {language === "en" ? "Call Direct Hotline" : "நேரடி உதவி எண்"}
                    </span>
                    <span className="text-sm font-bold text-[#32105F]">{contactInfo.phone}</span>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={contactInfo.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl border border-[#EDE4F7] bg-[#FAF7FF] hover:bg-white hover:shadow-lg transition-all"
                >
                  <div className="p-3 rounded-xl bg-green-50 text-green-600 border border-green-500/20 shrink-0 shadow-sm">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[9px] text-[#665A70] font-bold uppercase tracking-wider block">
                      {language === "en" ? "WhatsApp Helpline" : "வாட்ஸ்அப் உதவி எண்"}
                    </span>
                    <span className="text-sm font-bold text-green-600">
                      {language === "en" ? "Online Consulting Link" : "வாட்ஸ்அப் அரட்டை"}
                    </span>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-[#EDE4F7] bg-[#FAF7FF]">
                  <div className="p-3 rounded-xl bg-[#FAF7FF] text-[#D8B35A] border border-[#D8B35A]/30 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[9px] text-[#665A70] font-bold uppercase tracking-wider block">
                      {language === "en" ? "Hospital Campus" : "மருத்துவமனை முகவரி"}
                    </span>
                    <span className="text-xs text-[#24152F] font-semibold">
                      {language === "ta" ? "மாமாங்கம், சேலம், தமிழ்நாடு, இந்தியா." : contactInfo.address.full}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Booking Form */}
            <div className="lg:col-span-7">
              <div className="p-6 md:p-8 rounded-3xl bg-[#FAF7FF] border border-[#EDE4F7] shadow-inner relative overflow-hidden">
                
                <AnimatePresence mode="wait">
                  {!success ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      
                      <div className="space-y-1">
                        <h3 className="font-serif font-bold text-[#32105F] text-lg">
                          {t("book_modal_title")}
                        </h3>
                        <p className="text-xs text-[#665A70] font-light">
                          {t("book_modal_desc")}
                        </p>
                      </div>

                      {/* Patient Name */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#665A70]">
                          {t("form_name")}
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

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Mobile Number */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-[#665A70]">
                            {t("form_phone")}
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={language === "en" ? "Mobile Number" : "தொலைபேசி எண்"}
                            className="w-full bg-white border border-[#EDE4F7] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#D8B35A] focus:border-[#D8B35A] focus:outline-none transition-all text-[#24152F]"
                          />
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-[#665A70]">
                            {language === "en" ? "Email Address" : "மின்னஞ்சல் முகவரி"}
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={language === "en" ? "Email Address" : "மின்னஞ்சல் முகவரி"}
                            className="w-full bg-white border border-[#EDE4F7] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#D8B35A] focus:border-[#D8B35A] focus:outline-none transition-all text-[#24152F]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Department */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-[#665A70]">
                            {t("form_dept")}
                          </label>
                          <select
                            required
                            value={dept}
                            onChange={(e) => setDept(e.target.value)}
                            className="w-full bg-white border border-[#EDE4F7] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#D8B35A] focus:border-[#D8B35A] focus:outline-none transition-all text-[#24152F]"
                          >
                            <option value="" disabled>
                              {language === "en" ? "Select Department" : "துறையைத் தேர்ந்தெடுக்கவும்"}
                            </option>
                            {deptsList.map((d) => (
                              <option key={d.slug || d.id} value={d.name}>
                                {language === "ta" && d.tamilName ? d.tamilName : d.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Doctor */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-[#665A70]">
                            {t("form_doctor")}
                          </label>
                          <select
                            required
                            value={doctor}
                            onChange={(e) => setDoctor(e.target.value)}
                            disabled={!dept}
                            className="w-full bg-white border border-[#EDE4F7] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#D8B35A] focus:border-[#D8B35A] focus:outline-none transition-all disabled:opacity-50 text-[#24152F]"
                          >
                            <option value="" disabled>
                              {language === "en" ? "Select Doctor" : "மருத்துவரைத் தேர்ந்தெடுக்கவும்"}
                            </option>
                            {filteredDoctors.map((doc) => (
                              <option key={doc._id || doc.id} value={doc.name}>
                                {language === "ta" && doc.tamilName ? doc.tamilName : doc.name} ({doc.qualification})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Preferred Date */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-[#665A70]">
                            {t("form_date")}
                          </label>
                          <input
                            type="date"
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-white border border-[#EDE4F7] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#D8B35A] focus:border-[#D8B35A] focus:outline-none transition-all text-[#24152F]"
                          />
                        </div>

                        {/* Preferred Time */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-[#665A70]">
                            {language === "en" ? "Preferred Time *" : "விருப்பமான நேரம் *"}
                          </label>
                          <select
                            required
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full bg-white border border-[#EDE4F7] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#D8B35A] focus:border-[#D8B35A] focus:outline-none transition-all text-[#24152F]"
                          >
                            <option value="" disabled>
                              {language === "en" ? "Select Time Slot" : "நேரத்தைத் தேர்ந்தெடுக்கவும்"}
                            </option>
                            <option value="Morning (09:00 AM - 12:00 PM)">
                              {language === "ta" ? "காலை (09:00 AM - 12:00 PM)" : "Morning (09:00 AM - 12:00 PM)"}
                            </option>
                            <option value="Afternoon (12:00 PM - 04:00 PM)">
                              {language === "ta" ? "மதியம் (12:00 PM - 04:00 PM)" : "Afternoon (12:00 PM - 04:00 PM)"}
                            </option>
                            <option value="Evening (04:00 PM - 07:00 PM)">
                              {language === "ta" ? "மாலை (04:00 PM - 07:00 PM)" : "Evening (04:00 PM - 07:00 PM)"}
                            </option>
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#665A70]">
                          {language === "en" ? "Message / Clinical Query" : "செய்தி / நோய் அறிகுறிகள்"}
                        </label>
                        <textarea
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder={language === "en" ? "Briefly describe your symptoms or query..." : "உங்கள் அறிகுறிகள் அல்லது தேவைகளைச் சுருக்கமாக எழுதவும்..."}
                          className="w-full bg-white border border-[#EDE4F7] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#D8B35A] focus:border-[#D8B35A] focus:outline-none transition-all resize-none text-[#24152F]"
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 rounded-full bg-green-600 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-green-700 transition-all disabled:opacity-50"
                      >
                        <Calendar className="h-4.5 w-4.5" />
                        <span>
                          {submitting 
                            ? (language === "en" ? "Booking..." : "முன்பதிவு செய்யப்படுகிறது...") 
                            : (language === "en" ? "Request Appointment" : "முன்பதிவு செய்ய")}
                        </span>
                      </button>

                    </form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12 space-y-4"
                    >
                      <CheckCircle2 className="h-16 w-16 text-[#6D2FA0] mx-auto animate-pulse" />
                      <h3 className="font-serif font-bold text-[#32105F] text-lg">
                        {language === "en" ? "Request Generated!" : "முன்பதிவு சமர்ப்பிக்கப்பட்டது!"}
                      </h3>
                      <p className="text-xs text-[#665A70] max-w-sm mx-auto leading-relaxed">
                        {t("form_book_success")}
                      </p>
                      <div className="flex justify-center items-center gap-1 text-[10px] text-[#665A70] font-light">
                        <AlertCircle className="h-3 w-3" />
                        <span>
                          {language === "en" ? "Opening WhatsApp connection..." : "வாட்ஸ்அப் பக்கத்திற்குச் செல்கிறது..."}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default AppointmentPage;
