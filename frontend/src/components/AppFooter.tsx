import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Github,
  Heart,
  Linkedin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function AppFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-slate-200/70 bg-white/80 text-slate-700 backdrop-blur-2xl transition-colors duration-500 dark:border-white/10 dark:bg-slate-950/80 dark:text-white">
      {/* Top animated line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute inset-x-0 top-0 h-px origin-center bg-gradient-to-r from-transparent via-cyan-400 to-violet-500"
      />

      {/* Ambient gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -20, 20, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[5%] top-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-[80px] dark:bg-cyan-500/10"
        />

        <motion.div
          animate={{
            x: [0, -50, 35, 0],
            y: [0, 25, -20, 0],
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[10%] bottom-0 h-48 w-48 rounded-full bg-violet-400/10 blur-[90px] dark:bg-violet-600/10"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
        {/* Main footer grid */}
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <motion.div
              whileHover={{
                y: -3,
              }}
              className="inline-flex items-center gap-3"
            >
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 shadow-xl shadow-cyan-500/20">
                <ShieldCheck className="h-6 w-6 text-white" />

                <motion.span
                  animate={{
                    opacity: [0.15, 0.45, 0.15],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 rounded-2xl bg-white blur-xl"
                />
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  SecureAuth
                </h3>

                <p className="text-xs text-slate-500">
                  Secure • Modern • Reliable
                </p>
              </div>
            </motion.div>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-500 dark:text-slate-400">
              A modern authentication application focused on
              secure access, validation, account protection and
              a polished user experience.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <motion.a
                whileHover={{
                  y: -4,
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                href="https://github.com/prakash7050"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-cyan-300 hover:text-cyan-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-cyan-400/30 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <Github className="h-4 w-4" />
              </motion.a>

              <motion.a
                whileHover={{
                  y: -4,
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                href="https://www.linkedin.com/in/prakash7050/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-cyan-300 hover:text-cyan-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-cyan-400/30 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
              </motion.a>
            </div>
          </div>

          {/* Technology */}
          <div>
            <div className="mb-5 flex items-center gap-2">
              <div className="rounded-lg bg-cyan-400/10 p-2">
                <Code2 className="h-4 w-4 text-cyan-500" />
              </div>

              <h4 className="font-bold text-slate-900 dark:text-white">
                Frontend
              </h4>
            </div>

            <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              {["React", "TypeScript", "Framer Motion", "Tailwind CSS"].map(
                (item) => (
                  <motion.div
                    key={item}
                    whileHover={{ x: 4 }}
                    className="transition-colors hover:text-cyan-500 dark:hover:text-cyan-300"
                  >
                    {item}
                  </motion.div>
                ),
              )}
            </div>
          </div>

          {/* Backend */}
          <div>
            <div className="mb-5 flex items-center gap-2">
              <div className="rounded-lg bg-violet-400/10 p-2">
                <Database className="h-4 w-4 text-violet-500" />
              </div>

              <h4 className="font-bold text-slate-900 dark:text-white">
                Backend
              </h4>
            </div>

            <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              {["FastAPI", "PostgreSQL", "JWT Authentication", "REST APIs"].map(
                (item) => (
                  <motion.div
                    key={item}
                    whileHover={{ x: 4 }}
                    className="transition-colors hover:text-violet-500 dark:hover:text-violet-300"
                  >
                    {item}
                  </motion.div>
                ),
              )}
            </div>
          </div>

          {/* Security */}
          <div>
            <div className="mb-5 flex items-center gap-2">
              <div className="rounded-lg bg-emerald-400/10 p-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
              </div>

              <h4 className="font-bold text-slate-900 dark:text-white">
                Security
              </h4>
            </div>

            <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              {[
                "Protected Routes",
                "Password Validation",
                "Token Refresh",
                "Secure Sessions",
              ].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ x: 4 }}
                  className="transition-colors hover:text-emerald-500 dark:hover:text-emerald-300"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-slate-200 dark:bg-white/10" />

        {/* Technology pills */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            {
              label: "React",
              color: "cyan",
            },
            {
              label: "FastAPI",
              color: "violet",
            },
            {
              label: "PostgreSQL",
              color: "emerald",
            },
            {
              label: "Framer Motion",
              color: "pink",
            },
          ].map((item) => (
            <motion.div
              key={item.label}
              whileHover={{
                y: -3,
              }}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-500 shadow-sm transition dark:border-white/10 dark:bg-white/5 dark:text-slate-400"
            >
              {item.label}
            </motion.div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            © {new Date().getFullYear()} SecureAuth. All rights
            reserved.
          </p>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Built with</span>

            <Heart className="h-3.5 w-3.5 fill-current text-rose-400" />

            <span>by Jyoti Prakash</span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-500">
            React • FastAPI • PostgreSQL
          </p>
        </div>
      </div>
    </footer>
  );
}