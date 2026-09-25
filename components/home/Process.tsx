"use client";

import { useEffect, useState } from "react";
import { Arrow, Button, Label } from "@/components/ui";
import { data, howItWorks, tip, url } from "@/lib/home-content";

/* The live rotation: tip number = day of the year, modulo the 30 tips (same formula as the site's bundle). */
const tipFor = (date: Date) => data.tips[Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 864e5) % data.tips.length];
const dayLabel = (date: Date) => date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

/* "How It Works". The reference's booking-process block: the title and line on the left beside the live "Tip of
   the Day" card, then the four steps as grey cards with a big step number. */
export default function Process() {
  // Chosen after mount so a statically built page still shows today's tip, not the build day's.
  const [today, setToday] = useState<{ tip: (typeof data.tips)[number]; day: string } | null>(null);
  useEffect(() => { const now = new Date(); setToday({ tip: tipFor(now), day: dayLabel(now) }); }, []);
  const current = today?.tip ?? data.tips[0];

  return <section className="section process" data-tone="white" id="process" aria-labelledby="process-title">
    <div className="wrap">
      <div className="process-head">
        <header className="section-head">
          <Label>{howItWorks.label}</Label>
          <h2 className="section-title" id="process-title" data-rise>{howItWorks.title}</h2>
          <p className="section-text" data-words>{howItWorks.text}</p>
        </header>
        <a className="tip card" href={url(current.link)} data-card aria-live="polite">
          <span className="tip-top"><span className="label"><span className="label-rule" aria-hidden="true" />{tip.label}</span><span className="tip-day">{today?.day ?? ""}</span></span>
          <h3>{current.title}</h3>
          <p>{current.text}</p>
          <span className="tip-foot"><span className="more">{tip.cta}<Arrow /></span><span>{tip.count}</span></span>
        </a>
      </div>
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
    </div>
  </section>;
}
