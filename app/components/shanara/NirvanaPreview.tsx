import AnimatedHeading from "./AnimatedHeading";
import { Arrow } from "./Primitives";

export default function NirvanaPreview() {
  return (
<section className="nirvanaPreview" aria-labelledby="nirvana-preview-title">
        <div className="nirvanaPreviewImage" aria-hidden="true" />
        <div className="nirvanaPreviewContent">
          <p className="nirvanaOverline">A SHANARA EXPERIENCE</p>
          <p className="nirvanaWordmark">NIRVANA</p>
          <AnimatedHeading id="nirvana-preview-title">פחות רעש.<br />יותר נוכחות.</AnimatedHeading>
          <p>
            הבית של SHANARA להילינג, סדנאות, מרחבים ותהליכים שממשיכים
            את החיבור גם מחוץ לרחבה.
          </p>
          <a className="nirvanaButton" href="/nirvana">להכיר את נירוונה <Arrow /></a>
        </div>
      </section>
  );
}
