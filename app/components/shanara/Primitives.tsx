type ArrowDirection = "left" | "right" | "down" | "up-right";
/** SVG paths keep directional controls consistent across iOS and desktop fonts. */
export const Arrow = ({ direction = "left", navigation = false }: { direction?: ArrowDirection; navigation?: boolean }) => <span className={`directionMark direction-${direction}${navigation ? " directionControl" : ""}`} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" focusable="false"><path d="M19 12H5m7-7-7 7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>;
