import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Image, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeImageIdx, setActiveImageIdx] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const categories = ["all", "Hospital", "Infrastructure", "Doctors", "Technology", "Facilities", "Flyers"];

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
        // Fallback local mock data seed
        const fallbackImages = [
          {
            _id: "img1",
            title: "Hospital Building Entrance",
            description: "SarvamCare Hospital Salem front facade entrance ramp at Mamangam.",
            category: "Hospital",
            tags: ["Infrastructure", "Salem", "Entrance"],
            imageUrl: "/sarvam_building_exterior.png",
            altText: "SarvamCare Hospital Salem Entrance Building"
          },
          {
            _id: "img2",
            title: "Trauma Care & Neuro Center Board",
            description: "Official front signage board showing Trauma Care and Neuro Center specialties.",
            category: "Technology",
            tags: ["TraumaCare", "NeuroCenter", "Salem"],
            imageUrl: "/sarvam_trauma_neuro_board.png",
            altText: "Sarvam Trauma Care and Neuro Center Board"
          }
        ];
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

  return (
    <>
      <Helmet>
        <title>Hospital Gallery & Infrastructure | SarvamCare Hospital Salem</title>
        <meta name="description" content="View images of our intensive care units (ICUs), modular operating theaters, advanced clinical scanning machines, and campus infrastructure." />
        <link rel="canonical" href="https://sarvamcare.com/gallery" />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 md:py-24 text-center md:text-left">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-[#7E3DB5] blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] uppercase block">
            Media Library
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mt-2 leading-tight">
            Sarvam Gallery
          </h1>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto md:mx-0 mt-4.5" />
        </div>
      </section>

      {/* Filter toolbar & Image grid */}
      <section className="bg-white py-16 md:py-24 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-[#32105F] text-white shadow-md"
                    : "bg-[#FAF7FF] border border-[#EDE4F7] text-[#32105F] hover:bg-[#F3EDFA]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="h-8 w-8 border-2 border-brand-purple border-t-brand-gold rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((img, idx) => (
                <div
                  key={img._id}
                  onClick={() => setActiveImageIdx(idx)}
                  className="group relative rounded-2xl overflow-hidden border border-[#EDE4F7] bg-[#FAF7FF] cursor-pointer hover:shadow-lg transition-all duration-300 aspect-[4/3] shadow-sm"
                >
                  <img
                    src={img.imageUrl}
                    alt={img.altText || img.title}
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/sarvam_building_exterior.png";
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120626]/90 via-[#120626]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <span className="text-[9px] text-[#D8B35A] uppercase tracking-wider font-bold mb-1">{img.category}</span>
                    <h4 className="text-sm font-bold text-white leading-tight">{img.title}</h4>
                    <p className="text-[10px] text-indigo-200 font-light truncate mt-1">{img.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && filteredImages.length === 0 && (
            <div className="text-center py-16 border border-dashed border-[#EDE4F7] rounded-3xl max-w-md mx-auto bg-[#FAF7FF] shadow-sm">
              <Image className="h-9 w-9 text-[#D8B35A] mx-auto animate-pulse mb-4" />
              <h3 className="font-serif font-bold text-[#32105F] text-base">No media items</h3>
              <p className="text-xs text-[#665A70] font-light mt-1.5 px-4 leading-relaxed">
                There are currently no gallery pictures matching this category. Please check back later.
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
                alt={filteredImages[activeImageIdx].altText}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/sarvam_building_exterior.png";
                }}
                className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl border border-white/5"
              />
              <div className="text-center max-w-lg">
                <h4 className="text-white font-bold font-serif text-base">{filteredImages[activeImageIdx].title}</h4>
                <p className="text-indigo-200/70 text-xs font-light mt-1">{filteredImages[activeImageIdx].description}</p>
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
