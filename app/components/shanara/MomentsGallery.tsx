"use client";
import { Arrow } from "./Primitives";
import AnimatedHeading from "./AnimatedHeading";
import { useRef, useState } from "react";
import { galleryPhotos, photoSourceSet } from "../../content/shanara";
import { useDialogScrollLock } from "../../hooks/useDialogScrollLock";
export default function MomentsGallery() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const origin = useRef<HTMLButtonElement | null>(null);
  const touch = useRef<number | null>(null);
  useDialogScrollLock(open);
  const move = (step: number) => setIndex(value => (value + step + galleryPhotos.length) % galleryPhotos.length);
  const photo = galleryPhotos[index];
  return <>
    <div id="moments" className="moments sectionPad" aria-labelledby="moments-title">
      <div className="momentsHeading"><p className="kicker">מתוך המעגל</p><div><AnimatedHeading id="moments-title">רגעים שאי אפשר<br />לביים.</AnimatedHeading><p className="galleryHint">לחצו על תמונה, פתחו את הרגע.</p></div></div>
      {galleryPhotos.map((item, i) => <figure key={item.src} className={`moment ${item.className}`}>
        <button type="button" className="photoTrigger" aria-label={`הגדלת תמונה: ${item.caption}`} aria-haspopup="dialog" onClick={event => { origin.current = event.currentTarget; setIndex(i); dialog.current?.showModal(); setOpen(true); }}><span className="motionPhotoFrame"><img src={item.src} srcSet={photoSourceSet(item.src)} sizes="(max-width: 900px) 100vw, 85vw" alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async" /></span><span className="photoExpand"><Arrow direction="up-right" /></span></button><figcaption>{item.caption}</figcaption>
      </figure>)}
    </div>
    <dialog ref={dialog} className="shLightbox" aria-label="גלריית הרגעים של שנארה" onClose={() => { setOpen(false); origin.current?.focus({ preventScroll: true }); }} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={event => { if (event.key === "ArrowLeft") { event.preventDefault(); move(1); } if (event.key === "ArrowRight") { event.preventDefault(); move(-1); } }}>
      <button type="button" className="lightboxClose" autoFocus onClick={() => dialog.current?.close()} aria-label="סגירת הגלריה">×</button>
      {open && <figure onTouchStart={event => { touch.current = event.changedTouches[0].clientX; }} onTouchEnd={event => { if (touch.current !== null) { const distance = event.changedTouches[0].clientX - touch.current; if (Math.abs(distance) > 50) move(distance < 0 ? 1 : -1); } touch.current = null; }}><img key={photo.src} src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} /><figcaption aria-live="polite">{photo.caption}<span>{index + 1} / {galleryPhotos.length}</span></figcaption></figure>}
      <div className="lightboxControls"><button type="button" onClick={() => move(-1)} aria-label="התמונה הקודמת"><Arrow direction="right" navigation /></button><span>רגעים מתוך המעגל</span><button type="button" onClick={() => move(1)} aria-label="התמונה הבאה"><Arrow navigation /></button></div>
    </dialog>
  </>;
}
