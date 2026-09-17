import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function HomeCTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-24"
    >
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 p-8 text-center backdrop-blur-xl sm:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.15),transparent_45%)]" />

        <div className="relative z-10">
          <Sparkles className="mx-auto h-7 w-7 text-cyan-300" />

          <h2 className="mt-5 text-3xl font-black sm:text-4xl">
            Ready to get started?
            <span className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              Create your secure account.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400">
            Register and explore a modern authentication flow
            designed around security, reliability and a clean user
            experience.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <NavLink
              to="/register"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-1 hover:bg-cyan-100"
            >
              Create account
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </NavLink>

            <NavLink
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-white/10"
            >
              Sign in
            </NavLink>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Secure authentication
            </span>

            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              CSRF protection
            </span>

            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              PostgreSQL backend
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}