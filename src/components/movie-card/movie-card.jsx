import { useState } from "react"
import PropTypes from "prop-types"
import { Button, Card} from "react-bootstrap"
import { Link } from "react-router-dom"

export const MovieCard = ({ users, movie, token, onFavoritesUpdate }) => {
  const [favorites, setFavorites] = useState(users.favorites || [])

  const handleAddToFavorites = async event => {
    event.preventDefault()

    // Check if the movie is already in the favorite list before making the fetch request
    if (favorites.some(fav => fav === movie.id)) {
      alert("This movie is already in the Favorite List")
      return
    }

    try {
      const response = await fetch(
        `https://my-movie-app-ab91e4bb4611.herokuapp.com/users/${users.username}/movies/${movie.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error("Failed to add movie to favorites")
      }
      const data = await response.json()

      // Check if the server response contains the updated favorite movies list
      if (data.FavoriteMovies) {
        setFavorites(data.FavoriteMovies)
        onFavoritesUpdate(data.FavoriteMovies) // Notify parent component
      } else {
        alert("Unexpected server response. Please try again later.")
      }
    } catch (error) {
      console.error("Error adding movie to favorites:", error)
      alert("An error occurred. Please try again later.")
    }
  }

  const handleDeleteFromFavorites = async event => {
    event.preventDefault()
    event.stopPropagation() // Prevent event bubbling

    // Check if the movie is in the favorite list before making the fetch request
    if (!favorites.some(fav => fav === movie.id)) {
      alert("This movie is not in the Favorite List")
      return
    }

    try {
      const response = await fetch(
        `https://my-movie-app-ab91e4bb4611.herokuapp.com/users/${users.username}/movies/${movie.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error("Failed to delete movie from favorites")
      }
      const data = await response.json()

      // Check if the server response contains the updated favorite movies list
      if (data.FavoriteMovies) {
        setFavorites(data.FavoriteMovies)
        onFavoritesUpdate(data.FavoriteMovies) // Notify parent component
      } else {
        alert("Unexpected server response. Please try again later.")
      }
    } catch (error) {
      console.error("Error deleting movie from favorites:", error)
      alert("An error occurred. Please try again later.")
    }
  }

  return (
    <div>
      <Card className="h-100">
        <Card.Img variant="top" src={movie.image} className="card--image" />
        <Card.Body className="movie-card--container">
          <div className="movie-card--content">
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.description}</Card.Text>
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
              <Button variant="warning">Open</Button>
            </Link>
          </div>
          <div className="add-delete--button">
            {!favorites.some(fav => fav === movie.id) && (
              <Button variant="primary" onClick={handleAddToFavorites}>
                Add to Favorites
              </Button>
            )}
            {favorites.some(fav => fav === movie.id) && (
              <Button variant="danger" onClick={handleDeleteFromFavorites}>
                Remove from Favorites
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    directorName: PropTypes.string.isRequired,
    genreName: PropTypes.string.isRequired,
    genreDescription: PropTypes.string.isRequired,
    directorBio: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  users: PropTypes.shape({
    username: PropTypes.string.isRequired,
    favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
    birthday: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
    ]).isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
  onFavoritesUpdate: PropTypes.func.isRequired,
}
