/** Shared links and editorial collections. Add photos/worlds here, not in interaction code. */
import { communityLink, directoryLink, eventLink, instagramLink } from "./shanara-links";
export const siteLinks = {
  community: communityLink.href,
  directory: directoryLink,
  event: eventLink.href,
  instagram: instagramLink.href,
};
export const navigationLinks = [
  { href: "#vision", label: "החזון" },
  { href: "#experience", label: "החוויה" },
  { href: "#moments", label: "רגעים" },
  { href: "#albums", label: "אלבומים" },
  { href: "#join", label: "הדרך פנימה" },
  { href: "#connect", label: "נשארים בקשר" },
  { href: "/nirvana", label: "NIRVANA" },
];
export const motionSettings = { sideDistance: 125, galleryDistance: 165, photoDrift: 0.06, heroDrift: 0.35 };
export const experienceWorlds = [
  { id: "music", title: "מוזיקה", subtitle: "להרגיש את התדר", text: "מסע מוזיקלי שנבנה כדי להזיז את הגוף ולפתוח את התודעה. מהידיים על המיקסר ועד לרגע שבו כל הרחבה נעה יחד.", image: "/shanara-photos/PXBL3519.webp", alt: "די־ג׳יית מנגנת על רקע תפאורת לוטוס אדומה באירוע SHANARA" },
  { id: "people", title: "אנשים", subtitle: "להיות חלק מהמעגל", text: "קהילה שמגיעה מתוך כבוד, נוכחות וכוונה. נפגשים, רוקדים ומרגישים חופשיים להיות בדיוק מי שאנחנו.", image: "/event-community.jpg", alt: "אנשי צוות וחברים באירוע SHANARA" },
  { id: "nature", title: "טבע", subtitle: "לפתוח את המרחב", text: "אדמה מתחת לרגליים ושמיים מעל. המרחב, האור והתפאורה נפגשים עם המוזיקה והופכים לחלק מהחוויה.", image: "/shanara-photos/desert-canopy-artlead.webp", alt: "רחבת SHANARA תחת חופה אמנותית בין גבעות המדבר באור השקיעה" },
];
export const galleryPhotos = [
  { src: "/shanara-photos/PXBL3749.webp", width: 1920, height: 1281, alt: "מבט מאחורי עמדת הדי־ג׳יי אל רחבת SHANARA במדבר", caption: "מהעמדה ועד הרחבה — אותו החיבור.", className: "momentWide" },
  { src: "/shanara-photos/PXBL3262.webp", width: 1920, height: 1281, alt: "אמן אש מחייך במהלך מופע לילי באירוע SHANARA", caption: "אש, חיוך ורגע של קסם", className: "momentTall" },
  { src: "/shanara-photos/PXBL4235.webp", width: 1920, height: 2879, alt: "שלט ברחבת SHANARA: הרחבה היא המקום היחיד שבו אתה באמת אתה", caption: "הכוונה נמצאת בכל פרט", className: "momentLove" },
  { src: "/shanara-photos/ALX_4239.webp", width: 2048, height: 1365, alt: "הקהילה רוקדת תחת חופה צבעונית בין עצי היער", caption: "אנשים, צבע ואור בין העצים", className: "momentWide" },
];

export function photoSourceSet(src: string) {
  if (!src.startsWith("/shanara-photos/")) return undefined;
  const width = src.includes("ALX_4239") ? 2048 : src.includes("PXBL3717") ? 2400 : 1920;
  return `${src.replace(".webp", "-sm.webp")} 960w, ${src} ${width}w`;
}
