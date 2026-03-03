import ButtonLink from '../components/ButtonLink';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__desc">Page not found</p>
      <ButtonLink to="/" variant="primary">
        Back to Home
      </ButtonLink>
    </div>
  );
}
