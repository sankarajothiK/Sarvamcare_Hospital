import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Compass } from "lucide-react";

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | SarvamCare Hospital</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="min-h-screen flex flex-col items-center justify-center bg-[#FAF7FF] px-4 text-center font-sans">
        <Compass className="h-16 w-16 text-[#D8B35A] animate-spin-slow mb-6" />
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#32105F] tracking-tight">404</h1>
        <h2 className="font-serif text-lg sm:text-xl font-bold text-[#32105F] mt-2">Page Not Found</h2>
        <p className="text-xs text-[#665A70] font-light max-w-sm mt-2 leading-relaxed">
          The link you followed may be broken or the clinical page was moved. Use the navigation bar to return to health services overview.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="px-8 py-3.5 rounded-full bg-[#32105F] hover:bg-[#3D176E] text-white text-xs font-bold uppercase tracking-wider shadow-md hover-sweep"
          >
            Return Home Page
          </Link>
        </div>
      </section>
    </>
  );
};

export default NotFoundPage;
