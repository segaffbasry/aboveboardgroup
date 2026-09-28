"use client";

import { useEffect, useState } from "react";
import { Arrow, Button, Label } from "@/components/ui";
import { data, howItWorks, tip, url } from "@/lib/home-content";

/* The live rotation: tip number = day of the year, modulo the 30 tips (same formula as the site's bundle). */
const tipFor = (date: Date) => data.tips[Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 864e5) % data.tips.length];
const dayLabel = (date: Date) => date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

/* "How It Works": the title and line as one wide head, the four steps as the reference's grey cards, then the
   live "Tip of the Day" underneath as its own visual tile: an orange calendar leaf with today's date, the tip, and
   a track of 30 dots showing where today sits in the rotation. */
export default function Process() {
  // Chosen after mount so a statically built page still shows today's tip, not the build day's.
  const [today, setToday] = useState<{ tip: (typeof data.tips)[number]; date: Date } | null>(null);
  useEffect(() => { const now = new Date(); setToday({ tip: tipFor(now), date: now }); }, []);
  const current = today?.tip ?? data.tips[0];
  const date = today?.date;

  return <section className="section process" data-tone="white" id="process" aria-labelledby="process-title">
    <div className="wrap">
      <header className="section-head split-head">
        <div>
          <Label>{howItWorks.label}</Label>
          <h2 className="section-title" id="process-title" data-rise>{howItWorks.title}</h2>
        </div>
        <p className="section-text" data-words>{howItWorks.text}</p>
      </header>
      <ol className="steps">
        {howItWorks.steps.map((step, i) => <li className="step" key={step.title} data-card>
          <span className="step-num" aria-hidden="true">0{i + 1}</span>
          <span className="step-when">{step.when}</span>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </li>)}
      </ol>
      <div className="process-cta" data-appear>
        <Button href={howItWorks.cta.href}>{howItWorks.cta.label}</Button>
        <p>Or <a href="#contact">send us a message</a> and we will respond within the hour</p>
      </div>

      <a className="tip" href={url(current.link)} data-card aria-live="polite">
        <span className="tip-leaf" aria-hidden="true">
          <span className="tip-weekday">{date ? date.toLocaleDateString("en-GB", { weekday: "long" }) : tip.label}</span>
          <span className="tip-date">{date ? date.getDate() : current.id}</span>
          <span className="tip-month">{date ? date.toLocaleDateString("en-GB", { month: "long" }) : ""}</span>
        </span>
        <div className="tip-body">
          <span className="label"><span className="label-rule" aria-hidden="true" />{tip.label}{date && <span className="sr-only">, {dayLabel(date)}</span>}</span>
          <h3>{current.title}</h3>
          <p>{current.text}</p>
          <span className="tip-foot">
            <span className="more">{tip.cta}<Arrow /></span>
            <span className="tip-track" role="img" aria-label={`Tip ${current.id} of ${data.tips.length}, ${tip.count}`}>
              {data.tips.map((t) => <i key={t.id} className={t.id === current.id ? "is-on" : ""} />)}
            </span>
          </span>
        </div>
      </a>
    </div>
  </section>;
}
