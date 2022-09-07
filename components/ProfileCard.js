/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';

export default function ProfileCard({ userObj, flicksList }) {
  console.log(flicksList);
  return (
    <div>
      <img src={userObj.imageUrl} alt={userObj.username} />
      <h1>{userObj.firstName} {userObj.lastName}</h1>
      <h2>{userObj.username}</h2>
      <h3>Favorite Genres:</h3>
      {userObj.genres?.map((genre) => <h3>{genre.genreName}</h3>)}
      <h3>Favorited Flicks:</h3>
      {flicksList.map((flick) => {
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
  flicksList: PropTypes.arrayOf(PropTypes.shape({
    favorite: PropTypes.bool,
    flickName: PropTypes.string,
  })).isRequired,
};

ProfileCard.defaultProps = {
  userObj: {},
};
