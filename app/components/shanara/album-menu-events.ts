/** One entry point for every Albums trigger (navigation, section and future buttons). */
export const OPEN_ALBUM_MENU = "shanara:open-album-menu";
export function requestAlbumMenu(trigger: HTMLElement) {
  // Let an existing native navigation dialog close before opening the next one.
  requestAnimationFrame(() => window.dispatchEvent(new CustomEvent(OPEN_ALBUM_MENU, { detail: { trigger } })));
}
