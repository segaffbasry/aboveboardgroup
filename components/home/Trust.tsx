import { Check, Label } from "@/components/ui";
import { trust } from "@/lib/home-content";

/* "Why Businesses Trust Aboveboard Group" with the live "Why Choose Aboveboard Group?" points folded in: four
   accreditation cards, the six certification badges as a ruled strip, then the eight reasons in two columns. */
export default function Trust() {
  return <section className="section trust" data-tone="white" id="trust" aria-labelledby="trust-title" data-soft>
    <div className="wrap">
      <header className="section-head center">
        <Label>{trust.label}</Label>
        <h2 className="section-title" id="trust-title" data-rise>{trust.title}</h2>
      </header>
      <ul className="trust-grid">
        {trust.cards.map((card, i) => <li key={card.title} className="trust-card" data-card>
          <span className="step-num" aria-hidden="true">0{i + 1}</span>
          <h3>{card.title}</h3>
          <p>{card.text}</p>
        </li>)}
      </ul>
      <ul className="badges" aria-label="Certifications" data-appear>{trust.badges.map((badge) => <li key={badge}><Check />{badge}</li>)}</ul>
      <div className="choose">
        <h3 className="sub-title" data-rise>{trust.choose.title}</h3>
        <ul className="choose-grid">
          {trust.choose.items.map((item) => <li key={item.title} data-appear>
            <h4>{"href" in item && item.href ? <a href={item.href}>{item.title}</a> : item.title}</h4>
            <p>{item.text}</p>
          </li>)}
        </ul>
      </div>
    </div>
  </section>;
}
