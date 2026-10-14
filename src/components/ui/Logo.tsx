import React from "react";
import Image from "next/image";
import { site } from "@/constants/site";

interface LogoProps {
  compact?: boolean;
  className?: string;
  markClassName?: string;
  priority?: boolean;
}

/**
 * Official DSZ Logo using next/image with full responsive optimization.
 * Dimensions: 440x171 (aspect ratio ~2.57:1)
 */
export function Logo({
  compact = false,
  className = "",
  markClassName = "",
  priority = true,
}: LogoProps) {
  const logoSrc = site.logoSrc || "/logo.png";

  if (compact) {
    return (
      <span
        className={`relative inline-flex items-center justify-start overflow-hidden rounded-lg aspect-square ${
          markClassName || "h-8 w-8"
        } ${className}`}
      >
        <Image
          src={logoSrc}
          alt={`${site.name} mark`}
          width={440}
          height={171}
          priority={priority}
          className="h-full w-auto max-w-none object-contain object-left pointer-events-none select-none"
        />
      </span>
    );
  }

  return (
    <Image
      src={logoSrc}
      alt={site.name}
      width={440}
      height={200}
      priority={priority}
      className={`h-9 w-auto object-contain lg:h-16 pointer-events-none select-none ${className} ${markClassName}`}
    />
  );
}
