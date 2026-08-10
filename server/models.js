import mongoose from "mongoose";

const Schema = mongoose.Schema;

// 1. Admin Account Schema
const AdminSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastLogin: { type: Date, default: Date.now }
});

// 2. Doctor Schema
const DoctorSchema = new Schema({
  name: { type: String, required: true },
  qualification: { type: String, required: true },
  designation: { type: String, required: true },
  departmentId: { type: String, required: true }, // References Department slug
  profileImage: { type: String, default: "" }, // Base64 or Image path
  biography: { type: String, default: "" },
  expertise: { type: [String], default: [] },
  displayOrder: { type: Number, default: 0 },
  status: { type: String, default: "active" } // active, inactive
});

// 3. Department Schema
const DepartmentSchema = new Schema({
  name: { type: String, required: true },
  tamilName: { type: String, default: "" },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  banner: { type: String, default: "" },
  icon: { type: String, default: "" },
  services: { type: [String], default: [] },
  faq: [{ question: String, answer: String }],
  status: { type: String, default: "active" }, // active, inactive
  seoTitle: { type: String, default: "" },
  seoDescription: { type: String, default: "" },
  seoKeywords: { type: String, default: "" }
});

// 4. Blog Post Schema
const BlogPostSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  featuredImage: { type: String, default: "" },
  excerpt: { type: String, required: true },
  content: { type: String, required: true }, // Markdown/HTML String
  category: { type: String, default: "General Health" },
  tags: { type: [String], default: [] },
  author: { type: String, default: "Clinical Team" },
  seoTitle: { type: String, default: "" },
  seoDescription: { type: String, default: "" },
  canonicalUrl: { type: String, default: "" },
  status: { type: String, default: "published" }, // draft, published
  publishDate: { type: Date, default: Date.now }
});

// 5. Health Package Schema
const HealthPackageSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true },
  tests: { type: [String], default: [] },
  consultations: { type: String, default: "" },
  validity: { type: String, default: "1 Month" },
  status: { type: String, default: "active" } // active, inactive
});

// 6. Gallery Image Schema
const GalleryImageSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  category: { type: String, required: true }, // Hospital, Technology, Facilities, Events
  tags: { type: [String], default: [] }, // Neurosurgery, TraumaCare, ICU, OT
  imageUrl: { type: String, required: true },
  altText: { type: String, default: "" },
  seoFilename: { type: String, default: "" },
  status: { type: String, default: "published" } // published, draft
});

// 7. Appointment Schema
const AppointmentSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: "" },
  department: { type: String, required: true },
  doctor: { type: String, required: true }, // Doctor name or ID
  date: { type: String, required: true },
  time: { type: String, required: true },
  message: { type: String, default: "" },
  status: { type: String, default: "pending" }, // pending, confirmed, completed, cancelled
  createdAt: { type: Date, default: Date.now }
});

// 8. Contact Enquiry Schema
const ContactEnquirySchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: "" },
  subject: { type: String, default: "" },
  message: { type: String, required: true },
  status: { type: String, default: "unread" }, // unread, read, resolved
  createdAt: { type: Date, default: Date.now }
});

// 9. Career Listing Schema
const CareerSchema = new Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, default: "Salem, Tamil Nadu" },
  type: { type: String, default: "Full-Time" }, // Full-Time, Part-Time, Shift
  description: { type: String, required: true },
  requirements: { type: [String], default: [] },
  status: { type: String, default: "active" } // active, filled
});

// 10. Site Settings Schema
const SiteSettingsSchema = new Schema({
  hospitalName: { type: String, default: "SarvamCare Hospital" },
  logoUrl: { type: String, default: "/sarvam_logo.jpg" },
  phone: { type: String, default: "+91 94898 78908" },
  whatsapp: { type: String, default: "+91 94898 78908" },
  email: { type: String, default: "sarvamcarehospital@gmail.com" },
  address: { type: String, default: "#157, Salem Bangalore National Highway, Mamangam, Salem - 636 032" },
  workingHours: { type: String, default: "24/7 Helpline & Emergencies" },
  emergencyNumber: { type: String, default: "+91 94898 78908" },
  googleMapsUrl: { type: String, default: "https://maps.google.com/?cid=12345" },
  socialLinks: {
    instagram: { type: String, default: "https://www.instagram.com/sarvam_care_hospital" },
    facebook: { type: String, default: "" },
    youtube: { type: String, default: "" },
    linkedin: { type: String, default: "" }
  }
});

// 11. SEO & Verification Settings Schema
const SEOSettingsSchema = new Schema({
  globalTitle: { type: String, default: "SarvamCare Hospital | Multispeciality Hospital in Salem" },
  globalDescription: { type: String, default: "SarvamCare Hospital Salem is an advanced neurosurgery, neurology, orthopaedics, and trauma care multispeciality healthcare facility." },
  ogImage: { type: String, default: "/sarvam_logo.jpg" },
  googleVerification: { type: String, default: "" },
  gtmId: { type: String, default: "" },
  ga4MeasurementId: { type: String, default: "" }
});

// Models Compile
export const Admin = mongoose.model("Admin", AdminSchema);
export const Doctor = mongoose.model("Doctor", DoctorSchema);
export const Department = mongoose.model("Department", DepartmentSchema);
export const BlogPost = mongoose.model("BlogPost", BlogPostSchema);
export const HealthPackage = mongoose.model("HealthPackage", HealthPackageSchema);
export const GalleryImage = mongoose.model("GalleryImage", GalleryImageSchema);
export const Appointment = mongoose.model("Appointment", AppointmentSchema);
export const ContactEnquiry = mongoose.model("ContactEnquiry", ContactEnquirySchema);
export const Career = mongoose.model("Career", CareerSchema);
export const SiteSettings = mongoose.model("SiteSettings", SiteSettingsSchema);
export const SEOSettings = mongoose.model("SEOSettings", SEOSettingsSchema);
