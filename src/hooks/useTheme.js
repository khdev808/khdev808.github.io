import { useCallback, useEffect, useState } from 'react';
import {
  applyTheme,
  getStoredTheme,
  getSystemTheme,
  resolveTheme,
  setStoredTheme,
} from '../lib/theme';

export function useTheme() {
  const [preference, setPreference] = useState(getStoredTheme);
  const [resolved, setResolved] = useState(() => resolveTheme(getStoredTheme()));

  const syncResolved = useCallback((pref) => {
    const next = resolveTheme(pref);
    setResolved(next);
    applyTheme(pref);
  }, []);

  useEffect(() => {
    syncResolved(preference);
  }, [preference, syncResolved]);

  useEffect(() => {
    if (preference !== 'system') return undefined;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => syncResolved('system');

    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [preference, syncResolved]);

  const setTheme = useCallback((next) => {
    setPreference(next);
    setStoredTheme(next);
  }, []);

  return {
    preference,
    resolved,
    setTheme,
    isDark: resolved === 'dark',
    systemTheme: getSystemTheme(),
  };
}
