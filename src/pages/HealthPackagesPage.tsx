import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { ShieldCheck, Heart, MessageCircle } from "lucide-react";
import { contactInfo } from "../data/contact";

interface PackageData {
  _id: string;
  name: string;
  description: string;
  price: number;
  tests: string[];
  consultations: string;
  validity: string;
}

export const HealthPackagesPage: React.FC = () => {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch("/api/packages");
        if (res.ok) {
          const data = await res.json();
          setPackages(data);
        } else {
          throw new Error("Load failed");
        }
      } catch (err) {
        // Fallback local mock data seed
        const fallbackPackages = [
          {
            _id: "pkg1",
            name: "Basic Health Checkup",
            description: "Essential wellness screen analyzing blood sugar, lipid profiles, renal counts, and physician consultation.",
            price: 1499,
            tests: ["Fasting Blood Sugar", "Complete Blood Count", "Lipid Profile", "Renal Function Test", "Urine Analysis"],
            consultations: "General Medicine Physician Checkup",
            validity: "1 Month"
          },
          {
            _id: "pkg2",
            name: "Executive Spine & Joint Screen",
            description: "Advanced diagnostic package assessing spinal bone density, bone markers, calcium levels, and ortho consultations.",
            price: 2999,
            tests: ["Serum Calcium", "Vitamin D3 Test", "Rheumatoid Factor RF", "Digital X-Ray Joint/Spine", "Uric Acid Count"],
            consultations: "Orthopaedics Consultant Consultation",
            validity: "1 Month"
          }
        ];
        setPackages(fallbackPackages);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Preventive Health Checkup Packages | SarvamCare Hospital Salem</title>
        <meta name="description" content="View wellness screening packages, executive spine and joint checkups, test inclusions, pricing, and book your outpatient clinic slot." />
        <link rel="canonical" href="https://sarvamcare.com/health-packages" />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 md:py-24 text-center md:text-left">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-[#7E3DB5] blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] uppercase block">
            Preventive Care
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mt-2 leading-tight">
            Preventive Health Packages
          </h1>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto md:mx-0 mt-4.5" />
        </div>
      </section>

      {/* Packages Grid */}
      <section className="bg-[#FAF7FF] py-16 md:py-24 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="h-8 w-8 border-2 border-brand-purple border-t-brand-gold rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {packages.map(pkg => (
                <div key={pkg._id} className="flex flex-col justify-between p-6 md:p-8 rounded-3xl border border-[#EDE4F7] bg-white shadow-sm hover:shadow-md transition-all">
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start gap-4 pb-4 border-b border-[#F3EDFA]">
                      <div>
                        <h3 className="text-lg font-bold text-[#32105F]">{pkg.name}</h3>
                        <p className="text-xs text-[#665A70] font-light mt-1">{pkg.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs text-[#6D2FA0] font-bold block uppercase tracking-wider">Price</span>
                        <span className="text-2xl font-extrabold text-[#32105F] font-serif">₹{pkg.price}</span>
                      </div>
                    </div>

                    {/* Tests List */}
                    <div className="py-6 space-y-4">
                      <span className="text-[10px] text-[#6D2FA0] font-bold uppercase tracking-wider block">Diagnostics Included ({pkg.tests.length})</span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#665A70]">
                        {pkg.tests.map((test, idx) => (
                          <li key={idx} className="flex items-center gap-2 font-light">
                            <ShieldCheck className="h-4 w-4 text-[#D8B35A]" />
                            <span>{test}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Consultations */}
                    {pkg.consultations && (
                      <div className="p-4 rounded-xl bg-[#FAF7FF] border border-[#EDE4F7] text-xs text-[#32105F] font-semibold flex items-center gap-2">
                        <Heart className="h-4 w-4 text-[#D8B35A] fill-[#D8B35A]/15" />
                        <span>{pkg.consultations}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-8 pt-6 border-t border-[#F3EDFA] flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://wa.me/${contactInfo.whatsapp.numberRaw}?text=${encodeURIComponent(`Hello SarvamCare Hospital, I want to book the ${pkg.name} package (₹${pkg.price}).`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-green-600 hover:bg-green-700 transition-all"
                    >
                      <MessageCircle className="h-4.5 w-4.5" />
                      <span>Book on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default HealthPackagesPage;
