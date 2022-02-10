import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [error, setError]  = useState(false);

  async function LoadMoviesHandler() {
    setIsLoding(true);
    setError(null);
    try{
      const responce = await fetch('https://swapi.dev/api/films/');//You can take your Api form swapi.dev

      if (!responce.ok) {
        throw new Error("Somthing went wrong! Error Type 404")
      }
      // This is coming from responce function line 14
      const data = await responce.json();

           // Only this Movie Data will load from the Starwar Api
        const changedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            director: movieData.director,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(changedMovies);
    }catch(error) {
      setError(error.message);
    }
    setIsLoding(false);
  }


  return (
    <React.Fragment>
      <section>
        <button onClick={LoadMoviesHandler}>Load Movies</button>
      </section>
      <section>
        {!isLoding && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoding && movies.length === 0  && !error && <h3>Oops Found Nothing, Click The button to lode movies.</h3>}
        {!isLoding && error && <p>{error}</p>}
        {isLoding && <h2>Loding...</h2>}
      </section>
    </React.Fragment>
  );
}

export default App;
