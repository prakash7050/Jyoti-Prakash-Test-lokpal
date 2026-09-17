import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Sparkles } from "lucide-react";

import { contactDetails, contactSocials } from "../../data/contact";

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div className="grid gap-5 md:grid-cols-3">
        {contactDetails.map((contact, index) => {
          const Icon = contact.icon;

          return (
            <motion.a
              key={contact.label}
              href={contact.href}
              target={contact.href?.startsWith("http") ? "_blank" : undefined}
              rel={contact.href?.startsWith("http") ? "noreferrer" : undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl transition group-hover:bg-cyan-500/20" />

              <div className="flex items-start justify-between">
                <div className={`rounded-2xl bg-white/5 p-3 ${contact.color}`}>
                  <Icon className="h-6 w-6" />
                </div>

                <ArrowUpRight className="h-5 w-5 text-slate-600 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {contact.label}
              </p>

              <p className="mt-2 break-words text-lg font-bold text-white">
                {contact.value}
              </p>

              {contact.description && (
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {contact.description}
                </p>
              )}

              <div className="mt-6 h-px overflow-hidden bg-white/10">
                <div className="h-full w-0 bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 transition-all duration-500 group-hover:w-full" />
              </div>
            </motion.a>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 p-8 backdrop-blur-xl sm:p-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.15),transparent_35%)]" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-cyan-300">
              <Sparkles className="h-3.5 w-3.5" />
              Open to Opportunities
            </div>

            <h2 className="mt-5 text-2xl font-black sm:text-3xl">
              Let's discuss your next
              <span className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                product or engineering challenge.
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
              Whether it's a full-stack application, AI integration, SaaS
              product, real-time system or backend architecture, I'd be happy to
              discuss the requirements.
            </p>
          </div>

          <a
            href="mailto:jyoti.prakash@example.com"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-1 hover:bg-cyan-100"
          >
            <Mail className="h-4 w-4" />
            Send Email
          </a>
        </div>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-3">
        {contactSocials.map((social) => {
          const Icon = social.icon;

          return (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -4, scale: 1.04 }}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <Icon className="h-4 w-4" />
              {social.label}
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
