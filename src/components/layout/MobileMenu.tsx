"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRightIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { navLinks, site } from '@/constants/site';
import { easeOut } from '@/utils/motion';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open &&
      <motion.div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: easeOut }}
        className="fixed inset-0 z-40 flex flex-col bg-navy px-5 pb-8 pt-24 sm:px-8 lg:hidden">
        
          <div aria-hidden className="grid-pattern mask-radial pointer-events-none absolute inset-0 opacity-40" />
          <nav aria-label="Mobile" className="relative flex-1 overflow-y-auto">
            <ul className="flex flex-col">
              {navLinks.map((link, i) => {
                const isActive = link.to === '/' ? pathname === '/' : pathname?.startsWith(link.to);
                return (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.4, ease: easeOut, delay: 0.05 + i * 0.05 }}
                    className="border-b border-line">
                    
                    <Link
                      href={link.to}
                      onClick={onClose}
                      className={`flex min-h-[64px] items-center justify-between font-display text-[2rem] font-bold tracking-[-0.03em] ${
                        isActive ? 'text-cyan' : 'text-white'
                      }`}>
                      
                      {link.label}
                      <ArrowUpRightIcon aria-hidden className="h-5 w-5 text-fg-3" />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: easeOut, delay: 0.38 }}
            className="relative mt-6">
            
            <Button to="/contact" size="lg" className="w-full">
              Let&apos;s Work Together
            </Button>
            <p className="mt-4 text-center text-sm text-fg-3">{site.city}</p>
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);
}