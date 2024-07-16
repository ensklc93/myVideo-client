import PropTypes from "prop-types"
import { Button, Card } from "react-bootstrap";


export const MovieCard = ({ movie, onBookClick }) => {
  return (
    <Card onClick={() => onBookClick(movie)}>
      <Card.Img variant="top" src="https://placehold.co/100x100" />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Button onClick={() => onBookClick(movie)} variant="link">
          Open
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
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
}

