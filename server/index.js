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
    if (doctorCount === 0) {
      console.log("Seeding complete physician listings...");
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
        { name: "Dr. G. Gnana Prakasam", qualification: "MS", designation: "Consultant Orthopaedic & Pain Specialist", departmentId: "pain-clinic", biography: "Expert in polytrauma fractures and spine pain interventions.", expertise: ["Trauma Surgery", "Pain Management"], displayOrder: 13 },
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

    // Seed blogs if empty or outdated
    const blogsCount = await BlogPost.countDocuments();
    if (blogsCount < 3) {
      console.log("Seeding health articles...");
      if (blogsCount > 0) {
        await BlogPost.deleteMany({});
      }
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
        },
        {
          title: "தலைகாயம் குறித்த விழிப்புணர்வு கையேடு | Head Injury Manual",
          slug: "head-injury-manual-tamil",
          excerpt: "தலைகாயங்களை பற்றி நீங்கள் எளிதாக புரிந்து கொள்ள மற்றும் சிகிச்சைகளை தெரிந்து கொள்ள இந்த கையேடு உதவும்.",
          content: "<h3>தலைகாயம் குறித்த விழிப்புணர்வு கையேடு (Head Injury Manual)</h3><p>தலைகாயங்களை பற்றி நீங்கள் எளிதாக புரிந்து கொள்ள இந்த கையேடு உதவும். தலைகாயத்தினால் ஏற்படும் மூளை பாதிப்புகளில் இருந்து எவ்வளவு தூரம் குணமடைவார்கள் என்பது தலைகாயத்தின் தீவிரம் மற்றும் எவ்வளவு விரைவாக சிகிச்சைகளை தொடங்குகிறோம் என்பதை பொறுத்தே அமைகிறது.</p><h4>Glasgow Coma Scale (GCS) - கோமா அளவுகோல்</h4><p>தலைகாயத்தின் தீவிர தன்மையை கோமா அளவுகோலின் படி (கிளாஸ்கோ கோமா அளவுகோல் - GCS) நீங்களே மதிப்பிடலாம். 13 புள்ளிகளுக்கு குறைவாக உள்ள நோயாளிகள் எவ்வளவு தூரம் குணமடைவார்கள், சுய உணர்வு திரும்புமா என்பதை தெரிந்து கொள்ளவே 5 முதல் 7 நாட்கள் தேவைப்படும். ஏனென்றால் மூளையில் ஏற்பட்ட இரத்த கசிவுகள் சுமார் 20% (10 பேரில் 2 பேருக்கு) அதிகரிக்கலாம். மேலும் மூளை வீக்கமானது முதல் 5 முதல் 7 நாட்கள் வரை அதிகமாகி பின்பு குறைய ஆரம்பிக்கும்.</p><h5>அதிக ஆபத்துள்ளவர்கள் (High-Risk Groups):</h5><ul><li>வயதானவர்கள் (60 வயதிற்கு மேல்)</li><li>சர்க்கரை / உயர் இரத்த அழுத்தம் உள்ளவர்கள்</li><li>மதுபோதையில் உள்ளவர்கள்</li><li>இரத்தம் உறைவதை தடுக்கும் மருந்து சாப்பிடுபவர்கள்</li><li>அதிக அளவில் இரத்த கசிவினால் பாதிக்கப்பட்டவர்கள்</li></ul><h4>தலைகாயத்திற்கான 3 கட்ட சிகிச்சை முறைகள்</h4><p>தலைகாயத்திற்கான (வைத்திய) சிகிச்சை முறைகள் மூளையில் ஏற்பட்ட பாதிப்புகளை பொறுத்து மூன்று கட்டங்களாக உள்ளது:</p><ol><li><strong>முதல் கட்டம்:</strong> மருந்துகள் மூலம் மூளை வீக்கத்தை கட்டுப்படுத்துவது.</li><li><strong>இரண்டாவது கட்டம்:</strong> செயற்கை சுவாச கருவியில் (வெண்டிலேட்டர்) ICUவில் வைத்திருப்பது. <em>பின்குறிப்பு:</em> மூச்சு விடமுடியாமல் (சுவாசிக்க) இருப்பவர்களை வெண்டிலேட்டரில் வைத்திருப்பது போல் அல்ல, இது மூளை வீக்கத்தை கட்டுப்படுத்துவது ஒரு (வைத்திய) சிகிச்சை முறை.</li><li><strong>மூன்றாம் கட்டம்:</strong> மருந்து மற்றும் வெண்டிலேட்டர் சிகிச்சைகளால் பலன் இல்லாத நிலையில் <strong>தலைகாய அறுவைசிகிச்சை (Neurosurgery)</strong> மேற்கொள்ளப்படும்.</li></ol><h4>தலைகாய அறுவைசிகிச்சை என்றால் என்ன?</h4><p>தலைகாய அறுவைசிகிச்சை (Decompressive Craniectomy) என்பது மண்டை ஓட்டை (கபால எலும்பு - Skull Bone) திறந்து மூளை விரிவடைய இடத்தை (Space) உருவாக்குவது மட்டும்தான். (அடிபட்ட) காயம்பட்ட மூளை அதுவாகத்தான் குணமாக வேண்டும். தலைகாய அறுவை சிகிச்சையை மற்ற அறுவை சிகிச்சைகளுடன் ஒப்பிட கூடாது.</p><p>மேற்சொன்ன இந்த மூன்று வகையான (வைத்திய) சிகிச்சை முறைகள் ஒரே நோயாளிக்கும் ஒரே சமயத்திலும் தேவைப்படலாம். நீங்கள் எந்த பெரிய மருத்துவமனைக்கு சென்றாலும், எவ்வளவு செலவு செய்ய தயாராக இருந்தாலும் மேற்சொன்ன 3 சிகிச்சை முறைகளை தாண்டி எதுவும் செய்வதற்கில்லை.</p><h4>நவீன வசதிகள் மற்றும் நிபுணர்கள்</h4><p>மேற்சொன்ன (வைத்திய) சிகிச்சை முறைகளை தடங்கல் இன்றி செய்வதற்கு தேவையான நவீன மற்றும் மருத்துவ நிபுணர்கள் (ஸ்பெஷலிஸ்ட்) வசதிகள் நமது மருத்துவமனையில் தயாராக உள்ளன. மருத்துவர்களின் கடமையானது நோயாளிகளின் பாதிப்புகளை சரியாக கண்டுபிடித்து அதற்கு தேவையான சிகிச்சைகளை தாமதமின்றி செய்வது மட்டுமே. சிகிச்சையின் பலனை மருத்துவர்கள் மட்டுமே தீர்மானிக்க முடியாது.</p><p>மேற்கொண்டு இம்மருத்துவமனையில் சிகிச்சையை தொடர்வது உங்களது முடிவாகும். சிகிச்சையை தொடரும் பட்சத்தில் உங்கள் நோயாளி குறித்த சிகிச்சை விபரங்களை (டிரீட்மெண்ட் சம்மரி - Treatment Summary) எங்களிடம் பெற்றுக்கொண்டு மற்ற தலைகாய மருத்துவ நிபுணர்களை கலந்தாலோசிக்கவும் உங்களை கேட்டுக்கொள்கிறோம்.</p>",
          category: "Neurosurgery",
          tags: ["Head Injury", "Tamil", "Neurosurgery", "Clinical Guidelines"]
        }
      ];
      await BlogPost.insertMany(mockBlogs);
      console.log("Health articles seeded!");
    }

    // Seed gallery images if empty or reset
    const galleryCount = await GalleryImage.countDocuments();
    if (galleryCount === 0) {
      console.log("Seeding 51 default gallery images...");
      const newGalleryMetadata = [
        {
          "filename": "IMG-20260809-WA0011(1).jpg",
          "title": "SarvamCare Brain, Spine & Mind Care Services",
          "description": "Informational flyer highlighting specialized centers at SarvamCare Hospital, including the Brain & Spine Center, Spine & Head Injury Management, and Sahasra Mind Clinix for psychiatry and psychology.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260809-WA0011.jpg",
          "title": "SarvamCare Specialized Neuroscience & Mind Services",
          "description": "Healthcare promotional flyer outlining key clinical divisions at SarvamCare Hospital, including Brain & Spine Care, Trauma & Head Injury Management, and Psychiatry Services.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260809-WA0014.jpg",
          "title": "World Brain Day Awareness Flyer",
          "description": "SarvamCare Neuro Center awareness poster celebrating World Brain Day under the motto 'Tribute to Thinking Organ' and 'Safe surgery Save neurons'.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260809-WA0015.jpg",
          "title": "SarvamCare Neuro Center and Spine Clinic",
          "description": "Clinical flyer presenting advanced surgical centers for brain, spine, and spinal cord care with the motto 'Safe surgery Save neurons' at SarvamCare Hospital.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260809-WA0018(1).jpg",
          "title": "Sarvam Care Neuron Center Banner",
          "description": "Branding banner in Tamil for Sarvam Care Neuron Center, representing the center for neurological treatments located in Mamangam, Salem.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260809-WA0018.jpg",
          "title": "Sarvam Care Neuron Center Tamil Banner",
          "description": "Promotional horizontal banner for Sarvam Care Neuron Center, highlighting comprehensive neurological medical services in Mamangam, Salem.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260809-WA0021.jpg",
          "title": "Sahasra Mind Clinix Mental Health Services",
          "description": "Promotional flyer for Sahasra Mind Clinix at SarvamCare Hospital promoting psychiatric and psychological care under the theme 'Solutions For beautiful mind'.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260809-WA0024.jpg",
          "title": "SarvamCare Multi-Specialty Surgical Care",
          "description": "Hospital flyer outlining specialized surgical treatments including Brain & Spine Surgery, Trauma Surgery, Stroke Management, Facial Surgery, and Bone & Joint Surgery.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260809-WA0025.jpg",
          "title": "NeuronCenter Precision Care - Philippe Dufour Concept",
          "description": "Thematic poster comparing the micromechanical precision and devotion of master watchmaker Philippe Dufour with the precision required in neurosciences at NeuronCenter.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260809-WA0029(1).jpg",
          "title": "Endoscopic & Microscopic Surgery for Pituitary Adenomas",
          "description": "Medical informational flyer illustrating preoperative and postoperative sagittal anatomical views of pituitary adenoma excision at SarvamCare Neuro Center.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260809-WA0029.jpg",
          "title": "Pituitary Adenomas Surgical Excision Guide",
          "description": "Educational clinical poster showcasing advanced endoscopic and microscopic surgical techniques for pituitary adenomas with sagittal medical illustrations.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260809-WA0030.jpg",
          "title": "SarvamCare Multi-Department Specialty Services",
          "description": "Comprehensive department overview flyer detailing Brain & Spine Treatment, Trauma Care, Psychiatry & Psychology, Craniofacial Surgery, and Orthopaedic Surgery.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260809-WA0031(1).jpg",
          "title": "Trigeminal Neuralgia Integrated Treatment Center",
          "description": "Medical awareness flyer on Trigeminal Neuralgia covering full-spectrum management from medical therapy to microvascular surgical intervention at SarvamCare Neuro Center.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260809-WA0031.jpg",
          "title": "Trigeminal Neuralgia Treatment - Neuro Center",
          "description": "Informational flyer from Sarvam Care Hospital Neuro Center outlining medical and surgical management options for trigeminal neuralgia.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260811-WA0003.jpg",
          "title": "Brain and Spine Surgery - Sarvam Care Neuro Center",
          "description": "Hospital flyer promoting brain and spinal surgery expertise and consultation services at Sarvam Care Neuro Center in Salem.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260811-WA0004.jpg",
          "title": "Center for Craniofacial Reconstruction Surgery",
          "description": "Medical services flyer highlighting craniofacial deformity corrections, trauma care, rhinoplasty, oculoplasty, and a multidisciplinary surgical team.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260811-WA0005(1).jpg",
          "title": "Safe Brain & Spine Surgery Philosophy",
          "description": "Inspirational poster quoting Hippocrates and Harvey Cushing, underscoring safe neurosurgery and the balance of science and artistry in medicine.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260811-WA0006.jpg",
          "title": "Neuron Center - Precision in Neurosciences",
          "description": "Promotional poster emphasizing micro-surgical precision and neural preservation inspired by master horological craftsmanship.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260811-WA0007.jpg",
          "title": "Neurosurgical Awareness & Safe Surgery",
          "description": "Educational flyer advising on timely intervention for brain and spine conditions utilizing modern surgical technologies.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260811-WA0008.jpg",
          "title": "Spine Care & Back Pain Consultation",
          "description": "Informational flyer for back pain evaluation, minimally invasive and endoscopic spine surgeries by Chief Neurosurgeon Dr. V. Sureshkumar.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260812-WA0009.jpg",
          "title": "GE Revolution CT Scanner",
          "description": "Advanced GE Revolution CT scanner featuring high-precision diagnostic imaging and an automated motorized patient table.",
          "category": "Technology"
        },
        {
          "filename": "IMG-20260812-WA0010.jpg",
          "title": "Advanced Microsurgical Operating Microscope",
          "description": "Operating room setup showing a neurosurgeon performing delicate microsurgery using a high-magnification surgical microscope and neural imaging guidance.",
          "category": "Technology"
        },
        {
          "filename": "IMG-20260813-WA0006.jpg",
          "title": "Sarvam Care Specialty Centers & Clinical Departments",
          "description": "Overview poster detailing specialized departments including Brain & Nerves, Trauma Care, Spine Clinic, Orthopaedic Surgery, Psychiatry, and Craniofacial Surgery.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260813-WA0103.jpg",
          "title": "Prof. Robert F. Spetzler with Dr. V. Sureshkumar",
          "description": "Dr. V. Sureshkumar photographed alongside renowned cerebrovascular and skull base neurosurgeon Prof. Robert F. Spetzler, former President and CEO of Barrow Neurological Institute.",
          "category": "Doctors"
        },
        {
          "filename": "IMG-20260813-WA0104.jpg",
          "title": "Prof. Tetsuo Kanno with Dr. V. Sureshkumar",
          "description": "Dr. V. Sureshkumar pictured alongside the late Prof. Tetsuo Kanno, founder of the neurosurgery department at Fujita Health University, Japan.",
          "category": "Doctors"
        },
        {
          "filename": "IMG-20260813-WA0105.jpg",
          "title": "Prof. Mahmut Gazi Yasargil with Dr. V. Sureshkumar",
          "description": "Dr. V. Sureshkumar in attendance with Prof. Mahmut Gazi Yasargil, celebrated as the father of modern microneurosurgery.",
          "category": "Doctors"
        },
        {
          "filename": "IMG-20260813-WA0106(1).jpg",
          "title": "Mentorship with Prof. Albino Bricolo",
          "description": "Prof. Albino Bricolo (1934–2015), Professor of Neurosurgery at the University of Verona, Italy, distinguished for his pioneering work on skull base tumors and craniopharyngiomas.",
          "category": "Doctors"
        },
        {
          "filename": "IMG-20260813-WA0106.jpg",
          "title": "Mentorship with Prof. Albino Bricolo",
          "description": "Prof. Albino Bricolo (1934–2015), Professor of Neurosurgery at the University of Verona, Italy, distinguished for his pioneering work on skull base tumors and craniopharyngiomas.",
          "category": "Doctors"
        },
        {
          "filename": "IMG-20260813-WA0107.jpg",
          "title": "Academic Interaction with Prof. Michael L. J. Apuzzo",
          "description": "Prof. Michael L. J. Apuzzo from Keck School of Medicine, USA, renowned neurosurgeon recognized worldwide for surgical approaches in and around the third ventricle.",
          "category": "Doctors"
        },
        {
          "filename": "IMG-20260813-WA0108.jpg",
          "title": "Mentorship with Prof. Arnold H. Menezes",
          "description": "Prof. Arnold Menezes (1944–2025), Professor of Neurosurgery at Iowa University Hospital for 5 decades and pioneer in craniovertebral junction and pediatric spine diseases.",
          "category": "Doctors"
        },
        {
          "filename": "IMG-20260814-WA0003.jpg",
          "title": "Brain & Spinal Cord Tumors Care - Sarvam Care Hospital",
          "description": "Information on Sarvam Care Hospital Neuro Center highlighting specialized protocols for precise, gross total tumor excision using microsurgery and endoscopic surgical facilities.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260814-WA0004.jpg",
          "title": "மூளை & தண்டுவட கட்டிகள் சிகிச்சை - சர்வம் கேர் நியூரோ சென்டர்",
          "description": "சர்வம் கேர் நியூரோ சென்டரின் நவீன மைக்ரோஸ்கோப் மற்றும் எண்டாஸ்கோப்பி அறுவை சிகிச்சை வசதிகள் மற்றும் மூளை, தண்டுவட கட்டிகளுக்கான சிறப்பு சிகிச்சைகள் குறித்த விவரம்.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260814-WA0005.jpg",
          "title": "Interaction with Prof. Jacques Brotchi",
          "description": "Prof. Jacques Brotchi, Belgian Professor of Neurosurgery and internationally recognized expert in spinal cord tumor surgery.",
          "category": "Doctors"
        },
        {
          "filename": "IMG-20260814-WA0006.jpg",
          "title": "Interaction with Prof. Atul Goel",
          "description": "Prof. Atul Goel, innovative neurosurgeon from Mumbai whose visionary insights changed the paradigm of cranio-vertebral junction pathology and its management protocols.",
          "category": "Doctors"
        },
        {
          "filename": "IMG-20260814-WA0007.jpg",
          "title": "Mentorship with Prof. Yoshio Suzuki",
          "description": "Prof. Yoshio Suzuki (1947–2008) from Nagoya, Japan, eminent cerebrovascular surgeon and esteemed mentor for neurosurgical graduates across the world.",
          "category": "Doctors"
        },
        {
          "filename": "IMG-20260817-WA0003.jpg",
          "title": "Mentorship with Prof. Suburam",
          "description": "Prof. Suburam, neurosurgeon, exemplifying neurosurgical craftsmanship (செய்நேர்த்தி), perseverance, simplified algorithms for complex conditions, and delicate handling of neural structures.",
          "category": "Doctors"
        },
        {
          "filename": "IMG-20260819-WA0026.jpg",
          "title": "Academic Meeting with Prof. Juha Hernesniemi",
          "description": "Prof. Juha Hernesniemi (1947–2023), Finnish neurosurgeon from Helsinki who pioneered concepts of simple and clean surgery emphasizing that 'a surgeon should not have surprise on table'.",
          "category": "Doctors"
        },
        {
          "filename": "IMG-20260819-WA0027.jpg",
          "title": "Interaction with Prof. Andrew H. Kaye",
          "description": "Prof. Andrew Kaye, distinguished neurosurgeon from Australia practicing in Israel, renowned worldwide for brain tumor and skull base surgery.",
          "category": "Doctors"
        },
        {
          "filename": "IMG-20260819-WA0028.jpg",
          "title": "Meeting with Dr. A.P.J. Abdul Kalam",
          "description": "Meeting with former President Dr. A.P.J. Abdul Kalam, reflecting on his inspiring philosophy from 'Agni Siragugal' that 'if the student is ready, the teacher will appear'.",
          "category": "Doctors"
        },
        {
          "filename": "IMG-20260819-WA0030.jpg",
          "title": "Prof. Laligam Sekar - Skull Base & Vascular Neurosurgeon",
          "description": "Prof. Laligam Sekar from University of Washington, USA, renowned neurosurgeon specializing in complex skull base tumor surgery and vascular revascularization techniques.",
          "category": "Doctors"
        },
        {
          "filename": "IMG-20260819-WA0031.jpg",
          "title": "Prof. P. Namperumalsamy - Vitreo-Retinal Surgeon & Mentor",
          "description": "Prof. Namperumalsamy, pioneering vitreo-retinal surgeon and instrumental leader in the establishment of the Aravind Eye Care System.",
          "category": "Doctors"
        },
        {
          "filename": "IMG-20260819-WA0032.jpg",
          "title": "Prof. R.N. Bhattacharya - Revered Indian Neurosurgeon",
          "description": "Prof. R.N. Bhattacharya, revered Indian neurosurgeon and respected clinical mentor known for tenacity and dedication to neurosurgery.",
          "category": "Doctors"
        },
        {
          "filename": "IMG-20260819-WA0035.jpg",
          "title": "Prof. Sébastien Froelich - Endoscopic Skull Base Surgeon",
          "description": "Prof. Sébastien Froelich, neurosurgeon at Paris University Hospital, specialized in endoscopic skull base surgery and keyhole microsurgery.",
          "category": "Doctors"
        },
        {
          "filename": "IMG-20260819-WA0036.jpg",
          "title": "Prof. Madjid Samii - Master Neurosurgeon",
          "description": "Prof. Madjid Samii, founder of the International Neuroscience Institute (INI) in Hannover, Germany, and pioneer in vestibular schwannoma tumor surgery.",
          "category": "Doctors"
        },
        {
          "filename": "IMG-20260820-WA0011(1).jpg",
          "title": "Brain & Spinal Cord Tumors - Microsurgery & Endoscopy Flyer",
          "description": "SarvamCare Neuro Center flyer featuring conceptualized treatment protocols, microsurgery, and endoscopic surgery for brain and spinal cord tumor excision.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260820-WA0011.jpg",
          "title": "Comprehensive Brain & Spinal Cord Tumor Care Flyer",
          "description": "Informational flyer on SarvamCare Neuro Center's advanced microscopic and endoscopic tumor surgery services.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260820-WA0012.jpg",
          "title": "Brain & Spine Tumor Management Flyer (Tamil)",
          "description": "SarvamCare Neuron Center flyer in Tamil detailing safe, advanced microscopic and endoscopic surgical facilities for brain and spinal cord tumor excision.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260820-WA0013.jpg",
          "title": "Neurosurgery Awareness & Timely Care Flyer (Tamil)",
          "description": "SarvamCare Neuron Center public awareness flyer in Tamil highlighting the safety of modern neural surgeries and the critical importance of timely treatment.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260820-WA0014.jpg",
          "title": "Pituitary Adenoma Endoscopic & Microscopic Surgery Flyer",
          "description": "SarvamCare Neuro Center flyer displaying preoperative and postoperative sagittal anatomical views for pituitary adenoma excision.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260820-WA0015.jpg",
          "title": "Center for Craniofacial Reconstruction Surgery Flyer",
          "description": "SarvamCare Smiling Monk Craniofacial Aesthetic Clinics flyer detailing services for facial trauma, deformity corrections, oculoplasty, and rhinoplasty.",
          "category": "Flyers"
        },
        {
          "filename": "IMG-20260820-WA0016.jpg",
          "title": "Safe Neurosurgery & Neural Preservation Flyer (Tamil)",
          "description": "Public awareness flyer in Tamil underscoring safe neurosurgical technologies and the necessity of preventing delays in brain and spinal procedures.",
          "category": "Flyers"
        }
      ];

      const imagesDir = path.join(__dirname, "../public/Gallery Images");
      let seededCount = 0;
      for (const meta of newGalleryMetadata) {
        const filePath = path.join(imagesDir, meta.filename);
        if (fs.existsSync(filePath)) {
          try {
            const fileBuffer = fs.readFileSync(filePath);
            const ext = path.extname(meta.filename).toLowerCase();
            let mime = "image/jpeg";
            if (ext === ".png") mime = "image/png";
            const base64Data = `data:${mime};base64,${fileBuffer.toString("base64")}`;

            const newImg = new GalleryImage({
              title: meta.title,
              description: meta.description,
              category: meta.category,
              image: base64Data,
              imageUrl: ""
            });
            await newImg.save();
            newImg.imageUrl = `/api/gallery/image/${newImg._id}`;
            await newImg.save();
            seededCount++;
          } catch (e) {
            console.error(`Error seeding image file ${meta.filename}:`, e);
          }
        }
      }
      console.log(`Successfully seeded ${seededCount} gallery images.`);
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
