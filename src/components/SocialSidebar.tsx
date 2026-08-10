import React from "react";
import { MapPin, MessageCircle } from "lucide-react";
import { contactInfo } from "../data/contact";

export const SocialSidebar: React.FC = () => {
  const socialLinks = [
    {
      name: "Facebook",
      icon: () => (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
      url: contactInfo.socialLinks.facebook || "https://facebook.com",
      color: "bg-[#32105F] text-[#D8B35A] border-[#D8B35A]/20 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
      label: "Facebook"
    },
    {
      name: "Instagram",
      icon: () => (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
      url: contactInfo.socialLinks.instagram || "https://instagram.com",
      color: "bg-[#32105F] text-[#D8B35A] border-[#D8B35A]/20 hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:text-white hover:border-transparent",
      label: "Instagram"
    },
    {
      name: "YouTube",
      icon: () => (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
        </svg>
      ),
      url: contactInfo.socialLinks.youtube || "https://youtube.com",
      color: "bg-[#32105F] text-[#D8B35A] border-[#D8B35A]/20 hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]",
      label: "YouTube"
    },
    {
      name: "Location",
      icon: () => <MapPin className="h-5 w-5" />,
      url: contactInfo.googleMapsUrl,
      color: "bg-[#32105F] text-[#D8B35A] border-[#D8B35A]/20 hover:bg-[#EA4335] hover:text-white hover:border-[#EA4335]",
      label: "Find Us"
    },
    {
      name: "WhatsApp",
      icon: () => <MessageCircle className="h-5 w-5" />,
      url: contactInfo.whatsapp.url,
      color: "bg-[#32105F] text-[#D8B35A] border-[#D8B35A]/20 hover:bg-[#25D366] hover:text-white hover:border-[#25D366]",
      label: "WhatsApp"
    }
  ];

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col space-y-1 select-none pointer-events-none">
      {socialLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`pointer-events-auto flex items-center gap-3 pl-3.5 py-3.5 border-y border-r transition-all duration-300 ease-in-out shadow-lg rounded-r-2xl group overflow-hidden w-12 hover:w-36 ${link.color}`}
            title={link.name}
          >
            {/* Icon - always visible on left */}
            <div className="shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Icon />
            </div>

            {/* Label - visible on hover */}
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {link.label}
            </span>
          </a>
        );
      })}
    </div>
  );
};

export default SocialSidebar;
