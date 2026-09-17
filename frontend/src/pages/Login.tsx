import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  LogIn,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearError, loginUser } from "@/store/authSlice";
import { useToast } from "@/context/ToastContext";

const schema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

interface LocationState {
  from?: {
    pathname?: string;
  };
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [cursor, setCursor] = useState({
    x: 50,
    y: 50,
  });

  const [isFocused, setIsFocused] = useState<
    "email" | "password" | null
  >(null);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.auth);

  const { showToast } = useToast();

  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state as LocationState | null;

  const from =
    locationState?.from?.pathname || "/dashboard";

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

  const onSubmit = async (values: FormValues) => {
    dispatch(clearError());

    const result = await dispatch(loginUser(values));

    if (loginUser.fulfilled.match(result)) {
      showToast("Welcome back!", "success");

      navigate(from, {
        replace: true,
      });

      return;
    }

    showToast(
      (result.payload as string) || "Login failed",
      "error",
    );
  };

  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-slate-950 text-white">
      {/* Cursor glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-50"
        style={{
          background: `radial-gradient(
            480px circle at ${cursor.x}% ${cursor.y}%,
            rgba(34,211,238,0.13),
            transparent 60%
          )`,
        }}
      />

      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, -60, 0],
            y: [0, -70, 50, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[4%] top-[10%] h-72 w-72 rounded-full bg-cyan-500/15 blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -80, 50, 0],
            y: [0, 70, -40, 0],
            scale: [1, 0.94, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[5%] top-[25%] h-96 w-96 rounded-full bg-violet-600/15 blur-[130px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[5%] left-[40%] h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[120px]"
        />

        {/* Small floating particles */}
        {Array.from({ length: 14 }).map((_, index) => (
          <motion.span
            key={index}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: [0, 0.5, 0],
              y: [20, -50, -100],
              x: [0, index % 2 === 0 ? 20 : -20, 0],
            }}
            transition={{
              duration: 4 + (index % 4),
              repeat: Infinity,
              delay: index * 0.35,
              ease: "easeOut",
            }}
            className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300/40"
            style={{
              left: `${8 + index * 6}%`,
              bottom: `${8 + (index % 5) * 8}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-6 py-12 sm:px-8 lg:px-10">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          {/* Left content */}
          <motion.section
            initial={{
              opacity: 0,
              x: -40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="hidden lg:block"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300 backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              Secure Authentication
            </div>

            <h1 className="max-w-xl text-5xl font-black leading-tight xl:text-6xl">
              Welcome back to your
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                secure workspace.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-400">
              Sign in to continue accessing your account,
              dashboard, and protected application features.
              Built with modern authentication and secure
              application architecture.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Secure authentication",
                "Protected dashboard access",
                "Validated login credentials",
              ].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <div className="rounded-full bg-emerald-400/10 p-1">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  </div>

                  {item}
                </motion.div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-xl">
                <ShieldCheck className="h-6 w-6 text-cyan-400" />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Secure by design
                </p>

                <p className="text-xs text-slate-500">
                  Authentication • Validation • Protection
                </p>
              </div>
            </div>
          </motion.section>

          {/* Login card */}
          <motion.div
            initial={{
              opacity: 0,
              y: 35,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
            }}
            className="mx-auto w-full max-w-md"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-5 rounded-[35px] bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-violet-500/15 blur-3xl" />

              <motion.div
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8"
              >
                {/* Top shimmer */}
                <motion.div
                  animate={{
                    x: ["-120%", "120%"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl"
                />

                {/* Logo */}
                <motion.div
                  initial={{
                    scale: 0.7,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 shadow-2xl shadow-cyan-500/20"
                >
                  <LogIn className="h-7 w-7 text-white" />
                </motion.div>

                <div className="mt-5 text-center">
                  <h2 className="text-3xl font-black">
                    <span className="bg-gradient-to-r from-white via-cyan-200 to-violet-300 bg-clip-text text-transparent">
                      Welcome Back
                    </span>
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Sign in to continue to your account
                  </p>
                </div>

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="mt-6 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-300"
                  >
                    {error}
                  </motion.div>
                )}

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="mt-7 space-y-5"
                >
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      Email address
                    </label>

                    <div
                      className={`group relative rounded-2xl border transition-all duration-300 ${
                        isFocused === "email"
                          ? "border-cyan-400/50 bg-cyan-400/[0.04] shadow-[0_0_25px_rgba(34,211,238,0.08)]"
                          : errors.email
                            ? "border-rose-400/40 bg-rose-400/[0.03]"
                            : "border-white/10 bg-white/[0.04]"
                      }`}
                    >
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 transition group-focus-within:text-cyan-400" />

                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        {...register("email")}
                        onFocus={() => setIsFocused("email")}
                        onBlur={() => setIsFocused(null)}
                        className="w-full rounded-2xl bg-transparent py-3.5 pl-12 pr-4 text-sm text-white outline-none placeholder:text-slate-600"
                      />
                    </div>

                    {errors.email?.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-xs text-rose-400"
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      Password
                    </label>

                    <div
                      className={`group relative rounded-2xl border transition-all duration-300 ${
                        isFocused === "password"
                          ? "border-cyan-400/50 bg-cyan-400/[0.04] shadow-[0_0_25px_rgba(34,211,238,0.08)]"
                          : errors.password
                            ? "border-rose-400/40 bg-rose-400/[0.03]"
                            : "border-white/10 bg-white/[0.04]"
                      }`}
                    >
                      <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 transition group-focus-within:text-cyan-400" />

                      <input
                        id="password"
                        type={
                          showPassword ? "text" : "password"
                        }
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        {...register("password")}
                        onFocus={() => setIsFocused("password")}
                        onBlur={() => setIsFocused(null)}
                        className="w-full rounded-2xl bg-transparent py-3.5 pl-12 pr-12 text-sm text-white outline-none placeholder:text-slate-600"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((value) => !value)
                        }
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-slate-500 transition hover:bg-white/5 hover:text-white"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {errors.password?.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-xs text-rose-400"
                      >
                        {errors.password.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={
                      !isSubmitting
                        ? {
                            y: -2,
                          }
                        : undefined
                    }
                    whileTap={
                      !isSubmitting
                        ? {
                            scale: 0.98,
                          }
                        : undefined
                    }
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 px-5 py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-500/10 transition disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        <KeyRound className="h-4 w-4" />
                        Sign In
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </motion.button>
                </form>

                <div className="my-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-600">
                    Secure Access
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <p className="text-center text-sm text-slate-500">
                  Don&apos;t have an account?{" "}
                  <NavLink
                    to="/register"
                    className="font-semibold text-cyan-400 transition hover:text-cyan-300 hover:underline"
                  >
                    Create account
                  </NavLink>
                </p>

                <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-600">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Protected application access
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}