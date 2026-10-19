"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

/**
 * Shows a success toast once for a redirect flag (?saved=1, ?created=1 ...),
 * then drops the flag from the URL so a refresh does not repeat it.
 */
export function FlashToast({ message }: { message: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const shown = useRef(false);

  useEffect(() => {
    if (shown.current) return;
    shown.current = true;
    toast.success(message);

    const params = new URLSearchParams(window.location.search);
    for (const flag of ["saved", "created", "updated", "deleted"]) params.delete(flag);
    const rest = params.toString();
    router.replace(rest ? `${pathname}?${rest}` : pathname, { scroll: false });
  }, [message, pathname, router]);

  return null;
}
