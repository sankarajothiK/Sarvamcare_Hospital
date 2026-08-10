export interface ContactInfo {
  hospitalName: string;
  subTitle: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    pin: string;
    full: string;
  };
  phone: string;
  phoneRaw: string;
  email: string;
  whatsapp: {
    number: string;
    numberRaw: string;
    prefilledMsg: string;
    url: string;
    floatingUrl: string;
  };
  googleMapsUrl: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
}

export const contactInfo: ContactInfo = {
  hospitalName: "SarvamCare Hospital Pvt. Ltd.",
  subTitle: "Dr. V. Suresh Kumar's Neuro Center",
  address: {
    line1: "#157, Salem Bangalore National Highway",
    line2: "Mamangam",
    city: "Salem",
    pin: "636 032",
    full: "#157, Salem Bangalore National Highway, Mamangam, Salem – 636 032."
  },
  phone: "94898 78908",
  phoneRaw: "+919489878908",
  email: "sarvamcarehospital@gmail.com",
  whatsapp: {
    number: "94898 78908",
    numberRaw: "919489878908",
    prefilledMsg: "Hello SarvamCare Hospital, I would like to enquire about an appointment. Please share the available consultation details.",
    url: "https://wa.me/919489878908?text=Hello%20SarvamCare%20Hospital%2C%20I%20would%20like%20to%20enquire%20about%20an%20appointment.%20Please%20share%20the%20available%20consultation%20details.",
    floatingUrl: "https://wa.me/919489878908?text=Hello%20SarvamCare%20Hospital%2C%20I%20would%20like%20to%20enquire%20about%20an%20appointment."
  },
  googleMapsUrl: "https://www.google.com/maps/dir/?api=1&destination=SarvamCare+Hospital+Pvt+Ltd+Mamangam+Salem+636032",
  socialLinks: {
    instagram: "https://www.instagram.com/sarvam_care_hospital/",
    facebook: "https://www.facebook.com/SarvamcareHospital/",
    youtube: "https://www.youtube.com/@sarvamcarehospital"
  }
};
