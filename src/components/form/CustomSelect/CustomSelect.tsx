"use client";

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';

interface CustomSelectProps {
  id?: string;
  value: string;
  onChange: (val: string) => void;
  options: readonly string[];
  hasError: boolean;
  placeholder?: string;
}

/** Theme-matched dropdown with underline trigger (dark backgrounds). */
export function CustomSelect({ id, value, onChange, options, hasError, placeholder = 'Choose one' }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between resize-none appearance-none rounded-none border-0 border-b bg-transparent px-0 py-3 text-lg text-left focus:outline-none focus:ring-0 ${
        value ? 'text-white' : 'text-fg-3'} ${
        hasError ? 'border-[#FF8A8A]' : 'border-line'}`}>
        
        <span>{value || placeholder}</span>
        <ChevronDownIcon className={`h-5 w-5 text-fg-3 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open &&
        <motion.ul
          role="listbox"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 top-[calc(100%+8px)] z-50 w-full max-h-60 overflow-auto rounded-xl border border-line bg-[#052d35] p-2 shadow-2xl custom-scrollbar">
          
            {options.map((option) =>
          <li key={option} role="option" aria-selected={value === option}>
                <button
              type="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-[15px] transition-colors duration-200 ${
              value === option ? 'bg-cyan/10 text-cyan font-medium' : 'text-white hover:bg-surface-hover'}`
              }>
              
                  {option}
                </button>
              </li>
          )}
          </motion.ul>
        }
      </AnimatePresence>
    </div>);

}
