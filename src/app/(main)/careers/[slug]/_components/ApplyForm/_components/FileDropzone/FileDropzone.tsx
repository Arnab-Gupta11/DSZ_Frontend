"use client";

import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FileTextIcon, UploadCloudIcon, XIcon } from 'lucide-react';

export const ACCEPTED_CV_TYPES = [
'application/pdf',
'application/msword',
'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

export const MAX_CV_SIZE = 5 * 1024 * 1024;

interface FileDropzoneProps {
  id: string;
  value: File | null;
  onChange: (file: File | null) => void;
  hasError: boolean;
}

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Drag & drop CV upload (PDF / DOC / DOCX). */
export function FileDropzone({ id, value, onChange, hasError }: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const pick = (files: FileList | null) => {
    const file = files?.[0];
    if (file) onChange(file);
  };

  const clear = () => {
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="w-full min-w-0">
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept=".pdf,.doc,.docx"
        className="sr-only"
        onChange={(e) => pick(e.target.files)}
        aria-invalid={hasError} />
      

      <AnimatePresence mode="wait" initial={false}>
        {value ?
        <motion.div
          key="file"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="flex w-full items-center gap-4 rounded-2xl border border-line-accent bg-cyan/5 p-4">
          
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-700 text-cyan">
              <FileTextIcon aria-hidden className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-white">{value.name}</p>
              <p className="text-sm text-fg-3">{formatSize(value.size)}</p>
            </div>
            <button
            type="button"
            onClick={clear}
            aria-label="Remove file"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg-2 transition-colors duration-200 hover:border-[#FF8A8A] hover:text-[#FF8A8A]">
            
              <XIcon aria-hidden className="h-4 w-4" />
            </button>
          </motion.div> :

        <motion.label
          key="drop"
          htmlFor={id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            pick(e.dataTransfer.files);
          }}
          className={`group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed px-6 py-10 text-center transition-colors duration-200 ${
          dragging ?
          'border-cyan bg-cyan/10' :
          hasError ?
          'border-[#FF8A8A] bg-[#FF8A8A]/5' :
          'border-line bg-surface hover:border-line-accent hover:bg-surface-hover'}`
          }>
          
            <motion.span
            animate={dragging ? { y: -4, scale: 1.08 } : { y: 0, scale: 1 }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line-accent bg-navy-700 text-cyan">
            
              <UploadCloudIcon aria-hidden className="h-6 w-6" />
            </motion.span>
            <span className="text-white">
              <span className="font-medium text-cyan">Click to upload</span> or drag and drop
            </span>
            <span className="text-sm text-fg-3">PDF, DOC or DOCX — max 5 MB</span>
          </motion.label>
        }
      </AnimatePresence>
    </div>);

}
