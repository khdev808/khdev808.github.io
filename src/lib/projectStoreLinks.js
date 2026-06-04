import { isStoreLink } from './appStoreRating';

/** App Store / Play Store URLs from a project's `links` array. */
export function getStoreLinksFromProject(project) {
  const links = [];
  for (const { url } of project.links ?? []) {
    const trimmed = url?.trim();
    if (trimmed && isStoreLink(trimmed) && !links.includes(trimmed)) {
      links.push(trimmed);
    }
  }
  return links;
}

export function projectHasStoreRating(project) {
  return getStoreLinksFromProject(project).length > 0;
}
