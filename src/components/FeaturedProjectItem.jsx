import { useMemo } from 'react';
import ButtonLink from './ButtonLink';
import AppStoreRating from './AppStoreRating';
import ProjectImageSlider from './ProjectImageSlider';
import { getProjectSliderImages } from '../lib/portfolioGallery';
import { getStoreLinksFromProject, projectHasStoreRating } from '../lib/projectStoreLinks';

const categoryLabels = { ai: 'AI', web: 'Web', mobile: 'Mobile' };

export default function FeaturedProjectItem({ project, layoutClass }) {
  const storeLinks = useMemo(() => getStoreLinksFromProject(project), [project]);
  const sliderImages = useMemo(() => getProjectSliderImages(project), [project]);
  const showRatings = projectHasStoreRating(project);

  return (
    <article className={`projects__item ${layoutClass}`.trim()}>
      <div className="projects__img-wrap">
        <ProjectImageSlider
          images={sliderImages}
          alt={`${project.title} screenshot`}
          variant="card"
        />
        {(project.categories?.length || project.category) && (
          <span className="projects__badges">
            {(project.categories || [project.category]).map((cat) => (
              <span key={cat} className={`projects__badge projects__badge--${cat}`}>
                {categoryLabels[cat] || cat}
              </span>
            ))}
          </span>
        )}
      </div>
      <div className="projects__body">
        <h3 className="projects__title">{project.title}</h3>
        {showRatings && (
          <div className="projects__ratings">
            <AppStoreRating storeLinks={storeLinks} variant="compact" />
          </div>
        )}
        <p className="projects__desc">{project.shortDesc}</p>
        <ButtonLink to={`/projects/${project.slug}`} variant="accent">
          Case Study
        </ButtonLink>
      </div>
    </article>
  );
}
