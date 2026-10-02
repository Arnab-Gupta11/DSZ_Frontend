"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';


interface CursorState {
  label: string | null;
  setLabel: (label: string | null) => void;
}

const CursorContext = createContext<CursorState>({ label: null, setLabel: () => {} });

export function CursorProvider({ children }: {children: React.ReactNode;}) {
  const [label, setLabel] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setLabel(null);
  }, [pathname]);

  const value = useMemo(() => ({ label, setLabel }), [label]);
  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export function useCursor() {
  return useContext(CursorContext);
}

/** Spread onto an interactive element to show a text label in the custom cursor. */
export function useCursorLabel(text: string) {
  const { setLabel } = useCursor();
  return {
    onMouseEnter: () => setLabel(text),
    onMouseLeave: () => setLabel(null)
  };
}