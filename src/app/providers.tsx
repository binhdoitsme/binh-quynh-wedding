"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useEffect, useState } from "react";

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        setIsDarkMode(event.matches);
      });
  }, []);

  return (
    <NextUIProvider>
      <main className={`${isDarkMode ? "dark" : ""}`}>{children}</main>
    </NextUIProvider>
  );
}
