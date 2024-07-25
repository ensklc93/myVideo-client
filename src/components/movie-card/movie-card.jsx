import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ users, movie, token, onFavoritesUpdate }) => {
  const [favorites, setFavorites] = useState(users.favorites || []);

  useEffect(() => {
    setFavorites(users.favorites || []);
  }, [users.favorites]);

  const handleAddToFavorites = async (event) => {
    event.preventDefault();
    console.log("Add to Favorites button clicked");

    // Check if the movie is already in the favorite list before making the fetch request
    if (favorites.some((fav) => fav === movie.id)) {
      alert("This movie is already in the Favorite List");
      return;
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
      );

      if (!response.ok) {
        throw new Error("Failed to add movie to favorites");
      }

      const data = await response.json();
      console.log("Server response:", data);

      // Check if the server response contains the updated favorite movies list
      if (data.FavoriteMovies) {
        setFavorites(data.FavoriteMovies);
        onFavoritesUpdate(data.FavoriteMovies); // Notify parent component
        alert("Movie added to favorites");
      } else {
        alert("Unexpected server response. Please try again later.");
      }
    } catch (error) {
      console.error("Error adding movie to favorites:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleDeleteFromFavorites = async (event) => {
    event.preventDefault();
    event.stopPropagation(); // Prevent event bubbling
    console.log("Delete from Favorites button clicked");

    // Check if the movie is in the favorite list before making the fetch request
    if (!favorites.some((fav) => fav === movie.id)) {
      alert("This movie is not in the Favorite List");
      return;
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
      );

      if (!response.ok) {
        throw new Error("Failed to delete movie from favorites");
      }

      const data = await response.json();
      console.log("Server response:", data);

      // Check if the server response contains the updated favorite movies list
      if (data.FavoriteMovies) {
        setFavorites(data.FavoriteMovies);
        onFavoritesUpdate(data.FavoriteMovies); // Notify parent component
        alert("Movie deleted from favorites");
      } else {
        alert("Unexpected server response. Please try again later.");
      }
    } catch (error) {
      console.error("Error deleting movie from favorites:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <Card className="h-100">
      <Card.Img variant="top" src="https://placehold.co/300x300" />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
        <Button variant="primary" onClick={handleAddToFavorites}>
          Add to Favorites
        </Button>
        <Button variant="danger" onClick={handleDeleteFromFavorites}>
          Remove from Favorites
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    directorName: PropTypes.string.isRequired,
    genreName: PropTypes.string.isRequired,
    genreDescription: PropTypes.string.isRequired,
    directorBio: PropTypes.string.isRequired
  }).isRequired
}