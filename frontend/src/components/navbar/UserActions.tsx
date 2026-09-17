import { motion } from "framer-motion";
import { LogOut, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";

import { useTheme } from "@/context/ThemeContext";

interface UserActionsProps {
  user: unknown;
  onLogout: () => void;
}

export default function UserActions({
  user,
  onLogout,
}: UserActionsProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div className="flex items-center gap-3">
      {user ? (
        <>
          <motion.div
            whileHover={{ y: -2 }}
            className={`
              hidden items-center gap-2 rounded-xl border px-3 py-2
              backdrop-blur-xl lg:flex
              ${
                isLight
                  ? "border-black/10 bg-black/[0.03]"
                  : "border-white/10 bg-white/[0.04]"
              }
            `}
          >
            <div
              className={`
                flex h-7 w-7 items-center justify-center rounded-lg
                ${
                  isLight
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }
              `}
            >
              <UserRound className="h-3.5 w-3.5" />
            </div>

            <span
              className={`max-w-24 truncate text-xs font-semibold ${
                isLight ? "text-black" : "text-white"
              }`}
            >
              Account
            </span>
          </motion.div>

          <motion.button
            type="button"
            onClick={onLogout}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className={`
              group inline-flex items-center gap-2 rounded-xl
              border px-4 py-2 text-sm font-bold transition-all
              ${
                isLight
                  ? "border-black bg-black text-white hover:bg-white hover:text-black"
                  : "border-white bg-white text-black hover:bg-black hover:text-white"
              }
            `}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </motion.button>
        </>
      ) : (
        <>
          <NavLink
            to="/login"
            className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
              isLight
                ? "text-black/70 hover:text-black"
                : "text-white/70 hover:text-white"
            }`}
          >
            Login
          </NavLink>

          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <NavLink
              to="/register"
              className={`
                inline-flex items-center rounded-xl border px-4 py-2
                text-sm font-bold transition-all
                ${
                  isLight
                    ? "border-black bg-black text-white hover:bg-white hover:text-black"
                    : "border-white bg-white text-black hover:bg-black hover:text-white"
                }
              `}
            >
              Register
            </NavLink>
          </motion.div>
        </>
      )}
    </div>
  );
}