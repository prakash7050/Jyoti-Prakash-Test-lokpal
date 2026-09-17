import type { LucideIcon } from "lucide-react";

export interface HomeFeature {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  iconColor: string;
}

export interface SecurityItem {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}