import type { ReactElement } from "react";
import { Email, GitHub, LinkedIn, WhatsApp } from "@mui/icons-material";

export interface SocialLink {
  icon: ReactElement;
  label: string;
  /** Public handle/value shown next to the label. */
  handle: string;
  href: string;
  color: string;
}

export const GITHUB_PROFILE_URL = "https://github.com/GabrielPalhares28";

export const socialLinks: SocialLink[] = [
  {
    icon: <Email />,
    label: "Email",
    handle: "gabrielpalhares764@gmail.com",
    href: "mailto:gabrielpalhares764@gmail.com",
    color: "#ea4335",
  },
  {
    icon: <LinkedIn />,
    label: "LinkedIn",
    handle: "/gabriel-palhares",
    href: "https://www.linkedin.com/in/gabriel-palhares-94bb30204",
    color: "#0077b5",
  },
  {
    icon: <GitHub />,
    label: "GitHub",
    handle: "@GabrielPalhares28",
    href: GITHUB_PROFILE_URL,
    color: "#333",
  },
  {
    icon: <WhatsApp />,
    label: "WhatsApp",
    handle: "+55 (64) 99298-0763",
    href: "https://wa.me/5564992980763",
    color: "#25d366",
  },
];

/** Hero shows a reduced set of links. */
export const heroSocialLinks = socialLinks.filter(
  (link) => link.label !== "WhatsApp"
);
