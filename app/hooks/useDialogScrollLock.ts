"use client";
import { useEffect } from "react";
/** Restore the previous page state on Escape, button close and unmount. */
export function useDialogScrollLock(open: boolean) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);
}
