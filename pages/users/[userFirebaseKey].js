/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import Link from 'next/link';
import { React, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ProfileCard from '../../components/ProfileCard';
// import { getSingleUserWithMetaData } from '../../api/mergedData';
import { getSingleUser } from '../../api/userData';

export default function Profile() {
  const [profile, setProfile] = useState({});
  const router = useRouter();
  const { userFirebaseKey } = router.query;

  const getTheUser = async () => {
    // getSingleUserWithMetaData(userFirebaseKey).then(setProfile);
    getSingleUser(userFirebaseKey).then(setProfile);
    console.warn(profile);
  };

  useEffect(() => {
    getTheUser();
  }, [userFirebaseKey]);

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
