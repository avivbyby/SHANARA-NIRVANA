import AnimatedHeading from "./AnimatedHeading";

export default function Community() {
  return (
<section className="curation sectionPad">
        <div className="sectionNumber" aria-hidden="true">02</div>
        <div className="curationTitle">
          <p className="kicker">קהילה עם כוונה</p>
          <AnimatedHeading>הפקה גדולה.<br />מעגל שנשמר קרוב.</AnimatedHeading>
        </div>
        <div className="curationCopy">
          <p>
            SHANARA אולי נראית מבחוץ כמו הפקה גדולה ומוכרת, אבל הלב שלה נשאר
            מחתרתי. אנחנו שומרים על הקהילה דרך היכרות אישית וחיבור לערכים המשותפים — כדי שכל
            מי שמגיע ירגיש בטוח, שייך וחופשי להיות הוא עצמו.
          </p>
          <p className="smallNote">ההיכרות האישית עוזרת לנו לטפח מרחב של כבוד, ביטחון וחופש להיות מי שאתם.</p>
        </div>
      </section>
  );
}
