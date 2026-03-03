import { useParams } from 'react-router-dom';
import ButtonLink from '../components/ButtonLink';
import { projects } from '../data/projects';
import './ProjectDetail.css';

const categoryLabels = { ai: 'AI', web: 'Web', mobile: 'Mobile' };

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="project-detail project-detail--not-found">
        <div className="project-not-found">
          <h1>Project not found</h1>
          <ButtonLink to="/" variant="primary">Back to Home</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail">
      <div className="project-detail__back-bar">
        <div className="container">
          <ButtonLink to="/#projects" className="project-detail__back-btn" plain>
            <span className="project-detail__back-icon" aria-hidden>‹</span>
            View All Work
          </ButtonLink>
        </div>
      </div>
      <section className="project-hero">
        <div className="container">
          {(project.categories?.length || project.category) && (
            <span className="project-hero__badges">
              {(project.categories || [project.category]).map((cat) => (
                <span key={cat} className={`project-hero__badge project-hero__badge--${cat}`}>
                  {categoryLabels[cat] || cat}
                </span>
              ))}
            </span>
          )}
          <h1 className="project-hero__title">{project.title}</h1>
          <p className="project-hero__desc">{project.shortDesc}</p>
          {project.links?.length > 0 && (
          <div className="project-hero__cta">
            {project.links.map(({ label, url }) => (
              <ButtonLink key={label} href={url} variant="primary">
                {label}
              </ButtonLink>
            ))}
          </div>
          )}
        </div>
      </section>

      <section className="project-content">
        <div className="container">
          <div className="project-content__grid">
            <div className="project-content__img-wrap">
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                className="project-content__img"
              />
            </div>
            <div className="project-content__body">
              <section className="project-content__block project-content__block--overview">
                <h3>Project Overview</h3>
                {project.overview.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </section>
              <section className="project-content__block project-content__block--features">
                <h3>Key Features</h3>
                <ul>
                  {project.keyFeatures.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
              <blockquote className="project-content__closing">
                {project.closingPara}
              </blockquote>
              <section className="project-content__block project-content__block--tools">
                <h3>Tools Used</h3>
                <div className="project-content__tools">
                  {project.tools.map((tool) => (
                    <span key={tool} className="project-content__tool">{tool}</span>
                  ))}
                </div>
              </section>
              {project.links?.length > 0 && (
              <aside className="project-content__block project-content__block--cta">
                <h3>See Live</h3>
                <div className="project-content__links">
                  {project.links.map(({ label, url }) => (
                    <ButtonLink key={label} href={url} variant="accent">
                      {label}
                    </ButtonLink>
                  ))}
                </div>
              </aside>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
