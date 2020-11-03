import React from 'react';
import './Poster.css';

function Posters({ posterPath }) {

  const imageBaseURL = 'https://image.tmdb.org/t/p/original/';

  return (
    <img className='poster' src={`${imageBaseURL}${posterPath}`} />
  )
}

export default Posters
