import { useEffect, useState } from 'react';
import { fetchAppRatings } from '../lib/appStoreRating';

export function useAppRating(storeLinks, enabled = true) {
  const linksKey = storeLinks?.join('\0') ?? '';
  const [state, setState] = useState(() =>
    storeLinks?.length && enabled ? { status: 'loading' } : { status: 'idle' },
  );

  useEffect(() => {
    if (!storeLinks?.length || !enabled) {
      setState({ status: 'idle' });
      return undefined;
    }

    let cancelled = false;
    setState({ status: 'loading' });

    void fetchAppRatings(storeLinks)
      .then((data) => {
        if (cancelled) return;
        if (data.length === 0) setState({ status: 'error' });
        else setState({ status: 'success', data });
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error' });
      });

    return () => {
      cancelled = true;
    };
  }, [linksKey, enabled]);

  return state;
}
