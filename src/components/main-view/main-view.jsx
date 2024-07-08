import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      genre: {
        name: "Thriller",
        description:
          "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.",
      },
      director: {
        name: "Jonathan Demme",
        bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
        birth: "1944",
        death: "2017",
      },
      id: 1,
      title: "Silence of the Lambs",
      description:
        "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer.",
      imagePath: "https://upload.wikimedia.org/wikipedia/en/8/86/The_Silence_of_the_Lambs_poster.jpg",
      featured: true,
    },
    {
      genre: {
        name: "Thriller",
        description:
          "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience. Tension is created by delaying what the audience sees as inevitable, and is built through situations that are menacing or where escape seems impossible.",
      },
      director: {
        name: "Stanley Kubrick",
        bio: "Director Stanley Kubrick was one of the most consistently fascinating filmmakers in the latter half of the 20th century. Just as his singularly brilliant visual style won him great acclaim, his unconventional sense of narrative and seeming lack of overt emotionalism often elicited critical puzzlement",
        birth: "1928",
        death: "1999",
      },
      id: 2,
      title: "The Shining",
      description:
        "Jack Torrance (Jack Nicholson) becomes winter caretaker at the isolated Overlook Hotel in Colorado, hoping to cure his writer's block. He settles in along with his wife, Wendy (Shelley Duvall), and his son, Danny (Danny Lloyd), who is plagued by psychic premonitions. As Jack's writing goes nowhere and Danny's visions become more disturbing, Jack discovers the hotel's dark secrets and begins to unravel into a homicidal maniac hell-bent on terrorizing his family.",
      imagePath: "https://upload.wikimedia.org/wikipedia/en/1/1d/The_Shining_%281980%29_U.K._release_poster_-_The_tide_of_terror_that_swept_America_IS_HERE.jpg",
      featured: true,
    },
    {
      genre: {
        name: "Sci-Fi",
        description:
          "Science fiction (sometimes shortened to SF or sci-fi) is a genre of speculative fiction, which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life. It is related to fantasy, horror, and superhero fiction and contains many subgenres. Its exact definition has long been disputed among authors, critics, scholars, and readers.",
      },
      director: {
        name: "Stanley Kubrick",
        bio: "Director Stanley Kubrick was one of the most consistently fascinating filmmakers in the latter half of the 20th century. Just as his singularly brilliant visual style won him great acclaim, his unconventional sense of narrative and seeming lack of overt emotionalism often elicited critical puzzlement",
        birth: "1928",
        death: "1999",
      },
      id: 3,
      title: "2001: A Space Odyssey",
      description:
        "An imposing black structure provides a connection between the past and the future in this enigmatic adaptation of a short story by revered sci-fi author Arthur C. Clarke. When Dr. Dave Bowman (Keir Dullea) and other astronauts are sent on a mysterious mission, their ship's computer system, HAL, begins to display increasingly strange behavior, leading up to a tense showdown between man and machine that results in a mind-bending trek through space and time.",
      imagePath: "https://upload.wikimedia.org/wikipedia/en/1/11/2001_A_Space_Odyssey_%281968%29.png",
      featured: true,
    },
  ])

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>"The list is empty!"</div>;
  } else {
    return (
      <div>
       {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
    );
  }
};


