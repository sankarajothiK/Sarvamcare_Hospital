import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  LayoutDashboard, Users, Layers, BookOpen, Image as ImageIcon, 
  Settings, Mail, LogOut, Trash2, Edit, Heart, Calendar, Menu, X
} from "lucide-react";

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({
    doctors: 0,
    departments: 0,
    blogs: 0,
    gallery: 0,
    packages: 0,
    pendingAppointments: 0,
    unreadEnquiries: 0
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("sarvamcare_admin_token");
  const username = localStorage.getItem("sarvamcare_admin_user") || "Admin";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const selectTab = (tabName: string) => {
    setActiveTab(tabName);
    setIsSidebarOpen(false);
  };

  // CRUD Lists
  const [doctorsList, setDoctorsList] = useState<any[]>([]);
  const [deptsList, setDeptsList] = useState<any[]>([]);
  const [blogsList, setBlogsList] = useState<any[]>([]);
  const [galleryList, setGalleryList] = useState<any[]>([]);
  const [packagesList, setPackagesList] = useState<any[]>([]);
  const [appointmentsList, setAppointmentsList] = useState<any[]>([]);
  const [enquiriesList, setEnquiriesList] = useState<any[]>([]);

  // Doctors Form States
  const [docForm, setDocForm] = useState({ name: "", qualification: "", designation: "", departmentId: "neurosurgery", biography: "", expertise: "", displayOrder: 0, profileImage: "" });
  const [editingDocId, setEditingDocId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  // Departments Form States
  const [deptForm, setDeptForm] = useState({ name: "", tamilName: "", slug: "", description: "", services: "", seoTitle: "", seoDescription: "" });
  const [editingDeptId, setEditingDeptId] = useState<string | null>(null);

  // Health Packages Form States
  const [pkgForm, setPkgForm] = useState({ name: "", description: "", price: 0, tests: "", consultations: "", validity: "1 Month" });
  const [editingPkgId, setEditingPkgId] = useState<string | null>(null);

  // Blog CMS Form States
  const [blogForm, setBlogForm] = useState({ title: "", slug: "", excerpt: "", content: "", category: "Neurosurgery", tags: "", author: "Clinical Team" });
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  // Gallery CMS Form States
  const [galForm, setGalForm] = useState({ title: "", description: "", category: "Hospital", tags: "", imageUrl: "/sarvam_logo.jpg", altText: "" });

  // Site Settings Form States
  const [settingsForm, setSettingsForm] = useState({ phone: "", whatsapp: "", email: "", address: "", emergencyNumber: "", googleMapsUrl: "" });
  const [seoForm, setSeoForm] = useState({ globalTitle: "", globalDescription: "", googleVerification: "", gtmId: "", ga4MeasurementId: "" });

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const loadData = async () => {
      try {
        const headers = { "Authorization": `Bearer ${token}` };

        // 1. Stats
        const statsRes = await fetch("/api/dashboard/stats", { headers });
        if (statsRes.ok) setStats(await statsRes.json());

        // 2. Doctors
        const docRes = await fetch("/api/doctors");
        if (docRes.ok) setDoctorsList(await docRes.json());

        // 3. Departments
        const deptRes = await fetch("/api/departments");
        if (deptRes.ok) setDeptsList(await deptRes.json());

        // 4. Blogs
        const blogRes = await fetch("/api/blogs");
        if (blogRes.ok) setBlogsList(await blogRes.json());

        // 5. Gallery
        const galRes = await fetch("/api/gallery");
        if (galRes.ok) setGalleryList(await galRes.json());

        // 6. Packages
        const pkgRes = await fetch("/api/packages");
        if (pkgRes.ok) setPackagesList(await pkgRes.json());

        // 7. Appointments & Enquiries
        const apptRes = await fetch("/api/appointments", { headers });
        if (apptRes.ok) setAppointmentsList(await apptRes.json());

        const enqRes = await fetch("/api/enquiries", { headers });
        if (enqRes.ok) setEnquiriesList(await enqRes.json());

        // 8. Site Settings
        const settingsRes = await fetch("/api/settings");
        if (settingsRes.ok) {
          const data = await settingsRes.json();
          setSettingsForm({
            phone: data.phone,
            whatsapp: data.whatsapp,
            email: data.email,
            address: data.address,
            emergencyNumber: data.emergencyNumber,
            googleMapsUrl: data.googleMapsUrl
          });
        }

        // 9. SEO Settings
        const seoRes = await fetch("/api/seo");
        if (seoRes.ok) {
          const data = await seoRes.json();
          setSeoForm({
            globalTitle: data.globalTitle,
            globalDescription: data.globalDescription,
            googleVerification: data.googleVerification,
            gtmId: data.gtmId,
            ga4MeasurementId: data.ga4MeasurementId
          });
        }

      } catch (err) {
        console.error("Dashboard data load failed");
      }
    };

    loadData();
  }, [token, navigate, activeTab]);

  const handleLogout = () => {
    localStorage.removeItem("sarvamcare_admin_token");
    localStorage.removeItem("sarvamcare_admin_user");
    navigate("/");
  };

  // --- DOCTOR CRUD HANDLERS ---
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDocForm(prev => ({ ...prev, profileImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalForm(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    const headers = { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    };
    const body = {
      ...docForm,
      expertise: docForm.expertise.split(",").map(s => s.trim()).filter(Boolean)
    };

    try {
      if (editingDocId) {
        const res = await fetch(`/api/doctors/${editingDocId}`, { method: "PUT", headers, body: JSON.stringify(body) });
        if (res.ok) {
          setEditingDocId(null);
          setDocForm({ name: "", qualification: "", designation: "", departmentId: "neurosurgery", biography: "", expertise: "", displayOrder: 0, profileImage: "" });
        }
      } else {
        const res = await fetch("/api/doctors", { method: "POST", headers, body: JSON.stringify(body) });
        if (res.ok) {
          setDocForm({ name: "", qualification: "", designation: "", departmentId: "neurosurgery", biography: "", expertise: "", displayOrder: 0, profileImage: "" });
        }
      }
      setActiveTab("doctors"); // Trigger reload
    } catch (err) {
      console.error(err);
    }
  };

  const deleteDoctor = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await fetch(`/api/doctors/${id}`, { 
        method: "DELETE", 
        headers: { "Authorization": `Bearer ${token}` } 
      });
      setActiveTab("doctors");
    } catch (err) {
      console.error(err);
    }
  };

  // --- DEPARTMENT CRUD HANDLERS ---
  const saveDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    const headers = { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    };
    const body = {
      ...deptForm,
      services: deptForm.services.split(",").map(s => s.trim()).filter(Boolean)
    };

    try {
      if (editingDeptId) {
        await fetch(`/api/departments/${editingDeptId}`, { method: "PUT", headers, body: JSON.stringify(body) });
        setEditingDeptId(null);
      } else {
        await fetch("/api/departments", { method: "POST", headers, body: JSON.stringify(body) });
      }
      setDeptForm({ name: "", tamilName: "", slug: "", description: "", services: "", seoTitle: "", seoDescription: "" });
      setActiveTab("departments");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteDept = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await fetch(`/api/departments/${id}`, { 
        method: "DELETE", 
        headers: { "Authorization": `Bearer ${token}` } 
      });
      setActiveTab("departments");
    } catch (err) {
      console.error(err);
    }
  };

  // --- PACKAGES CRUD HANDLERS ---
  const savePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    const headers = { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    };
    const body = {
      ...pkgForm,
      tests: pkgForm.tests.split(",").map(s => s.trim()).filter(Boolean)
    };

    try {
      if (editingPkgId) {
        await fetch(`/api/packages/${editingPkgId}`, { method: "PUT", headers, body: JSON.stringify(body) });
        setEditingPkgId(null);
      } else {
        await fetch("/api/packages", { method: "POST", headers, body: JSON.stringify(body) });
      }
      setPkgForm({ name: "", description: "", price: 0, tests: "", consultations: "", validity: "1 Month" });
      setActiveTab("packages");
    } catch (err) {
      console.error(err);
    }
  };

  const deletePackage = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await fetch(`/api/packages/${id}`, { 
        method: "DELETE", 
        headers: { "Authorization": `Bearer ${token}` } 
      });
      setActiveTab("packages");
    } catch (err) {
      console.error(err);
    }
  };

  // --- BLOG CRUD HANDLERS ---
  const saveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    const headers = { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    };
    const body = {
      ...blogForm,
      tags: blogForm.tags.split(",").map(s => s.trim()).filter(Boolean)
    };

    try {
      if (editingBlogId) {
        await fetch(`/api/blogs/${editingBlogId}`, { method: "PUT", headers, body: JSON.stringify(body) });
        setEditingBlogId(null);
      } else {
        await fetch("/api/blogs", { method: "POST", headers, body: JSON.stringify(body) });
      }
      setBlogForm({ title: "", slug: "", excerpt: "", content: "", category: "Neurosurgery", tags: "", author: "Clinical Team" });
      setActiveTab("blogs");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBlog = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await fetch(`/api/blogs/${id}`, { 
        method: "DELETE", 
        headers: { "Authorization": `Bearer ${token}` } 
      });
      setActiveTab("blogs");
    } catch (err) {
      console.error(err);
    }
  };

  // --- GALLERY HANDLERS ---
  const saveGalleryImage = async (e: React.FormEvent) => {
    e.preventDefault();
    const headers = { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    };
    const body = {
      ...galForm,
      tags: galForm.tags.split(",").map(s => s.trim()).filter(Boolean)
    };

    try {
      await fetch("/api/gallery", { method: "POST", headers, body: JSON.stringify(body) });
      setGalForm({ title: "", description: "", category: "Hospital", tags: "", imageUrl: "/sarvam_logo.jpg", altText: "" });
      setActiveTab("gallery");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteGalleryImage = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await fetch(`/api/gallery/${id}`, { 
        method: "DELETE", 
        headers: { "Authorization": `Bearer ${token}` } 
      });
      setActiveTab("gallery");
    } catch (err) {
      console.error(err);
    }
  };

  // --- SETTINGS UPDATE HANDLERS ---
  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(settingsForm)
      });
      alert("Site settings updated!");
    } catch (err) {
      console.error(err);
    }
  };

  const saveSeoSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/seo", {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(seoForm)
      });
      alert("SEO & Google tags updated!");
    } catch (err) {
      console.error(err);
    }
  };

  // --- APPOINTMENTS STATUS TOGGLE ---
  const updateAppointmentStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/appointments/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ status: newStatus })
      });
      setActiveTab("appointments");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Helmet>
        <title>Hospital Admin CMS Portal | SarvamCare</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row font-sans relative overflow-x-hidden">
        
        {/* Mobile Header Bar */}
        <header className="bg-[#32105F] text-white px-6 py-4 flex items-center justify-between lg:hidden shrink-0 border-b border-indigo-900/50 z-30">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-indigo-200 hover:text-white rounded-lg transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <span className="font-serif font-bold text-sm tracking-wide">SarvamCare CMS</span>
          </div>
          <span className="text-[10px] bg-white/10 text-[#F3D98A] border border-white/5 px-2 py-0.5 rounded-full font-bold">
            Logged: {username}
          </span>
        </header>

        {/* Sidebar Overlay Backdrop on Mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#32105F] text-indigo-100 flex flex-col shrink-0 transition-transform duration-300 transform lg:static lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="p-6 border-b border-indigo-900/50 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center font-serif text-[#32105F] font-bold text-xs">
                SC
              </div>
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-white">SarvamCare CMS</h2>
                <span className="text-[10px] text-[#F3D98A] font-light">Logged: {username}</span>
              </div>
            </div>
            {/* Close button on mobile sidebar */}
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 hover:bg-white/10 rounded-lg lg:hidden text-indigo-200 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-grow p-4 space-y-1">
            <button 
              onClick={() => selectTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-colors ${activeTab === "dashboard" ? "bg-white/10 text-white" : "hover:bg-white/5"}`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => selectTab("doctors")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-colors ${activeTab === "doctors" ? "bg-white/10 text-white" : "hover:bg-white/5"}`}
            >
              <Users className="h-4 w-4" />
              <span>Doctors</span>
            </button>
            <button 
              onClick={() => selectTab("departments")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-colors ${activeTab === "departments" ? "bg-white/10 text-white" : "hover:bg-white/5"}`}
            >
              <Layers className="h-4 w-4" />
              <span>Departments</span>
            </button>
            <button 
              onClick={() => selectTab("packages")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-colors ${activeTab === "packages" ? "bg-white/10 text-white" : "hover:bg-white/5"}`}
            >
              <Heart className="h-4 w-4" />
              <span>Packages</span>
            </button>
            <button 
              onClick={() => selectTab("blogs")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-colors ${activeTab === "blogs" ? "bg-white/10 text-white" : "hover:bg-white/5"}`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Blog CMS</span>
            </button>
            <button 
              onClick={() => selectTab("gallery")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-colors ${activeTab === "gallery" ? "bg-white/10 text-white" : "hover:bg-white/5"}`}
            >
              <ImageIcon className="h-4 w-4" />
              <span>Gallery</span>
            </button>
            <button 
              onClick={() => selectTab("appointments")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-colors ${activeTab === "appointments" ? "bg-white/10 text-white" : "hover:bg-white/5"}`}
            >
              <Calendar className="h-4 w-4" />
              <span>Appointments</span>
            </button>
            <button 
              onClick={() => selectTab("enquiries")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-colors ${activeTab === "enquiries" ? "bg-white/10 text-white" : "hover:bg-white/5"}`}
            >
              <Mail className="h-4 w-4" />
              <span>Enquiries</span>
            </button>
            <button 
              onClick={() => selectTab("settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-colors ${activeTab === "settings" ? "bg-white/10 text-white" : "hover:bg-white/5"}`}
            >
              <Settings className="h-4 w-4" />
              <span>Site & SEO Settings</span>
            </button>
          </nav>

          <div className="p-4 border-t border-indigo-900/50">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wide bg-red-800 hover:bg-red-950 text-white transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Content Pane */}
        <main className="flex-grow p-8 overflow-y-auto">
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-[#32105F]">Dashboard Overview</h1>
                <span className="text-xs text-slate-500">Live statistics summary</span>
              </div>

              {/* Counters */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="p-3.5 rounded-xl bg-purple-50 text-brand-purple shrink-0"><Users className="h-5 w-5" /></div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Doctors</span>
                    <span className="text-2xl font-extrabold text-slate-800">{stats.doctors}</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="p-3.5 rounded-xl bg-purple-50 text-brand-purple shrink-0"><Layers className="h-5 w-5" /></div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Specialties</span>
                    <span className="text-2xl font-extrabold text-slate-800">{stats.departments}</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="p-3.5 rounded-xl bg-purple-50 text-brand-purple shrink-0"><Calendar className="h-5 w-5" /></div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Pending Booking</span>
                    <span className="text-2xl font-extrabold text-slate-800">{stats.pendingAppointments}</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="p-3.5 rounded-xl bg-purple-50 text-brand-purple shrink-0"><Mail className="h-5 w-5" /></div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Unread Enquiries</span>
                    <span className="text-2xl font-extrabold text-slate-800">{stats.unreadEnquiries}</span>
                  </div>
                </div>
              </div>

              {/* Inquiries */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-[#32105F]">Recent Appointments Pipeline</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase">
                        <th className="pb-3">Name</th>
                        <th className="pb-3">Phone</th>
                        <th className="pb-3">Dept</th>
                        <th className="pb-3">Date</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {appointmentsList.slice(0, 5).map(a => (
                        <tr key={a._id} className="text-slate-700">
                          <td className="py-3 font-semibold">{a.name}</td>
                          <td className="py-3">{a.phone}</td>
                          <td className="py-3">{a.department}</td>
                          <td className="py-3">{a.date} ({a.time})</td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${a.status === "pending" ? "bg-yellow-50 text-yellow-600 border border-yellow-200" : "bg-green-50 text-green-600"}`}>
                              {a.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DOCTORS CRUD */}
          {activeTab === "doctors" && (
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-2xl font-bold text-[#32105F]">Physicians Management</h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Form */}
                <form onSubmit={saveDoctor} className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-[#32105F]">{editingDocId ? "Modify Doctor" : "Register Doctor"}</h3>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Doctor Name *</label>
                    <input type="text" required value={docForm.name} onChange={e => setDocForm({...docForm, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" placeholder="Dr. V. Suresh" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Qualifications *</label>
                    <input type="text" required value={docForm.qualification} onChange={e => setDocForm({...docForm, qualification: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" placeholder="MCh (Neuro)" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Designation *</label>
                    <input type="text" required value={docForm.designation} onChange={e => setDocForm({...docForm, designation: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" placeholder="Chief Consultant" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Department ID *</label>
                    <select value={docForm.departmentId} onChange={e => setDocForm({...docForm, departmentId: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg">
                      <option value="neurosurgery">Neurosurgery</option>
                      <option value="neurology">Neurology</option>
                      <option value="orthopaedics">Orthopaedics</option>
                      <option value="plastic-surgery">Plastic Surgery</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Expertise (Comma separated)</label>
                    <input type="text" value={docForm.expertise} onChange={e => setDocForm({...docForm, expertise: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" placeholder="Brain Tumors, Microsurgery" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Biography</label>
                    <textarea rows={3} value={docForm.biography} onChange={e => setDocForm({...docForm, biography: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg resize-none" placeholder="Professional history..." />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Profile Photo (Optional)</label>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      accept="image/*" 
                      onChange={handlePhotoChange} 
                      className="w-full bg-slate-50 border border-slate-200 p-2 text-xs rounded-lg" 
                    />
                    {docForm.profileImage ? (
                      <div className="flex items-center gap-3.5 p-3 bg-slate-50 border border-slate-200 rounded-xl mt-2 animate-fade-in">
                        <img src={docForm.profileImage} alt="Preview" className="w-12 h-12 rounded-full object-cover border border-slate-300" />
                        <div className="flex flex-col gap-1">
                          <span className="text-[9px] text-green-600 font-bold uppercase tracking-wider flex items-center gap-1">✓ Uploaded Successfully</span>
                          <button 
                            type="button" 
                            onClick={() => {
                              setDocForm(prev => ({ ...prev, profileImage: "" }));
                              if (fileInputRef.current) fileInputRef.current.value = "";
                            }} 
                            className="px-2.5 py-1 text-[9px] font-bold uppercase bg-red-50 text-red-600 hover:bg-red-100 rounded-md border border-red-200 transition-colors w-fit flex items-center gap-1 active:scale-95"
                          >
                            Remove Photo
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-[9px] text-slate-400 font-light mt-1 pl-1">
                        No photo loaded (Initials placeholder will be generated).
                      </p>
                    )}
                  </div>
                  <button type="submit" className="w-full py-2.5 bg-[#32105F] hover:bg-[#3D176E] text-white text-xs font-bold uppercase rounded-lg">
                    {editingDocId ? "Save Changes" : "Register Doctor"}
                  </button>
                </form>

                {/* List */}
                <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-[#32105F]">Active Medical Registry</h3>
                  <div className="divide-y divide-slate-100">
                    {doctorsList.map(doc => (
                      <div key={doc._id} className="py-4 flex justify-between items-center text-xs">
                        <div>
                          <h4 className="font-bold text-[#32105F]">{doc.name}</h4>
                          <p className="text-slate-500 font-light mt-0.5">{doc.qualification} — {doc.designation} ({doc.departmentId})</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => {
                            setEditingDocId(doc._id);
                            setDocForm({
                              name: doc.name,
                              qualification: doc.qualification,
                              designation: doc.designation,
                              departmentId: doc.departmentId,
                              biography: doc.biography || "",
                              expertise: doc.expertise ? doc.expertise.join(", ") : "",
                              displayOrder: doc.displayOrder || 0,
                              profileImage: doc.profileImage || ""
                            });
                          }} className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-indigo-50"><Edit className="h-4 w-4" /></button>
                          <button onClick={() => deleteDoctor(doc._id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DEPARTMENTS CRUD */}
          {activeTab === "departments" && (
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-2xl font-bold text-[#32105F]">Departments Settings</h1>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <form onSubmit={saveDepartment} className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-[#32105F]">{editingDeptId ? "Edit Department" : "New Department"}</h3>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Department Name *</label>
                    <input type="text" required value={deptForm.name} onChange={e => setDeptForm({...deptForm, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" placeholder="Neurosurgery" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tamil Name</label>
                    <input type="text" value={deptForm.tamilName} onChange={e => setDeptForm({...deptForm, tamilName: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" placeholder="நரம்பியல்" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Slug URL *</label>
                    <input type="text" required value={deptForm.slug} onChange={e => setDeptForm({...deptForm, slug: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" placeholder="neurosurgery" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Services (Comma separated)</label>
                    <input type="text" value={deptForm.services} onChange={e => setDeptForm({...deptForm, services: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" placeholder="Aneurysm Clipping, Spine microdiscectomy" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Description *</label>
                    <textarea rows={3} required value={deptForm.description} onChange={e => setDeptForm({...deptForm, description: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg resize-none" placeholder="Description details..." />
                  </div>
                  <button type="submit" className="w-full py-2.5 bg-[#32105F] hover:bg-[#3D176E] text-white text-xs font-bold uppercase rounded-lg">
                    {editingDeptId ? "Save Department" : "Create Department"}
                  </button>
                </form>

                <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-[#32105F]">Active Medical Specialties</h3>
                  <div className="divide-y divide-slate-100">
                    {deptsList.map(d => (
                      <div key={d._id} className="py-4 flex justify-between items-center text-xs">
                        <div>
                          <h4 className="font-bold text-[#32105F]">{d.name} <span className="text-[#6D2FA0] font-normal">({d.tamilName})</span></h4>
                          <p className="text-slate-500 font-light mt-0.5">Slug: /{d.slug} — Services: {d.services.length}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => {
                            setEditingDeptId(d._id);
                            setDeptForm({
                              name: d.name,
                              tamilName: d.tamilName || "",
                              slug: d.slug,
                              description: d.description,
                              services: d.services ? d.services.join(", ") : "",
                              seoTitle: d.seoTitle || "",
                              seoDescription: d.seoDescription || ""
                            });
                          }} className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-indigo-50"><Edit className="h-4 w-4" /></button>
                          <button onClick={() => deleteDept(d._id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PACKAGES */}
          {activeTab === "packages" && (
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-2xl font-bold text-[#32105F]">Health Packages Settings</h1>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <form onSubmit={savePackage} className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-[#32105F]">{editingPkgId ? "Edit Package" : "Create Package"}</h3>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Package Name *</label>
                    <input type="text" required value={pkgForm.name} onChange={e => setPkgForm({...pkgForm, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" placeholder="Executive Wellness Screen" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Price (INR) *</label>
                    <input type="number" required value={pkgForm.price} onChange={e => setPkgForm({...pkgForm, price: parseInt(e.target.value) || 0})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" placeholder="2500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tests (Comma separated)</label>
                    <input type="text" value={pkgForm.tests} onChange={e => setPkgForm({...pkgForm, tests: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" placeholder="Fasting sugar, CBC, ECG" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Consultations</label>
                    <input type="text" value={pkgForm.consultations} onChange={e => setPkgForm({...pkgForm, consultations: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" placeholder="Orthopaedics consultation" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Validity</label>
                    <input type="text" value={pkgForm.validity} onChange={e => setPkgForm({...pkgForm, validity: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Description</label>
                    <textarea rows={2} value={pkgForm.description} onChange={e => setPkgForm({...pkgForm, description: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg resize-none" placeholder="Description details..." />
                  </div>
                  <button type="submit" className="w-full py-2.5 bg-[#32105F] hover:bg-[#3D176E] text-white text-xs font-bold uppercase rounded-lg">
                    {editingPkgId ? "Save Changes" : "Create Package"}
                  </button>
                </form>

                <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-[#32105F]">Active Diagnostic Packages</h3>
                  <div className="divide-y divide-slate-100">
                    {packagesList.map(p => (
                      <div key={p._id} className="py-4 flex justify-between items-center text-xs">
                        <div>
                          <h4 className="font-bold text-[#32105F]">{p.name}</h4>
                          <p className="text-slate-500 font-light mt-0.5">Price: ₹{p.price} — Tests: {p.tests.length}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => {
                            setEditingPkgId(p._id);
                            setPkgForm({
                              name: p.name,
                              description: p.description || "",
                              price: p.price,
                              tests: p.tests ? p.tests.join(", ") : "",
                              consultations: p.consultations || "",
                              validity: p.validity || "1 Month"
                            });
                          }} className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-indigo-50"><Edit className="h-4 w-4" /></button>
                          <button onClick={() => deletePackage(p._id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: BLOG CMS */}
          {activeTab === "blogs" && (
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-2xl font-bold text-[#32105F]">Health Blog CMS</h1>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <form onSubmit={saveBlog} className="lg:col-span-6 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-[#32105F]">{editingBlogId ? "Edit Article" : "Create Article"}</h3>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Article Title *</label>
                    <input type="text" required value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" placeholder="Understanding Spine Problems" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">URL Slug *</label>
                    <input type="text" required value={blogForm.slug} onChange={e => setBlogForm({...blogForm, slug: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" placeholder="understanding-spine-problems" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Category</label>
                      <input type="text" value={blogForm.category} onChange={e => setBlogForm({...blogForm, category: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" placeholder="Neurosurgery" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Author</label>
                      <input type="text" value={blogForm.author} onChange={e => setBlogForm({...blogForm, author: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Excerpt / Meta Description *</label>
                    <textarea rows={2} required value={blogForm.excerpt} onChange={e => setBlogForm({...blogForm, excerpt: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg resize-none" placeholder="Excerpt for search results..." />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Article Content (HTML formatting supported) *</label>
                    <textarea rows={8} required value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg font-mono" placeholder="<h3>Title</h3><p>Article body...</p>" />
                  </div>
                  <button type="submit" className="w-full py-2.5 bg-[#32105F] hover:bg-[#3D176E] text-white text-xs font-bold uppercase rounded-lg">
                    {editingBlogId ? "Save Article" : "Publish Article"}
                  </button>
                </form>

                <div className="lg:col-span-6 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-[#32105F]">Published Health Articles</h3>
                  <div className="divide-y divide-slate-100">
                    {blogsList.map(b => (
                      <div key={b._id} className="py-4 flex justify-between items-center text-xs">
                        <div>
                          <h4 className="font-bold text-[#32105F]">{b.title}</h4>
                          <p className="text-slate-500 font-light mt-0.5">Slug: /{b.slug} — Category: {b.category}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => {
                            setEditingBlogId(b._id);
                            setBlogForm({
                              title: b.title,
                              slug: b.slug,
                              excerpt: b.excerpt,
                              content: b.content,
                              category: b.category || "Neurosurgery",
                              tags: b.tags ? b.tags.join(", ") : "",
                              author: b.author || "Clinical Team"
                            });
                          }} className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-indigo-50"><Edit className="h-4 w-4" /></button>
                          <button onClick={() => deleteBlog(b._id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: GALLERY CMS */}
          {activeTab === "gallery" && (
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-2xl font-bold text-[#32105F]">Visual Gallery CMS</h1>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <form onSubmit={saveGalleryImage} className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-[#32105F]">Add Gallery Photo</h3>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Image Title *</label>
                    <input type="text" required value={galForm.title} onChange={e => setGalForm({...galForm, title: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" placeholder="Trauma ICU Bay" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Gallery Photo File *</label>
                    <input 
                      type="file" 
                      ref={galleryFileInputRef}
                      accept="image/*" 
                      required={!galForm.imageUrl}
                      onChange={handleGalleryPhotoChange} 
                      className="w-full bg-slate-50 border border-slate-200 p-2 text-xs rounded-lg" 
                    />
                    {galForm.imageUrl && (
                      <div className="flex items-center gap-3.5 p-3 bg-slate-50 border border-slate-200 rounded-xl mt-2 animate-fade-in">
                        <img 
                           src={galForm.imageUrl} 
                           alt="Preview" 
                           onError={(e) => {
                             (e.target as HTMLImageElement).src = "/sarvam_building_exterior.png";
                           }}
                           className="w-12 h-12 rounded-lg object-cover border border-slate-300" 
                         />
                        <div className="flex flex-col gap-1">
                          <span className="text-[9px] text-green-600 font-bold uppercase tracking-wider flex items-center gap-1">✓ Uploaded Successfully</span>
                          <button 
                            type="button" 
                            onClick={() => {
                              setGalForm(prev => ({ ...prev, imageUrl: "" }));
                              if (galleryFileInputRef.current) galleryFileInputRef.current.value = "";
                            }} 
                            className="px-2.5 py-1 text-[9px] font-bold uppercase bg-red-50 text-red-600 hover:bg-red-100 rounded-md border border-red-200 transition-colors w-fit flex items-center gap-1 active:scale-95"
                          >
                            Remove Image
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Category *</label>
                    <select value={galForm.category} onChange={e => setGalForm({...galForm, category: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg">
                      <option value="Hospital">Hospital</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Doctors">Doctors</option>
                      <option value="Technology">Technology</option>
                      <option value="Facilities">Facilities</option>
                      <option value="Flyers">Flyers</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tags (Comma separated)</label>
                    <input type="text" value={galForm.tags} onChange={e => setGalForm({...galForm, tags: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" placeholder="ICU, OT, Salem" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Alt Text</label>
                    <input type="text" value={galForm.altText} onChange={e => setGalForm({...galForm, altText: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Description</label>
                    <textarea rows={2} value={galForm.description} onChange={e => setGalForm({...galForm, description: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg resize-none" />
                  </div>
                  <button type="submit" className="w-full py-2.5 bg-[#32105F] hover:bg-[#3D176E] text-white text-xs font-bold uppercase rounded-lg">
                    Upload Image
                  </button>
                </form>

                <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-[#32105F]">Hospital Image Library</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {galleryList.map(img => (
                      <div key={img._id} className="p-3 border border-slate-100 rounded-xl relative group">
                        <img 
                           src={img.imageUrl} 
                           alt={img.altText} 
                           onError={(e) => {
                             (e.target as HTMLImageElement).src = "/sarvam_building_exterior.png";
                           }}
                           className="w-full h-24 object-cover rounded-lg" 
                         />
                        <div className="mt-2 text-[10px] font-bold text-[#32105F] truncate">{img.title}</div>
                        <button onClick={() => deleteGalleryImage(img._id)} className="absolute top-5 right-5 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-800 shadow"><Trash2 className="h-3 w-3" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: APPOINTMENTS */}
          {activeTab === "appointments" && (
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-2xl font-bold text-[#32105F]">Appointments Request Pipeline</h1>
              
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="divide-y divide-slate-100">
                  {appointmentsList.map(appt => (
                    <div key={appt._id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-[#32105F]">{appt.name}</h4>
                          <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold ${appt.status === "pending" ? "bg-yellow-50 text-yellow-600 border border-yellow-200" : appt.status === "confirmed" ? "bg-green-50 text-green-600 border border-green-200" : "bg-slate-50 text-slate-500"}`}>
                            {appt.status}
                          </span>
                        </div>
                        <p className="text-slate-500 font-light mt-1">
                          Phone: <strong>{appt.phone}</strong> | Email: {appt.email || "N/A"} | Department: <strong>{appt.department}</strong>
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1">
                          Booking Schedule Date: <strong>{appt.date}</strong> ({appt.time}) — Query: "{appt.message || "None"}"
                        </p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {appt.status === "pending" && (
                          <button onClick={() => updateAppointmentStatus(appt._id, "confirmed")} className="px-3.5 py-1.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700">Confirm</button>
                        )}
                        <button onClick={() => updateAppointmentStatus(appt._id, "cancelled")} className="px-3.5 py-1.5 bg-slate-100 text-slate-600 font-bold rounded-lg hover:bg-slate-200">Cancel</button>
                      </div>
                    </div>
                  ))}
                  {appointmentsList.length === 0 && (
                    <p className="text-xs text-slate-400 font-light py-4 text-center">No appointment requests in the pipeline.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: ENQUIRIES */}
          {activeTab === "enquiries" && (
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-2xl font-bold text-[#32105F]">Contact Enquiries Log</h1>
              
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="divide-y divide-slate-100">
                  {enquiriesList.map(enq => (
                    <div key={enq._id} className="py-4 text-xs space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-[#32105F]">{enq.name}</h4>
                        <span className="text-[10px] text-slate-400">({new Date(enq.createdAt).toLocaleDateString()})</span>
                      </div>
                      <p className="text-slate-500">Phone: <strong>{enq.phone}</strong> | Email: {enq.email || "N/A"}</p>
                      <p className="text-[#32105F] font-bold">Subject: {enq.subject}</p>
                      <p className="text-slate-600 font-light p-3 bg-slate-50 rounded-xl border border-slate-100 mt-2">
                        "{enq.message}"
                      </p>
                    </div>
                  ))}
                  {enquiriesList.length === 0 && (
                    <p className="text-xs text-slate-400 font-light py-4 text-center">No contact enquiries logged.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: SITE SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-2xl font-bold text-[#32105F]">Site Configurations</h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                
                {/* Site NAP Settings */}
                <form onSubmit={saveSettings} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-[#32105F]">Contact & NAP Settings</h3>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Hospital Phone Helpline</label>
                    <input type="text" value={settingsForm.phone} onChange={e => setSettingsForm({...settingsForm, phone: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">WhatsApp Helpline</label>
                    <input type="text" value={settingsForm.whatsapp} onChange={e => setSettingsForm({...settingsForm, whatsapp: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Email Address</label>
                    <input type="email" value={settingsForm.email} onChange={e => setSettingsForm({...settingsForm, email: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Hospital Address</label>
                    <input type="text" value={settingsForm.address} onChange={e => setSettingsForm({...settingsForm, address: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Emergency Hotline</label>
                    <input type="text" value={settingsForm.emergencyNumber} onChange={e => setSettingsForm({...settingsForm, emergencyNumber: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" />
                  </div>
                  <button type="submit" className="w-full py-2.5 bg-[#32105F] hover:bg-[#3D176E] text-white text-xs font-bold uppercase rounded-lg">
                    Save Site Settings
                  </button>
                </form>

                {/* SEO Settings */}
                <form onSubmit={saveSeoSettings} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-[#32105F]">Global SEO & Analytics Integration</h3>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Global Title Header *</label>
                    <input type="text" required value={seoForm.globalTitle} onChange={e => setSeoForm({...seoForm, globalTitle: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Global Meta Description *</label>
                    <textarea rows={3} required value={seoForm.globalDescription} onChange={e => setSeoForm({...seoForm, globalDescription: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg resize-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Google Site Verification Key</label>
                    <input type="text" value={seoForm.googleVerification} onChange={e => setSeoForm({...seoForm, googleVerification: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" placeholder="google12345" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Google Tag Manager ID</label>
                      <input type="text" value={seoForm.gtmId} onChange={e => setSeoForm({...seoForm, gtmId: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" placeholder="GTM-XXXX" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Google Analytics GA4 Key</label>
                      <input type="text" value={seoForm.ga4MeasurementId} onChange={e => setSeoForm({...seoForm, ga4MeasurementId: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 text-xs rounded-lg" placeholder="G-XXXX" />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-2.5 bg-[#32105F] hover:bg-[#3D176E] text-white text-xs font-bold uppercase rounded-lg">
                    Save SEO & Analytics Keys
                  </button>
                </form>

              </div>
            </div>
          )}

        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
