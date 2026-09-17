import { motion } from "framer-motion";
import { Menu, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/context/ToastContext";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutUser } from "@/store/authSlice";

import MobileMenu from "./MobileMenu";
import NavItem from "./NavItem";
import ThemeToggle from "./ThemeToggle";
import UserActions from "./UserActions";
import type { NavLinkItem } from "./types";

const links: NavLinkItem[] = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About", end: true },
  { to: "/contact", label: "Contact", end: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { theme } = useTheme();
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogout = async () => {
    await dispatch(logoutUser());

    showToast("Logged out successfully", "success");
    navigate("/login");
  };

  const isLight = theme === "light";

  return (
    <header className="sticky top-0 z-50">
      <nav
        className={`
          relative border-b backdrop-blur-2xl transition-all duration-500
          ${
            isLight
              ? "border-black/10 bg-white/90 text-black shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
              : "border-white/10 bg-black/90 text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
          }
        `}
      >
        {/* Top animated line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-x-0 top-0 h-px origin-center ${
            isLight
              ? "bg-black"
              : "bg-white"
          }`}
        />

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
            }}
          >
            <button
              type="button"
              onClick={() => navigate("/")}
              className="group flex items-center gap-3"
            >
              <motion.div
                whileHover={{ rotate: 8, scale: 1.05 }}
                className={`
                  relative flex h-9 w-9 items-center justify-center rounded-xl
                  border transition-all duration-300
                  ${
                    isLight
                      ? "border-black bg-black text-white"
                      : "border-white bg-white text-black"
                  }
                `}
              >
                <ShieldCheck className="h-5 w-5" />
              </motion.div>

              <div className="hidden sm:block text-left">
                <div
                  className={`text-sm font-black tracking-wide ${
                    isLight ? "text-black" : "text-white"
                  }`}
                >
                  SecureAuth
                </div>

                <div
                  className={`text-[10px] font-medium ${
                    isLight ? "text-black/50" : "text-white/50"
                  }`}
                >
                  Secure • Modern • Reliable
                </div>
              </div>
            </button>
          </motion.div>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-7 md:flex">
            {links.map((item) => (
              <NavItem key={item.to} item={item} />
            ))}

            {user && (
              <NavItem
                item={{
                  to: "/dashboard",
                  label: "Dashboard",
                  end: true,
                }}
              />
            )}
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />

            <div
              className={`h-6 w-px ${
                isLight ? "bg-black/10" : "bg-white/10"
              }`}
            />

            <UserActions
              user={user}
              onLogout={handleLogout}
            />
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />

            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => setOpen((value) => !value)}
              aria-label={
                open
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={open}
              className={`
                flex h-10 w-10 items-center justify-center rounded-xl
                border transition-all duration-300
                ${
                  isLight
                    ? "border-black/10 bg-black text-white"
                    : "border-white/10 bg-white text-black"
                }
              `}
            >
              {open ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </div>

        <MobileMenu
          open={open}
          links={links}
          user={user}
          onClose={() => setOpen(false)}
          onLogout={handleLogout}
        />
      </nav>
    </header>
  );
}