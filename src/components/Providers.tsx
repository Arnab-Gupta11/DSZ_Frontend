"use client";
import { PreloaderProvider } from "@/contexts/PreloaderContext";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "sonner";
import { WebsitePreloader } from "./Preloader/WebsitePreloader";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PreloaderProvider>
      {children}
      <WebsitePreloader />
      <Toaster position="top-center" richColors />
          </PreloaderProvider>
    </Provider>
  );
}
