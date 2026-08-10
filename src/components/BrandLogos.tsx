import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  lightTheme?: boolean;
}

// 1. SarvamCare Logo (Lotus + S branding in Royal Purple, Lavender & Champagne Gold)
export const SarvamCareLogo: React.FC<LogoProps> = ({ className = "h-12 w-12", showText = true, lightTheme = false }) => {
  return (
    <div className="flex items-center gap-3 select-none">
      <img
        src="/sarvam_logo.jpg"
        alt="SarvamCare Lotus Logo"
        className={`${className} rounded-full object-cover shadow-sm border border-[#D8B35A]/30`}
      />
      
      {showText && (
        <div className="flex flex-col">
          <span className={`font-serif text-lg font-extrabold leading-none tracking-wide transition-colors duration-300 ${
            lightTheme ? "text-[#32105F]" : "text-white"
          }`}>
            SARVAM<span className={lightTheme ? "text-[#7E3DB5]" : "text-[#D8B35A]"}>Care</span>
          </span>
          <span className={`text-[8px] font-sans tracking-[0.25em] uppercase mt-0.5 leading-none font-semibold ${
            lightTheme ? "text-[#665A70]" : "text-indigo-200"
          }`}>
            Hospital Pvt. Ltd.
          </span>
        </div>
      )}
    </div>
  );
};

// 2. Neuro Center Logo (Laurel wreath & brain spine segments in Royal Purple & Gold)
export const NeuroCenterLogo: React.FC<LogoProps> = ({ className = "h-14 w-14", showText = true, lightTheme = false }) => {
  return (
    <div className="flex items-center gap-3 select-none">
      <svg
        className={`${className} overflow-visible`}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shield background - Deep Royal Purple */}
        <circle cx="60" cy="60" r="54" fill="#32105F" stroke="url(#goldNCGradient)" strokeWidth="3" />
        <circle cx="60" cy="60" r="48" stroke="#7E3DB5" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.4" />

        {/* Stylized Brain Silhouette Profile */}
        <path
          d="M50 40 C43 40 37 45 37 53 C37 57 39 60 41 62 C38 65 37 69 37 73 C37 81 44 86 52 86 C55 86 58 84 60 82 C62 84 65 86 68 86 C76 86 83 81 83 73 C83 69 82 65 79 62 C81 60 83 57 83 53 C83 45 77 40 70 40 C68 40 66 41 64 42 C62 41 61 40 60 40 C59 40 58 41 56 42 C54 41 52 40 50 40 Z"
          fill="url(#ncBrainGradient)"
          fillOpacity="0.4"
        />

        {/* Central Spine line - Gold */}
        <path d="M60 42 L60 88" stroke="#D8B35A" strokeWidth="3.2" strokeLinecap="round" />
        
        {/* Spine bone segments - White */}
        <path d="M54 48 H66 M52 56 H68 M52 64 H68 M53 72 H67 M55 80 H65 M57 86 H63" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />

        {/* Brain Left & Right Hemispheres / Neural Node Overlay */}
        <circle cx="48" cy="48" r="2.5" fill="#D8B35A" />
        <circle cx="72" cy="48" r="2.5" fill="#D8B35A" />
        <circle cx="45" cy="60" r="2" fill="#ffffff" />
        <circle cx="75" cy="60" r="2" fill="#ffffff" />
        <circle cx="48" cy="72" r="2.5" fill="#D8B35A" />
        <circle cx="72" cy="72" r="2.5" fill="#D8B35A" />
        
        {/* Laurel Wreath decoration - Gold */}
        <path d="M22 60 C22 43 36 29 55 27 M98 60 C98 43 84 29 65 27" stroke="#D8B35A" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.5" />

        <defs>
          <linearGradient id="goldNCGradient" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F3D98A" />
            <stop offset="100%" stopColor="#C89B3C" />
          </linearGradient>
          <linearGradient id="ncBrainGradient" x1="37" y1="40" x2="83" y2="86" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7E3DB5" />
            <stop offset="100%" stopColor="#6D2FA0" />
          </linearGradient>
        </defs>
      </svg>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`font-serif text-base font-extrabold leading-none tracking-wide ${
            lightTheme ? "text-[#32105F]" : "text-white"
          }`}>
            NEURO <span className={lightTheme ? "text-[#7E3DB5]" : "text-[#D8B35A]"}>Center</span>
          </span>
          <span className={`text-[8px] font-sans tracking-[0.18em] uppercase mt-0.5 leading-none font-semibold ${
            lightTheme ? "text-[#665A70]" : "text-indigo-200"
          }`}>
            For Brain, Spine & Nerves
          </span>
        </div>
      )}
    </div>
  );
};

// 3. Sarvam Trauma Care Logo (Trauma Shield in Royal Purple & Gold accent)
export const TraumaCareLogo: React.FC<LogoProps> = ({ className = "h-14 w-14", showText = true, lightTheme = false }) => {
  return (
    <div className="flex items-center gap-3 select-none">
      <svg
        className={`${className} overflow-visible`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shield background - Deep Royal Purple */}
        <path
          d="M50 5 L85 20 V50 C85 72 70 88 50 95 C30 88 15 72 15 50 V20 L50 5 Z"
          fill="#32105F"
          stroke="url(#goldLogoGradient)"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />

        {/* Shield Inner Border */}
        <path
          d="M50 12 L77 24 V48 C77 66 65 80 50 86 C35 80 23 66 23 48 V24 L50 12 Z"
          stroke="#7E3DB5"
          strokeWidth="1.2"
          strokeOpacity="0.4"
          strokeLinejoin="round"
        />

        {/* Inner Lotus Petal Overlay */}
        <path
          d="M50 32 C54 40 60 48 64 54 C58 58 42 58 36 54 C40 48 46 40 50 32 Z"
          fill="#7E3DB5"
          fillOpacity="0.25"
        />

        {/* Stylized letter 'S' */}
        <path
          d="M43 42 C43 39 45 37 50 37 C54 37 57 39 57 42 C57 46 52 48 48 50 C44 52 41 55 41 60 C41 65 45 68 50 68 C55 68 59 65 59 61"
          stroke="#ffffff"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Medical Cross - Champagne Gold */}
        <path d="M50 20 V26 M47 23 H53" stroke="#D8B35A" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`font-serif text-base font-extrabold leading-none tracking-wide ${
            lightTheme ? "text-[#32105F]" : "text-white"
          }`}>
            SARVAM <span className={lightTheme ? "text-[#7E3DB5]" : "text-[#D8B35A]"}>Trauma</span> Care
          </span>
          <span className={`text-[8px] font-sans tracking-[0.2em] uppercase mt-0.5 leading-none font-semibold ${
            lightTheme ? "text-[#665A70]" : "text-indigo-200"
          }`}>
            Comprehensive Trauma Center
          </span>
        </div>
      )}
    </div>
  );
};

// 4. Smiling Monk Cranio Facial Clinic Logo (Serene face with lotus bloom in Lavender, White & Gold)
export const SmilingMonkLogo: React.FC<LogoProps> = ({ className = "h-14 w-14", showText = true, lightTheme = false }) => {
  return (
    <div className="flex items-center gap-3 select-none">
      <svg
        className={`${className} overflow-visible`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft Lavender Background Circle */}
        <circle cx="50" cy="50" r="46" fill="#3D176E" stroke="url(#goldLogoGradient)" strokeWidth="3" />
        <circle cx="50" cy="50" r="42" stroke="#7E3DB5" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.3" />

        {/* Facial Silhouette Profile */}
        <path
          d="M60 22 C55 22 51 25 50 30 C49 32 49 34 49 36 C49 37 48 38 47 38 C45 38 43 37 42 35 C40 32 37 30 33 30 C27 30 22 35 22 41 C22 52 32 63 50 78 C68 63 78 52 78 41 C78 35 73 30 67 30 C63 30 60 32 58 35 L60 22 Z"
          fill="#7E3DB5"
          fillOpacity="0.25"
        />

        {/* Clean Line Art of Serene Face profile */}
        <path
          d="M48 33 C48 33 53 34 54 39 C55 43 53 45 56 46 C59 47 62 44 63 46 C64 48 61 51 60 54 C59 57 61 59 59 62 C57 65 54 65 52 68 C50 70 47 70 45 70"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Lotus bloom - Champagne Gold */}
        <path
          d="M32 65 C32 58 38 52 45 52 C45 52 47 58 42 63 C39 66 32 65 32 65 Z"
          fill="#D8B35A"
          stroke="#ffffff"
          strokeWidth="1"
        />
        <path
          d="M45 52 C52 52 58 58 58 65 C58 65 51 66 48 63 C43 58 45 52 45 52 Z"
          fill="#D8B35A"
          stroke="#ffffff"
          strokeWidth="1"
        />
        <path
          d="M45 44 C48 50 48 58 45 65 C42 58 42 50 45 44 Z"
          fill="#ffffff"
          stroke="#D8B35A"
          strokeWidth="1"
        />
      </svg>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`font-serif text-base font-extrabold leading-none tracking-wide ${
            lightTheme ? "text-[#32105F]" : "text-white"
          }`}>
            Smiling Monk<span className={lightTheme ? "text-[#7E3DB5]" : "text-[#D8B35A]"}>®</span>
          </span>
          <span className={`text-[8px] font-sans tracking-[0.16em] uppercase mt-0.5 leading-none font-semibold ${
            lightTheme ? "text-[#665A70]" : "text-indigo-200"
          }`}>
            Cranio Facial Clinic
          </span>
        </div>
      )}
    </div>
  );
};
