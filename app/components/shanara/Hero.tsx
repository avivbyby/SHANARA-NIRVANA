import { siteLinks } from "../../content/shanara";
import { Arrow } from "./Primitives";

export default function Hero() {
  return (
<section className="hero" id="top">
<div className="heroBackdrop" aria-hidden="true"><picture><source media="(max-width: 700px)" srcSet="/shanara-photos/hero-forest-mobile-540.webp 540w, /shanara-photos/hero-forest-mobile-900.webp 900w" sizes="100vw" /><img src="/shanara-photos/ALX_4239.webp" alt="" fetchPriority="high" width={2048} height={1365} /></picture></div>

        <div className="heroContent">
          <p className="eyebrow">UNDERGROUND COMMUNITY · ISRAEL</p>
          <img className="logo" src="/shanara-logo-white.webp" alt="SHANARA Legacy" fetchPriority="high" width={480} height={252} />

          <p className="lead">
            הפקה שנולדה כדי להביא אור, אהבה ושמחה — חוויה מושקעת,
            קהילה מחוברת ומרחב שבו כל רגע הופך לזיכרון.
          </p>
          <div className="heroActions">
            <a className="primaryButton" href={siteLinks.event} target="_blank" rel="noreferrer">לאירוע הבא <Arrow /></a>
            <a className="secondaryButton" href="#join">בואו נכיר</a>
            <a className="textLink" href="#vision">לגלות את החזון</a>
          </div>
          <p className="curated"><span /> קהילה של חיבור · מתחילים בהיכרות</p>
        </div>

        <h1 className="heroHeadline">לא עוד מסיבה.<br /><em>מעגל של אהבה.</em></h1>
        <a className="scrollCue" href="#vision" aria-label="גלו עוד">גלו עוד <Arrow direction="down" /></a>
      </section>
  );
}
