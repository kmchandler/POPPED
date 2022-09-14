/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import FavoritedFlicksCard from './FavoritedFlicksCard';

export default function ProfileCard({ userObj, flicksList }) {
  let profileImage = '';
  if (userObj.imageUrl !== '') {
    profileImage = userObj.imageUrl;
  } else {
    profileImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
  }

  const favoritedFlicks = [];
  flicksList.forEach((flick) => {
    if (flick.favorite) favoritedFlicks.push(flick);
  });

  return (
    <div className="profileCardDiv">
      <img src={profileImage} alt={userObj.username} className="rounded-circle" />
      <br />
      <h1>{userObj.firstName} {userObj.lastName}</h1>
      <h2>{userObj.username}</h2>
      <br />
      <Link href="/flicks/watchlist" passHref>
        <button type="button" className="watchlistButton">view watchlist</button>
      </Link>
      <br />
      <h3>favorite genres:</h3>
      {userObj.genres?.map((genre) => <h6 className="favGenres">- {genre.genreName}</h6>)}
      <br />
      <h3>favorited flicks:</h3>
      <div className="d-flex flex-wrap cardContainer favoritedFlicksDiv">
        {favoritedFlicks.map((flick) => <FavoritedFlicksCard key={flick.flicksFirebaseKey} flickObj={flick} />)}
      </div>
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
    title: PropTypes.string,
  })).isRequired,
};

ProfileCard.defaultProps = {
  userObj: {},
};
