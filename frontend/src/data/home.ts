import {
  Database,
  KeyRound,
  Lock,
  ShieldCheck,
  Zap,
} from "lucide-react";

import type {
  HomeFeature,
  SecurityItem,
} from "../components/home/types";

export const homeFeatures: HomeFeature[] = [
  {
    icon: Lock,
    title: "JWT + HttpOnly Cookies",
    description:
      "Access and refresh tokens stay outside localStorage, reducing exposure to browser-based token theft.",
    gradient: "from-cyan-400 to-blue-500",
    iconColor: "text-cyan-400",
  },
  {
    icon: ShieldCheck,
    title: "CSRF Protected",
    description:
      "State-changing requests are protected using signed double-submit CSRF tokens.",
    gradient: "from-violet-400 to-fuchsia-500",
    iconColor: "text-violet-400",
  },
  {
    icon: Database,
    title: "Cursor Pagination",
    description:
      "Related datasets use consistent keyset pagination for efficient and predictable loading.",
    gradient: "from-emerald-400 to-teal-500",
    iconColor: "text-emerald-400",
  },
  {
    icon: Zap,
    title: "Batch Processing",
    description:
      "Large writes are processed in bounded batches to keep memory usage and lock time predictable.",
    gradient: "from-orange-400 to-pink-500",
    iconColor: "text-orange-400",
  },
];

export const securityItems: SecurityItem[] = [
  {
    icon: KeyRound,
    label: "Authentication",
    value: "JWT + Secure Cookies",
    description: "Token-based authentication with browser-safe storage.",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    icon: ShieldCheck,
    label: "Request Security",
    value: "CSRF Protection",
    description: "State-changing requests receive CSRF validation.",
    gradient: "from-violet-400 to-fuchsia-500",
  },
  {
    icon: Database,
    label: "Data Layer",
    value: "PostgreSQL",
    description: "Relational persistence designed for consistency and reliability.",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    icon: Zap,
    label: "Performance",
    value: "Bounded Processing",
    description: "Large operations are split into controlled chunks.",
    gradient: "from-orange-400 to-pink-500",
  },
];