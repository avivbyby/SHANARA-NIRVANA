"use client";
import { useEffect } from "react";

type ScrollEngine = { raf: (time: number) => void; stop: () => void; start: () => void; destroy: () => void; isStopped: boolean };
declare global { interface Window { SiteAccessibility?: { readonly reducedMotion: boolean }; Lenis?: new (options: Record<string, unknown>) => ScrollEngine } }

/** Reuse Nirvana's locally hosted, vendored scroller; touch input remains native. */
export function useSmoothScrolling() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const staticMode = new URLSearchParams(window.location.search).get("static") === "1";
    if (staticMode) document.documentElement.classList.add("static");
    const reduced = () => preference.matches || staticMode || Boolean(window.SiteAccessibility?.reducedMotion);
    let engine: ScrollEngine | undefined;
    let frame = 0;
    let disposed = false;
    const start = () => {
      if (disposed || reduced() || !window.Lenis || engine) return;
      engine = new window.Lenis({ lerp: 0.09, smoothWheel: true, syncTouch: false, anchors: true, prevent: (node: HTMLElement) => Boolean(node.closest("dialog")) });
      const tick = (time: number) => {
        if (!engine) return;
        const locked = document.body.style.overflow === "hidden";
        if (locked && !engine.isStopped) engine.stop();
        if (!locked && engine.isStopped) engine.start();
        engine.raf(time); frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    const stop = () => { cancelAnimationFrame(frame); engine?.destroy(); engine = undefined; };
    const change = () => { if (reduced()) stop(); else start(); };
    let script = document.querySelector<HTMLScriptElement>('script[data-shanara-scroller]');
    if (!script) { script = document.createElement("script"); script.src = "/site-modules/shared/vendor-lenis.js?v=07020831fc52"; script.async = true; script.dataset.shanaraScroller = "true"; document.head.append(script); }
    script.addEventListener("load", start); preference.addEventListener("change", change); window.addEventListener("siteaccessibilitychange", change); start();
    return () => { disposed = true; stop(); script?.removeEventListener("load", start); preference.removeEventListener("change", change); window.removeEventListener("siteaccessibilitychange", change); };
  }, []);
}
