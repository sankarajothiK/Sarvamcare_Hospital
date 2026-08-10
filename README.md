# SarvamCare Hospital Website

A premium, production-ready website for **SarvamCare Hospital Pvt. Ltd.** (incorporating Dr. V. Suresh Kumar's Neuro Center, Sarvam Trauma Care, and Smiling Monk Cranio Facial Clinic), Mamangam, Salem.

Built using **React, Vite, TypeScript, Tailwind CSS, Framer Motion, and Lucide React**.

---

## Key Features

1. **Elegant Visual Identity**: Customized premium design based on a Royal Purple, Gold, Lavender, and White color palette.
2. **Vector Brand Assets**: Sharp, high-density inline SVGs representing the clinical division logos, neural network animations, brain profiles, and spine segments.
3. **Structured Data Modules**: Doctors, departments, facilities, services, and contacts are isolated into TypeScript array modules in `src/data/` for easy updates.
4. **Interactive Filters**: Roster searches and category controls inside Doctor Directory and Service Explorer.
5. **No Stock Doctor Photos**: Uses elegant initials/avatar-style widgets that respect the client guidelines.
6. **WhatsApp Lead Conversion**: Quick appointment form inputs translate directly into pre-filled WhatsApp API links.
7. **Local SEO Integration**:
   - Page title and metadata keywords.
   - Facebook OpenGraph and Twitter cards preview tags.
   - Structured JSON-LD `MedicalOrganization` schema for Google Search indexing.
   - Custom `robots.txt` and `sitemap.xml` files.

---

## File Architecture

```
src/
  ├── assets/            # Vector assets
  ├── components/        # Layout elements
  │    ├── BrandLogos.tsx        # Inline SVGs for all 4 clinical division logos
  │    ├── FloatingActions.tsx   # Sticky Call / WhatsApp overlays
  │    ├── Footer.tsx            # Premium dark-purple structured footer
  │    └── Navbar.tsx            # Sticky desktop header and mobile hamburger drawer
  ├── data/              # TS data arrays
  │    ├── contact.ts
  │    ├── departments.ts
  │    ├── doctors.ts
  │    ├── facilities.ts
  │    └── services.ts
  ├── sections/          # Page sections
  │    ├── Announcement.tsx      # Emergency helpline top bar
  │    ├── About.tsx             # Hospital trust metrics and credentials
  │    ├── AppointmentCTA.tsx    # Conversion forms
  │    ├── Departments.tsx       # 14 divisions and associated doctors modals
  │    ├── DoctorSpotlight.tsx   # Spotlight on Prof. Dr. V. Suresh Kumar
  │    ├── Facilities.tsx        # High-tech equipment checklists
  │    ├── Hero.tsx              # Hero and quick actions
  │    ├── LocationMap.tsx       # Map iframe & directions
  │    ├── NeuroCenter.tsx       # Spine & brain surgeries
  │    ├── SmilingMonk.tsx       # Craniofacial clinic procedures
  │    ├── SpecialitiesExplorer.tsx # Interactive treatments grid search
  │    └── TraumaCare.tsx        # Multi-specialty trauma unit details
  ├── App.tsx            # Homepage assembly
  ├── index.css          # Stylesheets and Google Font imports
  └── main.tsx           # Entry point
```

---

## Local Development & Build

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) installed on your system.

### Install Dependencies
```bash
npm install
```

### Start Dev Server
```bash
npm run dev
```

### Production Build Test
Runs TypeScript reference compiler diagnostics and bundles clean, optimized files to `dist/`:
```bash
npm run build
```

---

## Deployment

This website is ready for zero-config production deployment:

### Netlify
1. Connect this repository to your Netlify dashboard.
2. Build Settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
3. Click Deploy.

### Vercel
1. Run `vercel` in your CLI or connect the project in the Vercel Dashboard.
2. Framework preset will automatically detect Vite.
3. Click Deploy.
