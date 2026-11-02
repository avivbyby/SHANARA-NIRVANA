import { Arrow } from "./Primitives";
import AnimatedHeading from "./AnimatedHeading";
import LinkIcon from "./LinkIcon";
import { connectionLinks, directoryLink } from "../../content/shanara-links";
import "./links.css";
export default function ConnectionLinks() {
  return <section className="connectionSection sectionPad" id="connect" aria-labelledby="connect-title">
    <div className="connectionHeading"><p className="kicker">נשארים מחוברים</p><div><AnimatedHeading id="connect-title">הרחבה היא רק<br /><em>ההתחלה.</em></AnimatedHeading><p>לעקוב, לדבר ולהיפגש שוב. בחרו את הדרך שלכם להישאר במעגל.</p></div><span className="connectionSpark" aria-hidden="true">✦</span></div>
    <div className="connectionGrid">{connectionLinks.map((link, index) => <a className={`connectionCard connection-${link.icon}`} key={link.id} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`${link.action} — נפתח בלשונית חדשה`}>
      <div className="connectionTop"><span className="connectionIcon"><LinkIcon name={link.icon} /></span><span className="connectionIndex" aria-hidden="true">0{index + 1}</span></div><p className="connectionEyebrow">{link.eyebrow}</p><h3 dir={link.icon === "instagram" || link.icon === "ticket" ? "ltr" : undefined}>{link.label}</h3><p className="connectionDescription">{link.description}</p><span className="connectionAction">{link.action}<Arrow direction="up-right" /></span>
    </a>)}</div>
    <div className="connectionFoot"><p>אותו החיבור, גם בין המפגשים.</p><a href={directoryLink} target="_blank" rel="noopener noreferrer">כל הקישורים ב־Taplink <Arrow direction="up-right" /></a></div>
  </section>;
}
