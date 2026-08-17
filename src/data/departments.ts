export interface Department {
  id: string;
  name: string;
  tamilName?: string;
  iconName: string; // Map to Lucide icon components
  description?: string;
  tamilDescription?: string;
}

export const departments: Department[] = [
  {
    id: "neurosurgery",
    name: "Neurosurgery",
    tamilName: "நரம்பியல் அறுவைசிகிச்சை",
    iconName: "Brain",
    description: "Advanced surgical treatment for brain tumors, aneurysms, skull base lesions, spinal disorders, and nerve injuries.",
    tamilDescription: "மூளைக் கட்டிகள், இரத்தக் குழாய் வீக்கம் (அனூரிசம்), மண்டை ஓடு கட்டிகள், தண்டுவட கோளாறுகள் மற்றும் நரம்பு காயங்களுக்கான அதிநவீன அறுவைசிகிச்சை."
  },
  {
    id: "neurology",
    name: "Neurology",
    tamilName: "நரம்பியல் மருத்துவம்",
    iconName: "Activity",
    description: "Comprehensive care for stroke management, neurological illnesses, neuropathies, and nerve-related disorders.",
    tamilDescription: "மூளை பக்கவாதம் (ஸ்ட்ரோக்) மேலாண்மை, நரம்பியல் குறைபாடுகள் மற்றும் நரம்பு சார்ந்த நோய்களுக்கான முழுமையான மருத்துவ சிகிச்சை."
  },
  {
    id: "psychiatry",
    name: "Psychiatry & Clinical Psychology",
    tamilName: "மனநலவியல் மற்றும் உளவியல்",
    iconName: "Smile",
    description: "Expert diagnosis and support for mental health, behavioral, and cognitive disorders.",
    tamilDescription: "மனநலம், நடத்தை மற்றும் நனவுத்திறன் கோளாறுகளுக்கான தகுதிவாய்ந்த மருத்துவ சிகிச்சை மற்றும் உளவியல் ஆலோசனை."
  },
  {
    id: "plastic-surgery",
    name: "Plastic Surgery",
    tamilName: "பிளாஸ்டிக் மற்றும் மறுசீரமைப்பு அறுவைசிகிச்சை",
    iconName: "Sparkles",
    description: "Reconstructive procedures, scar revisions, microvascular surgery, and aesthetic treatments.",
    tamilDescription: "விபத்துக் காயம் மற்றும் பிறவி குறைபாடுகளுக்கான மறுசீரமைப்பு சிகிச்சைகள், தழும்புகள் திருத்தம் மற்றும் முகப் பொலிவு அறுவைசிகிச்சைகள்."
  },
  {
    id: "orthopaedics",
    name: "Orthopaedics",
    tamilName: "எலும்பு மற்றும் மூட்டு மருத்துவம்",
    iconName: "Bone",
    description: "Comprehensive care for simple and complex bone fractures, joint problems, and orthopedic trauma.",
    tamilDescription: "எலும்பு முறிவுகள், மூட்டு மாற்று சிகிச்சைகள், விளையாட்டுக் காயங்கள் மற்றும் எலும்பியல் விபத்து காயங்களுக்கான நவீன சிகிச்சை."
  },
  {
    id: "faciomaxillary",
    name: "Facio Maxillary Surgery",
    tamilName: "முகம் மற்றும் தாடை அறுவைசிகிச்சை",
    iconName: "Stethoscope",
    description: "Surgical corrections for acute craniofacial injuries, facial trauma reconstructions, and deformities.",
    tamilDescription: "முக எலும்பு முறிவுகள், தாடை சீரமைப்பு, உதடு பிளவு மற்றும் முகக் காயங்களுக்கான சிறப்பு அறுவைசிகிச்சை மறுசீரமைப்பு."
  },
  {
    id: "pain-clinic",
    name: "Pain Clinic",
    tamilName: "தீராத வலி நிவாரண சிகிச்சை",
    iconName: "HeartPulse",
    description: "Multidisciplinary management for chronic pain syndromes, spine pain, and nerve pains.",
    tamilDescription: "தீராத முதுகு வலி, தண்டுவட வலி, மூட்டு வலி மற்றும் நரம்பு வலிகளுக்கான ஊசி மற்றும் நவீன வலி நிவாரண சிகிச்சைகள்."
  },
  {
    id: "anaesthesia",
    name: "Anaesthesia & Critical Care",
    tamilName: "மயக்கவியல் மற்றும் தீவிர சிகிச்சை",
    iconName: "Syringe",
    description: "Advanced perioperative care and dedicated intensivist support for the hybrid ICU.",
    tamilDescription: "அறுவைசிகிச்சைக் கால பாதுகாப்பான மயக்க மருந்து மேலாண்மை மற்றும் தீவிர சிகிச்சைப் பிரிவு (ICU) கண்காணிப்பு."
  },
  {
    id: "ent",
    name: "ENT",
    tamilName: "காது, மூக்கு, தொண்டை மருத்துவம்",
    iconName: "Volume2",
    description: "Specialized care for disorders of the ear, nose, throat, head, and neck.",
    tamilDescription: "காது, மூக்கு, தொண்டை, தலை மற்றும் கழுத்து பகுதி சார்ந்த கோளாறுகளுக்கான சிறப்பு மருத்துவ சிகிச்சை."
  },
  {
    id: "ophthalmology",
    name: "Ophthalmology",
    tamilName: "கண் மருத்துவம்",
    iconName: "Eye",
    description: "Diagnostic, clinical, and surgical treatments for all vision and eye disorders.",
    tamilDescription: "கண் பார்வைக் கோளாறுகள், கண் அழுத்த நோய் மற்றும் கண்புரை உள்ளிட்ட நோய்களுக்கான அறுவைசிகிச்சை மற்றும் பராமரிப்பு."
  },
  {
    id: "general-medicine",
    name: "General Medicine",
    tamilName: "பொது மருத்துவம்",
    iconName: "Pill",
    description: "Primary and specialized diagnosis and treatment for complex diseases including diabetes and hypertension.",
    tamilDescription: "சர்க்கரை நோய், உயர் ரத்த அழுத்தம், காய்ச்சல் மற்றும் நாள்பட்ட பொதுவான நோய்களுக்கான முழுமையான சிகிச்சை."
  },
  {
    id: "general-surgery",
    name: "General Surgery",
    tamilName: "பொது அறுவைசிகிச்சை",
    iconName: "ShieldAlert",
    description: "Comprehensive surgical interventions for abdominal, chest, and soft tissue pathologies.",
    tamilDescription: "குடலிறக்கம், பித்தப்பை கற்கள், அப்பன்டிசைட்டிஸ் மற்றும் மென்மையான திசுக்களுக்கான அறுவைசிகிச்சைகள்."
  },
  {
    id: "radiology",
    name: "Radiology",
    tamilName: "கதிரியக்கவியல் (ஸ்கேன்)",
    iconName: "Scan",
    description: "Precision medical imaging including high-resolution 32 Slice CT scanning for diagnostic accuracy.",
    tamilDescription: "அதிநவீன 32-ஸ்லைஸ் சிடி ஸ்கேன் மற்றும் அல்ட்ராசவுண்ட் உள்ளிட்ட துல்லியமான மருத்துவ நோயறிதல் பரிசோதனைகள்."
  },
  {
    id: "medico-legal",
    name: "Medico-Legal Consultant",
    tamilName: "சட்டப்பூர்வ மருத்துவ ஆலோசனை",
    iconName: "FileText",
    description: "Consultation and legal-medical advisory services for clinical evaluation.",
    tamilDescription: "நீதிமன்ற மற்றும் சட்டப்பூர்வ தேவைகளுக்கான மருத்துவ மதிப்பீடு மற்றும் சான்றிதழ் ஆலோசனை சேவைகள்."
  }
];
