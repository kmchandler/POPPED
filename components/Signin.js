import React from 'react';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div className="loginPage">
      <h1 className="loginWelcome">welcome to POPPED</h1>
      <br />
      <h3 className="loginTagline">pick your flick before the popcorn&apos;s ready</h3>
      <br />
      <button type="button" className="btn btn-lg copy-btn loginButton" onClick={signIn}>
        Sign In Here
      </button>
    </div>
  );
}

export default Signin;
