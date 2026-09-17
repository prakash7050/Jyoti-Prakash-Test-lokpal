import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { experience } from "../../data/about";

export default function ExperienceTimeline() {
  return (
    <section className="mt-28">
      <div className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-xs font-semibold text-violet-300">
          <BriefcaseBusiness className="h-3.5 w-3.5" />
          Professional Journey
        </div>

        <h2 className="text-3xl font-black sm:text-4xl">
          <span className="bg-gradient-to-r from-white via-violet-200 to-cyan-300 bg-clip-text text-transparent">
            Experience
          </span>
        </h2>

        <p className="mt-3 max-w-2xl text-slate-500">
          A journey across software development, FinTech,
          SaaS, entrepreneurship and AI-powered products.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-500 via-violet-500 to-fuchsia-500 md:block" />

        <div className="space-y-8">
          {experience.map((item, index) => (
            <motion.div
              key={`${item.company}-${item.period}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
              }}
              className="relative md:pl-12"
            >
              <div className="absolute left-0 top-8 hidden h-8 w-8 items-center justify-center rounded-full border border-cyan-400/40 bg-slate-950 md:flex">
                <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
              </div>

              <motion.div
                whileHover={{ y: -4 }}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl"
              >
                <div className="flex flex-col justify-between gap-4 lg:flex-row">
                  <div>
                    <p className="text-sm font-medium text-cyan-300">
                      {item.period}
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-white">
                      {item.role}
                    </h3>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Building2 className="h-4 w-4" />
                        {item.company}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-400">
                    Full-Stack
                  </div>
                </div>

                <p className="mt-5 max-w-4xl text-sm leading-7 text-slate-400">
                  {item.description}
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {item.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex items-start gap-2 text-sm text-slate-400"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}