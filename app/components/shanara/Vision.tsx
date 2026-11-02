import AnimatedHeading from "./AnimatedHeading";

export default function Vision() {
  return (<>
<section className="statement sectionPad" id="vision">
        <div className="sectionNumber" aria-hidden="true">01</div>
        <div className="statementCopy">
          <p className="kicker">החזון שלנו</p>
          <AnimatedHeading>חוויה שממשיכה להשפיע<br />גם כשהרחבה נרגעת.</AnimatedHeading>
          <p className="largeCopy">
            SHANARA נולדה מתוך אמונה שאירוע יכול להיות הרבה מעבר ללילה של מוזיקה.
            הוא יכול לפתוח את הלב, ליצור קשרים אנושיים ולהניע שינוי אמיתי.
          </p>
          <blockquote>
            “להגדיל את מעגל האהבה והטוב — בארץ ובעולם.”
            <cite>מתוך חזון SHANARA Legacy</cite>
          </blockquote>
        </div>
        <figure className="statementPhoto">
          <span className="motionPhotoFrame"><img src="/event-friendship.webp" srcSet="/event-friendship-sm.webp 700w, /event-friendship.webp 1200w" sizes="(max-width:900px) 88vw, 38vw" alt="שלוש חברות ברגע שמח באירוע SHANARA" loading="lazy" width={1200} height={800} /></span>
          <figcaption><span>LOVE IN MOTION</span> אהבה שמרגישים, לא רק מדברים עליה.</figcaption>
        </figure>
      </section>

      <section className="valuesBand" aria-label="הערכים שלנו">
        <div>אהבת חינם</div><span>✦</span>
        <div>קבלת האחר</div><span>✦</span>
        <div>נתינה</div><span>✦</span>
        <div>צמיחה</div><span>✦</span>
        <div>חופש</div>
      </section>

      <section className="visionDocument sectionPad" aria-label="החזון המלא של SHANARA Legacy">
        <div className="manifestIntro"><p className="kicker">המניפסט</p><AnimatedHeading>אותה כוונה.<br />מעגל שמתרחב.</AnimatedHeading><p>מה מניע אותנו ואיך נראה העולם שאנחנו בונים — במילים שלנו.</p></div>
        <div className="visionSheet">
          <img src="/shanara-vision.webp" srcSet="/shanara-vision-sm.webp 700w, /shanara-vision.webp 1200w" sizes="(max-width:900px) calc(100vw - 44px), 46vw" loading="lazy" decoding="async" alt="החזון המלא של SHANARA Legacy" width={1200} height={1924} />
        </div>
      </section>
  </>);
}
