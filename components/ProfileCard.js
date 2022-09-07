/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { getFlicksByUidWithMetaData } from '../api/mergedData';

export default function ProfileCard({ userObj }) {
  const [flicks, setFlicks] = useState([]);
  const { user } = useAuth();

  const getAllTheFlicks = async () => {
    const flicksWithMetaData = await getFlicksByUidWithMetaData(user.uid);
    setFlicks(flicksWithMetaData);
  };

  useEffect(() => {
    getAllTheFlicks();
  }, [user]);

  return (
    <div>
      <img src={userObj.imageUrl} alt={userObj.username} />
      <h1>{userObj.firstName} {userObj.lastName}</h1>
      <h2>{userObj.username}</h2>
      <h3>Favorite Genres:</h3>
      {userObj.genres?.map((genre) => <h3>{genre.genreName}</h3>)}
      <h3>Favorite Flicks:</h3>
      {flicks?.map((flick) => {
        if (!flick.favorite) return null;

        return <h3>{flick.flickName}</h3>;
      })}
    </div>
  );
}

ProfileCard.propTypes = {
  userObj: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
    imageUrl: PropTypes.string,
    userFirebaseKey: PropTypes.string,
  }),
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
};

ProfileCard.defaultProps = {
  userObj: {},
};
