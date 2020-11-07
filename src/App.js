import './App.css';
import requests from './request';
import Row from './components/Row';
import Navbar from './components/Navbar';
import React, { useEffect, useState } from 'react';
import instance from './axios';


function App() {

  const [trendingMovie, setTrendingMovie] = useState();
  const imageBaseURL = 'https://image.tmdb.org/t/p/original/';
  const [wheelStyle, setWheelStyle] = useState();


  const movieTopic = [
    { title: 'Netflix Originals', fetchURL: requests.fetchNetflixOriginals },
    { title: 'Comedy Movies', fetchURL: requests.fetchComedyMovies },
    { title: 'Top Rated', fetchURL: requests.fetchTopRated },
    { title: 'Horror Movies', fetchURL: requests.fetchHorrorMovies },
    { title: 'Action Movies', fetchURL: requests.fetchActionMovies },
    { title: 'Romance Movies', fetchURL: requests.fetchRomanceMovies },
    { title: 'Documentaries', fetchURL: requests.fetchDocumentaries },
  ]

  const fetchTrendingMovies = async () => {
    const resp = await instance.get(requests.fetchTrending);
    const randomNumber = Math.floor(Math.random() * 20);
    const randomTrendingMovie = resp.data.results[randomNumber];
    setTrendingMovie(<img style={{ width: '100vw', objectFit: 'contain' }} src={`${imageBaseURL}${randomTrendingMovie.backdrop_path}`} alt={randomTrendingMovie.title} />);
  }

  useEffect(() => {
    fetchTrendingMovies();
  }, [])



  return (

    <div className="App">
      <Navbar />
      <div style={{
        width: '100vw',
        position: 'relative'
      }}>
        {trendingMovie && trendingMovie}
        {<Row style={{
          position: 'absolute',
          bottom: '0'
        }} title={movieTopic[0].title} fetchURL={movieTopic[0].fetchURL} />}
      </div>
      {movieTopic.map((movie, index) => {
        if (index == 0) {

        } else {
          return <Row title={movie.title} fetchURL={movie.fetchURL} />;
        }
      })
      }
    </div >
  );
}

export default App;
