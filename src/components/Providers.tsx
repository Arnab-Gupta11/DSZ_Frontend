"use client";
import { PreloaderProvider } from "@/contexts/PreloaderContext";

import React from "react";
import { Toaster } from "sonner";
import { WebsitePreloader } from "./Preloader/WebsitePreloader";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PreloaderProvider>
      {children}
      <WebsitePreloader />
      <Toaster position="top-center" richColors />
    </PreloaderProvider>
  );
}
