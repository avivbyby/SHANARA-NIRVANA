import { Arrow } from "./Primitives";
import type { CSSProperties, RefObject } from "react";
import AlbumActionMark from "./AlbumActionMark";
import type { AlbumEvent } from "../../content/shanara-links";

export default function EventAlbumsPanel({ event, onBack, backRef }: { event: AlbumEvent; onBack: () => void; backRef: RefObject<HTMLButtonElement | null> }) {
  return <div className="eventAlbumsPanel">
    <button ref={backRef} type="button" className="albumBack" onClick={onBack}><Arrow direction="right" navigation /> לכל האירועים</button>
    <div className="eventAlbumsIntro"><span aria-hidden="true">✦</span><p>אותו אירוע. עוד מבט.</p><p>בחרו אלבום והיכנסו לרגעים של <bdi>{event.label}</bdi>.</p></div>
    <nav className={`eventAlbumGrid${event.albums.length === 1 ? " eventAlbumSingle" : ""}`} aria-label={`האלבומים של ${event.label}`}>
      {event.albums.map((album, index) => <a key={album.id} className="eventAlbumLink" href={album.href} target="_blank" rel="noopener noreferrer" aria-label={`פתיחת אלבום ${album.label} של ${event.label} בלשונית חדשה`} style={{ "--album-delay": `${index * 110}ms` } as CSSProperties}>
        <span className="eventAlbumNumber" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span className="eventAlbumStar" aria-hidden="true">✦</span><h3><bdi>{album.label}</bdi></h3>{album.platform && <p className="eventAlbumPlatform">{album.platform}</p>}<span className="eventAlbumAction">לפתיחת האלבום <AlbumActionMark /></span>
      </a>)}
    </nav>
  </div>;
}
