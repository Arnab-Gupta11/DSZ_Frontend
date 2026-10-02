import React from 'react';
import type { SocialKey } from '../../types/content';

interface IconProps {
  className?: string;
}

const common = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true
};

export function WhatsAppIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M3.5 20.5l1.4-4.1A8.6 8.6 0 1 1 8 19.3z" />
      <path d="M9.2 8.4c.2-.4.5-.4.8-.4h.4c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.6l-.5.6c.6 1.2 1.6 2.2 2.8 2.8l.6-.5c.2-.1.4-.2.6-.1l1.6.7c.3.1.4.3.4.5v.4c0 .3 0 .6-.4.8-.5.3-1.2.5-1.9.4-2.6-.5-4.8-2.7-5.3-5.3-.1-.7.1-1.4.4-1.9z" />
    </svg>);

}

export function InstagramIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg {...common} className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </svg>);

}

export function FacebookIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M15 3.5h-2.2A4 4 0 0 0 8.8 7.5V10H6.5v3.6h2.3v6.9h3.6v-6.9h2.4l.6-3.6h-3V8a1 1 0 0 1 1-1H15z" />
    </svg>);

}

export function LinkedInIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg {...common} className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 10.5v6M8 7.6v.1M11.5 16.5v-6M11.5 13c0-1.5 1-2.6 2.4-2.6s2.1 1 2.1 2.6v3.5" />
    </svg>);

}

export function XIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M4.5 4.5h4l11 15h-4z" />
      <path d="M19.5 4.5l-6.2 6.8M4.5 19.5l6.2-6.8" />
    </svg>);

}

export function YouTubeIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg {...common} className={className}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.2 9.4l4.4 2.6-4.4 2.6z" fill="currentColor" />
    </svg>);

}

export function SocialIcon({ name, className }: {name: SocialKey;className?: string;}) {
  switch (name) {
    case 'instagram':
      return <InstagramIcon className={className} />;
    case 'facebook':
      return <FacebookIcon className={className} />;
    case 'linkedin':
      return <LinkedInIcon className={className} />;
    case 'x':
      return <XIcon className={className} />;
    case 'youtube':
      return <YouTubeIcon className={className} />;
  }
}