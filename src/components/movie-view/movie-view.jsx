import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  console.log(useParams());
  const movie = movies.find((m) => m.id === movieId);

  return (
    <div>
      <div>
        <img className="w-100" src="https://placehold.co/300x300" />
      </div>
      <div>
        <span>Title: </span>
        <span>{movies.title} </span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movies.description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movies.directorName}</span>
      </div>
      <div>
        <span>Director Bio: </span>
        <span>{movies.directorBio}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movies.genreName}</span>
      </div>
      <div>
        <span>Genre Description: </span>
        <span>{movies.genreDescription}</span>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  )
}
