import { Check, Label } from "@/components/ui";
import { trust } from "@/lib/home-content";

/* "Why Businesses Trust Aboveboard Group": four accreditation cards and the six certification badges as a ruled
   strip. The live "Why Choose Aboveboard Group?" points repeat the Why and Trust sections, so they are left out. */
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
    </div>
  </section>;
}
