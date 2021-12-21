import React, {useState} from 'react';
import styles from './CodeInput.module.css';
import {Prism} from "@mantine/prism";
import {Container, Textarea} from "@mantine/core";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";


function CodeInput() {
    const [code, setCode] = useState('');

    return <Container>
        <Textarea
            onChange={(event) => setCode(event.currentTarget.value)}
        />
        <SyntaxHighlighter language="kotlin">{code}</SyntaxHighlighter>
    </Container>
}


export default CodeInput;
