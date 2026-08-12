import React from "react";
import { Compass, Calendar, Phone } from "lucide-react";
import { contactInfo } from "../data/contact";

export const Hero: React.FC = () => {
  const handleScroll = (href: string) => {
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = 90;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-white w-full pt-[72px] md:pt-[88px] font-sans">
      
      {/* Responsive Banner Picture */}
      <picture className="w-full block select-none pointer-events-none">
        {/* Desktop View (screens >= 1024px) */}
        <source media="(min-width: 1024px)" srcSet="/background.png" />
        {/* Tablet View (screens 640px to 1023px) */}
        <source media="(min-width: 640px)" srcSet="/mobile_bg_2.png" />
        {/* Mobile View (screens < 640px) */}
        <img 
          src="/mobile_bg.png" 
          alt="SarvamCare Hospital Hero Banner" 
          className="w-full h-auto block"
        />
      </picture>

      {/* Three Floating Bottom Circular Actions (Exactly Replicating Salem Saravana Hospital UI) */}
      <div className="absolute bottom-8 left-0 right-0 z-20 pointer-events-none hidden md:block">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full h-12">
          
          {/* Middle Circle (Grid Menu, placed exactly on the S-curve line!) */}
          <button 
            onClick={() => handleScroll("#departments")}
            className="absolute left-[53.2%] -translate-x-1/2 bottom-0 pointer-events-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#32105F] border-2 border-[#D8B35A] text-[#D8B35A] hover:bg-[#3D176E] shadow-xl hover:scale-110 active:scale-95 transition-all"
            title="Departments Directory"
          >
            <Compass className="h-5 w-5" />
          </button>

          {/* Left Circle (Book Appointment) */}
          <button 
            onClick={() => handleScroll("#book-appointment")}
            className="absolute left-[57.8%] -translate-x-1/2 bottom-0 pointer-events-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#D8B35A] border-2 border-white text-[#32105F] hover:bg-[#C89B3C] shadow-xl hover:scale-110 active:scale-95 transition-all"
            title="Book Appointment"
          >
            <Calendar className="h-5 w-5" />
          </button>

          {/* Right Circle (Emergency Call) */}
          <a 
            href={`tel:${contactInfo.emergencyPhone}`}
            className="absolute left-[62.4%] -translate-x-1/2 bottom-0 pointer-events-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-600 border-2 border-white text-white hover:bg-red-700 shadow-xl hover:scale-110 active:scale-95 transition-all"
            title="Emergency Helpline"
          >
            <Phone className="h-5 w-5" />
          </a>

        </div>
      </div>

    </section>
  );
};

export default Hero;
