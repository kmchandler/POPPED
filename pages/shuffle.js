/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../utils/context/authContext';
import { getGenres } from '../api/genresData';
import { getMoods } from '../api/moodsData';
import { getFlicksByUidWithMetaData } from '../api/mergedData';

export default function Shuffle() {
  const [formInput, setFormInput] = useState([]);
  const [checkedGenre, setCheckedGenre] = useState([]);
  const [checkedMood, setCheckedMood] = useState([]);
  const [genres, setGenres] = useState([]);
  const [moods, setMoods] = useState([]);
  const [flicks, setFlicks] = useState([]);
  const { user } = useAuth();
  // const router = useRouter();

  const getFlicks = async () => {
    const flicksWithMetaData = await getFlicksByUidWithMetaData(user.uid);
    setFlicks(flicksWithMetaData);
  };

  const getMoodsGenres = () => {
    getGenres().then(setGenres);
    getMoods().then(setMoods);
  };

  useEffect(() => {
    getFlicks();
    getMoodsGenres();
  }, [user]);

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

  // render that chosen flick onto a flick card
  // if no flicks match, render no matches found, please try again

  const handleSubmit = () => {
    const flickData = flicks.reduce((acc, flick) => {
      if (checkedGenre.length > 0) {
        const genreFound = flick.genres.some((genre) => checkedGenre.some((checkedGenreObj) => checkedGenreObj === genre.genreName));
        if (!genreFound) return acc;
      }
      if (checkedMood > 0) {
        const moodFound = flick.moods.some((mood) => checkedMood.some((checkedMoodObj) => checkedMoodObj === mood.genreName));
        if (!moodFound) return acc;
      }
      if (formInput.watched) {
        if (flick.watched === formInput.watched) return acc;
      }
      if (formInput.type) {
        if (flick.type === formInput.type) return acc;
      }
      if (formInput.recommendedBy) {
        const recommendation = flick.recommendedBy.some((rec) => rec.includes(formInput.recommendedBy));
        if (!recommendation) return acc;
      }
      acc.push(flick);
      return acc;
    }, []);
    console.warn(flickData);
    // router.push('/watchThis');
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h3>i feel like watching...</h3>
      <div>
        <h5>type</h5>
        <Form.Select
          aria-label="Type"
          name="type"
          type="select"
          onChange={handleChange}
          className="mb-3"
          value={formInput.type}
        >
          <option value="">Select Type</option>
          <option value="Movie">Movie</option>
          <option value="TV Show">TV Show</option>
        </Form.Select>
      </div>
      <h5>status</h5>
      <Form.Select
        aria-label="Watched"
        name="watched"
        type="select"
        onChange={handleChange}
        className="mb-3"
        value={formInput.watched}
      >
        <option value="">something old or something new?</option>
        <option value="true">Watched</option>
        <option value="false">Haven&apos;t watched</option>
      </Form.Select>
      <div>
        <h5>genre</h5>
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
        <h5>mood</h5>
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
      <div>
        <div>
          <h5>recommended by</h5>
          <input type="text" name="recommendedBy" value={formInput.recommendedBy} className="form-control" placeholder="Recommended By" onChange={handleChange} />
        </div>
      </div>
      <button type="button" onClick={handleSubmit}>shuffle</button>
    </form>
  );
}
