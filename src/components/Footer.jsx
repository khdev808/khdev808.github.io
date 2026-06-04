import ButtonLink from './ButtonLink';
import './Footer.css';

const socialLinks = [
  { href: 'https://www.linkedin.com/company/khdev', label: 'LinkedIn', icon: 'linkedin' },
  { href: 'https://github.com/khdev808', label: 'GitHub', icon: 'github' },
];

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        <div className="footer__row">
          <div className="footer__social">
            <span className="footer__label">Social</span>
            <div className="footer__icons">
              {socialLinks.map(({ href, label, icon }) => (
                <ButtonLink
                  key={icon}
                  href={href}
                  className="footer__icon-link"
                  plain
                  aria-label={label}
                >
                  <img
                    src={`/assets/png/${icon}-ico.png`}
                    alt=""
                    className="footer__icon"
                  />
                </ButtonLink>
              ))}
            </div>
          </div>
          <div className="footer__brand">
            <span className="footer__brand-name">KHDev</span>
            <p className="footer__tagline">
              AI · Web · Mobile. We build products that scale.
            </p>
          </div>
        </div>
        <div className="footer__copyright">
          <p className="footer__copy">
            © {new Date().getFullYear()} KHDev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
