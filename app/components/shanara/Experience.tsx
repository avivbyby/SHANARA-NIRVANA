import AnimatedHeading from "./AnimatedHeading";
import AlbumLinks from "./AlbumLinks";
import ExperienceExplorer from "./ExperienceExplorer";
import MomentsGallery from "./MomentsGallery";

export default function Experience() {
  return (
<section className="experience" id="experience">
        <img className="experienceLogo" src="/shanara-logo-white.webp" alt="" aria-hidden="true" width={480} height={252} />
        <div className="experienceHeader sectionPad">
          <p className="kicker">החוויה</p>
          <AnimatedHeading>עולם שנבנה<br />עד לפרט האחרון.</AnimatedHeading>
          <p>
            מהסאונד והמרחב ועד האנשים שנכנסים בשער — כל פרט נבחר כדי ליצור
            לילה חד־פעמי, בטוח, חופשי ומחבר.
          </p>
        </div>

        <ExperienceExplorer />
<MomentsGallery />
<AlbumLinks />
      </section>
  );
}
