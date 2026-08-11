import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Calendar } from "lucide-react";
import { contactInfo } from "../data/contact";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Specialities", href: "/specialities" },
    { name: "Doctors", href: "/doctors" },
    { name: "Centers", href: "/centers" },
    { name: "Services", href: "/services" },
    { name: "Facilities", href: "/facilities" },
    { name: "Gallery", href: "/gallery" },
    { name: "Health Packages", href: "/packages" },
    { name: "Blog", href: "/blog" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Patient Info", href: "/patient-information" },
    { name: "Contact", href: "/contact" }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    setIsMenuOpen(false);
    
    if (href.startsWith("#")) {
      e.preventDefault();
      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: href } });
      } else {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          const offset = 90;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });
        }
      }
    }
  };

  return (
    <>
      {/* 1. Floating Menu Toggle Button (Top-Right Circular Trigger) */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-6 right-6 z-50 flex items-center justify-center h-12 w-12 rounded-full bg-[#32105F] border-2 border-[#D8B35A] text-[#D8B35A] hover:bg-[#3D176E] shadow-2xl hover:scale-105 active:scale-95 transition-all pointer-events-auto cursor-pointer"
        aria-label="Toggle Menu"
      >
        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>


      {/* Backdrop Overlay when Vertical Dropdown is active */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-[#120524]/40 backdrop-blur-sm z-30 pointer-events-auto"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* 2. Slide Down Vertical Navigation Panel (No logo, stacked column layout) */}
      <div
        className={`fixed right-6 z-40 transition-all duration-300 transform w-[260px] ${
          isMenuOpen 
            ? "top-20 opacity-100 scale-100 pointer-events-auto" 
            : "top-14 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="p-5 bg-[#240d47]/95 border-2 border-[#D8B35A]/35 shadow-2xl rounded-3xl backdrop-blur-md flex flex-col space-y-4">
          
          {/* Menu Section Title */}
          <div className="pb-2.5 border-b border-white/10 flex items-center justify-between">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#D8B35A] opacity-75">Clinical Menu</span>
            <span className="text-[8px] text-indigo-300/60 font-semibold">Mamangam, Salem</span>
          </div>

          {/* Navigation Links (Strictly vertical single-column list) */}
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link, idx) => {
              const isAnchor = link.href.startsWith("#");
              return (
                <div key={link.name} className="flex flex-col">
                  {isAnchor ? (
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-left py-1.5 text-indigo-100 hover:text-[#D8B35A] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 group"
                    >
                      <span>{link.name}</span>
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-left py-1.5 text-indigo-100 hover:text-[#D8B35A] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 group"
                    >
                      <span>{link.name}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA Book Appointment Button */}
          <div className="pt-3 border-t border-white/10">
            <Link
              to="/appointment"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#32105F] bg-[#D8B35A] hover:bg-[#F3D98A] transition-all duration-300 shadow-md active:scale-95"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Book Appointment</span>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;
