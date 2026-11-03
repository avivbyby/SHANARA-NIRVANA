"use client";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import AnimatedHeading from "./AnimatedHeading";
import EventAlbumsPanel from "./EventAlbumsPanel";
import AlbumActionMark from "./AlbumActionMark";
import { albumEvents } from "../../content/shanara-links";
import { useDialogScrollLock } from "../../hooks/useDialogScrollLock";
import { OPEN_ALBUM_MENU } from "./album-menu-events";
import "./links.css";
import "./album-menu.css";

export default function AlbumLinks() {
  const dialog = useRef<HTMLDialogElement>(null);
  const origin = useRef<HTMLElement | null>(null);
  const backButton = useRef<HTMLButtonElement>(null);
  const eventButtons = useRef(new Map<string, HTMLButtonElement>());
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedEvent = albumEvents.find(event => event.id === selectedId);
  useDialogScrollLock(open);
  const show = useCallback((trigger: HTMLElement) => {
    if (!dialog.current || dialog.current.open) return;
    origin.current = trigger;
    setSelectedId(null); dialog.current.showModal(); dialog.current.scrollTo({ top: 0 }); setOpen(true);
  }, []);
  useEffect(() => {
    const onRequest = (event: Event) => {
      const source = (event as CustomEvent<{ trigger: HTMLElement }>).detail?.trigger;
      if (source) show(source);
    };
    window.addEventListener(OPEN_ALBUM_MENU, onRequest);
    return () => window.removeEventListener(OPEN_ALBUM_MENU, onRequest);
  }, [show]);
  useEffect(() => {
    if (selectedId) { backButton.current?.focus({ preventScroll: true }); dialog.current?.scrollTo({ top: 0 }); }
  }, [selectedId]);
  const close = () => dialog.current?.close();
  const back = () => {
    const previous = selectedId; setSelectedId(null);
    requestAnimationFrame(() => { if (previous) eventButtons.current.get(previous)?.focus({ preventScroll: true }); dialog.current?.scrollTo({ top: 0 }); });
  };
  return <section className="albumArchive sectionPad" id="albums" aria-labelledby="albums-title">
    <div className="albumIntro"><p className="kicker">האלבומים שלנו</p><AnimatedHeading id="albums-title">הרגע עבר.<br /><em>הזיכרון נשאר.</em></AnimatedHeading><p>פותחים את המעגל, בוחרים אירוע ומגלים את האלבומים שלו.</p></div>
    <button className="albumLauncher" type="button" onClick={event => show(event.currentTarget)} aria-haspopup="dialog" aria-expanded={open} aria-controls="shanara-album-menu">
      <span className="albumSunRays" aria-hidden="true">{Array.from({ length: 24 }, (_, i) => <i key={i} style={{ "--ray-angle": `${i * 15}deg` } as CSSProperties} />)}</span>
      <span className="albumSunCore"><span aria-hidden="true">✦</span><span>אלבומים</span><small>פותחים את המעגל <AlbumActionMark /></small></span>
    </button>
    <noscript><div className="albumFallback">{albumEvents.map(event => <div key={event.id}><h3>{event.label}</h3>{event.albums.map(album => album.available === false ? <p key={album.id}>האלבום לא זמין כרגע</p> : <a key={album.id} href={album.href} target="_blank" rel="noopener noreferrer">{album.label}</a>)}</div>)}</div></noscript>
    <dialog ref={dialog} id="shanara-album-menu" className="albumMenu" style={{ backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)" }} aria-labelledby="album-menu-title" onCancel={event => { if (selectedId) { event.preventDefault(); back(); } }} onClick={event => { if (event.target === event.currentTarget) close(); }} onClose={() => { setOpen(false); setSelectedId(null); const trigger = origin.current; if (trigger?.closest<HTMLDialogElement>("dialog") && !trigger.closest<HTMLDialogElement>("dialog")?.open) document.querySelector<HTMLButtonElement>(".shMenuToggle")?.focus({ preventScroll: true }); else trigger?.focus({ preventScroll: true }); }}>
      <div className="albumMenuHeader"><div><p className="kicker">{selectedEvent ? "האלבומים של האירוע" : "SHANARA · THROUGH YOUR EYES"}</p><h2 id="album-menu-title" aria-live="polite">{selectedEvent ? <bdi>{selectedEvent.label}</bdi> : "כל אירוע, עולם."}</h2></div><button type="button" className="albumMenuClose" autoFocus onClick={close} aria-label="סגירת תפריט האלבומים">×</button></div>
      {selectedEvent ? <EventAlbumsPanel key={selectedEvent.id} event={selectedEvent} onBack={back} backRef={backButton} /> : <nav className={`albumConstellation${albumEvents.length > 6 ? " albumMany" : ""}`} aria-label="בחירת אירוע">
        <svg className="albumConnections" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">{albumEvents.map((event, index) => { const angle = (-90 + index * 360 / albumEvents.length) * Math.PI / 180; return <line key={event.id} x1="500" y1="300" x2={500 + 350 * Math.cos(angle)} y2={300 + 216 * Math.sin(angle)} />; })}</svg>
        <div className="albumMenuSun" aria-hidden="true"><span>✦</span><span>מתוך המעגל</span><small>SHANARA LEGACY</small></div>
        {albumEvents.map((event, index) => {
          const angle = (-90 + index * 360 / albumEvents.length) * Math.PI / 180;
          const availableCount = event.albums.filter(album => album.available !== false).length;
          return <button className="albumMenuLink albumEventTrigger" key={event.id} data-event-id={event.id} type="button" ref={node => { if (node) eventButtons.current.set(event.id, node); else eventButtons.current.delete(event.id); }} onClick={() => setSelectedId(event.id)} style={{ "--album-x": `${50 + 35 * Math.cos(angle)}%`, "--album-y": `${50 + 36 * Math.sin(angle)}%`, "--album-delay": `${index * 85 + 120}ms` } as CSSProperties}>
            <span className="albumMenuNumber" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span className="albumMenuName" dir="ltr">{event.label}</span>{availableCount ? <AlbumActionMark className="albumMenuArrow" /> : <span className="albumMenuArrow albumUnavailableMark" aria-hidden="true" />}<span className="albumEventCount">{availableCount === 0 ? "האלבום לא זמין כרגע" : availableCount === 1 ? "אלבום אחד" : `${availableCount} אלבומים`}</span>
          </button>;
        })}
      </nav>}
      <p className="albumMenuHint">{selectedEvent ? selectedEvent.albums.some(album => album.available !== false) ? "כל אלבום נפתח בלשונית חדשה" : "האלבום לא זמין כרגע" : "בחרו אירוע וגלו את האלבומים שלו"} <span aria-hidden="true">✦</span> כל הרגעים נשארים איתנו</p>
    </dialog>
  </section>;
}
