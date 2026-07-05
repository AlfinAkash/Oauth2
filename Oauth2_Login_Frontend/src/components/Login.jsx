import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Loader2, ArrowUpRight } from "lucide-react";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <div className="relative min-h-screen bg-[#0a0b0f] flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 font-sans">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0b0f]" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[200px] sm:h-[300px] bg-indigo-600/10 blur-[100px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[400px]"
      >
        <div className="rounded-xl border border-white/[0.08] bg-[#111318] shadow-[0_1px_0_rgba(255,255,255,0.05)_inset,0_24px_48px_-12px_rgba(0,0,0,0.7)] overflow-hidden">
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-[#0d0e13]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="font-mono text-[10px] sm:text-[11px] text-slate-500 truncate ml-2">
              alfinakash.dev
            </span>
          </div>

          {/* Body */}
          <div className="px-6 py-7 sm:px-9 sm:py-10">
            <div className="flex items-center gap-2.5 mb-6 sm:mb-7">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <Terminal size={15} className="text-indigo-400" />
              </div>
              <span className="font-mono text-[12px] sm:text-[13px] text-slate-400 tracking-tight">
                azyrexcloud
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-semibold text-slate-50 tracking-tight mb-1.5">
              Sign in to continue
            </h1>
            <p className="text-slate-500 text-[13px] sm:text-[13.5px] leading-relaxed mb-7 sm:mb-8">
              Authenticate with your Google account to access the platform.
            </p>

            <motion.button
              whileHover={{ y: isLoading ? 0 : -1 }}
              whileTap={{ scale: isLoading ? 1 : 0.985 }}
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="group w-full flex items-center justify-center gap-2.5 bg-slate-50 hover:bg-white text-slate-900 font-medium text-[13.5px] sm:text-[14px] rounded-lg py-3 transition-colors disabled:opacity-70 disabled:cursor-wait focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin shrink-0" />
                  <span>Redirecting</span>
                </>
              ) : (
                <>
                  <svg width="17" height="17" viewBox="0 0 48 48" className="shrink-0">
                    <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z"/>
                    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4c-7.4 0-13.8 4.1-17.1 10.7z"/>
                    <path fill="#4CAF50" d="M24 44c5.4 0 10.3-2 13.9-5.4l-6.4-5.4c-2 1.4-4.6 2.2-7.5 2.2-5.3 0-9.7-3.4-11.3-8L6 32.5C9.3 39.5 16.1 44 24 44z"/>
                    <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.2 4.3-4 5.8l6.4 5.4C41.5 35.6 44 30.2 44 24c0-1.3-.1-2.7-.4-3.9z"/>
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </motion.button>

            <div className="flex items-center gap-2 mt-5 px-3 py-2 rounded-md bg-white/[0.03] border border-white/[0.06]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span className="font-mono text-[10px] sm:text-[11px] text-slate-500 truncate">
                OAuth 2.0 · TLS encrypted session
              </span>
            </div>
          </div>

            {/* Footer strip */}
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2 sm:gap-0 px-6 sm:px-9 py-4 border-t border-white/[0.06] bg-[#0d0e13]">
            <a
              href="https://github.com/AlfinAkash"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] sm:text-[11px] text-slate-600 hover:text-indigo-400 transition-colors"
            >
              Built by <span className="text-slate-400">AlfinAkash</span>
            </a>

            <a
              href="https://azyrexcloud.online/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-mono text-[10px] sm:text-[11px] text-slate-600 hover:text-indigo-400 transition-colors"
            >
              Terms
              <ArrowUpRight size={10} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;