import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Lock, User, AlertCircle, ArrowLeft } from "lucide-react";
import { SarvamCareLogo } from "../components/BrandLogos";

export const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    const token = localStorage.getItem("sarvamcare_admin_token");
    if (token) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("sarvamcare_admin_token", data.token);
        localStorage.setItem("sarvamcare_admin_user", data.username);
        navigate("/admin");
      } else {
        setError(data.message || "Invalid credentials. Try username: sarvamcarehospital.in, password: Sarvamcare123");
      }
    } catch (err) {
      setError("Server connection failed. Make sure Node API is running.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Secure Portal Login | SarvamCare Hospital</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="min-h-screen bg-[#32105F] flex flex-col justify-center items-center px-4 font-sans select-none relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[450px] w-[450px] rounded-full bg-[#7E3DB5]/20 blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md bg-white rounded-3xl border border-[#EDE4F7] p-8 shadow-2xl relative z-10 space-y-6">
          <div className="flex flex-col items-center text-center space-y-3">
            <SarvamCareLogo className="h-16 w-16" showText={false} />
            <div className="space-y-1">
              <h2 className="font-serif text-xl font-bold text-[#32105F]">Hospital CMS Login</h2>
              <p className="text-xs text-[#665A70] font-light">Authenticated access required to manage clinical database.</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200/50 rounded-xl text-red-700 text-xs font-light">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Username */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#665A70]">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#665A70]" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  autoComplete="off"
                  className="w-full pl-10 pr-4 py-3 text-xs bg-[#FAF7FF] border border-[#EDE4F7] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D8B35A] focus:border-[#D8B35A] transition-all text-[#24152F]"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#665A70]">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#665A70]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="w-full pl-10 pr-4 py-3 text-xs bg-[#FAF7FF] border border-[#EDE4F7] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D8B35A] focus:border-[#D8B35A] transition-all text-[#24152F]"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-full bg-[#32105F] text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#3D176E] transition-all disabled:opacity-50"
            >
              <span>{submitting ? "Signing In..." : "Secure Login"}</span>
            </button>
          </form>

          <div className="pt-2 border-t border-[#F3EDFA] text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-[#6D2FA0] hover:text-[#32105F] font-bold uppercase tracking-wider transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Return to Website</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
