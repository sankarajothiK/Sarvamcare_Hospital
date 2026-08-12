export interface FacilityItem {
  id: string;
  name: string;
  category: string;
  iconName: string;
  description: string;
  imageUrl: string;
}

export const facilities: FacilityItem[] = [
  {
    id: "hospital-exterior",
    name: "Modern Hospital Entrance & Facade",
    category: "Infrastructure",
    iconName: "Building",
    description: "Designed for premium accessibility with dedicated emergency drop-off zones, patient access ramps, and clean architectural design.",
    imageUrl: "/facilities/hospital_exterior.jpg"
  },
  {
    id: "operating-theatres",
    name: "State-of-the-Art Modular Operating Suites",
    category: "Surgical Suite",
    iconName: "Building",
    description: "Equipped with positive pressure airflow, HEPA filtration, and modular wall systems to guarantee maximum sterility and patient safety during major surgeries.",
    imageUrl: "/facilities/operating_theatre.jpg"
  },
  {
    id: "hybrid-icu",
    name: "Dedicated 14-Bed Hybrid ICU Unit",
    category: "Critical Care",
    iconName: "HeartPulse",
    description: "Continuous-monitoring critical care suite staffed by experienced intensivist-anaesthetists to support post-surgical recovery and severe trauma victims.",
    imageUrl: "/facilities/icu_unit.jpg"
  },
  {
    id: "ct-scan",
    name: "High-Speed 32-Slice CT Scan Center",
    category: "Diagnostics",
    iconName: "Scan",
    description: "High-speed, high-resolution diagnostic imaging providing clear cross-sectional analysis for rapid head, neck, and body trauma assessment.",
    imageUrl: "/facilities/diagnostic_imaging.jpg"
  },
  {
    id: "modern-laboratory",
    name: "Advanced Automated Pathology Lab",
    category: "Diagnostics",
    iconName: "Scan",
    description: "Automated clinical testing analyzers and equipment for fast, highly accurate blood panel results, diagnostics, and microbiotic screening.",
    imageUrl: "/facilities/modern_laboratory.jpg"
  },
  {
    id: "patient-suites",
    name: "Premium Private Patient Rooms & Suites",
    category: "Patient Rooms",
    iconName: "HeartPulse",
    description: "Spacious private recovery rooms equipped with modern patient beds, warm wooden accents, natural lighting, and nursing call support.",
    imageUrl: "/facilities/patient_room.jpg"
  }
];

