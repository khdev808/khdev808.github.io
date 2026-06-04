import './ThemeToggle.css';

const MODES = [
  { id: 'system', label: 'System', short: 'Auto' },
  { id: 'light', label: 'Light', short: 'Light' },
  { id: 'dark', label: 'Dark', short: 'Dark' },
];

export default function ThemeToggle({ preference, onChange }) {
  return (
    <div className="theme-toggle" role="group" aria-label="Color theme">
      {MODES.map(({ id, label, short }) => (
        <button
          key={id}
          type="button"
          className={`theme-toggle__btn ${preference === id ? 'theme-toggle__btn--active' : ''}`}
          onClick={() => onChange(id)}
          aria-pressed={preference === id}
          aria-label={`${label} theme`}
          title={`${label} theme`}
        >
          <span className="theme-toggle__icon" aria-hidden>
            {id === 'system' && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
            )}
            {id === 'light' && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            )}
            {id === 'dark' && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z" />
              </svg>
            )}
          </span>
          <span className="theme-toggle__label">{short}</span>
        </button>
      ))}
    </div>
  );
}
