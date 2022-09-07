import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import Signin from '../components/Signin';
import NavBar from '../components/NavBar';
import { getUserByUid } from '../api/userData';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { user, userLoading } = useAuth();
  const [profile, setProfile] = useState([]);

  // if user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  // what the user should see if they are logged in
  if (user) {
    getUserByUid(user.uid).then(setProfile);
    return (
      <>
        <NavBar navObj={profile} />
        <div className="container">
          <Component {...pageProps} />
        </div>
      </>
    );
  }

  return <Signin />;
};

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
