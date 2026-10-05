"use client";

import { ClapperboardIcon, CompassIcon, MegaphoneIcon, MonitorSmartphoneIcon, PenToolIcon, WorkflowIcon } from 'lucide-react';
import type { Service } from '../types/content';

export const services: Service[] = [
{
  slug: 'brand-strategy',
  number: '01',
  title: 'Brand Strategy',
  category: 'Branding',
  short: 'Build a brand people recognize, trust and remember.',
  description:
  'We define what your brand stands for, who it speaks to and how it should look and sound — so every post, pack and page pulls in the same direction.',
  whatWeDo: ['Brand discovery workshops', 'Positioning & messaging', 'Naming & tone of voice', 'Visual identity systems'],
  deliverables: ['Brand strategy deck', 'Logo & identity suite', 'Brand guidelines', 'Messaging framework'],
  whoFor: 'New brands preparing to launch, and growing brands that have outgrown how they look and talk.',
  icon: CompassIcon,
  visual: 'brand',
  image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800'
},
{
  slug: 'digital-marketing',
  number: '02',
  title: 'Digital Marketing',
  category: 'Marketing',
  short: 'Campaigns that reach the right people and turn attention into sales.',
  description:
  'Social, paid and content marketing planned around your real business goals — with clear reporting on what is working and what is not.',
  whatWeDo: ['Social media management', 'Meta & Google ads', 'Content calendars', 'Performance reporting'],
  deliverables: ['Monthly content plan', 'Ad campaigns & creatives', 'Audience targeting setup', 'Monthly performance report'],
  whoFor: 'Product and lifestyle brands that sell online and want steady, measurable growth.',
  icon: MegaphoneIcon,
  visual: 'marketing',
  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
},
{
  slug: 'graphic-design',
  number: '03',
  title: 'Graphic Design',
  category: 'Design',
  short: 'Design that makes your products look as good as they are.',
  description:
  'From social creatives to packaging and print, we design visuals that feel consistent, premium and unmistakably yours.',
  whatWeDo: ['Social media creatives', 'Packaging & labels', 'Print & catalogues', 'Presentation design'],
  deliverables: ['Creative templates', 'Packaging artwork', 'Print-ready files', 'Campaign visual kits'],
  whoFor: 'Perfume, clothing, watch and accessory brands where the product has to look irresistible.',
  icon: PenToolIcon,
  visual: 'design',
  image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800'
},
{
  slug: 'video-production',
  number: '04',
  title: 'Video Production',
  category: 'Video',
  short: 'Short-form and product video made to stop the scroll.',
  description:
  'Concept, shoot and edit — product films, reels and brand stories built for Instagram, Facebook and YouTube.',
  whatWeDo: ['Concept & scripting', 'Product & lifestyle shoots', 'Reels & short-form edits', 'Motion graphics'],
  deliverables: ['Product films', 'Reels packs', 'Brand story video', 'Cut-downs for ads'],
  whoFor: 'Brands whose customers discover them on social feeds first.',
  icon: ClapperboardIcon,
  visual: 'video',
  image: 'https://images.unsplash.com/photo-1574717024453-354056aafd0c?auto=format&fit=crop&q=80&w=800'
},
{
  slug: 'web-app-development',
  number: '05',
  title: 'Web & App Development',
  category: 'Web/App',
  short: 'Fast, beautiful websites and apps that are easy to run.',
  description:
  'Websites, online stores and custom apps designed and built in-house — fast on mobile, simple to update and ready to scale.',
  whatWeDo: ['UX & UI design', 'Business websites', 'E-commerce stores', 'Custom web & mobile apps'],
  deliverables: ['Responsive website', 'Online store setup', 'Admin / CMS training', 'Launch & support'],
  whoFor: 'Businesses that need a website that actually sells, not just a digital brochure.',
  icon: MonitorSmartphoneIcon,
  visual: 'web',
  image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800'
},
{
  slug: 'business-automation',
  number: '06',
  title: 'Business Automation',
  category: 'Automation',
  short: 'Automate the repetitive work so your team can focus on growth.',
  description:
  'We connect your tools and automate orders, messaging, reporting and follow-ups — fewer manual tasks, fewer mistakes.',
  whatWeDo: ['Workflow mapping', 'Order & inventory automation', 'Chat & CRM automation', 'Dashboards & reporting'],
  deliverables: ['Automation blueprint', 'Connected tool stack', 'Live dashboards', 'Team handover docs'],
  whoFor: 'Growing companies where manual processes are starting to slow everything down.',
  icon: WorkflowIcon,
  visual: 'automation',
  image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
}];