import React, { useState, useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { FloatingActions } from "./components/FloatingActions";
import { Announcement } from "./sections/Announcement";
import { AppRoutes } from "./AppRoutes";
import { SarvamCareLogo } from "./components/BrandLogos";
import { initAnalytics } from "./utils/analytics";
import { SocialSidebar } from "./components/SocialSidebar";

const AppContent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // 1. Initialize Analytics once on mount
    initAnalytics();

    // 2. Loading screen timer
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1400);

    // 3. Scroll Progress Tracker
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 4. Trigger GA4 Pageview tracking on routing path changes
  useEffect(() => {
    if (window.gtag && import.meta.env.VITE_GA_MEASUREMENT_ID) {
      window.gtag("config", import.meta.env.VITE_GA_MEASUREMENT_ID, {
        page_path: location.pathname
      });
    }
  }, [location.pathname]);

  const isAdminRoute = location.pathname.startsWith("/admin") || location.pathname === "/login";

  return (
    <>
      {/* Scroll Progress Indicator Ticker */}
      {!isAdminRoute && (
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      )}

      {/* Loading Experience */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-[#32105F] flex flex-col justify-center items-center z-[9999]"
          >
            <div className="relative flex flex-col items-center justify-center text-center">
              
              {/* Logo + Circle container */}
              <div className="relative w-32 h-32 flex items-center justify-center mb-5 shrink-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <SarvamCareLogo className="h-20 w-20" showText={false} />
                </motion.div>

                {/* Drawing Circle Gold Ring */}
                <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" viewBox="0 0 100 100">
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#D8B35A"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="283"
                    initial={{ strokeDashoffset: 283 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 1.1, ease: "easeInOut", delay: 0.1 }}
                  />
                </svg>
              </div>

              {/* Text labels */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col items-center"
              >
                <h1 className="font-serif text-white font-extrabold text-2xl tracking-wide">
                  SARVAM<span className="text-[#D8B35A]">Care</span>
                </h1>
                <span className="text-[9px] font-sans tracking-[0.25em] text-[#F3D98A] uppercase font-bold mt-1.5">
                  Royal Medical Institution
                </span>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-[#FFFFFF] text-[#24152F] antialiased font-sans select-none selection:bg-[#6D2FA0] selection:text-white">
        {/* Render Announcement Bar & Floating Navbar strictly on Public views */}
        {!isAdminRoute && <Announcement />}
        {!isAdminRoute && <Navbar />}

        {/* Routed pages controller */}
        <AppRoutes />

        {/* Footer & Shortcut buttons strictly on Public views */}
        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <FloatingActions />}
        {!isAdminRoute && <SocialSidebar />}
      </div>
    </>
  );
};

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
