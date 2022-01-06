import React from 'react';
import {Text} from "@mantine/core";
import styles from './GithubSignin.module.css';


const CLIENT_ID = process.env["REACT_APP_GITHUB_OAUTH_CLIENT_ID"]
const URL = process.env["REACT_APP_URL"]

const GithubSignin = (props: {
    signedIn: boolean
}) => (
  <div className={styles.GithubSignin} data-testid="GithubSignin">
      { !props.signedIn
          ? <Text variant="link" component="a" weight="bold" href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${URL}/backend/auth`}>Sign in with Github</Text>
          : <Text>Signed in</Text>
      }
  </div>
);

export default GithubSignin;
