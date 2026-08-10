import React from "react";
import { MapPin, Navigation } from "lucide-react";
import { contactInfo } from "../data/contact";

export const LocationMap: React.FC = () => {
  return (
    <section id="contact" className="bg-[#FAF7FF] py-16 border-b border-[#EDE4F7] font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#6D2FA0] uppercase">
            Find Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4.5xl font-extrabold text-[#32105F] mt-2">
            Hospital Location & Directions
          </h2>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto mt-4.5" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Address Card */}
          <div className="lg:col-span-4 flex flex-col justify-between p-7 rounded-3xl bg-white border border-[#EDE4F7] shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#FAF7FF] text-[#D8B35A] border border-[#D8B35A]/25">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#32105F]">SarvamCare Hospital</h3>
                  <p className="text-[9px] text-[#665A70] font-bold uppercase tracking-widest">Mamangam, Salem</p>
                </div>
              </div>

              <div className="h-[1px] bg-[#F3EDFA]" />

              <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-[#665A70] font-light">
                <p>
                  Our medical campus is situated directly on the <strong>Salem-Bangalore National Highway</strong> at Mamangam, making it highly accessible for emergency response ambulance routes.
                </p>
                <div className="p-4 bg-[#FAF7FF] rounded-xl border-l-2 border-[#D8B35A] font-semibold text-[#32105F] text-xs sm:text-sm shadow-inner">
                  {contactInfo.address.full}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href={contactInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-xs font-bold text-white bg-[#32105F] hover:bg-[#3D176E] border border-[#D8B35A]/25 active:scale-95 transition-all duration-200 shadow-md hover-sweep"
              >
                <Navigation className="h-4.5 w-4.5 text-white animate-pulse" />
                <span>Get Directions on Google Maps</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps IFrame */}
          <div className="lg:col-span-8 h-[320px] sm:h-[400px] rounded-3xl border border-[#EDE4F7] overflow-hidden shadow-inner bg-slate-200 relative">
            <iframe
              title="SarvamCare Hospital Location Map"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src="https://maps.google.com/maps?q=SarvamCare%20Hospital%20Mamangam%20Salem&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 grayscale contrast-125 focus:outline-none"
              loading="lazy"
            />
          </div>

        </div>
      </div>
    </section>
  );
};
export default LocationMap;
