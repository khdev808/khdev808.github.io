import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import './ProjectDetail.css';

const categoryLabels = { ai: 'AI', web: 'Web', mobile: 'Mobile' };

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="project-not-found">
        <h1>Project not found</h1>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="project-detail">
      <div className="project-detail__back-bar">
        <div className="container">
          <Link to="/#projects" className="project-detail__back-btn">
            <span className="project-detail__back-arrow" aria-hidden>←</span> Back to Projects
          </Link>
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
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="btn btn--primary"
              >
                {label}
              </a>
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
              <div className="project-content__block">
                <h3>Project Overview</h3>
                {project.overview.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="project-content__block">
                <h3>Key Features</h3>
                <ul>
                  {project.keyFeatures.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <p className="project-content__closing">{project.closingPara}</p>
              <div className="project-content__block">
                <h3>Tools Used</h3>
                <div className="project-content__tools">
                  {project.tools.map((tool) => (
                    <span key={tool} className="project-content__tool">{tool}</span>
                  ))}
                </div>
              </div>
              {project.links?.length > 0 && (
              <div className="project-content__links">
                <h3>See Live</h3>
                {project.links.map(({ label, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn--accent"
                  >
                    {label}
                  </a>
                ))}
              </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
