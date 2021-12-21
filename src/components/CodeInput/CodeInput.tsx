import React, {useState} from 'react';
import styles from './CodeInput.module.css';
import {Container, Textarea, Modal, Button} from "@mantine/core";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";


function CodeInput() {
    const [code, setCode] = useState('');
    const [opened, setOpened] = useState(false);

    return <Container>
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title={"Code"}
            size={"xl"}
        >
            <Textarea
                minRows={2}
                maxRows={20}
                autosize
                onChange={(event) => setCode(event.currentTarget.value)}
            >{code}</Textarea>
            <Button onClick={() => setOpened(false)}>Close</Button>
        </Modal>
        <SyntaxHighlighter language="kotlin">{code}</SyntaxHighlighter>
        <Button onClick={() => setOpened(true)}>Edit...</Button>
    </Container>
}


export default CodeInput;
