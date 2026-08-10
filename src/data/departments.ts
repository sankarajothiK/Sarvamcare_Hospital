export interface Department {
  id: string;
  name: string;
  iconName: string; // Map to Lucide icon components
  description?: string;
}

export const departments: Department[] = [
  {
    id: "neurosurgery",
    name: "Neurosurgery",
    iconName: "Brain",
    description: "Advanced surgical treatment for brain tumors, aneurysms, skull base lesions, spinal disorders, and nerve injuries."
  },
  {
    id: "neurology",
    name: "Neurology",
    iconName: "Activity",
    description: "Comprehensive care for stroke management, neurological illnesses, neuropathies, and nerve-related disorders."
  },
  {
    id: "psychiatry",
    name: "Psychiatry",
    iconName: "Smile",
    description: "Expert diagnosis and support for mental health, behavioral, and cognitive disorders."
  },
  {
    id: "plastic-surgery",
    name: "Plastic Surgery",
    iconName: "Sparkles",
    description: "Reconstructive procedures, scar revisions, microvascular surgery, and aesthetic treatments."
  },
  {
    id: "orthopaedics",
    name: "Orthopaedics",
    iconName: "Bone",
    description: "Comprehensive care for simple and complex bone fractures, joint problems, and orthopedic trauma."
  },
  {
    id: "faciomaxillary",
    name: "Facio Maxillary Surgery",
    iconName: "Stethoscope",
    description: "Surgical corrections for acute craniofacial injuries, facial trauma reconstructions, and deformities."
  },
  {
    id: "pain-clinic",
    name: "Pain Clinic",
    iconName: "HeartPulse",
    description: "Multidisciplinary management for chronic pain syndromes, spine pain, and nerve pains."
  },
  {
    id: "anaesthesia",
    name: "Anaesthesia & Critical Care",
    iconName: "Syringe",
    description: "Advanced perioperative care and dedicated intensivist support for the hybrid ICU."
  },
  {
    id: "ent",
    name: "ENT",
    iconName: "Volume2",
    description: "Specialized care for disorders of the ear, nose, throat, head, and neck."
  },
  {
    id: "ophthalmology",
    name: "Ophthalmology",
    iconName: "Eye",
    description: "Diagnostic, clinical, and surgical treatments for all vision and eye disorders."
  },
  {
    id: "general-medicine",
    name: "General Medicine",
    iconName: "Pill",
    description: "Primary and specialized diagnosis and treatment for complex diseases including diabetes and hypertension."
  },
  {
    id: "general-surgery",
    name: "General Surgery",
    iconName: "ShieldAlert",
    description: "Comprehensive surgical interventions for abdominal, chest, and soft tissue pathologies."
  },
  {
    id: "radiology",
    name: "Radiology",
    iconName: "Scan",
    description: "Precision medical imaging including high-resolution 32 Slice CT scanning for diagnostic accuracy."
  },
  {
    id: "medico-legal",
    name: "Medico-Legal Consultant",
    iconName: "FileText",
    description: "Consultation and legal-medical advisory services for clinical evaluation."
  }
];
