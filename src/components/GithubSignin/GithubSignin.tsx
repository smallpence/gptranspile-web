import React from 'react';
import {Text} from "@mantine/core";
import styles from './GithubSignin.module.css';
import GithubLogo from "../../resources/githubmark.svg"
import {SessionState} from "../../Types";


const CLIENT_ID = process.env["REACT_APP_GITHUB_OAUTH_CLIENT_ID"]
const URL = process.env["REACT_APP_URL"]

const GithubSignin = (props: {
    sessionState: SessionState
}) => {
    return <div className={styles.GithubSignin} data-testid="GithubSignin">
        <img src={GithubLogo} alt="github mark" className={styles.logo}/>
        {/*{ !props.signedIn*/}
        {/*    ? <Text variant="link" component="a" weight="bold" className={styles.signin} href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${URL}/backend/auth`}>Sign in with Github...</Text>*/}
        {/*    : <Text className={styles.signin}>Signed in as</Text>*/}
        {/*}*/}
        {(() => {
            switch (props.sessionState.state) {
                case "signedOut":
                    return <Text variant="link" component="a" weight="bold" className={styles.signin} href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${URL}/backend/auth`}>Sign in with Github...</Text>

                case "signingIn":
                    return <Text className={styles.signin}>Signing in...</Text>

                case "signedIn": return <Text className={styles.signin}>Signed in as {props.sessionState.username}</Text>

            }
        })()}
    </div>;
}

export default GithubSignin;
