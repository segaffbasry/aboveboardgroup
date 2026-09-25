"use client";

import { useState } from "react";
import { Arrow, Label, More } from "@/components/ui";
import { commercial, coverage, guides } from "@/lib/home-content";

/* The live homepage's long "Commercial Air Conditioning" block, kept whole but made browsable:
   the intro, then systems and sectors as two tabs of linked rows (both lists stay in the HTML for no-JS and search),
   the coverage areas as chips grouped by county, and the four featured guides as cards. */
export default function Commercial() {
  const lists = [commercial.systems, commercial.clients];
  const [tab, setTab] = useState(0);
  return <section className="section commercial" data-tone="base" id="commercial" aria-labelledby="commercial-title" data-soft>
    <div className="wrap">
      <header className="section-head split-head">
        <div>
          <Label>{commercial.label}</Label>
          <h2 className="section-title" id="commercial-title" data-rise>{commercial.title}</h2>
        </div>
        <div>{commercial.paragraphs.map((text) => <p className="section-text" key={text.slice(0, 20)} data-words>{text}</p>)}</div>
      </header>

      <div className="card lists">
        <div className="tabs" role="tablist" aria-label="Commercial air conditioning" data-appear>
          {lists.map((list, i) => <button key={list.title} id={`ctab-${i}`} role="tab" aria-selected={tab === i} aria-controls={`cpanel-${i}`} tabIndex={tab === i ? 0 : -1} onClick={() => setTab(i)}
            onKeyDown={(event) => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { const next = (i + 1) % 2; setTab(next); document.getElementById(`ctab-${next}`)?.focus(); } }}>{list.title}</button>)}
        </div>
        {lists.map((list, i) => <ul key={list.title} id={`cpanel-${i}`} role="tabpanel" aria-labelledby={`ctab-${i}`} className="rows" hidden={tab !== i}>
          {list.items.map((item) => <li key={item.title}><a href={item.href}><h3>{item.title}</h3><p>{item.text}</p><Arrow /></a></li>)}
        </ul>)}
      </div>

      <div className="coverage">
        <div>
          <h3 className="sub-title" data-rise>{coverage.title}</h3>
          <p className="section-text" data-words>{coverage.text}</p>
          <div data-appear><More href={coverage.all.href}>{coverage.all.label}</More></div>
        </div>
        <div className="areas">
          {coverage.groups.map((group) => <div key={group.name} data-appear>
            <h4>{group.name}</h4>
            <ul className="chips">{group.areas.map((area) => <li key={area.href}><a href={area.href}>{area.name}</a></li>)}</ul>
          </div>)}
        </div>
      </div>

      <div className="guides">
        <div className="split-head guides-head">
          <h3 className="sub-title" data-rise>{guides.title}</h3>
          <div data-appear><More href={guides.all.href}>{guides.all.label}</More></div>
        </div>
        <ul className="guide-grid">
          {guides.items.map((guide, i) => <li key={guide.href} data-card><a className="guide" href={guide.href}><span className="guide-num">0{i + 1}</span><h4>{guide.title}</h4><p>{guide.text}</p><Arrow /></a></li>)}
        </ul>
      </div>
    </div>
  </section>;
}
