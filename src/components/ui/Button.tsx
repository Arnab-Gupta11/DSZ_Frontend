"use client";

import React from 'react';
import Link from 'next/link';

import { ArrowRightIcon } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark' | 'outline-dark';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  external?: boolean;
  ariaLabel?: string;
}

const base =
'group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,box-shadow,color,border-color] duration-200 ease-out disabled:pointer-events-none disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary:
  'bg-cyan text-navy shadow-[0_0_0_1px_rgba(2,224,223,0.4),0_8px_24px_-12px_rgba(2,224,223,0.55)] hover:bg-cyan-soft hover:shadow-[0_0_0_1px_rgba(2,224,223,0.7),0_14px_40px_-10px_rgba(2,224,223,0.7)]',
  secondary: 'border border-line bg-surface text-white hover:border-line-accent hover:bg-surface-hover',
  ghost: 'text-white hover:text-cyan',
  dark: 'bg-navy text-white hover:bg-navy-700',
  'outline-dark': 'border border-line-dark text-ink hover:border-ink'
};

const sizes: Record<Size, string> = {
  sm: 'h-10 px-5 text-sm',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-8 text-base'
};

export function Button({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  arrow = true,
  icon,
  className = '',
  disabled,
  external,
  ariaLabel
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const content =
  <>
      {icon}
      <span>{children}</span>
      {arrow &&
    <ArrowRightIcon
      aria-hidden
      className="h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-[5px]" />

    }
    </>;


  if (to) {
    return (
      <Link href={to} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>);

  }
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...external ? { target: '_blank', rel: 'noopener noreferrer' } : {}}>
        
        {content}
      </a>);

  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} aria-label={ariaLabel}>
      {content}
    </button>);

}