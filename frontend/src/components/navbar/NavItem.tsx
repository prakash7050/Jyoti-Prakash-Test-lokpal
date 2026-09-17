import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

import { useTheme } from "@/context/ThemeContext";
import type { NavLinkItem } from "./types";

interface NavItemProps {
  item: NavLinkItem;
  onClick?: () => void;
  mobile?: boolean;
}

export default function NavItem({
  item,
  onClick,
  mobile = false,
}: NavItemProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <NavLink to={item.to} end={item.end} onClick={onClick} className="group">
      {({ isActive }) => (
        <motion.div
          whileHover={{ y: -2 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
          className={`
            relative flex items-center
            ${mobile ? "w-full rounded-xl px-4 py-3" : "px-1 py-2"}
            text-sm font-semibold
            transition-colors duration-300
            ${
              isActive
                ? isLight
                  ? "text-black"
                  : "text-white"
                : isLight
                  ? "text-black/60 hover:text-black"
                  : "text-white/60 hover:text-white"
            }
          `}
        >
          {isActive && mobile && (
            <motion.span
              layoutId={`mobile-active-${item.to}`}
              className={`
                absolute inset-0 rounded-xl border
                ${
                  isLight
                    ? "border-black/10 bg-black/[0.04]"
                    : "border-white/10 bg-white/[0.06]"
                }
              `}
            />
          )}

          <span className="relative z-10">{item.label}</span>

          {isActive && !mobile && (
            <motion.span
              layoutId="navbar-active"
              className={`
                absolute -bottom-1 left-0 right-0 h-0.5 rounded-full
                ${isLight ? "bg-black" : "bg-white"}
              `}
            />
          )}
        </motion.div>
      )}
    </NavLink>
  );
}
