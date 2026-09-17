import { motion } from "framer-motion";
import type { ContactDetail } from "./types";

interface ContactCardProps {
  contact: ContactDetail;
  index: number;
}

export default function ContactCard({
  contact,
  index,
}: ContactCardProps) {
  const Icon = contact.icon;

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
      whileHover={{
        y: -8,
        scale: 1.015,
      }}
      className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl"
    >
      <div
        className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${contact.gradient} opacity-10 blur-3xl transition duration-500 group-hover:opacity-25`}
      />

      <div
        className={`relative inline-flex rounded-2xl bg-white/5 p-3 ${contact.color}`}
      >
        <Icon className="h-6 w-6" />
      </div>

      <div className="relative mt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
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
      </div>

      <div className="relative mt-6 h-px overflow-hidden bg-white/10">
        <div
          className={`h-full w-0 bg-gradient-to-r ${contact.gradient} transition-all duration-500 group-hover:w-full`}
        />
      </div>

      {contact.href && (
        <span className="relative mt-4 inline-block text-xs font-semibold text-slate-400 transition group-hover:text-white">
          Connect →
        </span>
      )}
    </motion.div>
  );

  if (!contact.href) {
    return content;
  }

  return (
    <a
      href={contact.href}
      className="block h-full"
      {...(contact.href.startsWith("http")
        ? {
            target: "_blank",
            rel: "noreferrer",
          }
        : {})}
    >
      {content}
    </a>
  );
}