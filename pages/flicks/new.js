/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { updateFlick, createFlick } from '../../api/flicksData';
import genres from '../../sampleData/genres.json';
import moods from '../../sampleData/moods.json';

const initialState = {
  title: '',
  type: '',
  genre: '',
  moods: '',
  castCrew: '',
  recommendedBy: '',
  watched: false,
  favorite: false,
  imageUrl: '',
  rating: '',
};

function FlickForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [checked1, setChecked1] = useState([]);
  const [checked2, setChecked2] = useState([]);
  const [checked3, setChecked3] = useState([]);
  const [checkedFav, setCheckedFav] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.flickFirebaseKey) {
      setFormInput(obj);
      setChecked1(obj.genre || '');
      setChecked2(obj.favorite || '');
      setChecked3(obj.watched || '');
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.flickFirebaseKey) {
      updateFlick(formInput)
        .then(() => router.push('/flicks/watchlist'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createFlick(payload).then(() => {
        router.push('/flicks/watchlist');
      });
    }
  };

  const handleClick1 = (e) => {
    let updatedGenre = [...checked1];
    if (e.target.checked) {
      updatedGenre = [...checked1, e.target.name];
    } else {
      updatedGenre.splice(checked1.indexOf(e.target.name), 1);
    }
    setChecked1(updatedGenre);
  };

  const handleClickFav = (e) => {
    let updatedFavorite = [...checkedFav];
    if (e.target.checked) {
      updatedFavorite = [...checkedFav, e.target.name];
    } else {
      updatedFavorite.splice(checkedFav.indexOf(e.target.name), 1);
    }
    setCheckedFav(updatedFavorite);
  };

  const handleClick2 = (e) => {
    let updatedMood = [...checked2];
    if (e.target.checked) {
      updatedMood = [...checked2, e.target.name];
    } else {
      updatedMood.splice(checked2.indexOf(e.target.name), 1);
    }
    setChecked2(updatedMood);
  };

  const handleClick3 = (e) => {
    let updatedWatched = [...checked3];
    if (e.target.checked) {
      updatedWatched = [...checked3, e.target.name];
    } else {
      updatedWatched.splice(checked3.indexOf(e.target.name), 1);
    }
    setChecked3(updatedWatched);
  };

  return (
    <div className="flickFormContainer">
      <Form className="flickForm" onSubmit={handleSubmit}>
        <h2 className="flickHeaderText mt-5">{obj.flickFirebaseKey ? 'Update' : 'Add'} Flick</h2>
        <FloatingLabel controlId="floatingInput1" label="Title" className="mb-3">
          <Form.Control type="text" placeholder="Title" name="flickTitle" value={formInput.title} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput2" label="Type" className="mb-3">
          <Form.Control type="text" placeholder="Type" name="type" value={formInput.type} onChange={handleChange} required />
        </FloatingLabel>

        <h5>Genre</h5>
        {genres.map((genre) => (
          <div key={genre.genreFirebaseKey} className="mb-3">
            <Form.Check
              type="checkbox"
              id={genre.genreFirebaseKey}
              label={genre.genreName}
              checked={checked1.indexOf(genre.genreName) >= 0}
              onChange={handleClick1}
              name={genre.genreName}
            />
          </div>
        ))}

        <h5>Moods</h5>
        {moods.map((mood) => (
          <div key={mood.moodFirebaseKey} className="mb-3">
            <Form.Check
              type="checkbox"
              id={mood.moodFirebaseKey}
              label={mood.moodsName}
              checked={checked1.indexOf(mood.moodsName) >= 0}
              onChange={handleClick2}
              name={mood.moodsName}
            />
          </div>
        ))}

        <FloatingLabel controlId="floatingInput5" label="Cast and Crew" className="mb-3">
          <Form.Control type="text" placeholder="Cast and Crew" name="Cast and Crew" value={formInput.castCrew} onChange={handleChange} />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput6" label="Recommended By" className="mb-3">
          <Form.Control type="text" placeholder="Recommended By" name="Recommended By" value={formInput.recommendedBy} onChange={handleChange} />
        </FloatingLabel>

        <Form.Check
          label="Watched"
          id="watched"
          onClick={handleClick3}
        />

        <Form.Check
          label="Favorite"
          id="favorite"
          onClick={handleClickFav}
        />

        <FloatingLabel controlId="floatingInput9" label="Photo URL" className="mb-3">
          <Form.Control type="url" placeholder="Photo URL" name="imageUrl" value={formInput.imageUrl} onChange={handleChange} required />
        </FloatingLabel>

        <Button className="formButton" type="submit">{obj.flickFirebaseKey ? 'Update' : 'Add'} Flick</Button>
      </Form>
    </div>
  );
}

FlickForm.propTypes = {
  obj: PropTypes.shape({
    flickFirebaseKey: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    genre: PropTypes.string,
    moods: PropTypes.string,
    castCrew: PropTypes.string,
    recommendedBy: PropTypes.string,
    watched: PropTypes.bool,
    favorite: PropTypes.bool,
    imageUrl: PropTypes.string,
    rating: PropTypes.string,
    uid: PropTypes.string,
  }),
};

FlickForm.defaultProps = {
  obj: initialState,
};

export default FlickForm;
