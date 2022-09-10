/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
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
  flicksList.map((flick) => {
    if (flick.favorite) favoritedFlicks.push(flick);
    return favoritedFlicks;
  });

  return (
    <div className="profileCardDiv">
      <img src={profileImage} alt={userObj.username} className="rounded-circle" />
      <br />
      <h1>{userObj.firstName} {userObj.lastName}</h1>
      <h2>{userObj.username}</h2>
      <br />
      <Link href="/flicks/watchlist" passHref>
        <Button className="watchlistButton">view watchlist</Button>
      </Link>
      <br />
      <h3>favorite genres:</h3>
      {userObj.genres?.map((genre) => <h5 className="favGenres">-{genre.genreName}</h5>)}
      <br />
      <h3>favorited flicks:</h3>
      <br />
      {flicksList.map((flick) => {
        if (!flick.favorite) return null;

        return (
          <div className="favoritedFlicksDiv">
            {favoritedFlicks.map((flix) => <FavoritedFlicksCard key={flix.flicksFirebaseKey} flickObj={flix} />)}
          </div>
        );
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
    title: PropTypes.string,
  })).isRequired,
};

ProfileCard.defaultProps = {
  userObj: {},
};
