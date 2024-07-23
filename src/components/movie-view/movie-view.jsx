import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  let { movieId } = useParams();


  const movie = movies.find((m) => m.id === movieId);



  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <img className="w-100" src="https://placehold.co/300x300" />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title} </span>
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
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  )
}
