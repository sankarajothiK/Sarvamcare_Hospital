export interface ServiceItem {
  name: string;
  tamilName?: string;
  departmentId: string;
  category: "neuro" | "trauma" | "craniofacial" | "orthopaedics" | "other";
  description?: string;
  tamilDescription?: string;
}

export const services: ServiceItem[] = [
  // NEURO CENTER SERVICES
  {
    name: "Microscopic & Endoscopic Neurosurgery",
    tamilName: "நுண்ணோக்கி மற்றும் எண்டோஸ்கோபிக் மூளை அறுவைசிகிச்சை",
    departmentId: "neurosurgery",
    category: "neuro",
    description: "Surgical solutions for Brain Tumors, Aneurysms & Skull Base Tumors.",
    tamilDescription: "மூளைக் கட்டிகள், இரத்தக் குழாய் வீக்கம் மற்றும் மண்டை ஓடு கட்டிகளுக்கான அறுவைசிகிச்சை தீர்வுகள்."
  },
  {
    name: "Cerebral Stroke Management",
    tamilName: "மூளை பக்கவாதம் மற்றும் அவசர சிகிச்சை மேலாண்மை",
    departmentId: "neurology",
    category: "neuro",
    description: "Comprehensive multimodal stroke care and urgent neurological intervention.",
    tamilDescription: "பக்கவாதத்திற்கான விரிவான பல்துறை சிகிச்சை மற்றும் அவசர நரம்பியல் தலையீடு."
  },
  {
    name: "Pituitary Adenomas Management",
    tamilName: "பிட்யூட்டரி சுரப்பி கட்டிகளுக்கான மருத்துவ சிகிச்சை",
    departmentId: "neurosurgery",
    category: "neuro",
    description: "Multimodality management for all kinds of pituitary gland tumors.",
    tamilDescription: "அனைத்து வகையான பிட்யூட்டரி சுரப்பி கட்டிகளுக்கான பல்துறை மேலாண்மை."
  },
  {
    name: "Trigeminal Neuralgia Surgery",
    tamilName: "முக நரம்பு வலி (டிரைஜெமினல் நியூ neuralgia) அறுவைசிகிச்சை",
    departmentId: "neurosurgery",
    category: "neuro",
    description: "Functional surgery for facial nerve pain and trigeminal neuralgia relief.",
    tamilDescription: "முக நரம்பு வலி மற்றும் டிரைஜெமினல் நியூ neuralgia நிவாரணத்திற்கான செயல்பாட்டு அறுவைசிகிச்சை."
  },
  {
    name: "Minimally Invasive Spine Surgery",
    tamilName: "நுண்ணிய துளை தண்டுவட அறுவைசிகிச்சை (குறைந்த ஊடுருவல் சிகிச்சை)",
    departmentId: "neurosurgery",
    category: "neuro",
    description: "Advanced solutions for spinal tumors and disc diseases with minimal recovery time.",
    tamilDescription: "குறைந்த மீட்பு நேரத்துடன் தண்டுவட கட்டிகள் மற்றும் வட்டு நோய்களுக்கான மேம்பட்ட தீர்வுகள்."
  },
  {
    name: "Spinal Instrumentations",
    tamilName: "தண்டுவட எலும்பு முறிவு மற்றும் உள்வைப்பு சீரமைப்பு",
    departmentId: "neurosurgery",
    category: "neuro",
    description: "Rigid and semi-rigid stabilization implants for spine fractures and deformities.",
    tamilDescription: "தண்டுவட எலும்பு முறிவுகள் மற்றும் குறைபாடுகளுக்கான நிலையான உள்வைப்பு சீரமைப்பு."
  },
  {
    name: "Peripheral Nerve Surgery",
    tamilName: "புற நரம்பு அறுவைசிகிச்சை மற்றும் நரம்பு காய சிகிச்சை",
    departmentId: "neurosurgery",
    category: "neuro",
    description: "Surgical treatment for nerve entrapments, reconstructions, and traumatic nerve injuries.",
    tamilDescription: "நரம்பு அழுத்தங்கள், மறுசீரமைப்புகள் மற்றும் நரம்பு காயங்களுக்கான அறுவைசிகிச்சை."
  },

  // TRAUMA CARE SERVICES
  {
    name: "Head Injury Care",
    tamilName: "தலைக்காயம் மற்றும் மூளை பாதிப்பு அவசர சிகிச்சை",
    departmentId: "neurosurgery",
    category: "trauma",
    description: "Emergency surgical and medical management of traumatic brain injury and hematomas.",
    tamilDescription: "மூளை காயம் மற்றும் இரத்தக் கட்டுகளுக்கான அவசர அறுவைசிகிச்சை மற்றும் மருத்துவ மேலாண்மை."
  },
  {
    name: "Craniofacial Injury Care",
    tamilName: "முகம் மற்றும் கபால எலும்பு முறிவு மறுசீரமைப்பு சிகிச்சை",
    departmentId: "faciomaxillary",
    category: "trauma",
    description: "Reconstruction and stabilization of complex facial skeleton fractures.",
    tamilDescription: "முகம் மற்றும் கபால எலும்பு முறிவுகளுக்கான மறுசீரமைப்பு மற்றும் நிலைப்படுத்துதல் சிகிச்சை."
  },
  {
    name: "Spine Injury Care",
    tamilName: "தண்டுவட காயம் மற்றும் அவசர தண்டுவட சீரமைப்பு சிகிச்சை",
    departmentId: "neurosurgery",
    category: "trauma",
    description: "Urgent decompression and stabilization of spinal cord trauma.",
    tamilDescription: "தண்டுவடக் காயம் மற்றும் தண்டுவட அழுத்தத்தை நீக்குவதற்கான அவசர சிகிச்சை."
  },
  {
    name: "Orthopaedic Injuries Care",
    tamilName: "எலும்பு முறிவுகள் மற்றும் தசைநார் காயங்களுக்கான சிகிச்சை",
    departmentId: "orthopaedics",
    category: "trauma",
    description: "Management of simple, open, and complex fracture cases.",
    tamilDescription: "எளிய மற்றும் சவாலான எலும்பு முறிவுகளுக்கான தகுந்த சிகிச்சை."
  },
  {
    name: "Chest & Abdominal Injuries Care",
    tamilName: "நெஞ்சு மற்றும் வயிற்றுப் பகுதி காயங்களுக்கான அவசர அறுவைசிகிச்சை",
    departmentId: "general-surgery",
    category: "trauma",
    description: "Rapid trauma surgical assessment and intervention for internal organ damage.",
    tamilDescription: "உள் உறுப்பு பாதிப்புகளுக்கான விரைவான விபத்து அறுவைசிகிச்சை மற்றும் தலையீடு."
  },

  // CRANIOFACIAL / SMILING MONK SERVICES
  {
    name: "Facial Trauma Reconstruction & Revision",
    tamilName: "முகக் காயங்கள் மற்றும் பழைய தழும்புகள் மறுசீரமைப்பு சிகிச்சை",
    departmentId: "faciomaxillary",
    category: "craniofacial",
    description: "Treatment for acute injuries and correction of old, incompletely treated facial fractures.",
    tamilDescription: "புதிய மற்றும் பழைய முகக் காயங்கள் மற்றும் தழும்புகளுக்கான மறுசீரமைப்பு சிகிச்சை."
  },
  {
    name: "Craniofacial Syndromic Correction",
    tamilName: "பிறவி முகக் குறைபாடுகள் சீரமைப்பு அறுவைசிகிச்சை",
    departmentId: "faciomaxillary",
    category: "craniofacial",
    description: "Complex corrective surgeries for congenital facial syndromes.",
    tamilDescription: "பிறவி முகக் குறைபாடுகளுக்கான சிக்கலான திருத்த அறுவைசிகிச்சைகள்."
  },
  {
    name: "Rhinoplasty (Nose Reshaping)",
    tamilName: "மூக்கு வடிவமைப்பு அறுவைசிகிச்சை (ரைனோபிளாஸ்டி)",
    departmentId: "plastic-surgery",
    category: "craniofacial",
    description: "Cosmetic and functional nose reconstruction.",
    tamilDescription: "மூக்கின் வடிவம் மற்றும் செயல்பாட்டை மேம்படுத்தும் அறுவைசிகிச்சை."
  },
  {
    name: "Blepharoplasty (Eyelid Surgery)",
    tamilName: "இமை வடிவமைப்பு அறுவைசிகிச்சை (பிளெபரோபிளாஸ்டி)",
    departmentId: "plastic-surgery",
    category: "craniofacial",
    description: "Surgical aesthetic restoration of upper and lower eyelids.",
    tamilDescription: "கண் இமைகளின் அழகியல் மற்றும் செயல்பாட்டு மறுசீரமைப்பு."
  },
  {
    name: "Orbital Reconstruction & Enophthalmos Correction",
    tamilName: "கண் குழி எலும்பு முறிவு மற்றும் கண் கோள மறுசீரமைப்பு",
    departmentId: "faciomaxillary",
    category: "craniofacial",
    description: "Repair of eye socket fractures and retro-positioned eyeballs.",
    tamilDescription: "கண் குழி எலும்பு முறிவுகள் மற்றும் கண் கோள மறுசீரமைப்பு சிகிச்சை."
  },
  {
    name: "Cleft Lip & Cleft Palate Reconstruction",
    tamilName: "முயல் உதடு மற்றும் பிளவுபட்ட அன்னம் மறுசீரமைப்பு",
    departmentId: "plastic-surgery",
    category: "craniofacial",
    description: "Cleft correction for patients of all age groups.",
    tamilDescription: "அனைத்து வயதினருக்குமான முயல் உதடு மற்றும் பிளவுபட்ட அன்னம் மறுசீரமைப்பு."
  },
  {
    name: "Botox & Fillers",
    tamilName: "அறுவைசிகிச்சை இல்லாத முகப் பொலிவு சிகிச்சை (போடாக்ஸ் & ஃபில்லர்ஸ்)",
    departmentId: "plastic-surgery",
    category: "craniofacial",
    description: "Non-surgical aesthetic facial rejuvenations.",
    tamilDescription: "அறுவைசிகிச்சை இல்லாத முகப் பொலிவு மற்றும் இளமை மீட்பு சிகிச்சை."
  },
  {
    name: "Ear Reshaping (Otoplasty)",
    tamilName: "காது வடிவமைப்பு அறுவைசிகிச்சை (ஓட்டோபிளாஸ்டி)",
    departmentId: "plastic-surgery",
    category: "craniofacial",
    description: "Corrective ear reshaping for aesthetic restoration.",
    tamilDescription: "காதுகளின் அழகியல் சீரமைப்பிற்கான திருத்த அறுவைசிகிச்சை."
  },
  {
    name: "Scar Revision",
    tamilName: "முக மற்றும் உடல் தழும்புகள் நீக்குதல் மற்றும் சீரமைப்பு",
    departmentId: "plastic-surgery",
    category: "craniofacial",
    description: "Surgical and therapeutic improvement of facial and bodily scars.",
    tamilDescription: "முகம் மற்றும் உடலில் உள்ள தழும்புகளை மேம்படுத்துவதற்கான நவீன சிகிச்சை."
  },
  {
    name: "Facial Animation Procedures",
    tamilName: "முக வாதம் (முக பக்கவாதம்) தசை மற்றும் நரம்பு சீரமைப்பு",
    departmentId: "plastic-surgery",
    category: "craniofacial",
    description: "Surgical recovery procedures for facial nerve palsy (facial paralysis).",
    tamilDescription: "முக வாதத்தினால் (பக்கவாதம்) ஏற்பட்ட குறைபாடுகளுக்கான நரம்பு மற்றும் தசை மறுசீரமைப்பு."
  },

  // ORTHOPAEDICS
  {
    name: "Complex Fracture Management",
    tamilName: "சவாலான மற்றும் பல துண்டான எலும்பு முறிவுகள் சிகிச்சை",
    departmentId: "orthopaedics",
    category: "orthopaedics",
    description: "Surgical treatment of severe, multi-fragment fractures and non-unions.",
    tamilDescription: "கடுமையான, பல துண்டான எலும்பு முறிவுகள் மற்றும் கூடாத எலும்புகளுக்கான அறுவைசிகிச்சை."
  },
  {
    name: "Joint and Bone Care",
    tamilName: "மூட்டு தேய்மானம் மற்றும் எலும்பு ஆரோக்கிய சிகிச்சை",
    departmentId: "orthopaedics",
    category: "orthopaedics",
    description: "Diagnostic assessment and treatment for degenerative joint diseases.",
    tamilDescription: "மூட்டு தேய்மானம் மற்றும் எலும்பு ஆரோக்கியத்திற்கான நோயறிதல் மற்றும் சிகிச்சை."
  },

  // OTHER SPECIALITIES
  {
    name: "Diabetes & Hypertension Management",
    tamilName: "சர்க்கரை நோய் மற்றும் ரத்த அழுத்த மேலாண்மை",
    departmentId: "general-medicine",
    category: "other",
    description: "In-depth physician care for metabolic disorders, diabetes, and blood pressure regulation.",
    tamilDescription: "சர்க்கரை நோய் மற்றும் ரத்த அழுத்தத்திற்கான விரிவான மருத்துவர் கவனிப்பு."
  },
  {
    name: "Chronic Pain Interventions",
    tamilName: "தீராத மூட்டு மற்றும் தண்டுவட வலி நிவாரண ஊசி சிகிச்சை",
    departmentId: "pain-clinic",
    category: "other",
    description: "Advanced pain block injections and therapy for chronic spine and joint pains.",
    tamilDescription: "முதுகு தண்டு மற்றும் மூட்டு வலிகளுக்கான மேம்பட்ட வலி நிவாரண ஊசி சிகிச்சை."
  },
  {
    name: "General Surgical Procedures",
    tamilName: "அப்பன்டிசைட்டிஸ், பித்தப்பை மற்றும் குடலிறக்க பொது அறுவைசிகிச்சை",
    departmentId: "general-surgery",
    category: "other",
    description: "Standard and keyhole operations for appendicitis, gallstones, and hernias.",
    tamilDescription: "அப்பன்டிசைட்டிஸ், பித்தப்பைக் கற்கள் மற்றும் குடலிறக்கத்திற்கான பொதுவான மற்றும் லேப்ராஸ்கோபிக் அறுவைசிகிச்சைகள்."
  },
  {
    name: "ENT Consultation & Surgery",
    tamilName: "காது, மூக்கு, தொண்டை மருத்துவ ஆலோசனை மற்றும் அறுவைசிகிச்சை",
    departmentId: "ent",
    category: "other",
    description: "Comprehensive medical and surgical therapy for ear, nose, and throat issues.",
    tamilDescription: "காது, மூக்கு, தொண்டை பிரச்சனைகளுக்கான விரிவான மருத்துவ மற்றும் அறுவைசிகிச்சை தீர்வுகள்."
  },
  {
    name: "Ophthalmology Consultation",
    tamilName: "கண் பரிசோதனை மற்றும் முதன்மை கண் பராமரிப்பு",
    departmentId: "ophthalmology",
    category: "other",
    description: "Routine vision testing, prescription, and primary eye care checkups.",
    tamilDescription: "கண் பார்வைப் பரிசோதனை மற்றும் முதன்மை கண் பராமரிப்பு ஆலோசனைகள்."
  },
  {
    name: "Precision Imaging (32-Slice CT)",
    tamilName: "துல்லியமான 32-ஸ்லைஸ் சிடி ஸ்கேன் பரிசோதனை",
    departmentId: "radiology",
    category: "other",
    description: "High-resolution diagnostics with the GE Revolution Aspire Select CT Scanner.",
    tamilDescription: "அதிநவீன சிடி ஸ்கேன் கருவி மூலம் துல்லியமான நோயறிதல் பரிசோதனைகள்."
  },
  {
    name: "Medico-Legal Advisory",
    tamilName: "நீதிமன்ற மற்றும் சட்டப்பூர்வ மருத்துவ சான்றிதழ் ஆலோசனை",
    departmentId: "medico-legal",
    category: "other",
    description: "Expert clinical evaluation and documentation for judicial or statutory requisitions.",
    tamilDescription: "சட்டப்பூர்வ மற்றும் நீதிமன்றத் தேவைகளுக்கான மருத்துவ சான்றிதழ் ஆலோசனை சேவைகள்."
  }
];
