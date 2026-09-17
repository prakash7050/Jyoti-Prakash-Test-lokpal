import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function AboutHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="mx-auto max-w-4xl text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300 backdrop-blur-xl"
      >
        <Sparkles className="h-4 w-4" />

        Full-Stack Developer • AI • FinTech • SaaS
      </motion.div>

      <h1 className="text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
        <span className="bg-gradient-to-r from-white via-cyan-200 to-violet-300 bg-clip-text text-transparent">
          About Jyoti Prakash
        </span>
      </h1>

      <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
        Full-Stack Developer with 5+ years of professional
        experience building scalable web applications,
        AI-powered products, FinTech platforms, real-time systems
        and modern SaaS experiences.
      </p>
    </motion.div>
  );
}