import { motion } from "framer-motion";
import { stats } from "../../data/about";

export default function AboutStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -6 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
          >
            <div
              className={`absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br ${stat.gradient} opacity-10 blur-2xl`}
            />

            <Icon className="h-5 w-5 text-slate-300" />

            <div className="mt-5 text-3xl font-black text-white">
              {stat.value}
            </div>

            <div className="mt-1 text-sm text-slate-500">
              {stat.title}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}