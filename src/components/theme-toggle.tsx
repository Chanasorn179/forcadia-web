"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@/components/icons";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("forcadia-theme-change", onStoreChange);
      return () => window.removeEventListener("forcadia-theme-change", onStoreChange);
    },
    () => document.documentElement.dataset.theme === "light" ? "light" : "dark",
    () => "dark",
  );

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    localStorage.setItem("forcadia-theme", nextTheme);
    window.dispatchEvent(new Event("forcadia-theme-change"));
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "เปลี่ยนเป็นโหมดสว่าง" : "เปลี่ยนเป็นโหมดกลางคืน"}
      title={isDark ? "โหมดสว่าง" : "โหมดกลางคืน"}
      className="theme-toggle grid h-11 w-11 place-items-center rounded-full border transition"
    >
      {isDark ? <SunIcon className="h-[18px] w-[18px]" /> : <MoonIcon className="h-[18px] w-[18px]" />}
    </button>
  );
}
