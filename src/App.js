import './App.css';
import requests from './request';
import Row from './components/Row';

function App() {
  return (
    <div className="App">
      <header>

      </header>
      <div>
        <Row title={'NETFLIX ORIGINAL'} fetchURL={requests.fetchNetflixOriginals} />
        <Row title={'Trending Now'} fetchURL={requests.fetchTrending} />
        <Row title={'Top Rated'} fetchURL={requests.fetchTopRated} />
        <Row title={'Action Movies'} fetchURL={requests.fetchActionMovies} />
        <Row title={'Comedy Movies'} fetchURL={requests.fetchComedyMovies} />
        <Row title={'Horror Movies'} fetchURL={requests.fetchHorrorMovies} />
        <Row title={'Romance Movies'} fetchURL={requests.fetchRomanceMovies} />
        <Row title={'Documentaries'} fetchURL={requests.fetchDocumentaries} />
      </div>
    </div >
  );
}

export default App;
