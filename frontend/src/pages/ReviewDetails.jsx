import React from 'react';
import marked from 'marked';
import dompurify from 'dompurify'; // sanitaze lib for .md output to html
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

export default function ReviewDetails() {
  const { id } = useParams();
  const { loading, error, data } = useFetch(
    `http://localhost:1337/reviews/${id}`
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`☹️ ${error} `}</p>;

  const markdownBodyText = () => {
    const sanitizer = dompurify.sanitize;
    return {
      __html: marked(sanitizer(data.body)), // not secure! need use https://github.com/cure53/DOMPurify to sanitaze output
    };
  };

  return (
    <div className='review-card'>
      <div className='rating'>{data.rating}</div>
      <h2>{data.title}</h2>

      <small>console list</small>

      <p dangerouslySetInnerHTML={markdownBodyText()}></p>
    </div>
  );
}
