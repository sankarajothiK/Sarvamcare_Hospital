export interface Doctor {
  id: string;
  name: string;
  qualification: string;
  specialties: string[];
  bio?: string;
  isFeatured?: boolean;
  phone?: string;
}

export const doctors: Doctor[] = [
  // NEUROSURGERY
  {
    id: "dr-v-suresh-kumar",
    name: "Prof. Dr. V. Suresh Kumar",
    qualification: "MCh (Neuro)",
    specialties: ["neurosurgery"],
    bio: "Prof & HOD Department of Neurosurgery, Government Mohan Kumaramangalam Medical College, Salem",
    isFeatured: true,
    phone: "94898 78908"
  },
  {
    id: "dr-s-palanisamy",
    name: "Dr. S. Palanisamy",
    qualification: "MCh",
    specialties: ["neurosurgery"]
  },
  {
    id: "dr-s-paranjothi",
    name: "Dr. S. Paranjothi",
    qualification: "MCh",
    specialties: ["neurosurgery"]
  },

  // NEUROLOGY
  {
    id: "dr-n-balamurugan",
    name: "Dr. N. Balamurugan",
    qualification: "DM",
    specialties: ["neurology"]
  },

  // PSYCHIATRY
  {
    id: "dr-v-lakshmi-durai",
    name: "Dr. V. Lakshmi Durai",
    qualification: "MD",
    specialties: ["psychiatry"]
  },
  {
    id: "dr-p-t-sivakumar",
    name: "Dr. P.T. Sivakumar",
    qualification: "MD",
    specialties: ["psychiatry"]
  },

  // PLASTIC SURGERY
  {
    id: "dr-s-suresh-kumar",
    name: "Dr. S. Suresh Kumar",
    qualification: "MCh",
    specialties: ["plastic-surgery"]
  },

  // ORTHOPAEDICS
  {
    id: "dr-i-g-nagarajan",
    name: "Dr. I.G. Nagarajan",
    qualification: "MS",
    specialties: ["orthopaedics"]
  },
  {
    id: "dr-l-kumar",
    name: "Dr. L. Kumar",
    qualification: "MS",
    specialties: ["orthopaedics"]
  },
  // PAIN CLINIC
  {
    id: "dr-g-balamurugan",
    name: "Dr. G. Balamurugan",
    qualification: "MD",
    specialties: ["pain-clinic", "anaesthesia"]
  },

  {
    id: "dr-g-gnana-prakasam",
    name: "Dr. G. Gnana Prakasam",
    qualification: "MS",
    specialties: ["orthopaedics", "pain-clinic"]
  },

  // FACIOMAXILLARY SURGERY
  {
    id: "dr-b-s-saravanan",
    name: "Dr. B.S. Saravanan",
    qualification: "MDS",
    specialties: ["faciomaxillary"]
  },
  {
    id: "dr-shankar-mohan",
    name: "Dr. Shankar Mohan",
    qualification: "MDS",
    specialties: ["faciomaxillary"]
  },

  // ANAESTHESIA & CRITICAL CARE

  // ENT
  {
    id: "dr-k-mahendran",
    name: "Dr. K. Mahendran",
    qualification: "MS",
    specialties: ["ent"]
  },

  // OPHTHALMOLOGY
  {
    id: "dr-r-sathish-kumar",
    name: "Dr. R. Sathish Kumar",
    qualification: "MS",
    specialties: ["ophthalmology"]
  },

  // GENERAL MEDICINE
  {
    id: "dr-r-vinoth",
    name: "Dr. R. Vinoth",
    qualification: "MD",
    specialties: ["general-medicine"]
  },

  // GENERAL SURGERY
  {
    id: "dr-a-gowtham-shankar",
    name: "Dr. A. Gowtham Shankar",
    qualification: "MS",
    specialties: ["general-surgery"]
  },
  {
    id: "dr-c-thirumalai-samy",
    name: "Dr. C. Thirumalai Samy",
    qualification: "MS",
    specialties: ["general-surgery"]
  },
  {
    id: "dr-s-ajay-venkatesan",
    name: "Dr. S. Ajay Venkatesan",
    qualification: "MS",
    specialties: ["general-surgery"]
  },

  // RADIOLOGY
  {
    id: "dr-p-kumar",
    name: "Dr. P. Kumar",
    qualification: "MD",
    specialties: ["radiology"]
  },
  {
    id: "dr-ramachandran",
    name: "Dr. Ramachandran",
    qualification: "MD",
    specialties: ["radiology"]
  },
  {
    id: "dr-elanchezhian",
    name: "Dr. Elanchezhian",
    qualification: "MD",
    specialties: ["radiology"]
  },

  // MEDICO-LEGAL CONSULTANT
  {
    id: "dr-s-sasikumar",
    name: "Dr. S. Sasikumar",
    qualification: "MD",
    specialties: ["medico-legal"]
  }
];
