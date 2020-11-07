import React, { useEffect, useState, useReducer } from 'react';
import './Row.css';
import instance from '../axios';
import Poster from './Posters';
import FlexRow from '../styled-components/FlexRow';
import Carousel from 'react-bootstrap/Carousel';

function Row({ title, fetchURL, style }) {

  const [posters, setPosters] = useState();
  const [loading, setLoading] = useState(false);
  const [itemsDisplay, setItemDisplay] = useState(5);
  const [slider, setSlider] = useState();

  const fetchMovies = async () => {
    setLoading(true);
    const resp = await instance.get(fetchURL);
    setPosters(resp.data.results.map(movie => {
      return movie.poster_path && <Poster key={movie.id} alt={movie.title} posterPath={movie.backdrop_path} />
    }))
    setLoading(false);
  }

  //Fetch the movie data.
  useEffect(() => {
    fetchMovies();
  }, [])

  useEffect(() => {
    const slide = [];
    if (posters) {
      for (let i = 0; i <= posters.length - itemsDisplay; i += itemsDisplay) {
        slide.push(
          <Carousel.Item>
            <FlexRow width={'100%'} style={{ marginBottom: '1rem', justifyContent: 'space-around', padding: '1rem' }}>
              {posters.slice(i, i + itemsDisplay)}
            </FlexRow>
          </Carousel.Item>)
      }
      setSlider(slide);
    }
  }, [posters])

  return (
    <div style={style}>
      {slider && <p class='font-weight-bold' style={{ fontSize: '2vh', marginLeft: '1.5rem', marginBottom: 0, color: 'white', fontFamily: 'Helvetica' }}>{title}</p>}
      <Carousel interval={null}>
        {slider}
      </Carousel>
    </div>
  )
}

export default Row
