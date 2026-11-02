"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

import { useDialogScrollLock } from "./hooks/useDialogScrollLock";
import { navigationLinks as links, siteLinks } from "./content/shanara";

import { requestAlbumMenu } from "./components/shanara/album-menu-events";

const Logo = () => <img src="/shanara-logo-white.png" alt="SHANARA Legacy" width={4500} height={2360} />;

export default function ShanaraNavigation() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useDialogScrollLock(open);

  const close = () => dialog.current?.close();
  const show = () => {
    dialog.current?.showModal();
    setOpen(true);
  };

  const followLink = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "#albums" && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      event.preventDefault(); close(); requestAlbumMenu(event.currentTarget);
    } else close();
  };

  return (
    <header className={`shNavigation${scrolled ? " scrolled" : ""}`} aria-label="ניווט ראשי">
      <a className="shNavBrand" href="#top" aria-label="SHANARA Legacy — חזרה לראש העמוד"><Logo /></a>
      <nav className="shInlineLinks" aria-label="קישורי העמוד">
        {links.map(link => <a key={link.href} href={link.href} onClick={event => followLink(event, link.href)} aria-haspopup={link.href === "#albums" ? "dialog" : undefined}>{link.label}</a>)}
        <a href={siteLinks.event} target="_blank" rel="noreferrer">לאירוע הבא</a>
      </nav>
      <button className="shMenuToggle" type="button" ref={trigger} onClick={show} aria-label="פתיחת תפריט ניווט" aria-haspopup="dialog" aria-expanded={open} aria-controls="shanara-menu"><span /><span /><span /></button>
      <dialog id="shanara-menu" className="shMenuDialog" style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }} ref={dialog} aria-label="תפריט שנארה" onClose={() => { setOpen(false); trigger.current?.focus({ preventScroll: true }); }}>
        <div className="shMenuTop">
          <a className="shNavBrand" href="#top" onClick={close} aria-label="SHANARA Legacy — חזרה לראש העמוד"><Logo /></a>
          <button className="shMenuClose" type="button" autoFocus onClick={close} aria-label="סגירת תפריט"><span /><span /></button>
        </div>
        <nav className="shFullscreenLinks" aria-label="קישורי תפריט שנארה">
          {links.map(link => <a key={link.href} href={link.href} onClick={event => followLink(event, link.href)} aria-haspopup={link.href === "#albums" ? "dialog" : undefined}>{link.label}</a>)}
          <a className="shMenuEvent" href={siteLinks.event} target="_blank" rel="noreferrer" onClick={close}>לאירוע הבא</a>
        </nav>
      </dialog>
    </header>
  );
}
