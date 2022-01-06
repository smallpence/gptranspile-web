import React, {CSSProperties, useEffect, useState} from 'react';
import styles from './CodeOutput.module.css';
import {Button, Text} from "@mantine/core";
import {SetState} from "../../Types";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import DarkStyle from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";

interface GPT3Response {
    id: string,
    object: string,
    created: number,
    model: string,
    choices: [ {
        text: string,
        index: number,
        finish_reason: string
    } ]
}

function CodeOutput(props: {
    code: string,
    signedIn: boolean,
    setCodeView: SetState<boolean>,
    setGenView: SetState<boolean>,
    style?: CSSProperties
}) {
    const [output, setOutput] = useState("");
    const url = process.env["REACT_APP_URL"]

    useEffect(() => {
        const queryGPT = async () => {
            if (!props.signedIn) return "not signed in";

            const res = await fetch(`${url}/backend/gpt3`, {
                method: "GET",
                credentials: "include",
                headers: {
                    'code': props.code,
                    'language': "java"
                }
            });
            if (!res.ok) return "error"
            return await res.text();
        }

        (async () => {
            const data = await queryGPT()
            setOutput(data)
        })();
    }, [props.code, props.signedIn, url])

    return <div className={styles.CodeOutput} data-testid="CodeOutput" style={props.style}>
        <div>
            <Text size="xl" className={styles.title}>GPT3's Response</Text>
        </div>
        <SyntaxHighlighter language="kotlin" style={DarkStyle}>{output}</SyntaxHighlighter>
        <div className={styles.footer}>
            <Button size="xl" onClick={() => {

            }}>Retry</Button>
            <Button className={styles.retry} size="lg" onClick={() => {
                props.setGenView(false);
                setTimeout(() => props.setCodeView(true), 150);
            }}>Exit</Button>
        </div>
    </div>
}


export default CodeOutput;
