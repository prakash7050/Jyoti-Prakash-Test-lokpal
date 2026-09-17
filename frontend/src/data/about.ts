import {
  Award,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Code2,
  Cpu,
  Database,
  GraduationCap,
  Globe,
  Layers3,
  MapPin,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
} from "lucide-react";

import type {
  EducationItem,
  ExperienceItem,
  FocusItem,
  InfoItem,
  ProjectItem,
  Skill,
  StatItem,
} from "../components/about/types";

export const skills: Skill[] = [
  { name: "JavaScript", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "React Native", category: "frontend" },
  { name: "Expo", category: "frontend" },

  { name: "Node.js", category: "backend" },
  { name: "Express.js", category: "backend" },
  { name: "NestJS", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "MongoDB", category: "backend" },
  { name: "MySQL", category: "backend" },
  { name: "Redis", category: "backend" },
  { name: "REST APIs", category: "backend" },
  { name: "WebSockets", category: "backend" },
  { name: "JWT", category: "backend" },
  { name: "Prisma", category: "backend" },
  { name: "Sequelize", category: "backend" },

  { name: "Docker", category: "cloud" },
  { name: "AWS", category: "cloud" },
  { name: "Cloudflare", category: "cloud" },
  { name: "Firebase", category: "cloud" },
  { name: "GitHub Actions", category: "cloud" },

  { name: "Gemini API", category: "ai" },
  { name: "OpenAI API", category: "ai" },
];

export const experience: ExperienceItem[] = [
  {
    period: "Aug 2025 — Jun 2026",
    role: "Founder / Senior Full-Stack Developer",
    company: "Square Hack Software & IT Solutions",
    location: "New Delhi / Jaipur, India",
    description:
      "Founded and developed full-stack products and client solutions across education, AI, business automation, reporting, and payment-oriented applications.",
    highlights: [
      "Architected React, Next.js, Node.js and PostgreSQL applications.",
      "Built AI-powered workflows using Gemini and OpenAI integrations.",
      "Worked across frontend, backend, databases, deployment and cloud infrastructure.",
      "Delivered responsive production-ready applications with modern UX.",
    ],
  },
  {
    period: "Nov 2023 — Aug 2025",
    role: "Full-Stack Developer-I",
    company: "Reidnax Dev Solutions",
    location: "India",
    description:
      "Worked on production-grade full-stack applications with focus on scalable APIs, dashboards, business systems and real-time functionality.",
    highlights: [
      "Developed MERN/PERN based web applications.",
      "Built REST APIs and real-time communication flows.",
      "Worked with PostgreSQL, MongoDB, Sequelize and Prisma.",
      "Integrated third-party services, authentication and cloud deployments.",
    ],
  },
  {
    period: "Dec 2021 — Jan 2023",
    role: "Full-Stack Developer",
    company: "Ascend Capital",
    location: "India",
    description:
      "Worked on FinTech products supporting loan, dealer, bidding and application workflows.",
    highlights: [
      "Developed the EVCred dealer application.",
      "Implemented bidding and live tracking functionality.",
      "Worked on LOS/LMS systems and business workflows.",
      "Built APIs and interfaces for finance-related operations.",
    ],
  },
  {
    period: "Apr 2020 — Dec 2021",
    role: "Software Developer / Intern",
    company: "Codebuckets",
    location: "India",
    description:
      "Started professional software development with hands-on experience in web applications, APIs, databases and frontend development.",
    highlights: [
      "Worked on frontend and backend development.",
      "Built reusable application components and APIs.",
      "Learned production development practices and version control.",
    ],
  },
];

export const projects: ProjectItem[] = [
  {
    title: "BTS Reporting & AI Document Copilot",
    category: "AI / Enterprise",
    icon: Sparkles,
    gradient: "from-cyan-500 via-blue-500 to-violet-500",
    description:
      "AI-powered document analysis, field mapping, document updates, versioning and conversational workflows using modern web technologies and Supabase.",
  },
  {
    title: "SchoolERP",
    category: "SaaS / Education",
    icon: GraduationCap,
    gradient: "from-violet-500 via-fuchsia-500 to-pink-500",
    description:
      "AI-powered multi-school ERP covering admissions, fees, attendance, exams, transport, communication and analytics.",
  },
  {
    title: "SH E-Learning",
    category: "EdTech",
    icon: Layers3,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    description:
      "Full-stack learning platform built with React, TypeScript, Node.js, Express, PostgreSQL and Sequelize.",
  },
  {
    title: "FinTech Applications",
    category: "FinTech",
    icon: Database,
    gradient: "from-orange-500 via-red-500 to-pink-500",
    description:
      "Dealer, bidding, loan and lending workflows including LOS/LMS and real-time business processes.",
  },
];

export const stats: StatItem[] = [
  {
    value: "5+",
    title: "Years Experience",
    icon: CalendarDays,
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    value: "20+",
    title: "Technologies",
    icon: Code2,
    gradient: "from-violet-400 to-fuchsia-500",
  },
  {
    value: "10+",
    title: "Production Projects",
    icon: Layers3,
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    value: "Multi-domain",
    title: "Product Experience",
    icon: Users,
    gradient: "from-orange-400 to-pink-500",
  },
];

export const infoItems: InfoItem[] = [
  {
    icon: Users,
    label: "Name",
    value: "Jyoti Prakash",
    color: "text-cyan-400",
  },
  {
    icon: BriefcaseBusiness,
    label: "Role",
    value: "Senior Full-Stack Developer",
    color: "text-violet-400",
  },
  {
    icon: Building2,
    label: "Founder",
    value: "Square Hack Software & IT Solutions",
    color: "text-fuchsia-400",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Gurugram, Haryana, India",
    color: "text-emerald-400",
  },
];

export const education: EducationItem[] = [
  {
    degree: "Bachelor of Technology — Information Technology",
    institution: "Cochin University of Science and Technology (CUSAT)",
    period: "2016 — 2020",
    result: "CGPA: 7.17",
    icon: Award,
  },
  {
    degree: "Senior Secondary",
    institution: "Bihar School Examination Board (BSEB), Patna",
    period: "2013 — 2015",
    result: "71.40%",
    icon: GraduationCap,
  },
];

export const engineeringFocus: FocusItem[] = [
  {
    label: "Scalable Web Applications",
    icon: Globe,
  },
  {
    label: "AI-powered Applications",
    icon: Sparkles,
  },
  {
    label: "FinTech & Business Platforms",
    icon: Database,
  },
  {
    label: "Real-time Systems",
    icon: Cpu,
  },
  {
    label: "Mobile Applications",
    icon: Smartphone,
  },
  {
    label: "Secure APIs & Authentication",
    icon: ShieldCheck,
  },
];