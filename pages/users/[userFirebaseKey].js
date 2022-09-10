/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import Link from 'next/link';
import { React, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import ProfileCard from '../../components/ProfileCard';
import { getFlicksByUidWithMetaData, getSingleUserWithMetaData } from '../../api/mergedData';

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [flicks, setFlicks] = useState([]);
  const router = useRouter();
  const { userFirebaseKey } = router.query;
  const { user } = useAuth();

  const getTheUser = async () => {
    const fetchedProfile = await getSingleUserWithMetaData(userFirebaseKey);
    setProfile(fetchedProfile);
  };

  const getAllTheFlicks = async () => {
    const flicksWithMetaData = await getFlicksByUidWithMetaData(user.uid);
    setFlicks(flicksWithMetaData);
  };

  useEffect(() => {
    getTheUser();
    getAllTheFlicks();
  }, []);

  if (!profile) {
    return null;
  }

  return (
    <div className="userProfileDiv">
      <div className="profileBtn">
        <Link passHref href={`/users/edit/${profile.userFirebaseKey}`}>
          <Button type="submit">{profile.userFirebaseKey ? 'update' : 'create'} profile</Button>
        </Link>
      </div>
      <ProfileCard userObj={profile} flicksList={flicks} />
    </div>
  );
}

Profile.propTypes = {
  userObj: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    genres: PropTypes.objectOf(PropTypes.string),
    imageUrl: PropTypes.string,
    userFirebaseKey: PropTypes.string,
  }),
};
Profile.defaultProps = {
  userObj: {},
};
