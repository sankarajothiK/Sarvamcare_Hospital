import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { 
  Admin, Doctor, Department, BlogPost, HealthPackage, 
  GalleryImage, Appointment, ContactEnquiry, Career, SiteSettings, SEOSettings 
} from "./models.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "sarvamcare_jwt_secret_token_key";

// Authentication Middleware
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization denied" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// --- AUTHENTICATION ---
router.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, username: admin.username }, JWT_SECRET, { expiresIn: "24h" });
    admin.lastLogin = new Date();
    await admin.save();

    res.json({ token, username: admin.username });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/auth/verify", authMiddleware, (req, res) => {
  res.json({ valid: true, username: req.admin.username });
});

// --- DOCTORS ---
router.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ displayOrder: 1 });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/doctors", authMiddleware, async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/doctors/:id", authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(doctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/doctors/:id", authMiddleware, async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- DEPARTMENTS ---
router.get("/departments", async (req, res) => {
  try {
    const depts = await Department.find();
    res.json(depts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/departments/:slug", async (req, res) => {
  try {
    const dept = await Department.findOne({ slug: req.params.slug });
    if (!dept) return res.status(404).json({ message: "Department not found" });
    res.json(dept);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/departments", authMiddleware, async (req, res) => {
  try {
    const dept = new Department(req.body);
    await dept.save();
    res.status(201).json(dept);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/departments/:id", authMiddleware, async (req, res) => {
  try {
    const dept = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(dept);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/departments/:id", authMiddleware, async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- BLOG POSTS ---
router.get("/blogs", async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ publishDate: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/blogs/:slug", async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/blogs", authMiddleware, async (req, res) => {
  try {
    const post = new BlogPost(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/blogs/:id", authMiddleware, async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/blogs/:id", authMiddleware, async (req, res) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- HEALTH PACKAGES ---
router.get("/packages", async (req, res) => {
  try {
    const pkgs = await HealthPackage.find();
    res.json(pkgs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/packages", authMiddleware, async (req, res) => {
  try {
    const pkg = new HealthPackage(req.body);
    await pkg.save();
    res.status(201).json(pkg);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/packages/:id", authMiddleware, async (req, res) => {
  try {
    const pkg = await HealthPackage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(pkg);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/packages/:id", authMiddleware, async (req, res) => {
  try {
    await HealthPackage.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- GALLERY IMAGES ---
router.get("/gallery", async (req, res) => {
  try {
    const imgs = await GalleryImage.find().sort({ createdAt: -1 });
    res.json(imgs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Dynamic image serving endpoint
router.get("/gallery/image/:id", async (req, res) => {
  try {
    const img = await GalleryImage.findById(req.params.id);
    if (!img || !img.image) {
      return res.status(404).send("Image not found");
    }
    
    let contentType = "image/jpeg";
    if (img.image.startsWith("data:")) {
      const match = img.image.match(/data:([^;]+);/);
      if (match) {
        contentType = match[1];
      }
    }
    
    const base64Data = img.image.replace(/^data:image\/\w+;base64,/, "");
    const imgBuffer = Buffer.from(base64Data, 'base64');
    
    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': imgBuffer.length
    });
    res.end(imgBuffer);
  } catch (err) {
    res.status(500).send("Error serving image");
  }
});

router.post("/gallery", authMiddleware, async (req, res) => {
  try {
    const { title, description, category, image } = req.body;
    if (!title || !description || !image) {
      return res.status(400).json({ message: "Please provide an image, title, and description." });
    }

    const img = new GalleryImage({
      title,
      description,
      category: category || "Hospital",
      image,
      imageUrl: ""
    });

    await img.save();
    
    // Set dynamic route path
    img.imageUrl = `/api/gallery/image/${img._id}`;
    await img.save();

    res.status(201).json(img);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/gallery/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description, category, tags, image, altText } = req.body;
    const updateData = { title, description, category, tags, altText };
    
    if (image && image.startsWith("data:")) {
      updateData.image = image;
    }
    
    const img = await GalleryImage.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(img);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/gallery/:id", authMiddleware, async (req, res) => {
  try {
    await GalleryImage.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- APPOINTMENTS (REQUESTS) ---
router.get("/appointments", authMiddleware, async (req, res) => {
  try {
    const appts = await Appointment.find().sort({ createdAt: -1 });
    res.json(appts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/appointments", async (req, res) => {
  try {
    const appt = new Appointment(req.body);
    await appt.save();
    res.status(201).json(appt);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/appointments/:id", authMiddleware, async (req, res) => {
  try {
    const appt = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(appt);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --- ENQUIRIES ---
router.get("/enquiries", authMiddleware, async (req, res) => {
  try {
    const enqs = await ContactEnquiry.find().sort({ createdAt: -1 });
    res.json(enqs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/enquiries", async (req, res) => {
  try {
    const enq = new ContactEnquiry(req.body);
    await enq.save();
    res.status(201).json(enq);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/enquiries/:id", authMiddleware, async (req, res) => {
  try {
    const enq = await ContactEnquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(enq);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --- CAREERS ---
router.get("/careers", async (req, res) => {
  try {
    const jobs = await Career.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/careers", authMiddleware, async (req, res) => {
  try {
    const job = new Career(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/careers/:id", authMiddleware, async (req, res) => {
  try {
    const job = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(job);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/careers/:id", authMiddleware, async (req, res) => {
  try {
    await Career.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- SITE SETTINGS ---
router.get("/settings", async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings();
      await settings.save();
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/settings", authMiddleware, async (req, res) => {
  try {
    const settings = await SiteSettings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(settings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --- SEO SETTINGS ---
router.get("/seo", async (req, res) => {
  try {
    let seo = await SEOSettings.findOne();
    if (!seo) {
      seo = new SEOSettings();
      await seo.save();
    }
    res.json(seo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/seo", authMiddleware, async (req, res) => {
  try {
    const seo = await SEOSettings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(seo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --- DASHBOARD STATISTICS ---
router.get("/dashboard/stats", authMiddleware, async (req, res) => {
  try {
    const doctorsCount = await Doctor.countDocuments();
    const deptsCount = await Department.countDocuments();
    const blogCount = await BlogPost.countDocuments();
    const galleryCount = await GalleryImage.countDocuments();
    const packagesCount = await HealthPackage.countDocuments();
    const apptsPending = await Appointment.countDocuments({ status: "pending" });
    const enqsUnread = await ContactEnquiry.countDocuments({ status: "unread" });

    res.json({
      doctors: doctorsCount,
      departments: deptsCount,
      blogs: blogCount,
      gallery: galleryCount,
      packages: packagesCount,
      pendingAppointments: apptsPending,
      unreadEnquiries: enqsUnread
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
