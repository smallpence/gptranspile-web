import React, {useState} from 'react';
import styles from './CodeEditor.module.css';
import {Title} from "@mantine/core";
import CodeInput from '../CodeInput/CodeInput';
import CodeOutput from "../CodeOutput/CodeOutput";

function CodeEditor (props: {
    signedIn: boolean
}) {
    const [code, setCode] = useState("");
    return <div className={styles.CodeEditor} data-testid="CodeEditor">
        <Title>Input your code</Title>
        <CodeInput code={code} setCode={setCode} signedIn={props.signedIn}/>
        <Title>Attempt to translate</Title>
        <CodeOutput code={code} signedIn={props.signedIn}/>
    </div>
}

export default CodeEditor;
