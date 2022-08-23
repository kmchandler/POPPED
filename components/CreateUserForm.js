import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { createUser, getUsersByUid, updateUser } from '../api/userData';
import genres from '../sampleData/genres.json';

const initialState = {
  firstName: '',
  lastName: '',
  username: '',
  favoriteGenres: '',
  imageUrl: '',
};

function CreateUserForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [checkedGenre, setCheckedGenre] = useState([]);
  const [, setProfile] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getUsersByUid(user.uid).then(setProfile);
    if (obj.userFirebaseKey) setFormInput(obj);
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
    if (obj.userFirebaseKey) {
      updateUser(formInput).then(() => router.push('/profile'));
    } else {
      createUser(formInput).then(() => {
        router.push('/profile');
      });
    }
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

  return (
    <div className="profilePage">
      <form onSubmit={handleSubmit}>
        <input required type="text" name="First Name" value={formInput.firstName} className="form-control" placeholder="First Name" onChange={handleChange} />
        <input required type="text" name="Last Name" value={formInput.lastName} className="form-control" placeholder="Last Name" onChange={handleChange} />
        <input required type="text" name="Username" value={formInput.username} className="form-control" placeholder="Username" onChange={handleChange} />
        <h5>Favorite Genres</h5>
        {genres.map((genre) => (
          <div key={genre.genreFirebaseKey} className="mb-3">
            <Form.Check
              type="checkbox"
              id={genre.genreFirebaseKey}
              label={genre.genreName}
              checked={checkedGenre.indexOf(genre.genreName) >= 0}
              onChange={handleClickGenre}
              name={genre.genreName}
              value={formInput.genre}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

CreateUserForm.propTypes = {
  obj: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    favoriteGenres: PropTypes.string,
    imageUrl: PropTypes.string,
    userFirebaseKey: PropTypes.string,
  }),
};

CreateUserForm.defaultProps = {
  obj: initialState,
};

export default CreateUserForm;
