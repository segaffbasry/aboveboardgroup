"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { registerMotion } from "@/components/motion";
import { Button, Photo, reducedMotion } from "@/components/ui";
import { RISE, appear, reveal } from "@/lib/ease";
import { data, hero, trust } from "@/lib/home-content";
import { splitMask } from "@/lib/split";

/* One full screen (100svh), split in two. Left: the live hero's eyebrow, headline, line and CTAs, plus three of
   the site's own trust claims. Right: the live hero photograph in the reference's rounded frame, with the live
   "Get a Quick Commercial Quote" panel sitting in it. Phones and tablets stack the two.
   Its entrance waits for the preloader's intro:done event, so the two overlap into one moment. */
export default function Hero() {
  const stage = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = stage.current; if (!el) return;
    registerMotion();
    const title = el.querySelector<HTMLElement>(".hero-title")!;
    const words = splitMask(title);
    const ctx = gsap.context(() => {
      const play = () => {
        if (reducedMotion()) { words.revert(); return; }
        gsap.timeline({ onComplete: () => words.revert() })
          .fromTo(".hero-frame", { y: RISE * 2, clipPath: "inset(6% 4% 0% 4% round 24px)" }, { y: 0, clipPath: "inset(0% 0% 0% 0% round 24px)", duration: reveal.duration * 1.4, ease: reveal.ease, clearProps: "transform,clipPath" }, 0)
          .fromTo(".hero-frame img", { scale: 1.14 }, { scale: 1, duration: 2, ease: "power2.out", clearProps: "transform" }, 0)
          .fromTo(words.inner, { yPercent: 110 }, { yPercent: 0, duration: reveal.duration, ease: reveal.ease, stagger: .04 }, .1)
          .fromTo("[data-hero-appear]", { opacity: 0, y: RISE / 2 }, { opacity: 1, y: 0, duration: reveal.duration, ease: reveal.ease, stagger: appear.step, clearProps: "transform" }, .35)
          .fromTo(".hero-quote", { opacity: 0, y: RISE }, { opacity: 1, y: 0, duration: reveal.duration, ease: reveal.ease, clearProps: "transform" }, .6);
      };
      if (!reducedMotion()) {
        gsap.set(words.inner, { yPercent: 110 });
        gsap.set(".hero-frame", { y: RISE * 2 });
        gsap.set(["[data-hero-appear]", ".hero-quote"], { opacity: 0 });
      }
      if (document.documentElement.dataset.intro === "done") play();
      else document.addEventListener("intro:done", play, { once: true });
    }, el);
    return () => { ctx.revert(); words.revert(); };
  }, []);

  return <section className="hero" ref={stage} data-tone="base" aria-labelledby="hero-title">
    <div className="hero-grid">
      <div className="hero-copy">
        <p className="label" data-hero-appear><span className="label-rule" aria-hidden="true" />{hero.eyebrow}</p>
        <h1 className="hero-title" id="hero-title">{hero.title[0]} <span className="hero-sub">{hero.title[1]}</span></h1>
        <p className="hero-text" data-hero-appear>{hero.text}</p>
        <div className="hero-ctas" data-hero-appear>
          <Button href={hero.call.href}>{hero.call.label}</Button>
          <Button href={hero.contact.href} variant="line">{hero.contact.label}</Button>
        </div>
        <ul className="hero-proof" data-hero-appear aria-label="Accreditations">
          {trust.cards.slice(0, 3).map((card) => <li key={card.title}>{card.title}</li>)}
        </ul>
      </div>
      <div className="hero-frame">
        <Photo src={data.hero.src} width={data.hero.width} height={data.hero.height} alt="Commercial Air Conditioning Installation" priority sizes="(max-width: 960px) 100vw, 55vw" />
        <div className="hero-quote">
          <h2>{hero.quote.title}</h2>
          <p>{hero.quote.text}</p>
          <Button href="#contact" compact>{hero.quote.cta}</Button>
        </div>
      </div>
    </div>
  </section>;
}
