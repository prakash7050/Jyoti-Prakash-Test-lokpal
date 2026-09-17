import type { LucideIcon } from "lucide-react";

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "cloud" | "ai";
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface ProjectItem {
  title: string;
  category: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

export interface StatItem {
  value: string;
  title: string;
  icon: LucideIcon;
  gradient: string;
}

export interface InfoItem {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  result: string;
  icon: LucideIcon;
}

export interface FocusItem {
  label: string;
  icon: LucideIcon;
}