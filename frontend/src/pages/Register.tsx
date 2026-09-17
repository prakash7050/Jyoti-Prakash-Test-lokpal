import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  UserPlus,
  UserRound,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearError, registerUser } from "@/store/authSlice";
import { useToast } from "@/context/ToastContext";

const schema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name cannot exceed 100 characters"),

    email: z.string().trim().email("Enter a valid email address"),

    mobile: z
      .string()
      .trim()
      .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),

    password: z
      .string()
      .min(8, "Minimum 8 characters")
      .regex(/[a-z]/, "Needs a lowercase letter")
      .regex(/[A-Z]/, "Needs an uppercase letter")
      .regex(/\d/, "Needs a digit")
      .regex(/[^A-Za-z0-9]/, "Needs a special character"),

    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type FormValues = z.infer<typeof schema>;

interface PasswordRuleProps {
  valid: boolean;
  children: React.ReactNode;
}

function PasswordRule({ valid, children }: PasswordRuleProps) {
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: valid ? 1 : 0.65,
        x: valid ? 2 : 0,
      }}
      className="flex items-center gap-2 text-xs"
    >
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full ${
          valid
            ? "bg-emerald-400/15 text-emerald-400"
            : "bg-white/5 text-slate-600"
        }`}
      >
        {valid ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
      </div>

      <span className={valid ? "text-emerald-300" : "text-slate-500"}>
        {children}
      </span>
    </motion.div>
  );
}

// interface InputProps {
//   id: string;
//   label: string;
//   type?: string;
//   placeholder?: string;
//   error?: string;
//   icon: React.ComponentType<{ className?: string }>;
//   rightElement?: React.ReactNode;
//   autoComplete?: string;
//   value?: string;
//   onFocus?: () => void;
//   onBlur?: () => void;
//   registration: ReturnType<typeof useForm<FormValues>>["register"] extends (
//     ...args: infer _Args
//   ) => infer _Return
//     ? unknown
//     : never;
// }

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [cursor, setCursor] = useState({
    x: 50,
    y: 50,
  });

  const [isFocused, setIsFocused] = useState<
    "name" | "email" | "mobile" | "password" | "confirm" | null
  >(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirm_password: "",
    },
  });

  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.auth);

  const { showToast } = useToast();
  const navigate = useNavigate();

  const password = watch("password");
  const confirmPassword = watch("confirm_password");

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

    const result = await dispatch(registerUser(values));

    if (registerUser.fulfilled.match(result)) {
      showToast("Registration successful. Please log in.", "success");

      navigate("/login");
      return;
    }

    showToast((result.payload as string) || "Registration failed", "error");
  };

  const inputClass = (
    field: "name" | "email" | "mobile" | "password" | "confirm",
  ) =>
    `group relative rounded-2xl border transition-all duration-300 ${
      isFocused === field
        ? "border-cyan-400/50 bg-cyan-400/[0.04] shadow-[0_0_25px_rgba(34,211,238,0.08)]"
        : errors[field === "confirm" ? "confirm_password" : field]
          ? "border-rose-400/40 bg-rose-400/[0.03]"
          : "border-white/10 bg-white/[0.04]"
    }`;

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
          className="absolute left-[4%] top-[8%] h-80 w-80 rounded-full bg-cyan-500/15 blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -90, 50, 0],
            y: [0, 70, -40, 0],
            scale: [1, 0.94, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[3%] top-[25%] h-96 w-96 rounded-full bg-violet-600/15 blur-[130px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[4%] left-[38%] h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[120px]"
        />

        {Array.from({ length: 16 }).map((_, index) => (
          <motion.span
            key={index}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: [0, 0.45, 0],
              y: [20, -50, -100],
              x: [0, index % 2 === 0 ? 20 : -20, 0],
            }}
            transition={{
              duration: 4 + (index % 4),
              repeat: Infinity,
              delay: index * 0.3,
              ease: "easeOut",
            }}
            className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300/40"
            style={{
              left: `${5 + index * 6}%`,
              bottom: `${5 + (index % 6) * 7}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left information */}
          <motion.section
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-sm text-violet-300 backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              Create Your Account
            </div>

            <h1 className="max-w-xl text-5xl font-black leading-tight xl:text-6xl">
              Start your journey with a
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                secure account.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-400">
              Create your account and get access to your personalized workspace.
              Your credentials are validated before the account is created.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Strong password requirements",
                "Validated email address",
                "Secure mobile number validation",
                "Protected account creation",
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
                  Security first
                </p>

                <p className="text-xs text-slate-500">
                  Validation • Protection • Authentication
                </p>
              </div>
            </div>
          </motion.section>

          {/* Register card */}
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
            transition={{ duration: 0.7 }}
            className="mx-auto w-full max-w-xl"
          >
            <div className="relative">
              <div className="absolute -inset-5 rounded-[35px] bg-gradient-to-r from-cyan-500/15 via-violet-500/10 to-fuchsia-500/15 blur-3xl" />

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
                {/* Shimmer */}
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

                {/* Icon */}
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
                  <UserPlus className="h-7 w-7 text-white" />
                </motion.div>

                <div className="mt-5 text-center">
                  <h2 className="text-3xl font-black">
                    <span className="bg-gradient-to-r from-white via-cyan-200 to-violet-300 bg-clip-text text-transparent">
                      Create Account
                    </span>
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Join the secure application
                  </p>
                </div>

                {/* Backend error */}
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
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      Full Name
                    </label>

                    <div className={inputClass("name")}>
                      <UserRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your full name"
                        {...register("name")}
                        onFocus={() => setIsFocused("name")}
                        onBlur={() => setIsFocused(null)}
                        className="w-full rounded-2xl bg-transparent py-3.5 pl-12 pr-4 text-sm text-white outline-none placeholder:text-slate-600"
                      />
                    </div>

                    {errors.name?.message && (
                      <p className="mt-2 text-xs text-rose-400">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      Email Address
                    </label>

                    <div className={inputClass("email")}>
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

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
                      <p className="mt-2 text-xs text-rose-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Mobile */}
                  <div>
                    <label
                      htmlFor="mobile"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      Mobile Number
                    </label>

                    <div className={inputClass("mobile")}>
                      <Phone className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                      <input
                        id="mobile"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        maxLength={10}
                        placeholder="9876543210"
                        {...register("mobile")}
                        onFocus={() => setIsFocused("mobile")}
                        onBlur={() => setIsFocused(null)}
                        className="w-full rounded-2xl bg-transparent py-3.5 pl-12 pr-4 text-sm text-white outline-none placeholder:text-slate-600"
                      />
                    </div>

                    {errors.mobile?.message && (
                      <p className="mt-2 text-xs text-rose-400">
                        {errors.mobile.message}
                      </p>
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

                    <div className={inputClass("password")}>
                      <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Create a strong password"
                        {...register("password")}
                        onFocus={() => setIsFocused("password")}
                        onBlur={() => setIsFocused(null)}
                        className="w-full rounded-2xl bg-transparent py-3.5 pl-12 pr-12 text-sm text-white outline-none placeholder:text-slate-600"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-slate-500 hover:bg-white/5 hover:text-white"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <PasswordRule valid={password.length >= 8}>
                        8+ characters
                      </PasswordRule>

                      <PasswordRule valid={/[a-z]/.test(password)}>
                        Lowercase letter
                      </PasswordRule>

                      <PasswordRule valid={/[A-Z]/.test(password)}>
                        Uppercase letter
                      </PasswordRule>

                      <PasswordRule valid={/\d/.test(password)}>
                        Number
                      </PasswordRule>

                      <PasswordRule valid={/[^A-Za-z0-9]/.test(password)}>
                        Special character
                      </PasswordRule>
                    </div>

                    {errors.password?.message && (
                      <p className="mt-2 text-xs text-rose-400">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Confirm password */}
                  <div>
                    <label
                      htmlFor="confirm_password"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      Confirm Password
                    </label>

                    <div className={inputClass("confirm")}>
                      <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                      <input
                        id="confirm_password"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Repeat your password"
                        {...register("confirm_password")}
                        onFocus={() => setIsFocused("confirm")}
                        onBlur={() => setIsFocused(null)}
                        className="w-full rounded-2xl bg-transparent py-3.5 pl-12 pr-12 text-sm text-white outline-none placeholder:text-slate-600"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword((value) => !value)
                        }
                        aria-label={
                          showConfirmPassword
                            ? "Hide confirmation password"
                            : "Show confirmation password"
                        }
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-slate-500 hover:bg-white/5 hover:text-white"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {confirmPassword.length > 0 &&
                      password === confirmPassword && (
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Passwords match
                        </div>
                      )}

                    {errors.confirm_password?.message && (
                      <p className="mt-2 text-xs text-rose-400">
                        {errors.confirm_password.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { y: -2 } : undefined}
                    whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 px-5 py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-500/10 transition disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4" />
                        Create Account
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </motion.button>
                </form>

                <div className="my-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/10" />

                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-600">
                    Secure Registration
                  </span>

                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <p className="text-center text-sm text-slate-500">
                  Already have an account?{" "}
                  <NavLink
                    to="/login"
                    className="font-semibold text-cyan-400 transition hover:text-cyan-300 hover:underline"
                  >
                    Sign in
                  </NavLink>
                </p>

                <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-600">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Your information is validated before registration
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
