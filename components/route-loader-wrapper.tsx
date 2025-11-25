// components/layout/route-loader-wrapper.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PageLoader } from "./ui/pageloader";

type RouteLoaderWrapperProps = {
  children: React.ReactNode;
};

export function RouteLoaderWrapper({ children }: RouteLoaderWrapperProps) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  // Initial load
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {loading && <PageLoader />}
      {children}
    </>
  );
}
