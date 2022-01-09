import React, {useState} from 'react';
import styles from './CodeEditor.module.css';
import {Transition} from "@mantine/core";
import CodeInput from '../CodeInput/CodeInput';
import CodeOutput from "../CodeOutput/CodeOutput";
import {SessionState} from "../../Types";

function CodeEditor (props: {
    sessionState: SessionState
}) {
    const [code, setCode] = useState("");
    const [codeView, setCodeView] = useState(true)
    const [genView, setGenView] = useState(false)
    return <div style={{height: '100%'}}>
        <Transition mounted={codeView} transition="slide-right" duration={500}>{(style) =>
            <CodeInput code={code} setCode={setCode} sessionState={props.sessionState} setCodeView={setCodeView} setGenView={setGenView} style={style}/>
        }</Transition>
        <Transition mounted={genView} transition="slide-left" duration={500}>{(style) =>
            <CodeOutput code={code} sessionState={props.sessionState} setCodeView={setCodeView} setGenView={setGenView} style={style}/>
        }</Transition>
    </div>
}

export default CodeEditor;
