import { Label, Photo } from "@/components/ui";
import { data, team } from "@/lib/home-content";

/* "Meet The Team": the three leaders, portrait cards with name and role beneath. */
export default function Team() {
  return <section className="section team" data-tone="white" id="team" aria-labelledby="team-title">
    <div className="wrap">
      <header className="section-head center">
        <Label>{team.label}</Label>
        <h2 className="section-title" id="team-title" data-rise>{team.title}</h2>
      </header>
      <ul className="team-grid">
        {data.team.map((member) => <li key={member.id} className="person" data-card>
          <Photo src={member.image.src} width={member.image.width} height={member.image.height} alt={member.name} sizes="(max-width: 720px) 90vw, 30vw" />
          <h3>{member.name}</h3>
          <p>{member.role}</p>
        </li>)}
      </ul>
    </div>
  </section>;
}
