import { useState, useEffect } from "react"
import { MovieCard } from "../movie-card/movie-card.jsx"
import { MovieView } from "../movie-view/movie-view.jsx"
import { LoginView } from "../login-view/login.view.jsx"
import { SignupView } from "../signup-view.jsx/signup-view.jsx"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

export const MainView = () => {
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const storedUser = JSON.parse(localStorage.getItem("user"))
  const storedToken = localStorage.getItem("token")
  const [user, setUser] = useState(storedUser ? storedUser : null)
  const [token, setToken] = useState(storedToken ? storedToken : null)

  useEffect(() => {
    if (!token) {
      return
    }

    fetch("https://my-movie-app-ab91e4bb4611.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => response.json())
      .then(data => {
        const moviesFromApi = data.map(movie => {
          return {
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            genreName: movie.Genre.Name,
            genreDescription: movie.Genre.Description,
            directorName: movie.Director.Name,
            directorBio: movie.Director.Bio,
          }
        })
        setMovies(moviesFromApi)
      })
  }, [token])

  return (
    <Row className="justify-content-md-center">
      {!user ? (
          <Col md={5}>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user)
                setToken(token)
              }}
            />
            or
            <SignupView />
          </Col>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map(movie => (
            <Col className="mb-5" key={movie.id} sm={2} md={5}>
            <MovieCard
              movie={movie}
              onMovieClick={newSelectedMovie => {
                setSelectedMovie(newSelectedMovie)
              }}
            />
            </Col>
          ))}
          <button
            onClick={() => {
              setUser(null)
              setToken(null)
              localStorage.clear()
            }}
          >
            Logout
          </button>
        </>
      )}
    </Row>
  )
}
