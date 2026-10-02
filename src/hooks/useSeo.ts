"use client";

import { useEffect } from 'react';
import { site } from '@/constants/site';

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function useSeo({ title, description, path, image, type = 'website' }: SeoOptions) {
  useEffect(() => {
    const fullTitle = path === '/' ? title : `${title} — ${site.name}`;
    const url = `${site.url}${path}`;
    const img = image || site.ogImage;

    document.title = fullTitle;
    setMeta('name', 'description', description);
    setCanonical(url);

    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', site.name);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    if (img) setMeta('property', 'og:image', img);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    if (img) setMeta('name', 'twitter:image', img);
  }, [title, description, path, image, type]);
}