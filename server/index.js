import express from "express";
import fs from "fs";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import apiRoutes from "./routes.js";
import { Admin, Department, Doctor, HealthPackage, BlogPost, GalleryImage, SEOSettings } from "./models.js";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sarvamcare";

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Dynamic XML Sitemap Generator
app.get("/sitemap.xml", async (req, res) => {
  res.header("Content-Type", "application/xml");
  res.header("Content-Encoding", "gzip");
  
  try {
    const domain = process.env.DOMAIN || "https://sarvamcare.com";
    
    // Core routes
    const staticRoutes = [
      "",
      "/about",
      "/doctors",
      "/trauma-care",
      "/neuro-center",
      "/smiling-monk",
      "/health-packages",
      "/gallery",
      "/blog",
      "/contact",
      "/careers",
      "/privacy-policy",
      "/terms-and-conditions",
      "/disclaimer"
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // 1. Static Paths
    staticRoutes.forEach(route => {
      xml += `  <url>\n    <loc>${domain}${route}</loc>\n    <changefreq>daily</changefreq>\n    <priority>${route === "" ? "1.0" : "0.8"}</priority>\n  </url>\n`;
    });

    // 2. Dynamic Department Slugs
    const depts = await Department.find({ status: "active" });
    depts.forEach(d => {
      xml += `  <url>\n    <loc>${domain}/departments/${d.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    });

    // 3. Dynamic Doctor Profile Slugs
    const docs = await Doctor.find({ status: "active" });
    docs.forEach(doc => {
      const docSlug = doc.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      xml += `  <url>\n    <loc>${domain}/doctors/${docSlug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
    });

    // 4. Dynamic Blog Post Slugs
    const posts = await BlogPost.find({ status: "published" });
    posts.forEach(p => {
      xml += `  <url>\n    <loc>${domain}/blog/${p.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
    });

    xml += `</urlset>`;
    
    res.header("Content-Encoding", "identity"); // Disable compression for direct text rendering
    res.send(xml);
  } catch (err) {
    res.status(500).send("Error generating sitemap");
  }
});

// Robots.txt
app.get("/robots.txt", (req, res) => {
  const domain = process.env.DOMAIN || "https://sarvamcare.com";
  res.type("text/plain");
  res.send(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/*
Disallow: /api/private

Sitemap: ${domain}/sitemap.xml`);
});

// API Routing
app.use("/api", apiRoutes);

// Database Connection & Data Seeding
mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log("MongoDB connected successfully");
    
    // Seed initial admin if none exists
    const adminUsername = "sarvamcarehospital.in";
    const adminPassword = "Sarvamcare123";
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await Admin.findOneAndUpdate(
      { username: adminUsername },
      { username: adminUsername, password: hashedPassword },
      { upsert: true, new: true }
    );
    console.log("----------------------------------------");
    console.log("ADMIN USER FORCED/UPDATED:");
    console.log(`Username: ${adminUsername}`);
    console.log(`Password: ${adminPassword}`);
    console.log("----------------------------------------");

    // Seed departments if empty or outdated
    const deptCount = await Department.countDocuments();
    if (deptCount < 14 || !(await Department.findOne({ name: "Psychiatry & Clinical Psychology" }))) {
      console.log("Seeding clinical departments...");
      await Department.deleteMany({}); // Reset for full seed
      const mockDepts = [
        { name: "Neurosurgery", tamilName: "நரம்பியல் அறுவை சிகிச்சை", slug: "neurosurgery", description: "Brain and Spine Neurosurgery Center", icon: "Brain", services: ["Microscopic Neurosurgery", "Spine Reconstruction", "Stroke Management", "Tumor Removals"] },
        { name: "Neurology", tamilName: "நரம்பியல்", slug: "neurology", description: "Neurology Center & Stroke Diagnostics", icon: "Activity", services: ["Stroke Management", "EEG", "Epilepsy care"] },
        { name: "Psychiatry & Clinical Psychology", tamilName: "மனநல மருத்துவம்", slug: "psychiatry", description: "Mind and Behavioral Wellness Center", icon: "Smile", services: ["Clinical Psychology", "Behavior Therapy"] },
        { name: "Plastic Surgery", tamilName: "ஒட்டுறுப்பு அறுவைசிகிச்சை", slug: "plastic-surgery", description: "Cleft Care & Reconstructive Surgeries", icon: "Scissors", services: ["Smiling Monk Cleft Project", "Microvascular Reconstruction"] },
        { name: "Orthopaedics", tamilName: "எலும்பு & மூட்டு மருத்துவம்", slug: "orthopaedics", description: "Fracture Clinic & Joint Replacement Center", icon: "Bone", services: ["Polytrauma Fixations", "Joint Replacements"] },
        { name: "Faciomaxillary Surgery", tamilName: "முகசீரமைப்பு அறுவைசிகிச்சை", slug: "faciomaxillary", description: "Advanced Craniofacial Surgery", icon: "Smile", services: ["Jaw Alignment", "Facial Trauma Reconstruction"] },
        { name: "Pain Clinic", tamilName: "வலி சிகிச்சை மையம்", slug: "pain-clinic", description: "Chronic Pain Treatment", icon: "Heart", services: ["Spine Pain Interventions", "Joint Pain blocks"] },
        { name: "Anaesthesia & Critical Care", tamilName: "மயக்கவியல் & தீவிர சிகிச்சை பிரிவு", slug: "anaesthesia", description: "State-of-the-art ICU & Surgical Support", icon: "Shield", services: ["Anaesthesia Support", "Surgical ICU Care"] },
        { name: "ENT", tamilName: "காது மூக்கு தொண்டை பிரிவு", slug: "ent", description: "Microscopic ENT Surgeries", icon: "Volume2", services: ["Ear surgery", "Nose & Throat clinics"] },
        { name: "Ophthalmology", tamilName: "கண் மருத்துவம்", slug: "ophthalmology", description: "Advanced Eye Care", icon: "Eye", services: ["Cataract diagnostics", "Vision correction"] },
        { name: "General Medicine", tamilName: "பொது மருத்துவம்", slug: "general-medicine", description: "Diabetes & Hypertension Care", icon: "Heart", services: ["Hypertension Management", "Diabetic screening"] },
        { name: "General Surgery", tamilName: "பொது அறுவைசிகிச்சை", slug: "general-surgery", description: "Advanced General & Laparoscopic Surgeries", icon: "Activity", services: ["Laparoscopic surgeries", "Appendectomy"] },
        { name: "Radiology", tamilName: "கதிரியக்கவியல் துறை", slug: "radiology", description: "High-speed CT & MRI Diagnostics", icon: "Video", services: ["CT Scanning", "Ultrasound Diagnostics"] },
        { name: "Medico-Legal Consultant", tamilName: "சட்ட மருத்துவ நிபுணர்", slug: "medico-legal", description: "Forensic & Medico-Legal consultancy", icon: "FileText", services: ["Legal Medical Advisory"] }
      ];
      await Department.insertMany(mockDepts);
      console.log("Clinical departments seeded!");
    }

    // Seed doctors if empty or old seed
    const doctorCount = await Doctor.countDocuments();
    if (doctorCount !== 22) {
      console.log("Seeding complete physician listings...");
      await Doctor.deleteMany({}); // Clear old seed
      const mockDoctors = [
        // Neurosurgery
        { name: "Prof. Dr. V. Suresh Kumar", qualification: "MCh (Neuro)", designation: "Chief Consultant & Head of Neurosurgery", departmentId: "neurosurgery", biography: "Senior Neurosurgeon with 25+ years of clinical HOD experience.", expertise: ["Microscopic Neurosurgery", "Complex Spine Surgery"], displayOrder: 1 },
        { name: "Dr. S. Palanisamy", qualification: "MCh", designation: "Consultant Neurosurgeon", departmentId: "neurosurgery", biography: "Specialist in trauma neurosurgery and critical head injury management.", expertise: ["Head Injuries", "Brain Trauma"], displayOrder: 2 },
        // Neurology
        { name: "Dr. N. Balamurugan", qualification: "DM", designation: "Consultant Neurologist", departmentId: "neurology", biography: "Specialist in stroke intervention and epilepsy therapies.", expertise: ["Stroke Care", "Epilepsy Therapy"], displayOrder: 3 },
        // Psychiatry
        { name: "Dr. V. Lakshmi Durai", qualification: "MD", designation: "Consultant Psychiatrist", departmentId: "psychiatry", biography: "Expert in mental and behavioral health therapies.", expertise: ["Clinical Psychiatry", "Depression Therapy"], displayOrder: 4 },
        { name: "Dr. P.T. SIVAKUMAR", qualification: "MD", designation: "Consultant Psychiatrist", departmentId: "psychiatry", biography: "Behavioral and geriatric mental health specialist.", expertise: ["Geriatric Psychiatry", "Therapy"], displayOrder: 5 },
        // Plastic Surgery
        { name: "Dr. S. Suresh Kumar", qualification: "MCh", designation: "Consultant Plastic Surgeon", departmentId: "plastic-surgery", biography: "Lead surgeon in the Smiling Monk Cleft corrective project.", expertise: ["Cleft Lip Correction", "Reconstructive Surgery"], displayOrder: 6 },
        // Orthopaedics
        { name: "Dr. I.G. Nagarajan", qualification: "MS", designation: "Consultant Orthopaedic Surgeon", departmentId: "orthopaedics", biography: "Expert in joint replacement and trauma surgeries.", expertise: ["Joint Replacement", "Fracture Fixation"], displayOrder: 7 },
        { name: "Dr. L. Kumar", qualification: "MS", designation: "Consultant Orthopaedic Surgeon", departmentId: "orthopaedics", biography: "Specialist in arthroscopy and knee ligament reconstructions.", expertise: ["Knee Arthroscopy", "Ligament Reconstruction"], displayOrder: 8 },
        { name: "Dr. G. Gnana Prakasam", qualification: "MS", designation: "Consultant Orthopaedic & Pain Specialist", departmentId: "orthopaedics", biography: "Expert in polytrauma fractures and spine pain interventions.", expertise: ["Trauma Surgery", "Pain Management"], displayOrder: 9 },
        // Faciomaxillary Surgery
        { name: "Dr. B.S. Saravanan", qualification: "MDS", designation: "Consultant Faciomaxillary Surgeon", departmentId: "faciomaxillary", biography: "Expert in jaw alignment and facial reconstruction.", expertise: ["Jaw Reconstruction", "Facial Alignment"], displayOrder: 10 },
        { name: "Dr. Shankar Mohan", qualification: "MDS", designation: "Consultant Faciomaxillary Surgeon", departmentId: "faciomaxillary", biography: "Specialist in corrective jaw and facial plastic surgeries.", expertise: ["Jaw Surgery", "Craniofacial Repairs"], displayOrder: 11 },
        // Pain Clinic
        { name: "Dr. G. Balamurugan", qualification: "MD", designation: "Consultant Anaesthetist & Pain Specialist", departmentId: "pain-clinic", biography: "Expert in spinal blocks and chronic pain therapies.", expertise: ["Chronic Pain blocks", "ICU support"], displayOrder: 12 },
        // Anaesthesia
        // ENT
        { name: "Dr. K. Mahendran", qualification: "MS", designation: "Consultant ENT Surgeon", departmentId: "ent", biography: "Specialist in microscopic ear and throat surgeries.", expertise: ["Microscopic Ear Surgery", "Sinus Surgery"], displayOrder: 14 },
        // Ophthalmology
        { name: "Dr. R. Sathish Kumar", qualification: "MS", designation: "Consultant Ophthalmologist", departmentId: "ophthalmology", biography: "Expert in advanced cataract and laser vision correction.", expertise: ["Cataract Surgery", "Laser Correction"], displayOrder: 15 },
        // General Medicine
        { name: "Dr. R. Vinoth", qualification: "MD", designation: "Consultant Physician", departmentId: "general-medicine", biography: "Specialist in diabetes, hypertension, and internal medicine.", expertise: ["Diabetes Care", "Hypertension Management"], displayOrder: 16 },
        // General Surgery
        { name: "Dr. A. Gowtham Shankar", qualification: "MS", designation: "Consultant General Surgeon", departmentId: "general-surgery", biography: "Specialist in laparoscopic abdominal and general surgeries.", expertise: ["Laparoscopic Surgery", "Appendectomy"], displayOrder: 17 },
        { name: "Dr. C. Thirumalai Samy", qualification: "MS", designation: "Consultant General Surgeon", departmentId: "general-surgery", biography: "Experienced general abdominal surgical consultant.", expertise: ["Abdominal Surgery", "Hernia Repairs"], displayOrder: 18 },
        { name: "Dr. S. Ajay Venkatesan", qualification: "MS", designation: "Consultant General Surgeon", departmentId: "general-surgery", biography: "Expert in minor trauma interventions and laparoscopic procedures.", expertise: ["Laparoscopy", "General Trauma Support"], displayOrder: 19 },
        // Radiology
        { name: "Dr. P. Kumar", qualification: "MD", designation: "Consultant Radiologist", departmentId: "radiology", biography: "Expert in high-speed CT, MRI, and ultrasound diagnostics.", expertise: ["CT Scan Reading", "Ultrasound Diagnostics"], displayOrder: 20 },
        { name: "Dr. Ramachandran", qualification: "MD", designation: "Consultant Radiologist", departmentId: "radiology", biography: "Specialist in interventional radiology and diagnostic imaging.", expertise: ["Diagnostic Imaging", "MRI Reporting"], displayOrder: 21 },
        { name: "Dr. Elanchezhian", qualification: "MD", designation: "Consultant Radiologist", departmentId: "radiology", biography: "Expert in vascular ultrasound and emergency scanning.", expertise: ["Vascular Ultrasound", "Emergency Imaging"], displayOrder: 22 },
        // Medico-Legal
        { name: "Dr. S. Sasikumar", qualification: "MD", designation: "Medico-Legal Consultant", departmentId: "medico-legal", biography: "Advisor on forensic medicine and legal medical regulations.", expertise: ["Medico-Legal Advisory", "Forensics"], displayOrder: 235 }
      ];
      await Doctor.insertMany(mockDoctors);
      console.log("Physicians seeded!");
    }

    // Seed blogs if empty
    const blogsCount = await BlogPost.countDocuments();
    if (blogsCount === 0) {
      console.log("Seeding health articles...");
      const mockBlogs = [
        {
          title: "Best Neurosurgery Hospital in Salem: What Patients Should Know",
          slug: "best-neurosurgery-hospital-in-salem",
          excerpt: "How advanced diagnostic facilities, senior clinical leadership, and microsurgery theaters combine to offer world-class outcomes.",
          content: "<h3>Advanced Neurosurgical Standards in Salem</h3><p>When selecting a center for complex brain or spine surgeries, technology and surgical experience play key roles. SarvamCare Hospital features a dedicated Neuro Center utilizing high-resolution microscopic instrumentation, intraoperative monitoring, and senior leadership under Chief Consultant Dr. V. Suresh Kumar.</p><h4>Why Infrastructure Matters</h4><p>Microscopic precision reduces tissue damage, improves recovery windows, and raises the safety profile of skull-base and aneurysm surgeries.</p>",
          category: "Neurosurgery",
          tags: ["Neurosurgery", "Salem", "Health Tips"]
        },
        {
          title: "Understanding Stroke Symptoms: Act FAST",
          slug: "understanding-stroke-symptoms-fast",
          excerpt: "Learn how to recognize immediate stroke symptoms and coordinate urgent transfer to an advanced neuro emergency center.",
          content: "<h3>Stroke is a Medical Emergency</h3><p>A stroke occurs when blood flow to the brain is interrupted or reduced. Acting quickly can save lives and limit long-term disability.</p><h4>The FAST Test</h4><ul><li><strong>F - Face Drooping</strong>: Ask the person to smile. Does one side droop?</li><li><strong>A - Arm Weakness</strong>: Ask to raise both arms. Does one drift downward?</li><li><strong>S - Speech Difficulty</strong>: Is speech slurred or strange?</li><li><strong>T - Time to Call</strong>: Call the helpline (+91 94898 78908) immediately.</li></ul>",
          category: "Neurology",
          tags: ["Stroke", "Neurology", "Emergency"]
        }
      ];
      await BlogPost.insertMany(mockBlogs);
      console.log("Health articles seeded!");
    }

    // Seed gallery images if empty or outdated
    const galleryCount = await GalleryImage.countDocuments();
    if (galleryCount < 10) {
      console.log("Seeding default gallery images...");
      if (galleryCount > 0) {
        await GalleryImage.deleteMany({ imageUrl: { $in: [
          "/facilities/hospital_exterior.jpg",
          "/facilities/operating_theatre.jpg",
          "/facilities/icu_unit.jpg",
          "/facilities/diagnostic_imaging.jpg",
          "/facilities/modern_laboratory.jpg",
          "/facilities/patient_room.jpg",
          "/sarvam_logo.jpg"
        ] } });
      }
      const mockGallery = [
        {
          title: "Modern Hospital Entrance & Facade",
          description: "SarvamCare Hospital entrance showing safe drop-off bays and clean architectural layout.",
          category: "Infrastructure",
          imageUrl: "/facilities/hospital_exterior.jpg",
          altText: "SarvamCare Hospital Entrance"
        },
        {
          title: "Main Hospital Entrance Ramp",
          description: "Designed for premium accessibility with dedicated wheelchair-friendly ramps and safe patient drop-off zones.",
          category: "Infrastructure",
          imageUrl: "/sarvam_building_exterior.png",
          altText: "Main Hospital Entrance Ramp"
        },
        {
          title: "Advanced Modular Operating Theatre",
          description: "Neurosurgery-calibrated sterile operating suite featuring positive airflow filtration.",
          category: "Facilities",
          imageUrl: "/facilities/operating_theatre.jpg",
          altText: "Modular Operating Theatre"
        },
        {
          title: "Intensive Care Unit (ICU)",
          description: "14-bed Hybrid critical care unit with dedicated monitoring workstations.",
          category: "Facilities",
          imageUrl: "/facilities/icu_unit.jpg",
          altText: "Dedicated Critical Care ICU"
        },
        {
          title: "Premium Patient Recovery Suite",
          description: "Private single patient room featuring comfortable recovery beds and wooden finishes.",
          category: "Facilities",
          imageUrl: "/facilities/patient_room.jpg",
          altText: "Private Patient Suite"
        },
        {
          title: "Emergency Trauma Reception Area",
          description: "Spacious emergency reception lobby designed for quick patient registration and triage assessment.",
          category: "Facilities",
          imageUrl: "/hospital_hero_lobby.jpg",
          altText: "Emergency Trauma Reception Area"
        },
        {
          title: "High-Speed 32-Slice CT Scanner",
          description: "GE Revolution diagnostics for rapid trauma and brain scan procedures.",
          category: "Technology",
          imageUrl: "/facilities/diagnostic_imaging.jpg",
          altText: "Diagnostic CT Scan Machine"
        },
        {
          title: "Automated Clinical Pathology Laboratory",
          description: "Advanced diagnostic testing analyzers for blood panel assessments.",
          category: "Technology",
          imageUrl: "/facilities/modern_laboratory.jpg",
          altText: "High-Tech Diagnostics Laboratory"
        },
        {
          title: "Trauma Care & Neuro Center Board",
          description: "Official signage board highlighting the neurosurgery and trauma care specializations of SarvamCare Hospital.",
          category: "Technology",
          imageUrl: "/sarvam_trauma_neuro_board.png",
          altText: "Trauma Care & Neuro Center Board"
        },
        {
          title: "Senior Clinical Consultants Panel",
          description: "Experienced neurosurgeons, orthopaedicians, and critical care specialists during clinical reviews.",
          category: "Doctors",
          imageUrl: "/sarvam_logo.jpg",
          altText: "Senior Consultants Panel"
        },
        {
          title: "SarvamCare Hospital Sunset Campus",
          description: "Exterior view of the state-of-the-art building situated on Salem Bangalore Highway.",
          category: "Hospital",
          imageUrl: "/sarvam_hero_bg.jpg",
          altText: "SarvamCare Hospital Sunset Campus"
        }
      ];
      await GalleryImage.insertMany(mockGallery);
      console.log("Default gallery images seeded!");
    }
  })
  .catch(err => {
    console.error("MongoDB connection failed:", err);
  });

// Serve frontend static assets in production
if (process.env.NODE_ENV === "production" || true) {
  app.use(express.static(path.join(__dirname, "../dist")));
  
  app.get("*", async (req, res, next) => {
    // Exclude API, robots, and sitemap routes
    if (req.path.startsWith("/api") || req.path === "/sitemap.xml" || req.path === "/robots.txt") {
      return next();
    }
    
    try {
      const indexPath = path.join(__dirname, "../dist/index.html");
      if (fs.existsSync(indexPath)) {
        let html = fs.readFileSync(indexPath, "utf8");
        
        // Fetch SEO settings from database
        const seo = await SEOSettings.findOne();
        if (seo) {
          let metaTags = "";
          if (seo.googleVerification) {
            metaTags += `\n    <meta name="google-site-verification" content="${seo.googleVerification}" />`;
          }
          if (seo.globalTitle) {
            html = html.replace(/<title>.*?<\/title>/, `<title>${seo.globalTitle}</title>`);
          }
          if (seo.globalDescription) {
            // Replace description meta tag
            html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${seo.globalDescription}" />`);
          }
          if (metaTags) {
            html = html.replace("</head>", `${metaTags}\n  </head>`);
          }
        }
        return res.send(html);
      }
      res.sendFile(indexPath);
    } catch (err) {
      console.error("SEO Injector error:", err);
      res.sendFile(path.join(__dirname, "../dist/index.html"));
    }
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
export default app;
