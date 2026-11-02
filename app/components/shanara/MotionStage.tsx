"use client";
import { useRef, useState, type ReactNode } from "react";
import { navigationLinks } from "../../content/shanara";

import { useEditorialMotion } from "../../hooks/useEditorialMotion";
import { requestAlbumMenu } from "./album-menu-events";
import { useSmoothScrolling } from "../../hooks/useSmoothScrolling";

/** One observer and one scheduled frame for all editorial motion. Native scrolling stays native. */
export default function MotionStage({ children }: { children: ReactNode }) {
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("#top");
  useSmoothScrolling();
  useEditorialMotion(stage, setActive);
  return <div ref={stage} className="motionStage">
    <div className="readingProgress" aria-hidden="true" />
    <nav className="chapterNav" aria-label="מעבר מהיר בין פרקי העמוד">{navigationLinks.filter(link => link.href.startsWith("#")).map(link => <a key={link.href} href={link.href} onClick={event => { if (link.href === "#albums" && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) { event.preventDefault(); requestAlbumMenu(event.currentTarget); } }} aria-haspopup={link.href === "#albums" ? "dialog" : undefined} aria-current={active === link.href ? "location" : undefined}><span className="chapterDot" aria-hidden="true" /><span>{link.label}</span></a>)}</nav>
    {children}
  </div>;
}
