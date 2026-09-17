import { useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles } from "lucide-react";
import { Navigate, useLocation } from "react-router-dom";

import { fetchProfile } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

interface ProtectedRouteProps {
  children: ReactNode;
}

function AuthLoading() {
  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[15%] top-[20%] h-72 w-72 rounded-full bg-cyan-500/15 blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 50, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[15%] bottom-[10%] h-80 w-80 rounded-full bg-violet-600/15 blur-[130px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative z-10 w-full max-w-sm px-6"
      >
        <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.06] p-8 text-center shadow-2xl shadow-black/40 backdrop-blur-2xl">
          {/* Shimmer */}
          <motion.div
            animate={{ x: ["-120%", "120%"] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl"
          />

          {/* Icon */}
          <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 shadow-xl shadow-cyan-500/20">
            <ShieldCheck className="h-7 w-7 text-white" />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -inset-2 rounded-3xl border border-cyan-400/20 border-dashed"
            />
          </div>

          <Sparkles className="mx-auto mt-6 h-5 w-5 text-cyan-400" />

          <h2 className="mt-3 text-xl font-bold">Verifying your session</h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Please wait while we securely verify your account.
          </p>

          {/* Spinner */}
          <div className="mt-7 flex justify-center">
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 rounded-full border-2 border-white/10" />

              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-violet-500"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-600">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
            Secure Authentication
          </div>
        </div>
      </motion.div>
    </main>
  );
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const dispatch = useAppDispatch();

  const { user, status } = useAppSelector((state) => state.auth);

  const location = useLocation();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProfile());
    }
  }, [status, dispatch]);

  /*
   * While the auth state is being initialized,
   * don't redirect prematurely.
   */
  if (status === "loading" || status === "idle") {
    return <AuthLoading />;
  }

  /*
   * No authenticated user:
   * send them to login and preserve the page
   * they originally requested.
   */
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
