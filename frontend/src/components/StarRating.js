import React from 'react';

const StarRating = ({ rating, reviews, size = 'small' }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<span key={i} className={`star filled ${size}`}>⭐</span>);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<span key={i} className={`star half ${size}`}>⭐</span>);
    } else {
      stars.push(<span key={i} className={`star empty ${size}`}>☆</span>);
    }
  }

  return (
    <div className="star-rating">
      <div className="stars">{stars}</div>
      {reviews && (
        <span className="review-count">({reviews} reviews)</span>
      )}
    </div>
  );
};

export default StarRating;