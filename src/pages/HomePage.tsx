import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "../sections/Hero";
import { TrustHighlights } from "../sections/TrustHighlights";
import { About } from "../sections/About";
import { Departments } from "../sections/Departments";
import { NeuroCenter } from "../sections/NeuroCenter";
import { TraumaCare } from "../sections/TraumaCare";
import { SmilingMonk } from "../sections/SmilingMonk";
import { Facilities } from "../sections/Facilities";
import { Doctors } from "../sections/Doctors";
import { SpecialitiesExplorer } from "../sections/SpecialitiesExplorer";
import { DoctorSpotlight } from "../sections/DoctorSpotlight";
import { Testimonials } from "../sections/Testimonials";
import { AppointmentCTA } from "../sections/AppointmentCTA";
import { LocationMap } from "../sections/LocationMap";

export const HomePage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && (location.state as any).scrollTo) {
      const targetSelector = (location.state as any).scrollTo;
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        const timer = setTimeout(() => {
          const offset = 80;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });
          // Clear routing history state to prevent repeating on refresh
          window.history.replaceState({}, document.title);
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [location]);

  return (
    <>
      <Hero />
      <TrustHighlights />
      <About />
      <Departments />
      <NeuroCenter />
      <TraumaCare />
      <SmilingMonk />
      <Facilities />
      <Doctors />
      <SpecialitiesExplorer />
      <DoctorSpotlight />
      <Testimonials />
      <AppointmentCTA />
      <LocationMap />
    </>
  );
};

export default HomePage;
