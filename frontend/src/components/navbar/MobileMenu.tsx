import { AnimatePresence, motion } from "framer-motion";
import { LogOut } from "lucide-react";

import { useTheme } from "@/context/ThemeContext";

import NavItem from "./NavItem";
import type { NavLinkItem } from "./types";

interface MobileMenuProps {
  open: boolean;
  links: NavLinkItem[];
  user: unknown;
  onClose: () => void;
  onLogout: () => void;
}

export default function MobileMenu({
  open,
  links,
  user,
  onClose,
  onLogout,
}: MobileMenuProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className={`
            overflow-hidden border-t backdrop-blur-2xl md:hidden
            ${
              isLight
                ? "border-black/10 bg-white/95"
                : "border-white/10 bg-black/95"
            }
          `}
        >
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            exit={{ y: -10 }}
            className="space-y-2 px-5 py-5"
          >
            {links.map((item) => (
              <NavItem key={item.to} item={item} mobile onClick={onClose} />
            ))}

            {!!user && (
              <NavItem
                item={{
                  to: "/dashboard",
                  label: "Dashboard",
                  end: true,
                }}
                mobile
                onClick={onClose}
              />
            )}

            <div
              className={`my-3 h-px ${isLight ? "bg-black/10" : "bg-white/10"}`}
            />

            {user ? (
              <motion.button
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onClose();
                  onLogout();
                }}
                className={`
                  flex w-full items-center gap-2 rounded-xl
                  border px-4 py-3 text-sm font-bold transition
                  ${
                    isLight
                      ? "border-black bg-black text-white"
                      : "border-white bg-white text-black"
                  }
                `}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </motion.button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <NavItem
                  item={{
                    to: "/login",
                    label: "Login",
                  }}
                  mobile
                  onClick={onClose}
                />

                <NavItem
                  item={{
                    to: "/register",
                    label: "Register",
                  }}
                  mobile
                  onClick={onClose}
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
