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
  email: "info.digitalsoftzone@gmail.com",
  phone: "+880 1533-181842",
  whatsappNumber: "+880 1533-181842",
  whatsappUrl: "https://wa.me/8801533181842",
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
  {
    key: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/digitalsoftzone",
  },
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/digitalsoftzonebd/",
  },
  {
    key: "x",
    label: "X",
    href: "https://x.com/DGsoftzone",
  },
  {
    key: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@digitalsoftzone.official",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/digitalsoftzone/",
  },
];
