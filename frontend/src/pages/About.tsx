import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import AboutHero from "../components/about/AboutHero";
import AboutInfo from "../components/about/AboutInfo";
import AboutStats from "../components/about/AboutStats";
import ExperienceTimeline from "../components/about/ExperienceTimeline";
import SkillsSection from "../components/about/SkillsSection";
import ProjectsSection from "../components/about/ProjectsSection";
import EducationSection from "../components/about/EducationSection";
import AboutCTA from "../components/about/AboutCTA";
import Profile3DCard from "../components/about/Profile3DCard";

export default function About() {
  const [cursor, setCursor] = useState({
    x: 50,
    y: 50,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursor({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Cursor glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        style={{
          background: `radial-gradient(
            450px circle at ${cursor.x}% ${cursor.y}%,
            rgba(59,130,246,0.16),
            transparent 60%
          )`,
        }}
      />

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 40, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[5%] top-[5%] h-80 w-80 rounded-full bg-cyan-500/20 blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -80, 60, 0],
            y: [0, 60, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[5%] top-[20%] h-96 w-96 rounded-full bg-violet-600/20 blur-[130px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[10%] left-[35%] h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[120px]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
        <AboutHero />

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Profile3DCard />
          <AboutInfo />
        </div>

        <AboutStats />

        <ExperienceTimeline />

        <SkillsSection />

        <ProjectsSection />

        <EducationSection />

        <AboutCTA />
      </div>
    </main>
  );
}
