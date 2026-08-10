# Tasks - SarvamCare Hospital Upgrades

- [x] Navigation & Sticky Action Layouts
  - [x] Add all navigation paths to `Navbar.tsx` (Home, About Us, Specialities, Doctors, Centers of Excellence, Services, Facilities, Gallery, Patient Info, Contact, Book Appointment)
  - [x] Update `Footer.tsx` quick links and organization
  - [x] Implement Mobile Sticky Bottom Bar (CALL | WHATSAPP | BOOK APPOINTMENT) in `FloatingActions.tsx`

- [x] Core Pages Implementation
  - [x] Create `AboutPage.tsx` (/about)
  - [x] Create `SpecialitiesPage.tsx` (/specialities)
  - [x] Create `ServicesPage.tsx` (/services)
  - [x] Create `FacilitiesPage.tsx` (/facilities)
  - [x] Create `PatientInfoPage.tsx` (/patient-information)
  - [x] Create `AppointmentPage.tsx` (/appointment)
  - [x] Create `CentersPage.tsx` (/centers)
  - [x] Update routes in `AppRoutes.tsx` (mapping `/centers/trauma-care`, `/centers/neuro-center`, `/centers/craniofacial`, `/specialities/:slug`, etc.)

- [x] Homepage Content & Branding Adjustments
  - [x] Update `Hero.tsx` (correct title, subheading, and floating desktop appointment card)
  - [x] Update `TrustHighlights.tsx` (correct four trust indicators requested by the user)

- [x] Specialist Registry fallbacks
  - [x] Update `DoctorsPage.tsx` to fallback to the full list of 20+ doctors from `src/data/doctors.ts`
  - [x] Update `DoctorDetail.tsx` to lookup doctors from `src/data/doctors.ts`
  - [x] Update `DepartmentDetail.tsx` (specialty detail) to lookup doctors from `src/data/doctors.ts`

- [x] Form Fields Expansion & Dynamic Filtering
  - [x] Rebuild `AppointmentCTA.tsx` form with Name, Mobile, Email, Department, Doctor, Preferred Date, Preferred Time, Message
  - [x] Implement dynamic filtering of Doctor options based on selected Department in the form
  - [x] Rebuild the form in `AppointmentPage.tsx` with same functionality

- [x] Schema, Local SEO & GA/GTM Tracking
  - [x] Configure robots.txt and sitemap.xml details in Node.js server
  - [x] Setup GTM and GA4 environment injection in index.html and event triggers
  - [x] Insert JSON-LD schema (MedicalOrganization, Physician) on relevant pages
  - [x] Setup metadata and unique titles for all views using Helmet

- [x] Final UI/UX Audit & Compile Check
  - [x] Build the static site using `npm run build`
  - [x] Resolve any TypeScript/linting errors
  - [x] Create the walkthrough.md artifact
