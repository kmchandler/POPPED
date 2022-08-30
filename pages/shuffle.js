/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
  const router = useRouter();

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
        const watchedFlick = flick.watched === formInput.watched;
        if (!watchedFlick) return acc;
      }
      if (formInput.type) {
        const flickType = flick.type === formInput.type;
        if (!flickType) return acc;
      }
      if (formInput.recommendedBy) {
        const recommendation = flick.recommendedBy.includes(formInput.recommendedBy);
        if (!recommendation) return acc;
      }
      acc.push(flick);
      return acc;
    }, []);

    if (flickData.length >= 1) {
      const result = flickData[Math.floor(Math.random() * flickData.length)];
      router.push(`/flicks/watchThis/${result.flicksFirebaseKey}`);
    } else if (flickData.length <= 0) {
      router.push('/flicks/tryAgain');
    }
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
