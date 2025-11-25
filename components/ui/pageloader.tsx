// components/ui/page-loader.tsx
"use client";

import { cn } from "@/lib/utils";

type PageLoaderProps = {
  message?: string;
  className?: string;
};

export function PageLoader({ message = "Loading...", className }: PageLoaderProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center select-none",
        "bg-background/80 backdrop-blur-md animate-fadeIn",
        className
      )}
    >
      {/* Loader Container */}
      <div className="relative h-20 w-20 flex items-center justify-center animate-scalePulse">
        
        {/* Soft outer glowing ring */}
        <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" />

        {/* Main spinning gradient ring */}
        <div className="absolute inset-0 rounded-full border-4 border-primary/40 border-t-transparent animate-superSpin" />

        {/* Inner orb */}
        <div className="absolute h-10 w-10 rounded-full bg-primary/80 blur-sm animate-pulse" />

        {/* Inner solid dot */}
        <div className="absolute h-6 w-6 rounded-full bg-background shadow-xl" />
      </div>

      {/* Loading Text */}
      <p className="mt-6 text-base font-medium text-muted-foreground animate-bounceSlow">
        {message}
      </p>
    </div>
  );
}
