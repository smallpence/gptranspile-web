import React, {Dispatch, SetStateAction, useState} from 'react';
import styles from './CodeInput.module.css';
import {Container, Textarea, Modal, Button} from "@mantine/core";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";


function CodeInput(props: {
    code: string,
    setCode: Dispatch<SetStateAction<string>>,
    signedIn: boolean
}) {
    const [opened, setOpened] = useState(false);
    const [buffer, setBuffer] = useState("")

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
                onChange={(event) => setBuffer(event.currentTarget.value)}
                defaultValue={props.code}
            />
            <Button onClick={() => {
                setOpened(false);
                props.setCode(buffer);
            }}>Close</Button>
        </Modal>
        <SyntaxHighlighter language="kotlin">{props.code}</SyntaxHighlighter>
        { props.signedIn &&
            <Button onClick={() => setOpened(true)}>Edit...</Button>
        }
    </Container>
}


export default CodeInput;
