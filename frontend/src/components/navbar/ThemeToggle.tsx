import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{
        scale: 1.05,
        rotate: isLight ? -5 : 5,
      }}
      whileTap={{ scale: 0.94 }}
      aria-label="Toggle theme"
      className={`
        relative flex h-10 w-10 items-center justify-center
        rounded-xl border transition-all duration-300
        ${
          isLight
            ? "border-black/10 bg-white text-black hover:bg-black hover:text-white"
            : "border-white/10 bg-black text-white hover:bg-white hover:text-black"
        }
      `}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isLight ? 0 : 180,
        }}
        transition={{ duration: 0.3 }}
      >
        {isLight ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </motion.div>
    </motion.button>
  );
}