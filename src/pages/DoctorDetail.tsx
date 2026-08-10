import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Phone, MessageCircle, Award, ArrowLeft, Heart, CheckCircle2 } from "lucide-react";
import { contactInfo } from "../data/contact";
import { doctors as staticDoctors } from "../data/doctors";

interface DoctorData {
  _id: string;
  name: string;
  qualification: string;
  designation: string;
  departmentId: string;
  biography?: string;
  expertise?: string[];
  status?: string;
}

export const DoctorDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [doctor, setDoctor] = useState<DoctorData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch("/api/doctors");
        if (res.ok) {
          const doctorsList: DoctorData[] = await res.json();
          // Find by matching slugified name
          const matched = doctorsList.find(doc => {
            const docSlug = doc.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            return docSlug === slug;
          });
          if (matched) {
            setDoctor(matched);
          } else {
            throw new Error("Doctor not found in API list");
          }
        } else {
          throw new Error("API call failed");
        }
      } catch (err) {
        // Fallback to static doctors registry
        const mappedDocs: DoctorData[] = staticDoctors.map((doc) => {
          let designation = "Consultant Specialist";
          let bioText = doc.bio || `${doc.name} is a senior consultant specialist at SarvamCare Hospital in Salem, Tamil Nadu, providing comprehensive medical care.`;
          let expertiseArr = ["Outpatient Consultations", "Clinical Evaluation", "Precision Therapeutics"];
          
          if (doc.id === "dr-v-suresh-kumar") {
            designation = "Chief Consultant Neurosurgeon & HOD";
            expertiseArr = ["Brain Tumor Resections", "Vascular Aneurysm Clipping", "Minimally Invasive Spine Surgery", "Skull Base Surgery"];
          } else if (doc.specialties.includes("neurosurgery")) {
            designation = "Consultant Neurosurgeon";
            expertiseArr = ["Microsurgical Spine Procedures", "Peripheral Nerve Decompressions", "Brain Tumors Management"];
          } else if (doc.specialties.includes("neurology")) {
            designation = "Consultant Neurologist";
            expertiseArr = ["Stroke Intervention Clinic", "EEG Diagnostics", "Epilepsy Management", "Neuropathies Therapy"];
          } else if (doc.specialties.includes("plastic-surgery")) {
            designation = "Consultant Reconstructive Surgeon";
            expertiseArr = ["Microvascular Soft Tissue Transfers", "Rhinoplasty & Scar Revision", "Cleft Lip & Palate Correction"];
          } else if (doc.specialties.includes("faciomaxillary")) {
            designation = "Consultant Facio Maxillary Surgeon";
            expertiseArr = ["Facial Skeletal Fracture Repair", "Orbital Reconstructions", "Craniofacial Syndromic Alignment"];
          } else if (doc.specialties.includes("orthopaedics")) {
            designation = "Consultant Orthopaedic Surgeon";
            expertiseArr = ["Complex Compound Fracture Fixation", "Joint Replacement Surgery", "Spine Trauma Stabilization"];
          } else if (doc.specialties.includes("psychiatry")) {
            designation = "Consultant Psychiatrist";
            expertiseArr = ["Cognitive Behavioral Support", "Mental Health Diagnostics", "Geriatric Psychiatry"];
          } else if (doc.specialties.includes("ent")) {
            designation = "Consultant ENT Surgeon";
            expertiseArr = ["Ear Reshaping (Otoplasty)", "Head & Neck Surgery", "Sinus Endoscopy"];
          } else if (doc.specialties.includes("ophthalmology")) {
            designation = "Consultant Ophthalmologist";
            expertiseArr = ["Primary Vision Diagnostics", "Eye Laceration Repairs", "Aesthetic Blepharoplasty"];
          } else if (doc.specialties.includes("general-medicine")) {
            designation = "Consultant General Physician";
            expertiseArr = ["Diabetes Care Management", "Hypertension Regulation", "Chronic Disease Therapies"];
          } else if (doc.specialties.includes("general-surgery")) {
            designation = "Consultant General Surgeon";
            expertiseArr = ["Laproscopic Appendectomies", "Abdominal Trauma Laparotomy", "Soft Tissue Biopsies"];
          } else if (doc.specialties.includes("radiology")) {
            designation = "Consultant Radiologist";
            expertiseArr = ["High-Resolution 32-Slice CT Imaging", "Digital Ultrasound", "X-ray Diagnostics"];
          }

          return {
            _id: doc.id,
            name: doc.name,
            qualification: doc.qualification,
            designation,
            departmentId: doc.specialties[0] || "general-medicine",
            biography: bioText,
            expertise: expertiseArr
          };
        });

        const matched = mappedDocs.find(doc => {
          const docSlug = doc.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
          return docSlug === slug;
        });

        setDoctor(matched || null);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7FF]">
        <div className="h-10 w-10 border-2 border-brand-purple border-t-brand-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF7FF] px-4 text-center">
        <h2 className="font-serif text-3xl font-bold text-[#32105F] mb-2">Physician Profile Not Found</h2>
        <p className="text-xs text-[#665A70] mb-6">We couldn't retrieve records for this consultant.</p>
        <Link to="/doctors" className="px-6 py-2.5 bg-[#32105F] text-white rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Specialists Directory</span>
        </Link>
      </div>
    );
  }

  const deptSlug = doctor.departmentId;

  return (
    <>
      <Helmet>
        <title>{`${doctor.name} | ${doctor.qualification} - SarvamCare Hospital`}</title>
        <meta name="description" content={`Consult ${doctor.name}, ${doctor.designation} at SarvamCare Salem. Read qualifications, clinical expertise, and schedule priority slots.`} />
        <link rel="canonical" href={`https://sarvamcare.com/doctors/${slug}`} />
      </Helmet>

      {/* Hero section */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 md:py-24">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-[#7E3DB5] blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/doctors"
            className="inline-flex items-center gap-1.5 text-xs text-[#D8B35A] hover:text-white font-bold uppercase tracking-wider mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Specialists</span>
          </Link>
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] uppercase block">
            Specialist Spotlight
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mt-2 leading-tight">
            {doctor.name}
          </h1>
          <p className="text-sm sm:text-base text-indigo-200 mt-1 font-semibold tracking-wide">
            {doctor.designation}
          </p>
          <div className="h-[2px] w-14 bg-[#D8B35A] mt-4.5" />
        </div>
      </section>

      {/* Main content */}
      <section className="bg-white py-16 md:py-24 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Avatar details */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="p-8 rounded-3xl border border-[#EDE4F7] bg-[#FAF7FF] w-full text-center space-y-6 shadow-sm">
                
                {/* Avatar circle */}
                <div className="h-32 w-32 rounded-full border-2 border-[#D8B35A] p-1.5 bg-[#32105F] flex items-center justify-center shadow-lg relative mx-auto overflow-hidden">
                  {doctor.profileImage ? (
                    <img
                      src={doctor.profileImage}
                      alt={doctor.name}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full rounded-full bg-white/5 flex items-center justify-center font-serif text-white font-bold text-3xl select-none">
                      {doctor.name.split(" ").slice(-2).map(n => n[0]).join("")}
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-[#D8B35A] text-[#32105F] border border-[#32105F] z-10">
                    <Award className="h-5 w-5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#32105F] leading-tight">{doctor.name}</h3>
                  <p className="text-xs text-[#6D2FA0] font-semibold tracking-wide">{doctor.qualification}</p>
                </div>

                <div className="pt-4 border-t border-[#EDE4F7] space-y-3">
                  <span className="text-[10px] text-[#665A70] font-bold uppercase tracking-wider block">Specialty Area</span>
                  <Link
                    to={`/departments/${deptSlug}`}
                    className="inline-block text-xs font-bold text-[#32105F] hover:text-[#6D2FA0] bg-white border border-[#EDE4F7] px-4 py-2 rounded-full transition-all shadow-sm"
                  >
                    Explore Department
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Biography / Details */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Bio */}
              {doctor.biography && (
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl sm:text-3.5xl font-bold text-[#32105F] flex items-center gap-2">
                    <Heart className="h-5 w-5 text-[#D8B35A] fill-[#D8B35A]/10" />
                    <span>Clinical Profile</span>
                  </h2>
                  <p className="text-sm text-[#665A70] leading-relaxed font-light font-sans">
                    {doctor.biography}
                  </p>
                </div>
              )}

              {/* Area of Expertise */}
              {doctor.expertise && doctor.expertise.length > 0 && (
                <div className="space-y-5">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#32105F]">Core Expertise</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {doctor.expertise.map((exp, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-xl border border-[#EDE4F7] bg-[#FAF7FF]/40">
                        <CheckCircle2 className="h-4.5 w-4.5 text-[#D8B35A] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-semibold text-[#32105F]">{exp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Appointment CTA Card */}
              <div className="p-6 md:p-8 rounded-3xl border border-[#EDE4F7] bg-[#FAF7FF] space-y-5 shadow-sm">
                <div className="space-y-1">
                  <h4 className="font-serif text-lg font-bold text-[#32105F]">Schedule Consultation</h4>
                  <p className="text-xs text-[#665A70] font-light leading-relaxed">
                    Directly coordinate with {doctor.name}'s clinic helpdesk for immediate slot confirmation.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <a
                    href={`tel:${contactInfo.phoneRaw}`}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#32105F] hover:bg-[#3D176E] transition-all shadow-md"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call Direct Line</span>
                  </a>
                  <a
                    href={contactInfo.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-green-600 hover:bg-green-700 transition-all shadow-md"
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

export default DoctorDetail;
