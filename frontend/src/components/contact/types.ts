import type { LucideIcon } from "lucide-react";

export interface ContactDetail {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  description?: string;
  color: string;
  gradient: string;
}

export interface ContactSocial {
  label: string;
  href: string;
  icon: LucideIcon;
}