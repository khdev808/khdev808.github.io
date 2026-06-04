import androidStoreRatings from '../data/androidStoreRatings.json';
import iosStoreRatings from '../data/iosStoreRatings.json';

const androidRatingsByPackage = androidStoreRatings;
const iosRatingsByAppId = iosStoreRatings;

export function parseStoreLink(url) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();

    if (host.includes('apps.apple.com') || host.includes('itunes.apple.com')) {
      const idMatch = parsed.pathname.match(/\/id(\d+)/);
      if (idMatch?.[1]) return { platform: 'ios', storeId: idMatch[1] };
    }

    if (host.includes('play.google.com')) {
      const pkg = parsed.searchParams.get('id');
      if (pkg) return { platform: 'android', storeId: pkg };
    }
  } catch {
    return null;
  }
  return null;
}

export function isStoreLink(url) {
  return url != null && parseStoreLink(url) != null;
}

function parseItunesLookupJson(data, appId) {
  const app = data.results?.[0];
  const rating = app?.averageUserRating ?? app?.averageUserRatingForCurrentVersion;
  const ratingCount = app?.userRatingCount ?? app?.userRatingCountForCurrentVersion;
  if (rating == null || ratingCount == null || ratingCount <= 0) {
    throw new Error('App Store rating unavailable');
  }
  return {
    platform: 'ios',
    rating,
    ratingCount,
    appName: app.trackName ?? 'App Store app',
    storeUrl: app.trackViewUrl ?? `https://apps.apple.com/app/id${appId}`,
    fetchedAt: new Date().toISOString(),
  };
}

function fetchIosRatingJsonp(appId) {
  return new Promise((resolve, reject) => {
    const callback = `__itunes_cb_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const timeoutMs = 12000;
    let script = null;

    const cleanup = () => {
      window.clearTimeout(timer);
      delete window[callback];
      script?.remove();
    };

    const timer = window.setTimeout(() => {
      cleanup();
      reject(new Error('App Store lookup timed out'));
    }, timeoutMs);

    window[callback] = (data) => {
      cleanup();
      try {
        resolve(parseItunesLookupJson(data, appId));
      } catch (err) {
        reject(err instanceof Error ? err : new Error('App Store rating unavailable'));
      }
    };

    script = document.createElement('script');
    script.src = `https://itunes.apple.com/lookup?id=${encodeURIComponent(appId)}&country=us&callback=${callback}&_=${Date.now()}`;
    script.onerror = () => {
      cleanup();
      reject(new Error('App Store lookup failed'));
    };
    document.head.appendChild(script);
  });
}

function fetchIosRating(appId) {
  const entry = iosRatingsByAppId[appId];
  if (entry && hasDisplayableRating(entry.rating, entry.ratingCount)) {
    return Promise.resolve({ platform: 'ios', ...entry });
  }
  return fetchIosRatingJsonp(appId);
}

function fetchAndroidRating(packageId) {
  const entry = androidRatingsByPackage[packageId];
  if (!entry || !hasDisplayableRating(entry.rating, entry.ratingCount)) {
    throw new Error(`Google Play rating not available for ${packageId}`);
  }
  return { platform: 'android', ...entry };
}

export async function fetchAppRating(storeLink) {
  const parsed = parseStoreLink(storeLink.trim());
  if (!parsed) throw new Error('Not an App Store or Play Store URL');

  if (parsed.platform === 'ios') {
    return fetchIosRating(parsed.storeId);
  }
  return fetchAndroidRating(parsed.storeId);
}

export async function fetchAppRatings(storeLinks) {
  const unique = [...new Set(storeLinks.map((l) => l.trim()).filter(isStoreLink))];
  if (unique.length === 0) return [];

  const results = await Promise.all(
    unique.map((link) => fetchAppRating(link).catch(() => null)),
  );
  const ratings = results.filter(
    (r) => r != null && hasDisplayableRating(r.rating, r.ratingCount),
  );
  return sortRatingsByPlatform(ratings);
}

export function sortRatingsByPlatform(ratings) {
  const order = { ios: 0, android: 1 };
  return [...ratings].sort((a, b) => order[a.platform] - order[b.platform]);
}

export function formatRatingCount(count) {
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(
    count,
  );
}

export function formatRatingCountFull(count) {
  return new Intl.NumberFormat('en-US').format(count);
}

export function storePlatformLabel(platform) {
  return platform === 'ios' ? 'App Store' : 'Google Play';
}

export function hasDisplayableRating(rating, ratingCount) {
  return rating > 0 && ratingCount > 0;
}
