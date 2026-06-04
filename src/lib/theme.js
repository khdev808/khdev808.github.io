export const THEME_STORAGE_KEY = 'khdev-theme';

/** @typedef {'system' | 'light' | 'dark'} ThemePreference */
/** @typedef {'light' | 'dark'} ResolvedTheme */

/** @returns {ThemePreference} */
export function getStoredTheme() {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch {
    /* private browsing / blocked storage */
  }
  return 'system';
}

/** OS/browser color scheme; falls back to light when unavailable. */
export function getSystemTheme() {
  if (typeof window === 'undefined') return 'light';
  try {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch {
    /* unsupported */
  }
  return 'light';
}

/** @param {ThemePreference} preference */
export function resolveTheme(preference) {
  if (preference === 'dark') return 'dark';
  if (preference === 'light') return 'light';
  return getSystemTheme();
}

/** @param {ThemePreference} preference */
export function applyTheme(preference) {
  const resolved = resolveTheme(preference);
  const root = document.documentElement;
  root.setAttribute('data-theme', preference);
  root.setAttribute('data-resolved', resolved);
  root.style.colorScheme = resolved;

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', resolved === 'dark' ? '#0c1222' : '#0099dd');
  }
}

/** @param {ThemePreference} preference */
export function setStoredTheme(preference) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    /* ignore */
  }
  applyTheme(preference);
}

/** Bootstrap before React (also in index.html inline script). */
export function initTheme() {
  applyTheme(getStoredTheme());
}
