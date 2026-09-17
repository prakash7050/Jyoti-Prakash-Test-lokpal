import {
  Code2,
  Database,
  Terminal,
  Cloud,
} from "lucide-react";

import { skills } from "../../data/about";
import SkillBadge from "./SkillBadge";

const categoryConfig = {
  frontend: {
    title: "Frontend",
    subtitle: "Modern UI & application development",
    icon: Code2,
    iconColor: "text-cyan-400",
    boxColor: "bg-cyan-400/10",
  },
  backend: {
    title: "Backend & Data",
    subtitle: "APIs, databases & real-time systems",
    icon: Database,
    iconColor: "text-violet-400",
    boxColor: "bg-violet-400/10",
  },
  cloud: {
    title: "Cloud",
    subtitle: "Deployment, automation & infrastructure",
    icon: Cloud,
    iconColor: "text-fuchsia-400",
    boxColor: "bg-fuchsia-400/10",
  },
  ai: {
    title: "AI",
    subtitle: "Intelligent applications & integrations",
    icon: Terminal,
    iconColor: "text-emerald-400",
    boxColor: "bg-emerald-400/10",
  },
} as const;

export default function SkillsSection() {
  const categories = Object.keys(categoryConfig) as Array<
    keyof typeof categoryConfig
  >;

  return (
    <section className="mt-28">
      <div className="mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-300">
          <Terminal className="h-3.5 w-3.5" />
          Technical Expertise
        </div>

        <h2 className="text-3xl font-black sm:text-4xl">
          <span className="bg-gradient-to-r from-cyan-200 via-white to-violet-300 bg-clip-text text-transparent">
            Technologies I Work With
          </span>
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => {
          const config = categoryConfig[category];
          const Icon = config.icon;

          const categorySkills = skills.filter(
            (skill) => skill.category === category,
          );

          return (
            <div
              key={category}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-xl ${config.boxColor} p-3`}>
                  <Icon className={`h-5 w-5 ${config.iconColor}`} />
                </div>

                <div>
                  <h3 className="font-bold">{config.title}</h3>

                  <p className="text-xs text-slate-500">
                    {config.subtitle}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {categorySkills.map((skill, index) => (
                  <SkillBadge key={skill.name} index={index}>
                    {skill.name}
                  </SkillBadge>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}