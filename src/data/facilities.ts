export interface FacilityItem {
  id: string;
  name: string;
  category: string;
  iconName: string;
  description: string;
}

export const facilities: FacilityItem[] = [
  {
    id: "ct-scan",
    name: "New GE Revolution Aspire Select 32 Slice CT",
    category: "Diagnostics",
    iconName: "Scan",
    description: "High-speed, high-resolution diagnostic imaging providing clear cross-sectional analysis for rapid head and body trauma assessment."
  },
  {
    id: "operating-theatres",
    name: "2 State of Art Modular Operation Theatres",
    category: "Surgical Suite",
    iconName: "Building",
    description: "Equipped with positive pressure airflow, HEPA filtration, and modular wall systems to guarantee maximum sterility and patient safety during major surgeries."
  },
  {
    id: "surgical-microscope",
    name: "Carl Zeiss Neuro Surgical Operating Microscope",
    category: "Precision Equipment",
    iconName: "ZoomIn",
    description: "Provides crystal clear illumination and magnification essential for intricate cranial neurosurgery, vascular anastomoses, and spinal microsurgeries."
  },
  {
    id: "endoscopic-system",
    name: "Storz Endoscopic System",
    category: "Precision Equipment",
    iconName: "Tv",
    description: "German-engineered HD imaging endoscopic system for keyhole skull base procedures, intraventricular neurosurgery, and sinus corrections."
  },
  {
    id: "electrocautery",
    name: "Alsa Bologna Italian Electrocautery",
    category: "Surgical Equipment",
    iconName: "Zap",
    description: "Precision electrosurgical unit from Italy offering highly regulated cutting and coagulation settings to minimize blood loss during operations."
  },
  {
    id: "hybrid-icu",
    name: "Dedicated 14 Beds Hybrid ICU",
    category: "Critical Care",
    iconName: "HeartPulse",
    description: "A continuous-monitoring critical care ward staffed by experienced intensivist-anaesthetists to support post-surgical recovery and severe trauma victims."
  }
];
