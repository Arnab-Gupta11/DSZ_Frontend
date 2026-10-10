"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { easeOut } from '@/utils/motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function Reveal({ children, className = '', delay = 0, y = 30 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -50px 0px' }}
      transition={{ duration: 0.6, ease: easeOut, delay }}>
      
      {children}
    </motion.div>);

}