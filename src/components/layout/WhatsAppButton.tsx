"use client";

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WhatsAppIcon } from '../ui/BrandIcons';
import { site } from '@/constants/site';
import { easeOut, softSpring } from '@/utils/motion';

export function WhatsAppButton() {
  const [tip, setTip] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6">
      <motion.a
        href={site.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onMouseEnter={() => setTip(true)}
        onMouseLeave={() => setTip(false)}
        onFocus={() => setTip(true)}
        onBlur={() => setTip(false)}
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: easeOut, delay: 1 } }}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        transition={softSpring}
        className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full bg-turq text-navy shadow-[0_12px_32px_-8px_rgba(5,216,181,0.65)] sm:h-14 sm:w-14">
        
        <WhatsAppIcon className="h-7 w-7" />
      </motion.a>
      <div className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2">
        <AnimatePresence>
          {tip &&
          <motion.span
            role="tooltip"
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 6 }}
            transition={{ duration: 0.16, ease: easeOut }}
            className="block whitespace-nowrap rounded-full border border-line bg-navy-700 px-3.5 py-2 text-sm text-white">
            
              Chat with us
            </motion.span>
          }
        </AnimatePresence>
      </div>
    </div>);

}