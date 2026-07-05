import { motion } from "framer-motion";
import { Globe, Smartphone, Cloud, ShieldCheck, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

const features = [
  { icon: Globe, label: "Web Platforms", desc: "Apps & dashboards, hosted end-to-end" },
  { icon: Smartphone, label: "Mobile Apps", desc: "iOS & Android from one codebase" },
  { icon: Cloud, label: "Cloud Infrastructure", desc: "Scalable, managed, always on" },
];

const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 font-sans flex items-center justify-center px-4 py-10 sm:px-6 lg:py-0">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-24 w-72 h-72 sm:w-[420px] sm:h-[420px] rounded-full bg-indigo-500/25 blur-[110px]" />
        <div className="absolute top-1/3 -right-24 w-72 h-72 sm:w-[420px] sm:h-[420px] rounded-full bg-cyan-400/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-violet-500/15 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:56px_56px]" />
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
      </div>

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] items-center gap-12 lg:gap-16">
        {/* Left: brand + feature list */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="order-1 lg:order-none text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] font-mono text-slate-300 tracking-wide">All systems operational</span>
          </div>

          <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-[44px] leading-[1.1] tracking-tight mb-4">
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Azyrex Cloud
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto lg:mx-0 mb-8 lg:mb-10">
            One account for every service you run — web, mobile, and cloud infrastructure, unified.
          </p>

          <div className="space-y-3 max-w-sm mx-auto lg:mx-0">
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                custom={i}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left"
              >
                <div className="shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500/20 to-cyan-400/20 border border-white/10 flex items-center justify-center">
                  <f.icon size={16} className="text-cyan-400" />
                </div>
                <div>
                  <p className="text-slate-100 text-sm font-semibold">{f.label}</p>
                  <p className="text-slate-500 text-xs">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: login card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="order-2 lg:order-none w-full"
        >
          <div className="relative mx-auto w-full max-w-sm">
            {/* Gradient border glow */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-indigo-500/40 via-white/10 to-cyan-400/40 opacity-60 blur-sm" />

            <div className="relative rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.55)] p-7 sm:p-9">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] tracking-widest uppercase text-cyan-400">
                <ShieldCheck size={12} /> Secure sign-in
              </span>

              <h2 className="font-bold text-2xl sm:text-[28px] text-slate-50 mt-3 mb-2">
                Welcome back
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Sign in with Google to access your dashboard and services.
              </p>

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoogleLogin}
                className="group w-full flex items-center justify-center gap-3 bg-white text-slate-950 font-semibold text-sm sm:text-[15px] rounded-xl py-3.5 shadow-[0_1px_0_rgba(255,255,255,0.4)_inset] transition-shadow hover:shadow-[0_10px_30px_rgba(99,102,241,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400 focus-visible:outline-offset-2"
              >
                <svg width="19" height="19" viewBox="0 0 48 48" className="shrink-0">
                  <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z"/>
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4c-7.4 0-13.8 4.1-17.1 10.7z"/>
                  <path fill="#4CAF50" d="M24 44c5.4 0 10.3-2 13.9-5.4l-6.4-5.4c-2 1.4-4.6 2.2-7.5 2.2-5.3 0-9.7-3.4-11.3-8L6 32.5C9.3 39.5 16.1 44 24 44z"/>
                  <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.2 4.3-4 5.8l6.4 5.4C41.5 35.6 44 30.2 44 24c0-1.3-.1-2.7-.4-3.9z"/>
                </svg>
                Continue with Google
                <ArrowRight size={16} className="opacity-0 -ml-1 w-0 group-hover:w-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
              </motion.button>

              <div className="flex items-center gap-3 my-7">
                <span className="h-px flex-1 bg-white/10" />
                <span className="text-slate-500 text-[10px] font-mono tracking-wider">ENCRYPTED CONNECTION</span>
                <span className="h-px flex-1 bg-white/10" />
              </div>

              <p className="text-xs text-slate-500 text-center leading-relaxed">
                By continuing you agree to Azyrex Cloud's{" "}
                <span className="text-slate-300 underline decoration-white/20 cursor-pointer hover:text-cyan-400">
                  terms of service
                </span>
                .
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;