import React, {CSSProperties, useCallback, useEffect, useState} from 'react';
import styles from './CodeOutput.module.css';
import {Button, LoadingOverlay, Text} from "@mantine/core";
import {SessionState, SetState} from "../../Types";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import DarkStyle from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";

function CodeOutput(props: {
    code: string,
    sessionState: SessionState,
    setCodeView: SetState<boolean>,
    setGenView: SetState<boolean>,
    style?: CSSProperties,
    isDesktop: boolean
}) {
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const url = process.env["REACT_APP_URL"]

    const queryGPT = useCallback(async () => {
        if (!props.sessionState.signedIn) return "not signed in";

        const res = await fetch(`${url}/backend/gpt3`, {
            method: "GET",
            credentials: "include",
            headers: {
                'code': JSON.stringify(props.code),
                'language': "java"
            }
        });
        if (!res.ok) return "error"
        return await res.text();
    },[props.code, props.sessionState, url]);

    const displayGPT = useCallback( async () => {
        setLoading(true);
        const data = await queryGPT();
        setLoading(false);
        setOutput(data);
    }, [queryGPT]);

    useEffect(() => {
        displayGPT();
    }, [props.code, props.sessionState.signedIn, displayGPT])

    return <div className={styles.CodeOutput} data-testid="CodeOutput" style={props.style}>
        <div className={styles.header}>
            <Text size="xl">GPT3's Response</Text>
        </div>
        <div style={{position: 'relative'}}>
            <LoadingOverlay visible={loading}/>
            <SyntaxHighlighter language="kotlin" style={DarkStyle} customStyle={{height: "100%", padding: 0, margin: 0}}>{output}</SyntaxHighlighter>
        </div>
        {!props.isDesktop && <div className={styles.footer}>
            <Button size="xl" onClick={() => {displayGPT();}}>Retry</Button>
            <Button className={styles.retry} size="lg" onClick={() => {
                props.setGenView(false);
                setTimeout(() => props.setCodeView(true), 150);
            }}>Exit</Button>
        </div>}
    </div>
}


export default CodeOutput;
