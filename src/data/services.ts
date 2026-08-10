export interface ServiceItem {
  name: string;
  departmentId: string;
  category: "neuro" | "trauma" | "craniofacial" | "orthopaedics" | "other";
  description?: string;
}

export const services: ServiceItem[] = [
  // NEURO CENTER SERVICES
  {
    name: "Microscopic & Endoscopic Neurosurgery",
    departmentId: "neurosurgery",
    category: "neuro",
    description: "Surgical solutions for Brain Tumors, Aneurysms & Skull Base Tumors."
  },
  {
    name: "Cerebral Stroke Management",
    departmentId: "neurology",
    category: "neuro",
    description: "Comprehensive multimodal stroke care and urgent neurological intervention."
  },
  {
    name: "Pituitary Adenomas Management",
    departmentId: "neurosurgery",
    category: "neuro",
    description: "Multimodality management for all kinds of pituitary gland tumors."
  },
  {
    name: "Trigeminal Neuralgia Surgery",
    departmentId: "neurosurgery",
    category: "neuro",
    description: "Functional surgery for facial nerve pain and trigeminal neuralgia relief."
  },
  {
    name: "Minimally Invasive Spine Surgery",
    departmentId: "neurosurgery",
    category: "neuro",
    description: "Advanced solutions for spinal tumors and disc diseases with minimal recovery time."
  },
  {
    name: "Spinal Instrumentations",
    departmentId: "neurosurgery",
    category: "neuro",
    description: "Rigid and semi-rigid stabilization implants for spine fractures and deformities."
  },
  {
    name: "Peripheral Nerve Surgery",
    departmentId: "neurosurgery",
    category: "neuro",
    description: "Surgical treatment for nerve entrapments, reconstructions, and traumatic nerve injuries."
  },

  // TRAUMA CARE SERVICES
  {
    name: "Head Injury Care",
    departmentId: "neurosurgery",
    category: "trauma",
    description: "Emergency surgical and medical management of traumatic brain injury and hematomas."
  },
  {
    name: "Craniofacial Injury Care",
    departmentId: "faciomaxillary",
    category: "trauma",
    description: "Reconstruction and stabilization of complex facial skeleton fractures."
  },
  {
    name: "Spine Injury Care",
    departmentId: "neurosurgery",
    category: "trauma",
    description: "Urgent decompression and stabilization of spinal cord trauma."
  },
  {
    name: "Orthopaedic Injuries Care",
    departmentId: "orthopaedics",
    category: "trauma",
    description: "Management of simple, open, and complex fracture cases."
  },
  {
    name: "Chest & Abdominal Injuries Care",
    departmentId: "general-surgery",
    category: "trauma",
    description: "Rapid trauma surgical assessment and intervention for internal organ damage."
  },

  // CRANIOFACIAL / SMILING MONK SERVICES
  {
    name: "Facial Trauma Reconstruction & Revision",
    departmentId: "faciomaxillary",
    category: "craniofacial",
    description: "Treatment for acute injuries and correction of old, incompletely treated facial fractures."
  },
  {
    name: "Craniofacial Syndromic Correction",
    departmentId: "faciomaxillary",
    category: "craniofacial",
    description: "Complex corrective surgeries for congenital facial syndromes."
  },
  {
    name: "Rhinoplasty (Nose Reshaping)",
    departmentId: "plastic-surgery",
    category: "craniofacial",
    description: "Cosmetic and functional nose reconstruction."
  },
  {
    name: "Blepharoplasty (Eyelid Surgery)",
    departmentId: "plastic-surgery",
    category: "craniofacial",
    description: "Surgical aesthetic restoration of upper and lower eyelids."
  },
  {
    name: "Orbital Reconstruction & Enophthalmos Correction",
    departmentId: "faciomaxillary",
    category: "craniofacial",
    description: "Repair of eye socket fractures and retro-positioned eyeballs."
  },
  {
    name: "Cleft Lip & Cleft Palate Reconstruction",
    departmentId: "plastic-surgery",
    category: "craniofacial",
    description: "Cleft correction for patients of all age groups."
  },
  {
    name: "Botox & Fillers",
    departmentId: "plastic-surgery",
    category: "craniofacial",
    description: "Non-surgical aesthetic facial rejuvenations."
  },
  {
    name: "Ear Reshaping (Otoplasty)",
    departmentId: "plastic-surgery",
    category: "craniofacial",
    description: "Corrective ear reshaping for aesthetic restoration."
  },
  {
    name: "Scar Revision",
    departmentId: "plastic-surgery",
    category: "craniofacial",
    description: "Surgical and therapeutic improvement of facial and bodily scars."
  },
  {
    name: "Facial Animation Procedures",
    departmentId: "plastic-surgery",
    category: "craniofacial",
    description: "Surgical recovery procedures for facial nerve palsy (facial paralysis)."
  },

  // ORTHOPAEDICS
  {
    name: "Complex Fracture Management",
    departmentId: "orthopaedics",
    category: "orthopaedics",
    description: "Surgical treatment of severe, multi-fragment fractures and non-unions."
  },
  {
    name: "Joint and Bone Care",
    departmentId: "orthopaedics",
    category: "orthopaedics",
    description: "Diagnostic assessment and treatment for degenerative joint diseases."
  },

  // OTHER SPECIALITIES
  {
    name: "Diabetes & Hypertension Management",
    departmentId: "general-medicine",
    category: "other",
    description: "In-depth physician care for metabolic disorders, diabetes, and blood pressure regulation."
  },
  {
    name: "Chronic Pain Interventions",
    departmentId: "pain-clinic",
    category: "other",
    description: "Advanced pain block injections and therapy for chronic spine and joint pains."
  },
  {
    name: "General Surgical Procedures",
    departmentId: "general-surgery",
    category: "other",
    description: "Standard and keyhole operations for appendicitis, gallstones, and hernias."
  },
  {
    name: "ENT Consultation & Surgery",
    departmentId: "ent",
    category: "other",
    description: "Comprehensive medical and surgical therapy for ear, nose, and throat issues."
  },
  {
    name: "Ophthalmology Consultation",
    departmentId: "ophthalmology",
    category: "other",
    description: "Routine vision testing, prescription, and primary eye care checkups."
  },
  {
    name: "Precision Imaging (32-Slice CT)",
    departmentId: "radiology",
    category: "other",
    description: "High-resolution diagnostics with the GE Revolution Aspire Select CT Scanner."
  },
  {
    name: "Medico-Legal Advisory",
    departmentId: "medico-legal",
    category: "other",
    description: "Expert clinical evaluation and documentation for judicial or statutory requisitions."
  }
];
