import React from 'react';
import {Navigate, useSearchParams} from "react-router-dom";

import styles from './SessionInit.module.css';
import Cookies from "universal-cookie";

function SessionInit() {
    const cookies = new Cookies()

    const [searchParams, _] = useSearchParams();
    const session = searchParams.get("session")
    cookies.set('session', session, {sameSite: "strict"})

    return <Navigate to="/"/>
}

export default SessionInit;
