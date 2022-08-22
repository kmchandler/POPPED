/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import ProfileDropdown from './ProfileDropdown';

export default function NavBar() {
  const { user } = useAuth();
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark .me-auto .ml-auto">
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
            <li className="nav-item">
              <Link passHref href="/friends">
                <a className="nav-link">
                  friends
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link passHref href="/moods">
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
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                <img src={user.photoURL} width="30px" height="30px" alt="user" className="user-icon" />
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <div className="profileDropdownBottomDiv">
                  <ProfileDropdown />
                  <button type="button" className="signOutBtn btn" onClick={signOut}>
                    Sign Out
                  </button>
                  <Link passHref href="/users/profile">
                    <button type="button" className="profileBtn btn">
                      Profile
                    </button>
                  </Link>
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
