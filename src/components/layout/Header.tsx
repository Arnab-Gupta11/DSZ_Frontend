"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { MenuIcon, XIcon } from 'lucide-react';
import { Container } from '../ui/Container';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { MagneticButton } from '../ui/MagneticButton';
import { MobileMenu } from './MobileMenu';
import { navLinks } from '@/constants/site';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isArticle = pathname?.startsWith("/insights/") && pathname.length > 10;
  const solid = scrolled || open || isArticle;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ease-out ${
        solid ? 'border-line bg-[rgba(4,28,38,0.82)] backdrop-blur-xl' : 'border-transparent bg-transparent'}`
        }>
        
        <Container className="flex h-[72px] items-center justify-between lg:h-20">
          <Link href="/" aria-label="Digital Soft Zone — home" className="rounded-lg">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = link.to === '/' ? pathname === '/' : pathname?.startsWith(link.to);
                return (
                  <li key={link.to}>
                    <Link
                      href={link.to}
                      className={`group relative block px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                        isActive ? 'text-white' : 'text-fg-2 hover:text-white'
                      }`}>
                      
                      {link.label}
                      <span
                        aria-hidden
                        className={`absolute inset-x-4 bottom-0.5 h-px origin-left bg-cyan shadow-[0_0_10px_rgba(2,224,223,0.9)] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`
                        } />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <MagneticButton>
                <Button to="/contact" size="sm">
                  Get a Free Quote
                </Button>
              </MagneticButton>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-white transition-colors duration-200 hover:border-line-accent lg:hidden">
              
              {open ? <XIcon className="h-5 w-5" aria-hidden /> : <MenuIcon className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </Container>
      </header>
      <MobileMenu open={open} onClose={close} />
    </>);
}