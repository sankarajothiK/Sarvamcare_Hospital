import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Phone, MessageCircle, ChevronDown, ChevronRight, Activity, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { contactInfo } from "../data/contact";
import { doctors as staticDoctors } from "../data/doctors";

interface DepartmentData {
  _id: string;
  name: string;
  tamilName?: string;
  slug: string;
  description: string;
  icon?: string;
  services: string[];
  faq: { question: string; answer: string }[];
  seoTitle?: string;
  seoDescription?: string;
}

interface DoctorData {
  _id: string;
  name: string;
  qualification: string;
  designation: string;
  departmentId: string;
}

export const DepartmentDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
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
            tamilName: "நரம்பியல் அறுவை சிகிச்சை",
            slug: "neurosurgery",
            description: "Advanced management of brain tumors, skull-base procedures, vascular aneurysm clippings, and complex spine reconstruction services led by senior leadership.",
            services: ["Brain Tumor Microsurgery", "Spinal Decompression", "Skull Base Surgery", "Aneurysm Clipping", "Stereotactic Biopsy"],
            faq: [
              { question: "What is microdiscectomy?", answer: "A minimally invasive spine procedure performed to relieve nerve root compression." },
              { question: "When should I consult a neurosurgeon?", answer: "For chronic head injuries, persistent limb numbness, or spine tumors." }
            ],
            seoTitle: "Best Neurosurgery Hospital in Salem | SarvamCare",
            seoDescription: "Consult senior neurosurgeon Prof. Dr. V. Suresh Kumar at SarvamCare Hospital Mamangam. Advanced microsurgery theaters."
          },
          neurology: {
            _id: "2",
            name: "Neurology",
            tamilName: "நரம்பியல்",
            slug: "neurology",
            description: "Stroke management clinic, epilepsy, and neurological disorders diagnostics utilizing EEG and modern telemetry.",
            services: ["Stroke Management", "EEG Diagnostics", "Epilepsy Clinic", "Parkinson's Therapy"],
            faq: [{ question: "What is FAST?", answer: "Warning signs of stroke: Face drooping, Arm weakness, Speech difficulty, Time to call." }],
            seoTitle: "Neurology Specialist Clinic in Salem | SarvamCare",
            seoDescription: "Experienced neurologist consultation, electroencephalogram (EEG) tests, and epilepsy care programs."
          },
          orthopaedics: {
            _id: "3",
            name: "Orthopaedics",
            tamilName: "எலும்பியல்",
            slug: "orthopaedics",
            description: "Dedicated polytrauma fracture fixations, total hip & knee replacements, and sports medicine therapies.",
            services: ["Joint Replacement Surgery", "Complex Fracture Fixation", "Arthroscopic Surgery", "Physical Rehabilitation"],
            faq: [{ question: "Do you offer post-op rehabilitation?", answer: "Yes, our post-operative team manages customized physio plans." }],
            seoTitle: "Best Orthopaedic Hospital in Salem | SarvamCare",
            seoDescription: "Joint replacements, joint reconstruction, and fracture fixation at SarvamCare Salem Mamangam."
          },
          "plastic-surgery": {
            _id: "4",
            name: "Plastic Surgery",
            tamilName: "பிளாஸ்டிக் அறுவை சிகிச்சை",
            slug: "plastic-surgery",
            description: "Specialized reconstructive surgery, craniofacial correction, microvascular tissue transfers, and cleft lip repairs.",
            services: ["Cleft lip/palate reconstruction", "Facial trauma reconstruction", "Revision cosmetic surgery", "Botox & fillers"],
            faq: [{ question: "What is microvascular surgery?", answer: "Surgical reconstruction utilizing tiny blood vessels transfers." }],
            seoTitle: "Plastic & Reconstructive Surgery in Salem | SarvamCare",
            seoDescription: "Craniofacial repairs and microvascular tissue reconstructions at SarvamCare."
          }
        };

        const currentDept = fallbackDepts[slug as keyof typeof fallbackDepts];
        if (currentDept) {
          setDept(currentDept);
          // Fallback doctors from static database
          const mappedDocs: DoctorData[] = staticDoctors.map((doc) => {
            let designation = "Consultant Specialist";
            if (doc.id === "dr-v-suresh-kumar") {
              designation = "Chief Consultant Neurosurgeon & HOD";
            } else if (doc.specialties.includes("neurosurgery")) {
              designation = "Consultant Neurosurgeon";
            } else if (doc.specialties.includes("neurology")) {
              designation = "Consultant Neurologist";
            } else if (doc.specialties.includes("plastic-surgery")) {
              designation = "Consultant Reconstructive Surgeon";
            } else if (doc.specialties.includes("orthopaedics")) {
              designation = "Consultant Orthopaedic Surgeon";
            }
            return {
              _id: doc.id,
              name: doc.name,
              qualification: doc.qualification,
              designation,
              departmentId: doc.specialties[0] || "general-medicine"
            };
          });
          setDoctors(mappedDocs.filter(d => d.departmentId === slug));
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7FF]">
        <div className="h-10 w-10 border-2 border-brand-purple border-t-brand-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!dept) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF7FF] px-4 text-center">
        <h2 className="font-serif text-3xl font-bold text-[#32105F] mb-2">Department Not Found</h2>
        <p className="text-xs text-[#665A70] mb-6">The specialty you are looking for is not listed or has been modified.</p>
        <Link to="/" className="px-6 py-2.5 bg-[#32105F] text-white rounded-full text-xs font-bold uppercase tracking-wider">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{dept.seoTitle || `${dept.name} | SarvamCare Hospital`}</title>
        <meta name="description" content={dept.seoDescription || dept.description} />
        <link rel="canonical" href={`https://sarvamcare.com/departments/${slug}`} />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 md:py-24 text-center md:text-left">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-[#7E3DB5] blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] uppercase block">
            Specialty Overview
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mt-2 leading-tight">
            {dept.name}
          </h1>
          {dept.tamilName && (
            <p className="text-sm sm:text-base text-indigo-200 mt-1 font-semibold tracking-wide font-sans">
              {dept.tamilName}
            </p>
          )}
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
                <h2 className="font-serif text-2xl sm:text-3.5xl font-bold text-[#32105F]">Clinical Overview</h2>
                <p className="text-sm text-[#665A70] leading-relaxed font-light">
                  {dept.description}
                </p>
              </div>

              {/* Services List */}
              <div className="space-y-6">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#32105F]">Services & Procedures</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {dept.services.map((service, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 rounded-xl border border-[#EDE4F7] bg-[#FAF7FF]/50 hover:bg-white transition-all">
                      <div className="p-1.5 rounded-lg bg-[#32105F] text-[#D8B35A]">
                        <Activity className="h-4 w-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-[#32105F]">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Department specific FAQs */}
              {dept.faq && dept.faq.length > 0 && (
                <div className="space-y-6">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#32105F]">Frequently Asked Questions</h3>
                  <div className="space-y-3">
                    {dept.faq.map((item, index) => (
                      <div key={index} className="border border-[#EDE4F7] rounded-xl overflow-hidden">
                        <button
                          onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                          className="w-full flex items-center justify-between p-4 bg-[#FAF7FF]/50 hover:bg-[#FAF7FF] text-left transition-colors"
                        >
                          <span className="text-xs sm:text-sm font-bold text-[#32105F]">{item.question}</span>
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
                                {item.answer}
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
                <h3 className="font-serif text-lg font-bold text-[#32105F] mb-4">Department Physicians</h3>
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
                            <h4 className="text-xs font-bold text-[#32105F] group-hover:text-[#6D2FA0] transition-colors leading-tight">
                              {doc.name}
                            </h4>
                            <p className="text-[10px] text-[#665A70] font-light truncate mt-0.5">
                              {doc.designation}
                            </p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-[#D8B35A] ml-auto" />
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-[#665A70] font-light">Contact our helpdesk to review active doctors in this area.</p>
                )}
              </div>

              {/* CTAs */}
              <div className="p-6 rounded-2xl border border-[#EDE4F7] bg-white space-y-4 text-center">
                <h4 className="font-serif text-base font-bold text-[#32105F]">Need Medical Advice?</h4>
                <p className="text-xs text-[#665A70] font-light leading-relaxed">
                  Book a priority direct checkup slot or chat with our helpdesk specialist team online.
                </p>
                <div className="space-y-3 pt-2">
                  <a
                    href={`tel:${contactInfo.phoneRaw}`}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#32105F] hover:bg-[#3D176E] transition-all"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call Direct Line</span>
                  </a>
                  <a
                    href={contactInfo.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-green-600 hover:bg-green-700 transition-all"
                  >
                    <MessageCircle className="h-4.5 w-4.5" />
                    <span>WhatsApp Inquiry</span>
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
