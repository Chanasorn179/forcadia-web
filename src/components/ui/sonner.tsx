"use client"

import { useSyncExternalStore } from "react"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CheckIcon, CloseIcon, SuitIcon } from "@/components/icons"

/* Follows the site's own data-theme switch rather than next-themes. */
function useSiteTheme(): "light" | "dark" {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener("forcadia-theme-change", onChange)
      return () => window.removeEventListener("forcadia-theme-change", onChange)
    },
    () => (document.documentElement.dataset.theme === "light" ? "light" : "dark"),
    () => "dark",
  )
}

const Toaster = ({ ...props }: ToasterProps) => {
  const theme = useSiteTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      icons={{
        success: <CheckIcon className="size-4" />,
        info: <SuitIcon className="size-3" />,
        warning: <SuitIcon className="size-3" />,
        error: <CloseIcon className="size-4" />,
      }}
      style={
        {
          "--normal-bg": "var(--color-popover)",
          "--normal-text": "var(--color-popover-foreground)",
          "--normal-border": "var(--color-border)",
          "--border-radius": "1rem",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
