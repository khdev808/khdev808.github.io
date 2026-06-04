import galleryManifest from '../data/portfolioGallery.json';

function fileNameFromGalleryUrl(url) {
  const segment = url.split('/').pop() ?? '';
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

export function sortGalleryUrls(urls) {
  return [...urls].sort((a, b) =>
    fileNameFromGalleryUrl(a).localeCompare(fileNameFromGalleryUrl(b), undefined, {
      numeric: true,
      sensitivity: 'base',
    }),
  );
}

export function getGalleryPathsForIds(galleryIds) {
  const urls = [];
  for (const id of galleryIds) {
    const paths = galleryManifest[id];
    if (paths?.length) urls.push(...paths);
  }
  return sortGalleryUrls([...new Set(urls)]);
}

/** Slider images for a project; falls back to single `image` when no gallery is mapped. */
export function getProjectSliderImages(project) {
  const ids = project.galleryIds ?? (project.galleryId ? [project.galleryId] : []);
  const gallery = getGalleryPathsForIds(ids);
  if (gallery.length > 0) return gallery;
  if (project.image) return [project.image];
  return [];
}
