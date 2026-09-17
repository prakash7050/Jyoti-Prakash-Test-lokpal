import { motion } from "framer-motion";
import { Github, Linkedin, Sparkles } from "lucide-react";

export default function AboutCTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-28"
    >
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 p-8 text-center backdrop-blur-xl sm:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.14),transparent_45%)]" />

        <div className="relative z-10">
          <Sparkles className="mx-auto h-7 w-7 text-cyan-300" />

          <h2 className="mt-5 text-3xl font-black sm:text-4xl">
            Building modern digital products
            <span className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              with code, design & AI.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400">
            From architecture and development to deployment and
            optimization, I focus on creating reliable products
            with strong engineering foundations and polished user
            experiences.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="https://www.linkedin.com/in/prakash7050/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-1 hover:bg-cyan-100"
            >
              <Linkedin className="h-4 w-4" />
              Connect on LinkedIn
            </a>

            <a
              href="https://github.com/prakash7050"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-white/10"
            >
              <Github className="h-4 w-4" />
              View GitHub
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}