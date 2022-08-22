/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';

function User({ userObj }) {
  return (
    <div>
      <img src={userObj.imageUrl} alt={userObj.name} />
      <h1>{userObj.name}</h1>
      <h2>{userObj.email}</h2>
      <h3>{userObj.tagline}</h3>
      <h3>{userObj.lastLogin}</h3>
      <h3>{userObj.phone}</h3>
    </div>
  );
}
User.propTypes = {
  userObj: PropTypes.shape({
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    lastLogin: PropTypes.string,
    phone: PropTypes.string,
    tagline: PropTypes.string,
    timeZone: PropTypes.string,
  }),
};
User.defaultProps = {
  userObj: [],
};
export default User;
