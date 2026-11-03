import { Arrow } from "./Primitives";
import type { CSSProperties, RefObject } from "react";
import AlbumActionMark from "./AlbumActionMark";
import type { AlbumEvent } from "../../content/shanara-links";

export default function EventAlbumsPanel({ event, onBack, backRef }: { event: AlbumEvent; onBack: () => void; backRef: RefObject<HTMLButtonElement | null> }) {
  const hasAvailable = event.albums.some(album => album.available !== false);
  return <div className="eventAlbumsPanel">
    <button ref={backRef} type="button" className="albumBack" onClick={onBack}><Arrow direction="right" navigation /> לכל האירועים</button>
    <div className="eventAlbumsIntro"><span aria-hidden="true">✦</span><p>אותו אירוע. עוד מבט.</p><p>{hasAvailable ? <>בחרו אלבום והיכנסו לרגעים של <bdi>{event.label}</bdi>.</> : <>האלבום של <bdi>{event.label}</bdi> אינו זמין כרגע.</>}</p></div>
    <nav className={`eventAlbumGrid${event.albums.length === 1 ? " eventAlbumSingle" : ""}`} aria-label={`האלבומים של ${event.label}`}>
      {event.albums.map((album, index) => {
        const content = <><span className="eventAlbumNumber" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span className="eventAlbumStar" aria-hidden="true">✦</span><h3><bdi>{album.label}</bdi></h3>{album.available !== false && album.platform && <p className="eventAlbumPlatform">{album.platform}</p>}<span className="eventAlbumAction">{album.available === false ? "האלבום לא זמין כרגע" : <>לפתיחת האלבום <span className="srOnly"> — נפתח בלשונית חדשה</span><AlbumActionMark /></>}</span></>;
        const style = { "--album-delay": `${index * 110}ms` } as CSSProperties;
        return album.available === false ? <article key={album.id} className="eventAlbumLink eventAlbumUnavailable" style={style}>{content}</article> : <a key={album.id} className="eventAlbumLink" href={album.href} target="_blank" rel="noopener noreferrer" style={style}>{content}</a>;
      })}
    </nav>
  </div>;
}
