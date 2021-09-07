import React from 'react';
import { Link } from 'react-router-dom';
// import useFetch from '../hooks/useFetch';

import { useQuery, gql } from '@apollo/client';

const REVIEWS = gql`
  query GetReviews {
    reviews {
      title
      body
      rating
      id
      categories {
        name
        id
      }
    }
  }
`;

export default function Homepage() {
  // const { loading, error, data } = useFetch('http://localhost:1337/reviews/');
  const { loading, error, data } = useQuery(REVIEWS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`☹️ ${error} `}</p>;

  // todo : output rich text from review.body to plain text (need renderer for marked)

  return (
    <div>
      {data.reviews.map((review) => (
        <div key={review.id} className='review-card'>
          <div className='rating'>{review.rating}</div>
          <h2>{review.title}</h2>

          {review.categories.map((c) => (
            <small className='pills' key={c.id}>
              {c.name}
            </small>
          ))}

          <p>{review.body.substring(0, 200)}...</p>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
}
