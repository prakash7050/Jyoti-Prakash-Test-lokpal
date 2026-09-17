import { motion } from "framer-motion";
import {
  ArrowRight,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.15),transparent_35%),radial-gradient(circle_at_85%_20%,rgba(139,92,246,0.16),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl"
            >
              <Sparkles className="h-4 w-4" />
              Production-style Authentication System
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-7 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl"
            >
              <span className="bg-gradient-to-r from-white via-cyan-200 to-violet-300 bg-clip-text text-transparent">
                Secure by design.
              </span>

              <span className="mt-2 block bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 bg-clip-text text-transparent">
                Built for real users.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg"
            >
              A production-style registration and authentication module
              built with React, FastAPI and PostgreSQL, using security
              practices designed for modern real-world applications.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <NavLink
                to="/register"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 shadow-xl transition hover:-translate-y-1 hover:bg-cyan-100"
              >
                Create an account
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </NavLink>

              <NavLink
                to="/login"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/10"
              >
                Sign in
              </NavLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-wrap gap-4 text-xs text-slate-500"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                CSRF Protected
              </span>

              <span className="flex items-center gap-2">
                <LockKeyhole className="h-4 w-4 text-cyan-400" />
                HttpOnly Cookies
              </span>

              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-violet-400" />
                Production Ready
              </span>
            </motion.div>
          </div>

          {/* Security visual */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -12 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            whileHover={{ rotateY: 5, rotateX: -3, y: -6 }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-violet-500/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.05] p-6 shadow-2xl backdrop-blur-2xl">
              <motion.div
                animate={{ x: ["-120%", "120%"] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl"
              />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Security Layer
                    </p>

                    <h2 className="mt-2 text-2xl font-black">
                      Protected
                    </h2>
                  </div>

                  <div className="rounded-2xl bg-emerald-400/10 p-3 text-emerald-400">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  {[
                    "JWT Authentication",
                    "HttpOnly Cookies",
                    "CSRF Protection",
                    "PostgreSQL Persistence",
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.5 + index * 0.1,
                      }}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <span className="text-sm text-slate-300">
                        {item}
                      </span>

                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                    </motion.div>
                  ))}
                </div>

                <div className="mt-7 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4">
                  <div className="flex items-center gap-3">
                    <LockKeyhole className="h-5 w-5 text-cyan-400" />

                    <div>
                      <p className="text-xs text-slate-500">
                        Session State
                      </p>

                      <p className="mt-1 text-sm font-semibold text-cyan-300">
                        Securely authenticated
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}