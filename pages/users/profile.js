/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { React, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { getUserByUid } from '../../api/userData';
import ProfileCard from '../../components/ProfileCard';

export default function Profile() {
  const [profile, setProfile] = useState({});
  const { user } = useAuth();

  const getTheUser = async () => {
    const result = await getUserByUid(user.uid);
    setProfile(result);
  };

  useEffect(() => {
    getTheUser();
  }, []);

  if (!profile) {
    return null;
  }

  return (
    <div className="userProfileDiv">
      <>
        <Link passHref href={`/users/edit/${profile.userFirebaseKey}`}>
          <Button className="formButton" type="submit">{profile.userFirebaseKey ? 'Update' : 'Create'} Profile</Button>
        </Link>
      </>
      <ProfileCard key={profile.userFirebaseKey} userObj={profile} onUpdate={getTheUser} />
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
  userObj: {},
};
