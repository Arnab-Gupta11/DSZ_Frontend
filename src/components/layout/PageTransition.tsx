"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { easeOut } from '@/utils/motion';

export function PageTransition({ children }: {children: React.ReactNode;}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.2, ease: easeOut } }}>
      
      {children}
    </motion.div>);

}