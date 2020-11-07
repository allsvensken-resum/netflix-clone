import React from 'react';
import './Poster.css';

function Posters({ posterPath, alt }) {

  const imageBaseURL = 'https://image.tmdb.org/t/p/original/';

  return (
    <img className='poster' alt={alt} src={`${imageBaseURL}${posterPath}`} />
  )
}

export default Posters
