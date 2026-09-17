import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { securityItems } from "../../data/home";

export default function SecurityOverview() {
  return (
    <section className="mt-24">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
          <ShieldCheck className="h-3.5 w-3.5" />
          Security Architecture
        </div>

        <h2 className="text-3xl font-black sm:text-4xl">
          <span className="bg-gradient-to-r from-white via-emerald-200 to-cyan-300 bg-clip-text text-transparent">
            Security at every layer
          </span>
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500">
          Authentication, request protection, persistence and
          processing are designed as separate but connected layers.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {securityItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
            >
              <div
                className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${item.gradient} opacity-10 blur-2xl`}
              />

              <Icon className="h-5 w-5 text-slate-300" />

              <p className="mt-5 text-xs uppercase tracking-wider text-slate-500">
                {item.label}
              </p>

              <h3 className="mt-1 text-base font-bold text-white">
                {item.value}
              </h3>

              <p className="mt-2 text-xs leading-6 text-slate-500">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}