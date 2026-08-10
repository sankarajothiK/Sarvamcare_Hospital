import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Briefcase, MapPin, ClipboardCheck } from "lucide-react";
import { contactInfo } from "../data/contact";

interface CareerData {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

export const CareersPage: React.FC = () => {
  const [jobs, setJobs] = useState<CareerData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/careers");
        if (res.ok) {
          const data = await res.json();
          setJobs(data);
        } else {
          throw new Error("Load failed");
        }
      } catch (err) {
        // Fallback local mock data seed
        const fallbackJobs = [
          {
            _id: "job1",
            title: "ICU Staff Nurse",
            department: "Critical Care",
            location: "Salem, Tamil Nadu",
            type: "Full-Time (Shift-based)",
            description: "Responsible for monitoring, managing, and delivering immediate clinical therapy to patients inside the trauma polytrauma ICU.",
            requirements: ["B.Sc Nursing or GNM", "1-3 years clinical experience in ICU wards", "Active state registry registration"]
          },
          {
            _id: "job2",
            title: "Radiology Technician",
            department: "Diagnostics",
            location: "Salem, Tamil Nadu",
            type: "Full-Time",
            description: "Coordinate immediate CT scans, handle diagnostic X-Ray imaging, and manage documentation.",
            requirements: ["Diploma or Degree in Medical Radiography Technology", "Knowledge of safety protocols", "Familiarity with digital scanners"]
          }
        ];
        setJobs(fallbackJobs);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Careers & Recruitment | SarvamCare Hospital Salem</title>
        <meta name="description" content="Join our medical staff team. Search nursing vacancies, radiology technician jobs, medical officer positions, and submit applications directly." />
        <link rel="canonical" href="https://sarvamcare.com/careers" />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 md:py-24 text-center md:text-left">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-[#7E3DB5] blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] uppercase block">
            Join Our Team
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mt-2 leading-tight">
            Careers at SarvamCare
          </h1>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto md:mx-0 mt-4.5" />
        </div>
      </section>

      {/* Careers List */}
      <section className="bg-[#FAF7FF] py-16 md:py-24 font-sans">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="h-8 w-8 border-2 border-brand-purple border-t-brand-gold rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-6">
              {jobs.map(job => (
                <div key={job._id} className="p-6 md:p-8 rounded-3xl border border-[#EDE4F7] bg-white shadow-sm hover:shadow-md transition-all space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#32105F]">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-3.5 mt-1.5 text-xs text-[#665A70] font-light">
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4 text-[#D8B35A]" />
                          <span>{job.department}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-[#D8B35A]" />
                          <span>{job.location}</span>
                        </span>
                        <span className="bg-[#FAF7FF] text-[#6D2FA0] border border-[#EDE4F7] px-2.5 py-0.5 rounded-full font-bold uppercase text-[9px] tracking-wide">
                          {job.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#665A70] leading-relaxed font-light font-sans pt-2">
                    {job.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] text-[#32105F] font-bold uppercase tracking-wider block">Requirements:</span>
                    <ul className="space-y-1.5 text-xs text-[#665A70] font-light">
                      {job.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ClipboardCheck className="h-4 w-4 text-[#D8B35A] shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#F3EDFA] flex justify-end">
                    <a
                      href={`mailto:${contactInfo.email}?subject=Job%20Application%20-%20${encodeURIComponent(job.title)}`}
                      className="px-6 py-2.5 rounded-full bg-[#32105F] hover:bg-[#3D176E] text-white text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      Apply via Email
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && jobs.length === 0 && (
            <div className="text-center py-16 border border-dashed border-[#EDE4F7] rounded-3xl bg-white shadow-sm">
              <Briefcase className="h-9 w-9 text-[#D8B35A] mx-auto animate-pulse mb-4" />
              <h3 className="font-serif font-bold text-[#32105F] text-base">No Open Vacancies</h3>
              <p className="text-xs text-[#665A70] font-light mt-1.5 px-4">
                We are not actively recruiting right now. Please email your CV to **{contactInfo.email}** to be considered for future openings.
              </p>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default CareersPage;
