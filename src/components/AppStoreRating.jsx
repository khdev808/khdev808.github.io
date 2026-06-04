import { useAppRating } from '../hooks/useAppRating';
import {
  formatRatingCount,
  formatRatingCountFull,
  hasDisplayableRating,
  sortRatingsByPlatform,
  storePlatformLabel,
} from '../lib/appStoreRating';
import './AppStoreRating.css';

const STAR_PATH =
  'M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z';

function StarIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path d={STAR_PATH} fill="currentColor" />
    </svg>
  );
}

function StarRating({ rating, sizeRem = 1.8 }) {
  const clamped = Math.min(5, Math.max(0, rating));
  const full = Math.floor(clamped);
  const partial = clamped - full;
  const sizeStyle = { width: `${sizeRem}rem`, height: `${sizeRem}rem` };

  return (
    <div className="app-store-rating__stars" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = i < full ? 1 : i === full && partial >= 0.25 ? partial : 0;
        return (
          <span key={i} className="app-store-rating__star-wrap" style={sizeStyle}>
            <StarIcon className="app-store-rating__star app-store-rating__star--empty" />
            {fill > 0 && (
              <span
                className="app-store-rating__star-fill"
                style={{ width: `${Math.min(1, fill) * 100}%` }}
              >
                <StarIcon className="app-store-rating__star app-store-rating__star--filled" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

function StoreBadge({ platform }) {
  const label = platform === 'ios' ? 'App Store' : 'Google Play';
  return (
    <span className={`app-store-rating__badge app-store-rating__badge--${platform}`}>
      {label}
    </span>
  );
}

function RatingSkeleton({ variant, slotCount }) {
  const dual = slotCount >= 2;
  if (variant === 'compact') {
    return (
      <div
        className={`app-store-rating__skeleton app-store-rating__skeleton--compact ${dual ? 'app-store-rating__skeleton--dual' : ''}`}
        aria-hidden
      />
    );
  }
  return (
    <div
      className={`app-store-rating__skeleton app-store-rating__skeleton--detail ${dual ? 'app-store-rating__skeleton--dual' : ''}`}
      aria-hidden
    />
  );
}

function CompactRatingRow({ data }) {
  const score = data.rating.toFixed(1);
  const label = storePlatformLabel(data.platform);
  const countLabel =
    data.ratingCount === 1
      ? '1 rating'
      : `${formatRatingCount(data.ratingCount)} ratings`;
  const ariaLabel = `${score} out of 5 stars, ${formatRatingCountFull(data.ratingCount)} ratings on ${label}`;

  return (
    <article className="app-store-rating__tile" aria-label={ariaLabel}>
      <StoreBadge platform={data.platform} />
      <div className="app-store-rating__tile-main">
        <div className="app-store-rating__tile-score-row">
          <span className="app-store-rating__score">{score}</span>
          <StarRating rating={data.rating} sizeRem={1.6} />
        </div>
        <p className="app-store-rating__count">{countLabel}</p>
      </div>
    </article>
  );
}

function CompactRatings({ ratings }) {
  const dual = ratings.length > 1;
  return (
    <div className={`app-store-rating__grid ${dual ? 'app-store-rating__grid--dual' : ''}`}>
      {ratings.map((data) => (
        <CompactRatingRow key={`${data.platform}-${data.storeUrl}`} data={data} />
      ))}
    </div>
  );
}

function DetailRatingCard({ data }) {
  const score = data.rating.toFixed(1);
  const label = storePlatformLabel(data.platform);
  const ariaLabel = `${score} out of 5 stars, ${formatRatingCountFull(data.ratingCount)} ratings on ${label}`;

  return (
    <div className="app-store-rating__card" aria-label={ariaLabel}>
      <div className="app-store-rating__card-head">
        <StoreBadge platform={data.platform} />
        <span className="app-store-rating__card-source">Live from {label}</span>
      </div>
      <div className="app-store-rating__card-main">
        <div className="app-store-rating__card-score-block">
          <span className="app-store-rating__card-score">{score}</span>
          <div>
            <StarRating rating={data.rating} sizeRem={2} />
            <p className="app-store-rating__card-out-of">out of 5</p>
          </div>
        </div>
        <div className="app-store-rating__card-count-block">
          <p className="app-store-rating__card-count">
            {formatRatingCountFull(data.ratingCount)}
          </p>
          <p className="app-store-rating__count">
            {data.ratingCount === 1 ? 'rating' : 'ratings'}
          </p>
        </div>
      </div>
    </div>
  );
}

function DetailRatings({ ratings }) {
  const dual = ratings.length >= 2;
  return (
    <div className={`app-store-rating__detail-grid ${dual ? 'app-store-rating__detail-grid--dual' : ''}`}>
      {ratings.map((data) => (
        <DetailRatingCard key={`${data.platform}-${data.storeUrl}`} data={data} />
      ))}
    </div>
  );
}

export default function AppStoreRating({
  storeLinks,
  variant = 'detail',
  enabled = true,
  className = '',
}) {
  const links = storeLinks.filter(Boolean);
  const ratingState = useAppRating(links.length > 0 ? links : undefined, enabled);

  if (links.length === 0) return null;

  const isLoading = ratingState.status === 'loading' || ratingState.status === 'idle';

  if (isLoading) {
    return (
      <div
        className={`app-store-rating app-store-rating--${variant} ${className}`.trim()}
        aria-live="polite"
        aria-busy="true"
      >
        <RatingSkeleton variant={variant} slotCount={links.length} />
      </div>
    );
  }

  if (ratingState.status !== 'success') return null;

  const ratings = sortRatingsByPlatform(
    ratingState.data.filter((d) => hasDisplayableRating(d.rating, d.ratingCount)),
  );
  if (ratings.length === 0) return null;

  return (
    <div
      className={`app-store-rating app-store-rating--${variant} ${className}`.trim()}
      aria-live="polite"
    >
      {variant === 'compact' ? (
        <CompactRatings ratings={ratings} />
      ) : (
        <DetailRatings ratings={ratings} />
      )}
    </div>
  );
}
