import document from "./document.html?raw";

export function GET() {
  return new Response(document, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
