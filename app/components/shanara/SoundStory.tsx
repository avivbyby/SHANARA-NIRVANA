import AnimatedHeading from "./AnimatedHeading";

export default function SoundStory() {
  return (
<section className="soundStory" aria-labelledby="sound-story-title">
        <div className="soundStoryHead"><p className="kicker">הלב של הרחבה</p><AnimatedHeading id="sound-story-title">הכול מתחיל בתדר.</AnimatedHeading><p>בין הידיים על המיקסר לאנשים ברחבה — נוצר החיבור.</p></div>
        <figure><span className="motionPhotoFrame"><img src="/shanara-photos/PXBL3717.webp" srcSet="/shanara-photos/PXBL3717-sm.webp 960w, /shanara-photos/PXBL3717.webp 2400w" sizes="100vw" alt="תקריב ידיה של די־ג׳יית על המיקסר, עם צמיד SHANARA באור השקיעה" loading="lazy" width={2400} height={1601} /></span><figcaption>THE SOUND OF SHANARA <span>הכוונה נמצאת גם בפרטים הקטנים.</span></figcaption></figure>
      </section>
  );
}
