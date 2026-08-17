export interface Doctor {
  id: string;
  name: string;
  tamilName?: string;
  qualification: string;
  specialties: string[];
  bio?: string;
  tamilBio?: string;
  isFeatured?: boolean;
  phone?: string;
}

export const doctors: Doctor[] = [
  // NEUROSURGERY
  {
    id: "dr-v-suresh-kumar",
    name: "Prof. Dr. V. Suresh Kumar",
    tamilName: "பேராசிரியர் டாக்டர் வி. சுரேஷ் குமார்",
    qualification: "MCh (Neuro)",
    specialties: ["neurosurgery"],
    bio: "Prof & HOD Department of Neurosurgery, Government Mohan Kumaramangalam Medical College, Salem",
    tamilBio: "தலைவர் மற்றும் பேராசிரியர், நரம்பியல் அறுவைசிகிச்சைப் பிரிவு, அரசு மோகன் குமாரமங்கலம் மருத்துவக் கல்லூரி, சேலம்",
    isFeatured: true,
    phone: "94898 78908"
  },
  {
    id: "dr-s-palanisamy",
    name: "Dr. S. Palanisamy",
    tamilName: "டாக்டர் எஸ். பழனிசாமி",
    qualification: "MCh",
    specialties: ["neurosurgery"]
  },

  // NEUROLOGY
  {
    id: "dr-n-balamurugan",
    name: "Dr. N. Balamurugan",
    tamilName: "டாக்டர் என். பாலமுருகன்",
    qualification: "DM",
    specialties: ["neurology"]
  },

  // PSYCHIATRY
  {
    id: "dr-v-lakshmi-durai",
    name: "Dr. V. Lakshmi Durai",
    tamilName: "டாக்டர் வி. லட்சுமி துரை",
    qualification: "MD",
    specialties: ["psychiatry"]
  },
  {
    id: "dr-p-t-sivakumar",
    name: "Dr. P.T. Sivakumar",
    tamilName: "டாக்டர் பி.டி. சிவகுமார்",
    qualification: "MD",
    specialties: ["psychiatry"]
  },

  // PLASTIC SURGERY
  {
    id: "dr-s-suresh-kumar",
    name: "Dr. S. Suresh Kumar",
    tamilName: "டாக்டர் எஸ். சுரேஷ் குமார்",
    qualification: "MCh",
    specialties: ["plastic-surgery"]
  },

  // ORTHOPAEDICS
  {
    id: "dr-i-g-nagarajan",
    name: "Dr. I.G. Nagarajan",
    tamilName: "டாக்டர் ஐ.ஜி. நாகராஜன்",
    qualification: "MS",
    specialties: ["orthopaedics"]
  },
  {
    id: "dr-l-kumar",
    name: "Dr. L. Kumar",
    tamilName: "டாக்டர் எல். குமார்",
    qualification: "MS",
    specialties: ["orthopaedics"]
  },

  // PAIN CLINIC
  {
    id: "dr-g-balamurugan",
    name: "Dr. G. Balamurugan",
    tamilName: "டாக்டர் ஜி. பாலமுருகன்",
    qualification: "MD",
    specialties: ["pain-clinic", "anaesthesia"]
  },
  {
    id: "dr-g-gnana-prakasam",
    name: "Dr. G. Gnana Prakasam",
    tamilName: "டாக்டர் ஜி. ஞானப்பிரகாசம்",
    qualification: "MS",
    specialties: ["orthopaedics", "pain-clinic"]
  },

  // FACIOMAXILLARY SURGERY
  {
    id: "dr-b-s-saravanan",
    name: "Dr. B.S. Saravanan",
    tamilName: "டாக்டர் பி.எஸ். சரவணன்",
    qualification: "MDS",
    specialties: ["faciomaxillary"]
  },
  {
    id: "dr-shankar-mohan",
    name: "Dr. Shankar Mohan",
    tamilName: "டாக்டர் சங்கர் மோகன்",
    qualification: "MDS",
    specialties: ["faciomaxillary"]
  },

  // ENT
  {
    id: "dr-k-mahendran",
    name: "Dr. K. Mahendran",
    tamilName: "டாக்டர் கே. மகேந்திரன்",
    qualification: "MS",
    specialties: ["ent"]
  },

  // OPHTHALMOLOGY
  {
    id: "dr-r-sathish-kumar",
    name: "Dr. R. Sathish Kumar",
    tamilName: "டாக்டர் ஆர். சதீஷ் குமார்",
    qualification: "MS",
    specialties: ["ophthalmology"]
  },

  // GENERAL MEDICINE
  {
    id: "dr-r-vinoth",
    name: "Dr. R. Vinoth",
    tamilName: "டாக்டர் ஆர். வினோத்",
    qualification: "MD",
    specialties: ["general-medicine"]
  },

  // GENERAL SURGERY
  {
    id: "dr-a-gowtham-shankar",
    name: "Dr. A. Gowtham Shankar",
    tamilName: "டாக்டர் ஏ. கௌதம் சங்கர்",
    qualification: "MS",
    specialties: ["general-surgery"]
  },
  {
    id: "dr-c-thirumalai-samy",
    name: "Dr. C. Thirumalai Samy",
    tamilName: "டாக்டர் சி. திருமலை சாமி",
    qualification: "MS",
    specialties: ["general-surgery"]
  },
  {
    id: "dr-s-ajay-venkatesan",
    name: "Dr. S. Ajay Venkatesan",
    tamilName: "டாக்டர் எஸ். அஜய் வெங்கடேசன்",
    qualification: "MS",
    specialties: ["general-surgery"]
  },

  // RADIOLOGY
  {
    id: "dr-p-kumar",
    name: "Dr. P. Kumar",
    tamilName: "டாக்டர் பி. குமார்",
    qualification: "MD",
    specialties: ["radiology"]
  },
  {
    id: "dr-ramachandran",
    name: "Dr. Ramachandran",
    tamilName: "டாக்டர் ராமச்சந்திரன்",
    qualification: "MD",
    specialties: ["radiology"]
  },
  {
    id: "dr-elanchezhian",
    name: "Dr. Elanchezhian",
    tamilName: "டாக்டர் இளஞ்செழியன்",
    qualification: "MD",
    specialties: ["radiology"]
  },

  // MEDICO-LEGAL CONSULTANT
  {
    id: "dr-s-sasikumar",
    name: "Dr. S. Sasikumar",
    tamilName: "டாக்டர் எஸ். சசிகுமார்",
    qualification: "MD",
    specialties: ["medico-legal"]
  }
];
