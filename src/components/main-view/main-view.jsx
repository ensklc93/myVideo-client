import { useState, useEffect } from "react"
import { MovieCard } from "../movie-card/movie-card.jsx"
import { MovieView } from "../movie-view/movie-view.jsx"
import { LoginView } from "../login-view/login.view.jsx"
import { SignupView } from "../signup-view.jsx/signup-view.jsx"
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

export const MainView = () => {
  const [movies, setMovies] = useState([])
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
    <BrowserRouter>
    <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user)
                        setToken(token)
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:moviesId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView
                      movies={movies}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map(movie => (
                      <Col
                        className="mb-5"
                        key={movie.id}
                        md={4}
                        lg={3}
                        sm={6}
                        xs={12}
                      >
                        <MovieCard
                          movie={movie}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  )
}