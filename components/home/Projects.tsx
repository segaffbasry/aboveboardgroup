import { Arrow, Label, More, Photo } from "@/components/ui";
import { data, projects } from "@/lib/home-content";

/* "Recent Projects": the four live portfolio entries as white cards on the grey ground. Building photos fill their
   frame; the Lidl logo is a logo, so it is shown whole ("contain") on a white tile. */
export default function Projects() {
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
        {data.projects.map((project) => {
          const logo = project.name === "Lidl";
          return <li key={project.id} data-card>
            <a className="project-card" href="#contact">
              <Photo src={project.image.src} width={project.image.width} height={project.image.height} alt={project.name} fit={logo ? "contain" : "cover"} sizes="(max-width: 720px) 100vw, 44vw" />
              <div className="project-body">
                <span className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</span>
                <span className="project-place">{project.location}</span>
                <h3>{project.name}</h3>
                <span className="project-service">{project.service}</span>
                <span className="project-text">{project.description}</span>
                <span className="chip-cta">{projects.enquire}<span className="chip-disc" aria-hidden="true"><Arrow /></span></span>
              </div>
            </a>
          </li>;
        })}
      </ul>
      <div className="section-foot" data-appear><More href={projects.all.href}>{projects.all.label}</More></div>
    </div>
  </section>;
}
