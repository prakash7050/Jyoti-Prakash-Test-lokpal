import { motion } from "framer-motion";
import type { HomeFeature } from "./types";

interface FeatureCardProps {
  feature: HomeFeature;
  index: number;
}

export default function FeatureCard({
  feature,
  index,
}: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
      }}
      whileHover={{
        y: -8,
        scale: 1.015,
      }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
    >
      <div
        className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${feature.gradient} opacity-10 blur-3xl transition duration-500 group-hover:opacity-25`}
      />

      <div
        className={`relative inline-flex rounded-2xl bg-white/5 p-3 ${feature.iconColor}`}
      >
        <Icon className="h-7 w-7" />
      </div>

      <h3 className="relative mt-5 text-lg font-bold text-white">
        {feature.title}
      </h3>

      <p className="relative mt-3 text-sm leading-7 text-slate-400">
        {feature.description}
      </p>

      <div className="relative mt-6 h-px overflow-hidden bg-white/10">
        <div
          className={`h-full w-0 bg-gradient-to-r ${feature.gradient} transition-all duration-500 group-hover:w-full`}
        />
      </div>
    </motion.div>
  );
}