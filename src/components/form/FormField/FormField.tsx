import React from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}

/** Underline-style form field with animated cyan focus line (dark backgrounds). */
export function FormField({ id, label, error, required, hint, children }: FormFieldProps) {
  return (
    <div className="w-full min-w-0">
      <label htmlFor={`field-${id}`} className="block text-sm font-medium text-fg-2">
        {label}
        {required && <span aria-hidden className="ml-0.5 text-cyan">*</span>}
      </label>
      <div className="group relative mt-2">
        {children}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-cyan transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-focus-within:scale-x-100" />
        
      </div>
      {error ?
      <p id={`error-${id}`} className="mt-2 text-sm text-[#FF8A8A]">
          {error}
        </p> :
      hint ?
      <p className="mt-2 text-xs text-fg-3">{hint}</p> :
      null}
    </div>);

}

/** Shared props for underline inputs / textareas. */
export function fieldProps(hasError: boolean) {
  return {
    'aria-invalid': hasError,
    className: `block w-full resize-none appearance-none rounded-none border-0 border-b bg-transparent px-0 py-3 text-lg text-white placeholder:text-fg-3 focus:outline-none focus:ring-0 focus-visible:outline-none ${
    hasError ? 'border-[#FF8A8A]' : 'border-line'}`

  };
}
