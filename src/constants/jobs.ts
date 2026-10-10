import {
  BookOpenIcon,
  CompassIcon,
  CpuIcon,
  HeartPulseIcon,
  LaptopIcon,
  MessagesSquareIcon,
  PlaneIcon,
  RocketIcon,
  SparklesIcon,
  SunriseIcon,
  TrendingUpIcon,
  UsersIcon
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Job } from '../types/content';

/**
 * Open positions. Set this to an empty array (`[]`) to show the
 * "no open roles" placeholder on the careers page.
 */
export const jobs: Job[] = [
{
  slug: 'senior-frontend-developer',
  title: 'Senior Frontend Developer',
  openings: 1,
  type: 'Full-time',
  location: 'Hybrid',
  city: 'Chittagong',
  experience: '3–5 years',
  salary: 'Negotiable',
  postedAt: '2026-09-28',
  deadline: '2026-10-31',
  short: 'Build fast, animated, pixel-perfect web experiences with React and Next.js.',
  overview:
  'We are looking for a senior frontend developer who cares about craft. You will turn designs into fast, accessible and beautifully animated interfaces for brands across Bangladesh and beyond — and help shape how our team builds for the web.',
  responsibilities: [
  'Build production websites and web apps with Next.js, TypeScript and Tailwind CSS.',
  'Translate Figma designs into pixel-perfect, responsive and accessible UI.',
  'Create smooth, performant interactions with Framer Motion.',
  'Review code, mentor junior developers and improve our component library.',
  'Work closely with designers, marketers and clients from kickoff to launch.'],

  requirements: [
  '3+ years of professional experience with React.',
  'Strong TypeScript, modern CSS and responsive layout skills.',
  'Experience with Next.js App Router and server/client components.',
  'A good eye for detail, spacing and motion.',
  'Clear written and spoken communication in English or Bangla.'],

  niceToHave: [
  'Experience with headless CMS (Sanity, Strapi, Contentful).',
  'Knowledge of web performance and Core Web Vitals.',
  'Basic backend experience with Node.js.'],

  tools: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'RTK Query', 'Figma', 'Git'],
  benefits: [
  'Competitive salary with yearly reviews',
  'Hybrid work — 3 days in office',
  'Learning budget for courses and conferences',
  'Latest MacBook and tools']

},
{
  slug: 'ui-ux-designer',
  title: 'UI/UX Designer',
  openings: 1,
  type: 'Full-time',
  location: 'On-site',
  city: 'Chittagong',
  experience: '2–4 years',
  salary: 'Negotiable',
  postedAt: '2026-09-25',
  deadline: '2026-10-25',
  short: 'Design premium websites, apps and brand systems for growing businesses.',
  overview:
  'As a UI/UX designer at DSZ you will own projects from research to final handoff. You will design digital products and marketing websites that look premium, feel intuitive and actually move business numbers.',
  responsibilities: [
  'Design websites, landing pages and app interfaces in Figma.',
  'Run quick user research, wireframing and usability reviews.',
  'Build and maintain design systems and component libraries.',
  'Prepare clear developer handoffs and motion specs.',
  'Present design decisions confidently to clients.'],

  requirements: [
  '2+ years of UI/UX design experience with a strong portfolio.',
  'Expert in Figma, auto layout and components.',
  'Solid understanding of typography, grid and visual hierarchy.',
  'Basic knowledge of how websites are built.'],

  niceToHave: [
  'Motion design skills (After Effects, Rive or Lottie).',
  'Experience designing for e-commerce brands.'],

  tools: ['Figma', 'FigJam', 'Adobe Illustrator', 'Photoshop', 'After Effects'],
  benefits: [
  'Competitive salary with yearly reviews',
  'Creative, flat-hierarchy team',
  'Learning budget',
  'Festival bonuses']

},
{
  slug: 'digital-marketing-executive',
  title: 'Digital Marketing Executive',
  openings: 1,
  type: 'Full-time',
  location: 'On-site',
  city: 'Chittagong',
  experience: '1–3 years',
  postedAt: '2026-09-20',
  deadline: '2026-10-20',
  short: 'Plan and run performance campaigns across Meta, Google and TikTok.',
  overview:
  'We need a data-driven marketer who loves turning budgets into results. You will plan, launch and optimise paid campaigns for our clients and report on what really works.',
  responsibilities: [
  'Plan and manage paid campaigns on Meta, Google and TikTok.',
  'Set up tracking, pixels and conversion events.',
  'Analyse performance and write clear monthly reports.',
  'Collaborate with designers and video editors on ad creatives.'],

  requirements: [
  '1+ year managing paid social or search campaigns.',
  'Comfortable with Meta Ads Manager and Google Ads.',
  'Strong analytical skills and Excel / Google Sheets.'],

  niceToHave: ['Google Ads or Meta Blueprint certification.', 'Experience with GA4 and Looker Studio.'],
  tools: ['Meta Ads', 'Google Ads', 'GA4', 'Looker Studio', 'TikTok Ads'],
  benefits: ['Performance bonuses', 'Paid certifications', 'Festival bonuses', 'Team trips']
},
{
  slug: 'video-editor-motion-designer',
  title: 'Video Editor & Motion Designer',
  openings: 1,
  type: 'Full-time',
  location: 'On-site',
  city: 'Chittagong',
  experience: '1–3 years',
  postedAt: '2026-09-18',
  deadline: '2026-10-18',
  short: 'Edit reels, ads and brand films that stop the scroll.',
  overview:
  'You will edit short-form and long-form videos for brands — from punchy social reels to cinematic brand films — and add motion graphics that make them unforgettable.',
  responsibilities: [
  'Edit reels, ads and brand videos for social platforms.',
  'Create motion graphics, titles and animated logos.',
  'Colour grade and mix audio for final delivery.',
  'Keep up with trends and suggest new creative formats.'],

  requirements: [
  'A showreel with social and commercial work.',
  'Strong Premiere Pro and After Effects skills.',
  'Sense of rhythm, pacing and storytelling.'],

  niceToHave: ['DaVinci Resolve colour grading.', 'Basic 3D in Blender or Cinema 4D.'],
  tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'CapCut'],
  benefits: ['Creative freedom', 'High-end editing workstation', 'Festival bonuses', 'Team trips']
},
{
  slug: 'project-coordinator-intern',
  title: 'Project Coordinator (Intern)',
  openings: 1,
  type: 'Internship',
  location: 'On-site',
  city: 'Chittagong',
  experience: 'Fresher',
  salary: 'Paid internship',
  postedAt: '2026-09-15',
  deadline: '2026-10-15',
  short: 'Keep projects on track and learn how a digital agency really runs.',
  overview:
  'A 6-month paid internship for an organised, curious person who wants to learn project management inside a fast-moving digital agency. Strong performers get a full-time offer.',
  responsibilities: [
  'Track project timelines and tasks in our PM tools.',
  'Prepare meeting notes and client updates.',
  'Coordinate between design, development and marketing teams.'],

  requirements: [
  'Recent graduate or final-year student.',
  'Very organised with great attention to detail.',
  'Good written English.'],

  niceToHave: ['Familiarity with Notion, ClickUp or Trello.'],
  tools: ['Notion', 'ClickUp', 'Google Workspace', 'Slack'],
  benefits: ['Paid internship', 'Mentorship from team leads', 'Full-time offer for top performers']
}];



export interface CareerValue {
  icon: LucideIcon;
  title: string;
  text: string;
}

export const cultureValues: CareerValue[] = [
{ icon: CompassIcon, title: 'Full ownership', text: 'You own your work from brief to launch — and get the credit for it.' },
{ icon: UsersIcon, title: 'Flat team', text: 'No layers of approval. Ideas win on merit, not on title.' },
{ icon: MessagesSquareIcon, title: 'Clear communication', text: 'Honest feedback, short meetings and written decisions.' },
{ icon: TrendingUpIcon, title: 'Always learning', text: 'We share what we learn and invest in getting better every month.' }];


export const perks: CareerValue[] = [
{ icon: SunriseIcon, title: 'Flexible hours', text: 'Core hours with flexibility around them.' },
{ icon: BookOpenIcon, title: 'Learning budget', text: 'Courses, books and certifications — on us.' },
{ icon: HeartPulseIcon, title: 'Health support', text: 'Medical allowance for you and your family.' },
{ icon: PlaneIcon, title: 'Team trips', text: 'Yearly getaways to recharge together.' },
{ icon: LaptopIcon, title: 'Latest tools', text: 'Modern hardware and premium software licenses.' },
{ icon: RocketIcon, title: 'Growth path', text: 'Clear levels and reviews twice a year.' }];


export const hiringSteps = [
{ icon: SparklesIcon, title: 'Apply', text: 'Send your CV and portfolio. We read every application.' },
{ icon: MessagesSquareIcon, title: 'Intro call', text: 'A relaxed 20-minute chat about you and the role.' },
{ icon: CpuIcon, title: 'Task & interview', text: 'A short, paid task and a conversation with the team.' },
{ icon: RocketIcon, title: 'Offer', text: 'We move fast — usually within two weeks.' }];
