"use client";
import { useEffect, type RefObject } from "react";
import { motionSettings, navigationLinks } from "../content/shanara";
const clamp = (value: number, low = 0, high = 1) => Math.max(low, Math.min(high, value));

/** Distinct reveal, image, gallery and decorative channels avoid competing transforms. */
export function useEditorialMotion(stage: RefObject<HTMLDivElement | null>, onChapter: (chapter: string) => void) {
  useEffect(() => {
    const root = stage.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const staticMode = new URLSearchParams(window.location.search).get("static") === "1";
    if (staticMode) document.documentElement.classList.add("static");
    const reduced = () => preference.matches || staticMode || Boolean(window.SiteAccessibility?.reducedMotion);
    const reveals = Array.from(root.querySelectorAll<HTMLElement>(".motionLine, .statementCopy > p, .statementPhoto, .manifestIntro > p, .visionSheet, .soundStoryHead > p, .worldTabs > button, .curationCopy, .steps article, .nirvanaPreviewContent > p, .moment figcaption, .albumLauncher, .connectionCard, .connectionFoot"));
    let photos = Array.from(root.querySelectorAll<HTMLElement>(".motionPhotoFrame"));
    const gallery = Array.from(root.querySelectorAll<HTMLElement>(".moment"));
    const stars = Array.from(root.querySelectorAll<HTMLElement>(".valuesBand > span, .albumStar, .connectionSpark"));
    const hero = root.querySelector<HTMLElement>(".hero");
    const orbit = root.querySelector<HTMLElement>(".motionOrbit");
    const chapters = navigationLinks.filter(link => link.href.startsWith("#")).map(link => document.getElementById(link.href.slice(1))).filter((node): node is HTMLElement => Boolean(node));
    const animations = new Set<Animation>();
    const initialWidth = window.innerWidth;
    const hidden = new Map<HTMLElement, Keyframe>();
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      const node = entry.target as HTMLElement;
      if (!entry.isIntersecting) return;
      observer.unobserve(node);
      if (reduced()) { node.style.removeProperty("opacity"); return; }
      const line = node.classList.contains("motionLine");
      const number = line ? Number(node.dataset.line) : Array.from(node.parentElement?.children ?? []).indexOf(node);
      const from = window.innerWidth <= 900 && !line ? { opacity: 0, transform: "translateY(12px)" } : hidden.get(node) ?? { opacity: 0, transform: "translateY(75px)" };
      const animation = node.animate([from, { opacity: 1, transform: "translate3d(0,0,0) rotate(0) scale(1)", clipPath: "inset(0 0 0 0 round 0px)" }], {
        duration: window.innerWidth <= 900 ? 650 : line ? 1150 : 1250,
        delay: line ? number * 130 : Math.min(number, 3) * 95,
        easing: line ? "cubic-bezier(.16,1,.3,1)" : "cubic-bezier(.22,1.12,.36,1)", fill: "both",
      });
      animations.add(animation);
      animation.onfinish = () => { node.style.removeProperty("opacity"); animation.cancel(); animations.delete(animation); };
    }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach((node, index) => {
      const line = node.classList.contains("motionLine");
      const lateral = node.matches(".statementPhoto,.visionSheet,.curationCopy,.albumLauncher,.connectionCard");
      const distance = initialWidth < 700 ? 35 : motionSettings.sideDistance;
      hidden.set(node, { opacity: 0, transform: line ? "translateY(115%) rotate(2deg)" : lateral ? `translate3d(${index % 2 ? -distance : distance}px,65px,0) scale(.94)` : "translate3d(0,75px,0)" });
      if (!reduced()) node.style.opacity = "0";
      observer.observe(node);
    });
    let frame = 0;
    const clear = () => {
      animations.forEach(animation => animation.cancel()); animations.clear();
      reveals.forEach(node => node.style.removeProperty("opacity"));
      photos.forEach(node => node.style.removeProperty("--photo-y"));
      gallery.forEach(node => { node.style.removeProperty("--gallery-x"); node.style.removeProperty("--gallery-y"); node.style.removeProperty("--gallery-scale"); });
      stars.forEach(node => node.style.removeProperty("transform"));
      hero?.style.removeProperty("--hero-drift"); hero?.style.removeProperty("--hero-zoom"); orbit?.style.removeProperty("--orbit-turn");
    };
    const update = () => {
      frame = 0;
      const height = window.innerHeight;
      const small = window.innerWidth <= 900;
      const length = document.documentElement.scrollHeight - height;
      root.style.setProperty("--page-progress", String(length > 0 ? window.scrollY / length : 0));
      let current = "#top";
      for (const section of chapters) if (section.getBoundingClientRect().top < height * .45) current = `#${section.id}`;
      onChapter(current);
      if (reduced()) return;
      if (hero && window.scrollY < hero.offsetHeight + height) {
        hero.style.setProperty("--hero-drift", `${(window.scrollY * motionSettings.heroDrift).toFixed(1)}px`);
        hero.style.setProperty("--hero-zoom", String(1.08 + clamp(window.scrollY / height) * .06));
      }
      for (const node of photos) {
        const rect = node.getBoundingClientRect();
        if (rect.bottom < -80 || rect.top > height + 80) continue;
        const progress = clamp((rect.top + rect.height / 2 - height / 2) / (height / 2 + rect.height / 2), -1, 1);
        node.style.setProperty("--photo-y", `${(progress * rect.height * (small ? .018 : motionSettings.photoDrift)).toFixed(1)}px`);
      }
      gallery.forEach((node, index) => {
        if (small) { node.style.removeProperty("--gallery-x"); node.style.removeProperty("--gallery-y"); node.style.removeProperty("--gallery-scale"); return; }
        const rect = node.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > height + 200) return;
        const p = clamp((height - rect.top) / (height * .78));
        const k = Math.pow(1 - p, 2);
        node.style.setProperty("--gallery-x", `${((index % 2 ? -1 : 1) * k * motionSettings.galleryDistance).toFixed(1)}px`);
        node.style.setProperty("--gallery-y", `${(k * 125).toFixed(1)}px`);
        node.style.setProperty("--gallery-scale", String(1 - k * .16));
      });
      stars.forEach((node, index) => {
        const rect = node.parentElement!.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > height) return;
        node.style.transform = `translateY(${Math.sin((height - rect.top) / 190 + index) * 10}px) rotate(${(height - rect.top) * .2 + index * 35}deg)`;
      });
      if (orbit) { const rect = orbit.parentElement!.getBoundingClientRect(); if (rect.bottom > 0 && rect.top < height) orbit.style.setProperty("--orbit-turn", `${(height - rect.top) * .09}deg`); }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const changed = () => { if (reduced()) clear(); schedule(); };
    window.addEventListener("scroll", schedule, { passive: true }); window.addEventListener("resize", schedule); preference.addEventListener("change", changed); window.addEventListener("siteaccessibilitychange", changed);
    const contentChanged = new MutationObserver(() => { photos = Array.from(root.querySelectorAll<HTMLElement>(".motionPhotoFrame")); schedule(); });
    contentChanged.observe(root, { childList: true, subtree: true });
    const resize = new ResizeObserver(schedule); resize.observe(root); update();
    return () => { contentChanged.disconnect(); observer.disconnect(); resize.disconnect(); cancelAnimationFrame(frame); clear(); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); preference.removeEventListener("change", changed); window.removeEventListener("siteaccessibilitychange", changed); };
  }, [stage, onChapter]);
}
