"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function SiteChrome({
  children,
  footer,
  mobileCta,
  navbar,
}: {
  children: ReactNode;
  footer: ReactNode;
  mobileCta: ReactNode;
  navbar: ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/about/admin");

  if (isAdminRoute) return children;
  return (
    <>
      {navbar}
      {children}
      {footer}
      {mobileCta}
    </>
  );
}
