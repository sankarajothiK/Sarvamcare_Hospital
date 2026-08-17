export interface ServiceItem {
  name: string;
  tamilName?: string;
  departmentId: string;
  category: "neuro" | "trauma" | "craniofacial" | "orthopaedics" | "other";
  description?: string;
}

export const services: ServiceItem[] = [
  // NEURO CENTER SERVICES
  {
    name: "Microscopic & Endoscopic Neurosurgery",
    tamilName: "நுண்ணோக்கி மற்றும் எண்டோஸ்கோபிக் மூளை அறுவைசிகிச்சை",
    departmentId: "neurosurgery",
    category: "neuro",
    description: "Surgical solutions for Brain Tumors, Aneurysms & Skull Base Tumors."
  },
  {
    name: "Cerebral Stroke Management",
    tamilName: "மூளை பக்கவாதம் மற்றும் அவசர சிகிச்சை மேலாண்மை",
    departmentId: "neurology",
    category: "neuro",
    description: "Comprehensive multimodal stroke care and urgent neurological intervention."
  },
  {
    name: "Pituitary Adenomas Management",
    tamilName: "பிட்யூட்டரி சுரப்பி கட்டிகளுக்கான மருத்துவ சிகிச்சை",
    departmentId: "neurosurgery",
    category: "neuro",
    description: "Multimodality management for all kinds of pituitary gland tumors."
  },
  {
    name: "Trigeminal Neuralgia Surgery",
    tamilName: "முக நரம்பு வலி (டிரைஜெமினல் நியூ neuralgia) அறுவைசிகிச்சை",
    departmentId: "neurosurgery",
    category: "neuro",
    description: "Functional surgery for facial nerve pain and trigeminal neuralgia relief."
  },
  {
    name: "Minimally Invasive Spine Surgery",
    tamilName: "நுண்ணிய துளை தண்டுவட அறுவைசிகிச்சை (குறைந்த ஊடுருவல் சிகிச்சை)",
    departmentId: "neurosurgery",
    category: "neuro",
    description: "Advanced solutions for spinal tumors and disc diseases with minimal recovery time."
  },
  {
    name: "Spinal Instrumentations",
    tamilName: "தண்டுவட எலும்பு முறிவு மற்றும் உள்வைப்பு சீரமைப்பு",
    departmentId: "neurosurgery",
    category: "neuro",
    description: "Rigid and semi-rigid stabilization implants for spine fractures and deformities."
  },
  {
    name: "Peripheral Nerve Surgery",
    tamilName: "புற நரம்பு அறுவைசிகிச்சை மற்றும் நரம்பு காய சிகிச்சை",
    departmentId: "neurosurgery",
    category: "neuro",
    description: "Surgical treatment for nerve entrapments, reconstructions, and traumatic nerve injuries."
  },

  // TRAUMA CARE SERVICES
  {
    name: "Head Injury Care",
    tamilName: "தலைக்காயம் மற்றும் மூளை பாதிப்பு அவசர சிகிச்சை",
    departmentId: "neurosurgery",
    category: "trauma",
    description: "Emergency surgical and medical management of traumatic brain injury and hematomas."
  },
  {
    name: "Craniofacial Injury Care",
    tamilName: "முகம் மற்றும் கபால எலும்பு முறிவு மறுசீரமைப்பு சிகிச்சை",
    departmentId: "faciomaxillary",
    category: "trauma",
    description: "Reconstruction and stabilization of complex facial skeleton fractures."
  },
  {
    name: "Spine Injury Care",
    tamilName: "தண்டுவட காயம் மற்றும் அவசர தண்டுவட சீரமைப்பு சிகிச்சை",
    departmentId: "neurosurgery",
    category: "trauma",
    description: "Urgent decompression and stabilization of spinal cord trauma."
  },
  {
    name: "Orthopaedic Injuries Care",
    tamilName: "எலும்பு முறிவுகள் மற்றும் தசைநார் காயங்களுக்கான சிகிச்சை",
    departmentId: "orthopaedics",
    category: "trauma",
    description: "Management of simple, open, and complex fracture cases."
  },
  {
    name: "Chest & Abdominal Injuries Care",
    tamilName: "நெஞ்சு மற்றும் வயிற்றுப் பகுதி காயங்களுக்கான அவசர அறுவைசிகிச்சை",
    departmentId: "general-surgery",
    category: "trauma",
    description: "Rapid trauma surgical assessment and intervention for internal organ damage."
  },

  // CRANIOFACIAL / SMILING MONK SERVICES
  {
    name: "Facial Trauma Reconstruction & Revision",
    tamilName: "முகக் காயங்கள் மற்றும் பழைய தழும்புகள் மறுசீரமைப்பு சிகிச்சை",
    departmentId: "faciomaxillary",
    category: "craniofacial",
    description: "Treatment for acute injuries and correction of old, incompletely treated facial fractures."
  },
  {
    name: "Craniofacial Syndromic Correction",
    tamilName: "பிறவி முகக் குறைபாடுகள் சீரமைப்பு அறுவைசிகிச்சை",
    departmentId: "faciomaxillary",
    category: "craniofacial",
    description: "Complex corrective surgeries for congenital facial syndromes."
  },
  {
    name: "Rhinoplasty (Nose Reshaping)",
    tamilName: "மூக்கு வடிவமைப்பு அறுவைசிகிச்சை (ரைனோபிளாஸ்டி)",
    departmentId: "plastic-surgery",
    category: "craniofacial",
    description: "Cosmetic and functional nose reconstruction."
  },
  {
    name: "Blepharoplasty (Eyelid Surgery)",
    tamilName: "இமை வடிவமைப்பு அறுவைசிகிச்சை (பிளெபரோபிளாஸ்டி)",
    departmentId: "plastic-surgery",
    category: "craniofacial",
    description: "Surgical aesthetic restoration of upper and lower eyelids."
  },
  {
    name: "Orbital Reconstruction & Enophthalmos Correction",
    tamilName: "கண் குழி எலும்பு முறிவு மற்றும் கண் கோள மறுசீரமைப்பு",
    departmentId: "faciomaxillary",
    category: "craniofacial",
    description: "Repair of eye socket fractures and retro-positioned eyeballs."
  },
  {
    name: "Cleft Lip & Cleft Palate Reconstruction",
    tamilName: "முயல் உதடு மற்றும் பிளவுபட்ட அன்னம் மறுசீரமைப்பு",
    departmentId: "plastic-surgery",
    category: "craniofacial",
    description: "Cleft correction for patients of all age groups."
  },
  {
    name: "Botox & Fillers",
    tamilName: "அறுவைசிகிச்சை இல்லாத முகப் பொலிவு சிகிச்சை (போடாக்ஸ் & ஃபில்லர்ஸ்)",
    departmentId: "plastic-surgery",
    category: "craniofacial",
    description: "Non-surgical aesthetic facial rejuvenations."
  },
  {
    name: "Ear Reshaping (Otoplasty)",
    tamilName: "காது வடிவமைப்பு அறுவைசிகிச்சை (ஓட்டோபிளாஸ்டி)",
    departmentId: "plastic-surgery",
    category: "craniofacial",
    description: "Corrective ear reshaping for aesthetic restoration."
  },
  {
    name: "Scar Revision",
    tamilName: "முக மற்றும் உடல் தழும்புகள் நீக்குதல் மற்றும் சீரமைப்பு",
    departmentId: "plastic-surgery",
    category: "craniofacial",
    description: "Surgical and therapeutic improvement of facial and bodily scars."
  },
  {
    name: "Facial Animation Procedures",
    tamilName: "முக வாதம் (முக பக்கவாதம்) தசை மற்றும் நரம்பு சீரமைப்பு",
    departmentId: "plastic-surgery",
    category: "craniofacial",
    description: "Surgical recovery procedures for facial nerve palsy (facial paralysis)."
  },

  // ORTHOPAEDICS
  {
    name: "Complex Fracture Management",
    tamilName: "சவாலான மற்றும் பல துண்டான எலும்பு முறிவுகள் சிகிச்சை",
    departmentId: "orthopaedics",
    category: "orthopaedics",
    description: "Surgical treatment of severe, multi-fragment fractures and non-unions."
  },
  {
    name: "Joint and Bone Care",
    tamilName: "மூட்டு தேய்மானம் மற்றும் எலும்பு ஆரோக்கிய சிகிச்சை",
    departmentId: "orthopaedics",
    category: "orthopaedics",
    description: "Diagnostic assessment and treatment for degenerative joint diseases."
  },

  // OTHER SPECIALITIES
  {
    name: "Diabetes & Hypertension Management",
    tamilName: "சர்க்கரை நோய் மற்றும் ரத்த அழுத்த மேலாண்மை",
    departmentId: "general-medicine",
    category: "other",
    description: "In-depth physician care for metabolic disorders, diabetes, and blood pressure regulation."
  },
  {
    name: "Chronic Pain Interventions",
    tamilName: "தீராத மூட்டு மற்றும் தண்டுவட வலி நிவாரண ஊசி சிகிச்சை",
    departmentId: "pain-clinic",
    category: "other",
    description: "Advanced pain block injections and therapy for chronic spine and joint pains."
  },
  {
    name: "General Surgical Procedures",
    tamilName: "அப்பன்டிசைட்டிஸ், பித்தப்பை மற்றும் குடலிறக்க பொது அறுவைசிகிச்சை",
    departmentId: "general-surgery",
    category: "other",
    description: "Standard and keyhole operations for appendicitis, gallstones, and hernias."
  },
  {
    name: "ENT Consultation & Surgery",
    tamilName: "காது, மூக்கு, தொண்டை மருத்துவ ஆலோசனை மற்றும் அறுவைசிகிச்சை",
    departmentId: "ent",
    category: "other",
    description: "Comprehensive medical and surgical therapy for ear, nose, and throat issues."
  },
  {
    name: "Ophthalmology Consultation",
    tamilName: "கண் பரிசோதனை மற்றும் முதன்மை கண் பராமரிப்பு",
    departmentId: "ophthalmology",
    category: "other",
    description: "Routine vision testing, prescription, and primary eye care checkups."
  },
  {
    name: "Precision Imaging (32-Slice CT)",
    tamilName: "துல்லியமான 32-ஸ்லைஸ் சிடி ஸ்கேன் பரிசோதனை",
    departmentId: "radiology",
    category: "other",
    description: "High-resolution diagnostics with the GE Revolution Aspire Select CT Scanner."
  },
  {
    name: "Medico-Legal Advisory",
    tamilName: "நீதிமன்ற மற்றும் சட்டப்பூர்வ மருத்துவ சான்றிதழ் ஆலோசனை",
    departmentId: "medico-legal",
    category: "other",
    description: "Expert clinical evaluation and documentation for judicial or statutory requisitions."
  }
];
