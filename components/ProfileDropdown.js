/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useAuth } from '../utils/context/authContext';

export default function ProfileDropdown() {
  const { user } = useAuth();
  return (
    <div className="profileDropdown">
      <img src={user.photoURL} alt={user.displayName} />
      <h5>{user.displayName}</h5>
      <h6>{user.email}</h6>
      <h6>{user.metadata.lastSignInTime}</h6>
    </div>
  );
}
