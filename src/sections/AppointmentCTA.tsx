import React, { useState, useEffect } from "react";
import { Phone, MessageCircle, Mail, MapPin, Calendar, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { contactInfo } from "../data/contact";
import { departments as staticDepts } from "../data/departments";
import { doctors as staticDocs } from "../data/doctors";

export const AppointmentCTA: React.FC = () => {
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
  const [isSuccess, setIsSuccess] = useState(false);

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

  // Filter doctors based on department selection
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
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsSuccess(true);
        const leadText = `Hello SarvamCare Hospital,\n\nI would like to request an appointment:\n- *Patient Name*: ${name}\n- *Mobile*: ${phone}\n- *Email*: ${email || "Not Provided"}\n- *Department*: ${dept}\n- *Doctor*: ${doctor}\n- *Preferred Date*: ${date}\n- *Preferred Time*: ${time}\n- *Message*: ${message || "Please share availability"}`;
        
        setTimeout(() => {
          window.open(`https://wa.me/${contactInfo.whatsapp.numberRaw}?text=${encodeURIComponent(leadText)}`, "_blank");
          setIsSuccess(false);
          setName("");
          setPhone("");
          setEmail("");
          setDept("");
          setDoctor("");
          setDate("");
          setTime("");
          setMessage("");
        }, 1800);
      } else {
        throw new Error("Backend submission failed");
      }
    } catch (err) {
      console.warn("Express server unavailable. Falling back to direct WhatsApp redirect...", err);
      setIsSuccess(true);
      const leadText = `Hello SarvamCare Hospital,\n\nI would like to request an appointment:\n- *Patient Name*: ${name}\n- *Mobile*: ${phone}\n- *Email*: ${email || "Not Provided"}\n- *Department*: ${dept}\n- *Doctor*: ${doctor}\n- *Preferred Date*: ${date}\n- *Preferred Time*: ${time}\n- *Message*: ${message || "Please share availability"}`;
      
      setTimeout(() => {
        window.open(`https://wa.me/${contactInfo.whatsapp.numberRaw}?text=${encodeURIComponent(leadText)}`, "_blank");
        setIsSuccess(false);
        setName("");
        setPhone("");
        setEmail("");
        setDept("");
        setDoctor("");
        setDate("");
        setTime("");
        setMessage("");
      }, 1800);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="appointment" className="bg-[#FFFFFF] py-16 md:py-24 border-b border-[#F3EDFA] font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Direct Helpline & Coordinates */}
          <div className="lg:col-span-5 space-y-6 md:space-y-8">
            <div className="space-y-3">
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#6D2FA0] uppercase">
                Connect With Us
              </span>
              <h2 className="font-serif text-3xl sm:text-4.5xl font-extrabold text-[#32105F] leading-tight">
                Your Health Deserves Expert Care
              </h2>
              <div className="h-[2px] w-14 bg-[#D8B35A]" />
            </div>

            <p className="text-xs sm:text-sm text-[#665A70] font-light leading-relaxed">
              Have clinical questions or need to schedule an urgent consultation? Reach out directly using our official emergency channels below.
            </p>

            <div className="space-y-4">
              {/* Call Card */}
              <a
                href={`tel:${contactInfo.phoneRaw}`}
                className="flex items-center gap-4 p-4 rounded-2xl border border-[#EDE4F7] bg-[#FAF7FF]/40 hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shrink-0 shadow-sm">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[9px] text-[#665A70] font-bold uppercase tracking-wider block">Call Direct Line</span>
                  <span className="text-sm sm:text-base font-bold text-[#32105F] hover:text-[#7E3DB5] transition-colors">
                    {contactInfo.phone}
                  </span>
                </div>
              </a>

              {/* WhatsApp Card */}
              <a
                href={contactInfo.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl border border-[#EDE4F7] bg-[#FAF7FF]/40 hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <div className="p-3 rounded-xl bg-green-50 text-green-600 border border-green-500/20 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300 shrink-0 shadow-sm">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[9px] text-[#665A70] font-bold uppercase tracking-wider block">WhatsApp Helpline</span>
                  <span className="text-sm sm:text-base font-bold text-green-600">
                    Online Consultation Chat
                  </span>
                </div>
              </a>

              {/* Email Card */}
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-4 p-4 rounded-2xl border border-[#EDE4F7] bg-[#FAF7FF]/40 hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <div className="p-3 rounded-xl bg-[#FAF7FF] text-[#6D2FA0] border border-[#EDE4F7] group-hover:bg-[#32105F] group-hover:text-[#D8B35A] transition-colors duration-300 shrink-0 shadow-sm">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[9px] text-[#665A70] font-bold uppercase tracking-wider block">Official Email</span>
                  <span className="text-sm sm:text-base font-bold text-[#32105F] truncate block">
                    {contactInfo.email}
                  </span>
                </div>
              </a>

              {/* Directions Card */}
              <a
                href={contactInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl border border-[#EDE4F7] bg-[#FAF7FF]/40 hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <div className="p-3 rounded-xl bg-[#FAF7FF] text-[#D8B35A] border border-[#D8B35A]/30 group-hover:bg-[#32105F] group-hover:text-[#D8B35A] transition-colors duration-300 shrink-0 shadow-sm">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[9px] text-[#665A70] font-bold uppercase tracking-wider block">Find Location</span>
                  <span className="text-xs text-[#24152F] font-semibold">
                    {contactInfo.address.line1}, {contactInfo.address.city}
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Appointment Form */}
          <div className="lg:col-span-7">
            <div className="p-6 md:p-8 rounded-3xl bg-[#FAF7FF] border border-[#EDE4F7] shadow-inner relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="space-y-1">
                      <h3 className="font-serif font-bold text-[#32105F] text-lg">Request Consultation Details</h3>
                      <p className="text-xs text-[#665A70] font-light">Fill out details to route directly to our helpdesk.</p>
                    </div>

                    {/* Patient Name */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#665A70]">Patient Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter full name"
                        className="w-full bg-white border border-[#EDE4F7] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#D8B35A] focus:border-[#D8B35A] focus:outline-none transition-all text-[#24152F]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Mobile Number */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#665A70]">Mobile Number *</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Enter mobile number"
                          className="w-full bg-white border border-[#EDE4F7] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#D8B35A] focus:border-[#D8B35A] focus:outline-none transition-all text-[#24152F]"
                        />
                      </div>
                      
                      {/* Email */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#665A70]">Email Address</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter email address"
                          className="w-full bg-white border border-[#EDE4F7] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#D8B35A] focus:border-[#D8B35A] focus:outline-none transition-all text-[#24152F]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Department Dropdown */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#665A70]">Preferred Medical Department *</label>
                        <select
                          required
                          value={dept}
                          onChange={(e) => setDept(e.target.value)}
                          className="w-full bg-white border border-[#EDE4F7] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#D8B35A] focus:border-[#D8B35A] focus:outline-none transition-all text-[#24152F]"
                        >
                          <option value="" disabled>Select Department</option>
                          {deptsList.map((d) => (
                            <option key={d.slug || d.id} value={d.name}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Doctor Dropdown */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#665A70]">Select Consultant *</label>
                        <select
                          required
                          value={doctor}
                          onChange={(e) => setDoctor(e.target.value)}
                          disabled={!dept}
                          className="w-full bg-white border border-[#EDE4F7] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#D8B35A] focus:border-[#D8B35A] focus:outline-none transition-all disabled:opacity-50 text-[#24152F]"
                        >
                          <option value="" disabled>Select Doctor</option>
                          {filteredDoctors.map((doc) => (
                            <option key={doc._id || doc.id} value={doc.name}>
                              {doc.name} ({doc.qualification})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Preferred Date */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#665A70]">Preferred Date *</label>
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
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#665A70]">Preferred Time *</label>
                        <select
                          required
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full bg-white border border-[#EDE4F7] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#D8B35A] focus:border-[#D8B35A] focus:outline-none transition-all text-[#24152F]"
                        >
                          <option value="" disabled>Select Time Slot</option>
                          <option value="Morning (09:00 AM - 12:00 PM)">Morning (09:00 AM - 12:00 PM)</option>
                          <option value="Afternoon (12:00 PM - 04:00 PM)">Afternoon (12:00 PM - 04:00 PM)</option>
                          <option value="Evening (04:00 PM - 07:00 PM)">Evening (04:00 PM - 07:00 PM)</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#665A70]">Clinical Query / Note (Optional)</label>
                      <textarea
                        rows={2}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Describe symptoms or clinical requests..."
                        className="w-full bg-white border border-[#EDE4F7] rounded-xl p-3 text-xs focus:ring-1 focus:ring-[#D8B35A] focus:border-[#D8B35A] focus:outline-none transition-all resize-none text-[#24152F]"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 rounded-full bg-green-600 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-green-700 transition-all duration-200 shadow-md disabled:opacity-50"
                    >
                      <Calendar className="h-4.5 w-4.5" />
                      <span>{submitting ? "Booking..." : "Request Appointment"}</span>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12 space-y-4"
                  >
                    <CheckCircle2 className="h-16 w-16 text-[#6D2FA0] mx-auto animate-pulse" />
                    <h3 className="font-serif font-bold text-[#32105F] text-lg">Request Generated!</h3>
                    <p className="text-xs text-[#665A70] max-w-sm mx-auto leading-relaxed">
                      Thank you. We are redirecting you to our official WhatsApp care channel to confirm your slot with the doctor.
                    </p>
                    <div className="flex justify-center items-center gap-1 text-[10px] text-[#665A70] font-light">
                      <AlertCircle className="h-3 w-3" />
                      <span>Opening WhatsApp web connection...</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
export default AppointmentCTA;
