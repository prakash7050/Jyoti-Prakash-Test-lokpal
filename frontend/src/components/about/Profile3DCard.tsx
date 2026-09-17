import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Linkedin, Sparkles } from "lucide-react";
import { useRef } from "react";

export default function Profile3DCard() {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 180,
    damping: 18,
  });

  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 180,
    damping: 18,
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);

    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetCard = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetCard}
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="group relative mx-auto w-full max-w-md"
    >
      <div className="absolute -inset-4 rounded-[34px] bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 blur-2xl" />

      <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-2xl">
        <motion.div
          animate={{ x: ["-120%", "120%"] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl"
        />

        <div className="relative mx-auto flex aspect-square max-w-[330px] items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-3 rounded-full border border-cyan-400/20 border-dashed"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-8 rounded-full border border-violet-400/20 border-dashed"
          />

          <div className="absolute inset-12 rounded-full bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-violet-600/20 blur-2xl" />

          <motion.div
            whileHover={{ scale: 1.04 }}
            className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-white/10 bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 p-1 shadow-2xl sm:h-64 sm:w-64"
          >
            <div className="h-full w-full overflow-hidden rounded-full bg-slate-900">
              <img
                src="/profile.jpg"
                alt="Jyoti Prakash"
                className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-110"
              />
            </div>
          </motion.div>

          <motion.div
            animate={{
              y: [0, -9, 0],
              rotate: [0, 2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-0 top-12 rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-2 shadow-xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
              <span className="text-xs font-semibold">Available</span>
            </div>
          </motion.div>

          <motion.div
            animate={{
              y: [0, 8, 0],
              rotate: [0, -3, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-10 left-0 rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-2 shadow-xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="text-xs font-semibold text-slate-200">
                AI Developer
              </span>
            </div>
          </motion.div>
        </div>

        <div className="mt-6 text-center">
          <h2 className="text-3xl font-black">
            <span className="bg-gradient-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-transparent">
              Jyoti Prakash
            </span>
          </h2>

          <p className="mt-2 text-sm font-medium text-slate-400">
            Senior Full-Stack Developer
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {["MERN", "PERN", "AI Apps", "FinTech"].map((item) => (
              <span
                key={item}
                className="rounded-full bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <motion.a
            whileHover={{ scale: 1.08, y: -3 }}
            href="https://github.com/prakash7050"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
          >
            <Github className="h-4 w-4" />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.08, y: -3 }}
            href="https://www.linkedin.com/in/prakash7050/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
          >
            <Linkedin className="h-4 w-4" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
