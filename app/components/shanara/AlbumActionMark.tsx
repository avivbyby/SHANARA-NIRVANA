/** Vector on desktop, brand dot on mobile; never rendered as a platform emoji. */
export default function AlbumActionMark({ className = "" }: { className?: string }) {
  return <span className={`albumActionMark ${className}`} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" focusable="false"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>;
}
