"use client";

import React, { useEffect, useState } from 'react';
import { CheckIcon, LinkIcon } from 'lucide-react';
import { FacebookIcon, LinkedInIcon, WhatsAppIcon, XIcon } from '@/components/ui/BrandIcons';

interface ShareButtonsProps {
  title: string;
}

export function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const links = [
  { label: 'Share on X', href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, icon: <XIcon className="h-4 w-4" /> },
  { label: 'Share on LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, icon: <LinkedInIcon className="h-4 w-4" /> },
  { label: 'Share on Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, icon: <FacebookIcon className="h-4 w-4" /> },
  { label: 'Share on WhatsApp', href: `https://wa.me/?text=${t}%20${u}`, icon: <WhatsAppIcon className="h-4 w-4" /> }];


  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const btn =
  'flex h-11 w-11 items-center justify-center rounded-full border border-line-dark text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white';

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-2 text-sm text-ink-2">Share</span>
      {links.map((l) =>
      <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label} className={btn}>
          {l.icon}
        </a>
      )}
      <button type="button" onClick={copy} aria-label={copied ? 'Link copied' : 'Copy link'} className={btn}>
        {copied ? <CheckIcon aria-hidden className="h-4 w-4" /> : <LinkIcon aria-hidden className="h-4 w-4" />}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Link copied to clipboard' : ''}
      </span>
    </div>);

}
