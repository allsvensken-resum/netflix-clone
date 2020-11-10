import Row from './Row';
import Navbar from './Navbar';
import requests from '../request';
import React, { useEffect, useState } from 'react';
import instance from '../axios';
import { useAuth } from '../contexts/AuthProvider';
import FavoriteRow from '../components/FavoriteRow';


const trendingMovieDetailsStyle = {
  position: 'absolute',
  marginLeft: '3vw',
  bottom: '60%',
  color: 'white',
  fontSize: '1.5vw ',
  width: '70%'
};

function MainPage() {

  const [trendingMovie, setTrendingMovie] = useState(null);
  const imageBaseURL = 'https://image.tmdb.org/t/p/original/';
  const { signOut } = useAuth();
  const [trendingMovieDetails, setTrendingMovieDetails] = useState(null);
  //trendingMovieDetails => {title: , overview: }

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
    setTrendingMovieDetails({
      title: randomTrendingMovie.title,
      overview: randomTrendingMovie.overview
    })
    setTrendingMovie(<img style={{ width: '100vw', objectFit: 'contain' }} src={`${imageBaseURL}${randomTrendingMovie.backdrop_path}`} alt={randomTrendingMovie.title} />);
  }

  useEffect(() => {
    fetchTrendingMovies();
  }, [])

  const handleSignOut = async () => {
    try {
      const signedOut = signOut();
    } catch (err) {
      alert(err.message);
    }
  }

  return (

    <div className="App" style={{ backgroundColor: '#141414' }}>
      <Navbar handleSignOut={handleSignOut} />
      <div style={{
        width: '100vw',
        position: 'relative'
      }}>
        {trendingMovie && trendingMovie}
        {trendingMovieDetails && <div
          style={trendingMovieDetailsStyle}
        >
          <h1 style={{ fontSize: '3vw' }}>{trendingMovieDetails.title}</h1>
          <p >{trendingMovieDetails.overview}</p>
        </div>}
        {<Row style={{
          position: 'absolute',
          bottom: '0'
        }} title={movieTopic[0].title} fetchURL={movieTopic[0].fetchURL} />}
      </div>
      <FavoriteRow title={'Favorite List'} />
      {movieTopic.map((movie, index) => {
        if (index == 0) {
        } else {
          return <Row key={index} title={movie.title} fetchURL={movie.fetchURL} />;
        }
      })
      }
    </div >
  );
}

export default MainPage
