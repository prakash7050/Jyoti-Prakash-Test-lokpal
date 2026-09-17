import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

import type { ContactDetail, ContactSocial } from "../components/contact/types";

export const contactDetails: ContactDetail[] = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 7907221941",
    href: "tel:+917907221941",
    description: "Available for professional discussions",
    color: "text-emerald-400",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    icon: Mail,
    label: "Email",
    value: "prak5682@gmail.com",
    href: "mailto:prak5682@gmail.com",
    description: "Best way to reach me professionally",
    color: "text-cyan-400",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Gurugram, Haryana, India",
    description: "Available for opportunities across India",
    color: "text-violet-400",
    gradient: "from-violet-400 to-fuchsia-500",
  },
];

export const contactSocials: ContactSocial[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/prakash7050/",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/prakash7050",
    icon: Github,
  },
];
