import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Layout.css';

export default function Layout({ children }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (pathname === '/') {
      if (hash) {
        setTimeout(() => {
          const el = document.querySelector(hash);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (pathname.startsWith('/projects/')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return (
    <div className="layout">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main-content" className="layout__main">{children}</main>
      <Footer />
    </div>
  );
}
