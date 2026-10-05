"use client";

import type { LucideIcon } from 'lucide-react';

export type ServiceCategory = 'Branding' | 'Marketing' | 'Design' | 'Video' | 'Web/App' | 'Automation';

export type ServiceVisualKind = 'brand' | 'marketing' | 'design' | 'video' | 'web' | 'automation';

export interface Service {
  slug: string;
  number: string;
  title: string;
  category: ServiceCategory;
  short: string;
  description: string;
  whatWeDo: string[];
  deliverables: string[];
  whoFor: string;
  icon: LucideIcon;
  visual: ServiceVisualKind;
  image: string;
}

export interface ProjectResult {
  value: string;
  label: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  industry: string;
  services: string[];
  categories: ServiceCategory[];
  result: string;
  year: string;
  image: string;
  imageAlt: string;
  summary: string;
  challenge: string;
  strategy: string;
  execution: string;
  executionPoints: string[];
  results: ProjectResult[];
  gallery: ProjectImage[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  company: string;
  role: string;
  initials: string;
}

export type ArticleCategory = 'Marketing Tips' | 'AI Tools' | 'Case Studies' | 'DSZ News';

export type ArticleBlock =
{type: 'p';text: string;} |
{type: 'h2';text: string;} |
{type: 'quote';text: string;} |
{type: 'list';items: string[];};

export interface Article {
  slug: string;
  title: string;
  category: ArticleCategory;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  author: string;
  body: ArticleBlock[];
}

export interface Stat {
  value: number | null;
  suffix: string;
  label: string;
}

export interface Pillar {
  number: string;
  title: string;
  description: string;
  points: string[];
  image: string;
  imageAlt: string;
  caption: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ClientPlaceholder {
  id: string;
  label: string;
  shape: 'circle' | 'square' | 'triangle' | 'diamond' | 'bars' | 'ring';
}

export interface NavItem {
  label: string;
  to: string;
}

export type SocialKey = 'instagram' | 'facebook' | 'linkedin' | 'x' | 'youtube';

export interface SocialLink {
  key: SocialKey;
  label: string;
  href: string;
}
export type JobDepartment = 'Development' | 'Design' | 'Marketing' | 'Video' | 'Operations';
export type JobType = 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
export type JobLocation = 'On-site' | 'Remote' | 'Hybrid';

export interface Job {
  slug: string;
  title: string;
  department: JobDepartment;
  type: JobType;
  location: JobLocation;
  city: string;
  experience: string;
  salary?: string;
  /** ISO date */
  postedAt: string;
  /** ISO date */
  deadline: string;
  short: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  tools: string[];
  benefits: string[];
}
