import React from "react";
import { Phone, MapPin, ShieldAlert, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { contactInfo } from "../data/contact";

export const Announcement: React.FC = () => {
  return (
    <div id="home" className="relative z-50 bg-[#090314] border-b border-brand-purple-light/10 text-indigo-200 text-xs py-3 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        
        {/* Left: Emergency Status & Beacon */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/35">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[10px] tracking-wider font-extrabold text-red-200 uppercase flex items-center gap-1">
              <ShieldAlert className="h-3 w-3" />
              <span>24/7 Trauma & Emergency Active</span>
            </span>
          </span>
          
          <span className="hidden sm:flex items-center gap-1.5 text-xs text-indigo-200/80 font-light">
            <MapPin className="h-3.5 w-3.5 text-brand-purple-light" />
            <span>Salem Bangalore Highway, Mamangam, Salem</span>
          </span>
        </div>

        {/* Right: Helpline High-Contrast Box */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-indigo-300 font-medium tracking-wide uppercase">Emergency Helpline:</span>
          <a
            href={`tel:${contactInfo.phoneRaw}`}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-[#120626] font-bold text-xs hover:bg-indigo-50 shadow-md shadow-brand-purple/20 transition-all duration-200 active:scale-95"
          >
            <Phone className="h-3 w-3 text-brand-purple animate-pulse" />
            <span>{contactInfo.phone}</span>
          </a>
          <Link
            to="/login"
            title="Admin Portal"
            className="p-1.5 rounded-full hover:bg-white/15 text-indigo-200 hover:text-white transition-colors duration-200 flex items-center justify-center"
          >
            <Lock className="h-3.5 w-3.5 text-[#D8B35A]" />
          </Link>
        </div>

      </div>
    </div>
  );
};
export default Announcement;
