/**
 * SarvamCare Hospital Analytics Integration Utility
 * Handles dynamic GTM / GA4 script injection and event tracking.
 */

// Declare global window properties for TypeScript compiler
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const GTM_ID = import.meta.env.VITE_GTM_ID || "";
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "";

/**
 * Initializes GA4 and GTM by dynamically injecting their script tags.
 * This avoids hardcoding keys in index.html and keeps keys configurable.
 */
export const initAnalytics = (): void => {
  if (typeof window === "undefined") return;

  // 1. Google Tag Manager Injection
  if (GTM_ID) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    
    const f = document.getElementsByTagName("script")[0];
    const j = document.createElement("script");
    j.async = true;
    j.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    f.parentNode?.insertBefore(j, f);
    
    console.log(`[Analytics] GTM Initialized with ID: ${GTM_ID}`);
  }

  // 2. Google Analytics 4 Injection
  if (GA_MEASUREMENT_ID) {
    const f = document.getElementsByTagName("script")[0];
    const j = document.createElement("script");
    j.async = true;
    j.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    f.parentNode?.insertBefore(j, f);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: window.location.pathname
    });

    console.log(`[Analytics] GA4 Initialized with ID: ${GA_MEASUREMENT_ID}`);
  }
};

/**
 * Core event logging function. Sends events to both GTM dataLayer and GA4.
 */
export const logEvent = (eventName: string, params: object = {}): void => {
  if (typeof window === "undefined") return;

  // Send to GTM dataLayer
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params
    });
  }

  // Send to GA4
  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag("event", eventName, params);
  }

  console.log(`[Analytics Event] ${eventName}`, params);
};

// --- PRE-DEFINED GA4 / GTM CONVERSIONS EVENT LOGGERS ---

export const logAppointmentClick = (location: string): void => {
  logEvent("appointment_click", { button_location: location });
};

export const logAppointmentSubmit = (deptName: string, doctorName: string): void => {
  logEvent("appointment_submit", { department: deptName, doctor: doctorName });
};

export const logPhoneClick = (number: string, location: string): void => {
  logEvent("phone_click", { phone_number: number, click_location: location });
};

export const logWhatsAppClick = (number: string, location: string): void => {
  logEvent("whatsapp_click", { whatsapp_number: number, click_location: location });
};

export const logDoctorProfileView = (doctorName: string): void => {
  logEvent("doctor_profile_view", { doctor_name: doctorName });
};

export const logSpecialityView = (specialityName: string): void => {
  logEvent("speciality_view", { speciality_name: specialityName });
};

export const logContactFormSubmit = (subject: string): void => {
  logEvent("contact_form_submit", { query_subject: subject });
};

export const logMapClick = (): void => {
  logEvent("map_click");
};

export const logEmergencyCallClick = (): void => {
  logEvent("emergency_call_click", { priority: "critical_trauma" });
};
