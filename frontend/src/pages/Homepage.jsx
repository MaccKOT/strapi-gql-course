import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

export default function Homepage() {
  const { loading, error, data } = useFetch('http://localhost:1337/reviews/');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`☹️ ${error} `}</p>;

  // todo : output rich text from review.body to plain text (need renderer for marked)

  return (
    <div>
      {data.map((review) => (
        <div key={review.id} className='review-card'>
          <div className='rating'>{review.rating}</div>
          <h2>{review.title}</h2>

          <small>console list placeholder</small>

          <p>{review.body.substring(0, 200)}...</p>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
}
