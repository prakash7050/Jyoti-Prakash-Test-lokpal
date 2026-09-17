import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import HomeHero from "../components/home/HomeHero";
import FeatureCard from "../components/home/FeatureCard";
import SecurityOverview from "../components/home/SecurityOverview";
import HomeCTA from "../components/home/HomeCTA";
import { homeFeatures } from "../data/home";

export default function Home() {
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

      {/* Animated background */}
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

      <div className="relative z-10">
        <HomeHero />

        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-300">
              Core Capabilities
            </div>

            <h2 className="text-3xl font-black sm:text-4xl">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-violet-300 bg-clip-text text-transparent">
                Built with security in mind
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500">
              Key engineering decisions behind the authentication
              and data-processing workflow.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {homeFeatures.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                index={index}
              />
            ))}
          </div>

          <SecurityOverview />

          <HomeCTA />
        </section>
      </div>
    </main>
  );
}