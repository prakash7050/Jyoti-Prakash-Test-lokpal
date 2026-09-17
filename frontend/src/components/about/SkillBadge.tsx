import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import type { ReactNode } from "react";

interface SkillBadgeProps {
  children: ReactNode;
  index?: number;
}

export default function SkillBadge({
  children,
  index = 0,
}: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        delay: index * 0.025,
        duration: 0.35,
      }}
      whileHover={{
        y: -5,
        scale: 1.04,
      }}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-slate-200 backdrop-blur-xl"
    >
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      <span className="relative z-10 flex items-center gap-2">
        <Code2 className="h-3.5 w-3.5 text-cyan-400" />
        {children}
      </span>
    </motion.div>
  );
}