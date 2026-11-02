import { Children, isValidElement, type HTMLAttributes, type ReactNode } from "react";
/** Explicit lines preserve Hebrew reading order and keep React in charge of the DOM. */
export default function AnimatedHeading({ children, as: Tag = "h2", ...props }: HTMLAttributes<HTMLHeadingElement> & { as?: "h1" | "h2" }) {
  const lines: ReactNode[][] = [[]];
  Children.forEach(children, child => {
    if (isValidElement(child) && child.type === "br") lines.push([]);
    else lines[lines.length - 1].push(child);
  });
  return <Tag {...props}>{lines.map((line, index) => <span className="headingMask" key={index}><span className="motionLine" data-line={index}>{line}</span></span>)}</Tag>;
}
