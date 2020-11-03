import React, { useEffect, useState } from 'react';
import './Row.css';
import instance from '../axios';
import Poster from './Posters';

function Row({ title, fetchURL }) {

  const [posters, setPosters] = useState();

  //Fetch the movie data.
  useEffect(() => {
    instance.get(fetchURL)
      .then(resp => {
        setPosters(resp.data.results.map(obj => {
          return <Poster posterPath={obj.poster_path} />
        }))
      })
  }, [])

  return (
    <div className="row">
      {posters && <h1 style={{ fontSize: '1.5rem' }}>{title}</h1>}
      <div className="row-posters">
        {posters}
      </div>
    </div>
  )
}

export default Row
