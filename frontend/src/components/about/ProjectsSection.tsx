import { motion } from "framer-motion";
import { ArrowUpRight, Layers3 } from "lucide-react";
import { projects } from "../../data/about";

export default function ProjectsSection() {
  return (
    <section className="mt-28">
      <div className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1.5 text-xs font-semibold text-fuchsia-300">
          <Layers3 className="h-3.5 w-3.5" />
          Selected Work
        </div>

        <h2 className="text-3xl font-black sm:text-4xl">
          <span className="bg-gradient-to-r from-white via-fuchsia-200 to-cyan-300 bg-clip-text text-transparent">
            Projects & Products
          </span>
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => {
          const Icon = project.icon;

          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -7 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl"
            >
              <div
                className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${project.gradient} opacity-10 blur-3xl transition duration-500 group-hover:opacity-20`}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div
                    className={`rounded-2xl bg-gradient-to-br ${project.gradient} p-3 shadow-lg`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>

                  <ArrowUpRight className="h-5 w-5 text-slate-600 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
                </div>

                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {project.category}
                </p>

                <h3 className="mt-2 text-xl font-bold">
                  {project.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {project.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}