import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import { education, engineeringFocus } from "../../data/about";

export default function EducationSection() {
  return (
    <section className="mt-28">
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          whileHover={{ y: -5 }}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl"
        >
          <div>
            <h3 className="text-xl font-bold">Education</h3>
            <p className="text-sm text-slate-500">
              Academic background
            </p>
          </div>

          <div className="mt-7 space-y-6">
            {education.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.degree}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex items-start gap-3">
                    <Icon className="mt-1 h-5 w-5 text-cyan-400" />

                    <div>
                      <h4 className="font-bold">
                        {item.degree}
                      </h4>

                      <p className="mt-1 text-sm text-slate-400">
                        {item.institution}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                        <span>{item.period}</span>
                        <span>•</span>
                        <span>{item.result}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet-400/10 p-3">
              <Cpu className="h-5 w-5 text-violet-400" />
            </div>

            <div>
              <h3 className="text-xl font-bold">
                Engineering Focus
              </h3>

              <p className="text-sm text-slate-500">
                What I build and solve
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-3">
            {engineeringFocus.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.label}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <Icon className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm text-slate-300">
                    {item.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}