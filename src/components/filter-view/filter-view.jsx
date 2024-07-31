import { useState } from 'react'
import PropTypes from 'prop-types';

export const FilterView = ({ genres, directors, onFilterChange }) => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedDirector, setSelectedDirector] = useState('');

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    onFilterChange(event.target.value, selectedDirector);
  };

  const handleDirectorChange = (event) => {
    setSelectedDirector(event.target.value);
    onFilterChange(selectedGenre, event.target.value);
  };

  return (
    <div className='filter--container'>
      <h3>Filter Movies</h3>
      <div>
        <label>Genre:</label>
        <select value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Director:</label>
        <select value={selectedDirector} onChange={handleDirectorChange}>
          <option value="">All</option>
          {directors.map((director) => (
            <option key={director} value={director}>
              {director}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

FilterView.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  directors: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
