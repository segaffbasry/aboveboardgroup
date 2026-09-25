"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { registerMotion } from "@/components/motion";
import { Button, Label, Photo, reducedMotion } from "@/components/ui";
import { about, data } from "@/lib/home-content";

/* "Built By Engineers, For Engineers". The reference's about block: a tall photo card on the left and a white
   content card on the right, on the grey ground. The three live counters count up once, as they do on the site. */
export default function About() {
  const stats = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const el = stats.current; if (!el || reducedMotion()) return;
    registerMotion();
    const numbers = Array.from(el.querySelectorAll<HTMLElement>("[data-count]"));
    const ctx = gsap.context(() => {
      numbers.forEach((n) => { n.textContent = "0"; });
      ScrollTrigger.create({
        trigger: el, start: "top 85%", once: true,
        onEnter: () => numbers.forEach((n) => {
          const target = Number(n.dataset.count), state = { v: 0 };
          gsap.to(state, { v: target, duration: 1.6, ease: "power2.out", onUpdate: () => { n.textContent = Math.round(state.v).toLocaleString("en-GB"); } });
        }),
      });
    }, el);
    return () => { ctx.revert(); numbers.forEach((n) => { n.textContent = Number(n.dataset.count).toLocaleString("en-GB"); }); };
  }, []);

  const photo = data.gallery[about.photo - 1].image;
  return <section className="section about" data-tone="base" id="about" aria-labelledby="about-title">
    <div className="wrap split">
      <div className="about-photo" data-image data-parallax><Photo src={photo.src} width={photo.width} height={photo.height} alt="Aboveboard Group site work" sizes="(max-width: 960px) 100vw, 48vw" /></div>
      <div className="card about-card">
        <Label>{about.label}</Label>
        <h2 className="section-title" id="about-title" data-rise>{about.title[0]}<br />{about.title[1]}</h2>
        {about.paragraphs.map((text) => <p className="section-text" key={text.slice(0, 20)} data-words>{text}</p>)}
        <div className="button-row" data-appear>
          <Button href={about.ctas[0].href}>{about.ctas[0].label}</Button>
          <Button href={about.ctas[1].href} variant="line">{about.ctas[1].label}</Button>
        </div>
        <ul className="stats" ref={stats}>
          {data.stats.map((stat) => <li key={stat.id} data-appear>
            <span className="stat-value"><span data-count={stat.value}>{stat.value.toLocaleString("en-GB")}</span>{stat.suffix}</span>
            <span className="stat-label">{stat.label}</span>
          </li>)}
        </ul>
      </div>
    </div>
  </section>;
}
