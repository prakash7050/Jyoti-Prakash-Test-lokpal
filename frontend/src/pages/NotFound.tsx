import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="font-display text-6xl font-bold text-brand-500">
        404
      </motion.h1>
      <p className="mt-4 text-slate-500">The page you're looking for doesn't exist.</p>
      <NavLink to="/" className="btn-primary mt-6">
        Back home
      </NavLink>
    </div>
  );
}
