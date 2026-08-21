import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SpecialitiesPage from "./pages/SpecialitiesPage";
import DepartmentDetail from "./pages/DepartmentDetail";
import DoctorsPage from "./pages/DoctorsPage";
import DoctorDetail from "./pages/DoctorDetail";
import CentersPage from "./pages/CentersPage";
import TraumaPage from "./pages/TraumaPage";
import NeuroPage from "./pages/NeuroPage";
import SmilingMonkPage from "./pages/SmilingMonkPage";
import ServicesPage from "./pages/ServicesPage";
import FacilitiesPage from "./pages/FacilitiesPage";
import PatientInfoPage from "./pages/PatientInfoPage";
import AppointmentPage from "./pages/AppointmentPage";
import HealthPackagesPage from "./pages/HealthPackagesPage";
import GalleryPage from "./pages/GalleryPage";
import BlogPage from "./pages/BlogPage";
import BlogPostDetail from "./pages/BlogPostDetail";
import CareersPage from "./pages/CareersPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsPage from "./pages/TermsPage";
import DisclaimerPage from "./pages/DisclaimerPage";
import NotFoundPage from "./pages/NotFoundPage";
import NeuroLandingPage from "./pages/NeuroLandingPage";

// Admin CMS Portal
import Login from "./admin/Login";
import AdminDashboard from "./admin/AdminDashboard";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/specialities" element={<SpecialitiesPage />} />
      
      {/* Route both /specialities/:slug and /departments/:slug for compatibility */}
      <Route path="/specialities/:slug" element={<DepartmentDetail />} />
      <Route path="/departments/:slug" element={<DepartmentDetail />} />
      
      <Route path="/doctors" element={<DoctorsPage />} />
      <Route path="/doctors/:slug" element={<DoctorDetail />} />
      
      <Route path="/centers" element={<CentersPage />} />
      
      {/* Routes matching requested technical SEO paths */}
      <Route path="/centers/trauma-care" element={<TraumaPage />} />
      <Route path="/centers/neuro-center" element={<NeuroPage />} />
      <Route path="/centers/craniofacial" element={<SmilingMonkPage />} />
      <Route path="/centers/spine-surgery" element={<Navigate to="/departments/neurosurgery" replace />} />
      <Route path="/centers/orthopaedic-surgery" element={<Navigate to="/departments/orthopaedics" replace />} />
      <Route path="/centers/psychiatry-psychology" element={<Navigate to="/departments/psychiatry" replace />} />
      
      {/* Legacy URLs redirection/compatibility */}
      <Route path="/trauma-care" element={<Navigate to="/centers/trauma-care" replace />} />
      <Route path="/neuro-center" element={<Navigate to="/centers/neuro-center" replace />} />
      <Route path="/smiling-monk" element={<Navigate to="/centers/craniofacial" replace />} />

      <Route path="/services" element={<ServicesPage />} />
      <Route path="/neuro-hospital-in-salem" element={<NeuroLandingPage />} />
      <Route path="/facilities" element={<FacilitiesPage />} />
      <Route path="/patient-information" element={<PatientInfoPage />} />
      <Route path="/appointment" element={<AppointmentPage />} />
      
      <Route path="/health-packages" element={<HealthPackagesPage />} />
      <Route path="/packages" element={<HealthPackagesPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPostDetail />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsPage />} />
      <Route path="/disclaimer" element={<DisclaimerPage />} />
      
      {/* Admin Portal */}
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />

      {/* 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
