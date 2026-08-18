import React from "react";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { SarvamCareLogo } from "./BrandLogos";
import { contactInfo } from "../data/contact";
import { useLanguage } from "../utils/LanguageContext";

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-[#32105F] border-t-2 border-[#D8B35A]/50 text-indigo-100 font-sans relative overflow-hidden">
      {/* Background radial soft light */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-[#7E3DB5]/10 blur-[60px] pointer-events-none z-0" />

      {/* Top Footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12">
          
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center">
              <SarvamCareLogo className="h-11 w-11" showText={true} lightTheme={false} />
            </div>
            <p className="text-xs sm:text-sm text-indigo-200/85 leading-relaxed max-w-sm">
              {t("footer_desc")}
            </p>
            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={contactInfo.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-green-600 hover:border-green-600 transition-all duration-300"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              {contactInfo.socialLinks.facebook && (
                <a
                  href={contactInfo.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-300"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              )}
              {contactInfo.socialLinks.instagram && (
                <a
                  href={contactInfo.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-pink-600 hover:border-pink-600 transition-all duration-300"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
              )}
              {contactInfo.socialLinks.youtube && (
                <a
                  href={contactInfo.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-white font-bold text-sm sm:text-base tracking-wider uppercase">{t("quick_links")}</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/" className="text-indigo-200/80 hover:text-[#D8B35A] transition-colors duration-200">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-indigo-200/80 hover:text-[#D8B35A] transition-colors duration-200">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link to="/specialities" className="text-indigo-200/80 hover:text-[#D8B35A] transition-colors duration-200">
                  {t("departments")}
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-indigo-200/80 hover:text-[#D8B35A] transition-colors duration-200">
                  {t("doctors")}
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="text-indigo-200/80 hover:text-[#D8B35A] transition-colors duration-200">
                  {t("facilities")}
                </Link>
              </li>
              <li>
                <Link to="/patient-information" className="text-indigo-200/80 hover:text-[#D8B35A] transition-colors duration-200">
                  {t("patient_info")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Specialties */}
          <div className="space-y-4">
            <h3 className="font-serif text-white font-bold text-sm sm:text-base tracking-wider uppercase">
              {language === "en" ? "Key Centers" : "முக்கிய பிரிவுகள்"}
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/centers/neuro-center" className="text-indigo-200/80 hover:text-[#D8B35A] transition-colors duration-200">
                  {language === "en" ? "Neurosurgery Center" : "நரம்பியல் அறுவைசிகிச்சை மையம்"}
                </Link>
              </li>
              <li>
                <Link to="/centers/trauma-care" className="text-indigo-200/80 hover:text-[#D8B35A] transition-colors duration-200">
                  {language === "en" ? "Polytrauma ICU" : "தீவிர விபத்து சிகிச்சை பிரிவு"}
                </Link>
              </li>
              <li>
                <Link to="/centers/craniofacial" className="text-indigo-200/80 hover:text-[#D8B35A] transition-colors duration-200">
                  {language === "en" ? "Craniofacial Clinic" : "முக மறுசீரமைப்பு பிரிவு"}
                </Link>
              </li>
              <li>
                <Link to="/appointment" className="text-indigo-200/80 hover:text-[#D8B35A] transition-colors duration-200">
                  {t("book_appointment")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-serif text-white font-bold text-sm sm:text-base tracking-wider uppercase">{t("contact_us")}</h3>
            <ul className="space-y-3.5 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-5 w-5 text-[#D8B35A] shrink-0 mt-0.5" />
                <span className="text-indigo-100/90 leading-relaxed">
                  {language === "ta" ? "மாமாங்கம், சேலம், தமிழ்நாடு, இந்தியா." : contactInfo.address.full}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="h-5 w-5 text-[#D8B35A] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href={`tel:${contactInfo.phoneRaw}`} className="text-indigo-100/90 hover:text-white font-semibold transition-colors duration-200 block">
                    {contactInfo.phone}
                  </a>
                  <a href="tel:+919080509321" className="text-indigo-100/90 hover:text-white font-semibold transition-colors duration-200 block">
                    90805 09321
                  </a>
                  <a href="tel:04272334434" className="text-indigo-100/90 hover:text-white font-semibold transition-colors duration-200 block">
                    0427-2334434
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-5 w-5 text-[#D8B35A] shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="text-indigo-100/90 hover:text-white transition-colors duration-200 break-all">
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-[#1e093b] border-t border-white/5 py-6 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-indigo-200/60 gap-3">
          <p>{t("copyright")}</p>
          <div className="flex items-center space-x-4">
            <Link to="/privacy-policy" className="hover:text-white transition-colors duration-200">
              {language === "en" ? "Privacy Policy" : "தனியுரிமைக் கொள்கை"}
            </Link>
            <span>•</span>
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors duration-200">
              {language === "en" ? "Terms & Conditions" : "விதிமுறைகள் & நிபந்தனைகள்"}
            </Link>
            <span>•</span>
            <Link to="/disclaimer" className="hover:text-white transition-colors duration-200">
              {language === "en" ? "Medical Disclaimer" : "மருத்துவப் பொறுப்புத் துறப்பு"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
