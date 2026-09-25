import { Arrow, Label, Photo } from "@/components/ui";
import { data, services } from "@/lib/home-content";

/* "What Do You Need?" The reference's service cards: a white card with the photo on the left and the title,
   line and a small pill on the right. The photos are the company's own "Latest Work" shots. */
export default function Services() {
  return <section className="section services" data-tone="white" id="services" aria-labelledby="services-title">
    <div className="wrap">
      <header className="section-head center">
        <Label>{services.label}</Label>
        <h2 className="section-title" id="services-title" data-rise>{services.title}</h2>
        <p className="section-text" data-words>{services.text}</p>
      </header>
      <ul className="service-grid">
        {services.items.map((item) => {
          const photo = data.gallery[item.photo - 1].image;
          return <li key={item.title} data-card>
            <a className="service-card" href={item.href} {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              <Photo src={photo.src} width={photo.width} height={photo.height} sizes="(max-width: 720px) 40vw, 18vw" />
              <div className="service-body">
                <h3>{item.title}</h3>
                <span className="service-text">{item.text}</span>
                <span className="chip-cta">{item.cta}<span className="chip-disc" aria-hidden="true"><Arrow /></span></span>
              </div>
              {item.external && <span className="sr-only"> (opens eco-fix.uk in a new tab)</span>}
            </a>
          </li>;
        })}
      </ul>
    </div>
  </section>;
}
