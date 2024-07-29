import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card, Button, ListGroup } from "react-bootstrap"


export const MovieView = ({ movies }) => {
  let { movieId } = useParams();


  const movie = movies.find((m) => m.id === movieId);



  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Card style={{ width: '50rem' }}>
      <Card.Img variant="top" className="w-100" src={movie.image}/>
      <Card.Body>
        <Card.Title>Title</Card.Title>
        <Card.Text>
        {movie.title}
        </Card.Text>
      </Card.Body>
  
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
        <strong>Description:</strong>
        <Card.Text>
        {movie.description}
        </Card.Text>
        </ListGroup.Item>
  
        <ListGroup.Item>
          <strong>Director:</strong>
          <Card.Text>
          {movie.directorName}
          </Card.Text>
          </ListGroup.Item>
  
        <ListGroup.Item>
          <strong>Director Bio:</strong>
          <Card.Text>
          {movie.directorBio}
          </Card.Text>
          </ListGroup.Item>
  
        <ListGroup.Item>
          <strong>Genre:</strong>
          <Card.Text>
          {movie.genreName}
          </Card.Text>
          </ListGroup.Item>
  
        <ListGroup.Item>
          <strong>Genre Description:</strong>
          <Card.Text>
          {movie.genreDescription}
          </Card.Text>
          </ListGroup.Item>
      </ListGroup>
      <Card.Body>
      <Link to={`/`}>
          <Button className="back-button" variant="warning">Back</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
