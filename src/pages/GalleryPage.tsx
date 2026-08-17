import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Image, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../utils/LanguageContext";

interface GalleryItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  imageUrl: string;
  altText: string;
}

export const GalleryPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeImageIdx, setActiveImageIdx] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const categories = ["all", "Hospital", "Infrastructure", "Doctors", "Technology", "Facilities", "Flyers"];

  const fallbackImages = [
    {
      _id: "img2",
      title: "Main Hospital Entrance Ramp",
      description: "Designed for premium accessibility with dedicated wheelchair-friendly ramps and safe patient drop-off zones.",
      category: "Infrastructure",
      tags: ["Ramp", "Infrastructure", "Access"],
      imageUrl: "/sarvam_building_exterior.png",
      altText: "Main Hospital Entrance Ramp"
    },
    {
      _id: "img9",
      title: "Trauma Care & Neuro Center Board",
      description: "Official signage board highlighting the neurosurgery and trauma care specializations of SarvamCare Hospital.",
      category: "Technology",
      tags: ["TraumaCare", "NeuroCenter", "Salem"],
      imageUrl: "/sarvam_trauma_neuro_board.png",
      altText: "Trauma Care & Neuro Center Board"
    },
    {
      _id: "img10",
      title: "Senior Clinical Consultants Panel",
      description: "Experienced neurosurgeons, orthopaedicians, and critical care specialists during clinical reviews.",
      category: "Doctors",
      tags: ["Consultants", "Doctors", "Team"],
      imageUrl: "/sarvam_logo.jpg",
      altText: "Senior Consultants Panel"
    },
    {
      _id: "img11",
      title: "SarvamCare Hospital Sunset Campus",
      description: "Exterior view of the state-of-the-art building situated on Salem Bangalore Highway.",
      category: "Hospital",
      tags: ["Campus", "Exterior", "Sunset"],
      imageUrl: "/sarvam_hero_bg.jpg",
      altText: "SarvamCare Hospital Sunset Campus"
    },
    {
      _id: "img12",
      title: "Neuron Center Precision & Horology",
      description: "Inspiring microscopic precision in neurosurgery, reflecting high-quality horological watchmaking standards.",
      category: "Flyers",
      tags: ["Flyer", "Neurosurgery", "Precision"],
      imageUrl: "/gallery/flyers/flyer_1.jpg",
      altText: "Neuron Center Precision & Horology"
    },
    {
      _id: "img13",
      title: "Back Pain Awareness & Care",
      description: "Advanced spinal assessments and minimally invasive neurosurgical evaluations for persistent back pain.",
      category: "Flyers",
      tags: ["Flyer", "Spine", "BackPain"],
      imageUrl: "/gallery/flyers/flyer_2.jpg",
      altText: "Back Pain Awareness & Care"
    },
    {
      _id: "img14",
      title: "Timely Brain & Spine Interventions",
      description: "Clinical guidelines on the importance of early diagnosis and specialized microscopic surgeries.",
      category: "Flyers",
      tags: ["Flyer", "Clinical", "Surgery"],
      imageUrl: "/gallery/flyers/flyer_3.jpg",
      altText: "Timely Brain & Spine Interventions"
    },
    {
      _id: "img15",
      title: "Trigeminal Neuralgia Specialized Clinic",
      description: "Comprehensive multidisciplinary center specializing in microvascular decompression and nerve pain relief.",
      category: "Flyers",
      tags: ["Flyer", "Neuralgia", "NervePain"],
      imageUrl: "/gallery/flyers/flyer_4.jpg",
      altText: "Trigeminal Neuralgia Specialized Clinic"
    },
    {
      _id: "img16",
      title: "Premium Patient Ward Room",
      description: "Spacious and comfortable private room designed for patient safety and quick recovery.",
      category: "Hospital",
      tags: ["Ward", "PatientRoom", "Facility"],
      imageUrl: "/gallery/hospital/hospital_1.jpg",
      altText: "Premium Patient Ward Room"
    },
    {
      _id: "img17",
      title: "Advanced Outpatient Consulting Room",
      description: "Quiet private space for patient reviews and clinical consultations.",
      category: "Hospital",
      tags: ["OPD", "Consultation", "Doctor"],
      imageUrl: "/gallery/hospital/hospital_2.jpg",
      altText: "Advanced Outpatient Consulting Room"
    },
    {
      _id: "img18",
      title: "Dedicated Clinical Diagnostics Area",
      description: "Equipped with state-of-the-art diagnostic tools for rapid assessments.",
      category: "Hospital",
      tags: ["Diagnostics", "Clinical", "Scanner"],
      imageUrl: "/gallery/hospital/hospital_3.jpg",
      altText: "Dedicated Clinical Diagnostics Area"
    },
    {
      _id: "img19",
      title: "Hospital Corridors & Patient Lounge",
      description: "Well-lit, wide, and clean corridors for quick patient transfers and accessibility.",
      category: "Hospital",
      tags: ["Corridor", "Lounge", "Infrastructure"],
      imageUrl: "/gallery/hospital/hospital_4.jpg",
      altText: "Hospital Corridors & Patient Lounge"
    },
    {
      _id: "img20",
      title: "Surgical Intensive Care Unit (ICU) Entrance",
      description: "Controlled sterile access to critical care units for patient safety.",
      category: "Hospital",
      tags: ["ICU", "CriticalCare", "Sterile"],
      imageUrl: "/gallery/hospital/hospital_5.jpg",
      altText: "Surgical Intensive Care Unit (ICU) Entrance"
    },
    {
      _id: "img21",
      title: "Emergency Trauma Resuscitation Room",
      description: "Equipped with immediate response equipment for acute patient management.",
      category: "Hospital",
      tags: ["Trauma", "Emergency", "Resuscitation"],
      imageUrl: "/gallery/hospital/hospital_6.jpg",
      altText: "Emergency Trauma Resuscitation Room"
    },
    {
      _id: "img22",
      title: "Advanced Sterile Operation Theatre",
      description: "Calibrated micro-surgical instruments and positive airflow systems for zero infection risk.",
      category: "Hospital",
      tags: ["OT", "Surgical", "Theater"],
      imageUrl: "/gallery/hospital/hospital_7.jpg",
      altText: "Advanced Sterile Operation Theatre"
    },
    {
      _id: "img23",
      title: "Main Hospital Entrance Lobby",
      description: "Welcoming reception and patient assistance helpdesk.",
      category: "Hospital",
      tags: ["Lobby", "Reception", "Entrance"],
      imageUrl: "/gallery/hospital/hospital_8.jpg",
      altText: "Main Hospital Entrance Lobby"
    },
    {
      _id: "img24",
      title: "High-Definition Diagnostic Imaging Suite",
      description: "Equipped with high-precision scans for brain, spine, and joint diagnostics.",
      category: "Hospital",
      tags: ["Imaging", "Scans", "Diagnostics"],
      imageUrl: "/gallery/hospital/hospital_9.jpg",
      altText: "High-Definition Diagnostic Imaging Suite"
    },
    {
      _id: "img25",
      title: "Specialized Orthopaedic Rehabilitation Unit",
      description: "Post-operative patient mobilization area and physical therapy rooms.",
      category: "Hospital",
      tags: ["Rehab", "Orthopaedic", "Therapy"],
      imageUrl: "/gallery/hospital/hospital_10.jpg",
      altText: "Specialized Orthopaedic Rehabilitation Unit"
    }
  ];

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("/api/gallery");
        if (res.ok) {
          const data = await res.json();
          setImages(data);
        } else {
          throw new Error("Load failed");
        }
      } catch (err) {
        setImages(fallbackImages);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
    window.scrollTo(0, 0);
  }, []);

  const filteredImages = selectedCategory === "all" 
    ? images 
    : images.filter(img => img.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeImageIdx === null) return;
    setActiveImageIdx((activeImageIdx + 1) % filteredImages.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeImageIdx === null) return;
    setActiveImageIdx((activeImageIdx - 1 + filteredImages.length) % filteredImages.length);
  };

  const getTranslatedTitle = (img: GalleryItem) => {
    if (img._id === "img2") return t("gal_img_ramp_title");
    if (img._id === "img9") return t("gal_img_ct_title");
    if (img._id === "img10") return t("gal_img_logo_title");
    if (img._id === "img11") return t("gal_img_main_title");
    if (img._id === "img12") return t("gal_img_flyer1_title");
    if (img._id === "img13") return t("gal_img_flyer2_title");
    if (img._id === "img14") return t("gal_img_flyer3_title");
    if (img._id === "img15") return t("gal_img_flyer4_title");
    if (img._id === "img16") return t("gal_img_hosp1_title");
    if (img._id === "img17") return t("gal_img_hosp2_title");
    if (img._id === "img18") return t("gal_img_hosp3_title");
    if (img._id === "img19") return t("gal_img_hosp4_title");
    if (img._id === "img20") return t("gal_img_hosp5_title");
    if (img._id === "img21") return t("gal_img_hosp6_title");
    if (img._id === "img22") return t("gal_img_hosp7_title");
    if (img._id === "img23") return t("gal_img_hosp8_title");
    if (img._id === "img24") return t("gal_img_hosp9_title");
    if (img._id === "img25") return t("gal_img_hosp10_title");
    return img.title;
  };

  const getTranslatedDesc = (img: GalleryItem) => {
    if (img._id === "img2") return t("gal_img_ramp_desc");
    if (img._id === "img9") return t("gal_img_ct_desc");
    if (img._id === "img10") return t("gal_img_logo_desc");
    if (img._id === "img11") return t("gal_img_main_desc");
    if (img._id === "img12") return t("gal_img_flyer1_desc");
    if (img._id === "img13") return t("gal_img_flyer2_desc");
    if (img._id === "img14") return t("gal_img_flyer3_desc");
    if (img._id === "img15") return t("gal_img_flyer4_desc");
    if (img._id === "img16") return t("gal_img_hosp1_desc");
    if (img._id === "img17") return t("gal_img_hosp2_desc");
    if (img._id === "img18") return t("gal_img_hosp3_desc");
    if (img._id === "img19") return t("gal_img_hosp4_desc");
    if (img._id === "img20") return t("gal_img_hosp5_desc");
    if (img._id === "img21") return t("gal_img_hosp6_desc");
    if (img._id === "img22") return t("gal_img_hosp7_desc");
    if (img._id === "img23") return t("gal_img_hosp8_desc");
    if (img._id === "img24") return t("gal_img_hosp9_desc");
    if (img._id === "img25") return t("gal_img_hosp10_desc");
    return img.description;
  };

  return (
    <>
      <Helmet>
        <title>{language === "en" ? "Hospital Gallery & Infrastructure | SarvamCare Hospital Salem" : "விபத்து தீவிர சிகிச்சை புகைப்படங்கள் & கட்டமைப்பு | சர்வம் கேர் மருத்துவமனை சேலம்"}</title>
        <meta name="description" content="View images of our intensive care units (ICUs), modular operating theaters, advanced clinical scanning machines, and campus infrastructure." />
        <link rel="canonical" href="https://sarvamcarehospital.in/gallery" />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 md:py-24 text-center md:text-left">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-[#7E3DB5] blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] uppercase block">
            {t("gallery_eyebrow")}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mt-2 leading-tight">
            {t("gallery_title")}
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200/70 mt-3 font-light max-w-xl leading-relaxed">
            {t("gallery_desc")}
          </p>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto md:mx-0 mt-4.5" />
        </div>
      </section>

      {/* Main Section */}
      <section className="bg-white py-16 md:py-24 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-300 ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? "bg-[#32105F] text-white shadow-md"
                    : "bg-[#FAF7FF] border border-[#EDE4F7] text-[#32105F] hover:bg-[#F3EDFA]"
                }`}
              >
                {cat === "all" ? t("gallery_all") : t(`gallery_${cat.toLowerCase()}`)}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="h-8 w-8 border-2 border-brand-purple border-t-brand-gold rounded-full animate-spin" />
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 md:space-y-0">
              {filteredImages.map((img, idx) => (
                <div
                  key={img._id}
                  onClick={() => setActiveImageIdx(idx)}
                  className="break-inside-avoid mb-6 group relative rounded-2xl overflow-hidden border border-[#EDE4F7] bg-[#FAF7FF] cursor-pointer hover:shadow-lg transition-all duration-300 shadow-sm"
                >
                  <img
                    src={img.imageUrl}
                    alt={img.altText || getTranslatedTitle(img)}
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/sarvam_building_exterior.png";
                    }}
                    className="w-full h-auto block group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120626]/90 via-[#120626]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <span className="text-[9px] text-[#D8B35A] uppercase tracking-wider font-bold mb-1">
                      {img.category === "craniofacial" ? (language === "ta" ? "புன்னகைத் துறவி" : "Smiling Monk") : t(`gallery_${img.category.toLowerCase()}`)}
                    </span>
                    <h4 className="text-sm font-bold text-white leading-tight">
                      {getTranslatedTitle(img)}
                    </h4>
                    {getTranslatedDesc(img) && (
                      <p className="text-[10px] text-indigo-200 font-light mt-1 max-h-12 overflow-hidden leading-relaxed">
                        {getTranslatedDesc(img)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && filteredImages.length === 0 && (
            <div className="text-center py-16 border border-dashed border-[#EDE4F7] rounded-3xl max-w-md mx-auto bg-[#FAF7FF] shadow-sm">
              <Image className="h-9 w-9 text-[#D8B35A] mx-auto animate-pulse mb-4" />
              <h3 className="font-serif font-bold text-[#32105F] text-base">{t("gallery_no_media")}</h3>
              <p className="text-xs text-[#665A70] font-light mt-1.5 px-4 leading-relaxed">
                {t("gallery_no_media_desc")}
              </p>
            </div>
          )}

        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImageIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImageIdx(null)}
            className="fixed inset-0 bg-[#090214]/95 flex items-center justify-center z-[99999] p-4"
          >
            <button
              onClick={() => setActiveImageIdx(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Slider navigation */}
            <button
              onClick={handlePrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors shrink-0"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[80vh] flex flex-col items-center justify-center space-y-4"
            >
              <img
                src={filteredImages[activeImageIdx].imageUrl}
                alt={getTranslatedTitle(filteredImages[activeImageIdx])}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/sarvam_building_exterior.png";
                }}
                className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl border border-white/5"
              />
              <div className="text-center max-w-lg">
                <h4 className="text-white font-bold font-serif text-base">
                  {getTranslatedTitle(filteredImages[activeImageIdx])}
                </h4>
                <p className="text-indigo-200/70 text-xs font-light mt-1">
                  {getTranslatedDesc(filteredImages[activeImageIdx])}
                </p>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors shrink-0"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryPage;
