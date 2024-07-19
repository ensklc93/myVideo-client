import PropTypes from "prop-types"

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie)
      }}
    >
      {movie.title}
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
    directorBio: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
}

