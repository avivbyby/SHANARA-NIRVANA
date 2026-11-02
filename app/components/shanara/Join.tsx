import AnimatedHeading from "./AnimatedHeading";
import { siteLinks } from "../../content/shanara";
import { Arrow } from "./Primitives";

export default function Join() {
  return (
<section className="join" id="join">
        <div className="motionOrbit" aria-hidden="true"><span>✦</span><i /><i /><i /></div>
        <div className="joinContent sectionPad">
          <p className="kicker">הדרך פנימה</p>
          <AnimatedHeading>מרגיש לכם נכון?<br /><em>בואו נכיר.</em></AnimatedHeading>
          <div className="steps">
            <article><b>1</b><h3>מגלים את שנארה</h3><p>מציצים ברגעים מהאירועים ומכירים את האנשים ואת הרוח של שנארה.</p></article>
            <article><b>2</b><h3>פותחים שיחה</h3><p>ספרו לנו קצת על עצמכם ועל מה שחיבר אתכם אלינו.</p></article>
            <article><b>3</b><h3>מכירים ומצטרפים</h3><p>נכיר בשיחה קצרה ונלווה אתכם בדרך למפגש הראשון במעגל.</p></article>
          </div>
          <div className="joinActions">
            <a className="lightButton" href={siteLinks.event} target="_blank" rel="noreferrer">לאירוע הבא <Arrow /></a>
            <a className="joinTextLink" href={siteLinks.community} target="_blank" rel="noreferrer">להצטרפות לקהילה</a>
          </div>
          <p className="privacyLine">אנחנו פונים באופן אישי ושומרים על הפרטים שלכם בכבוד.</p>
        </div>
      </section>
  );
}
