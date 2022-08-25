import React, { useEffect, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { getGenres } from '../api/genresData';
import { getMoods } from '../api/moodsData';

const initialState = {
  title: '',
  type: '',
  genre: '',
  moods: '',
  recommendedBy: '',
  watched: false,
  favorite: false,
  rating: '',
};

export default function Shuffle() {
  const [formInput, setFormInput] = useState(initialState);
  const [checkedGenre, setCheckedGenre] = useState([]);
  const [checkedMood, setCheckedMood] = useState([]);
  const [genres, setGenres] = useState([]);
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    getGenres().then(setGenres);
    getMoods().then(setMoods);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClickGenre = (e) => {
    let updatedGenre = [...checkedGenre];
    if (e.target.checked) {
      updatedGenre = [...checkedGenre, e.target.name];
    } else {
      updatedGenre.splice(checkedGenre.indexOf(e.target.name), 1);
    }
    setCheckedGenre(updatedGenre);
  };

  const handleClickMood = (e) => {
    let updatedMood = [...checkedMood];
    if (e.target.checked) {
      updatedMood = [...checkedMood, e.target.name];
    } else {
      updatedMood.splice(checkedMood.indexOf(e.target.name), 1);
    }
    setCheckedMood(updatedMood);
  };

  return (
    <>
      <div>i feel like watching...</div>
      <div>
        <h2>type</h2>
        <FloatingLabel controlId="floatingSelect" label="Type">
          <Form.Select
            aria-label="Type"
            name="type"
            type="select"
            onChange={handleChange}
            className="mb-3"
            required
            value={formInput.type}
          >
            <option value="">Select Type</option>
            <option value="Movie">Movie</option>
            <option value="TV Show">TV Show</option>
          </Form.Select>
        </FloatingLabel>
      </div>
      <div>status</div>
      <div>
        <h2>genre</h2>
        {genres.map((genre) => (
          <div key={genre.genreFirebaseKey} className="mb-3">
            <Form.Check
              type="checkbox"
              id={genre.genreFirebaseKey}
              label={genre.genreName}
              checked={checkedGenre.indexOf(genre.genreName) >= 0}
              onChange={handleClickGenre}
              name={genre.genreName}
            />
          </div>
        ))}
      </div>
      <div>
        <h2>mood</h2>
        {moods.map((mood) => (
          <div key={mood.moodFirebaseKey} className="mb-3">
            <Form.Check
              type="checkbox"
              id={mood.moodFirebaseKey}
              label={mood.moodsName}
              checked={checkedMood.indexOf(mood.moodsName) >= 0}
              onChange={handleClickMood}
              name={mood.moodsName}
            />
          </div>
        ))}
      </div>
      <div>recommendedBy</div>
      <div>shuffle button here</div>
    </>
  );
}
