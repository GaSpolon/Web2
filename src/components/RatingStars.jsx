import React from 'react';

function RatingStars({ rating, maxStars = 5 }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <i key={`full-${i}`} className="fa-solid fa-star text-yellow-500"></i>
    );
  }
  if (hasHalfStar) {
    stars.push(
      <i key="half" className="fa-solid fa-star-half-stroke text-yellow-500"></i>
    );
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <i key={`empty-${i}`} className="fa-regular fa-star text-yellow-500"></i>
    );
  }

  return <div>{stars}</div>;
}

export default RatingStars;
