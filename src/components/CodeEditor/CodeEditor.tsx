import React, {useState} from 'react';
import styles from './CodeEditor.module.css';
import {Transition} from "@mantine/core";
import CodeInput from '../CodeInput/CodeInput';
import CodeOutput from "../CodeOutput/CodeOutput";

function CodeEditor (props: {
    signedIn: boolean
}) {
    const [code, setCode] = useState("");
    const [codeView, setCodeView] = useState(true)
    const [genView, setGenView] = useState(false)
    return <div style={{height: '100%'}}>
        <Transition mounted={codeView} transition="slide-right" duration={500}>{(style) =>
            <CodeInput code={code} setCode={setCode} signedIn={props.signedIn} setCodeView={setCodeView} setGenView={setGenView} style={style}/>
        }</Transition>
        <Transition mounted={genView} transition="slide-left" duration={500}>{(style) =>
            <CodeOutput code={code} signedIn={props.signedIn} setCodeView={setCodeView} setGenView={setGenView} style={style}/>
        }</Transition>
    </div>
}

export default CodeEditor;
