import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Renders a button that navigates on click. Uses no href, so no URL
 * is shown in the browser status bar when hovering.
 * @param {boolean} plain - When true, skip .btn styles (use only className)
 */
export default function ButtonLink({ to, href, children, className, variant, onClick, disabled, plain, ...rest }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    if (disabled) return;
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else if (to) {
      if (to.startsWith('/#')) {
        const hash = to.split('#')[1];
        const path = (to.split('#')[0] || '/').replace(/\/$/, '') || '/';
        if (location.pathname !== '/' || path !== '/') {
          navigate(to);
        } else {
          const el = document.getElementById(hash);
          el?.scrollIntoView({ behavior: 'smooth' });
          window.history.replaceState(null, '', to);
        }
      } else {
        navigate(to);
      }
    }
  };

  const classes = plain ? className : ['btn', variant && `btn--${variant}`, className].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={classes}
      onClick={handleClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
