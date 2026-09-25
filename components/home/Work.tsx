"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Arrow, Label, Photo } from "@/components/ui";
import { data, gallery } from "@/lib/home-content";

/* "Latest Work": the nine live site photos in one row that scrolls sideways inside itself (native scroll and snap,
   so touch, trackpad and keyboard all work). Prev / next step one photo; the page itself never scrolls sideways. */
export default function Work() {
  const rail = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const update = useCallback(() => {
    const el = rail.current; if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  }, []);
  useEffect(() => { update(); }, [update]);
  const step = (dir: number) => {
    const el = rail.current; if (!el) return;
    const item = el.querySelector("li");
    el.scrollBy({ left: dir * ((item?.clientWidth ?? 300) + 16), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  return <section className="section work" data-tone="base" id="work" aria-labelledby="work-title">
    <div className="wrap">
      <header className="section-head split-head">
        <div>
          <Label>{gallery.label}</Label>
          <h2 className="section-title" id="work-title" data-rise>{gallery.title}</h2>
        </div>
        <div className="rail-controls" data-appear>
          <button onClick={() => step(-1)} disabled={edge.start} aria-label="Previous photos" aria-controls="work-rail"><Arrow className="left" /></button>
          <button onClick={() => step(1)} disabled={edge.end} aria-label="Next photos" aria-controls="work-rail"><Arrow /></button>
        </div>
      </header>
    </div>
    <ul className="rail" id="work-rail" ref={rail} onScroll={update} tabIndex={0} aria-label="Site photos, scroll sideways" data-lenis-prevent-horizontal>
      {data.gallery.map((photo) => <li key={photo.id} data-card><Photo src={photo.image.src} width={photo.image.width} height={photo.image.height} alt={photo.alt} sizes="(max-width: 720px) 70vw, 28vw" /></li>)}
    </ul>
  </section>;
}
