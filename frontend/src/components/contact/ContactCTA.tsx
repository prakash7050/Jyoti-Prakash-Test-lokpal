import { motion } from "framer-motion";
import { Code2, Heart, Sparkles } from "lucide-react";

export default function ContactCTA() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mt-16 text-center"
    >
      <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
        <Code2 className="h-4 w-4 text-cyan-400" />
        <span>Built with React, TypeScript & Framer Motion</span>
      </div>

      <p className="mt-3 flex items-center justify-center gap-1 text-xs text-slate-600">
        Crafted with
        <Heart className="h-3 w-3 fill-current text-pink-500" />
        <span>and</span>
        <Sparkles className="h-3 w-3 text-cyan-400" />
      </p>
    </motion.div>
  );
}