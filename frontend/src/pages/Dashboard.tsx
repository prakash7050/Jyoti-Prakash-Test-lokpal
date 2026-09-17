import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Mail,
  Phone,
  Calendar,
  RefreshCcw,
  User,
  ArrowDown,
} from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { notificationsApi } from "@/api/authApi";
import { Notification } from "@/types";
import { useToast } from "@/context/ToastContext";

export default function Dashboard() {
  const { user } = useAppSelector((s) => s.auth);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const loadPage = useCallback(
    async (reset = false) => {
      setLoading(true);

      try {
        const res = await notificationsApi.list(reset ? null : cursor);

        setNotifications((prev) =>
          reset ? res.data.items : [...prev, ...res.data.items]
        );

        setCursor(res.data.next_cursor);
        setHasMore(Boolean(res.data.next_cursor));
      } catch {
        showToast("Could not load notifications", "error");
      } finally {
        setLoading(false);
      }
    },
    [cursor, showToast]
  );

  useEffect(() => {
    loadPage(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSeed = async () => {
    try {
      await notificationsApi.seedDemo(40);
      showToast("Seeded 40 demo notifications", "success");
      loadPage(true);
    } catch {
      showToast("Could not seed demo data", "error");
    }
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
        {/* Background decorations */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/20" />
        <div className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl dark:bg-pink-500/20" />

        <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
              <User className="h-4 w-4" />
              Personal Dashboard
            </div>

            <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {user.name.split(" ")[0]}
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-400">
              Manage your profile information and stay updated with your
              latest notifications.
            </p>

            <div className="mt-7 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500">
              <ArrowDown className="h-4 w-4" />
              Your account overview
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        {/* Profile section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-500">
              Account
            </p>

            <h2 className="mt-2 font-display text-2xl font-bold text-slate-900 dark:text-white">
              Profile Information
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Email */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-500 dark:bg-blue-500/10">
                <Mail className="h-5 w-5" />
              </div>

              <p className="mt-5 text-xs font-medium uppercase tracking-wide text-slate-400">
                Email Address
              </p>

              <p className="mt-2 break-all text-sm font-semibold text-slate-800 dark:text-slate-200">
                {user.email}
              </p>
            </div>

            {/* Mobile */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-50 text-pink-500 dark:bg-pink-500/10">
                <Phone className="h-5 w-5" />
              </div>

              <p className="mt-5 text-xs font-medium uppercase tracking-wide text-slate-400">
                Mobile Number
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                {user.mobile || "Not available"}
              </p>
            </div>

            {/* Member since */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none sm:col-span-2 lg:col-span-1">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-500 dark:bg-purple-500/10">
                <Calendar className="h-5 w-5" />
              </div>

              <p className="mt-5 text-xs font-medium uppercase tracking-wide text-slate-400">
                Member Since
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                {new Date(user.created_at).toLocaleDateString(undefined, {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16"
        >
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-pink-500">
                Updates
              </p>

              <h2 className="mt-2 flex items-center gap-2 font-display text-2xl font-bold text-slate-900 dark:text-white">
                <Bell className="h-5 w-5 text-pink-500" />
                Notifications
              </h2>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Keep track of your latest account activity.
              </p>
            </div>

            <button
              onClick={handleSeed}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-500/50 dark:hover:text-blue-400"
            >
              <RefreshCcw
                className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
              Seed demo data
            </button>
          </div>

          {/* Notification list */}
          <div className="space-y-3">
            {notifications.length === 0 && !loading && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900/50">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
                  <Bell className="h-5 w-5" />
                </div>

                <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-300">
                  No notifications yet
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Try seeding some demo notifications.
                </p>
              </div>
            )}

            {notifications.map((n, i) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: Math.min(i, 10) * 0.02,
                }}
                className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-slate-700"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-500 dark:bg-blue-500/10">
                  <Bell className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                    {n.message}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {new Date(n.created_at).toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Loading */}
          {loading && notifications.length === 0 && (
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-400 dark:border-slate-800 dark:bg-slate-900">
              Loading notifications...
            </div>
          )}

          {/* Load more */}
          {hasMore && notifications.length > 0 && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => loadPage(false)}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                {loading ? (
                  <>
                    <RefreshCcw className="h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    Load more
                    <ArrowDown className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </section>
    </main>
  );
}