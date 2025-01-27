import { MovieCard } from "../movie-card/movie-card.jsx"
import { MovieView } from "../movie-view/movie-view.jsx"
import { LoginView } from "../login-view/login-view.jsx"
import { SignupView } from "../signup-view/signup-view.jsx"
import { NavigationBar } from "../navigation-bar/navigation-bar"
import { ProfileView } from "../profile-view/profile-view.jsx"
import { FilterView } from "../filter-view/filter-view.jsx"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"

export const MainView = () => {
  const [movies, setMovies] = useState([])
  const storedUser = JSON.parse(localStorage.getItem("user"))
  const storedToken = localStorage.getItem("token")
  const [user, setUser] = useState(storedUser ? storedUser : null)
  const [token, setToken] = useState(storedToken ? storedToken : null)
  const [genres, setGenres] = useState([])
  const [directors, setDirectors] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    if (!token) return

    fetch(`https://my-movie-app-ab91e4bb4611.herokuapp.com/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => response.json())
      .then(data => {
        const moviesFromApi = data.map(movie => ({
          id: movie._id,
          title: movie.Title,
          description: movie.Description,
          genreName: movie.Genre.Name,
          genreDescription: movie.Genre.Description,
          directorName: movie.Director.Name,
          directorBio: movie.Director.Bio,
          image: movie.ImagePath,
        }))
        setMovies(moviesFromApi)
        setFilteredMovies(moviesFromApi)

        const uniqueGenres = [
          ...new Set(moviesFromApi.map(movie => movie.genreName)),
        ]
        const uniqueDirectors = [
          ...new Set(moviesFromApi.map(movie => movie.directorName)),
        ]
        setGenres(uniqueGenres)
        setDirectors(uniqueDirectors)
      })
  }, [token])

  useEffect(() => {
    if (!token) return

    fetch(`https://my-movie-app-ab91e4bb4611.herokuapp.com/users/${user.Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => response.json())
      .then(data => setUser(data))
  }, [token])

  const handleLogout = () => {
    try {
      setUser(null)
      localStorage.clear()
      window.location.href = "/login" // Redirect to login page
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  // Ensure user and user.FavoriteMovies are defined before filtering
  const favoriteMovies =
    user && user.FavoriteMovies
      ? movies.filter(m => user.FavoriteMovies.includes(m.id))
      : []

  const handleFavoritesUpdate = updatedFavorites => {
    // Update the state or perform any other necessary actions with the updated FavoriteMovies
    setUser(prevUser => ({
      ...prevUser,
      FavoriteMovies: updatedFavorites,
    }))

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        FavoriteMovies: updatedFavorites,
      })
    )
  }

  const handleFilterChange = (genre, director) => {
    let filtered = movies;
    if (genre) {
      filtered = filtered.filter((movie) => movie.genreName === genre);
    }
    if (director) {
      filtered = filtered.filter((movie) => movie.directorName === director);
    }
    setFilteredMovies(filtered);
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLogout} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/login"
            element={
              user ? (
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
              )
            }
          />
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <SignupView />
                </Col>
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <Col md={8}>
                  <MovieView movies={movies} />
                </Col>
              )
            }
          />
          <Route
            path="/users/:userName"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={10}>
                  <ProfileView
                    user={user}
                    token={token}
                    favoriteMovies={favoriteMovies}
                    onFavoritesUpdate={handleFavoritesUpdate}
                  />
                </Col>
              )
            }
          />
          <Route
            path="/users/:username/movies/:movieID"
            element={
              !user ? (
                <Navigate to="/" replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <>
                  {filteredMovies.map(movie => (
                    <Col
                      className="mb-5"
                      key={movie.id}
                      md={4}
                      lg={3}
                      sm={6}
                      xs={12}
                    >
                      <MovieCard
                        user={user}
                        movie={movie}
                        token={token}
                        onFavoritesUpdate={handleFavoritesUpdate}
                      />
                    </Col>
                  ))}
                </>
              )
            }
          />
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <>
                  <FilterView genres={genres} directors={directors} onFilterChange={handleFilterChange} />
                  {filteredMovies.map(movie => (
                    <Col
                      className="mb-5"
                      key={movie.id}
                      md={4}
                      lg={3}
                      sm={6}
                      xs={12}
                    >
                      <MovieCard
                        user={user}
                        movie={movie}
                        token={token}
                        onFavoritesUpdate={handleFavoritesUpdate}
                      />
                    </Col>
                  ))}
                </>
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  )
}
