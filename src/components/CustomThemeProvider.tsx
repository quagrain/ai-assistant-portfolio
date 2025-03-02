"use client";

import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";

export default function ThemeProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  /*
    Check if the page has been rendered on the client side before using the ThemeProvider to resolve hydration warning.
    Alternatively you could supprefss the hydration warning.
  */
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return;

  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
