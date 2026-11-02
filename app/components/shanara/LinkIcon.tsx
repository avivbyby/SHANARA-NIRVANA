import type { LinkIconName } from "../../content/shanara-links";
export default function LinkIcon({ name }: { name: LinkIconName }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true" focusable="false">
    {name === "instagram" ? <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.4" cy="6.6" r=".8" fill="currentColor" stroke="none" /></> : name === "whatsapp" ? <><path d="M20.5 11.6a8.6 8.6 0 0 1-12.8 7.5L3 20.5l1.3-4.6a8.6 8.6 0 1 1 16.2-4.3Z" /><path d="M8 7.5c.8 4.7 3.6 7.6 8 8.5l1-2.4-2.5-1.2-1.2 1.2a8.5 8.5 0 0 1-3.1-3.1l1.1-1.2L10 7Z" /></> : <><path d="M3 6h18v4a2 2 0 0 0 0 4v4H3v-4a2 2 0 0 0 0-4V6Z" /><path d="M15 6v2m0 2v2m0 2v2m0 1v1" /></>}
  </svg>;
}
