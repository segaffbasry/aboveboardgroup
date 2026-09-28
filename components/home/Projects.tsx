import { Arrow, Label, More, Photo } from "@/components/ui";
import { data, projects } from "@/lib/home-content";

/* "Recent Projects" as one row of three white cards on the grey ground: Splashes Leisure Centre, the Royal College
   and Lidl Fulham. Lidl's card uses a store interior (credited, as its licence asks) instead of the Lidl logo. */
export default function Projects() {
  const shown = data.projects.filter((project) => !projects.hide.includes(project.id));
  return <section className="section projects" data-tone="base" id="projects" aria-labelledby="projects-title">
    <div className="wrap">
      <header className="section-head split-head">
        <div>
          <Label>{projects.label}</Label>
          <h2 className="section-title" id="projects-title" data-rise>{projects.title}</h2>
        </div>
        <p className="section-text" data-words>{projects.text}</p>
      </header>
      <ul className="project-grid">
        {shown.map((project) => {
          const lidl = project.name === "Lidl";
          const image = lidl ? projects.lidl.image : project.image;
          return <li key={project.id} className="project" data-card>
            <a className="project-card" href="#contact">
              <Photo src={image.src} width={image.width} height={image.height} alt={lidl ? projects.lidl.alt : project.name} sizes="(max-width: 960px) 100vw, 30vw" />
              <div className="project-body">
                <span className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</span>
                <span className="project-place">{project.location}</span>
                <h3>{project.name}</h3>
                <span className="project-service">{project.service}</span>
                <span className="project-text">{project.description}</span>
                <span className="chip-cta">{projects.enquire}<span className="chip-disc" aria-hidden="true"><Arrow /></span></span>
              </div>
            </a>
            {lidl && <a className="credit" href={projects.lidl.credit.href} target="_blank" rel="noopener noreferrer">{projects.lidl.credit.label}<span className="sr-only"> (opens Wikimedia Commons in a new tab)</span></a>}
          </li>;
        })}
      </ul>
      <div className="section-foot" data-appear><More href={projects.all.href}>{projects.all.label}</More></div>
    </div>
  </section>;
}
