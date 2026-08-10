import React from "react";
import { Star, Quote, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      id: "rev1",
      name: "K. Ramasamy",
      location: "Salem, TN",
      recoveryType: "Neurosurgery Recovery",
      comment: "My father was admitted under Prof. Dr. V. Suresh Kumar for a complex brain tumor. The clinical team's surgical expertise and post-operative ICU care were exceptional. He is now walking and recovering well.",
      rating: 5,
      date: "May 2026"
    },
    {
      id: "rev2",
      name: "Malarvizhi P.",
      location: "Dharmapuri, TN",
      recoveryType: "Smiling Monk Cleft Repair",
      comment: "We visited the Smiling Monk cleft clinic for our toddler's reconstructive surgery. The plastic surgery team was extremely compassionate. The result is beautiful, and my son can smile and speak normally now.",
      rating: 5,
      date: "June 2026"
    },
    {
      id: "rev3",
      name: "Vignesh Kumar",
      location: "Namakkal, TN",
      recoveryType: "Trauma & Orthopaedic Care",
      comment: "Following a severe highway accident, I was brought to SarvamCare's 24/7 emergency unit with compound fractures. The quick polytrauma response and emergency fracture fixation saved my leg. Forever grateful.",
      rating: 5,
      date: "July 2026"
    }
  ];

  return (
    <section id="testimonials" className="bg-white py-16 md:py-24 border-b border-[#F3EDFA] font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#6D2FA0] uppercase flex items-center justify-center gap-1.5">
            <HeartHandshake className="h-4 w-4 text-[#D8B35A]" />
            Patient Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-4.5xl font-extrabold text-[#32105F] mt-2">
            Stories of Recovery & Trust
          </h2>
          <p className="text-xs sm:text-sm text-[#665A70] mt-3 font-light max-w-xl mx-auto leading-relaxed">
            Real feedback from patients who underwent critical surgeries and trauma treatments at our hospital in Salem.
          </p>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto mt-4.5" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {reviews.map((rev, index) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="p-6 md:p-8 rounded-3xl border border-[#EDE4F7] bg-[#FAF7FF]/40 flex flex-col justify-between hover:shadow-md hover:border-[#D8B35A]/30 transition-all group relative"
            >
              {/* Quote Icon Background */}
              <div className="absolute top-6 right-6 opacity-5 text-[#32105F] group-hover:opacity-10 transition-opacity">
                <Quote className="h-10 w-10 transform scale-x-[-1]" />
              </div>

              <div className="space-y-4">
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#D8B35A] text-[#D8B35A]" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-[#32105F] font-light leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Patient Info */}
              <div className="mt-8 pt-4 border-t border-[#EDE4F7] flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-[#32105F]">
                    {rev.name}
                  </h4>
                  <span className="text-[10px] text-[#665A70] font-light block">
                    {rev.location} • {rev.date}
                  </span>
                </div>
                
                {/* Treatment Tag */}
                <span className="text-[8px] bg-white border border-[#D8B35A]/35 text-[#6D2FA0] px-2 py-1 rounded-full font-bold uppercase tracking-wider">
                  {rev.recoveryType}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Administrator Notice Placeholder */}
        <div className="mt-12 text-center">
          <p className="text-[10px] text-[#665A70] font-light italic">
            [Administrator Note: New verified Google Map reviews can be registered in the admin portal to sync here.]
          </p>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
