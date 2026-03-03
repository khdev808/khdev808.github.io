import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/#services', label: 'Services' },
  { to: '/#about', label: 'About' },
  { to: '/#projects', label: 'Work' },
  { to: '/#contact', label: 'Contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  const navigate = useNavigate();

  const handleNavClick = (to) => {
    closeMenu();
    if (to === '/') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
    } else {
      const hash = to.split('#')[1];
      const path = (to.split('#')[0] || '/').replace(/\/$/, '') || '/';
      if (location.pathname === '/' && path === '/') {
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState(null, '', to);
      } else {
        navigate(to);
      }
    }
  };

  return (
    <header className="header" role="banner">
      <div className="header__content">
        <button
          type="button"
          className="header__logo"
          aria-label="KHDev Home"
          onClick={() => { closeMenu(); handleNavClick('/'); }}
        >
          <img
            src="/assets/png/logo.png"
            alt="KHDev"
            className="header__logo-img"
          />
        </button>
        <nav className="header__nav">
          <ul className="header__links">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <button
                  type="button"
                  className={`header__link ${location.pathname === '/' && to === '/' ? 'header__link--active' : ''}`}
                  onClick={() => handleNavClick(to)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className="header__ham"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <img
            src="/assets/svg/ham-menu.svg"
            alt=""
            className={`header__ham-icon ${menuOpen ? 'header__ham-icon--hidden' : ''}`}
          />
          <img
            src="/assets/svg/ham-menu-close.svg"
            alt=""
            className={`header__ham-icon header__ham-icon--close ${!menuOpen ? 'header__ham-icon--hidden' : ''}`}
          />
        </button>
      </div>
      <div className={`header__mobile ${menuOpen ? 'header__mobile--open' : ''}`}>
        <ul className="header__mobile-links">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <button
                type="button"
                className="header__mobile-link"
                onClick={() => handleNavClick(to)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
