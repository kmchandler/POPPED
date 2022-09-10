/* eslint-disable no-template-curly-in-string */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRouter } from 'next/router';
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { signOut } from '../utils/auth';
import ProfileDropdown from './ProfileDropdown';

export default function NavBar({ navObj }) {
  const router = useRouter();

  const goToProfile = () => {
    router.push(`/users/${navObj.userFirebaseKey}`);
  };

  let profileImage = '';

  if (navObj.imageUrl !== '') {
    profileImage = navObj.imageUrl;
  } else {
    profileImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark .me-auto .ml-auto navBarStyle">
      <div className="container-fluid navbarContents">
        <Link passHref href="/">
          <h3 className="navbar-brand" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
            <b>POPPED</b>
          </h3>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link passHref href="/flicks/watchlist">
                <a className="nav-link">
                  watchlist
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link passHref href="/recommendations">
                <a className="nav-link">
                  recommendations
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link passHref href="/shuffle">
                <a className="nav-link">
                  shuffle
                </a>
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link passHref href="/friends">
                <a className="nav-link">
                  friends
                </a>
              </Link>
            </li> */}
            <li className="nav-item">
              <Link passHref href="/moods/moods">
                <a className="nav-link">
                  moods
                </a>
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbarProfile" id="navbarTogglerDemo01">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                <img src={profileImage} width="35px" height="35px" alt="user" className="user-icon rounded-circle" />
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <div className="profileDropdownBottomDiv">
                  <ProfileDropdown userObj={navObj} />
                  <button type="button" className="goToProfileBtn btn" onClick={goToProfile}>
                    Profile
                  </button>
                  <button type="button" className="signOutBtn btn" onClick={signOut}>
                    Sign Out
                  </button>
                </div>
              </ul>
            </li>
            <div />
          </ul>
        </div>
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  navObj: PropTypes.shape({
    userFirebaseKey: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
};
