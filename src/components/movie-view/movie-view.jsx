export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <span>Title: </span>
        <span> {movie.title} </span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.directorName}</span>
      </div>
      <div>
        <span>Director Bio: </span>
        <span>{movie.directorBio}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genreName}</span>
      </div>
      <div>
        <span>Genre Description: </span>
        <span>{movie.genreDescription}</span>
      </div>
      <div>
        <button onClick={onBackClick}>Back</button>
      </div>
    </div>
  )
}
