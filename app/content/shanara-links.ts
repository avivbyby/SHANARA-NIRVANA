/**
 * SHANARA's editable link directory, copied from https://taplink.cc/shanara_legacy.
 * Edit href/label here once; all buttons and sections consume this data.
 * Add an album or connection to its array to render it automatically.
 */
export type LinkIconName = "instagram" | "whatsapp" | "ticket";
export type ConnectionLink = {
  id: string;
  label: string;
  eyebrow: string;
  description: string;
  action: string;
  href: string;
  icon: LinkIconName;
};
export type AlbumLink = { id: string; label: string; href: string; platform?: string };
export type AlbumEvent = { id: string; label: string; albums: AlbumLink[] };
export const directoryLink = "https://taplink.cc/shanara_legacy";
export const eventLink: ConnectionLink = {
  id: "all-stars", label: "All Stars", eyebrow: "נפגשים ברחבה", icon: "ticket",
  description: "כל פרטי האירוע והכרטיסים מחכים לכם בעמוד All Stars.", action: "לעמוד האירוע",
  href: "https://zygo.co.il/event/698cbb46740bbd0327f146fb?tl=OXA2",
};
export const communityLink: ConnectionLink = {
  id: "whatsapp", label: "המעגל שלנו", eyebrow: "קהילת הוואטסאפ", icon: "whatsapp",
  description: "ממשיכים את החיבור גם בין המפגשים. הצטרפו לקהילה שלנו בוואטסאפ.", action: "להצטרפות לקהילה",
  href: "https://chat.whatsapp.com/BE0FNMEybINEyQLG83KuOj?mode=ac_c",
};
export const instagramLink: ConnectionLink = {
  id: "instagram", label: "shanara.legacy", eyebrow: "באינסטגרם", icon: "instagram",
  description: "רגעים מהרחבה, עדכונים ושיחה אישית דרך ההודעות באינסטגרם.", action: "לעמוד האינסטגרם",
  href: "https://instagram.com/shanara.legacy",
};
export const connectionLinks: ConnectionLink[] = [instagramLink, communityLink, eventLink];
/** Each event owns its albums. Add another album inside that event's albums array. */
export const albumEvents: AlbumEvent[] = [
  { id: "all-stars", label: "All Stars", albums: [
    { id: "sapir-levy", label: "Sapir Levy", platform: "Adobe Lightroom", href: "https://lightroom.adobe.com/shares/af15e43f976a49cc8c1d70c1946a3044" },
    { id: "rotem", label: "Rotem", platform: "Google Photos", href: "https://photos.app.goo.gl/m5u7izGsMinckmtB6" },
  ] },
  { id: "femina", label: "FEMINA", albums: [
    { id: "femina-gallery", label: "האלבום המלא", platform: "Pixieset", href: "https://pixelbel.pixieset.com/shanaralegacyfemina/" },
  ] },
  { id: "retronara", label: "Retronara", albums: [
    { id: "retronara-gallery", label: "האלבום המלא", platform: "Pixieset", href: "https://pixelbel.pixieset.com/shanaralegacy/#" },
  ] },
  { id: "back-to-the-source", label: "Back to the source", albums: [
    { id: "source-gallery", label: "האלבום המלא", platform: "Pixieset", href: "https://shelchyk.pixieset.com/shanaralegacy/" },
  ] },
  { id: "fire-ceremony", label: "Fire ceremony", albums: [
    { id: "fire-gallery", label: "האלבום המלא", platform: "Pixieset", href: "https://alexoosherov.pixieset.com/shanaralegacy/" },
  ] },
  { id: "mishmash", label: "SHANARA & Mishmash", albums: [
    { id: "mishmash-gallery", label: "האלבום המלא", platform: "Pixieset", href: "https://lidorpeerartlead.pixieset.com/shanara/" },
  ] },
];
