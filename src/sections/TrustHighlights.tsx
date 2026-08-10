import React from "react";
import { Stethoscope, Scan, ShieldAlert, HeartPulse } from "lucide-react";

export const TrustHighlights: React.FC = () => {
  const points = [
    {
      label: "Experienced Specialists",
      sub: "Neurosurgery & Multispeciality Staff",
      icon: Stethoscope
    },
    {
      label: "Advanced Medical Technology",
      sub: "32 Slice CT & Zeiss Microscope",
      icon: Scan
    },
    {
      label: "24/7 Emergency Care",
      sub: "Dedicated Polytrauma & Hybrid ICU",
      icon: ShieldAlert
    },
    {
      label: "Patient-Centred Healthcare",
      sub: "Ethical & Compassionate Treatment",
      icon: HeartPulse
    }
  ];

  return (
    <div className="bg-[#FAF7FF] text-[#24152F] py-7 border-b border-[#D8B35A]/20 relative z-10 font-sans shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center lg:text-left divide-y lg:divide-y-0 lg:divide-x divide-[#32105F]/10">
          {points.map((pt, i) => {
            const Icon = pt.icon;
            return (
              <div
                key={pt.label}
                className={`flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 px-4 ${
                  i > 0 ? "pt-4 sm:pt-0" : ""
                }`}
              >
                <div className="p-2 rounded-xl bg-[#F3EDFA] text-[#D8B35A] shrink-0 border border-[#D8B35A]/20 shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-serif font-bold text-[#32105F] text-sm sm:text-base leading-tight">
                    {pt.label}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-[#665A70] font-light leading-none">
                    {pt.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default TrustHighlights;
