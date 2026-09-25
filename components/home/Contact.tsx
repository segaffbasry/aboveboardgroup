import { Button, Label } from "@/components/ui";
import { contactSection as contact, phone } from "@/lib/home-content";

/* "Need AC Labour or Project Support?" The reference's booking block: details on the left, the action card on the
   right. The card is the page's one navy anchor above the footer. Enquiries go to the live contact page, which
   hosts the real form, so the demo never submits anything. */
export default function Contact() {
  return <section className="section contact" data-tone="base" id="contact" aria-labelledby="contact-title" data-soft>
    <div className="wrap split contact-split">
      <div>
        <header className="section-head">
          <Label>{contact.label}</Label>
          <h2 className="section-title" id="contact-title" data-rise>{contact.title[0]}<br />{contact.title[1]}</h2>
          <p className="section-text" data-words>{contact.text}</p>
        </header>
        <dl className="methods">
          {contact.methods.map((method) => <div key={method.label} data-appear>
            <dt>{method.label}</dt>
            <dd>{method.href ? <a href={method.href}>{method.value}</a> : method.value}</dd>
          </div>)}
        </dl>
      </div>
      <div className="quote-card" data-tone="navy" data-card>
        <h3>{contact.quote.title}</h3>
        <p>{contact.quote.text}</p>
        <div className="button-row">
          <Button href={contact.quote.cta.href} variant="white">{contact.quote.cta.label}</Button>
          <Button href={phone.href} variant="line">Call {phone.label}</Button>
        </div>
      </div>
    </div>
  </section>;
}
