import PropTypes from "prop-types"
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src="https://placehold.co/300x300" />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant="outline-success">
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

