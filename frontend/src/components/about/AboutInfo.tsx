import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { infoItems } from "../../data/about";

export default function AboutInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="space-y-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {infoItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-white/5 p-2.5">
                  <Icon className={`h-5 w-5 ${item.color}`} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    {item.label}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-200">
                    {item.value}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-400/20 p-2.5">
            <Sparkles className="h-5 w-5 text-cyan-300" />
          </div>

          <div>
            <h3 className="text-xl font-bold">About Me</h3>

            <p className="text-sm text-slate-500">
              Building products from idea to production.
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm leading-7 text-slate-400">
          <p>
            I am{" "}
            <span className="font-semibold text-white">
              Jyoti Prakash
            </span>
            , a Full-Stack Developer with strong experience in modern
            JavaScript ecosystems, backend engineering, databases,
            cloud infrastructure and AI-powered applications.
          </p>

          <p>
            My core expertise spans{" "}
            <span className="text-cyan-300">
              React, Next.js, Node.js, Express, NestJS,
              PostgreSQL, MongoDB and MySQL
            </span>
            , together with modern API architectures.
          </p>

          <p>
            I have worked across{" "}
            <span className="text-fuchsia-300">
              FinTech, EdTech, SaaS, enterprise reporting,
              real-time applications and AI integrations
            </span>
            .
          </p>

          <p>
            I enjoy owning the complete development lifecycle —
            architecture, UI engineering, APIs, databases,
            authentication, deployment and optimization.
          </p>
        </div>
      </div>
    </motion.div>
  );
}