import React from 'react';
import styles from './GithubSignin.module.css';

const CLIENT_ID = process.env["REACT_APP_GITHUB_OAUTH_CLIENT_ID"]

const GithubSignin = () => (
  <div className={styles.GithubSignin} data-testid="GithubSignin">
      <a href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=http://127.0.0.1:8000/auth/`}>Log in with Github</a>
  </div>
);

export default GithubSignin;