import React from 'react';
import marked from 'marked';
import dompurify from 'dompurify'; // sanitaze lib for .md output to html
import { useParams } from 'react-router-dom';
// import useFetch from '../hooks/useFetch';
import { useQuery, gql } from '@apollo/client';

const REVIEW = gql`
  query GetReviewById($id: ID!) {
    review(id: $id) {
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

export default function ReviewDetails() {
  const { id } = useParams();
  // const { loading, error, data } = useFetch(
  //   `http://localhost:1337/reviews/${id}`
  // );
  const { loading, error, data } = useQuery(REVIEW, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`☹️ ${error} `}</p>;

  const markdownBodyText = () => {
    const sanitizer = dompurify.sanitize;
    return {
      __html: marked(sanitizer(data.review.body)), // not secure! need use https://github.com/cure53/DOMPurify to sanitaze output
    };
  };

  return (
    <div className='review-card'>
      <div className='rating'>{data.review.rating}</div>
      <h2>{data.review.title}</h2>

      {data.review.categories.map((c) => (
        <small className='pills' key={c.id}>
          {c.name}
        </small>
      ))}

      <p dangerouslySetInnerHTML={markdownBodyText()}></p>
    </div>
  );
}
