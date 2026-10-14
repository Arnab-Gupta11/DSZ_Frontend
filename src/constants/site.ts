import type { NavItem, SocialLink } from "../types/content";

/**
 * Replace every value in [BRACKETS] with verified business information.
 * To use the official logo, set `logoSrc` to the hosted logo URL.
 */
export const site = {
  name: "Digital Soft Zone",
  short: "DSZ",
  url: "https://www.digitalsoftzone.com",
  tagline:
    "We help brands get noticed with product promo videos, AI-powered content, and branding that sells.",
  email: "[EMAIL ADDRESS]",
  phone: "[PHONE NUMBER]",
  whatsappNumber: "[WHATSAPP NUMBER]",
  whatsappUrl: "https://wa.me/",
  addressLine: "Software Technology Park",
  city: "Chittagong, Bangladesh",
  logoSrc: "/logo.png",
  ogImage: "",
};

export const navLinks: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Careers", to: "/careers" },
  { label: "Insights", to: "/insights" },
  { label: "Contact", to: "/contact" },
];

export const socialLinks: SocialLink[] = [
  { key: "instagram", label: "Instagram", href: "#" },
  { key: "facebook", label: "Facebook", href: "#" },
  { key: "linkedin", label: "LinkedIn", href: "#" },
  { key: "x", label: "X", href: "#" },
  { key: "youtube", label: "YouTube", href: "#" },
];
