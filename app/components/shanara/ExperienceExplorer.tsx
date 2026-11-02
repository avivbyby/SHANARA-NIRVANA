"use client";
import { Arrow } from "./Primitives";
import { useRef, useState } from "react";
import { experienceWorlds, photoSourceSet } from "../../content/shanara";
export default function ExperienceExplorer() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const world = experienceWorlds[active];
  return <div className="experienceExplorer sectionPad">
    <p className="explorerHint">בחרו מה מסקרן אתכם וגלו את החוויה.</p>
    <div className="worldTabs" role="tablist" aria-label="העולמות של שנארה">
      {experienceWorlds.map((item, index) => <button key={item.id} id={`world-tab-${item.id}`} ref={el => { buttons.current[index] = el; }} role="tab" type="button" aria-selected={index === active} aria-controls="world-panel" tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => {
        let next = active;
        if (event.key === "ArrowLeft") next = (active + 1) % experienceWorlds.length;
        else if (event.key === "ArrowRight") next = (active - 1 + experienceWorlds.length) % experienceWorlds.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = experienceWorlds.length - 1;
        else return;
        event.preventDefault(); setActive(next); buttons.current[next]?.focus();
      }}><span>0{index + 1}</span>{item.title}<Arrow direction="up-right" /></button>)}
    </div>
    <div id="world-panel" role="tabpanel" aria-labelledby={`world-tab-${world.id}`} tabIndex={0} className="worldPanel">
      <figure key={world.id} className="worldPhoto motionPhotoFrame"><img src={world.image} srcSet={photoSourceSet(world.image)} sizes="(max-width: 900px) 100vw, 60vw" alt={world.alt} loading="lazy" width={1920} height={1281} /></figure>
      <div key={`${world.id}-copy`} className="worldCopy"><p className="kicker">{world.title}</p><h3>{world.subtitle}</h3><p>{world.text}</p><a href="#moments">לרגעים מתוך המעגל <Arrow direction="down" /></a></div>
    </div>
  </div>;
}
