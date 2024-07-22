import { useState, useEffect } from "react"
import { MovieCard } from "../movie-card/movie-card.jsx"
import { MovieView } from "../movie-view/movie-view.jsx"
import { LoginView } from "../login-view/login.view.jsx"
import { SignupView } from "../signup-view.jsx/signup-view.jsx"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from 'react-bootstrap/Button';

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);


  useEffect(() => {
    fetch("https://my-movie-app-ab91e4bb4611.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            genreName: movie.Genre.Name,
            genreDescription: movie.Genre.Description,
            directorName: movie.Director.Name,
            directorBio: movie.Director.Bio,
          };
        });
        setMovies(moviesFromApi);
      });
  }, []);


  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>"The list is empty!"</div>;
  } else {
    return (
      <div>
       {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
    );
  }
};


