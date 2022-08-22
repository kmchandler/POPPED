/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function Profile({ userObj }) {
  return (
    <div className="userProfileDiv">
      <div>
        <img src={userObj.imageUrl} alt={userObj.username} />
        <h1>{userObj.firstName} {userObj.lastName}</h1>
        <h2>{userObj.username}</h2>
        <h3>{userObj.favoriteGenres}</h3>
      </div>
      <>
        <Link passHref href={`/users/edit/${userObj.userFirebaseKey}`}>
          <Button className="formButton" type="submit">{userObj.userFirebaseKey ? 'Update' : 'Add'} Profile</Button>
        </Link>
      </>
    </div>
  );
}

Profile.propTypes = {
  userObj: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    favoriteGenres: PropTypes.string,
    imageUrl: PropTypes.string,
    userFirebaseKey: PropTypes.string,
  }),
};
Profile.defaultProps = {
  userObj: [],
};
